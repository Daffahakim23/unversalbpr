<template>
  <form @submit.prevent="handleSubmit">
    <label class="block text-xs sm:text-sm md:text-sm font-regular text-neutral-900 text-justify mb-4">Untuk melakukan
      pembukaan
      Deposito sebagai Nasabah Universal BPR, Anda diwajibkan memiliki rekening Tabungan Universal yang akan
      dipergunakan sebagai tempat penyetoran nominal Deposito Anda.</label>

    <RadioButtonChoose label="Apakah Anda sudah memiliki Tabungan Universal?" id="memilikiTabungan"
      :options="memilikiTabunganOptions" v-model="form.memilikiTabungan" name="memilikiTabungan" required />

    <div class="flex items-center mb-6" v-if="form.memilikiTabungan == 1">
      <div class="">
        <CustomCheckbox v-model="form.belumPunyaRekening"
          labelText="Saya bersedia melakukan pembukaan rekening Tabungan Universal untuk melanjutkan Pembukaan Deposito" />
      </div>
    </div>

    <FormField v-if="form.belumPunyaRekening == true" label="Produk yang diinginkan" id="produkyangDiingikan"
      v-model="form.produk" placeholder="Tabungan Universal" :readonly="true" required />

    <FormField v-if="form.belumPunyaRekening == true" label="Pilih Produk Deposito*" id="produkDeposito"
      :isDropdown="true" v-model="form.produkDeposito" placeholder="Pilih Produk Deposito yang Anda Inginkan"
      :options="produkDepositoOptions" required />

    <FormField v-if="form.memilikiTabungan == 2" class="mb-2" label="Nomor Rekening Tabungan Universal*"
      id="nomorRekening" v-model="form.nomorRekeningPemilik" variant="numeric" :maxlength="10"
      placeholder="Masukkan Nomor Rekening" required
      @input="form.nomorRekeningPemilik = form.nomorRekeningPemilik.replace(/\D/g, '')" @blur="handleNomorRekeningBlur"
      :error="nomorRekeningError"
      :hint="nomorRekeningError ? 'Nomor rekening tidak valid. Silakan periksa kembali' : ''" />

    <FormField label="Pilih Jaringan Kantor*" id="kantorCabang" :isDropdown="true" v-model="form.kantorCabang"
      placeholder="Pilih Jaringan Kantor" :options="kantorCabangOptions" required />
    <div v-if="form.kantorCabang" class="mt-4">
      <FormField label="Alamat Jaringan Kantor Pembukaan Rekening" id="alamatKantorCabang"
        v-model="form.alamatKantorCabang" :readonly="true" />
    </div>

    <FormField v-if="form.belumPunyaRekening == false" label="Pilih Produk Deposito*" id="produkDeposito"
      :isDropdown="true" v-model="form.produkDeposito" placeholder="Pilih Produk Deposito yang Anda Inginkan"
      :options="produkDepositoOptions" required />

    <FlagBox type="info" closable class="mb-4">
      <p class="text-sm font-normal">Informasi mengenai Produk dan Layanan dapat diakses melalui website
        universalbpr.co.id atau dengan mengklik tombol "Info Produk" di bagian atas halaman ini.</p>
    </FlagBox>

    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Alamat Email tidak valid. Silakan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      required :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid. Silakan periksa kembali.'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" />

    <RadioButtonChoose label="Tujuan Simpanan*" :options="tujuanOptions" v-model="form.tujuan" name="tujuan" />

    <div v-if="form.tujuan === '0'" class="">
      <FormField label="Tujuan Simpanan Lainnya*" id="tujuanLainnya" type="text" v-model="form.tujuanLainnya"
        placeholder="Masukkan Simpananan Lainnya" variant="alpha" />
    </div>

    <FormField label="Sumber Dana" id="sumberDana" :isDropdown="true" v-model="form.sumberDana"
      :options="penghasilanOptions" placeholder="Pilih Sumber Dana Anda" />

    <div v-if="form.sumberDana === '0'" class="">
      <FormField label="Sumber Dana Lainnya *" id="sumberDanaLainnya" type="text" v-model="form.sumberDanaLainnya"
        placeholder="Masukkan Sumber Dana Lainnya" variant="alpha" />
    </div>

    <FormField label="Nama Funding Officer (Opsional)" id="namaFundingOfficer" type="text" variant="alpha"
      v-model="form.namaFundingOfficer" placeholder="Masukkan nama funding officer"
      hint="Funding Officer adalah petugas bank yang membantu pengelolaan simpanan Anda. Masukkan namanya jika ada, atau kosongkan jika tidak tahu atau belum pernah dilayani." />
    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>

  <ReusableModal title='Syarat dan Ketentuan Deposito' :isOpen="isModalOpen" :apiUrl="apiUrl"
    @close="isModalOpen = false" @confirm="handleModalConfirm" />

  <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg" @close="isModalError = false"
    @buttonClick1="handleModalClose" @buttonClick2="handleToDeposito" />

  <ModalError :isOpen="isModalErrorEmail" :features="modalContentEmail" icon="otp-error-illus.svg"
    @close="isModalErrorEmail = false" @buttonClick1="handleCloseModal" @buttonClick2="openWhatsApp" />
</template>

<script>
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import FlagBox from "@/components/flagbox.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { produkDepositoOptions, memilikiRekeningOptions, memilikiTabunganOptions, produkOptions, tujuanOptions, penghasilanOptions } from "@/data/option.js";
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/icon-deposito.svg";
import { fetchBranches } from '@/services/service.js';
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import { handleFieldMixin } from "@/handler/handleField.js";

export default {
  mixins: [handleFieldMixin],
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    RadioButtonChoose,
    ReusableModal,
    FlagBox,
    ModalError,
    CustomCheckbox,
  },
  data() {
    return {
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_DEPOSIT",
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      nomorRekeningError: false,
      tujuanOptions,
      penghasilanOptions,
      produkDepositoOptions,
      produkOptions,
      memilikiRekeningOptions,
      memilikiTabunganOptions,
      selectedCountryCode: "ID",
      isModalError: false,
      isModalOpen: false,
      isSubmitting: false,
      emailError: false,
      phoneError: false,
      belumPunyaRekening: false,
      isModalErrorEmail: false,
      isWhatsAppOpenCoolingDown: false,
      temporaryBanMessage: "",
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
      modalContent: [
        {
          label: "Konfirmasi Pembukaan Deposito",
          icon: errorIcon,
          description:
            "Apakah Anda yakin ingin melanjutkan Pembukaan Deposito nasabah baru?",
          buttonString1: "Tetap Dihalaman Ini",
          buttonString2: "Lanjutkan Pembukaan Deposito Berjangka",
        },
      ],
      modalContentEmail: [
        {
          label: "",
          icon: "",
          description: "",
          buttonString1: "",
          buttonString2: "",
        },
      ],
      whatsappContact: {
        label: "WhatsApp",
        number: "(+62) 21 2221 3993",
        icon: "whatsapp-icon.svg",
        whatsapp: "+622122213993",
      },
    };
  },

  computed: {
    isButtonDisabled() {
      let allFieldsAreValid = true;

      if (!this.form.memilikiTabungan ||
        !this.form.kantorCabang ||
        !this.form.email || this.emailError ||
        !this.form.phone || this.phoneError ||
        !this.form.tujuan ||
        !this.form.sumberDana) {
        allFieldsAreValid = false;
      }
      if (this.form.memilikiTabungan == 1) {
        if (this.form.belumPunyaRekening !== true || !this.form.produkDeposito) {
          allFieldsAreValid = false;
        }
      } else if (this.form.memilikiTabungan == 2) {
        if (!this.form.nomorRekeningPemilik ||
          this.nomorRekeningError ||
          !this.form.produkDeposito) {
          allFieldsAreValid = false;
        }
      } else {
        allFieldsAreValid = false;
      }

      if (this.form.tujuan === '0') {
        if (!this.form.tujuanLainnya || this.form.tujuanLainnya.trim() === '') {
          allFieldsAreValid = false;
        }
      }

      if (this.form.sumberDana === '0') {
        if (!this.form.sumberDanaLainnya || this.form.sumberDanaLainnya.trim() === '') {
          allFieldsAreValid = false;
        }
      }

      return !allFieldsAreValid;
    }
  },

  methods: {
    getWhatsAppLink(number = 622122213993) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        return `https://wa.me/${number}`;
      } else {
        return `https://web.whatsapp.com/send?phone=${number}`;
      }
    },

    openWhatsApp() {
      if (this.whatsappContact && this.whatsappContact.whatsapp && !this.isWhatsAppOpenCoolingDown) {
        console.log("openWhatsApp dipanggil!");
        window.open(this.getWhatsAppLink(this.whatsappContact.whatsapp), '_blank');

        this.isWhatsAppOpenCoolingDown = true;

        setTimeout(() => {
          this.isWhatsAppOpenCoolingDown = false;
          console.log("Cooldown WhatsApp selesai. Bisa dipanggil lagi.");
        }, 2000);

      } else if (this.isWhatsAppOpenCoolingDown) {
        console.log("WhatsApp sedang dalam masa cooldown. Coba lagi nanti.");
      } else {
        console.log("Kontak WhatsApp tidak tersedia.");
      }
    },
    showErrorModal(title, message, btnString1 = "OK", btnString2 = "Batal", icon = "data-failed-illus.svg") {
      this.modalContentEmail = [
        {
          label: title,
          description: message,
          icon: new URL(`/src/assets/${icon}`, import.meta.url).href,
          buttonString1: btnString1,
          buttonString2: btnString2,
        },
      ];
      this.isModalOpen = false;
      this.isModalErrorEmail = true;
    },
    handleToDeposito() {
      this.$router.push({ path: "/dashboard/penempatanDepositoNTB" });
    },
    handleModalClose() {
      this.isModalError = false;
      this.form.memilikiTabungan = '';
    },
    handleCloseModal() {
      this.$router.push("/");
    },

    validateNomorRekening(nomorRekening) {
      return /^\d{10}$/.test(nomorRekening);
    },

    handleNomorRekeningBlur() {
      if (this.form.nomorRekeningPemilik) {
        this.nomorRekeningError = !this.validateNomorRekening(this.form.nomorRekeningPemilik);
      } else {
      }
    },
    handleNomorRekeningInput() {
      this.form.nomorRekeningPemilik = this.form.nomorRekeningPemilik.replace(/\D/g, "").slice(0, 10);

      if (this.form.nomorRekeningPemilik.length > 0) {
        this.form.belumPunyaRekening = false;
        this.form.kantorCabang = "";
      }
    },
    async fetchBranches() {
      try {
        const { kantorCabangOptions, kantorCabangAlamat } = await fetchBranches();
        this.kantorCabangOptions = kantorCabangOptions;
        this.kantorCabangAlamat = kantorCabangAlamat;
      } catch (error) {
        console.error('Gagal mengambil data kantor cabang:', error);
      }
    },
    async handleSubmit() {
      try {
        let kodeKantorCabang = this.form.kantorCabang;
        if (!kodeKantorCabang && this.form.nomorRekeningPemilik) {
          kodeKantorCabang = this.form.nomorRekeningPemilik.slice(0, 3);
        }

        const selectedBranch = this.kantorCabangOptions.find(branch => branch.value === kodeKantorCabang);
        this.requestData = {
          alamat_email: this.form.email,
          no_hp: this.form.phone,
          nama_fo: this.form.namaFundingOfficer,
          kategori_nasabah: Number("1"),
          // sumber_data_nasabah: Number(this.form.sumber),
          // sumber_data_nasabah_lainnya: this.form.sumberLainnya,
          tanggal: new Date().toISOString().split("T")[0],
          produk_yang_diinginkan: Number(this.form.produkDeposito),
          nomor_rekening_lama: this.form.nomorRekeningPemilik,
          kantor_cabang: selectedBranch ? selectedBranch.label : "",
          tujuan_simpanan: Number(this.form.tujuan),
          tujuan_simpanan_lainnya: this.form.tujuanLainnya,
          sumber_dana: Number(this.form.sumberDana),
          sumber_dana_lainnya: this.form.sumberDanaLainnya,
        };
        console.log("Data sementara disimpan:", this.requestData);
        this.isModalOpen = true;
      } catch (error) {
        console.error("Error saat membuka modal:", error);
      }
    },

    async handleModalConfirm() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      try {
        if (!this.requestData) {
          console.error("Error: Data request tidak ditemukan.");
          this.isSubmitting = false;
          return;
        }

        const finalData = {
          ...this.requestData,
          syarat_ketentuan: true,
          dek_pajak_indo: true,
          dek_pajak_amerika: true,
          dek_pajak_amerika_penduduk_us: null,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pembukaan-deposito-existing", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormEmailRequestDepositoNTB(this.form);
          fileStore.setUuid(response.data.uuid);
          fileStore.setEmail(this.requestData.alamat_email);
          fileStore.setNoHP(this.requestData.no_hp);
          console.log("UUID :", response.data.uuid);
          console.log("Email :", this.requestData.alamat_email);

          this.$router.push({ path: "/dashboard/verifikasiEmailPenempatanDepositoExisting" });

        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }

      } catch (error) {
        let subtitle = "";
        let modalTitle = "Terjadi Kesalahan";
        let modalIcon = "otp-error-illus.svg";
        let button1 = "Tutup";
        let button2 = "Hubungi Universal Care";

        const errorMessage = error.response && error.response.data && error.response.data.message;

        if (errorMessage) { 
          this.temporaryBanMessage = errorMessage; 

          if (errorMessage.replace(/ .*/, '') === "liveness" || errorMessage.replace(/ .*/, '') === "Verifikasi") {
            subtitle = `Verifikasi wajah Anda telah gagal melebihi batas maksimum. Untuk alasan keamanan, silakan coba kembali dalam waktu 24 jam. Jika Anda memerlukan bantuan segera, silakan hubungi Universal Care.`;
            modalTitle = "Verifikasi Wajah Gagal"; 
            modalIcon = "data-failed-illus.svg"; 
          } else if (errorMessage.replace(/ .*/, '') === "fraud") {
            subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
            modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
          } else { 
            subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 menit kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
            modalTitle = "Alamat Email Dibatasi Sementara";
            modalIcon = "data-failed-illus.svg";
          }
        } else {
          subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Pastikan koneksi internet Anda stabil untuk melanjutkan proses.";
        }

        this.isModalError = false; 
        this.showErrorModal(modalTitle, subtitle, button1, button2, modalIcon);
      } finally {
        this.isSubmitting = false;
      }
    },
  },

  watch: {
    'form.nomorRekeningPemilik'(newValue) {
      const cleanedValue = String(newValue).replace(/\D/g, '').slice(0, 10);
      if (newValue !== cleanedValue) {
        this.form.nomorRekeningPemilik = cleanedValue;
      }

      if (cleanedValue.length > 0) {
        this.nomorRekeningError = !this.validateNomorRekening(cleanedValue);
      } else {
        this.nomorRekeningError = false;
      }
    },
    "form.kantorCabang"(newVal) {
      if (!newVal) {
        this.form.alamatKantorCabang = "";
      } else {
        this.form.alamatKantorCabang = this.kantorCabangAlamat[newVal] || "Alamat tidak ditemukan";
      }
    },
    'form.memilikiRekening'(newVal, oldVal) {
      if (newVal == 2 || (oldVal === 1 && newVal !== 1)) {
        this.form.memilikiTabungan = '';
        this.form.belumPunyaRekening = false;
        this.form.produk = '';
        this.form.produkDeposito = '';
        this.form.nomorRekeningPemilik = '';
      }
    },
    'form.memilikiTabungan'(newVal) {
      if (newVal != 1) {
        this.form.belumPunyaRekening = false;
        this.form.produk = '';
        this.form.produkDeposito = '';
      } else {
        this.form.nomorRekeningPemilik = '';
      }
    },
    'form.belumPunyaRekening'(newVal) {
      if (!newVal) {
        this.form.produk = '';
        this.form.produkDeposito = '';
      }
    },
    'form.tujuan'(newVal) {
      if (newVal !== '0') {
        this.form.tujuanLainnya = '';
      }
    },
    'form.sumberDana'(newVal) {
      if (newVal !== '0') {
        this.form.sumberDanaLainnya = '';
      }
    },

  },

  mounted() {
    this.$emit("update-progress", 15);
    this.fetchBranches();
  },

  created() {
    // this.fetchData();
  },
};
</script>

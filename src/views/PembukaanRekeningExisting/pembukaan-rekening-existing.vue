<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Produk yang diinginkan*" id="produk" :isDropdown="true" v-model="form.produk"
      placeholder="Pilih Produk yang Anda Inginkan" :options="produkOptions" required />

    <FormField label="Pilih Jaringan Kantor*" id="kantorCabang" :isDropdown="true" v-model="form.kantorCabang"
      placeholder="Pilih Jaringan Kantor" :options="kantorCabangOptions" required />

    <div v-if="form.kantorCabang" class="mt-4">
      <FormField label="Alamat Jaringan Kantor Pembukaan Rekening" id="alamatKantorCabang"
        v-model="form.alamatKantorCabang" :readonly="true" />
    </div>

    <FormField label="Email*" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Alamat Email tidak valid. Silakan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid. Silakan periksa kembali.'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" />

    <RadioButtonChoose label="Tujuan Simpanan*" :options="tujuanOptions" v-model="form.tujuan" name="tujuan" />

    <div v-if="form.tujuan === '0'" class="">
      <FormField label="Tujuan Simpanan Lainnya*" id="tujuanLainnya" variant="alpha" v-model="form.tujuanLainnya"
        placeholder="Masukkan Tujuan Simpanan" />
    </div>

    <FormField label="Sumber Dana*" id="sumberDana" :isDropdown="true" v-model="form.sumberDana"
      :options="penghasilanOptions" placeholder="Pilih Sumber Dana Anda" />

    <div v-if="form.sumberDana === '0'" class="">
      <FormField label="Sumber Dana Lainnya *" id="sumberDanaLainnya" variant="alpha" v-model="form.sumberDanaLainnya"
        placeholder="Masukkan Sumber Penghasilan Lainnya" />
    </div>

    <FormField label="Nama Funding Officer (Opsional)" id="namaFundingOfficer" variant="alpha"
      v-model="form.namaFundingOfficer" placeholder="Masukkan Nama Funding Officer"
      hint="Funding Officer adalah petugas bank yang membantu pengelolaan simpanan Anda. Masukkan namanya jika ada, atau kosongkan jika tidak tahu atau belum pernah dilayani." />

    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
      <!-- <ButtonComponent @click.prevent="handleSubmit" :disabled="isSubmitting || isButtonDisabled">
        {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
      </ButtonComponent> -->
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
import axios from "axios";
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDataNasabahOptions, produkOptions, tujuanOptions, penghasilanOptions } from "@/data/option.js";
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/icon-deposito.svg";
import { fetchBranches } from '@/services/service.js';
import { handleFieldMixin } from "@/handler/handleField.js";

export default {
  mixins: [handleFieldMixin],
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    ReusableModal,
    RadioButtonChoose,
    ModalError,
  },
  data() {
    return {
      // fieldOrder: ['produk', 'kantorCabang', 'email', 'phone', 'tujuan', 'sumberDana'],
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_SAVING",
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      sumberDataNasabahOptions,
      produkOptions,
      tujuanOptions,
      penghasilanOptions,
      isModalOpen: false,
      isSubmitting: false,
      selectedCountryCode: "ID",
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
      emailError: false,
      phoneError: false,
      isModalError: false,
      isModalErrorEmail: false,
      isWhatsAppOpenCoolingDown: false,
      temporaryBanMessage: "",
      modalContent: [
        {
          label: "Konfirmasi Pembukaan Rekening Deposito Berjangka",
          icon: errorIcon,
          description:
            "Apakah Anda yakin ingin melanjutkan Pembukaan Rekening Deposito Baru?",
          buttonString1: "Tetap di Halaman ini",
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
      const isProdukFilled = !!this.form.produk;
      const isKantorCabangFilled = !!this.form.kantorCabang;
      const isEmailFilled = !!this.form.email;
      const isPhoneFilled = !!this.form.phone;
      const isTujuanFilled = !!this.form.tujuan;
      const isSumberDanaFilled = !!this.form.sumberDana;

      let isTujuanLainnyaFilled = true;
      if (this.form.tujuan === '0') {
        isTujuanLainnyaFilled = !!this.form.tujuanLainnya?.trim();
      }

      let isSumberDanaLainnyaFilled = true;
      if (this.form.sumberDana === '0') {
        isSumberDanaLainnya = !!this.form.sumberDanaLainnya?.trim();
      }

      const areAllRequiredFieldsFilled =
        isProdukFilled &&
        isKantorCabangFilled &&
        isEmailFilled &&
        isPhoneFilled &&
        isTujuanFilled &&
        isTujuanLainnyaFilled &&
        isSumberDanaFilled &&
        isSumberDanaLainnyaFilled;

      const isAnyValidationError = this.emailError || this.phoneError;

      return !areAllRequiredFieldsFilled || isAnyValidationError;
    },
  },
  watch: {
    "form.kantorCabang"(newVal) {
      this.form.alamatKantorCabang = this.kantorCabangAlamat[newVal] || "Alamat tidak ditemukan";
    },
    'form.produk'(newVal) {
      if (Number(newVal) === 2) {
        this.isModalError = true;
        this.form.produk = '';
      }
    },
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
      this.$router.push({ path: "/dashboard/penempatanDepositoExisting" });
    },
    handleCloseModal() {
      this.isModalErrorEmail = false;
    },

    handleModalClose() {
      this.isModalError = false;
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
      if (this.emailError) {
        console.error("Email tidak valid.");
        return;
      }

      if (this.phoneError) {
        console.error("Nomor telepon tidak valid.");
        return;
      }

      const selectedBranch = this.kantorCabangOptions.find(
        branch => branch.value === this.form.kantorCabang
      );
      try {
        this.requestData = {
          produk_yang_diinginkan: Number(this.form.produk),
          kode_kantor_cabang: this.form.kantorCabang,
          kantor_cabang: selectedBranch ? selectedBranch.label : "",
          alamat_email: this.form.email,
          no_hp: this.form.phone,
          tujuan_simpanan: Number(this.form.tujuan),
          sumber_dana: Number(this.form.sumberDana),
          nama_fo: this.form.namaFundingOfficer,
          kategori_nasabah: Number("1"),
          tanggal: new Date().toISOString().split("T")[0],
          // nomor_rekening_lama: this.form.nomorRekening,
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
      // this.isModalError = false;

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
          dek_pajak_amerika_penduduk_us: 12345,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pembukaan-existing", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormEmailRequestPembukaanRekening(this.form);
          fileStore.setUuid(response.data.uuid);
          fileStore.setEmail(this.requestData.alamat_email);
          fileStore.setNoHP(this.requestData.no_hp);

          this.$router.push({ path: "/dashboard/verifikasiEmailPembukaanRekeningExisting" });

        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }

      } catch (error) {
        let subtitle = "";
        let modalTitle = "Terjadi Kesalahan";
        let modalIcon = "otp-error-illus.svg";
        let button1 = "Tutup";
        let button2 = "Hubungi Universal Care";

        if (error.response && error.response.data && error.response.data.message) {
          this.temporaryBanMessage = error.response.data.message;
          subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 Menit Kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
          modalTitle = "Alamat Email Dibatasi Sementara";
          modalIcon = "data-failed-illus.svg"; // Ganti ikon jika sesuai
        } else {
          subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Pastikan koneksi internet Anda stabil untuk melanjutkan proses.";
        }
        if (error.response.data.message.replace(/ .*/, '') == "liveness") {
          subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
          modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
        } else if (error.response.data.message.replace(/ .*/, '') == "fraud") {
          subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
          modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
        }
        this.isModalError = false;
        this.showErrorModal(modalTitle, subtitle, button1, button2, modalIcon);
      } finally {
        this.isSubmitting = false;
      }
    }
  },

  async mounted() {
    this.$emit("update-progress", 15);
    this.fetchBranches();
  },

  created() {
    // this.fetchData();
  },
};
</script>

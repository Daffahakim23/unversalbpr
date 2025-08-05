<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Produk yang diinginkan*" id="produk" :isDropdown="true" v-model="form.produk"
      placeholder="Pilih Produk yang Anda Inginkan" :options="produkOptions" />

    <FormField label="Email*" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Alamat Email tidak valid. Silakan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid. Silakan periksa kembali.'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" />

    <FormField label="Nama Funding Officer (Opsional)" id="namaFundingOfficer" type="text" variant="alpha"
      v-model="form.namaFundingOfficer" placeholder="Masukkan Nama Funding Officer"
      hint="Funding Officer adalah petugas bank yang membantu pengelolaan simpanan Anda. Masukkan namanya jika ada, atau kosongkan jika tidak tahu atau belum pernah dilayani." />

    <RadioButtonChoose label="Dari mana Anda pertama kali mengetahui Universal BPR?*"
      :options="sumberDataNasabahOptions" v-model="form.sumber" name="sumber" />
    <div v-if="form.sumber === '0'">
      <FormField label="Lainnya*" id="otherSource" type="text" v-model="form.sumberLainnya"
        placeholder="Masukkan Sumber Informasi Lainnya" :required="true" />
    </div>

    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
  <ReusableModal :title="'Syarat dan Ketentuan'" :isOpen="isModalOpen" :apiUrl="apiUrl" @close="isModalOpen = false"
    @confirm="handleModalConfirm" />
  <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg" @close="isModalError = false"
    @buttonClick1="handleModalClose" @buttonClick2="handleToDeposito" />
  <ModalError :isOpen="isModalErrorEmail" :features="modalContentEmail" icon="otp-error-illus.svg"
    @close="isModalErrorEmail = false" @buttonClick1="handleCloseModal" @buttonClick2="openWhatsApp" />
</template>

<script>
import api from "@/API/api";
import axios from "axios";
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDataNasabahOptions, produkOptions, } from "@/data/option.js";
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/icon-deposito.svg";
import { handleFieldMixin } from "@/handler/handleField.js";

export default {
  mixins: [handleFieldMixin],
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    RadioButtonChoose,
    ReusableModal,
    ModalError,
  },
  data() {
    return {
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_SAVING",
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      sumberDataNasabahOptions,
      produkOptions,
      isModalOpen: false,
      selectedCountryCode: "ID",
      isSubmitting: false,
      emailError: false,
      phoneError: false,
      isModalError: false,
      isModalErrorEmail: false,
      isWhatsAppOpenCoolingDown: false,
      temporaryBanMessage: "",
      modalContent: [
        {
          label: "Konfirmasi Pembukaan Deposito",
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
      const isEmailFilled = !!this.form.email;
      const isPhoneFilled = !!this.form.phone;
      const isSumberFilled = !!this.form.sumber;

      let isAllBasicFieldsFilled =
        isProdukFilled &&
        isEmailFilled &&
        isPhoneFilled &&
        isSumberFilled;

      if (this.form.sumber === '0') {
        isAllBasicFieldsFilled = isAllBasicFieldsFilled && !!this.form.sumberLainnya?.trim();
      }

      const isAnyValidationError =
        this.emailError ||
        this.phoneError;

      return !isAllBasicFieldsFilled || isAnyValidationError;
    },
  },

  watch: {
    'form.produk'(newVal) {
      if (Number(newVal) === 2) {
        this.isModalError = true;
        this.form.produk = '';
      }
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
    showErrorModal(title, message, btnString1 = "OK", btnString2 = "Batal", icon = "otp-error-illus.svg") {
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
    },
    handleCloseModal() {
      // this.isModalErrorEmail = false;
      this.$router.push("/");
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
      try {
        this.requestData = {
          alamat_email: this.form.email,
          no_hp: this.form.phone,
          nama_fo: this.form.namaFundingOfficer,
          kategori_nasabah: Number(this.form.produk),
          sumber_data_nasabah: Number(this.form.sumber),
          sumber_data_nasabah_lainnya: this.form.sumberLainnya,
          tanggal: new Date().toISOString().split("T")[0],
          produk_yang_diinginkan: Number(this.form.produk),
          tanggal: new Date().toISOString().split("T")[0],
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
          dek_pajak_amerika_penduduk_us: 123434,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pembukaan", finalData, {
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

          this.$router.push({ path: "/dashboard/verifikasiEmailPembukaanRekeningNTB" });

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
          subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 menit kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
          modalTitle = "Alamat Email Dibatasi Sementara";
          modalIcon = "data-failed-illus.svg";
        } else {
          subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Pastikan koneksi internet Anda stabil untuk melanjutkan proses.";
        }
        if (error.response.data.message.replace(/ .*/, '') === "Verifikasi") {
          subtitle = `Verifikasi wajah Anda telah gagal melebihi batas maksimum. Untuk alasan keamanan, silakan coba kembali dalam waktu 24 jam. Jika Anda memerlukan bantuan segera, silakan hubungi Universal Care.`;
          modalTitle = "Alamat Email Dibatasi Sementara";
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
  mounted() {
    this.$emit("update-progress", 15);
  },
  created() {
  },
};
</script>
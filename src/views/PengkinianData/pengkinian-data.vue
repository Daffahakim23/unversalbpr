<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Lengkap" id="namaLengkap" v-model="form.namaLengkap" placeholder="Masukkan Nama Lengkap Anda"
      :hint="namaLengkapError ? 'Nama lengkap tidak valid, silakan periksa kembali' : ''" :error="namaLengkapError"
      @blur="handleNamaLengkapBlur" variant="alpha" required />

    <!-- <FormField label="Nomor Rekening*" id="nomorRekening" type="text" v-model="form.nomorRekening" variant="numeric"
      :maxlength="10" placeholder="Masukkan Nomor Rekening Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" /> -->
    <!-- <FormField class="mb-2" label="Nomor Rekening Tabungan Universal*" id="nomorRekening" v-model="form.nomorRekening"
      variant="numeric" :maxlength="10" placeholder="Masukkan Nomor Rekening" required @blur="handleNomorRekeningBlur"
      :error="nomorRekeningError"
      :hint="nomorRekeningError ? 'Nomor rekening yang Anda masukkan tidak valid. Silakan periksa kembali.' : ''" /> -->

    <FormField class="mb-2" label="Nomor Rekening Tabungan Universal*" id="nomorRekening" v-model="form.nomorRekening"
      variant="numeric" :maxlength="10" placeholder="Masukkan Nomor Rekening" required @input="handleNomorRekeningInput"
      @blur="handleNomorRekeningBlur" :error="nomorRekeningError"
      :hint="nomorRekeningError ? 'Nomor rekening tidak valid. Silakan periksa kembali' : ''" />


    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Alamat Email tidak valid. Silakan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      required :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid. Silakan periksa kembali.'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" />

    <RadioButtonChoose label="Tanda Pengenal*" name="tandaPengenal" id="tandaPengenal" :isDropdown="true"
      v-model="form.tandaPengenal" placeholder="Pilih Tanda Pengenal Anda" :options="tandaPengenalOptions" required />

    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>

  <ReusableModal title='Syarat dan Ketentuan Deposito' :isOpen="isModalOpen" :apiUrl="apiUrl"
    @close="isModalOpen = false" @confirm="handleModalConfirm" />

  <ModalError :isOpen="isModalErrorEmail" :features="modalContentEmail" icon="otp-error-illus.svg"
    @close="isModalErrorEmail = false" @buttonClick1="handleCloseModal" @buttonClick2="openWhatsApp" />
</template>

<script>
import axios from "axios";
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/icon-deposito.svg";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { tandaPengenalOptions } from "@/data/option.js";
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
      form: new FormModelRequestEmailVerification(),
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_SAVING",
      touched: {
        email: false,
        phone: false,
        namaLengkap: false,
      },
      tandaPengenalOptions,
      isSubmitting: false,
      emailError: false,
      phoneError: false,
      nomorRekeningError: false,
      selectedCountryCode: "ID",
      namaLengkapError: false,
      isModalOpen: false,
      isModalError: false,
      isModalErrorEmail: false,
      isWhatsAppOpenCoolingDown: false,
      validBranchCodes: [],
      isFetchingBranches: false,
      modalContent: [
        {
          label: "Konfirmasi Pembukaan Deposito",
          icon: errorIcon,
          description:
            "Apakah Anda yakin ingin melanjutkan pembukaan deposito?",
          buttonString1: "Tetap Dihalaman Ini",
          buttonString2: "Pembukaan Deposito",
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
      const namaLengkapValid = this.form.namaLengkap && /^[^\d]+$/.test(this.form.namaLengkap);
      const nomorRekeningValid = this.form.nomorRekening && this.validateNomorRekening(this.form.nomorRekening);
      return !(namaLengkapValid && !this.emailError && !this.phoneError && this.form.tandaPengenal && nomorRekeningValid && !this.nomorRekeningError);
    },
  },

  watch: {
    'form.nomorRekening'(newValue) {
      const cleanedValue = String(newValue).replace(/\D/g, '').slice(0, 10);
      if (newValue !== cleanedValue) {
        this.form.nomorRekening = cleanedValue;
      }

      if (cleanedValue.length > 0) {
        this.nomorRekeningError = !this.validateNomorRekening(cleanedValue);
      } else {
        this.nomorRekeningError = false;
      }
    },
  },

  methods: {
    async fetchBranchCodes() {
      this.isFetchingBranches = true;
      try {
        const response = await api.get("/list-branch", {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200 && response.data && response.data.branch) {
          this.validBranchCodes = response.data.branch.map(branch => branch.branch_code);
          console.log("Valid Branch Codes:", this.validBranchCodes);
        } else {
          console.error("Gagal mengambil daftar cabang, status:", response.status, "data:", response.data);
          // Handle error, maybe show an alert to the user
        }
      } catch (error) {
        console.error("Error fetching branch codes:", error);
        // Handle network/server error
      } finally {
        this.isFetchingBranches = false;
      }
    },

    validateNomorRekening(nomorRekening) {
      // Pastikan panjang 10 digit
      if (!/^\d{10}$/.test(nomorRekening)) {
        return false;
      }

      // Ambil 3 digit pertama
      const branchCode = nomorRekening.substring(0, 3);

      // Periksa apakah branchCode ada di daftar validBranchCodes
      const isValidBranchCode = this.validBranchCodes.includes(branchCode);

      if (!isValidBranchCode) {
        console.warn(`Branch code '${branchCode}' from rekening number is not valid.`);
      }

      return isValidBranchCode; // Mengembalikan true hanya jika panjang dan branch code valid
    },

    handleNomorRekeningBlur() {
      if (this.form.nomorRekening) {
        this.nomorRekeningError = !this.validateNomorRekening(this.form.nomorRekening);
      } else {
        this.nomorRekeningError = false;
      }
    },
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
    validateNamaLengkap(namaLengkap) {
      return /^[^\d]+$/.test(namaLengkap);
    },
    handleNamaLengkapBlur() {
      this.touched.namaLengkap = true;
      if (this.form.namaLengkap) {
        this.namaLengkapError = !this.validateNamaLengkap(this.form.namaLengkap);
      }
    },

    handleCloseModal() {
      // this.isModalErrorEmail = false;
      this.$router.push("/");
    },

    handleModalClose() {
      this.isModalError = false;
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
          nama_lengkap: this.form.namaLengkap,
          nomor_rekening: this.form.nomorRekening,
          jenis_identitas: Number(this.form.tandaPengenal),
          no_hp: this.form.phone,
          alamat_email: this.form.email,
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

        const response = await api.post("/pengkinian-data", finalData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormPengkinianData(this.form);
          fileStore.setUuid(response.data.uuid);
          fileStore.setEmail(this.requestData.alamat_email);
          fileStore.setNoHP(this.requestData.no_hp);
          console.log("UUID :", response.data.uuid);
          console.log("Email :", this.requestData.alamat_email);
          console.log("Nomor Handphone :", this.requestData.no_hp);

          this.$router.push({ path: "/dashboard/uploadDokumenPengkinianData" });

        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }

      } catch (error) {
        console.error("Terjadi error saat mengirim data:", error); // Log keseluruhan objek error
        if (error.response) {
          console.error("Detail error response:", error.response.data); // Log detail response dari server (jika ada)
          console.error("Status error response:", error.response.status);
          console.error("Headers error response:", error.response.headers);
        } else if (error.request) {
          console.error("Tidak ada response dari server:", error.request); // Log jika tidak ada response
        } else {
          console.error("Error saat menyiapkan request:", error.message); // Log error saat menyiapkan request
        }

        let subtitle = "";
        let modalTitle = "Terjadi Kesalahan";
        let modalIcon = "otp-error-illus.svg";
        let button1 = "Tutup";
        let button2 = "Hubungi Universal Care";

        if (error.response && error.response.data && error.response.data.message) {
          this.temporaryBanMessage = error.response.data.message;
          subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 Menit Kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
          modalTitle = "Alamat Email Dibatasi Sementara";
          modalIcon = "data-failed-illus.svg";
        } else {
          subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Pastikan koneksi internet Anda stabil untuk melanjutkan proses.";
        }
        if (error.response.data.message.replace(/ .*/, '') === "liveness" || error.response.data.message.replace(/ .*/, '') === "Verifikasi") {
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
    },
  },

  mounted() {
    this.$emit("update-progress", 15);
    this.fetchBranchCodes();
  },

  created() {
    // this.fetchData();
  },
};
</script>

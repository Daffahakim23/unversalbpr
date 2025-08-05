<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Pilih Produk yang Diinginkan*" id="produk" :isDropdown="true" v-model="form.produk"
      placeholder="Pilih Produk yang Anda Inginkan" :options="produkTabunganOptions" required />

    <FormField label="Pilih Produk Deposito*" id="produkDeposito" :isDropdown="true" v-model="form.produkDeposito"
      placeholder="Pilih Produk Deposito yang Anda Inginkan" :options="produkDepositoOptions" required />

    <FlagBox type="info" closable class="mb-4">
      <p class="text-sm font-normal">Informasi mengenai Produk dan Layanan dapat diakses melalui website
        universalbpr.co.id atau dengan mengklik tombol "Info Produk" di bagian atas halaman ini.</p>
    </FlagBox>

    <FormField label="Email*" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Alamat Email tidak valid. Silakan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      required :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid. Silakan periksa kembali.'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" />

    <FormField label="Nama Funding Officer (Opsional)" id="namaFundingOfficer" type="text" variant="alpha"
      v-model="form.namaFundingOfficer" placeholder="Masukkan Nama Funding Officer"
      hint="Funding Officer Adalah petugas bank yang membantu pengelolaan simpanan Anda. Masukkan namanya jika ada, atau kosongkan jika tidak tahu atau belum pernah dilayani." />

    <RadioButtonChoose label="Dari mana Anda pertama kali mengetahui Universal BPR?*"
      :options="sumberDataNasabahOptions" v-model="form.sumber" name="sumber" />
    <div v-if="form.sumber === '0'">
      <FormField label="Lainnya *" id="otherSource" type="text" v-model="form.sumberLainnya"
        placeholder="Masukkan Sumber Informasi Lainnya" required />
    </div>

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
import api from "@/API/api";
import FormField from "@/components/FormField.vue";
import FlagBox from "@/components/flagbox.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDataNasabahOptions, produkDepositoOptions, produkTabunganOptions } from "@/data/option.js";
import ModalError from "@/components/ModalError.vue";
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
  },
  data() {
    return {
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_DEPOSIT",
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      sumberDataNasabahOptions,
      produkDepositoOptions,
      produkTabunganOptions,
      selectedProduk: "",
      selectedCountryCode: "ID",
      isModalOpen: false,
      isSubmitting: false,
      emailError: false,
      phoneError: false,
      isModalErrorEmail: false,
      isWhatsAppOpenCoolingDown: false,
      temporaryBanMessage: "",
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
      // const emailValid = this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      // const phoneValid = this.form.phone && /^(8)\d{8,12}$/.test(this.form.phone);
      const produkTabunganTerisi = !!this.form.produk;
      const produkDepositoTerisi = !!this.form.produkDeposito;
      const sumberTerisi = !!this.form.sumber;

      if (this.form.sumber === "0") {
        return !(!this.emailError && !this.phoneError && produkTabunganTerisi && produkDepositoTerisi && sumberTerisi && this.form.sumberLainnya?.trim());
      }
      return !(!this.emailError && !this.phoneError && produkTabunganTerisi && produkDepositoTerisi && sumberTerisi);
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
    // openWhatsApp() {
    //   if (this.whatsappContact.whatsapp) {
    //     window.open(this.getWhatsAppLink(this.whatsappContact.whatsapp), '_blank');
    //   }
    // },
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
    handleCloseModal() {
      // this.isModalErrorEmail = false;
      this.$router.push("/");
    },

    async handleSubmit() {
      try {
        this.requestData = {
          alamat_email: this.form.email,
          no_hp: this.form.phone,
          nama_fo: this.form.namaFundingOfficer,
          kategori_nasabah: Number("1"),
          sumber_data_nasabah: Number(this.form.sumber),
          sumber_data_nasabah_lainnya: this.form.sumberLainnya,
          tanggal: new Date().toISOString().split("T")[0],
          produk_yang_diinginkan: Number(this.form.produk),
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
          dek_pajak_amerika: false,
          dek_pajak_amerika_penduduk_us: null,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pembukaan-deposito", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormEmailRequestDepositoNTB(this.form);
          fileStore.setUuid(response.data.uuid);
          fileStore.setNoHP(this.requestData.no_hp);
          fileStore.setEmail(this.requestData.alamat_email);
          console.log("UUID :", response.data.uuid);
          console.log("Email :", this.requestData.alamat_email);
          console.log("Nomor Handphone :", this.requestData.no_hp);

          this.$router.push({ path: "/dashboard/verifikasiEmailPenempatanDepositoNTB" });

        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }

      }
      // catch (error) {
      //   let subtitle = "";
      //   let modalTitle = "Terjadi Kesalahan";
      //   let modalIcon = "otp-error-illus.svg";
      //   let button1 = "Tutup";
      //   let button2 = "Hubungi Universal Care";

      //   if (error.response && error.response.data && error.response.data.message) {
      //     this.temporaryBanMessage = error.response.data.message;
      //     subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 menit kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
      //     modalTitle = "Alamat Email Dibatasi Sementara";
      //     modalIcon = "data-failed-illus.svg";
      //   } else {
      //     subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Pastikan koneksi internet Anda stabil untuk melanjutkan proses.";
      //   }
      //   if (error.response.data.message.replace(/ .*/, '') === "liveness" || error.response.data.message.replace(/ .*/, '') === "Verifikasi Wajah") {
      //     subtitle = `Verifikasi wajah Anda telah gagal melebihi batas maksimum. Untuk alasan keamanan, silakan coba kembali dalam waktu 24 jam. Jika Anda memerlukan bantuan segera, silakan hubungi Universal Care.`;
      //     modalTitle = "Alamat Email Dibatasi Sementara";
      //   } else if (error.response.data.message.replace(/ .*/, '') == "fraud") {
      //     subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
      //     modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
      //   }
      //   this.isModalError = false;
      //   this.showErrorModal(modalTitle, subtitle, button1, button2, modalIcon);
      // } 
      catch (error) {
        let subtitle = "";
        let modalTitle = "Terjadi Kesalahan";
        let modalIcon = "otp-error-illus.svg";
        let button1 = "Tutup";
        let button2 = "Hubungi Universal Care";

        // Safely get the error message if it exists, otherwise it's an empty string
        const errorMessage = error?.response?.data?.message || '';
        const firstWordOfMessage = errorMessage.replace(/ .*/, '');

        // Check for specific error messages like 'liveness' or 'Verifikasi Wajah' first
        if (firstWordOfMessage === "liveness" || firstWordOfMessage === "Verifikasi") {
          subtitle = `Verifikasi wajah Anda telah gagal melebihi batas maksimum. Untuk alasan keamanan, silakan coba kembali dalam waktu 24 jam. Jika Anda memerlukan bantuan segera, silakan hubungi Universal Care.`;
          modalTitle = "Verifikasi Wajah Dibatasi Sementara"; // Changed from "Alamat Email Dibatasi Sementara" for clarity
          modalIcon = "data-failed-illus.svg"; // Assuming you want a general data failed icon for this
        }
        // Check for 'fraud' error
        else if (firstWordOfMessage === "fraud") {
          subtitle = `Verifikasi data Anda telah gagal melebihi batas maksimum. Untuk alasan keamanan, Anda tidak dapat melakukan pengisian e-form kembali selama 24 jam ke depan.`;
          modalTitle = "Verifikasi Data Gagal Sudah Mencapai Limit";
          modalIcon = "data-failed-illus.svg"; // Assuming you want a general data failed icon for this
        }
        // Handle OTP error or other structured API errors
        else if (errorMessage) { // If there is a message from the API response
          // Assuming the error.response.data.message itself indicates the OTP limit
          // You might want to refine this check if 'message' contains other things
          if (errorMessage.includes("batas maksimum")) { // A more robust check for OTP limit
            this.temporaryBanMessage = errorMessage; // Store the full message if needed
            subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 menit ke depan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
            modalTitle = "Alamat Email Dibatasi Sementara";
            modalIcon = "data-failed-illus.svg";
          } else {
            // For any other specific API message not covered by liveness/fraud
            subtitle = errorMessage; // Display the actual error message from the backend
            modalIcon = "data-failed-illus.svg"; // Or a more generic error icon
          }
        }
        // Fallback for generic errors (network issues, etc.)
        else {
          subtitle = "Terjadi kesalahan saat melanjutkan proses. Pastikan koneksi internet Anda stabil atau coba lagi nanti.";
          modalIcon = "otp-error-illus.svg"; // Default icon for generic errors
          button2 = "Hubungi Universal Care"; // Keep the button for generic errors
        }

        this.isModalError = true; // Make sure the modal is set to open
        this.showErrorModal(modalTitle, subtitle, button1, button2, modalIcon);
      }
      finally {
        this.isSubmitting = false;
      }
    },
  },

  mounted() {
    this.$emit("update-progress", 15);
  },
};
</script>
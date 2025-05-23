<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Lengkap" id="namaLengkap" v-model="form.namaLengkap" placeholder="Masukkan Nama Lengkap Anda"
      :hint="namaLengkapError ? 'Nama lengkap tidak valid, silahkan periksa kembali' : ''" :error="namaLengkapError"
      @blur="handleNamaLengkapBlur" variant="alpha" required />

    <FormField label="Nomor Rekening*" id="nomorRekening" type="text" v-model="form.nomorRekening"
      placeholder="Masukkan Nomor Rekening Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />


    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Email tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      required :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid, silahkan periksa kembali ( Contoh : 821xxxxxx )'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif ( Contoh : 821xxxxxx )'" :error="phoneError"
      @blur="handlePhoneBlur" />

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

export default {
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
      selectedCountryCode: "ID",
      namaLengkapError: false,
      isModalOpen: false,
      isModalError: false,
      isModalErrorEmail: false,
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
      const emailValid = this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      const phoneValid = this.form.phone && /^(8(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,12}$/.test(this.form.phone);
      const namaLengkapValid = this.form.namaLengkap && /^[^\d]+$/.test(this.form.namaLengkap);
      return !(namaLengkapValid && emailValid && phoneValid && this.form.tandaPengenal && this.form.nomorRekening);
    },
  },

  methods: {
    // async handleSubmit() {
    //   try {
    //     this.$router.push({ path: "/dashboard/uploadDokumenPengkinianData" });
    //   } catch (error) {
    //     console.error("Navigation error:", error);
    //   }
    // },    
    getWhatsAppLink(number) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        return `https://wa.me/${number}`;
      } else {
        return `https://web.whatsapp.com/send?phone=${number}`;
      }
    },
    openWhatsApp() {
      if (this.whatsappContact.whatsapp) {
        window.open(this.getWhatsAppLink(this.whatsappContact.whatsapp), '_blank');
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
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    // validatePhone(phone) {
    //   return /^((08|8)(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,12}$/.test(phone);
    // },
    validatePhone(phone) {
      return /^(8)\d{6,12}$/.test(phone) && !phone.startsWith('0');
    },
    handleEmailBlur() {
      this.touched.email = true;
      if (this.form.email) {
        this.emailError = !this.validateEmail(this.form.email);
      }
    },
    handlePhoneBlur() {
      this.touched.phone = true;
      if (this.form.phone) {
        this.phoneError = !this.validatePhone(this.form.phone);
      }
    },
    handleCloseModal() {
      this.isModalErrorEmail = false;
    },

    handleModalClose() {
      this.isModalError = false;
    },

    // async fetchData() {
    //   try {
    //     const response = await axios.get("https://testapi.io/api/daffa/request-email-verification");
    //     console.log("Response data:", response.data);
    //     const data = Array.isArray(response.data) ? response.data[0] : response.data;
    //     if (data) {
    //       Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },

    // async handleSubmitt() {
    //   try {
    //     const requestData = {
    //       nama_lengkap: this.form.namaLengkap,
    //       nomor_rekening: this.form.nomorRekening,
    //       jenis_identitas: Number(this.form.tandaPengenal),
    //       no_hp: this.form.phone,
    //       alamat_email: this.form.email,
    //       tanggal: new Date().toISOString().split("T")[0],
    //     };

    //     console.log("Request data:", requestData);

    //     const response = await api.post("/pengkinian-data", requestData, {
    //       headers: { 'Content-Type': 'application/json' }
    //     });

    //     console.log("Response code:", response.status);
    //     console.log("Response data:", response.data);
    //     console.log(requestData);

    //     if (response.status === 200) {
    //       const fileStore = useFileStore();
    //       fileStore.setFormPengkinianData(this.form);
    //       fileStore.setEmail(requestData.alamat_email);
    //       fileStore.setUuid(response.data.uuid);
    //       fileStore.setNoHP(requestData.no_hp);
    //       window.scrollTo(0, 0);
    //       console.log("Data berhasil dikirim:", response.data);
    //       this.$router.push({ path: "/dashboard/uploadDokumenPengkinianData" });

    //     } else {
    //       console.error("Gagal mengirim data, status:", response.status);
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       console.error("Error response data:", error.response.data);
    //     }
    //     console.error("Error saat mengirim data:", error);
    //   }
    // },
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

        const response = await api.post("/pengkinian-data", finalData, { // Menggunakan finalData yang sudah dimodifikasi
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
          subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Mohon untuk menghubungi Universal Care untuk bantuan lebih lanjut.";
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
    // this.fetchBranches();
  },

  created() {
    // this.fetchData();
  },
};
</script>

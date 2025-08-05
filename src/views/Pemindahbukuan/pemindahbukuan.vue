<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Tanggal Pengajuan Transafer*" id="tanggalPengajuan" type="date" v-model="form.tanggalPengajuan"
      placeholder="Pilih Tanggal Lahir Beneficial Owner Anda" />

    <FormField label="Email*" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Alamat Email tidak valid. Silakan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phonePengirim" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid.Silakan periksa kembali.'
        : form.phonePengirim?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" />

    <!-- <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid. Silakan periksa kembali.'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" /> -->


    <FormField label="Sumber Dana" id="sumberDana" :isDropdown="true" v-model="form.sumberDana"
      :options="sumberDanaOptions" placeholder="Pilih Sumber Dana Anda" />

    <div v-if="form.sumberDana === 'lainnya'" class="">
      <FormField label="Sumber Dana Lainnya *" id="sumberDanaLainnya" type="text" v-model="form.sumberDanaLainnya"
        placeholder="Masukkan Sumber Dana Lainnya" />
    </div>

    <FormField class="mb-2" label="Nomor Rekening Tabungan Universal*" id="nomorRekening"
      v-model="form.nomorRekeningPengirim" variant="numeric" :maxlength="10" placeholder="Masukkan Nomor Rekening"
      required @input="handleNomorRekeningInput" @blur="handleNomorRekeningBlur" :error="nomorRekeningError"
      :hint="nomorRekeningError ? 'Nomor rekening tidak valid. Silakan periksa kembali' : ''" />

    <FormField label="Nama Pemilik Sumber Dana*" id="namaLengkap" variant="alpha" v-model="form.namaLengkapPengirim"
      :maxlength="50" placeholder="Masukkan Nama Pemilik Sumber Dana" />

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
import { FormModelPengirimPemindahbukuan } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { useRoute, useRouter } from 'vue-router';
import { sumberDanaOptions } from "@/data/option.js";
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
    ModalError,
  },
  data() {
    return {
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_SAVING",
      form: new FormModelPengirimPemindahbukuan(),
      touched: {
        email: false,
        phone: false,

        phonePengirim: false,
      },
      sumberDanaOptions,
      isSubmitting: false,
      emailError: false,
      phoneError: false,
      phonePengirimError: false,
      selectedCountryCode: "ID",
      isModalOpen: false,
      isModalErrorEmail: false,
      isWhatsAppOpenCoolingDown: false,
      nomorRekeningError: false,
      validBranchCodes: [],
      isFetchingBranches: false,
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
      const phoneValid = this.form.phonePengirim && /^(8)\d{6,12}$/.test(this.form.phonePengirim);
      const sumberDanaValid = this.form.sumberDana;
      const sumberDanaLainnyaValid = this.form.sumberDana === 'lainnya' ? !!this.form.sumberDanaLainnya : true;
      // const nomorRekeningValid = !!this.form.nomorRekeningPengirim;
      const nomorRekeningValid = this.form.nomorRekeningPengirim && this.validateNomorRekening(this.form.nomorRekeningPengirim);
      const namaPemilikSumberDanaValid = !!this.form.namaLengkapPengirim;
      const tanggalPengajuanValid = !!this.form.tanggalPengajuan;

      return !(
        emailValid &&
        phoneValid &&
        sumberDanaValid &&
        sumberDanaLainnyaValid &&
        nomorRekeningValid &&
        namaPemilikSumberDanaValid &&
        tanggalPengajuanValid
      );
    },
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const fileStore = useFileStore();

    return { route, router, fileStore };
  },

  watch: {
    nomorRekeningError(newValue, oldValue) {
      console.log(`nomorRekeningError changed from ${oldValue} to ${newValue}`);
      if (newValue) {
        console.log("Nomor Rekening is now in an error state.");
      } else {
        console.log("Nomor Rekening is no longer in an error state.");
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

    handleNomorRekeningInput() {
      this.form.nomorRekeningPengirim = this.form.nomorRekeningPengirim.replace(/\D/g, "").slice(0, 10);

      if (this.form.nomorRekeningPengirim.length > 0) {
        this.nomorRekeningError = this.form.nomorRekeningPengirim.length !== 10;
      } else {
        this.nomorRekeningError = false;
      }

      if (this.form.nomorRekeningPengirim.length > 0) {
        this.form.belumPunyaRekening = false;
        this.form.kantorCabang = "";
      }
    },

    // handleNomorRekeningBlur() {
    //   if (this.form.nomorRekeningPengirim) {
    //     this.nomorRekeningError = !this.validateNomorRekening(this.form.nomorRekeningPengirim);
    //   } else {
    //     this.nomorRekeningError = false;
    //   }
    // },

    handleNomorRekeningBlur() {
      if (this.form.nomorRekeningPengirim) {
        this.nomorRekeningError = !this.validateNomorRekening(this.form.nomorRekeningPengirim);
      } else {
        this.nomorRekeningError = false; // Jika kosong, tidak ada error format
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
    handleCloseModal() {
      // this.isModalErrorEmail = false;
      this.$router.push("/");
    },
    validatePhone(phone) {
      return /^(8)\d{6,12}$/.test(phone) && !phone.startsWith('0');
    },
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    handleEmailBlur() {
      this.touched.email = true;
      if (this.form.email) {
        this.emailError = !this.validateEmail(this.form.email);
      }
    },
    handlePhoneBlur() {
      this.touched.phone = true;
      if (this.form.phonePengirim) {
        // ✨ Hapus '0' di awal secara otomatis saat blur, jika ada
        let cleanedPhone = this.form.phonePengirim.startsWith('0')
          ? this.form.phonePengirim.substring(1) // Hapus 0 pertama
          : this.form.phonePengirim;

        // Update form model agar perubahan terlihat jika pengguna tidak ketik '8'
        this.form.phonePengirim = cleanedPhone;

        // Lakukan validasi pada nomor yang sudah bersih
        this.phoneError = !this.validatePhone(cleanedPhone);
      } else {
        this.phoneError = false;
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
      try {
        this.requestData = {
          alamat_email: this.form.email,
          no_hp: this.form.phonePengirim,
          sumber_dana: Number(this.form.sumberDana),
          sumber_dana_lainnya: this.form.sumberDanaLainnya,
          nomor_rekening: this.form.nomorRekeningPengirim,
          nama_lengkap: this.form.namaLengkapPengirim,
          tanggal: this.form.tanggalPengajuan
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
          uuid: this.fileStore.uuid,
          syarat_ketentuan: true,
          syarat_cutoff: true,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pemindah-bukuan", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormDataPengirimPemindahbukuan(this.form);
          fileStore.setEmail(this.requestData.alamat_email);
          fileStore.setNoHP(this.requestData.no_hp);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/verifikasiEmailPemindahbukuan" });
        } else {
          console.error("Gagal mengirim data, status:", response.status);
          // Ini adalah fallback yang mungkin juga perlu diisi dengan pesan default
          let subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Pastikan koneksi internet Anda stabil untuk melanjutkan proses.";
          let modalTitle = "Terjadi Kesalahan";
          let modalIcon = "otp-error-illus.svg";
          let button1 = "Tutup";
          let button2 = "Hubungi Universal Care";
          this.isModalError = false; // Asumsi ini ada di data()
          this.showErrorModal(modalTitle, subtitle, button1, button2, modalIcon);
        }

      } catch (error) {
        let subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Pastikan koneksi internet Anda stabil untuk melanjutkan proses."; // Default subtitle
        let modalTitle = "Terjadi Kesalahan"; // Default title
        let modalIcon = "otp-error-illus.svg"; // Default icon
        let button1 = "Tutup";
        let button2 = "Hubungi Universal Care";

        // ✨ MODIFIKASI PENTING DI SINI: Gunakan optional chaining (?.)
        const errorMessage = error.response?.data?.message; // Ambil pesan jika ada, kalau tidak undefined

        if (errorMessage) { // Jika errorMessage ada (bukan undefined/null)
          this.temporaryBanMessage = errorMessage; // Simpan pesan lengkap jika diperlukan

          const cleanedMessage = errorMessage.replace(/ .*/, ''); // Ambil kata pertama

          if (cleanedMessage === "liveness" || cleanedMessage === "Verifikasi") {
            subtitle = `Verifikasi wajah Anda telah gagal melebihi batas maksimum. Untuk alasan keamanan, silakan coba kembali dalam waktu 24 jam. Jika Anda memerlukan bantuan segera, silakan hubungi Universal Care.`;
            modalTitle = "Verifikasi Gagal"; // Ubah sesuai pesan baru
            modalIcon = "data-failed-illus.svg";
          } else if (cleanedMessage === "fraud") {
            subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
            modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
            modalIcon = "data-failed-illus.svg"; // Sesuaikan jika ini ikon yang berbeda
          } else if (errorMessage.includes("batas maksimum") || errorMessage.includes("sementara untuk pengiriman OTP")) {
            // Tangani kasus specific OTP error message yang lebih panjang
            subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 menit kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
            modalTitle = "Alamat Email Dibatasi Sementara";
            modalIcon = "data-failed-illus.svg";
          } else {
            // Fallback untuk pesan error dari API yang tidak cocok dengan kondisi di atas
            subtitle = errorMessage;
          }
        }
        // Jika error tidak memiliki response.data.message, subtitle tetap default.

        this.isModalError = false; // Ini perlu diatur ke true jika Anda ingin menampilkan modal
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
  },
};
</script>

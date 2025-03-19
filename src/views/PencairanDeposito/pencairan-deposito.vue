<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nomor Rekening Deposito*" id="nomorRekeningDeposito" type="number"
      v-model="form.nomorRekeningDeposito" placeholder="Masukkan Nomor Rekening Deposito Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />
    <!-- 
    <FormField label="Nama Lengkap*" id="namaLengkap" type="text" v-model="form.namaLengkap"
      placeholder="Masukkan Nama Lengkap Anda" /> -->

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode"
      :hint="phoneError ? 'Nomor handphone tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi nomor handphone yang aktif'"
      :error="phoneError" @blur="handlePhoneBlur" />

    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Email tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      :error="emailError" @blur="handleEmailBlur" />

    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Konfirmasi Email
      </ButtonComponent>
    </div>
  </form>
  <ReusableModal :title="'Syarat dan Ketentuan'" :isOpen="isModalOpen" :apiUrl="apiUrl" @close="isModalOpen = false"
    @confirm="handleModalConfirm" />
</template>

<script>
import axios from "axios";
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import ButtonComponent from "@/components/button.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { tandaPengenalOptions } from "@/data/option.js";
import ReusableModal from "@/components/ModalT&C.vue";

export default {
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    ReusableModal,
  },
  data() {
    return {
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_CLOSE_DEPOSIT",
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      tandaPengenalOptions,
      isModalOpen: false,
      selectedCountryCode: "ID",
      isSubmitting: false,
      emailError: false,
      phoneError: false,
    };
  },

  computed: {
    isButtonDisabled() {
      const emailValid =
        this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);

      const phoneValid =
        this.form.phone && /^(08(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,9}$/.test(this.form.phone);
      if (this.form.sumber === "lainnya") {
        return !this.form.sumberLainnya.trim();
      }
      return !(emailValid && phoneValid);
    },
  },

  methods: {
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    handleEmailBlur() {
      this.touched.email = true;
      if (this.form.email) {
        this.emailError = !this.validateEmail(this.form.email);
      }
    },
    validatePhone(phone) {
      return /^(08(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,9}$/.test(phone);
    },
    handlePhoneBlur() {
      this.touched.phone = true;
      if (this.form.phone) {
        this.phoneError = !this.validatePhone(this.form.phone);
      }
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
          // nama_lengkap: this.form.namaLengkap,
          nomor_deposito: this.form.nomorRekeningDeposito,
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

        const response = await api.post("/pencairan-deposito", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormEmailRequestPencairanDeposito(this.form);
          fileStore.setUuid(response.data.uuid);
          fileStore.setEmail(this.requestData.alamat_email);
          fileStore.setNoHP(this.requestData.no_hp);
          console.log("UUID :", response.data.uuid);
          console.log("Email :", this.requestData.alamat_email);
          console.log("Nomor Handphone :", this.requestData.no_hp);

          this.$router.push({ path: "/dashboard/verifikasiEmailPencairanDeposito" });

        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }

      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
        console.error("Error saat mengirim data:", error);
      } finally {
        this.isSubmitting = false;
      }
    }
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

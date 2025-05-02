<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Lengkap*" id="namaLengkap" type="text" v-model="form.namaLengkap"
      placeholder="Masukkan Nama Lengkap Anda" />

    <FormField label="Nomor Rekening*" id="nomorRekening" type="text" v-model="form.nomorRekening"
      placeholder="Masukkan Nomor Rekening Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />


    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Email tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      required :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone *" id="phone" type="phone" v-model="form.phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode"
      :hint="phoneError ? 'Nomor handphone tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi nomor handphone yang aktif'"
      :error="phoneError" @blur="handlePhoneBlur" />

    <RadioButtonChoose label="Pilih Tanda Pengenal*" name="tandaPengenal" id="tandaPengenal" :isDropdown="true"
      v-model="form.tandaPengenal" placeholder="Pilih Tanda Pengenal Anda" :options="tandaPengenalOptions" required />

    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { tandaPengenalOptions } from "@/data/option.js";

export default {
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    RadioButtonChoose,
  },
  data() {
    return {
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      tandaPengenalOptions,
      isSubmitting: false,
      emailError: false,
      phoneError: false,
      selectedCountryCode: "ID",
    };
  },

  computed: {
    isButtonDisabled() {
      const emailValid = this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      const phoneValid = this.form.phone && /^(8(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,12}$/.test(this.form.phone);
      return !(this.form.namaLengkap && emailValid && phoneValid && this.form.tandaPengenal && this.form.nomorRekening);
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
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    // validatePhone(phone) {
    //   return /^((08|8)(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,12}$/.test(phone);
    // },
    validatePhone(phone) {
      return /^(8)\d{6,12}$/.test(phone);
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

    async fetchData() {
      try {
        const response = await axios.get("https://testapi.io/api/daffa/request-email-verification");
        console.log("Response data:", response.data);
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        if (data) {
          Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async handleSubmit() {
      try {
        const requestData = {
          nama_lengkap: this.form.namaLengkap,
          nomor_rekening: this.form.nomorRekening,
          jenis_identitas: Number(this.form.tandaPengenal),
          no_hp: this.form.phone,
          alamat_email: this.form.email,
        };

        console.log("Request data:", requestData);

        const response = await api.post("/pengkinian-data", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);
        console.log(requestData);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormPengkinianData(this.form);
          fileStore.setEmail(requestData.alamat_email);
          fileStore.setUuid(response.data.uuid);
          fileStore.setNoHP(requestData.no_hp);
          window.scrollTo(0, 0);
          console.log("Data berhasil dikirim:", response.data);
          this.$router.push({ path: "/dashboard/uploadDokumenPengkinianData" });

        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
        console.error("Error saat mengirim data:", error);
      }
    }
  },

  mounted() {
    this.$emit("update-progress", 15);
    // this.fetchBranches();
  },

  created() {
    this.fetchData();
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Lengkap*" id="namaLengkap" type="text" v-model="form.namaLengkap"
      placeholder="Masukkan Nama Lengkap Anda" />

    <FormField label="Email (Opsional)" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      hint="Pastikan Anda mengisi alamat email yang aktif" required />

    <FormField label="Nomor Rekening*" id="nomorRekening" type="text" v-model="form.nomorRekening"
      placeholder="Masukkan Nomor Rekening Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />

    <FormField label="Pilih Tanda Pengenal*" id="tandaPengenal" :isDropdown="true" v-model="form.tandaPengenal"
      placeholder="Pilih Tanda Pengenal Anda" :options="tandaPengenalOptions" required />
    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Konfirmasi Email
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
      tandaPengenalOptions,
      isSubmitting: false,
    };
  },

  computed: {
    isButtonDisabled() {
      const emailValid = this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      return !(this.form.namaLengkap && emailValid && this.form.tandaPengenal && this.form.nomorRekening);
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
        };

        console.log("Request data:", requestData);

        const response = await api.post("/pengkinian-data", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          const fileStore = useFileStore();
          console.log("Data berhasil dikirim:", response.data);
          fileStore.setFormPengkinianData(this.form);
          window.scrollTo(0, 0);
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

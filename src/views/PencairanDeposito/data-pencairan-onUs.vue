<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Bank*" id="namaBank" v-model="form.namaBank" placeholder="Masukkan Nama Bank"
      :readonly="true" required />

    <FormField class="mb-2" label="Nomor Rekening Tabungan Universal*" id="nomorRekening" v-model="form.nomorRekening"
      variant="numeric" :maxlength="10" placeholder="Masukkan Nomor Rekening" required @input="handleNomorRekeningInput"
      @blur="handleNomorRekeningBlur" :error="nomorRekeningError"
      :hint="nomorRekeningError ? 'Nomor rekening tidak valid. Silakan periksa kembali' : ''" />

    <FormField label="Nama Pemilik Rekening*" id="namaPemilikRekening" v-model="form.namaPemilikRekening"
      :maxlength="25" placeholder="Masukkan Nama Pemilik Rekening" required />

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent variant="default" type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import api from "@/API/api.js"
import axios from "axios";
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";
// import {  } from "@/data/option.js";
import { FormModelPenempatanDeposito } from "@/models/formModel";
import { handleFieldMixin } from "@/handler/handleField.js";

export default {
  mixins: [handleFieldMixin],
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
  },
  setup() {
    const fileStore = useFileStore();
    return { fileStore };
  },
  data() {
    return {
      form: new FormModelPenempatanDeposito("Universal BPR",),
      isChecked: false,
      nomorRekeningError: false,
      validBranchCodes: [],
    };
  },
  computed: {
    formattedNominal: {
      get() {
        return this.form.nominal
          ? `Rp ${this.form.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
          : "";
      },
      set(value) {
        this.updateNominal(value);
      }
    },

    isButtonDisabled() {
      return !(
        this.form.namaBank &&
        this.form.nomorRekening &&
        this.form.namaPemilikRekening
      );
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
    goBack() {
      this.$router.push({ path: "/dashboard/dataInstruksiPencairanDeposito" });
    },
    async handleSubmit() {
      try {
        const uuid = this.fileStore.uuid || "";

        if (!uuid) {
          console.error("UUID tidak ditemukan!");
          alert("Terjadi kesalahan, UUID tidak ditemukan.");
          return;
        }
        const requestData = {
          uuid: uuid,
          nama_bank: this.form.namaBank,
          nomor_rekening: this.form.nomorRekening,
          nama_pemilik: this.form.namaPemilikRekening,
        };

        console.log("Request data:", requestData);

        const response = await api.post("/transfer-deposito", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          const fileStore = useFileStore();
          fileStore.setFormDataPencairanDeposito(this.form);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/konfirmasiDataPencairanDeposito" });
        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
        console.error("Error saat mengirim data:", error);
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchBranchCodes();
  },
  // created() {
  //   // this.form.namaBank = "Universal BPR";
  //   // this.fetchData();
  // },
};
</script>

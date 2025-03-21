<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Lengkap*" id="namaLengkap" type="text" v-model="form.namaPemilikRekening"
      placeholder="Masukkan Nama Lengkap" />

    <FormField label="Tanggal Pemindahbukuan*" id="tanggalPengajuan" type="date" v-model="form.tanggalPengajuan"
      placeholder="Pilih Tanggal Lahir Beneficial Owner Anda" :readonly="true" />

    <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
      Rekening Sumber Dana
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      Untuk melanjutkan proses, kami memerlukan informasi tambahan yang tidak tercakup dalam KTP Anda.
    </p>

    <FormField label="Sumber Dana" id="sumberDana" :isDropdown="true" v-model="form.sumberDana"
      :options="sumberDanaOptions" placeholder="Pilih Sumber Dana Anda" :readonly="true" />

    <div v-if="form.sumberDana === 'lainnya'" class="">
      <FormField label="Sumber Dana Lainnya *" id="sumberDanaLainnya" type="text" v-model="form.sumberDanaLainnya"
        placeholder="Masukkan Sumber Penghasilan Lainnya" :readonly="true" />
    </div>

    <FormField label="Nomor Rekening Tabungan Universal*" id="nomorRekening" v-model="form.nomorRekening"
      placeholder="Masukkan Nomor Rekening" required :readonly="true" />

    <FormField label="Nama Pemilik Sumber Dana*" id="namaLengkap" v-model="form.namaLengkap"
      placeholder="Masukkan Nama Pemilik Sumber Dana" required :readonly="true" />

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
import { sumberDanaOptions } from "@/data/option.js";
import { FormModelPengirimPemindahbukuan } from "@/models/formModel";

export default {
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
      form: new FormModelPengirimPemindahbukuan(),
      isChecked: false,
      sumberDanaOptions,

    };
  },
  computed: {
    isButtonDisabled() {
      return !(
        this.form.namaPemilikRekening &&
        this.form.tanggalPengajuan &&
        this.form.sumberDana &&
        this.form.nomorRekening &&
        this.form.namaLengkap
      );
    },
  },
  // watch: {
  //   "form.nominal"(newVal) {
  //     this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
  //   },
  // },
  methods: {
    updateNominal(value) {
      const rawValue = value.replace(/\D/g, "");
      this.form.nominal = rawValue ? parseInt(rawValue, 10) : 0;
    },
    async fetchData() {
      try {
        const fileStore = useFileStore();
        const data = fileStore.formDataPemindahbukuan;

        console.log("Data from Pinia:", data);

        if (data) {
          Object.keys(this.form).forEach((key) => {
            if (data[key] !== undefined) {
              this.form[key] = data[key];
            }
          });
          console.log("Form setelah fetchData:", this.form); // Tambahkan ini
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    goBack() {
      this.$router.push({ path: "/dashboard/uploadDokumenPemindahbukuan" });
    },
    async handleSubmit() {
      try {
        // const uuid = this.fileStore.uuid || "";

        // if (!uuid) {
        //   console.error("UUID tidak ditemukan!");
        //   alert("Terjadi kesalahan, UUID tidak ditemukan.");
        //   return;
        // }

        const requestData = {
          // uuid: uuid,
          nama_bank: this.form.namaBank,
          nomor_rekening: this.form.nomorRekening,
          nama_pemilik: this.form.namaPemilikRekening,
        };

        console.log("Request data:", requestData);

        this.fileStore.setFormDataPengirimPemindahbukuan(this.form);
        this.$router.push({ path: "/dashboard/dataPenerimaPemindahbukuan" });

        // const response = await api.post("/transfer-deposito", requestData, {
        //   headers: { 'Content-Type': 'application/json' }
        // });

        // console.log("Response code:", response.status);
        // console.log("Response data:", response.data);

        // if (response.status === 201 || response.status === 200) {
        //   console.log("Data berhasil dikirim:", response.data);
        //   this.fileStore.setFormDataPengirimPemindahbukuan(this.form);
        //   window.scrollTo(0, 0);
        //   this.$router.push({ path: "/dashboard/dataPenerimaPemindahbukuan" });
        // } else {
        //   console.error("Gagal mengirim data, status:", response.status);
        // }
        // } catch (error) {
        //   if (error.response) {
        //     console.error("Error response data:", error.response.data);
        //   }
        //   console.error("Error saat mengirim data:", error);
        // }
      } catch (error) {
        console.error("Error saat menyimpan data:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchData();
  },
  created() {
    this.fetchData();
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Bank*" id="namaBank" v-model="form.namaBank" placeholder="Masukkan Nama Bank"
      :readonly="true" required />

    <FormField label="Nomor Rekening*" id="nomorRekening" v-model="form.nomorRekening" :maxlength="20" variant="numeric"
      placeholder="Masukkan Nomor Rekening" hint="*Nomor rekening harus terdiri dari 10 digit angka" required />

    <FormField label="Nama Pemilik Rekening*" id="namaPemilikRekening" v-model="form.namaPemilikRekening"
      placeholder="Masukkan Nama Pemilik Rekening" required />

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
import { jangkaWaktuDepositoUniversalOptions, jangkaWaktuDepositoDEBUTSanmereOptions, jangkaWaktuDepositoDEBUTMatiusOptions, jangkaWaktuDepositoPeduliOptions, jangkaWaktuDepositoGreenOptions, metodePencairanOptions, pembayaranBungaOptions, produkDepositoOptions, } from "@/data/option.js";
import { FormModelPenempatanDeposito } from "@/models/formModel";

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
      form: new FormModelPenempatanDeposito("Universal BPR",),
      isChecked: false,
      metodePencairanOptions,
      produkDepositoOptions,
      jangkaWaktuDepositoUniversalOptions,
      jangkaWaktuDepositoDEBUTMatiusOptions,
      jangkaWaktuDepositoDEBUTSanmereOptions,
      jangkaWaktuDepositoPeduliOptions,
      jangkaWaktuDepositoGreenOptions,
      pembayaranBungaOptions
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
  methods: {
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
    toTerbilang(angka) {
      const satuan = [
        "",
        "Satu",
        "Dua",
        "Tiga",
        "Empat",
        "Lima",
        "Enam",
        "Tujuh",
        "Delapan",
        "Sembilan",
      ];
      const belasan = [
        "Sepuluh",
        "Sebelas",
        "Dua Belas",
        "Tiga Belas",
        "Empat Belas",
        "Lima Belas",
        "Enam Belas",
        "Tujuh Belas",
        "Delapan Belas",
        "Sembilan Belas",
      ];
      const puluhan = [
        "",
        "",
        "Dua Puluh",
        "Tiga Puluh",
        "Empat Puluh",
        "Lima Puluh",
        "Enam Puluh",
        "Tujuh Puluh",
        "Delapan Puluh",
        "Sembilan Puluh",
      ];
      const ribuan = ["", "Ribu", "Juta", "Miliar", "Triliun"];

      if (angka === 0) return "Masukkan Nominal Pembukaan Deposito";

      let hasil = "";
      let i = 0;
      while (angka > 0) {
        let tigaDigit = angka % 1000;
        if (tigaDigit !== 0) {
          let ratus = Math.floor(tigaDigit / 100);
          let puluh = Math.floor((tigaDigit % 100) / 10);
          let satu = tigaDigit % 10;
          let bagian = "";

          if (ratus > 0) {
            bagian += ratus === 1 ? "Seratus " : satuan[ratus] + " Ratus ";
          }
          if (puluh === 1) {
            bagian += belasan[satu] + " ";
          } else {
            if (puluh > 1) bagian += puluhan[puluh] + " ";
            if (satu > 0) bagian += satuan[satu] + " ";
          }
          hasil = bagian + ribuan[i] + " " + hasil;
        }
        angka = Math.floor(angka / 1000);
        i++;
      }
      return hasil.trim() + " Rupiah";
    },
  },
  mounted() {
    this.$emit("update-progress", 60);
  },
  // created() {
  //   // this.form.namaBank = "Universal BPR";
  //   // this.fetchData();
  // },
};
</script>

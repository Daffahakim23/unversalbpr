<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nomor Rekening Deposito*" id="nomorRekeningDeposito" type="text"
      v-model="form.nomorRekeningDeposito" placeholder="Masukkan Nomor Rekening Deposito Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />

    <FormField label="Tanggal Jatuh Tempo Deposito" id="tanggalJatuhTempoDeposito" type="date"
      v-model="form.tanggalJatuhTempoDeposito" required />

    <FormField label="Tanggal Instruksi Pencairan Deposito" id="tanggalInstruksiPencairanDeposito" type="date"
      v-model="form.tanggalInstruksiPencairanDeposito" required />

    <FormField label="Nominal Deposito*" id="nominal" type="text" :isDropdown="false" v-model="formattedNominal"
      placeholder="Masukkan Nominal Penempatan Deposito" :disabled="!form.produk" :required="true"
      @input="updateNominal" />

    <FormField label="Terbilang" id="terbilang" :isDropdown="false" v-model="form.terbilang" :required="true"
      placeholder="Masukkan Nominal Penempatan Deposito" :readonly="true" />

    <FormField label="Suku Bunga*" id="sukuBunga" :isDropdown="true" v-model="form.sukuBunga"
      placeholder="Pilih Jangka Waktu & Suku Bunga" :options="sukuBungaDepositoOptions" required />

    <FormField label="Jangka Waktu*" id="jangkaWaktu" :isDropdown="true" v-model="form.jangkaWaktu"
      placeholder="Pilih Jangka Waktu & Suku Bunga" :options="jangkaWaktuDepositoOptions" required />

    <!-- <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
      Biaya Pinalti
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      Pencairan Deposito sebelum jatuh tempo akan dikenakan biaya penalti sesuai dengan Ketentuan PT. BPR Universal
    </p>
    <FlagBox type="warning" closable class="mb-4">
      <p class="text-sm font-normal">*Biaya Penalti akan dikenakan berdasarkan produk/program Deposito Anda sebagai
        berikut berikut:</p>
      <ul style="list-style-type: disc;" class="ml-8">
        <li>Deposito Universal: 0,5%</li>
        <li>Deposito Berdonasi Umat Sanmare: 0,5%</li>
        <li>Deposito Berdonasi Umat Matius: 0,5%</li>
        <li>Deposito Peduli: 1%</li>
        <li>Deposito Peduli Lingkungan (Green Deposit): 1%</li>
      </ul>
      <p>Dari nominal deposito Anda.</p>
    </FlagBox> -->

    <div v-if="isPenaltyApplicable">
      <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
        Biaya Pinalti
      </h2>
      <p class="text-sm text-gray-600 mb-4">
        Pencairan Deposito sebelum jatuh tempo akan dikenakan biaya penalti sesuai dengan Ketentuan PT. BPR Universal
      </p>
      <FlagBox type="warning" closable class="mb-4">
        <p class="text-sm font-normal">*Biaya Penalti akan dikenakan berdasarkan produk/program Deposito Anda sebagai
          berikut:</p>
        <ul style="list-style-type: disc;" class="ml-8">
          <li>Deposito Universal: 0,5%</li>
          <li>Deposito Berdonasi Umat Sanmare: 0,5%</li>
          <li>Deposito Berdonasi Umat Matius: 0,5%</li>
          <li>Deposito Peduli: 1%</li>
          <li>Deposito Peduli Lingkungan (Green Deposit): 1%</li>
        </ul>
        <p>Dari nominal deposito Anda.</p>
      </FlagBox>
    </div>

    <FormField label="Alasan Pencairan*" id="alasanPencairan" :isDropdown="true" v-model="form.alasanPencairan"
      placeholder="Pilih Alasan Pencairan Deposito" :options="alasanPencairanOptions" required />

    <RadioButtonChoose label="Rekening Tujuan*" id="rekeningTujuan" name="rekeningTujuan" :isDropdown="true"
      v-model="form.rekeningTujuan" :options="rekeningTujuanOptions" required />

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
import FlagBox from "@/components/flagbox.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";
import { rekeningTujuanOptions, alasanPencairanOptions, jangkaWaktuDepositoOptions, sukuBungaDepositoOptions } from "@/data/option.js";
import { FormModelPenempatanDeposito } from "@/models/formModel";

export default {
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
    FlagBox,
  },
  setup() {
    const fileStore = useFileStore();
    return { fileStore };
  },
  data() {
    return {
      form: new FormModelPenempatanDeposito(),
      isChecked: false,
      rekeningTujuanOptions,
      alasanPencairanOptions,
      jangkaWaktuDepositoOptions,
      sukuBungaDepositoOptions

    };
  },
  computed: {
    isPenaltyApplicable() {
      if (!this.form.tanggalInstruksiPencairanDeposito || !this.form.tanggalJatuhTempoDeposito) {
        return false; // Jika salah satu tanggal tidak diisi, jangan tampilkan penalti
      }
      return new Date(this.form.tanggalInstruksiPencairanDeposito) < new Date(this.form.tanggalJatuhTempoDeposito);
    },
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
      return (
        !this.form.nominal ||
        !this.form.terbilang
      );
    },

  },
  watch: {
    "form.nominal"(newVal) {
      this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
    },
  },
  methods: {
    async fetchDataFromStore(storeKey) {
      try {
        const fileStore = useFileStore();
        const data = fileStore[storeKey];
        console.log(`Data from Pinia (${storeKey}):`, data);

        if (data) {
          Object.keys(this.form).forEach((key) => {
            if (data[key] !== undefined) {
              this.form[key] = data[key];
            }
          });
        }
        console.log("form data : ", this.form);
      } catch (error) {
        console.error(`Error fetching data from ${storeKey}:`, error);
      }
    },
    async fetchData() {
      await this.fetchDataFromStore('formEmailRequestPencarianDeposito');
    },
    async fetchDataInstruksi() {
      await this.fetchDataFromStore('formInstruksiPencarianDeposito');
    },
    updateNominal(value) {
      const rawValue = value.replace(/\D/g, "");
      this.form.nominal = rawValue ? parseInt(rawValue, 10) : 0;
    },
    goBack() {
      this.$router.push('/uploadDokumenPencairanDeposito');
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
          nomor_deposito: this.form.nomorRekeningDeposito,
          tanggal_jatuh_tempo: this.form.tanggalJatuhTempoDeposito,
          tanggal_instruksi_pencairan: this.form.tanggalInstruksiPencairanDeposito,
          nominal_deposito: Number(this.form.nominal),
          suku_bunga: Number(this.form.sukuBunga),
          jangka_waktu: Number(this.form.jangkaWaktu),
          alasan_pencairan: this.form.alasanPencairan
        };

        console.log("Request data:", requestData);

        const response = await api.post("/instruksi-pencairan", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormInstruksiPencairanDeposito(this.form);
          window.scrollTo(0, 0);
          if (this.form.rekeningTujuan === "1") {
            this.$router.push({ path: "/dashboard/dataPencairanDepositoOnUs" });
          } else if (this.form.rekeningTujuan === "2") {
            this.$router.push({ path: "/dashboard/dataPencairanDepositoOfUs" });
          } else {
            this.$router.push({ path: "/dashboard/dataInstruksiPencairanDeposito" });
          }
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

      if (angka === 0) return "Masukkan Nominal Penempatan Deposito";

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
  created() {
    this.fetchData();
    this.fetchDataInstruksi();
  },
};
</script>

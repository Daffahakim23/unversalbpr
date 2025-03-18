<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Pilih Produk Deposito*" id="produkDeposito" :isDropdown="true" v-model="form.produkDeposito"
      placeholder="Pilih produk yang Anda inginkan" :options="produkDepositoOptions" required />

    <FormField label="Nominal Deposito*" id="nominal" type="text" :isDropdown="false" v-model="formattedNominal"
      placeholder="Masukkan Nominal Penempatan Deposito" :disabled="!form.produkDeposito" :required="true"
      @input="updateNominal" />

    <FormField label="Terbilang" id="terbilang" :isDropdown="false" v-model="form.terbilang" :required="true"
      placeholder="Masukkan Nominal Penempatan Deposito" :readonly="true" />

    <div v-if="form.produkDeposito == 1" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoUniversalOptions" required />
    </div>
    <div v-if="form.produkDeposito == 2" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoPeduliOptions" required />
    </div>
    <div v-if="form.produkDeposito == 3" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoDEBUTSanmereOptions" required />
    </div>
    <div v-if="form.produkDeposito == 4" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoDEBUTMatiusOptions" required />
    </div>
    <div v-if="form.produkDeposito == 5" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoGreenOptions" required />
    </div>

    <div class="mb-6">
      <label class="text-neutral-800">Perkiraan Bunga yang didapatkan (-20% Pajak)</label>
      <p class="text-2xl font-semibold mt-2 text-secondary-base">
        {{ formattedBunga }}
      </p>
    </div>

    <FormField label="Saat Jatuh Tempo Nominal*" id="metodePencairan" :isDropdown="true" v-model="form.metodePencairan"
      placeholder="Pilih Perlakuan Nominal Deposito Saat Jatuh Tempo" :options="metodePencairanOptions" required />

    <FormField label="Metode Pembayaran Bunga*" id="pembayaranBunga" :isDropdown="true" v-model="form.pembayaranBunga"
      placeholder="PIlih Metode Pembayaran Bunga" :options="pembayaranBungaOptions" required />

    <!-- Jika opsi value = 2 -->
    <div v-if="form.pembayaranBunga == 2" class="mt-4">
      <FormField label="Nama Pemilik Rekening Tabungan Universal*" id="namaPemilikRekening"
        v-model="form.namaPemilikRekening" placeholder="Masukkan Nama Pemilik Rekening Tabungan Universal" required />

      <FormField label="Nomor Rekening Tabungan Universal*" id="nomorRekening" v-model="form.nomorRekening"
        placeholder="Masukkan Nomor Rekening Tabungan Universal" required />
    </div>

    <!-- Jika opsi value = 3 -->
    <div v-if="form.pembayaranBunga == 3" class="mt-2">
      <label class="flex items-baseline space-x-2">
        <input type="checkbox" v-model="form.setujuBungaTabungan" required />
        <span class="ms-2 text-sm text-gray-900 dark:text-gray-300 mb-4">
          Saya setuju bahwa pembayaran bunga deposito akan dipindah bukukan ke Rekening Tabungan Universal atas
          nama saya sendiri yang akan dibuat oleh Petugas Bank dengan nomor rekening yang akan diinformasikan kepada
          saya
          melalui email resmi BPR Universal: <strong>notifikasi@universalbpr.co.id</strong>.
        </span>
      </label>
    </div>

    <!-- Jika opsi value = 4 -->
    <div v-if="form.pembayaranBunga == 4" class="mt-4">
      <FormField label="Nama Pemilik Rekening*" id="namaPemilikRekening" v-model="form.namaPemilikRekening"
        placeholder="Masukkan Nama Pemilik Rekening" required />

      <FormField label="Nomor Rekening*" id="nomorRekening" v-model="form.nomorRekening"
        placeholder="Masukkan Nomor Rekening" required />

      <!-- <FormField label="Nama Bank*" id="namaBank" v-model="form.namaBank" placeholder="Masukkan Nama Bank" required /> -->

      <FormField label="Nama Bank*" id="namaBank" :isDropdown="true" v-model="form.namaBank"
        placeholder="Pilih Nama Bank" :options="bankOptions" required />

      <label class="flex items-baseline space-x-2 mt-4">
        <input type="checkbox" v-model="form.setujuBiayaTransfer" required />
        <p class="ms-2 text-sm text-gray-900 dark:text-gray-300 mb-4">
          Saya menyetujui pemotongan biaya administrasi transfer pembayaran bunga deposito ke Rekening Bank Lain,
          sesuai dengan ketentuan BPR Universal.
        </p>
      </label>
    </div>

    <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
      Cara Penyetoran
    </h2>
    <FormField label="Metode Metode Penyetoran*" id="pembayaranBunga" :isDropdown="true" v-model="form.metodePenyetoran"
      placeholder="PIlih Metode Metode Penyetoran" :options="metodePenyetoranNTBOptions" required />
    <div class=" flex items-baseline mb-6">
      <input id="modal-checkbox" type="checkbox" v-model="isChecked"
        class="w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded-sm focus:ring-primary dark:focus:ring-primary dark:ring-offset-neutral-800 focus:ring-2 dark:bg-primary dark:border-neutral-600 self-start" />
      <p for="modal-checkbox" class="ms-2 text-sm  text-gray-900 dark:text-gray-300">
        Saya Setuju bahwa penyetoran untuk penempatan deposito akan dilakukan pendebetan melalui rekening Tabungan
        Universal atas nama saya sendiri yang akan dibuat oleh Petugas Bank dan diinformasikan kepada saya melalui email
        resmi Universal BPR: <strong>notifikasi@universalbpr.co.id</strong>
      </p>
    </div>

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
import { jangkaWaktuDepositoUniversalOptions, jangkaWaktuDepositoDEBUTSanmereOptions, jangkaWaktuDepositoDEBUTMatiusOptions, jangkaWaktuDepositoPeduliOptions, jangkaWaktuDepositoGreenOptions, metodePencairanOptions, pembayaranBungaOptions, produkDepositoOptions, metodePenyetoranNTBOptions } from "@/data/option.js";
import { FormModelPenempatanDeposito } from "@/models/formModel";
import { hitungBungaUniversal, hitungBungaPeduli, hitungBungaDEBUTSanmere, hitungBungaDEBUTMatius, hitungBungaGreen, } from "@/data/bunga-deposito.js";

console.log("Universal:", hitungBungaUniversal(1000000, "1"));
console.log("Peduli:", hitungBungaPeduli(1000000, "1"));

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
      form: new FormModelPenempatanDeposito(),
      isChecked: false,
      metodePencairanOptions,
      produkDepositoOptions,
      jangkaWaktuDepositoUniversalOptions,
      jangkaWaktuDepositoDEBUTMatiusOptions,
      jangkaWaktuDepositoDEBUTSanmereOptions,
      jangkaWaktuDepositoPeduliOptions,
      jangkaWaktuDepositoGreenOptions,
      pembayaranBungaOptions,
      metodePenyetoranNTBOptions

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
      return (
        !this.isChecked ||
        !this.form.nominal ||
        !this.form.terbilang ||
        !this.form.jangkaWaktu ||
        !this.form.metodePencairan ||
        !this.form.pembayaranBunga ||
        (this.form.pembayaranBunga == 2 && (!this.form.nomorRekening || !this.form.namaPemilikRekening)) ||
        (this.form.pembayaranBunga == 4 && (!this.form.namaBank || !this.form.nomorRekening || !this.form.namaPemilikRekening))
      );
    },

    // formattedBunga() {
    //   const nominal = parseFloat(this.form.nominal) || 0;
    //   if (nominal <= 0) return "Rp 0";

    //   let bunga = nominal * 0.06 * 0.8;
    //   return new Intl.NumberFormat("id-ID", {
    //     style: "currency",
    //     currency: "IDR",
    //   }).format(bunga);
    // },
    formattedBunga() {
      const nominal = parseFloat(this.form.nominal) || 0;
      const jangkaWaktu = this.form.jangkaWaktu;
      console.log("Nominal:", nominal);
      console.log("Jangka Waktu:", jangkaWaktu);
      console.log("Produk:", this.form.produkDeposito);

      if (nominal <= 0 || !jangkaWaktu) return "Rp 0";
      switch (this.form.produkDeposito) {
        case "1":
          return hitungBungaUniversal(nominal, jangkaWaktu);
        case "2":
          return hitungBungaPeduli(nominal, jangkaWaktu);
        case "3":
          return hitungBungaDEBUTSanmere(nominal, jangkaWaktu);
        case "4":
          return hitungBungaDEBUTMatius(nominal, jangkaWaktu);
        case "5":
          return hitungBungaGreen(nominal, jangkaWaktu);
        default:
          return "Rp 0";
      }
    },
  },
  watch: {
    "form.nominal"(newVal) {
      this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
    },
  },
  methods: {
    async fetchData() {
      try {
        const fileStore = useFileStore();
        const data = fileStore.formEmailRequestDepositoNTB;

        console.log("Data from Pinia:", data);

        if (data) {
          Object.keys(this.form).forEach((key) => {
            if (data[key] !== undefined) {
              this.form[key] = data[key];
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchBankOptions() {
      try {
        const response = await axios.get("http://10.14.52.233:8001/list-bank");
        this.bankOptions = response.data.bank.map((bank) => ({
          label: bank.bank_name,
          value: bank.bank_name,
        }));
      } catch (error) {
        console.error("Error fetching bank options:", error);
      }
    },
    updateNominal(value) {
      const rawValue = value.replace(/\D/g, "");
      this.form.nominal = rawValue ? parseInt(rawValue, 10) : 0;
    },
    goBack() {
      this.$router.go(-1);
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
          nominal_deposito: Number(this.form.nominal),
          jangka_waktu: Number(this.form.jangkaWaktu),
          saat_jatuh_tempo_nominal: Number(this.form.metodePencairan),
          pembayaran_bunga: Number(this.form.pembayaranBunga),
          nama_bank: this.form.pembayaranBunga == 4 ? this.form.namaBank : "",
          nomor_rekening: this.form.pembayaranBunga == 2 || this.form.pembayaranBunga == 4 ? this.form.nomorRekening : "",
          nama_pemilik: this.form.pembayaranBunga == 2 || this.form.pembayaranBunga == 4 ? this.form.namaPemilikRekening : "",
          s_k_penempatan_deposito: this.isChecked,
        };

        console.log("Request data:", requestData);

        const response = await api.post("/penempatan-deposito", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormPenempatanDeposito(this.form);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/uploadDokumenPenempatanDepositoNTB" });
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
    this.fetchData();
    this.fetchBankOptions();
  },
};
</script>

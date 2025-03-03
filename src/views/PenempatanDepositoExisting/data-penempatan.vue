<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Pilih Produk Deposito*" id="produk" :isDropdown="true" v-model="form.produk"
      placeholder="Pilih produk yang Anda inginkan" :options="produkDepositoOptions" required />

    <FormField label="Nominal Deposito*" id="nominal" type="text" :isDropdown="false" v-model="formattedNominal"
      placeholder="Masukkan Nominal Penempatan Deposito" :disabled="!form.produk" :required="true"
      @input="updateNominal" />

    <FormField label="Terbilang" id="terbilang" :isDropdown="false" v-model="form.terbilang" :required="true"
      placeholder="Masukkan Nominal Penempatan Deposito" :readonly="true" />

    <div v-if="form.produk == 1" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoUniversalOptions" required />
    </div>
    <div v-if="form.produk == 2" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoPeduliOptions" required />
    </div>
    <div v-if="form.produk == 3" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoDEBUTSanmereOptions" required />
    </div>
    <div v-if="form.produk == 4" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoDEBUTMatiusOptions" required />
    </div>
    <div v-if="form.produk == 5" class="mt-4">
      <FormField label="Jangka Waktu & Suku Bunga yang Anda Inginkan*" id="jangkaWaktu" :isDropdown="true"
        v-model="form.jangkaWaktu" placeholder="Pilih Jangka Waktu & Suku Bunga"
        :options="jangkaWaktuDepositoGreenOptions" required />
    </div>

    <FormField label="Saat Jatuh Tempo Nominal*" id="metodePencairan" :isDropdown="true" v-model="form.metodePencairan"
      placeholder="Pilih Perlakuan Nominal Deposito Saat Jatuh Tempo" :options="metodePencairanOptions" required />

    <FormField label="Pilih Metode Pembayaran Bunga*" id="pembayaranBunga" :isDropdown="true"
      v-model="form.pembayaranBunga" placeholder="Pilih Metode Pembayaran Bunga" :options="pembayaranBungaOptions"
      required />

    <!-- Jika opsi value = 2 -->
    <div v-if="form.pembayaranBunga == 2" class="mt-4">
      <FormField label="Nomor Rekening*" id="nomorRekening" v-model="form.nomorRekening"
        placeholder="Masukkan Nomor Rekening" required />

      <FormField label="Nama Pemilik Rekening*" id="namaPemilikRekening" v-model="form.namaPemilikRekening"
        placeholder="Masukkan Nama Pemilik Rekening" required />
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
      <FormField label="Nama Bank*" id="namaBank" v-model="form.namaBank" placeholder="Masukkan Nama Bank" required />

      <FormField label="Nomor Rekening*" id="nomorRekening" v-model="form.nomorRekening"
        placeholder="Masukkan Nomor Rekening" required />

      <FormField label="Nama Pemilik Rekening*" id="namaPemilikRekening" v-model="form.namaPemilikRekening"
        placeholder="Masukkan Nama Pemilik Rekening" required />

      <label class="flex items-baseline space-x-2 mt-4">
        <input type="checkbox" v-model="form.setujuBiayaTransfer" required />
        <p class="ms-2 text-sm text-gray-900 dark:text-gray-300 mb-4">
          Saya menyetujui pemotongan biaya administrasi transfer pembayaran bunga deposito ke Rekening Bank Lain,
          sesuai dengan ketentuan BPR Universal.
        </p>
      </label>
    </div>

    <div class="mb-6">
      <label class="text-neutral-800">Perkiraan Bunga yang didapatkan (-20% Pajak)</label>
      <p class="text-2xl font-semibold mt-2 text-secondary-base">
        {{ formattedBunga }}
      </p>
    </div>

    <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
      Cara Penyetoran
    </h2>
    <p class="text-sm  text-gray-900 dark:text-gray-300 my-2">
      Debet Rekening Tabungan Universal
    </p>
    <div class=" flex items-baseline mb-6">
      <input id="modal-checkbox" type="checkbox" v-model="isChecked"
        class="w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded-sm focus:ring-primary dark:focus:ring-primary dark:ring-offset-neutral-800 focus:ring-2 dark:bg-primary dark:border-neutral-600 self-start mt-1" />
      <p for="modal-checkbox" class="ms-2 text-sm  text-gray-900 dark:text-gray-300">
        Saya Setuju bahwa penyetoran untuk penempatan deposito akan dilakukan pendebetan melalui rekening Tabungan
        Universal atas nama saya sendiri yang akan dibuat oleh Petugas Bank dan diinformasikan kepada saya melalui email
        resmi Universal BPR: <strong>notifikasi@universalbpr.co.id</strong>
      </p>
    </div>

    <div class="flex justify-between mt-6">
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
      form: new FormModelPenempatanDeposito(),
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

    formattedBunga() {
      const nominal = parseFloat(this.form.nominal) || 0;
      if (nominal <= 0) return "Rp 0";

      let bunga = nominal * 0.06 * 0.8;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(bunga);
    },
  },
  watch: {
    "form.nominal"(newVal) {
      this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
    },
  },
  methods: {
    updateNominal(value) {
      const rawValue = value.replace(/\D/g, "");
      this.form.nominal = rawValue ? parseInt(rawValue, 10) : 0;
    },
    // async fetchData() {
    //   try {
    //     const response = await axios.get("https://testapi.io/api/daffa/penempatan-deposito");
    //     console.log("Response data:", response.data);
    //     const data = Array.isArray(response.data) ? response.data[0] : response.data;
    //     if (data) {
    //       Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
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

        const response = await api.post("/penempatan-deposito-existing", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormPenempatanDeposito(this.form);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/uploadDokumenPenempatanDepositoExisting" });
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
  // created() {
  //   this.fetchData();
  // },
};
</script>

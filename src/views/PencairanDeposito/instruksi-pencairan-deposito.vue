<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nomor Deposito*" id="nomorRekeningDeposito" v-model="form.nomorRekeningDeposito" :maxlength="10"
      placeholder="Masukkan Nomor Rekening Deposito Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />

    <FormField label="Nama Lengkap*" id="namaLengkap" v-model="form.namaLengkap" :maxlength="25"
      placeholder="Masukkan Nama Lengkap Anda" variant="alpha" required />

    <FormField label="Tanggal Jatuh Tempo Deposito*" id="tanggalJatuhTempoDeposito" type="date"
      v-model="form.tanggalJatuhTempoDeposito" required />

    <FormField label="Tanggal Instruksi Penutupan Deposito*" id="tanggalInstruksiPencairanDeposito" type="date"
      v-model="form.tanggalInstruksiPencairanDeposito" required />

    <!-- <FormField label="Pilih Jaringan Kantor*" id="kantorCabang" :isDropdown="true" v-model="form.kantorCabang"
      placeholder="Pilih Jaringan Kantor" :options="kantorCabangOptions" required />

    <div v-if="form.kantorCabang" class="mt-4">
      <FormField label="Alamat Jaringan Kantor Pembukaan Rekening" id="alamatKantorCabang"
        v-model="form.alamatKantorCabang" :readonly="true" />
    </div> -->

    <FormField label="Nominal Deposito*" id="nominal" :isDropdown="false" v-model="formattedNominal" variant="numeric"
      :maxlength="20" placeholder="Masukkan Nominal Pembukaan Deposito"
      :disabled="!form.produkDeposito || formattedNominal.length >= 12" :required="true" :hint="nominalError || ''"
      :error="!!nominalError" @input="updateNominal($event.target.value)" />

    <FormField label="Terbilang" id="terbilang" :isDropdown="false" v-model="form.terbilang" :required="true"
      placeholder="Masukkan Nominal Pembukaan Deposito" :readonly="true" />

    <FormField label="Suku Bunga*" id="sukuBunga" :isDropdown="true" v-model="form.sukuBunga"
      placeholder="Pilih Jangka Waktu & Suku Bunga" :options="sukuBungaDepositoOptions" required />

    <FormField label="Jangka Waktu*" id="jangkaWaktu" :isDropdown="true" v-model="form.jangkaWaktu"
      placeholder="Pilih Jangka Waktu & Suku Bunga" :options="jangkaWaktuDepositoOptions" required />

    <div v-if="isPenaltyApplicable">
      <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
        Biaya Pinalti
      </h2>
      <p class="font-normal text-xs md:text-sm text-gray-600 mb-4">
        Penutupan Deposito sebelum jatuh tempo akan dikenakan biaya pinalti sesuai dengan Ketentuan PT BPR Universal
      </p>
      <FlagBox type="warning" closable class="mb-4">
        <p class="font-normal text-xs md:text-sm mb-2">*Biaya Pinalti akan dikenakan berdasarkan produk/program Deposito
          Anda sebagai
          berikut:</p>
        <ul style="list-style-type: disc;" class="ml-8 font-normal text-xs md:text-sm">
          <li>Deposito Universal: 0,5%</li>
          <li>Deposito Berdonasi Umat Sanmare: 0,5%</li>
          <li>Deposito Berdonasi Umat Matius: 0,5%</li>
          <li>Deposito Peduli: 1%</li>
          <li>Deposito Peduli Lingkungan (Green Deposit): 1%</li>
        </ul>
        <p class="font-normal text-xs md:text-sm mt-2">Dari nominal deposito Anda.</p>
      </FlagBox>
    </div>

    <!-- <div class="form-item">
      <div class="form-label">Biaya Pinalti:</div>
      <strong class="form-value">{{ formattedDisplayedPenalty }}</strong>
    </div> -->

    <FormField label="Alasan Penutupan*" id="alasanPencairan" :isDropdown="true" v-model="form.alasanPencairan"
      placeholder="Pilih Alasan Penutupan Deposito" :options="alasanPencairanOptions" required />

    <RadioButtonChoose label="Rekening Tujuan Penutupan Deposito*" id="rekeningTujuan" name="rekeningTujuan"
      :isDropdown="true" v-model="form.rekeningTujuan" :options="rekeningTujuanOptions" required />

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
import { toTerbilang } from "@/utils/toTerbilang.js";
import { fetchBranches } from '@/services/service.js';

export default {
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
    FlagBox,
  },
  setup() {
    const fileStore = useFileStore();

    // Definisikan fungsi formatCurrency langsung di dalam setup()
    const formatCurrency = (amount) => {
      // Pastikan input adalah angka. Jika string, coba parse.
      if (typeof amount !== 'number') {
        const parsedAmount = parseFloat(amount);
        if (!isNaN(parsedAmount)) {
          amount = parsedAmount;
        } else {
          // Jika tidak bisa di-parse sebagai angka, kembalikan nilai aslinya
          return amount;
        }
      }

      // Gunakan Intl.NumberFormat untuk format Rupiah
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Mengatur agar tidak ada desimal untuk Rupiah
        maximumFractionDigits: 0, // Mengatur agar tidak ada desimal untuk Rupiah
      }).format(amount);
    };

    // Kembalikan (expose) fileStore dan formatCurrency agar bisa diakses di komponen
    return { fileStore, formatCurrency };
  },
  data() {
    return {
      form: new FormModelPenempatanDeposito(),
      isChecked: false,
      rekeningTujuanOptions,
      alasanPencairanOptions,
      jangkaWaktuDepositoOptions,
      sukuBungaDepositoOptions,
      nominalError: false,
      kantorCabangOptions: [],
      kantorCabangAlamat: {},

    };
  },
  computed: {
    formattedDisplayedPenalty() {
      const penaltyValue = this.fileStore.penalty; // Mengambil nilai penalty dari fileStore
      const nominal = parseFloat(this.form.nominal) || 0; // Mengambil nominal untuk perhitungan

      // Jika nilai penalty kosong atau tidak terdefinisi
      if (penaltyValue === null || penaltyValue === undefined || penaltyValue === "") {
        return "-"; // Tampilkan '-'
      }

      // Coba konversi nilai penalty ke angka
      const parsedPenalty = parseFloat(penaltyValue);

      // Jika nilai penalty adalah angka (parsedPenalty bukan NaN)
      if (!isNaN(parsedPenalty)) {
        // Jika ini adalah persentase (angka antara 0 dan 1, misalnya 0.005 atau 0.01)
        if (parsedPenalty < 1 && parsedPenalty > 0) {
          const calculatedPenalty = nominal * parsedPenalty * 0.01;
          // Format hasil perhitungan sebagai mata uang Rupiah
          return this.formatCurrency(calculatedPenalty); // Menggunakan formatCurrency
        }
        // Jika ini adalah nilai uang langsung (angka 1 atau lebih, misalnya 3000 atau 10000)
        else if (parsedPenalty >= 1) {
          // Format nilai aslinya sebagai mata uang Rupiah
          return this.formatCurrency(parsedPenalty); // Menggunakan formatCurrency
        }
      }

      // Jika tidak ada kondisi di atas yang cocok
      return String(penaltyValue);
    },
    calculatedPenaltyValue() {
      // Jika fileStore.penalty sudah ada nilainya, gunakan itu (Prioritas 1)
      if (this.fileStore.penalty !== null && this.fileStore.penalty !== undefined && this.fileStore.penalty !== '') {
        // Pastikan formatnya sesuai yang diinginkan (misal: number)
        const parsedStoredPenalty = parseFloat(this.fileStore.penalty);
        if (!isNaN(parsedStoredPenalty)) {
          return parsedStoredPenalty;
        }
        return this.fileStore.penalty; // Jika bukan angka, kembalikan string aslinya
      }

      // Jika fileStore.penalty kosong, lanjutkan perhitungan denda (Prioritas 2)
      if (this.isPenaltyApplicable) {
        // Dapatkan nominal deposito dari form
        const nominal = parseFloat(this.form.nominal) || 0;

        // Ambil produk deposito dari form
        const produk = this.form.produkDeposito; // Pastikan ini ada dan berisi nama produk yang sesuai

        let penaltyRate = 0;
        switch (produk) {
          case "Deposito Universal":
          case "Deposito Berdonasi Umat Sanmare":
          case "Deposito Berdonasi Umat Matius":
            penaltyRate = 0.005; // 0.5% dalam desimal
            break;
          case "Deposito Peduli":
          case "Deposito Peduli Lingkungan (Green Deposit)":
            penaltyRate = 0.01; // 1% dalam desimal
            break;
          default:
            penaltyRate = 0; // Jika produk tidak cocok atau tidak ada denda
            break;
        }

        if (nominal > 0 && penaltyRate > 0) {
          return nominal * penaltyRate; // Ini akan menjadi nilai numerik denda
        }
      }

      return null;
    },

    isPenaltyApplicable() {
      if (!this.form.tanggalInstruksiPencairanDeposito || !this.form.tanggalJatuhTempoDeposito) {
        return false;
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
      // Ambil semua field yang wajib diisi (memiliki label dengan tanda *)
      const requiredFields = [
        this.form.nomorRekeningDeposito,
        this.form.namaLengkap,
        this.form.tanggalJatuhTempoDeposito,
        this.form.tanggalInstruksiPencairanDeposito,
        this.form.nominal,
        this.form.sukuBunga,
        this.form.jangkaWaktu,
        this.form.alasanPencairan,
        this.form.rekeningTujuan,
      ];

      // Cek apakah ada satu saja field yang kosong atau null
      // Menggunakan .some() lebih efisien daripada .every() dengan negasi
      const hasEmptyField = requiredFields.some(field => {
        // Periksa field. Jika string, pastikan tidak kosong
        if (typeof field === 'string') {
          return field.trim() === '';
        }
        // Untuk tipe data lain, cek apakah null, undefined, atau 0 (untuk nominal)
        return field === null || field === undefined || field === 0;
      });

      // Tombol akan disabled jika ada field yang kosong
      return hasEmptyField;
    },
  },
  watch: {
    calculatedPenaltyValue: {
      handler(newValue) {
        if (newValue !== null) { // Atau newValue !== this.fileStore.penalty
          this.fileStore.setPenalty(newValue); // Asumsikan Anda punya action/mutation setPenalty di store
        } else {
          this.fileStore.setPenalty(null); // Atau set ke 0 jika tidak ada denda
        }
      },
      immediate: true // Jalankan handler segera saat komponen dimuat
    },
    "form.kantorCabang"(newVal) {
      this.form.alamatKantorCabang = this.kantorCabangAlamat[newVal] || "Alamat tidak ditemukan";
    },
    "form.nominal"(newVal) {
      this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
    },
  },
  methods: {
    async fetchBranches() {
      try {
        const { kantorCabangOptions, kantorCabangAlamat } = await fetchBranches();
        this.kantorCabangOptions = kantorCabangOptions;
        this.kantorCabangAlamat = kantorCabangAlamat;
      } catch (error) {
        console.error('Gagal mengambil data kantor cabang:', error);
      }
    },
    validateNamaLengkap(namaLengkap) {
      return /^[^\d]+$/.test(namaLengkap);
    },
    handleNamaLengkapBlur() {
      this.touched.namaLengkap = true;
      if (this.form.namaLengkap) {
        this.namaLengkapError = !this.validateNamaLengkap(this.form.namaLengkap);
      }
    },
    async fetchData() {
      try {
        const fileStore = useFileStore();
        const pengirim = fileStore.formEmailRequestPencairanDeposito;
        const pindahBuku = fileStore.formInstruksiPencairanDeposito;

        if (pengirim) {
          Object.keys(this.form).forEach((key) => {
            if (pengirim[key] !== undefined) {
              this.form[key] = pengirim[key];
            }
          });
        }

        if (pindahBuku) {
          Object.keys(this.form).forEach((key) => {
            if (pindahBuku[key] !== undefined) {
              this.form[key] = pindahBuku[key];
            }
          });
        }

        if (fileStore.nama_lengkap) {
          this.form.namaLengkap = fileStore.nama_lengkap;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    updateNominal(value) {
      const rawValue = value.replace(/\D/g, "");
      this.form.nominal = rawValue ? parseInt(rawValue, 10) : 0;
    },
    goBack() {
      this.$router.push({ path: "/dashboard/uploadDokumenPencairanDeposito" });
    },
    async handleSubmit() {
      try {
        const uuid = this.fileStore.uuid || "";
        const biayaPinalti = this.fileStore.penalty || "";

        if (!uuid) {
          console.error("UUID tidak ditemukan!");
          alert("Terjadi kesalahan, UUID tidak ditemukan.");
          return;
        }

        const selectedBranch = this.kantorCabangOptions.find(
          branch => branch.value === this.form.kantorCabang
        );

        const requestData = {
          uuid: uuid,
          biaya_pinalti: biayaPinalti,
          nama_nasabah: this.form.namaLengkap,
          kode_kantor_cabang: this.form.kantorCabang,
          kantor_cabang: selectedBranch ? selectedBranch.label : "",
          nomor_deposito: this.form.nomorRekeningDeposito,
          tanggal_jatuh_tempo: this.form.tanggalJatuhTempoDeposito,
          tanggal_instruksi_pencairan: this.form.tanggalInstruksiPencairanDeposito,
          nominal_deposito: Number(this.form.nominal),
          suku_bunga: parseFloat(this.form.sukuBunga),
          jangka_waktu: Number(this.form.jangkaWaktu),
          alasan_pencairan: this.form.alasanPencairan,
        };

        console.log("Request data:", requestData);

        const response = await api.post("/instruksi-pencairan", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          console.log("fileStore:", this.fileStore);
          console.log("form:", this.form);
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
    toTerbilang,

  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchData();
    this.fetchBranches();
  },

};
</script>

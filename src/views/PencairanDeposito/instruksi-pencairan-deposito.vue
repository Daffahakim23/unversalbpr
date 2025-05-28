<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nomor Deposito*" id="nomorRekeningDeposito" v-model="form.nomorRekeningDeposito"
      placeholder="Masukkan Nomor Rekening Deposito Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />

    <FormField label="Nama Lengkap*" id="namaLengkap" v-model="form.namaLengkap"
      placeholder="Masukkan Nama Lengkap Anda" variant="alpha" required />

    <FormField label="Tanggal Jatuh Tempo Deposito*" id="tanggalJatuhTempoDeposito" type="date"
      v-model="form.tanggalJatuhTempoDeposito" required />

    <FormField label="Tanggal Instruksi Penutupan Deposito*" id="tanggalInstruksiPencairanDeposito" type="date"
      v-model="form.tanggalInstruksiPencairanDeposito" required />

    <FormField label="Pilih Jaringan Kantor*" id="kantorCabang" :isDropdown="true" v-model="form.kantorCabang"
      placeholder="Pilih Jaringan Kantor" :options="kantorCabangOptions" required />

    <div v-if="form.kantorCabang" class="mt-4">
      <FormField label="Alamat Kantor Cabang Pembukaan Rekening" id="alamatKantorCabang"
        v-model="form.alamatKantorCabang" :readonly="true" />
    </div>

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
        Penutupan Deposito sebelum jatuh tempo akan dikenakan biaya penalti sesuai dengan Ketentuan PT BPR Universal
      </p>
      <FlagBox type="warning" closable class="mb-4">
        <p class="font-normal text-xs md:text-sm mb-2">*Biaya Penalti akan dikenakan berdasarkan produk/program Deposito
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
    return { fileStore };
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
      return (
        !this.form.nominal ||
        !this.form.terbilang
      );
    },

  },
  watch: {
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
          console.log("Form setelah fetchData Data Pengirim:", this.form);
        }

        if (pindahBuku) {
          Object.keys(this.form).forEach((key) => {
            if (pindahBuku[key] !== undefined) {
              this.form[key] = pindahBuku[key];
            }
          });
          console.log("Form setelah fetchData Data Pemindahbukuan:", this.form);
        }

        console.log("Form setelah fetchData Data Penerima:", this.form);
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
          kode_kantor_cabang: this.form.kantorCabang,
          kantor_cabang: selectedBranch ? selectedBranch.label : "",
          nomor_deposito: this.form.nomorRekeningDeposito,
          tanggal_jatuh_tempo: this.form.tanggalJatuhTempoDeposito,
          tanggal_instruksi_pencairan: this.form.tanggalInstruksiPencairanDeposito,
          nominal_deposito: Number(this.form.nominal),
          suku_bunga: parseFloat(this.form.sukuBunga),
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

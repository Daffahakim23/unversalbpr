<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Lengkap*" id="namaLengkap" type="text" v-model="form.namaPemilikRekening" :maxlength="50"
      placeholder="Masukkan Nama Lengkap" variant="alpha" />

    <FormField label="Tanggal Transfer*" id="tanggalPengajuan" type="date" v-model="form.tanggalPengajuan"
      placeholder="Pilih Tanggal Lahir Beneficial Owner Anda" :readonly="true" />

    <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
      Rekening Sumber Dana
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      Untuk melanjutkan proses, kami memerlukan informasi tambahan terkait data pengirim sumber dana.
    </p>

    <FormField label="Sumber Dana" id="sumberDana" :isDropdown="true" v-model="form.sumberDana"
      :options="sumberDanaOptions" placeholder="Pilih Sumber Dana Anda" :readonly="true" />

    <div v-if="form.sumberDana === 'lainnya'" class="">
      <FormField label="Sumber Dana Lainnya *" id="sumberDanaLainnya" type="text" v-model="form.sumberDanaLainnya"
        placeholder="Masukkan Sumber Dana Lainnya" :readonly="true" />
    </div>

    <FormField label="Nomor Rekening Tabungan Universal*" id="nomorRekening" v-model="form.nomorRekeningPengirim"
      :maxlength="10" variant="numeric" placeholder="Masukkan Nomor Rekening" required :readonly="true" />

    <FormField label="Nama Pemilik Sumber Dana*" id="namaLengkap" v-model="form.namaLengkapPengirim" :maxlength="25"
      placeholder="Masukkan Nama Pemilik Sumber Dana" required :readonly="true" />

    <!-- <FormField label="Pilih Jaringan Kantor*" id="kantorCabang" :isDropdown="true" v-model="form.kantorCabang"
      placeholder="Pilih Jaringan Kantor" :options="kantorCabangOptions" required />

    <div v-if="form.kantorCabang" class="mt-4">
      <FormField label="Alamat Jaringan Kantor Pembukaan Rekening" id="alamatKantorCabang"
        v-model="form.alamatKantorCabang" :readonly="true" />
    </div> -->

    <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
      Data Penerima
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      Untuk melanjutkan proses, kami memerlukan informasi tambahan terkait data penerima sumber dana.
    </p>

    <RadioButtonChoose label="Pilih tujuan Transfer*" :options="tujuanTransferOptions" v-model="form.tujuanTransfer"
      name="tujuanTransfer" id="tujuanTransfer" />

    <div v-if="form.tujuanTransfer == 1" class="mb-4">
      <FormField label="Nama Pemilik Rekening*" id="namaPemilikRekening" v-model="form.namaLengkap" variant="alpha"
        :maxlength="50" placeholder="Masukkan Nama Pemilik Rekening" required />

      <FormField class="mb-2" label="Nomor Rekening Tabungan Universal*" id="nomorRekening" v-model="form.nomorRekening"
        variant="numeric" :maxlength="20" placeholder="Masukkan Nomor Rekening" required
        @input="handleNomorRekeningInput" @blur="handleNomorRekeningBlur" :error="nomorRekeningError"
        :hint="nomorRekeningError ? 'Nomor rekening tidak valid. Silakan periksa kembali' : ''" />

      <FormField label="Nama Bank*" id="namaBankBPR" v-model="form.namaBankBPR" placeholder="Universal BPR"
        :readonly="true" required />
    </div>

    <div v-if="form.tujuanTransfer == 2" class="mb-4">
      <div v-if="form.namaLengkap && form.nomorRekening && form.namaBank">
        <div class="flex flex-row items-center justify-between mb-2 w-full">
          <h2 class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900">Detail Penerima</h2>
          <button @click="openModalUbah"
            class="flex items-center gap-2 text-primary-500 hover:text-primary-600 focus:outline-none">
            <h2 class="text-xs sm:text-sm md:text-sm font-medium text-primary">Ubah</h2>
            <img src="@/assets/icon-edit.svg" alt="Icon" class="w-5 h-5" />
          </button>
        </div>
        <div class="border border-gray-300 rounded-md px-4 py-4">
          <div class="flex justify-between items-center w-full">
            <div class="flex flex-col gap-2">
              <p class="text-xs sm:text-sm md:text-sm font-regular text-neutral-700">Nama Lengkap</p>
              <p class="text-xs sm:text-sm md:text-sm font-semibold">{{ form.namaLengkap }}</p>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-xs sm:text-sm md:text-sm font-regular text-neutral-700">Nomor rekening</p>
              <p class="text-xs sm:text-sm md:text-sm font-semibold">{{ form.nomorRekening }}</p>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-xs sm:text-sm md:text-sm font-regular text-neutral-700">Nama Bank</p>
              <p class="text-xs sm:text-sm md:text-sm font-semibold">{{ form.namaBank }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="">
        <h2 class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900 mb-2">Detail Penerima*</h2>
        <div class="border border-dashed border-gray-300 rounded-md px-4 py-3 flex items-center justify-between">
          <span class="text-gray-500">Belum Ada Penerima</span>
          <ButtonComponent variant="outline" @click="openModal" class="mb-1">
            Masukkan
          </ButtonComponent>
        </div>
      </div>
    </div>

    <FormField label="Alamat (Opsional)" id="alamat" type="text" v-model="form.alamat" placeholder="Masukkan Alamat"
      :maxlength="50" />

    <FormField label="Nomor Handphone (Opsional)" id="phone" type="phone" v-model="form.phone" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid. Silakan periksa kembali.'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" />

    <h2 class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-left mb-1">
      Rincian Transfer
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      Untuk melanjutkan proses, kami memerlukan informasi tambahan terkait data penerima sumber dana.
    </p>

    <FormField label="Nominal Jumlah yang dikirim*" id="nominal" :isDropdown="false" v-model="formattedNominal"
      placeholder="Masukkan Jumlah Nominal" variant="numeric" :maxlength="18" :required="true"
      :hint="nominalError || ''" :error="!!nominalError" @input="updateNominal($event.target.value)" />

    <FormField label="Terbilang" id="terbilang" :isDropdown="false" v-model="form.terbilang" :required="true"
      placeholder="Masukkan Nominal Pembukaan Deposito" :readonly="true" />

    <FormField label="Keterangan Transaksi*" id="keteranganTransaksi" v-model="form.keteranganTransaksi" :maxlength="50"
      placeholder="Masukkan Nama Keterangan Transaksi" />

    <!-- <FormField label="Metode Transfer" id="metodeTransfer" :isDropdown="true" v-model="selectedTransferMethod"
      :options="filteredTransferMethods.map(method => ({ value: method.id, label: `${method.name} (Biaya ${method.fee}) - ${method.limit}` }))"
      placeholder="Pilih Metode Transfer" :disabled="filteredTransferMethods.length === 0" />
    <div v-if="selectedTransferMethod">
      <p class="text-xs text-gray-500 mt-2">
        {{transferMethods.find(m => m.id === selectedTransferMethod)?.availability}}
      </p>
    </div>
    <div v-else-if="filteredTransferMethods.length === 0" class="text-gray-500 mt-2">
      Metode transfer tidak tersedia untuk nominal ini.
    </div> -->

    <div v-if="filteredTransferMethods.length > 0" class="space-y-2 mb-4">
      <h2 class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-left mt-4 mb-1">
        Metode Transfer*
      </h2>
      <p class="text-sm text-gray-600 mb-4">
        Pilih metode transfer yang sesuai dengan nominal yang Anda masukkan.
      </p>
      <div v-for="method in filteredTransferMethods" :key="method.id" @click="selectedTransferMethod = method.id"
        :class="[
          'border rounded-md p-4 cursor-pointer',
          { 'border-green-500 bg-green-50': selectedTransferMethod === method.id }
        ]">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">{{ method.name }} (Biaya {{ formatCurrency(method.fee) }})</h3>
            <p class="text-sm text-gray-600">{{ method.limit }}</p>
            <p class="text-xs text-gray-500">{{ method.availability }}</p>
          </div>
          <img v-if="selectedTransferMethod === method.id" src="@/assets/Checkmark-icon.svg" alt="Terpilih"
            class="w-5 h-5 m-1 text-green-500">
        </div>
      </div>
    </div>
    <!-- <div v-else class="text-gray-500 mb-4">
      Metode transfer tidak tersedia untuk nominal ini.
    </div> -->

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent variant="default" :disabled="isButtonDisabled" type="submit">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
  <ReusableModal :isOpen="isModalOpen" :rekeningData="rekeningData" @close="isModalOpen = false"
    :handleTransfer="handleTransferFromModal" />
  <!-- <ModalTransfer :isOpen="isModalTransferOpen" :methods="filteredTransferMethods" :selectedMethod="selectedMethod"
    @update:selectedMethod="selectedMethod = $event" @confirm="confirmMethod" @close="isModalTransferOpen = false" /> -->
</template>

<script>
import api from "@/API/api.js"
import axios from "axios";
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";
import { sumberDanaOptions, tujuanTransferOptions } from "@/data/option.js";
import { FormModelPengirimPemindahbukuan } from "@/models/formModel";
import { toTerbilang } from "@/utils/toTerbilang.js";
import ReusableModal from "@/components/ModalRekeningTransfer.vue";
// import ModalTransfer from "@/components/ModalTransfer.vue";
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import { fetchBranches } from '@/services/service.js';
import { handleFieldMixin } from "@/handler/handleField.js";


export default {
  mixins: [handleFieldMixin],
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
    ReusableModal,
    // ModalTransfer,
    CustomCheckbox
  },
  emits: ['updateProgress'],
  setup() {
    const fileStore = useFileStore();
    return { fileStore };
  },
  data() {
    return {
      form: new FormModelPengirimPemindahbukuan("Universal BPR",),
      touched: {
        phone: false,
      },
      phoneError: false,
      nomorRekeningError: false,
      selectedCountryCode: "ID",
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
      isChecked: false,
      sumberDanaOptions,
      tujuanTransferOptions,
      // selectedMethod: null,
      validBranchCodes: [],
      isModalOpen: false,
      nominalError: false,
      transferMethods: [
        {
          id: "RTGS",
          name: "RTGS",
          fee: "30000",
          limit: "> Rp 100.000.001",
          availability: "Tersedia pukul 08:30-12:00 WIB di hari kerja. Pengajuan transaksi di luar jam ini akan diproses di hari kerja berikutnya.",
        },
        {
          id: "LLG",
          name: "LLG",
          fee: "2900",
          limit: "Limit Rp50.000.001-100.000.000",
          availability: "Tersedia pukul 08:30-12:00 WIB di hari kerja. Pengajuan transaksi di luar jam kerja ini akan diproses di hari kerja berikutnya.",
        },
        {
          id: "Transfer Online",
          name: "Transfer Online",
          fee: "7500",
          limit: "Limit Rp 10.000-50.000.000",
          availability: "Tersedia pukul 08:30-14:00 WIB di hari kerja. Pengajuan transaksi di luar jam ini akan diproses di hari kerja berikutnya.",
        },
      ],
      modelData: {
        namaLengkap: "",
        nomorRekening: "",
        namaBank: "",
        pembayaranBunga: "",
      },
      selectedTransferMethod: null,
    };
  },
  computed: {
    formattedNominal: {
      get() {
        return this.form.nominal !== null && this.form.nominal !== undefined
          ? `Rp ${this.form.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
          : "";
      },
      set(value) {
        this.updateNominal(value);
      },
    },

    filteredTransferMethods() {
      const nominal = parseInt(this.form.nominal) || 0;
      if (nominal >= 10000 && nominal <= 50000000) {
        return this.transferMethods.filter((method) => method.id === "Transfer Online");
      } else if (nominal >= 50000001 && nominal <= 100000000) {
        return this.transferMethods.filter((method) => method.id === "Transfer Online" || method.id === "LLG");
      } else if (nominal > 100000000) {
        return this.transferMethods;
      } else {
        return [];
      }
    },
    isButtonDisabled() {
      // Validasi field-field yang selalu wajib diisi
      const commonFieldsValid =
        !!this.form.namaLengkapPengirim &&       // Nama Pemilik Sumber Dana
        !!this.form.tanggalPengajuan &&
        !!this.form.sumberDana &&
        (this.form.sumberDana !== 'lainnya' || !!this.form.sumberDanaLainnya) && // Validasi kondisional
        !!this.form.nomorRekeningPengirim &&
        !!this.form.keteranganTransaksi &&
        !!this.form.nominal;

      // Validasi berdasarkan pilihan tujuan transfer (Radio Button)
      let tujuanTransferValid = false;
      if (this.form.tujuanTransfer === 1) {
        // Validasi untuk Tujuan Transfer 1 (ke rekening Universal BPR)
        // Field 'Nama Pemilik Rekening*' terikat ke form.namaLengkap
        // Field 'Nomor Rekening Tabungan Universal*' terikat ke form.nomorRekening
        tujuanTransferValid =
          !!this.form.namaLengkap &&
          !!this.form.nomorRekening;
        // !!this.form.namaBankBPR;
      } else if (this.form.tujuanTransfer === 2) {
        // Validasi untuk Tujuan Transfer 2 (ke bank lain)
        // Field Detail Penerima diisi lewat modal dan terikat ke form.namaLengkap, form.nomorRekening, form.namaBank
        tujuanTransferValid =
          !!this.form.namaLengkap &&
          !!this.form.nomorRekening &&
          !!this.form.namaBank;
      } else {
        // Jika tujuanTransfer belum dipilih
        tujuanTransferValid = false;
      }

      // Validasi untuk Metode Transfer
      const metodeTransferValid = this.selectedTransferMethod !== null;

      // --- LOGGING STATUS VALIDASI ---
      console.log('--- Status Validasi Form ---');
      console.log(`Common Fields Valid: ${commonFieldsValid}`);
      console.log(`Tujuan Transfer Valid: ${tujuanTransferValid}`);
      console.log(`Metode Transfer Valid: ${metodeTransferValid}`);
      console.log(`Tombol Disabled: ${!(commonFieldsValid && tujuanTransferValid && metodeTransferValid)}`);
      console.log('-----------------------------');

      // Tombol akan disabled jika ada field wajib yang belum valid
      return !(commonFieldsValid && tujuanTransferValid && metodeTransferValid);
    },
  },
  watch: {
    'form.tujuanTransfer'(newVal) {
      if (newVal === '1') {
        this.form.nomorRekening = '';
        this.form.namaLengkap = '';
        this.nomorRekeningError = false;
      } else if (newVal === '2') {
        this.form.nomorRekening = '';
        this.form.namaLengkap = '';
        this.form.namaBank = '';
        this.nomorRekeningError = false;
      }
    },
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
    "form.kantorCabang"(newVal) {
      this.form.alamatKantorCabang = this.kantorCabangAlamat[newVal] || "Alamat tidak ditemukan";
    },
    isModalOpen(newValue) {
      if (!newValue) {
        this.modalData = {
          namaLengkap: "",
          nomorRekening: "",
          namaBank: "",
        };
      }
    },
    "fileStore.formDataPengirimPemindahbukuan": {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
    "fileStore.formDataPenerimaPemindahbukuan": {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
    "form.nominal"(newVal) {
      if (newVal !== null && newVal !== undefined) {
        this.selectedTransferMethod = null;
      }
      this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
      if (newVal === 0) {
        this.nominalError = "Nominal tidak boleh 0.";
      } else {
        this.nominalError = null;
        // this.validateNominal();
      }
      if (newVal && newVal.toString().length > 12) {
        this.nominalError = "Nominal tidak boleh lebih dari 12 digit.";
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

    handleNomorRekeningBlur() {
      if (this.form.nomorRekening) {
        this.nomorRekeningError = !this.validateNomorRekening(this.form.nomorRekening);
      } else {
        this.nomorRekeningError = false;
      }
    },
    async fetchBranches() {
      try {
        const { kantorCabangOptions, kantorCabangAlamat } = await fetchBranches();
        this.kantorCabangOptions = kantorCabangOptions;
        this.kantorCabangAlamat = kantorCabangAlamat;
      } catch (error) {
        console.error('Gagal mengambil data kantor cabang:', error);
      }
    },
    formatCurrency(amount) {
      let amountNumber = parseFloat(amount);
      if (isNaN(amountNumber)) {
        return amount;
      }
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amountNumber);
    },
    handleTransferFromModal(data) {
      this.fileStore.setFormDataPenerimaPemindahbukuan({
        ...this.fileStore.formDataPenerimaPemindahbukuan,
        tujuanTransfer: "2",
        namaLengkap: data.namaLengkap,
        namaBank: data.namaBank,
        nomorRekening: data.nomorRekening,
      });
      this.isModalOpen = false;
    },
    clearRecipientData() {
      this.fileStore.setFormDataPenerimaPemindahbukuan({
        ...this.fileStore.formDataPenerimaPemindahbukuan,
        namaLengkap: "",
        nomorRekening: "",
        namaBank: "",
      });

      this.form.namaLengkap = "";
      this.form.nomorRekening = "";
      this.form.namaBank = "";
    },
    openModal() {
      this.isModalOpen = true;
    },
    openModalUbah() {
      this.clearRecipientData();
    },

    validatePhone(phone) {
      return /^(8)\d{6,12}$/.test(phone) && !phone.startsWith('0');
    },
    handlePhoneBlur() {
      this.touched.phone = true;
      if (this.form.phone) {
        this.phoneError = !this.validatePhone(this.form.phone);
      }
    },
    updateNominal(value) {
      const rawValue = value.replace(/\D/g, "");
      this.form.nominal = rawValue ? parseInt(rawValue, 10) : 0;
    },
    async fetchData() {
      try {
        const fileStore = useFileStore();
        const pengirim = fileStore.formDataPengirimPemindahbukuan;
        const pindahBuku = fileStore.formDataPemindahbukuan;
        const penerima = fileStore.formDataPenerimaPemindahbukuan;

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

        // Aplikasikan data penerima ke state form
        if (penerima && penerima.namaLengkap) {
          this.form.namaLengkap = penerima.namaLengkap;
        }
        if (penerima && penerima.namaBank) {
          this.form.namaBank = penerima.namaBank;
        }
        if (penerima && penerima.nomorRekening) {
          this.form.nomorRekening = penerima.nomorRekening;
        }
        if (penerima && penerima.tujuanTransfer) {
          this.form.tujuanTransfer = penerima.tujuanTransfer;
        }
        // if (penerima && penerima.kantorCabang) {
        //   this.form.kantorCabang = penerima.kantorCabang;
        // }
        if (penerima && penerima.metodeTransfer) {
          this.form.metodeTransfer = penerima.metodeTransfer;
        }
        if (penerima && penerima.alamat) {
          this.form.alamat = penerima.alamat;
        }
        if (penerima && penerima.namaPemilikRekening) {
          this.form.namaPemilikRekening = penerima.namaPemilikRekening;
        }
        if (fileStore.nama_lengkap) {
          this.form.namaPemilikRekening = fileStore.nama_lengkap;
        }
        if (penerima && penerima.phone) {
          this.form.phone = penerima.phone;
        }
        if (penerima && penerima.nominal) {
          this.form.nominal = penerima.nominal;
        }
        if (penerima && penerima.keteranganTransaksi) {
          this.form.keteranganTransaksi = penerima.keteranganTransaksi;
        }
        console.log("Form setelah fetchData Data Penerima:", this.form);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    goBack() {
      this.$router.push({ path: "/dashboard/uploadDokumenPemindahbukuan" });
    },

    async handleSubmit() {
      if (!this.isButtonDisabled) {
        try {
          const selectedMethodInfo = this.transferMethods.find(
            (method) => method.id === this.selectedTransferMethod
          );

          const selectedBranch = this.kantorCabangOptions.find(
            branch => branch.value === this.form.kantorCabang
          );

          const requestData = {
            uuid: this.fileStore.uuid || "",
            penerima_nama: this.form.namaLengkap,
            penerima_telp: this.form.phone,
            penerima_alamat: this.form.alamat,
            penerima_rekening: this.form.nomorRekening,
            // penerima_bank: this.form.namaBank,
            penerima_bank: this.form.tujuanTransfer == 1 ? "Universal BPR" : this.form.namaBank,
            keterangan_transaksi: this.form.keteranganTransaksi,
            // nominal_transfer: this.formattedNominal,
            nominal_transfer: parseInt(this.form.nominal),
            // biaya: selectedMethodInfo ? selectedMethodInfo.fee : null,
            biaya: selectedMethodInfo ? parseInt(selectedMethodInfo.fee) : null,
            metode_transfer: this.selectedTransferMethod,
            // kode_kantor_cabang: this.form.kantorCabang,
            // kantor_cabang: selectedBranch ? selectedBranch.label : "",
          };

          const response = await api.post("/pengirim-penerima-data", requestData, {
            headers: { 'Content-Type': 'application/json' }
          });

          if (response.status === 201 || response.status === 200) {
            // console.log("Data berhasil dikirim:", response.data);
            // // this.fileStore.setFormDataPenerimaPemindahbukuan(requestData);
            // this.fileStore.setFormDataPenerimaPemindahbukuan({
            //   ...this.form,
            //   metodeTransfer: this.selectedTransferMethod,
            //   biayaTransfer: selectedMethodInfo ? parseInt(selectedMethodInfo.fee) : null,
            // });

            let formDataForFileStore = {
              ...this.form,
              metodeTransfer: this.selectedTransferMethod,
              biayaTransfer: selectedMethodInfo ? parseInt(selectedMethodInfo.fee) : null,
            };

            if (this.form.tujuanTransfer == 1) {
              formDataForFileStore.namaBank = "Universal BPR";
            }

            this.fileStore.setFormDataPenerimaPemindahbukuan(formDataForFileStore);


            window.scrollTo(0, 0);
            this.$router.push({ path: "/dashboard/konfirmasiDataPemindahbukuan" });
          } else {
            console.error("Gagal mengirim data, status:", response.status);
          }
        } catch (error) {
          if (error.response) {
            console.error("Error response data:", error.response.data);
          }
          console.error("Error saat mengirim data:", error);
        } finally {
          this.isSubmitting = false;
        }
      } else {
        alert("Harap lengkapi semua field dan pilih metode transfer yang sesuai.");
      }
    },
    // confirmMethod() {
    //   // Logika setelah metode transfer dikonfirmasi (jika ada)
    //   this.isModalTransferOpen = false;
    // },
    toTerbilang,
  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchData();
    this.fetchBranches();
    this.fetchBranchCodes();
  },
};
</script>

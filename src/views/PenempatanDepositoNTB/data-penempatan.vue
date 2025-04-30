<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Pilih Produk Deposito*" id="produkDeposito" :isDropdown="true" v-model="form.produkDeposito"
      placeholder="Pilih produk yang Anda inginkan" :options="produkDepositoOptions" required />

    <FormField label="Nominal Deposito*" id="nominal" :isDropdown="false" v-model="formattedNominal"
      placeholder="Masukkan Nominal Penempatan Deposito" :disabled="!form.produkDeposito" :required="true"
      :hint="nominalError || ''" :error="!!nominalError" @input="updateNominal($event.target.value)" />

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
      <FormField label="Nomor Rekening Tabungan Universal*" type="number" id="nomorRekening"
        v-model="form.nomorRekening" placeholder="Masukkan Nomor Rekening Tabungan Universal" required />

      <FormField label="Nama Pemilik Rekening Tabungan Universal*" id="namaLengkap" v-model="form.namaLengkap"
        placeholder="Masukkan Nama Pemilik Rekening Tabungan Universal" required />
    </div>

    <!-- Jika opsi value = 3 -->
    <div v-if="form.pembayaranBunga == 3" class="mt-2">
      <div class=" flex items-baseline mb-6">
        <input id="modal-checkbox" type="checkbox" v-model="isChecked"
          class="w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded-sm focus:ring-primary dark:focus:ring-primary dark:ring-offset-neutral-800 focus:ring-2 dark:bg-primary dark:border-neutral-600 self-start" />
        <p for="modal-checkbox" class="ms-2 text-sm  text-gray-900 dark:text-gray-300">
          Saya setuju bahwa pembayaran bunga deposito akan dipindahbukukan ke Rekening Tabungan Universal atas nama saya
          sendiri, yang akan dibuat oleh Petugas Bank dengan nomor rekening yang akan diinformasikan melalui email resmi
          Universal BPR: <strong>notifikasi@universalbpr.co.id</strong>
        </p>
      </div>
    </div>

    <!-- Jika opsi value = 4 -->
    <div v-if="form.pembayaranBunga == 4" class="mt-4">
      <div class="mb-4">
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
                <p class="text-xs sm:text-sm md:text-sm font-regular text-neutral-700">Nomor rekening</p>
                <p class="text-xs sm:text-sm md:text-sm font-semibold">{{ form.namaBank }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="border border-dashed border-gray-300 rounded-md px-4 py-3 flex items-center justify-between">
          <span class="text-gray-500">Belum Ada Penerima</span>
          <ButtonComponent variant="outline" @click="openModal" class="mb-1">
            Masukkan
          </ButtonComponent>
        </div>
      </div>

      <label class="flex items-baseline space-x-2 mt-4">
        <input type="checkbox" v-model="setujuBiayaTransfer" required />
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
    <label class=" flex items-baseline mb-6">
      <input type="checkbox" v-model="setujuPenyetoran" required />
      <p for="modal-checkbox" class="ms-2 text-sm  text-gray-900 dark:text-gray-300">
        Saya Setuju bahwa penyetoran untuk penempatan deposito akan dilakukan pendebetan melalui rekening Tabungan
        Universal atas nama saya sendiri yang akan dibuat oleh Petugas Bank dan diinformasikan kepada saya melalui email
        resmi Universal BPR: <strong>notifikasi@universalbpr.co.id</strong>
      </p>
    </label>

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent variant="default" @click="handleSubmit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
  <ReusableModal :isOpen="isModalOpen" rekeningData="rekeningData" @close="isModalOpen = false"
    :handleTransfer="handleTransferFromModal" />
  <ReusableModal2 :isOpen="isModalOpen2" rekeningData="rekeningData" @close="isModalOpen2 = false"
    :handleTransfer="handleTransferFromModal2" />
  <!-- <ModalTransfer :isOpen="isModalTransferOpen" :methods="filteredTransferMethods" :selectedMethod="selectedMethod"
    @update:selectedMethod="selectedMethod = $event" @confirm="handleSubmit" @close="isModalTransferOpen = false" /> -->
</template>

<script>
import api from "@/API/api.js";
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";
import { jangkaWaktuDepositoUniversalOptions, jangkaWaktuDepositoDEBUTSanmereOptions, jangkaWaktuDepositoDEBUTMatiusOptions, jangkaWaktuDepositoPeduliOptions, jangkaWaktuDepositoGreenOptions, metodePencairanOptions, pembayaranBungaOptions, produkDepositoOptions, metodePenyetoranNTBOptions } from "@/data/option.js";
import { FormModelPenempatanDeposito } from "@/models/formModel";
import { hitungBungaUniversal, hitungBungaPeduli, hitungBungaDEBUTSanmere, hitungBungaDEBUTMatius, hitungBungaGreen, } from "@/data/bunga-deposito.js";
import ReusableModal from "@/components/ModalRekeningOnUs.vue";
import ReusableModal2 from "@/components/ModalRekeningOfUs.vue";
import { toTerbilang } from "@/utils/toTerbilang.js";

export default {
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
    ReusableModal,
    ReusableModal2,
  },
  emits: ['updateProgress'],
  setup() {
    const fileStore = useFileStore();
    return { fileStore };
  },
  data() {
    return {
      form: new FormModelPenempatanDeposito(),
      isChecked: false,
      setujuPenyetoran: false,
      setujuBiayaTransfer: false,
      metodePencairanOptions,
      produkDepositoOptions,
      jangkaWaktuDepositoUniversalOptions,
      jangkaWaktuDepositoDEBUTMatiusOptions,
      jangkaWaktuDepositoDEBUTSanmereOptions,
      jangkaWaktuDepositoPeduliOptions,
      jangkaWaktuDepositoGreenOptions,
      pembayaranBungaOptions,
      metodePenyetoranNTBOptions,
      nominalError: false,
      // isModalTransferOpen: false,
      selectedMethod: null,
      isModalOpen: false,
      isModalOpen2: false,
      // transferMethods: [
      //   {
      //     id: "llg",
      //     name: "LLG",
      //     fee: "Rp2.900",
      //     limit: "Limit Rp50.000.001-100.000.000",
      //     availability: "Tersedia pukul 08:30-12:00 WIB di hari kerja. Pengajuan transaksi di luar jam kerja ini akan diproses di hari kerja berikutnya.",
      //   },
      //   {
      //     id: "online",
      //     name: "Transfer Online",
      //     fee: "Rp7.500",
      //     limit: "Limit Rp 10.000-50.000.000",
      //     availability: "Tersedia pukul 08:30-14:00 WIB di hari kerja. Pengajuan transaksi di luar jam ini akan diproses di hari kerja berikutnya.",
      //   },
      //   {
      //     id: "rtgs",
      //     name: "RTGS",
      //     fee: "Rp30.000",
      //     limit: "> Rp 100.000.001",
      //     availability: "Tersedia pukul 08:30-12:00 WIB di hari kerja. Pengajuan transaksi di luar jam ini akan diproses di hari kerja berikutnya.",
      //   },
      // ],
      modelData: {
        namaLengkap: "",
        nomorRekening: "",
        namaBank: "",
        pembayaranBunga: "",
      },
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
    // filteredTransferMethods() {
    //   const nominal = parseInt(this.form.nominal) || 0;
    //   if (nominal < 50000000) {
    //     return this.transferMethods.filter((method) => method.id === "online");
    //   } else if (nominal >= 50000000 && nominal <= 100000000) {
    //     return this.transferMethods.filter((method) => method.id === "online" || method.id === "llg");
    //   } else {
    //     return this.transferMethods;
    //   }
    // },
    isButtonDisabled() {
      return (
        !this.form.nominal ||
        !this.form.terbilang ||
        !this.form.jangkaWaktu ||
        !this.setujuPenyetoran ||
        !this.form.metodePenyetoran ||
        !this.form.metodePencairan ||
        !this.form.pembayaranBunga ||
        (this.form.pembayaranBunga == 2 && (!this.form.nomorRekening || !this.form.namaLengkap)) ||
        (this.form.pembayaranBunga == 3 && (!this.isChecked)) ||
        // (this.form.pembayaranBunga == 4 && (!this.form.namaBank || !this.form.nomorRekening || !this.form.namaLengkap || !this.form.setujuBiayaTransfer)) ||
        (this.form.pembayaranBunga == 4 && (!this.form.namaBank || !this.form.nomorRekening || !this.form.namaLengkap || !this.setujuBiayaTransfer)) ||
        !!this.nominalError
      );
    },
    formattedBunga() {
      const nominal = parseFloat(this.form.nominal) || 0;
      const jangkaWaktu = this.form.jangkaWaktu;

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
    "form.pembayaranBunga": function (newValue) {
      if (newValue === 1) {
        this.form.namaLengkap = "";
        this.form.nomorRekening = "";
        this.form.namaBank = "";
        this.setujuBiayaTransfer = false;
        this.isChecked = false;
      } else if (newValue !== 2 && newValue !== 4) {
        this.form.namaLengkap = "";
        this.form.nomorRekening = "";
        this.form.namaBank = "";
        this.setujuBiayaTransfer = false;
      }
      if (newValue !== 3) {
        this.isChecked = false;
      }
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
    isModalOpen2(newValue) {
      if (!newValue) {
        this.modalData = {
          namaLengkap: "",
          nomorRekening: "",
          namaBank: "",
        };
      }
    },
    "fileStore.formPenempatanDeposito": {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
    "form.nominal"(newVal) {
      this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
      if (newVal === 0) {
        this.nominalError = "Nominal tidak boleh 0.";
      } else {
        this.nominalError = null;
        this.validateNominal();
      }
      if (newVal && newVal.toString().length > 12) {
        this.nominalError = "Nominal tidak boleh lebih dari 12 digit.";
      }
    },
    "form.produkDeposito"(newVal) {
      this.validateNominal(); // Tambahkan ini
    },
  },
  methods: {
    handleTransferFromModal(data) {
      this.fileStore.setFormPenempatanDeposito({
        ...this.fileStore.formPenempatanDeposito,
        pembayaranBunga: "4",
        namaLengkap: data.namaLengkap,
        namaBank: data.namaBank,
        nomorRekening: data.nomorRekening,
      });
      this.isModalOpen = false;
    },
    handleTransferFromModal2(data) {
      this.fileStore.setFormPenempatanDeposito({
        ...this.fileStore.formPenempatanDeposito,
        pembayaranBunga: "2",
        namaLengkap: data.namaLengkap,
        namaBank: "BPR UNIVERSAL",
        nomorRekening: data.nomorRekening,
      });
      this.isModalOpen = false;
    },
    validateNominal() {
      if (!this.form.produkDeposito || !this.form.nominal) {
        this.nominalError = false;
        return;
      }

      if (this.form.nominal === 0) {
        this.nominalError = "Nominal tidak boleh 0.";
        return;
      }

      if (this.form.nominal && this.form.nominal.toString().length > 12) {
        this.nominalError = "Nominal tidak boleh lebih dari 12 digit.";
        return;
      }

      const minimalNominal = this.getMinimalNominal(this.form.produkDeposito);
      if (this.form.nominal < minimalNominal) {
        this.nominalError = `Minimal nominal untuk produk ini adalah Rp ${minimalNominal.toLocaleString()}`;
      } else {
        this.nominalError = false;
      }
    },
    getMinimalNominal(produkDeposito) {
      const produk = this.produkDepositoOptions.find(
        (option) => option.value === produkDeposito
      );
      if (produk) {
        const minimalNominal = produk.subtitle.match(/Rp ([\d.]+)/);
        return minimalNominal ? parseInt(minimalNominal[1].replace(/\./g, "")) : 0;
      }
      return 0;
    },
    clearRecipientData() {
      this.fileStore.setFormPenempatanDeposito({
        ...this.fileStore.formPenempatanDeposito,
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
    openModal2() {
      this.isModalOpen2 = true;
    },
    async fetchData() {
      try {
        const fileStore = useFileStore();
        const emailData = fileStore.formEmailRequestDepositoNTB;
        const depositoData = fileStore.formPenempatanDeposito;

        if (emailData) {
          Object.keys(this.form).forEach((key) => {
            if (emailData[key] !== undefined) {
              this.form[key] = emailData[key];
            }
          });
        }

        if (depositoData) {
          Object.keys(this.form).forEach((key) => {
            if (depositoData[key] !== undefined) {
              this.form[key] = depositoData[key];
            }
          });
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
      this.$router.go(-1);
    },
    async handleSubmit() {
      try {
        const namaBank = this.form.pembayaranBunga == 4 ? this.form.namaBank : "";
        const nomorRekening = this.form.pembayaranBunga == 2 || this.form.pembayaranBunga == 4 ? this.form.nomorRekening : "";
        const namaPemilik = this.form.pembayaranBunga == 2 || this.form.pembayaranBunga == 4 ? this.form.namaLengkap : "";

        let selectedOption = null;
        let currentOptions = [];

        switch (Number(this.form.produkDeposito)) {
          case 1:
            currentOptions = jangkaWaktuDepositoUniversalOptions;
            break;
          case 2:
            currentOptions = jangkaWaktuDepositoPeduliOptions;
            break;
          case 3:
            currentOptions = jangkaWaktuDepositoDEBUTSanmereOptions;
            break;
          case 4:
            currentOptions = jangkaWaktuDepositoDEBUTMatiusOptions;
            break;
          case 5:
            currentOptions = jangkaWaktuDepositoGreenOptions;
            break;
          default:
            console.error("Produk deposito tidak valid");
            return;
        }

        selectedOption = currentOptions.find(option => option.value === this.form.jangkaWaktu);

        let jangkaWaktuToSend = null;
        let sukuBungaToSend = null;

        if (selectedOption) {
          jangkaWaktuToSend = Number(selectedOption.jangkaWaktu);
          sukuBungaToSend = parseFloat(selectedOption.sukuBunga);
        } else {
          console.warn("Opsi jangka waktu tidak ditemukan");
          return;
        }

        const requestData = {
          uuid: this.fileStore.uuid || "",
          nominal_deposito: Number(this.form.nominal),
          jangka_waktu: jangkaWaktuToSend,
          suku_bunga: sukuBungaToSend,
          saat_jatuh_tempo_nominal: Number(this.form.metodePencairan),
          pembayaran_bunga: Number(this.form.pembayaranBunga),
          nama_bank: namaBank,
          nomor_rekening: nomorRekening,
          nama_pemilik: namaPemilik,
          s_k_penempatan_deposito: true,
          produk_yang_diinginkan: Number(this.form.produkDeposito),
          penyetoran_deposito: Number(this.form.penyetoranDeposito),
          nomor_rekening_penyetoran: this.form.nomorRekeningPenyetoran,
          nama_rekening_penyetoran: this.form.namaRekeningPenyetoran,
        };

        const response = await api.post("/penempatan-deposito", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormPenempatanDeposito({
            ...this.form,
          });

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
    toTerbilang,
  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchData();
  },
};
</script>

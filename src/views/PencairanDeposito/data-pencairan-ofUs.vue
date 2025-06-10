<template>
  <form @submit.prevent="handleSubmit">
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
    <div v-if="filteredMetodePencairan.length > 0" class="space-y-2 mb-4">
      <h2 class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900 mb-2">Metode Transfer*</h2>
      <div v-for="method in filteredMetodePencairan" :key="method.id" @click="selectedTransferMethod = method.id"
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
    <div v-else class="text-gray-500 mb-4">
      Metode pencairan tidak tersedia untuk nominal ini.
    </div>
    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent variant="default" type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
  <ReusableModal :isOpen="isModalOpen" rekeningData="rekeningData" @close="isModalOpen = false"
    :handleTransfer="handleTransferFromModal" />
</template>

<script>
import api from "@/API/api.js"
import axios from "axios";
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";
import { FormModelPenempatanDeposito } from "@/models/formModel";
import ReusableModal from "@/components/ModalRekeningTransfer.vue";
import { toTerbilang } from "@/utils/toTerbilang.js";

export default {
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
    ReusableModal,
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
      isModalOpen: false,
      transferMethods: [
        {
          id: "RTGS",
          name: "RTGS",
          fee: "30000",
          limit: "> Rp 100.000.001",
          availability: "Tersedia pukul 08:30-12:00 WIB di hari kerja. Pengajuan transaksi di luar jam ini akan diproses di hari kerja berikutnya.",
          value: 1,
        },
        {
          id: "LLG",
          name: "LLG",
          fee: "2900",
          limit: "Limit Rp50.000.001-100.000.000",
          availability: "Tersedia pukul 08:30-12:00 WIB di hari kerja. Pengajuan transaksi di luar jam kerja ini akan diproses di hari kerja berikutnya.",
          value: 2,
        },
        {
          id: "Transfer Online",
          name: "Transfer Online",
          fee: "7500",
          limit: "Limit Rp 10.000-50.000.000",
          availability: "Tersedia pukul 08:30-14:00 WIB di hari kerja. Pengajuan transaksi di luar jam ini akan diproses di hari kerja berikutnya.",
          value: 3,
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

    filteredMetodePencairan() {
      const nominal = parseInt(this.form.nominal) || 0;
      console.log("Nominal saat filter:", nominal);
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

    // isButtonDisabled() {
    //   return !(
    //     this.form.namaBank &&
    //     this.form.nomorRekening &&
    //     this.form.namaPemilikRekening
    //   );
    // },

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
    "fileStore.formPenempatanDeposito": {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
    "form.nominal"(newVal) {
      this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
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
    "form.nominal"(newVal) {
      console.log("form.nominal berubah menjadi:", newVal);
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
      this.fileStore.setFormPenempatanDeposito({
        namaLengkap: data.namaLengkap,
        namaBank: data.namaBank,
        nomorRekening: data.nomorRekening,
      });
      this.isModalOpen = false;
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
    updateNominal(value) {
      const rawValue = value.replace(/\D/g, "");
      this.form.nominal = rawValue ? parseInt(rawValue, 10) : 0;
    },
    async fetchData() {
      try {
        const fileStore = useFileStore();
        const emailData = fileStore.formEmailRequestDepositoNTB;
        const depositoData = fileStore.formPenempatanDeposito;
        const pencairanDeposito = fileStore.formInstruksiPencairanDeposito;

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

        if (depositoData && depositoData.namaLengkap !== undefined) {
          this.form.namaLengkap = depositoData.namaLengkap;
        }

        if (depositoData && depositoData.nomorRekening !== undefined) {
          this.form.nomorRekening = depositoData.nomorRekening;
        }

        if (depositoData && depositoData.namaBank !== undefined) {
          this.form.namaBank = depositoData.namaBank;
        }

        if (pencairanDeposito && pencairanDeposito.nominal !== undefined) {
          this.form.nominal = pencairanDeposito.nominal;
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
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

        const selectedMethodObject = this.transferMethods.find(
          (method) => method.id === this.selectedTransferMethod
        );

        const metodeTransferValue = selectedMethodObject ? selectedMethodObject.value : null;
        const metodeTransferName = selectedMethodObject ? selectedMethodObject.name : null;
        const metodeTransferFee = selectedMethodObject ? selectedMethodObject.fee : null;

        const requestData = {
          uuid: uuid,
          nama_bank: this.form.namaBank,
          nomor_rekening: this.form.nomorRekening,
          nama_pemilik: this.form.namaPemilikRekening,
          metode_transfer: metodeTransferValue,
        };

        console.log("Request data:", requestData);

        const response = await api.post("/transfer-deposito", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormDataPencairanDeposito({
            ...this.form,
            metodeTransfer: metodeTransferName,
            biayaTransfer: metodeTransferFee,
          });
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
    toTerbilang,
  },
  mounted() {
    this.$emit("update-progress", 60);
  },
  created() {
    this.fetchData();
  },
};
</script>

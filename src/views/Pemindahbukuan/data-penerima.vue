<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <div v-if="form.namaLengkap && form.nomorRekening && form.namaBank">
        <div class="flex flex-row items-center justify-between mb-2 w-full">
          <h2 class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900">Detail Penerima</h2>
          <button @click="openModal"
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

    <FormField label="Alamat*" id="alamat" type="text" v-model="form.alamat" placeholder="Masukkan Alamat" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode"
      :hint="phoneError ? 'Nomor handphone tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi nomor handphone yang aktif'"
      :error="phoneError" @blur="handlePhoneBlur" />

    <h2 class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-left mb-1">
      Rincian Data Penerima
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      Untuk melanjutkan proses, kami memerlukan informasi tambahan terkait data penerima sumber dana.
    </p>

    <FormField label="Nominal Deposito*" id="nominal" type="text" :isDropdown="false" v-model="formattedNominal"
      placeholder="Masukkan Nominal Pembukaan Deposito" :disabled="!form.produkDeposito" :required="true"
      @input="updateNominal" />

    <FormField label="Terbilang" id="terbilang" :isDropdown="false" v-model="form.terbilang" :required="true"
      placeholder="Masukkan Nominal Pembukaan Deposito" :readonly="true" />

    <FormField label="Keterangan Transaksi*" id="keteranganTransaksi" v-model="form.keteranganTransaksi"
      placeholder="Masukkan Nama Keterangan Transaksi" required />

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent variant="default" @click="openModalTransfer">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
  <ReusableModal :isOpen="isModalOpen" @close="isModalOpen = false" />
  <ModalTransfer :isOpen="isModalTransferOpen" :methods="filteredTransferMethods" :selectedMethod="selectedMethod"
    @update:selectedMethod="selectedMethod = $event" @confirm="confirmMethod" @close="isModalTransferOpen = false" />
</template>

<script>
import api from "@/API/api.js"
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalRekening.vue";
import { useFileStore } from "@/stores/filestore";
import { penghasilanOptions } from "@/data/option.js";
import { FormModelPenerimaPemindahbukuan } from "@/models/formModel";
import ModalTransfer from "@/components/ModalTransfer.vue";

export default {
  emits: ['update-progress'],
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
    ReusableModal,
    ModalTransfer,
  },
  computed: {
    isButtonDisabled() {
      const phoneValid =
        this.form.phone && /^(8)\d{6,12}$/.test(this.form.phone);
      return !(phoneValid && this.form.alamat && this.form.keteranganTransaksi);
    },
  },
  setup() {
    const fileStore = useFileStore();
    return { fileStore };
  },
  data() {
    return {
      form: new FormModelPenerimaPemindahbukuan(),
      touched: {
        phone: false,
      },
      isChecked: false,
      selectedCountryCode: "ID",
      phoneError: false,
      isModalOpen: false,
      isModalTransferOpen: false,
      selectedMethod: null,
      penghasilanOptions,
      transferMethods: [
        {
          id: "llg",
          name: "LLG",
          fee: "Rp2.900",
          limit: "Limit Rp50.000.001-100.000.000",
          availability: "Tersedia pukul 08:30-12:00 WIB di hari kerja. Pengajuan transaksi di luar jam kerja ini akan diproses di hari kerja berikutnya.",
        },
        {
          id: "online",
          name: "Transfer Online",
          fee: "Rp7.500",
          limit: "Limit Rp 10.000-50.000.000",
          availability: "Tersedia pukul 08:30-14:00 WIB di hari kerja. Pengajuan transaksi di luar jam ini akan diproses di hari kerja berikutnya.",
        },
        {
          id: "rtgs",
          name: "RTGS",
          fee: "Rp30.000",
          limit: "> Rp 100.000.001",
          availability: "Tersedia pukul 08:30-12:00 WIB di hari kerja. Pengajuan transaksi di luar jam ini akan diproses di hari kerja berikutnya.",
        },
      ],
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

    filteredTransferMethods() {
      const nominal = parseInt(this.form.nominal) || 0;
      if (nominal < 50000000) {
        return this.transferMethods.filter((method) => method.id === "online");
      } else if (nominal >= 50000000 && nominal <= 100000000) {
        return this.transferMethods.filter((method) => method.id === "online" || method.id === "llg");
      } else {
        return this.transferMethods;
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
  watch: {
    "fileStore.formDataPenerimaPemindahbukuan": {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
    "form.nominal"(newVal) {
      this.form.terbilang = this.toTerbilang(parseInt(newVal) || 0);
    },
  },
  methods: {
    confirmMethod(methodId) {
      console.log("Metode yang dipilih:", methodId);
      this.isModalTransferOpen = false;
      const selectedMethod = this.transferMethods.find(
        (method) => method.id === methodId
      );

      if (selectedMethod) {
        this.fileStore.setFormDataPenerimaPemindahbukuan({
          ...this.fileStore.formDataPenerimaPemindahbukuan,
          metodeTransfer: selectedMethod.name,
          biayaTransfer: selectedMethod.fee,
        });

        console.log(
          "Data di fileStore setelah memilih metode transfer:",
          this.fileStore.formDataPenerimaPemindahbukuan
        );
      }
      this.$router.push({ path: "/dashboard/konfirmasiDataPemindahbukuan" });
    },
    async fetchData() {
      try {
        const fileStore = useFileStore();
        const data = fileStore.formDataPenerimaPemindahbukuan;

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
    validatePhone(phone) {
      return /^(08(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,9}$/.test(phone);
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
    goBack() {
      this.$router.push({ path: "/dashboard/dataPengirimPemindahbukuan" });
    },
    openModal() {
      console.log("Modal dibuka!");
      this.isModalOpen = true;
    },
    openModalTransfer() {
      console.log("Modal dibuka!");
      this.isModalTransferOpen = true;
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

        this.fileStore.setFormDataPenerimaPemindahbukuan(this.form);
        window.scrollTo(0, 0);
        this.$router.push({ path: "/dashboard/konfirmasiDataPemindahbukuan" });

      } catch (error) {
        console.error("Error saat menyimpan data:", error);
      } finally {
        this.isSubmitting = false;
      }

      //   const response = await api.post("/penerima-data", requestData, {
      //     headers: { 'Content-Type': 'application/json' }
      //   });

      //   console.log("Response code:", response.status);
      //   console.log("Response data:", response.data);

      //   if (response.status === 201 || response.status === 200) {
      //     console.log("Data berhasil dikirim:", response.data);
      //     this.fileStore.setFormDataPenerimaPemindahbukuan(this.form);
      //     window.scrollTo(0, 0);
      //     this.$router.push({ path: "/dashboard/konfirmasiDataPemindahbukuan" });
      //     this.isModalOpen = true;
      //   } else {
      //     console.error("Gagal mengirim data, status:", response.status);
      //   }
      // } catch (error) {
      //   if (error.response) {
      //     console.error("Error response data:", error.response.data);
      //   }
      //   console.error("Error saat mengirim data:", error);
      // }
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
  created() {
    this.fetchData();
  },
};
</script>

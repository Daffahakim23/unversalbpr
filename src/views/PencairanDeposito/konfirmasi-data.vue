<template>
  <div>
    <div class="">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data e-KTP
      </h1>
      <div v-if="formKTP" class="form-container">
        <div class="form-item" v-for="(value, key) in formKTP" :key="key">
          <div class="form-label">{{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Dokumen
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="(file, key) in uploadedFiles" :key="key" :class="[
          'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md relative',
          file
            ? 'bg-semantic/success-100 border-semantic/success-600'
            : 'bg-neutral-100 border-primary-100',
        ]">
          <div class="flex items-center">
            <img :src="getFileIcon(key)" :alt="formatFileLabel(key)" class="h-12 mr-4" />
            <span class="text-sm font-medium" :class="file ? 'text-semantic/success-700' : 'text-neutral-900'">
              {{ formatFileLabel(key) }}
            </span>
          </div>

          <div>
            <img v-if="file" src="/src/assets/success.svg" alt="Status Upload" class="h-6" />
            <img v-else src="/src/assets/download.svg" alt="Status Upload" class="h-6" />
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Instruksi Penutupan Deposito
      </h1>
      <div class="form-container">
        <div class="form-item" v-if="formInstruksiPencairan.nomorRekeningDeposito">
          <div class="form-label">Nomor Deposito:</div>
          <strong class="form-value">{{ formInstruksiPencairan.nomorRekeningDeposito }}</strong>
        </div>
        <div class="form-item" v-if="formInstruksiPencairan.terbilang">
          <div class="form-label">Terbilang:</div>
          <strong class="form-value">{{ formInstruksiPencairan.terbilang }}</strong>
        </div>
        <div class="form-item" v-if="formInstruksiPencairan.nominal">
          <div class="form-label">Nominal Deposito:</div>
          <strong class="form-value">{{ formatCurrency(formInstruksiPencairan.nominal) }}</strong>
        </div>
        <div class="form-item" v-if="formInstruksiPencairan.jangkaWaktu">
          <div class="form-label">Jangka Waktu:</div>
          <strong class="form-value">{{ formInstruksiPencairan.jangkaWaktu }}</strong>
        </div>
        <div class="form-item" v-if="formInstruksiPencairan.tanggalInstruksiPencairanDeposito">
          <div class="form-label">Tanggal Instruksi Penutupan:</div>
          <strong class="form-value">{{ formInstruksiPencairan.tanggalInstruksiPencairanDeposito }}</strong>
        </div>
        <div class="form-item" v-if="formInstruksiPencairan.tanggalJatuhTempoDeposito">
          <div class="form-label">Tanggal Jatuh Tempo:</div>
          <strong class="form-value">{{ formInstruksiPencairan.tanggalJatuhTempoDeposito }}</strong>
        </div>
        <div class="form-item" v-if="formDataPencairanDeposito.nomorRekening">
          <div class="form-label">Nomor Rekening Penutupan Deposito:</div>
          <strong class="form-value">{{ formDataPencairanDeposito.nomorRekening }}</strong>
        </div>
        <div class="form-item" v-if="formDataPencairanDeposito.metodeTransfer">
          <div class="form-label">Metode Transfer:</div>
          <strong class="form-value">{{ formDataPencairanDeposito.metodeTransfer }} ({{
            formatCurrency(parseInt(formDataPencairanDeposito.biayaTransfer)) }})</strong>
        </div>
        <div class="form-item" v-if="formDataPencairanDeposito.namaLengkap">
          <div class="form-label">Nama Pemilik Penutupan Deposito:</div>
          <strong class="form-value">{{ formDataPencairanDeposito.namaLengkap }}</strong>
        </div>
        <div class="form-item" v-if="formDataPencairanDeposito.namaBank">
          <div class="form-label">Nama Bank:</div>
          <strong class="form-value">{{ formDataPencairanDeposito.namaBank }}</strong>
        </div>
        <div class="form-item" v-if="formInstruksiPencairan.alasanPencairan">
          <div class="form-label">Alasan Penutupan Deposito:</div>
          <strong class="form-value">{{ formInstruksiPencairan.alasanPencairan }}</strong>
        </div>
        <div class="form-item" v-if="formInstruksiPencairan.sukuBunga">
          <div class="form-label">Suku Bunga:</div>
          <strong class="form-value">{{ formInstruksiPencairan.sukuBunga }}</strong>
        </div>
        <div class="form-item" v-if="formInstruksiPencairan.kantorCabang">
          <div class="form-label">Pilihan Jaringan Kantor:</div>
          <strong class="form-value">{{ formInstruksiPencairan.kantorCabang }}</strong>
        </div>
        <!-- <div class="form-item" v-if="formRekeningSumber.nomorRekeningPengirim">
          <div class="form-label">Nomor Rekening:</div>
          <strong class="form-value">{{ formRekeningSumber.nomorRekeningPengirim }}</strong>
        </div>
        <div class="form-item" v-if="formRekeningSumber.sumberDana">
          <div class="form-label">Sumber Dana:</div>
          <strong class="form-value">{{ formRekeningSumber.sumberDana }}</strong>
        </div> -->
      </div>
      <!-- <div v-if="formInstruksiPencairan" class="form-container">
        <div class="form-item" v-for="(value, key) in formInstruksiPencairan" :key="key">
          <div class="form-label">{{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
      <div v-if="formDataPencairan" class="form-container">
        <div class="form-item" v-for="(value, key) in formDataPencairan" :key="key">
          <div class="form-label">{{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div> -->
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Pernyataan dan Persetujuan Nasabah
      </h1>
      <p>
        Sehubungan dengan pengajuan aplikasi ini, maka saya menyatakan bahwa:
      </p>
      <ul class="list-decimal list-outside ml-4 text-neutral-900 space-y-2">
        <li>Deposito dan rekening tujuan Penutupan deposito sebagaimana tersebut di atas adalah benar merupakan atas
          nama saya.</li>
        <li>Saya menyatakan bahwa instruksi Penutupan dan rekening tujuan Penutupan deposito sebagaimana tersebut diatas
          telah benar dan sesuai dengan instruksi saya, dan bertanggung jawab, serta menjamin kewenangan bertindak saya
          penuh atas pemberian instruksi yang tercantum dalam pernyataan.</li>
        <li>Saya menyetujui pemotongan biaya administrasi atas biaya transfer pokok dan  bunga deposito ke rekening bank
          lain sesuai dengan ketentuan PT BPR Universal (selanjutnya disebut "Bank").</li>
        <li>Apabila Deposito Berjangka dicairkan sebelum jatuh tempo, Bank berhak untuk membebankan biaya penalti yang
          berlaku sesuai kebijakan Bank dan dikenakan dari dana Penutupan Deposito Berjangka. </li>
        <li>Saya telah menerima, membaca, mengerti, menyetujui isi Ketentuan dan Persyaratan Penutupan Deposito melalui
          Layanan E-Form Universal BPR yang telah dicantumkan. Untuk itu dengan ini saya menyatakan tunduk dan terikat
          dengen ketentuan-ketentuan tersebut, serta ketentuan lain terkait produk/fasilitas yang berlaku di Bank,
          beserta segala bentuk perubahannya yang akan diberitahukan dengan sarana yang ditetapkan Bank.</li>
        <li>Saya setuju data pribadi saya digunakan dan dibagikan kepada pihak lain yang bekerja sama atau terafiliasi
          dengan Bank sehubungan dengan pengajuan transaksi melalui layanan E-Form Universal BPR berdasarkan ketentuan
          peraturan perundang-undangan yang berlaku.</li>
        <li>Saya setuju verifikasi atas pengajuan transaksi Penutupan deposito melalui layanan E-Form Universal BPR
          menggunakan alat verifikasi yang memanfaatkan dokumen identitas diri saya, face recognition, serta teknologi
          digital signature. Proses ini telah sesuai dengan regulasi yang berlaku, baik dari kebijakan internal Bank
          maupun peraturan perundang-undangan.</li>
        <li>Saya setuju bahwa Bank dapat memperoleh, menggunakan, mengelola, dan menyimpan data biometrik saya, termasuk
          namun tidak terbatas pada gambar wajah, rekaman suara, untuk tujuan verifikasi identitas saya dalam memproses
          transaksi Penutupan deposito yang diajukan berdasarkan ketentuan peraturan perundang-undangan yang berlaku.
          <ul class="list-disc list-outside ml-4 mt-2 space-y-1">
            <li>Saya/kami tidak mematuhi ketentuan <span class="italic">Prinsip Mengenal Nasabah (Knowing Your
                Customer)</span>.</li>
            <li>Data yang saya/kami berikan kepada Bank tidak benar atau diragukan kebenarannya.</li>
            <li>Saya/kami menyalahgunakan rekening.</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div class="mt-2">
    <CustomCheckbox v-model="agreement1" labelText="Saya telah menyetujui pernyataan dan persetujuan di atas" />
  </div>

  <div class="mt-2">
    <CustomCheckbox v-model="agreement2"
      labelText="Nasabah bersedia mendapatkan informasi tambahan melalui email,SMS, Whatsapp, dan lainnya*" />
  </div>


  <div class="flex justify-between mt-6">
    <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
    <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
      {{ isSubmitting ? "Mengirim..." : "Simpan" }}
    </ButtonComponent>
  </div>

  <!-- <ModalOTP :isOpen="isModalOTPOpen" @close="isModalOTPOpen = false" @otp-method-selected="handleOTPMethodSelected"
    :icon="'nama-icon.svg'" :features="features" :no_hp="no_hp" /> -->
  <ModalKonfirmasi :isOpen="isModalOpen" @close="closeModalKonfirmasi" @yes="handleKonfirmasi" />
</template>s

<script>
import { computed } from 'vue';
import api from "@/API/api";
import RadioButtonChoose from "@/components/RadioButton.vue";
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import { kewarganegaraanOptions, rekeningTujuanOptions, trueFalseOptions } from "@/data/option";
import { FormModelKonfirmasiData } from "@/models/formModel";
import ModalOTP from "@/components/ModalOTP.vue";
import { alasanPencairanOptions, sukuBungaDepositoOptions, jangkaWaktuDepositoOptions, agamaOptions, statusPerkawinanOptions, penghasilanOptions, jumlahPenghasilanOptions, bidangPekerjaanDKOptions, korespondensiOptions, masaAktifKTPOptions, } from '@/data/option.js';
import { fetchBranches } from '@/services/service.js';
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import ModalKonfirmasi from "@/components/ModalKonfirmasi.vue";


export default {
  emits: ['updateProgress'],
  components: {
    ButtonComponent,
    RadioButtonChoose,
    // ModalOTP,
    ModalKonfirmasi,
    CustomCheckbox
  },
  name: "DataPribadi",
  computed: {
    isButtonDisabled() {
      return !this.agreement1 || !this.agreement2;
    },
    formKTP() {
      const fileStore = useFileStore();
      const data = fileStore.formKTP || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          let value = data[key];
          if (key === "jenisKelamin") {
            value = this.getLabelFromOptions(value, [
              { value: true, label: "Laki-laki" },
              { value: false, label: "Perempuan" },
            ]);
          }
          if (value === null || value === undefined || value === "") {
            continue;
          }
          if (key === "kewarganegaraan") {
            value = this.getLabelFromOptions(value, kewarganegaraanOptions);
          }
          if (key === "masaAktifKtp") {
            value = this.getLabelFromOptions(value, masaAktifKTPOptions);
          }
          if (key === "agama") {
            value = this.getLabelFromOptions(value, agamaOptions);
          }
          if (key === "statusPerkawinan") {
            value = this.getLabelFromOptions(value, statusPerkawinanOptions);
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },

    formInstruksiPencairan() {
      const fileStore = useFileStore();
      const data = fileStore.formInstruksiPencairanDeposito || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];

          if (key === "sukuBunga") {
            value = this.getLabelFromOptions(value, sukuBungaDepositoOptions);
          }
          if (key === "jangkaWaktu") {
            value = this.getLabelFromOptions(value, jangkaWaktuDepositoOptions);
          }
          if (key === "alasanPencairan") {
            value = this.getLabelFromOptions(value, alasanPencairanOptions);
          }
          if (key === "rekeningTujuan") {
            value = this.getLabelFromOptions(value, rekeningTujuanOptions);
          }
          if (key === "kantorCabang") {
            if (this.kantorCabangOptions) {
              const selectedBranch = this.kantorCabangOptions.find(
                (option) => option.value === value
              );
              value = selectedBranch ? selectedBranch.label : value;
            }
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },
    formDataPencairanDeposito() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.formDataPencairanDeposito || {}).filter(([key, value]) => value && key));
    },

    uploadedFiles() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.uploadedFiles || {}).filter(([_, value]) => value)
      );
    },
  },
  setup() {
    const fileStore = useFileStore();
    const no_hp = computed(() => fileStore.no_hp || "user@example.com");
    return { no_hp }
  },

  data() {
    return {
      form: new FormModelKonfirmasiData(),
      trueFalseOptions,
      RadioButtonChoose,
      agreement1: false,
      agreement2: false,
      isSubmitting: false,
      // isModalOTPOpen: false,
      isModalOpen: false,
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
      features: [
        {
          label: 'Pilih Metode Konfirmasi OTP',
          description: 'Kode OTP akan dikirimkan melalui metode yang Anda pilih',
          label1: 'WhatsApp',
          icon1: new URL('@/assets/whatsapp-icon.svg', import.meta.url).href,
          method1: 'whatsapp',
          label2: 'SMS',
          icon2: new URL('@/assets/sms-icon.svg', import.meta.url).href,
          method2: 'sms'
        },
      ],
    };
  },

  methods: {
    parseCurrency(currencyString) {
      if (typeof currencyString === 'string') {
        return parseFloat(currencyString.replace(/[^\d,-]/g, '').replace(',', '.'));
      }
      return isNaN(currencyString) ? 0 : parseFloat(currencyString);
    },

    formatCurrency(amount) {
      if (typeof amount !== 'number') return amount;

      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      }).format(amount);
    },
    async fetchBranches() {
      try {
        const { kantorCabangOptions, kantorCabangAlamat } = await fetchBranches();
        this.kantorCabangOptions = kantorCabangOptions;
        this.kantorCabangAlamat = kantorCabangAlamat;
      } catch (error) {
        console.error("Gagal mengambil data kantor cabang:", error);
      }
    },
    getLabelFromOptions(value, options) {
      if (!options || options.length === 0) return value;

      const found = options.find((option) => option.value === value);
      return found ? found.label : value;
    },
    goBack() {
      this.$router.push({ path: "/dashboard/dataInstruksiPencairanDeposito" });
    },
    formatLabel(key) {
      const labels = {
        nik: "NIK",
        namaLengkap: "Nama Lengkap",
        tanggalLahir: "Tanggal Lahir",
        tempatLahir: "Tempat Lahir",
        jenisKelamin: "Jenis Kelamin",
        agama: "Agama",
        alamat: "Alamat",
        rt: "RT",
        rw: "RW",
        provinsi: "Provinsi",
        kabupaten: "Kota / Kabupaten",
        kecamatan: "Kecamatan",
        kelurahan: "Kelurahan",
        kodePos: "Kode Pos",
        statusPerkawinan: "Status Perkawinan",
        masaAktifKtp: "Masa Aktif e-KTP",
        namaIbuKandung: "Nama Ibu Kandung",
        kewarganegaraan: "Kewarganegaraan",

        // Data Pribadi
        namaPanggilan: "Nama Alias / Panggilan",
        tujuan: "Tujuan Menabung",
        KantorCabang: "Jaringan Kantor",
        pendidikanTerakhir: "Pendidikan Terakhir",
        hobi: "Hobi",
        nomorTelepon: "Nomor Telepon",
        nomorFax: "Nomor Fax",
        kantorCabang: "Jaringan Kantor",
        alamatKantorCabang: "Alamat Jaringan Kantor",
        alamatSesuaiEktp: "Alamat Sesuai EKTP",

        // Instruksi Pencairan Deposito
        nominal: "Nominal Deposito",
        terbilang: "Terbilang",
        jangkaWaktu: "Jangka Waktu",
        sukuBunga: "Suku Bunga",
        nomorRekeningDeposito: "Nomor Rekening Deposito",
        tanggalInstruksiPencairanDeposito: "Tanggal Instruksi Penutupan Deposito",
        tanggalJatuhTempoDeposito: "Tanggal Jatuh Tempo Deposito",
        alasanPencairan: "Suku Bunga",
        rekeningTujuan: "Rekening Tujuan",
        namaBank: "Nama Bank",
        nomorRekening: "Nomor Rekening",
        namaPemilikRekening: "Nama Pemilik Rekening",
      };
      return labels[key] || key;
    },
    formatFileLabel(key) {
      const labels = {
        ktp: "KTP",
        npwp: "NPWP",
        fotoDiri: "Foto Diri",
        tandaTangan: "Tanda Tangan",
      };
      return labels[key] || key;
    },
    getFileIcon(key) {
      const icons = {
        ktp: "/src/assets/ektp.svg",
        npwp: "/src/assets/npwp.svg",
        fotoDiri: "/src/assets/liveness.svg",
        tandaTangan: "/src/assets/tanda-tangan.svg",
      };
      return icons[key] || "/src/assets/default.svg";
    },
    handleSubmit(event) {
      event.preventDefault();
      if (!this.agreement1) {
        alert("Harap menyetujui syarat dan ketentuan terlebih dahulu.");
        return;
      }
      if (!this.agreement2) {
        alert("Harap menyetujui syarat dan ketentuan terlebih dahulu.");
        return;
      }
      this.isModalOpen = true;
    },
    closeModalKonfirmasi() {
      this.isModalOpen = false;
    },
    handleKonfirmasi(confirm) {
      this.isModalOpen = false;

      if (confirm) {
        this.lanjutkanPengiriman();
      } else {
        console.log("Pengiriman data dibatalkan oleh pengguna.");
      }
    },
    async lanjutkanPengiriman() {
      if (this.isSubmitting) {
        return;
      }
      const fileStore = useFileStore();
      this.isSubmitting = true;

      try {
        this.requestData = {
          uuid: fileStore.uuid || "",
          s_k_nasabah_bersedia_info_tambahan: true,
          s_k_data_benar_dipertanggungjawabkan: true,
        };

        console.log("Mengirim data:", this.requestData);

        const response = await api.post("/konfirmasi-pencairan", this.requestData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Respons dari API:", response);

        if (response.status === 200) {
          fileStore.setEnvelopeId(response.data.envelope_id);
          fileStore.setSignUrl(response.data.sign_url);

          this.$router.push({ path: "/dashboard/tandaTanganDigitalPencairanDeposito" });
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
    },
  },
  mounted() {
    console.log("Component mounted!");
    this.$emit("update-progress", 90);
    this.fetchBranches();
  },
};
</script>


<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 10px;
}

.grid {
  margin-top: 20px;
}

.flex {
  display: flex;
  align-items: center;
}

.cursor-pointer {
  cursor: pointer;
}

/* Kontainer Flexbox untuk membuat baris */
.form-container {
  display: flex;
  flex-wrap: wrap;
  /* Membungkus elemen ke baris berikutnya */
  gap: 16px;
  /* Jarak antar elemen */
}

/* Setiap item menjadi 50% dari lebar kontainer */
.form-item {
  flex: 1 1 calc(40% - 16px);
  /* Membuat elemen mengambil 50% lebar */
  display: flex flex-col;
  /* Mengatur label dan value dalam satu baris */
  justify-content: space-between;
  /* Memberikan spasi antara label dan value */
  /* padding: 4px; */
  /* border: 1px solid #ddd; */
  /* border-radius: 8px; */
  /* background-color: #f9f9f9; */
}

/* Gaya untuk label dan value */
.form-label {
  font-weight: 400;
  font-size: 14px;
  color: #7D7D78;
}

.form-value {
  font-weight: 500;
  font-size: 16px;
  color: #1C1C17;
}

@media screen and (max-width: 768px) {
  .form-value {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .form-value {
    font-size: 14px;
  }
}
</style>

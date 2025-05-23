<template>
  <div>
    <div class="">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data KTP
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
        Rekening Sumber Dana
      </h1>
      <div class="form-container">
        <div class="form-item" v-if="formRekeningSumber.namaLengkapPengirim">
          <div class="form-label">Nama pemilik Sumber Dana:</div>
          <strong class="form-value">{{ formRekeningSumber.namaLengkapPengirim }}</strong>
        </div>
        <div class="form-item" v-if="formRekeningSumber.nomorRekeningPengirim">
          <div class="form-label">Nomor Rekening:</div>
          <strong class="form-value">{{ formRekeningSumber.nomorRekeningPengirim }}</strong>
        </div>
        <div class="form-item" v-if="formRekeningSumber.sumberDana">
          <div class="form-label">Sumber Dana:</div>
          <strong class="form-value">{{ formRekeningSumber.sumberDana }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.kantorCabang">
          <div class="form-label">Kantor Cabang:</div>
          <strong class="form-value">{{ formPenerima.kantorCabang }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data Penerima Transfer
      </h1>
      <div v-if="formPenerima.namaLengkap || formPenerima.nomorRekening || formPenerima.sumberDana"
        class="form-container">
        <div class="form-item" v-if="formPenerima.namaLengkap">
          <div class="form-label">Nama pemilik Rekening Penerima:</div>
          <strong class="form-value">{{ formPenerima.namaLengkap }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.nomorRekening">
          <div class="form-label">Nomor Rekening:</div>
          <strong class="form-value">{{ formPenerima.nomorRekening }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.alamat">
          <div class="form-label">Alamat:</div>
          <strong class="form-value">{{ formPenerima.alamat }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.namaBank">
          <div class="form-label">Nama Bank:</div>
          <strong class="form-value">{{ formPenerima.namaBank }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.phone">
          <div class="form-label">Nomor Telepon:</div>
          <strong class="form-value">0{{ formPenerima.phone }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Rincian Transfer
      </h1>
      <div class="form-container">
        <div class="form-item" v-if="formPenerima.nominal">
          <div class="form-label">Nominal:</div>
          <strong class="form-value">{{ formPenerima.nominal }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.terbilang">
          <div class="form-label">Terbilang:</div>
          <strong class="form-value">{{ formPenerima.terbilang }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.metodeTransfer">
          <div class="form-label">Metode Transfer:</div>
          <strong class="form-value">{{ formPenerima.metodeTransfer }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.biayaTransfer">
          <div class="form-label">Biaya Transfer:</div>
          <strong class="form-value">{{ formatCurrency(formPenerima.biayaTransfer) }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.keteranganTransaksi">
          <div class="form-label">Biaya Transfer:</div>
          <strong class="form-value">{{ formatCurrency(formPenerima.keteranganTransaksi) }}</strong>
        </div>
      </div>
      <div class="form-item mt-4">
        <div class="form-label">Jumlah Total:</div>
        <div class="flex flex-col gap-2 mt-2" style="align-items: flex-start;">
          <strong class="font-semibold text-2xl text-secondary-base">{{ jumlahTotal }}</strong>
          <p class="form-value">{{ terbilangJumlahTotal }}</p>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Pernyataan dan Persetujuan Nasabah
      </h1>
      <div class="space-y-3 text-gray-700 text-sm">
        <p>
          Sehubungan dengan pengajuan aplikasi ini, maka saya menyatakan bahwa: 
        </p>
        <ul class="list-decimal list-outside ml-4 text-neutral-900 space-y-2">
          <li>Saya menyatakan bahwa sumber dana dan tujuan penggunaan dana bukan untuk kegiatan pencucian uang, dan
            pendanaan terorisme, serta yang dilarang oleh peraturan perundang-undangan yang berlaku.</li>
          <li>Saya menyatakan bahwa data, informasi, dan/atau dokumen yang telah saya isi maupun berikan melalui layanan
            E-Form BPR Universal ini adalah benar dan merupakan data terbaru.</li>
          <li>Saya setuju bahwa PT BPR Universal berhak melakukan pemeriksaan terhadap kebenaran data yang saya
            berikan.</li>
          <li>Saya telah membaca dan menyatakan tunduk, serta terikat dengan semua Ketentuan dan Persyaratan
            Transfer melalui Layanan E-Form BPR Universal, dan telah memahami biaya, manfaat, risiko, dan
            konsekuensi terhadap penggunaan layanan tersebut.</li>
          <li>Saya setuju memberikan hak dan wewenang kepada PT BPR Universal dalam memproses data pribadi saya dan
            melakukan pendebetan rekening saya sesuai nomor rekening yang telah saya isi pada formulir ini untuk tujuan
            menindaklanjuti Transfer yang saya ajukan pada layanan E-Form BPR Universal ini.</li>
          <li>Saya setuju atas pemotongan biaya administrasi atas Transfer ke rekening Bank lain sesuai dengan
            ketentuan PT BPR Universal.</li>
          <li>Saya setuju data pribadi saya digunakan, dan dibagikan kepada pihak lain yang bekerja sama atau
            terafiliasi dengan PT BPR Universal sehubungan dengan pengajuan Transfer melalui layanan E-Form
            BPR Universal berdasarkan ketentuan Peraturan Perundang-Undangan yang berlaku.</li>
          <li>Saya setuju bahwa PT BPR Universal dapat memperoleh, menggunakan, mengelola, dan menyimpan data biometrik
            saya, termasuk namun tidak terbatas pada pemanfaatan dokumen identitas diri saya, face recognition,
            teknologi digital signature, rekaman suara, untuk tujuan verifikasi identitas saya dalam memproses transaksi
            Transfer yang diajukan melalui layanan E-Form BPR Universal berdasarkan Ketentuan Peraturan
            Perundang-Undangan yang berlaku.</li>
          <li>Saya bertanggung jawab penuh atas pengajuan transaksi Transfer, termasuk namun tidak terbatas pada
            kebenaran identitas saya sebagai nasabah, jumlah nominal Transfer, serta nama dan nomor rekening
            penerima.</li>
          <li>Saya memastikan bahwa saldo rekening saya mencukupi untuk transaksi Transfer.</li>
          <li>Saya setuju bahwa PT BPR Universal berhak untuk tidak melaksanakan perintah Transfer dari saya,
            apabila: 
            <ul class="list-disc list-outside ml-4 mt-2 space-y-1">
              <li>Saldo rekening saya di PT BPR Universal  tidak cukup atau rekening di blokir/ditutup atau berdasarkan
                pertimbangan lain dari PT BPR Universal yang  tidak akan diberitahukan kepada Nasabah.</li>
              <li>PT BPR Universal  mengetahui atau mempunyai alasan untuk menduga bahwa penipuan atau kejahatan telah
                atau akan dilakukan.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Checkbox Persetujuan -->
    <div class="mt-2">
      <CustomCheckbox v-model="agreement" labelText="Saya setuju dengan pernyataan dan persetujuan di atas" />
    </div>
    <!-- <div class="flex items-center">
      <input type="checkbox" id="agreement" v-model="agreement" class="mr-2 cursor-pointer" />
      <label for="agreement" class="text-sm text-gray-700 cursor-pointer">
        Saya setuju dengan pernyataan dan persetujuan di atas
      </label>
    </div> -->

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
        {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
      </ButtonComponent>
    </div>
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
import { kewarganegaraanOptions, trueFalseOptions } from "@/data/option";
import { FormModelKonfirmasiData } from "@/models/formModel";
// import ModalOTP from "@/components/ModalOTP.vue";
import ModalKonfirmasi from "@/components/ModalKonfirmasi.vue";
import { sumberDanaOptions, agamaOptions, statusPerkawinanOptions, penghasilanOptions, jumlahPenghasilanOptions, bidangPekerjaanDKOptions, korespondensiOptions, masaAktifKTPOptions, hubunganNasabahOptions } from '@/data/option.js';
import { toTerbilang } from "@/utils/toTerbilang.js";
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import { fetchBranches } from '@/services/service.js';


export default {
  emits: ['updateProgress'],
  components: {
    ButtonComponent,
    RadioButtonChoose,
    // ModalOTP,
    CustomCheckbox,
    ModalKonfirmasi,
  },
  name: "DataPribadi",
  computed: {
    isButtonDisabled() {
      return !this.agreement;
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
    formRekeningSumber() {
      const fileStore = useFileStore();
      const data = fileStore.formDataPengirimPemindahbukuan || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];

          if (key === "sumberDana") {
            value = this.getLabelFromOptions(value, sumberDanaOptions);
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },

    formPenerima() {
      const fileStore = useFileStore();
      const data = fileStore.formDataPenerimaPemindahbukuan || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];

          if (key === "nominal") {
            value = this.formatCurrency(value); // Format nominal di sini
          }

          if (key === "sumberDana") {
            value = this.getLabelFromOptions(value, sumberDanaOptions);
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
    uploadedFiles() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.uploadedFiles || {}).filter(([_, value]) => value)
      );
    },
    jumlahTotal() {
      const nominal = this.parseCurrency(this.formPenerima.nominal);
      const biaya = this.parseCurrency(this.formPenerima.biayaTransfer);

      if (!isNaN(nominal) && !isNaN(biaya)) {
        return this.formatCurrency(nominal + biaya);
      } else if (!isNaN(nominal)) {
        return this.formatCurrency(nominal);
      } else {
        return "Rp 0";
      }
    },
    terbilangJumlahTotal() {
      const nominal = this.parseCurrency(this.formPenerima.nominal);
      const biaya = this.parseCurrency(this.formPenerima.biayaTransfer);

      if (!isNaN(nominal) && !isNaN(biaya)) {
        return this.toTerbilang(nominal + biaya);
      } else if (!isNaN(nominal)) {
        return toTerbilang(nominal);
      } else {
        return "Nol Rupiah";
      }
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
      agreement: false,
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
    toTerbilang,
    async fetchBranches() {
      try {
        const { kantorCabangOptions, kantorCabangAlamat } = await fetchBranches();
        this.kantorCabangOptions = kantorCabangOptions;
        this.kantorCabangAlamat = kantorCabangAlamat;
      } catch (error) {
        console.error("Gagal mengambil data kantor cabang:", error);
      }
    },
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
    getLabelFromOptions(value, options) {
      if (!options || options.length === 0) return value;

      const found = options.find((option) => option.value === value);
      return found ? found.label : value;
    },
    goBack() {
      this.$router.push({ path: "/dashboard/dataPengirimPemindahbukuan" });
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
        masaAktifKtp: "Masa Aktif KTP",
        namaIbuKandung: "Nama Ibu Kandung",
        kewarganegaraan: "Kewarganegaraan",
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
      if (!this.agreement) {
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

        const response = await api.post("/buka-rekening-pindah-buku", this.requestData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Respons dari API:", response);

        if (response.status === 200) {
          fileStore.setEnvelopeId(response.data.envelope_id);
          fileStore.setSignUrl(response.data.sign_url);

          this.$router.push({ path: "/dashboard/tandaTanganDigitalPemindahbukuan" });
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

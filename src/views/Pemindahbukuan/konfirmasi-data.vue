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
            <img :src="file ? '/src/assets/success.svg' : '/src/assets/download.svg'
              " alt="Status Upload" class="h-6" />
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
        <div class="form-item" v-if="formRekeningSumber.namaLengkap">
          <div class="form-label">Nama pemilik Sumber Dana:</div>
          <strong class="form-value">{{ formRekeningSumber.namaLengkap }}</strong>
        </div>
        <div class="form-item" v-if="formRekeningSumber.nomorRekening">
          <div class="form-label">Nomor Rekening:</div>
          <strong class="form-value">{{ formRekeningSumber.nomorRekening }}</strong>
        </div>
        <div class="form-item" v-if="formRekeningSumber.sumberDana">
          <div class="form-label">Sumber Dana:</div>
          <strong class="form-value">{{ formRekeningSumber.sumberDana }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data Penerima Pemindahbukuan
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
          <strong class="form-value">{{ formPenerima.phone }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Rincian Pemindahbukuan
      </h1>
      <div class="form-container">
        <div class="form-item" v-if="formPenerima.nominal">
          <div class="form-label">Nama pemilik Rekening Penerima:</div>
          <strong class="form-value">{{ formPenerima.nominal }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.terbilang">
          <div class="form-label">Nomor Rekening:</div>
          <strong class="form-value">{{ formPenerima.terbilang }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.metodeTransfer">
          <div class="form-label">Metode Transfer:</div>
          <strong class="form-value">{{ formPenerima.metodeTransfer }}</strong>
        </div>
        <div class="form-item" v-if="formPenerima.biayaTransfer">
          <div class="form-label">Biaya Transfer:</div>
          <strong class="form-value">{{ formPenerima.biayaTransfer }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Jumlah Total:</div>
          <div class="flex flex-col gap-2 mt-2" style="align-items: flex-start;">
            <strong class="font-semibold text-2xl text-secondary-base">{{ jumlahTotal }}</strong>
            <p class="form-value">{{ terbilangJumlahTotal }}</p>
          </div>
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
        <ul class="list-decimal list-inside text-neutral-700 space-y-2">
          <li>Saya menyatakan bahwa sumber dana dan tujuan penggunaan dana bukan untuk kegiatan pencucian uang, dan
            pendanaan terorisme, serta yang dilarang oleh peraturan perundang-undangan yang berlaku.</li>
          <li>Saya menyatakan bahwa data, informasi, dan/atau dokumen yang telah saya isi maupun berikan melalui layanan
            E-Form Universal BPR ini adalah benar dan merupakan data terbaru.</li>
          <li>Saya setuju bahwa PT. BPR Universal berhak melakukan pemeriksaan terhadap kebenaran data yang saya
            berikan.</li>
          <li>Saya telah membaca dan menyatakan tunduk, serta terikat dengan semua Ketentuan dan Persyaratan
            Pemindahbukuan melalui Layanan E-Form Universal BPR, dan telah memahami biaya, manfaat, risiko, dan
            konsekuensi terhadap penggunaan layanan tersebut.</li>
          <li>Saya setuju memberikan hak dan wewenang kepada PT. BPR Universal dalam memproses data pribadi saya dan
            melakukan pendebetan rekening saya sesuai nomor rekening yang telah saya isi pada formulir ini untuk tujuan
            menindaklanjuti pemindahbukuan yang saya ajukan pada layanan E-Form Universal BPR ini.</li>
          <li>Saya setuju atas pemotongan biaya administrasi atas pemindahbukuan ke rekening Bank lain sesuai dengan
            ketentuan PT. BPR Universal.</li>
          <li>Saya setuju data pribadi saya digunakan, dan dibagikan kepada pihak lain yang bekerja sama atau
            terafiliasi dengan PT. BPR Universal sehubungan dengan pengajuan pemindahbukuan melalui layanan E-Form
            Universal BPR berdasarkan ketentuan Peraturan Perundang-Undangan yang berlaku.</li>
          <li>Saya setuju bahwa PT. BPR Universal dapat memperoleh, menggunakan, mengelola, dan menyimpan data biometrik
            saya, termasuk namun tidak terbatas pada pemanfaatan dokumen identitas diri saya, face recognition,
            teknologi digital signature, rekaman suara, untuk tujuan verifikasi identitas saya dalam memproses transaksi
            pemindahbukuan yang diajukan melalui layanan E-Form Universal BPR berdasarkan Ketentuan Peraturan
            Perundang-Undangan yang berlaku.</li>
          <li>Saya bertanggung jawab penuh atas pengajuan transaksi pemindahbukuan, termasuk namun tidak terbatas pada
            kebenaran identitas saya sebagai nasabah, jumlah nominal pemindahbukuan, serta nama dan nomor rekening
            penerima.</li>
          <li>Saya memastikan bahwa saldo rekening saya mencukupi untuk transaksi pemindahbukuan.</li>
          <li>Saya setuju bahwa PT. BPR Universal berhak untuk tidak melaksanakan perintah pemindahbukuan dari saya,
            apabila: 
            <ul class="list-disc list-inside ml-2 mt-2 space-y-1">
              <li>Saldo rekening saya di PT. BPR Universal  tidak cukup atau rekening di blokir/ditutup atau berdasarkan
                pertimbangan lain dari PT. BPR Universal yang  tidak akan diberitahukan kepada Nasabah.</li>
              <li>PT. BPR Universal  mengetahui atau mempunyai alasan untuk menduga bahwa penipuan atau kejahatan telah
                atau akan dilakukan.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Checkbox Persetujuan -->
    <div class="flex items-center">
      <input type="checkbox" id="agreement" v-model="agreement" class="mr-2 cursor-pointer" />
      <label for="agreement" class="text-sm text-gray-700 cursor-pointer">
        Saya setuju dengan pernyataan dan persetujuan di atas
      </label>
    </div>

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
        {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
      </ButtonComponent>
    </div>
  </div>
  <ModalOTP :isOpen="isModalOTPOpen" @close="isModalOTPOpen = false" @otp-method-selected="handleOTPMethodSelected"
    :icon="'nama-icon.svg'" :features="features" :no_hp="no_hp" />
</template>s

<script>
import { computed } from 'vue';
import api from "@/API/api";
import RadioButtonChoose from "@/components/RadioButton.vue";
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import { trueFalseOptions } from "@/data/option";
import { FormModelKonfirmasiData } from "@/models/formModel";
import ModalOTP from "@/components/ModalOTP.vue";
import { sumberDanaOptions, agamaOptions, statusPerkawinanOptions, penghasilanOptions, jumlahPenghasilanOptions, bidangPekerjaanDKOptions, korespondensiOptions, masaAktifKTPOptions, hubunganNasabahOptions } from '@/data/option.js';


export default {
  emits: ['updateProgress'],
  components: {
    ButtonComponent,
    RadioButtonChoose,
    ModalOTP,
  },
  name: "DataPribadi",
  computed: {
    isButtonDisabled() {
      return !this.agreement; // Tombol dinonaktifkan jika agreement belum dicentang
    },
    hasBeneficialOwner() {
      return this.formBeneficialOwner && Object.keys(this.formBeneficialOwner).length > 0;
    },
    formKTP() {
      const fileStore = useFileStore();
      const data = fileStore.formKTP || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];
          if (key === "agama") {
            value = this.getLabelFromOptions(value, agamaOptions);
          }
          if (key === "statusPerkawinan") {
            value = this.getLabelFromOptions(value, statusPerkawinanOptions);
          }
          if (key === "masaAktifKtp") {
            value = this.getLabelFromOptions(value, masaAktifKTPOptions);
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },
    formRekeningSumber() {
      const fileStore = useFileStore();
      const data = fileStore.formDataPemindahbukuan || {};
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
  },
  setup() {
    const fileStore = useFileStore();
    const no_hp = computed(() => fileStore.no_hp || "user@example.com");
    return { no_hp }
  },

  data() {
    return {
      nominal: "Rp100.000.000",
      terbilang: "Seratus Juta Rupiah",
      metodeTransfer: "RTGS",
      biayaTransfer: "Rp 30.000",
      jumlahTotal: "Rp 100.030.000",
      terbilangJumlahTotal: "Seratus Tiga Puluh Juta Rupiah",
      form: new FormModelKonfirmasiData(),
      trueFalseOptions,
      RadioButtonChoose,
      agreement: false,
      isSubmitting: false,
      isModalOTPOpen: false,
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
    formatCurrency(amount) {
      if (typeof amount !== 'number') return amount;

      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      }).format(amount);
    },
    getLabelFromOptions(value, options) {
      const option = options.find((opt) => opt.value === value);
      return option ? option.label : value;
    },
    goBack() {
      this.$router.push({ path: "/dashboard/dataPenerimaPemindahbukuan" });
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
    async handleSubmit() {
      if (!this.agreement) {
        alert("Harap menyetujui syarat dan ketentuan terlebih dahulu.");
        return;
      }
      const fileStore = useFileStore();
      try {
        this.requestData = {
          uuid: fileStore.uuid || "",
          s_k_nasabah_bersedia_info_tambahan: true,
          s_k_data_benar_dipertanggungjawabkan: true
        };
        console.log("Data sementara disimpan:", this.requestData);
        this.isModalOTPOpen = true;
      } catch (error) {
        console.error("Error saat membuka modal:", error);
      }
    },
    async handleOTPMethodSelected(method) {
      console.log('Metode OTP yang dipilih:', method);

      try {
        if (!this.requestData) {
          console.error("Error: Data request tidak ditemukan.");
          this.isSubmitting = false;
          return;
        }

        const finalData = {
          ...this.requestData,
          otp_wa: method === 'whatsapp',
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/buka-pengkinian-data", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          this.$router.push({ path: "/dashboard/emailOTPPengkinianData" });
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
        this.isModalOTPOpen = false; // Tutup modal setelah request selesai
      }
    },
  },
  mounted() {
    console.log("Component mounted!");
    this.$emit("update-progress", 90);
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
  font-weight: 500;
  font-size: 14px;
  color: #7D7D78;
}

.form-value {
  font-weight: 500;
  font-size: 16px;
  color: #1C1C17;
}
</style>

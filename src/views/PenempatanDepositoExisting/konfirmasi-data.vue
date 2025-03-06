<template>
  <div>
    <div class="">
      <h1 class="text-base sm:text-base md:text-lg font-semibold text-primary text-left mb-4">
        Data KTP
      </h1>
      <div v-if="formKTP" class="form-container">
        <div class="form-item" v-for="(value, key) in formKTP" :key="key">
          <div class="form-label">{{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-lg font-semibold text-primary text-left mb-4">
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

    <!-- <div class="py-4">
      <h1 class="text-base sm:text-base md:text-lg font-semibold text-primary text-left mb-4">
        Data Pribadi
      </h1>
      <div v-if="formPribadi" class="form-container">
        <div class="form-item" v-for="(value, key) in formPribadi" :key="key">
          <div class="form-label">{{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div> -->

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-lg font-semibold text-primary text-left mb-4">
        Pernyataan dan Persetujuan Nasabah
      </h1>
      <div>
        <RadioButtonChoose
          label="Nasabah bersedia mendapatkan informasi tambahan melalui email,SMS, Whatsapp, dan lainnya*"
          :options="trueFalseOptions" v-model="form.persetujuan" name="persetujuan" />
      </div>

      <label class="block mb-2 text-xs sm:text-sm md:text-sm font-medium text-neutral-900">Pernyataan dan Persetujuan
        Nasabah</label>
      <div class="space-y-3 text-gray-700 text-sm">
        <p>
          Dengan ini, saya/kami menyatakan bahwa: Data Nasabah yang diisikan dalam Formulir Pembukaan Rekening pada
          <span class="font-semibold">PT. BPR Universal</span> (selanjutnya disebut "Bank") ini adalah data yang
          sebenar-benarnya.
        </p>
        <ul class="list-decimal list-inside text-neutral-700 space-y-2">
          <li>Bank dapat melakukan pemeriksaan terhadap kebenaran data yang kami berikan dalam formulir Data Nasabah
            ini.</li>
          <li>Bank telah memberikan penjelasan yang cukup mengenai karakteristik Produk Bank yang akan saya/kami
            manfaatkan.</li>
          <li>Saya/kami telah menerima, membaca, mengerti, dan menyetujui isi Ketentuan Umum dan Persyaratan Pembukaan
            Rekening.</li>
          <li>Saya/kami memberi hak dan wewenang kepada Bank untuk melakukan pemblokiran dan atau penutupan rekening.
            <ul class="list-disc list-inside ml-2 mt-2 space-y-1">
              <li>Saya/kami tidak mematuhi ketentuan <span class="italic">Prinsip Mengenal Nasabah (Knowing Your
                  Customer)</span>.</li>
              <li>Data yang saya/kami berikan kepada Bank tidak benar atau diragukan kebenarannya.</li>
              <li>Saya/kami menyalahgunakan rekening.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Checkbox Persetujuan -->
    <div class="flex items-center">
      <input type="checkbox" id="agreement" v-model="agreement" class="mr-2 cursor-pointer" />
      <label for="agreement" class="text-sm text-gray-700 cursor-pointer">
        Saya menyetujui syarat dan ketentuan serta bersedia memberikan informasi tambahan
      </label>
    </div>

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
        {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
      </ButtonComponent>

    </div>
  </div>
</template>

<script>
import api from "@/API/api";
import RadioButtonChoose from "@/components/RadioButton.vue";
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import { trueFalseOptions } from "@/data/option";
import { FormModelKonfirmasiData } from "@/models/formModel";

export default {
  components: {
    ButtonComponent,
    RadioButtonChoose,
  },
  name: "DataPribadi",
  computed: {
    isButtonDisabled() {
      return !this.agreement; // Tombol dinonaktifkan jika agreement belum dicentang
    },
    formKTP() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.formKTP || {}).filter(([_, value]) => value)
      );
    },
    formPribadi() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.formPribadi || {}).filter(([_, value]) => value)
      );
    },
    uploadedFiles() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.uploadedFiles || {}).filter(([_, value]) => value)
      );
    },
  },

  data() {
    return {
      form: new FormModelKonfirmasiData(),
      trueFalseOptions,
      RadioButtonChoose,
      agreement: false,
      isSubmitting: false,
    };
  },

  methods: {
    goBack() {
      this.$router.push({ path: "/dashboard/perubahanDataPenempatanDepositoExisting" });
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
        kota: "Kota / Kabupaten",
        kecamatan: "Kecamatan",
        kelurahan: "Kelurahan",
        kodePos: "Kode Pos",
        statusPerkawinan: "Status Perkawinan",
        masaAktifKtp: "Masa Aktif KTP",
        namaIbuKandung: "Nama Ibu Kandung",
      };
      return labels[key] || key;
    },
    formatFileLabel(key) {
      const labels = {
        ktp: "KTP",
        fotoDiri: "Foto Diri",
      };
      return labels[key] || key;
    },
    getFileIcon(key) {
      const icons = {
        ktp: "/src/assets/ektp.svg",
        fotoDiri: "/src/assets/liveness.svg",
      };
      return icons[key] || "/src/assets/default.svg";
    },
    // handleFileUpload(event, key) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     const fileStore = useFileStore();
    //     fileStore.uploadedFiles[key] = file;
    //   }
    // },
    async handleSubmit() {
      if (!this.agreement) {
        alert("Harap menyetujui syarat dan ketentuan terlebih dahulu.");
        return;
      }

      if (this.isSubmitting) return;
      this.isSubmitting = true;

      const fileStore = useFileStore();
      const requestData = {
        uuid: fileStore.uuid || "", // Cek apakah UUID valid
        s_k_nasabah_bersedia_info_tambahan: true,
        s_k_data_benar_dipertanggungjawabkan: true
      };

      console.log("Final requestData:", requestData); // Debugging

      try {
        const response = await api.post("/buka-deposito-existing", requestData, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Response:", response.data);
        this.$router.push({ path: "/dashboard/emailOTPPenempatanDepositoExisting" });
      } catch (error) {
        console.error("Error submitting data:", error);
        console.error("Response Data:", error.response?.data); // Cek detail error dari server
      } finally {
        this.isSubmitting = false;
      }
    }

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
  color: #555;
}

.form-value {
  font-weight: bold;
  color: #333;
}
</style>

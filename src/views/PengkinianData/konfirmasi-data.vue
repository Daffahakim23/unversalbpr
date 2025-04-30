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

    <!-- <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
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
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data Pribadi
      </h1>
      <div v-if="formPribadi" class="form-container">
        <div class="form-item" v-for="(value, key) in formPribadi" :key="key">
          <div class="form-label">{{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Data Pekerjaan & Finansial
      </h1>
      <div v-if="formPekerjaan" class="form-container">
        <div class="form-item" v-for="(value, key) in formPekerjaan" :key="key">
          <div class="form-label"> {{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div>

    <div class="py-4" v-if="hasBeneficialOwner">
      <div class="border-t border-neutral-200 my-4"></div>
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Beneficial Owner
      </h1>
      <div v-if="formBeneficialOwner" class="form-container">
        <div class="form-item" v-for="(value, key) in formBeneficialOwner" :key="key">
          <div class="form-label"> {{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Kontak Darurat
      </h1>
      <div v-if="formKontakDarurat" class="form-container">
        <div class="form-item" v-for="(value, key) in formKontakDarurat" :key="key">
          <div class="form-label"> {{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Pernyataan dan Persetujuan Nasabah
      </h1>
      <div class="space-y-3 text-neutral-900 text-sm">
        <p>
          Dengan ini, saya/kami menyatakan bahwa:
        </p>
        <ul class="list-decimal list-outside ml-4 text-neutral-900 space-y-2">
          <li>Data Nasabah yang diisikan dalam Formulir Pembukaan Rekening baru pada PT. BPR Universal (selanjutnya
            disebut "Bank") ini adalah data yang sebenar-benarnya.</li>
          <li>Bank dapat melakukan pemeriksaan terhadap kebenaran data yang kami berikan dalam formulir Data Nasabah
            ini.</li>
          <li>Bank telah memberikan penjelasan yang cukup mengenai karakteristik Produk Bank yang akan saya/kami
            manfaatkan dan saya telah mengerti serta memahami segala konsekuensi pemanfaatan Produk Bank, termasuk
            manfaat, risiko, dan biaya-biaya yang melekat pada produk Bank tersebut.</li>
          <li>Saya/kami telah menerima, membaca, mengerti, dan menyetujui isi Ketentuan Umum dan Persyaratan Pembukaan
            Rekening baru. Untuk itu dengan ini saya/kami menyatakan tunduk dan terikat dengan ketentuan-ketentuan
            tersebut, serta ketentuan lain terkait produk/fasilitas yang saya/kami pilih yang berlaku di Bank beserta
            segala bentuk perubahannya yang akan diberitahukan dengan sarana yang ditetapkan Bank.</li>
          <li>Saya/kami memberi hak dan wewenang kepada Bank untuk melakukan pemblokiran dan atau penutupan rekening,
            apabila menurut pertimbangan Bank :
            <ul class="list-disc list-outside ml-4 mt-2 space-y-1">
              <li>Saya/kami tidak mematuhi ketentuan Prinsip Mengenal Nasabah <span class="italic">(Knowing Your
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
      <input type="checkbox" id="agreement" v-model="agreement1" class="mr-2 cursor-pointer" />
      <label for="agreement" class="text-sm text-gray-700 cursor-pointer">
        Saya setuju dengan pernyataan dan persetujuan di atas
      </label>
    </div>

    <div class="flex items-center mt-4">
      <input type="checkbox" id="agreement" v-model="agreement2" class="mr-2 cursor-pointer items-baseline" />
      <label for="agreement" class="text-sm text-gray-700 cursor-pointer">
        Nasabah bersedia mendapatkan informasi tambahan melalui email,SMS, Whatsapp, dan lainnya*
      </label>
    </div>

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
</template>

<script>
import { computed } from 'vue';
import api from "@/API/api";
import RadioButtonChoose from "@/components/RadioButton.vue";
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import { alamatSesuaiEktpOptions, jenisIdentitasBOOptions, jenisKelaminOptions, kewarganegaraanBOOptions, kewarganegaraanOptions, trueFalseOptions } from "@/data/option";
import { FormModelKonfirmasiData } from "@/models/formModel";
import ModalOTP from "@/components/ModalOTP.vue";
import { pendidikanOptions, tujuanOptions, hobiOptions, agamaOptions, statusPerkawinanOptions, penghasilanOptions, jumlahPenghasilanOptions, bidangPekerjaanDKOptions, korespondensiOptions, masaAktifKTPOptions, hubunganNasabahOptions } from '@/data/option.js';
import ModalKonfirmasi from "@/components/ModalKonfirmasi.vue";
import { fetchBranches } from '@/services/service.js';

export default {
  emits: ['updateProgress'],
  components: {
    ButtonComponent,
    RadioButtonChoose,
    // ModalOTP,
    ModalKonfirmasi,
  },
  name: "DataPribadi",
  computed: {
    isButtonDisabled() {
      return !this.agreement1 || !this.agreement2;
    },
    hasBeneficialOwner() {
      return this.formBeneficialOwner && Object.keys(this.formBeneficialOwner).length > 0;
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
    // formPribadi() {
    //   const fileStore = useFileStore();
    //   return Object.fromEntries(
    //     Object.entries(fileStore.formPribadi || {}).filter(([_, value]) => value)
    //   );
    // },
    formPribadi() {
      const fileStore = useFileStore();
      const data = fileStore.formPribadi || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];

          if (key === "pendidikanTerakhir") {
            value = this.getLabelFromOptions(value, pendidikanOptions);
          }
          if (key === "tujuan") {
            value = this.getLabelFromOptions(value, tujuanOptions);
          }
          if (key === "hobi") {
            value = this.getLabelFromOptions(value, hobiOptions);
          }
          if (key === "alamatSesuaiKtp") {
            value = this.getLabelFromOptions(value, alamatSesuaiEktpOptions);
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },
    formPekerjaan() {
      const fileStore = useFileStore();
      const data = fileStore.formPekerjaan || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] && !key.endsWith('BO') && !key.endsWith('KD')) {
          let value = data[key];

          if (key === "penghasilan") {
            value = this.getLabelFromOptions(value, penghasilanOptions);
          }
          if (key === "jumlahPenghasilan") {
            value = this.getLabelFromOptions(value, jumlahPenghasilanOptions);
          }
          if (key === "bidangPekerjaanDK") {
            value = this.getLabelFromOptions(value, bidangPekerjaanDKOptions);
          }
          if (key === "korespondensi") {
            value = this.getLabelFromOptions(value, korespondensiOptions);
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },
    formKontakDarurat() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.formPekerjaan || {})
          .filter(([key, value]) => value && key.endsWith('KD'))
      );
    },

    formBeneficialOwner() {
      const fileStore = useFileStore();
      const data = fileStore.formPekerjaan || {};
      const processedData = {};

      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] && key.endsWith('BO')) {
          let value = data[key];

          if (key === "hubunganNasabahBO") {
            value = this.getLabelFromOptions(value, hubunganNasabahOptions);
          }
          if (key === "kewarganegaraanBO") {
            value = this.getLabelFromOptions(value, kewarganegaraanBOOptions);
          }
          if (key === "jenisIdentitasBO") {
            value = this.getLabelFromOptions(value, jenisIdentitasBOOptions);
          }
          if (key === "jenisKelaminBO") {
            value = this.getLabelFromOptions(value, jenisKelaminOptions);
          }
          if (key === "statusPerkawinanBO") {
            value = this.getLabelFromOptions(value, statusPerkawinanOptions);
          }
          if (key === "penghasilanBO") {
            value = this.getLabelFromOptions(value, penghasilanOptions);
          }
          if (key === "jumlahPenghasilanBO") {
            value = this.getLabelFromOptions(value, jumlahPenghasilanOptions);
          }

          processedData[key] = value;
        }
      }

      return processedData;
    },
    // formPekerjaan() {
    //   const fileStore = useFileStore();

    //   return Object.fromEntries(
    //     Object.entries(fileStore.formPekerjaan || {})
    //       .filter(([_, value]) => value) // Hanya menyertakan data yang tidak kosong
    //       .map(([key, value]) => {
    //         if (key === "pekerjaan") return [key, getLabel(value, pekerjaanOptions)];
    //         if (key === "penghasilan") return [key, getLabel(value, penghasilanOptions)];
    //         return [key, value];
    //       })
    //   );
    // },
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
      this.$router.push({ path: "/dashboard/dataPekerjaanPengkinianData" });
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

        // Data Pribadi
        namaPanggilan: "Nama Alias / Panggilan",
        tujuan: "Tujuan Menabung",
        KantorCabang: "Kantor Cabang",
        pendidikanTerakhir: "Pendidikan Terakhir",
        hobi: "Hobi",
        nomorTelepon: "Nomor Telepon",
        nomorFax: "Nomor Fax",
        kantorCabang: "Kantor Cabang",
        alamatKantorCabang: "Alamat Kantor Cabang",
        alamatSesuaiEktp: "Alamat Sesuai EKTP",

        // Data Pekerjaan (Beneficial Owner)
        pekerjaan: "Pekerjaan",
        penghasilan: "Penghasilan",
        jumlahPenghasilan: "Jumlah Penghasilan",
        hubunganNasabah: "Hubungan Nasabah",
        jenisIdentitasBO: "Jenis Identitas Beneficial Owner",
        hubunganNasabahBO: "Hubungan dengan Nasabah",
        kotaPerusahaanBO: "Kota Perusahaan",
        kodePosPerushaanBO: "Kode Pos Perusahaan",
        kewarganegaraanBO: "Kewarganegaraan Beneficial Owner",
        namaLengkapBO: "Nama Beneficial Owner",
        nomorDokumenIdentitasBO: "Nomor Dokumentasi Identitas",
        alamatBO: "Alamat Beneficial Owner",
        rtBO: "RT Beneficial Owner",
        rwBO: "RW Beneficial Owner",
        provinsiBO: "Provinsi Beneficial Owner",
        kabupatenBO: "Kota / Kabupaten Beneficial Owner",
        kecamatanBO: "Kecamatan Beneficial Owner",
        kelurahanBO: "Kelurahan Beneficial Owner",
        kodePosPerusahaanBO: "Kode Pos Perusahaan Beneficial Owner",
        tempatLahirBO: "Tempat Lahir Beneficial Owner",
        tanggalLahirBO: "Tanggal Lahir Beneficial Owner",
        jenisKelaminBO: "Jenis Kelamin Beneficial Owner",
        statusPerkawinanBO: "Status Perkawinan",
        kodePosBO: "Kode Pos Beneficial Owner",
        pekerjaanBO: "Pekerjaan Beneficial Owner",
        namaPerusahaanBO: "Nama Perusahaan Beneficial Owner",
        alamatPerusahaanBO: "Alamat Perusahaan Beneficial Owner",
        jabatanBO: "Jabatan Beneficial Owner",
        lamaBekerjaTahunBO: "Lama Bekerja Tahun",
        lamaBekerjaBulanBO: "Lama Bekerja Bulan",
        penghasilanBO: "Penghasilan Beneficial Owner",
        jumlahPenghasilanBO: "Jumlah Penghasilan Beneficial Owner",

        // Data Pekerjaan (Detail Pekerjaan)
        namaPerusahaanDK: "Nama Perusahaan",
        bidangPekerjaanDK: "Bidang Pekerjaan",
        jabatanDK: "Jabatan",
        kotaPerusahaanDK: "Kota Perusahaan",
        kodePosPerusahaanDK: "Kode Pos Perusahaan",
        hubunganPemohonKD: "Hubungan Pemohon",
        lamaBekerjaTahunDK: "Lama Bekerja Tahun",
        lamaBekerjaBulanDK: "Lama Bekerja Bulan",
        nomorTeleponKantorDK: "Nomor Telepon Kantor",
        nomorTeleponFaxDK: "Nomor Telepon Fax",
        alamatDK: "Alamat Kantor",
        korespondensi: "Korespondensi",

        // kontak Darurat
        namaLengkapKD: "Nama Lengkap Kontak Darurat",
        hubunganKD: "Hubungan Kontak Darurat",
        nomorTeleponKD: "Nomor Telepon Kontak Darurat",
        alamatKD: "Alamat Kontak Darurat",
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

        const response = await api.post("/buka-pengkinian-data", this.requestData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Respons dari API:", response);

        if (response.status === 200) {
          fileStore.setEnvelopeId(response.data.envelope_id);
          fileStore.setSignUrl(response.data.sign_url);

          this.$router.push({ path: "/dashboard/tandaTanganDigitalPengkinianData" });
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

<template>
  <div>
    <div class="">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data e-KTP
      </h1>
      <div v-if="formKTP" class="form-container">
        <div class="form-item" v-for="(value, key) in formKTP" :key="key">
          <div class="form-label">{{ formatLabel(key) }}</div>
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
        <div :class="[
          'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md relative',
          fileStore.isKtpUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
        ]">
          <div class=" flex items-center">
            <img src="/src/assets/ektp.svg" alt="KTP" class="h-12 mr-4" />
            <div>
              <span class="text-sm font-medium text-neutral-900">E-KTP</span>
              <div v-if="fileStore.isKtpUploaded" class="flex flex-row items-center gap-1">
                <img src="/src/assets/success.svg" class="h-4" />
                <p class="text-xs text-neutral-600">{{ nik }}</p>
              </div>
              <div v-else>
                <p class="text-xs text-neutral-600">Foto E-KTP Anda</p>
              </div>
            </div>
          </div>
          <div>
            <img v-if="fileStore.isKtpUploaded" src="/src/assets/success.svg" alt="Download" class="h-6" />
            <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
          </div>
        </div>
        <div :class="[
          'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md  relative',
          fileStore.isFotoDiriUploaded
            ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
        ]" :aria-disabled="fileStore.isFotoDiriUploaded ? 'true' : null">
          <div class="flex items-center">
            <img src="/src/assets/liveness.svg" alt="Liveness" class="h-12 mr-4" />
            <div>
              <span class="text-sm font-medium text-neutral-900">Foto Diri</span>
              <div v-if="fileStore.isFotoDiriUploaded" class="flex flex-row items-center gap-1">
                <img src="/src/assets/success.svg" class="h-4" />
                <p class="text-xs text-neutral-600">Telah Dilengkapi</p>
              </div>
              <div v-else>
                <p class="text-xs text-neutral-600">Foto Diri Anda</p>
              </div>
            </div>
          </div>
          <div>
            <img v-if="fileStore.isFotoDiriUploaded" src="/src/assets/success.svg" alt="Download" class="h-6" />
            <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
          </div>
        </div>
      </div>
      <!-- <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div> -->
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data Pribadi
      </h1>
      <div v-if="formPribadi.email || formPribadi.phone || formPribadi.tujuan" class="form-container">
        <div class="form-item" v-if="formPribadi.email">
          <div class="form-label">Email</div>
          <strong class="form-value">{{ formPribadi.email }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.phone">
          <div class="form-label">Nomor Handphone</div>
          <strong class="form-value">0{{ formPribadi.phone }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.tujuan">
          <div class="form-label">Tujuan Simpanan</div>
          <strong class="form-value">{{ formPribadi.tujuan }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.sumberDana">
          <div class="form-label">Sumber Dana</div>
          <strong class="form-value">{{ formPribadi.sumberDana }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Pembaharuan Data
      </h1>
      <div v class="form-container">
        <!-- <div class="form-item" v-for="(value, key) in formPembaruanData" :key="key">
          <div class="form-label">{{ formatLabel(key) }}</div>
          <strong class="form-value">{{ value }}</strong>
        </div> -->
        <div class="form-item">
          <div class="form-label">Perubahan Data</div>
          <strong class="form-value">{{ formPembaruanData.perubahanData }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Alamat Terkini</div>
          <strong class="form-value">{{ formPembaruanData.alamat }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">RT</div>
          <strong class="form-value">{{ formPembaruanData.rt }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">RW</div>
          <strong class="form-value">{{ formPembaruanData.rw }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Provinsi</div>
          <strong class="form-value">{{ formPembaruanData.provinsi }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kota/Kabupaten</div>
          <strong class="form-value">{{ formPembaruanData.kabupaten }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kecamatan</div>
          <strong class="form-value">{{ formPembaruanData.kecamatan }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kelurahan</div>
          <strong class="form-value">{{ formPembaruanData.kelurahan }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kode Pos</div>
          <strong class="form-value">{{ formPembaruanData.kodePos }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Alamat Kantor</div>
          <strong class="form-value">{{ formPembaruanData.alamat_kantor }}</strong>
        </div>
        <!-- <div class="form-item" v-if="fileStore.no_hp">
          <div class="form-label">Nomor Handphone</div>
          <strong class="form-value">0{{ fileStore.no_hp }}</strong>
        </div> -->
        <div class="form-item">
          <div class="form-label">Nomor Telepon</div>
          <strong class="form-value">{{ formPembaruanData.nomor_telp }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Nomor Fax</div>
          <strong class="form-value">{{ formPembaruanData.nomor_fax }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Email</div>
          <strong class="form-value">{{ formPembaruanData.email }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div v-if="kantorCabangOptions" class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Produk yang Diinginkan
      </h1>
      <div
        v-if="formPribadi.produk || formPribadi.kantorCabang || formPribadi.alamatKantorCabang || formPribadi.namaFundingOfficer"
        class="form-container">
        <div class="form-item" v-if="formPribadi.produk">
          <div class="form-label">Produk yang Diinginkan</div>
          <strong class="form-value">{{ formPribadi.produk }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.kantorCabang">
          <div class="form-label">Jaringan Kantor</div>
          <strong class="form-value">{{ formPribadi.kantorCabang }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.alamatKantorCabang">
          <div class="form-label">Alamat Jaringan Kantor</div>
          <strong class="form-value">{{ formPribadi.alamatKantorCabang }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.namaFundingOfficer">
          <div class="form-label">Nama Funding Officer</div>
          <strong class="form-value">{{ formPribadi.namaFundingOfficer }}</strong>
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
          <li>Data Nasabah yang diisikan dalam Formulir Pembukaan Rekening baru pada PT BPR Universal (selanjutnya
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

    <!-- Checkbox Persetujuan
    <div class="flex items-center">
      <input type="checkbox" id="agreement1" v-model="agreement1" class="mr-2 cursor-pointer" />
      <label for="agreement1" class="text-sm text-neutral-900 cursor-pointer">
        Saya setuju dengan pernyataan dan persetujuan di atas
      </label>
    </div>

    <div class="flex items-center mt-2">
      <input type="checkbox" id="agreement2" v-model="agreement2" class="mr-2 cursor-pointer items-baseline" />
      <label for="agreement2" class="text-sm text-neutral-900 cursor-pointer">
        Nasabah bersedia mendapatkan informasi tambahan melalui email,SMS, Whatsapp, dan lainnya*
      </label>
    </div> -->

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
  </div>

  <ModalKonfirmasi :isOpen="isModalOpen" @close="closeModalKonfirmasi" @yes="handleKonfirmasi" />

  <!-- <ModalOTP :isOpen="isModalOTPOpen" @close="isModalOTPOpen = false" @otp-method-selected="handleOTPMethodSelected"
    :icon="'nama-icon.svg'" :features="features" :no_hp="no_hp" /> -->
</template>

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
import { jenisKelaminOptions, tujuanOptions, agamaOptions, statusPerkawinanOptions, penghasilanOptions, produkOptions, masaAktifKTPOptions } from '@/data/option.js';
import { fetchBranches } from '@/services/service.js';
import CustomCheckbox from '@/components/CustomCheckbox.vue';

import ektpIcon from "@/assets/ektp.svg";
import npwpIcon from "@/assets/npwp.svg";
import livenessIcon from "@/assets/liveness.svg";
import tandaTanganIcon from "@/assets/tanda-tangan.svg";
import defaultIcon from "@/assets/default.svg";


export default {
  emits: ['updateProgress'],
  components: {
    ButtonComponent,
    RadioButtonChoose,
    // ModalOTP,
    ModalKonfirmasi,
    CustomCheckbox,
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
            continue; // Lewati iterasi ini jika value tidak ada
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
    formPribadi() {
      const fileStore = useFileStore();
      const data = fileStore.formEmailRequestPembukaanRekening || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];

          if (key === "tujuan") {
            value = this.getLabelFromOptions(value, tujuanOptions);
          }
          if (key === "sumberDana") {
            value = this.getLabelFromOptions(value, penghasilanOptions);
          }
          if (key === "produk") {
            value = this.getLabelFromOptions(value, produkOptions);
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
    formPembaruanData() {
      const fileStore = useFileStore();
      const data = fileStore.formPembaruanData || {};
      const processedData = {};

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          let value = data[key];

          if (key === "perubahanData") {
            value = this.getLabelFromOptions(value, trueFalseOptions);
          }

          if (value === null || value === undefined || value === '') {
            value = "-";
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
    const nik = computed(() => fileStore.nik || "123123123");
    return { fileStore, nik, no_hp }
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
      this.$router.push({ path: "/dashboard/perubahanDataPembukaanRekeningExisting" });
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
        kabupaten: "Kota/Kabupaten",
        kecamatan: "Kecamatan",
        kelurahan: "Kelurahan",
        kodePos: "Kode Pos",
        statusPerkawinan: "Status Perkawinan",
        masaAktifKtp: "Masa Aktif e-KTP",
        namaIbuKandung: "Nama Ibu Kandung",
        kewarganegaraan: "Kewarganegaraan",
        kewarganegaraanLainnya: "Kewarganegaraan Lainnya",

        // Data Pribadi
        perubahanData: "Perubahan Data",
        noHp: "Nomor Handphone",
        nomor_telp: "Nomor Telepon",
        nomor_fax: "Nomor Fax",
        alamat: "Alamat",
        email: "Email",
        alamat_kantor: "Alamat Kantor",
        namaPanggilan: "Nama Alias / Panggilan",
        tujuan: "Tujuan Menabung",
        KantorCabang: "Jaringan Kantor",
        pendidikanTerakhir: "Pendidikan Terakhir",
        hobi: "Hobi",
        nomorTelepon: "Nomor Handphone",
        nomorFax: "Nomor Fax",
        kantorCabang: "Jaringan Kantor",
        alamatKantorCabang: "Alamat Jaringan Kantor",
        alamatSesuaiEktp: "Alamat Sesuai EKTP",
      };
      return labels[key] || key;
    },
    formatFileLabel(key) {
      const labels = {
        ktp: "e-KTP",
        npwp: "NPWP",
        fotoDiri: "Foto Diri",
        tandaTangan: "Tanda Tangan",
      };
      return labels[key] || key;
    },
    getFileIcon(key) {
      const icons = {
        ktp: ektpIcon,
        npwp: npwpIcon,
        fotoDiri: livenessIcon,
        tandaTangan: tandaTanganIcon
      };
      return icons[key] || defaultIcon;
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

        const response = await api.post("/buka-rekening-existing", this.requestData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Respons dari API:", response);

        if (response.status === 200) {
          fileStore.setEnvelopeId(response.data.envelope_id);
          fileStore.setSignUrl(response.data.sign_url);

          this.$router.push({ path: "/dashboard/panduanKameraPembukaanRekeningExisting" });
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

.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.form-item {
  flex: 1 1 calc(40% - 16px);
  display: flex flex-col;
  justify-content: space-between;
}

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

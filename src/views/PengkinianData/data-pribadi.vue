<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Alias/Panggilan (Opsional)" id="namaPanggilan" :isDropdown="false"
      v-model="form.namaPanggilan" placeholder="Masukkan Nama Alias/Panggilan" variant="alpha" />

    <FormField label="Pendidikan Terakhir (Opsional)" id="pendidikanTerakhir" :isDropdown="true"
      v-model="form.pendidikanTerakhir" :options="pendidikanOptions" placeholder="Pilih Pendidikan Terakhir" />

    <FormField label="Pilih Hobi (Opsional)" id="hobi" :isDropdown="true" v-model="form.hobi" :options="hobiOptions"
      placeholder="Pilih Hobi" />

    <RadioButtonChoose label="Apakah Anda ingin mengubah No. Telepon Anda? (Opsional)" :options="trueFalseOptions"
      v-model="form.ubahNoTelepon" name="ubahNoTelepon" />

    <div v-if="form.ubahNoTelepon === true" class="mt-4">
      <FormField label="Detail Nomor Telepon Terikini*" id="nomorTelepon" v-model="form.nomorTelepon" variant="numeric"
        :maxlength="13" placeholder="Masukkan Nomor Telepon Terkini" />
    </div>

    <FormField label="Nomor Fax (opsional)" id="nomorFax" v-model="form.nomorFax" variant="numeric"
      placeholder="Masukkan Nomor Fax" />

    <FormField label="Email (Opsional)" id="email" type="email" v-model="form.email" placeholder="Masukkan Email"
      hint="Pastikan Anda mengisi alamat email yang aktif" />

    <RadioButtonChoose label="Apakah alamat domisili sesuai dengan alamat E-KTP?*" :options="alamatSesuaiEktpOptions"
      v-model="form.alamatSesuaiEktp" name="alamatSesuaiEktp" />

    <div v-if="form.alamatSesuaiEktp === false" class="">
      <FormField label="Detail Alamat Tempat Tinggal Terkini*" id="alamat" v-model="form.alamat" :required="true"
        placeholder="Masukkan Alamat Anda" />
      <div class="flex flex-row gap-4 w-full">
        <FormField label="RT*" id="rt" v-model="form.rt" :required="true" placeholder="Masukkan RT" class="flex-1"
          variant="numeric" :maxlength="3" />

        <FormField label="RW*" id="rw" v-model="form.rw" :required="true" placeholder="Masukkan RW" class="flex-1"
          variant="numeric" :maxlength="3" />
      </div>
      <FormField label="Provinsi*" id="provinsi" :isDropdown="true" v-model="form.provinsi" :options="provinsiOptions"
        placeholder="Pilih Provinsi" @change="fetchKabupaten" required />

      <FormField label="Kabupaten/Kota*" id="kabupaten" :isDropdown="true" v-model="form.kabupaten"
        :options="kabupatenOptions" placeholder="Pilih Kabupaten/Kota" @change="fetchKecamatan"
        :disabled="!form.provinsi" required />

      <FormField label="Kecamatan*" id="kecamatan" :isDropdown="true" v-model="form.kecamatan"
        :options="kecamatanOptions" placeholder="Pilih Kecamatan" @change="fetchKelurahan" :disabled="!form.kabupaten"
        required />

      <FormField label="Kelurahan*" id="kelurahan" :isDropdown="true" v-model="form.kelurahan"
        :options="kelurahanOptions" placeholder="Pilih Kelurahan" :disabled="!form.kecamatan" required />

      <FormField label="Kode Pos*" id="kodePos" v-model="form.kodePos" :required="true" variant="numeric" :maxlength="5"
        placeholder="Masukkan Kode Pos" />
    </div>

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
        {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import api from "@/API/api.js"
import axios from "axios";
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { FormModelDataPribadi } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { pendidikanOptions, hobiOptions, alamatSesuaiEktpOptions, trueFalseOptions } from "@/data/option.js";

export default {
  components: { FormField, RadioButtonChoose, ButtonComponent },
  data() {
    return {
      form: new FormModelDataPribadi(),
      pendidikanOptions,
      hobiOptions,
      alamatSesuaiEktpOptions,
      trueFalseOptions,
      isSubmitting: false,
      fileStore: useFileStore(),
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
      provinsiOptions: [],
      kabupatenOptions: [],
      kecamatanOptions: [],
      kelurahanOptions: [],
    };
  },

  computed: {
    isButtonDisabled() {
      const isAlamatSesuaiEktpFilled = this.form.alamatSesuaiEktp !== null;
      const isUbahNoTeleponFilled = this.form.ubahNoTelepon !== null;

      // Kondisi wajib jika "Apakah alamat domisili sesuai dengan alamat E-KTP?" adalah False
      const isAlamatLengkapFilled =
        this.form.alamat &&
        this.form.rt &&
        this.form.rw &&
        this.form.provinsi &&
        this.form.kabupaten &&
        this.form.kecamatan &&
        this.form.kelurahan &&
        this.form.kodePos;

      // Kondisi wajib jika "Apakah Anda ingin mengubah No. Telepon Anda?" adalah True
      const isNomorTeleponTerisiJikaUbah = this.form.ubahNoTelepon === true ? !!this.form.nomorTelepon : true;

      // Kondisi awal: tombol non-aktif jika kedua pertanyaan mandatory belum dijawab
      if (!isAlamatSesuaiEktpFilled || !isUbahNoTeleponFilled) {
        return true;
      }

      // Kondisi jika alamat tidak sesuai E-KTP
      if (this.form.alamatSesuaiEktp === false) {
        return !isAlamatLengkapFilled;
      }

      // Kondisi jika ingin mengubah nomor telepon
      return !(isNomorTeleponTerisiJikaUbah && this.form.alamatSesuaiEktp);
    },
  },

  watch: {
    "form.provinsi": function (newProvinsi) {
      if (!newProvinsi) {
        this.form.kabupaten = "";
        this.form.kecamatan = "";
        this.form.kelurahan = ""; // Tambahkan reset kelurahan juga
        this.form.kodePos = "";     // Tambahkan reset kode pos juga
        this.kabupatenOptions = [];
        this.kecamatanOptions = [];
        this.kelurahanOptions = []; // Tambahkan reset options kelurahan
      } else {
        this.fetchKabupaten();
      }
    },
    "form.kabupaten": function (newKabupaten) {
      if (!newKabupaten) {
        this.form.kecamatan = "";
        this.form.kelurahan = ""; // Tambahkan reset kelurahan juga
        this.form.kodePos = "";     // Tambahkan reset kode pos juga
        this.kecamatanOptions = [];
        this.kelurahanOptions = []; // Tambahkan reset options kelurahan
      } else {
        this.fetchKecamatan();
      }
    },
    "form.kecamatan": function (newKecamatan) {
      if (!newKecamatan) {
        this.form.kelurahan = "";
        this.form.kodePos = "";     // Tambahkan reset kode pos juga
        this.kelurahanOptions = [];
      } else {
        this.fetchKelurahan();
      }
    },
    "form.ubahNoTelepon": function (newVal) {
      if (!newVal) {
        this.form.nomorTelepon = "";
      }
    },
    "form.alamatSesuaiEktp": function (newVal) {
      if (newVal === true) {
        this.form.alamat = "";
        this.form.rt = "";
        this.form.rw = "";
        this.form.provinsi = "";
        this.form.kabupaten = "";
        this.form.kecamatan = "";
        this.form.kelurahan = "";
        this.form.kodePos = "";
        this.kabupatenOptions = [];
        this.kecamatanOptions = [];
        this.kelurahanOptions = [];
      }
    },
  },

  methods: {
    async fetchProvinsi() {
      try {
        const response = await api.get("/provinsi");
        console.log("Data provinsi diterima:", response.data); // Debugging

        if (response.data && response.data.provinsi) {
          this.provinsiOptions = response.data.provinsi.map(p => ({
            label: p.provinsi,
            value: p.provinsi
          }));
          console.log("Provinsi options:", this.provinsiOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error);
      }
    },

    async fetchKabupaten() {
      this.form.kabupaten = "";
      this.form.kecamatan = "";
      this.kabupatenOptions = [];
      this.kecamatanOptions = [];

      if (!this.form.provinsi) return;

      try {
        const response = await api.get(`/provinsi?provinsi=${this.form.provinsi}`);
        console.log("Data kabupaten diterima:", response.data); // Debugging

        if (response.data && response.data.kabupaten) {
          this.kabupatenOptions = response.data.kabupaten.map(k => ({
            label: k.kabupaten,
            value: k.kabupaten
          }));
          console.log("Kabupaten options:", this.kabupatenOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data kabupaten:", error);
      }
    },

    async fetchKecamatan() {
      this.form.kecamatan = "";
      this.kecamatanOptions = [];

      if (!this.form.provinsi || !this.form.kabupaten) return;

      try {
        const response = await api.get(
          `/provinsi?provinsi=${this.form.provinsi}&kabupaten=${this.form.kabupaten}`
        );
        console.log("Data kecamatan diterima:", response.data); // Debugging

        if (response.data && response.data.kecamatan) {
          this.kecamatanOptions = response.data.kecamatan.map(kec => ({
            label: kec.kecamatan,
            value: kec.kecamatan
          }));
          console.log("Kecamatan options:", this.kecamatanOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data kecamatan:", error);
      }
    },

    async fetchKelurahan() {
      this.form.kelurahan = "";
      this.kelurahanOptions = [];

      if (!this.form.provinsi || !this.form.kabupaten || !this.form.kecamatan) return;

      try {
        const response = await api.get(
          `/provinsi?provinsi=${this.form.provinsi}&kabupaten=${this.form.kabupaten}&kecamatan=${this.form.kecamatan}`
        );
        console.log("Data kelurahan diterima:", response.data); // Debugging

        if (response.data && response.data.kelurahan) {
          this.kelurahanOptions = response.data.kelurahan.map(kel => ({
            label: kel.kelurahan,
            value: kel.kelurahan
          }));
          console.log("Kelurahan options:", this.kelurahanOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data kelurahan:", error);
      }
    },

    async fetchData() {
      try {
        const fileStore = useFileStore();
        const data = fileStore.formPribadi;

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

    // async fetchData() {
    //   try {
    //     const response = await axios.get("https://67a0439924322f8329c5aae7.mockapi.io/data-diluar-ktp");
    //     console.log("Response data:", response.data);
    //     const data = Array.isArray(response.data) ? response.data[0] : response.data;
    //     if (data) {
    //       Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
    goBack() {
      this.$router.push({ path: "/dashboard/uploadDokumenPengkinianData" });
    },
    async handleSubmit() {
      if (this.isSubmitting) {
        return;
      }
      this.isSubmitting = true;
      try {
        const uuid = this.fileStore.uuid || "";

        if (!uuid) {
          console.error("UUID tidak ditemukan!");
          alert("Terjadi kesalahan, UUID tidak ditemukan.");
          return;
        }

        const requestData = {
          uuid: uuid,
          nama_alias_panggilan: this.form.namaPanggilan,
          pendidikan_terakhir: Number(this.form.pendidikanTerakhir),
          hobi: Number(this.form.hobi),
          nomor_telp: this.form.nomorTelepon,
          nomor_fax: this.form.nomorFax,
          email: this.form.email,
          detail_alamat: this.form.alamat,
          rt: this.form.rt,
          rw: this.form.rw,
          provinsi: this.form.provinsi,
          kota_kabupaten: this.form.kabupaten,
          kecamatan: this.form.kecamatan,
          desa_kelurahan: this.form.kelurahan,
          kode_pos: Number(this.form.kodePos),
        };

        console.log("Request data:", requestData);

        const response = await api.post("/data-pribadi-pengkinian-data", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormDataPribadi(this.form);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/dataPekerjaanPengkinianData" });
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
    }
  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchData();
    this.fetchProvinsi();
    this.fetchKabupaten();
    this.fetchKecamatan();
    this.fetchKelurahan();
  },
  // created() {
  //   this.fetchData();
  // },
};
</script>
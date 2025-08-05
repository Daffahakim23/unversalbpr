<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Alias/Panggilan (Opsional)" id="namaPanggilan" :isDropdown="false"
      v-model="form.namaPanggilan" placeholder="Masukkan Nama Alias/Panggilan" variant="alpha" />

    <FormField label="Pendidikan Terakhir (Opsional)" id="pendidikanTerakhir" :isDropdown="true"
      v-model="form.pendidikanTerakhir" :options="pendidikanOptions" placeholder="Pilih Pendidikan Terakhir" />

    <FormField label="Pilih Hobi (Opsional)" id="hobi" :isDropdown="true" v-model="form.hobi" :options="hobiOptions"
      placeholder="Pilih Hobi" />
    <div v-if="form.hobi === '0'">
      <FormField label="Hobi Lainnya*" id="otherSource" type="text" v-model="form.hobiLainnya"
        placeholder="Masukkan Hobi Lainnya" :required="true" />
    </div>

    <RadioButtonChoose label="Apakah Anda ingin mengubah No. Handphone Anda? (Opsional)" :options="trueFalseOptions"
      v-model="form.ubahNoTelepon" name="ubahNoTelepon" />

    <div v-if="form.ubahNoTelepon === true" class="mt-4">
      <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone" variant="phone"
        placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
          ? 'Nomor handphone tidak valid. Silakan periksa kembali.'
          : form.phone?.startsWith('0')
            ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
            : 'Pastikan Anda mengisi nomor handphone yang aktif'" :error="phoneError" @blur="handlePhoneBlur" />
    </div>

    <!-- <FormField label="Nomor Fax (opsional)" id="nomorFax" v-model="form.nomorFax" variant="numeric"
      placeholder="Masukkan Nomor Fax" :maxlength="10" /> -->

    <FormField label="Nomor Fax (opsional)" id="nomorFax" variant="numeric" v-model="form.nomorFax" :maxlength="10"
      placeholder="Masukkan Nomor Fax" required :error="nomorFaxError"
      :hint="nomorFaxError ? 'Nomor Fax tidak valid. Silakan periksa kembali' : ''" />

    <FormField label="Email (Opsional)" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Alamat Email tidak valid. Silakan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      :error="emailError" @blur="handleEmailBlur" />

    <RadioButtonChoose label="Apakah alamat domisili sesuai dengan alamat E-KTP?*" :options="alamatSesuaiEktpOptions"
      v-model="form.alamatSesuaiEktp" name="alamatSesuaiEktp" />

    <div v-if="form.alamatSesuaiEktp === false" class="mt-4">
      <FormField label="Detail Alamat Tempat Tinggal Terikini*" id="alamat" v-model="form.alamat" :required="true"
        placeholder="Masukkan Alamat Anda" />

      <div class="flex flex-row gap-4 w-full">
        <FormField label="RT*" id="rt" v-model="form.rt" :required="true" placeholder="Masukkan RT" variant="numeric"
          :maxlength="3" class="flex-1" />

        <FormField label="RW*" id="rw" v-model="form.rw" :required="true" placeholder="Masukkan RW" variant="numeric"
          :maxlength="3" class="flex-1" />
      </div>

      <FormField label="Provinsi*" id="provinsi" :isDropdown="true" v-model="form.provinsi" :options="provinsiOptions"
        placeholder="Pilih Provinsi" @change="fetchKabupaten" required />

      <FormField label="Kota/Kabupaten*" id="kabupaten" :isDropdown="true" v-model="form.kabupaten"
        :options="kabupatenOptions" placeholder="Pilih Kota/Kabupaten" @change="fetchKecamatan"
        :disabled="!form.provinsi" required />

      <FormField label="Kecamatan*" id="kecamatan" :isDropdown="true" v-model="form.kecamatan"
        :options="kecamatanOptions" placeholder="Pilih Kecamatan" @change="fetchKelurahan" :disabled="!form.kabupaten"
        required />

      <FormField label="Kelurahan*" id="kelurahan" :isDropdown="true" v-model="form.kelurahan"
        :options="kelurahanOptions" placeholder="Pilih Kelurahan" :disabled="!form.kecamatan" required />

      <!-- <FormField label="Kode Pos*" id="kodePos" v-model="form.kodePos" :required="true" variant="numeric"
        placeholder="Masukkan Kode Pos" :maxlength="5" /> -->

      <FormField label="Kode Pos*" id="kodePos" variant="numeric" v-model="form.kodePos" :maxlength="5"
        placeholder="Masukkan Kode Pos" required :error="kodePosError"
        :hint="kodePosError ? 'Kode pos tidak valid. Silakan periksa kembali' : ''" />
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
import { handleFieldMixin } from "@/handler/handleField.js";

export default {
  mixins: [handleFieldMixin],
  components: { FormField, RadioButtonChoose, ButtonComponent },
  data() {
    return {
      form: new FormModelDataPribadi(),
      pendidikanOptions,
      hobiOptions,
      alamatSesuaiEktpOptions,
      trueFalseOptions,
      isSubmitting: false,
      phoneError: false,
      emailError: false,
      selectedCountryCode: "ID",
      fileStore: useFileStore(),
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
      provinsiOptions: [],
      kabupatenOptions: [],
      kecamatanOptions: [],
      kelurahanOptions: [],
      fileStore: useFileStore(),
      kodePosError: false,
      nomorFaxError: false
    };
  },

  computed: {
    isButtonDisabled() {
      const isAlamatSesuaiEktpFilled = this.form.alamatSesuaiEktp !== null;
      const isUbahNoTeleponFilled = this.form.ubahNoTelepon !== null;
      const isKodePosValid = this.form.kodePos && String(this.form.kodePos).length === 5;
      const isOtherHobbyFilled = this.form.hobi === '0' ? this.form.hobiLainnya : true;

      // Kondisi wajib jika "Apakah alamat domisili sesuai dengan alamat E-KTP?" adalah False
      const isAlamatLengkapFilled =
        this.form.alamat &&
        this.form.rt &&
        this.form.rw &&
        this.form.provinsi &&
        this.form.kabupaten &&
        this.form.kecamatan &&
        this.form.kelurahan &&
        isKodePosValid;

      let isNomorTeleponTerisiJikaUbah = true;
      if (this.form.ubahNoTelepon === true) {

        isNomorTeleponTerisiJikaUbah = this.form.phone && !this.phoneError; // Sekarang, true jika phoneError true, false jika phoneError false
      }

      const isEmailOptionalValid = this.form.email ? !this.emailError : true;

      // Validasi awal untuk pertanyaan wajib (alamatSesuaiEktp dan ubahNoTelepon harus dijawab)
      if (!isAlamatSesuaiEktpFilled || !isUbahNoTeleponFilled) {
        return true; // Disabled jika belum dijawab
      }

      // Validasi khusus untuk kondisi "alamat tidak sesuai E-KTP"
      if (this.form.alamatSesuaiEktp === false) {
        if (!isAlamatLengkapFilled) {
          return true; // Disabled jika alamat tidak lengkap
        }
      }

      // Gabungkan semua kondisi untuk menentukan apakah form secara keseluruhan valid (enabled)
      const allConditionsMet =
        isAlamatSesuaiEktpFilled &&
        isUbahNoTeleponFilled &&
        (this.form.alamatSesuaiEktp === true || (this.form.alamatSesuaiEktp === false && isAlamatLengkapFilled)) &&
        isNomorTeleponTerisiJikaUbah && isOtherHobbyFilled &&
        isEmailOptionalValid;

      return !allConditionsMet;
    },
  },

  watch: {
    "form.provinsi": function (newProvinsi) {
      if (!newProvinsi) {
        this.form.kabupaten = "";
        this.form.kecamatan = "";
        this.form.kelurahan = "";
        this.kabupatenOptions = [];
        this.kecamatanOptions = [];
        this.kelurahanOptions = [];
      } else {
        this.fetchKabupaten();
      }
    },
    "form.kabupaten": function (newKabupaten) {
      if (!newKabupaten) {
        this.form.kecamatan = "";
        this.form.kelurahan = "";
        this.kecamatanOptions = [];
        this.kelurahanOptions = [];
      } else {
        this.fetchKecamatan();
      }
    },
    "form.kecamatan": function (newKecamatan) {
      if (!newKecamatan) {
        this.form.kelurahan = "";
        this.kelurahanOptions = [];
      } else {
        this.fetchKelurahan();
      }
    },
    "form.ubahNoTelepon": function (newVal) {
      if (!newVal) {
        this.form.phone = "";
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
    normalizeKabupaten(kabupaten) {
      return kabupaten.replace(/^KOTA\s*|^KABUPATEN\s*|^KAB\.\s*|^ADM\.\s*|^KOTA ADM\.\s*|^KAB\. ADM\.\s*/i, "").trim();
    },

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

    async fetchKabupatenFileStore() {
      this.kabupatenOptions = [];
      this.kecamatanOptions = [];

      if (!this.form.provinsi) return;

      try {
        const response = await api.get(
          `/provinsi?provinsi=${this.form.provinsi}`
        );

        if (response.data && response.data.kabupaten) {
          const normalizedKotaFromForm = this.normalizeKabupaten(this.form.kabupaten);
          let initiallySelectedValue = null;

          this.kabupatenOptions = response.data.kabupaten.map((k) => {
            const normalizedKabupatenFromApi = this.normalizeKabupaten(k.kabupaten);
            const isMatching = normalizedKabupatenFromApi.includes(normalizedKotaFromForm);

            if (isMatching && initiallySelectedValue === null) {
              initiallySelectedValue = k.kabupaten;
            }
            return {
              label: k.kabupaten,
              value: k.kabupaten,
            };
          });

          if (initiallySelectedValue) {
            this.form.kabupaten = initiallySelectedValue;
          } else if (this.kabupatenOptions.length > 0) {
            this.form.kabupaten = this.kabupatenOptions[0].value;
          }

          this.fetchKecamatan();
        }
      } catch (error) {
        console.error("Gagal mengambil data kabupaten:", error);
      }
    },

    async fetchKabupaten() {
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
      this.kecamatanOptions = [];
      this.kelurahanOptions = [];

      if (!this.form.provinsi || !this.form.kabupaten) return;

      try {
        const response = await api.get(
          `/provinsi?provinsi=${this.form.provinsi}&kabupaten=${this.form.kabupaten}`
        );

        if (response.data && response.data.kecamatan) {
          this.kecamatanOptions = response.data.kecamatan.map(kec => ({
            label: kec.kecamatan,
            value: kec.kecamatan
          }));
          this.fetchKelurahan();
        }
      } catch (error) {
        console.error("Gagal mengambil data kecamatan:", error);
      }
    },

    async fetchKelurahan() {
      if (!this.form.provinsi || !this.form.kabupaten || !this.form.kecamatan) return;

      try {
        const response = await api.get(
          `/provinsi?provinsi=${this.form.provinsi}&kabupaten=${this.form.kabupaten}&kecamatan=${this.form.kecamatan}`
        );

        if (response.data && response.data.kelurahan) {
          this.kelurahanOptions = response.data.kelurahan.map(kel => ({
            label: kel.kelurahan,
            value: kel.kelurahan
          }));
        }
      } catch (error) {
        console.error("Gagal mengambil data kelurahan:", error);
      }
    },

    async fetchData() {
      // Pastikan fileStore.formPribadi sudah terisi
      const data = this.fileStore.formPribadi;
      console.log("Data from Pinia (formPribadi):", data);

      if (data && Object.keys(data).length > 0) { // Cek jika data ada dan tidak kosong
        // ✨ Isi form dengan data dari Pinia
        Object.keys(this.form).forEach((key) => {
          if (data[key] !== undefined) {
            this.form[key] = data[key];
          }
        });

        // ✨ Panggil fetch untuk dropdown alamat jika alamatSesuaiEktp === false dan data sudah ada
        if (this.form.alamatSesuaiEktp === false) {
          // Anda perlu memastikan urutan fetch-nya benar
          // Ini akan dipicu oleh watcher pada form.provinsi, form.kabupaten, dll.
          // Tapi untuk initial load, kita bisa panggil secara berurutan
          if (this.form.provinsi) {
            await this.fetchKabupatenFileStore();
            if (this.form.kabupaten) {
              await this.fetchKecamatan();
              if (this.form.kecamatan) {
                await this.fetchKelurahan();
              }
            }
          }
        }

        // ✨ Panggil validasi blur secara manual jika Anda ingin error state terlihat
        // Misalnya, jika form.phone memiliki nilai dari Pinia, validasi itu
        if (this.form.phone) {
          this.handlePhoneBlur(); // Untuk menginisialisasi phoneError
        }
        if (this.form.email) {
          this.handleEmailBlur(); // Untuk menginisialisasi emailError
        }
        if (this.form.kodePos) { // Jika kodePos tidak null, panggil blur untuk validasi
          // Asumsi FormField untuk kodePos memicu validasi onBlur
          // Anda mungkin butuh handleKodePosBlur() terpisah jika tidak ada
        }


        // this.isDataFromFilestore = true; // Set flag jika diperlukan
        console.log("Form filled from Pinia (formPribadi):", this.form);
      } else {
        console.log("No data found in Pinia (formPribadi) to pre-fill form.");
      }
    },

    // async fetchData() {
    //   try {
    //     const fileStore = useFileStore();
    //     const data = fileStore.formPribadi;

    //     console.log("Data from Pinia:", data);

    //     if (data) {
    //       Object.keys(this.form).forEach((key) => {
    //         if (data[key] !== undefined) {
    //           this.form[key] = data[key];
    //         }
    //       });
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
          email: this.form.email,
          nama_alias_panggilan: this.form.namaPanggilan,
          pendidikan_terakhir: Number(this.form.pendidikanTerakhir),
          hobi: Number(this.form.hobi),
          hobi_lainnya: this.form.hobiLainnya,
          nomor_telp: this.form.phone,
          nomor_fax: this.form.nomorFax,
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
    // this.loadInitialDataAndDropdowns();
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
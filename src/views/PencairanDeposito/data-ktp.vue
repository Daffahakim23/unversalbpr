<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="NIK" id="nik" v-model="form.nik" variant="numeric" :maxlength="16" required />

    <FormField label="Nama Lengkap" id="namaLengkap" v-model="form.namaLengkap"
      :hint="namaLengkapError ? 'Nama lengkap tidak valid, silahkan periksa kembali' : ''" :error="namaLengkapError"
      @blur="handleNamaLengkapBlur" variant="alpha" required />
    <!-- <FormField label="Nama Lengkap" id="namaLengkap" v-model="form.namaLengkap" required /> -->

    <FormField label="Tanggal Lahir" id="tanggalLahir" type="date" v-model="form.tanggalLahir" required />

    <FormField label="Tempat Lahir" id="tempatLahir" v-model="form.tempatLahir" variant="alpha" required />

    <FormField label="Jenis Kelamin" id="jenisKelamin" :isDropdown="true" v-model="form.jenisKelamin"
      :options="jenisKelaminOptions" required />

    <FormField label="Agama" id="agama" :isDropdown="true" v-model="form.agama" :options="agamaOptions" required />

    <FormField label="Alamat" id="alamat" v-model="form.alamat" required />

    <FormField label="RT" id="rt" v-model="form.rt" variant="numeric" required maxlength="3" />

    <FormField label="RW" id="rw" v-model="form.rw" variant="numeric" required maxlength="3" />

    <FormField label="Provinsi" id="provinsi" :isDropdown="true" v-model="form.provinsi" :options="provinsiOptions"
      placeholder="Pilih Provinsi" @change="fetchKabupaten" required />

    <FormField label="Kabupaten/Kota" id="kabupaten" :isDropdown="true" v-model="form.kabupaten"
      :options="kabupatenOptions" placeholder="Pilih Kabupaten/Kota" @change="fetchKecamatan" :disabled="!form.provinsi"
      required />

    <FormField label="Kecamatan" id="kecamatan" :isDropdown="true" v-model="form.kecamatan" :options="kecamatanOptions"
      placeholder="Pilih Kecamatan" @change="fetchKelurahan" :disabled="!form.kabupaten" required />

    <FormField label="Kelurahan" id="kelurahan" :isDropdown="true" v-model="form.kelurahan" :options="kelurahanOptions"
      placeholder="Pilih Kelurahan" :disabled="!form.kecamatan" required />

    <FormField label="Kode Pos" id="kodePos" variant="numeric" v-model="form.kodePos"
      placeholder="Masukkan Kode Pos Anda" :maxlength="5" required />

    <FormField label="Status Perkawinan" id="statusPerkawinan" :isDropdown="true" v-model="form.statusPerkawinan"
      :options="statusPerkawinanOptions" required />

    <FormField label="Kewarganegaraan" id="kewarganegaraan" :isDropdown="true" v-model="form.kewarganegaraan"
      :options="kewarganegaraanOptions" required />

    <div v-if="form.kewarganegaraan === false" class="">
      <FormField label="Kewarganegaraan Lainnya *" id="kewarganegaraanLainnya" type="text"
        v-model="form.kewarganegaraanLainnya" placeholder=" " required />
    </div>

    <FormField label="Masa Aktif KTP" id="masaAktifKtp" :isDropdown="true" v-model="form.masaAktifKtp"
      :options="masaAktifKTPOptions" required />

    <div class="flex justify-between mt-4">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
        {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import api from "@/API/api";
import FormField from "@/components/FormField.vue";
import ButtonComponent from "@/components/button.vue";
import { FormModelDataKTP } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { agamaOptions, jenisKelaminOptions, kewarganegaraanOptions, statusPerkawinanOptions, getMasaAktifKTPOptions } from "@/data/option.js";

export default {
  components: {
    FormField,
    ButtonComponent,
  },
  data() {
    return {
      touched: {
        namaLengkap: false,
      },
      form: new FormModelDataKTP(),
      statusPerkawinanOptions,
      jenisKelaminOptions,
      agamaOptions,
      kewarganegaraanOptions,
      isSubmitting: false,
      masaAktifKTPOptions: getMasaAktifKTPOptions(),
      fileStore: useFileStore(),
      provinsiOptions: [],
      kabupatenOptions: [],
      kecamatanOptions: [],
      kelurahanOptions: [],
      namaLengkapError: false,
    };
  },
  watch: {
    "form.provinsi": function (newProvinsi) {
      if (!newProvinsi) {
        this.kabupatenOptions = [];
        this.kecamatanOptions = [];
        this.kelurahanOptions = [];
      } else {
        this.fetchKabupaten();
      }
    },
    "form.kabupaten": function (newKabupaten) {
      if (!newKabupaten) {
        this.kecamatanOptions = [];
        this.kelurahanOptions = [];
      } else {
        this.fetchKecamatan();
      }
    },
    "form.kecamatan": function (newKecamatan) {
      if (!newKecamatan) {
        this.kelurahanOptions = [];
      } else {
        this.fetchKelurahan();
      }
    },
  },
  computed: {
    isButtonDisabled() {
      const nikValue = this.form.nik;
      if (!nikValue || String(nikValue).length !== 16) {
        return true;
      }
      return Object.entries(this.form).some(([key, value]) => {
        if (key === "jenisKelamin") {
          return false;
        }
        if (key === "kewarganegaraanLainnya" && this.form.kewarganegaraan) {
          return false;
        }
        return !value;
      });
    },
  },

  methods: {
    validateNamaLengkap(namaLengkap) {
      return /^[^\d]+$/.test(namaLengkap);
    },
    handleNamaLengkapBlur() {
      this.touched.namaLengkap = true;
      if (this.form.namaLengkap) {
        this.namaLengkapError = !this.validateNamaLengkap(this.form.namaLengkap);
      }
    },
    normalizeKabupaten(kabupaten) {
      return kabupaten.replace(/^KOTA\s*|^KAB\.\s*|^ADM\.\s*|^KOTA ADM\.\s*|^KAB\. ADM\.\s*/i, "").trim();
    },
    async fetchProvinsi() {
      this.provinsiOptions = [];
      this.kabupatenOptions = [];
      try {
        const response = await api.get("/provinsi");

        if (response.data && response.data.provinsi) {
          this.provinsiOptions = response.data.provinsi.map(p => ({
            label: p.provinsi,
            value: p.provinsi
          }));
          this.fetchKabupaten();
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error);
      }
    },

    async fetchKabupaten() {
      this.kabupatenOptions = [];
      this.kecamatanOptions = [];

      if (!this.form.provinsi || !this.form.kabupaten) return;

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
              label: normalizedKabupatenFromApi,
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
      console.log("Checking fileStore:", this.fileStore.formKTP);
      if (this.fileStore.formKTP?.message && Object.keys(this.fileStore.formKTP.message).length > 0) {
        const message = this.fileStore.formKTP.message;
        const [day, month, year] = (message.tanggal_lahir || "").split("-");
        const formattedTanggalLahir = year && month && day ? `${year}-${month}-${day}` : "";

        const tanggalBerlakuSampai = message.berlaku_sampai;
        this.masaAktifKTPOptions = getMasaAktifKTPOptions(tanggalBerlakuSampai);

        this.form = {
          nik: message.nik || "",
          namaLengkap: message.nama_lengkap || "",
          tanggalLahir: formattedTanggalLahir,
          tempatLahir: message.tempat_lahir || "",
          jenisKelamin: message.jenis_kelamin,
          kewarganegaraan: message.kewarganegaraan,
          agama: Number(message.agama) || "",
          alamat: message.alamat_ktp || "",
          rt: message.rt || "",
          rw: message.rw || "",
          provinsi: message.provinsi || "",
          kabupaten: (message.kota || "").replace(/^KOTA\s*|^KAB\.\s*|^KOTA ADM\.\s*|^KAB\. ADM\.\s*/i, ""),
          kecamatan: message.kecamatan || "",
          kelurahan: message.desa_kelurahan || "",
          kodePos: Number(message.kode_pos) || "",
          statusPerkawinan: message.status_pernikahan,
          masaAktifKtp: tanggalBerlakuSampai || (message.berlaku_seumur_hidup ? "Seumur Hidup" : ""),
          kewarganegaraanLainnya: message.kewarganegaraan_lainya || "",
          // nama_gadis_ibu_kandung: "ini ibu",
        };
        console.log("Form filled:", this.form);
      }
    },

    goBack() {
      this.$router.push({
        name: "PreviewScreenPencairanDeposito",
        query: {
          documentType: "ktp",
          fileUrl: this.$route.query.fileUrl,
        },
      });
    },
    async handleSubmit() {
      if (this.isSubmitting) {
        return;
      }
      this.isSubmitting = true;
      try {
        let formattedDate = this.form.tanggalLahir;
        if (/^\d{2}-\d{2}-\d{4}$/.test(formattedDate)) {
          const [day, month, year] = formattedDate.split("-");
          formattedDate = `${year}-${month}-${day}`;
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
          console.error("Invalid date format:", this.form.tanggalLahir);
          alert("Format tanggal tidak valid! Gunakan format YYYY-MM-DD.");
          return;
        }

        const uuid = this.fileStore.uuid;

        if (!uuid) {
          console.error("UUID tidak ditemukan di fileStore");
          alert("Terjadi kesalahan, UUID tidak ditemukan.");
          return;
        }

        const requestData = {
          id: uuid,
          nik: this.form.nik,
          nama_lengkap: this.form.namaLengkap,
          tanggal_lahir: formattedDate,
          tempat_lahir: this.form.tempatLahir,
          jenis_kelamin: Boolean(this.form.jenisKelamin),
          agama: Number(this.form.agama),
          alamat_ktp: this.form.alamat,
          rt: this.form.rt,
          rw: this.form.rw,
          provinsi: this.form.provinsi,
          kota: this.form.kabupaten,
          kecamatan: this.form.kecamatan,
          desa_kelurahan: this.form.kelurahan,
          kode_pos: Number(this.form.kodePos),
          status_pernikahan: Number(this.form.statusPerkawinan),
          berlaku_sampai: this.form.masaAktifKtp,
          kewarganegaraan: Boolean(this.form.kewarganegaraan),
          kewarganegaraanLainnya: this.form.kewarganegaraanLainnya,
          is_ekstrak_ktp_ocr: true,
        };

        console.log("Request data:", requestData);

        console.log("Formatted Request Data:", JSON.stringify(requestData, null, 2));
        const response = await api.post("/save-ktp-pencairan-deposito", requestData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200 || response.status === 201) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormDataKTP(this.form);
          this.fileStore.setNamaLengkap(requestData.nama_lengkap);
          this.fileStore.setNik(requestData.nik);
          this.fileStore.isKtpUploaded = true;
          this.fileStore.uploadedFiles["ktp"] = "Foto KTP";
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/uploadDokumenPencairanDeposito" });
        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchData();
    this.fetchProvinsi();
    this.fetchKabupaten();
    this.fetchKecamatan();
    this.fetchKelurahan();
    this.$emit("set-navbar-config", {
      showBackButton: true,
      showInfoButton: true,
      showLogoBPR: true,
      centerTitle: true,
    });
    this.$emit("set-cancel-route", { name: 'UploadDokumenPencairanDeposito' });
  },
};
</script>

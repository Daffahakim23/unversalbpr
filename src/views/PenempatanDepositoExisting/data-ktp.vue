<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="NIK" id="nik" v-model="form.nik" required />
    <FormField label="Nama Lengkap" id="namaLengkap" v-model="form.namaLengkap" required />
    <FormField label="Tanggal Lahir" id="tanggalLahir" v-model="form.tanggalLahir" required />
    <FormField label="Tempat Lahir" id="tempatLahir" v-model="form.tempatLahir" required />
    <FormField label="Jenis Kelamin" id="jenisKelamin" :isDropdown="true" v-model="form.jenisKelamin"
      :options="jenisKelaminOptions" required />
    <FormField label="Agama" id="agama" :isDropdown="true" v-model="form.agama" :options="agamaOptions" required />
    <FormField label="Alamat" id="alamat" v-model="form.alamat" required />
    <FormField label="RT" id="rt" v-model="form.rt" required />
    <FormField label="RW" id="rw" v-model="form.rw" required />
    <FormField label="Provinsi" id="provinsi" v-model="form.provinsi" required />
    <FormField label="Kota / Kabupaten" id="kota" v-model="form.kota" required />
    <FormField label="Kecamatan" id="kecamatan" v-model="form.kecamatan" required />
    <FormField label="Kelurahan" id="kelurahan" v-model="form.kelurahan" required />
    <FormField label="Kode Pos" id="kodePos" type="number" v-model="form.kodePos" required />
    <FormField label="Status Perkawinan" id="statusPerkawinan" :isDropdown="true" v-model="form.statusPerkawinan"
      :options="statusPerkawinanOptions" required />
    <FormField label="Kewarganegaraan" id="kewarganegaraan" :isDropdown="true" v-model="form.kewarganegaraan"
      :options="kewarganegaraanOptions" required />
    <div v-if="form.kewarganegaraan === false" class="">
      <FormField label="Kewarganegaraan Lainnya *" id="kewarganegaraanLainnya" type="text"
        v-model="form.kewarganegaraanLainnya" placeholder=" " required />
    </div>
    <FormField label="Masa Aktif KTP" id="masaAktifKtp" v-model="form.masaAktifKtp" required />
    <FormField label="Nama Ibu Kandung" id="namaIbuKandung" v-model="form.namaIbuKandung" required />

    <div class="flex justify-between mt-4">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="submit" :disabled="isButtonDisabled">Lanjutkan</ButtonComponent>
    </div>
  </form>
</template>

<script>
import api from "@/API/api";
import FormField from "@/components/FormField.vue";
import ButtonComponent from "@/components/button.vue";
import { FormModelDataKTP } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { agamaOptions, jenisKelaminOptions, kewarganegaraanOptions, statusPerkawinanOptions } from "@/data/option.js";

export default {
  components: {
    FormField,
    ButtonComponent,
  },
  data() {
    return {
      form: new FormModelDataKTP(),
      statusPerkawinanOptions,
      jenisKelaminOptions,
      agamaOptions,
      kewarganegaraanOptions,
      fileStore: useFileStore(),
    };
  },
  computed: {
    isButtonDisabled() {
      return Object.entries(this.form).some(([key, value]) => {
        if (key === "jenisKelamin") {
          return false; // Mengabaikan validasi jenisKelamin
        }
        if (key === "kewarganegaraanLainnya" && this.form.kewarganegaraan) {
          return false;
        }
        return !value;
      });
    },
  },
  methods: {
    async fetchData() {
      console.log("Checking fileStore:", this.fileStore.formKTP);
      if (this.fileStore.formKTP?.message && Object.keys(this.fileStore.formKTP.message).length > 0) {
        this.form = {
          nik: this.fileStore.formKTP.message.nik || "",
          namaLengkap: this.fileStore.formKTP.message.nama_lengkap || "",
          tanggalLahir: this.fileStore.formKTP.message.tanggal_lahir || "",
          tempatLahir: this.fileStore.formKTP.message.tempat_lahir || "",
          jenisKelamin: Boolean(this.fileStore.formKTP.message.jenis_kelamin),
          kewarganegaraan: Boolean(this.fileStore.formKTP.message.kewarganegaraan),
          agama: Number(this.fileStore.formKTP.message.agama) || "",
          alamat: this.fileStore.formKTP.message.alamat_ktp || "",
          rt: this.fileStore.formKTP.message.rt || "",
          rw: this.fileStore.formKTP.message.rw || "",
          provinsi: this.fileStore.formKTP.message.provinsi || "",
          kota: this.fileStore.formKTP.message.kota || "",
          kecamatan: this.fileStore.formKTP.message.kecamatan || "",
          kelurahan: this.fileStore.formKTP.message.desa_kelurahan || "",
          kodePos: this.fileStore.formKTP.message.kode_pos || "",
          statusPerkawinan: Number(this.fileStore.formKTP.message.status_pernikahan),
          masaAktifKtp: this.fileStore.formKTP.message.berlaku_sampai || (this.fileStore.formKTP.message.berlaku_seumur_hidup ? "Seumur Hidup" : ""),
          namaIbuKandung: this.fileStore.formKTP.message.nama_gadis_ibu_kandung || "",
          kewarganegaraanLainnya: this.fileStore.formKTP.message.kewarganegaraanLainnya || "",
        };
        console.log("Form filled:", this.form);
      }
    },

    goBack() {
      this.$router.push({
        name: "PreviewScreenPenempatanDepositoExisting",
        query: {
          documentType: "ktp",
          fileUrl: this.$route.query.fileUrl,
        },
      });
    },
    async handleSubmit() {
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
          kota: this.form.kota,
          kecamatan: this.form.kecamatan,
          desa_kelurahan: this.form.kelurahan,
          kode_pos: Number(this.form.kodePos),
          status_pernikahan: Number(this.form.statusPerkawinan),
          berlaku_sampai: this.form.masaAktifKtp,
          nama_gadis_ibu_kandung: this.form.namaIbuKandung,
          kewarganegaraan: Boolean(this.form.kewarganegaraan),
          kewarganegaraanLainnya: this.form.kewarganegaraanLainnya,
        };

        console.log("Request data:", requestData);

        console.log("Formatted Request Data:", JSON.stringify(requestData, null, 2));
        const response = await api.post("/save-ktp-deposito-existing", requestData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200 || response.status === 201) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormDataKTP(this.form);
          this.fileStore.isKtpUploaded = true;
          this.fileStore.uploadedFiles["ktp"] = "Foto KTP";
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/uploadDokumenPenempatanDepositoExisting" });
        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchData();
  },
};
</script>

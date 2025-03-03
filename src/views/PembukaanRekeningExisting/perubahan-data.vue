<template>
  <form @submit.prevent="handleSubmit">
    <RadioButtonChoose label="Apakah Anda ingin melakukan pembaharuan data" :options="sumberOptions"
      v-model="form.perubahanData" name="perubahaDataD" />
    <div v-if="form.perubahanData === true" class="mt-4">
      <FormField label="Alamat" id="alamat" :isDropdown="false" v-model="form.alamat" :required="true" />
      <FormField label="RT" id="rt" :isDropdown="false" v-model="form.rt" :required="true" />
      <FormField label="RW" id="rw" :isDropdown="false" v-model="form.rw" :required="true" />
      <FormField label="Provinsi" id="provinsi" :isDropdown="true" v-model="form.provinsi" :options="provinsiOptions"
        placeholder="Pilih Provinsi" @change="fetchKabupaten" required />
      <FormField label="Kabupaten/Kota" id="kabupaten" :isDropdown="true" v-model="form.kabupaten"
        :options="kabupatenOptions" placeholder="Pilih Kabupaten/Kota" @change="fetchKecamatan"
        :disabled="!form.provinsi" required />
      <FormField label="Kecamatan" id="kecamatan" :isDropdown="true" v-model="form.kecamatan"
        :options="kecamatanOptions" placeholder="Pilih Kecamatan" :disabled="!form.kabupaten" required />
      <FormField label="Kelurahan" id="kelurahan" :isDropdown="false" v-model="form.kelurahan" :required="true" />
      <FormField label="Kode Pos" id="kodePos" type="number" v-model="form.kodePos" :required="true" />
      <FormField label="Alamat Kantor" id="alamat_kantor" :isDropdown="false" v-model="form.alamat_kantor"
        :required="true" />
      <FormField label="Nomor Telepon" id="nomor_telp" type="number" v-model="form.nomor_telp"
        placeholder="Masukkan Nomor Telepon" :required="true" />
      <FormField label="Nomor Fax" id="nomor_fax" type="number" v-model="form.nomor_fax"
        placeholder="Masukkan Nomor Fax" :required="false" />
      <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan email Anda"
        required />
    </div>
    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";
import { FormModelPerubahanData } from "@/models/formModel";

export default {
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
  },
  data() {
    return {
      form: new FormModelPerubahanData(),
      fileStore: useFileStore(),
      sumberOptions: [
        { label: "YA", value: true },
        { label: "TIDAK", value: false },
      ],
      provinsiOptions: [],
      kabupatenOptions: [],
      kecamatanOptions: [],
    };
  },
  computed: {
    isButtonDisabled() {
      if (this.form.perubahanData === false) {
        return false;
      }
      if (this.form.perubahanData === true) {
        return !(
          this.form.alamat &&
          this.form.rt &&
          this.form.rw &&
          this.form.provinsi &&
          this.form.kota &&
          this.form.kecamatan &&
          this.form.kelurahan &&
          this.form.kodePos &&
          this.form.email
        );
      }
      return true;
    },
  },
  methods: {
    // async fetchData() {
    //   try {
    //     const response = await axios.get("https://testapi.io/api/Daffahakim23/perubahan-data");
    //     console.log("Response data:", response.data);
    //     const data = Array.isArray(response.data) ? response.data[0] : response.data;
    //     if (data) {
    //       Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
    async fetchProvinsi() {
      try {
        const response = await axios.get("http://10.14.52.233:8001/provinsi");
        console.log("Data provinsi diterima:", response.data); // Debugging

        if (response.data && response.data.provinsi) { // Pastikan data tersedia
          this.provinsiOptions = response.data.provinsi.map(p => ({
            label: p.provinsi,
            value: p.provinsi
          }));
          console.log("Provinsi options:", this.provinsiOptions); // Debugging
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
        const response = await axios.get(`http://10.14.52.233:8001/provinsi?provinsi=${this.form.provinsi}`);
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
        const response = await axios.get(
          `http://10.14.52.233:8001/provinsi?provinsi=${this.form.provinsi}&kabupaten=${this.form.kabupaten}`
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
    goBack() {
      this.$router.go(-1);
    },
    async handleSubmit() {
      try {
        const uuid = this.fileStore.uuid || "";

        if (!uuid) {
          console.error("UUID tidak ditemukan!");
          alert("Terjadi kesalahan, UUID tidak ditemukan.");
          return;
        }

        const requestData = {
          uuid,
          alamat: this.form.alamat,
          rt: this.form.rt,
          rw: this.form.rw,
          provinsi: this.form.provinsi,
          kota_kabupaten: this.form.kota,
          kecamatan: this.form.kecamatan,
          desa_kelurahan: this.form.kelurahan,
          kode_pos: Number(this.form.kodePos),
          alamat_kantor: this.form.alamat_kantor,
          nomor_telp: String(this.form.nomor_telp),
          nomor_fax: String(this.form.nomor_fax),

          email: this.form.email,
        };

        console.log("Request data:", requestData);

        const response = await api.post("/pembaruan-data", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormPembaruanData(this.form);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/konfirmasiDataPembukaanRekeningExisting" });
        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
        console.error("Error saat mengirim data:", error);
      }
    }
  },
  mounted() {
    this.$emit("update-progress", 80);
    this.fetchProvinsi();
  },
  // created() {
  //   this.fetchData();
  // },
};
</script>

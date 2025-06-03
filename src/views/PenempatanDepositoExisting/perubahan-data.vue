<template>
  <form @submit.prevent="handleSubmit">
    <RadioButtonChoose label="Apakah Anda ingin melakukan pembaharuan data?" :options="sumberOptions"
      v-model="form.perubahanData" name="perubahaDataD" />

    <div v-if="form.perubahanData === true" class="mt-4">
      <FormField label="Alamat Tempat Tinggal" id="alamat" :isDropdown="false" v-model="form.alamat"
        placeholder="Masukkan Alamat Tempat Tinggal Anda" :required="false" />

      <FormField label="RT" id="rt" :isDropdown="false" v-model="form.rt" placeholder="Masukkan RT Anda"
        :required="false" variant="numeric" maxlength="3" />

      <FormField label="RW" id="rw" :isDropdown="false" v-model="form.rw" placeholder="Masukkan RW Anda"
        :required="false" variant="numeric" maxlength="3" />

      <FormField label="Provinsi" id="provinsi" :isDropdown="true" v-model="form.provinsi" :options="provinsiOptions"
        placeholder="Pilih Provinsi" @change="fetchKabupaten" :required="false" />

      <FormField label="Kabupaten/Kota" id="kabupaten" :isDropdown="true" v-model="form.kabupaten"
        :options="kabupatenOptions" placeholder="Pilih Kabupaten/Kota" @change="fetchKecamatan"
        :disabled="!form.provinsi" :required="false" />

      <FormField label="Kecamatan" id="kecamatan" :isDropdown="true" v-model="form.kecamatan"
        :options="kecamatanOptions" placeholder="Pilih Kecamatan" :disabled="!form.kabupaten" :required="false" />

      <FormField label="Kelurahan" id="kelurahan" :isDropdown="true" v-model="form.kelurahan"
        :options="kelurahanOptions" placeholder="Pilih Kelurahan" :disabled="!form.kecamatan" required />

      <FormField label="Kode Pos" id="kodePos" type="number" v-model="form.kodePos" placeholder="Masukkan Kode Pos Anda"
        :required="false" variant="numeric" />

      <FormField label="Alamat Kantor (Opsional)" id="alamat_kantor" :isDropdown="false" v-model="form.alamat_kantor"
        placeholder="Masukkan Alamat Kantor Anda" :required="false" />

      <FormField label="Nomor Telepon (Opsional)" id="nomor_telp" type="number" v-model="form.nomor_telp"
        placeholder="Masukkan Nomor Telepon" variant="numeric" :required="false" />

      <FormField label="Nomor Fax (Opsional)" id="nomor_fax" type="number" v-model="form.nomor_fax"
        placeholder="Masukkan Nomor Fax" :required="false" variant="numeric" :maxlength="10"  />

      <FormField label="Alamat Email (Opsional)" id="email" type="email" v-model="form.email"
        placeholder="Masukkan email Anda" :required="false" />

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
      kelurahanOptions: [],
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
    "form.perubahanData": function (newValue) {
      if (newValue === false) {
        this.form.alamat = "";
        this.form.rt = "";
        this.form.rw = "";
        this.form.provinsi = "";
        this.form.kabupaten = "";
        this.form.kecamatan = "";
        this.form.kelurahan = "";
        this.form.kodePos = "";
      }
    },
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
          this.form.kabupaten &&
          this.form.kecamatan &&
          this.form.kelurahan &&
          this.form.kodePos
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
    async fetchData() {
      try {
        const fileStore = useFileStore();
        const data = fileStore.formPembaruanData;

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
    async fetchProvinsi() {
      try {
        const response = await api.get("/provinsi");
        console.log("Data provinsi diterima:", response.data);

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
      this.kabupatenOptions = [];
      this.kecamatanOptions = [];
      this.kelurahanOptions = [];

      if (!this.form.provinsi) return;

      try {
        const response = await api.get(`/provinsi?provinsi=${this.form.provinsi}`);
        console.log("Data kabupaten diterima:", response.data);

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
        console.log("Data kecamatan diterima:", response.data);

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
      this.kelurahanOptions = [];

      if (!this.form.provinsi || !this.form.kabupaten || !this.form.kecamatan) return;

      try {
        const response = await api.get(
          `/provinsi?provinsi=${this.form.provinsi}&kabupaten=${this.form.kabupaten}&kecamatan=${this.form.kecamatan}`
        );
        console.log("Data kelurahan diterima:", response.data);

        if (response.data && response.data.kelurahan) {
          this.kelurahanOptions = response.data.kelurahan.map(kel => ({
            label: kel.kelurahan,
            value: kel.kelurahan
          }));
          console.log("kelurahan options:", this.kelurahanOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data kelurahan:", error);
      }
    },
    goBack() {
      this.$router.push({ path: "/dashboard/uploadDokumenPenempatanDepositoExisting" });
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

        const response = await api.post("/pembaruan-data-deposito", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormPembaruanData(this.form);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/konfirmasiDataPenempatanDepositoExisting" });
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
    this.fetchKabupaten();
    this.fetchKecamatan();
    this.fetchKelurahan();
    this.fetchData();
  },
  created() {
    // this.fetchData();
  },
};
</script>

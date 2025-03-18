<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Alias/Panggilan" id="namaPanggilan" :isDropdown="false" v-model="form.namaPanggilan"
      placeholder="Masukan Nama Alias/Panggilan" :required="true" />


    <RadioButtonChoose label="Tujuan Membuka Rekening*" :options="tujuanOptions" v-model="form.tujuan" name="tujuan" />

    <FormField label="Pilih Kantor Cabang Pembukaan Rekening*" id="kantorCabang" :isDropdown="true"
      v-model="form.kantorCabang" placeholder="Pilih Kantor Cabang" :options="kantorCabangOptions" required />

    <div v-if="form.kantorCabang" class="mt-4">
      <FormField label="Alamat Kantor Cabang Pembukaan Rekening" id="alamatKantorCabang"
        v-model="form.alamatKantorCabang" :readonly="true" />

    </div>
    <FormField label="Pendidikan Terakhir*" id="pendidikanTerakhir" :isDropdown="true" v-model="form.pendidikanTerakhir"
      :options="pendidikanOptions" :required="true" placeholder="Pilih Pendidikan Terakhir Anda" />

    <FormField label="Hobi*" id="hobi" :isDropdown="true" v-model="form.hobi" :options="hobiOptions"
      placeholder="Pilih Hobi Anda" />

    <FormField label="Nomor Telepon (Opsional)" id="nomorTelepon" type="Number" v-model="form.nomorTelepon"
      placeholder="Masukkan Nomor Telepon" />

    <FormField label="Nomor Fax (opsional)" id="nomorFax" type="Number" v-model="form.nomorFax"
      placeholder="Masukkan Nomor Fax" />

    <RadioButtonChoose label="Apakah alamat domisili sesuai dengan alamat E-KTP?*" :options="alamatSesuaiEktpOptions"
      v-model="form.alamatSesuaiEktp" name="alamatSesuaiEktp" />

    <div v-if="form.alamatSesuaiEktp === false" class="mt-4">
      <FormField label="Alamat Tempat Tinggal*" id="alamat" v-model="form.alamat" :required="true"
        placeholder="Masukkan Alamat Anda" />

      <div class="flex flex-row gap-4 w-full">
        <FormField label="RT*" id="rt" v-model="form.rt" :required="true" placeholder="Masukkan RT" class="flex-1" />

        <FormField label="RW*" id="rw" v-model="form.rw" :required="true" placeholder="Masukkan RW" class="flex-1" />
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

      <FormField label="Kode Pos*" id="kodePos" v-model="form.kodePos" :required="true"
        placeholder="Masukan Kode Pos" />

    </div>
    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="submit" :disabled="isButtonDisabled">Lanjutkan</ButtonComponent>
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
import { pendidikanOptions, hobiOptions, tujuanOptions, alamatSesuaiEktpOptions } from "@/data/option.js";

export default {
  components: { FormField, RadioButtonChoose, ButtonComponent },
  data() {
    return {
      form: new FormModelDataPribadi(),
      pendidikanOptions,
      hobiOptions,
      tujuanOptions,
      alamatSesuaiEktpOptions,
      fileStore: useFileStore(),
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
      provinsiOptions: [],
      kabupatenOptions: [],
      kecamatanOptions: [],
      kelurahanOptions: [],
    };
  },
  watch: {
    "form.kantorCabang"(newVal) {
      this.form.alamatKantorCabang = this.kantorCabangAlamat[newVal] || "Alamat tidak ditemukan";
    },
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
  },

  computed: {
    isButtonDisabled() {
      const isFormFilled =
        this.form.namaPanggilan &&
        this.form.tujuan &&
        this.form.kantorCabang &&
        this.form.pendidikanTerakhir &&
        this.form.alamatSesuaiEktp !== undefined; // Pastikan alamatSesuaiEktp memiliki nilai boolean

      const isAddressFilled = this.form.alamatSesuaiEktp
        ? true // Jika alamat sesuai KTP, maka alamat tambahan tidak perlu diisi
        : (this.form.alamat &&
          this.form.rt &&
          this.form.rw &&
          this.form.provinsi &&
          this.form.kabupaten &&
          this.form.kecamatan &&
          this.form.kelurahan &&
          this.form.kodePos);

      return !(isFormFilled && isAddressFilled);
    }
  },

  methods: {
    async fetchBranches() {
      try {
        const response = await axios.get("http://10.14.52.233:8001/list-branch");

        if (response.data && response.data.branch) {
          this.kantorCabangOptions = response.data.branch.map(branch => {
            const label = branch.branch_name.replace(/\s*\(\d+\)$/, '');

            return {
              label: label.trim(),
              value: branch.branch_code
            };
          });

          this.kantorCabangAlamat = response.data.branch.reduce((acc, branch) => {
            acc[branch.branch_code] = branch.branch_address.Valid ? branch.branch_address.String : "Alamat tidak tersedia";
            return acc;
          }, {});
        }
      } catch (error) {
        console.error("Gagal mengambil data kantor cabang:", error);
      }
    },

    async fetchProvinsi() {
      try {
        const response = await axios.get("http://10.14.52.233:8001/provinsi");
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

    async fetchKelurahan() {
      this.form.kelurahan = "";
      this.kelurahanOptions = [];

      if (!this.form.provinsi || !this.form.kabupaten || !this.form.kecamatan) return;

      try {
        const response = await axios.get(
          `http://10.14.52.233:8001/provinsi?provinsi=${this.form.provinsi}&kabupaten=${this.form.kabupaten}&kecamatan=${this.form.kecamatan}`
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
    goBack() {
      this.$router.push({ path: "/dashboard/uploadDokumenPenempatanDepositoNTB" });
    },
    async handleSubmit() {
      try {
        const uuid = this.fileStore.uuid || "";

        if (!uuid) {
          console.error("UUID tidak ditemukan!");
          alert("Terjadi kesalahan, UUID tidak ditemukan.");
          return;
        }

        const selectedBranch = this.kantorCabangOptions.find(
          branch => branch.value === this.form.kantorCabang
        );

        const requestData = {
          uuid: uuid,
          // uuid: "4d0083ea-1509-4a6a-a8e0-89a218ddf366",
          nama_alias_panggilan: this.form.namaPanggilan,
          tujuan_buka_rekening: Number(this.form.tujuan),
          kantor_cabang: selectedBranch ? selectedBranch.label : "",
          kode_kantor_cabang: this.form.kantorCabang,
          pendidikan_terakhir: Number(this.form.pendidikanTerakhir),
          hobi: Number(this.form.hobi),
          nomor_telp: this.form.nomorTelepon,
          nomor_fax: this.form.nomorFax,
          detail_alamat: this.form.alamat,
          rt: this.form.rt,
          rw: this.form.rw,
          provinsi: this.form.provinsi,
          kota_kabupaten: this.form.kabupaten,
          kecamatan: this.form.kecamatan,
          desa_kelurahan: this.form.kelurahan,
          kode_pos: Number(this.form.kodePos)
        };

        console.log("Request data:", requestData);

        const response = await api.post("/data-pribadi-deposito", requestData, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          this.fileStore.setFormDataPribadi(this.form);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/dataPekerjaanPenempatanDepositoNTB" });
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
    this.$emit("update-progress", 60);
    this.fetchData();
    this.fetchProvinsi();
    this.fetchKabupaten();
    this.fetchKecamatan();
    this.fetchKelurahan();
    this.fetchBranches();
  },

};
</script>

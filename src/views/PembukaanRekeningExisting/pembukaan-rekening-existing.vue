<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Produk yang diinginkan" id="produk" :isDropdown="true" v-model="form.produk"
      placeholder="Pilih Produk yang Anda Inginkan" :options="produkOptions" required />

    <FormField class="mb-2" label="Nomor Rekening *" id="nomorRekening" type="text" v-model="form.nomorRekening"
      placeholder="Masukkan Nomor Rekening" required :readonly="form.belumPunyaRekening"
      @input="handleNomorRekeningInput"
      hint="*Jika Anda belum memiliki Rekening Tabungan, silakan melanjutkan pemilihan Kantor Cabang Pembukaan Bank." />

    <div class="flex items-center mb-6">
      <input type="checkbox" id="belumPunyaRekening" v-model="form.belumPunyaRekening" @change="handleCheckboxChange"
        class="mr-2" />
      <label for="belumPunyaRekening" class="text-sm font-semibold text-neutral-800 cursor-pointer">
        Belum Punya Rekening
      </label>
    </div>

    <FormField v-if="form.belumPunyaRekening" label="Pilih Kantor Cabang *" id="kantorCabang" :isDropdown="true"
      v-model="form.kantorCabang" placeholder="Pilih Kantor Cabang" :options="kantorCabangOptions" required />
    <div v-if="form.kantorCabang" class="mt-4">
      <FormField label="Alamat Kantor Cabang Pembukaan Rekening" id="alamatKantorCabang"
        v-model="form.alamatKantorCabang" :readonly="true" />
    </div>

    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      hint="Pastikan Anda mengisi alamat email yang aktif" required />

    <FormField label="Nomor Handphone *" id="phone" type="text" v-model="form.phone"
      placeholder="Masukkan Nomor Handphone Anda" required @input="form.phone = form.phone.replace(/\D/g, '')"
      hint="Pastikan Anda mengisi nomor handphone yang aktif" />

    <FormField label="Nama Funding Officer (Opsional)" id="namaFundingOfficer" type="text"
      v-model="form.namaFundingOfficer" placeholder="Masukkan nama funding officer" />

    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>

  <ReusableModal :title="'Syarat dan Ketentuan'" :isOpen="isModalOpen" @close="isModalOpen = false"
    @confirm="handleModalConfirm" />
</template>

<script>
import axios from "axios";
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDataNasabahOptions, produkOptions, memilikiRekeningOptions } from "@/data/option.js";

export default {
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    RadioButtonChoose,
    ReusableModal,
  },
  data() {
    return {
      form: new FormModelRequestEmailVerification(),
      sumberDataNasabahOptions,
      produkOptions,
      memilikiRekeningOptions,
      isModalOpen: false,
      isSubmitting: false,
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
    };
  },

  computed: {
    isButtonDisabled() {
      if (!this.form.produk || !this.form.email || !this.form.phone) {
        return true;
      }
      if (!this.form.belumPunyaRekening && !this.form.nomorRekening) {
        return true;
      }
      if (this.form.belumPunyaRekening && !this.form.kantorCabang) {
        return true;
      }
      return false;
    }

  },

  methods: {
    handleNomorRekeningInput() {
      this.form.nomorRekening = this.form.nomorRekening.replace(/\D/g, "").slice(0, 10);

      if (this.form.nomorRekening.length > 0) {
        this.form.belumPunyaRekening = false;
        this.form.kantorCabang = "";
      }
    },
    handleCheckboxChange() {
      if (this.form.belumPunyaRekening) {
        // Jika dicentang, reset Nomor Rekening & Kantor Cabang
        this.form.nomorRekening = "";
        this.form.kantorCabang = "";
        this.form.alamatKantorCabang = ""; // Reset alamat kantor cabang juga
      } else {
        // Jika di-uncheck, reset Kantor Cabang & Alamatnya
        this.form.kantorCabang = "";
        this.form.alamatKantorCabang = "";
      }
    },
    async fetchBranches() {
      try {
        const response = await axios.get("http://10.14.52.233:8001/list-branch");

        if (response.data && response.data.branch) {
          this.kantorCabangOptions = response.data.branch.map(branch => ({
            label: branch.branch_name,
            value: branch.branch_code
          }));

          this.kantorCabangAlamat = response.data.branch.reduce((acc, branch) => {
            acc[branch.branch_code] = branch.branch_address.Valid ? branch.branch_address.String : "Alamat tidak tersedia";
            return acc;
          }, {});
        }
      } catch (error) {
        console.error("Gagal mengambil data kantor cabang:", error);
      }
    },
    // async fetchData() {
    //   try {
    //     const response = await axios.get("https://testapi.io/api/daffa/request-email-verification");
    //     console.log("Response data:", response.data);
    //     const data = Array.isArray(response.data) ? response.data[0] : response.data;
    //     if (data) {
    //       Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },

    async handleSubmit() {
      try {
        let kodeKantorCabang = this.form.kantorCabang;

        if (!kodeKantorCabang && this.form.nomorRekening) {
          kodeKantorCabang = this.form.nomorRekening.slice(0, 3);
        }

        const selectedBranch = this.kantorCabangOptions.find(branch => branch.value === kodeKantorCabang);

        this.requestData = {
          alamat_email: this.form.email,
          no_hp: this.form.phone,
          nama_fo: this.form.namaFundingOfficer,
          kategori_nasabah: Number("1"),
          // sumber_data_nasabah: Number(this.form.sumber),
          // sumber_data_nasabah_lainnya: this.form.sumberLainnya,
          tanggal: new Date().toISOString().split("T")[0],
          produk_yang_diinginkan: Number(this.form.produk),
          nomor_rekening_lama: this.form.nomorRekening,
          kode_kantor_cabang: this.form.kantorCabang,
          kantor_cabang: selectedBranch ? selectedBranch.label : ""
        };
        console.log("Data sementara disimpan:", this.requestData);
        this.isModalOpen = true;
      } catch (error) {
        console.error("Error saat membuka modal:", error);
      }
    },

    async handleModalConfirm() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      try {
        if (!this.requestData) {
          console.error("Error: Data request tidak ditemukan.");
          this.isSubmitting = false;
          return;
        }

        const finalData = {
          ...this.requestData,
          syarat_ketentuan: true,
          dek_pajak_indo: true,
          dek_pajak_amerika: true,
          dek_pajak_amerika_penduduk_us: null,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pembukaan-existing", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setUuid(response.data.uuid);
          fileStore.setEmail(this.requestData.alamat_email);
          console.log("UUID :", response.data.uuid);
          console.log("Email :", this.requestData.alamat_email);

          this.$router.push({ path: "/dashboard/verifikasiEmailPembukaanRekeningExisting" });

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

  watch: {
    'form.memilikiRekening': function (newValue, oldValue) {
      if (newValue === 'YA') {
        this.form.kantorCabang = '';
      } else if (newValue === 'TIDAK') {
        this.form.nomorRekening = '';
      }
    },
    "form.kantorCabang"(newVal) {
      if (!newVal) {
        this.form.alamatKantorCabang = "";
      } else {
        this.form.alamatKantorCabang = this.kantorCabangAlamat[newVal] || "Alamat tidak ditemukan";
      }
    },
  },

  mounted() {
    this.$emit("update-progress", 15);
    this.fetchBranches();
  },

  created() {
    // this.fetchData();
  },
};
</script>


<!-- <RadioButtonChoose label="Apakah Anda memiliki nomor rekening?" id="memilikiRekening"
      :options="memilikiRekeningOptions" v-model="form.memilikiRekening" name="memilikiRekening" required />

    <div v-if="form.memilikiRekening === 'YA'">
      <FormField label="Nomor Rekening *" id="nomorRekening" type="text" v-model="form.nomorRekening"
        placeholder="Masukkan nomor rekening" required
        @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />
    </div>
    <div v-else-if="form.memilikiRekening === 'TIDAK'">
      <FormField label="Pilih Kantor Cabang*" id="kantorCabang" :isDropdown="true" v-model="form.kantorCabang"
        placeholder="Pilih Kantor Cabang" :options="kantorCabangOptions" required />
    </div> -->

<!-- <RadioButtonChoose label="Dari mana Anda mengetahui tentang kami" :options="sumberDataNasabahOptions"
      v-model="form.sumber" name="sumber" required />
    <div v-if="form.sumber === 'lainnya'">
      <FormField label="Lainnya *" id="otherSource" type="text" v-model="form.sumberLainnya" placeholder=" " required />
    </div> -->

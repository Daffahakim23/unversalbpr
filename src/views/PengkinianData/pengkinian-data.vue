<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Nama Lengkap*" id="namaLengkap" type="text" v-model="form.namaLengkap"
      placeholder="Masukkan Lengkap" />

    <FormField label="Email*" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda" required />

    <FormField label="Nomor Rekening*" id="nomorRekening" type="text" v-model="form.nomorRekening"
      placeholder="Masukkan Nomor Rekening" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />

    <FormField label="Pilih Tanda Pengenal*" id="tandaPengenal" :isDropdown="true" v-model="form.tandaPengenal"
      placeholder="Pilih Tanda Pengenal" :options="tandaPengenalOptions" required />

    <RadioButtonChoose label="Dari mana Anda mengetahui tentang kami" :options="sumberDataNasabahOptions"
      v-model="form.sumber" name="sumber" required />
    <div v-if="form.sumber === 'lainnya'">
      <FormField label="Lainnya *" id="otherSource" type="text" v-model="form.sumberLainnya" placeholder=" " required />
    </div>
    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>

  <ReusableModal :title="'Syarat dan Ketentuan'" :isOpen="isModalOpen" @close="isModalOpen = false" />
</template>

<script>
// import axios from "axios";
// import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
// import { useFileStore } from "@/stores/filestore";
import { tandaPengenalOptions, produkOptions, memilikiRekeningOptions, sumberDataNasabahOptions, } from "@/data/option.js";

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
      tandaPengenalOptions,
      isModalOpen: false,
      isSubmitting: false,
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
    };
  },

  computed: {
    isButtonDisabled() {
      if (this.form.sumber === "lainnya" && !this.form.sumberLainnya.trim()) {
        return true;
      }
      if (!this.form.sumber) {
        return true;
      }

      return !(this.form.email && this.form.namaLengkap && this.form.tandaPengenal && this.form.nomorRekening);
    },
  },

  methods: {
    async handleSubmit() {
      try {
        this.$router.push({ path: "/dashboard/uploadDokumenPengkinianData" });
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },

    // async fetchBranches() {
    //   try {
    //     const response = await axios.get("http://10.14.52.233:8001/list-branch");

    //     if (response.data && response.data.branch) {
    //       this.kantorCabangOptions = response.data.branch.map(branch => ({
    //         label: branch.branch_name,
    //         value: branch.branch_code
    //       }));

    //       this.kantorCabangAlamat = response.data.branch.reduce((acc, branch) => {
    //         acc[branch.branch_code] = branch.branch_address.Valid ? branch.branch_address.String : "Alamat tidak tersedia";
    //         return acc;
    //       }, {});
    //     }
    //   } catch (error) {
    //     console.error("Gagal mengambil data kantor cabang:", error);
    //   }
    // },
    async fetchData() {
      try {
        const response = await axios.get("https://testapi.io/api/daffa/request-email-verification");
        console.log("Response data:", response.data);
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        if (data) {
          Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    // async handleSubmit() {
    //   console.log("Router:", this.$router);
    //   this.$router.push({ path: "/dashboard/uploadDokumenPengkinianData" });
    // try {
    //   this.requestData = {
    //     alamat_email: this.form.email,
    //     no_hp: this.form.phone,
    //     nama_fo: this.form.namaFundingOfficer,
    //     kategori_nasabah: Number("1"),
    //     sumber_data_nasabah: Number(this.form.sumber),
    //     sumber_data_nasabah_lainnya: this.form.sumberLainnya,
    //     tanggal: new Date().toISOString().split("T")[0],
    //     kode_kantor_cabang: this.form.kantorCabang
    //   };
    //   console.log("Data sementara disimpan:", this.requestData);
    //   this.isModalOpen = true;
    // } catch (error) {
    //   console.error("Error saat membuka modal:", error);
    // }
    // },

    // async handleModalConfirm() {
    // if (this.isSubmitting) return;
    // this.isSubmitting = true;

    // try {
    //   if (!this.requestData) {
    //     console.error("Error: Data request tidak ditemukan.");
    //     this.isSubmitting = false;
    //     return;
    //   }

    //   const finalData = {
    //     ...this.requestData,
    //     syarat_ketentuan: true,
    //     dek_pajak_indo: true,
    //     dek_pajak_amerika: true,
    //     dek_pajak_amerika_penduduk_us: null,
    //   };

    //   console.log("Mengirim data:", finalData);

    //   const response = await api.post("/pembukaan-deposito-existing", finalData, {
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   console.log("Response code:", response.status);
    //   console.log("Response data:", response.data);

    //   if (response.status === 200) {
    //     const fileStore = useFileStore();
    //     fileStore.setUuid(response.data.uuid);
    //     fileStore.setEmail(this.requestData.alamat_email);
    //     console.log("UUID :", response.data.uuid);
    //     console.log("Email :", this.requestData.alamat_email);

    //     this.$router.push({ path: "/dashboard/verifikasiEmailPenempatanDepositoExisting" });

    //   } else {
    //     console.error("Gagal mengirim data, status:", response.status);
    //   }

    // } catch (error) {
    //   if (error.response) {
    //     console.error("Error response data:", error.response.data);
    //   }
    //   console.error("Error saat mengirim data:", error);
    // } finally {
    //   this.isSubmitting = false;
    // }
    //   }
    // },

    // watch: {
    //   'form.memilikiRekening': function (newValue, oldValue) {
    //     if (newValue === 'YA') {
    //       this.form.kantorCabang = '';
    //     } else if (newValue === 'TIDAK') {
    //       this.form.nomorRekening = '';
    //     }
    //   }
  },

  mounted() {
    this.$emit("update-progress", 15);
    // this.fetchBranches();
  },

  created() {
    // this.fetchData();
  },
};
</script>

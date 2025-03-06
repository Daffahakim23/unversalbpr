<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Pilih Produk yang Diinginkan" id="produk" :isDropdown="true" v-model="form.produk"
      placeholder="Pilih Produk yang Anda Inginkan" :options="produkOptions" required />
    <FormField label="Pilih Produk Deposito" id="produk" :isDropdown="true" v-model="form.produkDeposito"
      placeholder="Pilih Produk Deposito yang Anda Inginkan" :options="produkDepositoOptions" required />
    <FlagBox type="info" closable class="mb-4">
      <p class="text-sm font-normal">Informasi mengenai Produk dan Layanan dapat diakses melalui website
        universalbpr.co.id atau dengan mengklik tombol "Info Produk" di bagian atas halaman ini.</p>
    </FlagBox>
    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      hint="Pastikan Anda Mengisi Alamat Email yang Aktif" required />
    <FormField label="Nomor Handphone *" id="phone" type="text" v-model="form.phone"
      placeholder="Masukkan Nomor Handphone Anda" hint="Pastikan Anda mengisi Nomor Handphone yang Aktif" required
      @input="form.phone = form.phone.replace(/\D/g, '')" />
    <FormField label="Nama Funding Officer (Opsional)" id="namaFundingOfficer" type="text"
      v-model="form.namaFundingOfficer" placeholder="Masukkan Nama Funding Officer"
      hint="Funding Officer Adalah petugas bank yang membantu pengelolaan simpanan Anda. Masukkan namanya jika ada, atau kosongkan jika tidak tahu atau belum pernah dilayani." />
    <RadioButtonChoose label="Dari mana Anda Mengetahui Tentang Kami" :options="sumberDataNasabahOptions"
      v-model="form.sumber" name="sumber" />
    <div v-if="form.sumber === 'lainnya'">
      <FormField label="Lainnya *" id="otherSource" type="text" v-model="form.sumberLainnya" placeholder=" " required />
    </div>
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
import api from "@/API/api";
import axios from "axios";
import FormField from "@/components/FormField.vue";
import FlagBox from "@/components/flagbox.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDataNasabahOptions, produkDepositoOptions, produkOptions } from "@/data/option.js";

export default {
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    RadioButtonChoose,
    ReusableModal,
    FlagBox,
  },
  data() {
    return {
      form: new FormModelRequestEmailVerification(),
      sumberDataNasabahOptions,
      produkDepositoOptions,
      produkOptions,
      selectedProduk: "",
      isModalOpen: false,
      isSubmitting: false,
    };
  },

  computed: {
    isButtonDisabled() {
      const emailValid = this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      // console.log("isButtonDisabled:", !(this.form.email && this.form.phone && this.form.sumber));
      if (this.form.sumber === "lainnya") {
        return !this.form.sumberLainnya.trim();
      }
      return !(emailValid && this.form.phone && this.form.sumber);
    },
  },

  methods: {
    //   async fetchData() {
    //     try {
    //       const response = await axios.get("https://testapi.io/api/daffa/request-email-verification");
    //       console.log("Response data:", response.data);
    //       const data = Array.isArray(response.data) ? response.data[0] : response.data;
    //       if (data) {
    //         Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
    //       }
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   },

    async handleSubmit() {
      try {
        this.requestData = {
          alamat_email: this.form.email,
          no_hp: this.form.phone,
          nama_fo: this.form.namaFundingOfficer,
          kategori_nasabah: Number("1"),
          sumber_data_nasabah: Number(this.form.sumber),
          sumber_data_nasabah_lainnya: this.form.sumberLainnya,
          tanggal: new Date().toISOString().split("T")[0],
          produk_yang_diinginkan: Number(this.form.produk),
        };
        console.log("Data sementara disimpan:", this.requestData);
        this.isModalOpen = true;
      } catch (error) {
        console.error("Error saat membuka modal:", error);
      }
    },

    async handleModalConfirm() {
      if (this.isSubmitting) return; // Cegah jika sudah dalam proses submit
      this.isSubmitting = true; // Set agar tidak bisa submit lagi sementara

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
          dek_pajak_amerika: false,
          dek_pajak_amerika_penduduk_us: null,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pembukaan-deposito", finalData, {
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

          this.$router.push({ path: "/dashboard/verifikasiEmailPenempatanDepositoNTB" });

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
    this.$emit("update-progress", 15);
    // this.fetchData();
  },
};
</script>
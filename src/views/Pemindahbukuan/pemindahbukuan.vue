<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Tanggal Pengajuan Pemindahbukuan*" id="tanggalPengajuan" type="date"
      v-model="form.tanggalPengajuan" placeholder="Pilih Tanggal Lahir Beneficial Owner Anda" />

    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Email tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      required :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode"
      :hint="phoneError ? 'Nomor handphone tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi nomor handphone yang aktif'"
      :error="phoneError" @blur="handlePhoneBlur" />

    <FormField label="Sumber Dana" id="sumberDana" :isDropdown="true" v-model="form.sumberDana"
      :options="sumberDanaOptions" placeholder="Pilih Sumber Dana Anda" />

    <div v-if="form.sumberDana === 'lainnya'" class="">
      <FormField label="Sumber Dana Lainnya *" id="sumberDanaLainnya" type="text" v-model="form.sumberDanaLainnya"
        placeholder="Masukkan Sumber Penghasilan Lainnya" />
    </div>

    <FormField label="Nomor Rekening*" id="nomorRekening" type="text" v-model="form.nomorRekening"
      placeholder="Masukkan Nomor Rekening Anda" required
      @input="form.nomorRekening = form.nomorRekening.replace(/\D/g, '')" />

    <FormField label="Nama Pemilik Sumber Dana*" id="namaLengkap" type="text" v-model="form.namaLengkap"
      placeholder="Masukkan Nama Pemilik Sumber Dana" />

    <ReusableModal title='Syarat dan Ketentuan Deposito' :isOpen="isModalOpen" :apiUrl="apiUrl"
      @close="isModalOpen = false" @confirm="handleModalConfirm" />

    <div class="text-right">
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
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDanaOptions } from "@/data/option.js";

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
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_SAVING",
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      sumberDanaOptions,
      isSubmitting: false,
      emailError: false,
      phoneError: false,
      selectedCountryCode: "ID",
      isModalOpen: false,
    };
  },

  computed: {
    isButtonDisabled() {
      const emailValid = this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      const phoneValid = this.form.phone && /^(08(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,9}$/.test(this.form.phone);
      const sumberDanaValid = this.form.sumberDana;
      const sumberDanaLainnyaValid = this.form.sumberDana === 'lainnya' ? !!this.form.sumberDanaLainnya : true;
      const nomorRekeningValid = !!this.form.nomorRekening;
      const namaPemilikSumberDanaValid = !!this.form.namaLengkap;
      const tanggalPengajuanValid = !!this.form.tanggalPengajuan;

      return !(
        emailValid &&
        phoneValid &&
        sumberDanaValid &&
        sumberDanaLainnyaValid &&
        nomorRekeningValid &&
        namaPemilikSumberDanaValid &&
        tanggalPengajuanValid
      );
    },
  },

  methods: {
    // validatePhone(phone) {
    //   return /^(08(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,9}$/.test(phone);
    // },
    validatePhone(phone) {
      return /^(08|8)\d{6,12}$/.test(phone);
    },
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    handleEmailBlur() {
      this.touched.email = true;
      if (this.form.email) {
        this.emailError = !this.validateEmail(this.form.email);
      }
    },
    handlePhoneBlur() {
      this.touched.phone = true;
      if (this.form.phone) {
        this.phoneError = !this.validatePhone(this.form.phone);
      }
    },

    async handleSubmit() {
      if (this.emailError) {
        console.error("Email tidak valid.");
        return;
      }

      if (this.phoneError) {
        console.error("Nomor telepon tidak valid.");
        return;
      }
      try {
        this.requestData = {
          alamat_email: this.form.email,
          no_hp: this.form.phone,
          sumber_dana: Number(this.form.sumberDana),
          nomor_rekening: this.form.nomorRekening,
          nama_lengkap: this.form.namaLengkap,
          tanggal: this.form.tanggalPengajuan
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
          dek_cutoff: true,
        };

        console.log("Mengirim data:", finalData);

        // const fileStore = useFileStore();
        // fileStore.setFormDataPemindahbukuan(this.form);
        // // fileStore.setUuid(response.data.uuid);
        // fileStore.setEmail(this.requestData.email);
        // fileStore.setNoHP(this.requestData.no_hp);
        // // console.log("UUID :", response.data.uuid);
        // console.log("Email :", this.requestData.email);
        // console.log("Phone :", this.requestData.phone);
        // window.scrollTo(0, 0);
        // // this.$router.push({ path: "/dashboard/verifikasiEmailPemindahbukuan" });
        // this.$router.push({ path: "/dashboard/dataPengirimPemindahbukuan" });

        const response = await api.post("/pemindah-bukuan", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormDataPemindahbukuan(this.form);
          fileStore.setUuid(response.data.uuid);
          fileStore.setEmail(this.requestData.email);
          fileStore.setNoHP(this.requestData.phone);
          console.log("UUID :", response.data.uuid);
          console.log("Email :", this.requestData.email);
          console.log("Phone :", this.requestData.phone);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/verifikasiEmailPemindahbukuan" });
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

      // } catch (error) {
      //   console.error("Error saat menyimpan data:", error);
      // } finally {
      //   this.isSubmitting = false;
      // }
    }
  },

  mounted() {
    this.$emit("update-progress", 15);
  },

  created() {
    // this.fetchData();
  },
};
</script>

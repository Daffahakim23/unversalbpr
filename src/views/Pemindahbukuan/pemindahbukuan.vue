<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Tanggal Pengajuan Transafer*" id="tanggalPengajuan" type="date" v-model="form.tanggalPengajuan"
      placeholder="Pilih Tanggal Lahir Beneficial Owner Anda" />

    <FormField label="Email*" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Email tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phonePengirim" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid, silahkan periksa kembali ( Contoh : 821xxxxxx )'
        : form.phonePengirim?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Pastikan Anda mengisi nomor handphone yang aktif ( Contoh : 821xxxxxx )'" :error="phoneError"
      @blur="handlePhoneBlur" />

    <FormField label="Sumber Dana" id="sumberDana" :isDropdown="true" v-model="form.sumberDana"
      :options="sumberDanaOptions" placeholder="Pilih Sumber Dana Anda" />

    <div v-if="form.sumberDana === 'lainnya'" class="">
      <FormField label="Sumber Dana Lainnya *" id="sumberDanaLainnya" type="text" v-model="form.sumberDanaLainnya"
        placeholder="Masukkan Sumber Penghasilan Lainnya" />
    </div>

    <FormField label="Nomor Rekening Tabungan Universal*" id="nomorRekening" variant="numeric" :maxlength="10"
      v-model="form.nomorRekeningPengirim" placeholder="Masukkan Nomor Rekening Anda" required
      @input="form.nomorRekeningPengirim = form.nomorRekeningPengirim.replace(/\D/g, '')" />

    <FormField label="Nama Pemilik Sumber Dana*" id="namaLengkap" variant="alpha" v-model="form.namaLengkapPengirim"
      placeholder="Masukkan Nama Pemilik Sumber Dana" />

    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>

  <ReusableModal title='Syarat dan Ketentuan Deposito' :isOpen="isModalOpen" :apiUrl="apiUrl"
    @close="isModalOpen = false" @confirm="handleModalConfirm" />

  <ModalError :isOpen="isModalErrorEmail" :features="modalContentEmail" icon="otp-error-illus.svg"
    @close="isModalErrorEmail = false" @buttonClick1="handleCloseModal" @buttonClick2="openWhatsApp" />
</template>

<script>
import axios from "axios";
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelPengirimPemindahbukuan } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDanaOptions } from "@/data/option.js";
import ModalError from "@/components/ModalError.vue";

export default {
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    RadioButtonChoose,
    ReusableModal,
    ModalError,
  },
  data() {
    return {
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_SAVING",
      form: new FormModelPengirimPemindahbukuan(),
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
      isModalErrorEmail: false,
      modalContentEmail: [
        {
          label: "",
          icon: "",
          description: "",
          buttonString1: "",
          buttonString2: "",
        },
      ],
      whatsappContact: {
        label: "WhatsApp",
        number: "(+62) 21 2221 3993",
        icon: "whatsapp-icon.svg",
        whatsapp: "+622122213993",
      },
    };
  },

  computed: {
    isButtonDisabled() {
      const emailValid = this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      const phoneValid = this.form.phonePengirim && /^(8)\d{6,12}$/.test(this.form.phonePengirim);
      const sumberDanaValid = this.form.sumberDana;
      const sumberDanaLainnyaValid = this.form.sumberDana === 'lainnya' ? !!this.form.sumberDanaLainnya : true;
      const nomorRekeningValid = !!this.form.nomorRekeningPengirim;
      const namaPemilikSumberDanaValid = !!this.form.namaLengkapPengirim;
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
    getWhatsAppLink(number) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        return `https://wa.me/${number}`;
      } else {
        return `https://web.whatsapp.com/send?phone=${number}`;
      }
    },
    openWhatsApp() {
      if (this.whatsappContact.whatsapp) {
        window.open(this.getWhatsAppLink(this.whatsappContact.whatsapp), '_blank');
      }
    },
    showErrorModal(title, message, btnString1 = "OK", btnString2 = "Batal", icon = "otp-error-illus.svg") {
      this.modalContentEmail = [
        {
          label: title,
          description: message,
          icon: new URL(`/src/assets/${icon}`, import.meta.url).href,
          buttonString1: btnString1,
          buttonString2: btnString2,
        },
      ];
      this.isModalOpen = false;
      this.isModalErrorEmail = true;
    },
    handleCloseModal() {
      this.isModalErrorEmail = false;
    },
    validatePhone(phone) {
      return /^(8)\d{6,12}$/.test(phone) && !phone.startsWith('0');
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
      if (this.form.phonePengirim) {
        this.phoneError = !this.validatePhone(this.form.phonePengirim);
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
          no_hp: this.form.phonePengirim,
          sumber_dana: Number(this.form.sumberDana),
          nomor_rekening: this.form.nomorRekeningPengirim,
          nama_lengkap: this.form.namaLengkapPengirim,
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
          syarat_cutoff: true,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pemindah-bukuan", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormDataPengirimPemindahbukuan(this.form);
          // fileStore.setUuid(response.data.uuid);
          fileStore.setEmail(this.requestData.alamat_email);
          fileStore.setNoHP(this.requestData.no_hp);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/verifikasiEmailPemindahbukuan" });
        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }

      } catch (error) {
        let subtitle = "";
        let modalTitle = "Terjadi Kesalahan";
        let modalIcon = "otp-error-illus.svg";
        let button1 = "Tutup";
        let button2 = "Hubungi Universal Care";

        if (error.response && error.response.data && error.response.data.message) {
          this.temporaryBanMessage = error.response.data.message;
          subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 menit kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
          modalTitle = "Alamat Email Dibatasi Sementara";
          modalIcon = "data-failed-illus.svg";
        } else {
          subtitle = "Terjadi kesalahan saat melanjutkan proses verifikasi. Pastikan koneksi internet Anda stabil untuk melanjutkan proses.";
        }
        if (error.response.data.message.replace(/ .*/,'') == "liveness") {
          subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
          modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
        } else if (error.response.data.message.replace(/ .*/,'') == "fraud") {
          subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
          modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
        }
        this.isModalError = false;
        this.showErrorModal(modalTitle, subtitle, button1, button2, modalIcon);
      } finally {
        this.isSubmitting = false;
      }
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

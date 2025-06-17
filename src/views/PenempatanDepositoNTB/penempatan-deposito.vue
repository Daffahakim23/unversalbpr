<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Pilih Produk yang Diinginkan*" id="produk" :isDropdown="true" v-model="form.produk"
      placeholder="Pilih Produk yang Anda Inginkan" :options="produkTabunganOptions" required />

    <FormField label="Pilih Produk Deposito*" id="produkDeposito" :isDropdown="true" v-model="form.produkDeposito"
      placeholder="Pilih Produk Deposito yang Anda Inginkan" :options="produkDepositoOptions" required />

    <FlagBox type="info" closable class="mb-4">
      <p class="text-sm font-normal">Informasi mengenai Produk dan Layanan dapat diakses melalui website
        universalbpr.co.id atau dengan mengklik tombol "Info Produk" di bagian atas halaman ini.</p>
    </FlagBox>

    <FormField label="Email*" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Alamat Email tidak valid. Silakan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      required :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone" variant="phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode" :hint="phoneError
        ? 'Nomor handphone tidak valid.Silakan periksa kembali.'
        : form.phone?.startsWith('0')
          ? 'Nomor handphone tidak valid, tidak boleh diawali dengan angka 0'
          : 'Nomor handphone tidak valid.Silakan periksa kembali.'" :error="phoneError" @blur="handlePhoneBlur" />

    <FormField label="Nama Funding Officer (Opsional)" id="namaFundingOfficer" type="text" variant="alpha"
      v-model="form.namaFundingOfficer" placeholder="Masukkan Nama Funding Officer"
      hint="Funding Officer Adalah petugas bank yang membantu pengelolaan simpanan Anda. Masukkan namanya jika ada, atau kosongkan jika tidak tahu atau belum pernah dilayani." />

    <RadioButtonChoose label="Dari mana Anda pertama kali mengetahui BPR Universal?*"
      :options="sumberDataNasabahOptions" v-model="form.sumber" name="sumber" />
    <div v-if="form.sumber === '0'">
      <FormField label="Lainnya *" id="otherSource" type="text" v-model="form.sumberLainnya" placeholder="Masukkan Sumber Informasi Lainnya" required />
    </div>

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
import api from "@/API/api";
import FormField from "@/components/FormField.vue";
import FlagBox from "@/components/flagbox.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDataNasabahOptions, produkDepositoOptions, produkTabunganOptions } from "@/data/option.js";
import ModalError from "@/components/ModalError.vue";

export default {
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    RadioButtonChoose,
    ReusableModal,
    FlagBox,
    ModalError,
  },
  data() {
    return {
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_DEPOSIT",
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      sumberDataNasabahOptions,
      produkDepositoOptions,
      produkTabunganOptions,
      selectedProduk: "",
      selectedCountryCode: "ID",
      isModalOpen: false,
      isSubmitting: false,
      emailError: false,
      phoneError: false,
      isModalErrorEmail: false,
      isWhatsAppOpenCoolingDown: false,
      temporaryBanMessage: "",
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
      const phoneValid = this.form.phone && /^(8)\d{6,12}$/.test(this.form.phone);
      const produkTabunganTerisi = !!this.form.produk;
      const produkDepositoTerisi = !!this.form.produkDeposito;
      const sumberTerisi = !!this.form.sumber;

      if (this.form.sumber === "0") {
        return !(emailValid && phoneValid && produkTabunganTerisi && produkDepositoTerisi && sumberTerisi && this.form.sumberLainnya?.trim());
      }
      return !(emailValid && phoneValid && produkTabunganTerisi && produkDepositoTerisi && sumberTerisi);
    },
  },

  methods: {
    getWhatsAppLink(number = 622122213993) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        return `https://wa.me/${number}`;
      } else {
        return `https://web.whatsapp.com/send?phone=${number}`;
      }
    },
    // openWhatsApp() {
    //   if (this.whatsappContact.whatsapp) {
    //     window.open(this.getWhatsAppLink(this.whatsappContact.whatsapp), '_blank');
    //   }
    // },
    openWhatsApp() {
      if (this.whatsappContact && this.whatsappContact.whatsapp && !this.isWhatsAppOpenCoolingDown) {
        console.log("openWhatsApp dipanggil!");
        window.open(this.getWhatsAppLink(this.whatsappContact.whatsapp), '_blank');

        this.isWhatsAppOpenCoolingDown = true;

        setTimeout(() => {
          this.isWhatsAppOpenCoolingDown = false;
          console.log("Cooldown WhatsApp selesai. Bisa dipanggil lagi.");
        }, 2000);

      } else if (this.isWhatsAppOpenCoolingDown) {
        console.log("WhatsApp sedang dalam masa cooldown. Coba lagi nanti.");
      } else {
        console.log("Kontak WhatsApp tidak tersedia.");
      }
    },
    showErrorModal(title, message, btnString1 = "OK", btnString2 = "Batal", icon = "data-failed-illus.svg") {
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
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    handleEmailBlur() {
      this.touched.email = true;
      if (this.form.email) {
        this.emailError = !this.validateEmail(this.form.email);
      }
    },
    // validatePhone(phone) {
    //   return /^((08|8)(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,12}$/.test(phone);
    // },
    validatePhone(phone) {
      return /^(8)\d{6,12}$/.test(phone) && !phone.startsWith('0');
    },
    handlePhoneBlur() {
      this.touched.phone = true;
      if (this.form.phone) {
        this.phoneError = !this.validatePhone(this.form.phone);
      }
    },

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
          fileStore.setFormEmailRequestDepositoNTB(this.form);
          fileStore.setUuid(response.data.uuid);
          fileStore.setNoHP(this.requestData.no_hp);
          fileStore.setEmail(this.requestData.alamat_email);
          console.log("UUID :", response.data.uuid);
          console.log("Email :", this.requestData.alamat_email);
          console.log("Nomor Handphone :", this.requestData.no_hp);

          this.$router.push({ path: "/dashboard/verifikasiEmailPenempatanDepositoNTB" });

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
        if (error.response.data.message.replace(/ .*/, '') == "liveness") {
          subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
          modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
        } else if (error.response.data.message.replace(/ .*/, '') == "fraud") {
          subtitle = `Sehingga selama 24 jam kedepan tidak dapat melakukan pengisian e-form kembali`;
          modalTitle = "Verifikasi Data Gagal sudah mencapai limit";
        }
        this.isModalError = false;
        this.showErrorModal(modalTitle, subtitle, button1, button2, modalIcon);
      } finally {
        this.isSubmitting = false;
      }
    },
  },

  mounted() {
    this.$emit("update-progress", 15);
  },
};
</script>
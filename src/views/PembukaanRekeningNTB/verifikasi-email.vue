<template #center-title>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col items-center">
      <img src="@/assets/emailVerif.svg" alt="Email Verification" class="h-24 md:h-32 lg:h-36 mb-4" />

      <div class="flex justify-center gap-2 m-4">
        <input v-for="(digit, index) in otp" :key="index" v-model="otp[index]"
          class="w-12 h-14 text-center border rounded-md text-lg font-medium focus:ring-1 focus:ring-primary border-neutral-300 otp-input"
          :class="{ 'border-semantic/error-400': isOtpError }" type="text" maxlength="1" pattern="[0-9]"
          inputmode="numeric" @keypress="onlyNumberInput" @input="handleInput(index, $event)"
          @keydown.backspace="handleBackspace(index, $event)" />
      </div>

      <p v-if="errorMessage" class="text-semantic/error-400 text-center mb-4">{{ errorMessage }}</p>
      <p class="text-base text-neutral-700 text-center">
        Masukkan kode OTP yang sudah kami kirimkan melalui email <strong>{{ email }}</strong>.
      </p>

      <!-- <p v-if="resendCount >= 3" class="text-semantic/error-400">
        Hubungi Universal Care untuk bantuan.
      </p>
      <p v-else class="text-primary mt-4 cursor-pointer" @click="resendOTP"
        :class="{ 'opacity-50 pointer-events-none': isResending || countdown > 0 }">
        {{ isResending ? "Mengirim..." : countdown > 0 ? `Belum dapat kode? kirim ulang OTP (${countdown}s)` : `Belum
        dapat kode? kirim ulang OTP (${3 -
          resendCount})` }}
      </p> -->

      <!-- <p v-if="resendCount >= 3" class="text-semantic/error-400 mt-3">
        Hubungi Universal Care untuk bantuan.
      </p>
      <p v-else class="text-primary mt-4 cursor-pointer" @click="resendOTP"
        :class="{ 'opacity-50 pointer-events-none': isResending || countdown > 0 }">
        {{ isResending ? "Mengirim..." : `Belum dapat kode? Kirim Ulang Kode (${resendCount}/3)` }}
      </p> -->

      <p class="text-primary mt-4 cursor-pointer" @click="resendOTP"
        :class="{ 'opacity-50 pointer-events-none': isResending || countdown > 0 }">
        {{ isResending ? "Mengirim..." : `Belum dapat kode? Kirim Ulang Kode (${resendCount}/3)` }}
      </p>

      <!-- <ButtonComponent
        @click="showErrorModal('Test Modal Title', 'This is a test message for Universal Care.', ['Tutup', 'Hubungi Universal Care'])"
        class="mt-6">
        Test Modal
      </ButtonComponent> -->

      <ButtonComponent type="submit" class="mt-6" :disabled="isButtonDisabled">
        Verifikasi
      </ButtonComponent>
      <ModalError :isOpen="isModalError" :features="modalContent" icon="otp-error-illus.svg"
        @close="isModalError = false" @buttonClick1="handleButtonClick1(modalContent[0])"
        @buttonClick2="handleButtonClick2(modalContent[0])" />
    </div>
  </form>
</template>

<script>
import api from "@/API/api";
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import ModalError from "@/components/ModalError.vue";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      otpErrorCount: 0,
    };
  },
  emits: ["update-progress"],
  components: {
    ButtonComponent,
    ModalError,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const fileStore = useFileStore();
    const otp = ref(["", "", "", ""]);
    const errorMessage = ref("");
    const resendCount = ref(0);
    const isResending = ref(false);
    const countdown = ref(60);
    const isModalError = ref(false);
    const documentType = computed(() => route.query.documentType);
    let countdownInterval = null;
    const modalContent = ref([
      {
        label: "",
        description: "",
        icon: "",
        buttonString1: "",
        buttonString2: "",
      },
    ]);

    const email = computed(() => fileStore.alamat_email || "user@example.com");
    const isButtonDisabled = computed(() => otp.value.some(digit => digit === ""));
    const otpErrorCount = ref(0);
    const temporaryBanMessage = ref("");
    const otpInputs = ref([]);
    const isOtpError = ref(false);

    watch(otp, (newVal) => {
      if (newVal.every(digit => digit === "")) {
        isOtpError.value = false;
        errorMessage.value = "";
      }
    });

    const whatsappContact = ref({
      whatsapp: '+622122213993',
    });

    const getWhatsAppLink = (number = 622122213993) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        return `https://wa.me/${number}`;
      } else {
        return `https://web.whatsapp.com/send?phone=${number}`;
      }
    };

    // const openWhatsApp = () => {
    //   if (whatsappContact.value.whatsapp) {
    //     window.open(getWhatsAppLink(whatsappContact.value.whatsapp), '_blank');
    //   }
    // };

    let isWhatsAppOpenCoolingDown = false;

    const openWhatsApp = () => {
      if (whatsappContact.value.whatsapp && !isWhatsAppOpenCoolingDown) {
        console.log("openWhatsApp dipanggil!");
        window.open(getWhatsAppLink(whatsappContact.value.whatsapp), '_blank');

        isWhatsAppOpenCoolingDown = true;

        setTimeout(() => {
          isWhatsAppOpenCoolingDown = false;
          console.log("Cooldown WhatsApp selesai. Bisa dipanggil lagi.");
        }, 2000);

      } else if (isWhatsAppOpenCoolingDown) {
        console.log("WhatsApp sedang dalam masa cooldown. Coba lagi nanti.");
      } else {
        console.log("Kontak WhatsApp tidak tersedia.");
      }
    };

    const onlyNumberInput = (event) => {
      const char = String.fromCharCode(event.which);
      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    };

    const handleInput = (index, event) => {
      const val = event.target.value.replace(/\D/g, '');
      otp.value[index] = val;
      if (val !== '') {
        focusNext(index, event);
      }
    };

    // const showErrorModal = (title, message, buttons = []) => {
    //   modalContent.value = [
    //     {
    //       label: title,
    //       description: message,
    //       icon: new URL(`/src/assets/otp-error-illus.svg`, import.meta.url).href,
    //       buttonString1: buttons[0] || "Tutup",
    //       buttonString2: buttons[1],
    //     },
    //   ];
    //   isModalError.value = true;
    // };

    const showErrorModal = (title, message, buttons = []) => {
      const buttonArray = Array.isArray(buttons) ? buttons : [buttons].filter(Boolean);

      modalContent.value = [
        {
          label: title,
          description: message,
          icon: new URL(`/src/assets/otp-error-illus.svg`, import.meta.url).href,
          buttonString1: buttonArray[0] || "Tutup",
          buttonString2: buttonArray.length > 1 ? buttonArray[1] : null,
        },
      ];
      isModalError.value = true;
    };

    const handleButtonClick1 = (feature) => {
      isModalError.value = false;
      if (feature.buttonString1 === "Hubungi Universal Care") {
        event.stopPropagation();
        openWhatsApp();
        router.push({ path: "/" });
        // window.location.reload();
        otp.value = ["", "", "", ""];
      } else if (feature.buttonString1 === "Coba Lagi") {
        errorMessage.value = "";
        isOtpError.value = false;
        otp.value = ["", "", "", ""];
        otpInputs.value[0]?.focus();
      } else if (feature.buttonString1 === "Beranda") {
        router.push({ path: "/" });
      }
    };

    const handleButtonClick2 = (feature) => {
      isModalError.value = false;
      if (feature.buttonString2 === "Hubungi Universal Care") {
        event.stopPropagation();
        openWhatsApp();
        otp.value = ["", "", "", ""];
      } else if (feature.buttonString2 === "Batal" || feature.buttonString2 === "Tutup") {
        errorMessage.value = "";
        isOtpError.value = false;
        otp.value = ["", "", "", ""];
      }
    };

    const focusNext = (index, event) => {
      if (event.target.value && index < otp.value.length - 1) {
        event.target.nextElementSibling?.focus();
      } else if (!event.target.value && event.inputType === 'deleteContentBackward' && index > 0) {
        event.target.previousElementSibling?.focus();
      }
    };

    const handleBackspace = (index, event) => {
      if (otp.value[index] === "" && index > 0) {
        otp.value[index - 1] = "";
        event.target.previousElementSibling?.focus();
      }
    };

    const focusPrevious = (index) => {
      if (index > 0) {
        otpInputs.value[index - 1]?.focus();
      }
    };

    const handleCloseModal = () => {
      isModalError.value = false;
    };

    const handleSubmit = async () => {
      const kodeOtp = otp.value.join("");
      errorMessage.value = "";
      isOtpError.value = false;
      if (kodeOtp.length !== 4) {
        errorMessage.value = "OTP harus terdiri dari 4 digit.";
        isOtpError.value = true;
        return;
      }

      if (!fileStore.uuid) {
        showErrorModal("Terjadi Kesalahan", "Mohon untuk mengulangi proses verifikasi dari awal", ["Hubungi Universal Care", "Beranda"]);
        errorMessage.value = "Hubungi Universal Care Untuk Bantuan";
        isOtpError.value = true;
        throw new Error("documentType atau UUID tidak valid.");
      }

      try {
        const requestData = {
          verified: true,
          kode_otp: kodeOtp,
          uuid: fileStore.uuid,
          email: fileStore.alamat_email,
        };

        console.log("Mengirim data:", requestData);

        const response = await api.post("/verification-email", requestData, {
          headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200 || response.status === 201) {
          console.log("OTP berhasil diverifikasi");
          router.push({ path: "/dashboard/uploadDokumenPembukaanRekeningNTB" });
        } else {
          otpErrorCount.value++;
          isOtpError.value = true;
          errorMessage.value = response.data.message || "Verifikasi OTP gagal. Silakan coba lagi.";

          if (otpErrorCount.value >= 3) {
            let title = "Kode OTP Salah";
            let subtitle = "Kode OTP yang Anda Kirimkan Salah";
            let buttons = ["Coba Lagi", "Hubungi Universal Care"];

            if (otpErrorCount.value === 3) {
              subtitle = "Anda telah salah memasukkan kode OTP sebanyak 3 kali. Jika terjadi 5 kali kesalahan, pengiriman OTP ke email Anda akan dibatasi selama 30 menit. Periksa kembali kode Anda atau hubungi Universal Care untuk bantuan lebih lanjut.";
              buttons = ["Coba Lagi", "Hubungi Universal Care"];
            } else if (otpErrorCount.value === 4) {
              subtitle = "Anda telah salah memasukkan kode OTP sebanyak 4 kali. Jika terjadi 5 kali kesalahan, pengiriman OTP ke email Anda akan dibatasi selama 30 menit. Periksa kembali kode Anda atau hubungi Universal Care untuk bantuan.";
              buttons = ["Coba Lagi", "Hubungi Universal Care"];
            } else if (otpErrorCount.value >= 5) {
              title = "Alamat Email Dibatasi Sementara";
              let banMessage = "";
              if (error.response?.data?.message) {
                banMessage = error.response.data.message;
                subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 menit kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
              } else {
                subtitle = "Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP. Hubungi Universal Care untuk bantuan lebih lanjut.";
              }
              buttons = ["Hubungi Universal Care"];
            } else if (error.response && error.response.data && error.response.data.message) {
              subtitle = error.response.data.message;
            }

            showErrorModal(title, subtitle, buttons);
          }
        }
      } catch (error) {
        otpErrorCount.value++;
        isOtpError.value = true;
        errorMessage.value = error.response?.data?.message || "Proses Verifikasi OTP gagal. Silakan coba lagi.";

        if (otpErrorCount.value >= 3) {
          let title = "Kode OTP Salah";
          let subtitle = "Kode OTP yang Anda Kirimkan Salah";
          let buttons = ["Coba Lagi", "Hubungi Universal Care"];

          if (otpErrorCount.value === 3) {
              subtitle = "Anda telah salah memasukkan kode OTP sebanyak 3 kali. Jika terjadi 5 kali kesalahan, pengiriman OTP ke email Anda akan dibatasi selama 30 menit. Periksa kembali kode Anda atau hubungi Universal Care untuk bantuan lebih lanjut.";
              buttons = ["Coba Lagi", "Hubungi Universal Care"];
          } else if (otpErrorCount.value === 4) {
            subtitle = "Anda telah salah memasukkan kode OTP sebanyak 4 kali. Jika terjadi 5 kali kesalahan, pengiriman OTP ke email Anda akan dibatasi selama 30 menit. Periksa kembali kode Anda atau hubungi Universal Care untuk bantuan.";
            buttons = ["Coba Lagi", "Hubungi Universal Care"];
          } else if (otpErrorCount.value >= 5) {
            title = "Alamat Email Dibatasi Sementara";
            let banMessage = "";
            if (error.response?.data?.message) {
              banMessage = error.response.data.message;
              subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai 30 menit kedepan. Hubungi Universal Care untuk bantuan lebih lanjut.`;
            } else {
              subtitle = "Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP. Hubungi Universal Care untuk bantuan lebih lanjut.";
            }
            buttons = ["Hubungi Universal Care"];
          } else if (error.response && error.response.data && error.response.data.message) {
            subtitle = error.response.data.message;
          }

          showErrorModal(title, subtitle, buttons);
        }
      }
    };

    const startCountdown = () => {
      countdown.value = 5;
      countdownInterval = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value -= 1;
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
    };

    const resendOTP = async () => {
      if (resendCount.value >= 3) {
        showErrorModal(
          "Kuota Kirim Ulang Habis",
          "Anda telah menggunakan semua kesempatan request OTP. Silakan coba lagi setelah (10:00) menit.",
          ["Hubungi Universal Care", "Tutup"],
        );
        errorMessage.value = "Hubungi Universal Care Untuk Bantuan";
        return;
      }

      if (countdown.value > 0) {
        return;
      }
      isResending.value = true;
      try {
        const response = await api.post("/request-otp-email", {
          uuid: fileStore.uuid,
          page: "pembukaan-rekening",
        });

        console.log("Resend OTP sukses:", response.data);
        if (resendCount.value < 3) {
          resendCount.value += 1;
        }
        startCountdown();
      } catch (error) {
        console.error("Gagal mengirim ulang OTP:", error.response?.data || error.message);
        showErrorModal("Error", error.response?.data?.message, "Verifikasi Ulang", "Tutup");
      } finally {
        isResending.value = false;
      }
    };

    return {
      isOtpError,
      handleBackspace,
      isModalError,
      otp,
      errorMessage,
      email,
      focusNext,
      handleSubmit,
      resendOTP,
      resendCount,
      isResending,
      isButtonDisabled,
      countdown,
      showErrorModal,
      modalContent,
      handleCloseModal,
      otpErrorCount,
      temporaryBanMessage,
      focusPrevious,
      onlyNumberInput,
      whatsappContact,
      getWhatsAppLink,
      openWhatsApp,
      handleInput,
      handleButtonClick1,
      handleButtonClick2
    };
  },
};
</script>

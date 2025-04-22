<template #center-title>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col items-center">
      <img src="@/assets/emailVerif.svg" alt="Email Verification" class="h-24 md:h-32 lg:h-36 mb-4" />

      <div class="flex justify-center gap-2 m-4">
        <input v-for="(digit, index) in otp" :key="index" v-model="otp[index]"
          class="w-12 h-14 text-center border rounded-md text-lg font-medium focus:ring-1 focus:ring-primary"
          type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" @input="focusNext(index, $event)" />
      </div>

      <p v-if="errorMessage" class="text-red-500 text-center m-2">{{ errorMessage }}</p>
      <p class="text-base text-neutral-700 text-center">
        Masukan kode OTP yang sudah kami kirimkan melalui email <strong>{{ email }}</strong>.
      </p>

      <p v-if="resendCount >= 3" class="text-red-500 mt-4">
        Hubungi Customer Care untuk bantuan.
      </p>
      <p v-else class="text-primary mt-4 cursor-pointer" @click="resendOTP"
        :class="{ 'opacity-50 pointer-events-none': isResending || countdown > 0 }">
        {{ isResending ? "Mengirim..." : countdown > 0 ? `Belum dapat kode? kirim ulang OTP (${countdown}s)` : `Belum
        dapat kode? kirim ulang OTP (${3 -
          resendCount})` }}
      </p>

      <ButtonComponent type="submit" class="mt-6" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
      <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg"
        @close="isModalError = false" @buttonClick1="handleCloseModal" />
    </div>
  </form>
</template>

<script>
import api from "@/API/api";
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import { ref, computed, onMounted } from "vue";
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

    const showErrorModal = (title, message, btnString1 = "OK", btnString2 = "Batal", icon = "otp-error-illus.svg") => {
      modalContent.value = [
        {
          label: title,
          description: message,
          icon: new URL(`/src/assets/${icon}`, import.meta.url).href,
          buttonString1: btnString1,
          buttonString2: btnString2,
        },
      ];
      isModalError.value = true;
    };

    const focusNext = (index, event) => {
      if (event.target.value && index < otp.value.length - 1) {
        event.target.nextElementSibling?.focus();
      } else if (!event.target.value && event.inputType === 'deleteContentBackward' && index > 0) {
        event.target.previousElementSibling?.focus();
      }
    };

    const handleCloseModal = () => {
      isModalError.value = false;
    };

    const handleSubmit = async () => {
      const kodeOtp = otp.value.join("");
      if (kodeOtp.length !== 4) {
        errorMessage.value = "OTP harus terdiri dari 4 digit.";
        return;
      }

      if (!fileStore.uuid) {
        showErrorModal("Terjadi Kesalahan", "Tipe dokumen tidak valid atau UUID tidak ditemukan.");
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
          errorMessage.value = "Verifikasi OTP gagal. Silakan coba lagi.";
          showErrorModal("Kode OTP Salah", "Kode OTP yang Anda Kirimkan Salah", "Verifikasi Ulang", "Hubungi Customer Care"); // Tambahkan description
        }
      } catch (error) {
        otpErrorCount.value++;
        let title = "Kode OTP Salah";
        let subtitle = "Kode OTP yang Anda Kirimkan Salah";
        let buttons = ["Coba Lagi", "Hubungi Customer Care"];

        if (otpErrorCount.value === 3) {
          subtitle = "Anda telah salah memasukkan kode OTP sebanyak 3 kali. Untuk alasan keamanan, alamat email Anda akan dibatasi untuk pengiriman kode OTP selama 30 menit kedepan jika salah sebanyak 5 kali, Periksa kembali kode OTP Anda atau hubungi Universal Care untuk bantuan lebih lanjut.";
        } else if (otpErrorCount.value === 4) {
          subtitle = "Anda telah salah memasukkan kode OTP sebanyak 4 kali. Untuk alasan keamanan, alamat email Anda akan dibatasi untuk pengiriman kode OTP selama 30 menit kedepan jika salah sebanyak 5 kali, Periksa kembali kode OTP Anda atau hubungi Universal Care untuk bantuan lebih lanjut.";
        } else if (otpErrorCount.value >= 5) {
          title = "Alamat Email Dibatasi Sementara";
          if (error.response?.data?.message) {
            temporaryBanMessage.value = error.response.data.message;
            subtitle = `Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP sampai ${temporaryBanMessage.value}. Hubungi Universal Care untuk bantuan lebih lanjut.`;
          } else {
            subtitle = "Kesalahan memasukkan OTP telah mencapai batas maksimum. Alamat email Anda akan dibatasi sementara untuk pengiriman OTP. Hubungi Universal Care untuk bantuan lebih lanjut.";
          }
          buttons = ["Hubungi Customer Care"];
        } else if (error.response && error.response.data && error.response.data.message) {
          subtitle = error.response.data.message;
        }

        showErrorModal(title, subtitle, buttons[0], buttons[1]);
      }
    };

    const startCountdown = () => {
      countdown.value = 60;
      countdownInterval = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value -= 1;
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
    };

    const resendOTP = async () => {
      if (resendCount.value >= 3 || countdown.value > 0) return;

      isResending.value = true;
      try {
        const response = await api.post("/request-otp-email", {
          uuid: fileStore.uuid,
          page: "pembukaan-rekening",
        });

        console.log("Resend OTP sukses:", response.data);
        resendCount.value += 1;
        startCountdown();
      } catch (error) {
        console.error("Gagal mengirim ulang OTP:", error.response?.data || error.message);
        showErrorModal(error.response?.data?.Message, "Kode OTP yang Anda Kirimkan Salah", "Verifikasi Ulang", "Tutup");
      } finally {
        isResending.value = false;
      }
    };

    onMounted(() => {
      startCountdown();
    });

    return {
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
    };
  },
};
</script>

<template>
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
    </div>
  </form>
</template>

<script>
import api from "@/API/api";
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { ButtonComponent },
  setup() {
    const router = useRouter();
    const fileStore = useFileStore();
    const otp = ref(["", "", "", ""]);
    const errorMessage = ref("");
    const resendCount = ref(0);
    const isResending = ref(false);
    const countdown = ref(60);
    let countdownInterval = null;

    const email = computed(() => fileStore.alamat_email || "user@example.com");
    const isButtonDisabled = computed(() => otp.value.some(digit => digit === ""));

    const focusNext = (index, event) => {
      if (event.target.value && index < otp.value.length - 1) {
        event.target.nextElementSibling?.focus();
      }
    };

    const handleSubmit = async () => {
      const kodeOtp = otp.value.join("");
      if (kodeOtp.length !== 4) {
        errorMessage.value = "OTP harus terdiri dari 4 digit.";
        return;
      }

      try {
        const requestData = {
          verified: true,
          kode_otp: kodeOtp,
          uuid: fileStore.uuid,
        };

        console.log("Mengirim data:", requestData);

        const response = await api.post("/verification-email-deposito", requestData, {
          headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200 || response.status === 201) {
          console.log("OTP berhasil diverifikasi");
          router.push({ path: "/dashboard/uploadDokumenPenempatanDepositoNTB" });
        } else {
          errorMessage.value = "Verifikasi OTP gagal. Silakan coba lagi.";
        }
      } catch (error) {
        errorMessage.value = error.response?.data?.message || "Terjadi kesalahan saat verifikasi.";
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
          page: "Pembukaan Rekening NTB",
        });

        console.log("Resend OTP sukses:", response.data);
        resendCount.value += 1;
        startCountdown(); // Mulai countdown setelah berhasil kirim ulang OTP
      } catch (error) {
        console.error("Gagal mengirim ulang OTP:", error.response?.data || error.message);
      } finally {
        isResending.value = false;
      }
    };

    onMounted(() => {
      startCountdown();
    });

    return {
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
    };
  },
};
</script>

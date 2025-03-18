<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col items-center">
      <img src="@/assets/otp-icon.svg" alt="Email Verification" class="h-24 md:h-32 lg:h-36 mb-4" />

      <div class="flex justify-center gap-2 m-4">
        <input v-for="(digit, index) in otp" :key="index" v-model="otp[index]"
          class="w-12 h-12 text-center border rounded-md text-lg font-medium focus:ring-2 focus:ring-primary-500"
          type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" @input="focusNext(index, $event)" />
      </div>
      <p v-if="errorMessage" class="text-red-500 text-center m-2">{{ errorMessage }}</p>
      <p class="text-base text-neutral-700 text-center">
        Kami telah mengirimkan kode OTP konfirmasi ke nomor <strong class="text-primary">{{ no_hp }}</strong>. Silahkan
        Masukkan kode yang telah Anda terima untuk melanjutkan
      </p>

      <ButtonComponent type="submit" class="mt-6" :disabled="isButtonDisabled">
        Konfirmasi
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
// import axios from "axios";
import { computed } from 'vue';
import api from "@/API/api"
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";

export default {
  components: {
    ButtonComponent,
  },
  setup() {
    const fileStore = useFileStore();
    const no_hp = computed(() => fileStore.no_hp || "Nomor Handphone");
    return { no_hp }
  },
  data() {
    return {
      otp: ['', '', '', ''],
      errorMessage: "",
      fileStore: useFileStore(),
    };
  },
  computed: {
    // no_hp() {
    //   const fileStore = usefileStore();
    //   return fileStore.no_hp || "xxxxxxx";
    // },
    isButtonDisabled() {
      return this.otp.some(digit => digit === '');
    },
  },
  methods: {
    focusNext(index, event) {
      if (event.target.value && index < 3) {
        this.$nextTick(() => {
          this.$el.querySelectorAll('input')[index + 1].focus();
        });
      }
    },
    async handleSubmit() {
      const kodeOtp = this.otp.join('');
      if (kodeOtp.length !== 4) {
        this.errorMessage = "OTP harus terdiri dari 4 digit.";
        return;
      }

      try {
        const requestData = {
          verified: true,
          otp_code: kodeOtp,
          uuid: this.fileStore.uuid,
        };

        console.log("Mengirim data:", requestData);

        const response = await api.post("/verify-otp-hp-existing", requestData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200 || response.status === 201) {
          console.log("OTP berhasil diverifikasi");
          this.$router.push({ path: "/dashboard/halamanSuksesPembukaanRekeningExisting" });
        } else {
          this.errorMessage = "Verifikasi OTP gagal. Silakan coba lagi.";
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Terjadi kesalahan saat verifikasi.";
      }
    },
  },
};
</script>

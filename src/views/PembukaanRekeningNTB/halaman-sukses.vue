<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex justify-center items-center">
      <img src="@/assets/emailVerif.svg" alt="Arrow Icon" class="h-24 sm:h-24 md:h-32 lg:h-36 mb-3 md:mb-8 lg:mb-8" />
    </div>

    <h2 class="text-base sm:text-base md:text-3xl font-semibold text-primary text-center mb-4">
      Selamat Mira Setiawan!
    </h2>

    <!-- Informasi Penting -->
    <div class="py-4">
      <h3 class="text-lg font-semibold mb-3">Informasi Penting</h3>
      <ul class="list-disc pl-8 space-y-2 text-sm">
        <li>Verifikasi data Anda akan segera dilakukan oleh Petugas Bank</li>
        <li>
          Kami akan memproses pengajuan pembukaan rekening tabungan Anda
          secepatnya
        </li>
        <li>
          Harap cek email dan WhatsApp Anda secara berkala untuk pembaruan
          informasi
        </li>
      </ul>
    </div>

    <!-- Dokumen Terkirim -->
    <div class="py-4">
      <h3 class="text-lg font-semibold mb-3">Dokumen Terkirim</h3>
      <p class="text-sm">
        Formulir pengajuan pembukaan rekening Anda telah kami kirimkan ke email
        dan WhatsApp Anda dalam bentuk e-form PDF yang telah ditandatangani
        secara digital. File ini dilindungi dengan ZIP yang menggunakan tanggal
        lahir Anda sebagai password (format: DDMMYYYY).
      </p>
      <button class="flex items-center text-neutral-900">
        <img src="@/assets/downloadDocument.png" alt="Logo" class="h-12 mt-4" />
      </button>
    </div>

    <!-- Instruksi Transfer
    <div class="section">
      <h3 class="section-title">Instruksi Transfer</h3>
      <p>Silahkan melakukan transfer ke rekening Virtual Account berikut:</p>
      <div class="transfer-info">
        <p><strong>Nomor Virtual Account:</strong> 1234567890</p>
        <p><strong>Nama:</strong> Mira Setiawan</p>
      </div>
      <h4 class="sub-title">Cara Transfer</h4>
      <ul class="list-disc pl-5">
        <li>
          <strong>Melalui M-Banking:</strong> Pilih menu transfer, masukkan nomor VA dan konfirmasi
        </li>
        <li>
          <strong>Melalui ATM:</strong> Pilih menu transfer antar bank, masukkan nomor VA dan konfirmasi
        </li>
        <li>
          <strong>Melalui Internet Banking:</strong> Login, Pilih transfer, masukkan nomor VA dan konfirmasi
        </li>
      </ul>
    </div> -->

    <div class="text-center mt-6">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Kembali
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";

export default {
  components: {
    ButtonComponent,
  },
  computed: {
    isButtonDisabled() {
      // return !this.form.OtpInput.trim(); // Memastikan input tidak hanya berupa spasi
    },

    email() {
      const fileStore = useFileStore();
      return fileStore.alamat_email || "user@example.com";
    },
  },
  methods: {
    handleSubmit() {
      const fileStore = useFileStore();
      // location.reload();
      fileStore.$reset();
      console.log("Data form:", this.form);
      this.$router.push({ path: "/" });
    },
  },
  mounted() {
    this.$emit("update-progress", 100);
  },
};
</script>

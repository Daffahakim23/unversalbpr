<template>
  <form @submit.prevent="handleBack">
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
      <button class="flex items-center text-neutral-900" @click="downloadPdf">
        <img src="@/assets/downloadDocument.png" alt="Logo" class="h-12 mt-4" />
      </button>
    </div>
    <div class="text-center mt-6">
      <ButtonComponent type="button" @click="handleBack">
        Kembali
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import api from "@/API/api";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";

export default {
  components: {
    ButtonComponent,
  },
  computed: {
    email() {
      const fileStore = useFileStore();
      return fileStore.alamat_email || "user@example.com";
    },
  },
  methods: {
    handleBack() {
      const fileStore = useFileStore();
      // location.reload();
      fileStore.$reset();
      console.log("Data form:", this.form);
      this.$router.push({ path: "/" });
    },
    async downloadPdf() {
      const fileStore = useFileStore();
      const uuid = fileStore.uuid;
      const envelopeId = fileStore.envelope_id;

      try {
        const response = await api.get(`/download-signed-pdf?uuid=${uuid}&form=Existing`, {
          envelope_id: envelopeId,
          responseType: "blob",
        });

        console.log("Respons API:", response);
        console.log("Data Blob:", new Blob([response.data]));

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        const contentDisposition = response.headers['content-disposition'];
        let filename = 'downloaded_file';

        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Gagal mengunduh PDF:", error);
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 100);
  },
};
</script>

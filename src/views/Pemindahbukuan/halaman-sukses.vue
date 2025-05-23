<template>
  <form @submit.prevent="handleBack">
    <div class="flex justify-center items-center">
      <img src="@/assets/emailVerif.svg" alt="Arrow Icon" class="h-24 sm:h-24 md:h-32 lg:h-36 mb-6 md:mb-8 lg:mb-8" />
    </div>

    <h2 class="text-xl sm:text-xl md:text-2xl font-semibold text-center mb-2">
      Terima Kasih, {{ namaLengkap }}!
    </h2>
    <p class="text-sm sm:text-md md:text-base text-neutral-900 text-center mb-4">
      Aplikasi Pengajuan Transfer Anda Telah Berhasil Dikirim.
    </p>

    <!-- Informasi Penting -->
    <div class="py-4">
      <h3 class="text-md sm:text-md md:text-base font-semibold mb-3">Informasi Penting</h3>
      <ul class="list-disc pl-8 space-y-2 text-sm sm:text-sm md:text-sm">
        <li>Jika aplikasi penutupan deposito dikirim setelah batas waktu (cut-off time) sesuai metode transfer yang
          dipilih, permohonan akan diproses pada hari kerja berikutnya.
          Waktu cut-of tergantung metode transfer yang digunakan:
          <ul class="list-disc list-outside ml-4 mt-2 space-y-1">
            <li><Strong>SKN/LLG/RTGS:</Strong> pukul 12.00 WIB</li>
            <li><Strong>Transfer Online:</Strong> pukul 14.00 WIB</li>
          </ul>
        </li>
        <li>
          Verifikasi data Anda akan segera dilakukan oleh Petugas Bank
        </li>
        <li>
          Pastikan no. Handphone Anda aktif dan dapat dihubungi untuk tambahan verifikasi via telepon oleh Petugas Bank
          kami jika diperlukan
        </li>
        <li>
          Harap cek email Anda secara berkala untuk pembaharuan informasi
        </li>
      </ul>
    </div>

    <!-- Dokumen Terkirim -->
    <div class="py-4">
      <h3 class="text-md sm:text-md md:text-base font-semibold mb-4">Dokumen Terkirim</h3>
      <button type="button"
        class="flex items-center justify-between flex-row gap-4 border-2 border-primary-100 py-4 px-4 rounded-xl w-full"
        @click="downloadPdf">
        <div class="h-8 md:h-8 lg:h-10 items-center">
          <img src="@/assets/zip-icon.svg" alt="PDF Icon" class="h-8 md:h-8 lg:h-10">
        </div>
        <div class="overflow-hidden">
          <p
            class="text-xs md:text-sm text-left font-semibold text-primary whitespace-nowrap overflow-hidden text-ellipsis">
            Formulir Pengajuan Transfer - {{ namaLengkap }}.zip
          </p>
        </div>
        <div class="">
          <img src="@/assets/download-icon.svg" alt="PDF Icon">
        </div>
      </button>

      <p class="text-sm my-4">
        Dokumen PDF Formulir Transfer yang telah ditandatangani secara digital dapat diunduh di
        halaman ini dan juga telah dikirim ke email Anda. File berada dalam folder ZIP dan dilindungi kata sandi berupa
        tanggal lahir Anda dengan format <strong>DDMMYY</strong>, dimana:
      </p>

      <div class="mx-4">
        <p class="text-sm my-2">
          DD : 2 (dua) angka Tanggal Lahir
        </p>
        <p class="text-sm my-2">
          MM : 2 (dua) angka Bulan Lahir
        </p>
        <p class="text-sm my-2">
          YY : 2 (dua) angka terakhir Tahun Lahir
        </p>
      </div>

      <p class="text-sm my-4">
        Sebagai contoh,apabila tanggal lahir Anda adalah 23 Januari 2000 maka gunakan 230100 sebagai kata sandi untuk
        membuka dokumen Anda.
      </p>

      <p class="text-sm my-4">
        Terima kasih telah memilih Universal BPR. Kami senang menjadi bagian dari perjalanan finansial Anda.
      </p>

      <div class="bg-primary-50 flex items-center justify-between flex-row gap-4 py-2 px-4 rounded-xl w-full">
        <div>
          <img src="@/assets/helper-illus.svg" alt="PDF Icon" class="h-8 md:h-8 lg:h-10">
        </div>
        <div class="">
          <p class="text-xs md:text-sm text-primary">Butuh bantuan? Hubungi kami di <strong>021 2221 3993</strong> atau
            email ke
            <strong>customercare@universalbpr.co.id</strong>
          </p>
        </div>
      </div>
    </div>

    <div class="text-center mt-6">
      <ButtonComponent type="button" @click="handleBack">
        Beranda
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import api from "@/API/api";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";
import { computed } from "vue";

export default {
  data() {
    return {
      // ...
      downloadFileName: 'Formulir Pengajuan Transfer - MIRA SETIAWAN.pdf',
    };
  },
  components: {
    ButtonComponent,
  },
  setup() {
    const fileStore = useFileStore();
    const namaLengkap = computed(() => fileStore.nama_lengkap || "Nama Account");

    return {
      namaLengkap
    };

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
      fileStore.$reset();
      console.log("Data form:", this.form);
      this.$router.push({ path: "/" });
    },
    async downloadPdf() {
      this.downloadButtonText = 'Mengunduh...';
      const fileStore = useFileStore();
      const uuid = fileStore.uuid;
      const envelopeId = fileStore.envelope_id;
      const namaLengkap = fileStore.nama_lengkap;

      try {
        const response = await api.get(`/download-signed-pdf?uuid=${uuid}&form=PindahBuku`, {
          envelope_id: envelopeId,
          responseType: "blob",
        });

        console.log("Respons API:", response);
        console.log("Data Blob:", new Blob([response.data]));

        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        const contentDisposition = response.headers['content-disposition'];
        let filename = `Formulir Pengajuan Transfer - ${namaLengkap}.zip`;

        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
            this.downloadButtonText = filename;
          }
        }
        link.setAttribute("download", filename);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Gagal mengunduh PDF:", error);
        this.downloadButtonText = 'Gagal Mengunduh';
        alert('PDF tidak tersedia atau terjadi kesalahan saat mengunduh.');
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 100);
  },
};
</script>

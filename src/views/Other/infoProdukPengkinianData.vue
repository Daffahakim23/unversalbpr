<template #center-title>
  <div>
    <div v-if="pdfUrl" style="width: 100%; height: 10000px;">
      <iframe :src="pdfUrl" width="100%" height="100%" frameborder="0">
        <div> Browser Anda tidak mendukung iframe. Silakan unduh PDF dari link berikut:
          <a :href="pdfUrl" target="_blank">Unduh PDF</a>
        </div>
      </iframe>
    </div>
    <div v-else>
      <p v-if="error">Gagal memuat PDF: {{ error }}</p>
      <p v-else>Memuat informasi produk...</p>
    </div>
  </div>
</template>

<script>
import api from "@/API/api";

export default {
  data() {
    return {
      pdfUrl: null,
      pdfData: null,
      error: null,
    };
  },
  mounted() {
    this.fetchPdfUrl();
  },
  methods: {
    async fetchPdfUrl() {
      const endpoint = '/product-info?product=info-produk-pengkinian-data';

      try {
        const response = await api.get(endpoint, {
          responseType: 'blob'
        });

        const blob = response.data;
        this.pdfUrl = URL.createObjectURL(blob);
        this.pdfData = blob;

      } catch (e) {
        this.error = "Tidak dapat memuat PDF. Pastikan server API berjalan dan CORS sudah dikonfigurasi.";
        console.error("Gagal memuat PDF dari API:", e);
      }
    },
  },
  beforeUnmount() {
    if (this.pdfUrl && this.pdfUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.pdfUrl);
    }
  }
};
</script>

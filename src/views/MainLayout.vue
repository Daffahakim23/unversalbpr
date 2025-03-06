<template class="bg-neutral-50">
  <div class="flex flex-col h-screen bg-neutral-50">
    <Navbar />
    <div class="flex-grow flex flex-col">
      <div class="w-full rounded-full h-1.5">
        <div class="bg-secondary-base h-1.5 rounded-full" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="flex items-start">
        <div class="container mx-auto py-9">
          <div class="rounded-xl max-w-2xl mx-auto bg-neutral-white py-9 px-10 shadow-md">
            <div class="flex flex-col mb-6 gap-2">
              <div class="flex justify-between items-center">
                <h2 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left">
                  {{ pageTitle }}
                </h2>
                <button v-if="$route.name === 'pembukaanRekeningNTB'" @click="downloadProductDetails"
                  class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition">
                  Detail Produk
                </button>
              </div>
              <p v-if="pageSubtitle" class="text-sm text-gray-600">
                {{ pageSubtitle }}
              </p>
            </div>
            <router-view @update-progress="updateProgress" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      pageTitle: "",
      pageSubtitle: "",
      progress: 0,
    };
  },
  watch: {
    $route(to) {
      this.updatePageTitle(to);
    },
  },
  methods: {
    updatePageTitle(route) {
      this.pageTitle = route.meta.title || "";
      this.pageSubtitle = route.meta.subtitle || "";
    },
    updateProgress(value) {
      this.progress = value;
    },
    downloadProductDetails() {
      const fileUrl = "/detail-product.pdf";
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Detail_Produk.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    this.updatePageTitle(this.$route);
  },
};
</script>

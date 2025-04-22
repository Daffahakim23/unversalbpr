<template class="h-full">
  <div class="flex flex-col h-full min-h-screen bg-neutral-50">
    <div class="bg-neutral-white p-6">
      <div class="flex items-center justify-between">
        <div>
          <button @click="isModalError = true" class="flex items-center text-neutral-900 pl-2">
            <img src="@/assets/home-icon.svg" alt="Logo" class="h-10 mr-2" />
            <p class="text-base font-semibold text-left">{{ featureTitle }}</p>
          </button>
        </div>

        <div class="flex text-center">
          <button @click="isModalError = true" class="hidden sm:block">
            <img src="@/assets/LogoBPR.png" alt="Logo" class="h-12 mr-2" />
          </button>
        </div>

        <div>
          <button class="flex items-center text-primary">
            <img src="@/assets/cs-icon.svg" alt="Universal Care" class="h-8 sm:h-10 md:h-10" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex-grow flex flex-col">
      <div class="w-full rounded-full h-1.5">
        <div class="bg-secondary-base h-1.5 rounded-r-full" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="flex items-start">
        <div class="container mx-auto py-9">
          <div class="rounded-xl max-w-2xl mx-auto bg-neutral-white py-9 px-10 shadow-md">
            <div class="flex flex-col mb-6 gap-2">
              <div class="flex items-center"
                :class="{ 'justify-center': isCenterTitle, 'justify-between': !isCenterTitle }">
                <div v-if="isCenterTitle" class="flex justify-center w-full">
                  <h2 class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-center">{{ pageTitle }}</h2>
                </div>
                <h2 class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-left" v-if="!isCenterTitle">
                  {{ pageTitle }}
                </h2>
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
  <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg" @close="isModalError = false"
    @buttonClick1="handleModalClose" @buttonClick2="goBack" />
</template>

<script>
// import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/account-icon.svg";

export default {
  name: "MainLayout",
  components: {
    // Navbar,
    Footer,
    ModalError,
  },
  data() {
    return {
      pageTitle: "",
      pageSubtitle: "",
      featureTitle: "",
      progress: 0,
      isModalError: false,
      modalContent: [
        {
          label: "Apakah Anda Yakin Ingin Keluar?",
          icon: errorIcon,
          description:
            "Data yang sudah Anda isi akan hilang dan Anda diharuskan untuk mengisi dari awal lagi.",
          buttonString1: "Tetap di Halaman Ini",
          buttonString2: "Keluar",
        }
      ],
    };
  },
  computed: {
    isCenterTitle() {
      return this.$route.meta.centerTitle === true;
    }
  },
  watch: {
    $route(to) {
      this.updatePageTitle(to);
    },
  },
  methods: {
    handleModalClose() {
      this.isModalError = false;
    },
    goBack() {
      window.location.href = "/";
    },
    goToHome() {
      this.$router.push("/");
    },
    updatePageTitle(route) {
      this.featureTitle = route.meta.feature || "";
      this.pageTitle = typeof route.meta.title === 'function' ? route.meta.title(route) : route.meta.title || "";
      this.pageSubtitle = typeof route.meta.subtitle === 'function' ? route.meta.subtitle(route) : route.meta.subtitle || "";
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

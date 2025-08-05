<template>
  <div class="bg-neutral-white min-h-screen flex flex-col">
    <div class="flex items-center justify-between my-6 mx-10">
      <div class="flex text-center">
        <button @click="goBack">
          <img src="@/assets/LogoBPR.png" alt="Logo" class="h-12 sm:h-12 md:h-12" />
        </button>
      </div>

      <div class="flex gap-4">
        <button id="mainDropdownButton" data-dropdown-toggle="main-dropdown" class="focus:outline-none" type="button">
          <img src="@/assets/info-mini-icon.svg" alt="Info Produk" class="h-8 block md:hidden" />
          <img src="@/assets/info-product-icon.svg" alt="Info Produk Mini" class="h-10 hidden md:block" />
        </button>
        <DropdownMenu />
        <button class="flex items-center text-primary" @click="openWhatsApp">
          <img src="@/assets/customer-service-icon.svg" alt="Universal Care" class="h-8 md:h-10 lg:h-10" />
        </button>
      </div>
    </div>

    <div class="flex-grow flex flex-col">
      <div class="flex items-start">
        <div class="container py-9">
          <div class="rounded-xl max-w-full bg-neutral-white px-10">
            <div class="flex flex-col mb-10 gap-1">
              <div class="flex items-center relative">
                <div class="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <button @click="kembali"
                    class="flex items-center text-primary font-semibold hover:text-primary-900 transition-colors">
                    <i class="fas fa-arrow-left mr-0 md:mr-2"></i>
                    <span class="sr-only md:not-sr-only">Kembali</span>
                  </button>
                </div>
                <div class="flex justify-center w-full">
                  <h2 class="text-lg md:text-xl lg:text-2xl font-bold text-primary text-center">
                    {{ pageTitle }}</h2>
                </div>
              </div>
            </div>
            <div>
              <router-view @update-progress="updateProgress" @set-cancel-route="setCancelRoute" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg"
      @close="isModalError = false" @buttonClick1="handleModalClose" @buttonClick2="goBack" />
  </div>
</template>

<script>
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/account-icon.svg";
import infoProdukPdf from '@/assets/INFO-PRODUK.pdf';
import syaratKetentuanPdf from '@/assets/SYARAT-KETENTUAN.pdf';
import kebijakanPrivasiPdf from '@/assets/KEBIJAKAN-PRIVASI.pdf';
import faqPdf from '@/assets/FAQ.pdf';
import tentangKamiPdf from '@/assets/Tentang.pdf';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { initDropdowns } from 'flowbite';

export default {
  name: "MainLayout",
  components: {
    ModalError,
    DropdownMenu
  },
  data() {
    return {
      isInfoProductDropdownOpen: false,
      isInfoDropdownOpen: false,
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
      cancelRoute: null, // Ini masih relevan jika Anda memiliki goBack() yang menggunakan ini
      whatsappContact: {
        whatsapp: '622122213993'
      },
    };
  },

  watch: {
    $route(to) {
      this.updatePageTitle(to);
      this.cancelRoute = null;
    },
  },
  methods: {
    handleBeforeUnload(event) {
      sessionStorage.removeItem('appWasNavigatingInternally');
      event.preventDefault();
      alert("Data yang sudah Anda isi akan hilang dan Anda diharuskan untuk mengisi dari awal lagi.");
    },
    getWhatsAppLink(number = 622122213993) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        return `https://wa.me/${number}`;
      } else {
        return `https://web.whatsapp.com/send?phone=${number}`;
      }
    },
    openWhatsApp() {
      if (this.whatsappContact.whatsapp) {
        window.open(this.getWhatsAppLink(this.whatsappContact.whatsapp), '_blank');
      }
    },
    toggleInfoProductDropdown() {
      this.isInfoProductDropdownOpen = !this.isInfoProductDropdownOpen;
    },
    handleClickOutside(event) {
      if (this.isInfoProductDropdownOpen && !this.$el.contains(event.target)) {
        this.isInfoProductDropdownOpen = false;
      }
    },
    handleModalClose() {
      this.isModalError = false;
    },
    goBack() {
      window.location.href = "/";
    },
    kembali() {
      this.$router.go(-1);
    },
    setCancelRoute(route) {
      this.cancelRoute = route;
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
      const fileUrl = infoProdukPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "INFO-PRODUK.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadSK() {
      const fileUrl = syaratKetentuanPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Syarat & ketentuan.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadKP() {
      const fileUrl = kebijakanPrivasiPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Kebijakan Privasi.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadFAQ() {
      const fileUrl = faqPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "FAQ.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadTentang() {
      const fileUrl = tentangKamiPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Tentang.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    this.updatePageTitle(this.$route);
    document.addEventListener('click', this.handleClickOutside);
    import('flowbite').then(() => {
    });
    initDropdowns();
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>
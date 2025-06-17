<template>
  <div class="flex flex-col h-screen bg-neutral-50 overflow-hidden">
    <div class="bg-neutral-white p-6 flex items-center justify-between">

      <div class="flex text-center">
        <button @click="isModalError = true">
          <img src="@/assets/LogoBPR.png" alt="Logo" class="h-10 hidden md:block" />
        </button>
      </div>

      <div class="flex gap-4">
        <button id="mainDropdownButton" data-dropdown-toggle="main-dropdown" class="focus:outline-none" type="button">
          <img src="@/assets/info-mini-icon.svg" alt="Info Produk" class="h-8 block md:hidden" />
          <img src="@/assets/info-product-icon.svg" alt="Info Produk Mini" class="h-10 hidden md:block" />
        </button>
        <div id="main-dropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700 shadow-primary-100 ">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="mainDropdownButton">
            <li>
              <button id="nestedDropdownButton" data-dropdown-toggle="nested-dropdown"
                data-dropdown-placement="right-start" type="button"
                class="px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex justify-between items-center w-full">Info
                Produk<svg class="w-2.5 h-2.5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 9 4-4-4-4" />
                </svg></button>
              <div id="nested-dropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="nestedDropdownButton">
                  <li>
                    <a @click="$router.push('/dashboard/infoProdukPembukaanRekeningNTB')"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pembukaan
                      Rekening Non-Nasabah</a>
                  </li>
                  <li>
                    <a @click="$router.push('/dashboard/infoProdukPembukaanRekeningExisting')"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pembukaan
                      Rekening Nasabah</a>
                  </li>
                  <li>
                    <a @click="$router.push('/dashboard/infoProdukPenempatanDepositoNTB')"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pembukaan
                      Deposito Nasabah</a>
                  </li>
                  <li>
                    <a @click="$router.push('/dashboard/infoProdukPenempatanDepositoExisting')"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pembukaan
                      Deposito Non-Nasabah</a>
                  </li>
                  <li>
                    <a @click="$router.push('/dashboard/infoProdukPencairanDeposito')"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Penutupan
                      Deposito</a>
                  </li>
                  <li>
                    <a @click="$router.push('/dashboard/infoProdukPemindahbukuan')"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Transfer</a>
                  </li>
                  <li>
                    <a @click="$router.push('/dashboard/infoProdukPengkinianData')"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pengkinian
                      Data</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a @click="downloadSK" download="syarat-ketentuan.pdf"
                class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Syarat
                &
                Ketentuan</a>
            </li>
            <li>
              <a @click="downloadKP" download="Kebijakan-Privasi.pdf"
                class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kebijakan
                Privasi</a>
            </li>
            <li>
              <a @click="downloadFAQ" download="FAQ.pdf"
                class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">FAQ
              </a>
            </li>
            <li>
              <a @click="downloadTentang" download="Tentang.pdf"
                class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tentang
              </a>
            </li>
          </ul>
        </div>
        <button class="flex items-center text-primary" @click="openWhatsApp">
          <img src="@/assets/customer-service-icon.svg" alt="Universal Care" class="h-8 md:h-10 lg:h-10" />
        </button>
      </div>
    </div>

    <div class="flex-grow flex flex-col">
      <div class="w-full rounded-full h-1.5">
        <div class="bg-secondary-base h-1.5 rounded-r-full" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="flex items-start">
        <div class="container mx-auto py-9">
          <div class="rounded-xl max-w-5xl mx-auto bg-neutral-white py-9 px-10 shadow-md">
            <p class="text-sm text-gray-600 text-center">
              Info Produk
            </p>
            <div class="flex flex-col mb-6 gap-2">
              <div class="flex items-center">
                <div class="flex justify-center w-full">
                  <h2 class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-center">
                    {{ pageTitle }}</h2>
                </div>
              </div>
            </div>
            <router-view @update-progress="updateProgress" @set-cancel-route="setCancelRoute" />
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
import syaratKetentuanPdf from '@/assets/syarat-ketentuan.pdf';
import kebijakanPrivasiPdf from '@/assets/kebijakan-privasi.pdf';
import faqPdf from '@/assets/FAQ.pdf';
import tentangKamiPdf from '@/assets/Tentang.pdf';

export default {
  name: "MainLayout",
  components: {
    ModalError,
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
    // Hapus setNavbarConfig(config) { ... }
    // Hapus resetNavbarConfig(route) { ... }
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
      window.location.href = "/"; // Ini adalah goBack yang dipanggil dari modal error
    },
    setCancelRoute(route) {
      this.cancelRoute = route;
    },
    // goBack2() { // Tombol "Batalkan" sudah dihapus dari UI, jadi method ini mungkin tidak perlu lagi
    //   if (this.cancelRoute) {
    //     this.$router.push(this.cancelRoute);
    //   } else {
    //     this.$router.back();
    //   }
    // },
    // goToHome() { // Tombol logo BPR kini memanggil isModalError = true, method ini mungkin tidak perlu lagi
    //   this.$router.push("/");
    // },
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
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>
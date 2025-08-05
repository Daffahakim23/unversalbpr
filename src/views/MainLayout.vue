<template class="h-full">
  <div class="flex flex-col h-full min-h-screen bg-neutral-50">
    <div class="bg-neutral-white p-6">
      <div class="flex items-center justify-between">
        <div>
          <button @click="goBack2" v-if="navbarConfig.showBackButton" class="flex items-center text-neutral-900 pl-2">
            <img src="@/assets/batal-icon.svg" alt="Kembali" class="h-8 md:h-8 lg:h-10 mr-2" />
            <p class="text-sm sm:text-md md:text-md font-semibold text-left">Batalkan</p>
          </button>
          <button v-else @click="isModalError = true" class="flex items-center text-neutral-900 pl-2">
            <img src="@/assets/home-icon.svg" alt="Logo" class="h-8 md:h-8 lg:h-10 mr-2" />
            <p class="text-sm sm:text-md md:text-md font-semibold text-left hidden sm:block">{{ featureTitle }}</p>
          </button>
        </div>

        <div class="flex text-center" v-if="navbarConfig.showLogoBPR">
          <button @click="isModalError = true" class="hidden sm:block">
            <img src="@/assets/LogoBPR.png" alt="Logo" class="h-10 hidden md:block" />
          </button>
        </div>
        <div v-else class="flex-grow">
          <h2 v-if="navbarConfig.title && navbarConfig.centerTitle"
            class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-center">
            {{ navbarConfig.title }}
          </h2>
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
                :class="{ 'justify-center': isCenterTitle && !navbarConfig.title, 'justify-between': !isCenterTitle || navbarConfig.title }">
                <div v-if="isCenterTitle && !navbarConfig.title" class="flex justify-center w-full">
                  <h2 class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-center">
                    {{ pageTitle }}</h2>
                </div>
                <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-primary text-left"
                  v-if="!isCenterTitle || navbarConfig.title">
                  {{ pageTitle }}
                </h2>
              </div>
              <p v-if="pageSubtitle" class="text-sm text-gray-600 text-justify">
                {{ pageSubtitle }}
              </p>
            </div>
            <router-view @update-progress="updateProgress" @set-navbar-config="setNavbarConfig"
              @set-cancel-route="setCancelRoute" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg" @close="isModalError = false"
    @buttonClick1="handleModalClose" @buttonClick2="goBack" />
  <!-- <ModalCS :isOpen="isModalCSOpen" @close="isModalCSOpen = false" /> -->
</template>

<script>
import Footer from "@/components/Footer.vue";
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/account-icon.svg";
import infoProdukPdf from '@/assets/INFO-PRODUK.pdf';
import syaratKetentuanPdf from '@/assets/SYARAT-KETENTUAN.pdf';
import kebijakanPrivasiPdf from '@/assets/kebijakan-privasi.pdf';
import faqPdf from '@/assets/FAQ.pdf';
import tentangKamiPdf from '@/assets/Tentang.pdf';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { initDropdowns } from 'flowbite';

export default {
  name: "MainLayout",
  components: {
    // Navbar,
    Footer,
    ModalError,
    DropdownMenu,
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
      cancelRoute: null,
      navbarConfig: { // State untuk mengontrol konfigurasi navbar
        showBackButton: false,
        showInfoButton: true,
        showLogoBPR: true,
        centerTitle: false,
        title: null,
      },
      whatsappContact: { // Inisialisasi objek whatsappContact
        whatsapp: '622122213993' // Contoh nomor default, atau sesuaikan dengan kebutuhan Anda
      },
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
      this.resetNavbarConfig(to);
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
    setNavbarConfig(config) {
      this.navbarConfig = { ...this.navbarConfig, ...config };
    },
    resetNavbarConfig(route) { // 👈 принимаем объект route
      if (!route.meta.persistNavbar) {
        this.navbarConfig = {
          showBackButton: false,
          showInfoButton: true,
          showLogoBPR: true,
          centerTitle: false,
          title: null,
        };
      }
    },
    toggleInfoProductDropdown() {
      this.isInfoProductDropdownOpen = !this.isInfoProductDropdownOpen;
    },
    // Anda bisa menambahkan metode untuk menutup dropdown jika klik di luar area dropdown
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
    setCancelRoute(route) {
      this.cancelRoute = route;
    },
    goBack2() {
      if (this.cancelRoute) {
        this.$router.push(this.cancelRoute);
      } else {
        this.$router.back();
      }
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
    // this.updatePageTitle(this.$route);
    // document.addEventListener('click', this.handleClickOutside);
    // import('flowbite').then(() => {
    // });

    initDropdowns();
  },

  mounted() {
    this.updatePageTitle(this.$route);
    document.addEventListener('click', this.handleClickOutside);

    // Inisialisasi Flowbite setelah DOM diperbarui
    this.$nextTick(() => {
      initDropdowns();
    });

    // 1. Tambahkan listener beforeunload
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    // 2. Logika untuk mengarahkan jika ini adalah MUAT ULANG PENUH (refresh)
    // const navigationEntry = performance.getEntriesByType('navigation')[0];
    // const isReload = navigationEntry && navigationEntry.type === 'reload';

    // // Kondisi untuk redirect:
    // // - Path saat ini BUKAN '/'
    // // - Ini adalah REFRESH browser (bukan kunjungan pertama atau navigasi internal)
    // if (this.$route.path !== '/' && isReload) {
    //   console.log('Redirecting to /: Path saat ini', this.$route.path, ', Tipe Navigasi:', navigationEntry.type);
    //   this.$router.push('/');
    // } else {
    //   console.log('Tidak redirect. Path saat ini:', this.$route.path, ', Tipe Navigasi:', navigationEntry ? navigationEntry.type : 'N/A');
    // }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      // Set flag ini HANYA untuk navigasi internal Vue Router
      sessionStorage.setItem('appWasNavigatingInternally', 'true');
      console.log('Router beforeEach: appWasNavigatingInternally diatur ke true');
      next();
    });
  }
  // mounted() {
  //   window.addEventListener('beforeunload', this.handleBeforeUnload);
  //   this.updatePageTitle(this.$route);
  //   document.addEventListener('click', this.handleClickOutside);
  //   import('flowbite').then(() => {
  //   });

  // mounted() {
  //   window.addEventListener('beforeunload', this.handleBeforeUnload);
  //   if (this.$route.path !== '/' && !sessionStorage.getItem('isNavigatingFromApp')) {
  //     this.$router.push('/');
  //   }
  //   // Remove the flag immediately after checking. This ensures it's only active for internal navigations.
  //   sessionStorage.removeItem('isNavigatingFromApp');

  //   this.updatePageTitle(this.$route);
  //   document.addEventListener('click', this.handleClickOutside);
  //   // Ensure Flowbite is initialized if you are using it dynamically
  //   import('flowbite').then(() => {
  //     // Flowbite initialized
  //   });
  // },

  // //   // Cek apakah ini refresh atau navigasi baru
  // //   // Kita gunakan sessionStorage untuk menandai bahwa ini adalah refresh
  // // if (!sessionStorage.getItem('isNavigating')) {
  // //   // Ini adalah refresh atau halaman pertama kali dibuka
  // //   // Arahkan ke halaman utama jika bukan di halaman '/'
  // //   if (this.$route.path !== '/') {
  // //     this.$router.push('/');
  // //   }
  // // }
  // // // Set flag untuk menandakan bahwa navigasi sedang berlangsung
  // // sessionStorage.setItem('isNavigating', 'true');
  // // },
  // beforeUnmount() {
  //   document.removeEventListener('click', this.handleClickOutside);
  //   window.removeEventListener('beforeunload', this.handleBeforeUnload);
  //   // this.resetNavbarConfig();
  //   // Hapus flag saat komponen dihancurkan (misalnya, jika pengguna menutup tab)
  //   // sessionStorage.removeItem('isNavigating');
  // },
  // created() {
  //   this.$router.beforeEach((to, from, next) => {
  //     sessionStorage.setItem('isNavigatingFromApp', 'true');
  //     next();
  //   });
  //   // Tambahkan event listener untuk membersihkan sessionStorage sebelum halaman dimuat ulang
  //   // window.addEventListener('beforeunload', () => {
  //   //   sessionStorage.removeItem('isNavigating');
  //   // });
  // }
};
</script>

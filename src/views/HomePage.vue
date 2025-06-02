<template>
  <div class="bg-neutral-white min-h-screen flex flex-col">
    <div class="flex items-center justify-between my-6 mx-10">
      <div class="flex text-center">
        <button>
          <img src="@/assets/LogoBPR.png" alt="Logo" class="h-12 sm:h-12 md:h-12" />
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
              <!-- <li>
                <a @click="downloadProductDetails" download="info-produk.pdf"
                  class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Info
                  Produk</a>
              </li> -->
              <li>
                <button id="nestedDropdownButton" data-dropdown-toggle="nested-dropdown"
                  data-dropdown-placement="right-start" type="button"
                  class="px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex justify-between items-center w-full">Info
                  Produk<svg class="w-2.5 h-2.5 ms-3 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 9 4-4-4-4" />
                  </svg></button>
                <div id="nested-dropdown"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="nestedDropdownButton">
                    <li>
                      <a @click="$router.push('/dashboard/infoProdukPembukaanRekeningNTB')"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pembukaan
                        Rekening Nasabah</a>
                    </li>
                    <li>
                      <a @click="$router.push('/dashboard/infoProdukPembukaanRekeningExisting')"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pembukaan
                        Rekening Non-Nasabah</a>
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

    <!-- Main content section -->
    <div class="flex-grow flex flex-col items-center p-10 bg-gray-100">
      <div class="w-full md:w-2/3 flex-shrink-0 mb-16">
        <div class="text-center sm:text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl mb-8 font-medium items-center">
            Selamat Datang di Layanan E-Form Universal BPR
          </h1>
          <p class="text-sm sm:text-base md:text-xl text-neutral-600 ">
            Silakan pilih tipe nasabah untuk melanjutkan.
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-8">
        <Section class="flex flex-col justify-center w-full">
          <!-- Card: Rekening -->
          <Card type="1" title="Masuk di sini"
            :features="[{ label: 'Nasabah Universal BPR', description: 'Apabila Anda sudah menjadi Nasabah Universal BPR, Anda bebas memilih mengajukan berbagai layanan digital kami, seperti:', bottom: 'Dengan pengisian data yang lebih ringkas. Semuanya dirancang untuk kenyamanan Anda.' }]"
            icon="homepage-icon.svg" :onBtnClick="() => navigateTo('/dashboard', 'nasabah')"
            @cardClick="handleCardClick" buttonString="Saya adalah Nasabah Universal BPR" :items="[
              'Pembukaan Rekening Tabungan',
              'Pembukaan Deposito',
              'Pengkinian Data',
              'Transfer',
              'Penutupan Deposito'
            ]" />
          <Card type="1" title="Masuk di sini"
            :features="[{ label: 'Non-Nasabah Universal BPR', description: 'Apabila Anda belum terdaftar sebagai Nasabah Universal BPR, silakan melalui registrasi pembukaan rekening Nasabah Baru, baik Tabungan maupun Deposito untuk dapat memperoleh berbagai layanan digital kami.' }]"
            icon="homepage-icon.svg" :onBtnClick="() => navigateTo('/dashboard', 'non-nasabah')"
            @cardClick="handleCardClick" buttonString="Saya bukan Nasabah Universal BPR" />
        </Section>
      </div>
    </div>

    <!-- Footer section -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Section from "@/components/Section.vue";
import Card from "@/components/Card.vue";
import Footer from "@/components/Footer.vue";
import infoProdukPdf from '@/assets/INFO-PRODUK.pdf';
import syaratKetentuanPdf from '@/assets/syarat-ketentuan.pdf';
import kebijakanPrivasiPdf from '@/assets/kebijakan-privasi.pdf';
import faqPdf from '@/assets/FAQ.pdf';
import tentangKamiPdf from '@/assets/Tentang.pdf';

export default {
  data() {
    return {
      isInfoProductDropdownOpen: false,
      isInfoDropdownOpen: false,
    }
  },

  methods: {
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
    goToHome() {
      this.$router.push("/");
    },
    navigateTo(route, type) {
      this.$router.push({ path: route, query: { userType: type } }); // Navigasi ke rute tertentu
    },
    handleCardClick() {
      console.log("Card clicked!");
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    // this.resetNavbarConfig();
  },
  components: {
    Header,
    Section,
    Card,
    Footer,
  },
};
</script>

<style scoped>
/* Responsiveness and styles */
.content {
  flex: 1;
  /* Ambil ruang yang tersisa di antara header dan footer */
}

@media (max-width: 768px) {
  .h-12 {
    height: 3rem;
  }

  .h-14 {
    height: 3.5rem;
  }

  .h-16 {
    height: 4rem;
  }

  .h-6 {
    height: 1.5rem;
  }

  .h-8 {
    height: 2rem;
  }

  .h-10 {
    height: 2.5rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }
}

@media (max-width: 1024px) {
  .h-12 {
    height: 2.5rem;
  }

  .h-14 {
    height: 3rem;
  }

  .h-16 {
    height: 3.5rem;
  }

  .h-6 {
    height: 1.2rem;
  }

  .h-8 {
    height: 1.8rem;
  }

  .h-10 {
    height: 2.2rem;
  }

  .text-sm {
    font-size: 0.75rem;
  }
}
</style>
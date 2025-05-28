<template>
  <div class="bg-neutral-white min-h-screen flex flex-col">
    <div class="flex items-center justify-between my-6 mx-10">
      <div class="flex text-center">
        <button @click="goToHome">
          <img src="@/assets/LogoBPR.png" alt="Logo" class="h-12 sm:h-12 md:h-12" />
        </button>
      </div>

      <div class="flex gap-4">
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="focus:outline-none" type="button">
          <img src="@/assets/info-product-icon.svg" alt="Info Produk" class="h-8 sm:h-10 md:h-10" />
        </button>

        <div id="dropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700 shadow-primary-100 ">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a @click="downloadProductDetails" download="info-produk.pdf"
                class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Info
                Produk</a>
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
        <button class="flex items-center text-primary">
          <img src="@/assets/customer-service-icon.svg" alt="Universal Care" class="h-8 sm:h-10 md:h-10" />
        </button>
      </div>
    </div>

    <!-- Main content section -->
    <div class="flex-grow flex flex-col items-center p-10 bg-neutral-50">
      <div class="flex flex-col justify-center w-full">
        <div class="flex flex-col mb-10">
          <Header headerText="Selamat Datang Di E-Form BPR Universal"
            bodyText="Akses berbagai layanan BPR Universal kapan saja, di mana saja!" />
        </div>
      </div>
      <div class="flex flex-col gap-8 w-full">
        <Section v-if="this.$route.query.userType == 'nasabah'" class="flex flex-col justify-center w-full">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col md:flex-row gap-4">
              <Card type="1" :features="[
                {
                  label: 'Pembukaan Rekening Tabungan',
                  description: 'Buka rekening tabungan untuk pribadi / individu tanpa ke kantor cabang.',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="homepage-icon.svg" :onBtnClick="() => navigateTo('/dashboard/pembukaanRekeningExisting')"
                @cardClick="handleCardClick" buttonString="Ajukan Pembukaan Rekening Tabungan" />
              <Card type="1" :features="[
                {
                  label: 'Pembukaan Deposito',
                  description: 'Buka Deposito berjangka untuk pribadi / individu dengan suku bunga deposito tinggi s.d. 6.75% aman dijamin LPS.',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="homepage-icon.svg" :onBtnClick="() => navigateTo('/dashboard/penempatanDepositoExisting')"
                @cardClick="handleCardClick" buttonString="Ajukan Pembukaan Deposito" />
            </div>

            <div class="flex flex-col md:flex-row gap-4">
              <Card type="1" :features="[
                {
                  label: 'Penutupan Deposito',
                  description: 'Pencairan deposito khusus untuk nasabah yang menggunakan E-Advice',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="homepage-icon.svg" :onBtnClick="() => openCSModal({
                label: 'Penutupan Deposito',
                description: 'Pencairan deposito khusus untuk nasabah yang menggunakan E-Advice',
              })" @cardClick="handleCardClick" buttonString="Ajukan Penutupan Deposito" />

              <Card type="1" :features="[
                {
                  label: 'Transfer',
                  description: 'Layanan transfer ke bank lain atau transfer ke rekening sesama BPR Universal hanya dapat dilakukan secara pribadi dan tidak dapat diwakilkan',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="icon-deposito.svg" :onBtnClick="() => openCSModal({
                label: 'Transfer',
                description: 'Layanan transfer ke bank lain atau transfer ke rekening sesama BPR Universal hanya dapat dilakukan secara pribadi dan tidak dapat diwakilkan',
                dokumen: 'Foto/Scan KTP Elektronik',
              })" @cardClick="handleCardClick" buttonString="Ajukan Transfer" />

              <Card type="1" :features="[
                {
                  label: 'Pengkinian Data',
                  description: 'Perbarui data Anda untuk meningkatkan keamanan dan kenyamanan dalam bertransaksi',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="icon-deposito.svg" :onBtnClick="() => navigateTo('/dashboard/pengkinianData')"
                @cardClick="handleCardClick" buttonString="Ajukan Pengkinian Data" />
            </div>
          </div>
        </Section>

        <Section v-if="this.$route.query.userType == 'non-nasabah'" class="flex flex-col justify-center w-full">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col md:flex-row gap-4 w-full">
              <Card type="1" :features="[
                {
                  label: 'Pembukaan Rekening Tabungan',
                  description: 'Buka rekening tabungan untuk pribadi / individu tanpa ke kantor cabang.',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'npwp.svg', text: 'NPWP' },
                    { icon: 'tanda-tangan.svg', text: 'Tanda Tangan Basah' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="homepage-icon.svg" :onBtnClick="() => navigateTo('/dashboard/pembukaanRekeningNTB')"
                @cardClick="handleCardClick" buttonString="Ajukan Pembukaan Rekening Tabungan" />
              <Card type="1" :features="[
                {
                  label: 'Pembukaan Deposito',
                  description: 'Buka Deposito berjangka untuk pribadi / individu dengan suku bunga deposito tinggi s.d. 6.75% aman dijamin LPS.',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'npwp.svg', text: 'NPWP' },
                    { icon: 'tanda-tangan.svg', text: 'Tanda Tangan Basah' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="icon-deposito.svg" :onBtnClick="() => navigateTo('/dashboard/penempatanDepositoNTB')"
                @cardClick="handleCardClick" buttonString="Ajukan Pembukaan Deposito" />
            </div>
          </div>
        </Section>
      </div>
    </div>

    <!-- Footer section -->
    <Footer />
  </div>
  <CSModal :isOpen="showModalCS" @close="closeCSModal" :features="[selectedFeature]"
    :icon="selectedFeature ? 'icon-deposito.svg' : ''"
    :onBtnClick="() => navigateTo('/dashboard/penempatanDepositoNTB')" @cardClick="handleCardClick"
    buttonString="Ajukan Pembukaan Deposito" />

</template>

<script>
// import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Section from "@/components/Section.vue";
import Card from "@/components/Card.vue";
import Footer from "@/components/Footer.vue";
import CSModal from "@/components/ModalCS.vue";
import infoProdukPdf from '@/assets/INFO-PRODUK.pdf';
import syaratKetentuanPdf from '@/assets/syarat-ketentuan.pdf';
import kebijakanPrivasiPdf from '@/assets/kebijakan-privasi.pdf';
import faqPdf from '@/assets/FAQ.pdf';
import tentangKamiPdf from '@/assets/Tentang.pdf';

var userType = '';

// const userType = route.query.userType;

export default {
  mounted() {
    console.log('User Type:', this.$route.query.userType);
    userType = this.$route.query.userType;
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    // this.resetNavbarConfig();
  },
  data() {
    return {
      showModalCS: false,
      selectedFeature: null,
      isInfoProductDropdownOpen: false,
      isInfoDropdownOpen: false,
    };
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
    openCSModal(feature) {
      this.selectedFeature = feature;
      this.showModalCS = true;
    },
    closeCSModal() {
      this.showModalCS = false;
      this.selectedFeature = null;
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    handleCardClick() {
      console.log("Card clicked!");
    }
  },
  components: {
    Header,
    Section,
    Card,
    Footer,
    CSModal,
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
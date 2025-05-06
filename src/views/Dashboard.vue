<template>
  <div class="bg-neutral-white min-h-screen flex flex-col">
    <div class="flex items-center justify-between my-6 mx-10">
      <div class="flex text-center">
        <button @click="goToHome">
          <img src="@/assets/LogoBPR.png" alt="Logo" class="h-12 sm:h-12 md:h-12" />
        </button>
      </div>

      <div class="flex flex-row gap-4">
        <button class="flex items-center text-primary">
          <img src="@/assets/info-button.svg" alt="Universal Care" class="h-8 sm:h-10 md:h-10" />
        </button>
        <button class="flex items-center text-primary">
          <img src="@/assets/cs-icon.svg" alt="Universal Care" class="h-8 sm:h-10 md:h-10" />
        </button>
      </div>
    </div>

    <!-- Main content section -->
    <div class="flex-grow flex flex-col items-center p-10 bg-neutral-50">
      <div class="flex flex-col justify-center w-full">
        <div class="flex flex-col mb-10">
          <Header headerText="Selamat Datang Di E-Form Universal BPR"
            bodyText="Akses berbagai layanan Universal BPR kapan saja, di mana saja!" />
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
                  label: 'Penempatan Deposito',
                  description: 'Buka Deposito berjangka untuk pribadi / individu dengan suku bunga deposito tinggi s.d. 6.75% aman dijamin LPS.',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="homepage-icon.svg" :onBtnClick="() => navigateTo('/dashboard/penempatanDepositoExisting')"
                @cardClick="handleCardClick" buttonString="Ajukan Penempatan Deposito" />
            </div>

            <div class="flex flex-col md:flex-row gap-4">
              <Card type="1" :features="[
                {
                  label: 'Pencairan Deposito',
                  description: 'Pencairan deposito khusus untuk nasabah yang menggunakan E-Advice',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="homepage-icon.svg" :onBtnClick="() => openCSModal({
                label: 'Pencairan Deposito',
                description: 'Pencairan deposito khusus untuk nasabah yang menggunakan E-Advice',
              })" @cardClick="handleCardClick" buttonString="Ajukan Pencairan Deposito" />

              <Card type="1" :features="[
                {
                  label: 'Transfer',
                  description: 'Layanan transfer ke bank lain atau pemindahbukuan ke rekening sesama BPR Universal hanya dapat dilakukan secara pribadi dan tidak dapat diwakilkan',
                  dokumen: [
                    { icon: 'ktp-mini-icon.svg', text: 'Foto/Scan KTP Elektronik' },
                    { icon: 'mini-icon-email.svg', text: 'Email Aktif' },
                    { icon: 'mini-icon-phone.svg', text: 'No. Handphone Aktif' },
                    { icon: 'mini-icon-fotoDiri.svg', text: 'Foto Diri' },
                  ]
                }
              ]" icon="icon-deposito.svg" :onBtnClick="() => openCSModal({
                label: 'Pemindah Bukuan',
                description: 'Layanan transfer ke bank lain atau pemindahbukuan ke rekening sesama BPR Universal hanya dapat dilakukan secara pribadi dan tidak dapat diwakilkan',
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
                  label: 'Penempatan Deposito',
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
                @cardClick="handleCardClick" buttonString="Ajukan Penempatan Deposito" />
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
    buttonString="Ajukan Penempatan Deposito" />

</template>

<script>
// import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Section from "@/components/Section.vue";
import Card from "@/components/Card.vue";
import Footer from "@/components/Footer.vue";
import CSModal from "@/components/ModalCS.vue";

var userType = '';

// const userType = route.query.userType;

export default {
  mounted() {
    console.log('User Type:', this.$route.query.userType);
    userType = this.$route.query.userType;
  },
  data() {
    return {
      showModalCS: false,
      selectedFeature: null,
    };
  },
  methods: {
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
<template>
  <div class="bg-neutral-white min-h-screen flex flex-col">
    <div class="flex items-center justify-between my-6 mx-10">
      <div class="flex text-center">
        <button>
          <img src="@/assets/LogoBPR.png" alt="Logo" class="h-12 sm:h-12 md:h-12" />
        </button>
      </div>

      <div class="flex flex-row gap-4">
        <button class="flex items-center text-primary" @click="goToHome">
          <img src="@/assets/info-button.svg" alt="Universal Care" class="h-8 sm:h-10 md:h-10" />
        </button>
        <button class="flex items-center text-primary">
          <img src="@/assets/cs-icon.svg" alt="Universal Care" class="h-8 sm:h-10 md:h-10" />
        </button>
      </div>
    </div>

    <!-- Main content section -->
    <div class="flex-grow flex flex-col items-center p-10 bg-gray-100">
      <div class="w-full md:w-2/3 flex-shrink-0 mb-16">
        <div class="text-center sm:text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl mb-8 font-medium items-center">
            Selamat Datang di Layanan Digital Universal BPR
          </h1>
          <p class="text-sm sm:text-base md:text-xl text-neutral-600 ">
            Silahkan pilih tipe nasabah untuk melanjutkan.
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
              'Penempatan Deposito',
              'Pengkinian Data',
              'Pemindah bukuan',
              'Pencairan Deposito'
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

export default {
  methods: {
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
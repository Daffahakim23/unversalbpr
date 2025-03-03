<template>
  <div class="bg-neutral-white p-6">
    <div class="flex items-center justify-between">
      <div>
        <button @click="goBack" class="flex items-center text-neutral-900 pl-2">
          <img src="@/assets/Icon Back.png" alt="Logo" class="h-6 mr-2" />
          <p class="text-base font-semibold">Kembali</p>
        </button>
      </div>

      <div class="flex-1 text-center">
        <button @click="goToHome">
          <img src="@/assets/LogoBPR.png" alt="Logo" class="h-12 mr-2" />
        </button>
      </div>

      <div>
        <button class="flex items-center text-primary">
          <span>Batal</span>
          <!-- <img src="@/assets/CallCenter.png" alt="Customer Care" class="h-6 m-2"> -->
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    goBack() {
      // Kembali ke halaman sebelumnya
      this.$router.go(-1); // Atau gunakan this.$router.back()
    },
    goToHome() {
      this.$router.push("/"); // Navigasi ke halaman Home
    },
  },
};
</script>

<style scoped>
/* Gaya tambahan jika diperlukan */
</style>

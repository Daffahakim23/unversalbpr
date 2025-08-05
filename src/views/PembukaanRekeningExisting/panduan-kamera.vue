<template>
  <div class="">
    <div class="flex border-b border-gray-200 mb-4">
      <div class="flex-1 text-center py-3 border-b-2 cursor-pointer"
        :class="{ 'border-primary text-primary font-medium': activeBrowser === 'chrome', 'border-transparent text-gray-500': activeBrowser !== 'chrome' }"
        @click="activeBrowser = 'chrome'">
        <img src="https://th.bing.com/th/id/OIP.BQJVvIZ9NkefVlJZANZkIAHaHa?rs=1&pid=ImgDetMain" alt="Chrome Logo"
          class="h-4 md:h-6 mx-auto mb-1" />
        Chrome
      </div>
      <div class="flex-1 text-center py-3 border-b-2 cursor-pointer"
        :class="{ 'border-primary text-primary font-medium': activeBrowser === 'firefox', 'border-transparent text-gray-500': activeBrowser !== 'firefox' }"
        @click="activeBrowser = 'firefox'">
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Firefox_logo%2C_2017.png" alt="Firefox Logo"
          class="h-4 md:h-6 mx-auto mb-1 opacity-75" />
        Mozilla Firefox
      </div>
    </div>

    <div class="p-4 md:p-6">
      <h2 class="text-base md:text-lg font-semibold text-neutral-900 mb-4">
        Cara mengaktifkan Pop-up di Browser:
      </h2>

      <ol class="list-none p-0 m-0" v-if="activeBrowser === 'chrome'">
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            1
          </div>
          <p class="text-sm md:text-base text-neutral-600">Buka Aplikasi Chrome</p>
        </li>
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            2
          </div>
          <p class="text-sm md:text-base text-neutral-600">Klik ikon tiga titik di bagian kanan atas</p>
        </li>
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            3
          </div>
          <p class="text-sm md:text-base text-neutral-600">Pilih menu Settings (Setelan)</p>
        </li>
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            4
          </div>
          <p class="text-sm md:text-base text-neutral-600">Di sidebar kiri, Klik tombol Privacy & Security (Privasi dan
            Keamanan) </p>
        </li>
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            5
          </div>
          <p class="text-sm md:text-base text-neutral-600">Scroll ke bawah dan Klik menu Site Settings</p>
        </li>
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            6
          </div>
          <p class="text-sm md:text-base text-neutral-600">Pilih Menu Pop-ups and redirects (Pop-up dan pengalihan).</p>
        </li>
        <li class="flex items-start">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            7
          </div>
          <p class="text-sm md:text-base text-neutral-600">Aktifkan menu Sites can send pop-ups and use redirects (Situs
            dapat menampilkan
            pop-up)..</p>
        </li>
      </ol>

      <ol class="list-none p-0 m-0" v-else-if="activeBrowser === 'firefox'">
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            1
          </div>
          <p class="text-sm md:text-base text-neutral-600">Buka Aplikasi Mozilla Firefox</p>
        </li>
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            2
          </div>
          <p class="text-sm md:text-base text-neutral-600">Klik ikon menu di bagian kanan atas</p>
        </li>
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            3
          </div>
          <p class="text-sm md:text-base text-neutral-600">Pilih menu Settings (Setelan)</p>
        </li>
        <li class="flex items-start mb-3">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            4
          </div>
          <p class="text-sm md:text-base text-neutral-600">Pilih menu Privacy & Security (Privasi & Keamanan)</p>
        </li>
        <li class="flex items-start">
          <div
            class="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-semantic/info-base text-white text-xs font-bold mr-3">
            5
          </div>
          <p class="text-sm md:text-base text-neutral-600">Hilangkan centang pada menu Block Pop-up Window (Blokir
            Jendela Pop-Up).</p>
        </li>
      </ol>
    </div>
    <div class="flex justify-center mt-6">
      <ButtonComponent type="button" @click="handleSubmit">
        Lanjutkan
      </ButtonComponent>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/button.vue";

export default {
  name: 'PopupActivationGuide',
  components: { ButtonComponent },
  data() {
    return {
      activeBrowser: 'chrome',
    };
  },
  methods: {
    handleSubmit() {
      this.$router.push({ name: 'tandaTanganDigitalPembukaanRekeningExisting' });
    }
  },
  mounted() {
    this.$emit("set-navbar-config", {
      showBackButton: true,
      showInfoButton: true,
      showLogoBPR: true,
      centerTitle: true,
    });
    this.$emit("set-cancel-route", { name: 'SomePreviousRoute' });
  }
};
</script>

<style scoped></style>
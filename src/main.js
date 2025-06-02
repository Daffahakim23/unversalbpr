// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import "./assets/tailwind.css";
// import VueApexCharts from "vue3-apexcharts";
// import { createPinia } from 'pinia';
// import 'flowbite';
// /* src/assets/main.css */
// import "flag-icons/css/flag-icons.css";


// const app = createApp(App);
// const pinia = createPinia();

// app.use(pinia);

// app.use(router);

// app.use(VueApexCharts);

// app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Pastikan ini mengimpor router yang sudah Anda definisikan
import "./assets/tailwind.css";
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from 'pinia';
import 'flowbite';
/* src/assets/main.css */
import "flag-icons/css/flag-icons.css";


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// --- Logika Deteksi Reload dan Reset State Dimulai ---

// Fungsi untuk "mereset" data atau state aplikasi
// Sesuaikan fungsi ini dengan kebutuhan reset data spesifik Anda.
// Misalnya, membersihkan data dari localStorage, sessionStorage, atau state Pinia/Vuex.


// Deteksi apakah halaman dimuat ulang
// Kita menggunakan sessionStorage untuk melacak apakah ini adalah reload dalam sesi yang sama.
if (sessionStorage.getItem('isReloaded')) {
    console.log('Aplikasi terdeteksi dimuat ulang (reload).');
    // Ini adalah reload, lakukan reset state aplikasi
    // resetApplicationState();

    // Arahkan ke halaman utama (/) setelah router siap
    router.isReady().then(() => {
        router.push({ path: "/" });
        console.log('Diarahkan ke halaman utama (/) setelah reload dan reset state.');
    }).catch(err => {
        console.error('Gagal mengarahkan router setelah reload:', err);
    });
} else {
    console.log('Aplikasi dimuat pertama kali atau navigasi normal.');
    // Ini adalah kunjungan pertama atau navigasi normal, tandai sebagai bukan reload
    sessionStorage.setItem('isReloaded', 'true');
}

// Tambahkan event listener untuk membersihkan flag 'isReloaded' saat tab/browser ditutup.
// Ini memastikan bahwa kunjungan berikutnya (setelah menutup dan membuka lagi)
// akan dianggap sebagai sesi baru, bukan reload.
window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('isReloaded');
    console.log('Flag isReloaded dihapus dari sessionStorage karena tab ditutup.');
});

// --- Logika Deteksi Reload dan Reset State Berakhir ---

app.use(router); // Router harus dipasang setelah logika deteksi reload,
// agar router.isReady() bisa bekerja dengan benar.

app.use(VueApexCharts);

app.mount("#app");


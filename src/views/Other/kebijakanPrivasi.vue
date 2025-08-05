<template>
  <div class="mx-auto bg-white">
    <div class="mb-8">
      <p class="text-gray-700 text-sm leading-relaxed">
        PT BPR Universal berkomitmen untuk melindungi privasi data pribadi Nasabah. Kebijakan Privasi ini menjelaskan
        bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda. Dengan menggunakan
        layanan kami, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini.
      </p>
    </div>

    <div class="space-y-4">
      <div v-for="(section, index) in sections" :key="index" class="border-b border-gray-200">
        <div
          class="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-md px-2"
          @click="toggleExpand(index)">
          <span class="text-gray-800 font-medium">{{ section.number }}. {{ section.title }}</span>
          <!-- Mengubah ikon panah berdasarkan status expanded, tanpa teks "Buka" -->
          <i :class="{ 'fa-chevron-down': section.expanded, 'fa-chevron-right': !section.expanded }"
            class="fas ml-2 text-sm text-primary"></i>
        </div>

        <div v-if="section.expanded" class="px-2 pb-4 pt-2 text-gray-600 text-sm leading-relaxed">
          <p v-html="section.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions',
  data() {
    return {
      sections: [
        {
          number: 'I',
          title: 'Pengumpulan Data Pribadi',
          expanded: false,
          content: 'Kami mengumpulkan data pribadi yang Anda berikan secara langsung, seperti nama, alamat, nomor telepon, alamat email, dan informasi keuangan, saat Anda mendaftar untuk layanan kami atau berinteraksi dengan kami. Data ini penting untuk penyediaan layanan yang optimal. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          number: 'II',
          title: 'Penggunaan Data Pribadi',
          expanded: false,
          content: 'Data pribadi yang kami kumpulkan digunakan untuk memproses transaksi, mengelola rekening Anda, memberikan layanan pelanggan, serta untuk tujuan pemasaran dan peningkatan produk kami. Kami memastikan penggunaan data sesuai dengan hukum yang berlaku. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          number: 'III',
          title: 'Penyimpanan dan Perlindungan Data',
          expanded: false,
          content: 'Kami menerapkan langkah-langkah keamanan fisik, elektronik, dan prosedural untuk melindungi data pribadi Anda dari akses tidak sah, penggunaan, atau pengungkapan. Data Anda disimpan di server yang aman dan hanya dapat diakses oleh personel yang berwenang. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
          number: 'IV',
          title: 'Pembagian Data dengan Pihak Ketiga',
          expanded: false,
          content: 'Kami tidak akan menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum atau untuk tujuan penyediaan layanan (misalnya, kepada penyedia layanan pihak ketiga yang terpercaya yang terikat perjanjian kerahasiaan dengan kami). Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          number: 'V',
          title: 'Hak-hak Nasabah atas Data Pribadi',
          expanded: false,
          content: 'Anda memiliki hak untuk mengakses, mengoreksi, memperbarui, atau menghapus data pribadi Anda yang kami simpan. Anda juga berhak untuk menarik persetujuan Anda kapan saja, sesuai dengan ketentuan yang berlaku. Silakan hubungi kami untuk mengajukan permintaan terkait hak-hak Anda. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          number: 'VI',
          title: 'Cookies dan Teknologi Pelacakan',
          expanded: false,
          content: 'Situs web kami mungkin menggunakan cookies dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna, menganalisis tren, mengelola situs web, dan mengumpulkan informasi demografis tentang basis pengguna kami secara keseluruhan. Anda dapat mengatur browser Anda untuk menolak semua atau beberapa cookies. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          number: 'VII',
          title: 'Perubahan Kebijakan Privasi',
          expanded: false,
          content: 'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan dipublikasikan di halaman ini, dan tanggal efektif di bagian bawah kebijakan akan diperbarui. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
          number: 'VIII',
          title: 'Kontak Kami',
          expanded: false,
          content: 'Jika Anda memiliki pertanyaan atau kekhawatiran mengenai Kebijakan Privasi ini atau praktik data kami, silakan hubungi kami melalui [alamat email/nomor telepon layanan pelanggan]. Kami siap membantu Anda. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          number: 'IX',
          title: 'Tanggal Efektif',
          expanded: false,
          content: 'Kebijakan Privasi ini berlaku efektif sejak [Tanggal Efektif, misalnya: 1 Januari 2024]. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]
    };
  },
  methods: {
    toggleExpand(index) {
      // Mengubah status 'expanded' untuk bagian yang diklik
      this.sections[index].expanded = !this.sections[index].expanded;
    }
  }
};
</script>

<style scoped>
/* Gaya yang spesifik untuk layout utama, jika ada.
   Gaya untuk elemen-elemen individual sekarang ada di komponen masing-masing. */
</style>

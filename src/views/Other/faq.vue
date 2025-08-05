<template>
  <div class="mx-auto bg-white">
    <!-- Header -->
    <div class="mb-8">
      <p class="text-gray-700 text-sm leading-relaxed">
        Temukan jawaban atas pertanyaan umum Anda mengenai rekening dan fasilitas di PT BPR Universal. Jika Anda tidak
        menemukan jawaban yang dicari, jangan ragu untuk menghubungi layanan pelanggan kami.
      </p>
    </div>

    <!-- List of Sections (sekarang menjadi daftar pertanyaan) -->
    <div class="space-y-4">
      <div v-for="(section, index) in sections" :key="index" class="border-b border-gray-200">
        <!-- Header pertanyaan yang bisa diklik -->
        <div
          class="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-md px-2"
          @click="toggleExpand(index)">
          <span class="text-gray-800 font-medium">{{ section.number }}. {{ section.title }}</span>
          <span class="text-primary font-semibold flex items-center">
            Buka
            <!-- Mengubah ikon panah berdasarkan status expanded -->
            <i :class="{ 'fa-chevron-down': section.expanded, 'fa-chevron-right': !section.expanded }"
              class="fas ml-2 text-sm"></i>
          </span>
        </div>

        <!-- Jawaban yang diperluas -->
        <div v-if="section.expanded" class="px-2 pb-4 pt-2 text-gray-600 text-sm leading-relaxed">
          <!-- Menampilkan jawaban spesifik untuk setiap pertanyaan -->
          <p v-html="section.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions', // Nama komponen tetap, tapi sekarang berfungsi sebagai FAQ
  data() {
    return {
      sections: [
        {
          number: '1',
          title: 'Apa itu Layanan E-Form Universal BPR?',
          expanded: false,
          content: 'Layanan E-Form adalah situs resmi milik PT BPR Universal yang dapat diakses di perangkat desktop maupun smartphone yang dirancang untuk calon nasabah/nasabah eksis agar dapat mengajukan Pembukaan Rekening, Transfer, Pengkinian Data, dan Penutupan Deposito tanpa perlu datang ke kantor Bank, menggunakan media jaringan internet.'
        },
        {
          number: '2',
          title: 'Layanan apa saja yang tersedia melalui Layanan E-Form Universal BPR?',
          expanded: false,
          content: 'Layanan E-Form memiliki beragam fitur layanan digital yang dapat dimanfaatkan untuk pengajuan Pembukaan Rekening (Tabungan dan Deposito), Pengkinian Data, Instruksi Transfer, dan Penutupan Deposito.'
        },
        {
          number: '3',
          title: 'Apakah saya perlu login untuk mengakses Layanan E-Form?',
          expanded: false,
          content: 'Tidak, Anda tidak perlu login untuk mengakses Layanan E-Form. Anda cukup mengisi formulir sesuai jenis transaksi yang diinginkan melalui Layanan E-Form.<br><br>Namun, khusus untuk pengajuan Transfer dan/atau Penutupan Deposito, Anda harus terlebih dahulu menghubungi Universal Care atau Petugas Bank. Petugas Bank kami akan memverifikasi permintaan Anda dan mengirimkan tautan one-time link secara langsung melalui WhatsApp resmi Universal BPR.Pastikan nomor WhatsApp Anda aktif dan dapat dihubungi untuk menerima tautan tersebut.'
        },
        {
          number: '4',
          title: 'Apa yang dimaksud dengan cut off time pada Layanan E-Form?',
          expanded: false,
          content: 'Cut off time adalah batas waktu operasional Bank untuk memproses formulir di hari yang sama. Jika formulir dikirim sebelum cut off time, akan diproses di hari yang sama. Jika lewat, akan diproses di hari kerja berikutnya.'
        },
        {
          number: '5',
          title: 'Berapa cut off time untuk masing-masing jenis Transaksi?',
          expanded: false,
          content: 'a. Pembukaan Rekening Tabungan (Baik untuk Calon Nasabah/Nasabah eksis): 15.00 WIB<br>b. Pengkinian Data: Pukul 15.00 WIB<br>c. Pembukaan Deposito (Untuk Calon Nasabah): Pukul 12.00 WIB<br>d. Pembukaan Deposito (Nasabah Eksis): Pukul 15.00 WIB<br>e. Transfer: Pukul 12.00 WIB<br>f. Penutupan Deposito: Pukul 12.00 WIB'
        },
        {
          number: '6',
          title: 'Siapa saja yang dapat membuka rekening melalui Layanan E-Form?',
          expanded: false,
          content: 'Calon Nasabah/Nasabah yang dapat mengajukan pembukaaan Rekening melalui Layanan E-Form harus memenuhi persyaratan berikut:<br><br>1. Warga Negara Indonesia (WNI) dengan usia minimal 17 tahun.<br>2. Bukan Warga Negara Asing dan tidak memiliki kewajiban perpajakan di yurisdiksi asing.<br>3. Memiliki e-KTP.<br>4. Memiliki alamat email aktif dengan kapasitas memadai untuk menerima notifikasi dari Bank/Pihak Ketiga.<br>5. Memiliki nomor ponsel valid yang terdaftar di Indonesia untuk menerima notifikasi melalui SMS dari Bank/Pihak Ketiga.<br>6. Berkapasitas hukum untuk melakukan tindakan hukum, termasuk menandatangani perjanjian yang mengikat dengan Bank.'
        },
        {
          number: '7',
          title: 'Jenis rekening apa yang bisa dibuka melalui Layanan E-Form?',
          expanded: false,
          content: 'Calon nasabah/nasabah yang membuka rekening melalui Layanan E-Form dapat membuka Rekening Tabungan dan/atau Deposito atas nama nasabah perorangan, dan hanya dalam bentuk rekening dengan jenis single account.'
        },
        {
          number: '8',
          title: 'Apakah NPWP wajib disertakan saat pembukaan rekening?',
          expanded: false,
          content: 'Jika calon nasabah belum memiliki NPWP saat pendaftaran, wajib memberikan pernyataan bahwa yang bersangkutan belum memiliki NPWP atau berdasarkan peraturan tidak diwajibkan memiliki NPWP. Apabila di kemudian hari memiliki NPWP, wajib segera menyerahkan ke Bank.'
        },
        {
          number: '9',
          title: 'Bagaimana proses verifikasi identitas nasabah dilakukan?',
          expanded: false,
          content: 'Bank bekerja sama dengan PT Indonesia Digital Identity (VIDA) untuk memverifikasi kesesuaian data demografi dan/atau biometrik dengan data yang tercatat pada sistem instansi pemerintahan. Setelah data terverifikasi, VIDA akan menerbitkan sertifikat elektronik.'
        },
        {
          number: '10',
          title: 'Apakah tanda tangan digital yang dibubuhkan memiliki kekuatan hukum?',
          expanded: false,
          content: 'Ya, Tanda Tangan Digital yang dibubuhkan melalui Layanan E-Form memiliki kekuatan hukum yang sah dan mengikat, serta dianggap setara dengan tanda tangan basah atau perintah tertulis yang ditandatangani secara fisik.'
        },
        {
          number: '11',
          title: 'Saya sudah mengajukan transaksi melalui Layanan E-Form, apa yang terjadi selanjutnya?',
          expanded: false,
          content: 'Setelah Anda mengajukan transaksi melalui Layanan E-Form, Petugas Bank akan melakukan pengecekan terhadap data dan dokumen yang Anda ajukan.<br><br>Selanjutnya, kecuali untuk Pembukaan Rekening Tabungan, Petugas Bank akan melakukan confirmation call untuk melakukan verifikasi sebelum transaksi diproses lebih lanjut. Jika seluruh data dan dokumen dinyatakan sesuai oleh Petugas Bank kami, informasi keberhasilan atau kegagalan pengajuan transaksi akan dikirimkan ke alamat email Anda setelah proses verifikasi selesai.'
        },
        {
          number: '12',
          title: 'Apa itu confirmation call?',
          expanded: false,
          content: 'Confirmation call adalah salah satu cara yang dilakukan oleh Bank untuk melakukan proses verifikasi atau/dan konfirmasi terhadap pengajuan transaksi melalui Layanan E-Form, dengan menghubungi nomor ponsel aktif sesuai dengan yang telah diisi oleh calon nasabah/nasabah. Proses ini dilengkapi dengan perekaman suara.'
        },
        {
          number: '13',
          title: 'Kapan confirmation call dilakukan?',
          expanded: false,
          content: 'Kecuali untuk pengajuan Pembukaan Rekening Tabungan, Bank akan melakukan confirmation call pada hari kerja yang sama sebelum cut off time untuk memverifikasi transaksi yang diajukan. Apabila pengajuan transaksi melewati cut off ttime, maka dilakukan confirmation call pada hari kerja berikutnya.'
        },
        {
          number: '14',
          title: 'Apa yang terjadi jika nasabah tidak menjawab confirmation call?',
          expanded: false,
          content: 'Apabila nasabah tidak menjawab panggilan telepon dari Bank saat confirmation call, pemrosesan pengajuan transaksi tidak akan dilakukan dan akan ditunda hingga nasabah menjawab confirmation call pada hari kerja berikutnya.'
        },
        {
          number: '15',
          title: 'Apakah saya akan mendapatkan email setelah mengajukan transaksi pada Layanan E-Form?',
          expanded: false,
          content: 'Ya, Anda akan menerima email konfirmasi berisi informasi status pengajuan dan lampiran dokumen PDF dalam bentuk ZIP.'
        },
        {
          number: '16',
          title: 'Apakah Layanan E-Form aman digunakan?',
          expanded: false,
          content: 'Ya, Layanan E-Form Universal BPR telah menggunakan enkripsi data, verifikasi biometrik, dan tanda tangan digital tersertifikasi PSrE untuk memastikan keamanan data nasabah.'
        },
        {
          number: '17',
          title: 'Mengapa file PDF saya dalam format ZIP dan bagaimana cara membuka file tersebut?',
          expanded: false,
          content: 'Demi alasan keamanan, dokumen PDF Anda dikirim dalam format ZIP dan dilindungi dengan kata sandi. Hal ini bertujuan untuk memastikan dokumen hanya dapat diakses oleh pihak yang berwenang.<br><br>Untuk membuka file ZIP tersebut, gunakan kata sandi berupa tanggal lahir Anda dengan format DDMMYY, yaitu:<br><br>DD = dua digit tanggal lahir<br><br>MM = dua digit bulan lahir<br><br>YY = dua digit terakhir tahun lahir<br><br>Contoh: Jika tanggal lahir Anda adalah 23 Januari 1986, maka kata sandi yang digunakan adalah 230186.'
        },
        {
          number: '18',
          title: 'Saya mendapatkan pesan error saat mengekstrak file, apa yang harus saya lakukan?',
          expanded: false,
          content: 'Pastikan Anda mengetik kata sandi tanpa spasi. Jika tetap tidak bisa, coba gunakan aplikasi pembuka file ZIP alternatif seperti 7-Zip atau ZArchiver.<br><br>Untuk Pengguna Windows (Laptop/PC)<br>🔹 WinRAR<br>1. Buka situs resmi: https://www.win-rar.com<br>2. Pilih versi sesuai sistem Anda (32-bit atau 64-bit)<br>3. Klik “Download WinRAR”<br>4. Setelah selesai, buka file installer dan ikuti petunjuk instalasi<br><br>🔹 7-Zip<br>1. Buka situs resmi: https://www.7-zip.org<br>2. Pilih versi sesuai sistem Anda (biasanya 64-bit)<br>3. Klik “Download”, lalu jalankan file .exe untuk instalasi<br><br>📱 Untuk Pengguna Android<br>🔹 ZArchiver<br>1. Buka aplikasi Google Play Store<br>2. Cari “ZArchiver”<br>3. Pilih aplikasi dengan nama pengembang “ZDevs”<br>4. Klik “Install”<br>5. Setelah terpasang, buka aplikasi dan cari file ZIP yang ingin diekstrak<br><br>Catatan:<br>Pastikan Anda hanya mengunduh dari situs resmi atau toko aplikasi terpercaya untuk menghindari aplikasi palsu atau berbahaya.<br><br>Jika Anda menggunakan iPhone/iOS, file ZIP bisa dibuka langsung menggunakan aplikasi bawaan "File", tetapi tidak mendukung password. Disarankan gunakan perangkat laptop/Android untuk membuka file ZIP berpassword.'
        },
        {
          number: '19',
          title: 'Bagaimana jika terjadi kendala atau keluhan?',
          expanded: false,
          content: 'Pengajuan pengaduan terhadap produk/layanan perbankan via telepon dapat dilakukan melalui jaringan kantor Bank atau Universal Care di (021) 2221-3993 atau melalui email ke customercare@universalbpr.co.id.'
        },
        {
          number: '20',
          title: 'Apakah dana yang disimpan di Universal BPR dijamin?',
          expanded: false,
          content: 'Dana yang tersedia dalam Rekening milik nasabah dijamin oleh program penjaminan yang diselenggarakan Lembaga Penjamin Simpanan (LPS) sesuai dengan syarat dan ketentuan yang ditetapkan oleh LPS.'
        }
      ]
    };
  },
  methods: {
    toggleExpand(index) {
      // Mengubah status 'expanded' untuk bagian yang diklik
      this.sections[index].expanded = !this.sections[index].expanded;
    }
    // Metode goBack dihapus karena tidak ada tombol kembali di template baru ini
  }
};
</script>

<style scoped>
/* Gaya yang spesifik untuk layout utama, jika ada.
   Gaya untuk elemen-elemen individual sekarang ada di komponen masing-masing. */
</style>

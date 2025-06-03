import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import MainLayout from "../views/MainLayout.vue";
import MainLayoutInfo from "../views/MainLayoutInfo.vue";

// Pembukaan Rekening NTB
import PembukaanRekeningNTB from "../views/PembukaanRekeningNTB/pembukaan-rekening.vue";
import verifikasiEmailPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/verifikasi-email.vue";
import UploadFilePembukaanRekeningNTB from "../views/PembukaanRekeningNTB/upload-dokumen.vue";
import NpwpNTB from "../views/PembukaanRekeningNTB/npwp-s&k.vue";
import PreviewScreenPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/preview-dokumen.vue";
import DataPribadiPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-pribadi.vue";
import DataKTPPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-ktp.vue";
import DataPekerjaanPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-pekerjaan.vue";
import KonfirmasiDataPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/konfirmasi-data.vue";
import TandaTanganDigitalPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/tanda-tangan-digital.vue";
import HalamanSuksesPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/halaman-sukses.vue";

// Pembukaan Rekening Existing
import PembukaanRekeningExisting from "../views/PembukaanRekeningExisting/pembukaan-rekening-existing.vue";
import verifikasiEmailPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/verifikasi-email.vue";
import UploadFilePembukaanRekeningExisting from "../views/PembukaanRekeningExisting/upload-dokumen.vue";
import PreviewScreenPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/preview-dokumen.vue";
import PerubahanDataPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/perubahan-data.vue";
import DataKTPPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/data-ktp.vue";
import KonfirmasiDataPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/konfirmasi-data.vue";
import HalamanSuksesPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/halaman-sukses.vue";
import TandaTanganDigitalPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/tanda-tangan-digital.vue";

// Pembukaan Deposito NTB
import PenempatanDepositoNTB from "../views/PenempatanDepositoNTB/penempatan-deposito.vue";
import VerifikasiEmailPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/verifikasi-email.vue";
import DataPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/data-penempatan.vue";
import NpwpDepositoNTB from "../views/PenempatanDepositoNTB/npwp-s&k.vue";
import UploadFilePenempatanDepositoNTB from "../views/PenempatanDepositoNTB/upload-dokumen.vue";
import PreviewScreenPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/preview-dokumen.vue";
import DataPribadiPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/data-pribadi.vue";
import DataKTPPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/data-ktp.vue";
import DataPekerjaanPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/data-pekerjaan.vue";
import KonfirmasiDataPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/konfirmasi-data.vue";
import HalamanSuksesPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/halaman-sukses.vue";
import HomePage from "../views/HomePage.vue";
import TandaTanganDigitalPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/tanda-tangan-digital.vue";

// Pembukaan Rekening Existing
import PenempatanDepositoExisting from "../views/PenempatanDepositoExisting/penempatan-deposito-existing.vue";
import verifikasiEmailPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/verifikasi-email.vue";
import DataPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/data-penempatan.vue";
import UploadFilePenempatanDepositoExisting from "../views/PenempatanDepositoExisting/upload-dokumen.vue";
import PreviewScreenPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/preview-dokumen.vue";
import PerubahanDataPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/perubahan-data.vue";
import DataKTPPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/data-ktp.vue";
import KonfirmasiDataPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/konfirmasi-data.vue";
import HalamanSuksesPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/halaman-sukses.vue";
import TandaTanganDigitalPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/tanda-tangan-digital.vue";

// Pengkinian Data
import PengkinianData from "../views/PengkinianData/pengkinian-data.vue";
import UploadDokumenPengkinianData from "../views/PengkinianData/upload-dokumen.vue";
import PreviewScreenPengkinianData from "../views/PengkinianData/preview-dokumen.vue";
import DataPribadiPengkinianData from "../views/PengkinianData/data-pribadi.vue";
import DataKTPPengkinianData from "../views/PengkinianData/data-ktp.vue";
import DataPekerjaanPengkinianData from "../views/PengkinianData/data-pekerjaan.vue";
import KonfirmasiDataPengkinianData from "../views/PengkinianData/konfirmasi-data.vue";
import HalamanSuksesPengkinianData from "../views/PengkinianData/halaman-sukses.vue";
import TandaTanganDigitalPengkinianData from "../views/PengkinianData/tanda-tangan-digital.vue";


// Penutupan Deposito
import PencairanDeposito from "../views/PencairanDeposito/onBoarding.vue";
import FormPencairanDeposito from "../views/PencairanDeposito/pencairan-deposito.vue";
import verifikasiEmailPencairanDeposito from "../views/PencairanDeposito/verifikasi-email.vue";
import UploadDokumenPencairanDeposito from "../views/PencairanDeposito/upload-dokumen.vue";
import PreviewScreenPencairanDeposito from "../views/PencairanDeposito/preview-dokumen.vue";
import DataKTPPencairanDeposito from "../views/PencairanDeposito/data-ktp.vue";
import DataInstruksiPencairanDeposito from "../views/PencairanDeposito/instruksi-pencairan-deposito.vue";
import DataPencairanDepositoOnUs from "../views/PencairanDeposito/data-pencairan-onUs.vue";
import DataPencairanDepositoOfUs from "../views/PencairanDeposito/data-pencairan-ofUs.vue";
import KonfirmasiDataPencairanDeposito from "../views/PencairanDeposito/konfirmasi-data.vue";
import EmailOTPPencairanDeposito from "../views/PencairanDeposito/otp-no-hp.vue";
import HalamanSuksesPencairanDeposito from "../views/PencairanDeposito/halaman-sukses.vue";
import TandaTanganDigitalPencairanDeposito from "../views/PencairanDeposito/tanda-tangan-digital.vue";

// Pemindahbukuan
import PemindahBukuan from "../views/Pemindahbukuan/onBoarding.vue";
import FormPemindahbukuan from "../views/Pemindahbukuan/pemindahbukuan.vue";
import verifikasiEmailPemindahbukuan from "../views/Pemindahbukuan/verifikasi-email.vue";
import UploadDokumenPemindahbukuan from "../views/Pemindahbukuan/upload-dokumen.vue";
import PreviewScreenPemindahbukuan from "../views/Pemindahbukuan/preview-dokumen.vue";
import DataKTPPemindahbukuan from "../views/Pemindahbukuan/data-ktp.vue";
import DataPengirimPemindahbukuan from "../views/Pemindahbukuan/data-pengirim.vue";
import DataPenerimaPemindahbukuan from "../views/Pemindahbukuan/data-penerima.vue";
import KonfirmasiDataPemindahbukuan from "../views/Pemindahbukuan/konfirmasi-data.vue";
import EmailOTPPemindahbukuan from "../views/Pemindahbukuan/otp-no-hp.vue";
import HalamanSuksesPemindahbukuan from "../views/Pemindahbukuan/halaman-sukses.vue";
import TandaTanganDigitalPemindahbukuan from "../views/Pemindahbukuan/tanda-tangan-digital.vue";

// Other
import InfoProdukPembukaanRekeningNTB from "../views/Other/infoProdukPembukaanRekeningNTB.vue";
import InfoProdukPembukaanRekeningExisting from "../views/Other/infoProdukPembukaanRekeningExisting.vue";
import InfoProdukPenempatanDepositoNTB from "../views/Other/infoProdukPenempatanDepositoNTB.vue";
import InfoProdukPenempatanDepositoExisting from "../views/Other/infoProdukPenempatanDepositoExisting.vue";
import InfoProdukPencairanDeposito from "../views/Other/infoProdukPencairanDeposito.vue";
import InfoProdukPengkinianData from "../views/Other/infoProdukPengkinianData.vue";
import InfoProdukPemindahbukuan from "../views/Other/infoProdukPemindahbukuan.vue";
// import { title } from "node:process";


const routes = [
  {
    path: "/",
    component: HomePage,
  },

  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/pencairanDepositoRegular/",
    component: PencairanDeposito,
  },
  {
    path: "/pemindahbukuan/",
    component: PemindahBukuan,
  },
  {
    path: "/dashboard",
    name: "MainLayoutInfo",
    component: MainLayoutInfo,
    children: [
      {
        path: "infoProdukPembukaanRekeningNTB",
        name: "infoProdukPembukaanRekeningNTB",
        component: InfoProdukPembukaanRekeningNTB,
        meta: {
          title: "Pembukaan Rekening Non-Nasabah",
          // subtitle: "Dapatkan informasi lengkap mengenai jenis rekening dan panduan pembukaan untuk nasabah non-eksisting.",
          centerTitle: true
        },
      },
      {
        path: "infoProdukPembukaanRekeningExisting",
        name: "infoProdukPembukaanRekeningExisting",
        component: InfoProdukPembukaanRekeningExisting,
        meta: {
          title: "Pembukaan Rekening Nasabah",
          centerTitle: true
        },
      },
      {
        path: "infoProdukPenempatanDepositoNTB",
        name: "infoProdukPenempatanDepositoNTB",
        component: InfoProdukPenempatanDepositoNTB,
        meta: {
          title: "Pembukaan Deposito Non-Nasabah",
          centerTitle: true
        },
      },
      {
        path: "infoProdukPenempatanDepositoExisting",
        name: "infoProdukPenempatanDepositoExisting",
        component: InfoProdukPenempatanDepositoExisting,
        meta: {
          title: "Pembukaan Deposito",
          centerTitle: true
        },
      },
      {
        path: "infoProdukPengkinianData",
        name: "infoProdukPengkinianData",
        component: InfoProdukPengkinianData,
        meta: {
          title: "Pengkinian Data",
          centerTitle: true
        },
      },
      {
        path: "infoProdukPencairanDeposito",
        name: "infoProdukPencairanDeposito",
        component: InfoProdukPencairanDeposito,
        meta: {
          title: "Penutupan Deposito",
          centerTitle: true
        },
      },
      {
        path: "infoProdukPemindahbukuan",
        name: "infoProdukPemindahbukuan",
        component: InfoProdukPemindahbukuan,
        meta: {
          title: "Transfer",
          centerTitle: true
        },
      },
    ]
  },

  {
    path: "/dashboard",
    name: "MainLayout",
    component: MainLayout,
    children: [
      // Pembukaan Rekening NTB
      {
        path: "pembukaanRekeningNTB",
        name: "pembukaanRekeningNTB",
        component: PembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Halo, Senang Bertemu Dengan Anda.",
          subtitle: "Yuk, pilih produk yang diinginkan dan isi data dirimu terlebih dahulu",
        },
      },
      {
        path: "verifikasiEmailPembukaanRekeningNTB",
        name: "VerifikasiEmailPembukaanRekeningNTB",
        component: verifikasiEmailPembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Verifikasi Email",
          centerTitle: true
        },
      },
      {
        path: "dataPribadiPembukaanRekeningNTB",
        name: "DataPribadiPembukaanRekeningNTB",
        component: DataPribadiPembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Data Pribadi",
          subtitle: "Bantu kami mengenal Anda untuk memberikan layanan sesuai kebutuhan dengan memberikan tambahan informasi yang tidak tercakup dalam E-KTP Anda."
        },
      },
      {
        path: "uploadDokumenPembukaanRekeningNTB",
        name: "UploadDokumenPembukaanRekeningNTB",
        component: UploadFilePembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Upload Dokumen",
          subtitle: "Lengkapi dokumen yang dibutuhkan untuk melanjutkan pembukaan rekening"
        },
      },
      {
        path: "npwpNTB",
        name: "NpwpNTB",
        component: NpwpNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Pernyatan berkaitan NPWP",
          subtitle: "Bahwa berkaitan dengan pemenuhan NPWP untuk pembukaan rekening,"
        },
      },
      {
        path: "previewScreenPembukaanRekeningNTB", // Path tanpa parameter
        name: "PreviewScreenPembukaanRekeningNTB",
        component: PreviewScreenPembukaanRekeningNTB,
        meta: {
          persistNavbar: true,
          feature: "Pembukaan Rekening Baru",
          title: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Foto e-KTP';
              case 'npwp':
                return 'Foto NPWP';
              case 'tandaTangan':
                return 'Foto Tanda Tangan';
              case 'fotoDiri':
                return 'Ambil Foto Wajah';
              default:
                return 'Hasil Foto';
            }
          },
          subtitle: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            // console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Pastikan foto e-KTP Anda memiliki kualitas yang baik sehingga semua informasi dapat terbaca dengan jelas. Jika sudah memenuhi syarat, foto tersebut dapat langsung diunggah atau diupload.';
              case 'npwp':
                return 'Pastikan foto NPWP Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto NPWP Anda bisa digunakan.';
              case 'tandaTangan':
                return 'Pastikan foto tanda tangan Anda terlihat jelas. Jika sudah, foto tanda tangan Anda bisa digunakan.';
              case 'fotoDiri':
                return 'Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto Anda bisa digunakan.';
              default:
                return 'Hasil Foto';
            }
          },
        },
        // Props bisa Anda sesuaikan jika Anda ingin menerima query sebagai props
        // props: (route) => ({
        //   documentType: route.query.documentType,
        // }),
      },
      {
        path: "dataKTPPembukaanRekeningNTB",
        name: "DataKTPPembukaanRekeningNTB",
        component: DataKTPPembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Data E-KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian, Anda dapat memperbaikinya terlebih dahulu sebelum melanjutkan proses pembukaan rekening.",
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "konfirmasiDataPembukaanRekeningNTB",
        name: "konfirmasiDataPembukaanRekeningNTB",
        component: KonfirmasiDataPembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Yuk, Konfirmasi Semua Data Anda",
          subtitle: "Sebelum selesai, mohon untuk periksa kembali data yang telah Anda isi",
        },
      },
      {
        path: "dataPekerjaanPembukaanRekeningNTB",
        name: "DataPekerjaanPembukaanRekeningNTB",
        component: DataPekerjaanPembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Data Pekerjaan & Finansial",
          subtitle:
            "Untuk melanjutkan proses, kami memerlukan informasi tambahan mengenai pekerjaan Anda.",
        },
      },
      {
        path: "tandaTanganDigitalPembukaanRekeningNTB",
        name: "tandaTanganDigitalPembukaanRekeningNTB",
        component: TandaTanganDigitalPembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Tanda Tangan Digital"
        },
      },
      {
        path: "halamanSuksesPembukaanRekeningNTB",
        name: "halamanSuksesPembukaanRekeningNTB",
        component: HalamanSuksesPembukaanRekeningNTB,
        meta: {
          feature: "Pembukaan Rekening Baru",
        },
      },

      // Pembukaan Rekening Existing
      {
        path: "pembukaanRekeningExisting",
        name: "pembukaanRekeningExisting",
        component: PembukaanRekeningExisting,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Halo, Senang Bertemu dengan Anda Kembali",
          subtitle: "Yuk, pilih produk yang diinginkan dan isi data dirimu terlebih dahulu"
        },
      },
      {
        path: "verifikasiEmailPembukaanRekeningExisting",
        name: "VerifikasiEmailPembukaanRekeningExisting",
        component: verifikasiEmailPembukaanRekeningExisting,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Verifikasi Email",
          centerTitle: true
        },
      },
      {
        path: "uploadDokumenPembukaanRekeningExisting",
        name: "UploadDokumenPembukaanRekeningExisting",
        component: UploadFilePembukaanRekeningExisting,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Upload Dokumen",
          subtitle: "Lengkapi dokumen yang dibutuhkan untuk melanjutkan pembukaan rekening"
        },
      },
      {
        path: "previewScreenPembukaanRekeningExisting",
        name: "PreviewScreenPembukaanRekeningExisting",
        component: PreviewScreenPembukaanRekeningExisting,
        meta: {
          persistNavbar: true,
          feature: "Pembukaan Rekening Baru",
          title: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Foto e-KTP';
              case 'fotoDiri':
                return 'Ambil Foto Wajah';
              default:
                return 'Hasil Foto';
            }
          },
          subtitle: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            // console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Pastikan foto e-KTP Anda memiliki kualitas yang baik sehingga semua informasi dapat terbaca dengan jelas. Jika sudah memenuhi syarat, foto tersebut dapat langsung diunggah atau diupload.';
              case 'fotoDiri':
                return 'Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto Anda bisa digunakan.';
              default:
                return 'Hasil Foto';
            }
          },
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "dataKTPPembukaanRekeningExisting",
        name: "DataKTPPembukaanRekeningExisting",
        component: DataKTPPembukaanRekeningExisting,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Data E-KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian, Anda dapat memperbaikinya terlebih dahulu sebelum melanjutkan proses pembukaan rekening.",
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "perubahanDataPembukaanRekeningExisting",
        name: "PerubahanDataPembukaanRekeningExisting",
        component: PerubahanDataPembukaanRekeningExisting,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Pembaharuan Data",
          subtitle:
            'Pastikan informasi pribadi Anda selalu terbaru untuk kelancaran transaksi dan komunikasi. Pembaharuan data dapat dilakukan dengan memilih opsi "YA" pada pertanyaan dibawah ini',
        },
      },
      {
        path: "konfirmasiDataPembukaanRekeningExisting",
        name: "konfirmasiDataPembukaanRekeningExisting",
        component: KonfirmasiDataPembukaanRekeningExisting,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Yuk, Konfirmasi Semua Data Anda", subtitle: "Sebelum selesai, mohon untuk periksa kembali data yang telah Anda isi"
        },
      },
      {
        path: "tandaTanganDigitalPembukaanRekeningExisting",
        name: "tandaTanganDigitalPembukaanRekeningExisting",
        component: TandaTanganDigitalPembukaanRekeningExisting,
        meta: {
          feature: "Pembukaan Rekening Baru",
          title: "Tanda Tangan Digital"
        },
      },
      {
        path: "halamanSuksesPembukaanRekeningExisting",
        name: "halamanSuksesPembukaanRekeningExisting",
        component: HalamanSuksesPembukaanRekeningExisting,
        meta: {
          feature: "Pembukaan Rekening Baru",
        },
      },

      {
        path: "penempatanDepositoNTB",
        name: "PenempatanDepositoNTB",
        component: PenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Halo, Senang Bertemu Dengan Anda",
          subtitle: "Sebagai calon Nasabah BPR Universal yang hendak membuka deposito, Anda diwajibkan terlebih dahulu membuka rekening Tabungan Universal sebagai rekening penyetoran dana deposito. Silakan pilih produk Tabungan Universal di bawah ini, lalu lanjutkan dengan memilih produk deposito, dan mengisi data diri Anda."
        },
      },
      {
        path: "verifikasiEmailPenempatanDepositoNTB",
        name: "verifikasiEmailPenempatanDepositoNTB",
        component: VerifikasiEmailPenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Verifikasi Email",
          centerTitle: true
        },
      },
      {
        path: "dataPenempatanDepositoNTB",
        name: "dataPenempatanDepositoNTB",
        component: DataPenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Pembukaan Deposito",
          subtitle:
            "Tentukan nominal dan jangka waktu Deposito. Kami akan coba perhitungkan bunganya!",
        },
      },
      {
        path: "npwpDepositoNTB",
        name: "NpwpDepositoNTB",
        component: NpwpDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Pernyatan berkaitan NPWP",
          subtitle: "Bahwa berkaitan dengan pemenuhan NPWP untuk pembukaan rekening,"
        },
      },
      {
        path: "uploadDokumenPenempatanDepositoNTB",
        name: "UploadDokumenPenempatanDepositoNTB",
        component: UploadFilePenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Upload Dokumen",
          subtitle:
            "Lengkapi dokumen yang dibutuhkan untuk melanjutkan pembukaan rekening",
        },
      },
      {
        path: "previewPenempatanDepositoNTB",
        name: "PreviewScreenPenempatanDepositoNTB",
        component: PreviewScreenPenempatanDepositoNTB,
        meta: {
          persistNavbar: true,
          feature: "Pembukaan Deposito",
          title: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Foto e-KTP';
              case 'npwp':
                return 'Foto NPWP';
              case 'tandaTangan':
                return 'Foto Tanda Tangan';
              case 'fotoDiri':
                return 'Ambil Foto Wajah';
              default:
                return 'Hasil Foto';
            }
          },
          subtitle: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            // console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Pastikan foto e-KTP Anda memiliki kualitas yang baik sehingga semua informasi dapat terbaca dengan jelas. Jika sudah memenuhi syarat, foto tersebut dapat langsung diunggah atau diupload.';
              case 'npwp':
                return 'Pastikan foto NPWP Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto NPWP Anda bisa digunakan.';
              case 'tandaTangan':
                return 'Pastikan foto tanda tangan Anda terlihat jelas. Jika sudah, foto tanda tangan Anda bisa digunakan.';
              case 'fotoDiri':
                return 'Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto Anda bisa digunakan.';
              default:
                return 'Hasil Foto';
            }
          },
        },
        props: (route) => ({
          documentType: route.params.documentType, // Ambil documentType dari params
        }),
      },
      {
        path: "dataKTPPenempatanDepositoNTB",
        name: "DataKTPPenempatanDepositoNTB",
        component: DataKTPPenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Data E-KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian, Anda dapat memperbaikinya terlebih dahulu sebelum melanjutkan proses pembukaan rekening.",
        },
      },
      {
        path: "dataPribadiPenempatanDepositoNTB",
        name: "DataPribadiPenempatanDepositoNTB",
        component: DataPribadiPenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Data Pribadi",
          subtitle:
            "Bantu kami mengenal Anda untuk memberikan layanan sesuai kebutuhan dengan memberikan tambahan informasi yang tidak tercakup dalam E-KTP Anda.",
        },
      },
      {
        path: "konfirmasiDataPenempatanDepositoNTB",
        name: "konfirmasiDataPenempatanDepositoNTB",
        component: KonfirmasiDataPenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Yuk, Konfirmasi Semua Data Anda", subtitle: "Sebelum selesai, mohon untuk periksa kembali data yang telah Anda isi",
        },
      },
      {
        path: "dataPekerjaanPenempatanDepositoNTB",
        name: "DataPekerjaanPenempatanDepositoNTB",
        component: DataPekerjaanPenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Data Pekerjaan & Finansial"
        },
      },
      {
        path: "tandaTanganDigitalPenempatanDepositoNTB",
        name: "tandaTanganDigitalPenempatanDepositoNTB",
        component: TandaTanganDigitalPenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Tanda Tangan Digital"
        },
      },
      {
        path: "halamanSuksesPenempatanDepositoNTB",
        name: "halamanSuksesPenempatanDepositoNTB",
        component: HalamanSuksesPenempatanDepositoNTB,
        meta: {
          feature: "Pembukaan Deposito",
        },
      },

      // Pembukaan Deposito Existing
      {
        path: "penempatanDepositoExisting",
        name: "penempatanDepositoExisting",
        component: PenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Halo, Senang Bertemu Dengan Anda Kembali",
          subtitle: "Yuk, pilih produk yang diinginkan dan isi data dirimu terlebih dahulu!"
        },
      },
      {
        path: "verifikasiEmailPenempatanDepositoExisting",
        name: "VerifikasiEmailPenempatanDepositoExisting",
        component: verifikasiEmailPenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Verifikasi Email",
          centerTitle: true
        },
      },
      {
        path: "dataPenempatanDepositoExisting",
        name: "dataPenempatanDepositoExisting",
        component: DataPenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Pembukaan Deposito",
          subtitle:
            "Tentukan nominal dan jangka waktu Deposito. Kami akan coba perhitungkan bunganya!",
        },
      },
      {
        path: "uploadDokumenPenempatanDepositoExisting",
        name: "UploadDokumenPenempatanDepositoExisting",
        component: UploadFilePenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Upload Dokumen",
          subtitle: "Lengkapi dokumen yang dibutuhkan untuk melanjutkan pembukaan rekening"
        },
      },
      {
        path: "previewScreenPenempatanDepositoExisting",
        name: "PreviewScreenPenempatanDepositoExisting",
        component: PreviewScreenPenempatanDepositoExisting,
        meta: {
          persistNavbar: true,
          feature: "Pembukaan Deposito",
          title: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Foto e-KTP';
              case 'npwp':
                return 'Foto NPWP';
              case 'tandaTangan':
                return 'Foto Tanda Tangan';
              case 'fotoDiri':
                return 'Ambil Foto Wajah';
              default:
                return 'Hasil Foto';
            }
          },
          subtitle: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            // console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Pastikan foto e-KTP Anda memiliki kualitas yang baik sehingga semua informasi dapat terbaca dengan jelas. Jika sudah memenuhi syarat, foto tersebut dapat langsung diunggah atau diupload.';
              case 'fotoDiri':
                return 'Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto Anda bisa digunakan.';
              default:
                return 'Hasil Foto';
            }
          },
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "dataKTPPenempatanDepositoExisting",
        name: "DataKTPPenempatanDepositoExisting",
        component: DataKTPPenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Data E-KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian, Anda dapat memperbaikinya terlebih dahulu sebelum melanjutkan proses pembukaan rekening.",
        },
      },
      {
        path: "perubahanDataPenempatanDepositoExisting",
        name: "PerubahanDataPenempatanDepositoExisting",
        component: PerubahanDataPenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Pembaharuan Data",
          subtitle:
            'Pastikan informasi pribadi Anda selalu terbaru untuk kelancaran transaksi dan komunikasi. Pembaharuan data dapat dilakukan dengan memilih opsi "YA" pada pertanyaan dibawah ini',
        },
      },
      {
        path: "konfirmasiDataPenempatanDepositoExisting",
        name: "konfirmasiDataPenempatanDepositoExisting",
        component: KonfirmasiDataPenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Yuk, Konfirmasi Semua Data Anda", subtitle: "Periksa semua informasi yang Anda isi sebelum melanjutkan ke pengiriman formulir."
        },
      },
      {
        path: "tandaTanganDigitalPenempatanDepositoExisting",
        name: "tandaTanganDigitalPenempatanDepositoExisting",
        component: TandaTanganDigitalPenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
          title: "Tanda Tangan Digital"
        },
      },
      {
        path: "halamanSuksesPenempatanDepositoExisting",
        name: "halamanSuksesPenempatanDepositoExisting",
        component: HalamanSuksesPenempatanDepositoExisting,
        meta: {
          feature: "Pembukaan Deposito",
        },
      },

      // Pengkinian Data
      {
        path: "pengkinianData",
        name: "pengkinianData",
        component: PengkinianData,
        meta: {
          feature: "Pengkinian Data",
          title: "Formulir Pengkinian Data",
          subtitle: ""
        },
      },
      {
        path: "uploadDokumenPengkinianData",
        name: "UploadDokumenPengkinianData",
        component: UploadDokumenPengkinianData,
        meta: {
          feature: "Pengkinian Data",
          title: "Upload Dokumen",
          subtitle: "Lengkapi dokumen yang dibutuhkan untuk melanjutkan pembukaan rekening"
        },
      },
      {
        path: "previewPengkinianData",
        name: "PreviewScreenPengkinianData",
        component: PreviewScreenPengkinianData,
        meta: {
          persistNavbar: true,
          feature: "Pengkinian Data",
          title: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Foto e-KTP';
              case 'npwp':
                return 'Foto NPWP';
              case 'tandaTangan':
                return 'Foto Tanda Tangan';
              case 'fotoDiri':
                return 'Ambil Foto Wajah';
              default:
                return 'Hasil Foto';
            }
          },
          subtitle: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            // console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Pastikan foto e-KTP Anda memiliki kualitas yang baik sehingga semua informasi dapat terbaca dengan jelas. Jika sudah memenuhi syarat, foto tersebut dapat langsung diunggah atau diupload.';
              case 'fotoDiri':
                return 'Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto Anda bisa digunakan.';
              default:
                return 'Hasil Foto';
            }
          },
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "dataKTPPengkinianData",
        name: "DataKTPPengkinianData",
        component: DataKTPPengkinianData,
        meta: {
          feature: "Pengkinian Data",
          title: "Data E-KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian pada data, Anda dapat segera memperbaikinya sebelum proses dilanjutkan.",
        },
      },
      {
        path: "dataPribadiPengkinianData",
        name: "DataPribadiPengkinianData",
        component: DataPribadiPengkinianData,
        meta: {
          feature: "Pengkinian Data",
          title: "Data Pribadi",
          subtitle:
            "Untuk mendukung proses pengkinian data, silakan lengkapi informasi tambahan yang diperlukan di bawah ini.",
        },
      },
      {
        path: "konfirmasiDataPengkinianData",
        name: "konfirmasiDataPengkinianData",
        component: KonfirmasiDataPengkinianData,
        meta: {
          feature: "Pengkinian Data",
          title: "Yuk, Konfirmasi Semua Data Anda", subtitle: "Sebelum selesai, mohon untuk periksa kembali data yang telah Anda isi"
        },
      },
      {
        path: "dataPekerjaanPengkinianData",
        name: "DataPekerjaanPengkinianData",
        component: DataPekerjaanPengkinianData,
        meta: {
          feature: "Pengkinian Data",
          title: "Data Pekerjaan & Finansial"
        },
      },
      {
        path: "tandaTanganDigitalPengkinianData",
        name: "tandaTanganDigitalPengkinianData",
        component: TandaTanganDigitalPengkinianData,
        meta: {
          feature: "Pengkinian Data",
          title: "Tanda Tangan Digital"
        },
      },
      {
        path: "halamanSuksesPengkinianData",
        name: "halamanSuksesPengkinianData",
        component: HalamanSuksesPengkinianData,
        meta: {
          feature: "Pengkinian Data",
        },
      },

      // Penutupan Deposito
      {
        path: "formPencairanDeposito",
        name: "formPencairanDeposito",
        component: FormPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
          title: "Formulir Permohonan Penutupan Deposito",
          subtitle: "Silakan isi formulir berikut untuk mengajukan penutupan deposito Anda. Pastikan semua informasi yang diberikan akurat agar proses pengajuan dapat berjalan dengan lancar."
        },
      },
      {
        path: "verifikasiEmailPencairanDeposito",
        name: "VerifikasiEmailPencairanDeposito",
        component: verifikasiEmailPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
          title: "Email Verifikasi",
          centerTitle: true
        },
      },
      {
        path: "uploadDokumenPencairanDeposito",
        name: "uploadDokumenPencairanDeposito",
        component: UploadDokumenPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
          title: "Upload Dokumen",
          subtitle: "Lengkapi dokumen yang dibutuhkan untuk melanjutkan pembukaan rekening"
        },
      },
      {
        path: "previewPencairanDeposito",
        name: "PreviewScreenPencairanDeposito",
        component: PreviewScreenPencairanDeposito,
        meta: {

          feature: "Penutupan Deposito",
          title: "Hasil Foto",
          persistNavbar: true,
          title: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Foto e-KTP';
              case 'npwp':
                return 'Foto NPWP';
              case 'tandaTangan':
                return 'Foto Tanda Tangan';
              case 'fotoDiri':
                return 'Ambil Foto Wajah';
              default:
                return 'Hasil Foto';
            }
          },
          subtitle: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            // console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Pastikan foto e-KTP Anda memiliki kualitas yang baik sehingga semua informasi dapat terbaca dengan jelas. Jika sudah memenuhi syarat, foto tersebut dapat langsung diunggah atau diupload.';
              case 'fotoDiri':
                return 'Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto Anda bisa digunakan.';
              default:
                return 'Hasil Foto';
            }
          },
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "dataKTPPencairanDeposito",
        name: "DataKTPPencairanDeposito",
        component: DataKTPPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
          title: "Data E-KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian pada data, Anda dapat segera memperbaikinya sebelum proses dilanjutkan.",
        },
      },
      {
        path: "dataInstruksiPencairanDeposito",
        name: "dataInstruksiPencairanDeposito",
        component: DataInstruksiPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
          title: "Instruksi Penutupan Deposito",
          subtitle:
            "Untuk dapat memproses penutupan deposito Anda, kami memerlukan beberapa informasi tambahan. Mohon lengkapi informasi yang diperlukan agar proses dapat berjalan dengan lancar",
        },
      },
      {
        path: "dataPencairanDepositoOnUs",
        name: "dataPencairanDepositoOnUs",
        component: DataPencairanDepositoOnUs,
        meta: {
          feature: "Penutupan Deposito",
          title: "Penutupan Deposito ke Sesama Bank BPR Universal",
          subtitle:
            "Bantu kami mengenal Anda untuk memberikan layanan sesuai kebutuhan dengan memberikan tambahan informasi yang tidak tercakup dalam E-KTP Anda.",
        },
      },
      {
        path: "dataPencairanDepositoOfUs",
        name: "dataPencairanDepositoOfUs",
        component: DataPencairanDepositoOfUs,
        meta: {
          feature: "Penutupan Deposito",
          title: "Penutupan Deposito ke Bank Lain",
          subtitle:
            "Bantu kami mengenal Anda untuk memberikan layanan sesuai kebutuhan dengan memberikan tambahan informasi yang tidak tercakup dalam E-KTP Anda.",
        },
      },
      {
        path: "konfirmasiDataPencairanDeposito",
        name: "konfirmasiDataPencairanDeposito",
        component: KonfirmasiDataPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
          title: "Konfirmasi Semua Data Anda",
          subtitle: "Periksa semua informasi yang Anda isi sebelum melanjutkan ke pengiriman formulir."
        },
      },
      {
        path: "emailOTPPencairanDeposito",
        name: "emailOTPPencairanDeposito",
        component: EmailOTPPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
          title: "Konfirmasi OTP"
        },
      },
      {
        path: "tandaTanganDigitalPencairanDeposito",
        name: "tandaTanganDigitalPencairanDeposito",
        component: TandaTanganDigitalPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
          title: "Tanda Tangan Digital"
        },
      },
      {
        path: "halamanSuksesPencairanDeposito",
        name: "halamanSuksesPencairanDeposito",
        component: HalamanSuksesPencairanDeposito,
        meta: {
          feature: "Penutupan Deposito",
        },
      },


      //Pemindahbukuan
      {
        path: "formPemindahbukuan",
        name: "formPemindahbukuan",
        component: FormPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Formulir Elektronik Transfer",
          subtitle: "Silakan isi formulir berikut untuk mengajukan transaksi  Transfer Anda. Pastikan semua informasi yang diberikan akurat agar proses pengajuan dapat berjalan dengan lancar."
        },
      },
      {
        path: "verifikasiEmailPemindahbukuan",
        name: "verifikasiEmailPemindahbukuan",
        component: verifikasiEmailPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Verifikasi Email",
          centerTitle: true
        },
      },
      {
        path: "uploadDokumenPemindahbukuan",
        name: "uploadDokumenPemindahbukuan",
        component: UploadDokumenPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Upload Dokumen",
          subtitle: "Lengkapi dokumen yang dibutuhkan untuk melanjutkan pembukaan rekening"
        },
      }, {
        path: "previewPemindahbukuan",
        name: "previewScreenPemindahbukuan",
        component: PreviewScreenPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Hasil Foto",
          persistNavbar: true,
          title: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Foto e-KTP';
              case 'npwp':
                return 'Foto NPWP';
              case 'tandaTangan':
                return 'Foto Tanda Tangan';
              case 'fotoDiri':
                return 'Ambil Foto Wajah';
              default:
                return 'Hasil Foto';
            }
          },
          subtitle: (route) => {
            const documentTypes = route.query.documentType; // Baca dari query parameters
            // console.log('Nilai documentType di meta.title:', documentTypes);
            switch (documentTypes) {
              case 'ktp':
                return 'Pastikan foto e-KTP Anda memiliki kualitas yang baik sehingga semua informasi dapat terbaca dengan jelas. Jika sudah memenuhi syarat, foto tersebut dapat langsung diunggah atau diupload.';
              case 'fotoDiri':
                return 'Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto Anda bisa digunakan.';
              default:
                return 'Hasil Foto';
            }
          },
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "dataKTPPemindahbukuan",
        name: "dataKTPPemindahbukuan",
        component: DataKTPPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Data E-KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian pada data, Anda dapat segera memperbaikinya sebelum proses dilanjutkan.",
        },
      },
      {
        path: "konfirmasiDataPemindahbukuan",
        name: "konfirmasiDataPemindahbukuan",
        component: KonfirmasiDataPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Yuk, Konfirmasi Semua Data Anda", subtitle: "Sebelum selesai, mohon untuk periksa kembali data yang telah Anda isi"
        },
      },
      {
        path: "dataPengirimPemindahbukuan",
        name: "dataPengirimPemindahbukuan",
        component: DataPengirimPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Lengkapi Data Pengirim dan Penerima",
          subtitle: "Silakan lengkapi informasi data diri Pengirim dan Penerima secara lengkap dan sesuai dengan identitas asli masing-masing pihak agar proses transfer dapat diproses dengan aman dan akurat."

        },
      },
      {
        path: "dataPenerimaPemindahbukuan",
        name: "dataPenerimaPemindahbukuan",
        component: DataPenerimaPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Lengkapi Data Penerima",
          subtitle: "Untuk melanjutkan proses, kami memerlukan informasi tambahan terkait data penerima sumber dana."

        },
      },
      {
        path: "emailOTPPemindahbukuan",
        name: "emailOTPPemindahbukuan",
        component: EmailOTPPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Konfirmasi OTP"
        },
      },
      {
        path: "tandaTanganDigitalPemindahbukuan",
        name: "tandaTanganDigitalPemindahbukuan",
        component: TandaTanganDigitalPemindahbukuan,
        meta: {
          feature: "Transfer",
          title: "Tanda Tangan Digital"
        },
      },
      {
        path: "halamanSuksesPemindahbukuan",
        name: "halamanSuksesPemindahbukuan",
        component: HalamanSuksesPemindahbukuan,
        meta: {
          feature: "Transfer",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // Menggunakan posisi yang disimpan (jika ada)
    } else {
      return { x: 0, y: 0 }; // Scroll ke posisi paling atas
    }
  },
});



export default router;
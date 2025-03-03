import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import MainLayout from "../views/MainLayout.vue";

// Pembukaan Rekening NTB
import PembukaanRekeningNTB from "../views/PembukaanRekeningNTB/pembukaan-rekening.vue";
import verifikasiEmailPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/verifikasi-email.vue";
import UploadFilePembukaanRekeningNTB from "../views/PembukaanRekeningNTB/upload-dokumen.vue";
import NpwpNTB from "../views/PembukaanRekeningNTB/npwp-s&k.vue";
import PreviewScreenPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/hasil-foto.vue";
import FotoDiriPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/foto-diri.vue";
import DataPribadiPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-pribadi.vue";
import DataKTPPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-ktp.vue";
import DataPekerjaanPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-pekerjaan.vue";
import KonfirmasiDataPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/konfirmasi-data.vue";
import EmailOTPPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/otp-no-hp.vue";
import HalamanSuksesPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/halaman-sukses.vue";

// Pembukaan Rekening Existing
import PembukaanRekeningExisting from "../views/PembukaanRekeningExisting/pembukaan-rekening-existing.vue";
import verifikasiEmailPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/verifikasi-email.vue";
import UploadFilePembukaanRekeningExisting from "../views/PembukaanRekeningExisting/upload-dokumen.vue";
import PreviewScreenPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/hasil-foto.vue";
import PerubahanDataPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/perubahan-data.vue";
import DataKTPPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/data-ktp.vue";
import KonfirmasiDataPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/konfirmasi-data.vue";
import EmailOTPPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/otp-no-hp.vue";
import HalamanSuksesPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/halaman-sukses.vue";
import FotoDiriPembukaanRekeningExisting from "../views/PembukaanRekeningExisting/foto-diri.vue";

// Penempatan Deposito NTB
import PenempatanDepositoNTB from "../views/PenempatanDepositoNTB/penempatan-deposito.vue";
import VerifikasiEmailPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/verifikasi-email.vue";
import DataPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/data-penempatan.vue";
import NpwpDepositoNTB from "../views/PenempatanDepositoNTB/npwp-s&k.vue";
import UploadFilePenempatanDepositoNTB from "../views/PenempatanDepositoNTB/upload-dokumen.vue";
import PreviewScreenPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/hasil-foto.vue";
import DataPribadiPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/data-pribadi.vue";
import DataKTPPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/data-ktp.vue";
import DataPekerjaanPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/data-pekerjaan.vue";
import KonfirmasiDataPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/konfirmasi-data.vue";
import EmailOTPPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/otp-no-hp.vue";
import HalamanSuksesPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/halaman-sukses.vue";
import HomePage from "@/views/HomePage.vue";
import FotoDiriPenempatanDepositoNTB from "../views/PenempatanDepositoNTB/foto-diri.vue";

// Pembukaan Rekening Existing
import PenempatanDepositoExisting from "../views/PenempatanDepositoExisting/penempatan-deposito-existing.vue";
import verifikasiEmailPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/verifikasi-email.vue";
import DataPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/data-penempatan.vue";
import UploadFilePenempatanDepositoExisting from "../views/PenempatanDepositoExisting/upload-dokumen.vue";
import PreviewScreenPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/hasil-foto-ktp.vue";
import PerubahanDataPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/perubahan-data.vue";
import DataKTPPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/data-ktp.vue";
import KonfirmasiDataPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/konfirmasi-data.vue";
import EmailOTPPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/email-otp.vue";
import HalamanSuksesPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/halaman-sukses.vue";
import FotoDiriPenempatanDepositoExisting from "../views/PenempatanDepositoExisting/foto-diri.vue";

// Pembukaan Rekening Existing
import PengkinianData from "../views/PengkinianData/pengkinian-data.vue";
import UploadDokumenPengkinianData from "../views/PengkinianData/upload-dokumen.vue";
import PreviewScreenPengkinianData from "../views/PengkinianData/hasil-foto.vue";
import DataPribadiPengkinianData from "../views/PengkinianData/data-pribadi.vue";
import DataKTPPengkinianData from "../views/PengkinianData/data-ktp.vue";
import DataPekerjaanPengkinianData from "../views/PengkinianData/data-pekerjaan.vue";
import KonfirmasiDataPengkinianData from "../views/PengkinianData/konfirmasi-data.vue";
import EmailOTPPengkinianData from "../views/PengkinianData/otp-no-hp.vue";
import HalamanSuksesPengkinianData from "../views/PengkinianData/halaman-sukses.vue";

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
          title: "Halo, Senang Bertemu Dengan Anda.",
          subtitle: "Yuk, pilih produk yang diinginkan dan isi data dirimu terlebih dahulu",
        },
      },
      {
        path: "verifikasiEmailPembukaanRekeningNTB",
        name: "VerifikasiEmailPembukaanRekeningNTB",
        component: verifikasiEmailPembukaanRekeningNTB,
        meta: { title: "Email Verifikasi" },
      },
      {
        path: "uploadDokumenPembukaanRekeningNTB",
        name: "UploadDokumenPembukaanRekeningNTB",
        component: UploadFilePembukaanRekeningNTB,
        meta: { title: "Upload Dokumen" },
      },
      {
        path: "npwpNTB",
        name: "NpwpNTB",
        component: NpwpNTB,
        meta: { title: "Pernyatan berkaitan NPWP", subtitle: "Bahwa berkaitan dengan pemenuhan NPWP untuk pembukaan rekening," },
      },
      {
        path: "fotoDiriPembukaanRekeningNTB",
        name: "FotoDiriPembukaanRekeningNTB",
        component: FotoDiriPembukaanRekeningNTB,
        meta: {
          title: "Foto Diri",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "previewScreenPembukaanRekeningNTB",
        name: "PreviewScreenPembukaanRekeningNTB",
        component: PreviewScreenPembukaanRekeningNTB,
        meta: {
          title: "Hasil Foto",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "dataKTPPembukaanRekeningNTB",
        name: "DataKTPPembukaanRekeningNTB",
        component: DataKTPPembukaanRekeningNTB,
        meta: {
          title: "Data KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian, Anda dapat memperbaikinya terlebih dahulu sebelum melanjutkan proses pembukaan rekening.",
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "dataPribadiPembukaanRekeningNTB",
        name: "DataPribadiPembukaanRekeningNTB",
        component: DataPribadiPembukaanRekeningNTB,
        meta: {
          title: "Data Pribadi",
          subtitle:
            "Bantu kami mengenal Anda untuk memberikan layanan sesuai kebutuhan dengan memberikan tambahan informasi yang tidak tercakup dalam E-KTP Anda.",
        },
      },
      {
        path: "konfirmasiDataPembukaanRekeningNTB",
        name: "konfirmasiDataPembukaanRekeningNTB",
        component: KonfirmasiDataPembukaanRekeningNTB,
        meta: { title: "Konfirmasi Data" },
      },
      {
        path: "dataPekerjaanPembukaanRekeningNTB",
        name: "DataPekerjaanPembukaanRekeningNTB",
        component: DataPekerjaanPembukaanRekeningNTB,
        meta: {
          title: "Data Pekerjaan & Finansial",
          subtitle:
            "Untuk melanjutkan proses, kami memerlukan informasi tambahan mengenai pekerjaan Anda.",
        },
      },
      {
        path: "emailOTPPembukaanRekeningNTB",
        name: "emailOTPPembukaanRekeningNTB",
        component: EmailOTPPembukaanRekeningNTB,
        meta: { title: "OTP dan Submit E-Form" },
      },
      {
        path: "halamanSuksesPembukaanRekeningNTB",
        name: "halamanSuksesPembukaanRekeningNTB",
        component: HalamanSuksesPembukaanRekeningNTB,
        meta: { title: "" },
      },

      // Pembukaan Rekening Existing
      {
        path: "pembukaanRekeningExisting",
        name: "pembukaanRekeningExisting",
        component: PembukaanRekeningExisting,
        meta: {
          title: "Halo, Senang Bertemu dengan Anda Kembali",
          subtitle: "Yuk, pilih produk yang diinginkan dan isi data dirimu terlebih dahulu"
        },
      },
      {
        path: "verifikasiEmailPembukaanRekeningExisting",
        name: "VerifikasiEmailPembukaanRekeningExisting",
        component: verifikasiEmailPembukaanRekeningExisting,
        meta: { title: "Email Verifikasi Existing" },
      },
      {
        path: "uploadDokumenPembukaanRekeningExisting",
        name: "UploadDokumenPembukaanRekeningExisting",
        component: UploadFilePembukaanRekeningExisting,
        meta: { title: "Upload Dokumen Existing" },
      },
      {
        path: "previewScreenPembukaanRekeningExisting",
        name: "PreviewScreenPembukaanRekeningExisting",
        component: PreviewScreenPembukaanRekeningExisting,
        meta: {
          title: "Hasil Foto Existing",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "fotoDiriPembukaanRekeningExisting",
        name: "FotoDiriPembukaanRekeningExisting",
        component: FotoDiriPembukaanRekeningExisting,
        meta: {
          title: "Foto Diri",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
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
          title: "Data KTP Existing",
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
          title: "Perubahan Data Existing",
          subtitle:
            "Untuk melanjutkan proses, kami memerlukan informasi tambahan yang tidak tercakup dalam KTP Anda.",
        },
      },
      {
        path: "konfirmasiDataPembukaanRekeningExisting",
        name: "konfirmasiDataPembukaanRekeningExisting",
        component: KonfirmasiDataPembukaanRekeningExisting,
        meta: { title: "Konfirmasi Data Existing" },
      },
      {
        path: "emailOTPPembukaanRekeningExisting",
        name: "emailOTPPembukaanRekeningExisting",
        component: EmailOTPPembukaanRekeningExisting,
        meta: { title: "OTP dan Submit E-Form Existing" },
      },
      {
        path: "halamanSuksesPembukaanRekeningExisting",
        name: "halamanSuksesPembukaanRekeningExisting",
        component: HalamanSuksesPembukaanRekeningExisting,
        meta: { title: "" },
      },

      {
        path: "penempatanDepositoNTB",
        name: "PenempatanDepositoNTB",
        component: PenempatanDepositoNTB,
        meta: { title: "Halo, Senang Bertemu Dengan Anda Kembali", subtitle: "Sebagai Calon Nasabah Universal BPR yang hendak membuka deposito, Anda diwajibkan memiliki rekening Tabungan Universal, dan mengisi data diri Anda terlebih dahulu. Silakan pilih produk Tabungan Universal dibawah ini." },
      },
      {
        path: "verifikasiEmailPenempatanDepositoNTB",
        name: "verifikasiEmailPenempatanDepositoNTB",
        component: VerifikasiEmailPenempatanDepositoNTB,
        meta: { title: "Verifikasi Email" },
      },
      {
        path: "dataPenempatanDepositoNTB",
        name: "dataPenempatanDepositoNTB",
        component: DataPenempatanDepositoNTB,
        meta: {
          title: "Atur Penempatan Deposito",
          subtitle:
            "Tentukan nominal dan jangka waktu Deposito. Kami akan coba perhitungkan bunganya!",
        },
      },
      {
        path: "npwpDepositoNTB",
        name: "NpwpDepositoNTB",
        component: NpwpDepositoNTB,
        meta: { title: "Pernyatan berkaitan NPWP", subtitle: "Bahwa berkaitan dengan pemenuhan NPWP untuk pembukaan rekening," },
      },
      {
        path: "uploadDokumenPenempatanDepositoNTB",
        name: "UploadDokumenPenempatanDepositoNTB",
        component: UploadFilePenempatanDepositoNTB,
        meta: {
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
          title: "Hasil Foto",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
        },
        props: (route) => ({
          documentType: route.params.documentType, // Ambil documentType dari params
        }),
      },
      {
        path: "fotoDiriPenempatanDepositoNTB",
        name: "FotoDiriPenempatanDepositoNTB",
        component: FotoDiriPenempatanDepositoNTB,
        meta: {
          title: "Foto Diri",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "dataKTPPenempatanDepositoNTB",
        name: "DataKTPPenempatanDepositoNTB",
        component: DataKTPPenempatanDepositoNTB,
        meta: {
          title: "Data KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian, Anda dapat memperbaikinya terlebih dahulu sebelum melanjutkan proses pembukaan rekening.",
        },
      },
      {
        path: "dataPribadiPenempatanDepositoNTB",
        name: "DataPribadiPenempatanDepositoNTB",
        component: DataPribadiPenempatanDepositoNTB,
        meta: {
          title: "Data Pribadi",
          subtitle:
            "Bantu kami mengenal Anda untuk memberikan layanan sesuai kebutuhan dengan memberikan tambahan informasi yang tidak tercakup dalam E-KTP Anda.",
        },
      },
      {
        path: "konfirmasiDataPenempatanDepositoNTB",
        name: "konfirmasiDataPenempatanDepositoNTB",
        component: KonfirmasiDataPenempatanDepositoNTB,
        meta: { title: "Konfirmasi Data" },
      },
      {
        path: "dataPekerjaanPenempatanDepositoNTB",
        name: "DataPekerjaanPenempatanDepositoNTB",
        component: DataPekerjaanPenempatanDepositoNTB,
        meta: { title: "Data Pekerjaan & Finansial" },
      },
      {
        path: "emailOTPPenempatanDepositoNTB",
        name: "emailOTPPenempatanDepositoNTB",
        component: EmailOTPPenempatanDepositoNTB,
        meta: { title: "OTP dan Submit E-Form" },
      },
      {
        path: "halamanSuksesPenempatanDepositoNTB",
        name: "halamanSuksesPenempatanDepositoNTB",
        component: HalamanSuksesPenempatanDepositoNTB,
        meta: { title: "" },
      },

      // Penempatan Deposito Existing
      {
        path: "penempatanDepositoExisting",
        name: "penempatanDepositoExisting",
        component: PenempatanDepositoExisting,
        meta: { title: "Halo, Senang Bertemu Dengan Anda Kembali", subtitle: "Yuk, pilih produk yang diinginkan dan isi data dirimu terlebih dahulu!" },
      },
      {
        path: "verifikasiEmailPenempatanDepositoExisting",
        name: "VerifikasiEmailPenempatanDepositoExisting",
        component: verifikasiEmailPenempatanDepositoExisting,
        meta: { title: "Email Verifikasi Existing" },
      },
      {
        path: "dataPenempatanDepositoExisting",
        name: "dataPenempatanDepositoExisting",
        component: DataPenempatanDepositoExisting,
        meta: {
          title: "Atur Penempatan Deposito",
          subtitle:
            "Tentukan nominal dan jangka waktu Deposito. Kami akan coba perhitungkan bunganya!",
        },
      },
      {
        path: "uploadDokumenPenempatanDepositoExisting",
        name: "UploadDokumenPenempatanDepositoExisting",
        component: UploadFilePenempatanDepositoExisting,
        meta: { title: "Upload Dokumen Existing" },
      },
      {
        path: "previewScreenPenempatanDepositoExisting",
        name: "PreviewScreenPenempatanDepositoExisting",
        component: PreviewScreenPenempatanDepositoExisting,
        meta: {
          title: "Hasil Foto Existing",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
        },
        props: (route) => ({
          documentType: route.params.documentType,
        }),
      },
      {
        path: "fotoDiriPenempatanDepositoExisting",
        name: "FotoDiriPenempatanDepositoExisting",
        component: FotoDiriPenempatanDepositoExisting,
        meta: {
          title: "Foto Diri",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
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
          title: "Data KTP Existing",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian, Anda dapat memperbaikinya terlebih dahulu sebelum melanjutkan proses pembukaan rekening.",
        },
      },
      {
        path: "perubahanDataPenempatanDepositoExisting",
        name: "PerubahanDataPenempatanDepositoExisting",
        component: PerubahanDataPenempatanDepositoExisting,
        meta: {
          title: "Perubahan Data Existing",
          subtitle:
            "Untuk melanjutkan proses, kami memerlukan informasi tambahan yang tidak tercakup dalam KTP Anda.",
        },
      },
      {
        path: "konfirmasiDataPenempatanDepositoExisting",
        name: "konfirmasiDataPenempatanDepositoExisting",
        component: KonfirmasiDataPenempatanDepositoExisting,
        meta: { title: "Konfirmasi Data Existing" },
      },
      {
        path: "emailOTPPenempatanDepositoExisting",
        name: "emailOTPPenempatanDepositoExisting",
        component: EmailOTPPenempatanDepositoExisting,
        meta: { title: "OTP dan Submit E-Form Existing" },
      },
      {
        path: "halamanSuksesPenempatanDepositoExisting",
        name: "halamanSuksesPenempatanDepositoExisting",
        component: HalamanSuksesPenempatanDepositoExisting,
        meta: { title: "" },
      },

      // Pengkinian Data
      {
        path: "pengkinianData",
        name: "pengkinianData",
        component: PengkinianData,
        meta: { title: "Pengkinian Data" },
      },
      {
        path: "uploadDokumenPengkinianData",
        name: "uploadDokumenPengkinianData",
        component: UploadDokumenPengkinianData,
        meta: { title: "Upload Dokumen" },
      }, {
        path: "previewPengkinianData",
        name: "PreviewScreenPengkinianData",
        component: PreviewScreenPengkinianData,
        meta: {
          title: "Hasil Foto",
          subtitle:
            "Pastikan foto Anda terlihat jelas dan informasinya terbaca. Jika sudah, foto kamu bisa digunakan.",
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
          title: "Data KTP",
          subtitle:
            "Jika terdapat kesalahan atau ketidaksesuaian, Anda dapat memperbaikinya terlebih dahulu sebelum melanjutkan proses pembukaan rekening.",
        },
      },
      {
        path: "dataPribadiPengkinianData",
        name: "DataPribadiPengkinianData",
        component: DataPribadiPengkinianData,
        meta: {
          title: "Data Pribadi",
          subtitle:
            "Bantu kami mengenal Anda untuk memberikan layanan sesuai kebutuhan dengan memberikan tambahan informasi yang tidak tercakup dalam E-KTP Anda.",
        },
      },
      {
        path: "konfirmasiDataPengkinianData",
        name: "konfirmasiDataPengkinianData",
        component: KonfirmasiDataPengkinianData,
        meta: { title: "Konfirmasi Data" },
      },
      {
        path: "dataPekerjaanPengkinianData",
        name: "DataPekerjaanPengkinianData",
        component: DataPekerjaanPengkinianData,
        meta: { title: "Data Pekerjaan & Finansial" },
      },
      {
        path: "emailOTPPengkinianData",
        name: "emailOTPPengkinianData",
        component: EmailOTPPengkinianData,
        meta: { title: "OTP dan Submit E-Form" },
      },
      {
        path: "halamanSuksesPengkinianData",
        name: "halamanSuksesPengkinianData",
        component: HalamanSuksesPengkinianData,
        meta: { title: "" },
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

// import { createRouter, createWebHistory } from "vue-router";
// import LoginView from "../views/LoginView.vue";
// import HomeView from "../views/HomeView.vue";

// import BeritaKampusView from "../views/beritakampus/BeritaKampusView.vue";
// import LaporanViewVue from "../views/laporan/LaporanView.vue";

// // Aset Gambar
// import AsetGambarView from "../views/asetgambar/AsetGambarView.vue";
// import AsetGambarDetailView from "@/views/asetgambar/AsetGambarDetailView.vue";

// import UserProfileView from "../views/usercms/UserProfileView.vue";
// import NotificationItemDetailView from "../views/notifikasi/NotificationItemDetailView.vue";
// import DashboardWeAreUi from "../views/DashboardWeAreUi.vue";
// import DataTempatView from "../views/tempat/DataTempatView.vue";

// import CustomerView from "../views/CustomerView.vue";
// import CustomerDetailView from "@/views/customermanagement/CustomerDetailView.vue";

// // CMS User Management
// import CmsUserView from "../views/CmsUserView.vue";
// import CmsUserDetailView from "../views/cmsusermanagement/CmsUserDetailView.vue";

// // E-money
// import EmoneyView from "../views/emoney/EmoneyView.vue";
// import TopUpMethodView from "../views/emoney/TopUpMethodView.vue";
// import ExploreEmoneyView from "../views/emoney/ExploreEmoneyView.vue";
// import TransactionEmoneyView from "../views/emoney/TransactionEmoneyView.vue";

// // Asrama
// import AsramaDashboardView from "../views/layanan/asrama/AsramaDashboardView.vue";
// import AsramaKamarView from "../views/layanan/asrama/AsramaKamarView.vue";
// import AsramaPendaftaranView from "../views/layanan/asrama/AsramaPendaftaranView.vue";
// import AsramaPendaftaranEdit from "../views/layanan/asrama/EditScreen/AsramaPendaftaranEdit.vue";
// import AsramaPembayaranView from "../views/layanan/asrama/AsramaPembayaranView.vue";
// import AsramaPembayaranEdit from "../views/layanan/asrama/EditScreen/AsramaPembayaranEdit.vue";
// import AsramaPengaturanView from "../views/layanan/asrama/AsramaPengaturanView.vue";
// import AsramaPenghuniView from "../views/layanan/asrama/AsramaPenghuniView.vue";
// import AsramaPenghuniEdit from "../views/layanan/asrama/EditScreen/AsramaPenghuniEdit.vue";
// import PengaturanUmumAsramaView from "../views/layanan/asrama/pengaturan/PengaturanUmumAsrama.vue";
// import PengaturanTataTertibAsramaView from "../views/layanan/asrama/pengaturan/PengaturanTataTertibAsrama.vue";
// import PengaturanPaketAsramaView from "../views/layanan/asrama/pengaturan/PengaturanPaketAsrama.vue";
// import PengaturanAlurPendaftaranAsramaView from "../views/layanan/asrama/pengaturan/PengaturanAlurPendaftaranAsrama.vue";
// import PengaturanFaqAsramaView from "../views/layanan/asrama/pengaturan/PengaturanFaqAsrama.vue";
// import PengaturanNotifikasiAsramaView from "../views/layanan/asrama/pengaturan/PengaturanNotifikasiAsrama.vue";
// import AsramaNotifikasiEdit from "../views/layanan/asrama/EditScreen/AsramaPengaturanNotifikasiEdit.vue";

// // Parkir
// import ParkirDashboardView from "../views/layanan/parkir/ParkirDashboardView.vue";
// import ParkirLanggananView from "../views/layanan/parkir/ParkirLanggananView.vue";
// import ParkirLanggananEdit from "../views/layanan/parkir/EditScreen/ParkirLanggananEdit.vue";
// import ParkirPengaturanView from "../views/layanan/parkir/ParkirPengaturanView.vue";
// import ParkirRiwayatView from "../views/layanan/parkir/ParkirRiwayatView.vue";
// import PengaturanAlurPendaftaranParkirView from "../views/layanan/parkir/pengaturan/PengaturanAlurPendaftaranParkirView.vue";
// import PengaturanCaraPenggunaanParkirView from "../views/layanan/parkir/pengaturan/PengaturanCaraPenggunaanParkirView.vue";
// import PengaturanFaqParkirView from "../views/layanan/parkir/pengaturan/PengaturanFaqParkirView.vue";
// import PengaturanKetentuanPelangganParkirView from "../views/layanan/parkir/pengaturan/PengaturanKetentuanPelangganParkirView.vue";
// import PengaturanNotifikasiParkirView from "../views/layanan/parkir/pengaturan/PengaturanNotifikasiParkirView.vue";
// import PengaturanPaketParkirView from "../views/layanan/parkir/pengaturan/PengaturanPaketParkirView.vue";
// import PengaturanPeraturanParkirView from "../views/layanan/parkir/pengaturan/PengaturanPeraturanParkirView.vue";
// import PengaturanTempatParkirView from "../views/layanan/parkir/pengaturan/PengaturanTempatParkirView.vue";
// import PengaturanUmumParkirView from "../views/layanan/parkir/pengaturan/PengaturanUmumParkirView.vue";
// import ParkirNotifikasiEdit from "../views/layanan/parkir/EditScreen/ParkirPengaturanNotifikasiEdit.vue";

// // Tenant
// import TenantDashboardView from "../views/layanan/tenant/TenantDashboardView.vue";
// import TenantPendaftaranView from "../views/layanan/tenant/TenantPendaftaranView.vue";
// import TenantPendaftaranEdit from "../views/layanan/tenant/EditScreen/TenantPendaftaranEdit.vue";
// import TenantPengaturanView from "../views/layanan/tenant/TenantPengaturanView.vue";
// import TenantPenjualView from "../views/layanan/tenant/TenantPenjualView.vue";
// import TenantNotifikasiEdit from "../views/layanan/tenant/EditScreen/TenantPengaturanNotifikasiEdit.vue";
// import TenantPenjualEdit from "../views/layanan/tenant/EditScreen/TenantPenjualEdit.vue";
// import TenantPengaturanAlurPendaftaranView from "../views/layanan/tenant/pengaturan/PengaturanAlurPendaftaranTenantView.vue";
// import TenantPengaturanFaqView from "../views/layanan/tenant/pengaturan/PengaturanFaqTenantView.vue";
// import TenantPengaturanNotifikasiView from "../views/layanan/tenant/pengaturan/PengaturanNotifikasiTenantView.vue";
// import TenantPengaturanTataTertibView from "../views/layanan/tenant/pengaturan/PengaturanTataTertibTenantView.vue";
// import TenantPengaturanUmumView from "../views/layanan/tenant/pengaturan/PengaturanUmumTenantView.vue";

// // Pengaturan Umum
// import PengaturanView from "../views/pengaturan/PengaturanView.vue";
// import PengaturanNotifikasiView from "../views/pengaturan/detail/NotifikasiPengaturanView.vue";
// import PengaturanUrutLayananView from "../views/pengaturan/detail/UrutanLayananPengaturanView.vue";

// // Kantin
// import KantinDashboardView from "../views/layanan/kantin/KantinDashboardView.vue";
// import OtherKantinView from "../views/layanan/kantin/OtherKantinView.vue";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: "/login",
//       name: "login",
//       component: LoginView,
//     },
//     {
//       path: "/",
//       name: "WeAreUI CMS",
//       component: DashboardWeAreUi,
//       children: [
//         {
//           path: "",
//           name: "Dashboard",
//           component: HomeView,
//         },
//         {
//           path: "/data-tempat",
//           name: "data tempat",
//           component: DataTempatView,
//         },
//         {
//           path: "/berita-kampus",
//           name: "berita-kampus",
//           component: BeritaKampusView,
//         },
//         { path: "/laporan", name: "laporan", component: LaporanViewVue },

//         // aset gambar
//         {
//           path: "/aset-gambar",
//           name: "asset gambar",
//           component: AsetGambarView,
//         },
//         {
//           path: "/aset-gambar/detail",
//           name: "detail asset gambar",
//           component: AsetGambarDetailView,
//         },

//         {
//           path: "/profile-cms-user",
//           name: "profile CMS User",
//           component: UserProfileView,
//         },
//         {
//           path: "/notification-item",
//           name: "notification item",
//           component: NotificationItemDetailView,
//         },

//         // customer management
//         { path: "/customer", name: "Customer", component: CustomerView },
//         {
//           path: "/customer/detail-customer",
//           name: "Customer Detail",
//           component: CustomerDetailView,
//         },

//         // cms user management
//         { path: "/cmsuser", name: "CMS User", component: CmsUserView },
//         {
//           path: "/cmsuser/detail-user",
//           name: "CMS User Detail",
//           component: CmsUserDetailView,
//         },

//         // emoney
//         { path: "/emoney", name: "emoney", component: EmoneyView },
//         {
//           path: "/emoney/transaction",
//           name: "Transaksi",
//           component: TransactionEmoneyView,
//         },
//         {
//           path: "/emoney/topupmethod",
//           name: "Cara Top-Up",
//           component: TopUpMethodView,
//         },
//         {
//           path: "/emoney/explore",
//           name: "Explore",
//           component: ExploreEmoneyView,
//         },
//         {
//           path: "/emoney/transaction",
//           name: "Transaksi",
//           component: TransactionEmoneyView,
//         },

//         // asrama
//         { path: "/asrama", name: "Asrama", component: AsramaDashboardView },
//         { path: "/asrama/kamar", name: "kamar asrama", component: AsramaKamarView },
//         { path: "/asrama/pembayaran", name: "pembayaran asrama", component: AsramaPembayaranView },
//         { path: "/asrama/pembayaran/edit", name: "edit pembayaran asrama", component: AsramaPembayaranEdit },
//         { path: "/asrama/pendaftaran", name: "pendaftaran asrama", component: AsramaPendaftaranView },
//         { path: "/asrama/pendaftaran/edit", name: "edit pendaftaran asrama", component: AsramaPendaftaranEdit },
//         { path: "/asrama/pengaturan", name: "pengaturan asrama", component: AsramaPengaturanView },
//         { path: "/asrama/pengaturan/notifikasi", name: "notifikasi asrama", component: PengaturanNotifikasiAsramaView },
//         { path: "/asrama/pengaturan/pengaturan-umum", name: "pengaturan umum", component: PengaturanUmumAsramaView },
//         { path: "/asrama/pengaturan/tata-tertib", name: "tata tertib", component: PengaturanTataTertibAsramaView },
//         { path: "/asrama/pengaturan/paket", name: "paket asrama", component: PengaturanPaketAsramaView },
//         { path: "/asrama/pengaturan/alur-pendaftaran", name: "alur pendaftaran", component: PengaturanAlurPendaftaranAsramaView },
//         { path: "/asrama/pengaturan/faq", name: "faq", component: PengaturanFaqAsramaView },
//         { path: "/asrama/penghuni", name: "penghuni asrama", component: AsramaPenghuniView },
//         { path: "/asrama/penghuni/edit", name: "data penghuni", component: AsramaPenghuniEdit },
//         { path: "/asrama/notifikasi/edit", name: "edit asrama notifikasi", component: AsramaNotifikasiEdit },

//         // Parkir
//         { path: "/parkir", name: "parkir", component: ParkirDashboardView },
//         { path: "/parkir/langganan", name: "parkir langganan", component: ParkirLanggananView },
//         { path: "/parkir/langganan/edit", name: "edit parkir langganan", component: ParkirLanggananEdit },
//         { path: "/parkir/pengaturan", name: "parkir pengaturan", component: ParkirPengaturanView },
//         { path: "/parkir/pengaturan/pengaturan-umum", name: "pengaturan umum parkir", component: PengaturanUmumParkirView },
//         { path: "/parkir/pengaturan/tempat-parkir", name: "pengaturan tempat parkir", component: PengaturanTempatParkirView },
//         { path: "/parkir/pengaturan/alur-parkir", name: "pengaturan alur pendaftaran langganan parkir", component: PengaturanAlurPendaftaranParkirView },
//         { path: "/parkir/pengaturan/cara-penggunaan-parkir", name: "pengaturan cara penggunaan parkir", component: PengaturanCaraPenggunaanParkirView },
//         { path: "/parkir/pengaturan/faq-parkir", name: "pengaturan faq parkir", component: PengaturanFaqParkirView },
//         { path: "/parkir/pengaturan/peraturan-parkir", name: "pengaturan peraturan parkir", component: PengaturanPeraturanParkirView },
//         { path: "/parkir/pengaturan/paket-parkir", name: "pengaturan paket parkir", component: PengaturanPaketParkirView },
//         { path: "/parkir/pengaturan/notifikasi-parkir", name: "pengaturan notifikasi parkir", component: PengaturanNotifikasiParkirView },
//         { path: "/parkir/pengaturan/ketentuan-pelanggan", name: "pengaturan ketentuan pelanggan", component: PengaturanKetentuanPelangganParkirView },
//         { path: "/parkir/riwayat", name: "parkir riwayat", component: ParkirRiwayatView },
//         { path: "/parkir/notifikasi/edit", name: "edit parkir notifikasi", component: ParkirNotifikasiEdit },

//         // tenant
//         { path: "/tenant", name: "tenant", component: TenantDashboardView },
//         { path: "/tenant/pendaftaran", name: "tenant pendaftaran", component: TenantPendaftaranView },
//         { path: "/tenant/pendaftaran/edit", name: "edit tenant pendaftaran", component: TenantPendaftaranEdit },
//         { path: "/tenant/pengaturan", name: "tenant pengaturan", component: TenantPengaturanView },
//         { path: "/tenant/pengaturan/alur-pendaftaran", name: "alur pendaftaran tenant", component: TenantPengaturanAlurPendaftaranView },
//         { path: "/tenant/pengaturan/faq", name: "faq tenant", component: TenantPengaturanFaqView },
//         { path: "/tenant/pengaturan/notifikasi", name: "notifikasi tenant", component: TenantPengaturanNotifikasiView },
//         { path: "/tenant/pengaturan/tata-tertib", name: "tata tertib tenant", component: TenantPengaturanTataTertibView },
//         { path: "/tenant/pengaturan/pengaturan-umum", name: "pengaturan umum tenant", component: TenantPengaturanUmumView },
//         { path: "/tenant/penjual", name: "tenant penjual", component: TenantPenjualView },
//         { path: "/tenant/penjual/edit", name: "edit tenant penjual", component: TenantPenjualEdit },
//         { path: "/tenant/notifikasi/edit", name: "edit tenant notifikasi", component: TenantNotifikasiEdit },

//         // kantin
//         { path: "/kantin", name: "Kantin", component: KantinDashboardView },
//         { path: "/kantin/other", name: "Other", component: OtherKantinView },

//         // pengaturan
//         { path: "/pengaturan", name: "pengaturan", component: PengaturanView },
//         {
//           path: "/pengaturan/notifikasi",
//           name: "notifikasi",
//           component: PengaturanNotifikasiView,
//         },
//         {
//           path: "/pengaturan/urutan-layanan",
//           name: "urutan layanan",
//           component: PengaturanUrutLayananView,
//         },
//       ],
//     },
//   ],
// });

// export default router;

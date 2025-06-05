export const pekerjaanOptions = [
  { label: "Pelajar / Mahasiswa", value: "1" },
  { label: "Ibu Rumah Tangga", value: "2" },
  { label: "Wirausaha", value: "3" },
  { label: "TNI / Polri", value: "4" },
  { label: "Pegawai Negeri", value: "5" },
  { label: "Pegawai Swasta", value: "6" },
  { label: "BUMN / BUMD", value: "7" },
  { label: "Dokter", value: "8" },
  { label: "Pejabat Negara", value: "9" },
  { label: "Pengacara / Advokat", value: "10" },
  { label: "Pensiunan", value: "11" },
  { label: "Profesional", value: "12" },
  { label: "Lainnya", value: "lainnya" },
];

export const metodePenyetoranNTBOptions = [
  { label: " Debet Rekening Tabungan Universal", value: "1" },
];

export const metodePenyetoranExisitingOptions = [
  { label: " Debet Rekening Tabungan Universal", value: "1" },
  { label: " Debet Rekening Tabungan Universal", value: "2" },
];

// DEPOSITO UNIVERSAL
export const jangkaWaktuDepositoUniversalOptions = [
  { label: "1 Bulan (5.5% per tahun)", value: "1", jangkaWaktu: "1", sukuBunga: "5.5" },
  { label: "3 Bulan (6,25% per tahun)", value: "2", jangkaWaktu: "3", sukuBunga: "6.25" },
  { label: "6 Bulan (6,75% per tahun)", value: "3", jangkaWaktu: "6", sukuBunga: "6.75" },
  { label: "9 Bulan (6,75% per tahun)", value: "4", jangkaWaktu: "9", sukuBunga: "6.75" },
  { label: "12 Bulan (6,75% per tahun)", value: "5", jangkaWaktu: "12", sukuBunga: "6.75" },
  { label: "24 Bulan (6,75% per tahun)", value: "5", jangkaWaktu: "24", sukuBunga: "6.75" },
];

export const jangkaWaktuDepositoUniversalOptionsTier1 = [
  { label: "1 Bulan (5.5% per tahun)", value: "1", jangkaWaktu: "1", sukuBunga: "5.5" },
  { label: "3 Bulan (6.25% per tahun)", value: "2", jangkaWaktu: "3", sukuBunga: "6.25" },
  { label: "6 Bulan (6.75% per tahun)", value: "3", jangkaWaktu: "6", sukuBunga: "6.75" },
  { label: "9 Bulan (6.75% per tahun)", value: "4", jangkaWaktu: "9", sukuBunga: "6.75" },
  { label: "12 Bulan (6.75% per tahun)", value: "5", jangkaWaktu: "12", sukuBunga: "6.75" },
  { label: "24 Bulan (6.75% per tahun)", value: "6", jangkaWaktu: "24", sukuBunga: "6.75" }, // Perbaiki value jika ada duplikasi
];

export const jangkaWaktuDepositoUniversalOptionsTier2 = [
  { label: "1 Bulan (5.75% per tahun)", value: "1", jangkaWaktu: "1", sukuBunga: "5.75" },
  { label: "3 Bulan (6.50% per tahun)", value: "2", jangkaWaktu: "3", sukuBunga: "6.50" },
  { label: "6 Bulan (6.75% per tahun)", value: "3", jangkaWaktu: "6", sukuBunga: "6.75" },
  { label: "9 Bulan (6.75% per tahun)", value: "4", jangkaWaktu: "9", sukuBunga: "6.75" },
  { label: "12 Bulan (6.75% per tahun)", value: "5", jangkaWaktu: "12", sukuBunga: "6.75" },
  { label: "24 Bulan (6.75% per tahun)", value: "6", jangkaWaktu: "24", sukuBunga: "6.75" },
];

export const jangkaWaktuDepositoUniversalOptionsTier3 = [
  { label: "1 Bulan (6.00% per tahun)", value: "1", jangkaWaktu: "1", sukuBunga: "6.00" },
  { label: "3 Bulan (6.75% per tahun)", value: "2", jangkaWaktu: "3", sukuBunga: "6.75" },
  { label: "6 Bulan (6.75% per tahun)", value: "3", jangkaWaktu: "6", sukuBunga: "6.75" },
  { label: "9 Bulan (6.75% per tahun)", value: "4", jangkaWaktu: "9", sukuBunga: "6.75" },
  { label: "12 Bulan (6.75% per tahun)", value: "5", jangkaWaktu: "12", sukuBunga: "6.75" },
  { label: "24 Bulan (6.75% per tahun)", value: "6", jangkaWaktu: "24", sukuBunga: "6.75" },
];
// DEPOSITO UNIVERSAL

// DEPOSITO PEDULI
export const jangkaWaktuDepositoPeduliOptions = [
  { label: "6 Bulan (6,75% per tahun + donasi 1 Paket Sembako)", value: "1", jangkaWaktu: "6", sukuBunga: "6.75", donasi: "1" },
  { label: "9 Bulan (6,75% per tahun + donasi 2 Paket Sembako)", value: "2", jangkaWaktu: "9", sukuBunga: "6.75", donasi: "1" },
  { label: "12 Bulan (6,75% per tahun + donasi 3 Paket Sembako)", value: "3", jangkaWaktu: "12", sukuBunga: "6.75", donasi: "1" },
];

export const jangkaWaktuDepositoPeduliOptionsTier1 = [
  { label: "6 Bulan (6,75% per tahun + donasi 1 Paket Sembako)", value: "1", jangkaWaktu: "6", sukuBunga: "6.75", donasi: "1" },
  { label: "9 Bulan (6,75% per tahun + donasi 2 Paket Sembako)", value: "2", jangkaWaktu: "9", sukuBunga: "6.75", donasi: "1" },
  { label: "12 Bulan (6,75% per tahun + donasi 3 Paket Sembako)", value: "3", jangkaWaktu: "12", sukuBunga: "6.75", donasi: "1" },
];

export const jangkaWaktuDepositoPeduliOptionsTier2 = [
  { label: "6 Bulan (6,75% per tahun + donasi 1 Paket Sembako)", value: "1", jangkaWaktu: "6", sukuBunga: "6.75", donasi: "1" },
  { label: "9 Bulan (6,75% per tahun + donasi 2 Paket Sembako)", value: "2", jangkaWaktu: "9", sukuBunga: "6.75", donasi: "1" },
  { label: "12 Bulan (6,75% per tahun + donasi 3 Paket Sembako)", value: "3", jangkaWaktu: "12", sukuBunga: "6.75", donasi: "1" },
];
// DEPOSITO PEDULI

// DEPOSITO DEBUTS SANMERE
export const jangkaWaktuDepositoDEBUTSanmereOptions = [
  { label: "12 Bulan (5,75% per tahun + donasi 2% per tahun)", value: "1", jangkaWaktu: "12", sukuBunga: "5.75", donasi: "2" },
  { label: "24 Bulan (6,25% per tahun + donasi 1,5% per tahun)", value: "2", jangkaWaktu: "24", sukuBunga: "6.25", donasi: "1.5" },
  { label: "36 Bulan (6,75% per tahun + donasi 1% per tahun)", value: "3", jangkaWaktu: "36", sukuBunga: "6.75", donasi: "1" },
];
// DEPOSITO DEBUTS SANMERE

export const jangkaWaktuDepositoDEBUTMatiusOptions = [
  { label: "12 Bulan (5,75% per tahun + donasi 2% per tahun)", value: "1", jangkaWaktu: "12", sukuBunga: "5.75" },
  { label: "24 Bulan (6,25% per tahun + donasi 1,5% per tahun)", value: "2", jangkaWaktu: "24", sukuBunga: "6.25" },
  { label: "36 Bulan (6,75% per tahun + donasi 1% per tahun)", value: "3", jangkaWaktu: "36", sukuBunga: "6.75" },
];

// DEPOSITO GREEN
export const jangkaWaktuDepositoGreenOptions = [
  { label: "6 Bulan (6,75% per tahun + investasi bibit pohon)", value: "2", jangkaWaktu: "6", sukuBunga: "6.75" },
  { label: "9 Bulan (6,75% per tahun + investasi bibit pohon)", value: "3", jangkaWaktu: "9", sukuBunga: "6.75" },
];

export const jangkaWaktuDepositoGreenOptionsTier1 = [
  { label: "6 Bulan (6,75% per tahun + investasi bibit pohon)", value: "2", jangkaWaktu: "6", sukuBunga: "6.75" },
  { label: "9 Bulan (6,75% per tahun + investasi bibit pohon)", value: "3", jangkaWaktu: "9", sukuBunga: "6.75" },
  { label: "12 Bulan (6,75% per tahun + investasi bibit pohon)", value: "4", jangkaWaktu: "12", sukuBunga: "6.75" },
];

export const jangkaWaktuDepositoGreenOptionsTier2 = [
  { label: "6 Bulan (6,75% per tahun + investasi bibit pohon)", value: "2", jangkaWaktu: "6", sukuBunga: "6.75" },
  { label: "9 Bulan (6,75% per tahun + investasi bibit pohon)", value: "3", jangkaWaktu: "9", sukuBunga: "6.75" },
  { label: "12 Bulan (6,75% per tahun + investasi bibit pohon)", value: "4", jangkaWaktu: "12", sukuBunga: "6.75" },
];
// DEPOSITO GREEN

export const jangkaWaktuDepositoOptions = [
  { label: "1 Bulan", value: "1" },
  { label: "3 Bulan", value: "3" },
  { label: "6 Bulan", value: "6" },
  { label: "9 Bulan", value: "9" },
  { label: "12 Bulan", value: "12" },
  { label: "24 Bulan", value: "24" },
  { label: "36 Bulan", value: "36" },
];

export const sukuBungaDepositoOptions = [
  { label: "5,50%", value: "5.50" },
  { label: "5,75%", value: "5.75" },
  { label: "6,00%", value: "6.00" },
  { label: "6,25%", value: "6.25" },
  { label: "6,50%", value: "6.50" },
  { label: "6,75%", value: "6.75" },
];

export const tandaPengenalOptions = [
  { label: "KTP", value: "1" },
];

export const memilikiTabunganOptions = [
  { label: "Saya belum punya Rekening Tabungan Universal", value: "1" },
  { label: "Saya sudah punya Rekening Tabungan Universal dan masih aktif", value: "2" },
];


export const pembayaranBungaOptions = [
  { label: "Tambahkan ke Nominal Deposito", subtitle: " Bunga akan ditambahkan ke nominal Deposito saat jatuh tempo", value: "1" },
  { label: "Pindah buku ke Rekening Tabungan Universal atas nama pihak lain", subtitle: "Bunga Deposito akan dipindahbuku ke Rekening Tabungan Universal atas nama pihak lain", value: "2" },
  { label: "Pindah buku ke Rekening Tabungan Universal atas nama saya", subtitle: "Bunga Deposito akan dipindahbuku ke Rekening Tabungan Universal Atas Nama Anda", value: "3" },
  { label: "Transfer ke Rekening Bank lain", subtitle: "Bunga Deposito akan ditransfer ke rekening Bank lain", value: "4" },
];

export const metodePencairanOptions = [
  { label: "Automatic Roll Over (ARO)", subtitle: "Rekening Deposito otomatis diperpanjang", value: "1" },
  // { label: "Automatic Roll Over & Bunga", value: "ARO & Bunga" },
  // { label: "Non Automatic Roll Over", value: "NARO" },
];

export const kantorCabangOptions = [
  { label: "Kantor Pusat PT BPR Universal", value: "01" },
  { label: "Kantor Kas BSD", value: "02" },
  { label: "Kantor Kas PIK", value: "03" },
  { label: "Kantor Cabang Tanggerang", value: "04" },
  { label: "Kantor Cabang Depok", value: "05" },
  { label: "Kantor Cabang Bekasi", value: "06" },
  { label: "Kantor Cabang Tambun", value: "07" },
  { label: "Kantor Cabang Bogor", value: "08" },
];

export const bidangPekerjaanDKOptions = [
  { label: "Wirausaha", value: "1" },
  { label: "Pendidikan", value: "2" },
  { label: "Teknologi Informasi", value: "3" },
  { label: "Kesehatan", value: "4" },
  { label: "Transportasi", value: "5" },
  { label: "Seni dan Kreatif", value: "6" },
  { label: "Lainnya", value: "lainnya" },
];

export const jabatanOptions = [
  { label: "Direktur Utama (CEO)", value: "1" },
  { label: "Direktur Keuangan (CFO)", value: "2" },
  { label: "Direktur Operasional (COO)", value: "3" },
  { label: "Direktur Teknologi (CTO)", value: "4" },
  { label: "Direktur Pemasaran (CMO)", value: "5" },
  { label: "Direktur Sumber Daya Manusia (CHRO)", value: "6" },
  { label: "Direktur", value: "7" },
  { label: "Wakil Direktur", value: "8" },
  { label: "General Manager (GM)", value: "9" },
  { label: "Wakil Presiden (VP)", value: "10" },
  { label: "Manajer Senior", value: "11" },
  { label: "Direktur Asosiasi Manajer", value: "12" },
  { label: "Asisten Manajer", value: "13" },
  { label: "Supervisor", value: "14" },
  { label: "Kepala Tim (Team Leader)Spesialis Senior", value: "15" },
  { label: "Spesialis Junior", value: "16" },
  { label: "Analis Senior", value: "17" },
  { label: "Analis Junior", value: "18" },
  { label: "Konsultan Senior", value: "19" },
  { label: "Konsultan Junior Staf Senior", value: "20" },
  { label: "Staf Junior", value: "21" },
  { label: "Staf", value: "22" },
  { label: "Asosiasi (Associate)", value: "23" },
  { label: "Magang (Intern)", value: "24" },
  { label: "Trainee", value: "25" },
  { label: "Lainnya", value: "26" },
];

export const masaAktifKTPOptions = [
  { label: "Seumur Hidup", value: "1" },
];

export const sumberDanaOptions = [
  { label: "Rekening Tabungan Universal", value: "1" },
];

export const getMasaAktifKTPOptions = (tanggalBerlakuSampai) => {
  const options = [{ label: "Seumur Hidup", value: "Seumur Hidup" }, { label: "Pilih Tanggal Berlaku Sampai", value: "0" }];
  if (tanggalBerlakuSampai) {
    options.push({ label: tanggalBerlakuSampai, value: tanggalBerlakuSampai });
  }
  return options;
};

export const produkOptions = [
  { label: "Tabungan Universal", value: "1" },
  { label: "Deposito Berjangka", value: "2" },
];

export const produkTabunganOptions = [
  { label: "Tabungan Universal", value: "1" },
];

export const produkDepositoOptions = [
  { label: "Deposito Universal", value: "1", subtitle: "Minimal Pembukaan Deposito: Rp 5.000.000" },
  { label: "Deposito Peduli", value: "2", subtitle: "Minimal Pembukaan Deposito: Rp 100.000.000" },
  { label: "Deposito Berdonasi Umat Sanmare", value: "3", subtitle: "Minimal Pembukaan Deposito: Rp 5.000.000" },
  { label: "Deposito Berdonasi Umat Matius", value: "4", subtitle: "Minimal Pembukaan Deposito: Rp 5.000.000" },
  { label: "Deposito Peduli Lingkungan (Green Deposit)", value: "5", subtitle: "Minimal Pembukaan Deposito: Rp 100.000.000" },
];

export const korespondensiOptions = [
  { label: "Alamat Tempat Tinggal sesuai e-KTP", value: "1" },
  { label: "Alamat Tempat Tinggal Terkini", value: "2" },
  { label: "Alamat kantor", value: "3" },
];

export const hubunganNasabahOptions = [
  { label: "Suami / Istri", value: "1" },
  { label: "Orang Tua / Anak", value: "2" },
  { label: "Pimpinan / Karyawan", value: "3" },
  { label: "Lainnya", value: "0" },

];

export const hubunganPemohonKDOptions = [
  { label: "Suami / Istri", value: "Suami / Istri" },
  { label: "Orang Tua / Anak", value: "Orang Tua / Anak" },
  { label: "Lainnya", value: "lainnya" },
];

export const jenisIdentitasBOOptions = [
  { label: "KTP", value: "1" },
  { label: "Paspor", value: "2" },
  { label: "Lainnya", value: "0" },
];

export const penghasilanOptions = [
  { label: "Gaji", value: "1" },
  { label: "Hasil Usaha", value: "2" },
  { label: "Hasil Investasi", value: "3" },
  { label: "Hibah / Warisan", value: "4" },
  { label: "Suami / Istri", value: "5" },
  { label: "Orang Tua", value: "6" },
  { label: "Lainnya", value: "0" },
];

export const jumlahPenghasilanOptions = [
  { label: "< 5jt", value: "1" },
  { label: "5jt - < 25jt", value: "2" },
  { label: "25jt - < 50jt", value: "3" },
  { label: "50jt - < 100jt", value: "4" },
  { label: "100jt - < 500jt", value: "5" },
  { label: "≥ 500jt", value: "6" },
];

export const statusPerkawinanOptions = [
  { label: "Kawin", value: 1 },
  { label: "Belum Kawin", value: 2 },
  { label: "Cerai Hidup", value: 3 },
  { label: "Cerai Mati", value: 4 },
];

export const pendidikanOptions = [
  { label: "SD", value: "1" },
  { label: "SMP", value: "2" },
  { label: "SMA/SEDERAJAT", value: "3" },
  { label: "Akademi/Diploma", value: "4" },
  { label: "S1", value: "5" },
  { label: "S2", value: "6" },
  { label: "S3", value: "7" },
];

export const hobiOptions = [
  { label: "Olahraga", value: "1" },
  { label: "Jalan - Jalan", value: "2" },
  { label: "Seni", value: "3" },
  { label: "Belanja", value: "4" },
  { label: "Lainnya", value: "0" },
];

export const tujuanOptions = [
  { label: "Simpanan", value: "1" },
  { label: "Transaksi", value: "2" },
  { label: "Investasi", value: "3" },
];

export const alasanPencairanOptions = [
  { label: "Penutupan Deposito Sesuai Jatuh Tempo", value: "1" },
  { label: "Keperluan Pribadi", value: "2" },
  { label: "Kebutuhan Data Mendesak", value: "3" },
  { label: "Perubahan Rencana Keuangan", value: "4" },
  { label: "Investasi atau Peluang Bisnis Bar", value: "5" },
];

export const rekeningTujuanOptions = [
  { label: "Rekening Universal BPR", value: "1" },
  { label: "Rekening Bank Lain", value: "2" },
];

export const alamatSesuaiEktpOptions = [
  { label: "Iya", value: true },
  { label: "Tidak", value: false },
];

export const trueFalseOptions = [
  { label: "Iya", value: true },
  { label: "Tidak", value: false },
];

export const persetujuanOptions = [
  { label: "Setuju", value: true },
  { label: "Tidak Setuju", value: false },
];

export const memilikiRekeningOptions = [
  { label: "YA", value: "YA" },
  { label: "TIDAK", value: "TIDAK" },
];

export const npwpOptions = [
  { label: "Saya tidak memiliki NPWP", value: true },
  { label: "Berdasarkan peraturan tidak diwajibkan memiliki NPWP", value: false },
];

export const npwp2Options = [
  { label: "Menggunakan NPWP Suami (untuk istri bekerja)", value: "SUAMI" },
  {
    label: "Menggunakan NPWP Pemilik Manfaat (termasuk orang tua)",
    value: "PEMILIK_MANFAAT",
  },
];

export const npwp3Options = [
  { label: "Belum Memiliki NPWP", value: "1" },
  {
    label: "Berdasarkan peraturan tidak diwajibkan memiliki NPWP dan berkomitmen akan segera menyampaikan kepada bank setelah memiliki NPWP. (Tidak berlaku bagi nasabah yang telah menyerahkan dokumen NPWP ",
    value: "PEMILIK_MANFAAT",
  },
];

export const jenisKelaminOptions = [
  { label: "Laki-laki", value: true },
  { label: "Perempuan", value: false },
];

export const sumberDataNasabahOptions = [
  { label: "Website", value: "1" },
  { label: "Brosur", value: "2" },
  { label: "Media Sosial", value: "3" },
  { label: "Lainnya", value: "0" },
];

export const agamaOptions = [
  { label: "Islam", value: 1 },
  { label: "Kristen", value: 2 },
  { label: "Katholik", value: 3 },
  { label: "Hindu", value: 4 },
  { label: "Budha", value: 5 },
  { label: "Konghucu", value: 6 },
];

export const kewarganegaraanOptions = [
  { label: "WNI", value: true },
  { label: "Lainnya", value: false },
];

export const kewarganegaraanBOOptions = [
  { label: "Indonesia", value: "1" },
  { label: "Amerika Serikat", value: "2" },
  { label: "Kanada", value: "3" },
  { label: "Inggris", value: "4" },
  { label: "Australia", value: "5" },
  { label: "Jepang", value: "6" },
  { label: "Tiongkok", value: "7" },
  { label: "Jerman", value: "8" },
  { label: "Prancis", value: "9" },
  { label: "Italia", value: "10" },
  { label: "Singapura", value: "11" },
];

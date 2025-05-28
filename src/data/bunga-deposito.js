
// export function hitungBungaUniversal(nominal, jangkaWaktu) {
//     let sukuBunga;
//     let jumlahHari;
//     switch (jangkaWaktu) {
//         case "1":
//             sukuBunga = 0.0575; // 1 Bulan (5.75% per tahun)
//             jumlahHari = 30;
//             break;
//         case "2":
//             sukuBunga = 0.0650; // 3 Bulan (6.25% per tahun)
//             jumlahHari = 92;
//             break;
//         case "3":
//             sukuBunga = 0.0675; // 6 Bulan (6.75% per tahun)
//             jumlahHari = 184;
//             break;
//         case "4":
//             sukuBunga = 0.0675; // 9 Bulan (6.75% per tahun)
//             jumlahHari = 276;
//             break;
//         case "5":
//             sukuBunga = 0.0675; // 12 Bulan (6.75% per tahun)
//             jumlahHari = 365;
//             break;
//         case "6":
//             sukuBunga = 0.0675; // 24 Bulan (6.75% per tahun)
//             jumlahHari = 730;
//             break;
//         default:
//             sukuBunga = 0.06; // Default 6% jika jangka waktu tidak cocok
//     }
//     const bunga = ((nominal * sukuBunga) / 365) * jumlahHari * 0.8; // Setelah pajak 20%
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(bunga);
// }

// export function hitungBungaPeduli(nominal, jangkaWaktu) {
//     let sukuBunga;
//     let jumlahHari;
//     switch (jangkaWaktu) {
//         case "1":
//             sukuBunga = 0.0675; // 6 Bulan (6.75% per tahun)
//             jumlahHari = 184;
//             break;
//         case "2":
//             sukuBunga = 0.0675; // 9 Bulan (6.75% per tahun)
//             jumlahHari = 276;
//             break;
//         case "3":
//             sukuBunga = 0.0675; // 12 Bulan (6.75% per tahun)
//             jumlahHari = 365;
//             break;
//         default:
//             sukuBunga = 0.0675; // Default 6.75% jika jangka waktu tidak cocok
//     }
//     const bunga = ((nominal * sukuBunga) / 365) * jumlahHari * 0.8; // Setelah pajak 20%
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(bunga);
// }

// export function hitungBungaDEBUTSanmere(nominal, jangkaWaktu) {
//     let sukuBunga;
//     let jumlahHari;
//     switch (jangkaWaktu) {
//         case "1":
//             sukuBunga = 0.0575; // 12 Bulan (5.75% per tahun)
//             jumlahHari = 365;
//             break;
//         case "2":
//             sukuBunga = 0.0625; // 24 Bulan (6.25% per tahun)
//             jumlahHari = 730;
//             break;
//         case "3":
//             sukuBunga = 0.0675; // 36 Bulan (6.75% per tahun)
//             jumlahHari = 1096;
//             break;
//         default:
//             sukuBunga = 0.06; // Default 6% jika jangka waktu tidak cocok
//     }
//     const bunga = ((nominal * sukuBunga) / 365) * jumlahHari * 0.8; // Setelah pajak 20%
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(bunga);
// }

// export function hitungBungaDEBUTMatius(nominal, jangkaWaktu) {
//     let sukuBunga;
//     let jumlahHari;
//     switch (jangkaWaktu) {
//         case "1":
//             sukuBunga = 0.0575; // 12 Bulan (5.75% per tahun)
//             jumlahHari = 365;
//             break;
//         case "2":
//             sukuBunga = 0.0625; // 24 Bulan (6.25% per tahun)
//             jumlahHari = 730;
//             break;
//         case "3":
//             sukuBunga = 0.0675; // 36 Bulan (6.75% per tahun)
//             jumlahHari = 1096;
//             break;
//         default:
//             sukuBunga = 0.06; // Default 6% jika jangka waktu tidak cocok
//     }
//     const bunga = ((nominal * sukuBunga) / 365) * jumlahHari * 0.8; // Setelah pajak 20%
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(bunga);
// }

// export function hitungBungaGreen(nominal, jangkaWaktu) {
//     let sukuBunga;
//     let jumlahHari;
//     switch (jangkaWaktu) {
//         case "1":
//             sukuBunga = 0.0625; // 3 Bulan (6.25% per tahun)
//             jumlahHari = 92;
//             break;
//         case "2":
//             sukuBunga = 0.0675; // 6 Bulan (6.75% per tahun)
//             jumlahHari = 184;
//             break;
//         case "3":
//             sukuBunga = 0.0675; // 9 Bulan (6.75% per tahun)
//             jumlahHari = 276;
//             break;
//         default:
//             sukuBunga = 0.06; // Default 6% jika jangka waktu tidak cocok
//     }
//     const bunga = ((nominal * sukuBunga) / 365) * jumlahHari * 0.8; // Setelah pajak 20%
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(bunga);
// }


// function getJumlahHariFromJangkaWaktu(jangkaWaktuInMonths) {
//     switch (String(jangkaWaktuInMonths)) { // Pastikan diperlakukan sebagai string untuk matching switch
//         case "1": return 30;
//         case "3": return 92;
//         case "6": return 184;
//         case "9": return 276;
//         case "12": return 365;
//         case "24": return 730;
//         case "36": return 1096;
//         default: return 365; // Default jika tidak ditemukan
//     }
// }

// function getJumlahHariFromJangkaWaktu(jangkaWaktuInMonths) {
//     const today = new Date();
//     const futureDate = new Date(today);
//     futureDate.setMonth(today.getMonth() + parseInt(jangkaWaktuInMonths)); // Tambahkan bulan

//     // Hitung selisih hari
//     const diffTime = Math.abs(futureDate - today);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
//     return diffDays;
// }

// function getJumlahHariFromJangkaWaktu(jangkaWaktuInMonths) {
//     const today = new Date();
//     console.log("Tanggal Hari Ini:", today.toLocaleDateString('id-ID')); // Opsional: untuk melihat tanggal awal

//     const futureDate = new Date(today);
//     futureDate.setMonth(today.getMonth() + parseInt(jangkaWaktuInMonths)); // Tambahkan bulan
//     console.log("Tanggal Setelah Ditambah Bulan:", futureDate.toLocaleDateString('id-ID')); // Opsional: untuk melihat tanggal akhir

//     // Hitung selisih hari
//     const diffTime = Math.abs(futureDate - today);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     // Ini adalah baris yang Anda minta untuk menampilkan jumlah hari
//     console.log(`Jangka Waktu: ${jangkaWaktuInMonths} bulan, Jumlah Hari: ${diffDays} hari`);
//     return diffDays;
// }

function getJumlahHariFromJangkaWaktu(jangkaWaktuInMonths) {
    const today = new Date();
    // Set tanggal menjadi hari pertama bulan ini untuk menghindari masalah "loncat" hari saat menambahkan bulan
    today.setDate(1); 
    console.log("Tanggal Mulai (Hari Ini, diset ke tgl 1):", today.toLocaleDateString('id-ID'));

    const futureDate = new Date(today);
    futureDate.setMonth(today.getMonth() + parseInt(jangkaWaktuInMonths)); // Tambahkan bulan

    // Setelah bulan ditambahkan, set hari kembali ke hari yang sama dengan 'today'
    // atau ke hari terakhir bulan tersebut jika bulan tujuan tidak memiliki hari tersebut.
    // Misalnya, jika start 31 Jan, dan target adalah akhir Februari, set ke 28/29 Feb.
    const originalDay = new Date().getDate(); // Ambil hari asli dari "hari ini"
    const lastDayOfMonth = new Date(futureDate.getFullYear(), futureDate.getMonth() + 1, 0).getDate();
    futureDate.setDate(Math.min(originalDay, lastDayOfMonth));
    
    console.log("Tanggal Setelah Ditambah Bulan (disesuaikan harinya):", futureDate.toLocaleDateString('id-ID'));

    // Hitung selisih hari
    const diffTime = Math.abs(futureDate.getTime() - new Date().getTime()); // Gunakan new Date() untuk hari ini yang aktual
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log(`Jangka Waktu: ${jangkaWaktuInMonths} bulan, Jumlah Hari: ${diffDays} hari`);
    return diffDays;
}

export function hitungBungaUniversal(nominal, jangkaWaktuParameter, sukuBungaParameter) {
    if (nominal <= 0 || !sukuBungaParameter || !jangkaWaktuParameter) {
        return "Rp 0";
    }

    const jumlahHari = getJumlahHariFromJangkaWaktu(jangkaWaktuParameter);

    const bungaKotorPerPeriode = (nominal * sukuBungaParameter / 365) * jumlahHari;
    const bungaBersih = bungaKotorPerPeriode * 0.8;

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bungaBersih);
}

export function hitungBungaPeduli(nominal, jangkaWaktuParameter, sukuBungaParameter) {

    if (nominal <= 0 || !sukuBungaParameter || !jangkaWaktuParameter) {
        return "Rp 0";
    }

    // Menggunakan helper yang sama untuk mendapatkan jumlah hari
    const jumlahHari = getJumlahHariFromJangkaWaktu(jangkaWaktuParameter);

    const bungaKotorPerPeriode = (nominal * sukuBungaParameter / 365) * jumlahHari;
    const bungaBersih = bungaKotorPerPeriode * 0.8; // Setelah pajak 20%

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bungaBersih);
}

export function hitungBungaDEBUTSanmere(nominal, jangkaWaktuParameter, sukuBungaParameter) {

    if (nominal <= 0 || !sukuBungaParameter || !jangkaWaktuParameter) {
        return "Rp 0";
    }

    // Menggunakan helper yang sama untuk mendapatkan jumlah hari
    const jumlahHari = getJumlahHariFromJangkaWaktu(jangkaWaktuParameter);

    const bungaKotorPerPeriode = (nominal * sukuBungaParameter / 365) * jumlahHari;
    const bungaBersih = bungaKotorPerPeriode * 0.8; // Setelah pajak 20%

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bungaBersih);
}

export function hitungBungaDEBUTMatius(nominal, jangkaWaktuParameter, sukuBungaParameter) {

    if (nominal <= 0 || !sukuBungaParameter || !jangkaWaktuParameter) {
        return "Rp 0";
    }

    // Menggunakan helper yang sama untuk mendapatkan jumlah hari
    const jumlahHari = getJumlahHariFromJangkaWaktu(jangkaWaktuParameter);

    const bungaKotorPerPeriode = (nominal * sukuBungaParameter / 365) * jumlahHari;
    const bungaBersih = bungaKotorPerPeriode * 0.8; // Setelah pajak 20%

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bungaBersih);
}

export function hitungBungaGreen(nominal, jangkaWaktuParameter, sukuBungaParameter) {

    if (nominal <= 0 || !sukuBungaParameter || !jangkaWaktuParameter) {
        return "Rp 0";
    }

    // Menggunakan helper yang sama untuk mendapatkan jumlah hari
    const jumlahHari = getJumlahHariFromJangkaWaktu(jangkaWaktuParameter);

    const bungaKotorPerPeriode = (nominal * sukuBungaParameter / 365) * jumlahHari;
    const bungaBersih = bungaKotorPerPeriode * 0.8; // Setelah pajak 20%

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bungaBersih);
}

// export function hitungBungaDEBUTSanmere(nominal, jangkaWaktuParameter, sukuBungaParameter, donasiParameter) {

//     if (nominal <= 0 || !sukuBungaParameter || !jangkaWaktuParameter || donasiParameter === undefined || donasiParameter === null) {
//         return "Rp 0";
//     }

//     const jumlahHari = getJumlahHariFromJangkaWaktu(jangkaWaktuParameter);


//     const sukuBungaDecimal = parseFloat(sukuBungaParameter) / 100;
//     const donasiDecimal = parseFloat(donasiParameter) / 100;


//     const bungaKotorPerPeriode = (nominal * sukuBungaDecimal / 365) * jumlahHari;
//     const bungaBersih = bungaKotorPerPeriode * 0.8;

//     // Hitung Donasi
//     // Donasi dihitung berdasarkan persentase donasi per tahun terhadap nominal
//     // Kemudian disesuaikan dengan jangka waktu deposit
//     const jumlahDonasi = (nominal * donasiDecimal / 365) * jumlahHari;


//     // Format bunga dan donasi ke Rupiah
//     const formattedBunga = new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(bungaBersih);

//     const formattedDonasi = new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(jumlahDonasi);

//     return `${formattedBunga} (Donasi: ${formattedDonasi})`;
// }

// export function hitungBungaUniversal(nominal, jangkaWaktu, customSukuBunga) {
//     let sukuBunga;
//     let jumlahHari;

//     if (customSukuBunga !== undefined && customSukuBunga !== null) {
//         sukuBunga = customSukuBunga;
//     } else {
//         // Logika switch Anda saat ini untuk fallback jika tidak ada customSukuBunga
//         // (Ini penting jika fungsi ini dipanggil di tempat lain tanpa customSukuBunga)
//         switch (jangkaWaktu) {
//             case "1": sukuBunga = 0.0575; jumlahHari = 30; break;
//             case "2": sukuBunga = 0.06; jumlahHari = 92; break;
//             case "3": sukuBunga = 0.0675; jumlahHari = 184; break;
//             case "4": sukuBunga = 0.0675; jumlahHari = 276; break;
//             case "5": sukuBunga = 0.0675; jumlahHari = 365; break;
//             case "6": sukuBunga = 0.0675; jumlahHari = 730; break;
//             default: sukuBunga = 0.06; // Default jika jangka waktu tidak cocok dan tidak ada customSukuBunga
//         }
//     }

//     // Hanya tentukan jumlahHari jika customSukuBunga tidak ada (karena selectedOption sudah punya jangkaWaktu)
//     if (customSukuBunga === undefined || customSukuBunga === null) {
//         switch (jangkaWaktu) {
//             case "1": jumlahHari = 30; break;
//             case "2": jumlahHari = 92; break;
//             case "3": jumlahHari = 184; break;
//             case "4": jumlahHari = 276; break;
//             case "5": jumlahHari = 365; break;
//             case "6": jumlahHari = 730; break;
//             default: jumlahHari = 365; // Default hari jika tidak cocok
//         }
//     } else {
//         // Jika customSukuBunga ada, kita perlu mendapatkan jumlahHari dari option yang dipilih
//         // Ini berarti Anda mungkin perlu meneruskan seluruh `selectedOption` ke fungsi ini,
//         // atau menambahkan `jumlahHari` ke `selectedOption` di `MainLayout.vue`
//         // Untuk saat ini, kita akan asumsikan `jangkaWaktu` dari `selectedOption` masih valid untuk mencari jumlahHari.
//         switch (jangkaWaktu) { // jangkaWaktu di sini adalah "value" dari opsi, misal "1", "2"
//             case "1": jumlahHari = 30; break;
//             case "2": jumlahHari = 92; break;
//             case "3": jumlahHari = 184; break;
//             case "4": jumlahHari = 276; break;
//             case "5": jumlahHari = 365; break;
//             case "6": jumlahHari = 730; break;
//             default: jumlahHari = 365; // Default hari jika tidak cocok
//         }
//     }


//     const bunga = ((nominal * sukuBunga) / 365) * jumlahHari * 0.8; // Setelah pajak 20%
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(bunga);
// }

// Ulangi pola yang sama untuk hitungBungaPeduli, hitungBungaDEBUTSanmere, hitungBungaDEBUTMatius, hitungBungaGreen
// export function hitungBungaPeduli(nominal, jangkaWaktu, customSukuBunga) {
//     let sukuBunga;
//     let jumlahHari;

//     if (customSukuBunga !== undefined && customSukuBunga !== null) {
//         sukuBunga = customSukuBunga;
//     } else {
//         switch (jangkaWaktu) {
//             case "1": jumlahHari = 184; break;
//             case "2": jumlahHari = 276; break;
//             case "3": jumlahHari = 365; break;
//             default: sukuBunga = 0.0675;
//         }
//     }

//     if (customSukuBunga === undefined || customSukuBunga === null) {
//         switch (jangkaWaktu) {
//             case "1": jumlahHari = 184; break;
//             case "2": jumlahHari = 276; break;
//             case "3": jumlahHari = 365; break;
//             default: jumlahHari = 365;
//         }
//     } else {
//         switch (jangkaWaktu) {
//             case "1": jumlahHari = 184; break;
//             case "2": jumlahHari = 276; break;
//             case "3": jumlahHari = 365; break;
//             default: jumlahHari = 365;
//         }
//     }

//     const bunga = ((nominal * sukuBunga) / 365) * jumlahHari * 0.8;
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(bunga);
// }
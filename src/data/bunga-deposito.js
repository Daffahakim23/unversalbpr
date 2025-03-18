
export function hitungBungaUniversal(nominal, jangkaWaktu) {
    let sukuBunga;
    switch (jangkaWaktu) {
        case "1":
            sukuBunga = 0.055; // 1 Bulan (5.5% per tahun)
            break;
        case "2":
            sukuBunga = 0.0625; // 3 Bulan (6.25% per tahun)
            break;
        case "3":
        case "4":
        case "5":
            sukuBunga = 0.0675; // 6, 9, 12, 24 Bulan (6.75% per tahun)
            break;
        default:
            sukuBunga = 0.06; // Default 6% jika jangka waktu tidak cocok
    }
    const bunga = nominal * sukuBunga * 0.8; // Setelah pajak 20%
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bunga);
}

export function hitungBungaPeduli(nominal, jangkaWaktu) {
    let sukuBunga;
    switch (jangkaWaktu) {
        case "1":
            sukuBunga = 0.0675; // 6 Bulan (6.75% per tahun)
            break;
        case "2":
            sukuBunga = 0.0675; // 9 Bulan (6.75% per tahun)
            break;
        case "3":
            sukuBunga = 0.0675; // 12 Bulan (6.75% per tahun)
            break;
        default:
            sukuBunga = 0.0675; // Default 6.75% jika jangka waktu tidak cocok
    }
    const bunga = nominal * sukuBunga * 0.8; // Setelah pajak 20%
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bunga);
}

export function hitungBungaDEBUTSanmere(nominal, jangkaWaktu) {
    let sukuBunga;
    switch (jangkaWaktu) {
        case "1":
            sukuBunga = 0.0575; // 12 Bulan (5.75% per tahun)
            break;
        case "2":
            sukuBunga = 0.0625; // 24 Bulan (6.25% per tahun)
            break;
        case "3":
            sukuBunga = 0.0675; // 36 Bulan (6.75% per tahun)
            break;
        default:
            sukuBunga = 0.06; // Default 6% jika jangka waktu tidak cocok
    }
    const bunga = nominal * sukuBunga * 0.8; // Setelah pajak 20%
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bunga);
}

export function hitungBungaDEBUTMatius(nominal, jangkaWaktu) {
    let sukuBunga;
    switch (jangkaWaktu) {
        case "1":
            sukuBunga = 0.0575; // 12 Bulan (5.75% per tahun)
            break;
        case "2":
            sukuBunga = 0.0625; // 24 Bulan (6.25% per tahun)
            break;
        case "3":
            sukuBunga = 0.0675; // 36 Bulan (6.75% per tahun)
            break;
        default:
            sukuBunga = 0.06; // Default 6% jika jangka waktu tidak cocok
    }
    const bunga = nominal * sukuBunga * 0.8; // Setelah pajak 20%
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bunga);
}

export function hitungBungaGreen(nominal, jangkaWaktu) {
    let sukuBunga;
    switch (jangkaWaktu) {
        case "1":
            sukuBunga = 0.0625; // 3 Bulan (6.25% per tahun)
            break;
        case "2":
            sukuBunga = 0.0675; // 6 Bulan (6.75% per tahun)
            break;
        case "3":
            sukuBunga = 0.0675; // 9 Bulan (6.75% per tahun)
            break;
        default:
            sukuBunga = 0.06; // Default 6% jika jangka waktu tidak cocok
    }
    const bunga = nominal * sukuBunga * 0.8; // Setelah pajak 20%
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(bunga);
}
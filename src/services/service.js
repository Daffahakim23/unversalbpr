import api from '@/API/api.js';

export async function fetchBranches() {
    try {
        const response = await api.get('/list-branch');
        if (response.data && response.data.branch) {
            const kantorCabangOptions = response.data.branch.map(branch => {
                const label = branch.branch_name.replace(/\s*\(\d+\)$/, '').trim();
                return { label, value: branch.branch_code };
            });

            const kantorCabangAlamat = response.data.branch.reduce((acc, branch) => {
                acc[branch.branch_code] = branch.branch_address.Valid ? branch.branch_address.String : 'Alamat tidak tersedia';
                return acc;
            }, {});

            return { kantorCabangOptions, kantorCabangAlamat };
        }
    } catch (error) {
        console.error('Gagal mengambil data kantor cabang:', error);
        return { kantorCabangOptions: [], kantorCabangAlamat: {} };
    }
}

export async function fetchPekerjaan() {
    try {
        const response = await api.get("/list-pekerjaan");
        console.log("Data pekerjaan diterima:", response.data);

        if (response.data && response.data.pekerjaan) {
            const pekerjaanOptions = response.data.pekerjaan.map(p => ({
                label: p.label,
                value: p.code
            }));
            console.log("Pekerjaan options:", pekerjaanOptions);
            return pekerjaanOptions; // Mengembalikan pekerjaanOptions
        } else {
            console.error("Format data pekerjaan tidak sesuai:", response.data);
            return []; // Mengembalikan array kosong jika format tidak sesuai
        }
    } catch (error) {
        console.error("Gagal mengambil data pekerjaan:", error.response ? error.response.data : error.message);
        return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
}

export async function fetchBidangPekerjaan() {
    try {
        const response = await api.get("/list-bidang-pekerjaan");
        console.log("Data bidang pekerjaan diterima:", response.data);

        if (response.data && response.data.bidangPekerjaan) {
            const bidangPekerjaanOptions = response.data.bidangPekerjaan.map(p => ({
                label: p.label,
                value: p.code
            }));
            console.log("Bidang pekerjaan options:", bidangPekerjaanOptions);
            return bidangPekerjaanOptions; // Mengembalikan bidangPekerjaanOptions
        } else {
            console.error("Format data bidang pekerjaan tidak sesuai:", response.data);
            return []; // Mengembalikan array kosong jika format tidak sesuai
        }
    } catch (error) {
        console.error("Gagal mengambil data bidang pekerjaan:", error.response ? error.response.data : error.message);
        return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
}

export async function fetchJabatan(kodePekerjaan) {
    try {
        console.log("Mengambil jabatan untuk pekerjaan:", kodePekerjaan);
        const response = await api.get("/list-jabatan");
        console.log("Data jabatan diterima:", response.data);

        if (response.data && response.data.jabatan) {
            const jabatanOptions = response.data.jabatan
                .filter(j => j.occupation_code === String(kodePekerjaan))
                .map(j => ({
                    label: j.label,
                    value: j.code
                }));

            console.log("Jabatan options:", jabatanOptions);
            return jabatanOptions; // Mengembalikan jabatanOptions
        } else {
            console.error("Format data jabatan tidak sesuai:", response.data);
            return []; // Mengembalikan array kosong jika format tidak sesuai
        }
    } catch (error) {
        console.error("Gagal mengambil data jabatan:", error.response ? error.response.data : error.message);
        return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
}

export async function fetchJabatanKonfirmasi() {
    try {
        const response = await api.get("/list-jabatan");
        console.log("Data jabatan diterima:", response.data);

        if (response.data && response.data.jabatan) {
            const jabatanOptions = response.data.jabatan.map(j => ({
                label: j.label,
                value: j.code
            }));

            console.log("Jabatan options:", jabatanOptions);
            return jabatanOptions; // Mengembalikan jabatanOptions
        } else {
            console.error("Format data jabatan tidak sesuai:", response.data);
            return []; // Mengembalikan array kosong jika format tidak sesuai
        }
    } catch (error) {
        console.error("Gagal mengambil data jabatan:", error.response ? error.response.data : error.message);
        return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
}
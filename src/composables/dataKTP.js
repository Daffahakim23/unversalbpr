import { reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/API/api";
import { FormModelDataKTP } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";

export function useKTPForm(apiEndpoint, navigateTo) {
    const router = useRouter();
    const route = useRoute();
    const fileStore = useFileStore();

    const form = reactive(new FormModelDataKTP());

    const isButtonDisabled = computed(() => {
        return Object.entries(form).some(([key, value]) => {
            if (key === "jenisKelamin") {
                return false;
            }
            if (key === "kewarganegaraanLainnya" && form.kewarganegaraan) {
                return false;
            }
            return !value;
        });
    });

    async function fetchData() {
        if (fileStore.formKTP?.message && Object.keys(fileStore.formKTP.message).length > 0) {
            Object.assign(form, {
                nik: fileStore.formKTP.message.nik || "",
                namaLengkap: fileStore.formKTP.message.nama_lengkap || "",
                tanggalLahir: fileStore.formKTP.message.tanggal_lahir || "",
                tempatLahir: fileStore.formKTP.message.tempat_lahir || "",
                jenisKelamin: Boolean(fileStore.formKTP.message.jenis_kelamin),
                kewarganegaraan: Boolean(fileStore.formKTP.message.kewarganegaraan),
                agama: Number(fileStore.formKTP.message.agama) || "",
                alamat: fileStore.formKTP.message.alamat_ktp || "",
                rt: fileStore.formKTP.message.rt || "",
                rw: fileStore.formKTP.message.rw || "",
                provinsi: fileStore.formKTP.message.provinsi || "",
                kota: fileStore.formKTP.message.kota || "",
                kecamatan: fileStore.formKTP.message.kecamatan || "",
                kelurahan: fileStore.formKTP.message.desa_kelurahan || "",
                kodePos: fileStore.formKTP.message.kode_pos || "",
                statusPerkawinan: Number(fileStore.formKTP.message.status_pernikahan),
                masaAktifKtp: fileStore.formKTP.message.berlaku_sampai || (fileStore.formKTP.message.berlaku_seumur_hidup ? "Seumur Hidup" : ""),
                namaIbuKandung: fileStore.formKTP.message.nama_gadis_ibu_kandung || "",
                kewarganegaraanLainnya: fileStore.formKTP.message.kewarganegaraanLainnya || "",
            });
        }
    }

    function goBack() {
        router.push({
            name: "PreviewScreenPembukaanRekeningExisting",
            query: {
                documentType: "ktp",
                fileUrl: route.query.fileUrl,
            },
        });
    }

    async function handleSubmit() {
        try {
            let formattedDate = form.tanggalLahir;
            if (/^\d{2}-\d{2}-\d{4}$/.test(formattedDate)) {
                const [day, month, year] = formattedDate.split("-");
                formattedDate = `${year}-${month}-${day}`;
            }
            if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
                alert("Format tanggal tidak valid! Gunakan format YYYY-MM-DD.");
                return;
            }

            const uuid = fileStore.uuid;
            if (!uuid) {
                alert("Terjadi kesalahan, UUID tidak ditemukan.");
                return;
            }

            const requestData = {
                id: uuid,
                nik: form.nik,
                nama_lengkap: form.namaLengkap,
                tanggal_lahir: formattedDate,
                tempat_lahir: form.tempatLahir,
                jenis_kelamin: Boolean(form.jenisKelamin),
                agama: Number(form.agama),
                alamat_ktp: form.alamat,
                rt: form.rt,
                rw: form.rw,
                provinsi: form.provinsi,
                kota: form.kota,
                kecamatan: form.kecamatan,
                desa_kelurahan: form.kelurahan,
                kode_pos: Number(form.kodePos),
                status_pernikahan: Number(form.statusPerkawinan),
                berlaku_sampai: form.masaAktifKtp,
                nama_gadis_ibu_kandung: form.namaIbuKandung,
                kewarganegaraan: Boolean(form.kewarganegaraan),
                kewarganegaraanLainnya: form.kewarganegaraanLainnya,
            };

            const response = await api.post(apiEndpoint, requestData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200 || response.status === 201) {
                fileStore.setFormDataKTP(form);
                fileStore.isKtpUploaded = true;
                router.push(navigateTo);
            } else {
                console.error("Gagal mengirim data, status:", response.status);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }

    onMounted(() => {
        fetchData();
    });

    return { form, isButtonDisabled, fetchData, handleSubmit, goBack };
}

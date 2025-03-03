import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
// import { useFileStore } from "@/stores/filestore";
// import { useRouter, useRoute } from "vue-router";

export function useWebcam(route) {

    const photoUrl = ref(null);
    const video = ref(null);
    const canvas = ref(null);
    const stream = ref(null);
    const isUploading = ref(false);

    const documentType = computed(() => route.query.documentType);
    const startWebcam = async () => {
        if (documentType.value !== "fotoDiri") return; // 🔥 Kamera hanya aktif untuk fotoDiri

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.value = mediaStream;
            await nextTick();

            if (video.value) {
                video.value.srcObject = mediaStream;
            } else {
                console.error("Video element not found!");
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
        }
    };

    const capturePhoto = () => {
        if (!canvas.value || !video.value) return;

        const ctx = canvas.value.getContext("2d");
        canvas.value.width = video.value.videoWidth;
        canvas.value.height = video.value.videoHeight;
        ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
        photoUrl.value = canvas.value.toDataURL("image/png");

        stopWebcam();
    };

    const stopWebcam = () => {
        if (stream.value) {
            stream.value.getTracks().forEach(track => track.stop());
            stream.value = null;
        }
    };

    const retakePhoto = () => {
        photoUrl.value = null;
        startWebcam();
    };

    const uploadPhoto = async () => {
        if (isUploading.value) return;
        isUploading.value = true;
        try {
            const response = await fetch(photoUrl.value);
            if (!response.ok) throw new Error("Gagal mengambil foto dari URL.");
            const blob = await response.blob();
            if (blob.size === 0) throw new Error("Ukuran foto tidak valid.");
            const file = new File([blob], "foto_diri.jpg", { type: "image/jpeg" });

            const uuid = fileStore.uuid;
            // const uuid = "b6bd92bb-80d0-46cb-94fa-906c4e48ca38";
            if (!uuid) throw new Error("UUID tidak ditemukan di fileStore");
            const formData = new FormData();
            formData.append("user_foto", file);
            formData.append("uuid", uuid);
            console.log("Mengunggah foto dengan UUID:", uuid);
            const uploadResponse = await api.post("/foto-diri", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Unggah sukses:", uploadResponse.data);

            // Simpan hanya jika upload berhasil
            fileStore.$patch((state) => {
                state.uploadedFiles["fotoDiri"] = "dummyImageFile";
                state.isFotoDiriUploaded = true;
            });

            fileStore.setFormDataFotoDiri(uploadResponse.data);
            console.log("Foto disimpan ke fileStore:", fileStore.formFotoDiri);
            router.push({ path: "/dashboard/uploadDokumenPembukaanRekeningNTB" });

        } catch (error) {
            console.error("Gagal mengunggah:", error.response?.data || error.message);
            alert(`Upload gagal: ${error.message}`);
            fileStore.isFotoDiriUploaded = false;
        } finally {
            isUploading.value = false;
        }
    };
    onMounted(() => {
        startWebcam();
    });

    onBeforeUnmount(() => {
        stopWebcam();
    });

    return {
        capturePhoto,
        uploadPhoto,
        retakePhoto,
        photoUrl,
        video,
        canvas,
        documentType,
    };
}

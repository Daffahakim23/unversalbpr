<template>
    <div class="">
        <button @click="openModal" class="flex items-center text-primary mb-4 gap-1">
            <p class="text-base font-semibold">Panduan Foto</p>
            <img src="@/assets/Question.png" alt="Logo" class="h-5" />
        </button>
        <ModalPanduanFoto :isOpen="isModalOpen" @close="isModalOpen = false" />

        <!-- Container Webcam -->
        <div class="webcam-preview relative mb-4 w-full h-90 overflow-hidden rounded-lg" v-if="!photoUrl">
            <video ref="video" class="w-full h-full object-cover transform scale-x-[-1]" autoplay></video>

            <!-- Overlay untuk penempatan wajah -->
            <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img src="@/assets/overlay-wajah.png" alt="Face Overlay"
                    class="h-full w-auto max-w-full object-cover opacity-90" />
            </div>
        </div>

        <!-- Canvas -->
        <canvas ref="canvas" class="w-full h-80 rounded-lg" style="display: none;"></canvas>

        <div v-if="photoUrl" class="mt-4">
            <img :src="photoUrl" alt="Foto yang Diambil" class="w-full rounded-lg shadow-md" />
        </div>

        <div class="controls item-center mt-6 w-full">
            <ButtonComponent v-if="!photoUrl" @click="capturePhoto">
                Ambil Foto
            </ButtonComponent>
            <div v-else class="controls flex justify-between mt-4 w-full">
                <ButtonComponent variant="outline" @click="retakePhoto">Foto Ulang</ButtonComponent>
                <ButtonComponent @click.prevent="uploadPhoto">Simpan Foto</ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import api from "@/API/api";
import { useFileStore } from "@/stores/filestore";
import { useRouter } from "vue-router";
import ButtonComponent from "@/components/button.vue";
import ModalPanduanFoto from "@/components/ModalPanduan.vue";

export default {
    components: {
        ButtonComponent,
        ModalPanduanFoto,
    },

    data() {
        return {
            isModalOpen: false,
        };
    },

    methods: {
        openModal() {
            console.log("Modal dibuka!");
            this.isModalOpen = true;
        },
    },
    setup() {
        const photoUrl = ref(null);
        const video = ref(null);
        const canvas = ref(null);
        const stream = ref(null); // 🔥 Stream jadi reactive
        const router = useRouter();
        const fileStore = useFileStore();
        const isUploading = ref(false);

        const startWebcam = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((mediaStream) => {
                    stream.value = mediaStream; // 🔥 Simpan stream ke ref
                    video.value.srcObject = mediaStream;
                })
                .catch((err) => {
                    console.error("Error accessing webcam:", err);
                });
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
            try {
                const response = await fetch(photoUrl.value);
                if (!response.ok) throw new Error("Gagal mengambil foto dari URL.");

                const blob = await response.blob();
                if (blob.size === 0) throw new Error("Ukuran foto tidak valid.");

                const file = new File([blob], "foto_diri.jpg", { type: "image/jpeg" });

                const uuid = fileStore.uuid;
                if (!uuid) throw new Error("UUID tidak ditemukan di fileStore");

                const formData = new FormData();
                formData.append("user_foto", file);
                formData.append("uuid", uuid);

                console.log("Mengunggah foto dengan UUID:", uuid);

                const uploadResponse = await api.post("/foto-diri-deposito", formData, {
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

                router.push({ path: "/dashboard/uploadDokumenPenempatanDepositoNTB" });

            } catch (error) {
                console.error("Gagal mengunggah:", error.response?.data || error.message);
                alert(`Upload gagal: ${error.message}`);

                // Pastikan isFotoDiriUploaded tetap false jika terjadi kegagalan
                fileStore.isFotoDiriUploaded = false;
            }
        };

        watch(photoUrl, (newVal) => {
            console.log("photoUrl updated:", newVal);
        });

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
        };
    },
};
</script>


<style>
.overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 200px;
    border: 2px dashed white;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
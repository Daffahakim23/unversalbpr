<template>
  <div>
    <div>
      <button @click="openModal" class="flex items-center text-primary mb-4 gap-1">
        <p class="text-base font-semibold">Panduan Foto {{ documentTypeText }}</p>
        <img src="@/assets/Question.png" alt="Panduan" class="h-5" />
      </button>
      <img :src="fileUrl" class="w-full rounded-lg" @error="handleFileNotFound" />
      <div v-if="!fileUrl && documentType !== 'fotoDiri'"
        class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-14 rounded-lg cursor-pointer hover:bg-gray-50"
        @click="openFilePicker">
        <img src="@/assets/upload-dokumen.svg" alt="Tambah Dokumen" class="h-24 w-24 mb-8">
        <p class="text-sm text-gray-500">Klik untuk mengunggah {{ documentTypeText }}</p>
      </div>

      <div v-if="documentType === 'fotoDiri'">
        <div class="webcam-preview relative mb-4 w-full h-90 overflow-hidden rounded-lg" v-if="!photoUrl">
          <video ref="video" class="w-full h-full object-cover transform scale-x-[-1]" autoplay></video>

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

      <ModalPanduanFoto :isOpen="isModalOpen" :documentType="documentType" @close="handleModalClose" />
      <div class="mt-6 flex justify-between" v-if="documentType !== 'fotoDiri'">
        <ButtonComponent variant="outline" @click="reuploadFile">Upload Ulang</ButtonComponent>
        <ButtonComponent @click="saveFile" :disabled="isButtonDisabled || isUploading">
          Simpan
        </ButtonComponent>
      </div>
    </div>
    <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept="image/*" />
  </div>
  <!-- Modal untuk Verifikasi Gagal -->
  <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg" @close="isModalError = false"
    @buttonClick1="retakePhoto" />
</template>

<script>
// import axios from "axios";
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import api from "@/API/api"
import { useFileStore } from "@/stores/filestore";
import { useRouter, useRoute } from "vue-router";
import ModalPanduanFoto from "@/components/ModalPanduan.vue";
import ButtonComponent from "@/components/button.vue"
import FormField from "@/components/FormField.vue";
import ModalError from "@/components/ModalError.vue";

export default {
  props: {
    documentType: {
      type: String,
    },
  },
  emits: ["update-progress"],
  components: {
    FormField,
    ModalPanduanFoto,
    ButtonComponent,
    ModalError,
  },

  data() {
    return {
      isModalOpen: true,
      isUploading: false,
      isModalError: false,
      modalContent: [
        {
          label: "Verifikasi Gagal",
          description: "Data yang Anda masukkan tidak sesuai dengan data yang terdaftar. Mohon periksa kembali informasi Anda dan coba lagi.",
          buttonString1: "Ulangi Verifikasi",
          buttonString2: "Hubungi Customer Care",
        },
      ],
    };
  },

  computed: {
    isButtonDisabled() {
      return !this.fileUrl && !this.photoUrl;
    },
    documentTypeText() {
      const textMap = {
        ktp: "e-KTP",
        fotoDiri: "Liveness",
      };
      return textMap[this.documentType] || "Dokumen";
    },
    fileUrl() {
      return this.$route.query.fileUrl;
    },
    // documentType() {
    //   return this.$route.query.documentType;
  },

  setup() {
    const fileStore = useFileStore();
    const router = useRouter();
    const route = useRoute();
    const photoUrl = ref(null);
    const video = ref(null);
    const canvas = ref(null);
    const stream = ref(null);
    const isUploading = ref(false);
    const documentType = computed(() => route.query.documentType);
    const isModalError = ref(false);
    const modalContent = ref([
      {
        label: "",
        description: "",
        icon: "",
        buttonString1: "",
        buttonString2: "",
      },
    ]);

    const showErrorModal = (title, message, btnString1 = "OK", btnString2 = "Batal", icon = "error-icon.svg") => {
      modalContent.value = [
        {
          label: title,
          description: message,
          icon: new URL(`/src/assets/${icon}`, import.meta.url).href,
          buttonString1: btnString1,
          buttonString2: btnString2,
        },
      ];
      isModalError.value = true;
    };

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
      isModalError.value = false;
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
        if (!uuid) {
          console.error("UUID tidak ditemukan di fileStore");
          throw new Error("UUID tidak ditemukan");
        }

        const formData = new FormData();
        formData.append("user_foto", file);
        formData.append("uuid", uuid);
        console.log("Mengunggah foto dengan UUID:", uuid);
        const uploadResponse = await api.post("/foto-diri-pengkinian-data", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Unggah sukses:", uploadResponse.data);
        fileStore.$patch((state) => {
          state.uploadedFiles["fotoDiri"] = "dummyImageFile";
          state.isFotoDiriUploaded = true;
        });
        fileStore.setFormDataFotoDiri(uploadResponse.data);
        console.log("Foto disimpan ke fileStore:", fileStore.formFotoDiri);
        router.push({ path: "/dashboard/uploadDokumenPengkinianData" });
      } catch (error) {
        showErrorModal("Foto Diri Gagal", "Email Anda belum terdaftar. Silakan kembali ke halaman awal untuk mendaftarkan email Anda.", "Verifikasi Ulang", "Hubungi Customer Care", "data-failed-illus.svg");
        console.error("Gagal mengunggah:", error.response?.data || error.message);
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
      isModalError,
      modalContent,
      showErrorModal,
      capturePhoto,
      uploadPhoto,
      retakePhoto,
      photoUrl,
      video,
      canvas,
      documentType,
      fileStore,
    };
  },

  methods: {
    showModalError(title, message, btnString1 = "OK", btnString2 = "Batal", icon = "error-icon.svg") {
      this.modalContent = [{
        label: title,
        description: message,
        icon: new URL(`/src/assets/${icon}`, import.meta.url).href,
        buttonString1: btnString1,
        buttonString2: btnString2,
      }];
      this.isModalError = true;
    },

    handleFileNotFound() {
      console.warn("File URL tidak ditemukan, redirecting...");
      this.$router.replace("/dashboard/uploadDokumenPengkinianData");
    },

    openFilePicker() {
      if (this.isClicking) return;
      this.isClicking = true;

      setTimeout(() => {
        this.$refs.fileInput.click();
        this.isClicking = false;
      }, 300);
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      console.log("File dipilih:", file.name);
      const fileUrl = URL.createObjectURL(file);
      this.$router.push({
        name: "PreviewScreenPengkinianData",
        query: { documentType: this.documentType, fileUrl },
      });
    },

    handleModalClose() {
      this.isModalOpen = false;
      if (this.documentType === "ktp" || this.documentType === "liveness") {
        this.openFilePicker();
      }
    },

    openModal() {
      console.log("Modal dibuka!");
      this.isModalOpen = true;
    },

    async saveFile() {
      if (this.isUploading) {
        console.warn("🚫 Upload sedang berlangsung, tunggu selesai!");
        return;
      }
      this.isUploading = true;

      try {
        console.log(`📤 Mengunggah file untuk: ${this.documentType}`);
        if (!this.documentType) {
          console.error("⚠️ documentType belum diatur!");
          alert("Tipe dokumen tidak valid, silakan coba lagi.");
          return;
        }

        const response = await fetch(this.fileUrl);
        const blob = await response.blob();
        const fileName = "ktp_upload.png";
        const fileField = "user_ktp";
        const apiEndpoint = "ocr-ktp-pengkinian-data";
        const file = new File([blob], fileName, { type: "image/png" });
        const formData = new FormData();
        const fileStore = useFileStore();
        formData.append(fileField, file);
        formData.append("uuid", fileStore.uuid);
        const uploadResponse = await api.post(`/${apiEndpoint}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("✅ Upload sukses:", uploadResponse.data);

        fileStore.setFormDataKTP(uploadResponse.data);
        this.$router.push({
          path: "/dashboard/dataKTPPengkinianData",
          query: { fileUrl: this.fileUrl, documentType: "ktp" },
        });
      } catch (error) {
        console.error("❌ Gagal upload:", error.response?.data || error.message);
        this.showModalError("Verifikasi Gagal", "Data yang Anda masukkan tidak sesuai dengan data yang terdaftar. Mohon periksa kembali informasi Anda dan coba lagi.", "Verifikasi Ulang", "Hubungi Customer Care", "data-failed-illus.svg");
      } finally {
        this.isUploading = false;
      }
    },

    reuploadFile() {
      if (this.isClicking) return;
      this.isClicking = true;
      this.isAgreementChecked = false;
      this.isModalError = false;

      setTimeout(() => {
        this.$refs.fileInput.click();
        this.isClicking = false;
      }, 300);
    },
  },
  mounted() {
    this.$emit("update-progress", 45);
  },
};
</script>

<template>
  <div>
    <div>
      <div class="flex items-center justify-between mb-4 gap-2">
        <button @click="openModal2" class="flex items-center text-primary gap-1">
          <p class="text-base font-semibold">Panduan Foto {{ documentTypeText }}</p>
          <img src="@/assets/Question.png" alt="Panduan" class="h-5" />
        </button>
        <!-- <button v-if="(fileUrl || photoUrl) && documentType !== 'fotoDiri'" @click="changeFile"
          class="flex items-center text-primary-400 gap-1">
          <p class="text-base font-semibold">Ubah Metode</p>
          <img src="@/assets/upload-dokumen.svg" alt="Panduan" class="h-5" />
        </button> -->
      </div>

      <div v-if="!fileUrl && documentType !== 'fotoDiri'">
        <div v-if="showInitialUI"
          class="flex flex-col items-center justify-end py-8 rounded-lg cursor-pointer bg-white border-dashed border-2 border-neutral-200 h-90">
          <img src="@/assets/upload-dokumen.svg" alt="Tambah Dokumen" class="h-16 sm:h-24 md:h-32 lg:h-48 mt-12">
          <div class="flex flex-col md:flex-row mt-12 justify-between w-full px-4 md:px-16 gap-y-4 md:gap-x-8">
            <ButtonComponent variant="ghost" @click="startWebcamDokumen" class="w-full md:w-auto">
              Ambil Foto
            </ButtonComponent>
            <ButtonComponent variant="ghost" @click="openFilePicker" class="w-full md:w-auto">
              Upload Gambar
            </ButtonComponent>
          </div>
        </div>

        <div v-else-if="startWebcamDokumen">
          <div class="webcam-preview relative mb-4 w-full h-90 overflow-hidden rounded-lg" v-if="!photoUrl">
            <video ref="video" class="w-full h-90 object-cover" autoplay></video>
            <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
              <img src="@/assets/overlay-KTP.png" alt="Face Overlay"
                class="h-full w-auto max-w-full object-cover opacity-90" />
            </div>
          </div>

          <canvas ref="canvas" class="w-full h-90 rounded-lg" style="display: none;"></canvas>

          <div v-if="photoUrl" class="mt-4 ">
            <div v-if="documentType === 'npwp'" class="mt-4">
              <FormField label="Nomor NPWP" id="nomornpwp" v-model="nomorNpwp" placeholder="Masukkan Nomor NPWP"
                required variant="numeric" :maxlength="20" />
            </div>
            <img :src="photoUrl" alt="Foto yang Diambil" class="w-full h-90 rounded-lg shadow-md object-cover" />
            <div v-if="documentType === 'tandaTangan'" class="flex items-baseline mt-4">
              <div class="mt-2">
                <CustomCheckbox v-model="isAgreementChecked"
                  labelText="Saya setuju bahwa tanda tangan yang saya foto dan unggah pada aplikasi formulir pencairan deposito ini merupakan spesimen tanda tangan saya." />
              </div>
            </div>
            <Flagbox v-if="showFlag" :type="flagType" class="mt-4 !font-normal">
              {{ flagMessage }}
            </Flagbox>
          </div>

          <div class=" controls item-center mt-6 w-full">
            <div v-if="!photoUrl" class="flex justify-center">
              <ButtonComponent @click="capturePhoto">
                Ambil Foto
              </ButtonComponent>
            </div>
            <div v-else class="controls flex justify-between mt-4 w-full">
              <ButtonComponent variant="outline" @click="retakePhoto">Foto Ulang</ButtonComponent>
              <ButtonComponent @click.prevent="uploadPhoto" :disabled="isSubmitting || isButtonDisabled || isUploading || isDataFail">
                {{ isSubmitting ? "Mengirim..." : "Simpan" }}
              </ButtonComponent>
            </div>
          </div>
        </div>
        <!-- <div class="flex justify-between mt-6">
          <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
        </div> -->
      </div>

      <div v-if="documentType === 'fotoDiri'">
        <div class="webcam-preview relative mb-4 w-full h-90 overflow-hidden rounded-lg" v-if="!photoUrl">
          <video ref="video" class="w-full h-full object-cover transform scale-x-[-1]" autoplay></video>

          <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img src="@/assets/overlay-wajah.png" alt="Face Overlay"
              class="h-full w-auto max-w-full object-cover opacity-90" />
          </div>
        </div>

        <canvas ref="canvas" class="w-full h-80 rounded-lg" style="display: none;"></canvas>

        <div v-if="photoUrl" class="mt-4">
          <img :src="photoUrl" alt="Foto yang Diambil" class="w-full rounded-lg shadow-md" />
          <Flagbox v-if="showFlag" :type="flagType" class="mt-4 !font-normal">
            {{ flagMessage }}
          </Flagbox>
        </div>

        <div class="controls item-center mt-6 w-full">
          <div v-if="!photoUrl" class="flex justify-center">
            <ButtonComponent @click="capturePhoto">
              Ambil Foto
            </ButtonComponent>
          </div>
          <div v-else class="controls flex justify-between mt-4 w-full">
            <ButtonComponent variant="outline" @click="retakePhoto">Foto Ulang</ButtonComponent>
            <ButtonComponent @click.prevent="uploadPhoto" :disabled="isSubmitting || isButtonDisabled || isUploading || isDataFail">{{
              isSubmitting ? "Mengirim..." : "Gunakan Foto" }}
            </ButtonComponent>
          </div>
        </div>
      </div>

      <div v-if="fileUrl">
        <div v-if="documentType === 'npwp'" class="mt-4">
          <FormField label="Nomor NPWP" id="nomornpwp" v-model="nomorNpwp" placeholder="Masukkan Nomor NPWP" required
            variant="numeric" :maxlength="20" />
        </div>
        <img :src="fileUrl" alt="Preview Dokumen" class="w-full rounded-lg" @error="handleFileNotFound" />
        <Flagbox v-if="showFlag" :type="flagType" class="mt-4 !font-normal">
          Verifikasi E-KTP Anda tidak berhasil, silahkan ulangi proses verifikasi E-KTP. Pastikan Anda mengikuti
          petunjuk verifikasi
        </Flagbox>
        <div v-if="documentType === 'tandaTangan'" class="flex items-baseline mt-4">
          <div class="mt-2">
            <CustomCheckbox v-model="isAgreementChecked"
              labelText="Saya setuju bahwa tanda tangan yang saya foto dan unggah pada aplikasi formulir pencairan deposito ini merupakan spesimen tanda tangan saya." />
          </div>
        </div>
      </div>


      <ModalPanduanFoto :isOpen="isModalOpen" :documentType="documentType" @close="handleModalClose"
        @back="handleBack" />
      <ModalPanduanFoto2 :isOpen="isModalOpen2" :documentType="documentType" @close="handleModalClose"
        @back="handleBack" />

      <div class="mt-6 flex justify-between" v-if="documentType !== 'fotoDiri' && fileUrl">
        <!-- <ButtonComponent variant="outline" @click="reuploadFile">Upload Ulang</ButtonComponent> -->
        <ButtonComponent variant="outline" @click="changeFile">Ulangi</ButtonComponent>
        <ButtonComponent @click="saveFile" :disabled="isSubmitting || isButtonDisabled || isUploading">
          {{ isSubmitting ? "Mengirim..." : "Simpan" }}
        </ButtonComponent>
      </div>

    </div>
    <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept="image/*" />
    <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg"
      @close="isModalError = false" @buttonClick1="retakePhoto" @buttonClick2="handleModalErrorClose" />
    <Toaster :type="toasterType" :message="toasterMessage" :show="showToaster" @close="closeToaster" />
  </div>
</template>


<script>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import api from "@/API/api.js"
import { useFileStore } from "@/stores/filestore";
import { useRouter, useRoute } from "vue-router";
import ModalPanduanFoto from "@/components/ModalPanduan.vue";
import ModalPanduanFoto2 from "@/components/ModalPanduan2.vue";
import ButtonComponent from "@/components/button.vue"
import FormField from "@/components/FormField.vue";
import ModalError from "@/components/ModalError.vue";
import Toaster from "@/components/toaster.vue";
import Flagbox from "@/components/flagbox.vue";
import CustomCheckbox from '@/components/CustomCheckbox.vue';

export default {
  props: {
    documentType: {
      type: String,
    },
  },
  emits: ['update-progress', 'set-navbar-config', 'set-cancel-route'],
  components: {
    FormField,
    ModalPanduanFoto,
    ModalPanduanFoto2,
    ButtonComponent,
    ModalError,
    Toaster,
    Flagbox,
    CustomCheckbox
  },

  data() {
    return {
      showFlag: false,
      flagType: "warning",
      flagMessage: "",
      showToaster: false,
      toasterType: 'success',
      toasterMessage: '',
      isModalOpen: true,
      isModalOpen2: false,
      isUploading: false,
      isModalError: false,
      isAgreementChecked: false,
      nomorNpwp: "",
      isSubmitting: false,
      isDataFail: false,
      modalContent: [
        {
          label: "Verifikasi Gagal",
          description: "Data yang Anda masukkan tidak sesuai dengan data yang terdaftar. Mohon periksa kembali informasi Anda dan coba lagi.",
          buttonString1: "Ulangi Verifikasi",
          buttonString2: "Hubungi Universal Care",
        },
      ],
    };
  },

  computed: {
    documentTypeText() {
      const textMap = {
        ktp: "e-KTP",
        npwp: "NPWP",
        tandaTangan: "Tanda Tangan",
        fotoDiri: "Liveness",
      };
      return textMap[this.documentType] || "Dokumen";
    },
    fileUrl() {
      return this.$route.query.fileUrl;
    },
    photoUrl() {
      return this.$route.query.photoUrl;
    },
    isButtonDisabled() {
      if (this.documentType === "npwp") {
        return !this.nomorNpwp.trim();
      } else if (this.documentType === "tandaTangan") {
        return !this.isAgreementChecked;
      } else {
        return !this.fileUrl && !this.photoUrl;
      }
    },
  },

  setup() {
    const livenessFailuresCount = ref(0); // Tambahkan ini
    const maxLivenessFailures = 5; // Batas maksimal kegagalan
    const showFlag = ref(false);
    const flagType = ref('info');
    const flagMessage = ref('');
    const nomorNpwp = ref('');
    const showInitialUI = ref(true);
    const isSubmitting = ref(false);
    const isDataFail = ref(false);
    const isWebcamActive = ref(false);
    const fileStore = useFileStore();
    const router = useRouter();
    const route = useRoute();
    const photoUrl = ref(null);
    const video = ref(null);
    const canvas = ref(null);
    const stream = ref(null);
    const isUploading = ref(false);
    const isModalError = ref(false);
    const isModalErrorLiveness = ref(false);
    const documentType = computed(() => route.query.documentType);
    const modalContent = ref([
      {
        label: "",
        description: "",
        icon: "",
        buttonString1: "",
        buttonString2: "",
      },
    ]);

    const showError = () => {
      showFlag.value = true;
      flagType.value = 'error';
      flagMessage.value = 'Terjadi kesalahan saat memproses data.';
    };

    const showWarning = () => {
      showFlag.value = true;
      flagType.value = 'error';
      flagMessage.value = 'Data yang Anda masukkan tidak valid.';
    };
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
    const showErrorModalLiveness = (title, message, buttons = []) => {
      modalContent.value = [
        {
          label: title,
          description: message,
          icon: new URL(`/src/assets/otp-error-illus.svg`, import.meta.url).href,
          buttonString1: buttons[0] || "Tutup",
          buttonString2: buttons[1],
        },
      ];
      isModalErrorLiveness.value = true;
    };

    const whatsappContact = ref({
      whatsapp: '+622122213993',
    });

    const handleButtonClick1 = (feature) => {
      isModalError.value = false;
      if (feature.buttonString1 === "Hubungi Universal Care") {
        event.stopPropagation();
        openWhatsApp();
        fileStore.$reset();
        router.push({ path: "/" });
        // window.location.reload();
      } else if (feature.buttonString1 === "Coba Lagi") {
        isModalErrorLiveness.value = false;
      }
    };

    const handleButtonClick2 = (feature) => {
      isModalError.value = false;
      if (feature.buttonString2 === "Hubungi Universal Care") {
        event.stopPropagation();
        openWhatsApp();
        fileStore.$reset();
        router.push({ path: "/" });
      } else if (feature.buttonString2 === "Batal" || feature.buttonString2 === "Tutup") {
        isModalErrorLiveness.value = false;
      }
    };

    const getWhatsAppLink = (number) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        return `https://wa.me/${number}`;
      } else {
        return `https://web.whatsapp.com/send?phone=${number}`;
      }
    };

    const openWhatsApp = () => {
      if (whatsappContact.value.whatsapp) {
        window.open(getWhatsAppLink(whatsappContact.value.whatsapp), '_blank');
      }
    };

    const startWebcamFotoDiri = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
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

    const startWebcamDokumen = async () => {
      try {
        showInitialUI.value = false;

        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: isMobile ? "environment" : "user" },
        });

        stream.value = mediaStream;
        isWebcamActive.value = true;
        await nextTick();

        if (video.value) {
          video.value.srcObject = mediaStream;
        } else {
          console.warn("❗ Video element still not found. Retrying...");
          setTimeout(() => {
            if (video.value) {
              video.value.srcObject = mediaStream;
            } else {
              console.error("🚨 Video element not found after retry!");
            }
          }, 500);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    const startWebcam = () => {
      if (documentType.value === "fotoDiri") {
        startWebcamFotoDiri();
      } else {
        startWebcamDokumen();
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
      isModalError.value = false;
      showFlag.value = false;
      isDataFail.value = false;
      startWebcam();
    };

    const uploadPhoto = async () => {
      if (isSubmitting.value) {
        return;
      }
      isSubmitting.value = true;
      if (isUploading.value || !photoUrl.value) return;
      isUploading.value = true;

      try {
        console.log(`📤 Uploading file for: ${documentType.value}`);
        if (!documentType.value || !fileStore.uuid) {
          showFlag.value = true;
          flagType.value = 'warning';
          flagMessage.value = "User ID tidak ditemukan silahkan ulangi pengisian data dari awal.";
          return;
        }

        const response = await fetch(photoUrl.value);
        const blob = await response.blob();
        const fileName =
          documentType.value === "ktp" ? "ktp_upload.png" :
            "foto_diri.png";

        const fileField =
          documentType.value === "ktp" ? "user_ktp" : "user_foto";

        const apiEndpoint =
          documentType.value === "ktp" ? "/ocr-ktp-pencairan-deposito" : "/foto-diri-pencairan-deposito";

        const file = new File([blob], fileName, { type: "image/png" });
        const formData = new FormData();
        formData.append(fileField, file);
        formData.append("uuid", fileStore.uuid);

        const uploadResponse = await api.post(`${apiEndpoint}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("✅ Upload sukses:", uploadResponse.data);

        if (documentType.value === "ktp") {
          fileStore.setFormDataKTP(uploadResponse.data);
        }
        else if (documentType.value === "fotoDiri") {
          fileStore.setFormDataFotoDiri(uploadResponse.data);
          fileStore.isFotoDiriUploaded = true;
          fileStore.uploadedFiles["fotoDiri"] = "Foto Diri";
        }

        if (documentType.value === "ktp") {
          router.push({
            path: "/dashboard/dataKTPPencairanDeposito",
            query: { fileUrl: photoUrl, documentType: "ktp" },
          });
        } else {
          router.push({ name: "UploadDokumenPencairanDeposito" });
        }
      } catch (error) {
        // showErrorModal(error.response?.data?.message, error.response?.data?.Subtext, "Verifikasi Ulang", "Tutup");
        showFlag.value = true;
        flagType.value = 'warning';
        if (documentType.value === "fotoDiri") {
          livenessFailuresCount.value++;
          console.log("Liveness Failures Count:", livenessFailuresCount.value);
          let message = error.response?.data?.message || "Terjadi kesalahan saat verifikasi wajah.";
          let subtext = error.response?.data?.Subtext || "Pastikan wajah Anda terlihat jelas dan ikuti petunjuk.";
          flagMessage.value = `${message}, ${subtext}`;
          isDataFail.value = true;
          let title = "Terjadi Kesalahan";
          let subtitle = "Periksa kembali koneksi internet Anda";
          let buttons = ["Coba Lagi", "Hubungi Universal Care"];
          if (livenessFailuresCount.value >= maxLivenessFailures) {
            title = "Akun Anda dibatasi";
            subtitle = "Anda telah gagal melakukan verifikasi wajah sebanyak 5 kali. Untuk alasan keamanan, Anda bisa mencoba kembali verifikasi wajah 24 jam ke depan. Jika Anda membutuhkan bantuan segera, silakan hubungi Universal Care.";
            buttons = ["Hubungi Universal Care"];
            livenessFailuresCount.value = 0;
            showErrorModalLiveness(title, subtitle, buttons);
          }

        } else if (documentType.value === "ktp") {
          flagMessage.value = "Verifikasi e-KTP gagal. Pastikan gambar e-KTP jelas dan terbaca.";
        } else {
          flagMessage.value = "Gagal mengunggah foto. Silakan coba lagi.";
        }
        console.error("❌ Gagal upload:", error.response?.data || error.message);
        // showModalError("Verifikasi Gagal", "Data yang Anda masukkan tidak sesuai dengan data yang terdaftar. Mohon periksa kembali informasi Anda dan coba lagi.", "Verifikasi Ulang", "Hubungi Universal Care", "data-failed-illus.svg");
      } finally {
        isUploading.value = false;
        isSubmitting.value = false;
      }
    };

    onMounted(() => {
      if (documentType.value === "fotoDiri") {
        startWebcamFotoDiri();
      }
    });

    onBeforeUnmount(() => {
      if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop());
      }
    });

    return {
      isModalErrorLiveness,
      livenessFailuresCount,
      maxLivenessFailures,
      showInitialUI,
      isWebcamActive,
      isModalError,
      modalContent,
      showErrorModal,
      showErrorModalLiveness,
      startWebcamDokumen,
      startWebcam,
      capturePhoto,
      uploadPhoto,
      retakePhoto,
      photoUrl,
      video,
      canvas,
      stream,
      documentType,
      fileStore,
      showFlag,
      flagType,
      flagMessage,
      showError,
      showWarning,
      nomorNpwp,
      whatsappContact,
      getWhatsAppLink,
      openWhatsApp,
      handleButtonClick1,
      handleButtonClick2,
      isSubmitting,
      isDataFail,
    };
  },

  methods: {
    goBack() {
      this.$router.push({ name: 'uploadDokumenPencairanDeposito' });
    },
    handleBack() {
      this.$router.push({ name: 'uploadDokumenPencairanDeposito' });
    },
    changeFile() {
      this.photoUrl = null;
      this.fileUrl = null;
      this.showInitialUI = true;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = null;
      }
      this.$router.push({
        name: "PreviewScreenPencairanDeposito",
        query: { documentType: this.documentType },
      });
    },

    showError() {
      this.showFlag = true;
      this.flagType = "error";
      this.flagMessage = "Terjadi kesalahan saat memproses data.";
    },

    showWarning() {
      this.showFlag = true;
      this.flagType = "warning";
      this.flagMessage = "Data yang Anda masukkan tidak valid.";
    },
    showSuccess() {
      this.toasterType = 'success';
      this.toasterMessage = 'Operasi berhasil!';
      this.showToaster = true;
    },
    showError() {
      this.toasterType = 'error';
      this.toasterMessage = 'Terjadi kesalahan!';
      this.showToaster = true;
    },
    showWarning() {
      this.toasterType = 'warning';
      this.toasterMessage = 'Peringatan!';
      this.showToaster = true;
    },
    closeToaster() {
      this.showToaster = false;
    },
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
      this.$router.replace("/dashboard/uploadDokumenPencairanDeposito");
    },

    openFilePicker() {
      if (this.isClicking) return;
      this.isClicking = true;

      setTimeout(() => {
        this.$refs.fileInput.click();
        this.isClicking = false;
      }, 300);
    },

    // handleFileUpload(event) {
    //   const file = event.target.files[0];
    //   if (!file) return;

    //   console.log("File dipilih:", file.name);
    //   const fileUrl = URL.createObjectURL(file);
    //   this.$router.push({
    //     name: "PreviewScreenPencairanDeposito",
    //     query: { documentType: this.documentType, fileUrl },
    //   });
    // },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        this.showModalError("Format Gambar Salah", "Hanya format gambar JPG/JPEG atau PNG yang diizinkan. Harap periksa kembali format file yang Anda coba unggah.", null, "Tutup", "data-failed-illus.svg");
        // this.showError();
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = null;
        }
        return;
      }

      console.log("File dipilih:", file.name);
      const fileUrl = URL.createObjectURL(file);
      this.$router.push({
        name: "PreviewScreenPencairanDeposito",
        query: { documentType: this.documentType, fileUrl },
      });
    },

    handleModalClose() {
      this.isModalOpen = false;
      this.isModalOpen2 = false;
      // if (this.documentType === "ktp" || this.documentType === "liveness" || this.documentType === "npwp" || this.documentType === "tandaTangan") {
      // this.openFilePicker();
    },


    handleModalErrorClose() {
      this.isModalError = false;
    },

    openModal() {
      console.log("Modal dibuka!");
      this.isModalOpen = true;
    },

    openModal2() {
      console.log("Modal dibuka!");
      this.isModalOpen2 = true;
    },

    async saveFile() {
      if (this.isSubmitting) {
        return;
      }
      this.isSubmitting = true;
      try {
        if (!this.documentType || !this.fileStore.uuid) {
          this.showFlag = true;
          this.flagType = "warning";
          this.flagMessage = "User ID tidak ditemukan silahkan ulangi pengisian data dari awal.";
          return;
        }
        console.log(`📤 Mengunggah file untuk: ${this.documentType}`);
        if (!this.documentType) {
          console.error("⚠️ documentType belum diatur!");
          alert("Tipe dokumen tidak valid, silakan coba lagi.");
          return;
        }

        // if (this.isUploading) {
        //   console.warn("🚫 Upload sedang berlangsung, tunggu selesai!");
        //   return;
        // }
        // this.isUploading = true;

        const response = await fetch(this.fileUrl);
        const blob = await response.blob();
        const fileName =
          this.documentType === "ktp" ? "ktp_upload.png" :
            this.documentType === "tandaTangan" ? "tanda_tangan.png" :
              "npwp_upload.png";

        const fileField =
          this.documentType === "ktp" ? "user_ktp" :
            this.documentType === "tandaTangan" ? "user_ttd" :
              "user_npwp";

        const apiEndpoint =
          this.documentType === "ktp" ? "ocr-ktp-pencairan-deposito" :
            this.documentType === "tandaTangan" ? "tt-basah-pencairan-deposito" :
              "npwp-pencairan-deposito";

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

        if (this.documentType === "ktp") {
          fileStore.setFormDataKTP(uploadResponse.data);
        } else if (this.documentType === "tandaTangan") {
          fileStore.setFormDataTandaTangan(uploadResponse.data);
          fileStore.isTandaTanganUploaded = true;
          fileStore.uploadedFiles["tandaTangan"] = "Foto Tanda Tangan";
        } else if (this.documentType === "npwp") {
          fileStore.setFormDataNPWP(uploadResponse.data);
          fileStore.isNpwpUploaded = true;
          fileStore.uploadedFiles["npwp"] = "Foto NPWP";
        }

        if (this.documentType === "ktp") {
          this.$router.push({
            path: "/dashboard/dataKTPPencairanDeposito",
            query: { fileUrl: this.fileUrl, documentType: "ktp" },
          });
        } else {
          this.$router.push({ name: "uploadDokumenPencairanDeposito" });
        }
      } catch (error) {
        console.error("❌ Gagal upload:", error.response?.data || error.message);
        this.showFlag = true;
        this.flagType = "warning";
        if (this.documentType === "fotoDiri") {
          this.isDataFail = true;
          this.flagMessage = error.response?.data?.message;
        } else if (this.documentType === "ktp") {
          this.showError();
          this.flagMessage = "Verifikasi e-KTP gagal. Pastikan gambar e-KTP jelas dan terbaca.";
        } else if (this.documentType === "npwp") {
          this.showError();
          this.flagMessage = "Verifikasi NPWP gagal. Pastikan gambar NPWP jelas dan terbaca.";
        } else if (this.documentType === "tandaTangan") {
          this.showError();
          this.flagMessage = "Verifikasi tanda tangan gagal. Pastikan gambar tanda tangan jelas dan terbaca.";
        } else {
          this.showError();
          this.flagMessage = "Gagal mengunggah foto. Silakan coba lagi.";
        }
        // this.showModalError("Verifikasi Gagal", "Data yang Anda masukkan tidak sesuai dengan data yang terdaftar. Mohon periksa kembali informasi Anda dan coba lagi.", "Verifikasi Ulang", "Hubungi Universal Care", "data-failed-illus.svg");
      } finally {
        this.isUploading = false;
        this.isSubmitting = false;
      }
    },


    reuploadFile() {
      if (this.isClicking) return;
      this.isClicking = true;
      this.isAgreementChecked = false;
      this.showFlag = false;

      setTimeout(() => {
        this.$refs.fileInput.click();
        this.isClicking = false;
      }, 300);
    },
  },
  mounted() {
    this.$emit("update-progress", 45);
    this.$emit("set-navbar-config", {
      showBackButton: true,
      showInfoButton: true,
      showLogoBPR: true,
      centerTitle: true,
    });
    this.$emit("set-cancel-route", { name: 'uploadDokumenPencairanDeposito' });
  },
};
</script>

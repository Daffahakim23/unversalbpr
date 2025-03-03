<template>
  <!-- Container Grid Dokumen -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <!-- KTP -->
    <div :class="[
      'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md cursor-pointer relative',
      fileStore.isKtpUploaded
        ? 'bg-semantic/success-100 border-semantic/success-600'
        : 'border-primary-100',
    ]" @click="openCaptcha('ktp')">
      <div class="flex items-center">
        <img src="/src/assets/ektp.svg" alt="KTP" class="h-12 mr-4" />
        <div>
          <span class="text-sm font-medium text-neutral-900">KTP</span>
          <p class="text-xs text-neutral-500">Foto KTP Anda</p> <!-- ✅ Subtitle ditambahkan -->
        </div>
      </div>
      <div>
        <img :src="fileStore.isKtpUploaded
          ? '/src/assets/success.svg'
          : '/src/assets/download.svg'" alt="Download" class="h-6" />
      </div>
      <input v-if="isCaptchaVerified && pendingUpload === 'ktp'" type="file"
        class="absolute inset-0 opacity-0 cursor-pointer" @change="handleFileUpload($event, 'ktp')" accept="image/*"
        ref="ktpInput" />
    </div>

    <!-- NPWP -->
    <div :class="[
      'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md cursor-pointer relative',
      fileStore.isNpwpUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
    ]" @click.stop="openNpwpModal">
      <div class="flex items-center">
        <img src="/src/assets/npwp.svg" alt="NPWP" class="h-12 mr-4" />
        <div>
          <span class="text-sm font-medium text-neutral-900">NPWP</span>
          <p class="text-xs text-neutral-500">Foto NPWP Anda</p> <!-- ✅ Subtitle ditambahkan -->
        </div>
      </div>
      <div>
        <img :src="fileStore.isNpwpUploaded ? '/src/assets/success.svg' : '/src/assets/download.svg'" alt="Download"
          class="h-6" />
      </div>
      <input type="file" ref="npwpInput" class="hidden" @change="handleFileUpload($event, 'npwp')" accept="image/*" />
    </div>

    <!-- Foto Diri -->
    <div :class="[
      'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md cursor-pointer relative',
      fileStore.isFotoDiriUploaded
        ? 'bg-semantic/success-100 border-semantic/success-600'
        : 'border-primary-100',
    ]" @click="openCaptcha('fotoDiri')">
      <div class="flex items-center">
        <img src="/src/assets/liveness.svg" alt="Liveness" class="h-12 mr-4" />
        <div>
          <span class="text-sm font-medium text-neutral-900">Liveness</span>
          <p class="text-xs text-neutral-500">Foto Selfie Anda</p> <!-- ✅ Subtitle ditambahkan -->
        </div>
      </div>
      <div>
        <img :src="fileStore.isFotoDiriUploaded
          ? '/src/assets/success.svg'
          : '/src/assets/download.svg'" alt="Download" class="h-6" />
      </div>
      <div v-if="isCaptchaVerified && pendingUpload === 'fotoDiri'" class="absolute inset-0 cursor-pointer"
        @click="capturePicture('fotoDiri')"></div>
    </div>

    <!-- Tanda Tangan-->
    <div :class="[
      'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md cursor-pointer relative',
      fileStore.isTandaTanganUploaded
        ? 'bg-semantic/success-100 border-semantic/success-600'
        : 'border-primary-100',
    ]">
      <div class="flex items-center">
        <img src="/src/assets/tanda-tangan.svg" alt="Tanda Tangan" class="h-12 mr-4" />
        <div>
          <span class="text-sm font-medium text-neutral-900">Tanda Tangan</span>
          <p class="text-xs text-neutral-500">Unggah Tanda Tangan Anda</p> <!-- ✅ Subtitle ditambahkan -->
        </div>
      </div>
      <div>
        <img :src="fileStore.isTandaTanganUploaded
          ? '/src/assets/success.svg'
          : '/src/assets/download.svg'" alt="Download" class="h-6" />
        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer"
          @change="handleFileUpload($event, 'tandaTangan')" />
      </div>
    </div>
  </div>

  <div class="flex justify-center mt-6">
    <ButtonComponent type="submit" :disabled="isButtonDisabled" @click="handleSubmit" @close="isModalOpen = false">
      Lanjutkan
    </ButtonComponent>
  </div>

  <NpwpModal :isOpen="showNpwpModal" @onYes="handleNpwpYes" @onNo="handleNpwpNo" @close="showNpwpModal = false" />
  <CaptchaComponent :show="showCaptchaModal" @captcha-verified="verifyCaptcha" @close="showCaptchaModal = false" />
</template>

<script>
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import CaptchaComponent from "@/components/Captcha.vue";
import NpwpModal from "@/components/ModalNPWP.vue";

export default {
  data() {
    return {
      isCaptchaVerified: false,
      showCaptchaModal: false,
      pendingUpload: null,
      showNpwpModal: false,
    };
  },
  emits: ["update-progress"],
  components: {
    ButtonComponent,
    CaptchaComponent,
    NpwpModal,
  },
  setup() {
    const fileStore = useFileStore();
    return { fileStore };
  },
  computed: {
    isButtonDisabled() {
      return (
        !this.fileStore.isKtpUploaded ||
        !this.fileStore.isNpwpUploaded ||
        !this.fileStore.isFotoDiriUploaded ||
        !this.fileStore.isTandaTanganUploaded
      );
    },
  },
  methods: {
    openCaptcha(documentType) {
      console.log("Modal Captcha Dibuka untuk:", documentType);
      this.pendingUpload = documentType;
      this.showCaptchaModal = true;
    },

    verifyCaptcha() {
      this.isCaptchaVerified = true;
      this.showCaptchaModal = false;

      if (this.pendingUpload) {
        this.$nextTick(() => {
          if (this.pendingUpload === "fotoDiri") {
            // Jika captcha untuk fotoDiri berhasil, langsung pindah ke screen fotoDiri
            this.capturePicture("fotoDiri");
          } else {
            this.$refs[`${this.pendingUpload}Input`]?.click();
          }
        });
      }
    },
    createFileInput(documentType) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.className = "hidden";

      input.addEventListener("change", (event) => {
        this.handleFileUpload(event, documentType);
      });

      document.body.appendChild(input);
      input.click();

      input.addEventListener("change", () => {
        document.body.removeChild(input);
      });
    },

    openNpwpModal() {
      this.showNpwpModal = true;
    },
    handleNpwpYes() {
      if (!this.showNpwpModal) return;
      console.log("Memilih file NPWP...");
      this.showNpwpModal = false;
      this.$nextTick(() => {
        this.$refs.npwpInput?.click();
        this.showNpwpModal = false;
      });
    },

    handleNpwpNo() {
      this.showNpwpModal = false;
      this.$router.push({ path: "/dashboard/npwpDepositoNTB" });
    },
    capturePicture(documentType) {
      if (!documentType) {
        console.warn("documentType tidak valid!");
        return;
      }

      console.log("Sebelum Capture:", JSON.stringify(this.fileStore.$state));

      const isUploadedKey = `is${documentType.charAt(0).toUpperCase() + documentType.slice(1)}Uploaded`;
      const isUploaded = this.fileStore?.[isUploadedKey];

      console.log(`isUploaded (${isUploadedKey}):`, isUploaded);

      if (isUploaded) {
        const uploadedFile = this.fileStore?.uploadedFiles?.[documentType];

        if (uploadedFile) {
          const fileUrl = URL.createObjectURL(uploadedFile);
          console.log("Navigasi ke Preview dengan file yang sudah ada:", fileUrl);

          this.$router.push({
            name: "PreviewScreenPenempatanDepositoNTB",
            query: { documentType, fileUrl },
          });
          return;
        } else {
          console.warn("File seharusnya ada tapi tidak ditemukan di store.");
        }
      }

      if (documentType === "fotoDiri") {
        console.log("Navigasi ke halaman kamera untuk fotoDiri...");

        this.fileStore.$patch((state) => {
          state.uploadedFiles["fotoDiri"] = "dummyImageFile";
          // state.isFotoDiriUploaded = true;
        });

        this.$router.push({ path: "/dashboard/fotoDiriPenempatanDepositoNTB" }); // 🔥 Pastikan hanya satu kali push
        return;
      }

      console.warn("capturePicture hanya untuk fotoDiri!");
    },

    handleFileUpload(event, documentType) {
      if (!event.target.files.length) return; // Cegah eksekusi berulang
      console.log(`Mengunggah file untuk ${documentType}`);

      this.showCaptchaModal = false;
      const file = event.target.files[0];

      if (file) {
        this.fileStore.$patch((state) => {
          if (!state.uploadedFiles[documentType]) {
            state.uploadedFiles[documentType] = file;
          }
        });

        console.log("File berhasil dipilih:", file.name);
        const fileUrl = URL.createObjectURL(file);

        this.$router.push({
          name: "PreviewScreenPenempatanDepositoNTB",
          query: { documentType, fileUrl },
        });
      }
    },


    handleSubmit() {
      if (
        this.fileStore.isKtpUploaded &&
        this.fileStore.isNpwpUploaded &&
        this.fileStore.isFotoDiriUploaded &&
        this.fileStore.isTandaTanganUploaded
      ) {
        console.log("Semua file telah diunggah!");
        this.$router.push({ path: "/dashboard/dataPribadiPenempatanDepositoNTB" });
      } else {
        alert("Harap unggah semua dokumen terlebih dahulu!");
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 45);
  },
};
</script>

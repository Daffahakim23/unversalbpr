<template>
  <!-- Container Grid Dokumen -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <!-- KTP -->
    <div :class="[
      'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md cursor-pointer relative',
      fileStore.isKtpUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
    ]" @click="handleFileUpload(null, 'ktp')">
      <div class="flex items-center">
        <img src="/src/assets/ektp.svg" alt="KTP" class="h-12 mr-4" />
        <div>
          <span class="text-sm font-medium text-neutral-900">E-KTP</span>
          <!-- <p class="text-xs text-neutral-600">Foto KTP Anda</p> -->
          <div v-if="fileStore.isKtpUploaded" class="flex flex-row items-center gap-1">
            <img src="/src/assets/success.svg" class="h-4" />
            <p class="text-xs text-neutral-600">{{ nik }}</p>
          </div>
          <div v-else>
            <p class="text-xs text-neutral-600">Foto E-KTP Anda</p>
          </div>
        </div>
      </div>
      <div>
        <img v-if="fileStore.isKtpUploaded" src="/src/assets/edit-icon.svg" alt="Download" class="h-6" />
        <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
      </div>
    </div>

    <!-- Foto Diri -->
    <div :class="[
      'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md cursor-pointer relative',
      fileStore.isFotoDiriUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
    ]" @click="handleFileUpload(null, 'fotoDiri')">
      <div class="flex items-center">
        <img src="/src/assets/liveness.svg" alt="Liveness" class="h-12 mr-4" />
        <div>
          <span class="text-sm font-medium text-neutral-900">Foto Diri</span>
          <!-- <p class="text-xs text-neutral-600">Foto Diri Anda</p> -->
          <div v-if="fileStore.isFotoDiriUploaded" class="flex flex-row items-center gap-1">
            <img src="/src/assets/success.svg" class="h-4" />
            <p class="text-xs text-neutral-600">Telah Dilengkapi</p>
          </div>
          <div v-else>
            <p class="text-xs text-neutral-600">Foto Diri Anda</p>
          </div>
        </div>
      </div>
      <div>
        <img v-if="fileStore.isFotoDiriUploaded" src="/src/assets/edit-icon.svg" alt="Download" class="h-6" />
        <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
      </div>
    </div>

    <!-- NPWP -->
    <div :class="[
      'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md cursor-pointer relative',
      fileStore.isNpwpUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
    ]" @click.stop="openNpwpModal">
      <div class="flex items-center">
        <img src="/src/assets/npwp.svg" alt="NPWP" class="h-12 mr-4" />
        <div>
          <span class="text-sm font-medium text-neutral-900">NPWP (jika ada)</span>
          <!-- <p class="text-xs text-neutral-600">Foto NPWP Anda</p> -->
          <div v-if="fileStore.isNpwpUploaded" class="flex flex-row items-center gap-1">
            <img src="/src/assets/success.svg" class="h-4" />
            <p class="text-xs text-neutral-600">{{ npwp }}</p>
          </div>
          <div v-else>
            <p class="text-xs text-neutral-600">Foto NPWP Anda</p>
          </div>
        </div>
      </div>
      <div>
        <img v-if="fileStore.isNpwpUploaded" src="/src/assets/edit-icon.svg" alt="Download" class="h-6" />
        <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
      </div>
    </div>

    <!-- Tanda Tangan -->
    <div :class="[
      'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md cursor-pointer relative',
      fileStore.isTandaTanganUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
    ]" @click="handleFileUpload(null, 'tandaTangan')">
      <div class="flex items-center">
        <img src="/src/assets/tanda-tangan.svg" alt="Tanda Tangan" class="h-12 mr-4" />
        <div>
          <span class="text-sm font-medium text-neutral-900">Tanda Tangan</span>
          <!-- <p class="text-xs text-neutral-600">Foto Tanda Tangan Anda</p> -->
          <div v-if="fileStore.isTandaTanganUploaded" class="flex flex-row items-center gap-1">
            <img src="/src/assets/success.svg" class="h-4" />
            <p class="text-xs text-neutral-600">Telah Dilengkapi</p>
          </div>
          <div v-else>
            <p class="text-xs text-neutral-600">Foto Tanda Tangan Anda</p>
          </div>
        </div>
      </div>
      <div>
        <img v-if="fileStore.isTandaTanganUploaded" src="/src/assets/edit-icon.svg" alt="Download" class="h-6" />
        <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
      </div>
    </div>
  </div>

  <div class="flex justify-center mt-6">
    <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
      {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
    </ButtonComponent>
  </div>
  <NpwpModal :isOpen="showNpwpModal" @onYes="handleNpwpYes" @onNo="handleNpwpNo" @close="showNpwpModal = false" />
  <ModalError :isOpen="isModalError" :features="modalContent" icon="otp-error-illus.svg" @close="isModalError = false"
    @buttonClick1="handleCloseModal" />
</template>

<script>
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import NpwpModal from "@/components/ModalNPWP.vue";
import api from "@/API/api";
import ModalError from "@/components/ModalError.vue";
import { computed } from "vue";

export default {
  props: {
    documentType: String,
  },
  data() {
    return {
      pendingUpload: null,
      showNpwpModal: false,
      isSubmitting: false,
      isModalError: false,
      modalContent: [],
    };
  },
  emits: ["update-progress"],
  components: {
    ButtonComponent,
    NpwpModal,
    ModalError,
  },
  setup() {
    const fileStore = useFileStore();
    const nik = computed(() => fileStore.nik || "123123123");
    const npwp = computed(() => fileStore.no_npwp || "Telah Dilengkapi");
    return { fileStore, nik, npwp };
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
    showErrorModal(title, message, btnString1 = "OK", btnString2 = "Batal", icon = "otp-error-illus.svg") {
      this.modalContent = [
        {
          label: title,
          description: message,
          icon: new URL(`/src/assets/${icon}`, import.meta.url).href,
          buttonString1: btnString1,
          buttonString2: btnString2,
        },
      ];
      this.isModalError = true;
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
      this.showNpwpModal = false;
      this.$nextTick(() => {
        this.handleFileUpload(null, "npwp");
      });
    },

    handleNpwpNo() {
      this.showNpwpModal = false;
      this.$router.push({ path: "/dashboard/npwpNTB" });
    },

    handleCloseModal() {
      this.isModalError = false;
    },

    handleFileUpload(event, documentType) {
      console.log(`Dokumen yang akan diunggah: ${documentType}`);
      this.$router.push({
        name: "PreviewScreenPembukaanRekeningNTB",
        query: { documentType: documentType || "defaultType" }
      });
    },

    async handleSubmit() {
      if (this.isSubmitting) {
        return;
      }
      this.isSubmitting = true;
      const fileStore = useFileStore();
      const uuid = fileStore.uuid;

      if (!fileStore.isKtpUploaded || !fileStore.isFotoDiriUploaded || !fileStore.isNpwpUploaded || !fileStore.isTandaTanganUploaded) {
        alert("Harap unggah semua dokumen terlebih dahulu!");
        return;
      }

      if (!uuid) {
        alert("UUID tidak tersedia.");
        return
      }

      try {
        const response = await api.get(`/ekyc-fraud?uuid=${uuid}`);

        if (response.status === 200) {
          this.$router.push({ path: "/dashboard/dataPribadiPembukaanRekeningNTB" });
        } else if (response.status === 400) {
          alert("Isi tanda tangan digital dahulu.");
        } else {
          alert(`Terjadi kesalahan: ${response.status} - ${response.statusText}. Silakan coba lagi.`);
        }
      } catch (error) {
        console.error("Error checking envelope:", error);
        this.showErrorModal("Terjadi Kesalahan", "Data KTP dan Foto Diri Anda tidak sesuai.", "Upload Ulang", "Hubungi Customer Care");
        alert("Terjadi kesalahan saat menghubungi server. Silakan coba lagi.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 45);
  },
};
</script>

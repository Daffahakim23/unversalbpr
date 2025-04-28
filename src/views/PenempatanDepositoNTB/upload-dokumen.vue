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
          <p class="text-xs text-neutral-500">Foto KTP Anda</p>
        </div>
      </div>
      <div>
        <img :src="fileStore.isKtpUploaded ? '/src/assets/success.svg' : '/src/assets/download.svg'" alt="Download"
          class="h-6" />
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
          <p class="text-xs text-neutral-500">Foto NPWP Anda</p>
        </div>
      </div>
      <div>
        <img :src="fileStore.isNpwpUploaded ? '/src/assets/success.svg' : '/src/assets/download.svg'" alt="Download"
          class="h-6" />
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
          <p class="text-xs text-neutral-500">Foto Diri Anda</p>
        </div>
      </div>
      <div>
        <img :src="fileStore.isFotoDiriUploaded ? '/src/assets/success.svg' : '/src/assets/download.svg'" alt="Download"
          class="h-6" />
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
          <p class="text-xs text-neutral-500">Foto Tanda Tangan Anda</p>
        </div>
      </div>
      <div>
        <img :src="fileStore.isTandaTanganUploaded ? '/src/assets/success.svg' : '/src/assets/download.svg'"
          alt="Download" class="h-6" />
      </div>
    </div>
  </div>

  <div class="flex justify-between mt-6">
    <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
    <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
      {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
    </ButtonComponent>
  </div>
  <NpwpModal :isOpen="showNpwpModal" @onYes="handleNpwpYes" @onNo="handleNpwpNo" @close="showNpwpModal = false" />
</template>

<script>
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import NpwpModal from "@/components/ModalNPWP.vue";

export default {
  props: {
    documentType: String,
  },
  data() {
    return {
      pendingUpload: null,
      showNpwpModal: false,
      isSubmitting: false,
    };
  },
  emits: ["update-progress"],
  components: {
    ButtonComponent,
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
    goBack() {
      this.$router.push({ path: "/dashboard/dataPenempatanDepositoNTB" });
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
      this.$router.push({ path: "/dashboard/npwpDepositoNTB" });
    },

    handleFileUpload(event, documentType) {
      console.log(`Dokumen yang akan diunggah: ${documentType}`);
      this.$router.push({
        name: "PreviewScreenPenempatanDepositoNTB",
        query: { documentType: documentType || "defaultType" },
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
        const response = await api.get(`/ekyc-fraud-deposito?uuid=${uuid}`);

        if (response.status === 200) {
          this.$router.push({ path: "/dashboard/dataPribadiPembukaanRekeningNTB" });
        } else if (response.status === 400) {
          alert("Isi tanda tangan digital dahulu.");
        } else {
          alert(`Terjadi kesalahan: ${response.status} - ${response.statusText}. Silakan coba lagi.`);
        }
      } catch (error) {
        console.error("Error checking envelope:", error);
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

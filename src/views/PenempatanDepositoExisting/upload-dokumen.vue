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
          <span class="text-sm font-medium text-neutral-900">KTP</span>
          <p class="text-xs text-neutral-500">Foto KTP Anda</p>
        </div>
      </div>
      <div>
        <img :src="fileStore.isKtpUploaded ? '/src/assets/success.svg' : '/src/assets/download.svg'" alt="Download"
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
  </div>
  <div class="flex justify-between mt-6">
    <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
    <ButtonComponent type="submit" :disabled="isButtonDisabled" @click="handleSubmit" @close="isModalOpen = false">
      Lanjutkan
    </ButtonComponent>
  </div>
</template>

<script>
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";

export default {
  props: {
    documentType: String,
  },
  data() {
    return {
      pendingUpload: null,
    };
  },
  emits: ["update-progress"],
  components: {
    ButtonComponent,
  },
  setup() {
    const fileStore = useFileStore();
    return { fileStore };
  },
  computed: {
    isButtonDisabled() {
      return (
        !this.fileStore.isKtpUploaded ||
        !this.fileStore.isFotoDiriUploaded
      );
    },
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/dashboard/dataPenempatanDepositoExisting" });
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

    handleFileUpload(event, documentType) {
      console.log(`Dokumen yang akan diunggah: ${documentType}`);
      this.$router.push({
        name: "PreviewScreenPenempatanDepositoExisting",
        query: { documentType: documentType || "defaultType" },
      });
    },
    handleSubmit() {
      if (
        this.fileStore.isKtpUploaded &&
        this.fileStore.isFotoDiriUploaded
      ) {
        console.log("Semua file telah diunggah!");
        this.$router.push({ path: "/dashboard/perubahanDataPenempatanDepositoExisting" });
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

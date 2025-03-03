<template>
  <div class="">
    <div v-if="fileUrl" class="rounded-lg">
      <div v-if="documentType === 'npwp'" class="mt-4">
        <FormField label="Nomor NPWP" id="nomornpwp" v-model="nomorNpwp" placeholder="Masukkan Nomor NPWP" required />
      </div>
      <button @click="openModal" class="flex items-center text-primary mb-4 gap-1">
        <p class="text-base font-semibold">Panduan Foto</p>
        <img src="@/assets/Question.png" alt="Logo" class="h-5" />
      </button>
      <img :src="fileUrl" alt="Preview Dokumen" class="w-full rounded-lg" @error="handleFileNotFound" />
      <ModalPanduanFoto :isOpen="isModalOpen" @close="isModalOpen = false" />
    </div>

    <div class="mt-6 flex justify-between">
      <ButtonComponent variant="outline" @click="reuploadFile">Foto Ulang</ButtonComponent>
      <ButtonComponent @click="saveFile" :disabled="isButtonDisabled || isUploading">
        Simpan
      </ButtonComponent>

    </div>
  </div>
</template>

<script>
import api from "@/API/api.js"
import { useFileStore } from "@/stores/filestore";
import ModalPanduanFoto from "@/components/ModalPanduan.vue";
import ButtonComponent from "@/components/button.vue"
import FormField from "@/components/FormField.vue";

export default {
  emits: ["update-progress"],
  components: {
    FormField,
    ModalPanduanFoto,
    ButtonComponent,
  },

  computed: {
    fileUrl() {
      return this.$route.query.fileUrl;
    },
    documentType() {
      return this.$route.query.documentType;
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
    const fileStore = useFileStore();
    return { fileStore };
  },

  data() {
    return {
      isModalOpen: false,
      nomorNpwp: "",
      isUploading: false,
    };
  },

  methods: {
    handleFileNotFound() {
      console.warn("File URL tidak ditemukan, redirecting...");
      this.$router.replace("/dashboard/uploadDokumenPenempatanDepositoNTB");
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
        const fileName =
          this.documentType === "ktp" ? "ktp_upload.png" :
            this.documentType === "tandaTangan" ? "tanda_tangan.png" :
              "npwp_upload.png";

        const fileField =
          this.documentType === "ktp" ? "user_ktp" :
            this.documentType === "tandaTangan" ? "user_ttd" :
              "user_npwp";

        const apiEndpoint =
          this.documentType === "ktp" ? "ocr-ktp-deposito" :
            this.documentType === "tandaTangan" ? "tt-basah-deposito" :
              "npwp-deposito";

        const file = new File([blob], fileName, { type: "image/png" });
        const formData = new FormData();
        formData.append(fileField, file);
        formData.append("uuid", this.fileStore.uuid);
        // formData.append("uuid", "abc8dc93-b21c-4644-9c26-c9cfdb57f1ab");

        if (this.documentType === "npwp") {
          if (!this.nomorNpwp.trim()) {
            alert("Harap isi nomor NPWP sebelum menyimpan.");
            return;
          }
          formData.append("nomor_npwp", this.nomorNpwp);
        }

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
            path: "/dashboard/dataKTPPenempatanDepositoNTB",
            query: { fileUrl: this.fileUrl, documentType: "ktp" },
          });
        } else {
          this.$router.push({ name: "UploadDokumenPenempatanDepositoNTB" });
        }
      } catch (error) {
        console.error("❌ Gagal upload:", error.response?.data || error.message);
        alert("Upload gagal, coba lagi!");
      } finally {
        this.isUploading = false; // 🔓 Buka kunci setelah selesai
      }
    },

    reuploadFile() {
      this.$router.push({ path: "/dashboard/uploadDokumenPenempatanDepositoNTB" });
      this.$nextTick(() => {
        const inputFile = document.querySelector(`input[type="file"][data-document-type="${this.documentType}"]`);
        if (inputFile) {
          inputFile.click();
        } else {
          console.warn("Input file tidak ditemukan!");
        }
      });
    },

  },
  mounted() {
    this.$emit("update-progress", 45);
  },
};
</script>

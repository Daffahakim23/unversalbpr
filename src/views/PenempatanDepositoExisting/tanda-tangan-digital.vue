<template>
    <div class="iframe-container">
        <iframe :src="signLink" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="flex justify-between mt-6">
        <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
        <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
            {{ isSubmitting ? "Mengirim..." : "Lanjutkan" }}
        </ButtonComponent>
    </div>
</template>

<script>
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";
import api from "@/API/api";

export default {
    components: {
        ButtonComponent,
    },
    emits: ["update-progress"],
    mounted() {
        this.$emit("update-progress", 75);
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        signLink() {
            const fileStore = useFileStore();
            return fileStore.sign_url;
        },
    },
    methods: {
        goBack() {
            this.$router.push({ path: "/dashboard/konfirmasiDataPenempatanDepositoExisting" });
        },
        async handleSubmit() {
            const fileStore = useFileStore();
            this.isSubmitting = true;

            try {
                const envelopeId = fileStore.envelope_id;
                const uuid = fileStore.uuid;

                if (!envelopeId) {
                    alert("Envelope ID tidak tersedia.");
                    this.isSubmitting = false;
                    return;
                }

                if (!uuid) {
                    alert("UUID tidak tersedia.");
                    this.isSubmitting = false;
                    return;
                }

                const response = await api.get(`/check-envelope?envelope_id=${envelopeId}&uuid=${uuid}&params=DExisting`);

                if (response.status === 200) {
                    this.$router.push({ path: "/dashboard/halamanSuksesPenempatanDepositoExisting" });
                } else if (response.status === 400) {
                    alert("Isi tanda tangan digital dahulu.");
                } else {
                    alert("Terjadi kesalahan. Silakan coba lagi.");
                }
            } catch (error) {
                console.error("Error checking envelope:", error);
                alert("Terjadi kesalahan. Silakan coba lagi.");
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>

<style scoped>
.iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 75%;
    /* Contoh aspek rasio 4:3 (tinggi = 75% dari lebar) */
    /* Anda perlu menyesuaikan persentase ini berdasarkan aspek rasio iframe yang sebenarnya */
    height: 0;
    overflow: hidden;
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

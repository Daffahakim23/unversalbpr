<template>
    <div class="iframe-container">
        <iframe :src="signLink" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="text-center mt-6">
        <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled || showCountdown"
            @click="handleSubmit">
            {{ buttonText }}
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
        this.startCountdown();
    },
    beforeUnmount() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    },
    data() {
        return {
            isSubmitting: false,
            countdown: 30,
            showCountdown: true,
            countdownInterval: null,
        };
    },
    computed: {
        buttonText() {
            if (this.isSubmitting) {
                return "Mengirim...";
            } else if (this.showCountdown) {
                return `Lanjutkan (${this.countdown}s)`;
            } else {
                return "Lanjutkan";
            }
        },
        signLink() {
            const fileStore = useFileStore();
            return fileStore.sign_url;
        },
    },
    methods: {
        goBack() {
            this.$router.push({ path: "/dashboard/konfirmasiDataPembukaanRekeningExisting" });
        },
        startCountdown() {
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
            }

            this.countdown = 30;
            this.showCountdown = true;

            this.countdownInterval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(this.countdownInterval);
                    this.showCountdown = false;
                    this.countdownInterval = null;
                }
            }, 1000);
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

                const response = await api.get(`/check-envelope?envelope_id=${envelopeId}&uuid=${uuid}&params=Existing`);

                if (response.status === 200) {
                    this.$router.push({ path: "/dashboard/halamanSuksesPembukaanRekeningExisting" });
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

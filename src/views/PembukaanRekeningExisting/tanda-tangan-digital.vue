<template>
    <iframe
        src="https://sandbox-sign.np.vida.id/direct-sign/10d2479e-ec80-4eba-b9ac-f995c5ee4b22?code=VGCdJpgLrRKUg%2BWJC6ADFjX1tKuwdsU3%2Bm7u4W2D3zLvMa3Yrmx9cqxLOHg5iia5DKyi3WKYWJ9PwXour1TeS2VCdxc2q5NChVeUT3HJsE3dGkD%2FXrqiKxbKeDoVOCGNdZEWckjZgrDSCRzRhnShSWeSj9PF2lZs30R43o1HqWJzo8gUaO%2Bd3jCTs8I%2BK%2FrGvzqjLcPnrlH6gGjSPK1W3jOOHx1feTKQrHvv64zA%2F6MEQLeLpESm1Ve8RPStAh2xaFgW233IFpNP5gT%2BX7Cpx%2FSCilHI5VD4WNaMEjM9ydM93fwiGTs%2Basd2pNNTPn1BPdg7TeLt7mKn9ibY8PNtTg%3D%3D"
        width="600" height="400"></iframe>
    <div class="flex justify-between mt-6">
        <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
        <ButtonComponent type="button" @click="handleSubmit">
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
    methods: {
        goBack() {
            this.$router.push({ path: "/dashboard/konfirmasiDataPembukaanRekeningExisting" });
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

                const response = await api.get(`/check-envelope?envelope_id=${envelopeId}&uuid=${uuid}`);

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
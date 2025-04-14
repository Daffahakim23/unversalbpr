<template>
    <iframe
        src="https://sandbox-sign.np.vida.id/direct-sign/287c0442-0257-4355-b890-05e6a429686f?code=ju44UfoIpgBSLBeykrJqstsXtERU%2FtCNPVOYdZ2kt7X%2Fs1l5Ozm71L6zcPxfuQhg847GTYHftp16AWVuC%2Bja9wegaExM8fnJpaWmC3nEaFTJDePc0llOeymN97G8TI0urZYuiEafqLXF6HdaTBIxYqjdVc6NcIklBvuLX8nuBR0aK6cgjzEm642%2BYXvp9tMfnCII0%2F9iMSBFUWzxXHUTOnUdtroJCC4Bib7bWGIBjQxOnsyONHDBMlc%2FlTj%2Bw0csx3fN%2FUyYDATJBD5QrvBQBbtdD5JxECXIPXZynXFQYNgrsbsyJmDm7wOP8QitELitUR0P8h%2BfuGaO1YchIZ%2F1uQ%3D%3D"
        width="600" height="400"></iframe>
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
    methods: {
        goBack() {
            this.$router.push({ path: "/dashboard/konfirmasiDataPenempatanDepositoNTB" });
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
                    this.$router.push({ path: "/dashboard/konfirmasiPenempatanDepositoNTB" });
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

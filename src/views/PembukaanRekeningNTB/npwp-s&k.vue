<template>
    <form @submit.prevent="handleSubmit">
        <RadioButtonChoose label="Saat ini saya/kami (Pilih salah satu)" id="npwp" :options="npwpOptions"
            v-model="form.npwp" name="npwp" required />

        <FlagBox type="info" class="mb-4">
            <p class="text-sm font-normal">Apabila di kemudian hari Pemberi Pernyataan telah memiliki NPWP/sesuai dengan
                ketentuan peraturan perundang-undangan di bidang perpajakan diwajibkan mendaftarkan diri pada Kantor
                Direktorat Jenderal Pajak, maka saya/kami akan segera menyerahkan NPWP kepada BPR Universal. (Tidak
                berlaku bagi nasabah yang telah menyerahkan dokumen NPWP).</p>
        </FlagBox>

        <div v-if="form.npwp === false" class="ml-4">
            <RadioButtonChoose label="Pilih salah satu" id="npwp2" :options="npwp2Options" v-model="form.npwp2"
                name="npwp2" required />
        </div>

        <div>
            <ButtonComponent type="submit" :disabled="isButtonDisabled">
                Lanjutkan
            </ButtonComponent>
        </div>
    </form>
</template>

<script>
import api from "@/API/api";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import { npwpOptions, npwp2Options } from "@/data/option.js";
import { useFileStore } from "@/stores/filestore";
import FlagBox from "@/components/flagbox.vue";

export default {
    components: {
        RadioButtonChoose,
        ButtonComponent,
        FlagBox,
    },
    data() {
        return {
            form: {
                npwp: null,
                npwp2: null,
            },
            npwpOptions,
            npwp2Options,
        };
    },
    computed: {
        isButtonDisabled() {
            if (this.form.npwp === true) {
                return false;
            }
            return !(this.form.npwp === false && this.form.npwp2);
        }
    },
    watch: {
        'form.npwp': function (newVal) {
            if (newVal === true) {
                this.form.npwp2 = null;
            }
        }
    },
    methods: {
        async handleSubmit() {
            const fileStore = useFileStore();
            const requestData = {
                // uuid: "abc8dc93-b21c-4644-9c26-c9cfdb57f1ab",
                uuid: fileStore.uuid || "",
                s_k_nasabah_npwp: this.form.npwp === true,
                s_k_nasabah_npwp_suami: this.form.npwp2 === "SUAMI",
                s_k_nasabah_npwp_penerima_manfaat: this.form.npwp2 === "PEMILIK_MANFAAT",
            };

            console.log("Mengirim data:", requestData);

            try {
                const response = await api.post("/sk-npwp", requestData, {
                    headers: { "Content-Type": "application/json" }
                });
                console.log("Response:", response.data);
                fileStore.setFormDataNPWP(response.data);
                fileStore.isNpwpUploaded = true;
                this.$router.push({ path: "/dashboard/uploadDokumenPembukaanRekeningNTB" });
            } catch (error) {
                console.error("Error mengirim data:", error.response ? error.response.data : error.message);
            }
        }
    }
};
</script>

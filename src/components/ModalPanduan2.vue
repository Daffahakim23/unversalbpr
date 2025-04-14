<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div
            class="w-sm max-w-sm flex flex-col bg-white rounded-2xl p-6 border border-neutral-200 relative mx-4 sm:mx-auto">
            <div class="text-left">
                <h3 class="text-xl font-semibold text-primary dark:text-white items-center">
                    Panduan Upload {{ documentTypeText }}
                </h3>
                <p class="text-neutral-800 dark:text-gray-300 mt-2">Pastikan hal berikut saat upload {{ documentTypeText
                }}:</p>
            </div>

            <div class="mt-4 space-y-4">
                <div v-for="(guide, index) in guideList" :key="index"
                    class="flex items-center bg-gray-100 p-3 rounded-lg dark:bg-gray-800">
                    <img :src="guide.icon" :alt="guide.text" class="w-8 h-8 mr-3">
                    <p class="text-gray-800 dark:text-gray-300 text-sm">{{ guide.text }}</p>
                </div>
            </div>

            <div v-if="requiresCaptcha" class="mt-4">
                <p class="justify-center text-sm font-medium text-neutral-900">Masukkan kode berikut:</p>
                <div class="captcha-box bg-neutral-100 flex justify-center items-center p-8 rounded-md mt-2 w-full">
                    <span class="font-bold text-2xl flex">
                        <span v-for="(item, index) in captcha" :key="index" :style="{ color: item.color }">
                            {{ item.char }}
                        </span>
                    </span>
                    <button @click="refreshCaptcha" class="text-blue-500 ml-2">🔄</button>
                </div>

                <div class="input-group mt-4">
                    <input v-model="userInput" type="text"
                        class="captcha-input w-full p-16 border border-neutral-300 rounded-md focus:outline-none"
                        placeholder="Masukkan Captcha" />
                    <div class="flex justify-center">
                        <p v-if="message" :class="{ 'text-red-500': !isValid, 'text-green-500': isValid }">
                            {{ message }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex justify-between mt-4">
                <ButtonComponent variant="ghost" @click="closeModal">Batalkan</ButtonComponent>
                <ButtonComponent @click="handleSubmit" :disabled="isButtonDisabled">Verifikasi</ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script>
import ektpIcon1 from "../assets/PanduanEKTP1.svg";
import ektpIcon2 from "../assets/PanduanEKTP2.svg";
import ektpIcon3 from "../assets/PanduanEKTP3.svg";
import liveness1 from "../assets/PanduanLiveness1.svg";
import liveness2 from "../assets/PanduanLiveness2.svg";
import liveness3 from "../assets/PanduanLiveness3.svg";
import Npwp1 from "../assets/PanduanNPWP1.svg";
import Npwp2 from "../assets/PanduanNPWP2.svg";
import Npwp3 from "../assets/PanduanNPWP3.svg";
import tandaTangan1 from "../assets/PanduanTandaTangan1.svg";
import tandaTangan2 from "../assets/PanduanTandaTangan2.svg";
import tandaTangan3 from "../assets/PanduanTandaTangan3.svg";
import ButtonComponent from "@/components/button.vue";

export default {
    emits: ['close', 'back'],
    components: {
        ButtonComponent,
    },
    props: {
        isOpen: Boolean,
        documentType: String,

    },
    data() {
        return {
            userInput: "",
            message: "",
            isValid: false,
            captcha: this.generateCaptcha(),
            guides: [],
        };
    },
    computed: {
        guideList() {
            const guides = {
                ktp: [
                    { icon: ektpIcon1, text: "Gunakan eKTP asli, dengan kondisi baik dan tidak rusak" },
                    { icon: ektpIcon2, text: "Pastikan semua sisi dan informasi eKTP Anda terlihat jelas" },
                    { icon: ektpIcon3, text: "Hindari pantulan cahaya dan pastikan gambar tidak blur" },
                ],
                npwp: [
                    { icon: Npwp1, text: "Ambil foto NPWP asli, bukan versi hasil scan" },
                    { icon: Npwp2, text: "Pastikan seluruh dokumen NPWP terlihat utuh dan tidak terpotong" },
                    { icon: Npwp3, text: "Pastikan semua data dan informasi pada NPWP terbaca dengan jelas" },
                ],
                tandaTangan: [
                    { icon: tandaTangan1, text: "Ambil foto tanda tangan Anda tepat di sepanjang garis bantu yang tersedia" },
                    { icon: tandaTangan2, text: "Pastikan tanda tangan yang difoto sesuai sama persis dengan yang tertera di E-KTP Anda" },
                    { icon: tandaTangan3, text: "Periksa kembali bahwa foto tidak terpotong sebelum mengunggahnya melalui e-form" },
                ],
                fotoDiri: [
                    { icon: liveness1, text: "Lepas kacamata, masker, topi atau aksesoris wajah lainnya." },
                    { icon: liveness2, text: "Sesuaikan wajah Anda di area foto yang sudah ditentukan" },
                    { icon: liveness3, text: "Untuk hasil yang akurat, verifikasi di tempat dengan pencahayaan yang baik." },
                ],
            };
            return guides[this.documentType] || [];
        },
        documentTypeText() {
            const textMap = {
                ktp: "e-KTP",
                npwp: "NPWP",
                tandaTangan: "Tanda Tangan",
                fotoDiri: "Liveness",
            };
            return textMap[this.documentType] || "Dokumen";
        },
        requiresCaptcha() {
            return ["ktp", "fotoDiri"].includes(this.documentType);
        },
        modalTitle() {
            const titles = {
                ktp: "Panduan Upload e-KTP",
                fotoDiri: "Panduan Foto Diri",
                npwp: "Panduan Upload NPWP",
                tandaTangan: "Panduan Upload Tanda Tangan",
            };
            return titles[this.documentType] || "Panduan Upload";
        },
        modalDescription() {
            const descriptions = {
                ktp: "Pastikan hal berikut saat upload e-KTP:",
                fotoDiri: "Ikuti instruksi berikut untuk liveness check:",
                npwp: "Pastikan NPWP yang diunggah dapat terbaca dengan jelas:",
                tandaTangan: "Pastikan tanda tangan jelas dan sesuai dengan KTP Anda:",
            };
            return descriptions[this.documentType] || "";
        },
        isButtonDisabled() {
            return this.requiresCaptcha && (this.userInput.length !== 6);
        },
    },
    methods: {
        generateCaptcha() {
            const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD700", "#8A2BE2", "#00CED1"];
            return Math.random().toString(36).substring(2, 8).split("").map(char => {
                return {
                    char: Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase(),
                    color: colors[Math.floor(Math.random() * colors.length)]
                };
            });
        },
        refreshCaptcha() {
            this.captcha = this.generateCaptcha();
            this.userInput = "";
            this.message = "";
            this.isValid = false;
        },
        handleSubmit() {
            if (this.requiresCaptcha) {
                const generatedCaptcha = this.captcha.map(item => item.char).join("");
                if (this.userInput === generatedCaptcha) {
                    this.isValid = true;
                    this.message = "Captcha benar!";
                    setTimeout(() => {
                        this.$emit("close");
                    }, 1000);
                } else {
                    this.isValid = false;
                    this.message = "Captcha salah, coba lagi.";
                }
            } else {
                this.$emit("close");
            }
        },
        closeModal() {
            this.$emit('back'); // Emit event 'back' ke komponen parent
        },
    }
};
</script>


<style scoped>
.captcha-box {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 5px;
    margin: 16px auto;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.captcha-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.captcha-btn {
    color: white;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
}
</style>

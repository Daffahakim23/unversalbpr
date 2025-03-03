<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white rounded-2xl shadow-lg dark:bg-gray-700 max-w-2xl w-full h-[80vh] flex flex-col p-10">
            <div class="flex items-center pb-4 justify-between dark:border-gray-600">
                <h3 class="text-2xl font-semibold text-primary dark:text-white">{{ title }}</h3>
                <button @click="closeModal" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    <img src="@/assets/close-icon.svg" alt="Close" class="h-6 w-6">
                </button>
            </div>
            <div class="overflow-y-auto flex-1">
                <ol class="list-decimal list-inside space-y-2">
                    <li v-for="(guide, index) in guides" :key="index">
                        <b>{{ guide.title }}</b>
                        <p class="ml-5">{{ guide.subtitle }}</p>
                        <ol class="list-decimal list-inside ps-5 space-y-1">
                            <li v-for="(item, subIndex) in guide.items" :key="subIndex">
                                {{ item.text }}
                                <ul v-if="item.subItems" class="list-disc list-inside ps-4 space-y-1">
                                    <li v-for="(subItem, subItemIndex) in item.subItems" :key="subItemIndex">
                                        {{ subItem }}
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </li>
                </ol>
                <div class="flex items-center pt-4" v-for="(checkbox, index) in checkboxes" :key="index">
                    <input type="checkbox" v-model="checkbox.checked"
                        class="w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded-sm focus:ring-primary dark:focus:ring-primary dark:ring-offset-neutral-800 focus:ring-2 dark:bg-primary dark:border-neutral-600">
                    <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ checkbox.label
                        }}</label>
                </div>
            </div>
            <div class="flex justify-center pt-8">
                <ButtonComponent :disabled="!allChecked" @click="$emit('confirm')">Setuju</ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonComponent from "@/components/button.vue";
export default {
    components: {
        ButtonComponent,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            guides: [
                {
                    title: "Ketentuan Umum",
                    items: [
                        { text: "Calon nasabah wajib melengkapi formulir pembukaan rekening dengan data yang benar dan akurat." },
                        {
                            text: "Bank berhak meminta dokumen pendukung seperti:",
                            subItems: [
                                "Kartu Tanda Penduduk (KTP) atau Paspor.",
                                "Nomor Pokok Wajib Pajak (NPWP) (jika diperlukan).",
                                "Bukti alamat tempat tinggal (tagihan listrik, air, atau sejenisnya)."
                            ]
                        }
                    ]
                },
                {
                    title: "Jenis Rekening",
                    items: [
                        { text: "Bank menyediakan berbagai jenis rekening, seperti rekening tabungan, giro, atau deposito berjangka." },
                        { text: "Nasabah dapat memilih jenis rekening sesuai kebutuhan dan wajib memahami fitur serta biaya terkait masing-masing rekening." }
                    ]
                },
                {
                    title: "Setoran Awal dan Saldo Minimum",
                    items: [
                        { text: "Setoran awal minimal sebesar Rp 500.000 (lima ratus ribu rupiah). " },
                        { text: "Saldo minimum yang harus dipertahankan adalah Rp 50.000 (lima puluh ribu rupiah). Jika saldo di bawah ketentuan, bank berhak mengenakan biaya penalti." },
                    ]
                },
                {
                    title: "Kartu Debit dan Layanan Digital",
                    items: [
                        { text: "Setiap nasabah berhak mendapatkan kartu debit setelah rekening aktif. " },
                        { text: "Nasabah wajib menjaga kerahasiaan PIN kartu debit." },
                        { text: "Bank menyediakan akses ke layanan digital seperti mobile banking dan internet banking. Penggunaan layanan ini tunduk pada syarat dan ketentuan yang berlaku." }
                    ]
                },
                {
                    title: "Biaya dan Pajak",
                    items: [
                        { text: "Bank berhak mengenakan biaya administrasi bulanan sesuai dengan ketentuan yang berlaku." },
                        { text: "Segala bunga yang diperoleh nasabah akan dikenakan pajak sesuai peraturan perpajakan yang berlaku di Indonesia." },
                    ]
                },
                {
                    title: "Penutupan Rekening",
                    items: [
                        { text: "Rekening dapat ditutup atas permintaan nasabah atau oleh bank jika terjadi pelanggaran terhadap syarat dan ketentuan ini. " },
                        { text: "Untuk penutupan rekening, nasabah harus menyelesaikan kewajiban finansial yang belum terpenuhi, termasuk biaya administrasi terakhir." },
                    ]
                },
                {
                    title: "Pernyataan dan Persetujuan",
                    subtitle: "Dengan ini, nasabah menyatakan:",
                    items: [
                        { text: "Data yang diberikan kepada bank adalah benar dan dapat dipertanggungjawabkan." },
                        { text: "Memahami bahwa bank memiliki hak untuk mengubah syarat dan ketentuan ini sewaktu-waktu dengan pemberitahuan sebelumnya." },
                    ]
                },
                {
                    title: "Hukum yang Berlaku",
                    items: [
                        { text: "Syarat dan ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia. " },
                        { text: "Segala perselisihan yang timbul terkait pembukaan rekening akan diselesaikan melalui musyawarah mufakat atau melalui jalur hukum yang berlaku." },
                    ]
                }
            ],
            checkboxes: [
                { label: "Saya tidak memiliki kewajiban/domisili perpajakan di negara selain Indonesia", checked: false },
                { label: "Bahwa berkaitan dengan Pajak Amerika, saya bukan penduduk US", checked: false }
            ]
        };
    },
    computed: {
        allChecked() {
            return this.checkboxes.every(checkbox => checkbox.checked);
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
.bg-primary {
    background-color: #004AAD;
}
</style>

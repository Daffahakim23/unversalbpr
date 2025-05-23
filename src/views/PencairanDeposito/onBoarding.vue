<template class="h-full">
    <div v-if="loading">
        <p>Loading...</p>
    </div>
    <div v-else-if="error">
        <ModalError :isOpen="true" :features="modalContent" icon="otp-error-illus.svg" @close="handleCloseModal"
            @buttonClick1="handleCloseModal" @buttonClick2="openWhatsApp" />
    </div>
    <div v-else>
        <div class="flex flex-col h-full min-h-screen bg-neutral-50">
            <div class="bg-neutral-white p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <button @click="goBack2" v-if="navbarConfig.showBackButton"
                            class="flex items-center text-neutral-900 pl-2">
                            <img src="@/assets/batal-icon.svg" alt="Kembali" class="h-8 md:h-8 lg:h-10 mr-2" />
                            <p class="text-sm sm:text-md md:text-md font-semibold text-left">Batalkan</p>
                        </button>
                        <button v-else @click="isModalError = true" class="flex items-center text-neutral-900 pl-2">
                            <img src="@/assets/home-icon.svg" alt="Logo" class="h-8 md:h-8 lg:h-10 mr-2" />
                            <p class="text-sm sm:text-md md:text-md font-semibold text-left hidden sm:block">{{
                                featureTitle
                                }}</p>
                        </button>
                    </div>

                    <div class="flex items-center" v-if="navbarConfig.showLogoBPR">
                        <button @click="isModalError = true" class="hidden sm:block">
                            <img src="@/assets/LogoBPR.png" alt="Logo" class="h-10 hidden md:block" />
                        </button>
                    </div>
                    <div v-else class="flex-grow">
                        <h2 v-if="navbarConfig.title && navbarConfig.centerTitle"
                            class="text-lg sm:text-lg md:text-xl font-semibold text-primary text-center">
                            {{ navbarConfig.title }}
                        </h2>
                    </div>

                    <div class="flex gap-4">
                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="focus:outline-none"
                            type="button">
                            <img src="@/assets/info-mini-icon.svg" alt="Info Produk" class="h-8 block md:hidden" />
                            <img src="@/assets/info-product-icon.svg" alt="Info Produk Mini"
                                class="h-10 hidden md:block" />
                        </button>
                        <div id="dropdown"
                            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700 shadow-primary-100 ">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a @click="downloadProductDetails" download="info-produk.pdf"
                                        class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Info
                                        Produk</a>
                                </li>
                                <li>
                                    <a @click="downloadSK" download="syarat-ketentuan.pdf"
                                        class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Syarat
                                        &
                                        Ketentuan</a>
                                </li>
                                <li>
                                    <a @click="downloadKP" download="Kebijakan-Privasi.pdf"
                                        class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kebijakan
                                        Privasi</a>
                                </li>
                                <li>
                                    <a @click="downloadFAQ" download="FAQ.pdf"
                                        class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">FAQ
                                    </a>
                                </li>
                                <li>
                                    <a @click="downloadTentang" download="Tentang.pdf"
                                        class="block px-4 py-2 font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tentang
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <button class="flex items-center text-primary" @click="openWhatsApp">
                            <img src="@/assets/customer-service-icon.svg" alt="Universal Care"
                                class="h-8 md:h-10 lg:h-10" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex-grow flex flex-col">
                <div class="text-center sm:text-center">
                    <h1
                        class="text-2xl xs:text-2xl sm:text-3xl md:text-4xl mb-4 mt-8 mx-8 md:mx-14 font-medium leading-">
                        Selamat Datang Nasabah di Layanan Permohonan Penutupan Deposito
                    </h1>
                    <p class="text-sm sm:text-base md:text-xl mx-8 md:mx-14 text-neutral-600 font-semibold ">
                        Nikmati kemudahan melakukan transaksi tanpa batasan tempat.
                    </p>
                </div>

                <div class=" flex items-center justify-center w-full my-24">
                    <ButtonComponent class="h-18 md:h-18 text-md md:text-lg font-semibold" @click="startDepositClosure">
                        Mulai Penutupan Deposito
                    </ButtonComponent>
                </div>

                <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div class="max-w-7xl mx-auto text-center">
                        <h2 class="text-lg md:text-xl font-semibold text-neutral-900 mb-10 mx-8 md:mx-14">
                            Tahapan Penutupan Deposito Online BPR Universal
                        </h2>

                        <div class="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 lg:gap-12">
                            <div class="flex flex-col items-center text-center max-w-[200px] mx-auto">
                                <div class="h-28 sm:h-28 md:h-28 lg:h-32 flex items-center justify-center mb-4">
                                    <img src="@/assets/onBoarding-illus.svg" alt="E-Form Icon" class="w-full h-full">
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Lengkapi E-Form</h3>
                                <p class="text-sm text-gray-600">
                                    Isi formulir elektronik dengan informasi yang tepat sebagai awal proses penutupan
                                    deposito
                                </p>
                            </div>



                            <div class="flex flex-col items-center text-center max-w-[200px] mx-auto">
                                <div class="h-28 sm:h-28 md:h-28 lg:h-32 flex items-center justify-center mb-4">
                                    <img src="@/assets/onBoarding-illus.svg" alt="Email Verify Icon"
                                        class="w-full h-full">
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Verifikasi Email</h3>
                                <p class="text-sm text-gray-600">
                                    Konfirmasi email diperlukan untuk mengirimkan informasi permohonan Anda
                                </p>
                            </div>

                            <div class="flex flex-col items-center text-center max-w-[200px] mx-auto">
                                <div class="h-28 sm:h-28 md:h-28 lg:h-32 flex items-center justify-center mb-4">
                                    <img src="@/assets/onBoarding-illus.svg" alt="ID Card Icon" class="w-full h-full">
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Siapkan Identitas Diri</h3>
                                <p class="text-sm text-gray-600">
                                    Gunakan KTP yang valid untuk keperluan verifikasi identitas
                                </p>
                            </div>

                            <div class="flex flex-col items-center text-center max-w-[200px] mx-auto">
                                <div class="h-28 sm:h-28 md:h-28 lg:h-32 flex items-center justify-center mb-4">
                                    <img src="@/assets/onBoarding-illus.svg" alt="Face Scan Icon" class="w-full h-full">
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Pemindaian Wajah</h3>
                                <p class="text-sm text-gray-600">
                                    Lakukan pemindaian wajah di tempat terang agar wajah terlihat jelas
                                </p>
                            </div>

                            <div class="flex flex-col items-center text-center max-w-[200px] mx-auto">
                                <div class="h-28 sm:h-28 md:h-28 lg:h-32 flex items-center justify-center mb-4">
                                    <img src="@/assets/onBoarding-illus.svg" alt="Phone Confirm Icon"
                                        class="w-full h-full">
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Konfirmasi Nomor Telepon</h3>
                                <p class="text-sm text-gray-600">
                                    Masukkan kode OTP yang telah dikirim ke ponsel Anda untuk melanjutkan transaksi
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/API/api";
import Footer from "@/components/Footer.vue";
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/account-icon.svg";
import infoProdukPdf from '@/assets/INFO-PRODUK.pdf';
import syaratKetentuanPdf from '@/assets/syarat-ketentuan.pdf';
import kebijakanPrivasiPdf from '@/assets/kebijakan-privasi.pdf';
import faqPdf from '@/assets/FAQ.pdf';
import tentangKamiPdf from '@/assets/Tentang.pdf';
import ButtonComponent from "@/components/button.vue";
import { useRoute, useRouter } from 'vue-router';
import { useFileStore } from "@/stores/filestore";

export default {
    name: "MainLayout",
    components: {
        // Navbar,
        Footer,
        ModalError,
        ButtonComponent,
    },
    data() {
        return {
            isInfoProductDropdownOpen: false,
            isInfoDropdownOpen: false,
            pageTitle: "",
            pageSubtitle: "",
            featureTitle: "",
            progress: 0,
            isModalError: false,
            isModalErrorEmail: false,
            error: false,
            modalContent: [
                {
                    label: "Apakah Anda Yakin Ingin Keluar?",
                    icon: errorIcon,
                    description:
                        "Data yang sudah Anda isi akan hilang dan Anda diharuskan untuk mengisi dari awal lagi.",
                    buttonString1: "Tetap di Halaman Ini",
                    buttonString2: "Keluar",
                }
            ],
            modalContentEmail: [
                {
                    label: "",
                    icon: "",
                    description: "",
                    buttonString1: "",
                    buttonString2: "",
                },
            ],
            whatsappContact: {
                whatsapp: "+622122213993",
            },
            cancelRoute: null,
            navbarConfig: {
                showBackButton: false,
                showInfoButton: true,
                showLogoBPR: true,
                centerTitle: false,
                title: null,
            },
            token: null,
        };
    },
    computed: {
        isCenterTitle() {
            return this.$route.meta.centerTitle === true;
        }
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const fileStore = useFileStore();

        return { route, router, fileStore };
    },
    watch: {
        $route(to) {
            this.updatePageTitle(to);
            this.resetNavbarConfig(to);
            this.cancelRoute = null;
        },
    },
    methods: {
        handleCloseModal() {
            this.isModalErrorEmail = false;
            this.error = false;
            this.loading = false;
            this.router.push("/");
        },
        getWhatsAppLink(number) {
            const isMobile =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                );
            if (isMobile) {
                return `https://wa.me/${number}`;
            } else {
                return `https://web.whatsapp.com/send?phone=${number}`;
            }
        },
        openWhatsApp() {
            if (this.whatsappContact.whatsapp) {
                window.open(
                    this.getWhatsAppLink(this.whatsappContact.whatsapp),
                    "_blank"
                );
            }
        },
        showErrorModal(title, message, btnString1 = "OK", btnString2 = "Batal", icon = "data-failed-illus.svg") {
            this.modalContentEmail = [
                {
                    label: title,
                    description: message,
                    icon: new URL(`/src/assets/${icon}`, import.meta.url).href,
                    buttonString1: btnString1,
                    buttonString2: btnString2,
                },
            ];
            this.error = true;
            this.loading = false;
        },
        async startDepositClosure() {
            const fileStore = useFileStore();
            fileStore.setUuid(this.token);
            this.$router.push({
                path: "/dashboard/formPencairanDeposito",
            });
        },

        async validateOtl() {
            try {
                const response = await api.get(`/check-otl?token=${this.token}`);
                if (response.status === 200) {
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.error = true;
                    this.modalContent = [
                        {
                            label: "Terjadi Kesalahan",
                            description: "Tautan tidak valid atau sudah kadaluarsa.",
                            icon: "data-failed-illus.svg",
                            buttonString1: "Tutup",
                            buttonString2: "Hubungi Universal Care",
                        },
                    ];
                }
            } catch (error) {
                this.loading = false;
                this.error = true;
                this.modalContent = [
                    {
                        label: "Terjadi Kesalahan",
                        description: "Tautan tidak valid atau sudah kadaluarsa.",
                        icon: "/src/assets/data-failed-illus.svg",
                        buttonString1: "Tutup",
                        buttonString2: "Hubungi Universal Care",
                    },
                ];
                console.error("Error validating OTL:", error);
            }
        },
        setNavbarConfig(config) {
            this.navbarConfig = { ...this.navbarConfig, ...config };
        },
        resetNavbarConfig(route) {
            if (!route.meta.persistNavbar) {
                this.navbarConfig = {
                    showBackButton: false,
                    showInfoButton: true,
                    showLogoBPR: true,
                    centerTitle: false,
                    title: null,
                };
            }
        },
        toggleInfoProductDropdown() {
            this.isInfoProductDropdownOpen = !this.isInfoProductDropdownOpen;
        },

        handleClickOutside(event) {
            if (this.isInfoProductDropdownOpen && !this.$el.contains(event.target)) {
                this.isInfoProductDropdownOpen = false;
            }
        },
        handleModalClose() {
            this.isModalError = false;
        },
        goBack() {
            window.location.href = "/";
        },
        setCancelRoute(route) {
            this.cancelRoute = route;
        },
        goBack2() {
            if (this.cancelRoute) {
                this.$router.push(this.cancelRoute);
            } else {
                this.$router.back();
            }
        },
        goToHome() {
            this.$router.push("/");
        },
        updatePageTitle(route) {
            this.featureTitle = route.meta.feature || "";
            this.pageTitle = typeof route.meta.title === 'function' ? route.meta.title(route) : route.meta.title || "";
            this.pageSubtitle = typeof route.meta.subtitle === 'function' ? route.meta.subtitle(route) : route.meta.subtitle || "";
        },
        updateProgress(value) {
            this.progress = value;
        },
        downloadProductDetails() {
            const fileUrl = infoProdukPdf;
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", "INFO-PRODUK.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        downloadSK() {
            const fileUrl = syaratKetentuanPdf;
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", "Syarat & ketentuan.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        downloadKP() {
            const fileUrl = kebijakanPrivasiPdf;
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", "Kebijakan Privasi.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        downloadFAQ() {
            const fileUrl = faqPdf;
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", "FAQ.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        downloadTentang() {
            const fileUrl = tentangKamiPdf;
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", "Tentang.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
    mounted() {
        this.updatePageTitle(this.$route);
        document.addEventListener('click', this.handleClickOutside);
        import('flowbite').then(() => {
        });
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
        // this.resetNavbarConfig();
    },
    created() {
        this.token = this.route.query.token;
        if (this.token) {
            this.validateOtl();
        } else {
            this.loading = false;
            this.error = true;
            this.modalContent = [
                {
                    label: "Terjadi Kesalahan",
                    description: "Tautan tidak valid.",
                    icon: "data-failed-illus.svg",
                    buttonString1: "Tutup",
                    buttonString2: "Hubungi Universal Care",
                },
            ];
        }
    },
};
</script>
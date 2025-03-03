<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                class="flex flex-col bg-white rounded-2xl shadow-lg dark:bg-gray-700 max-w-sm w-full p-6 relative animate-fadeIn">
                <div class="relative text-center items-baseline">
                    <h3 class="text-xl font-semibold text-primary dark:text-white px-6">
                        Apakah Anda sudah memiliki NPWP (Nomor Wajib Pajak)?
                    </h3>
                    <!-- <button @click="$emit('close')" class="absolute right-0 top-1 text-2xl text-gray-700 dark:text-white 
                        hover:text-red-500 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                        &times;
                    </button> -->
                    <button @click="$emit('close')"
                        class="absolute right-0 top-1 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                        <img src="@/assets/close-icon.svg" alt="Close" class="h-6 w-6">
                    </button>
                </div>
                <p class="text-neutral-800 dark:text-gray-300 text-center mt-2">
                    Pilih salah satu status NPWP anda terkini.
                </p>
                <div class="flex justify-between mt-4 gap-2">
                    <ButtonComponent @click="handleNpwpYes" class="flex-1">
                        Saya memiliki NPWP
                    </ButtonComponent>
                    <ButtonComponent @click="handleNpwpNo" variant="outline" class="flex-1">
                        Saya belum/tidak memiliki NPWP
                    </ButtonComponent>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import ButtonComponent from "@/components/button.vue";

export default {
    components: {
        ButtonComponent,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        handleNpwpYes() {
            this.$emit("onYes");
        },
        handleNpwpNo() {
            this.$emit("onNo");
        },
    },
};
</script>

<style scoped>
.bg-primary {
    background-color: #004AAD;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
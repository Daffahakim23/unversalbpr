<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            role="dialog" aria-hidden="true">
            <div tabindex="0"
                class="w-1/2 max-w-lg flex flex-col bg-white rounded-3xl p-5 border border-neutral-200 relative">
                <button @click="$emit('close')" class="absolute top-8 right-8 text-gray-500 hover:text-gray-700">
                    <img src="@/assets/close-icon.svg" alt="Close" class="h-6 w-6" />
                </button>

                <div class="flex flex-col">
                    <div v-for="(feature, index) in features" :key="index" class="p-6 rounded-lg text-center">
                        <!-- Icon and Header -->
                        <div class="flex justify-center items-center mb-4">
                            <img :src="iconPath" class="h-24 sm:h-28 md:h-30" />
                        </div>
                        <p class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                            {{ feature.label }}
                        </p>
                        <p v-if="feature.description" class="text-base text-neutral-700 mt-3">
                            {{ feature.description }}
                        </p>
                        <p v-if="feature.bottom" class="text-base text-neutral-700 mt-3">
                            {{ feature.bottom }}
                        </p>
                        <div class="flex flex-col items-center gap-2 mt-4 w-4/5 mx-auto">
                            <ButtonComponent v-if="feature.buttonString1" @click="handleButtonClick1(feature)"
                                type="button" class="w-full">
                                {{ feature.buttonString1 }}
                            </ButtonComponent>
                            <ButtonComponent v-if="feature.buttonString2" @click="handleButtonClick2(feature)"
                                type="button" variant="ghost" class="w-full">
                                {{ feature.buttonString2 }}
                            </ButtonComponent>
                        </div>
                    </div>
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
        isOpen: Boolean,
        features: {
            type: Array,
            default: () => [],
        },
        icon: String,
    },
    emits: ["close", "buttonClick1", "buttonClick2"],
    computed: {
        iconPath() {
            return this.icon ? `/assets/${this.icon}` : "";
        },
    },
    methods: {
        handleButtonClick1(feature) {
            this.$emit("buttonClick1", feature);
        },
        handleButtonClick2(feature) {
            this.$emit("buttonClick2", feature);
        },
        handleEscape(event) {
            if (event.key === "Escape") {
                this.$emit("close");
            }
        },
    },
    mounted() {
        window.addEventListener("keydown", this.handleEscape);
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleEscape);
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

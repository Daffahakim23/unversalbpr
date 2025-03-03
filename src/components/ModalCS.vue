<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="w-full max-w-lg flex flex-col bg-white rounded-3xl p-6 border border-neutral-200 relative">
                <!-- Close Button -->
                <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <img src="@/assets/close-icon.svg" alt="Close" class="h-6 w-6" />
                </button>

                <!-- Icon and Header -->
                <div class="flex justify-left items-center mb-4">
                    <img :src="iconPath" class="h-16 sm:h-18 md:h-20" />
                </div>

                <!-- Description (List of Features) -->
                <div class="flex flex-col mb-6">
                    <div v-for="(feature, index) in features" :key="index" class="p-2 rounded-lg gap-x-8">
                        <div class="flex-1">
                            <p class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                                {{ feature.label }}
                            </p>
                            <p v-if="feature.description" class="text-base text-neutral-700 mt-3">
                                {{ feature.description }}
                            </p>
                            <p v-if="feature.bottom" class="text-base text-neutral-700 mt-3">
                                {{ feature.bottom }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- List of Contacts -->
                <div class="flex flex-col divide-y divide-gray-200 border border-gray-300 rounded-xl overflow-hidden">
                    <div v-for="(contact, index) in contacts" :key="index"
                        class="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer">
                        <div class="flex items-center gap-3">
                            <img :src="contactIcons[index].icon" class="h-6 w-6" />
                            <div>
                                <p class="text-gray-900 font-semibold text-base">{{ contact.label }}</p>
                                <p class="text-gray-600 text-sm">{{ contact.number }}</p>
                            </div>
                        </div>
                        <img src="@/assets/right-arrow-circle-orange.svg" class="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
        features: Array,
        icon: String,
        buttonString: String,
        onBtnClick: Function,
    },
    emits: ["close", "cardClick"],
    computed: {
        iconPath() {
            return new URL(`/src/assets/${this.icon}`, import.meta.url).href;
        },
        contactIcons() {
            return this.contacts.map(contact => ({
                ...contact,
                icon: new URL(`/src/assets/${contact.icon}`, import.meta.url).href
            }));
        }

    },
    methods: {
        handleBtnClick() {
            if (typeof this.onBtnClick === "function") {
                this.onBtnClick();
            }
            this.$emit("cardClick");
        },
    },
    data() {
        return {
            contacts: [
                {
                    label: "WhatsApp",
                    number: "(+62) 21 2221 3993",
                    icon: "whatsapp-icon.svg",
                },
                {
                    label: "Call Center Universal Care",
                    number: "(021) 2221 3993",
                    icon: "call-icon.svg",
                },
            ],
        };
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
</style>
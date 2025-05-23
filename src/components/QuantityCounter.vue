<template>
    <div class="relative flex flex-col items-left mb-6 w-full">
        <label :for="id" class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900">
            {{ label }}
        </label>
        <div class="flex flex-row mt-2 w-full">
            <button type="button" @click="decrement"
                class=" text-primary bg-primary-50 hover:bg-primary-100 border-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:border-gray-600 border rounded-s-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                <svg class="w-3 h-3 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h16" />
                </svg>
            </button>
            <input type="text" :id="id" v-model="internalValue" inputmode="numeric"
                class="bg-white border-y border-neutral-200 h-10 text-center text-neutral-900 text-sm focus:ring-primary-300 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :maxlength="maxlength" @blur="validateAndEmit" @input="handleInput" />
            <button type="button" @click="increment"
                class=" text-primary bg-primary-50 hover:bg-primary-100 border-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:border-gray-600 border rounded-e-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 1v16M1 9h16" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    props: {
        label: { type: String, required: true },
        id: { type: String, required: true },
        modelValue: { // Menerima angka, tapi juga bisa menerima null/undefined dari parent
            type: [Number, null],
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 50,
        },
        maxlength: { // Tambahkan prop maxlength
            type: Number,
            default: 2, // Default 2 digit
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            // Menggunakan string untuk input agar bisa handle input kosong sementara
            internalValue: String(this.modelValue === null || this.modelValue === undefined ? '' : this.modelValue),
        };
    },
    watch: {
        modelValue(newValue) {
            // Perbarui internalValue ketika modelValue berubah dari parent
            this.internalValue = String(newValue === null || newValue === undefined ? '' : newValue);
        },
    },
    methods: {
        handleInput(event) {
            let value = event.target.value;
            // Hapus karakter non-digit dan batasi panjangnya
            value = value.replace(/\D/g, '').slice(0, this.maxlength);
            this.internalValue = value; // Update v-model

            // Emit nilai sebagai angka atau 0 jika string kosong
            const numericValue = parseInt(value, 10);
            this.$emit('update:modelValue', isNaN(numericValue) ? 0 : numericValue);
        },
        increment() {
            let currentValue = parseInt(this.internalValue, 10);
            if (isNaN(currentValue)) currentValue = this.min; // Jika kosong, mulai dari min

            const newValue = Math.min(currentValue + 1, this.max);
            this.internalValue = String(newValue);
            this.$emit('update:modelValue', newValue);
        },
        decrement() {
            let currentValue = parseInt(this.internalValue, 10);
            if (isNaN(currentValue)) currentValue = this.min; // Jika kosong, mulai dari min

            const newValue = Math.max(currentValue - 1, this.min);
            this.internalValue = String(newValue);
            this.$emit('update:modelValue', newValue);
        },
        validateAndEmit() {
            // Fungsi ini dipanggil saat blur untuk memastikan nilai akhir sesuai min/max
            let parsedValue = parseInt(this.internalValue, 10);
            if (isNaN(parsedValue)) {
                parsedValue = this.min; // Default ke min jika input kosong/invalid
            }
            const validatedValue = Math.min(Math.max(parsedValue, this.min), this.max);
            this.internalValue = String(validatedValue); // Pastikan input field menampilkan nilai yang divalidasi
            this.$emit('update:modelValue', validatedValue);
        },
    },
};
</script>
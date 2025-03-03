<template>
  <div class="mb-6">
    <label :for="id" class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900">{{ label }}</label>
    <div class="relative mt-2">
      <template v-if="!isDropdown">
        <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)" :readonly="readonly" :class="{
            'bg-gray-200 text-gray-500 cursor-not-allowed': readonly,
            'border-neutral-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400': !readonly
          }" class="w-full h-10 p-2 border rounded-md focus:outline-none" :required="required" />
      </template>

      <template v-else>
        <!-- Trigger -->
        <div class="relative">
          <button type="button" @click="toggleDropdown"
            class="w-full h-10 px-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-blue-400 text-left flex items-center justify-between">
            <span :class="selectedLabel ? 'text-neutral-900' : 'text-gray-400'">
              {{ selectedLabel ?? placeholder }}
            </span>
            <!-- Chevron Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Dropdown List -->
          <div v-if="isOpen" class="absolute w-full bg-white border border-neutral-200 rounded-md shadow-md z-10 mt-1">
            <div v-for="(option, index) in options" :key="index" @click="selectOption(option)"
              class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <p class="text-sm text-neutral-800">{{ option.label }}</p>
              <p v-if="option.subtitle" class="text-xs text-neutral-500">{{ option.subtitle }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <p v-if="hint" class="text-xs text-neutral-700 mt-1">{{ hint }}</p>
  </div>
</template>

<script>
export default {
  name: "FormField",
  props: {
    label: { type: String, required: true },
    id: { type: String, required: true },
    type: { type: String, default: "text" },
    modelValue: { type: [String, Number], default: "" },
    placeholder: { type: String, default: "" },
    hint: { type: String, default: "" },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isDropdown: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    selectedLabel() {
      const selected = this.options.find(opt => opt.value === this.modelValue);
      return selected ? selected.label : null;
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.isOpen = false;
    },
  },
};
</script>

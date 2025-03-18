<template>
  <div class="mb-6">
    <label :for="id" class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <template v-if="!isDropdown && type !== 'phone'">
        <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)" :readonly="readonly" :class="{
            'border-gray-200 bg-neutral-100 text-neutral-300 cursor-not-allowed': readonly,
            'border-red-500 focus:ring-red-400 focus:border-red-400': error,
            'border-neutral-200 focus:ring-1': !readonly && !error
          }" class="w-full h-10 p-2 border rounded-md focus:outline-none" :required="required" />
      </template>

      <template v-else-if="type === 'phone'">
        <div class="flex items-center border rounded-md focus-within:ring-1"
          :class="{ 'border-red-500 focus-within:ring-red-400 focus-within:border-red-400': error }">
          <button @click="toggleCountryDropdown" type="button"
            class="flex gap-2 items-center px-2 border-r border-neutral-200 relative"
            :class="{ 'border-red-500': error }">
            <span :class="'fi fi-' + selectedCountryCode.toLowerCase()"></span>
            <span class="text-sm text-neutral-800">{{
              getCountryCallingCode(selectedCountryCode)
            }}</span>
          </button>

          <div v-if="isCountryDropdownOpen" ref="countryDropdown"
            class="absolute left-0 top-full mt-1 w-52 bg-white border border-neutral-200 rounded-md shadow-md z-10 max-h-60 overflow-auto">
            <div v-for="(country, index) in countryList" :key="index" @click="selectCountry(country)"
              class="flex items-center p-2 hover:bg-blue-100 cursor-pointer border-gray-200">
              <span :class="'fi fi-' + country.code.toLowerCase()"></span>
              <span class="ml-2 text-sm">{{ country.name }} ({{ country.callingCode }})</span>
            </div>
          </div>

          <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)" :readonly="readonly" :class="{
              'border-gray-200 bg-neutral-100 text-neutral-300 cursor-not-allowed': readonly,
              'border-red-500': error,
              'border-neutral-200 focus:ring-1': !readonly && !error
            }" class="w-full h-10 p-2 rounded-md" :required="required" />
        </div>
      </template>


      <!-- <template v-else-if="type === 'phone'">
        <div class="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-primary-500">
          <button @click="toggleCountryDropdown" type="button"
            class="flex gap-2 items-center px-2 border-r border-neutral-200 relative">
            <span :class="'fi fi-' + selectedCountryCode.toLowerCase()"></span>
            <span class="text-sm text-neutral-800">{{ getCountryCallingCode(selectedCountryCode) }}</span>
          </button>

          <div v-if="isCountryDropdownOpen" ref="countryDropdown"
            class="absolute left-0 top-full mt-1 w-52 bg-white border border-neutral-200 rounded-md shadow-md z-10 max-h-60 overflow-auto">
            <div v-for="(country, index) in countryList" :key="index" @click="selectCountry(country)"
              class="flex items-center p-2 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <span :class="'fi fi-' + country.code.toLowerCase()"></span>
              <span class="ml-2 text-sm">{{ country.name }} ({{ country.callingCode }})</span>
            </div>
          </div>

          <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)" :readonly="readonly" :class="{
              'border-gray-200 bg-neutral-100 text-neutral-300 cursor-not-allowed': readonly,
              'border-red-500 focus:ring-red-400 focus:border-red-400': error,
              'border-neutral-200 focus:ring-2': !readonly && !error
            }" class="w-full h-10 p-2 border rounded-md focus:outline-none" :required="required" />
        </div>
      </template> -->

      <template v-else>
        <div class="relative">
          <button type="button" @click="toggleDropdown" ref="trigger"
            class="w-full h-10 px-3 border rounded-md focus:outline-none text-left flex items-center justify-between"
            :class="{
              'border-red-500 focus:ring-red-400 focus:border-red-400': error,
              'border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-blue-400': !error
            }">
            <span :class="selectedLabel ? 'text-neutral-900' : 'text-gray-400'">
              {{ selectedLabel ?? placeholder }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <div v-if="isOpen" ref="dropdown"
            class="absolute w-full bg-white border border-neutral-200 rounded-md shadow-md z-10 mt-1">
            <div v-for="(option, index) in options" :key="index" @click="selectOption(option)"
              class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <p class="text-sm text-neutral-800">{{ option.label }}</p>
              <p v-if="option.subtitle" class="text-xs text-neutral-500">{{ option.subtitle }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <p v-if="hint" class="text-xs text-neutral-700 mt-1" :class="{ 'text-red-500': error, 'text-neutral-700': !error }">
      {{ hint }}
    </p>
  </div>
</template>

<script>
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.css"; // Impor CSS flag-icons
import { getCountryCallingCode } from "libphonenumber-js";

countries.registerLocale(enLocale);

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
    error: { type: Boolean, default: false },
    selectedCountryCode: String, // Kode negara default
  },
  emits: ["update:modelValue", "update:selectedCountryCode", "focus", "blur"],
  data() {
    return {
      isOpen: false,
      phoneNumber: "",
      isCountryDropdownOpen: false,
      countryList: [
        { code: "ID", name: "Indonesia", callingCode: "+62" },
        { code: "US", name: "United States", callingCode: "+1" },
        { code: "GB", name: "United Kingdom", callingCode: "+44" },
        { code: "IN", name: "India", callingCode: "+91" },
        { code: "MY", name: "Malaysia", callingCode: "+60" },
        { code: "SG", name: "Singapore", callingCode: "+65" },
        { code: "AU", name: "Australia", callingCode: "+61" },
        { code: "CA", name: "Canada", callingCode: "+1" },
        { code: "DE", name: "Germany", callingCode: "+49" },
        { code: "FR", name: "France", callingCode: "+33" },
        { code: "JP", name: "Japan", callingCode: "+81" },
        { code: "CN", name: "China", callingCode: "+86" },
        { code: "KR", name: "South Korea", callingCode: "+82" },
        { code: "BR", name: "Brazil", callingCode: "+55" },
        { code: "ZA", name: "South Africa", callingCode: "+27" },
        { code: "NG", name: "Nigeria", callingCode: "+234" },
        { code: "EG", name: "Egypt", callingCode: "+20" },
        { code: "SA", name: "Saudi Arabia", callingCode: "+966" },
        { code: "MX", name: "Mexico", callingCode: "+52" },
        { code: "TR", name: "Turkey", callingCode: "+90" },
      ],
    };
  },
  computed: {
    selectedLabel() {
      const selected = this.options.find((opt) => opt.value === this.modelValue);
      return selected ? selected.label : null;
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    if (this.type === "handphone") {
      this.phoneNumber = this.modelValue
        .replace(this.getCountryCallingCode(this.selectedCountryCode), "")
        .trim();
    }
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.isOpen = false;
    },

    handleClickOutside(event) {
      if (
        this.isOpen &&
        this.$refs.dropdown &&
        !this.$refs.dropdown.contains(event.target) &&
        !this.$refs.trigger.contains(event.target)
      ) {
        this.isOpen = false;
      }
    },

    toggleCountryDropdown() {
      this.isCountryDropdownOpen = !this.isCountryDropdownOpen;
    },
    selectCountry(country) {
      this.$emit("update:selectedCountryCode", country.code); // Emit ke parent
      this.isCountryDropdownOpen = false;
    },

    handleClickOutsideCountryDropdown(event) {
      if (
        this.isCountryDropdownOpen &&
        this.$refs.countryDropdown &&
        !this.$refs.countryDropdown.contains(event.target)
      ) {
        this.isCountryDropdownOpen = false;
      }
    },
    handlePhoneNumberInput(event) {
      let phoneNumber = event.target.value.replace(/\D/g, "").slice(0, 15);
      this.phoneNumber = phoneNumber;
      // this.$emit("update:modelValue", this.getCountryCallingCode(this.selectedCountryCode) + phoneNumber);
    },
    getCountryCallingCode(countryCode) {
      const country = this.countryList.find(c => c.code === countryCode);
      return country ? country.callingCode : "+62"; // Default +62 (Indonesia)
    },
  },
};
</script>

<style scoped>
.radio-button-choose-label {
  font-size: inherit;
}

.radio-button-choose-label {
  padding-top: 2px;
  padding-bottom: 2px;
}

.radio-button-choose-input {
  padding-top: 0;
  padding-bottom: 0;
}
</style>


<!-- <template>
  <div class="mb-6">
    <label :for="id" class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <template v-if="!isDropdown">
        <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)" :readonly="readonly" :class="{
            'border-gray-200  bg-neutral-100 text-neutral-300 cursor-not-allowed': readonly,
            'border-red-500 focus:ring-red-400 focus:border-red-400': error,
            'border-neutral-200 focus:ring-2': !readonly && !error
          }" class="w-full h-10 p-2 border rounded-md focus:outline-none" :required="required" />
      </template>

      <template v-else>
        <div class="relative">
          <button type="button" @click="toggleDropdown" ref="trigger"
            class="w-full h-10 px-3 border rounded-md focus:outline-none text-left flex items-center justify-between"
            :class="{
              'border-red-500 focus:ring-red-400 focus:border-red-400': error,
              'border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-blue-400': !error
            }">
            <span :class="selectedLabel ? 'text-neutral-900' : 'text-gray-400'">
              {{ selectedLabel ?? placeholder }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <div v-if="isOpen" ref="dropdown"
            class="absolute w-full bg-white border border-neutral-200 rounded-md shadow-md z-10 mt-1">
            <div v-for="(option, index) in options" :key="index" @click="selectOption(option)"
              class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <p class="text-sm text-neutral-800">{{ option.label }}</p>
              <p v-if="option.subtitle" class="text-xs text-neutral-500">{{ option.subtitle }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <p v-if="hint" class="text-xs text-neutral-700 mt-1" :class="{ 'text-red-500': error, 'text-neutral-700': !error }">
      {{ hint }}
    </p>
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
    error: { type: Boolean, default: false },
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

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.isOpen = false;
    },

    handleClickOutside(event) {
      if (this.isOpen && this.$refs.dropdown && !this.$refs.dropdown.contains(event.target) && !this.$refs.trigger.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.radio-button-choose-label {
  font-size: inherit;
}

.radio-button-choose-label {
  padding-top: 2px;
  padding-bottom: 2px;
}

.radio-button-choose-input {
  padding-top: 0;
  padding-bottom: 0;
}
</style> -->

<!-- <template>
  <div class="mb-6">
    <label :for="id" class="block text-xs sm:text-sm font-medium text-neutral-900">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <template v-if="!isDropdown">
        <div class="flex" v-if="type === 'phone'">
          <div class="relative w-24 mr-2">
            <button type="button" @click="toggleCountryDropdown" ref="countryTrigger"
              class="w-full h-10 px-3 border rounded-md focus:outline-none text-left flex items-center justify-between"
              :class="{ 'border-red-500': error, 'border-neutral-200 focus:ring-2 focus:ring-primary-500': !error }">
              <div class="flex items-center">
                <img v-if="selectedCountry" :src="selectedCountry.flag" alt="Flag" class="w-5 h-5 mr-2" />
                <span>{{ selectedCountry?.dialCode || '+62' }}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isCountryDropdownOpen" ref="countryDropdown"
              class="absolute w-full bg-white border rounded-md shadow-md z-10 mt-1">
              <div v-for="(country, index) in countries" :key="index" @click="selectCountry(country)"
                class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200 flex items-center">
                <img :src="country.flag" alt="Flag" class="w-5 h-5 mr-2" />
                <p class="text-sm text-neutral-800">{{ country.name }} (+{{ country.dialCode }})</p>
              </div>
            </div>
          </div>

          <input type="tel" :id="id" :placeholder="placeholder" :value="modelValue"
            @input="updatePhoneNumber($event.target.value)" @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)" :readonly="readonly" :required="required"
            class="w-full h-10 p-2 border rounded-md focus:outline-none"
            :class="{ 'bg-gray-200 cursor-not-allowed': readonly, 'border-red-500': error, 'border-neutral-200 focus:ring-2 focus:ring-blue-400': !readonly && !error }" />
        </div>
        <input v-else :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)" :readonly="readonly" :required="required"
          class="w-full h-10 p-2 border rounded-md focus:outline-none"
          :class="{ 'bg-gray-200 cursor-not-allowed': readonly, 'border-red-500': error, 'border-neutral-200 focus:ring-2 focus:ring-blue-400': !readonly && !error }" />
      </template>

      <template v-else>
        <div class="relative">
          <button type="button" @click="toggleDropdown" ref="trigger"
            class="w-full h-10 px-3 border rounded-md focus:outline-none text-left flex items-center justify-between"
            :class="{ 'border-red-500': error, 'border-neutral-200 focus:ring-2 focus:ring-primary-500': !error }">
            <span :class="selectedLabel ? 'text-neutral-900' : 'text-gray-400'">
              {{ selectedLabel ?? placeholder }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <div v-if="isOpen" ref="dropdown" class="absolute w-full bg-white border rounded-md shadow-md z-10 mt-1">
            <div v-for="(option, index) in options" :key="index" @click="selectOption(option)"
              class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <p class="text-sm text-neutral-800">{{ option.label }}</p>
              <p v-if="option.subtitle" class="text-xs text-neutral-500">{{ option.subtitle }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <p v-if="hint" class="text-xs mt-1" :class="{ 'text-red-500': error, 'text-neutral-700': !error }">
      {{ hint }}
    </p>
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
    error: { type: Boolean, default: false },
  },
  data() {
    return {
      isOpen: false,
      isCountryDropdownOpen: false,
      selectedCountry: null,
      countries: this.getCountriesData(),
    };
  },
  computed: {
    selectedLabel() {
      const selected = this.options.find(opt => opt.value === this.modelValue);
      return selected ? selected.label : null;
    }
  },
  methods: {
    toggleDropdown() { this.isOpen = !this.isOpen; },
    selectOption(option) { this.$emit("update:modelValue", option.value); this.isOpen = false; },
    toggleCountryDropdown() { this.isCountryDropdownOpen = !this.isCountryDropdownOpen; },
    selectCountry(country) { this.selectedCountry = country; this.isCountryDropdownOpen = false; },
    updatePhoneNumber(value) { this.$emit('update:modelValue', value.replace(/\D/g, '')); },
  }
};
</script> -->

<!-- <template>
  <div class="mb-6">
    <label :for="id" class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <template v-if="!isDropdown">
        <div class="flex" v-if="type === 'phone'">
          <div class="relative w-24 mr-2">
            <button type="button" @click="toggleCountryDropdown" ref="countryTrigger"
              class="w-full h-10 px-3 border rounded-md focus:outline-none text-left flex items-center justify-between"
              :class="{
                'border-red-500 focus:ring-red-400 focus:border-red-400': error,
                'border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-blue-400': !error
              }">
              <div class="flex items-center">
                <img v-if="selectedCountry" :src="selectedCountry.flag" alt="Bendera" class="w-5 h-5 mr-2" />
                <span>{{ selectedCountry?.dialCode || '+62' }}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>

            <div v-if="isCountryDropdownOpen" ref="countryDropdown"
              class="absolute w-full bg-white border border-neutral-200 rounded-md shadow-md z-10 mt-1">
              <div v-for="(country, index) in countries" :key="index" @click="selectCountry(country)"
                class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
                <div class="flex items-center">
                  <img :src="country.flag" alt="Bendera" class="w-5 h-5 mr-2" />
                  <p class="text-sm text-neutral-800">{{ country.name }} (+{{ country.dialCode }})</p>
                </div>
              </div>
            </div>
          </div>

          <input type="tel" :id="id" :placeholder="placeholder" :value="phoneNumber"
            @input="updatePhoneNumber($event.target.value)" @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)" :readonly="readonly" :class="{
              'bg-gray-200 text-gray-500 cursor-not-allowed': readonly,
              'border-red-500 focus:ring-red-400 focus:border-red-400': error,
              'border-neutral-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400': !readonly && !error
            }" class="w-full h-10 p-2 border rounded-md focus:outline-none" :required="required" />
        </div>
        <input v-else :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)" :readonly="readonly" :class="{
            'bg-gray-200 text-gray-500 cursor-not-allowed': readonly,
            'border-red-500 focus:ring-red-400 focus:border-red-400': error,
            'border-neutral-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400': !readonly && !error
          }" class="w-full h-10 p-2 border rounded-md focus:outline-none" :required="required" />
      </template>

      <template v-else>
        <div class="relative">
          <button type="button" @click="toggleDropdown" ref="trigger"
            class="w-full h-10 px-3 border rounded-md focus:outline-none text-left flex items-center justify-between"
            :class="{
              'border-red-500 focus:ring-red-400 focus:border-red-400': error,
              'border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-blue-400': !error
            }">
            <span :class="selectedLabel ? 'text-neutral-900' : 'text-gray-400'">
              {{ selectedLabel ?? placeholder }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <div v-if="isOpen" ref="dropdown"
            class="absolute w-full bg-white border border-neutral-200 rounded-md shadow-md z-10 mt-1">
            <div v-for="(option, index) in options" :key="index" @click="selectOption(option)"
              class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <p class="text-sm text-neutral-800">{{ option.label }}</p>
              <p v-if="option.subtitle" class="text-xs text-neutral-500">{{ option.subtitle }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <p v-if="hint" class="text-xs text-neutral-700 mt-1" :class="{ 'text-red-500': error, 'text-neutral-700': !error }">
      {{ hint }}
    </p>
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
    error: { type: Boolean, default: false },
  },
  data() {
    return {
      isOpen: false,
      isCountryDropdownOpen: false,
      selectedCountry: null,
      countries: [
        { name: 'Indonesia', dialCode: '62', flag: 'https://flagcdn.com/w320/id.png' },
        { name: 'Amerika Serikat', dialCode: '1', flag: 'https://flagcdn.com/w320/us.png' },
        { name: 'Singapura', dialCode: '65', flag: 'https://flagcdn.com/w320/sg.png' },
        { name: 'Malaysia', dialCode: '60', flag: 'https://flagcdn.com/w320/my.png' },
        // ... tambahkan negara lain di sini ...
      ],
    };
  },
  computed: {
    selectedLabel() {
      const selected = this.options.find(opt => opt.value === this.modelValue);
      return selected ? selected.label : null;
    },
    phoneNumber() {
      // Menggabungkan kode negara dan nomor telepon
      if (this.type === 'phone') {
        return (this.selectedCountry?.dialCode || '+62') + this.modelValue;
      }
      return this.modelValue
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.isOpen = false;
    },

    handleClickOutside(event) {
      if (this.isOpen && this.$refs.dropdown && !this.$refs.dropdown.contains(event.target) && !this.$refs.trigger.contains(event.target)) {
        this.isOpen = false;
      }
      if (this.isCountryDropdownOpen && this.$refs.countryDropdown && !this.$refs.countryDropdown.contains(event.target) && !this.$refs.countryTrigger.contains(event.target)) {
        this.isCountryDropdownOpen = false;
      }
    },
    toggleCountryDropdown() {
      this.isCountryDropdownOpen = !this.isCountryDropdownOpen;
    },
    selectCountry(country) {
      this.selectedCountry = country;
      this.isCountryDropdownOpen = false;
    },
    updatePhoneNumber(value) {
      // Membersihkan nomor telepon dari karakter non-digit
      const cleanedValue = value.replace(/\D/g, '');
      this.$emit('update:modelValue', cleanedValue);
    },
  },
};
</script>

<style scoped>
.radio-button-choose-label {
  font-size: inherit;
}

.radio-button-choose-label {
  padding-top: 2px;
  padding-bottom: 2px;
}

.radio-button-choose-input {
  padding-top: 0;
  padding-bottom: 0;
}
</style> -->

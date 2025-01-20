<template>
    <div class="input-container">
      <label v-show="label != null"  :for="id">{{ label }}</label>
      <input class="input"
        :type="type"
        :id="id"
        :value="modelValue"
        @input="handleInput"
        :class="{ 'input-error': hasError }"
        :placeholder="placeholder"
      />
      <p v-if="hasError" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        default: 'text',
      },
      placeholder: {
        type: String,
        default: '',
      },
      hasValidation: {
        type: Boolean,
        required: true,
      },
      validationRule: {
        type: Function,
      },
      modelValue: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        hasError: false,
        errorMessage: '',
      };
    },
    watch: {
      modelValue(newValue) {
        this.validateInput(newValue);
      },
    },
    methods: {
      handleInput(event) {
        const value = event.target.value;
        this.$emit('update:modelValue', value);
        this.validateInput(value);
      },
      validateInput(value) {
        if (this.hasValidation) {
          const validationResult = this.validationRule(value);
          if (validationResult === true) {
            this.hasError = false;
            this.errorMessage = '';
          } else {
            this.hasError = true;
            this.errorMessage = validationResult;
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .input-container {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-left: 2px;
    text-align: start;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: medium;
  }
  
  input {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: medium;
  }
  
  input.input-error {
    border-color: red;
  }
  
  .error-message {
    text-align: start;
    color: red;
    font-size: small;
    margin-top: 10px;
  }
  </style>
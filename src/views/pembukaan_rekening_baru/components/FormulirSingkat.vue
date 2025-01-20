<template>
    <div>
      <h2 class="header">Formulir Singkat</h2>
      <div class="formulir-singkat">
        <InputField
        id="email"
        label="Email *"
        type="email"
        :hasValidation="true"
        placeholder="Masukkan Email"
        :validationRule="validateEmail"
        @input="handleInputEmail"
        v-model="email"
      />
      <InputField 
        id="phone"
        label="Nomor Handphone *"
        type="tel"
        :hasValidation="true"
        placeholder="Masukkan Nomor Handphone"
        :validationRule="validatePhone"
        v-model="phone"
        @input="handleInputPhone"
      />
      <InputField
        id="name"
        :hasValidation="true"
        label="Name Funding OFficer (Opsional)"
        type="text"
        placeholder="Masukkan Nama Funding Officer"
        v-model="name"
        @input="handleInputName"
      />
      </div>
    </div>
  </template>
  
  <script>
  import InputField from '@/components/InputField.vue';
  
  export default {
    components: {
        InputField,
    },
    data() {
      return {
        email: '',
        phone: '',
        name: '',
        hasError: false,
      };
    },
    methods: {
      handleInputEmail(event) {
        const value = event.target.value;
        this.$emit('update:modelValue', value);
        this.validateEmail(value);
      },
      handleInputName(event) {
        const value = event.target.value;
        this.$emit('update:modelValue', value);
      },
      handleInputPhone(event) {
        const value = event.target.value;
        this.$emit('update:modelValue', value);
        this.validatePhone(value)
      },
      validateEmail(value) {
        console.log(value);
        if (!value) {
            this.hasError = true;
            return 'Email tidak boleh kosong.';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            this.hasError = true;
            return 'Email tidak valid.'; 
        }

        this.hasError = false;
        return true; 
      },
      validatePhone(value) {
        if (!value) {
            return 'Nomor handphone tidak boleh kosong.';
        }
        const phonePattern = /^\d{10,}$/;
        if (!phonePattern.test(value)) {
            return 'Nomor handphone tidak valid.'; 
        }

        this.hasError = false;
        return true; 
      },
      submitForm() {
        if (!this.hasError) {
            console.log('Email:', this.email);
            console.log('Phone:', this.phone);
            console.log('Name:', this.name);
        }
      },
    },
  };
</script>

<style scoped>
.formulir-singkat {
   display: flex;
   flex-direction: column;
   gap: 25px; 
}

.header {
   font-weight: normal;     
   text-align: start;
   font-size:24px;
   color: darkblue;
   margin-bottom: 30px;
}

</style>
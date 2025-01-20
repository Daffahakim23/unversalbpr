<template>
  <div class="form">
    <div class="form-container">
      <div class="customer-info">
        <h1>Informasi Nasabah</h1>
        <div class="section">
          <h3 class="question-text">1. Apakah Anda merupakan nasabah baru atau sudah nasabah lama BPR Universal?</h3>
          <div class="options-container">
            <div 
              class="option" 
              :class="{ selected: customerType === 'Nasabah Universal' }" 
              @click="selectOption('Nasabah Universal')"
            >
              <img 
                class="option-image"
                src="@/assets/nasabah-bpr.svg"
                :class="{ 'image-slected': customerType === 'Nasabah Universal' }"
              />
              <div style="margin-top: 10px;">Nasabah Universal</div>
            </div>
            <div 
              class="option" 
              :class="{ selected: customerType === 'Non Nasabah Universal' }" 
              @click="selectOption('Non Nasabah Universal')"
            >
              <img 
                class="option-image"
                src="@/assets/non-nasabah-bpr.svg"
                :class="{ 'image-slected': customerType === 'Non Nasabah Universal' }"
              />
              <div style="margin-top: 10px;">Non Nasabah Universal</div>
            </div>
          </div>
        </div>

        <div class="section2">
          <h3 class="question-text">2. Dari mana Anda mengetahui tentang kami?</h3>
          <div class="radio-group">
            <label>
              <input
                type="radio"
                v-model="sourceOfInfo"
                value="Website"
              />
              Website
            </label>
            <label>
              <input
                type="radio"
                v-model="sourceOfInfo"
                value="Brosur"
              />
              Brosur
            </label>
            <label>
              <input
                type="radio"
                v-model="sourceOfInfo"
                :value="lainnyaValue"
              />
              <InputField class="input-field"
                  id="name"
                  type="text"
                  :hasValidation="false"
                  placeholder="Lainnya"
                  v-model="customSource"
                  @input="updateLainnyaValue"
              />
            </label>
          </div>
        </div>   
        
        <div>
          <button 
            @click="submitForm"
            >
            Lanjutkan
          </button>
        </div>
      </div>
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
        customerType: null,
        sourceOfInfo: null,
        customSource: '',
        lainnyaValue: '',
      };
    },
    created() {
      var customerType = this.$route.query.index || 'Not provided';

      if (customerType == 0) {
        this.customerType = "Non Nasabah Universal";
      } else if (customerType == 1) {
        this.customerType = "Nasabah Universal";
      } else {
        this.customerType = ''
      }
    },
    methods: {
      selectOption(option) {
        this.customerType = option;
      },
      updateLainnyaValue(event) {
        const value = event.target.value;
        this.$emit('update:customSource', value);
        this.lainnyaValue = this.customSource.trim() || '';
        this.sourceOfInfo = this.lainnyaValue
      },
      submitForm() {
        if (this.customerType != null && this.sourceOfInfo != '') {
          console.log('Customer Type:', this.customerType);
          console.log('Source of Information:', this.sourceOfInfo);
          this.$emit('next');
        }
      },   
    },
  };
</script>
  
<style scoped>
  .form {
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    /* align-items: center; */
    justify-content: center;
  }

  .form-container{
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 12px;
    padding-top: 20px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 696px;
  }

  .customer-info {
    margin-bottom: 10px;
  }
  
  .section {
    margin-bottom: 20px;
  }

  .section2 {
    margin-bottom: 50px;
  }
  
  h1 {
    /* font-family: 'Inter'; */
    font-weight: normal;
    text-align: start;
    font-size: 24px;
    color: #003B70;
    margin-bottom: 30px;
  }
  
  h3.question-text {
    /* font-family: 'Inter'; */
    text-align: start;
    margin-bottom: 20px;
    font-weight: normal;
    font-size: medium;
    line-height: 1.5;
  }
  
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
  }
  
  input[type="radio"]{
    margin: 0;
    width: 15px;
    height: 15px;
    accent-color: #003B70
  }
  
  .input-field {
    width: 100%;
  }

  .options-container {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 60px;
    margin-top: 10px;
  }

  .option {
    padding: 30px;
    border: 2px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    justify-self: start;
    width: 120px;
    height: 120px;
    background: white;
    color: #333;
    transition: background 0.3s, color 0.3s; /* Smooth transition */
  }

  .option.selected {
    background: linear-gradient(180deg, #33628D 0%, #003B70 100%);
    color: white;
    border-color: linear-gradient(180deg, #33628D 0%, #003B70 100%);
  }

  .option-image {
    width: 70px; 
    height: 70px; 
    filter: grey;
    fill: grey;
    color: grey;
    transition: filter 0.3s;
  }

  .image-slected {
    filter: white;
    fill: white;
    color: white;

  }

  button {
    display: block;
    justify-self: end;
    border-radius: 8px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 25px;
    padding-right: 25px;
    color: white;
    border: 0px;
    background: linear-gradient(180deg, #33628D 0%, #003B70 100%);
  }

  button:active {
    transform: scale(0.95); 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add shadow on click */
  }

  
</style>
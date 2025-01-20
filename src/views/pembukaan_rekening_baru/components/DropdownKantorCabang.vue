<template>
    <div>
      <DynamicDropdown
        inputId="branchOffice"
        label="Pilih Kantor Cabang *"
        type="text"
        placeholder="Masukan Kantor Cabang"
        :items="branchOffices"
        :validationRules="branchOfficeRules"
        @input="updateBranchOffice"
        @select="selectBranchOffice"
      />
    </div>
  </template>
  
  <script>
  import DynamicDropdown from '@/components/Dropdown.vue';
  import { Helper } from '@/helpers/helper';
  
  export default {
    components: {
      DynamicDropdown
    },
    data() {
      return {
        branchOffices: [
          { value: '01', label: 'Kantor Pusat PT BPR Universal (01)' },
          { value: '02', label: 'Kantor Kas BSD 01' },
          { value: '03', label: 'Kantor Kas PIK 01' },
          { value: '04', label: 'Kantor Cabang Tangerang 02' },
          { value: '05', label: 'Kantor Cabang Depok 03' },
          { value: '06', label: 'Kantor Cabang Bekasi 05' },
          { value: '07', label: 'Kantor Cabang Tambun 06' },
          { value: '08', label: 'Kantor Cabang Bogor 07' }
        ],
        branchOfficeRules: [
          {
            validate: Helper.required,
            message: 'Kantor Cabang harus diisi'
          }
        ]
      };
    },
    methods: {
      updateBranchOffice(value) {
        console.log('Updated branch office:', value);
      },
      selectBranchOffice(item) {
        console.log('Selected branch office:', item);
      }
    }
  };
  </script>
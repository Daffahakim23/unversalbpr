<template>
    <div class="dropdown-container">
      <label :for="inputId">{{ label }}</label>
      <input
        :id="inputId"
        v-model="searchQuery"
        :type="type"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <ul v-if="filteredItems.length" class="dropdown-list">
        <li
          v-for="item in filteredItems"
          :key="item.value"
          @click="selectItem(item)"
          class="dropdown-item"
        >
          {{ item.label }}
        </li>
      </ul>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
</template>
  
<script>
  export default {
    props: {
      inputId: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      },
      items: {
        type: Array[String],
        required: true
      },
      validationRules: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        searchQuery: '',
        selectedItem: null,
        error: ''
      };
    },
    computed: {
      filteredItems() {
        return this.items.filter(item =>
          item.label.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      handleInput() {
        this.error = '';
        for (const rule of this.validationRules) {
          if (!rule.validate(this.searchQuery)) {
            this.error = rule.message;
            break;
          }
        }
        this.$emit('input', this.searchQuery);
      },
      selectItem(item) {
        this.searchQuery = item.label;
        this.selectedItem = item;
        this.$emit('select', item);
      }
    }
  };
</script>
  
<style scoped>
  .dropdown-container {
    margin-bottom: 1rem;
    position: relative;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .dropdown-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    width: 100%;
    background-color: white;
    z-index: 1000;
  }
  
  .dropdown-item {
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .dropdown-item:hover {
    background-color: #f0f0f0;
  }
  
  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
</style>
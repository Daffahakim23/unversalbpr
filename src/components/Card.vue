<template>
  <div class="card">
    <!-- Icon and Header -->
    <div class="icon-header-container">
      <h3 class="header">{{ title }}</h3>
      <div>
        <img :src="iconPath" class="icon" />
      </div>
    </div>

    <!-- Description (List of Features) -->
    <div class="description-container">
      <div v-for="(feature, index) in features" :key="index" class="feature-item">
        <div class="feature-content" @click= "handleFeatureClick(index)">
          <p class="feature-label">{{ feature.label }}</p>
          <p v-if="feature.description" class="feature-description">{{ feature.description }}</p>
        </div>
        <div>
          <span>
            <img src="@/assets/right-arrow-circle-orange.svg" alt="Icon" class="arrow" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    features: Array, 
    icon: String, 
    onFeatureClick: {
      type: Function,
      required: true,
    },
  },
  computed: {
    iconPath() {
      return new URL(`../assets/${this.icon}`, import.meta.url).href;
    }
  },
  methods: {
    handleFeatureClick(index) {
      this.onFeatureClick(index);  // Pass the index to the parent method
    },
  },

};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 400px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.icon-header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.icon {
  width: 40px;
  height: 40px;
}

.header {
  font-size: 24px;
  color: #333;
}

.description-container {
  display: flex;
  flex-direction: column;
}

.feature-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-content {
  flex: 1;
}

.feature-label {
  text-align: start;
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: bold;
  transition: color 0.3s ease;
}

.feature-description {
  text-align: start;
  margin: 5px 0 0;
  font-size: 14px;
  color: #777;
  transition: color 0.3s ease;
}

.feature-item:hover {
  background-color: #f0f0f0; /* Change background color on hover */
  transform: scale(1.02); /* Slightly scale up the item */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow on hover */
}

.feature-item:hover .feature {
  color: #333; /* Change text color on hover */
}

.arrow {
  height: 25px;
  width: 25px;
  color: white; /* Arrow color */
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .card {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 243px;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .icon-header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .header {
    font-size: 18px;
    color: #333;
  }

  .description-container {
    display: flex;
    flex-direction: column;
  }

  .feature-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .feature-content {
    flex: 1; /* Allow feature content to take up remaining space */
  }

  .feature-label {
    text-align: start;
    margin: 0;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .feature-description {
    text-align: start;
    margin: 5px 0 0;
    font-size: 12px;
    color: #777;
    transition: color 0.3s ease;
  }

  .feature-item:hover {
    background-color: #f0f0f0; /* Change background color on hover */
    transform: scale(1.02); /* Slightly scale up the item */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow on hover */
  }

  .feature-item:hover .feature {
    color: #333; /* Change text color on hover */
  }

  .arrow {
    height: 25px;
    width: 25px;
    color: white; /* Arrow color */
    transition: transform 0.3s ease;
  }
}

</style>
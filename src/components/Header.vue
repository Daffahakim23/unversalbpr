<template>
  <header class="header-section">
    <!-- Logo -->
    <div class="logo-container">
      <img :src="iconPath" class="logo" />
    </div>

    <!-- Welcome Message and Cashback Info -->
    <div class="header-content">
      <div class="welcome-message">
        <h1>{{ header }}</h1>
        <p>{{ body }}</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    header: String,
    body: String, 
    image: String
  },
  computed: {
    iconPath() {
      return new URL(`../assets/${this.image}`, import.meta.url).href;
    }
  },
};
</script>

<style scoped>
.header-section {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: top;
  padding: 10px;
  border-radius: 8px;
}

.logo-container {
  margin-bottom: 0px;
}

.logo {
  width: 60px;
  width: 130px; 
}

.header-content {
  text-align: left; 
}

.welcome-message h1 {
  font-size: 38px;
  margin-bottom: 10px;
}

.welcome-message p {
  font-size: 18px;
  margin-bottom: 20px;
  color: grey;
}

@media (max-width: 768px) {
  .header-section {
    width: 285px;
    padding: 0px;
    margin: 0px
  }

  .welcome-message h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .welcome-message p {
    font-size: 14px;
    color: grey;
  }

}
</style>
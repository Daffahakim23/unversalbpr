<template>
    <div class="app-bar">
      <!-- App Bar Content -->
      <div class="app-bar-content">
        <div class="title">BackButton</div>
        <div><img :src="bprLogo" class="image-bpr"/></div>
        <div class="customer-call">CustomerCallButton</div>
      </div>
  
      <!-- Progress Tracker -->
      <div class="progress-tracker">
        <div class="progress-line" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true,
      },
    },
    computed: {
      bprLogo() {
        return new URL(`../assets/bpr-logo-1.svg`, import.meta.url).href;
      }
  },
  };
  </script>
  
<style scoped>
  .app-bar {
    background-color: #ffffff;
    padding-top: 10px;
  }
  
  .app-bar-content {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
  }
  
  .customer-call {
    font-size: 16px;
    color: #666666;
  }
  
  .progress-tracker {
    margin-top: 10px;
    width: 100%;
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
  }
  
  .progress-line {
    height: 100%;
    background-color: orange;
    transition: width 0.3s ease;
  }

  .image-bpr {
    height: 50px;
  }
</style>
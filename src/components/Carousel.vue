<template>
  <div v-if="slides.length==1" class="carousel">
    <img :src= slides[0] class="logo" />
  </div>
  <div v-if="slides.length > 1" class="carousel">
    <!-- Carousel Slides -->
    <transition :name="transitionName" mode="out-in">
      <div class="carousel-inner" :key="currentSlide">
        <div
          class="carousel-item"
          v-for="(slide, index) in slides"
          :key="index"
          v-show="currentSlide === index"
        >
          <img :src="slide" alt="Slide" />
        </div>
      </div>
    </transition>

    <!-- Navigation Buttons -->
    <button class="carousel-control prev" @click="prevSlide">&#10094;</button>
    <button class="carousel-control next" @click="nextSlide">&#10095;</button>

    <!-- Page Indicators -->
    <div class="carousel-indicators">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentSlide: 0,
      transitionName: 'slide-next', 
      autoSlideInterval: null, 
    };
  },
  methods: {
    nextSlide() {
      this.transitionName = 'slide-next';
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.transitionName = 'slide-prev';
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.transitionName = index > this.currentSlide ? 'slide-next' : 'slide-prev';
      this.currentSlide = index;
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 8000); 
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
      }
    },
  },
  mounted() {
    this.startAutoSlide(); 
  },
  beforeUnmount() {
    this.stopAutoSlide(); 
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 0px;
}

.carousel-inner {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item img {
  height: 100%;
  width: 100%;
  display: block;
  border-radius: 20px;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  color: darkblue;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 24px;
  line-height: 1;
  padding: 0;
  margin: 0;
  z-index: 10;
}

.carousel-control:hover {
  background-color: #f0f0f0;
}

.carousel-control.prev {
  left: 20px; /* Adjusted for dynamic alignment */
}

.carousel-control.next {
  right: 20px; /* Adjusted for dynamic alignment */
}

.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.carousel-indicators span {
  width: 10px;
  height: 10px;
  background-color: grey;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.carousel-indicators span.active {
  width: 25px;
  background-color: darkblue;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.25s ease;
}

.slide-next-enter-from {
  transform: translateX(100%);
}

.slide-next-leave-to {
  transform: translateX(-100%);
}

.slide-prev-enter-from {
  transform: translateX(-100%);
}

.slide-prev-leave-to {
  transform: translateX(100%);
}

/* Responsive Design for Mobile */
@media (max-width: 768px) {
  .carousel {
    height: 100%;
    width: 100%;
    margin-bottom: 0px;
  }

  .carousel-item img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }

  .carousel-control {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }

  .carousel-indicators {
    bottom: 10px;
  }

  .carousel-indicators span {
    width: 5px;
    height: 5px;
  }

  .carousel-indicators span.active {
    width: 10px;
  }

  .carousel-control.prev {
    left: 10px; /* Adjusted for dynamic alignment */
  }

  .carousel-control.next {
    right: 10px; /* Adjusted for dynamic alignment */
  }
}
</style>
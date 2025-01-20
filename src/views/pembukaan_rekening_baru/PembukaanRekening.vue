<template>
  <div>
    <!-- App Bar with Progress Tracker -->
    <AppBarWithProgress :progress="progress" />

    <!-- Fragment Content -->
    <div class="fragment-content">
      <component :is="currentFragment" @next="handleNavigation" />
    </div>
  </div>
</template>

<script>
import AppBarWithProgress from '@/components/AppBarWithProgress.vue';
import InformasiNasabah from './fragments/InformasiNasabah.vue';
import FormulirSingkat from './components/FormulirSingkat.vue';
import DropdownKantorCabang from './components/DropdownKantorCabang.vue';

export default {

  components: {
    AppBarWithProgress,
    InformasiNasabah,
    FormulirSingkat,
    DropdownKantorCabang
  },
  data() {
    return {
      fragments: [InformasiNasabah, FormulirSingkat, DropdownKantorCabang],
      progress: (1/3 * 100),
      totalFragments: 3, // Adjust based on the number of fragments
      currentFragmentIndex: 0,
    };
  },
  computed: {
    currentFragment() {
      return this.fragments[this.currentFragmentIndex];
    },
  },
  methods: {
    handleNavigation() {
      if (this.currentFragmentIndex < this.totalFragments - 1) {
        this.currentFragmentIndex += 1;
        this.progress= (this.currentFragmentIndex + 1)/this.totalFragments * 100;
      }
    },
  },
};
</script>

<style scoped>
.fragment-content {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
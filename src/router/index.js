import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PembukaanRekeningBaru from '@/views/pembukaan_rekening_baru/PembukaanRekening.vue';
import InformasiNasabah from '@/views/pembukaan_rekening_baru/fragments/InformasiNasabah.vue';
import FormulirSingkat from '@/views/pembukaan_rekening_baru/components/FormulirSingkat.vue';
import DropdownKantorCabang from '@/views/pembukaan_rekening_baru/components/DropdownKantorCabang.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/pembukaan-rekening-baru',
    name: 'pembukaan-rekening-baru',
    component: PembukaanRekeningBaru,
    children: [
      { path: 'InformasiNasabah', component: InformasiNasabah },
      { path: 'FormulirSingkat', component: FormulirSingkat },
      { path: 'FormulirSingkat', component: DropdownKantorCabang },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;

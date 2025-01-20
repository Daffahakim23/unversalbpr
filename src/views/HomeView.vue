<template>
  <div class="homepage-container">
    <div v-if="slidesData.length==0" class="header-section-alt">
        <Header 
          header="Selamat Datang Nasabah!" 
          body="Akses berbagai layanan Universal BPR kapan saja, di mana saja!" 
          image ="bpr-logo-1.svg"
          />
    </div>
    <div v-if="slidesData.length > 0" class="header-carousel-container">
      <div class="header-section">
        <Header 
          header="Selamat Datang Nasabah!" 
          body="Akses berbagai layanan Universal BPR kapan saja, di mana saja!" 
          image ="bpr-logo-1.svg"
          />
      </div>
      <div class="carousel-section">
        <Carousel :slides="slidesData" />
      </div>
    </div>

    <Section class="content-section">
        <Card
          title="Rekening"
          :features="[
            { label: 'Pembukaan Rekening Baru', description: 'Bukan Nasabah' },
            { label: 'Pembukaan Rekening Baru', description: 'Khusus Nasabah Universal BPR' },
            { label: 'Pengkinian Data', description: 'Pengkinian data terkait rekening Anda' }
          ]"
          icon="icon-rekening.svg"
          :onFeatureClick="handleOnClickBukaRekening"
        />
        <Card
          title="Deposito"
          :features="[
            { label: 'Pembukaan Deposito Baru', description: 'Buka deposit' },
            { label: 'Pembukaan Deposito Exist', description: 'Khusus Nasabah Universal BPR' },
            { label: 'Pencairan Deposito', description: '' }
          ]"
          icon="icon-deposito.svg"
          :onFeatureClick="handleOnClickBukaDeposito"
        />
        <Card
          title="Pindah Buku"
          :features="[
            { label: 'Pemindah Bukuan', description: '' }
          ]"
          icon="icon-pindah-buku.svg"
          :onFeatureClick="handleOnClickPindahBuku"
        />
      </Section>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Carousel from '@/components/Carousel.vue';
import Section from '@/components/Section.vue';
import Card from '@/components/Card.vue';
import contohSlide1 from '@/assets/contoh-slide-1.svg'; 

export default {
  components: {
    Header,
    Carousel,
    Section,
    Card,
  },
  data() {
    return {
      slidesData: [contohSlide1, contohSlide1, contohSlide1],
    };
  },
  methods: {
    handleOnClickBukaRekening(index) {
      switch(index){
        case 0 :
          this.$router.push({name: 'pembukaan-rekening-baru', query: { index: index }});
          break;
        case 1 :
          this.$router.push({name: 'pembukaan-rekening-baru', query: { index: index }});
          break;
        case 2 :
          this.$router.push({name: 'pembukaan-rekening-baru', query: { index: index }});
          break;
      }
    },
    handleOnClickBukaDeposito(index) {
      console.log('Buka Deposito clicked for feature index:', index);
    },
    handleOnClickPindahBuku(index) {
      console.log('Pindah Buku clicked for feature index:', index);
    },
  }
};
</script>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: wrap;
  width: wrap;
  margin-top: 30px;
  padding-top: 30px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 30px;
  background-color: #f5f5f5;
}


.header-carousel-container {
  display: flex;
  flex: 5;
  flex-direction: row;
  width: wrap;
  margin-bottom: 40px;
  height: 350px; 
  gap: 20px;
}

.header-section {
  flex:2;
  align-items: start;
  justify-content: top;
}

.header-section-alt {
  flex:5;
  margin-bottom: 30px;
  align-items: start;
  justify-content: top;
}

.carousel-section {
  flex:5;
  align-items: end;
  justify-content: center;
}

.content-section {
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .homepage-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
  }
  .header-carousel-container {
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 10px; 
  }

  .carousel-section {
    width: 285px;
    height: wrap; 
  }

  /* .content-section {
    align-items: center;
    justify-content: top;
  } */
}
</style>

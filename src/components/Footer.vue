<template>
  <!-- Footer section -->
  <div class="p-6  bg-neutral-100">
    <div class="flex flex-col items-center justify-center gap-y-2 sm:justify-between md:justify-between">
      <div>
        <button class="flex flex-wrap items-center text-primary">
          <img src="@/assets/Instagram.png" alt="Instagram" class="h-4 sm:h-6 md:h-6 mx-6 my-2" />
          <img src="@/assets/twitter.png" alt="Twitter" class="h-4 sm:h-6 md:h-6 mx-6" my-2 />
          <img src="@/assets/website.png" alt="Website" class="h-4 sm:h-6 md:h-6 mx-6 my-2" />
          <img src="@/assets/facebook.png" alt="Facebook" class="h-4 sm:h-6 md:h-6 mx-6 my-2" />
        </button>
      </div>
      <div class="lex flex-col gap-8 text-center text-neutral-800 text-xs sm:text-xs md:text-sm">
        <div>
          <p>
            Bank Universal BPR berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK)
            dan Bank Indonesia (BI) serta merupakan peserta penjaminan Lembaga
            Penjamin Simpanan (LPS)
          </p>
        </div>
        <div>
          <p>
            <b>
              © 2025 UniversalBPR
            </b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* Gaya tambahan jika diperlukan */
</style>

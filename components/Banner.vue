<template>
  <section>
    <VueSlickCarousel :arrows="false">
      <div v-for="carousel in carouselArr" :key="carousel.text" class="w-screen h-[50vh] md:h-[80vh] lg:h-[calc(100vh - 132px)] relative">
        <a href="#" class="pointer-events-none">
          <img class="w-full pointer-events-none h-full object-cover" :src="carousel.img" :alt="carousel.text">
        </a>
        <h2 class="w-full md:w-2/3 text-center text-4xl md:text-5xl text-white mix-blend-difference absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {{ carousel.text }}
        </h2>
      </div>
    </VueSlickCarousel>
  </section>
</template>

<script>
export default {
  props: {
    carouselArr: {
      type: Array,
    },
  },
};
</script>

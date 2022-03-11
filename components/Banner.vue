<template>
  <div>
    <hooper class="min-h-screen" :wheelControl="false" :autoPlay="true" :playSpeed="5000" :transition="1000" :infiniteScroll="true">
      <slide v-for="carousel in carouselArr" :key="carousel.text">
        <div class="w-screen h-[50vg] md:h-[80vh] lg:h-screen relative">
          <a class="w-full h-full select-none">
            <img class="w-full h-full object-cover pointer-events-none" :src="carousel.img" :alt="carousel.text">
            <h2 class="w-2/3 text-center text-4xl md:text-5xl text-white mix-blend-difference absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {{ carousel.text }}
            </h2>
          </a>
        </div>
      </slide>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    Hooper,
    Slide,
  },
  props: {
    carouselArr: {
      type: Array,
    },
  },
};
</script>

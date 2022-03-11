<template>
  <div>
    <hooper class="min-h-screen" :wheelControl="false" :autoPlay="true" :playSpeed="5000" :transition="1000" :infiniteScroll="true">
      <slide v-for="carousel in carouselArr" :key="carousel.text">
        <div class="bg-center bg-cover bg-no-repeat h-[50vh] md:h-[80vh] lg:h-screen flex justify-center items-center" :style="{ background: `url(${carousel.img})` }">
          <div class="banner_title w-11/12 lg:w-9/12 text-center font-extrabold">
            <h2 class="text-4xl md:text-5xl text-white mix-blend-difference">
              {{ carousel.text }}
            </h2>
          </div>
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

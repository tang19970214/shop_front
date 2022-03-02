<template>
  <div class="min-h-screen">
    <hooper :wheelControl="false" :autoPlay="true" :playSpeed="5000" :transition="1000" :infiniteScroll="true">
      <slide v-for="carousel in carouselArr" :key="carousel.text">
        <div class="slide_background h-[50vh] md:h-[80vh] lg:h-screen flex justify-center items-center" :style="{ background: `url(${carousel.img})` }">
          <div class="banner_title w-11/12 lg:w-9/12 text-center font-extrabold">
            <h2 class="text-[48px] text-white mix-blend-difference">
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

<style lang="scss" scoped>
// FIXME:@ryan 直接用tailwind寫入class即可
.hooper-list {
  min-height: 100vh !important;
}
.slide {
  &_background {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
}
</style>
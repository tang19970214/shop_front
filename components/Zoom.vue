<template>
  <section v-if="isOpen">
    <div @click="closeZoom($event)" class="fixed w-screen h-screen top-0 left-0 bg-[rgba(64,64,64,0.6)] z-40 flex items-center justify-center">
      <div class="w-72 md:w-[400px] relative">
        <VueSlickCarousel v-bind="settings" class="relative" ref="c1" :asNavFor="$refs.c2">
          <div v-for="item in imgArr" :key="item.id">
            <img class="w-full h-72 md:h-[400px] object-cover pointer-events-none" :src="item.imgUrl" alt="">
          </div>
        </VueSlickCarousel>
        <button @click="changeImg(false)" class="absolute  -left-10 top-1/3 w-8 h-8 rounded-full bg-[rgba(231,231,231,0.79)] p-2.5 flex justify-center items-center duration-300 hover:bg-[#FA5936] group">
          <fa icon="fa-solid fa-angle-left" class="text-black duration-300 group-hover:text-white"></fa>
        </button>
        <button @click="changeImg(true)" class="absolute -right-10 top-1/3 w-8 h-8 rounded-full bg-[rgba(231,231,231,0.79)] p-2.5 flex justify-center items-center duration-300 hover:bg-[#FA5936] group">
          <fa icon="fa-solid fa-angle-right" class="text-black duration-300 group-hover:text-white"></fa>
        </button>
        <div class="relative w-full">
          <VueSlickCarousel :arrows="false" :slidesToShow="4" ref="c2" :asNavFor="$refs.c1" :focusOnSelect="true" class="mt-5 -mx-1">
            <div v-for="(item, idx) in imgArr" :key="item.id" class="pr-2" @click="changeImg(idx)">
              <img class="w-full h-14 md:h-24 object-cover ml-1 pointer-events-none" :src="item.imgUrl">
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    imgArr: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      settings: {
        "lazyLoad": "ondemand",
        "arrows": false,
        "edgeFriction": 0.35,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1
      },
    }
  },
  methods: {
    changeImg(bool, idx) {
      if (idx) {
        this.$refs.c1.goTo(idx, true)
        this.$refs.c2.goTo(idx, true)
      } else {
        if (!bool) {
          this.$refs.c1.prev()
          this.$refs.c2.prev()
        } else {
          this.$refs.c1.next()
          this.$refs.c2.next()
        }
      }
    },
    closeZoom(e) {
      const classList = Array.from(e.target.classList)
      if (!classList.includes('bg-[rgba(64,64,64,0.6)]')) return
      this.$emit('closeZoom')
    }
  }
}
</script>

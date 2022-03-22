<template>
  <section>
    <div class="relative w-full promoteArea group">
      <VueSlickCarousel ref="imgArr" v-bind="settings" v-if="promoteArr.length > 0" class="-mx-2">
        <div v-for="item in promoteArr" :key="item.id" class="pr-5 h-56 md:h-80 relative">
          <a class="cursor-pointer" @click="toProductPage(item.id)">
            <img :src="item.imgUrl" :alt="item.title" class="cursor-pointer w-full h-36 md:h-56 ml-3 object-cover pointer-events-none">
          </a>
          <h4 class="line-clamp-2 mt-3 pl-4 -mr-5 mb-10">{{ item.title }}</h4>
          <span class="text-red-500 pl-4 absolute bottom-0 left-0">${{ item.sale }}</span>
        </div>
      </VueSlickCarousel>
      <button @click="changeImg(false)" class="absolute -left-4 xl:-left-12 top-1/3 -translate-y-6 md:-translate-y-3 w-8 h-8 rounded-full bg-[rgba(231,231,231,0.79)] flex justify-center items-center duration-300 hover:bg-[#FA5936] group-hover:scale-[1.6]">
        <fa icon="fa-solid fa-angle-left" class="text-black duration-300 hover:text-white p-2.5"></fa>
      </button>
      <button @click="changeImg(true)" class="absolute -right-4 xl:-right-12 top-1/3 -translate-y-6 md:-translate-y-3 w-8 h-8 rounded-full bg-[rgba(231,231,231,0.79)] flex justify-center items-center duration-300 hover:bg-[#FA5936] group-hover:scale-[1.6]">
        <fa icon="fa-solid fa-angle-right" class="text-black duration-300 hover:text-white p-2.5"></fa>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    promoteArr: {
      type: Array,
      default() {
        return []
      }
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
        "slidesToShow": 4,
        "slidesToScroll": 2,
        "responsive": [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            },
          },
        ]
      },
      mousedownPos: {
        x: 0,
        y: 0
      },
      mouseUpPos: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    toProductPage(id) {
      if (this.mousedownPos.x !== this.mouseUpPos.x || this.mousedownPos.y !== this.mouseUpPos.y) return
      const category = this.$route.query.category
      window.scrollTo({top: 0, behavior: 'smooth'})
      this.$router.push(`/product/${id}?category=${category}`)
    },
    changeImg(bool) {
      if (bool) {
        this.$refs.imgArr.next()
      } else {
        this.$refs.imgArr.prev()
      }
    }
  },
  mounted() {
    const vm = this
    const promoteArea = document.querySelector('.promoteArea')
    promoteArea.addEventListener('mousedown', function(e) {
      vm.mousedownPos.x = e.x
      vm.mousedownPos.y = e.y
    })
    promoteArea.addEventListener('mouseup', function(e) {
      vm.mouseUpPos.x = e.x
      vm.mouseUpPos.y = e.y
    })
  }
}
</script>

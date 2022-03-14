<template>
  <section class="w-full">
    <span>{{ product.category }} /</span><span>{{ product.title }}</span>
    <div class="grid grid-cols-12 min-h-[400px]">
      <div class="col-span-6 min-h-[400px]">
        <VueSlickCarousel v-bind="settings">
          <div v-for="item in product.images" :key="item.id" class="h-[400px]">
            <img class="w-full pointer-events-none" :src="item.imgUrl" alt="">
          </div>
          /*...*/
        </VueSlickCarousel>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  asyncData() {
    const product = {
      title: '春季的初戀微甜｜金牌紅烏龍禮盒',
      spec: [{id: 1, label: '500g', sale: 5000}, {id: 2, label: '800g', sale: 6000}],
      images: [
        {
          id: 1,
          imgUrl: require("~/static/images/product_example.png")
        },
        {
          id: 2,
          imgUrl: require("~/static/images/product_example2.png")
        },
        {
          id: 3,
          imgUrl: require("~/static/images/product_example3.png")
        },
        {
          id: 4,
          imgUrl: require("~/static/images/product_example.png")
        },
      ],
      category: '調飲系列茶包',
      inventory: 95
    }
    return { product }
  },
  data() {
    return {
      settings: {
        "dots": false,
        "arrows": false,
        "dotsClass": "slick-dots custom-dot-class",
        "edgeFriction": 0.35,
        "infinite": false,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1
      }
    }
  }
}
</script>

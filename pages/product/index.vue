<template>
  <section class="w-full">
    <h3 class="text-lg font-bold">{{ categoryTitle }}</h3>
    <transition-group class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6" tag="div">
      <div class="col-span-1" v-for="product in products" :key="product.id">
        <a @click="$router.push(`/product/${product.id}`)" class="group" :class="{'cursor-not-allowed': product.isSoldOut, 'cursor-pointer': !product.isSoldOut}">
          <div class="h-[180px] md:h-[300px] w-full overflow-hidden relative">
            <div v-if="product.isSoldOut" class="absolute w-full h-full top-0 left-0 bg-[rgba(62,62,62,0.44)] flex justify-center items-center z-10">
              <div class="w-24 h-24 rounded-full bg-[#717171] flex items-center justify-center">
                <span class="font-bold text-lg text-white">已售完</span>
              </div>
            </div>
            <img :src="product.imgUrl" :alt="product.title" class="h-full w-full duration-300 group-hover:scale-110 group-hover:z-0">
          </div>
          <div class="flex flex-col my-3 space-y-3">
            <h4 v-if="!product.isSoldOut" class="duration-150 group-hover:text-[#EF4444]">{{ product.title }}</h4>
            <h4 v-else>{{ product.title }}</h4>
            <div class="flex justify-between">
              <div class="flex space-x-3">
                <span class="text-[#EF4444]">${{ product.sale }}</span>
                <span class="text-[#a3a3a3]">${{ product.price }}</span>
              </div>
              <fa v-if="isFavorite(product.id)" @click.prevent="addFavorite(true, product)" class="text-[#EF4444] text-lg" icon="fa-solid fa-heart"></fa>
              <fa v-else @click.prevent="addFavorite(false, product)" class="text-[#EF4444] text-lg" icon="fa-regular fa-heart"></fa>
            </div>
          </div>
        </a>
      </div>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: "product-index",
  props: {
    categoryTitle: {
      type: String,
      default: ''
    }
  },
  // 測試用 監聽網址變化
  watch: {
    '$route.query' () {
      this.products.sort((a, b) => Math.random()>.5 ? -1 : 1)
    }
  },
  asyncData() {
    const products = [
      {
        id: 1,
        imgUrl: require("~/static/images/product_example.png"),
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 2,
        imgUrl: require("~/static/images/product_example2.png"),
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 3,
        imgUrl: require("~/static/images/product_example.png"),
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: true
      },
      {
        id: 4,
        imgUrl: require("~/static/images/product_example3.png"),
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 5,
        imgUrl: require("~/static/images/product_example.png"),
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 6,
        imgUrl: require("~/static/images/product_example.png"),
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 7,
        imgUrl: require("~/static/images/product_example.png"),
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
    ]
    return { products }
  },
  data() {
    return {
      favoriteList: JSON.parse(window.localStorage.getItem('favoriteList')) || []
    }
  },
  methods: {
    isFavorite(id) {
      return this.favoriteList.map((item) => item.id)
                              .includes(id)
    },
    addFavorite(bool, product) {
      if (bool) {
        this.favoriteList = this.favoriteList.filter((item) => parseInt(item.id) !== product.id)
        window.localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
      } else {
        this.favoriteList.push(product)
        window.localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
      }
    }
  }
};
</script>
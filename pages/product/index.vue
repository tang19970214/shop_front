<template>
  <section class="w-full">
    <h3 class="text-lg font-bold">{{ categoryTitle }}</h3>
    <transition-group class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6" tag="div" name="fade">
      <div v-for="product in products" :key="product.id" class="col-span-1 h-full group relative mb-4 md:mb-0" :class="{'cursor-not-allowed': product.isSoldOut}">
        <div class="h-[170px] md:h-[300px] w-full overflow-hidden relative">
          <div v-if="product.isSoldOut" class="absolute w-full h-full top-0 left-0 bg-[rgba(62,62,62,0.44)] flex justify-center items-center z-10">
            <div class="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#717171] flex items-center justify-center select-none">
              <span class="font-bold text-sm md:text-lg text-white">已售完</span>
            </div>
          </div>
          <img :src="product.imgUrl" :alt="product.title" @click="$router.push(`/product/${product.id}?category=${$route.query.category}`)" class="h-full w-full duration-300 group-hover:scale-110 group-hover:z-0 cursor-pointer">
        </div>
        <a href="#" v-if="!product.isSoldOut" @click.prevent="$router.push(`/product/${product.id}`)" class="duration-150 group-hover:text-[#FA5936] line-clamp-2 mb-8 mt-3">{{ product.title }}</a>
        <a href="#" v-else class="pointer-events-none line-clamp-2 mb-8 mt-3">{{ product.title }}</a>
        <div class="absolute w-full left-0 bottom-0 flex flex-col md:flex-row items-start md:justify-between">
          <div class="flex space-x-3">
            <span class="text-[#EF4444]">${{ product.sale }}</span>
            <span class="text-[#a3a3a3] line-through">${{ product.price }}</span>
          </div>
          <fa v-show="isFavorite(product.id)" @click.prevent="addFavorite(true, product)" class="text-[#EF4444] text-xl cursor-pointer" icon="fa-solid fa-heart"></fa>
          <fa v-show="!isFavorite(product.id)" @click.prevent="addFavorite(false, product)" class="text-[#EF4444] text-xl cursor-pointer" icon="fa-regular fa-heart"></fa>
        </div>
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
        title: '春季的初戀微甜｜金牌紅烏龍禮盒 春季的初戀微甜｜金牌紅烏龍禮盒 春季的初戀微甜｜金牌紅烏龍禮盒',
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
        title: '春季的初戀微甜｜金牌紅烏龍禮盒 春季的初戀微甜｜金牌紅烏龍禮盒 春季的初戀微甜｜金牌紅烏龍禮盒',
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
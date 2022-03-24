<template>
  <section class="w-full">
    <h3 class="text-lg font-bold">{{ categoryTitle }}</h3>
    <transition-group class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6" tag="div" name="fade">
      <div v-for="product in products" :key="product.id" class="col-span-1 h-full group relative mb-4 md:mb-0" :class="{'cursor-not-allowed': product.isSoldOut}">
        <div class="h-[170px] sm:h-[250px] xl:h-[300px] w-full overflow-hidden relative">
          <div v-if="product.isSoldOut" class="absolute w-full h-full top-0 left-0 bg-[rgba(62,62,62,0.44)] flex justify-center items-center z-10">
            <div class="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#717171] flex items-center justify-center select-none">
              <span class="font-bold text-sm md:text-lg text-white">已售完</span>
            </div>
          </div>
          <img :data-src="product.imgUrl" :alt="product.title" @click="$router.push(`/product/${product.id}?category=${$route.query.category}`)" class="h-full w-full duration-300 object-cover group-hover:scale-110 group-hover:z-0 cursor-pointer lazyImg">
        </div>
        <a href="#" v-if="!product.isSoldOut" @click.prevent="$router.push(`/product/${product.id}`), scrollBehavior({ x: 0, y: 0 })" class="duration-150 group-hover:text-[#FA5936] line-clamp-2 mb-8 mt-3">{{ product.title }}</a>
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
    <div class="my-20">
      <Pagination :totalPage="totalPage" />
    </div>
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
        imgUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒 春季的初戀微甜｜金牌紅烏龍禮盒 春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 2,
        imgUrl: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 3,
        imgUrl: 'https://images.unsplash.com/photo-1501841580093-a258b1937efe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒 春季的初戀微甜｜金牌紅烏龍禮盒 春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: true
      },
      {
        id: 4,
        imgUrl: 'https://images.unsplash.com/photo-1627894005474-9889064bc4ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 5,
        imgUrl: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 6,
        imgUrl: 'https://images.unsplash.com/photo-1547149617-609fafa00a6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 7,
        imgUrl: 'https://images.unsplash.com/photo-1610643625267-aee6dae3ca22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 8,
        imgUrl: 'https://images.unsplash.com/photo-1516715043227-1cdf27bcd09a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 9,
        imgUrl: 'https://images.unsplash.com/photo-1470162656305-6f429ba817bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 10,
        imgUrl: 'https://images.unsplash.com/photo-1495414975755-d9ecd3e6d729?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 11,
        imgUrl: 'https://images.unsplash.com/photo-1562534104-6b964ad63e56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
      {
        id: 12,
        imgUrl: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        title: '春季的初戀微甜｜金牌紅烏龍禮盒',
        price: 6520,
        sale: 6000,
        isSoldOut: false
      },
    ]
    const totalPage = 12
    return { products, totalPage }
  },
  data() {
    return {
      favoriteList: JSON.parse(window.localStorage.getItem('favoriteList')) || [],
      lazyImgs: []
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
    },
    watchIsEnterView() {
      const vm = this
      const watcher = new IntersectionObserver(vm.onEnterView)
      vm.lazyImgs = document.querySelectorAll('.lazyImg')
      for (let img of vm.lazyImgs) {
        watcher.observe(img)
      }
    },
    onEnterView(imgs, observer) {
      for(let img of imgs) {
        if (img.isIntersecting) {
          const target = img.target
          target.setAttribute('src', target.dataset.src)
          observer.unobserve(target)
        }
      }
    }
  },
  mounted() {
    const vm = this
    vm.watchIsEnterView()
  }
};
</script>
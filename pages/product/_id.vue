<template>
  <section class="w-full">
    <span class="text-xs text-[#404040] md:text-sm">{{ product.category }} / </span><span class="text-xs text-[#404040] md:text-sm">{{ product.title }}</span>
    <!-- 上半部 -->
    <div class="grid grid-cols-12 min-h-[400px] mt-5 gap-5">

      <!-- 左側 -->
      <div class="col-span-12 md:col-span-6 relative">
        <VueSlickCarousel v-bind="settings" ref="c1" :asNavFor="$refs.c2" :focusOnSelect="true">
          <div v-for="item in product.images" :key="item.id">
            <img class="w-full h-[360px] md:h-[400px] object-cover pointer-events-none" :src="item.imgUrl" alt="">
          </div>
        </VueSlickCarousel>
        <!-- 手機版輪播按鈕 -->
        <button @click="changeImg(false)" class="absolute  left-1 top-1/3 w-8 h-8 rounded-full bg-[rgba(231,231,231,0.79)] p-2.5 flex md:hidden justify-center items-center duration-300 hover:bg-[#FA5936] group">
          <fa icon="fa-solid fa-angle-left" class="text-black duration-300 group-hover:text-white"></fa>
        </button>
        <button @click="changeImg(true)" class="absolute right-1 top-1/3 w-8 h-8 rounded-full bg-[rgba(231,231,231,0.79)] p-2.5 flex md:hidden justify-center items-center duration-300 hover:bg-[#FA5936] group">
          <fa icon="fa-solid fa-angle-right" class="text-black duration-300 group-hover:text-white"></fa>
        </button>
        <div class="relative w-full">
          <VueSlickCarousel :arrows="false" :slidesToShow="4" ref="c2" :asNavFor="$refs.c1" :focusOnSelect="true" class="mt-5 -mx-1">
            <div v-for="(item, idx) in product.images" :key="item.id" class="pr-2" @click="changeImg(idx)">
              <img class="w-full h-20 md:h-24 object-cover ml-1 pointer-events-none" :src="item.imgUrl" :alt="product.title">
            </div>
          </VueSlickCarousel>
          <!-- 電腦版輪播按鈕 -->
          <button @click="changeImg(false)" class="absolute  left-1 top-1/2 -translate-y-4 w-8 h-8 rounded-full bg-[rgba(231,231,231,0.79)] p-2.5 hidden md:flex justify-center items-center duration-300 hover:bg-[#FA5936] group">
            <fa icon="fa-solid fa-angle-left" class="text-black duration-300 group-hover:text-white"></fa>
          </button>
          <button @click="changeImg(true)" class="absolute right-1 top-1/2 -translate-y-4 w-8 h-8 rounded-full bg-[rgba(231,231,231,0.79)] p-2.5 hidden md:flex justify-center items-center duration-300 hover:bg-[#FA5936] group">
            <fa icon="fa-solid fa-angle-right" class="text-black duration-300 group-hover:text-white"></fa>
          </button>
        </div>
        <div class="hidden md:flex items-center my-6 space-x-2.5">
          <span>分享</span>
          <img class="h-9 w-9 cursor-pointer" src="~/static/images/icon/line.svg" alt="分享到Line">
          <img class="h-8 w-8 cursor-pointer" src="~/static/images/icon/facebook.svg" alt="分享到Facebook">
          <img class="h-7 w-7 cursor-pointer" src="~/static/images/icon/link.svg" alt="分享連結">
        </div>
      </div>

      <!-- 右側 -->
      <div class="col-span-12 md:col-span-6">

        <!-- 商品標題、價格 -->
        <div class="flex flex-col border-b border-b-[#c4c4c4] pb-2.5">
          <h3 class="font-bold mb-3">{{ product.title }}</h3>
          <span class="text-2xl font-bold text-[#FA5936]">${{ productSale }}</span>
          <div class="flex justify-between md:justify-end mt-2 md:mt-0">
            <div class="flex items-center space-x-3" v-show="isFavorite">
              <fa icon="fa-solid fa-heart" @click="addFavorite(true)" class="text-[#ef4444] cursor-pointer text-xl animate-pulse"></fa>
              <span>已加入收藏</span>
            </div>
            <div class="flex items-center space-x-3" v-show="!isFavorite">
              <fa icon="fa-regular fa-heart" @click="addFavorite(false)" class="text-[#ef4444] cursor-pointer text-xl animate-pulse"></fa>
              <span>加入收藏</span>
            </div>
            <div class="flex md:hidden items-center space-x-2">
              <span>分享</span>
              <img class="h-9 w-9 cursor-pointer" src="~/static/images/icon/line.svg" alt="分享到Line">
              <img class="h-8 w-8 cursor-pointer" src="~/static/images/icon/facebook.svg" alt="分享到Facebook">
              <img class="h-7 w-7 cursor-pointer" src="~/static/images/icon/link.svg" alt="分享連結">
            </div>
          </div>
        </div>

        <!-- 商品數量 -->
        <div class="grid grid-cols-12 mt-6 items-center">
          <div class="col-span-3">
            <div class="flex flex-col space-y-3">
              <span>商品數量</span>
            </div>
          </div>
          <div class="col-span-9">
            <div class="flex items-center space-x-3 -translate-x-2 md:-translate-x-4">
              <div class="flex items-center border border-[#c4c4c4]">
                <button @click="changeQuantity(false)" class="py-1 px-3 border-r border-r-[#c4c4c4]" :class="{'cursor-not-allowed': userSelected.quantity === 1}">-</button>
                <span class="px-5">{{ userSelected.quantity }}</span>
                <button @click="changeQuantity(true)" class="py-1 px-3 border-l border-l-[#c4c4c4]" :class="{'cursor-not-allowed': userSelected.quantity === inventoryNum}">+</button>
              </div>
              <span class="text-[#a3a3a3] text-sm">還剩 {{ inventoryNum }} 件</span>
            </div>
          </div>
        </div>

        <!-- 規格 -->
        <div class="grid grid-cols-12 mt-6 items-start">
          <div class="col-span-3">
            <span>規格</span>
          </div>
          <div class="col-span-9">
            <div class="flex flex-wrap gap-3 -translate-x-2 md:-translate-x-4">
              <button v-for="spec in product.spec" :key="spec.id" @click="userSelected.spec = spec.id, userSelected.quantity = 1" class="border border-[#a3a3a3] py-2 px-4 rounded-md duration-300" :class="{'border-[#FA5936] bg-[#FA5936] text-white': userSelected.spec === spec.id}">{{ spec.label }}</button>
            </div>
          </div>
        </div>

        <!-- 折價券 -->
        <div class="grid grid-cols-12 mt-6 items-start">
          <div class="col-span-3">
            <span>折價券</span>
          </div>
          <div class="col-span-9">
            <div class="flex flex-wrap gap-3 -translate-x-2 md:-translate-x-4">
              <p v-for="coupon in coupons" :key="coupon.id" class="duration-300 py-1 px-4 text-sky-500 border border-[#c4c4c4] rounded-xl cursor-default md:hover:bg-sky-500 md:hover:text-white md:hover:border-sky-500">
                {{ coupon.label }}
              </p>
            </div>
          </div>
        </div>

        <!-- 加入購物車、立即購買 -->
        <div class="grid grid-cols-12 mt-6 items-center">
          <div class="col-span-12">
            <div class="flex space-x-3">
              <button @click="addToCart()" class="w-1/2 xl:w-auto duration-300 ring-1 ring-inset ring-[#FA5936] xl:px-16 py-2 rounded-xl hover:bg-[#FA5936] hover:text-white">加入購物車</button>
              <button @click="quickBuy()" class="w-1/2 xl:w-auto xl:px-16 py-2 rounded-xl text-white bg-gradient-to-r from-[rgba(255,109,63,0.84)] to-[#FA5936]">立即購買</button>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <!-- 下半部 -->
    <!-- 商品詳情、評價 tabMenu -->
    <div class="w-full mt-16 lg:mt-0 sticky top-[64px] lg:top-[132px] z-10">
      <ul class="flex w-full mb-10 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] relative overflow-hidden">
        <li v-for="list in tabList" :key="list.id" @click="$router.push({ path: `/product/${product.id}${list.path}`, scrollBehavior: false})" class="duration-300 text-center text-lg w-1/2 py-3 bg-white cursor-pointer hover:text-[#FA5936]">{{ list.label }}</li>
        <div class="absolute ease-in-out duration-700 left-0 bottom-0 w-1/2 h-2 bg-[#FA5936]" :class="{'left-[50%]': $route.name == 'product-id-rate'}"></div>
      </ul>
    </div>
    
    <!-- 商品詳情、評價 -->
    <transition name="fade">
      <Nuxt-child :product="product" :estimate="estimate" />
    </transition>

    <!-- 推薦商品 -->
    <div class="mt-10 md:mt-32">
      <h4 class="border-l-[6px] border-l-[#FA5936] pl-3 mb-8">其他推薦</h4>
      <PromoteProducts :promoteArr="product.promoteProducts" />
    </div>

  </section>
</template>

<script>
export default {
  asyncData(context) {
    const product = {
      id: parseInt(context.params.id),
      title: '春季的初戀微甜｜金牌紅烏龍禮盒',
      spec: [{id: 1, label: '500g', sale: 5000, price: 6000, inventory: 5}, {id: 2, label: '800g', sale: 6000, price: 6500, inventory: 3}, {id: 3, label: '1000g', sale: 7000, price: 7500, inventory: 2}, {id: 4, label: '1200g', sale: 8000, price: 8500, inventory: 10}],
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
          imgUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        },
        {
          id: 5,
          imgUrl: 'https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
      ],
      category: '調飲系列茶包',
      content: '<img src="https://images.unsplash.com/photo-1561296180-e8100fd714e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80" width="100%"> <p class="py-10 text-center">品飲意象 輕快穿過午後的音樂聚落，肆無忌憚的迷戀菓物與豐收的季節，一起雙人搖擺舞。入口明亮華麗的層次迸現，以愉悅的果香收尾，盛夏之際，風格飲食已經開始。風味標籤 熱帶果物、柑橘果皮、香草軟糖、鳳梨、低含水蜂蜜、牛奶商品介紹</p> <img src="https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" width="100%">',
      promoteProducts: [
        {
          id: 1,
          title: '春季的初戀微甜｜金牌紅烏龍禮盒春季的初戀微甜｜金牌紅烏龍禮盒春季的初戀微甜｜金牌紅烏龍禮盒春季的初戀微甜｜金牌紅烏龍禮盒春季的初戀微甜｜金牌紅烏龍禮盒',
          sale: 6000,
          imgUrl: require("~/static/images/product_example.png")
        },
        {
          id: 2,
          title: '金牌紅烏龍禮盒',
          sale: 6000,
          imgUrl: require("~/static/images/product_example.png")
        },
        {
          id: 3,
          title: '春季的初戀微甜｜金牌紅烏龍禮盒',
          sale: 6000,
          imgUrl: require("~/static/images/product_example2.png")
        },
        {
          id: 4,
          title: '春季的初戀微甜｜金牌紅烏龍禮盒',
          sale: 6000,
          imgUrl: require("~/static/images/product_example3.png")
        },
        {
          id: 5,
          title: '春季的初戀微甜｜金牌紅烏龍禮盒',
          sale: 6000,
          imgUrl: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        },
      ]
    }
    const estimate = {
      avgRate: 4.6,
      totalResult: 523,
      totalPage: 8,
      items: [
        {
          id: 1,
          profileImg: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
          account: 'u*****4',
          rate: 1,
          time: '2022/03/14',
          spec: '500g',
          content: 'fuck you',
          images: [
            {id: 1, imgUrl: require("~/static/images/product_example3.png")},
            {id: 2, imgUrl: require("~/static/images/product_example2.png")}
          ]
        },
        {
          id: 2,
          profileImg: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          account: 'u*****4',
          rate: 4,
          time: '2022/03/14',
          spec: '800g',
          content: '評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價',
          images: [
            {id: 1, imgUrl: require("~/static/images/product_example3.png")},
            {id: 2, imgUrl: require("~/static/images/product_example2.png")}
          ]
        },
        {
          id: 3,
          profileImg: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
          account: 'w*****f',
          rate: 5,
          time: '2022/03/14',
          spec: '500g',
          content: '評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價',
          images: [
            {id: 1, imgUrl: require("~/static/images/product_example3.png")},
            {id: 2, imgUrl: require("~/static/images/product_example2.png")}
          ]
        },
        {
          id: 4,
          profileImg: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
          account: 'u*****4',
          rate: 5,
          time: '2022/03/14',
          spec: '500g',
          content: '評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價',
          images: [
            {id: 1, imgUrl: require("~/static/images/product_example3.png")},
            {id: 2, imgUrl: require("~/static/images/product_example2.png")}
          ]
        },
        {
          id: 5,
          profileImg: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
          account: 'b****7',
          rate: 5,
          time: '2022/03/14',
          spec: '500g',
          content: '評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價',
          images: [
            {id: 1, imgUrl: require("~/static/images/product_example3.png")},
            {id: 2, imgUrl: require("~/static/images/product_example2.png")}
          ]
        },
        {
          id: 6,
          profileImg: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1686&q=80',
          account: 'a*******3',
          rate: 5,
          time: '2022/03/14',
          spec: '500g',
          content: '評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價',
          images: [
            {id: 1, imgUrl: require("~/static/images/product_example3.png")},
            {id: 2, imgUrl: require("~/static/images/product_example2.png")}
          ]
        },
      ]
    }
    const coupons = [
      {id: 1, label: '滿999享85折'},
      {id: 2, label: '首購免運'},
      {id: 3, label: '老闆跳樓'},
      {id: 4, label: '生日8折'}
    ]
    const userSelected = {
      id: parseInt(context.params.id),
      spec: 1,
      quantity: 1,
      coupon: 0
    }
    return { product, estimate, coupons, userSelected }
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
      // 收藏清單
      favoriteList: JSON.parse(window.localStorage.getItem('favoriteList')) || [],
      tabList: [{id: 1, label: '商品詳情', path: ''}, {id: 2, label: '評價', path: '/rate'}],
      selectedTab: '商品詳情'
    }
  },
  computed: {
    // 判斷商品價格
    productSale() {
      const sale = this.product.spec.filter((item) => item.id === this.userSelected.spec)
                                    .map((item2) => item2.sale)
      return sale[0]
    },
    // 判斷是否加入收藏
    isFavorite() {
      const isFavorite = this.favoriteList.map((item) => item.id)
                                          .includes(this.product.id)
      return isFavorite
    },
    // 判斷庫存數量
    inventoryNum() {
      const inventory = this.product.spec.filter((item) => item.id === this.userSelected.spec)
                                         .map((item2) => item2.inventory)
      return inventory[0]
    }
  },
  methods: {
    // 圖片輪播
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
    // 加入最愛
    addFavorite(bool) {
      if (bool) {
        this.favoriteList = this.favoriteList.filter((item) => item.id !== this.product.id)
        window.localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
      } else {
        const product = {
          id: this.product.id,
          imgUrl: this.product.images[0].imgUrl,
          isSoldOut: false,
          price: this.product.spec[0].price,
          sale: this.product.spec[0].sale,
          title: this.product.title
        }
        this.favoriteList.push(product)
        window.localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
      }
    },
    // 變更商品數量
    changeQuantity(bool) {
      if (bool) {
        if (this.userSelected.quantity >= this.inventoryNum) return
        this.userSelected.quantity += 1
      } else {
        if (this.userSelected.quantity === 1) return
        this.userSelected.quantity -= 1
      }
    },
    // 加入購物車
    addToCart() {
      let cart = JSON.parse(window.localStorage.getItem('cartList')) || []

      // 判斷陣列內的item有無符合id以及spec
      if (cart.some((item) => item.id === this.userSelected.id && item.spec === this.userSelected.spec)) {
        const target = cart.find((item) => item.id === this.userSelected.id && item.spec === this.userSelected.spec)
        if ((target.quantity + this.userSelected.quantity) > this.inventoryNum) {
          this.$swal.fire({
            icon: 'error',
            title: '超過庫存上限',
            showConfirmButton: false,
            timer: 1000
          })
        } else {
          target.quantity += this.userSelected.quantity
          this.$swal.fire({
            icon: 'success',
            title: '已加入至購物車',
            showConfirmButton: false,
            timer: 1000
          })
        }
      } else {
        const item = {
          id: this.userSelected.id,
          quantity: this.userSelected.quantity,
          spec: this.userSelected.spec
        }
        cart.push(item)
        this.$swal.fire({
          icon: 'success',
          title: '已加入至購物車',
          showConfirmButton: false,
          timer: 1000
        })
      }
      window.localStorage.setItem('cartList', JSON.stringify(cart))
    },
    // 立即購買
    quickBuy() {
      this.$swal.fire({
        icon: 'success',
        title: '已加入購物車',
        showConfirmButton: false,
        timer: 1000
      })
      setTimeout(() => {
        this.$router.push('/cart')
      }, 1000)
    }
  }
}
</script>

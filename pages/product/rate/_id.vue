<template>
  <section>
    <a class="block mb-6 p-4 -mx-5 md:-mx-0 -mt-8 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-white cursor-pointer sticky top-16" @click="$router.go(-1)"><fa class="w-4 mr-5" :icon="['fa-solid', 'fa-angle-left']" />回上一頁</a>
    <ul class="w-full">
      <div class="w-full py-4 px-5 md:px-12 md:pt-4 md:pb-12 bg-[#FFF5C2] text-red-500">
        <span class="text-4xl">{{ rate.avgRate }}</span>
        <span class="text-sm"> / 5</span>
        <span class="text-[#a3a3a3] text-sm ml-3">{{ rate.totalResult }}則評論</span>
      </div>
      <li v-for="(list) in rate.items" :key="list.id" class="py-5 border-b border-b-[#c4c4c4]">
        <div class="flex space-x-5">
          <img :src="list.profileImg" alt="" class="w-16 h-16 rounded-full object-cover">
          <div class="flex flex-col space-y-2">
            <p>{{ list.account }}</p>
            <div class="flex space-x-2">
              <div v-for="star in 5" :key="star" class="text-[#FFC107]">
                <fa v-if="star <= list.rate" icon="fa-solid fa-star"></fa>
                <fa v-else icon="fa-regular fa-star"></fa>
              </div>
            </div>
            <div class="flex items-center space-x-3 text-[#a3a3a3] text-sm">
              <span>{{ list.time }}</span>
              <span>規格：{{ list.spec }}</span>
            </div>
          </div>
        </div>
        <div class="rateContent">
          <p class="my-3 line-clamp-3" :class="{'line-clamp-none': list.enable}">{{ list.content }}</p>
        </div>
        <p v-if="!list.enable" @click="list.enable = true" class="mb-3 inline-block text-sm cursor-pointer group showMoreBtn">... <span class="text-sky-500 group-hover:text-sky-700">更多</span></p>
        <div class="flex flex-wrap gap-3" v-if="list.images.length > 0">
          <img @click="handleOpenImgZoom(list.images)" v-for="img in list.images" :key="img.id" :src="img.imgUrl" alt="" class="h-24 w-24 cursor-pointer">
        </div>
      </li>
    </ul>
    <Zoom :isOpen="openImgZoom" :imgArr="imgArr" @closeZoom="closeZoom" />
  </section>
</template>

<script>
export default {
  asyncData() {
    const rate = {
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
          enable: false,
          images: [
            {id: 1, imgUrl: require("~/static/images/product_example.png")},
            {id: 2, imgUrl: require("~/static/images/product_example2.png")},
            {id: 3, imgUrl: require("~/static/images/product_example3.png")},
            {id: 4, imgUrl: require("~/static/images/product_example.png")},
            {id: 5, imgUrl: require("~/static/images/product_example2.png")},
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
          enable: false,
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
          enable: false,
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
          enable: false,
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
          content: '評價評價評價評價評價評價評價評價評評價評價評評價評價評評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價評價',
          enable: false,
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
          enable: false,
          images: [
            {id: 1, imgUrl: require("~/static/images/product_example3.png")},
            {id: 2, imgUrl: require("~/static/images/product_example2.png")}
          ]
        },
      ]
    }
    return { rate }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        key: undefined
      },
      showHiddenLine: false,
      currentPage: 1,
      openImgZoom: false,
      imgArr: []
    }
  },
  methods: {
    handleOpenImgZoom(imgArr) {
      this.openImgZoom = true
      this.imgArr = imgArr
    },
    closeZoom() {
      this.openImgZoom = false
    },
    isOverThreeRow() {
      const startPos = (this.currentPage - 1) * 10
      const rateContent = document.querySelectorAll('.rateContent p')

      for(let i = startPos; i < rateContent.length ; i++) {
        if (rateContent[i].scrollHeight > rateContent[i].clientHeight) {  
          this.rate.items[i].enable = false
        } else {
          this.rate.items[i].enable = true
        }
      }
    }
  },
  mounted() {
    // 判斷滑到底部
    window.addEventListener('scroll', () => {
      const windowH = document.documentElement.clientHeight
      const documentH= document.documentElement.offsetHeight
      const scrollH= document.documentElement.scrollTop
  
       if ((windowH + scrollH) >= (documentH - 200)) {
         if (this.currentPage === this.rate.totalPage) return
         this.currentPage += 1
       }
    })

    this.isOverThreeRow()

    window.onresize = () => {
      this.isOverThreeRow()
    }

  }
}
</script>

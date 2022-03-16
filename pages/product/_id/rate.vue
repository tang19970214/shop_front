<template>
  <section>
    <ul class="w-full">
      <div class="w-full py-4 px-5 md:px-12 md:pt-4 md:pb-12 bg-[#FFF5C2] text-red-500">
        <span class="text-4xl">{{ estimate.avgRate }}</span>
        <span class="text-sm"> / 5</span>
        <span class="text-[#a3a3a3] text-sm ml-3">{{ estimate.totalResult }}則評論</span>
      </div>
      <li v-for="list in estimate.items" :key="list.id" class="py-5 border-b border-b-[#c4c4c4]">
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
        <p class="my-3 line-clamp-3" :class="{'line-clamp-none': showHiddenLine}">{{ list.content }}</p>
        <p v-if="list.content.length >= 200 && !showHiddenLine" @click="showHiddenLine = true" class="mb-3 text-sm cursor-pointer inline-block group">... <span class="text-sky-500 group-hover:text-sky-700">更多</span></p>
        <div class="flex space-x-3" v-if="list.images.length > 0">
          <img @click="handleOpenImgZoom(list.images)" v-for="img in list.images" :key="img.id" :src="img.imgUrl" alt="" class="h-24 w-24 object-cover cursor-pointer">
        </div>
      </li>
    </ul>
    <div class="flex justify-center mt-4">
      <a @click="$router.push(`/product/rate/${product.id}`)" class="duration-300 text-sky-500 md:hidden">查看所有評論 >></a>
    </div>
    <Pagination :totalPage="estimate.totalPage" @changePage="changePage($event)" class="hidden md:block" />
    <Zoom :isOpen="openImgZoom" :imgArr="imgArr" @closeZoom="closeZoom" />
  </section>
</template>

<script>
export default {
  props: {
    estimate: {
      type: Object,
      default: () => {}
    },
    product: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showHiddenLine: false,
      currentPage: 1,
      openImgZoom: false,
      imgArr: []
    }
  },
  methods: {
    // 變更分頁
    changePage(page) {
      this.currentPage = page
      console.log(page)
    },
    handleOpenImgZoom(imgArr) {
      this.openImgZoom = true
      this.imgArr = imgArr
    },
    closeZoom() {
      this.openImgZoom = false
    }
  }
}
</script>

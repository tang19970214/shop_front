<template>
  <section>
    <ul class="w-full">
      <li v-for="list in estimateArr" :key="list.id" class="py-5 border-b border-b-[#c4c4c4]">
        <div class="flex space-x-5">
          <img :src="list.profileImg" alt="" class="w-16 h-16 rounded-full object-cover">
          <div class="flex flex-col space-y-2">
            <p>{{ list.account }}</p>
            <div class="flex space-x-2">
              <div v-for="(star) in 5" :key="star" class="text-[#FFC107]">
                <fa v-if="star <= list.rate" icon="fa-solid fa-star"></fa>
                <fa v-else icon="fa-regular fa-star"></fa>
              </div>
            </div>
            <div class="flex items-center space-x-3 text-[#a3a3a3] text-sm">
              <span>{{ list.time }}</span>
              <span>規格：{{ list.wasBuy }}</span>
            </div>
          </div>
        </div>
        <p class="my-3 line-clamp-3" :class="{'line-clamp-none': showHiddenLine}">{{ list.content }}</p>
        <p v-if="list.content.length >= 200 && !showHiddenLine" @click="showHiddenLine = true" class="mb-3 text-sm cursor-pointer inline-block group">... <span class="text-sky-500 group-hover:text-sky-700">更多</span></p>
        <div class="flex space-x-3" v-if="list.images.length > 0">
          <img v-for="img in list.images" :key="img.id" :src="img.imgUrl" alt="" class="h-24 w-24">
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    estimateArr: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showHiddenLine: false
    }
  }
}
</script>

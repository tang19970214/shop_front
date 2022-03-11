<template>
  <section class="w-full mb-5 select-none">
    <div class="grid grid-cols-12 relative">
      <div class="col-span-4 md:col-span-3 overflow-hidden relative">
        <div class="relative flex justify-center items-center text-white w-full h-full bg-[#FA5936]" :class="{'bg-[#a3a3a3]': !isCanUse}">
          <span v-if="type === 'cash'" class="text-sm md:text-base pt-1 md:pt-3">NT$</span>
          <span class="text-2xl md:text-5xl font-bold mx-0 md:mx-2">{{ countOff }}</span>
          <span v-if="type === 'discount'" class="text-sm md:text-base pt-1 md:pt-3">折</span>
          <!-- dot -->
          <div class="absolute left-[-13px] top-[-13px] z-10 w-auto h-[calc(100%+26px)] flex flex-col justify-between" v-if="page !== 'checkout'">
            <div class="min-w-[26px] min-h-[26px] rounded-full bg-white" v-for="i in dotList" :key="i"></div>
          </div>
          <div class="absolute left-[-7px] top-[-7px] z-10 w-auto h-[calc(100%+14px)] flex flex-col justify-between" v-else>
            <div class="min-w-[14px] min-h-[14px] rounded-full bg-white md:border-none" :class="{'border border-[#16a34a]': selectedId === id && isCanUse}" v-for="i in 5" :key="i"></div>
          </div>
        </div>
      </div>
      <div class="col-span-8 md:col-span-9 border border-[#c4c4c4] border-l-0">
        <div class="relative py-2 px-2 md:px-6 min-h-[80px] md:min-h-[150px]" :class="{'md:min-h-[100px]': page === 'checkout'}">
          <h3 class="md:text-lg font-bold">{{ name }}</h3>
          <p class="text-red-500 text-xs md:text-sm">有效期限 : {{ time }}</p>
          <div class="border border-[#ddd] w-full my-4" v-if="page === 'order'"></div>
          <p class="hidden md:block" v-if="page === 'order'">使用規則 :</p>
          <ul class="hidden md:block pl-4" v-if="page === 'order'">
            <li v-for="item in rules" :key="item" class="list-decimal">
              {{ item }}
            </li>
          </ul>
          <a href="#" class="block md:hidden text-right text-xs text-sky-500" v-if="page === 'order'"> 使用規則 </a>
          <div class="flex items-center space-x-1 mt-2" v-if="!isCanUse">
            <a @click="openCouponDetail()" class="text-xs md:text-lg text-[#a3a3a3] underline underline-offset-2 cursor-pointer">不適用此活動</a>
            <div @click="openCouponDetail()" class="w-5 h-5 rounded-full border border-[#a3a3a3] flex justify-center items-center cursor-pointer">
              <fa class="text-[#a3a3a3] text-xs" icon="fa-solid fa-question"></fa>
            </div>
          </div>
          <div class="duration-300 flex items-center space-x-2 absolute top-1/2 -translate-y-4 right-1/2 md:right-8 z-10 scale-0" :class="{'scale-100': selectedId === id && isCanUse}">
            <span class="text-[#16A34A]">已選擇</span>
            <div class="w-8 h-8 rounded-full border-4 border-[#16A34A] flex justify-center items-center">
              <fa class="text-[#16A34A]" icon="fa-solid fa-check"></fa>
            </div>
          </div>
          
        </div>
      </div>
      <div class="absolute duration-150 md:hidden w-full h-full top-0 left-0 pointer-events-none" :class="{'bg-[rgba(255,255,255,0.85)] border border-[#16a34a]': selectedId === id && isCanUse}"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    type: {
      type: String
    },
    name: {
      type: String,
    },
    time: {
      type: String,
    },
    rules: {
      type: Array,
    },
    countOff: {
      type: Number,
      default: 0
    },
    page: {
      type: String,
      default: 'order'
    },
    isCanUse: {
      type: Boolean,
      default: true
    },
    selectedId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dotList() {
      return this.rules.length < 3 ? 4 : this.rules.length + 2;
    },
  },
  methods: {
    openCouponDetail() {
      const detail = {
        name: this.name,
        type: this.type,
        countOff: this.countOff,
        time: this.time,
        rules: this.rules,
        isCanUse: this.isCanUse
      }
      this.$emit("openCouponDetail", detail)
    }
  }
};
</script>

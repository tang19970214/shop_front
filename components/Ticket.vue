<template>
  <section class="w-full">
    <div class="grid grid-cols-12">
      <div class="col-span-4 md:col-span-3 relative">
        <div class="flex justify-center items-center text-white w-full h-full bg-[url(~/static/images/icon/ticket.svg)] bg-no-repeat bg-cover">
          <span class="text-sm md:text-base md:pt-3">NT$</span>
          <span class="text-2xl md:text-5xl font-bold ml-2">{{ price }}</span>
        </div>
      </div>
      <div class="col-span-8 md:col-span-9 border border-[#c4c4c4] border-l-0">
        <div class="relative py-3 px-3 md:px-6 min-h-[82px] md:min-h-[150px]">
          <h3 class="md:text-lg font-bold">{{ name }}</h3>
          <p class="text-red-500 text-xs md:text-sm">有效期限 : {{ time }}</p>
          <div class="border border-[#ddd] w-full my-4"></div>
          <p class="hidden md:block">使用規則 :</p>
          <ul class="hidden md:block pl-4">
            <li v-for="item in rules" :key="item" class="list-decimal">
              {{ item }}
            </li>
          </ul>
          <a href="#" class="block md:hidden text-right text-xs text-sky-500"> 使用規則 </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    time: {
      type: String,
    },
    rules: {
      type: Array,
    },
    price: {
      type: Number,
    },
  },
};
</script>

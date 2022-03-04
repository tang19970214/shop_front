<template>
  <section class="w-full">
    <div class="relative w-full my-[25px]">
      <div class="grid grid-cols-12">
        <div class="col-span-4 md:col-span-3 relative">
          <div
            class="flex justify-center items-center text-white w-full h-full bg-[url(~/static/images/icon/ticket.svg)] bg-no-repeat bg-cover"
          >
            <span class="text-[14px] md:text-[16px] md:pt-[12px]">NT$</span>
            <span class="text-[24px] md:text-[48px] font-bold ml-[8px]">{{
              price
            }}</span>
          </div>
        </div>
        <div
          class="col-span-8 md:col-span-9 border-[1px] border-[#c4c4c4] border-l-[0px]"
        >
          <div
            class="relative py-[13px] px-[10px] md:px-[24px] min-h-[82px] md:min-h-[150px]"
          >
            <h3 class="text-[16px] md:text-[18px] font-bold">{{ name }}</h3>
            <p class="text-red-500 text-[12px] md:text-[14px]">
              有效期限 : {{ time }}
            </p>
            <div class="border-[1px] border-[#ddd] w-full my-[15px]"></div>
            <p class="hidden md:block">使用規則 :</p>
            <ul class="hidden md:block pl-[15px]">
              <li v-for="item in rules" :key="item" class="list-decimal">
                {{ item }}
              </li>
            </ul>
            <a
              href="#"
              class="block md:hidden text-right text-[12px] text-sky-500"
            >
              使用規則
            </a>
          </div>
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

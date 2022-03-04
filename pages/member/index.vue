<template>
  <section class="w-full">
    <div class="grid grid-cols-1 gap-[60px] md:px-[30px] lg:grid-cols-2">
      <div class="space-y-[20px] order-last lg:order-first">
        <div class="flex items-center space-x-[17px]">
          <div
            class="w-[64px] h-[64px] bg-gray-300 rounded-full flex justify-center items-center"
          >
            <fa class="w-[38px] h-[38px] text-white" :icon="['fas', 'user']" />
          </div>
          <h2 class="text-4xl">王oo</h2>
        </div>
        <p class="text-neutral-700">
          您的會員屬性為： <span> 紅利會員 </span>
          <a
            href="#"
            class="duration-150 text-sky-500 text-[14px] hover:text-sky-700"
            >(會員權益)</a
          >
        </p>
        <p class="text-neutral-700">
          您當前的點數為： <span class="text-[#FA5936]">50點</span>
          <a
            href="#"
            class="duration-150 text-sky-500 text-[14px] hover:text-sky-700"
            >(如何使用)</a
          >
        </p>
        <p class="text-neutral-700">
          有任何問題請使用line官方帳號及粉絲團私訊詢問或致電客服：091234567
          感謝您！
        </p>
        <div class="flex space-x-[19px]">
          <Buttons
            :btnInfo="{ label: 'LINE官方帳號', link: 'https://www.google.com' }"
          ></Buttons>
          <Buttons
            :btnInfo="{
              label: 'Facebook粉絲團',
              link: 'https://www.google.com',
            }"
          ></Buttons>
        </div>
      </div>
      <div>
        <MemberCard
          :memberInfo="{ point: 50, joinTime: '2022/01/30', type: '紅利會員' }"
        ></MemberCard>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "member-index",
  data() {
    return {};
  },
};
</script>

<template>
  <div>
    <div class="w-full block lg:flex text-lg mt-7 py-3 px-4 lg:sticky lg:top-32 z-[1]" :class="{ 'bg-[#FFF0E5]': order.orderType !== '已取消', 'bg-[#EAEAEA]': order.orderType === '已取消' }">
      <div class="flex my-auto">
        <span> 日期：{{ order.orderDate }} </span>
      </div>
      <div class="flex lg:ml-12 lg:my-0 my-2">
        <span> 訂單編號： </span>
        <span>
          {{ order.orderId }}
        </span>
      </div>
      <div class="flex ml-auto">
        <span> 狀態： </span>
        <span :class="{ 'text-[#13823b]': order.orderType === '訂單已確認', 'text-[#f0ad4e]': order.orderType === '訂單處理中', 'text-white': order.orderType === '訂單已完成', 'text-black': order.orderType === '已取消' }">
          {{ order.orderType }}
        </span>
      </div>
    </div>
    <table class="w-full relative">
      <tr v-for="(list, idx) in orderList" :key="list.id" class="border-b border-b-[#bbbbbb] duration-150 hover:bg-stone-50 cursor-pointer" @click="toOrderDetail(order.orderId)">
        <td class="p-4" :class="{ hidden: idx >= 5 && isOverFiveItems && !isShowTotalItems }">
          <div class="flex">
            <img class="max-w-[100px] mr-9" :src="list.imgUrl" :alt="list.title" />
            <div class="flex flex-col justify-center">
              <p class="mb-0.5 lg:mb-2">
                {{ list.title }}
              </p>
              <span> x{{ list.quantity }} </span>
              <p class="lg:hidden text-lg text-[#FA5936] mt-1">${{ list.sale * list.quantity }}</p>
            </div>
          </div>
        </td>
        <td class="hidden lg:table-cell" :class="{ hidden: idx >= 5 && isOverFiveItems && !isShowTotalItems, 'lg:hidden': idx >= 5 && isOverFiveItems && !isShowTotalItems }">
          <p class="text-lg text-[#FA5936]">${{ list.sale * list.quantity }}</p>
        </td>
      </tr>
      <div v-if="isOverFiveItems && !isShowTotalItems" class="cursor-pointer absolute flex justify-center items-end pb-4 bottom-0 left-0 w-full h-[250px] bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-[rgba(251,238,223,0.87)]" @click.prevent="isShowTotalItems = true">
        <a href="#" class="w-full text-center duration-300 text-sky-500 hover:text-sky-600 text-lg"> 查看完整訂單 >> </a>
      </div>
    </table>
    <div class="w-full text-right mt-4 lg:flex lg:items-center lg:justify-end text-lg" :class="{ 'lg:hidden': isOverFiveItems && !isShowTotalItems, hidden: isOverFiveItems && !isShowTotalItems }">
      <div class="flex justify-end space-x-4 lg:mr-10">
        <img class="w-7" src="~/static/images/icon/transport.svg" alt="配送方式" />
        <span> 配送方式： {{ order.transportType }} </span>
      </div>
      <div class="flex justify-end space-x-4 mt-3 lg:mt-0">
        <img class="w-7" src="~/static/images/icon/orderprice.svg" alt="訂單金額" />
        <span class="font-bold">
          訂單金額：
          <span class="text-[#FA5936] text-lg"> ${{ order.totalPrice }} </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
    },
    order: {
      type: Object,
    },
  },
  data() {
    return {
      isOverFiveItems: false,
      isShowTotalItems: false,
    };
  },
  methods: {
    toOrderDetail(orderId) {
      this.$router.push(`/member/order/${orderId}`);
    },
  },
  mounted() {
    if (this.orderList.length > 5) {
      this.isOverFiveItems = true;
    }
  },
};
</script>

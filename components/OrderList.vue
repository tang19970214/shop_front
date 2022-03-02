<template>
  <div>
    <div
    class="w-full block lg:flex text-[18px] mt-[30px] py-[11px] px-[17px]"
    :class="{'bg-[#FFF0E5]': order.orderType !== '已取消', 'bg-[#EAEAEA]': order.orderType === '已取消'}"
    >
      <div class="flex my-auto">
        <span>
          日期：{{ order.orderDate }}
        </span>
      </div>
      <div class="flex lg:ml-[50px] lg:my-[0px] my-[8px]">
        <span>
          訂單編號：
        </span>
        <span>
          {{ order.orderId }}
        </span>
      </div>
      <div class="flex ml-auto">
        <span>
          狀態：
        </span>
        <span
        :class="{'text-[#13823b]': order.orderType === '訂單已確認',
                'text-[#f0ad4e]': order.orderType === '訂單處理中',
                'text-[#fff]': order.orderType === '訂單已完成',
                'text-[#000]': order.orderType === '已取消'}"
        >
          {{ order.orderType }}
        </span>
      </div>
    </div>
    <table
    class="w-full relative"
    >
      <tr
      v-for="(list, idx) in orderList"
      :key="list.id"
      class="border-b-[1px] border-b-[#bbbbbb] duration-150 hover:bg-stone-50 cursor-pointer"
      @click="toOrderDetail(order.orderId)"
      >
        <td
        class="py-[15px]"
        :class="{'hidden': idx >= 5 && isOverFiveItems && !isShowTotalItems}"
        >
          <div class="flex">
            <img class="max-w-[100px] mr-[35px]" :src="list.imgUrl" :alt="list.title">
            <div class="flex flex-col justify-center">
              <p class="mb-[2px] lg:mb-[10px]">
                {{ list.title }}
              </p>
              <span>
                x{{ list.quantity }}
              </span>
              <p class="block lg:hidden text-[18px] text-[#FA5936] mt-[5px]">
                ${{ list.sale * list.quantity }}
              </p>
            </div>
          </div>
        </td>
        <td
        class="hidden lg:table-cell"
        :class="{'hidden': idx >= 5 && isOverFiveItems && !isShowTotalItems}"
        >
          <p class="text-[18px] text-[#FA5936]">
            ${{ list.sale * list.quantity }}
          </p>
        </td>
      </tr>
      <div
      v-if="isOverFiveItems && !isShowTotalItems"
      class="absolute flex justify-center items-end pb-[15px] bottom-0 left-0 w-full h-[250px] bg-gradient-to-b from-transparent to-[rgba(251,238,223,0.87)]">
        <a
        href="#"
        class="w-full text-center duration-300 text-sky-500 hover:text-sky-600 text-[18px]"
        @click.prevent="isShowTotalItems = true"
        >
          查看完整訂單 >>
        </a>
      </div>
    </table>
    <div
    class="w-full text-right mt-[15px] lg:flex lg:items-center lg:justify-end text-[18px]"
    :class="{'lg:hidden': isOverFiveItems && !isShowTotalItems, 'hidden': isOverFiveItems && !isShowTotalItems}"
    >
      <div class="flex justify-end space-x-[15px] lg:mr-[40px]">
        <img class="w-[30px]" src="~/static/images/icon/transport.svg" alt="配送方式">
        <span>
          配送方式： {{ order.transportType }}
        </span>
      </div>
      <div class="flex justify-end space-x-[15px] mt-[13px] lg:mt-[0px]">
        <img class="w-[30px]" src="~/static/images/icon/orderprice.svg" alt="訂單金額">
        <span class="font-bold">
          訂單金額：
          <span class="text-[#FA5936] text-[18px]">
            ${{ order.totalPrice }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array
    },
    order: {
      type: Object
    }
  },
  data() {
    return {
      isOverFiveItems: false,
      isShowTotalItems: false
    }
  },
  methods: {
    toOrderDetail(orderId) {
      this.$router.push(`/member/order/${orderId}`)
    }
  },
  mounted() {
    if (this.orderList.length > 5) {
      this.isOverFiveItems = true
    }
  }
}
</script>

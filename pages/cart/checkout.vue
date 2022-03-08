<template>
  <section class="w-full md:px-8">
    <h3 class="mt-2 text-lg mb-4 font-bold tracking-widest">結帳</h3>
    <table class="w-full">
      <tr class="bg-[#FFF0E5]">
        <th class="w-9/12 text-left py-2.5 px-5">
          <span>商品名稱</span>
        </th>
        <th class="text-center">
          <span>數量</span>
        </th>
        <th class="text-center">
          <span>價錢</span>
        </th>
      </tr>
      <tr class="border-b border-b[#c4c4c4]" v-for="cart in checkInfo.checkoutList" :key="cart.id">
        <td class="p-2 md:p-5">
          <div class="flex items-center space-x-5">
            <img class="w-24 h-24" :src="cart.imgUrl" :alt="cart.title">
            <span>{{ cart.title }}</span>
          </div>
        </td>
        <td class="text-center text-lg">
          <span>X{{ cart.quantity }}</span>
        </td>
        <td class="text-center text-lg text-[#FA5936]">
          <span>${{ cart.sale }}</span>
        </td>
      </tr>
    </table>
    <table class="w-full">
      <tr>
        <div class="grid grid-cols-12 p-2 md:p-5">
          <div class="col-span-9 md:col-span-10">
            <div class="flex flex-col items-end">
              <div class="flex items-center">
                <span class="text-[#a3a3a3] text-sm">({{ totalQuantity }}件商品)</span>
                <span class="text-lg ml-3">商品小計</span>
              </div>
              <span class="text-lg">運費</span>
              <div class="flex items-center space-x-2">
                <div
                class="w-6 h-6 border-2 rounded-md cursor-pointer select-none"
                :class="{'border-[#a3a3a3]': !checkInfo.usePoint, 'border-[#FA5936]': checkInfo.usePoint}"
                @click.prevent="checkInfo.usePoint = !checkInfo.usePoint"
                >
                  <label class="block relative w-full h-full cursor-pointer text-white duration-300 bg-white select-none scale-0"
                  :class="{'bg-[#FA5936]': checkInfo.usePoint, 'border-[#FA5936]': checkInfo.usePoint, 'scale-100': checkInfo.usePoint}"
                  >
                    <input v-model="checkInfo.usePoint" type="checkbox" class="hidden appearance-none" id="pointCheckbox">
                    <fa class="absolute text-sm top-1/2 left-1/2 -translate-x-1.5 -translate-y-1.5" icon="fa-solid fa-check"></fa>
                  </label>
                </div>
                <label class="text-lg select-none cursor-pointer" for="pointCheckbox">使用紅利金</label>
              </div>
              <button @click="openModal = true" class="border-2 border-[#16a34a] rounded-xl p-3 flex items-center text-lg mt-4">
                <img class="mr-4" src="~/static/images/icon/coupon-green.svg" alt="優惠碼/折價券">
                使用優惠碼/折價券
              </button>
            </div>
          </div>
          <div class="col-span-3 md:col-span-2 flex flex-col text-right">
            <span class="text-lg text-[#FA5936]">${{ cartPrice }}</span>
            <span class="text-lg text-[#FA5936]">$60</span>
            <div :class="{'pt-1': !checkInfo.usePoint, 'md:pt-0': !checkInfo.usePoint}">
              <span v-if="!checkInfo.usePoint" class="text-sm md:text-lg text-[#a3a3a3]">可用{{ checkInfo.point }}點</span>
              <span v-else class="text-lg text-[#FA5936]">-${{ checkInfo.point }}</span>
            </div>
            <span class="text-lg text-[#a3a3a3] mt-7">0</span>
          </div>
        </div>
      </tr>
    </table>
    <div class="flex justify-center">
      <button data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-3.5 px-20 rounded-xl shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" @click="$router.push({ name: 'cart-finish' })">確認結帳</button>
    </div>
    <Modal :openModal="openModal" @closeModal="closeModal">
      <div class="p-5">
        <h4 class="text-2xl font-bold mb-6">使用優惠碼</h4>
        <div class="relative w-1/2">
          <input type="text" class="focus:ring-2 focus:ring-[#FA5936] focus:outline-none border w-full border-[#c4c4c4] rounded-xl p-3" placeholder="請輸入優惠碼">
          <div class="duration-300 absolute flex justify-center cursor-pointer items-center w-3/12 h-full top-0 right-0 rounded-tr-xl rounded-br-xl bg-[#FA5936] hover:bg-[#e75332]">
            <span class="text-white">新增</span>
          </div>
        </div>
        <h4 class="text-2xl font-bold mt-10">我的折價券</h4>
      </div>
    </Modal>
  </section>
</template>

<script>
export default {
  name: "cart-checkout",
  data() {
    return {
      checkInfo: {
        name: '',
        phone: '',
        email: '',
        note: '',
        transportType: '',
        paymentType: '',
        point: 110,
        usePoint: false,
        checkoutList: [
          {
            id: 1,
            imgUrl: require('~/static/images/product_example.png'),
            title: '縱谷間的茶・經典有機紅烏龍',
            quantity: 1,
            sale: 890
          },
          {
            id: 2,
            imgUrl: require('~/static/images/product_example.png'),
            title: '縱谷間的茶・經典有機紅烏龍2',
            quantity: 3,
            sale: 790
          },
        ]
      },
      openModal: false
    }
  },
  computed: {
    totalQuantity() {
      let total = 0
      this.checkInfo.checkoutList.forEach((item) => {
        total += item.quantity
      })
      return total
    },
    cartPrice() {
      let total = 0
      this.checkInfo.checkoutList.forEach((item) => {
        total += (item.sale * item.quantity)
      })
      return total
    }
  },
  methods: {
    closeModal() {
      this.openModal = false
    }
  }
};
</script>
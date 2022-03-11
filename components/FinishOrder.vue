<template>
  <section class="mt-10">
    <!-- 頂部黃色 Title -->
    <div v-if="$route.name === 'cart-finish'" class="w-full bg-[#FFF5C2] p-5 text-center">
      <div class="flex justify-center">
        <p class="font-bold text-2xl">已收到您的訂單</p>
        <div class="w-8 h-8 rounded-full border-4 border-[#13823b] ml-2 flex items-center justify-center">
          <fa class="text-[#13823b]" :icon="['fa-solid', 'fa-check']" />
        </div>
      </div>
      <p class="text-lg text-[#404040]">訂單編號：{{ order.id }}</p>
    </div>
    
    <!-- 訂單列表 -->
    <table class="w-full mt-6">
      <tr class="bg-[#FFF0E5] hidden md:table-row" :class="{'hidden': $route.name !== 'cart-finish'}">
        <th class="pl-5 text-left"><span>商品名稱</span></th>
        <th class="md:w-4/12 xl:w-3/12 text-right py-2.5"><span>數量</span></th>
        <th class="md:w-3/12 xl:w-2/12 text-right pr-5"><span>價錢</span></th>
      </tr>
      
      <!-- 商品列表 -->
      <tr v-for="list in order.orderItems" :key="list.id" class="border-b border-b-[#c4c4c4]">
        <td class="p-4">
          <div class="flex md:items-center space-x-5">
            <img class="h-24 w-24" :src="list.imgUrl" :alt="list.title">
            <div class="flex flex-col space-y-2 text-lg">
              <h3>{{ list.title }}</h3>
              <span class="block md:hidden">X{{ list.quantity }}</span>
              <span class="text-[#FA5936] block md:hidden">${{ list.sale * list.quantity }}</span>
            </div>
          </div>
        </td>
        <td class="text-right hidden md:table-cell">
          <span>X{{ list.quantity }}</span>
        </td>
        <td class="text-right pr-5 hidden md:table-cell">
          <span class="text-lg text-[#FA5936]">${{ list.sale * list.quantity }}</span>
        </td>
      </tr>

      <!-- 商品小計 -->
      <tr class="border-b border-b-[#c4c4c4] hidden md:table-row">
        <td></td>
        <td class="text-right">
          <div class="flex flex-col space-y-2">
            <p class="text-lg">
              <span class="text-sm text-[#a3a3a3]">({{ totalQuantity }}件商品)</span>
              商品小計
            </p>
            <p class="text-lg">運費</p>
            <div class="flex justify-end space-x-2 items-center">
              <div class="border border-[#a3a3a3] rounded-md w-5 h-5 flex items-center justify-center bg-[#a3a3a3]" :class="{'bg-[#fff]': order.point === 0}">
                <fa class="text-white text-xs" icon="fa-solid fa-check"></fa>
              </div>
              <p class="text-lg relative">使用紅利金</p>
            </div>
            <div class="flex items-center justify-end space-x-3">
              <img src="~/static/images/icon/coupon.svg" alt="優惠碼/折價券">
              <p class="text-lg">使用優惠碼/折價券</p>
            </div>
          </div>
        </td>
        <td class="text-right pr-5">
          <div class="flex flex-col space-y-2 py-5">
            <p class="text-lg text-[#FA5936]">${{ order.price }}</p>
            <p class="text-lg text-[#FA5936]">${{ order.transportPrice }}</p>
            <p class="text-lg text-[#FA5936]">-${{ order.point }}</p>
            <p class="text-lg text-[#FA5936]">-${{ order.coupon }}</p>
          </div>
        </td>
      </tr>
      <!-- 商品小計手機版 -->
      <tr class="border-b border-b-[#c4c4c4] table-row md:hidden">
        <td class="px-4">
          <div class="grid grid-cols-12">
            <div class="col-span-8">
              <div class="flex flex-col items-end space-y-3 py-3 text-lg">
                <span><span class="text-sm text-[#a3a3a3] mr-2">({{ totalQuantity }}件商品)</span>商品小計</span>
                <span>運費</span>
                <span>使用紅利金</span>
                <span class="p-2 w-full border border-[#16A34A] text-[#16A34A] rounded-md text-right relative">
                  <img class="absolute top-1/2 left-2 -translate-y-3" src="~/static/images/icon/coupon-green.svg" alt="使用優惠碼/折價券">
                  使用優惠碼/折價券
                </span>
              </div>
            </div>
            <div class="col-span-4">
              <div class="flex flex-col items-end py-3 space-y-3 text-lg text-[#fa5936]">
                <span>${{ order.price }}</span>
                <span>${{ order.transportPrice }}</span>
                <span>-${{ order.point }}</span>
                <span class="py-2">-${{ order.coupon }}</span>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <!-- 訂單金額 -->
      <tr class="hidden md:table-row">
        <td></td>
        <td class="text-right"><span class="text-lg font-bold">訂單金額</span></td>
        <td class="text-right pr-5 py-5"><span class="text-3xl text-[#FA5936] font-bold">${{ order.total }}</span></td>
      </tr>
      <!-- 訂單金額手機版 -->
      <tr class="table-row md:hidden">
        <td class="px-4 py-5">
          <div class="grid grid-cols-12 items-center">
            <div class="col-span-8 text-right">
              <span class="text-lg font-bold">訂單金額</span>
            </div>
            <div class="col-span-4 text-right">
              <span class="text-2xl font-bold text-[#FA5936]">${{ order.total }}</span>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- 訂購資訊 -->
    <div class="mt-11 text-lg">
      <h3 class="font-bold border-l-8 border-l-[#fa5936] pl-4">訂購人資料</h3>
      <div class="pl-6 space-y-2.5 mt-4">
        <p>姓名: {{ order.name }}</p>
        <p>手機號碼: {{ order.phone }}</p>
        <p>信箱: {{ order.email }}</p>
        <p>
          備註:
          <span v-if="order.note !== ''">{{ order.note }}</span>
          <span v-else>無</span>
        </p>
      </div>
      <h3 class="font-bold border-l-8 border-l-[#fa5936] pl-4 mt-8">寄送方式</h3>
      <div class="pl-6 space-y-2.5 mt-4">
        <div class="flex">
          <div class="w-6 h-6 rounded-full bg-transparent border border-[#a3a3a3] relative flex justify-center items-center mt-0.5 mr-5">
            <div class="absolute w-4 h-4 bg-[#a3a3a3] rounded-full"></div>
          </div>
          <div class="flex flex-col">
            <p>{{ order.transportType }}</p>
            <div class="relative block lg:flex lg:items-center mt-2.5">
              <span v-if="!!order.transportId">物流編號<span id="transportId">{{ order.transportId }}</span></span>
              <img v-if="!!order.transportId" @click="copyId()" class="inline cursor-pointer ml-1 mr-6" src="~/static/images/icon/copy.svg" alt="複製物流編號" title="複製物流編號" />
              <transition name="fade">
                <div v-if="copyMessageIsShow" class="absolute top-10 rounded-xl p-2.5 right-0 md:right-1/4 bg-[rgba(0,0,0,0.27)] backdrop-blur-3 text-white">已複製到剪貼簿</div>
              </transition>
              <button v-if="!!order.transportId" data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-1.5 px-5 duration-300 bg-[#1ebe5a] hover:bg-[#1aa54f] text-white text-sm rounded-sm mt-2.5 lg:mt-0">訂單查詢</button>
            </div>
          </div>
        </div>
      </div>
      <h3 class="font-bold border-l-8 border-l-[#fa5936] pl-4 mt-8">付款方式</h3>
      <div class="pl-6 space-y-2.5 mt-4">
        <div class="flex">
          <div class="w-6 h-6 rounded-full bg-transparent border border-[#a3a3a3] relative flex justify-center items-center mt-0.5 mr-5">
            <div class="absolute w-4 h-4 bg-[#a3a3a3] rounded-full"></div>
          </div>
          <div class="flex flex-col md:flex-row">
            <span>{{ order.paymentType }}</span>
            <span class="text-[#a3a3a3] md:ml-2.5">{{ order.paymentAccount }}</span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      order: {
        id: 21111708328107,
        time: "2021/01/28",
        status: "已取消",
        price: 30000,
        total: 29800,
        transportPrice: 60,
        point: 110,
        coupon: 150,
        orderItems: [
          {
            id: 1,
            imgUrl: require("~/static/images/product_example.png"),
            title: "春季的初戀微甜｜金牌紅烏龍禮盒",
            quantity: 1,
            sale: 6000,
          },
          {
            id: 2,
            imgUrl: require("~/static/images/product_example.png"),
            title: "春季的初戀微甜｜金牌紅烏龍禮盒",
            quantity: 2,
            sale: 12000,
          },
        ],
        name: "陳OO",
        phone: "0912345678",
        email: "user123@example.com",
        note: "",
        transportType: "全家正隆店 220新北市板橋區三民路二段正隆巷34號",
        transportId: "",
        paymentType: "信用卡一次付清",
        paymentAccount: "中國信託 **** 1234",
      },
    }
  },
  computed: {
    totalQuantity() {
      let total = 0
      this.order.orderItems.forEach((item) => {
        total += item.quantity
      })
      return total
    },
    totalPrice() {
      let total = 0
      this.order.orderItems.forEach((item) => {
        total += (item.quantity * item.sale)
      })
      return total
    }
  }
}
</script>

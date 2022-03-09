<template>
  <section class="w-full md:px-8">
    <h3 class="mt-2 text-lg mb-4 font-bold tracking-widest">結帳</h3>
    <table class="w-full">
      <tr class="bg-[#FFF0E5] hidden lg:table-row">
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
      <tr class="border-b border-b[#c4c4c4]" v-for="cart in checkoutInfo.checkoutList" :key="cart.id">
        <td class="p-2 md:p-5">
          <div class="flex flex-col justify-start">
            <div class="flex items-center space-x-5">
              <img class="w-24 h-24" :src="cart.imgUrl" :alt="cart.title" />
              <div class="flex flex-col text-lg pt-1 lg:pt-0">
                <span>{{ cart.title }}</span>
                <span class="block lg:hidden">X{{ cart.quantity }}</span>
                <span class="text-[#FA5936] block lg:hidden">${{ cart.sale }}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="text-center text-lg hidden lg:table-cell">
          <span>X{{ cart.quantity }}</span>
        </td>
        <td class="text-center text-lg text-[#FA5936] hidden lg:table-cell">
          <span>${{ cart.sale }}</span>
        </td>
      </tr>
    </table>
    <table class="w-full">
      <tr class="border-b border-b-[#c4c4c4]">
        <div class="grid grid-cols-12 p-2 md:p-5">
          <div class="col-span-9 md:col-span-10">
            <div class="flex flex-col items-end">
              <div class="flex items-center">
                <span class="text-[#a3a3a3] text-sm">({{ totalQuantity }}件商品)</span>
                <span class="text-lg ml-3">商品小計</span>
              </div>
              <span class="text-lg">運費</span>
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 border-2 rounded-md cursor-pointer select-none" :class="{ 'border-[#a3a3a3]': !checkoutInfo.usePoint, 'border-[#FA5936]': checkoutInfo.usePoint }" @click.prevent="checkoutInfo.usePoint = !checkoutInfo.usePoint">
                  <label class="block relative w-full h-full cursor-pointer text-white duration-300 bg-white select-none scale-0" :class="{ 'bg-[#FA5936]': checkoutInfo.usePoint, 'border-[#FA5936]': checkoutInfo.usePoint, 'scale-100': checkoutInfo.usePoint }">
                    <input v-model="checkoutInfo.usePoint" type="checkbox" class="hidden appearance-none" id="pointCheckbox" />
                    <fa class="absolute text-sm top-1/2 left-1/2 -translate-x-1.5 -translate-y-1.5" icon="fa-solid fa-check"></fa>
                  </label>
                </div>
                <label class="text-lg select-none cursor-pointer" for="pointCheckbox">使用紅利金</label>
              </div>
              <button @click="openModal = true" class="w-full md:w-auto border-2 border-[#16a34a] rounded-xl p-3 flex items-center text-lg mt-4">
                <img class="mr-4" src="~/static/images/icon/coupon-green.svg" alt="優惠碼/折價券" />
                使用優惠碼/折價券
              </button>
            </div>
          </div>
          <div class="col-span-3 md:col-span-2 flex flex-col text-right">
            <span class="text-lg text-[#FA5936]">${{ cartPrice }}</span>
            <span class="text-lg text-[#FA5936]">$60</span>
            <div :class="{ 'pt-1': !checkoutInfo.usePoint, 'md:pt-0': !checkoutInfo.usePoint }">
              <span v-if="!checkoutInfo.usePoint" class="text-sm md:text-lg text-[#a3a3a3]">可用{{ checkoutInfo.point }}點</span>
              <span v-else class="text-lg text-[#FA5936]">-${{ checkoutInfo.point }}</span>
            </div>
            <span v-if="!checkoutInfo.useCoupon" class="text-lg text-[#a3a3a3] mt-7">0</span>
            <span v-else class="text-lg text-[#FA5936] mt-7">-{{ checkoutInfo.coupon }}</span>
          </div>
        </div>
      </tr>
      <tr>
        <div class="grid grid-cols-12 p-2 md:p-5">
          <div class="col-span-9 md:col-span-10 text-right">
            <span class="text-lg font-bold">訂單金額</span>
          </div>
          <div class="col-span-3 md:col-span-2 flex flex-col text-right">
            <span class="text-3xl font-bold text-[#FA5936]">{{ checkoutInfo.totalPrice }}</span>
          </div>
        </div>
      </tr>
    </table>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <h4 class="border-l-8 border-l-[#FA5936] pl-1 md:pl-4 text-lg font-bold">訂購人資料</h4>
      <form @submit.prevent="handleSubmit(submitCheckout)" class="mt-5">
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 px-6" for="name">姓名<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="姓名" rules="required" v-slot="{ errors }" class="w-full">
            <div class="w-full lg:w-1/2 relative px-6">
              <input id="name" type="text" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸姓名" v-model="checkoutInfo.name" />
              <span v-if="errors.length > 0" class="absolute left-10 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 px-6" for="phone">手機號碼<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="手機號碼" rules="required" v-slot="{ errors }" class="w-full">
            <div class="w-full lg:w-1/2 relative px-6">
              <input id="phone" type="tel" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸手機號碼" v-model="checkoutInfo.phone" />
              <span v-if="errors.length > 0" class="absolute left-10 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 px-6" for="email">信箱<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="信箱" rules="required|email" v-slot="{ errors }" class="w-full">
            <div class="w-full lg:w-1/2 relative px-6">
              <input id="email" type="tel" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸手機信箱" v-model="checkoutInfo.email" />
              <span v-if="errors.length > 0" class="absolute left-10 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 px-6" for="note">備註</label>
        <div class="form-group relative pb-6 px-6">
          <ValidationProvider name="備註" v-slot="{ errors }" class="w-full">
            <div class="w-full relative">
              <input id="note" type="tel" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 pt-2 pb-10 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="如有特殊需求，請填寫備註" v-model="checkoutInfo.note" />
            </div>
          </ValidationProvider>
        </div>
        <h4 class="border-l-8 border-l-[#FA5936] pl-1 md:pl-4 text-lg font-bold">寄送方式</h4>
        <div class="px-6 mt-6">
          <div class="form-group relative pb-6">
            <ValidationProvider name="寄送方式" rules="required" v-slot="{ errors }" class="w-full flex flex-col space-y-2">
              <label for="sevenInput" class="cursor-pointer hover:bg-[#e7e7e7] relative bg-[#f3f3f3] text-lg py-3 px-8 rounded-md" :class="{ 'border-[#ff4444]': errors.length > 0, border: errors.length > 0 }">
                7-11
                <img class="duration-300 absolute right-6 top-1/2 -translate-y-3 scale-0" :class="{ 'scale-100': checkoutInfo.deliveryType === 'seven' }" src="~/static/images/icon/check.svg" alt="check" />
              </label>
              <input id="sevenInput" type="radio" class="hidden" v-model="checkoutInfo.deliveryType" value="seven" />
              <div class="max-h-0 duration-300 overflow-hidden flex flex-col" :class="{ 'max-h-64': checkoutInfo.deliveryType === 'seven' }">
                <div class="flex items-center relative my-3" v-for="(item, idx) in checkoutInfo.sevenStore" :key="idx">
                  <ValidationProvider class="relative" v-if="checkoutInfo.deliveryType === 'seven'" name="地址" rules="required" v-slot="{ errors }">
                    <div class="absolute w-5 h-5 left-0 top-1/2 -translate-y-3 rounded-full border border-[#c4c4c4] flex justify-center items-center">
                      <div class="w-4 h-4 duration-300 rounded-full bg-[#FA5936] scale-0" :class="{ 'scale-100': item.address === checkoutInfo.deliveryAddress }"></div>
                    </div>
                    <label :for="item.address" class="pl-6 cursor-pointer"> {{ item.name }} {{ item.address }} </label>
                    <input class="hidden" v-model="checkoutInfo.deliveryAddress" type="radio" :id="item.address" :value="item.address" />
                    <span v-if="errors.length > 0" class="absolute left-6 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <button type="button" class="rounded-xl duration-300 w-32 py-2 px-5 my-3 bg-white hover:bg-[#FA5936] hover:text-white border-2 border-[#FA5936] tracking-widest opacity-0" :class="{ 'opacity-100': checkoutInfo.deliveryType === 'seven' }">+新增地址</button>
              </div>
              <label for="familyInput" class="cursor-pointer hover:bg-[#e7e7e7] relative bg-[#f3f3f3] text-lg py-3 px-8 rounded-md" :class="{ 'border-[#ff4444]': errors.length > 0, border: errors.length > 0 }">
                全家
                <img class="duration-300 absolute right-6 top-1/2 -translate-y-3 scale-0" :class="{ 'scale-100': checkoutInfo.deliveryType === 'family' }" src="~/static/images/icon/check.svg" alt="check" />
              </label>
              <input id="familyInput" type="radio" class="hidden" v-model="checkoutInfo.deliveryType" value="family" />
              <div class="max-h-0 duration-300 overflow-hidden" :class="{ 'max-h-64': checkoutInfo.deliveryType === 'family' }">
                <div class="flex items-center relative my-3" v-for="(item, idx) in checkoutInfo.familyStore" :key="idx">
                  <ValidationProvider class="relative" v-if="checkoutInfo.deliveryType === 'family'" name="地址" rules="required" v-slot="{ errors }">
                    <div class="absolute w-5 h-5 left-0 top-1/2 -translate-y-3 rounded-full border border-[#c4c4c4] flex justify-center items-center">
                      <div class="w-4 h-4 duration-300 rounded-full bg-[#FA5936] scale-0" :class="{ 'scale-100': item.address === checkoutInfo.deliveryAddress }"></div>
                    </div>
                    <label :for="item.address" class="pl-6 cursor-pointer"> {{ item.name }} {{ item.address }} </label>
                    <input class="hidden" v-model="checkoutInfo.deliveryAddress" type="radio" :id="item.address" :value="item.address" />
                    <span v-if="errors.length > 0" class="absolute left-6 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <button type="button" class="rounded-xl duration-300 w-32 py-2 px-5 bg-white hover:bg-[#FA5936] hover:text-white border-2 border-[#FA5936] tracking-widest opacity-0" :class="{ 'opacity-100': checkoutInfo.deliveryType === 'family' }">+新增地址</button>
              </div>
              <label for="deliveryInput" class="cursor-pointer hover:bg-[#e7e7e7] relative bg-[#f3f3f3] text-lg py-3 px-8 rounded-md" :class="{ 'border-[#ff4444]': errors.length > 0, border: errors.length > 0 }">
                宅配
                <img class="duration-300 absolute right-6 top-1/2 -translate-y-3 scale-0" :class="{ 'scale-100': checkoutInfo.deliveryType === 'home' }" src="~/static/images/icon/check.svg" alt="check" />
              </label>
              <input id="deliveryInput" type="radio" class="hidden" v-model="checkoutInfo.deliveryType" value="home" />
              <div class="max-h-0 duration-300 overflow-hidden" :class="{ 'max-h-64': checkoutInfo.deliveryType === 'home' }">
                <div class="flex items-center relative my-3" v-for="(item, idx) in checkoutInfo.home" :key="idx">
                  <ValidationProvider class="relative" v-if="checkoutInfo.deliveryType === 'home'" name="地址" rules="required" v-slot="{ errors }">
                    <div class="absolute w-5 h-5 left-0 top-1/2 -translate-y-3 rounded-full border border-[#c4c4c4] flex justify-center items-center">
                      <div class="w-4 h-4 duration-300 rounded-full bg-[#FA5936] scale-0" :class="{ 'scale-100': item.address === checkoutInfo.deliveryAddress }"></div>
                    </div>
                    <label :for="item.address" class="pl-6 cursor-pointer">
                      {{ item.address }}
                    </label>
                    <input class="hidden" v-model="checkoutInfo.deliveryAddress" type="radio" :id="item.address" :value="item.address" />
                    <span v-if="errors.length > 0" class="absolute left-6 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <button type="button" class="rounded-xl duration-300 w-32 py-2 px-5 bg-white hover:bg-[#FA5936] hover:text-white border-2 border-[#FA5936] tracking-widest opacity-0" :class="{ 'opacity-100': checkoutInfo.deliveryType === 'home' }">+新增地址</button>
              </div>
              <span v-if="errors.length > 0" class="absolute left-5 -bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>

        <div class="flex justify-center">
          <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-3.5 px-20 rounded-xl shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80">確認結帳</button>
        </div>
      </form>
    </ValidationObserver>

    <Modal :openModal="openModal" :width="'w-11/12 lg:w-7/12'" @closeModal="closeModal">
      <div class="p-0 lg:px-5 lg:py-0">
        <h4 class="text-2xl font-bold mb-6">使用優惠碼</h4>
        <div class="relative w-full lg:w-1/2">
          <input type="text" ref="addCouponInput" v-model="addCouponInput" @keyup.enter="handleAddCoupon()" class="focus:ring-1 focus:ring-[#FA5936] focus:outline-none border w-full border-[#c4c4c4] rounded-xl p-3" placeholder="請輸入優惠碼" />
          <button @click="handleAddCoupon()" data-mdb-ripple="true" data-mdb-ripple-color="light" class="duration-300 absolute flex justify-center cursor-pointer items-center w-3/12 h-full top-0 right-0 rounded-tr-xl rounded-br-xl bg-[#FA5936] hover:bg-[#f15734]">
            <span class="text-white">新增</span>
          </button>
        </div>
        <h4 class="text-2xl font-bold mt-10">我的折價券</h4>
        <div class="mt-5" v-if="tickets.length > 0">
          <transition-group tag="div" name="fade">
            <Ticket class="cursor-pointer" v-for="ticket in tickets" :key="ticket.id" @openCouponDetail="openCouponDetail" :id="ticket.id" :type="ticket.type" :name="ticket.name" :time="ticket.time" :rules="ticket.rules" :countOff="ticket.countOff" :page="'checkout'" :isCanUse="ticket.isCanUse" :selectedId="selectedId" @click.native="selectCoupon(ticket.id, ticket.isCanUse)" />
          </transition-group>
        </div>
        <div v-else class="flex justify-center items-center flex-col w-full h-60">
          <fa class="w-24 h-20 text-[#a3a3a3]" :icon="['fas', 'ticket']" />
          <span class="text-lg text-[#a3a3a3] select-none"> 目前無優惠券 </span>
        </div>
      </div>
      <div class="flex justify-center">
        <button @click="handleUseCoupon()" data-mdb-ripple="true" data-mdb-ripple-color="light" class="my-2 duration-150 px-24 py-4 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80">確認</button>
      </div>
    </Modal>
  </section>
</template>

<script>
export default {
  name: "cart-checkout",
  data() {
    return {
      checkoutInfo: {
        name: "",
        phone: "",
        email: "",
        note: "",
        sevenStore: [
          {
            name: "7-11大興門市",
            address: "241新北市三重區仁華街80巷27號",
          },
          {
            name: "7-11大興門市2",
            address: "241新北市三重區仁華街80巷28號",
          },
        ],
        familyStore: [
          {
            name: "全家正隆店",
            address: "220新北市板橋區三民路二段正隆巷34號",
          },
        ],
        home: [
          {
            address: "台北市大安區大安森林公園",
          },
        ],
        deliveryAddress: "",
        deliveryType: "",
        paymentType: "",
        usePoint: false,
        point: 110,
        useCoupon: false,
        coupon: 150,
        totalPrice: 1840,
        checkoutList: [
          {
            id: 1,
            imgUrl: require("~/static/images/product_example.png"),
            title: "縱谷間的茶・經典有機紅烏龍",
            quantity: 1,
            sale: 890,
          },
          {
            id: 2,
            imgUrl: require("~/static/images/product_example.png"),
            title: "縱谷間的茶・經典有機紅烏龍2",
            quantity: 3,
            sale: 790,
          },
        ],
      },
      // 物流
      sendList: [
        { id: 1, label: "7-11", value: "711", enable: true, options: [] },
        { id: 2, label: "全家", value: "family", enable: false, options: [] },
        { id: 3, label: "宅配", value: "home", enable: false, options: [] },
      ],

      tickets: [
        {
          id: 1,
          type: "cash",
          countOff: 150,
          name: "首購折價券",
          time: "2021/01/20-2022/04/01",
          rules: ["說明說明說明"],
          isCanUse: true,
        },
        {
          id: 2,
          type: "discount",
          countOff: 95,
          name: "周年慶折價券",
          time: "2021/01/20-2022/04/01",
          rules: ["說明說明說明"],
          isCanUse: true,
        },
        {
          id: 3,
          type: "cash",
          countOff: 200,
          name: "生日折價券",
          time: "2021/01/20-2022/04/01",
          rules: ["說明說明說明"],
          isCanUse: false,
        },
      ],
      selectedId: 0,
      openModal: false,
      openCouponDetailModal: false,
      addCouponInput: "",
    };
  },
  computed: {
    totalQuantity() {
      let total = 0;
      this.checkoutInfo.checkoutList.forEach((item) => {
        total += item.quantity;
      });
      return total;
    },
    cartPrice() {
      let total = 0;
      this.checkoutInfo.checkoutList.forEach((item) => {
        total += item.sale * item.quantity;
      });
      return total;
    },
  },
  methods: {
    closeModal() {
      this.openModal = false;
    },
    selectCoupon(id, isCanUse) {
      if (!isCanUse) return;
      this.selectedId === id ? (this.selectedId = 0) : (this.selectedId = id);
    },
    openCouponDetail() {
      this.openCouponDetailModal = true;
    },
    handleUseCoupon() {
      if (this.selectedId !== 0) {
        this.checkoutInfo.useCoupon = true;
      } else {
        this.checkoutInfo.useCoupon = false;
      }
      this.closeModal();
    },
    handleAddCoupon() {
      this.addCouponInput = this.addCouponInput.trim();
      if (!this.addCouponInput) return;
      this.$swal.fire({
        icon: "success",
        title: "新增優惠券成功",
        timer: 1000,
        showConfirmButton: false,
      });
      const ticket = {
        id: Math.floor(Date.now()),
        type: "cash",
        countOff: 299,
        name: "新增的折價券",
        time: "2021/01/20-2022/04/01",
        rules: ["新增的Ticket"],
        isCanUse: true,
      };
      this.tickets.push(ticket);
      this.addCouponInput = "";
      this.$refs.addCouponInput.blur();
    },
    submitCheckout() {
      console.log("送出結帳");
    },
  },
};
</script>
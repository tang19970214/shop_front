<template>
  <section class="w-full">
    <div v-if="order.status !== '已取消'" class="w-full py-4 px-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <nuxt-link class="block" to="/member/order"><fa class="w-4 mr-5" :icon="['fa-solid', 'fa-angle-left']" />回上一頁</nuxt-link>
    </div>
    <div v-if="order.status !== '已取消'" class="w-full py-3 px-4 bg-[#FFF0E6] mt-6 text-lg">
      <span>
        日期：
        <span class="tracking-wide lg:tracking-normal">
          {{ order.time }}
        </span>
      </span>
      <span class="lg:ml-16 block lg:inline">
        訂單編號：
        <span class="tracking-wide lg:tracking-normal">
          {{ order.id }}
        </span>
      </span>
    </div>

    <!-- STEP BAR -->
    <div v-if="order.status !== '已取消'" class="w-full flex overflow-x-scroll md:overflow-hidden flex-nowrap">
      <ul class="flex mt-8 mb-20 min-w-[210%] md:min-w-full">
        <li class="w-1/5 flex flex-col flex-none items-center relative after:content-[''] after:absolute after:bg-[#1ebe5a] after:w-full after:h-1 after:-right-1/2 after:top-1/2 after:z-[-1]">
          <div class="w-[70px] h-[70px] bg-[#1ebe5a] rounded-full relative after:content-[''] after:absolute after:w-full after:h-full after:bg-[url(~/static/images/icon/step1.svg)] after:bg-no-repeat after:top-3.5 after:left-3.5"></div>
          <p class="absolute text-center -bottom-8">訂單已成立</p>
          <p class="absolute text-center -bottom-14 text-[#A3A3A3]">2022-02-02 12:32</p>
        </li>
        <li class="w-1/5 flex flex-col flex-none items-center relative after:content-[''] after:absolute after:bg-[#1ebe5a] after:w-full after:h-1 after:-right-1/2 after:top-1/2 after:z-[-1]">
          <div class="w-[70px] h-[70px] border-4 border-[#1ebe5a] rounded-full bg-white relative after:content-[''] after:absolute after:w-full after:h-full after:bg-[url(~/static/images/icon/step2.svg)] after:bg-no-repeat after:top-3.5 after:left-3.5"></div>
          <p class="absolute text-center -bottom-8">訂單已付款</p>
        </li>
        <li class="w-1/5 flex flex-col flex-none items-center relative after:content-[''] after:absolute after:bg-[#1ebe5a] after:w-full after:h-1 after:-right-1/2 after:top-1/2 after:z-[-1]">
          <div class="w-[70px] h-[70px] border-4 border-[#1ebe5a] rounded-full bg-white relative after:content-[''] after:absolute after:w-full after:h-full after:bg-[url(~/static/images/icon/step3.svg)] after:bg-no-repeat after:top-3.5 after:left-3.5"></div>
          <p class="absolute text-center -bottom-8">訂單已出貨</p>
        </li>
        <li class="w-1/5 flex flex-col flex-none items-center relative after:content-[''] after:absolute after:bg-[#1ebe5a] after:w-full after:h-1 after:-right-1/2 after:top-1/2 after:z-[-1]">
          <div class="w-[70px] h-[70px] border-4 border-[#1ebe5a] rounded-full bg-white relative after:content-[''] after:absolute after:w-full after:h-full after:bg-[url(~/static/images/icon/step4.svg)] after:bg-no-repeat after:top-3.5 after:left-3.5"></div>
          <p class="absolute text-center -bottom-8">待收貨</p>
        </li>
        <li class="w-1/5 flex flex-col flex-none items-center relative">
          <div class="w-[70px] h-[70px] border-4 border-[#1ebe5a] rounded-full bg-white relative after:content-[''] after:absolute after:w-full after:h-full after:bg-[url(~/static/images/icon/step5.svg)] after:bg-no-repeat after:top-3.5 after:left-3.5"></div>
          <p class="absolute text-center -bottom-8">待評價</p>
        </li>
      </ul>
    </div>
    
    <div v-else class="w-full bg-[#FFF5C2] p-5 text-center">
      <div class="flex justify-center">
        <p class="font-bold text-2xl">訂單已取消</p>
        <div class="w-8 h-8 rounded-full border-4 border-[#13823b] ml-2 flex items-center justify-center">
          <fa class="text-[#13823b]" :icon="['fa-solid', 'fa-check']" />
        </div>
      </div>
      <p class="text-lg text-[#404040]">訂單編號：{{ order.id }}</p>
    </div>
    
    <table class="w-full mt-6">
      
      <!-- 商品列表 -->
      <tr v-for="list in order.orderItems" :key="list.id" class="border-b border-b-[#c4c4c4]">
        <td class="p-4">
          <div class="flex md:items-center space-x-5">
            <img class="h-24 w-24" :src="list.imgUrl" :alt="list.title">
            <div class="flex flex-col space-y-2 text-lg">
              <h3>{{ list.title }}</h3>
              <span class="block md:hidden">X{{ list.quantity }}</span>
              <span class="text-[#FA5936] block md:hidden">${{ list.sale }}</span>
            </div>
          </div>
        </td>
        <td class="text-right md:w-4/12 xl:w-3/12 hidden md:table-cell">
          <span>X{{ list.quantity }}</span>
        </td>
        <td class="text-right md:w-3/12 xl:w-2/12 pr-5 hidden md:table-cell">
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

    <!-- 訂購人資料 -->
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
              <span>
                物流編號
                <span id="transportId">{{ order.transportId }}</span></span
              >
              <img @click="copyId()" class="inline cursor-pointer ml-1 mr-6" src="~/static/images/icon/copy.svg" alt="複製物流編號" title="複製物流編號" />
              <transition name="fade">
                <div v-if="copyMessageIsShow" class="absolute top-10 rounded-xl p-2.5 right-0 md:right-1/4 bg-[rgba(0,0,0,0.27)] backdrop-blur-3 text-white">已複製到剪貼簿</div>
              </transition>
              <button data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-1.5 px-5 duration-300 bg-[#1ebe5a] hover:bg-[#1aa54f] text-white text-sm rounded-sm mt-2.5 lg:mt-0">訂單查詢</button>
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

    <!-- 取消訂單按鈕 -->
    <div class="flex justify-center">
      <button
        v-if="order.status !== '已取消'"
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        class="mt-16 duration-150 w-60 py-4 rounded-xl shadow-md text-white text-lg tracking-widest hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80"
        :class="{
          'bg-[#a3a3a3]': order.status === '已出貨',
          'bg-gradient-to-r from-[#FF6D3F] to-[#FA5936]': order.status !== '已出貨',
        }"
        :disabled="order.status === '已出貨'"
        @click="isOpen = true"
      >
        取消訂單
      </button>
      <button v-else type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" class="bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] mt-16 duration-150 w-60 py-4 rounded-xl shadow-md text-white text-lg tracking-widest hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80">繼續購物 >></button>
    </div>

    <!-- 取消訂單彈出視窗 -->
    <Modal :openModal="isOpen" :width="'w-11/12 lg:w-1/2'" @closeModal="closeModal">
      <div class="flex flex-col items-center">
        <div class="flex">
          <h3 class="text-2xl font-bold mb-8">訂單已取消</h3>
          <div class="ml-4 flex justify-center w-8 h-8 items-center rounded-full border-2 border-[#16A34A]">
            <fa class="text-sm text-[#16A34A] font-bold" icon="fa-sold fa-check" />
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm lg:text-lg">取消原因：</span>
          <div class="w-60 relative after:absolute after:pointer-events-none after:w-6 after:h-full after:content-[''] after:top-4 after:right-3 after:bg-[url(~/static/images/icon/arrow-bottom.svg)] after:bg-no-repeat">
            <select v-model="cancelType" name="" class="appearance-none py-2.5 px-4 w-full rounded-md border border-[#a3a3a3]" :class="{ 'text-slate-400': cancelType === '','text-slate-900': cancelType !== '' }">
              <option value="" disabled selected>請選擇</option>
              <option :value="item" v-for="item in cancelOrderSelect" :key="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <button @click="cancelOrder()" data-mdb-ripple="true" data-mdb-ripple-color="light" class="duration-150 mt-16 mb-14 w-60 py-3.5 px-2 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80">確認</button>
      </div>
    </Modal>
  </section>
</template>
<script>
export default {
  name: "member-order-id",
  data() {
    return {
      order: {
        id: 21111708328107,
        time: "2021/01/28",
        status: "已付款",
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
        transportId: "R1045667234456",
        paymentType: "信用卡一次付清",
        paymentAccount: "中國信託 **** 1234",
      },
      cancelOrderSelect: ["訂單內容有誤", "未選到折扣券", "出貨時間太長", "其他"],
      cancelType: "",
      isOpen: false,
      copyMessageIsShow: false,
    };
  },
  computed: {
    totalQuantity() {
      let total = 0
      this.order.orderItems.forEach((item) => {
        total += item.quantity
      })
      return total
    }
  },
  methods: {
    copyId() {
      const range = document.createRange();
      const copyString = document.querySelector("#transportId");
      range.selectNode(copyString);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
      this.copyMessageIsShow = true;
      setTimeout(() => {
        this.copyMessageIsShow = false;
      }, 1000);
    },
    closeModal() {
      this.cancelType = "";
      this.isOpen = false;
    },
    closeAlert(e) {
      const classList = Array.from(e.target.classList);
      if (classList.indexOf("bg-[rgba(0,0,0,0.3)]") !== -1) {
        this.isOpen = false;
      }
    },
    cancelOrder() {
      if (this.order.status !== "已出貨") {
        if (!this.cancelType) {
          this.$swal.fire({
            icon: "error",
            title: "請選擇取消原因",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          this.closeModal();
          this.cancelType = "";
          this.isOpen = false;
          this.$swal.fire({
            icon: "success",
            title: "取消訂單成功",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      } else {
        this.$swal.fire({
          icon: "error",
          title: "此訂單已出貨，無法取消訂單",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    },
  },
};
</script>

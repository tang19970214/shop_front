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
    <table class="w-full">
      <tr class="border-b-[#c4c4c4] border-b text-lg" v-for="order in order.orderItems" :key="order.id">
        <td class="p-4">
          <div class="grid grid-cols-5">
            <div class="col-span-5 lg:col-span-4">
              <div class="flex lg:items-center">
                <img class="w-24 h-24" :src="order.imgUrl" :alt="order.title" />
                <div class="flex flex-col lg:inline ml-7 space-y-2.5 lg:space-y-0">
                  <span>
                    {{ order.title }}
                  </span>
                  <p class="block lg:hidden">X{{ order.quantity }}</p>
                  <span class="text-[#FA5936] block lg:hidden"> ${{ order.sale }} </span>
                </div>
                <div class="flex items-center justify-between ml-auto">
                  <span class="hidden lg:inline"> X{{ order.quantity }} </span>
                </div>
              </div>
            </div>
            <div class="col-span-1 hidden items-center justify-end lg:flex">
              <span class="text-[#FA5936]"> ${{ order.sale }} </span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table class="w-full">
      <tr class="border-b-[#c4c4c4] border-b text-lg w-full text-right">
        <td class="space-y-2.5 p-4">
          <div class="grid grid-cols-6 w-full">
            <div class="col-span-4 lg:col-span-5 flex flex-col items-end space-y-2.5">
              <p>
                <span class="text-sm text-[#c4c4c4] mr-2.5">({{ order.orderItems.length }}件商品)</span>商品小計
              </p>
              <p>運費</p>
              <div class="flex justify-end">
                <div class="w-6 h-6 flex justify-center items-center rounded-sm bg-[#A3A3A3] mr-2.5">
                  <img src="~/static/images/icon/point.svg" alt="紅利金" />
                </div>
                <p>使用紅利金</p>
              </div>
              <div class="flex justify-end w-full">
                <div class="hidden lg:flex">
                  <img class="mr-2.5" src="~/static/images/icon/coupon.svg" alt="優惠碼/折價券" />
                  <p>使用優惠碼/折價券</p>
                </div>
                <div class="block lg:hidden w-full">
                  <button class="flex justify-center items-center border border-[#319253] rounded-xl p-2.5 px-1 w-[calc(100%+15px)] -ml-4">
                    <img class="mr-2.5" src="~/static/images/icon/coupon-green.svg" alt="優惠碼/折價券" />
                    使用優惠碼/折價券
                  </button>
                </div>
              </div>
            </div>
            <div class="col-span-2 lg:col-span-1 space-y-2.5">
              <p class="text-[#FA5936]">${{ order.price }}</p>
              <p class="text-[#FA5936]">${{ order.transportPrice }}</p>
              <p class="text-[#FA5936]"><span class="text-sm">-</span> ${{ order.point }}</p>
              <p class="text-[#FA5936] pt-3 lg:pt-0"><span class="text-sm">-</span> ${{ order.coupon }}</p>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-right p-4">
          <div class="grid grid-cols-5">
            <div class="col-span-3 lg:col-span-4 flex items-center justify-end">
              <span class="font-bold text-lg">訂單金額</span>
            </div>
            <div class="col-span-2 lg:col-span-1">
              <span class="font-bold text-3xl text-[#fa5936]">${{ order.total }}</span>
            </div>
          </div>
        </td>
      </tr>
    </table>
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
              <img @click="copyId()" class="inline cursor-pointer ml-1 mr-6" src="~/static/images/icon/copy.svg" alt="" title="複製物流編號" />
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
        price: 12000,
        total: 11800,
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
            quantity: 1,
            sale: 6000,
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

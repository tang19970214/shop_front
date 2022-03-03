<template>
  <section class="w-full">
    <h2 class="text-[18px] mb-[16px] font-bold tracking-[0.105em]">我的訂單</h2>
    <div class="w-full py-[15px] px-[23px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <nuxt-link class="block" to="/member/order"><fa class="w-4 mr-[19px]" :icon="['fa-solid', 'fa-angle-left']" />回上一頁</nuxt-link>
    </div>
    <div class="w-full py-[12px] px-[17px] bg-[#FFF0E6] mt-[24px] text-[18px]">
      <span>
        日期：
        <span class="tracking-[3px] lg:tracking-[0px]">
          {{ order.time }}
        </span>
      </span>
      <span class="lg:ml-[60px] block lg:inline">
        訂單編號：
        <span class="tracking-[3px] lg:tracking-[0px]">
          {{ order.id }}
        </span>
      </span>
    </div>
    <div class="w-[100%] flex overflow-x-scroll md:overflow-hidden flex-nowrap">
      <ul class="flex mt-[33px] mb-[80px] min-w-[210%] md:min-w-[100%]">
        <li class="w-[20%] flex flex-col flex-none items-center relative after:content-[''] after:absolute after:bg-[#1ebe5a] after:w-[100%] after:h-[4px] after:right-[-50%] after:top-[50%] after:z-[-1]">
          <div class="w-[70px] h-[70px] bg-[#1ebe5a] rounded-full relative after:content-[''] after:absolute after:w-[100%] after:h-[100%] after:bg-[url(~/static/images/icon/step1.svg)] after:bg-no-repeat after:top-[14px] after:left-[14px]">
          </div>
          <p class="absolute text-center bottom-[-30px]">
            訂單已成立
          </p>
          <p class="absolute text-center bottom-[-55px] text-[#A3A3A3]">
            2022-02-02 12:32
          </p>
        </li>
        <li class="w-[20%] flex flex-col flex-none items-center relative after:content-[''] after:absolute after:bg-[#1ebe5a] after:w-[100%] after:h-[4px] after:right-[-50%] after:top-[50%] after:z-[-1]">
          <div class="w-[70px] h-[70px] border-[4px] border-[#1ebe5a] rounded-full bg-white relative after:content-[''] after:absolute after:w-[100%] after:h-[100%] after:bg-[url(~/static/images/icon/step2.svg)] after:bg-no-repeat after:top-[14px] after:left-[14px]">
          </div>
          <p class="absolute text-center bottom-[-30px]">
            訂單已付款
          </p>
        </li>
        <li class="w-[20%] flex flex-col flex-none items-center relative after:content-[''] after:absolute after:bg-[#1ebe5a] after:w-[100%] after:h-[4px] after:right-[-50%] after:top-[50%] after:z-[-1]">
          <div class="w-[70px] h-[70px] border-[4px] border-[#1ebe5a] rounded-full bg-white relative after:content-[''] after:absolute after:w-[100%] after:h-[100%] after:bg-[url(~/static/images/icon/step3.svg)] after:bg-no-repeat after:top-[14px] after:left-[14px]">
          </div>
          <p class="absolute text-center bottom-[-30px]">
            訂單已出貨
          </p>
        </li>
        <li class="w-[20%] flex flex-col flex-none items-center relative after:content-[''] after:absolute after:bg-[#1ebe5a] after:w-[100%] after:h-[4px] after:right-[-50%] after:top-[50%] after:z-[-1]">
          <div class="w-[70px] h-[70px] border-[4px] border-[#1ebe5a] rounded-full bg-white relative after:content-[''] after:absolute after:w-[100%] after:h-[100%] after:bg-[url(~/static/images/icon/step4.svg)] after:bg-no-repeat after:top-[14px] after:left-[14px]">
          </div>
          <p class="absolute text-center bottom-[-30px]">
            待收貨
          </p>
        </li>
        <li class="w-[20%] flex flex-col flex-none items-center relative">
          <div class="w-[70px] h-[70px] border-[4px] border-[#1ebe5a] rounded-full bg-white relative after:content-[''] after:absolute after:w-[100%] after:h-[100%] after:bg-[url(~/static/images/icon/step5.svg)] after:bg-no-repeat after:top-[14px] after:left-[14px]">
          </div>
          <p class="absolute text-center bottom-[-30px]">
            待評價
          </p>
        </li>
      </ul>
    </div>
    <table class="w-full">
      <tr class="border-b-[#c4c4c4] border-b-[1px] text-[18px]" v-for="(order) in order.orderItems" :key="order.id">
        <td class="p-[15px]">
          <div class="grid grid-cols-5">
            <div class="col-span-5 lg:col-span-4">
              <div class="flex lg:items-center">
                <img class="w-[100px] h-[100px]" :src="order.imgUrl" :alt="order.title">
                <div class="flex flex-col lg:inline ml-[28px] space-y-[10px] lg:space-y-0">
                  <span>
                    {{ order.title }}
                  </span>
                  <p class="block lg:hidden">
                    X{{ order.quantity }}
                  </p>
                  <span class="text-[#FA5936] block lg:hidden">
                    ${{ order.sale }}
                  </span>
                </div>
                <div class="flex items-center justify-between ml-auto">
                  <span class="hidden lg:inline">
                    X{{ order.quantity }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-span-1 hidden items-center justify-end lg:flex">
              <span class="text-[#FA5936]">
                ${{ order.sale }}
              </span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table class="w-full">
      <tr class="border-b-[#c4c4c4] border-b-[1px] text-[18px] w-full text-right">
        <td class="space-y-[10px] p-[15px]">
          <div class="grid grid-cols-6 w-full">
            <div class="col-span-4 lg:col-span-5 flex flex-col items-end space-y-[10px]">
              <p><span class="text-[14px] text-[#c4c4c4] mr-[10px]">({{ order.orderItems.length }}件商品)</span>商品小計</p>
              <p>運費</p>
              <div class="flex justify-end">
                <div class="w-[24px] h-[24px] flex justify-center items-center rounded-[5px] bg-[#A3A3A3] mr-[10px]">
                  <img src="~/static/images/icon/point.svg" alt="紅利金">
                </div>
                <p>使用紅利金</p>
              </div>
              <div class="flex justify-end w-full">
                <div class="hidden lg:flex">
                  <img class="mr-[10px]" src="~/static/images/icon/coupon.svg" alt="優惠碼/折價券">
                  <p>使用優惠碼/折價券</p>
                </div>
                <div class="block lg:hidden w-full">
                  <button class="flex justify-center items-center border-[1px] border-[#319253] rounded-[10px] p-[10px] px-[5px] w-[calc(100%+15px)] ml-[-15px]">
                    <img class="mr-[10px]" src="~/static/images/icon/coupon-green.svg" alt="優惠碼/折價券">
                    使用優惠碼/折價券
                  </button>
                </div>
              </div>
            </div>
            <div class="col-span-2 lg:col-span-1 space-y-[10px]">
              <p class="text-[#FA5936]">${{ order.price }}</p>
              <p class="text-[#FA5936]">${{ order.transportPrice }}</p>
              <p class="text-[#FA5936]"> <span class="text-[14px]">-</span> ${{ order.point }}</p>
              <p class="text-[#FA5936] pt-[10px] lg:pt-[0px]"> <span class="text-[14px]">-</span> ${{ order.coupon }}</p>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-right p-[15px]">
          <div class="grid grid-cols-5">
            <div class="col-span-3 lg:col-span-4 flex items-center justify-end">
              <span class="font-bold text-[18px]">訂單金額</span>
            </div>
            <div class="col-span-2 lg:col-span-1">
              <span class="font-bold text-[32px] text-[#fa5936]">${{ order.total }}</span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="mt-[43px] text-[18px]">
      <h3 class="font-bold border-l-[8px] border-l-[#fa5936] pl-[18px]">訂購人資料</h3>
      <div class="pl-[26px] space-y-[10px] mt-[15px]">
        <p>姓名: {{ order.name }}</p>
        <p>手機號碼: {{ order.phone }}</p>
        <p>信箱: {{ order.email }}</p>
        <p>
          備註:
          <span v-if="order.note !== ''">{{ order.note }}</span>
          <span v-else>無</span>
        </p>
      </div>
      <h3 class="font-bold border-l-[8px] border-l-[#fa5936] pl-[18px] mt-[30px]">寄送方式</h3>
      <div class="pl-[26px] space-y-[10px] mt-[15px]">
        <div class="flex">
          <div class="w-[23px] h-[23px] rounded-full bg-transparent border-[1px] border-[#a3a3a3] relative flex justify-center items-center mt-[2px] mr-[20px]">
            <div class="absolute w-[18px] h-[18px] bg-[#a3a3a3] rounded-full"></div>
          </div>
          <div class="flex flex-col">
            <p> {{ order.transportType }} </p>
            <div class="relative block lg:flex lg:items-center mt-[10px]">
              <span> 物流編號 <span id="transportId">{{ order.transportId }}</span></span>
              <img @click="copyId()" class="inline cursor-pointer ml-[4px] mr-[22px]" src="~/static/images/icon/copy.svg" alt="" title="複製物流編號">
              <transition name="fade">
                <div v-if="copyMessageIsShow" class="absolute top-[40px] rounded-[10px] p-[10px] right-[0%] md:right-[25%] bg-[rgba(0,0,0,0.27)] backdrop-blur-[10px] text-white">已複製到剪貼簿</div>
              </transition>
              <button data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-[6px] px-[20px] duration-300 bg-[#1ebe5a] hover:bg-[#1aa54f] text-white text-[14px] rounded-[5px] mt-[10px] lg:mt-[0px]">訂單查詢</button>
            </div>
          </div>
        </div>
      </div>
      <h3 class="font-bold border-l-[8px] border-l-[#fa5936] pl-[18px] mt-[30px]">付款方式</h3>
      <div class="pl-[26px] space-y-[10px] mt-[15px]">
        <div class="flex">
          <div class="w-[23px] h-[23px] rounded-full bg-transparent border-[1px] border-[#a3a3a3] relative flex justify-center items-center mt-[2px] mr-[20px]">
            <div class="absolute w-[18px] h-[18px] bg-[#a3a3a3] rounded-full"></div>
          </div>
          <div class="flex flex-col md:flex-row">
            <span>{{ order.paymentType }}</span>
            <span class="text-[#a3a3a3] md:ml-[11px]">{{ order.paymentAccount }}</span>
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
      class="mt-[62px] duration-150 w-[236px] py-[17px] rounded-[10px] shadow-md text-white text-[18px] tracking-widest hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80"
      :class="{
        'bg-[#a3a3a3]': order.status === '已出貨',
        'bg-gradient-to-r': order.status !== '已出貨',
        'from-[#FF6D3F]': order.status !== '已出貨',
        'to-[#FA5936]': order.status !== '已出貨'
      }"
      :disabled="order.status === '已出貨'"
      >
      取消訂單
      </button>
    </div>
  </section>
</template>
<script>
export default {
  name: "member-order-id",
  data() {
    return {
      order: {
        id: 21111708328107,
        time: '2021/01/28',
        status: '已出貨',
        price: 12000,
        total: 11800,
        transportPrice: 60,
        point: 110,
        coupon: 150,
        orderItems: [
          {
            id: 1,
            imgUrl: require("~/static/images/product_example.png"),
            title: '春季的初戀微甜｜金牌紅烏龍禮盒',
            quantity: 1,
            sale: 6000
          },
          {
            id: 2,
            imgUrl: require("~/static/images/product_example.png"),
            title: '春季的初戀微甜｜金牌紅烏龍禮盒',
            quantity: 1,
            sale: 6000
          },
        ],
        name: '陳OO',
        phone: '0912345678',
        email: 'user123@example.com',
        note: '',
        transportType: '全家正隆店 220新北市板橋區三民路二段正隆巷34號',
        transportId: 'R1045667234456',
        paymentType: '信用卡一次付清',
        paymentAccount: '中國信託 **** 1234'
      },
      copyMessageIsShow: false
    }
  },
  methods: {
    copyId() {
      const range = document.createRange()
      const copyString = document.querySelector('#transportId')
      range.selectNode(copyString)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      selection.removeAllRanges()
      this.copyMessageIsShow = true
      setTimeout(() => {
        this.copyMessageIsShow = false
      }, 1000)
    }
  }
}
</script>

<template>
  <section class="w-full lg:px-12">
    <h2 class="text-lg mb-4 font-bold tracking-widest">我的訂單</h2>

    <form @submit.prevent="handleSearch()">
      <div class="xl:flex items-center">
        <span class="block my-2.5 xl:inline lg:items-center xl:my-0">日期：</span>
        <div class="flex items-center lg:mr-auto">
          <input type="date" class="border border-[#c4c4c4] rounded-md px-2 py-1" />
          <span class="mx-1.5">至</span>
          <input type="date" class="border border-[#c4c4c4] rounded-md px-2 py-1" />
        </div>
        <div class="xl:flex">
          <span class="block my-2.5 xl:flex xl:items-center xl:my-0">訂單編號：</span>
          <input type="text" class="border border-[#c4c4c4] rounded-md px-2 py-1" placeholder="請輸入訂單編號" />
          <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-1.5 px-5 ml-2.5 xl:ml-20 bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] rounded-xl text-white text-lg">查詢</button>
        </div>
      </div>
    </form>
    <div class="sticky top-9 bg-white w-full overflow-x-scroll lg:overflow-x-hidden flex flex-nowrap z-10">
      <ul class="relative flex min-w-[170%] md:min-w-[99%] mt-8 mb-1 mx-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <li v-for="(list, idx) in orderTab" :key="list.label" class="text-center w-1/6 flex-none">
          <span @click="selectedList = list.label, selectedIdx = idx" class="duration-300 py-3 text-lg block cursor-pointer">
            {{ list.label }}
          </span>
        </li>
        <div :style="borderStyle" class="absolute bottom-[0%] h-1 duration-700 ease-[cubic-bezier(1,.23,.28,1)] bg-[#FA5936]"></div>
      </ul>
    </div>

    <OrderList v-for="list in filterList" :key="list.id" :orderList="list.orderItems" :order="list" data-aos="fade" data-aos-duration="1000" data-aos-once="true"></OrderList>
  </section>
</template>
<script>
export default {
  name: "member-order",
  data() {
    return {
      orderTab: [
        {
          label: "全部",
        },
        {
          label: "待付款",
        },
        {
          label: "待出貨",
        },
        {
          label: "待收貨",
        },
        {
          label: "已完成",
        },
        {
          label: "已取消",
        },
      ],
      orderList: [
        {
          id: 1,
          orderDate: "2021/01/30",
          orderId: 21111708328107,
          orderType: "待出貨",
          orderItems: [
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒",
              price: 6520,
              sale: 6000,
              quantity: 1,
            },
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒2",
              price: 6520,
              sale: 6000,
              quantity: 3,
            },
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒5",
              price: 6520,
              sale: 6000,
              quantity: 2,
            },
          ],
          totalPrice: 36000,
          transportType: "超商取貨",
        },
        {
          id: 2,
          orderDate: "2021/01/28",
          orderId: 21111708328108,
          orderType: "已取消",
          orderItems: [
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒",
              price: 6520,
              sale: 6000,
              quantity: 1,
            },
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒2",
              price: 6520,
              sale: 6000,
              quantity: 3,
            },
          ],
          totalPrice: 24000,
          transportType: "宅配",
        },
        {
          id: 3,
          orderDate: "2021/01/28",
          orderId: 21111708328109,
          orderType: "待付款",
          orderItems: [
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒",
              price: 6520,
              sale: 6000,
              quantity: 1,
            },
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒2",
              price: 6520,
              sale: 6000,
              quantity: 3,
            },
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒2",
              price: 6520,
              sale: 6000,
              quantity: 3,
            },
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒2",
              price: 6520,
              sale: 6000,
              quantity: 3,
            },
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒2",
              price: 6520,
              sale: 6000,
              quantity: 3,
            },
            {
              imgUrl: require("~/static/images/product_example.png"),
              title: "春季的初戀微甜｜金牌紅烏龍禮盒2",
              price: 6520,
              sale: 6000,
              quantity: 3,
            },
          ],
          totalPrice: 24000,
          transportType: "宅配",
        },
      ],
      selectedList: '全部',
      selectedIdx: 0
    };
  },
  computed: {
    filterList() {
      switch (this.selectedList) {
        case "全部":
          return this.orderList;
          break;
        case "待付款":
          return this.orderList.filter((item) => item.orderType === this.selectedList);
          break;
        case "待出貨":
          return this.orderList.filter((item) => item.orderType === this.selectedList);
          break;
        case "已取消":
          return this.orderList.filter((item) => item.orderType === this.selectedList);
          break;
        case "已完成":
          return this.orderList.filter((item) => item.orderType === this.selectedList);
          break;
      }
    },
    borderStyle() {
      let avgWidth = 100 / this.orderTab.length
      let idx = this.selectedIdx
      return `width: ${avgWidth}%; left:${idx * avgWidth}%;`
    }
  },
  methods: {
    handleSearch() {
      console.log('搜尋訂單')
    },
  }
};
</script>

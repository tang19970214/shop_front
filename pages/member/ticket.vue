<template>
  <section class="w-full lg:px-[50px]">
    <div class="flex justify-between items-center">
      <h2 class="text-[18px] font-bold tracking-[0.105em]">我的優惠券</h2>
      <div class="flex items-center">
        <span>到期前一週通知</span>
        <div
          class="duration-300 relative px-[6px] ml-[7px] shadow-[0px_1px_2px_rgba(0,0,0,0.25)] w-[50px] h-[22px] rounded-[20px] bg-gradient-to-r cursor-pointer"
          :class="{
            'bg-[#c4c4c4]': !isNotify,
            'bg-[#4acc28]': isNotify,
          }"
          @click="isNotify = !isNotify"
        >
          <div
            class="duration-300 absolute top-[4px] bg-[white] h-[14px] w-[14px] rounded-full shadow-[0px_4px_4px_rgba(123,116,116,0.25)]"
            :class="{
              'left-[7%]': !isNotify,
              'left-[63%]': isNotify,
            }"
          ></div>
        </div>
      </div>
    </div>
    <template v-if="tickets.length > 0">
      <Ticket
        v-for="ticket in tickets"
        :key="ticket.id"
        :name="ticket.name"
        :time="ticket.time"
        :price="ticket.price"
        :rules="ticket.rules"
      ></Ticket>
    </template>
    <div
      v-else
      class="flex justify-center items-center flex-col w-full h-[50vh]"
    >
      <fa class="w-[100px] h-[85px] text-[#a3a3a3]" :icon="['fas', 'ticket']" />
      <span class="text-[18px] text-[#a3a3a3] select-none"> 目前無優惠券 </span>
    </div>
  </section>
</template>
<script>
export default {
  name: "member-ticket",
  data() {
    return {
      isNotify: false,
      tickets: [
        {
          id: 1,
          name: "首購折價券",
          time: "2021/01/20-2022/04/01",
          price: 150,
          rules: ["訂單滿499可以使用"],
        },
        {
          id: 2,
          name: "生日折價券",
          time: "2021/04/01-2022/04/01",
          price: 200,
          rules: ["訂單滿499可以使用", "說明說明說明"],
        },
      ],
    };
  },
};
</script>

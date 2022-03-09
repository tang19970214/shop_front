<template>
  <section class="w-full lg:px-12">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-bold tracking-widest">我的優惠券</h2>
      <div class="flex items-center">
        <span>到期前一週通知</span>
        <div
          class="duration-300 relative px-2 ml-2 shadow-[0px_1px_2px_rgba(0,0,0,0.25)] w-12 h-[22px] rounded-xl bg-gradient-to-r cursor-pointer"
          :class="{
            'bg-[#c4c4c4]': !isNotify,
            'bg-[#4acc28]': isNotify,
          }"
          @click="isNotify = !isNotify"
        >
          <div
            class="duration-300 absolute top-1 bg-white h-3.5 w-3.5 rounded-full shadow-[0px_4px_4px_rgba(123,116,116,0.25)]"
            :class="{
              'left-[7%]': !isNotify,
              'left-[63%]': isNotify,
            }"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full space-y-6 my-5" v-if="tickets.length > 0">
      <Ticket v-for="ticket in tickets" :key="ticket.id" :id="ticket.id" :type="ticket.type" :name="ticket.name" :time="ticket.time" :countOff="ticket.countOff" :rules="ticket.rules"></Ticket>
    </div>
    <div v-else class="flex justify-center items-center flex-col w-full h-[50vh]">
      <fa class="w-24 h-20 text-[#a3a3a3]" :icon="['fas', 'ticket']" />
      <span class="text-lg text-[#a3a3a3] select-none"> 目前無優惠券 </span>
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
          type: 'cash',
          name: "首購折價券",
          time: "2021/01/20-2022/04/01",
          countOff: 150,
          rules: ["訂單滿499可以使用"],
        },
        {
          id: 2,
          type: 'discount',
          name: "生日折價券",
          time: "2021/04/01-2022/04/01",
          countOff: 95,
          rules: ["訂單滿499可以使用", "說明說明說明", "說明說明說明2", "說明說明說明3", "說明說明說明4", "說明說明說明5"],
        },
      ],
    };
  },
};
</script>

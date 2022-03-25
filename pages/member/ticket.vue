<template>
  <section class="w-full lg:px-12">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-bold tracking-widest">我的優惠券</h2>
      <div class="flex items-center">
        <span>到期前一週通知</span>
        <SwitchBtn :isNotify="isNotify" />
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
import SwitchBtn from "../../components/SwitchBtn.vue";
export default {
    name: "member-ticket",
    data() {
        return {
            isNotify: true,
            tickets: [
                {
                    id: 1,
                    type: "cash",
                    name: "首購折價券",
                    time: "2021/01/20-2022/04/01",
                    countOff: 150,
                    rules: ["訂單滿499可以使用"],
                },
                {
                    id: 2,
                    type: "discount",
                    name: "生日折價券",
                    time: "2021/04/01-2022/04/01",
                    countOff: 95,
                    rules: ["訂單滿499可以使用", "說明說明說明", "說明說明說明2", "說明說明說明3", "說明說明說明4", "說明說明說明5"],
                },
            ],
        };
    },
    components: { SwitchBtn }
};
</script>

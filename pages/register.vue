<template>
  <section class="w-full flex flex-col items-center justify-center px-5">
    <!-- tab -->
    <div class="w-full md:max-w-[460px] flex items-center justify-between border-b" v-if="$route.name !== 'register-finish'">
      <div class="w-full text-center pb-1 border-b-[5px] transition duration-300 hover:font-bold" :class="{'border-[#FA5936] font-bold': item.routeName === $route.name, 'border-transparent cursor-pointer': item.routeName !== $route.name}" v-for="item in tabList" :key="item.id" @click="changeTab(item.routeName)">
        <h2 class="text-2xl">{{item.label}}</h2>
      </div>
    </div>

    <Nuxt-child class="md:max-w-[460px]" />
  </section>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      tabList: [
        { id: 1, label: "手機註冊", routeName: "register" },
        { id: 2, label: "信箱註冊", routeName: "register-mail" },
      ],
    };
  },
  methods: {
    changeTab(routeName) {
      if (routeName === this.$route.name) return;
      this.$router.push({ name: routeName });
    },
  },
};
</script>
<template>
  <section class="fixed top-0 left-0 w-full bg-white shadow-[0px_4px_4px_rgba(140,140,140,0.25)] z-20">
    <div class="w-full max-w-[1280px] p-4 box-border mx-auto flex flex-col gap-6">
      <div class="hidden lg:block w-full">
        <div class="w-full flex items-center justify-between text-lg">
          <!-- follow -->
          <div class="flex items-center gap-3 text-[#A3A3A3]">
            <p>追蹤我們</p>
            <fa :icon="['fab', 'facebook']" />
            <fa :icon="['fab', 'instagram']" />
            <fa :icon="['fab', 'line']" />
          </div>
          <!-- user -->
          <div class="w-auto">
            <div class="flex items-center gap-2" v-if="!!token">
              <fa class="text-[#A3A3A3]" :icon="['fas', 'user-circle']" />
              <p>陳ＯＯ</p>
            </div>

            <div class="flex items-center gap-2" v-else>
              <a class="transition duration-150 hover:text-[#FA5936]" :class="{ 'text-[#FA5936]': checkRoute('/login'), 'cursor-pointer': !checkRoute('/login') }" @click="goPath('/login')">登入</a>
              <span>|</span>
              <a class="transition duration-150 hover:text-[#FA5936]" :class="{ 'text-[#FA5936]': checkRoute('/register'), 'cursor-pointer': !checkRoute('/register') }" @click="goPath('/register')">註冊</a>
            </div>
          </div>
        </div>
      </div>

      <div class="relative w-full flex items-center justify-between gap-7">
        <fa class="lg:hidden text-2xl absolute left-0" :icon="['fas', 'bars']" />

        <strong class="text-2xl lg:text-5xl pl-12 lg:pl-0" @click="$router.push('/')">LOGO</strong>

        <div class="hidden lg:block w-full h-10 relative">
          <fa class="absolute left-3 top-2.5 text-[#A3A3A3] text-xl" :icon="['fas', 'search']" />
          <input type="text" class="form-control w-full h-full pl-9 pr-3 py-0.5 box-border text-gray-700 bg-white border border-gray-300 rounded-[10px] transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" placeholder="我想找..." />
        </div>

        <div class="hidden lg:block">
          <ul class="flex items-center gap-6">
            <li class="whitespace-nowrap transition duration-150 hover:text-[#FA5936] text-lg" :class="{ 'text-[#FA5936]': checkRoute(item.value), 'cursor-pointer': !checkRoute(item.value) }" v-for="item in menuList" :key="item.id" @click="goPath(item.value)">{{ item.label }}</li>
            <li class="relative" @click="goPath('/cart')">
              <div class="absolute inline-block top-0 right-0 translate-x-1/2 -translate-y-1/2 p-0.5 px-1 text-xs leading-none whitespace-nowrap font-bold bg-red-500 text-white rounded-full z-10">2</div>
              <fa class="transition duration-150 hover:text-[#FA5936] text-4xl" :class="{ 'text-[#FA5936]': checkRoute('/cart'), 'cursor-pointer': !checkRoute('/cart') }" :icon="['fas', 'shopping-cart']" />
            </li>
          </ul>
        </div>

        <div class="lg:hidden">
          <ul class="flex items-center gap-5 text-[#404040]">
            <li><fa :icon="['fas', 'search']" /></li>
            <li><fa :icon="['fas', 'shopping-cart']" /></li>
            <li><fa :icon="['fas', 'user-circle']" /></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      menuList: [
        { id: 1, label: "特店取貨店點", value: "/pickup" },
        { id: 2, label: "商品分類", value: "/product" },
        { id: 3, label: "專欄分享", value: "/share" },
      ],
    };
  },
  computed: {
    ...mapState(["token"]),
    checkRoute() {
      return (path) => {
        return this.$route.path === path || this.$route.matched[0]?.path === path;
      };
    },
  },
  methods: {
    goPath(path) {
      if (this.$route.path === path) return;
      this.$router.push(path);
    },
  },
  mounted() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: "1289081708257437",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
      FB.AppEvents.logPageView();
    };
  },
};
</script>

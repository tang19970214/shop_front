<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-[0px_4px_4px_rgba(140,140,140,0.25)] z-20">
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
            <div class="flex items-center gap-2 relative z-30 group" v-if="!!token">
              <fa class="text-[#A3A3A3]" :icon="['fas', 'user-circle']" />
              <p>陳ＯＯ</p>
              <div class="hidden md:block absolute w-full h-24 bg-transparent top-0 left-0 pointer-events-none group-hover:pointer-events-auto"></div>
              <div class="hidden md:block group-hover:scale-100 group-hover:pointer-events-auto pointer-events-none  duration-300 scale-0 absolute -bottom-36 -left-32 xl:-left-24 h-32 w-52 bg-white p-5 border border-[#c4c4c4] rounded-md shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-30 after:content-[''] after:w-6 after:h-6 after:bg-white after:absolute after:right-10 after:-top-3 after:rotate-45 after:rounded-[5px_0px_0px_0px] after:border-t after:border-l after:border-t-[#c4c4c4] after:border-l-[#c4c4c4]">
                <ul class="flex flex-col justify-between">
                  <li v-for="list in memberList" :key="list.id" class="duration-300 cursor-pointer hover:text-[#FA5936]" :class="{'text-[#FA5936]': $route.name === list.path}">
                    <a v-if="list.value !== '/logout'" @click.prevent="goPath(list.value)" class="block">
                      <fa :icon="list.icon" class="mr-4"></fa>
                      {{ list.label }}
                    </a>
                    <a v-else class="block" @click="logout()">
                      <fa :icon="list.icon" class="mr-4"></fa>
                      {{ list.label }}
                    </a>
                  </li>
                </ul>
              </div>
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
        <!-- <fa class="lg:hidden text-2xl absolute left-0" :icon="['fas', 'bars']" /> -->
        <div @click="isOpen = !isOpen" class="lg:hidden absolute left-0 flex flex-col duration-300 gap-1 z-40">
          <div class="h-[3px] w-6 bg-black duration-300" :class="{' translate-y-1.5 translate-x-0 rotate-45': isOpen}"></div>
          <div class="h-[3px] w-6 bg-black duration-300" :class="{'opacity-0': isOpen}"></div>
          <div class="h-[3px] w-6 bg-black duration-300" :class="{' -translate-y-2 -translate-x-0 -rotate-45': isOpen}"></div>
        </div>

        <strong class="text-2xl lg:text-5xl ml-12 lg:ml-0 cursor-pointer" @click="$router.push('/')">LOGO</strong>

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
          <ul class="flex items-center text-[#404040]">
            <li><fa :icon="['fas', 'search']" class="text-xl px-2.5" /></li>
            <li><fa @click="$router.push('/cart')" :icon="['fas', 'shopping-cart']" class="text-xl px-2.5" /></li>
            <li>
              <fa v-if="token" @click="handleToggleMemberMenu()" :icon="['fas', 'user-circle']" class="text-xl px-2.5" />
              <fa v-else @click="$router.push('/login')" :icon="['fas', 'user-circle']" class="text-xl px-2.5" />
            </li>
          </ul>
        </div>
        <div class="fixed w-full h-[calc(100vh-64px)] duration-700 top-16 bg-white p-9 text-lg ease-[cubic-bezier(.88,.1,.3,.98)] shadow-lg lg:hidden" :class="{'right-[0%]': memberMenuOpen, 'right-[-100%]': !memberMenuOpen}">
          <ul class="flex flex-col gap-8">
            <li v-for="list in responsiveMemberList" :key="list.id">
              <fa :icon="list.icon" class="mr-5"></fa>
              <a v-if="list.value !== '/logout'" @click="$router.push(list.value), memberMenuOpen = false" :class="{'text-[#FA5936]': $route.name === list.path}">{{ list.label }}</a>
              <a v-else @click="logout()">{{ list.label }}</a>
              <ul v-if="list.options" class="ml-16 mt-5 flex flex-col gap-5">
                <li v-for="option in list.options" :key="option.id + option.label" @click="$router.push(option.value), memberMenuOpen = false" :class="{'text-[#FA5936]': $route.name === option.path}">{{ option.label }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <transition name="fade">
        <div v-if="isOpen" class="fixed top-0 bg-white left-0 w-screen h-screen pt-20 px-6">
          <ul class="text-lg">
            <li v-for="list in menuList" :key="list.id" @click="list.enable = !list.enable" class="py-3 border-b border-b-[#a3a3a3] last:border-b-0 duration-1000 -translate-x-1/2" :class="{'-translate-x-0': isOpen}">
              {{ list.label }}
              <fa v-if="list.options" icon="fa-solid fa-caret-up" class="duration-300" :class="{'rotate-180': list.enable}"></fa>
              <ul v-if="list.label === '商品分類'" class="pl-4 max-h-0 overflow-hidden duration-500" :class="{'max-h-screen': list.enable}">
                <li class="my-4" @click="$router.push({path: `/product?category=all&page=1`}), isOpen = false" :class="{'text-[#FA5936]': $route.query.category == 1}">全部商品</li>
                <li v-for="option in list.options" :key="option.id" @click="$router.push({path: `/product?category=${option.id}&page=1`}), isOpen = false" class="my-4" :class="{'text-[#FA5936]': $route.query.category == option.id}">{{ option.label }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      menuList: [
        { id: 1, label: "特店取貨店點", value: "/pickup" },
        { id: 2, label: "商品分類", value: "/product?category=all&page=1", enable: false, options: [{id: 2, label: '調飲系列茶包'}, {id: 3, label: '烏龍茶'}, {id: 4, label: '比賽茶系列'}, {id: 5, label: '禮盒'}] },
        { id: 3, label: "專欄分享", value: "/share" },
      ],
      memberList: [
        {id: 1, label: "我的帳戶", value: "/member", path: "member", icon: "fa-solid fa-user"},
        {id: 2, label: "我的收藏", value: "/member/favorite", path: "member-favorite", icon: "fa-regular fa-heart"},
        {id: 3, label: "登出", value: "/logout", path: "member-logout", icon: "fa-solid fa-arrow-right-from-bracket"},
      ],
      responsiveMemberList: [
        {id: 1, label: "我的帳戶", value: "/member", path: "member", icon: "fa-solid fa-user", options: [{id: 1, label: "修改會員資料", value: "/member/info", path: "member-info"}, {id: 2, label: "修改密碼", value: "/member/password", path: "member-password"}]},
        {id: 2, label: "我的收藏", value: "/member/favorite", path: "member-favorite", icon: "fa-regular fa-heart"},
        {id: 3, label: "我的訂單", value: "/member/order", path: "member-order", icon: "fa-solid fa-clipboard-list"},
        {id: 4, label: "我的優惠券", value: "/member/ticket", path: "member-ticket", icon: "fa-solid fa-ticket"},
        {id: 5, label: "登出", value: "/logout", path: "member-logout", icon: "fa-solid fa-arrow-right-from-bracket"},
      ],
      isOpen: false,
      memberMenuOpen: false
    };
  },
  computed: {
    ...mapState(['token']),
    checkRoute() {
      return (path) => {
        return this.$route.path === path || this.$route.matched[0]?.path === path;
      };
    }
  },
  methods: {
    goPath(path) {
      if (this.$route.path === path) return;
      this.$router.push(path);
    },
    logout() {
      const logout = this.$store.dispatch('Logout')
      if (logout) {
        this.$swal.fire({
          icon: "success",
          title: "會員已登出",
          timer: 1500,
          showConfirmButton: false,
        })
        .then(() => {
          this.memberMenuOpen = false
          this.$router.push('/')
        })
      } else {
        this.memberMenuOpen = false
      }
    },
    handleToggleMemberMenu() {
      this.memberMenuOpen = !this.memberMenuOpen
    }
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
    }
  }
};
</script>

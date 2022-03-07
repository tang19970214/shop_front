<template>
  <section
    class="w-[100vw] max-w-[1280px] mx-auto flex px-3 gap-0 md:gap-3 mt-5 mb-16 lg:mt-16 lg:mb-20"
  >
    <!-- 左列menu -->
    <div class="hidden md:block">
      <ul class="sticky top-24">
        <li
          class="flex items-center py-1 text-gray-700 rounded text-lg"
          v-for="item in menuList"
          :key="item.id"
        >
          <div class="w-auto flex flex-col">
            <div
              class="flex items-center gap-2 transition duration-300"
              :class="{
                'text-[#FA5936]':
                  item.name === $route.name || item.secondName === $route.name,
                'hover:text-[#FA5936] cursor-pointer':
                  item.name !== $route.name || item.secondName !== $route.name,
              }"
              @click="goPath(item.path)"
            >
              <fa class="w-4" :icon="['fas', item.icon]" />
              <p class="tracking-wider">{{ item.label }}</p>
            </div>

            <div v-if="item.options" class="mt-1 pl-8">
              <ul>
                <li
                  class="inline-block mb-1 tracking-wider text-base last:mb-0 cursor-pointer transition duration-300 hover:text-[#FA5936]"
                  :class="{ 'text-[#FA5936]': items.name === $route.name }"
                  v-for="items in item.options"
                  :key="items.id"
                  @click="goPath(items.path)"
                >
                  {{ items.label }}
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="w-full">
      <div v-if="isLoading" class="flex w-full h-[50vh] justify-center items-center">
        <div class="spinner-border text-[#FA5936] animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <Nuxt-child v-else :profile="profile" />
    </div>
  </section>
</template>

<script>
import Cookies from "js-cookie";
export default {
  middleware: ["checkMemberAuth"],
  data() {
    return {
      openModal: false,
      menuList: [
        {
          id: 1,
          icon: "user",
          label: "我的帳戶",
          path: "/member",
          name: "member",
          options: [
            {
              id: 1,
              label: "修改會員資料",
              path: "/member/info",
              name: "member-info",
            },
            {
              id: 2,
              label: "修改密碼",
              path: "/member/password",
              name: "member-password",
            },
          ],
        },
        {
          id: 2,
          icon: "heart",
          label: "我的收藏",
          path: "/member/favorite",
          name: "member-favorite",
        },
        {
          id: 3,
          icon: "clipboard-list",
          label: "我的訂單",
          path: "/member/order",
          name: "member-order",
          secondName: "member-order-id",
        },
        {
          id: 4,
          icon: "ticket",
          label: "我的優惠券",
          path: "/member/ticket",
          name: "member-ticket",
        },
      ],
      profile: {},
      isLoading: true
    };
  },
  methods: {
    goPath(path) {
      if (this.$route.path === path) return;

      this.$router.push(path);
    },
    async getMemberByToken() {
      // TODO:@George --save userInfo to vuex from permission
      try {
        const token = Cookies.get("Authorization");
        const res = await this.api.members.getMemberByToken(token);
        const { code, result } = res.data;
        // console.log(code, result);
        if (code === 200) {
          this.profile = result;
        }
        this.isLoading = false
        // const { email, id, name, phone } = res.data.result
        // this.profile = res.data.result
      } catch (error) {
        this.isLoading = false
        console.log(error);
      }
    },
  },
  mounted() {
    this.getMemberByToken();
  },
};
</script>

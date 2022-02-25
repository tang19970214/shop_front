<template>
  <section class="w-full max-w-[1280px] mx-auto flex px-5 gap-3 lg:mt-10">
    <div class="min-w-[9rem]">
      <ul class="relative">
        <li class="flex items-center py-1 text-gray-700 rounded text-lg" v-for="item in menuList" :key="item.id">
          <div class="w-auto flex flex-col">
            <div class="flex items-center gap-2 transition duration-300" :class="{ 'text-[#FA5936]': item.path === $route.path, 'hover:text-[#FA5936] cursor-pointer': item.path !== $route.path }" @click="goPath(item.path)">
              <fa class="w-4" :icon="['fas', item.icon]" />
              <p class="tracking-wider">{{ item.label }}</p>
            </div>

            <div v-if="item.options" class="mt-1 pl-8">
              <ul>
                <li class="inline-block text-gray-700 mb-1 tracking-wider text-base last:mb-0 cursor-pointer transition duration-300 hover:text-[#FA5936]" :class="{ 'text-[#FA5936]': items.path === $route.path }" v-for="items in item.options" :key="items.id" @click="goPath(items.path)">{{ items.label }}</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <Nuxt-child />
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      menuList: [
        {
          id: 1,
          icon: "user",
          label: "我的帳戶",
          path: "/member",
          options: [
            { id: 1, label: "修改會員資料", path: "/member/info" },
            { id: 2, label: "修改密碼", path: "/member/password" },
          ],
        },
        { id: 2, icon: "heart", label: "我的收藏", path: "/member/favorite" },
        { id: 3, icon: "clipboard-list", label: "我的訂單", path: "/member/order" },
        { id: 4, icon: "ticket", label: "我的優惠券", path: "/member/ticket" },
      ],
    };
  },
  methods: {
    goPath(path) {
      console.log(path);
      if (this.$route.path === path) return;

      this.$router.push(path);
    },
  },
};
</script>
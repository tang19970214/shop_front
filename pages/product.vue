<template>
  <section class="w-full max-w-[1280px] mx-auto flex flex-col px-5 lg:px-20 gap-0 md:gap-3">
    <div class="w-full grid grid-cols-6">
      <div class="hidden lg:block lg:col-span-1 mt-16">
        <ul class="sticky top-40">
          <li v-for="list in menuList" :key="list.id" class="pb-7 text-lg cursor-pointer group" :class="{'text-[#FA5936]': $route.query.category == list.id}" @click="$router.push({path: '/product', query: {category: list.id, page: 1}}), selectedCategory = list.label, list.enable = !list.enable">
            <span class="duration-300 group-hover:text-[#FA5936]">{{ list.label }}</span>
            <!-- 第二層下拉選單 -->
            <!-- <fa v-if="list.options.length > 0" class="duration-300" icon="fa-solid fa-caret-up" :class="{'rotate-180': list.enable}"></fa>
            <ul v-if="list.options.length > 0" class="duration-300 pl-5 max-h-0 overflow-hidden" :class="{'max-h-[100vh]': list.enable}">
              <li v-for="option in list.options" :key="option.id">
                <span class="block duration-300 hover:text-[#FA5936]">{{ option.label }}</span>
              </li>
            </ul> -->
          </li>
        </ul>
      </div>

      <div class="col-span-6 lg:col-span-5 mt-8 md:mt-14">
        <Nuxt-child :categoryTitle="selectedCategory" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "product",
  asyncData() {
    const menuList = [
      {id: 'all', label: '全部商品', options: [], enable: false},
      {id: 2, label: '調飲系列茶包', options: [], enable: false},
      {id: 3, label: '烏龍茶', options: [], enable: false},
      {id: 4, label: '比賽茶系列', options: [{id: 1, label: '子分類1'}, {id: 2, label: '子分類2'}], enable: false},
      {id: 5, label: '禮盒', options: [{id: 1, label: '子分類1'}, {id: 2, label: '子分類2'}], enable: false}
    ]
    return { menuList }
  },
  computed: {
    selectedCategory() {
      return this.menuList.find(item => item.id === parseInt(this.$route.query?.category))?.label
    }
  }
};
</script>
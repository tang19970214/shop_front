<template>
  <section class="w-full text-center lg:px-12">
    <div class="w-full flex justify-between items-center mb-5">
      <h2 class="text-lg font-bold">我的收藏</h2>
      <div class="flex items-center">
        <p>補貨通知</p>
        <SwitchBtn :isNotify="isNotify" />
      </div>
    </div>
    <div class="w-full grid grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in filterList(list)" :key="item.id" class="w-full flex flex-col gap-1 text-left group overflow-hidden">
        <div class="w-full h-44 md:h-80 overflow-hidden cursor-pointer">
          <img :src="item.imgUrl" :alt="item.title" class="w-full h-80 duration-300 object-cover group-hover:scale-125" />
        </div>

        <label class="duration-300 group-hover:text-[#FA5936]">{{ item.title }}</label>

        <div class="w-full block md:flex items-center justify-between">
          <div class="flex items-center gap-1">
            <p class="text-red-500">
              ${{ item.sale > 0 ? item.sale : item.price }}
            </p>
            <p class="text-sm text-neutral-400 line-through" v-if="item.sale > 0">
              ${{ item.price }}
            </p>
          </div>

          <fa @click="cancelFavorite(item)" class="cursor-pointer text-red-500 mt-2 md:bt-0" :icon="['fas', 'heart']"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "member-favorite",
  data() {
    return {
      isNotify: true,
      list: [
        {
          id: 1,
          imgUrl: 'https://images.unsplash.com/photo-1504382103100-db7e92322d39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
          title: "春季的初戀微甜｜金牌紅烏龍禮盒",
          price: 6520,
          sale: 6000,
          favorite: true,
          inStock: 1,
        },
        {
          id: 2,
          imgUrl: 'https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1778&q=80',
          title: "春季的初戀微甜｜金牌紅烏龍禮盒",
          price: 6520,
          sale: 6000,
          favorite: true,
          inStock: 1,
        },
        {
          id: 3,
          imgUrl: 'https://images.unsplash.com/photo-1541870730196-cd1efcbf5649?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
          title: "春季的初戀微甜｜金牌紅烏龍禮盒",
          price: 6000,
          sale: 0,
          favorite: true,
          inStock: 0,
        },
        {
          id: 4,
          imgUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=842&q=80',
          title: "春季的初戀微甜｜金牌紅烏龍禮盒",
          price: 6000,
          sale: 0,
          favorite: true,
          inStock: 1,
        },
        {
          id: 5,
          imgUrl: 'https://images.unsplash.com/photo-1491720731493-223f97d92c21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1462&q=80',
          title: "春季的初戀微甜｜金牌紅烏龍禮盒",
          price: 6000,
          sale: 0,
          favorite: true,
          inStock: 1,
        },
      ],
    };
  },
  computed: {
    // TODO: 介接api後移除此篩選
    filterList() {
      return (list) => {
        return list.filter((i) => i.favorite);
      };
    },
  },
  methods: {
    cancelFavorite(item) {
      item.favorite = !item.favorite;

      this.$swal.fire({
        icon: "success",
        title: "已取消收藏",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  },
};
</script>

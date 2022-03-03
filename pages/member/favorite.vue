<template>
  <section class="w-full text-center">
    <div class="w-full grid grid-cols-3 gap-6">
      <div class="w-full flex flex-col gap-1 text-left" v-for="item in filterList(list)" :key="item.id">
        <img :src="item.imgUrl" :alt="item.title" />

        <label>{{ item.title }}</label>

        <div class="w-full flex items-center justify-between">
          <div class="flex items-center gap-1">
            <p class="text-red-500">${{ item.sale > 0 ? item.sale : item.price }}</p>
            <p class="text-sm text-neutral-400 line-through" v-if="item.sale > 0">${{ item.price }}</p>
          </div>

          <fa class="cursor-pointer text-red-500" :icon="['fas', 'heart']" @click="cancelFavorite(item)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'member-favorite',
  data() {
    return {
      list: [
        { id: 1, imgUrl: require("~/static/images/product_example.png"), title: "春季的初戀微甜｜金牌紅烏龍禮盒", price: 6520, sale: 6000, favorite: true, inStock: 1 },
        { id: 2, imgUrl: require("~/static/images/product_example.png"), title: "春季的初戀微甜｜金牌紅烏龍禮盒", price: 6520, sale: 6000, favorite: true, inStock: 1 },
        { id: 3, imgUrl: require("~/static/images/product_example.png"), title: "春季的初戀微甜｜金牌紅烏龍禮盒", price: 6000, sale: 0, favorite: true, inStock: 0 },
        { id: 4, imgUrl: require("~/static/images/product_example.png"), title: "春季的初戀微甜｜金牌紅烏龍禮盒", price: 6000, sale: 0, favorite: true, inStock: 1 },
        { id: 5, imgUrl: require("~/static/images/product_example.png"), title: "春季的初戀微甜｜金牌紅烏龍禮盒", price: 6000, sale: 0, favorite: true, inStock: 1 },
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
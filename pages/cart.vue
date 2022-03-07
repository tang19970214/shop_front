<template>
  <section class="w-full max-w-[1280px] mx-auto flex flex-col px-3 gap-0 md:gap-3">
    <h3 class="mt-2 lg:mt-16">{{ setTitle() }}</h3>

    <Nuxt-child />
  </section>
</template>

<script>
export default {
  name: "cart",
  computed: {
    setTitle() {
      return () => {
        switch (this.$route.name) {
          case "cart-index":
            return "購物車";
          case "cart-checkout":
            return "結帳";
          default:
            return "購物車";
        }
      };
    },
  },
};
</script>
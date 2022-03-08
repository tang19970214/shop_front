<template>
  <section class="w-full max-w-[1280px] mx-auto flex flex-col px-5 lg:px-20 gap-0 md:gap-3">
    <h3 class="mt-2 text-lg mb-4 font-bold tracking-widest">{{ setTitle() }}</h3>

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
          case "cart-checkout":
            return "結帳";
            break;
        }
      };
    },
  },
};
</script>
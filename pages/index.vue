<template>
  <section>
    <h1>index</h1>

    <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="goLogin()">Login</button>
  </section>
</template>

<script>
export default {
  name: "IndexPage",
  async asyncData({ app }) {
    // console.log(app.$api);
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

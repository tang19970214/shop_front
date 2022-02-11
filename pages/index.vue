<template>
  <section>
    <h1>index</h1>

    <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="goLogin()">Login</button>
  </section>
</template>

<script>
export default {
  name: "IndexPage",
  async asyncData() {
    // members/load
    console.log($api);
    // const query = {
    //   page: 1,
    //   limit: 10,
    // };
    // await $api.members.load(query).then((res) => {
    //   console.log(res);
    // });
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    // getList() {
    //   const query = {
    //     page: 1,
    //     limit: 10,
    //   };
    //   $api.members.load(query).then((res) => {
    //     console.log(res);
    //   });
    // },
  },
  mounted() {
    // this.getList();
  },
};
</script>

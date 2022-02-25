<template>
  <section>
    <h1>index</h1>

    <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="goLogin()">Login</button>
    <br>
    <button @click="getMemberByToken()" class="shadow-md duration-150 text-pink-400 border-2 border-pink-400 rounded-2xl p-3 mt-5 hover:bg-pink-400 hover:text-white">GET_MEMBER_BY_TOKEN</button>

  </section>
  
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: "IndexPage",
  async asyncData({ app }) {
    // console.log(app.$api);
  },
  middleware: ['checkLineCode', 'checkMemberToken'],
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    async getMemberByToken() {
      const token = Cookies.get('Authorization')
      const res = await this.api.members.getMemberByToken(token)
      const { code, message } = res.data
      const { email, id, name, phone } = res.data.result
      console.log(code, message)
      console.log(email, id, name, phone)
    }
  }
};
</script>
<style>
.hooper-list {
  min-height: 100vh !important;
}
</style>
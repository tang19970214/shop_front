<template>
  <section>
    <h1>index</h1>

    <div class="w-full p-3 box-border flex items-center gap-2">
      <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" class="inline-block px-6 py-2.5 bg-blue-600 text-white text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-150 ease-in-out" @click="$router.push('/member')">會員中心</button>

      <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click="goLogin()">Login</button>

      <button @click="getMemberByToken()" class="shadow-md duration-150 text-pink-400 border-2 border-pink-400 rounded-2xl p-3 mt-5 hover:bg-pink-400 hover:text-white">GET_MEMBER_BY_TOKEN</button>
    </div>
    <BannerCarousel :carouselArr="carouselArr"></BannerCarousel>
  </section>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "index",
  async asyncData({ app, $api }) {
    // console.log($api.members);
    const carouselArr = [
      {
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        text: "The above example demonstrates the two core features of Vue:",
      },
      {
        img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
        text: `You may already have questions - don't worry. We will`,
      },
    ];

    return { carouselArr };
  },
  middleware: ["checkLineCode"],
  data() {
    return {};
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    async getMemberByToken() {
      const token = Cookies.get("Authorization");
      await this.api.members.getMemberByToken(token)
      .then((res) => {
        const { code, result, message } = res.data
        if (code === 200) {
          const { email, id, name, phone } = result
          console.log(email, id, name, phone);
        } else {
          this.$swal
          .fire({
            icon: "error",
            title: message,
            timer: 1000,
            showConfirmButton: false
          })
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
    },
  }
};
</script>

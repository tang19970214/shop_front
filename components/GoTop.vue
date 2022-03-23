<template>
  <div>
    <transition name="fade">
      <div v-if="isShow" @click="goTop()" class="z-40 duration-300 w-14 h-14 cursor-pointer bg-white border-2 border-[#FA5936] rounded-full fixed top-1/2 right-5 md:right-10 flex items-center justify-center hover:bg-[#FA5936] group">
        <fa icon="fa-solid fa-chevron-up" class="text-[#FA5936] group-hover:text-white"></fa>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    goTop() {
      if (navigator.userAgent.indexOf("Chrome") !== -1) {
        window.scrollTo({top: 0, behavior: 'smooth'})
      } else {
        const GoTopTimer = setInterval(() => {
          document.documentElement.scrollTop -= 150
          document.body.scrollTop -= 150
          if (document.documentElement.scrollTop <= 0) clearInterval(GoTopTimer)
        }, 10)
      }
    }
  },
  mounted() {
    window.onscroll = () => {
      if (window.scrollY >= 500) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

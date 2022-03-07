<template>
  <div class="inline-block overflow-hidden w-1/2 lg:w-[180px]">
    <button data-mdb-ripple="true" data-mdb-ripple-color="light" class="w-full py-3.5 px-2 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" @click.prevent="openWindow(btnInfo.link)" :title="btnInfo.name">
      {{ btnInfo.label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    btnInfo: {
      type: Object,
    },
  },
  methods: {
    openWindow(link) {
      console.log('window open')
    },
  },
};
</script>

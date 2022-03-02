<template>
  <div>
    <button
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
    class="
    duration-150
    w-[170px]
    p-1.5
    rounded-lg
    shadow-md
    text-white
    text-lg
    tracking-widest
    bg-gradient-to-r
    from-[#FA5936]
    to-[#FF6D3F]
    hover:shadow-inner
    disabled:cursor-not-allowed
    disabled:opacity-80"
    @click.prevent="openWindow(btnInfo.link)"
    :title="btnInfo.name"
    >
      {{ btnInfo.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    btnInfo: {
      type: Object
    }
  },
  methods: {
    openWindow(link) {
      window.open(link)
    }
  }
}
</script>

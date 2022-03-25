<template>
  <div>
    <div @click="isNotify = !isNotify" class="duration-300 relative px-2 ml-2 shadow-[0px_1px_2px_rgba(0,0,0,0.25)] w-12 h-[22px] rounded-xl bg-gradient-to-r cursor-pointer" :class="{'bg-[#c4c4c4]': !isNotify, 'bg-[#4acc28]': isNotify}">
      <div class="duration-300 absolute top-1 bg-white h-3.5 w-3.5 rounded-full shadow-[0px_4px_4px_rgba(123,116,116,0.25)]" :class="{'left-[7%]': !isNotify, 'left-[63%]': isNotify}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isNotify: {
      type: Boolean,
      default: false
    }
  }

}
</script>

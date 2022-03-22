<template>
  <transition name="fade">
    <div v-if="openModal" class="fixed bg-[rgba(0,0,0,0.3)] backdrop-blur top-0 left-0 p-6 md:p-10 box-border w-screen min-h-screen flex justify-center z-40 overflow-y-scroll" :class="`items-${align}`">
      <div ref="modalScroll" class="max-h-90vh bg-white rounded-xl overflow-y-auto z-50 pb-2 absolute shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" :class="width">
        <!-- header -->
        <div class="px-2 md:px-5 py-3 sticky top-0 z-10 bg-white" :class="{'border-b border-[#c4c4c4]': headerBorder}">
          <div class="w-full flex items-center justify-between">
            <strong class="text-2xl">{{ title }}</strong>
            <fa class="text-4xl cursor-pointer" :icon="['fas', 'close']" @click="closeModal()" />
          </div>
        </div>
        <!-- body -->
        <div class="px-4 md:px-5">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openModal: {
      type: Boolean,
      required: true,
      default: false,
    },
    headerBorder: {
      type: Boolean,
      default: false
    },
    height:{
      type: [Number, String],
      require: false,
      default: "h-1/2"
    },
    width: {
      type: [Number, String],
      required: false,
      default: "w-1/2",
    },
    align: {
      type: String,
      required: false,
      default: "center",
    },
    title: {
      type: String,
      required: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal")
    }
  },
  watch: {
    openModal(bol) {
      if (bol) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.max-h-90vh {
  max-height: 90vh;
}
</style>
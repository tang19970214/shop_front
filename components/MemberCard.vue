<template>
  <div class="relative w-full h-64 bg-gradient-to-r from-white to-[#D0D0D0] rounded-xl shadow-xl">
    <div class="absolute left-6 bottom-4">
      <p>
        <span class="text-5xl text-[#FA5936]">{{ point }}</span>
        點
      </p>
      <p class="text-neutral-700">加入日期：{{ joinTime }}</p>
    </div>
    <div class="absolute right-6 bottom-4">
      <p class="text-lg">
        {{ type }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    point: {
      type: Number,
    },
    joinTime: {
      type: String,
    },
    type: {
      type: String,
    },
  },
};
</script>

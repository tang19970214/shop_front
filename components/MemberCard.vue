<template>
  <div>
    <div class="relative w-full h-[257px] bg-gradient-to-r from-[#fff] to-[#D0D0D0] rounded-xl shadow-xl">
      <div class="absolute left-[26px] bottom-[15px]">
        <p>
          <span class="text-[48px] text-[#FA5936]">{{ memberInfo.point }}</span>
          點
        </p>
        <p class="text-neutral-700">加入日期：{{ memberInfo.joinTime }}</p>
      </div>
      <div class="absolute right-[26px] bottom-[15px]">
        <p class="text-[18px]">
          {{ memberInfo.type }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    memberInfo: {
      type: Object,
    },
  },
};
</script>

<template>
  <section class="w-full max-w-[1280px] mx-auto flex flex-col px-5 lg:px-20 gap-0 md:gap-3">
    <div class="w-full grid grid-cols-5">
      <div class="col-span-1">
        <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
        </ul>
      </div>

      <div class="col-span-4">
        <Nuxt-child />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "product",
};
</script>
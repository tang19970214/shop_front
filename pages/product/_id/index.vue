<template>
  <section>
    <div v-html="product.content"></div>
  </section>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default:() => {}
    }
  }
}
</script>

<template>
  <section>
    <ul class="flex justify-center space-x-4 mt-8 select-none">
      <li @click="currentPage === 1 ? currentPage = 1 : currentPage -= 1" class="group px-4 py-2 rounded-md duration-300 ring-1 ring-inset ring-[#a3a3a3] cursor-pointer hover:bg-[#FA5936] hover:ring-0 hover:text-white flex justify-center items-center" :class="{'pointer-events-none': currentPage === 1}">
        <fa class="text-lg group-hover:text-white" :class="{'text-[#a3a3a3]': currentPage === 1, 'text-[#FA5936]': currentPage !== 1}" icon="fa-solid fa-angle-left"></fa>
      </li>
      <template v-if="totalPage <= 5">
        <li v-for="page in totalPage" :key="page" @click="currentPage = page, changePage()" class="px-4 py-2 rounded-md duration-300 ring-1 ring-inset ring-[#a3a3a3] cursor-pointer hover:bg-[#FA5936] hover:ring-0 hover:text-white" :class="{'bg-[#FA5936] text-white ring-0': currentPage === page}">{{ page }}</li>
      </template>
      <template v-else>
        <li @click="currentPage = 1, changePage()" class="px-4 py-2 rounded-md duration-300 ring-1 ring-inset ring-[#a3a3a3] cursor-pointer hover:bg-[#FA5936] hover:ring-0 hover:text-white" :class="{'bg-[#FA5936] text-white ring-0': currentPage === 1, 'hidden': (currentPage - 3) < 1}">1</li>
        <li class="px-4 py-2 rounded-md ring-1 ring-inset ring-[#a3a3a3]" :class="{'hidden': (currentPage - 3) <= 1 }">...</li>
        <li v-for="page in totalPage" :key="page" @click="currentPage = page, changePage()" class="px-4 py-2 rounded-md duration-300 ring-1 ring-inset ring-[#a3a3a3] cursor-pointer hover:bg-[#FA5936] hover:ring-0 hover:text-white" :class="{'bg-[#FA5936] text-white ring-0': currentPage === page, 'hidden': page > (currentPage + 2) || page < (currentPage - 2)}">{{ page }}</li>
        <li class="px-4 py-2 rounded-md ring-1 ring-inset ring-[#a3a3a3]" :class="{'hidden': (currentPage + 3) >= totalPage }">...</li>
        <li @click="currentPage = totalPage, changePage()" class="px-4 py-2 rounded-md duration-300 ring-1 ring-inset ring-[#a3a3a3] cursor-pointer hover:bg-[#FA5936] hover:ring-0 hover:text-white" :class="{'bg-[#FA5936] text-white ring-0': currentPage === totalPage, 'hidden': (currentPage + 3) > totalPage}">{{ totalPage }}</li>
      </template>
      <li @click="currentPage === totalPage ? currentPage = totalPage : currentPage += 1" class="group px-4 py-2 rounded-md duration-300 ring-1 ring-inset ring-[#a3a3a3] cursor-pointer hover:bg-[#FA5936] hover:ring-0 hover:text-white" :class="{'pointer-events-none': currentPage === totalPage}">
        <fa class="text-lg group-hover:text-white" :class="{'text-[#a3a3a3]': currentPage === totalPage, 'text-[#FA5936]': currentPage !== totalPage}" icon="fa-solid fa-angle-right"></fa>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    totalPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    changePage() {
      this.$emit('changePage', this.currentPage)
    }
  }
}
</script>

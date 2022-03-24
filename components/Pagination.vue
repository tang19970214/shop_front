<template>
  <section>
    <ul v-if="totalPage > 1" class="flex justify-center gap-1 md:gap-4 mt-8 select-none">
      <li @click="currentPage === 1 ? currentPage = 1 : currentPage -= 1, currentPage % 5 === 0 ? currentPageTab -= 1 : currentPageTab = currentPageTab, changePage()" class="group px-3 md:px-4 py-2 rounded-md duration-300 ring-0 md:ring-1 ring-inset ring-[#a3a3a3] cursor-pointer md:hover:bg-[#FA5936] md:hover:ring-0 md:hover:text-white flex justify-center items-center" :class="{'pointer-events-none': currentPage === 1}">
        <fa class="text-lg md:group-hover:text-white" :class="{'text-[#a3a3a3]': currentPage === 1, 'text-[#FA5936]': currentPage !== 1}" icon="fa-solid fa-angle-left"></fa>
      </li>
      <template v-if="totalPage <= 5">
        <li v-for="page in totalPage" :key="page" @click="currentPage = page, changePage()" class="px-4 py-2 rounded-md duration-300 ring-0 md:ring-1 ring-inset ring-[#a3a3a3] cursor-pointer md:hover:bg-[#FA5936] md:hover:ring-0 md:hover:text-white" :class="{'bg-[#FA5936] text-white ring-0': currentPage === page}">{{ page }}</li>
      </template>
      <template v-else>
        <li @click="currentPageTab -= 1, currentPage = pageTab[currentPageTab][4], changePage()" class="cursor-pointer px-3 md:px-4 py-2 rounded-md ring-0 md:ring-1 ring-inset ring-[#a3a3a3] duration-300 md:hover:bg-[#FA5936] md:hover:ring-0 md:hover:text-white" :class="{'hidden': currentPageTab === 0 }">...</li>
        <li v-for="page in pageTab[currentPageTab]" :key="page" @click="currentPage = page, changePage()" class="px-3 md:px-4 py-2 rounded-md duration-300 ring-0 md:ring-1 ring-inset ring-[#a3a3a3] cursor-pointer md:hover:bg-[#FA5936] md:hover:ring-0 md:hover:text-white" :class="{'bg-[#FA5936] text-white ring-[#FA5936]': currentPage === page}">{{ page }}</li>
        <li @click="currentPageTab += 1, currentPage = pageTab[currentPageTab][0], changePage()" class="cursor-pointer px-3 md:px-4 py-2 rounded-md ring-0 md:ring-1 ring-inset ring-[#a3a3a3] duration-300 md:hover:bg-[#FA5936] md:hover:ring-0 md:hover:text-white" :class="{'hidden': currentPageTab === (pageTab.length - 1) }">...</li>
      </template>
      <li @click="currentPage === totalPage ? currentPage = totalPage : currentPage += 1, currentPage % 5 === 1 ? currentPageTab += 1 : currentPageTab = currentPageTab, changePage()" class="group px-3 md:px-4 py-2 rounded-md duration-300 ring-0 md:ring-1 ring-inset ring-[#a3a3a3] cursor-pointer md:hover:bg-[#FA5936] md:hover:ring-0 md:hover:text-white" :class="{'pointer-events-none': currentPage === totalPage}">
        <fa class="text-lg md:group-hover:text-white" :class="{'text-[#a3a3a3]': currentPage === totalPage, 'text-[#FA5936]': currentPage !== totalPage}" icon="fa-solid fa-angle-right"></fa>
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
      currentPage: 1,
      pageTab: [],
      currentPageTab: 0
    }
  },
  methods: {
    changePage() {
      this.$emit('changePage', this.currentPage)
    }
  },
  mounted() {
    let arr = []
    for (let i = 0; i < this.totalPage; i++) {
      if (i % 5 === 0) {
        arr.push([])
      }
      const page = parseInt(i / 5)
      arr[page].push(i + 1)
    }
    this.pageTab = arr
  }
}
</script>

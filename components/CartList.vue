<template>
  <div>
    <table class="w-full mb-6">
      <thead>
        <tr class="bg-[#FFF0E5] text-lg hidden lg:table-row">
          <th class="p-2.5 w-1/12">
            <div
            class="w-6 h-6 border-2 rounded-md cursor-pointer bg-white overflow-hidden"
            :class="{'border-[#a3a3a3]': !isAllChecked, 'border-[#FA5936]': isAllChecked}"
            @click.prevent="selectAll()"
            >
              <label class="block relative w-full h-full cursor-pointer text-white duration-300 select-none"
              >
                <input v-model="isAllChecked" type="checkbox" class="hidden appearance-none">
                <fa
                class="absolute duration-300 text-sm w-full h-full top-0 left-0 scale-0 opacity-0"
                :class="{'bg-[#FA5936]': isAllChecked, 'border-[#FA5936] scale-100': isAllChecked, 'opacity-100': isAllChecked === true}"
                icon="fa-solid fa-check">
                </fa>
                <fa
                class="absolute duration-300 text-sm w-full h-full top-0 left-0 text-white scale-0 opacity-0"
                :class="{'scale-100': isAllChecked, 'opacity-100 bg-[#FA5936]': isAllChecked === 'minus'}"
                icon="fa-solid fa-minus"
                ></fa>
              </label>
            </div>
          </th>
          <th class="p-2.5 select-none text-left w-6/12"><span>商品名稱</span></th>
          <th class="p-2.5 select-none text-center w-3/12"><span>數量</span></th>
          <th class="p-2.5 select-none text-center"><span>價錢</span></th>
          <th class="p-2.5 select-none text-center"><span>刪除</span></th>
        </tr>
      </thead>
      <transition-group tag="tbody" name="slide">
        <tr class="border-b border-b[#BBBBBB]" v-for="(cart) in cartList" :key="cart.id">
          <td class="p-2.5 w-12 md:w-16 flex md:table-cell">
            <div
            class="w-6 h-6 border-2 rounded-md cursor-pointer"
            :class="{'border-[#a3a3a3]': !cart.checked, 'border-[#FA5936]': cart.checked}"
            @click.prevent="cart.checked = !cart.checked"
            >
              <label class="block relative w-full h-full cursor-pointer text-white duration-300 bg-white select-none rounded-md scale-0" :class="{ 'bg-[#FA5936] border-[#FA5936] scale-110': cart.checked}">
                <input v-model="cart.checked" type="checkbox" class="hidden appearance-none" id="pointCheckbox" />
                <fa class="absolute text-sm top-1/2 left-1/2 -translate-x-1.5 -translate-y-1.5" icon="fa-solid fa-check"></fa>
              </label>
            </div>
          </td>
          <td class="p-2.5">
            <div class="flex md:items-center space-x-5">
              <img class="w-24 h-24 select-none" :src="cart.imgUrl" :alt="cart.title">
              <h3 class="text-lg hidden md:block">{{ cart.title }}</h3>
              <div class="flex flex-col space-y-4 md:hidden">
                <h3 class="text-lg">{{ cart.title }}</h3>
                <div class="flex justify-between border border-[#c4c4c4] w-24">
                  <button class="text-center w-full select-none" :class="{'cursor-not-allowed': cart.quantity === 1}" :disabled="cart.quantity === 1" @click="changeQuantity(false, cart.id)">-</button>
                  <label class="border-x border-x-[#c4c4c4] px-3 w-full text-center select-none">{{ cart.quantity }}</label>
                  <button class="text-center w-full select-none" @click="changeQuantity(true, cart.id)">+</button>
                </div>
                <span class="text-[#FA5936]">${{ cart.sale }}</span>
                <div class="flex justify-end">
                  <a class="cursor-pointer" @click.prevent="deleteCart(cart.id, cart.title)">
                    <fa class="text-[#FA5936] text-xl duration-300 hover:text-[#df4f2f]" icon="fa-solid fa-trash-can"></fa>
                  </a>
                </div>
              </div>
            </div>
          </td>
          <td class="p-2.5 hidden md:table-cell">
            <div class="flex mx-auto justify-between border border-[#c4c4c4] w-24">
              <button class="text-center w-full select-none" :class="{'cursor-not-allowed': cart.quantity === 1}" :disabled="cart.quantity === 1" @click="changeQuantity(false, cart.id)">-</button>
              <label class="border-x border-x-[#c4c4c4] px-3 w-full text-center select-none">{{ cart.quantity }}</label>
              <button class="text-center w-full select-none" @click="changeQuantity(true, cart.id)">+</button>
            </div>
          </td>
          <td class="text-center p-2.5 hidden md:table-cell">
            <span class="text-[#FA5936]">${{ cart.sale }}</span>
          </td>
          <td class="text-center p-2.5 hidden md:table-cell">
            <a class="cursor-pointer" @click.prevent="deleteCart(cart.id, cart.title)">
              <fa class="text-[#FA5936] text-xl duration-300 hover:text-[#df4f2f]" icon="fa-solid fa-trash-can"></fa>
            </a>
          </td>
        </tr>
      </transition-group>
    </table>
    <table class="w-full">
      <tr>
        <td class="flex justify-end items-center px-2.5">
          <span class="text-sm text-[#a3a3a3]">({{ totalQuantity }}件商品)</span>
          <span class="text-lg font-bold ml-2.5 mr-3.5">商品小計</span>
          <span class="text-xl text-[#FA5936] font-bold">${{ totalPrice }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    // 購物車列表
    cartList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      allChecked: false
    }
  },
  computed: {
    // 判斷是否全選
    isAllChecked() {
      let checkedNum = 0
      this.cartList.forEach((item) => {
        if (item.checked) {
          checkedNum += 1
        }
      })
      if (checkedNum === this.cartList.length) {
        this.allChecked = true
        return true
      } else if (checkedNum < this.cartList.length && checkedNum !== 0){
        this.allChecked = false
        return 'minus'
      } else {
        this.allChecked = false
        return false
      }
    },
    // 判斷總共幾件商品
    totalQuantity() {
      const totalQuantity = this.cartList.map((item) => item.quantity)
                                         .reduce((preQuantity, newQuantity) => preQuantity + newQuantity)
      return totalQuantity
    },
    // 判斷總金額
    totalPrice() {
      const totalPrice = this.cartList.map((item) => item.quantity * item.sale)
                                      .reduce((prePrice, newPrice) => prePrice + newPrice)
      return totalPrice
    }
  },
  methods: {
    // 全選功能
    selectAll() {
      this.allChecked = !this.allChecked
      this.cartList.forEach((item) => {
        item.checked = this.allChecked
      })
    },
    // 變更購物車商品數量
    changeQuantity(bool, id) {
      if (bool) {
        const item = this.cartList.find(item => item.id === id)
        item.quantity += 1
      } else {
        const item = this.cartList.find(item => item.id === id)
        if (item.quantity === 1) return
        item.quantity -= 1
      }
    },
    // 刪除購物車商品
    deleteCart(id, title) {
      this.$swal.fire({
        icon: 'warning',
        html: `<h4 class="text-xl">確定要刪除<span class="text-[#FA5936]">${title}</span>嗎？</h4>`,
        showCancelButton: true,
        confirmButtonColor: '#FA5936',
        cancelButtonColor: '#c4c4c4',
        showConfirmButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消'
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.cartList.forEach((item, idx) => {
            if (item.id === id) {
              this.cartList.splice(idx, 1)
            }
          })
        }
      })
    }
  }
}
</script>

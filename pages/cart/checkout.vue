<template>
  <section class="w-full md:px-8">
    <h3 class="mt-2 text-lg mb-4 font-bold tracking-widest">結帳</h3>

    <!-- 結帳商品Table -->
    <table class="w-full">
      <tr class="bg-[#FFF0E5] hidden lg:table-row">
        <th class="w-9/12 text-left py-2.5 px-5">
          <span>商品名稱</span>
        </th>
        <th class="text-center">
          <span>數量</span>
        </th>
        <th class="text-center">
          <span>價錢</span>
        </th>
      </tr>
      <tr class="border-b border-b[#c4c4c4]" v-for="cart in checkoutList" :key="cart.id">
        <td class="p-2 md:p-5">
          <div class="flex flex-col justify-start">
            <div class="flex items-center space-x-5">
              <img class="w-24 h-24" :src="cart.imgUrl" :alt="cart.title" />
              <div class="flex flex-col text-lg pt-1 lg:pt-0">
                <span>{{ cart.title }}</span>
                <span class="block lg:hidden">X{{ cart.quantity }}</span>
                <span class="text-[#FA5936] block lg:hidden">${{ cart.sale }}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="text-center text-lg hidden lg:table-cell">
          <span>X{{ cart.quantity }}</span>
        </td>
        <td class="text-center text-lg text-[#FA5936] hidden lg:table-cell">
          <span>${{ cart.sale }}</span>
        </td>
      </tr>
    </table>
    <table class="w-full">
      <tr class="border-b border-b-[#c4c4c4]">
        <div class="grid grid-cols-12 p-2 md:p-5">
          <div class="col-span-9 md:col-span-10">
            <div class="flex flex-col items-end">
              <div class="flex items-center">
                <span class="text-[#a3a3a3] text-sm">({{ totalQuantity }}件商品)</span>
                <span class="text-lg ml-3">商品小計</span>
              </div>
              <span class="text-lg">運費</span>
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 border-2 rounded-md cursor-pointer select-none" :class="{ 'border-[#a3a3a3]': !usePoint, 'border-[#FA5936]': usePoint }" @click.prevent="usePoint = !usePoint">
                  <label class="block relative w-full h-full cursor-pointer text-white duration-300 bg-white select-none rounded-md scale-0" :class="{ 'bg-[#FA5936] border-[#FA5936] scale-110': usePoint}">
                    <input v-model="usePoint" type="checkbox" class="hidden appearance-none" id="pointCheckbox" />
                    <fa class="absolute text-sm top-1/2 left-1/2 -translate-x-1.5 -translate-y-1.5" icon="fa-solid fa-check"></fa>
                  </label>
                </div>
                <label class="text-lg select-none cursor-pointer" for="pointCheckbox">使用紅利金</label>
              </div>
              <button @click="openModal = true" class="w-full duration-300 md:w-auto border-2 border-[#16a34a] rounded-xl select-none py-3 px-5 md:px-10 flex justify-center md:justify-between items-center text-lg text-[#16a34a] mt-4 hover:bg-[#16a34a] hover:text-white">
                <fa icon="fa-solid fa-ticket" class="mr-4 text-2xl"></fa>
                <span>使用優惠碼/折價券</span>
              </button>
            </div>
          </div>
          <div class="col-span-3 md:col-span-2 flex flex-col text-right">
            <span class="text-lg text-[#FA5936]">${{ cartPrice }}</span>
            <span class="text-lg text-[#FA5936]">$60</span>
            <div :class="{ 'pt-1': !usePoint, 'md:pt-0': !usePoint }">
              <span v-if="!usePoint" class="text-sm md:text-lg text-[#a3a3a3]">可用{{ point }}點</span>
              <span v-else class="text-lg text-[#FA5936]">-${{ point }}</span>
            </div>
            <span v-if="!useCoupon" class="text-lg text-[#a3a3a3] mt-7">0</span>
            <span v-else class="text-lg text-[#FA5936] mt-7">-{{ coupon }}</span>
          </div>
        </div>
      </tr>
      <tr>
        <div class="grid grid-cols-12 p-2 md:p-5">
          <div class="col-span-9 md:col-span-10 text-right">
            <span class="text-lg font-bold">訂單金額</span>
          </div>
          <div class="col-span-3 md:col-span-2 flex flex-col text-right">
            <span class="text-3xl font-bold text-[#FA5936]">{{ totalPrice }}</span>
          </div>
        </div>
      </tr>
    </table>

    <!-- 結帳資訊 -->
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <!-- 訂購人資料 -->
      <h4 class="border-l-8 border-l-[#FA5936] pl-1 md:pl-4 text-lg font-bold">訂購人資料</h4>
      <form @submit.prevent="handleSubmit(submitCheckout)" class="mt-5">
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 md:px-6" for="name">姓名<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="姓名" rules="required" v-slot="{ errors }" class="w-full">
            <div class="w-full lg:w-1/2 relative md:px-6">
              <input id="name" type="text" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸入姓名" v-model="checkoutInfo.name" />
              <span v-if="errors.length > 0" class="absolute left-3 md:left-10 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 md:px-6" for="phone">手機號碼<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="手機號碼" rules="required" v-slot="{ errors }" class="w-full">
            <div class="w-full lg:w-1/2 relative md:px-6">
              <input id="phone" type="tel" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸入手機號碼" v-model="checkoutInfo.phone" />
              <span v-if="errors.length > 0" class="absolute left-3 md:left-10 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 md:px-6" for="email">信箱<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="信箱" rules="required|email" v-slot="{ errors }" class="w-full">
            <div class="w-full lg:w-1/2 relative md:px-6">
              <input id="email" type="tel" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸入信箱" v-model="checkoutInfo.email" />
              <span v-if="errors.length > 0" class="absolute left-3 md:left-10 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 md:px-6" for="note">備註</label>
        <div class="form-group relative pb-6 md:px-6">
          <ValidationProvider name="備註" v-slot="{ errors }" class="w-full">
            <div class="w-full relative">
              <input id="note" type="tel" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 pt-2 pb-10 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="如有特殊需求，請填寫備註" v-model="checkoutInfo.note" />
            </div>
          </ValidationProvider>
        </div>
        
        <!-- 寄送方式 -->
        <h4 class="border-l-8 border-l-[#FA5936] pl-1 md:pl-4 text-lg font-bold mt-10">寄送方式</h4>
        <div class="md:px-6 mt-6">
          <div class="form-group relative pb-6">
            <ValidationProvider name="寄送方式" rules="required" v-slot="{ errors }" class="w-full flex flex-col space-y-2">
              <!-- 7-11 全家 宅配 -->
              <div v-for="item in deliveryList" :key="item.id">
                <label @click="checkoutInfo.deliveryAddress = ''" :for="item.value" class="block w-full cursor-pointer hover:bg-[#e7e7e7] relative bg-[#f3f3f3] text-lg py-3 px-8 rounded-md" :class="{'outline outline-[#ff4444]': errors.length > 0}">
                  {{ item.label }}
                  <img class="duration-300 absolute right-6 top-1/2 -translate-y-3 scale-0" :class="{ 'scale-100': checkoutInfo.deliveryType === item.value }" src="~/static/images/icon/check.svg" alt="check" />
                </label>
                <input type="radio" :id="item.value" :value="item.value" v-model="checkoutInfo.deliveryType" class="hidden">
                <div class="duration-300 max-h-0 overflow-hidden" :class="{'max-h-[100vh] my-3': checkoutInfo.deliveryType === item.value}">
                  <ul v-if="item.options.length > 0">
                    <li v-for="(option, idx) in item.options" :key="idx">
                      <ValidationProvider :ref="'storeAddress' + (option.address + 1)" :name="'地址' + (option.address + 1)" rules="required" v-slot="{ errors }" class="w-full flex flex-col mb-5">
                        <label class="cursor-pointer relative flex space-x-3 items-start md:items-center" :for="option.address">
                          <div class="border border-[#c4c4c4] w-6 h-6 rounded-full flex items-center justify-center">
                            <div class="bg-[#FA5936] duration-300 rounded-full w-4 h-4 scale-0" :class="{'scale-100': checkoutInfo.deliveryAddress === option.address}"></div>
                          </div>
                          <div class="flex flex-col md:flex-row md:items-center md:space-x-3 pr-14">
                            <span class="text-lg" v-if="option.name">{{ option.name }}</span>
                            <span>{{ option.address }}</span>
                          </div>
                          <div @click="deleteAddress(item.value, option.address)" class="absolute flex items-center justify-center right-6 top-1/2 -translate-y-3 w-6 h-6 rounded-full border-2 border-[#ef4444]">
                            <fa icon="fa-solid fa-xmark" class="text-xs text-[#ef4444]"></fa>
                          </div>
                        </label>
                        <input class="hidden" type="radio" :id="option.address" :value="option.address" v-model="checkoutInfo.deliveryAddress">
                        <span v-if="errors.length > 0 && checkoutInfo.deliveryType !== 'home'" class="text-red-500 text-xs ml-10 mt-2">請選擇門市</span>
                        <span v-if="errors.length > 0 && checkoutInfo.deliveryType === 'home'" class="text-red-500 text-xs ml-10 mt-2">請選擇地址</span>
                      </ValidationProvider>
                    </li>
                  </ul>
                  <ul v-else>
                    <li>
                      <ValidationProvider name="地址" rules="required" v-slot="{ errors }" class="w-full flex flex-col">
                        <input type="radio" class="hidden" value="" v-model="checkoutInfo.deliveryAddress">
                        <span v-if="errors.length > 0 && checkoutInfo.deliveryType !== 'home'" class="text-red-500 text-xs ml-10 mt-2">請選擇門市</span>
                        <span v-if="errors.length > 0 && checkoutInfo.deliveryType === 'home'" class="text-red-500 text-xs ml-10 mt-2">請選擇地址</span>
                      </ValidationProvider>
                    </li>
                  </ul>
                  <button type="button" class="duration-300 rounded-xl border border-[#FA5936] py-2 px-5 text-[#FA5936] hover:bg-[#FA5936] hover:text-white" @click.prevent="handleOpenAddAddressModal(item.value)">+新增地址</button>
                </div>
              </div>
              <span v-if="errors.length > 0" class="absolute left-5 -bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>

        <!-- 付款方式 -->
        <h4 class="border-l-8 border-l-[#FA5936] pl-1 md:pl-4 text-lg font-bold mt-10">付款方式</h4>
        <div class="grid grid-cols-10 md:pl-5 pb-12 mt-5 mb-3 border-b border-b-[#c4c4c4]">
          <div class="col-span-5 md:col-span-2 text-lg" v-for="item in payList" :key="item.id">
            <ValidationProvider :name="'付款方式' + item.value" rules="required" v-slot="{ errors }">
              <label :for="item.value" class="duration-300 relative block cursor-pointer pl-8 md:pl-10 py-2 hover:text-[#FA5936]">
                <div class="w-6 h-6 absolute left-0 top-1/2 -translate-y-3 border border-[#c4c4c4] rounded-full flex items-center justify-center">
                  <div class="w-4 h-4 bg-[#FA5936] rounded-full duration-300 scale-0" :class="{'scale-100': checkoutInfo.paymentType === item.value}"></div>
                </div>
                {{ item.label }}
              </label>
              <input type="radio" :id="item.value" :value="item.value" class="hidden" v-model="checkoutInfo.paymentType">
              <span v-if="errors.length > 0" class="text-red-500 text-xs ml-10 md:mt-2">請選擇付款方式</span>
            </ValidationProvider>
          </div>
        </div>

        <!-- 信用卡一次付清 && 信用卡分期 -->
        <transition name="fade">
          <div class="w-full md:w-9/12 xl:w-7/12 my-6" v-if="checkoutInfo.paymentType === '信用卡一次付清'">
            <div class="grid grid-cols-12 items-center space-y-4 md:space-y-6">

                <!-- 持卡者姓名 -->
                <div class="col-span-12 md:col-span-2 mt-6">
                  <label class=" table-cell items-center" for="creditCardName">持卡者姓名 :</label>
                </div>
                <div class="col-span-12 md:col-span-10 -translate-y-3 md:-translate-y-0">
                  <ValidationProvider name="持卡者姓名" rules="required" v-slot="{ errors }" class="relative">
                    <input id="creditCardName" type="text" v-model="creditCardInfo.name" class="focus:border-0 focus:ring-blue-500 focus:ring-1 w-2/3 lg:w-1/2 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                    <span v-if="errors.length > 0" class="text-red-500 text-xs absolute -bottom-7 left-1">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <!-- 信用卡卡號 -->
                <div class="col-span-12 md:col-span-2">
                  <label class="table-cell" for="cardNum1">信用卡卡號 :</label>
                </div>
                <div class="col-span-12 md:col-span-10 -translate-y-3 md:-translate-y-0">
                  <div class="flex justify-between space-x-4 md:space-x-6">
                    <ValidationProvider name="卡號" rules="required|onlyNumber|min:4" v-slot="{ errors }" class="relative">
                      <input id="cardNum1" @input="autoTab($event)" type="tel" maxlength="4" v-model="creditCardInfo.cardNum1" class="w-full focus:border-0 focus:ring-blue-500 focus:ring-1 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                      <span v-if="errors.length > 0" class="text-red-500 text-xs absolute -bottom-5 left-0 whitespace-pre">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider :name="'信用卡卡號' + (2)" rules="required|onlyNumber|min:4" v-slot="{ errors }" class="relative">
                      <input id="cardNum2" @input="autoTab($event)" ref="cardNum2" type="tel" maxlength="4" v-model="creditCardInfo.cardNum2" class="w-full focus:border-0 focus:ring-blue-500 focus:ring-1 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                    </ValidationProvider>
                    <ValidationProvider :name="'信用卡卡號' + (3)" rules="required|onlyNumber|min:4" v-slot="{ errors }" class="relative">
                      <input id="cardNum3" @input="autoTab($event)" ref="cardNum3" type="tel" maxlength="4" v-model="creditCardInfo.cardNum3" class="w-full focus:border-0 focus:ring-blue-500 focus:ring-1 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                    </ValidationProvider>
                    <ValidationProvider :name="'信用卡卡號' + (4)" rules="required|onlyNumber|min:4" v-slot="{ errors }" class="relative">
                      <input id="cardNum4" @input="autoTab($event)" ref="cardNum4" type="tel" maxlength="4" v-model="creditCardInfo.cardNum4" class="w-full focus:border-0 focus:ring-blue-500 focus:ring-1 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                    </ValidationProvider>
                  </div>
                </div>

                <!-- 有效日期 CVV -->
                <div class="hidden md:block md:col-span-2">
                  <label class="table-cell" for="expiredMonth">有效日期 : </label>
                </div>
                <div class="block md:hidden col-span-12">
                  <div class="grid grid-cols-2">
                    <label class="table-cell" for="expiredMonth">有效日期 : </label>
                    <label class="table-cell" for="expiredMonth">CVV : </label>
                  </div>
                </div>
                <div class="col-span-12 md:col-span-10 -translate-y-3 md:-translate-y-0">
                  <div class="grid grid-cols-4 gap-4 md:gap-6">
                    <div>
                      <ValidationProvider name="月份" rules="required|onlyNumber" v-slot="{ errors }" class="relative">
                        <input id="expiredMonth" minlength="2" ref="expiredMonth" @input="autoTab($event)" type="tel" placeholder="MM" maxlength="2" v-model="creditCardInfo.expiredMonth" class="w-full focus:border-0 focus:ring-blue-500 focus:ring-1 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                        <span v-if="errors.length > 0" class="text-red-500 text-xs absolute -bottom-7 left-0 whitespace-pre">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div>
                      <ValidationProvider name="年份" rules="required|onlyNumber" v-slot="{ errors }" class="relative">
                        <input id="expiredYear" minlength="2" ref="expiredYear" @input="autoTab($event)" type="tel" placeholder="YY" maxlength="2" v-model="creditCardInfo.expiredYear" class="w-full focus:border-0 focus:ring-blue-500 focus:ring-1 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                        <span v-if="errors.length > 0" class="text-red-500 text-xs absolute -bottom-7 left-4 whitespace-pre">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="hidden md:flex items-center">
                      <label for="cvv">CVV : </label>
                    </div>
                    <div>
                      <ValidationProvider name="CVV" rules="required|onlyNumber" v-slot="{ errors }" class="relative">
                        <input id="cvv" ref="cvv" minlength="3" type="tel" v-model="creditCardInfo.cvv" maxlength="3" class="w-full focus:border-0 focus:ring-blue-500 focus:ring-1 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                        <span v-if="errors.length > 0" class="text-red-500 text-xs absolute -bottom-7 left-4 whitespace-pre">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <!-- 手機號碼 -->
                <div class="col-span-12 md:col-span-2">
                  <label class="table-cell" for="creditPhone">手機號碼 : </label>
                </div>
                <ValidationProvider name="手機號碼" rules="required|onlyNumber|max:10" v-slot="{ errors }" class="col-span-12 md:col-span-10 relative -translate-y-3 md:-translate-y-0">
                  <input id="creditPhone" type="tel" maxlength="10" v-model="creditCardInfo.phone" class="focus:border-0 focus:ring-blue-500 focus:ring-1 w-2/3 lg:w-1/2 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{'outline outline-[#ff4444] border-0': errors.length > 0}">
                  <span v-if="errors.length > 0" class="text-red-500 text-xs absolute -bottom-5 left-0 whitespace-pre">{{ errors[0] }}</span>
                </ValidationProvider>

            </div>
          </div>
        </transition>

        <!-- 訂單金額 -->
        <div class="flex items-center justify-end space-x-10 mb-10 md:mb-16">
          <span class="text-lg font-bold">訂單金額</span>
          <span class="text-3xl font-bold text-[#FA5936]">${{ totalPrice }}</span>
        </div>

        <!-- 確認結帳按鈕 -->
        <div class="flex justify-center">
          <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="py-3.5 px-20 rounded-xl shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FA5936] to-[#FF6D3F] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80">確認結帳</button>
        </div>
      </form>
    </ValidationObserver>

    <!-- 優惠券彈出視窗 -->
    <Modal :openModal="openModal" :width="'w-11/12 lg:w-full md:w-7/12 xl:w-7/12'" @closeModal="closeModal">
      <div class="p-0 lg:px-5 lg:py-0">
        <h4 class="text-2xl font-bold mb-6">使用優惠碼</h4>
        <div class="relative w-full lg:w-1/2">
          <input type="text" ref="addCouponInput" v-model="addCouponInput" @keyup.enter="handleAddCoupon()" class="focus:ring-1 focus:ring-[#FA5936] focus:outline-none border w-full border-[#c4c4c4] rounded-xl p-3" placeholder="請輸入優惠碼" />
          <button @click="handleAddCoupon()" data-mdb-ripple="true" data-mdb-ripple-color="light" class="duration-300 absolute flex justify-center cursor-pointer items-center w-3/12 h-full top-0 right-0 rounded-tr-xl rounded-br-xl bg-[#FA5936] hover:bg-[#f15734]">
            <span class="text-white">新增</span>
          </button>
        </div>
        <h4 class="text-2xl font-bold mt-8">我的折價券</h4>
        <div class="mt-5" v-if="tickets.length > 0">
          <transition-group tag="div" name="fade">
            <Ticket :class="{'cursor-pointer': ticket.isCanUse}" v-for="ticket in tickets" :key="ticket.id" @openCouponDetail="openCouponDetail($event)" :id="ticket.id" :type="ticket.type" :name="ticket.name" :time="ticket.time" :rules="ticket.rules" :countOff="ticket.countOff" :page="'checkout'" :isCanUse="ticket.isCanUse" :selectedId="selectedId" @click.native="selectCoupon(ticket.id, ticket.isCanUse)" />
          </transition-group>
        </div>
        <div v-else class="flex justify-center items-center flex-col w-full h-60">
          <fa class="w-24 h-20 text-[#a3a3a3]" :icon="['fas', 'ticket']" />
          <span class="text-lg text-[#a3a3a3] select-none"> 目前無優惠券 </span>
        </div>
      </div>
      <div class="flex justify-center">
        <button @click="handleUseCoupon()" data-mdb-ripple="true" data-mdb-ripple-color="light" class="my-2 duration-150 px-24 py-4 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80">確認</button>
      </div>
    </Modal>

    <!-- 優惠券詳情彈出視窗 -->
    <Modal :openModal="openCouponDetailModal" :title="'優惠券詳情'" :headerBorder="true" :width="'w-11/12 lg:w-full md:w-7/12 xl:w-7/12'" @closeModal="closeCouponDetail">
      <div class="py-5">
        <h3 class="font-bold text-lg">{{ couponDetail.name }}</h3>
        <div class="w-full bg-[#FFF5C2] p-5">
          已超過使用日期
        </div>
        <div class="my-5">
          <h4 class="font-bold text-lg">優惠內容：</h4>
          <span v-if="couponDetail.type === 'cash'">{{couponDetail.countOff}}元折價</span>
          <span v-else>{{ couponDetail.countOff }}折折價</span>
        </div>
        <div class="my-5">
          <h4 class="font-bold text-lg">有效日期：</h4>
          <span>{{ couponDetail.time }}</span>
        </div>
        <div class="my-5">
          <h4 class="font-bold text-lg">使用條件：</h4>
          <ul class="list-decimal pl-5">
            <li v-for="(item, idx) in couponDetail.rules" :key="idx">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="flex justify-center">
          <button @click="closeCouponDetail()" data-mdb-ripple="true" data-mdb-ripple-color="light" class="my-5 duration-150 px-24 py-4 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80">回上一頁</button>
        </div>
      </div>
    </Modal>

    <!-- 新增地址彈出視窗 -->
    <Modal :openModal="openAddAddressModal" :width="'w-11/12 lg:w-full md:w-7/12 xl:w-7/12'" @closeModal="closeAddAddressModal">
      <h3 class="text-2xl font-bold md:px-6">新增地址</h3>
      <span class="text-lg md:px-6">請確認你已提供與身份證件相同之真實姓名，以便取貨時供超商店員核對</span>
      
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(closeAddAddressModal)" class="mt-5">
          <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 md:px-6" for="name">收件人姓名<span class="text-[#FA5936]">*</span></label>
          <div class="form-group relative pb-6">
            <ValidationProvider name="收件人姓名" rules="required" v-slot="{ errors }" class="w-full">
              <div class="w-full lg:w-1/2 relative md:px-6">
                <input id="name" type="text" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸入姓名" v-model="deliveryInfo.name" />
                <span v-if="errors.length > 0" class="absolute left-3 md:left-8 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 md:px-6" for="phone">手機號碼<span class="text-[#FA5936]">*</span></label>
          <div class="form-group relative pb-6">
            <ValidationProvider name="手機號碼" rules="required" v-slot="{ errors }" class="w-full">
              <div class="w-full lg:w-1/2 relative md:px-6">
                <input id="phone" type="tel" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸入手機號碼" v-model="deliveryInfo.phone" />
                <span v-if="errors.length > 0" class="absolute left-3 md:left-8 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <label v-if="checkoutInfo.deliveryType !== 'home'" class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 md:px-6" for="store">選擇門市</label>
          <label v-else class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700 md:px-6" for="address">地址</label>
          <div class="form-group relative pb-6" :class="{'md:pl-6 md:pr-16': checkoutInfo.deliveryType !== 'home'}">
            <ValidationProvider v-if="checkoutInfo.deliveryType !== 'home'" name="門市" rules="required" v-slot="{ errors }" class="w-full">
              <div class="w-full lg:w-1/2 relative px-3 border border-[#a3a3a3] rounded-md py-1 cursor-pointer group">
                <input id="store" type="text" class="hidden" v-model="deliveryInfo.address" />
                <div class="flex items-center space-x-2.5">
                  <img v-if="checkoutInfo.deliveryType === '711'" src="~/static/images/icon/seven.svg" alt="7-11">
                  <img v-else src="~/static/images/icon/familyMart.svg" alt="familyMart">
                  <span v-if="checkoutInfo.deliveryType === '711'">7-11</span>
                  <span v-else>全家</span>
                </div>
                <fa class="absolute duration-300 right-5 top-1/2 -translate-y-2 text-lg group-hover:right-2" icon="fa-solid fa-angle-right"></fa>
                <span v-if="errors.length > 0" class="absolute left-3 -bottom-5 text-red-500 text-xs">尚未選擇門市</span>
              </div>
            </ValidationProvider>
            <ValidationProvider v-else name="地址" rules="required" v-slot="{ errors }" class="w-full">
              <div class="w-full lg:w-1/2 relative md:px-6">
                <input type="text" id="address" class="form-control focus:border-0 focus:ring-blue-500 focus:ring-1 w-full lg:w-full px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-md transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸入收件地址" v-model="deliveryInfo.address">
                <span v-if="errors.length > 0" class="absolute left-10 -bottom-5 text-red-500 text-xs">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="flex justify-center">
            <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="my-5 duration-150 px-24 py-4 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80">確認</button>
          </div>
        </form>
      </ValidationObserver>
    </Modal>

  </section>
</template>

<script>
export default {
  name: "cart-checkout",
  data() {
    return {
      // 結帳資訊
      checkoutInfo: {
        name: "",
        phone: "",
        email: "",
        note: "",
        deliveryAddress: "",
        deliveryType: "",
        paymentType: "",
      },
      //
      usePoint: false,
      point: 110,
      useCoupon: false,
      coupon: 150,
      totalPrice: 1840,
      // 購物清單
      checkoutList: [
        {
          id: 1,
          imgUrl: require("~/static/images/product_example.png"),
          title: "縱谷間的茶・經典有機紅烏龍",
          quantity: 1,
          sale: 890,
        },
        {
          id: 2,
          imgUrl: require("~/static/images/product_example.png"),
          title: "縱谷間的茶・經典有機紅烏龍2",
          quantity: 3,
          sale: 790,
        },
      ],
      // 物流
      deliveryList: [
        { id: 1, label: "7-11", value: "711",
          options: [{id: 1, name: '7-11大興門市', address: '241新北市三重區仁華街80巷27號'}]
        },
        { id: 2, label: "全家", value: "family",
          options: [{id: 1, name: '全家正隆店', address: '220新北市板橋區三民路二段正隆巷34號'}]
        },
        { id: 3, label: "宅配", value: "home",
          options: [{id: 1, address: '106台北市大安區大安森林公園'}]
        },
      ],
      deliveryInfo: {
        type: '',
        name: '',
        phone: '',
        address: ''
      },
      //付款方式清單
      payList: [
        {id:1, label: '信用卡一次付清', value: '信用卡一次付清'},
        {id:2, label: '信用卡分期', value: '信用卡分期'},
        {id:3, label: '貨到付款', value: '貨到付款'},
        {id:4, label: 'ATM轉帳', value: 'ATM轉帳'},
        {id:5, label: 'Line Pay', value: 'Line Pay'},
        {id:6, label: '街口支付', value: '街口支付'},
        {id:7, label: 'Apple Pay', value: 'Apple Pay'},
        {id:8, label: '悠遊付', value: '悠遊付'},
      ],
      creditCardInfo: {
        name: '',
        cardNum1: '',
        cardNum2: '',
        cardNum3: '',
        cardNum4: '',
        expiredMonth: '',
        expiredYear: '',
        cvv: '',
        phone: ''
      },
      // 優惠券
      tickets: [
        {
          id: 1,
          type: "cash",
          countOff: 150,
          name: "首購折價券",
          time: "2021/01/20-2022/04/01",
          rules: ["說明說明說明"],
          isCanUse: true,
        },
        {
          id: 2,
          type: "discount",
          countOff: 95,
          name: "周年慶折價券",
          time: "2021/01/20-2022/04/01",
          rules: ["說明說明說明"],
          isCanUse: true,
        },
        {
          id: 3,
          type: "discount",
          countOff: 85,
          name: "生日折價券",
          time: "2021/01/20-2022/03/01",
          rules: ["說明說明說明", "說明說明說明", "說明說明說明", "說明說明說明"],
          isCanUse: false,
        },
      ],
      selectedId: 0,
      openModal: false,
      openCouponDetailModal: false,
      couponDetail: {},
      openAddAddressModal: false,
      addCouponInput: "",
    };
  },
  computed: {
    totalQuantity() {
      let total = 0;
      this.checkoutList.forEach((item) => {
        total += item.quantity;
      });
      return total;
    },
    cartPrice() {
      let total = 0;
      this.checkoutList.forEach((item) => {
        total += item.sale * item.quantity;
      });
      return total;
    },
  },
  methods: {
    closeModal() {
      this.openModal = false
    },
    closeCouponDetail() {
      this.openCouponDetailModal = false
    },
    selectCoupon(id, isCanUse) {
      if (!isCanUse) return;
      this.selectedId === id ? (this.selectedId = 0) : (this.selectedId = id);
    },
    openCouponDetail(detail) {
      this.couponDetail = detail
      this.openCouponDetailModal = true;
    },
    handleOpenAddAddressModal(type) {
      console.log(type)
      this.openAddAddressModal = true
    },
    closeAddAddressModal() {
      this.openAddAddressModal = false
    },
    handleUseCoupon() {
      if (this.selectedId !== 0) {
        this.useCoupon = true;
      } else {
        this.useCoupon = false;
      }
      this.closeModal();
    },
    handleAddCoupon() {
      this.addCouponInput = this.addCouponInput.trim();
      if (!this.addCouponInput) return;
      this.$swal.fire({
        icon: "success",
        title: "新增優惠券成功",
        timer: 1000,
        showConfirmButton: false,
      });
      const ticket = {
        id: Math.floor(Date.now()),
        type: "cash",
        countOff: 299,
        name: "新增的折價券",
        time: "2021/01/20-2022/04/01",
        rules: ["新增的Ticket"],
        isCanUse: true,
      };
      this.tickets.push(ticket);
      this.addCouponInput = "";
      this.$refs.addCouponInput.blur();
    },
    // 刪除寄送地址
    deleteAddress(store, addr) {
      const target = this.deliveryList.find(item => item.value === store)
      target.options.forEach((item, idx) => {
        if (item.address === addr) {
          target.options.splice(idx, 1)
        }
      })
      this.checkoutInfo.deliveryAddress = ''
    },
    autoTab(e) {
      e.path[0]
      switch(e.path[0].id) {
        case'cardNum1':
          if (e.path[0].value.length === 4) {
            this.$refs.cardNum2.focus()
          }
          break
        case'cardNum2':
          if (e.path[0].value.length === 4) {
            this.$refs.cardNum3.focus()
          }
          break
        case'cardNum3':
          if (e.path[0].value.length === 4) {
            this.$refs.cardNum4.focus()
          }
          break
        case 'cardNum4':
          if (e.path[0].value.length === 4) {
            this.$refs.expiredMonth.focus()
          }
          break
        case 'expiredMonth':
          if (e.path[0].value.length === 2) {
            this.$refs.expiredYear.focus()
          }
          break
        case 'expiredYear':
          if (e.path[0].value.length === 2) {
            this.$refs.cvv.focus()
          }
          break
      }
    },
    submitCheckout() {
      this.$router.push('/cart/finish')
    },
  },
};
</script>
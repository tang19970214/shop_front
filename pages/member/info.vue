<template>
  <section class="w-full lg:px-12">
    <h2 class="text-lg mb-4 font-bold tracking-widest">修改會員資料</h2>
    <div class="w-full rounded-xl pb-6 lg:p-10 lg:pb-6 border-none lg:border lg:border-[#a3a3a3] lg:border-solid">
      <ValidationObserver ref="form">
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700" for="accountId">姓名<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="姓名" rules="required" v-slot="{ errors }" class="w-full">
            <input id="accountId" type="text" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-lg transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸姓名" v-model="member.name" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700" for="phoneId">手機號碼<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="手機號碼" rules="required" v-slot="{ errors }" class="w-full">
            <input id="phoneId" type="tel" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-lg transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸手機號碼" v-model="member.phone" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700" for="emailId">Email<span class="text-[#FA5936]">*</span></label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="email" rules="required" v-slot="{ errors }" class="w-full">
            <input id="emailId" type="email" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-lg transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" placeholder="請輸Email" v-model="member.email" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700" for="birthdayId">生日</label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="生日" rules="required" v-slot="{ errors }" class="w-full">
            <input id="birthdayId" type="date" lang="fr-CA" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-lg transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" v-model="member.birthday" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <label class="form-label tracking-widest text-lg inline-block mb-2 text-gray-700" for="addressId">取貨地點</label>
        <div class="form-group relative pb-6">
          <ValidationProvider name="取貨地點" rules="required" v-slot="{ errors }" class="w-full">
            <input id="addressId" type="text" class="form-control w-full lg:w-1/2 px-3 py-1.5 text-gray-700 border border-[#a3a3a3] rounded-lg transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none" :class="{ 'border-[#EF4444]': errors.length > 0 }" v-model="member.address" />
            <span v-if="errors.length > 0" class="absolute left-0 bottom-1 text-red-500 text-xs">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <p class="text-lg mb-2">連結帳號</p>
        <div class="space-y-2">
          <div class="w-full lg:w-1/2 pl-4 flex justify-between border border-solid border-[#9A9999] rounded-lg">
            <div class="flex items-center space-x-2.5 my-2.5">
              <img src="~/static/images/icon/facebook.svg" alt="Facebook" width="24px" />
              <p class="text-lg">Facebook</p>
            </div>
            <a class="duration-150 cursor-pointer h-100 flex items-center px-4 text-lg border-l border-[#9A9999] hover:text-red-500">解除連結</a>
          </div>
          <div class="w-full lg:w-1/2 pl-4 flex justify-between border border-solid border-[#9A9999] rounded-lg">
            <div class="flex items-center space-x-2.5 my-2.5">
              <img src="~/static/images/icon/google.svg" alt="Google" width="24px" />
              <p class="text-lg">Google</p>
            </div>
            <a class="duration-150 cursor-pointer h-100 flex items-center px-4 text-lg border-l border-[#9A9999] hover:text-red-500">解除連結</a>
          </div>
          <div class="w-full lg:w-1/2 pl-4 flex justify-between border border-solid border-[#9A9999] rounded-lg">
            <div class="flex items-center space-x-2.5 my-2.5">
              <img src="~/static/images/icon/line.svg" alt="Line" width="24px" />
              <p class="text-lg">Line</p>
            </div>
            <a class="duration-150 cursor-pointer h-100 flex items-center px-4 text-lg border-l border-[#9A9999] hover:text-red-500">解除連結</a>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" data-mdb-ripple="true" data-mdb-ripple-color="light" class="mt-16 duration-150 px-20 py-4 rounded-lg shadow-md text-white text-lg tracking-widest bg-gradient-to-r from-[#FF6D3F] to-[#FA5936] hover:shadow-inner disabled:cursor-not-allowed disabled:opacity-80" @click="handleSave()">儲存</button>
        </div>
      </ValidationObserver>
    </div>
  </section>
</template>
<script>
import Cookies from "js-cookie";
export default {
  name: "member-info",
  data() {
    return {
      profile: {},
      member: {
        name: "",
        phone: "",
        email: "",
        birthday: "",
        address: "",
      },
    };
  },
  methods: {
    handleSave() {
      this.$swal.fire({
        icon: "success",
        title: "會員資料已修改",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    async getMemberByToken() {
      // TODO:@George --save userInfo to vuex from permission
      await this.api.members
        .getMemberByToken()
        .then((res) => {
          const { code, result } = res.data;
          if (code === 200) {
            this.member.name = result.name;
            this.member.email = result.email;
            this.member.phone = result.phone;
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  mounted() {
    this.getMemberByToken();
  },
};
</script>

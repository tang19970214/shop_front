import Vue from 'vue'
import { required, min } from 'vee-validate/dist/rules'
import * as rules from "vee-validate/dist/rules";
import { ValidationProvider,ValidationObserver, extend, localize} from 'vee-validate'
import tw from "vee-validate/dist/locale/zh_TW.json";

localize('zh_TW', tw);
extend('required',required)
extend('min', min); //最小用冒號 ex. max:8

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

extend('customerSizeMax50Mb',{
  message: (filed) =>`${filed} ${locale.validations.messages.maxSize50Mb}`,
  validate: (val) => {
    const fileSizeMax = 1024*1024*50
    if(val[0].size> fileSizeMax){
      return false
    }
    return true
  }
})

// 自定義確認密碼message
extend('confirmed', {
  message: (filed) => `${filed}須和新密碼一致`
})

// 自定義包含英文加數字
extend('requireAlphaNum', {
  message: (filed) =>`${filed} 須包含英文及數字`,
  validate: (val) => {
    if (/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i.test(val)) {
      return true
    } else {
      return false
    }
  }
})

// extend('required', {
//   ...required,
//   message: (filed) => `請輸入${filed}`,
// });

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

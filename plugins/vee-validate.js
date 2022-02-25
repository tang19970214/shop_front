import Vue from 'vue'
import { required, min } from 'vee-validate/dist/rules'
import { ValidationProvider,ValidationObserver, extend, localize} from 'vee-validate'
import tw from "vee-validate/dist/locale/zh_TW.json";

localize('zh_TW', tw);
extend('required',required)
extend('min', min); //最小用冒號 ex. max:8

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

extend('required', {
  ...required,
  message: (filed) => `請輸入${filed}`,
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

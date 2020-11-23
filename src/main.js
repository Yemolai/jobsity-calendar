import dotEnv from 'dotenv'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import createStore from './store'
import './main.css'
import { chrome as ColorPicker } from 'vue-color'

dotEnv.config()

Vue.config.productionTip = false

Vue.use(Vuex)

const app = new Vue({
  components: { ColorPicker },
  render: h => h(App),
  store: createStore()
})

app.$mount('#app')

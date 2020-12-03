import dotEnv from 'dotenv'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import createStore from './store'
import './main.css'
import vuetify from './plugins/vuetify'

dotEnv.config()

Vue.config.productionTip = false

Vue.use(Vuex)

const app = new Vue({
  render: h => h(App),
  vuetify,
  store: createStore()
})

app.$mount('#app')

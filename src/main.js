import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount('#app')

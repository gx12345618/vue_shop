import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
// Vue.prototype.$message = Message
//全局注册组件
Vue.component('tree-table', TreeTable)
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)
// 配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// axios请求拦截 (通过axios请求拦截器添加token，保证拥有获取数据的权限)
axios.interceptors.request.use(config => {
  console.log(config)
  // 为请求头对象，添加token验证的Authorization字段 Authorization为自定义属性
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

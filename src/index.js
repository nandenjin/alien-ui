// Components
import CircularInput from './components/CircularInput.vue'

export { CircularInput }

// Installer for Vue.use()
export function install(Vue) {
  if (install.installed) return
  install.installed = true

  Vue.components('CircularInput', CircularInput)
}

// Auto install for import by <script>
const plugin = { install }

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

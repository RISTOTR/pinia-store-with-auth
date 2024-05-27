
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

// Icons and Styles
import FontAwesomePlugin from "./plugins/FontAwesome";
import "./assets/main.css";

import App from './App.vue'
import router from './router'

// App Wide Components
import AppButton from "./components/AppButton.vue";
import AppCountInput from "./components/AppCountInput.vue";
import AppModalOverlay from "./components/AppModalOverlay.vue";
import { PiniaHistoryPlugin } from "./plugins/PiniaHistoryPlugin";

const pinia = createPinia()
pinia.use(PiniaHistoryPlugin)
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

// Init App
createApp(App)
  .use(pinia)
  .use(router)
  .use(FontAwesomePlugin)
  .component("AppButton", AppButton)
  .component("AppCountInput", AppCountInput)
  .component("AppModalOverlay", AppModalOverlay)
  .mount("#app");

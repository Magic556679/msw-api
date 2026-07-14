import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

async function enableMocking() {
  const { worker } = await import('./mock/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  })
}

enableMocking().then(() => {
  createApp(App).mount('#app')
})

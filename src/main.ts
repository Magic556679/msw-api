import './style.css'

async function enableMocking() {
  const { worker } = await import('./mock/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  })
}

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <section id="center">
    <h1>MSW + GitHub Pages Deploy Test</h1>
    <p id="status">Starting MSW worker…</p>
    <pre id="result"></pre>
  </section>
`

const statusEl = document.querySelector<HTMLParagraphElement>('#status')!
const resultEl = document.querySelector<HTMLPreElement>('#result')!

enableMocking()
  .then(() => {
    statusEl.textContent = 'MSW worker started. Fetching /api/hello …'
    return fetch('/api/hello')
  })
  .then((res) => res.json())
  .then((data) => {
    statusEl.textContent = 'Mock response received:'
    resultEl.textContent = JSON.stringify(data, null, 2)
  })
  .catch((err) => {
    statusEl.textContent = 'Failed to start MSW or fetch mock data.'
    resultEl.textContent = String(err)
  })

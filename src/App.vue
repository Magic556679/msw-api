<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Fetching /api/hello …')
const result = ref('')

fetch('/api/hello')
  .then((res) => res.json())
  .then((data) => {
    status.value = 'Mock response received:'
    result.value = JSON.stringify(data, null, 2)
  })
  .catch((err) => {
    status.value = 'Failed to fetch mock data.'
    result.value = String(err)
  })
</script>

<template>
  <section id="center">
    <h1>MSW Deploy Test</h1>
    <p id="status">{{ status }}</p>
    <pre id="result">{{ result }}</pre>
  </section>
</template>

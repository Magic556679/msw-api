import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({
      code: 0,
      message: 'ok',
      data: { text: 'Hello from MSW mock 🎉', time: new Date().toISOString() },
    })
  }),
]

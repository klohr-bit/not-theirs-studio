import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only adapter so /api/signature works under `vite` without `vercel dev`.
// In production (Vercel), the file in /api is run as a serverless function and
// this middleware is never used.
function devApiSignature() {
  return {
    name: 'dev-api-signature',
    configureServer(server) {
      server.middlewares.use('/api/signature', async (req, res, next) => {
        if (req.method !== 'POST' && req.method !== 'OPTIONS') return next()
        try {
          const mod = await server.ssrLoadModule('/api/signature.js')
          const handler = mod.default

          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const raw = Buffer.concat(chunks).toString('utf8')
          try { req.body = raw ? JSON.parse(raw) : {} }
          catch { req.body = {} }

          const adapted = {
            statusCode: 200,
            status(code) { res.statusCode = code; return adapted },
            setHeader(k, v) { res.setHeader(k, v); return adapted },
            json(obj) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(obj))
              return adapted
            },
            end(body) { res.end(body) },
          }

          await handler(req, adapted)
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Dev handler crashed', detail: err?.message || String(err) }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Surface every var in .env / .env.local to process.env so the dev API
  // handler can read ANTHROPIC_API_KEY. Vite normally only exposes VITE_-
  // prefixed vars, and only to the client.
  const env = loadEnv(mode, process.cwd(), '')
  for (const k of Object.keys(env)) {
    if (process.env[k] === undefined) process.env[k] = env[k]
  }

  return {
    plugins: [react(), devApiSignature()],
  }
})

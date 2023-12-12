import httpProxy from 'http-proxy'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false
  }
}

export default async function handle(req, res) {
  const headers = {}
  try {
    const session = await getServerSession(req, res, authOptions)
    if (session?.user?.token) {
      headers.Authorization = session.user.token
    } else {
      res.status(401).json({ error: 'Session Expired' })
    }
  } catch (e) {
    res.status(401).json({ error: 'Session Expired' })
  }

  return new Promise((resolve, reject) => {
    const proxy = httpProxy.createProxy()
    proxy.once('proxyRes', resolve)
    proxy.once('error', reject)
    proxy.web(req, res, {
      headers,
      changeOrigin: true,
      target: process.env.HUMCEN_SERVER_HOST
    })
  })
}

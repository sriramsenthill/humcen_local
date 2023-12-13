import axios, { Axios } from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from './pages/api/auth/[...nextauth]'

const basePath = '/api/partner'
axios.defaults.baseURL = (process.env.HUMCEN_SERVER_HOST || '') + basePath

axios.interceptors.request.use((config) => {
  if (config.url.indexOf('/api/noauth/') > -1) {
    config.baseURL = config.baseURL?.replace(basePath, '')
  }
  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      globalThis.location &&
      globalThis.location.href != '/authentication/session-expired' &&
      globalThis.location.href != '/authentication/logout'
    ) {
      if (error.response.data.error == 'Session Expired') {
        globalThis.location.href = '/authentication/session-expired'
      } else {
        globalThis.location.href = '/authentication/logout'
      }
    }
  }
)

const _axios = {}
_axios.getServerAxios = async function (req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user || !session.user.token) return null

    const axiosObj = axios.create({
      headers: {
        Authorization: session.user.token
      }
    })

    return axiosObj
  } catch (e) {
    return null
  }
}

export default _axios

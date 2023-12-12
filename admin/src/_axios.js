import axios from 'axios'

const basePath = '/api/admin'
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

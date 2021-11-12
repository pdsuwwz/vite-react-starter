
const isProduction = import.meta.env.PROD
const isDevelopment = !isProduction

const CONFIG = {
  isProduction,
  isDevelopment,
  title: 'Vite React Starter',
  http: {
    baseURL: import.meta.env.VITE_BASE_API
  },
  github: {
    repositoryUrl: 'https://github.com/pdsuwwz/vite-react-starter',
    bug: 'https://github.com/pdsuwwz/vite-react-starter/issues'
  }
}

export default CONFIG

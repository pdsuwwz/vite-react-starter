import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import path from 'path'


const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml (html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        '<title>Vite React Starter</title>'
      )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development'
  return {
    plugins: [
      reactPlugin(),
      htmlPlugin()
    ],
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },

    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    define: {
      'process.env': process.env
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? '[name]__[local]__[hash:base64:5]'
          : '[hash:base64:5]'
      }
    },

    server: {
      port: 2048
    }
  }
})

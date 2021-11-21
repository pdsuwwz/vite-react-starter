import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import AppRouter from '@/router'

import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import moment from 'moment'
import 'moment/dist/locale/zh-cn'

import '@/styles/global.scss'
import '@/assets/fonts'

moment.locale('zh-cn')

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
      <AppRouter />
    </ConfigProvider>
  </Provider>
  // <React.StrictMode>
  // </React.StrictMode>
  ,
  document.getElementById('root-app')
)

import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom'
import { useAppDispatch, useAppState } from '@/store'
import { RespData } from '@/utils/request'
import { TODO } from '@/store/constants'
import TodoModule from '@/modules/UserAccount/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { IRouteProps } from '@/router/types'

const PermissionAuthorization: React.FC<IRouteProps> = ({ children: Children, ...rest }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const routeMatch = useRouteMatch()
  const history = useHistory()

  const { authLoading } = useAppState(state => state.todo)

  NProgress.configure({
    showSpinner: false
  })

  const cancelLoading = () => {
    dispatch({
      type: TODO.SET_AUTH_LOADING,
      data: false
    })
    setTimeout(() => {
      NProgress.done()
    })
  }
  const handleGetUserInfo = async () => {
    NProgress.start()
    dispatch({
      type: TODO.SET_AUTH_LOADING,
      data: true
    })

    const { error, data }: RespData = await dispatch(TodoModule.actions.getUserInfoData())

    cancelLoading()
  }

  useEffect(() => {
    if (rest.meta?.name === 'UserLogin') {
      cancelLoading()
      return
    }

    console.log('🛡', Math.random())

    handleGetUserInfo()
  }, [dispatch, location ])


  return (
    <>
      {
        authLoading && <div className="spin-global-loading">
          <Spin
            spinning
            size="large"
          />
        </div>
      }
      { Children }
    </>
  )
}

export default PermissionAuthorization

import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom'
import { useAppDispatch, useAppState } from '@/store'
import { RespData } from '@/utils/request'
import { TODO } from '@/store/constants'
import TodoModule from '@/modules/UserAccount/store'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { IRouteProps } from '@/router/types'
import { allowlist } from '@/router/auth-list'

const PermissionAuthorization: React.FC<IRouteProps> = ({ children: Children, ...rest }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const { authLoading } = useAppState(state => state.todo)

  const handleCancelLoading = () => {
    setTimeout(() => {
      dispatch({
        type: TODO.SET_AUTH_LOADING,
        data: false
      })
    })
  }
  const handleGetUserInfo = async () => {
    dispatch({
      type: TODO.SET_AUTH_LOADING,
      data: true
    })

    const { error, data }: RespData = await dispatch(TodoModule.actions.getUserInfoData())

    handleCancelLoading()
  }

  useEffect(() => {
    const metaName = rest.meta?.name
    if (
      allowlist.find(
        name => metaName === name
      )
    ) {
      handleCancelLoading()
      return
    }

    console.log('🛡', Math.random())

    handleGetUserInfo()
  }, [dispatch, location])


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

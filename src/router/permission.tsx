import React, { useState, useEffect } from 'react'
import { useAppState } from '@/store'

const PermissionAuthorization: React.FC = () => {
  const { userInfo } = useAppState(state => state.todo)

  useEffect(() => {
    console.log('userInfo', userInfo)
  }, [userInfo])

  return <></>
}

export default PermissionAuthorization

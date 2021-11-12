import React from 'react'

import { Route, useLocation, useParams } from 'react-router-dom'
import { IRouteProps } from '@/router/types'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppState } from '@/store'
import useQuery from '@/hooks/useQuery'

const NestedID: React.FC<IRouteProps> = (
  {
    children: Children,
    ...rest
  }
) => {
  const params = useParams()
  console.log('adasdasd', params, useQuery())
  return (
    <>
      啦啦啦啦啦
      { JSON.stringify(rest) }
      { Children }
    </>
  )
}

export default NestedID

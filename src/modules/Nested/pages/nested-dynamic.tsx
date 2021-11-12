import React from 'react'

import { useParams } from 'react-router-dom'
import { IRouteProps } from '@/router/types'
import { Link } from 'react-router-dom'
import useQuery from '@/hooks/useQuery'

type queryProps = {
  dynamic?: string
}

const NestedDynamic: React.FC<IRouteProps> = (
  {
    children: Children,
    ...rest
  }
) => {
  const params = useParams<queryProps>()
  const query = useQuery()
  return (
    <>
      <br />
      <div style={
        {
          border: '1px solid red'
        }
      }>
        <div>⚽️ 嵌套路由</div>
        <div>{ JSON.stringify(params) }</div>
        <div>{ JSON.stringify(query) }</div>
        { Children }
      </div>
    </>
  )
}

export default NestedDynamic

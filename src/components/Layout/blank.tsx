import React from 'react'
import { Route } from 'react-router'
import { IRouteProps } from '@/router/types'

/**
 * @description 空白路由 Layout
 */
const BlankLayout: React.FC<IRouteProps> = (
  {
    children: Children,
    ...rest
  }
) => {
  console.log('空白路由节点', rest)
  return (
    <>
      <Route
        {...rest}
        render={
          () => Children
        }
      />
    </>
  )
}

export default BlankLayout

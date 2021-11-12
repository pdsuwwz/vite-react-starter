import React from 'react'
import { Route } from 'react-router'
import { IRouteProps } from '@/router/types'

const DefaultLayout: React.FC<IRouteProps> = (
  {
    children: Children,
    ...rest
  }
) => {
  console.log('Component', rest)
  return (
    <>
      <div style={
        {
          border: '1px solid red'
        }
      }>
        根 Layout
        <Route
          {...rest}
          render={
            () => Children
          }
        />
      </div>
    </>
    // <Route
    //   path={rest.path}
    //   render={props => (
    //     // pass the sub-routes down to keep nesting
    //     <rest.component {...props} />
    //   )}
    // />
    // <Route
    //   {...rest}
    //   component={
    //     matchProps => (
    //       <Childrens
    //         {...matchProps}
    //       />
    //     )
    //   }
    // />
  )
}

export default DefaultLayout

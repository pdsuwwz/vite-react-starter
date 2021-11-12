import React from 'react'

import { Route } from 'react-router'
import { IRouteProps } from '@/router/types'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppState } from '@/store'


const Nested: React.FC<IRouteProps> = (
  {
    children: Children,
    ...rest
  }
) => {
  const state = useAppState((state) => state.todo)
  const dispatch = useAppDispatch()
  // console.log('Nested . 1', 12345)
  return (
    <>
      <div style={
        {
          border: '1px solid green'
        }
      }>
        <div>Nested</div>
        <p>{ JSON.stringify(state) }</p>
        <Link to="/nested/sub">Jump To /nested/sub</Link>
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

export default Nested

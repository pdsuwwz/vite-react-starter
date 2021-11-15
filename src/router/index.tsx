import React, { MutableRefObject, useState, useMemo, useCallback, ComponentType, Suspense, useRef, useEffect, useLayoutEffect, memo } from 'react'
import PrivateRoute from '@/components/PrivateRoute'
import CONFIG from '@/config'
import routesMap from './routes'
import { Location } from 'history'
import { BrowserRouter as Router, Redirect, withRouter, useHistory, useParams, useRouteMatch, useLocation, RouteComponentProps, Route, Switch } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { validateLocalStatus } from '@/store/actions/user'

import SuspenseContainer from '@/shared/SuspenseContainer'
import { IRouteProps } from '@/router/types'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NoMatch from '@/components/exception/404'
import useIsMounted from '@/hooks/useIsMounted'
import { sleep } from '@/utils'
import { TODO } from '@/store/constants'
import { useAppState } from '@/store'
import useBlock from '@/hooks/useBlock'

// Functional Component
// const Routes: React.FC = function () {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(validateLocalStatus())
//   }, [])

//   return (
//       <Router>
//         <SuspenseContainer>
//           <Switch>
//             {routesMap.map((route, idx) => (
//               <PrivateRoute {...route} key={idx} />
//             ))}
//           </Switch>
//         </SuspenseContainer>
//       </Router>
//   )
// }


// Test Auth Component
const AuthComponent: React.FC<IRouteProps & RouteComponentProps> = ({ children: Children, location, ...rest }) => {
  const currentLocation = useLocation<{ notFoundError: boolean }>()

  useBlock(async () => {
    NProgress.configure({
      showSpinner: false
    })
    NProgress.start()
    await sleep()
    NProgress.done()
    console.log('🐂', currentLocation.pathname)
    return {}
  }, rest)

  if (
    rest.redirectUrl &&
    currentLocation.pathname === rest.computedMatch.url
  ) {
    console.log('🌶  重定向: ', currentLocation.pathname, rest.computedMatch.url)
    return <Redirect to={rest.redirectUrl}></Redirect>
  }
  console.log('在这里可以鉴权吧。。。', location.pathname)
  // const hasErrorState = currentLocation && currentLocation.state && currentLocation.state.notFoundError
  // return React.cloneElement(Children, { ...rest })
  return Children
}
const Auth = withRouter(AuthComponent)

export const NoMatchRoute: React.FC = () => {
  return (
    <Route name="404 not found">
      <NoMatch />
    </Route>
  )
}


// export default Routes

type Props = ReturnType<typeof mapDispatchToProps>

const RenderComponent: React.FC<IRouteProps & RouteComponentProps> = () => {
  const location = useLocation<{ notFoundError: boolean }>()
  const hasErrorState = location && location.state && location.state.notFoundError
  console.log('是否 404', hasErrorState)
  return (
    <>
      {
        hasErrorState
          ? <NoMatchRoute />
          : (
            <SuspenseContainer>
              <Switch>
                { routesMap.map(
                  (route, idx) => {
                    return (
                      <Auth {...route} key={idx}>
                        <PrivateRoute {...route}/>
                      </Auth>
                    )
                  })
                }
                <NoMatchRoute />
              </Switch>
            </SuspenseContainer>
          )
      }
    </>
  )
}


// Class Component
class MyRouter extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.validateLocalStatus()
  }
  render() {
    return (
      <Router>
        <Route component={ RenderComponent }
        ></Route>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    validateLocalStatus: () => dispatch(validateLocalStatus())
  }
}

export default connect(null, mapDispatchToProps)(MyRouter)

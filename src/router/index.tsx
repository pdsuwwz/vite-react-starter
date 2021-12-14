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
import NoMatch from '@/components/Exception/404'
import useIsMounted from '@/hooks/useIsMounted'
import { sleep } from '@/utils'
import { TODO } from '@/store/constants'
import { useAppState } from '@/store'
import Permission from '@/router/permission'


// TODO: Auth Component
const AuthComponent: React.FC<IRouteProps & RouteComponentProps> = ({ children: Children, location, ...rest }) => {
  const currentLocation = useLocation<{ notFoundError: boolean }>()

  if (
    rest.redirectUrl &&
    currentLocation.pathname === rest.computedMatch.url
  ) {
    console.log('🌶  重定向: ', currentLocation.pathname, rest.computedMatch.url)
    return <Redirect to={rest.redirectUrl}></Redirect>
  }

  console.log('Hey there, Authorization, 在这里可以鉴权吧。。。', location.pathname)
  return (
    <>
      <Permission {...rest}>
        { Children }
      </Permission>
    </>
  )
}
const Auth = withRouter(AuthComponent)

export const NoMatchRoute: React.FC = () => {
  return (
    <Route>
      <NoMatch />
    </Route>
  )
}


type Props = ReturnType<typeof mapDispatchToProps>

const RenderComponent: React.FC = () => {
  const location = useLocation<{ notFoundError: boolean }>()
  const isNotFoundError = location && location.state && location.state.notFoundError
  console.log('isNotFoundError 404: ', isNotFoundError)
  return (
    <>
      {
        isNotFoundError
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


class AppRouter extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.validateLocalStatus()
  }
  render() {
    return (
      <Router>
        <Route>
          <RenderComponent />
        </Route>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    validateLocalStatus: () => dispatch(validateLocalStatus())
  }
}

export default connect(null, mapDispatchToProps)(AppRouter)

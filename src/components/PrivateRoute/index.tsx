import React from 'react'
import CONFIG from '@/config'
import { Switch, Route, Redirect, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import { IRouteProps } from '@/router/types'
import { connect } from 'react-redux'
import { StoreState } from '@/store/index'
import SuspenseContainer from '@/shared/SuspenseContainer'


const RouteNotFound = () => {
  console.log('🍉🍉🍉🍉🍉🍉🍉')
  return <Redirect to={Object.assign({}, location, { state: { notFoundError: true } }) }></Redirect>
}


type Props = IRouteProps & ReturnType<typeof mapStateToProps>

const PrivateRoute: React.FC<Props> = function ({
  component: CurrentComponent,
  childrenRoutes,
  isLogin,
  ...rest
}) {
  const { meta } = rest
  const location = useLocation()


  if (meta) {
    if (meta.title) {
      document.title = `${meta.title} - ${CONFIG.title}`
    } else {
      document.title = CONFIG.title
    }
  }

  return (
    <Route {...rest} render={props => {
      return (
        <CurrentComponent {...props}>
          {Array.isArray(childrenRoutes) ? (
            <SuspenseContainer>
              <Switch>
                {
                  childrenRoutes.map((route, idx: number) => {
                    return (
                      <PrivateRouteComponent {...route} key={idx} />
                    )
                  })
                }
                <RouteNotFound />
              </Switch>
            </SuspenseContainer>
          ) : <></>}
        </CurrentComponent>
      )
    }} />
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    isLogin: state.user.isLogin
  }
}

export const PrivateRouteComponent = connect(mapStateToProps)(PrivateRoute)

export default PrivateRouteComponent

import React, { ComponentType, lazy } from 'react'
import { IRouteProps } from '@/router/types'
import NoMatch from '@/components/exception/404'
import { Redirect } from 'react-router'


import Nested from '@/modules/Nested/pages/nested'
import NestedSub from '@/modules/Nested/pages/nested-sub'

export const lazyMinLoadTime = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>, minLoadTimeMs = 2000) =>
  lazy(() =>
    Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(([moduleExports]) => moduleExports)
  )

const DefaultLayout = lazy(() => import('@/components/Layout/index'))
const BlankLayout = lazy(() => import('@/components/Layout/blank'))

const RedirectRoot: React.FC = () => {
  return (
    <Redirect
      from="/"
      to={{
        pathname: '/nested'
      }}
    />
  )
}

const routesMap: IRouteProps[] = [
  {
    path: '/',
    exact: true,
    redirectUrl: '/user',
    component: DefaultLayout,
    meta: {
      title: '根目录'
    }
  },
  {
    path: '/nested',
    name: 'Nesteddd',
    component: lazy(() => import('@/modules/Nested/pages/nested')),
    childrenRoutes: [
      {
        path: '/nested',
        exact: true,
        component: BlankLayout,
        meta: {
          title: '嵌套路由 - 父路由'
        }
      },
      {
        path: '/nested/sub',
        exact: true,
        component: lazy(() => import('@/modules/Nested/pages/nested-sub')),
        meta: {
          title: '嵌套路由 - 子路由'
        }
      },
      {
        path: '/nested/:dynamic',
        // exact: true,
        component: lazy(() => import('@/modules/Nested/pages/nested-dynamic')),
        meta: {
          title: '嵌套动态根路由 - 子路由'
        },
        childrenRoutes: [
          {
            path: '/nested/:dynamic',
            exact: true,
            component: BlankLayout,
            meta: {
              title: '嵌套动态根路由 - 子路由'
            }
          },
          {
            path: '/nested/:dynamic/post',
            exact: true,
            component: lazy(() => import('@/modules/Nested/pages/nested-post')),
            meta: {
              title: '测试多层嵌套post'
            }
          },
          {
            path: '/nested/:dynamic/:subReview',
            exact: true,
            component: lazy(() => import('@/modules/Nested/pages/nested-dynamic')),
            meta: {
              title: '测试多层嵌套 subReview'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    component: DefaultLayout,
    redirectUrl: '/user/login',
    childrenRoutes: [
      {
        path: '/user/login',
        exact: true,
        component: lazy(() => import('@/modules/UserAccount/pages/login')),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/user/aaa',
        exact: true,
        component: lazy(() => import('@/modules/Nested/pages/nested-sub')),
        meta: {
          title: 'user - aaa'
        }
      },
      {
        path: '/user/:abc',
        exact: true,
        component: lazy(() => import('@/modules/Nested/pages/nested-id')),
        meta: {
          title: '测试测试'
        }
      }
    ]
  },
  {
    path: '/blog/:slug',
    exact: true,
    component: lazy(() => import('@/modules/Nested/pages/nested-id'))
  },
  {
    path: '/404',
    component: NoMatch
  }
  // {
  //   path: HOME.NO_MATCH.path,
  //   component: NoMatch,
  //   meta: {
  //     requiresAuth: false,
  //     title: HOME.NO_MATCH.name
  //   }
  // }
]

export default routesMap
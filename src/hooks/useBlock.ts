import { useRef, useEffect } from 'react'
import { useAppState } from '@/store'
import { useHistory } from 'react-router-dom'
import { Location } from 'history'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * @description Hook function that blocks routing changes
 * @param asyncFunc Return truthy if you wish to block. Empty return or false will not block
 */
export default function useBlock<T> (asyncFunc: Function = async () => (''), rest: any) {
  const { block, push, goBack, goForward, location } = useHistory<{back: string, current: string}>()
  const todo = useAppState(state => state.todo)

  const lastLocation = useRef<Location>()

  const funcRef = useRef(asyncFunc)

  useEffect(() => {
    if (
      location === lastLocation.current ||
      !funcRef.current ||
      (
        rest.redirectUrl &&
        location.pathname === rest.computedMatch.url
      )
    ) return

    lastLocation.current = location

    const unblock = block((location, action) => {
      const doBlock = async () => {

        const result = await funcRef.current(location, action)
        if (result) {
          unblock()
          push(location)
        }
        NProgress.done()
      }

      doBlock()
      return false
    })
  }, [location, block, push, rest.computedMatch.url, rest.redirectUrl, todo.currentRoute])
}

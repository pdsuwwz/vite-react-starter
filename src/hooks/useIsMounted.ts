import { useRef, useEffect } from 'react'
import { MutableRefObject } from 'react'

export default function useIsMounted(): MutableRefObject<boolean> {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

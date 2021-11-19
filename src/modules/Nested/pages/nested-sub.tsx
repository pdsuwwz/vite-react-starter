import React, { useState, useMemo } from 'react'
import { Route } from 'react-router'
import { IRouteProps } from '@/router/types'
import { Link } from 'react-router-dom'
import { message, Button } from 'antd'
import { useAppDispatch, useAppState } from '@/store'

import { TODO } from '@/store/constants'
import TodoModule from '@/modules/UserAccount/store'
import { sleep } from '@/utils'
import { RespData } from '@/utils/request'
import useIsMounted from '@/hooks/useIsMounted'

import styles from '@/modules/Nested/styles/nested-sub.module.scss'

const SubNested: React.FC<IRouteProps> = (
  {
    children: Children,
    ...rest
  }
) => {
  const dispatch = useAppDispatch()
  const { num, waitTime } = useAppState(state => state.todo)

  const [isLoading, setIsLoading] = useState(false)

  const increase = () => {
    console.log(dispatch({
      type: TODO.INCREASE,
      data: num + 1
    }))
    message.success('+1')
  }
  const decrease = () => {
    console.log(dispatch({
      type: TODO.DECREASE,
      data: num - 1
    }))
    message.success('-1')
  }

  const isMounted = useIsMounted()
  const increaseAsync = async () => {
    setIsLoading(true)
    const { error, data }: RespData = await dispatch(TodoModule.actions.increaseNumberAsync(300))

    if (!isMounted.current) return

    setIsLoading(false)
  }

  const computedNumber = useMemo(() => {
    return waitTime * 2
  }, [waitTime])


  return (
    <>
      <div style={
        {
          border: '1px solid red'
        }
      }>
        <p>Nested - Sub</p>
        <Link to="/nested">Jump To /nested</Link>
        <Route
          {...rest}
          render={
            () => Children
          }
        />
        <div>
          模拟计算属性： { computedNumber }
        </div>

        <div className={styles['nested-box__btns']}>
          <Button
            type="primary"
            onClick={ increase }
          >
            加 1
          </Button>
          <Button
            type="primary"
            onClick={ decrease }
          >
            减 1
          </Button>
          <Button
            type="primary"
            loading={isLoading}
            onClick={ increaseAsync }
          >
            等待 { waitTime } 秒， async 加 300
          </Button>
        </div>
      </div>
    </>
  )
}

export default SubNested

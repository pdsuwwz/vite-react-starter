import { AnyAction, Dispatch } from 'redux'
import { sleep } from '@/utils'
import { RespData } from '@/utils/http'
import { BaseStoreModuleInterface } from '@/store/types'


export type TodoState = {
  num: number
  waitTime: number
  currentRoute: string
}
export const TODO = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
  INCREASE_WAIT_TIME: 'increaseWaitTime',
  SET_CURRENT_ROUTE: 'set_current_route'
}

class TodoModule implements BaseStoreModuleInterface<TodoState> {
  initialState = {
    num: 10,
    waitTime: 4, // 默认 4 秒钟
    currentRoute: ''
  }

  reducers = (state = this.initialState, action: AnyAction): TodoState => {
    switch (action.type) {
      case TODO.DECREASE:
        return {
          ...state,
          num: action.data
        }
      case TODO.INCREASE:
        return {
          ...state,
          num: action.data
        }
      case TODO.INCREASE_WAIT_TIME:
        return {
          ...state,
          waitTime: action.data
        }
      case TODO.SET_CURRENT_ROUTE:
        return {
          ...state,
          currentRoute: action.data
        }
      default:
        return state
    }
  }
  actions = {
    /**
     * 加法运算 - sync
     * @param data
     * @returns
     */
    increaseNumber(data: any = {}) {
      return { type: TODO.INCREASE, data }
    },

    /**
     * 减法运算 - sync
     * @param data
     * @returns
     */
    decreaseNumber(data: any = {}) {
      return { type: TODO.DECREASE, data }
    },

    /**
     *
     * @param data
     */
    // TODO: 如何在 action 中使用 state
    increaseNumberAsync(data: number) {
      return async (dispatch: Dispatch, getState: any): Promise<RespData> => {
        const { todo } = getState()

        const idInterval = setInterval(() => {
          dispatch(this.increaseWaitTime(--todo.waitTime))
        }, 1000)
        await sleep(4000)
        clearInterval(idInterval)
        dispatch(this.increaseWaitTime(4))

        const mockResponse = data + todo.num
        console.log('fetch API: 假定拿到为: ', mockResponse)

        dispatch(this.increaseNumber(mockResponse))
        return {
          data: mockResponse,
          error: 0,
          msg: 'ok'
        }
      }
    },
    increaseWaitTime(data: any) {
      return { type: TODO.INCREASE_WAIT_TIME, data }
    }
  }
}

const instance = new TodoModule()
export default instance

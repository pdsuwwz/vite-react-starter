import { AnyAction, Dispatch } from 'redux'
import { sleep } from '@/utils'
import { RespData } from '@/utils/http'
import { BaseStoreModuleInterface, createActionTypes } from '@/store/types'

interface oldStateTypes {
  back: string | null,
  current: string | null,
  forward: string | null,
  position: number | null,
  replaced: boolean,
}

export type TodoState = {
  num: number
  waitTime: number
  oldState: oldStateTypes
}

export const TODO = createActionTypes(
  'UserAccount',
  {
    INCREASE: 'increase',
    DECREASE: 'decrease',
    INCREASE_WAIT_TIME: 'increaseWaitTime',
    SET_HISTORY_OLD_STATE: 'setHistoryOldState'
  }
)


class TodoModule implements BaseStoreModuleInterface<TodoState> {
  initialState: TodoState = {
    num: 10,
    waitTime: 4, // 默认 4 秒钟
    oldState: {
      back: null,
      current: null,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history.length - 1,
      replaced: true
    }
  }

  reducer = (state = this.initialState, action: AnyAction): TodoState => {
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
      case TODO.SET_HISTORY_OLD_STATE:
        return {
          ...state,
          oldState: action.data
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

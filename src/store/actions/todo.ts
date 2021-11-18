import { TODO } from '@/store/constants'
import { serviceGetSystemInfo } from '@/services'
import { AnyAction, Dispatch } from 'redux'
import { sleep } from '@/utils'
import { RespData } from '@/utils/request'
import { AppState } from '..'


/**
 * 加法运算 - sync
 * @param data
 * @returns
 */
export function increaseNumber(data: any = {}) {
  return { type: TODO.INCREASE, data }
}

/**
 * 减法运算 - sync
 * @param data
 * @returns
 */
export function decreaseNumber(data: any = {}) {
  return { type: TODO.DECREASE, data }
}

/**
 *
 * @param data
 */
// TODO: 如何在 action 中使用 state
export function increaseNumberAsync(data: any = {}) {
  return async (dispatch: Dispatch, getState: any) => {
    await sleep(4000)
    console.log('拿到reponse 假定拿到为 300')
    const { todo } = getState()
    dispatch(increaseNumber(300 + todo.num))
    return {
      data: '',
      error: 0,
      msg: 'ok'
    }
  }
}

// /**
//  * 获取系统信息
//  */
// export function getSystemInfo() {
//   return function (dispatch: Dispatch, getState: () => any) {
//     const { system: { info } } = getState()

//     if (info.nodeVersion) {
//       return dispatch(setSystemInfo())
//     }

//     return serviceGetSystemInfo().then((res: any) => {
//       if (res.data.success) {
//         const data = res.data.data
//         return dispatch(setSystemInfo(data))
//       }
//       return dispatch(setSystemInfo())
//     })
//   }
// }

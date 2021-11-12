import config from '@/config'
import moment from 'moment'
import { isPlainObject } from 'lodash'
import { USER } from '@/store/constants'
import { LOCAL_STORAGE } from '@/constants'
import { serviceLoginByToken, serviceLogout } from '@/services'
import { Dispatch } from 'redux'

const { LOGIN } = USER


export function setUser(userInfo: any = {}) {
  if (userInfo.createdAt) {
    userInfo.createdAt = moment(userInfo.createdAt).format('YYYY-MM-DD')
  }
  return {
    type: LOGIN,
    userInfo: userInfo
  }
}

/**
 * Login by Token
 */
export function loginByToken(token: string) {
  return function (dispatch: Dispatch) {
    return serviceLoginByToken(token).then((res: any) => {
      if (res.data.success) {
        const userInfo = res.data.data.userInfo
        return dispatch(setUser(userInfo))
      }
      return dispatch(setUser())
    })
  }
}

/**
 * Logout
 */
export function logout() {
  serviceLogout()
    .finally(() => {
      const localStorageWhiteList = [LOCAL_STORAGE.USER_NAME]
      const localStorageLen = window.localStorage.length
      const allLocalStorageKey: string[] = []

      for (let i = 0; i < localStorageLen; i++) {
        const key = window.localStorage.key(i) as string
        allLocalStorageKey.push(key)
      }

      allLocalStorageKey.forEach(keyName => {
        if (localStorageWhiteList.indexOf(keyName) === -1) {
          window.localStorage.removeItem(keyName)
        }
      })
      window.sessionStorage.clear()
      window.location.reload()
    })
}

/**
 * Github Auth
 */
export function githubAuthz() {
  const callbackURL = ''
  const clientId = ''
  const url = `https://github.com/login/oauth/authorize?response_type=code&redirect_uri=${callbackURL}&client_id=${clientId}&scope=repo%20repo_deployment%20read:user`
  window.location.replace(url)
}

/**
 * Auth Local status
 */
export function validateLocalStatus() {
  let userInfo = {}
  try {
    userInfo = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.USER) as string)
    if (!isPlainObject(userInfo)) {
      userInfo = {}
    }
  } catch {}
  return setUser(userInfo)
}


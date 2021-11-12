import { USER } from '../constants'
import { LOCAL_STORAGE } from '@/constants'

const { LOGIN } = USER

export interface UserInfoProps {
  provider: string
  uid: number | undefined
  username: string
  password: string
  userName: string
  email: string
  role: string
  token: string | undefined
  bio: string
  location: string
  createdAt: string
}

export interface UserState {
  isLogin: boolean
  isLockScreen: boolean
  userInfo: UserInfoProps
}

const initialState: UserState = {
  isLogin: false,
  isLockScreen: false,
  userInfo: {
    provider: '',
    uid: undefined,
    createdAt: '',
    bio: '',
    username: '',
    password: '',
    userName: '',
    email: '',
    role: '',
    token: undefined,
    location: ''
  }
}

function user(state = initialState, action: any): UserState {
  switch (action.type) {
    case LOGIN:
      const userInfo = action.userInfo
      if (userInfo?.token) {
        state.isLogin = true
        window.localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(userInfo))
        window.localStorage.setItem(LOCAL_STORAGE.USER_NAME, userInfo.userName)
      }
      return {
        ...state,
        userInfo: action.userInfo
      }
    default:
      return state
  }
}

export default user

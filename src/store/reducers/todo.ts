import { TODO } from '@/store/constants'
import { AnyAction } from 'redux'

export interface TodoState {
  num: number
}

const initialState = {
  num: 0
}

function todo (state = initialState, action: AnyAction): TodoState {
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
    default:
      return state
  }
}

export default todo

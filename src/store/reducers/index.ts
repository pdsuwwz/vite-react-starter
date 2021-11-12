import { combineReducers } from 'redux'

import user, { UserState } from '@/store/reducers/user'
import system, { SystemState } from '@/store/reducers/system'
// import todo, { TodoState } from '@/store/reducers/todo'
import todo, { TodoState } from '@/modules/UserAccount/store'

export interface StoreState {
  user: UserState
  system: SystemState
  todo: TodoState
}

export default combineReducers<StoreState>({
  user,
  system,
  todo: todo.reducers
})

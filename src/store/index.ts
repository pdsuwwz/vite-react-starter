import thunk, { ThunkDispatch } from 'redux-thunk'
import { createStore, applyMiddleware, AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { composeWithDevTools } from '@redux-devtools/extension'

export type { StoreState } from '@/store/reducers'

import rootReducer from '@/store/reducers'


const enhancer = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunk)
  : composeWithDevTools(
    applyMiddleware(thunk)
  )


const store = createStore(
  rootReducer,
  enhancer
)


export type AppState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type ThunkDispatchProps<T, R> = ThunkDispatch<T, R, AnyAction>
export type AppDispatch = ThunkDispatchProps<AppState, null>;

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppState = <T extends (state: AppState) => any>(selector: T): ReturnType<T> => useSelector(selector)

export const useStore = () => store.getState() as AppState

export default store

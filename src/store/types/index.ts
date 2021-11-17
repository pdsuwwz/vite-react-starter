import { Action, AnyAction } from 'redux'

export interface fnActions {
  [fnName: string]: Function;
}

export type reducerFunction<T, R> = (state: T, action: R) => T

export interface BaseStoreModuleInterface<T> {
  initialState: T;
  reducer: reducerFunction<T, AnyAction>
  actions: fnActions;
}

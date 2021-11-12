import { Action, AnyAction } from 'redux'

export interface fnActions {
  [fnName: string]: Function;
}

export type reducersFunction<T, R> = (state: T, action: R) => T

export interface BaseStoreModuleInterface<T> {
  initialState: T;
  reducers: reducersFunction<T, AnyAction>
  actions: fnActions;
}

import { AnyAction } from 'redux'

export interface fnActions {
  [fnName: string]: Function;
}

export type reducerFunction<T, R> = (state: T, action: R) => T

export interface BaseStoreModuleInterface<T> {
  initialState: T;
  reducer: reducerFunction<T, AnyAction>
  actions: fnActions;
}

type actionTypes<K extends string> = Record<K, string>

export const createActionTypes = <K extends string>(
  namespace: string,
  constants: actionTypes<K>
): actionTypes<K> => {
  const result: Partial<actionTypes<K>> = {}
  for (const key in constants) {
    result[key] = `${namespace}/${constants[key]}`
  }
  return result as actionTypes<K>
}

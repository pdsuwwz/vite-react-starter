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


export const createActionTypes = <K extends string>(namespace: string, constants: Record<K, string>): Record<K, string> => {
  const result: Partial<Record<K, string>> = {}
  for (const key in constants) {
    result[key] = `${namespace}/${constants[key]}`
  }
  return result as Record<K, string>
}

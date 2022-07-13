import { FC, useEffect, useState } from 'react';

export type User = {
  info: {
    name: string
  }
}

export type Action = {type: any;value: any;}

export const reducer = (state: User, action: Action) => {
  if (action.type) {
    if (action.type === 'updateUserName') {
      return {
        ...state,
        info: {
          ...state.info,
          name: action.value
        }
      }
    }
  } else {
    return state
  }
}

export interface Store<T> {
  state: T,
  setState: (data: any) => void;
  listeners: (() => void)[]
  subscribe: (fn: () => void) => () => void
}

export const store: Store<{info: {name: string;}}> = {
  state: {
    info: {name: 'zch'}
  },
  setState(data) {
    store.listeners.map(v => v())
    store.state = data
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => store.listeners = store.listeners.filter(v => v !== fn)
  }
}

export const connect = (Component: FC<{dispatch: any;state: any;}>) => {
  return () => {
    const [,update] = useState({})
    const {state, setState, subscribe} = store
    useEffect(() => {
      subscribe(() => update({}))
    }, [])
    const dispatch = (action: Action) => {
      setState(reducer(state, action))
    }
    return <Component dispatch={dispatch} state={state} />
  }
}

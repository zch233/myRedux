import React, {createContext, FC, useContext, useEffect, useState} from 'react';

export type Action = {type: any;value: any;}

interface Store<D, T> {
  state: T,
  reducer: D;
  setState: (data: any) => void;
  listeners: (() => void)[]
  subscribe: (fn: () => void) => () => void
}

let state = null
let reducer = null
let listeners = []

const store = {
  getState: () => state,
  setState(data) {
    state = data
    listeners.map(v => v())
  },
  subscribe(fn) {
    listeners.push(fn)
    return () => listeners = listeners.filter(v => v !== fn)
  }
}

const _dispatch = (action: Action) => {
  store.setState(reducer(state, action))
}
const dispatch = (action) => {
  if (typeof action === "function") {
    action(dispatch)
  } else {
    _dispatch(action)
  }
}

export const connect = (mapStateToProps?:any, mapDispatchToProps?:any) => (Component: FC<{dispatch: any;state: any;}>) => {
  return (props: any) => {
    const [,update] = useState({})
    const data = mapStateToProps ? mapStateToProps(state) : {state}
    const newDispatch = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch}
    useEffect(() => {
      return store.subscribe(() => {
        const newData = mapStateToProps ? mapStateToProps(state) : {state}
        const changed = Object.keys(data).reduce((changed,key) => {
          data[key] !== newData[key] && (changed.changed = true)
          return changed
        }, {changed: false})
        if(changed.changed) {
          update({})
        }
      })
    }, [mapStateToProps])

    return <Component {...props} {...newDispatch} {...data} />
   }
}

export const createStore = (_reducer, initState) => {
  state = initState
  reducer = _reducer
  return store
}

const appContext = createContext(null)

export const Provider: React.FC<{store: any; children: React.ReactNode;}> = (props) => props.children

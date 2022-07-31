import React, {createContext, FC, useContext, useEffect, useState} from 'react';

export type Action = {type: any;value: any;}

interface Store<D, T> {
  state: T,
  reducer: D;
  setState: (data: any) => void;
  listeners: (() => void)[]
  subscribe: (fn: () => void) => () => void
}

const store = {
  state: null,
  reducer: null,
  setState(data) {
    store.state = data
    store.listeners.map(v => v())
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => store.listeners = store.listeners.filter(v => v !== fn)
  }
}

export const connect = (mapStateToProps?:any, mapDispatchToProps?:any) => (Component: FC<{dispatch: any;state: any;}>) => {
  return (props: any) => {
    const {state, setState, subscribe} = useContext(appContext)
    const [,update] = useState({})
    const dispatch = (action: Action) => {
      setState(store.reducer(state, action))
    }
    const data = mapStateToProps ? mapStateToProps(state) : {state}
    const newDispatch = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch}
    useEffect(() => {
      return subscribe(() => {
        const newData = mapStateToProps ? mapStateToProps(store.state) : {state: store.state}
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

export const createStore = (reducer, initState) => {
  store.state = initState
  store.reducer = reducer
  return store
}

const appContext = createContext(null)

export const Provider: React.FC<{store: any; children: React.ReactNode;}> = (props) => {
  return <appContext.Provider value={props.store}>
    {props.children}
  </appContext.Provider>
}

import {createContext, FC, useContext, useEffect, useState} from 'react';

export type User = {
  info: {
    name: string
  }
  token: string
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

export const store: Store<User> = {
  state: {
    info: {name: 'zch'},
    token: '111'
  },
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
      setState(reducer(state, action))
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

export const appContext = createContext<Store<User>>(store)

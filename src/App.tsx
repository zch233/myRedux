import './App.css'
import { FC, useState, useEffect } from 'react';

type User = {
  info: {
    name: string
  }
}

type Action = {type: any;value: any;}

const reducer = (state: User, action: Action) => {
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

const store = {
  state: {
    info: {name: 'zch'}
  },
  setState(data: any) {
    store.listeners.map(v => v())
    store.state = data
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => store.listeners = store.listeners.filter(v => v !== fn)
  }
}

const connect = (Component: FC<{dispatch: any;state: any;}>) => {
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

function App() {
  console.log('render', 'App');
  return (
      <div className="App">
        <FirstChild />
        <SecondChild />
        <ThirdChild />
      </div>
  )
}

const FirstChild = connect(({state}) => {
  console.log('render', 'FirstChild');
  return <section>
    <p>FirstChild</p>
    <p>{state.info.name}</p>
  </section>
})

const SecondChild = connect(({dispatch, state}: {dispatch: any;state: User;}) => {
  console.log('render', 'SecondChild');
  return <section>
    <p>SecondChild</p>
    <input type="text" value={state.info.name} onChange={(e) => dispatch({type: 'updateUserName',value: e.target.value})}/>
  </section>;
})

const ThirdChild = () => {
  console.log('render', 'ThirdChild');
  return <section>ThirdChild</section>
}

export default App

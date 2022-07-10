import './App.css'
import { useContext, createContext, FC, useState, useEffect } from 'react';

type User = {
  info: {
    name: string
  }
}

const appContext = createContext<{ state: User, setState: any }>(null)

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

const connect = (Component: FC<{dispatch: any;state: any;}>) => {
  return () => {
    const [,update] = useState({})
    const {state, setState} = useContext(appContext)
    const dispatch = (action: Action) => {
      setState(reducer(state, action))
      update({})
    }
    return <Component dispatch={dispatch} state={state} />
  }
}

const store = {
  state: {
    info: {name: 'zch'}
  },
  setState(data: any) {
    store.state = data
  },
}

function App() {
  console.log('render', 'App');
  return (
    <appContext.Provider value={store}>
      <div className="App">
        <FirstChild />
        <SecondChild />
        <ThirdChild />
      </div>
    </appContext.Provider>
  )
}

const FirstChild = () => {
  console.log('render', 'FirstChild');
  const {state} = useContext(appContext)
  return <section>
    <p>FirstChild</p>
    <p>{state.info.name}</p>
  </section>
}

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

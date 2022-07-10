import './App.css'
import { useState, useContext, createContext, FC } from 'react';

type User = {
  info: {
    name: string
  }
}

const appContext = createContext<{ user: User, setUser: any }>(null)

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
    const {user, setUser} = useContext(appContext)
    const dispatch = (action: Action) => {
      setUser(reducer(user, action))
    }
    return <Component dispatch={dispatch} state={user} />
  }
}

function App() {
  const [user, setUser] = useState({info: {name: 'zch'}})
  return (
    <appContext.Provider value={{user, setUser}}>
      <div className="App">
        <FirstChild />
        <SecondChild />
        <ThirdChild />
      </div>
    </appContext.Provider>
  )
}

const FirstChild = () => {
  const {user} = useContext(appContext)
  return <section>
    <p>FirstChild</p>
    <p>{user.info.name}</p>
  </section>
}

const SecondChild = connect(({dispatch, state}: {dispatch: any;state: User;}) => {
  return <section>
    <p>SecondChild</p>
    <input type="text" value={state.info.name} onChange={(e) => dispatch({type: 'updateUserName',value: e.target.value})}/>
  </section>;
})
const ThirdChild = () => <section>ThirdChild</section>

export default App

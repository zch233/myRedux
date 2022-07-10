import './App.css'
import {useState, useContext, createContext} from 'react'

type User = {
  info: {
    name: string
  }
}

const appContext = createContext<{ user: User, setUser: any }>(null)

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

const reducer = (state: User, action: {type: any;value: any;}) => {
  if (action.type) {
    if (action.type === 'updateUserName') {
      console.log({
        ...state,
        info: {
          ...state.info,
          name: action.value
        }
      });
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

const SecondChild = () => {
  const {user, setUser} = useContext(appContext)
  return <section>
    <p>SecondChild</p>
    <input type="text" value={user.info.name} onChange={(e) => setUser(reducer(user, {type: 'updateUserName',value: e.target.value}))}/>
  </section>;
}
const ThirdChild = () => <section>ThirdChild</section>

export default App

import './App.css'
import {connect, appContext, createStore, Action} from './store';
import {connectToUser} from "./connects/user";

export type User = {
  info: {
    name: string
  }
  token: string
}

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

const initState: User = {
    info: {name: 'zch'},
    token: '111'
  }

const store = createStore(reducer, initState)


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

const FirstChild = connectToUser(({userInfo}) => {
  console.log('render', 'FirstChild');
  return <section>
    <p>FirstChild</p>
    <p>{userInfo.name}</p>
  </section>
})

const SecondChild = connectToUser(({update, userInfo}) => {
  console.log('render', 'SecondChild');
  return <section>
    <p>SecondChild</p>
    <input type="text" value={userInfo.name} onChange={(e) => update(e.target.value)}/>
  </section>;
})

const ThirdChild = connect((state) => {
  return {
    token: state.token
  }
})(({token}) => {
  console.log('render', 'ThirdChild');
  return <section>ThirdChild {token}</section>
})

export default App

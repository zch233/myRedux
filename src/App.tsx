import './App.css'
import {connect, createStore, Action, Provider} from './store';
import {connectToUser} from "./connects/user";

export type User = {
  info: {
    name: string
  }
  token: {
    xxx: string;
  }
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
    token: {xxx: 'token'}
  }

const store = createStore(reducer, initState)


function App() {
  console.log('render', 'App');
  return (
    <Provider store={store}>
      <div className="App">
        <FirstChild />
        <SecondChild />
        <ThirdChild />
      </div>
    </Provider>
  )
}

const FirstChild = connectToUser(({userInfo}) => {
  console.log('render', 'FirstChild');
  return <section>
    <p>FirstChild</p>
    <p>{userInfo.name}</p>
  </section>
})

const fetchUser = (dispatch) => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('1')
    }, 3000)
  }).then(() => {
    dispatch({type: 'updateUserName',value: 'fetchUser'})
  })
}

const SecondChild = connectToUser(({update, userInfo, dispatch}) => {
  console.log('render', 'SecondChild');
  return <section>
    <p>SecondChild</p>
    <button onClick={() => {
      // fetchUser(dispatch)
      dispatch(fetchUser)
    }}>点我改变</button>
    <input type="text" value={userInfo.name} onChange={(e) => update(e.target.value)}/>
  </section>;
})

const ThirdChild = connect((state) => {
  return {
    token: state.token
  }
})(({token}) => {
  console.log('render', 'ThirdChild');
  return <section>ThirdChild {token.xxx}</section>
})

export default App

import './App.css'
import { connect, store, appContext } from './store';
import {connectToUser} from "./connects/user";

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

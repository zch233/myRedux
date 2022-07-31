import './App.css'
import { connect, User, store, appContext } from './store';

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

const FirstChild = connect((state) => {
  return {userInfo: state.info}
})(({userInfo}) => {
  console.log('render', 'FirstChild');
  return <section>
    <p>FirstChild</p>
    <p>{userInfo.name}</p>
  </section>
})

const SecondChild = connect(
  (state) => {
  return {userInfo: state.info}
},
  (dispatch) => {
  return {update: (value) => dispatch({type: 'updateUserName',value})}
})
(({update, userInfo}) => {
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

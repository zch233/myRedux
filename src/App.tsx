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

const FirstChild = connect()(({state}) => {
  console.log('render', 'FirstChild');
  return <section>
    <p>FirstChild</p>
    <p>{state.info.name}</p>
  </section>
})

const SecondChild = connect(null, (dispatch) => ({update: (value) => dispatch({type: 'updateUserName',value})}))(({update, state}: {dispatch: any;state: User;}) => {
  console.log('render', 'SecondChild');
  return <section>
    <p>SecondChild</p>
    <input type="text" value={state.info.name} onChange={(e) => update(e.target.value)}/>
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

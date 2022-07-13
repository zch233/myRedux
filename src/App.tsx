import './App.css'
import { connect, User } from './store';

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

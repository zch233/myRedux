import './App.css'
import {useState, useContext, createContext} from 'react'

const appContext = createContext<{user: {name: string};setUser: Function;}>(null)

function App() {
  const [user, setUser] = useState({name: 'zch'})
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
    <p>{user?.name}</p>
  </section>
}
const SecondChild = () => {
  const {user, setUser} = useContext(appContext)
  return <section>
    <p>SecondChild</p>
    <input type="text" value={user.name} onChange={(e) => setUser({name: e.target.value})}/>
  </section>;
}
const ThirdChild = () => <section>ThirdChild</section>

export default App

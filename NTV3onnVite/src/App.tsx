import { useState } from 'react'
import './App.css'
import { Input } from './components/input';


function App() {
  const [myName, setMyName] = useState('Jon Gunnar')
  const [email, setEmail] = useState('')
  return (
    <>
    // bua til button component
      <h2>hello world</h2>
      <div>myName</div>
      <div>{myName}</div>
      <div>
        <Input value={myName} onChange={(e) => setMyName(e.target.value)} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => alert("submitted:" + email)}>Submit</button>
      </div>
    </>
  )
}

export default App
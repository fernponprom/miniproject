import React, {useState, useEffect} from 'react'
import './Login.css'
import firebase from 'firebase/app'
import { useNavigate } from 'react-router-dom'

function Login(){
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginState, setLoginState] = useState(0)
  const [user, setUser] = useState([])
  const [error, setError] = useState('')

  let navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
      setError(err.code)
    }) 
    if(user){
      setUser(user)
      navigate('/home')
    }
  }

  return (
    <div className="login-img">
      <div className="login-background">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={login}>
            <input type="text" name="userEmail" onChange = {(e) => setEmail(e.target.value)} placeholder="Username" required="required" />
            <input type="password" name="userPassword" onChange = {(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}

export default Login
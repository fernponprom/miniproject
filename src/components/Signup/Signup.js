import React, {useState} from 'react'
import {auth} from '../../index'
import firebase from 'firebase/app'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [routeRedirect, setRedirect] = useState(false)
  const navigate = useNavigate()
  // const [displayName, setDisplayName] = useState('')
  // const createUserWithEmailAndPasswordHandler = (event, email, password) => {
  //   event.preventDefault()
  //   setEmail('')
  //   setPassword('')
  //   setDisplayName('')
  // } 

  // const onChangeHandler = event => {
  //   const {name, value} = event.currentTarget
  //   if(name === 'userEmail'){
  //     setEmail(value)
  //   }else if(name === 'userPassword'){
  //     setPassword(value)
  //   }else if(name === 'displayName'){
  //     setDisplayName(value)
  //   }
  // }

  const signup = async (e) => {
    e.preventDefault()
    let user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch( err => {
      console.log(err)
    })
    console.log(user)
    return navigate('/login')
  }

  return (
    <div className="login-img">
      <div className="login-background">
        <div className="login">
          <h1>Sign up</h1>
          <form onSubmit={signup}>
            <input type="text" name="userEmail" onChange = {(e) => setEmail(e.target.value)} placeholder="Username" required="required" />
            <input type="password" name="userPassword" onChange = {(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large">Sign up</button>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}

export default Signup
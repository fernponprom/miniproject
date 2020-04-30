import React, {useState, useEffect} from 'react'
import './Login.css'
import firebase from 'firebase/app'
import { auth } from '../../index'
import { useNavigate } from 'react-router-dom'
import { provider, firestore } from '../../index'

function Login(){
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginState, setLoginState] = useState(0)
  const [user, setUser] = useState([])
  const [error, setError] = useState('')

  console.log('user: ' + user)
  useEffect( () => {
    getUserState()
  }, [])

  let navigate = useNavigate()

  const getUserState = async () => {  
      auth.onAuthStateChanged((user) => {
        if(user){
          navigate('/home')
        }
      })
  }

  const login = async (e) => {
    e.preventDefault()
    const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
      setError(err.code)
    }) 
    if(user){
      setUser(user)
      window.location.reload()
    }
  }

  const loginWithFacebook = async () => {
    await firebase.auth().signInWithPopup(provider).then(async (result) => {
      let token = result.credential.accessToken
      let user = result.user
      console.log(result)
      console.log("facebook user: " + user.displayName)
      console.log("token: " + token)
       await firestore.collection('Users').doc(user.uid).get().then( async (res) => {
        let data = res.data()
        console.log("check data: " + data)
        if(!data){
          console.log('register !!')
          await firestore.collection('Users').doc(user.uid).set({
            bio: user.displayName,
            age: 0,
            weight: 0,
            height: 0,
            gender: ''
          })
          navigate('/home')
        }else{
          console.log('have user NOW !!')
          navigate('/home')
        }
      })
      setUser(user)
      window.location.reload()
      
    }).catch(err => {
      console.log(err.code)
      console.log(err.message)
    })
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
          or
          <div>
            <button className="loginBtn loginBtn--facebook" onClick={ (e) => loginWithFacebook() }>Login with facebook</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
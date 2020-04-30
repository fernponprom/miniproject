import React, {useState, useEffect} from 'react'
import {firestore, auth} from '../../index'
import firebase from 'firebase/app'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [gender, setGender] = useState('')
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
  useEffect(() => {
    getUserState()
  })
  const getUserState = async () => {  
    auth.onAuthStateChanged((user) => {
      if(user){
        navigate('/home')
      }
    })
  }

  const signup = async (e) => {
    e.preventDefault()
    let user = await firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
      return firestore.collection('Users').doc(cred.user.uid).set({
        bio: username,
        age: age,
        weight: weight,
        height: height,
        gender: gender
      })
    }).catch( err => {
      console.log(err)
    })
    console.log(user)
    window.location.reload()
    return navigate('/home')
  }

  return (
    <div className="login-img">
      <div className="login-background">
        <div className="login">
          <h1>Sign up</h1>
          <form onSubmit={signup}>
            <input type="text" name="username" onChange= { (e) => setUsername(e.target.value)} placeholder="Enter your name ..." required />
            <input type="text" name="gender" onChange= { (e) => setGender(e.target.value)} placeholder="Enter your gender ..." required />
            <input type="text" name="age" onChange= { (e) => setAge(e.target.value)} placeholder="Enter your age ..." required />
            <input type="text" name="weight" onChange= { (e) => setWeight(e.target.value)} placeholder="Enter your weight ..." required />
            <input type="text" name="height" onChange= { (e) => setHeight(e.target.value)} placeholder="Enter your height ..." required />
            <input type="text" name="userEmail" onChange = {(e) => setEmail(e.target.value)} placeholder="E-mail..." required />
            <input type="password" name="userPassword" onChange = {(e) => setPassword(e.target.value)} placeholder="Password..." required />
            <button type="submit" className="btn btn-primary btn-block btn-large">Sign up</button>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}

export default Signup
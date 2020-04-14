import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { auth } from '../../index'
import firebase from 'firebase/app'

export default () => {

  const today  = new Date().toDateString()
  const [userState, setUserState] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {

    getUserState().then(user => {
      console.log(user)
      if(user){
        setUserState(user)
      }
    })

  }, [''])

  const getUserState = async () => {  
    return new Promise(resolve => {
      auth.onAuthStateChanged(resolve)
    })
  }

  const logout = async () => {
    await firebase.auth().signOut().catch(err => {
      console.log(err)
    })
    setUserState(null)
    return navigate('/login')
    // props.history.replace('/login')
  }

  const renderNavbar = () => {
    if(userState){
      return (
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/About">About</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )
    }else{
      return (
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Login">Login</Link>
        </div>
      )
    }
  }

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span />
          <span />
          <span />
        </label>
      </div>
        { renderNavbar() }
      <div className="date">
        
        { today }
      </div>
    </div>
  )
}
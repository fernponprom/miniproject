import React, {useEffect, useState} from 'react'
import './Profile.css'

const Profile = (props) => {

  const profile = props.profile
  const { bio, age, weight, height, gender } = profile

  return (
    <div className="card">
      <div className="container">
        <div className="profile-img">
          <img src="https://api.adorable.io/avatars/160/abott@adorable.png" alt="Avatar"/>
        </div>
        <div className="text-left content">
          <p><b>Name: </b>{bio} </p>
          <p><b>Gender: </b>{gender}</p>
          <p><b>Age: </b>{age}</p>
          <p><b>Height: </b>{height} cm.</p>
          <p><b>Weight: </b>{weight} kg.</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
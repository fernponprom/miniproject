import React, {useEffect, useState} from 'react'
import './Profile.css'

const Profile = (props) => {

  const profile = props.profile
  const { bio, age, weight, height, gender } = profile

  return (
    <div className="card">
      <div className="container-profile">
        <div className="profile-img">
          <img src="https://api.adorable.io/avatars/150/check1ß.png" alt="Avatar"/>
        </div>
        <div className="text-left content-profile">
          <p><b>ชื่อ: </b>{bio} </p>
          <p><b>เพศ: </b>{gender}</p>
          <p><b>อายุ: </b>{age}</p>
          <p><b>ส่วนสูง: </b>{height} cm.</p>
          <p><b>น้ำหนัก: </b>{weight} kg.</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
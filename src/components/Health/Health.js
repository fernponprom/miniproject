import React from 'react'
import Howto from './Howto'
import Workout from './Workout'
import './Health.css'

const Health = () => {
    return (
        <div className="container">
            <div className="content-card">
                <Howto />
            </div>
            <div className="content-card">
                <Workout />
            </div>
            
            
            
        </div>
    )
}

export default Health
import React from 'react'
import './Content.css'

export default () => {
  return (
    <div className="head head-img">
      <div className="head-block">
        <div className="title">
          Calrories Food
        </div>
          This is Calrories system It can calculate your food's
          calrories for you in a diary day.
        <div className="signup">
          <button><a href="/signup">Sign up</a></button>
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import './Content.css'

export default () => {
  return (
    <div className="content-body">
      <div className="head head-img">
        <div className="head-block">
          <div className="title">
            Calrories Food
          </div>
            This is Calrories system It can calculate your food's
            calrories for you in a diary day.
          <div className="signup">
            <button className="signup-button"><a href="/signup">Sign up</a></button>
          </div>
        </div>
      </div>
      <div>
        <div className="food-block">
          <div className="food-img">
            <img src="https://cdn.pixabay.com/photo/2017/08/02/00/51/food-2569257_1280.jpg" alt="food-1" />
            <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="food-1" />
            <img src="https://cdn.pixabay.com/photo/2017/08/02/00/51/food-2569257_1280.jpg" alt="food-1" />
            <img src="https://cdn.pixabay.com/photo/2017/08/02/00/51/food-2569257_1280.jpg" alt="food-1" />
            <img src="https://cdn.pixabay.com/photo/2017/08/02/00/51/food-2569257_1280.jpg" alt="food-1" />
          </div>
        </div>
      </div>
    </div>

  )
}
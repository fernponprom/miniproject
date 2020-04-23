import React from 'react'
import FoodList from '../Food-list/FoodList'
import FoodInput from '../FoodInput/FoodInput'
import './Home.css'

const selectFood = () => {

}

const removeFood = () => {

}

const resetFood = () => {
  
}

const Home = () => {
  return (
    <div className="middle">
      <ul>
      <FoodList />
      </ul>
      <FoodInput />
    </div>
  )
}

export default Home
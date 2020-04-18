import React, {useEffect, useState} from 'react'
import './FoodList.css'
import foodActions  from '../../actions/foodActions'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux'

const FoodList = (props) => {

  const actions = bindActionCreators(foodActions, useDispatch())
  const foods = useSelector(state => state.food)
  console.log("my food: " + foods)
  useEffect(() => {
    actions.getFood()
  }, [])

  const renderFood = () => {
    if(foods){
      return foods.map((food, index) => {
        console.log("food: ", food[0])
        const {id, name, calories} = food[0]
        return (
          <li className="" key={id}>{ name } แคล์ลอรี่ { calories }</li>
        )
        
      })
    }else{
      console.log("no food is coming...")
    }
  }
  return (
    <div>
      {renderFood()}
    </div>
  )
}

export default FoodList
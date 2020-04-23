import { firestore } from '../index'

const foodActions = {
  getFoodSuccess: foods => ({
    type: 'GET_FOOD_SUCCESS',
    foods
  }),
  getFoodFail: () => ({ type: 'GET_FOOD_FAIL'}),
  getFood: () => async (dispatch) => {
    try{
      console.log('get food')
      firestore.collection('Foods').onSnapshot( (snapshot) => {
        let allFood =  snapshot.docs.map( index => {
          const {id, name, calories} = index.data()
          console.log("check")
          dispatch({type: 'GET_FOOD_SUCCESS', foods: [{id, name ,calories}]})
        })
      })
    } catch(err){
      console.log(err)
      dispatch({type: 'GET_FOOD_FAIL'})
    }
  },
  addFoodSuccess: foods => ({
    type: 'ADD_FOOD_SUCCESS',
    foods
  }),
  addFoodFail: () => ({ type: 'ADD_FOOD_FAIL'}),
  addFood: () => async () => {
    try{
      firestore.collection('Foods').docs(id+'').set()
    }catch(err){
      console.log(err)
    }
  }
}

export default foodActions
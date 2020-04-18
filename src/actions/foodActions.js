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
  }
}

export default foodActions
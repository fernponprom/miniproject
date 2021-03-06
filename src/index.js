import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebaseconfig from './config/firebaseconfig'
import "firebase/auth";
import firebase from 'firebase/app'
import 'firebase/firestore'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import foodReducer from './reducers/foodReducer'

if( firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseconfig)
}

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const reducers = combineReducers({food: foodReducer})
export const store = createStore(reducers, applyMiddleware(thunk))
export const provider = new firebase.auth.FacebookAuthProvider()

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

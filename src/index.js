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


if( firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseconfig)
}

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const reducers = combineReducers()
export const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider>
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

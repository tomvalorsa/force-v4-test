import React from 'react'
import { render } from 'react-dom'
import getRoot from 'get-root'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import App from './connected/App'

import { load } from 'actions/data'

import './index.css'

let store = applyMiddleware(thunk)(createStore)(rootReducer)

store.dispatch(load())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  getRoot()
)

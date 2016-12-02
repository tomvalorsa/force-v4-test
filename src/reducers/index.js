import { combineReducers } from 'redux'

import app from './app'
import data from './data'
import force from './force'

export default combineReducers({
  app,
  data,
  force
})
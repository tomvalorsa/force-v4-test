import { combineReducers } from 'redux'

import app from './app'
import data from './data'

export default combineReducers({
  app,
  data
})
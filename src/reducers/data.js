import { LOADED_DATA } from '../actionTypes'

const initialState = []

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case LOADED_DATA:
      return payload
    default:
      return state
  }
}
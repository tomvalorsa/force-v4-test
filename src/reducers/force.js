import { SET_SIMULATION } from 'actionTypes'

const initialState = {
  simulation: undefined
}

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case SET_SIMULATION:
      return {
        ...state,
        simulation: payload
      }
    default:
      return state
  }
}
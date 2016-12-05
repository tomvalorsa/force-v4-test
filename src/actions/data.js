import { LOADED_DATA, SHUFFLE_DATA, ADD_DATA, REMOVE_DATA } from '../actionTypes'
import { generateBaseStation } from 'constants'

export const load = () => (dispatch, getState) => {
  let data = []

  for (let i = 0; i < 50; i++) {
    let baseStation = generateBaseStation()
    data.push({beacon: i, baseStation})
  }

  dispatch({
    type: LOADED_DATA,
    payload: data
  })
}

export const shuffleData = () => (dispatch, getState) => {
  if (Math.random() > 0.5) {
    dispatch({type: ADD_DATA})
  } else {
    dispatch({type: REMOVE_DATA})
  }


  dispatch({type: SHUFFLE_DATA})
}

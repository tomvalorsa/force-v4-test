import { LOADED_DATA, SHUFFLE_DATA } from '../actionTypes'
import path from '../../data.csv'

import { csv } from 'd3'

export const load = () => (dispatch, getState) => {
  csv(path, (err, data) => {
    dispatch({
      type: LOADED_DATA,
      payload: data
    })
  })
}

export const shuffleData = () => ({
  type: SHUFFLE_DATA
})

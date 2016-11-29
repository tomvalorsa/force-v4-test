import { LOADED_DATA } from '../actionTypes'
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

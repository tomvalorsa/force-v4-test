import { LOADED_DATA, SHUFFLE_DATA } from '../actionTypes'

const initialState = []

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case LOADED_DATA:
      return payload
    case SHUFFLE_DATA:
      let data = [...state]

      data.forEach(d => {
        let bs = Math.random()
        if (bs > 0.66) {
          bs = 'a'
        } else if (bs > 0.33) {
          bs = 'b'
        } else {
          bs = 'c'
        }

        d.baseStation = bs
      })

      return data
    default:
      return state
  }
}
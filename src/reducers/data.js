import { LOADED_DATA, SHUFFLE_DATA, ADD_DATA, REMOVE_DATA } from '../actionTypes'
import { generateBaseStation } from 'util'

const initialState = []

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case LOADED_DATA:
      return payload
    case SHUFFLE_DATA: {
      let data = [...state]

      data.forEach(d => {
        d.baseStation = generateBaseStation()
      })

      return data
    }
    case ADD_DATA: {
      let data = [...state]

      let toAdd = Math.floor(Math.random() * 10)
      for (let i = 0; i < toAdd; i++) {
        let baseStation = generateBaseStation()
        data.push({ beacon: state.length + i, baseStation })
      }

      return data
    }
    case REMOVE_DATA: {
      let data = [...state]

      let toRemove = Math.floor(Math.random() * 10)
      data = [...data.slice(0, state.length - toRemove)]

      return data
    }
    default:
      return state
  }
}
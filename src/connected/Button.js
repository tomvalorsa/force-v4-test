import Button from '../components/Button'
import { connect } from 'react-redux'
import { shuffleData } from 'actions/data'

export default connect(state => {
  return {
    simulation: state.force.simulation
  }
}, {shuffleData})(Button)

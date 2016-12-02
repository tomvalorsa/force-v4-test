import ForceGraph from '../components/ForceGraph'
import { connect } from 'react-redux'
import { setSimulation } from 'actions/force'

export default connect(state => {
  return {
    data: state.data,
    simulation: state.force.simulation
  }
}, {setSimulation})(ForceGraph)

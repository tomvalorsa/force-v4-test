import ForceGraph from '../components/ForceGraph'
import { connect } from 'react-redux'

export default connect(state => {
  return {
    data: state.data
  }
}, {})(ForceGraph)

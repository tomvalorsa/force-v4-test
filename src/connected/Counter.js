import Counter from '../components/Counter'
import { connect } from 'react-redux'

export default connect(state => ({count: state.data.length}))(Counter)

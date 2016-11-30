import Button from '../components/Button'
import { connect } from 'react-redux'
import { shuffleData } from 'actions/data'

export default connect(state => {
  return {

  }
}, {click: shuffleData})(Button)

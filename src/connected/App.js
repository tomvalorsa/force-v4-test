import React, { Component } from 'react'
import styles from './index.css'
import { connect } from 'react-redux'

import ForceGraph from './ForceGraph'
import Button from '../components/Button'

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <ForceGraph />
          <Button text="Randomise" />
        </div>
      </div>
    )
  }
}


export default connect(state => {
  return {

  }
}, {})(App)

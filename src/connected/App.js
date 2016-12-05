import React, { Component } from 'react'
import styles from './index.css'
import { connect } from 'react-redux'

import ForceGraph from './ForceGraph'
import Button from './Button'
import Counter from './Counter'
import SVG from '../components/SVG'

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <SVG>
          <ForceGraph />
        </SVG>
        <div className={styles.topLeft}>
          <Button text="Randomise" />
          <Counter />
        </div>
      </div>
    )
  }
}


export default connect(state => {
  return {

  }
}, {})(App)

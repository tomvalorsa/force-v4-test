import React, { Component } from 'react'
import styles from './index.css'

import ForceGraph from '../ForceGraph'
import Button from '../Button'

export default class App extends Component {
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
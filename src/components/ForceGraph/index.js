import React, { Component } from 'react'
import styles from './index.css'

import Pin from '../Pin'

export default class ForceGraph extends Component {
  render() {
    let { data } = this.props
    if (data && data.length) debugger

    return (
      <svg className={styles.graph}>
        <Pin fill="blue" height="30px" />
      </svg>
    )
  }
}
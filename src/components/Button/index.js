import React from 'react'
import styles from './index.css'

const Button = ({shuffleData, text, simulation}) => {
  let click = () => {
    shuffleData()
    simulation.restart()
  }

  return <button className={styles.btn} onClick={click}>{text}</button>
}

export default Button

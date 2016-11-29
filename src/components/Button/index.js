import React from 'react'
import styles from './index.css'

const Button = ({click, text}) => (
  <button className={styles.btn} onClick={click}>{text}</button>
)

export default Button

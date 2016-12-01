import React, { Component, Children, cloneElement } from 'react'
import styles from './index.css'

export default class SVG extends Component {
  state = {
    width: 100,
    height: 100
  }
  componentDidMount(){
    this.update()
    window.addEventListener('resize', this.update)
  }
  componentDidUpdate(){
    this.update()
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.update)
  }
  update = () => {
    if (!this.refs.svg) return
    let { width, height } = this.refs.svg.getBoundingClientRect()
    if (width !== this.state.width || height !== this.state.height){
      this.setState({width, height})
    }
  }
  render(){
    let { width, height } = this.state
    let kids = Children.map(this.props.children, d => cloneElement(d, this.state))
    return <svg ref="svg" className={styles.svg}>{kids}</svg>
  }
}
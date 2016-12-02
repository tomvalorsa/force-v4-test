import React, { Component } from 'react'
import styles from './index.css'
import { select, event, merge } from 'd3-selection'
import { drag } from 'd3-drag'

import Pin from '../Pin'

const colors = {
  'a': 'red',
  'b': 'blue',
  'c': 'green'
}

export default class ForceGraph extends Component {
  componentDidMount() {
    let { width, height, setSimulation } = this.props

    setSimulation(width, height)

    // Probably won't need to update here as setting sim in state will trigger update
    // this.update()
  }
  componentDidUpdate(prevProps, prevState) {
    let { width, height, setSimulation } = this.props

    // setting simulation every time isn't terrible...
    if (prevProps.width !== width || prevProps.height !== height) {
      setSimulation(width, height)
    }

    this.update()
  }
  update() {
    let { data, simulation } = this.props
    // let g = select('#nodes')

    // Update
    // let nodes = g.selectAll('.node')
    //   .data(data, d => d.beacon)
    //   .attr('fill', d => colors[d.baseStation])

    // // Enter
    // nodes.enter()
    //   .append('circle')
    //   .attr('class', 'node')
    //   .attr('r', 5)
    //   .attr('fill', d => colors[d.baseStation])

    // // Exit
    // nodes.exit().remove()

    simulation.nodes(data)
    simulation.restart()
  }
  render() {
    let { data, simulation } = this.props

    // use the simulation to give positions to individual react elements
    let circles = null
    if (simulation && data.length) {
      circles = data.map(d => {
        if (!d.x || !d.y) return null
        return (
          <circle
            key={d.beacon}
            r="5"
            fill={colors[d.baseStation]}
            transform={`translate(${d.x}, ${d.y})`}
          />
        )
      })
    }

    debugger

    return (
      <g id="nodes">
        {circles}
      </g>
    )
  }
}

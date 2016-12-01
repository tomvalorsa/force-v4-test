import React, { Component } from 'react'
import styles from './index.css'
import { scaleLinear } from 'd3-scale'
import { select, event, merge } from 'd3-selection'
import { forceX, forceY, forceSimulation, forceCollide, forceManyBody } from 'd3-force'
import { drag } from 'd3-drag'

import Pin from '../Pin'

const colors = {
  'a': 'red',
  'b': 'blue',
  'c': 'green'
}

/*
  TODO:
  - add pin instead of circle
  - organise selections so initial render works too
    - also need to sort out where color stuff should go...
*/

// <Pin fill="blue" height="30px" />

export default class ForceGraph extends Component {
  componentDidMount() {
    let { width, height } = this.props

    let xScale = scaleLinear()
      .domain([0, 2])
      .range([100, width - 100])

    let foci = {
      'a': {
        'x': xScale(0),
        'y': height - 100
      },
      'b': {
        'x': xScale(1),
        'y': 100
      },
      'c': {
        'x': xScale(2),
        'y': height - 100
      }
    }

    let fX = forceX(d => foci[d.baseStation].x).strength(0.2)
    let fY = forceY(d => foci[d.baseStation].y).strength(0.2)

    this.simulation = forceSimulation()
      .velocityDecay(0.5)
      .force('x', fX)
      .force('y', fY)
      .force('collide', forceCollide(10))
      .force('charge', forceManyBody())
      .on('tick', this.tick)

    this.update()
  }
  componentDidUpdate() {
    this.update()
  }
  update() {
    let { data } = this.props

    let g = select(this.refs.nodes)

    // Update
    let nodes = g.selectAll('.node')
      .data(data, d => d.beacon)
      .attr('fill', d => colors[d.baseStation])

    // Enter
    nodes.enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 5)
      .attr('fill', d => colors[d.baseStation])

    // Only works on update selection not on enter
    nodes.call(drag()
      .on('start', this.dragstarted)
      .on('drag', this.dragged)
      .on('end', this.dragended))

    // Exit
    nodes.exit().remove()

    this.simulation.nodes(data)
    this.simulation.restart()
  }
  dragstarted = (d) => {
    if (!event.active) this.simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }
  dragged = (d) => {
    d.fx = event.x
    d.fy = event.y
  }
  dragended = (d) => {
    if (!event.active) this.simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  } 
  tick = () => {
    let nodes = select(this.refs.nodes).selectAll('.node')

    nodes
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }
  render() {
    return <g ref="nodes"></g>
  }
}

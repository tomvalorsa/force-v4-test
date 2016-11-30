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

export default class ForceGraph extends Component {
  componentDidMount() {
    this.update()
  }
  componentDidUpdate() {
    this.update()
  }
  update() {
    let { width, height, data } = this.props

    let xScale = scaleLinear()
      .domain([0, 2])
      .range([100, width - 100])

    let g = select(this.refs.nodes)

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

    let simulation = forceSimulation(data)
      .velocityDecay(0.5)
      .force('x', fX)
      .force('y', fY)
      .force('collide', forceCollide(10))
      .force('charge', forceManyBody())
      .on('tick', tick)

    start()

    function start() {
      let nodes = g.selectAll('.node')
        .attr('fill', d => colors[d.baseStation])
        .data(data, d => d.beacon)

      nodes.enter()
        .append('circle')
        .attr('class', 'node')
        .attr('r', 5)
        .attr('fill', d => colors[d.baseStation])

      nodes.exit().remove()

      simulation.nodes(data)
      simulation.restart()
    }

    function tick() {
      let nodes = g.selectAll('.node')

      nodes
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    }

    let nodes = g.selectAll('.node')
      .call(drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    function dragstarted(d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }
    
    function dragged(d) {
      d.fx = event.x
      d.fy = event.y
    }
    
    function dragended(d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    } 


    /*
      TODO:
      - add pin instead of circle
      - organise selections so initial render works too
        - also need to sort out where color stuff should go...
    */

    // <Pin fill="blue" height="30px" />
  }
  render() {
    return <g ref="nodes"></g>
  }
}
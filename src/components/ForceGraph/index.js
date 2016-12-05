import React, { Component } from 'react'
import styles from './index.css'
import _ from 'lodash'
import { scaleLinear } from 'd3-scale'
import { select, event, merge } from 'd3-selection'
import { forceX, forceY, forceSimulation, forceCollide, forceManyBody } from 'd3-force'
import { drag } from 'd3-drag'
import { transition } from 'd3-transition'
import { indexOfByAttr } from 'util'

import Pin from '../Pin'

const colors = {
  'a': 'red',
  'b': 'blue',
  'c': 'green'
}

export default class ForceGraph extends Component {
  componentDidMount() {
    this.xScale = scaleLinear()
      .domain([0, 2])

    this.simulation = forceSimulation()
      .velocityDecay(0.65)
      .force('collide', forceCollide(10))
      .force('charge', forceManyBody())
      .on('tick', this.tick)

    this.update()
  }
  componentDidUpdate() {
    this.update()
  }
  dataCopy() {
    let storeData = this.props.data

    if (this.data) {
      let updated = []
      // Loop over store readings
      storeData.forEach(d => {
        let idx = indexOfByAttr(this.data, 'beacon', d.beacon)

        // If we already have an entry for this beacon in this.data
        if (idx > -1) {
          // use it
          let reading = this.data[idx]
          // update any necessary properties
          reading.baseStation = d.baseStation
          updated.push(reading)
        } else {
          // copy new one
          updated.push({...d})
        }
      })
      
      this.data = updated
    } else {
      this.data = _.cloneDeep(storeData)
    }
  }
  update() {
    let { width, height } = this.props

    // Update chart data based on changes to store data
    this.dataCopy()

    let g = select(this.refs.nodes)
    this.xScale.range([100, width - 100])

    let foci = {
      'a': {
        'x': this.xScale(0),
        'y': height - 100
      },
      'b': {
        'x': this.xScale(1),
        'y': 100
      },
      'c': {
        'x': this.xScale(2),
        'y': height - 100
      }
    }

    let fX = forceX(d => foci[d.baseStation].x).strength(0.2)
    let fY = forceY(d => foci[d.baseStation].y).strength(0.2)

    this.simulation
      .force('x', fX)
      .force('y', fY)
      .nodes(this.data)
      .alpha(0.8).restart() // reheat simulation

    // Update
    let nodes = g.selectAll('.node')
      .data(this.data, d => d.beacon)
      
    // Enter
    nodes.enter()
      .append('circle')
        .attr('class', 'node')
        .attr('r', 5)
        .attr('x', width / 2)
        .attr('y', height / 2)
      .merge(nodes) // Enter + Update
        .attr('fill', d => colors[d.baseStation])

    // Exit
    nodes.exit()
      .transition()
      .duration(1000)
      .attr('fill', 'black')
      .attr('r', 30)
      .attr('cy', 0)
      .style('opacity', 0)
      .remove()
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

import { SET_SIMULATION } from 'actionTypes'
import { forceX, forceY, forceSimulation, forceCollide, forceManyBody } from 'd3-force'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'

// are we just going to be returning a fresh simulation each time? we don't want to mutate the state...
// we're going to be mutating the state in the update function on the component anyway (probably)
// might need to try and avoid doing so

// or maybe we can trigger this to run when data updates too?

export const setSimulation = (width, height) => {
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

  let tick = () => {
    let nodes = select('#nodes').selectAll('.node')

    nodes
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  let simulation = forceSimulation()
    .velocityDecay(0.5)
    .force('collide', forceCollide(10))
    .force('charge', forceManyBody())
    .force('x', fX)
    .force('y', fY)
    .on('tick', tick)

  return {
    type: SET_SIMULATION,
    payload: simulation
  }
}

// export const updateSimulation = (width, height) => {



// }
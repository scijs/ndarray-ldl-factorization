'use strict'

module.exports = xyz

function xyz(x, y, z) {
  var dx = x.data, dy = y.data, dz = z.data
  var sx = x.stride[0]
  var sy = y.stride[0]
  var sz = z.stride[0]
  var ox = x.offset
  var oy = y.offset
  var oz = z.offset
  var sum = 0.0
  for(var i=x.shape[0]-1; i>=0; i--, ox+=sx, oy+=sy, oz+=sz ) {
    sum += dx[ox]*dy[oy]*dz[oz]
  }
  return sum
}


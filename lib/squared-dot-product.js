'use strict'

module.exports = xxy

function xxy(x, y) {
  var dx = x.data, dy = y.data
  var sx = x.stride[0]
  var sy = y.stride[0]
  var ox = x.offset
  var oy = y.offset
  var sum = 0.0
  for(var i=x.shape[0]-1; i>=0; i--, ox+=sx, oy+=sy ) {
    sum += dx[ox]*dx[ox]*dy[oy]
  }
  return sum
}


'use strict';

// MODULES //

var diagonal = require('ndarray-diagonal'),
    ops = require('ndarray-ops');

// FUNCTIONS //

function squaredDot(x, y) {
  var dx = x.data, dy = y.data
  var ox = x.stride[0]
  var oy = y.stride[0]
  var px = x.offset
  var py = y.offset
	var sum = 0.0
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy ) {
		sum += x[px]*x[px]*y[py]
  }
	return sum
}

function threeWayDot(x, y, z) {
  var dx = x.data, dy = y.data, dz = z.data
  var ox = x.stride[0]
  var oy = y.stride[0]
  var oz = z.stride[0]
  var px = x.offset
  var py = y.offset
  var pz = z.offset
	var sum = 0.0
  for(var i=x.shape[0]-1; i>=0; i--, px+=ox, py+=oy, pz+=oz ) {
		sum += x[px]*y[py]*z[pz]
  }
	return sum
}

function ldl(A, L, d) {

  var n, Li, i, j, di;

  if ( A.dimension !== 2 || A.shape[0] !== A.shape[1] ) {
		throw new Error('ndarray-ldl-factorization: A must be a square matrix')
  }

  ops.assigns(diagonal(L),1);

  n = A.shape[0];

  for(i=0; i<n; i++) {
    Li = L.pick(i,null).hi(i);
    di = d.hi(i);
    d.set(i, A.get(i,i) - squaredDot( Li, di ) );
    for (j=i+1; j<n; j++) {
      L.set(j, i, (A.get(j,i) - threeWayDot( L.pick(j,null).hi(i), Li, di )) / d.get(i) );
    }
  }

  return true;
}

// EXPORTS //

module.exports = ldl;

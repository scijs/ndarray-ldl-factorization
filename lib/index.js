'use strict'

// MODULES //

var fill = require('ndarray-fill')
  , show = require('ndarray-show')
  , xxy = require('./squared-dot-product')
  , xyz = require('./triple-dot-product')

function ldl(A, L, d) {

  var Li, i, j, n = A.shape[0], oLi, Lj, oLj, di

  if ( A.dimension !== 2 || A.shape[0] !== A.shape[1] ) {
    throw new Error('ndarray-ldl-factorization: A must be a square matrix.')
  }

  fill(L, function(i, j) {
    return i === j ? 1 : 0;
  });

	// Instantiate the slice of L and grab the per-loop offset:
  Li = L.pick(0,null).hi(0)
  oLi = L.stride[0]

	// Instantiate the other slice of L and grab the offset:
	Lj = L.pick(0,null)
	oLj = L.stride[0]

	// A view of d so the shape can change:
	di = d.hi(i)

  for(i=0; i<n; i++) {
    d.set(i, A.get(i, i) - xxy( Li, di ) )

		Lj.offset = L.stride[0]*(i+1)
		Lj.shape = i

    for(j=i+1; j<n; j++) {
      L.set(j, i, ( A.get(j, i) - xyz( di, Lj, Li ) ) / d.get(i) )
			Lj.offset += oLj
    }

    Li.offset+=oLi
    Li.shape[0]++
		di.shape[0]--
  }

  return true
}

// EXPORTS //

module.exports = ldl

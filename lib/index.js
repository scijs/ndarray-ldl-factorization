'use strict'

// MODULES //

var pool = require('ndarray-scratch')
	, blas = require('ndarray-blas-level1')
	, diag = require('ndarray-diagonal')

function ldl(A, L, d) {

	// In-place decomposition:
	if( arguments.length === 1 ) {
		L = A
		d = diag(A)
	}

  var Li, i, j, n = A.shape[0], Lj

  if ( A.dimension !== 2 || A.shape[0] !== A.shape[1] ) {
    throw new Error('ndarray-ldl-factorization: A must be a square matrix.')
  }

  if ( L.dimension !== 2 || L.shape[0] !== L.shape[1] ) {
    throw new Error('ndarray-ldl-factorization: L must be a square matrix.')
  }

	var v = pool.zeros([n])

	for(j=0; j<n; j++) {

		if( A !== L ) {
			L.set(j,j,1)
		}

		for(i=0; i<j; i++) {
			v.set(i, L.get(j,i) * d.get(i))
		}

		var dj = A.get(j,j)
		if( j > 0 ) {
			dj -= blas.dot( L.pick(j,null).hi(j), v.hi(j) )
		}
		d.set( j, dj )

		Lj = L.pick(null,j).lo(j+1)

		if( j < n-1 ) {
			blas.cpsc( 1 / dj, A.pick(null,j).lo(j+1),  L.pick(null,j).lo(j+1) )
		}

		if( j > 0 ) {
			for(i=0; i<j; i++) {
				Li = L.pick(null,i).lo(j+1)
				blas.axpy( - v.get(i) / dj, Li, Lj )
			}
		}
	}

  return true
}

// EXPORTS //

module.exports = ldl

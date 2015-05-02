'use strict';

// MODULES //

var blas1 = require('ndarray-blas-level1'),
	pool = require('ndarray-scratch'),
	ops  = require('ndarray-ops'),
	fill = require('ndarray-fill');

function ldl(A, L, d) {

	if ( A.dimension !== 2 ) {
		return false;
	} else {
		if ( A.shape[0] !== A.shape[1] ) {
			return false;
		}
	}

	fill(L, function(i, j) {
		return i === j ? 1 : 0;
	});

	// get ncol, nrow of A
	var n = A.shape[0];

	for ( var i = 0; i < n; i++ ) {
		var Lview = L.pick(i, null).hi(i);
		var squared = pool.zeros( Lview.shape, A.dtype );
		ops.mul( squared, Lview, Lview );
		var dVal = A.get(i, i) - blas1.dot( squared, d.hi(i) );
		d.set(i, dVal);
		for ( var j = i + 1; j < n; j++ ) {
			ops.mul( squared, L.pick(j, null).hi(i), L.pick(i, null).hi(i) );
			var Lval = ( A.get(j, i) - blas1.dot( squared, d.hi(i) ) ) / d.get(i);
			L.set(j, i, Lval);
		}
	}

	return true;
}

// EXPORTS //

module.exports = ldl;

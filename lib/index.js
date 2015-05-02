'use strict';

// MODULES //

var blas1 = require('ndarray-blas-level1'),
	pool = require('ndarray-scratch'),
	ops  = require('ndarray-ops'),
    fill = require('ndarray-fill');

function ldl(A) {

	if ( A.dimension !== 2 ) {
		return false;
	}

	// make identity matrix I
	var L = pool.zeros( A.shape, A.dtype );
	fill(L, function(i, j) {
		return i === j ? 1 : 0;
	});

	// diagonal elements of D
	var d = pool.zeros( [ A.shape[0] ], A.dtype);

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

	return {
		'L': L,
		'd': d
	};
}

// EXPORTS //

module.exports = ldl;

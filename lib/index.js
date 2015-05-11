'use strict';

// MODULES //

var cwise = require('cwise'),
    diagonal = require('ndarray-diagonal'),
    ops = require('ndarray-ops');

// FUNCTIONS //

var squaredDot = cwise({
  args:['array', 'array'],
  pre: function() {
    this.sum = 0;
  },
  body: function(a,b) {
    this.sum += a * a * b;
  },
  post: function() {
    return this.sum;
  }
});

var threeWayDot = cwise({
  args:['array','array', 'array'],
  pre: function() {
    this.sum = 0;
  },
  body: function(a,b,c) {
    this.sum += a * b * c;
  },
  post: function() {
    return this.sum;
  }
});

function ldl(A, L, d) {

  var n, Li, i, j, di;

	if ( A.dimension !== 2 ) {
		return false;
	}

  if ( A.shape[0] !== A.shape[1] ) {
    return false;
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

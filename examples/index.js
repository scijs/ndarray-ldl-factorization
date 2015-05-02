'use strict';

var ndarray = require('ndarray'),
	show = require('ndarray-show'),
	ldl = require( './../lib' );

var A = ndarray(new Float64Array([9,-1,2,-1,8,-5,2,-5,7]), [3,3]);

var ldl = ldl(A);
console.log( 'A:\n' + show(A), '\n' );
console.log( 'L:\n' + show(ldl.L) );
console.log( 'd:\n' + show(ldl.d) );

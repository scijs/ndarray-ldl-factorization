'use strict';

var ndarray = require('ndarray'),
	show = require('ndarray-show'),
	ldl = require( './../lib' ),
	pool = require('ndarray-scratch');

var A = ndarray(new Float64Array([9,-1,2,-1,8,-5,2,-5,7]), [3,3]);
var L = pool.zeros( A.shape, A.dtype );
var d = pool.zeros( [ A.shape[0] ], A.dtype);

ldl(A, L, d);

console.log( 'A:\n' + show(A), '\n' );
console.log( 'L:\n' + show(L) );
console.log( 'd:\n' + show(d) );

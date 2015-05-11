/* global require, describe, it */
'use strict';

// MODULES //

var ndarray = require('ndarray'),
	pool = require('ndarray-scratch'),
  ndt = require('ndarray-tests');


 // Expectation library:
var test = require( 'tape' ),
	// Module to be tested:
	ldl = require( '../lib' );


// VARIABLES //

// FUNCTIONS //


// TESTS //

test( 'should export a function', function test(t) {
	var isFunction = typeof ldl === 'function';
	t.assert(isFunction, 'it is indeed a function');
	t.end();
});

test( 'should calculate the LDL decomposition of matrix A', function test(t) {

	var A = ndarray(new Float64Array([9,-1,2,-1,8,-5,2,-5,7]), [3,3]);
	var L = pool.zeros( A.shape, A.dtype );
	var d = pool.zeros( [ A.shape[0] ], A.dtype);

	var isTrue = ldl(A, L, d);
	t.assert(isTrue, 'ldl returns true');

	var LExpected = ndarray(new Float64Array([1,0,0,-0.111,1,0,0.222,-0.606,1]), [3,3]);
	t.assert( ndt.approximatelyEqual(L, LExpected, 1e-3), 'L is correctly calculated' );

	var d_expected = ndarray(new Float64Array([9, 7.889, 3.662]), [3]);
	t.assert( ndt.approximatelyEqual(d, d_expected, 1e-3), 'elements of D are correctly calculated' );
	t.end();
} );

test('returns false if provided non-square matrix',function test(t) {

	var A = ndarray(new Float64Array([1,2,2,4,8,6]), [2, 3]);
	var L = pool.zeros( A.shape, A.dtype );
	var d = pool.zeros( [ A.shape[0] ], A.dtype);
	var result = ldl(A, L, d);

	t.notOk(result, 'returns false');
	t.end();
});

test('returns false if provided higher-dimensional array (dim > 2)',function test(t) {

	t.plan(1);
	var A = ndarray(new Float64Array([1,2,3,4,5,6,7,8]), [2,2,2]);
	var L = pool.zeros( A.shape, A.dtype );
	var d = pool.zeros( [ A.shape[0] ], A.dtype);
	var result = ldl(A, L, d);

	t.notOk(result, 'returns false');
	t.end();
});

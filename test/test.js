/* global require, describe, it */
'use strict';

// MODULES //

var ndarray = require('ndarray'),
	pool = require('ndarray-scratch'),
	ops = require('ndarray-ops');

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ldl = require( './../lib' );


// VARIABLES //

var expect = chai.expect;

// FUNCTIONS //

function isCloseTo(A, B, prec) {
    var diff = pool.zeros( A.shape, A.dtype );
    ops.sub( diff, A, B );
    var err2 = ops.norm2( diff );
    return err2 < prec ? true : false;
}


// TESTS //

describe( 'ndarray-ldl-decomposition', function tests() {

	it( 'should export a function', function test() {
		expect( ldl ).to.be.a( 'function' );
	});

	it( 'should calculate the LDL decomposition of matrix A', function test() {
		var A = ndarray(new Float64Array([9,-1,2,-1,8,-5,2,-5,7]), [3,3]);
		var L = pool.zeros( A.shape, A.dtype );
		var d = pool.zeros( [ A.shape[0] ], A.dtype);

		var result = ldl(A, L, d);
		expect(result).to.be.true;

		var L_expected = ndarray(new Float64Array([1,0,0,-0.111,1,0,0.222,-0.606,1]), [3,3]);
		expect( isCloseTo(L, L_expected, 1e-3) ).to.be.true;

		var d_expected = ndarray(new Float64Array([9, 7.889, 3.662]), [3]);
		expect( isCloseTo(d, d_expected, 1e-3) ).to.be.true;

	} );

	it('returns false if provided non-square matrix',function test() {
		var A = ndarray(new Float64Array([1,2,2,4,8,6]), [2, 3]);
		var L = pool.zeros( A.shape, A.dtype );
		var d = pool.zeros( [ A.shape[0] ], A.dtype);
		var success = ldl(A, L, d);

		expect(success).to.be.false;
  	});

	it('returns false if provided higher-dimensional array (dim > 2)',function test() {
		var A = ndarray(new Float64Array([1,2,3,4,5,6,7,8]), [2,2,2]);
		var L = pool.zeros( A.shape, A.dtype );
		var d = pool.zeros( [ A.shape[0] ], A.dtype);
		var success = ldl(A, L, d);

		expect(success).to.be.false;
	});
});

'use strict'

// MODULES //

var ndarray = require('ndarray')
	, pool = require('ndarray-scratch')
	, ops = require('ndarray-ops')
	, ndt = require('ndarray-tests')
	, test = require( 'tape' )
	, ldl = require( '../lib' )
	, diag = require('ndarray-diagonal')
	, gemm = require('ndgemm')

test.createStream().pipe(require('tap-spec')()).pipe(process.stdout)

// VARIABLES //

// FUNCTIONS //

function clearUpperTriangular(A) {
	var n = A.shape[0]
	for(var i=0; i<n; i++) {
		for(var j=i+1; j<n; j++) {
			A.set(i,j,0)
		}
	}
}


// TESTS //

test( 'should export a function', function test(t) {
	var isFunction = typeof ldl === 'function'
	t.assert(isFunction, 'it is indeed a function')
	t.end()
})

test( 'should calculate the LDL decomposition of matrix A (3 x 3)', function test(t) {
	var A = ndarray(new Float64Array([9,-1,2,-1,8,-5,2,-5,7]), [3,3])
	var L = pool.zeros( A.shape, A.dtype )
	var D = pool.zeros( A.shape, A.dtype )
	var d = diag(D)

	var LD = pool.zeros(A.shape, A.dtype)
	var LDLT = pool.zeros(A.shape, A.dtype)

	// Assign this in order to check if zeros pollute anything:
	ops.assigns(L,NaN)

	t.assert( ldl(A,L,d), 'ldl returns true')

	// Now clear the NaNs so we can multiply:
	clearUpperTriangular(L)

	gemm( LD, L, D )
	gemm( LDLT, LD, L.transpose(1,0))

	var LExpected = ndarray(new Float64Array([1,0,0,-0.111,1,0,0.222,-0.606,1]), [3,3])
	t.assert( ndt.equal(L, LExpected, 1e-3), 'L is correctly calculated' )

	var d_expected = ndarray(new Float64Array([9, 7.889, 3.662]), [3])
	t.assert( ndt.equal(d, d_expected, 1e-3), 'elements of D are correctly calculated' )

	t.assert( ndt.equal( LDLT, A, 1e-3), 'reconstructs the original matrix')
	t.end()
})

test( 'should calculate the LDL decomposition of matrix A (4 x 4)', function test(t) {
	var A = ndarray(new Float64Array([9,-1,2,1, -1,8,-5,0, 2,-5,7,3, 1,0,3,4]), [4,4])
	var L = pool.zeros( A.shape, A.dtype )
	var D = pool.zeros( A.shape, A.dtype )
	var d = diag(D)

	var LD = pool.zeros(A.shape, A.dtype)
	var LDLT = pool.zeros(A.shape, A.dtype)

	ops.assigns(L,NaN)
	t.assert(ldl(A,L,d), 'ldl returns true')
	clearUpperTriangular(L)

	t.assert(ndt.matrixIsLowerTriangular(L,1e-3),'L is lower triangular')

	gemm( LD, L, D )
	gemm( LDLT, LD, L.transpose(1,0))

	t.assert( ndt.equal( LDLT, A, 1e-3), 'reconstructs the original matrix')
	t.end()
})

test( 'should calculate the LDL decomposition of matrix A (5 x 5)', function test(t) {
	var A0 = ndarray(new Float64Array([9,-1,2,1,-4, -1,8,-5,0,2, 2,-5,7,3,1, 1,0,3,4,-2, -4,2,1,-2,3]), [5,5])
	var A = ndarray(new Float64Array([9,-1,2,1,-4, -1,8,-5,0,2, 2,-5,7,3,1, 1,0,3,4,-2, -4,2,1,-2,3]), [5,5])
	var L = pool.zeros( A.shape, A.dtype )
	var D = pool.zeros( A.shape, A.dtype )
	var d = diag(D)

	var LD = pool.zeros(A.shape, A.dtype)
	var LDLT = pool.zeros(A.shape, A.dtype)

	ops.assigns(L,NaN)
	t.assert(ldl(A,L,d), 'ldl returns true')
	clearUpperTriangular(L)

	t.assert(ndt.matrixIsLowerTriangular(L,1e-3),'L is lower triangular')

	gemm( LD, L, D )
	gemm( LDLT, LD, L.transpose(1,0))

	t.assert( ndt.equal( LDLT, A0, 1e-3), 'reconstructs the original matrix')
	t.end()
})

test( 'should calculate the in-place LDL decomposition of matrix A (5 x 5)', function test(t) {
	var A = ndarray(new Float64Array([9,-1,2,1,-4, -1,8,-5,0,2, 2,-5,7,3,1, 1,0,3,4,-2, -4,2,1,-2,3]), [5,5])
	var L = pool.zeros( A.shape, A.dtype )
	var D = pool.zeros( A.shape, A.dtype )
	var d = diag(D)

	var LD = pool.zeros(A.shape, A.dtype)
	var LDLT = pool.zeros(A.shape, A.dtype)

	// Assuming the above test for ldl(A,L,d) is correct, verify that the in-place decomposition yields the same result:
	t.assert(ldl(A,L,d), 'ldl returns true')
	t.assert(ldl(A), 'ldl returns true')

	t.assert( ndt.equal( diag(A), d, 1e-3), 'diag is set along A')

	for(var i=1; i<5; i++) {
		t.assert( ndt.equal( A.pick(i,null).hi(i), L.pick(i,null).hi(i) ), 'row ' + i + ' is equal')
	}

	t.end()
})

test('throws an error if provided non-square matrix',function test(t) {
	var A = ndarray(new Float64Array([1,2,2,4,8,6]), [2, 3])
	var L = pool.zeros( A.shape, A.dtype )
	var d = pool.zeros( [ A.shape[0] ], A.dtype)

	t.throws(function() {
		lt = ldl(A, L, d)
	}, Error, 'throws an error')
	t.end()
})


test('throw an error if provided higher-dimensional array (dim > 2)',function test(t) {

	t.plan(1)
	var A = ndarray(new Float64Array([1,2,3,4,5,6,7,8]), [2,2,2])
	var L = pool.zeros( A.shape, A.dtype )
	var d = pool.zeros( [ A.shape[0] ], A.dtype)
	t.throws(function() {
		lt = ldl(A, L, d)
	}, Error, 'throws an error')
	t.end()
})

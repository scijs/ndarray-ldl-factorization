ndarray-ldl-decomposition
===
[![NPM version][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Dependencies][dependencies-image]][dependencies-url]

> LDL Decomposition for ndarrays

## Installation

``` bash
$ npm install ndarray-ldl-factorization
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var ldl = require( 'ndarray-ldl-factorization' );
```

#### ldl(A, L, d)

This function calculates the LDL decomposition of matrix `A = LDL^t`, where `L` is a lower-unit triangular matrix and `D` is a diagonal matrix. Consult the book "Matrix computations" (3rd ed.) by Gene H. Golub and Charles F. Van Loan for further information. The function takes `L` and `d`, the vector of diagonal elements of `D`, as arguments and changes them during execution. If the function completes without error, it returns `true`, otherwise `false`.

## Examples

``` javascript
var ndarray = require('ndarray'),
	show = require('ndarray-show'),
	ldl = require( './../lib' ),
	pool = require('ndarray-scratch');

var A = ndarray(new Float64Array([9,-1,2,-1,8,-5,2,-5,7]), [3,3]);
var L = pool.zeros( A.shape, A.dtype );
var d = pool.zeros( [ A.shape[0] ], A.dtype);

ldl(A, L, d);

console.log( 'A:\n' + show(A), '\n' );

/*  
   9.000   -1.000    2.000
  -1.000    8.000   -5.000
   2.000   -5.000    7.000 
/*

console.log( 'L:\n' + show(L) );

/*
   1.000   -0.111    0.222
   0.000    1.000   -0.606
   0.000    0.000    1.000
*/

console.log( 'd:\n' + show(d) );

/*
 9.000    7.889    3.662
*/

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.

---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Philipp Burckhardt.

[npm-image]: http://img.shields.io/npm/v/ndarray-ldl-factorization.svg
[npm-url]: https://npmjs.org/package/ndarray-ldl-factorization

[travis-image]:  https://travis-ci.org/scijs/ndarray-ldl-factorization
[travis-url]:  https://travis-ci.org/scijs/ndarray-ldl-factorization

[dependencies-image]:http://img.shields.io/david/scijs/ndarray-ldl-factorization.svg
[dependencies-url]: https://david-dm.org/scijs/ndarray-ldl-factorization

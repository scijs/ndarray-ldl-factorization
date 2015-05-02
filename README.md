ndarray-ldl-decomposition
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

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

#### ldl(A)

What does this function do?


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

console.log( 'L:\n' + show(L) );

console.log( 'd:\n' + show(d) );

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

[travis-image]: http://img.shields.io/travis/https://github.com/scijs/ndarray-ldl-factorization.git/master.svg
[travis-url]: https://travis-ci.org/https://github.com/scijs/ndarray-ldl-factorization.git

[dependencies-image]: http://img.shields.io/david/https://github.com/scijs/ndarray-ldl-factorization.git.svg
[dependencies-url]: https://david-dm.org/https://github.com/scijs/ndarray-ldl-factorization.git

'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.hogan_static = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	default_options: function(test) {
		test.expect(2);

		var actual = grunt.file.read('tmp/simple.html'),
			expected = grunt.file.read('test/expected/simple.html');
		test.equal(actual, expected, 'should properly handle simple templating.');

		actual = grunt.file.read('tmp/array.html');
		expected = grunt.file.read('test/expected/array.html');
		test.equal(actual, expected, 'should properly handle array of options data.');

		test.done();
	},

	partials: function(test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/partials.html'),
			expected = grunt.file.read('test/expected/partials.html');
		test.equal(actual, expected, 'should properly handle partial templates.');

		test.done();
	},

	delimiters: function(test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/delimiters.html'),
			expected = grunt.file.read('test/expected/delimiters.html');
		test.equal(actual, expected, 'should properly handle delimiter change.');

		test.done();
	}
};
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

	externalPartials: function(test) {
		test.expect(1);
		var actual = grunt.file.read('tmp/extPartials.html'),
			expected = grunt.file.read('test/expected/partials.html');
		test.equal(actual, expected, 'should properly handle partial templates.');

		test.done();
	},

	externalJson: function(test) {
		test.expect(1);
		var actual = grunt.file.read('tmp/extJSON.html'),
			expected = grunt.file.read('test/expected/simple.html');
		test.equal(actual, expected, 'should properly handle external JSON data');
		test.done();
	},

	delimiters: function(test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/delimiters.html'),
			expected = grunt.file.read('test/expected/delimiters.html');
		test.equal(actual, expected, 'should properly handle delimiter change.');

		test.done();
	},

	perFileData: function(test) {
		test.expect(3);

		var actual = grunt.file.read('tmp/test1.html'),
			expected = grunt.file.read('test/expected/test1.html');
		test.equal(actual, expected, 'should properly handle per file data');

		actual = grunt.file.read('tmp/test2.html');
		expected = grunt.file.read('test/expected/test2.html');
		test.equal(actual, expected, 'should properly handle per file data');

		actual = grunt.file.read('tmp/test3.html');
		expected = grunt.file.read('test/expected/test3.html');
		test.equal(actual, expected, 'should properly handle per file data');

		test.done();
	}
};
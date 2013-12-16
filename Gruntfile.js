/*
 * grunt-hogan-static
 * https://github.com/dlasky/grunt-hogan-static
 *
 * Copyright (c) 2013 Dan Lasky
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
		},

		// Configuration to be run (and then tested).
		hogan_static: {
			default_options: {
				options: {
					data: {
						items: ["a", "b", "c"],
						title: 'title test',
						body: 'body test'
					},
					usePartials: false
				},
				files: {
					'tmp/': ['test/fixtures/simple.html','test/fixtures/array.html'],
				},
			},
			partials: {
				options: {
					title:'title test',
					body:'body test',
					usePartials: true,
				},
				files: {
					'tmp/':['test/fixtures/simple.html','test/fixtures/partials.html'],
				},
			},
			delimiters: {
				options: {
					data: {
						dostuff:'stuff',
						leavealone:'no stuff',
					},
					delimiters: '[[ ]]'
				},
				files: {
					'tmp/':['test/fixtures/delimiters.html'],
				},
			},
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'hogan_static', 'nodeunit']);

	// By default, lint and run all tests.
	//grunt.registerTask('default', ['jshint', 'test']);
	grunt.registerTask('default', ['hogan_static']);

};
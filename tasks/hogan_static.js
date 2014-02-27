/*
 * grunt-hogan-static
 * https://github.com/dlasky/grunt-hogan-static
 *
 * Copyright (c) 2013 Dan Lasky
 * Licensed under the MIT license.
 */

'use strict';

var hogan = require('hogan.js'),
	path = require('path'),
	extend = require('object-extend');

module.exports = function(grunt) {

	grunt.registerMultiTask('hogan_static', 'compile static templates using hogan.js', function() {

		var options = this.options({
			data: {},
			usePartials: false,
			//delimiters:'{{ }}',
			disableLambda: false
		}),
		partials = {},
		partialsList = [],
		dataList = [];

		if (typeof options.usePartials === "string") {
			partialsList = grunt.file.expand(options.usePartials);
			partialsList.forEach( function(partial) {
				var name, 
					template;

				if (!grunt.file.exists(partial)) {
					grunt.log.warn('Source file "' + partial + '" not found.');
				} else {
					template = hogan.compile( grunt.file.read(partial) );
					name = path.basename(partial).split(".")[0];
					partials[name] = template;
				}
			});
		}

		if (typeof options.data === "string") {
			dataList = grunt.file.expand(options.data);
			options.data = {};
			dataList.forEach(function(dataFile) {
				var tempData;
				if (!grunt.file.exists(dataFile)) {
					grunt.log.warn('Source file "' + dataFile + '" not found.');
				} else {
					tempData = grunt.file.readJSON(dataFile);
					extend(options.data, tempData);
				}
			});
		}

		console.dir(options.data);

		this.files.forEach(function(f) {

			var src = f.src.filter(function(filepath) {

				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}

			}).map(function(filepath) {

				var opts = {
						delimiters: options.delimiters,
						disableLambda: options.disableLambda
					},
					name = "",
					render = "",
					template = hogan.compile( grunt.file.read(filepath), opts );

				if (options.usePartials && typeof options.usePartials !== "string") {
					name = path.basename(filepath).split(".")[0];
					partials[name] = template;
				}

				return {
					file: path.basename(filepath),
					template: template
				};

			});

			src.map(function(parsed) {
				var render = parsed.template.render(options.data, partials);
				if (path.dirname(f.dest) === path.dirname(f.dest + "*")) {
					grunt.file.write(f.dest, render);
					grunt.log.writeln("Wrote file:" + f.dest);
				} else {
					grunt.file.write(f.dest + parsed.file, render);
					grunt.log.writeln("Wrote file:" + f.dest + parsed.file);
				}
			});

		});
	});

};
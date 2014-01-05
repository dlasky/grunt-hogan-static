/*
 * grunt-hogan-static
 * https://github.com/dlasky/grunt-hogan-static
 *
 * Copyright (c) 2013 Dan Lasky
 * Licensed under the MIT license.
 */

'use strict';

var hogan = require('hogan.js'),
	path = require('path');

module.exports = function(grunt) {

	grunt.registerMultiTask('hogan_static', 'compile static templates using hogan.js', function() {

		var options = this.options({
			data: {},
			usePartials: false,
			//delimiters:'{{ }}',
			disableLambda: false
		}),
		partials = {};

		if ( typeof options.data === 'string' ) {
            if ( grunt.file.exists( options.data ) ) {
                options.data = JSON.parse( grunt.file.read( options.data ) );
            } else {
                grunt.log.warn( 'Data file ' + options.data + ' not found.' );
            }
		}

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

				if (options.usePartials) {
					name = path.basename(f.src).split(".")[0];
					partials[name] = template;
				}

				return {
					file: path.basename(filepath),
					template: template
				};

			});

			src.map(function(parsed) {
				var render = parsed.template.render(options.data, partials);
				if (grunt.file.isDir(f.dest)) {
					grunt.file.write(f.dest + parsed.file, render);
					grunt.log.writeln("Wrote file:" + f.dest + parsed.file);
				} else {
					//note this will overwrite for right now
					//TODO: add concat or a concat flag
					grunt.file.write(f.dest, render);
					grunt.log.writeln("Wrote file:" + f.dest);
				}
			});

		});
	});

};
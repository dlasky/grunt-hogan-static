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
	fs = require('fs'),
	mkdirp = require('mkdirp');

module.exports = function(grunt) {

	grunt.registerMultiTask('hogan_static', 'compile static templates using hogan.js', function() {

		var options = this.options({
			data: {},
			usePartials: false,
			//delimiters:'{{ }}',
			disableLambda: false,
			useExt: 'html',
			writePartials: false
		}),
		partials = {};

		if ( typeof options.data === 'string' ) {
            if ( grunt.file.exists( options.data ) ) {
                options.data = JSON.parse( grunt.file.read( options.data ) );
            } else {
                grunt.log.warn( 'Data file ' + options.data + ' not found.' );
            }
		}

		var writeFile = function( filename, data ) {
		    grunt.file.write( filename, data);
            grunt.log.writeln("Wrote file:" + filename);
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
					name = path.basename(filepath).split(".")[0].replace( /^_/, '' );
					partials[name] = template.text;
				}

				return {
					file: path.basename(filepath),
					template: template
				};

			});

			src.map(function(parsed) {
				var render = parsed.template.render(options.data, partials);
				var filename = ( parsed.file.substr(0, parsed.file.lastIndexOf( '.' )) || parsed.file ) + '.' + options.useExt;
				// ensure directory exists
				if ( f.dest.match(/\/$/) && !fs.existsSync( f.dest ) ) {
				    mkdirp.sync( f.dest );
				}
                // only write if we should
                if ( ( filename.match( /^_/ ) && options.writePartials ) ||
                     ( !filename.match( /^_/ ) ) ) {
                    writeFile( grunt.file.isDir( f.dest ) ? f.dest + filename : f.dest, render )
                }
			});

		});
	});

};
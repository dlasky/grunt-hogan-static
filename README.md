# grunt-hogan-static

> compile static templates using hogan.js

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hogan-static --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hogan-static');
```

## The "hogan_static" task

### Overview
In your project's Gruntfile, add a section named `hogan_static` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hogan_static: {
    all: {
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
    }
  }
});
```

### Options

#### options.data
Type: `Object`
Default value: `undefined`

JSON object data to pass to hogan for templating.

A string can be passed to `options.data` specifying the path to a json file to use as data.

#### options.usePartials
Type: `Boolean`
Default value: `false`

A Boolean that tells the task to cache discovered templates for use as partials

#### options.delimiters
Type: `String`
Default value: `'{{ }}'`

A String value that can be used to override the default hogan.js mustache style delimiters.

_a word of caution: this string is still subject to grunt templating so usage of <% %> is strongly discouraged_


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

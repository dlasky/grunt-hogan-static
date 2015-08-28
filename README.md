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
        target: {
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
Type: `Object` or `String`
Default value: `undefined`

JSON object data to pass to hogan for templating. If data is passed as a string (including grunt expansion) JSON will be read and stuffed into options.data. note that subsequent json will overwrite any existing keys

#### options.usePartials
Type: `Boolean` or `String`
Default value: `false`

A Boolean that tells the task to cache discovered templates for use as partials. If the value is a string this is treated as a file path (including grunt expansion) to search for partials. In this use case it is assumed that files on the regular file path are NOT partials.

#### options.delimiters
Type: `String`
Default value: `'{{ }}'`

A String value that can be used to override the default hogan.js mustache style delimiters.

_a word of caution: this string is still subject to grunt templating so usage of <% %> is strongly discouraged_

#### options.perFileData
Type: `Boolean`
Default value: `false`

A Boolean that treats the data object as a hash that should be iterated over using the current filename minus its extension `test.html => data[test] = {}`. This allows for multiple templates to use different defined data in a single template pass.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.3.0 - added support for 'keyed' data object to allow for per file rendering
* 0.2.0 - reverted support for output extensions in favor of using grunt's native support
* 0.1.6 - added support for delimiters and lambda exceptions in partials (thanks SethTippetts)
* 0.1.2 - fixed some issues with output paths. added external JSON support for data. added separate partial dir support.

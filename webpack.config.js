var path = require('path');
var node_dir = __dirname + '/node_modules';

/*
This webpack configuration file does the following:

Defines the entry point as ./src/main/js/app.js. In essence, app.js (a module we’ll write shortly) is the proverbial public static void main() of our JavaScript application. webpack must know this in order to know what to launch when the final bundle is loaded by the browser.

Creates sourcemaps so when debugging JS code in the browser, is able to link back to original source code.

Compile ALL of the JavaScript bits into ./src/main/resources/static/built/bundle.js, which is a JavaScript equivalent to a Spring Boot uber JAR. All your custom code AND the modules pulled in a la require() calls are stuffed into this file.

It hooks into the babel engine, using both es2015 and react presets, in order to compile ES6 React code into a format able to be run in any standard browser.
 */
module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
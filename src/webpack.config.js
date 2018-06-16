var path = require('path');

module.exports = {

    /*Defines the entry point as ./src/main/js/app.js. In essence, app.js (a module we’ll write shortly) is the proverbial public static void main() of our JavaScript application. webpack must know this in order to know what to launch when the final bundle is loaded by the browser.*/
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
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
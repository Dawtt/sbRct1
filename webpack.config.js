const path = require('path');


/*
This webpack configuration file does the following:

Defines the entry point as ./src/main/js/app.js. In essence, app.js (a module we’ll write shortly) is the proverbial public static void main() of our JavaScript application. webpack must know this in order to know what to launch when the final bundle is loaded by the browser.

Creates sourcemaps so when debugging JS code in the browser, is able to link back to original source code.

Compile ALL of the JavaScript bits into ./src/main/resources/static/built/bundle.js, which is a JavaScript equivalent to a Spring Boot uber JAR. All your custom code AND the modules pulled in a la require() calls are stuffed into this file.

It hooks into the babel engine, using both es2015 and react presets, in order to compile ES6 React code into a format able to be run in any standard browser.
 */
module.exports = {
    mode: 'development',// "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.

    entry: './src/main/js/PApp.js',
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                // "test" is commonly used to match the file extension
                test: /\.jsx$/,

                // "include" is commonly used to match the directories
                include: [
                    path.resolve(__dirname, "app/src"),
                    path.resolve(__dirname, "app/test")
                ],

                // "exclude" should be used to exclude exceptions
                // try to prefer "include" when possible

                // the "loader"
                loader: "babel-loader", // or "babel" because webpack adds the '-loader' automatically
                // the loader which should be applied, it'll be resolved relative to the context
                // -loader suffix is no longer optional in webpack2 for clarity reasons
                // see webpack 1 upgrade guide
                options: {
                    presets: ["env"]
                },


            },


        ]

    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        extensions: [".js", ".json", ".jsx", ".css"],
        // extensions that are used
    },
    devtool: "source-map", // enum  // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.

};

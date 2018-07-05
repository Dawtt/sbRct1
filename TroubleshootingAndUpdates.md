

Original webpack for project:
1.12.2

var path = require('path');

webpack.config original: 
'''
module.exports = {
    entry: './src/main/js/PApp.js',
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
'''

At version 2.7.0, the error regarding config file already appears:
  14 | class CenteredTabs extends React.Component {
> 15 |   state = {
     |         ^
  16 |     value: 0,
  17 |   };
  
  
  We'll try 
  ^3.12.0
  
  
  
  
  deleted debug: entry
  >ERROR in Entry module not found: Error: Can't resolve 'babel' in '/Users/dw/Dropbox/GitHub/sbRct1'
  BREAKING CHANGE: It's no longer allowed to omit the '-loader' suffix when using loaders.
                   You need to specify 'babel-loader' instead of 'babel',
                   see https://webpack.js.org/guides/migrating/#automatic-loader-module-name-extension-removed
  
  changed babel to babel-loader
  
   [35] (webpack)/buildin/global.js 509 bytes {0} [built]
   [115] ./src/main/js/PApp.js 2.41 kB {0} [built]
   [118] ./src/main/js/index.js 584 bytes {0} [built]
   [119] ./src/main/js/Header.js 760 bytes {0} [built] [failed] [1 error]
   [120] ./src/main/js/Footer.js 681 bytes {0} [built] [failed] [1 error]
   [121] ./src/main/js/Body.js 777 bytes {0} [built] [failed] [1 error]
   [122] ./src/main/js/Dave.js 5.39 kB {0} [built]
   [144] (webpack)/buildin/harmony-module.js 596 bytes {0} [built]
   
   > 14 | class CenteredTabs extends React.Component {
   ->15 |   state = {
        |         ^
     16 |     value: 0,
     17 |   };

Back to this error, so potentially  progress. One update issue with webpack + config has been corrected.

update to current:
4.15.0

>One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:
> - webpack-cli (https://github.com/webpack/webpack-cli)
>   The original webpack full-featured CLI.
> - webpack-command (https://github.com/webpack-contrib/webpack-command)
>   A lightweight, opinionated webpack CLI.
> We will use "npm" to install the CLI via "npm install -D".
> Which one do you like to install (webpack-cli/webpack-command):

add to package.config
    "webpack-cli": "^3.0.8",
during install: 
>npm WARN babel-loader@6.4.1 requires a peer of webpack@1 || 2 || ^2.1.0-beta || ^2.2.0-rc but none is installed. You must install peer dependencies yourself.

try: 

    "babel-loader": "^7.1.4",

>Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
  - configuration.module has an unknown property 'loaders'. 
  
  replace entire loaders section with:
 

    rules: [
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
        loader: "babel-loader" // or "babel" because webpack adds the '-loader' automatically
      }
    ]'''

Back to:
>ERROR in ./src/main/js/PApp.js 8:9
Module parse failed: Unexpected token (8:9)
You may need an appropriate loader to handle this file type.
| export default class extends Component {
| 	render() {
> 		return <Fragment>
|             <Header />
| 			<Body />

Attempting the full babel change:
   "babel-core": "^7.0.0-beta.3",
    "babel-loader": "^7.1.4",
    "babel-polyfill": "^7.0.0-beta.3",
    "babel-preset-es2015": "^7.0.0-beta.3",
    "babel-preset-react": "^7.0.0-beta.3"
    

>npm WARN babel-loader@7.1.4 requires a peer of babel-core@6 but none is installed. You must install peer dependencies yourself.
 npm WARN babel-core@7.0.0-bridge.0 requires a peer of @babel/core@^7.0.0-0 but none is installed. You must install peer dependencies yourself.

still failing at fragment:
ERROR in ./src/main/js/PApp.js 10:2
Module parse failed: Unexpected token (10:2)
You may need an appropriate loader to handle this file type.
| 		return
| 
> 		<Fragment>
|             <Header />
| 			<Body />

From babel:
>Because Babel 7 will be released as @babel/core instead of babel-core, maintainers have no way to do that transition without making a breaking change. e.g.

After some effort, found this with no npm install errors:
>  "devDependencies": {
    "babel-loader": "^7.1.4",
    "babel-polyfill": "^6.16.0",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "@babel/core": "^7.0.0-beta.51",
    "babel-core": "^6.26.3"

Same Fragment error:
ERROR in ./src/main/js/PApp.js 10:2

Deleted the ones haven't heard about recently, leave:
>  "devDependencies": {
    "@babel/core": "^7.0.0-beta.51",
    "babel-loader": "^7.1.4",
    "babel-core": "^6.26.3"

Still same build error. Learned on babel webpage there is an v8 loader. Updated:
> 
    "babel-loader": "^8.0.0-beta.4",
    
Same error. Changing fragment to only contain two text html statements.
Still same.

Found a number of recommendations from webpack's github.
config:
>      "@babel/core": "^7.0.0-beta.32",
      "@babel/plugin-transform-runtime": "^7.0.0-beta.32",
      "@babel/preset-env": "^7.0.0-beta.32",
      "@babel/preset-react": "^7.0.0-beta.32",
      "@babel/preset-stage-2": "^7.0.0-beta.32",
Still fragment error.

Create .babelrc file
Still frag error.
Created webpack.config.babel.js
deleted .babelrc & webpack.confic.babel.js

deleted from webpack.config:
    devtool: 'sourcemaps',

same error. 
?Files that should be involved:
    webpack.config.js
    package.json

Added to webpack.config.js
                    options: {
                        presets: ["env"]
                    },
Same error.
Added items from https://webpack.js.org/configuration/ onto config
Same error.
deleted:
    cache: true,
Same error.


added to config:
 >       context: path.resolve(__dirname, "app"), // string (absolute path!)
        // the home directory for webpack
        // the entry and module.rules.loader option
        //   is resolved relative to this directory

> Can't resolve './src/main/js/PApp.js


Moving webpack.config.js & package.json to oauth1, a simple create-react-app.

Added:

    "css-loader": "^0.28.11",
    "style-loader": "^0.21.0",
    "file-loader": "^1.1.11"
    
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader']
                }
            ]
        }
    };
    
    
Changed the babel-loader preset after webpack errors about not using @babel somewhere with babel-preset-env

##FINALLY BUILT (in oauth1)
Now try sbrct1 again.

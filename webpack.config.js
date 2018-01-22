// Global imports
const webpack = require('webpack');
const colors = require('colors');
const path = require('path');

// Paths
var entry           = './src/js/app.js',
    includePath     = path.join(__dirname, 'src/js'),
    nodeModulesPath = path.join(__dirname, 'node_modules'),
    outputPath      = path.join(__dirname, 'public/js');

// Environment
var PROD = JSON.parse(process.env.NODE_ENV || 0);

// Dev environment
var env     = 'dev',
    time    = Date.now(),
    devtool = 'eval',
    debug   = true,
    plugins = [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(env),
        ___BUILD_TIME___: time
      })
    ];

// Production environment
if (PROD) {
  env = 'prod';
  devtool = 'hidden-source-map';
  debug = false;
  outputPath = __dirname + '/build/public/assets/js';

  uglifyOptions = {
    sourceMap: false,
    mangle: true,
    compress: {
      drop_console: true
    },
    output: {
      comments: false
    }
  };
  plugins.push(new webpack.optimize.UglifyJsPlugin(uglifyOptions));
}

console.log('Webpack build - ENV: ' + env + ' V: ' + time)
console.log('    - outputPath ', outputPath)
console.log('    - includePath ', includePath)
console.log('    - nodeModulesPath ', nodeModulesPath)

module.exports = {
  stats: {
    colors: true
  },
  debug: debug,
  devtool: devtool,
  devServer: {
    contentBase: './public/'
  },
  entry: [
    entry
  ],
  output: {
    path: outputPath,
    publicPath: 'public/js',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        include: [
          includePath, nodeModulesPath
        ]
      },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ }
    ]
  },
  plugins: plugins
};

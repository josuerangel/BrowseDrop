const path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    app: [__dirname + '/src'],
    "browse-drop-standalone": ['babel-polyfill', 'whatwg-fetch', __dirname + '/src/components/wrapper/standalone.js']
  },
  output: {
    path: './bundles',
    filename: '[name].js',
    publicPath: '/bundles/'
  },
  //devtool: "cheap-module-source-map",
  devtool: "source-map",
  //devtool: "cheap-module-eval-source-map",
  module: {
    loaders: [
      {
        test: /.js/,
        loader: 'babel',
        include: __dirname + '/src',
        exclude: '/node_modules/'
      },
      {
        // whatwg-fetch use Promsie which IE11 doesn't support
        test: /\.js$/,
        include: [/whatwg-.*/],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader:'style!css!'
      },
       { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
       {
            loader: 'json-loader',
            test: /\.json$/
        }
    ],
    rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.styl$/,
          use: ['style-loader', 'css-loader', 'stylus-loader'],
        }
      ]
  },
  plugins: [
  ],
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', '.jsx', '.styl']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};

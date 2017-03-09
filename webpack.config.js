var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var yeticss = require('yeticss');

module.exports = {
  entry: {
    app: __dirname + '/src',
    components: [__dirname + '/src/components/Component.js'],
    uploadBox: [__dirname + '/src/components/wrapper/wrapper2.js']
  },
  output: {
    //path: './bin',
    path: './bundles',
    //path: path.resolve(__dirname, "build"),
    filename: '[name].js',
    //filename: 'uploadBox.js'
    publicPath: '/bundles/'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /.js/,
        loader: 'babel',
        include: __dirname + '/src',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        loader:'style!css!'
      },
       { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
       {
           test: /\.less$/,
           loader: "less-loader" // compiles Less to CSS
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
        },
        {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }
      ]
  },
  plugins: [
      new webpack.ProvidePlugin({
              Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
              fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
         })
  //     new webpack.DefinePlugin({ //<--key to reduce React's size
  //       'process.env': {
  //         'NODE_ENV': JSON.stringify('production')
  //       }
  //     }),
  //     new webpack.optimize.DedupePlugin(),
  //     new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  stylus: {
      use: [yeticss()]
    }
  //devtool: "cheap-module-eval-source-map"
};

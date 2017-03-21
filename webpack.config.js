const path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var yeticss = require('yeticss');

module.exports = {
  entry: {
    app: __dirname + '/src',
    components: [__dirname + '/src/components/Component.js'],
    uploadBox: [__dirname + '/src/components/wrapper/wrapper2.js'],
    uploadBoxStandAlone : [__dirname + '/src/components/UploadBox/index.js'],
    uploadBox2: [__dirname + '/src/components/wrapper/wrapper3.js']
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
         }),
        //  new webpack.DefinePlugin({
        //        'process.env':{
        //          'NODE_ENV': JSON.stringify('production')
        //        }
        //      }),
        //      new webpack.optimize.UglifyJsPlugin({
        //        compress:{
        //          warnings: true
        //        }
        //      })
  //     new webpack.DefinePlugin({ //<--key to reduce React's size
  //       'process.env': {
  //         'NODE_ENV': JSON.stringify('production')
  //       }
  //     }),
  //     new webpack.optimize.DedupePlugin(),
  //     new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    // alias: {
    //   'react': path.join(__dirname, 'node_modules', 'react')
    // },
    extensions: ['', '.js', '.jsx', '.styl']
  },
  stylus: {
      use: [yeticss()]
    },
    // externals: {
    //     'react': { commonjs: 'react', commonjs2: 'react', amd: 'react', root: 'React' },
    //     'react-dom': { commonjs: 'react-dom', commonjs2: 'react-dom', amd: 'react-dom', root: 'ReactDOM' },
    //     'react-addons-css-transition-group': { commonjs: 'react-addons-css-transition-group', commonjs2: 'react-addons-css-transition-group', amd: 'react-addons-css-transition-group', root: ['React','addons','CSSTransitionGroup'] }
    //   }
  //devtool: "cheap-module-eval-source-map"
};

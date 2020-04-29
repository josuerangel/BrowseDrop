const HtmlWebPackPlugin = require("html-webpack-plugin");
const poststylus = require("poststylus");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.styl$/i,
          use: [
              'style-loader',
              'css-loader',
              'stylus-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/js/components/index.html",
        filename: "./index.html"
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            use: [poststylus([ 'autoprefixer', 'rucksack-css' ])]
          }
        }
      }),
    ]
  };
const HtmlWebPackPlugin = require("html-webpack-plugin");
const poststylus = require("poststylus");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    app: [__dirname + "/src"],
    "browse-drop-standalone": [
      __dirname + "/src/components/wrapper/standalone.js",
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist",
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/js/components/index.html",
      filename: "./index.html",
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [poststylus(["autoprefixer", "rucksack-css"])],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
    },
    extensions: [".js", ".jsx", ".styl"],
  },
};

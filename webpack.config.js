var path = require("path");

const webpack = require("webpack")

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./app/index.html",
  filename: "index.html",
  inject: "body"
})

module.exports = {
  entry: "./app/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /(\.js$|\.jsx$)/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          "file-loader",
          "image-webpack-loader"
        ]

        // loaders: [
        //   "file-loader",
        //   "image-webpack-loader"
        //   // "file?hash=sha512&digest=hex&name=[hash].[ext]",
        //   // "image-webpack?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}"
        // ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000",
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        loader: "file-loader",
      },
    ]
  },
  devtool: "source-map",

  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      jquery: "jquery"
    })
  ]
};

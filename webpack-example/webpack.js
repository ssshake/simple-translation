var path = require("path")
var webpack = require("webpack")
var MinifyPlugin = require("babel-minify-webpack-plugin")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin")

var ROOT_PATH = path.resolve(__dirname, "..")
var PUBLIC_PATH = path.resolve(ROOT_PATH, "public")
var SRC_PATH = path.resolve(ROOT_PATH, "src")

module.exports = {
  entry: require("./webpack/entry.js")(SRC_PATH, false),
  output: require("./webpack/output.js")(PUBLIC_PATH, "/"),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "autoprefixer-loader" },
          { loader: "sass-loader" }
        ]
      },
    ].concat(require("./webpack/moduleFontRules.js")())
  },
  resolve: require("./webpack/resolve.js"),

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MinifyPlugin(),
    new HtmlWebpackPlugin({
      filename: "content.html",
      template: path.resolve(SRC_PATH, "views", "content.html"),
      inlineSource: ".(js|css)$" // Extended by HtmlWebpackInlineSourcePlugin
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.ProvidePlugin({
      translate: ['i18n','default'],
      i18n: ['i18n'],
    }),
  ]
}

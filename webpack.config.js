const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve("src"),
  mode: "development",
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: ["vue-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./index.html" }),
    new CopyWebpackPlugin({ patterns: [{ from: "./img", to: "./img" }] }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  entry: "./index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    contentBase: "./index.html",
    port: 3000,
  },
};

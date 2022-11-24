const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
var liveServer = require("live-server");
const dev = process.env.NODE_ENV == "development";
if(dev){
  liveServer.start({
    root:'./',
    file:'index.html'
  })
}
module.exports = {
  watch: dev,
  mode:'development',
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".js",'.ts','.css','.png'],
    plugins: [new TsconfigPathsPlugin({/* options: see below */})]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
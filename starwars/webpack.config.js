const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin-next");

const { NODE_ENV = "development" } = process.env;

module.exports = {
  entry: "./src/index.ts",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  watch: NODE_ENV === "development",
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ["sh scripts/launch-dev.sh"],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};

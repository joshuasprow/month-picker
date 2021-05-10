const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PUBLIC_DIR = path.resolve(__dirname, "public");
const SRC_DIR = path.resolve(__dirname, "src");

const plugins = [
  new webpack.DefinePlugin({
    "process.env.LOCAL": JSON.stringify(process.env.LOCAL),
  }),
];

let body = '<script src="main.js"></script>';

const cssFilePath = path.join(SRC_DIR, process.env.npm_package_dsccViz_cssFile);
if (fs.existsSync(cssFilePath)) {
  body = body + '\n<link rel="stylesheet" href="index.css">';
  plugins.push(new CopyWebpackPlugin([{ from: cssFilePath, to: "." }]));
}

const iframeHTML = `
<!doctype html>
<html><body>
${body}
</body></html>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, "vizframe.html"), iframeHTML);

module.exports = [
  {
    mode: "development",
    entry: "./src/index.tsx",
    devServer: {
      contentBase: PUBLIC_DIR,
    },
    output: {
      filename: "main.js",
      path: PUBLIC_DIR,
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  },
];

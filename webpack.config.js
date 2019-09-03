const path = require("path");
const moment = require("moment");
const day = moment().format("DDMMYYYY")

// loader for images: https://www.npmjs.com/package/image-webpack-loader
// IMPORTANT: [[ gif => webp ]] not supported

const minify = {
  name: "minify",
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "blundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "hs-[name]-"+day+"@1x.[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                quality: 90
              },
              gifsicle: {
                optimizationLevel: 3
              }
            }
          }
        ]
      }
    ]
  }
};

const convert = {
  name: "convert",
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "blundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jpg|gif)$/i, // only takes jpe?g files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "hs-[name]-"+day+"@1x.webp"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              webp: {
                quality: 90
              }
            }
          }
        ]
      }
    ]
  }
};

module.exports = [minify, convert];

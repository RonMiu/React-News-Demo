var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer:{
    historyApiFallback:true,
  },
  // performance:{
  //   hints:'warning',
  //   maxEntrypointSize:100000,
  //   maxAssetSize:450000,
  // },
  context: path.join(__dirname),
  devtool:'source-map',
  entry: {
    app: "./src/js/root.js",
    vendor:['react']
  },
  module:{
    loaders: [{
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', ["import", {
            libraryName: "antd",
            style: "css"
          }]],
        }
      },
      //下面是添加的 css 的 loader，也即是 css 模块化的配置方法，大家可以拷贝过去直接使用
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        loader: 'style-loader!css-loader'
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
  output: {
    path: __dirname,
    filename: "[name].js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
    })
  ],
};

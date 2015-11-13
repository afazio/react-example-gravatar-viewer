import path from 'path';

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/client/app.js'),
    styles: path.resolve(__dirname, '../src/client/styles.js')
  },

  output:  {
    path: path.resolve(__dirname, '../public/javascripts'),
    filename: '[name].js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['src/client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        cacheDirectory: true
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + path.resolve(__dirname, '../node_modules/foundation-sites/scss')
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};

import path from 'path';

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/client/app.js')
  },

  output:  {
    path: path.resolve(__dirname, '../public/javascripts'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        cacheDirectory: true
      }
    ]
  }
};

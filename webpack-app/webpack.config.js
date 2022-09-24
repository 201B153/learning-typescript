const path = require('path');

module.exports = {
  mode: 'development',// do's less optimization
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist' // to make webpack understand where output is written to 
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};


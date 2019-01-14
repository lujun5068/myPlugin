const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'myPlugin': path.resolve(__dirname, './src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].min.js',
    publicPath: './build/',
    libraryTarget: 'commonjs2' // 注意这里按 commonjs2 模块规范打包
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          {
            loader: 'ts-loader'
          }
        ],
        include: path.resolve(__dirname, './src/') // 只解析 src 目录下的文件
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[hash:8]',
        include: path.resolve(__dirname, './src/')
      }
    ]
  },
  resolve: { // 省略文件后缀时，默认按下面的配置取
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: { // 不把 react 打包进去
    react: 'react'
  }
}

// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
      compiler: 'webpack5',
    }]
  ], 
  plugins: [

    // ⚠️ 关键：通过环境变量判断，仅在 RN 端加载此插件
    process.env.TARO_ENV === 'rn' &&
    'babel-plugin-transform-react-jsx-to-rn-stylesheet'
  ].filter(Boolean)
}

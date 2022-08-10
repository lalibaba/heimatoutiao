module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 'postcss-pxtorem': {
    //   rootValue: ({ file }) => (/vant/i.test(file) ? 37.5 : 75),
    //   rootValue: ({ file }) => (file.indexOf('vant') != -1 ? 37.5 : 75),
    //   // rootValue: 37.5,
    //   propList: ['*'],
    //   exclude: 'github-markdown'
    // }

    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}

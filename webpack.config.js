module.exports = {
  entry: './index.js',
  output: {
    library: 'nanoJS',
    filename: 'dist/nano.min.js'
  },
  node: { Buffer: false }
};

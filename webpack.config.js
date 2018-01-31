module.exports = {
  entry: './index.js',
  output: {
    library: 'nanoJS',
    filename: 'dist/nano-lib.min.js'
  },
  node: { Buffer: false }
};

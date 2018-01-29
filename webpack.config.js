module.exports = {
  entry: './index.js',
  output: {
    library: 'raiblocksAddress',
    filename: 'dist/raiblocks-address.min.js'
  },
  node: { Buffer: false }
};

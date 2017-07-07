module.exports = c => c.set({
  frameworks: ['mocha', 'browserify'],
  files: ['test.js'],
  preprocessors: { 'test.js': ['browserify'] },
  browserify: {
    debug: true,
    transform: [['babelify', { plugins: ['istanbul'] }]]
  },
  reporters: ['progress', 'coverage'],
  coverageReporter: {
    reporters: [{ type: 'lcov' }]
  },
  browsers: ['Chrome'],
  singleRun: true
})

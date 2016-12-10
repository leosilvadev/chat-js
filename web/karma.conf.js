module.exports = function karmaConfig (config) {
  config.set({
    frameworks: ['jasmine'],
    
    files: ['spec/spec.webpack.js'],
    
    preprocessors: {
      'spec/spec.webpack.js': ['webpack']
    },
    
    browsers: ['PhantomJS'],

    singleRun: true,

    webpack: require('./webpack.config'),

    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};

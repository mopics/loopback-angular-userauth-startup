exports.config = {
    allScriptsTimeout:11000,
    specs: [
        'e2e/*.js'
    ],
    capability: {
        browserName: 'firefox'
      },

    baseUrl:'http://localhost:9000/',

    framework: 'jasmine',
        directConnect: true, // not using the Selenium  web-drivers

    jasminNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
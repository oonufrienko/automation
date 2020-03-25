exports.config = {
  directConnect: true,

  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'jasmine',

  suites: {
    loginpage: './tests/frob_LoginPage.js',
    users: './tests/frob_UsersPage.js',
    mainpage: './tests/frob_MainPage.js',
    tt: './tests/frob_TaskTemplate.js',
    all: ['./tests/frob_LoginPage.js','./tests/frob_UsersPage.js','./tests/frob_MainPage.js','./tests/frob_TaskTemplate.js'] 
  },

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['./tests/frob*.js'],
  
  onPrepare: function() {
    browser.manage().timeouts().implicitlyWait(5000);
    browser.driver.manage().window().maximize();
    global.gEC = protractor.ExpectedConditions;
    var genNameHelper = require('./utils/helper.js');
    global.gTTName = "Automation Task Template " + genNameHelper.generateName();
    global.gTSName = "Automation Task Schedule " + genNameHelper.generateName();
    global.gUserName = "AutomationUserName "+ genNameHelper.generateName();
    // --------------- Report section begin --------------
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: 'results',
      filePrefix: 'reportXMLoutput'
    }));
    // --------------- Report section end --------------
  },

  params: {
    login: {
      username: 'admin',
      password: 'admin',
      wronguser: 'name',
      wrongpassword: 'name123'
    }
  },
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 250000,
    isVerbose: true,
    includeStackTrace: true
  }
};
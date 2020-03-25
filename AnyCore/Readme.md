### Automation tests for AnyCore project

Precondition: <br/>
Make sure **Node.js** is installed, it is required by protractor framework.<br/>

1) Protractor install - `npm install -g protractor`<br/>
2) To make sure the lastest version of webdriver-manager is used run `webdriver-manager update`<br/>
3) To start webdriver-manager run in the first console `webdriver-manager start`<br/>
4) To run automation tests run in the second console `protractor {path to}conf.js --baseUrl='{URL of your testing server instance}'`<br/>

Files description:<br/>
```conf.js``` - configuration file<br/>
```./pages/frob_login_mainPage_TTcreation.js``` - all 11 test specs (in future they will be divided into test suits)<br/>
```./tests/LoginPage.po.js``` - page object that represents Login page<br/>
```./tests/MainPage.po.js``` - page object that represents Main page<br/>



describe("Login page.", function() {
    var loginPage = require('../pages/LoginPage.po.js');
    var mainPage = require('../pages/MainPage.po.js');
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var assert = chai.assert;

    beforeEach(function() {
        return browser.ignoreSynchronization = true;
    });

    it("Displays error message when user enter invalid credentials", function() {

        browser.get(browser.baseUrl);
        loginPage.login(browser.params.login.wronguser, browser.params.login.wrongpassword);

        assert.eventually.equal(loginPage.errorMsg.getText(), 'Invalid Username or Password');
    });

    it("User successfully logging into the system", function() {

        loginPage.login(browser.params.login.username, browser.params.login.password);

        assert.eventually.equal(mainPage.mainMenu.count(), 8);
        
        // assert.eventually.equal(mainPage.mainMenu.get(0).getText(), 'Robots');
        assert.eventually.equal(mainPage.mainMenu.get(1).getText(), 'Maps');
        assert.eventually.equal(mainPage.mainMenu.get(2).getText(), 'Users');
        assert.eventually.equal(mainPage.mainMenu.get(4).getText(), 'Tasks');
        assert.eventually.equal(mainPage.mainMenu.get(5).getText(), 'Settings');
        assert.eventually.equal(mainPage.mainMenu.get(6).getText(), 'Logs');
        assert.eventually.isTrue(mainPage.userMenuButton.isDisplayed());

    });

    it("Log out", function() {
        mainPage.logout();
        assert.eventually.isTrue(loginPage.loginButton.isDisplayed());
    });

});
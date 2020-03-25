
describe("Main page.", function() {

    var loginPage = require('../pages/LoginPage.po.js');
    var mainPage = require('../pages/MainPage.po.js');
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var assert = chai.assert;

    beforeEach(function() {
        return browser.ignoreSynchronization = true;
    });

    it("Go to Task section", function() {

        var tasksSection = mainPage.mainMenu.get(4);
        mainPage.open(tasksSection);

//        mainPage.openTaskSection();
        assert.eventually.equal(mainPage.subMenu.count(), 3);
        assert.eventually.equal(mainPage.subMenu.get(0).getText(), 'Tasks');
        assert.eventually.equal(mainPage.subMenu.get(1).getText(), 'Task Schedules');
        assert.eventually.equal(mainPage.subMenu.get(2).getText(), 'Task Templates');

    });

    it("Check the admin button", function() {
        assert.eventually.isTrue(mainPage.userMenuButton.isDisplayed());
        assert.eventually.equal(mainPage.userMenuButton.getText(), browser.params.login.username);
        //mainPage.userMenuButton.getAttribute('class');
        //assert.eventually.equal(mainPage.userMenuButton.getAttribute('class'), mainPage.activeMenuUserState);
        mainPage.logout();
    });

});
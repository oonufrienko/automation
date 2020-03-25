describe("Users page", function() {
    var usersPage = require('../pages/UsersPage.po.js');
    var mainPage = require('../pages/MainPage.po.js');
    var helper = require('../utils/helper.js');
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var assert = chai.assert;
    var expect = chai.expect;

    beforeEach(function() {
        return browser.ignoreSynchronization = true;
    });

    it("Users list is displayed on users screen", function() {
        mainPage.open(usersPage.usersPageButton);

        assert.eventually.isTrue(usersPage.usersList.isDisplayed());
    });

    it("Verify active user highlight", function() {
        //usersPage.open();
        assert.eventually.equal(usersPage.activeUser.getCssValue('border-left'), '5px solid rgb(0, 129, 194)');
        assert.eventually.equal(usersPage.activeUser.getCssValue('border-top-color'), 'rgba(0, 129, 194, 1)');
        assert.eventually.equal(usersPage.activeUser.getCssValue('border-bottom-color'), 'rgba(0, 129, 194, 1)');
    });

    it("User is redirected to Add User screen after click on + button", function() {
        //usersPage.open();
        usersPage.openAddUserScreen();

        assert.eventually.equal(usersPage.pageHeader.getText(), 'Add User');
        assert.eventually.equal(usersPage.usernameRow.getText(), 'Username');
        assert.eventually.equal(usersPage.nameRow.getText(), 'Name');
        assert.eventually.equal(usersPage.emailRow.getText(), 'Email');
        assert.eventually.equal(usersPage.roleRow.getText(), 'Role');
        assert.eventually.equal(usersPage.passwordRow.getText(), 'Password');
        assert.eventually.isTrue(usersPage.saveButton.isDisplayed());
        assert.eventually.isTrue(usersPage.cancelButton.isDisplayed());
    });

    it("Validate users add screen", function() {
        //usersPage.open();
        usersPage.openAddUserScreen();
        usersPage.saveButton.click();

        assert.eventually.equal(usersPage.errorToastr.getText(),
            'User data is not valid. Please check highlighted fields above');
        assert.eventually.equal(usersPage.usernameTextField.getCssValue('border'),
            '1px solid rgb(255, 83, 63)');
        assert.eventually.equal(usersPage.nameTextField.getCssValue('border'),
            '1px solid rgb(255, 83, 63)');
        assert.eventually.equal(usersPage.emailTextField.getCssValue('border'),
            '1px solid rgb(255, 83, 63)');
        assert.eventually.equal(usersPage.passwordTextField.getCssValue('border'),
            '1px solid rgb(255, 83, 63)')
    });

    it("Validate minimum password length", function() {
        //usersPage.open();
        usersPage.openAddUserScreen();
        usersPage.passwordTextField.sendKeys('1234567');
        usersPage.saveButton.click();

        assert.eventually.equal(usersPage.errorToastr.getText(),
            'User data is not valid. Please check highlighted fields above');
        assert.eventually.equal(usersPage.passwordTextField.getCssValue('border'),
            '1px solid rgb(255, 83, 63)');
        assert.eventually.equal(usersPage.passwordFieldError.getText(),
            'Password should have 8 or more characters');
    });

    it("Correct error is shown for invalid email", function() {
        //usersPage.open();
        usersPage.openAddUserScreen();
        usersPage.emailTextField.sendKeys('test@test');
        usersPage.saveButton.click();

        assert.eventually.equal(usersPage.errorToastr.getText(),
            'User data is not valid. Please check highlighted fields above');
        assert.eventually.equal(usersPage.emailTextField.getCssValue('border'),
            '1px solid rgb(255, 83, 63)');
        assert.eventually.equal(usersPage.emailFieldError.getText(),
            'Invalid email format');

        usersPage.emailTextField.clear().sendKeys('test@test.');
        usersPage.saveButton.click();

        assert.eventually.equal(usersPage.errorToastr.getText(),
            'User data is not valid. Please check highlighted fields above');
        assert.eventually.equal(usersPage.emailTextField.getCssValue('border'),
            '1px solid rgb(255, 83, 63)');
        assert.eventually.equal(usersPage.emailFieldError.getText(),
            'Invalid email format');
    });

    it("Save button appears as far users starts to change any value", function() {
        //usersPage.open();
        usersPage.openAddUserScreen();
        usersPage.usernameTextField.sendKeys('test');

        assert.eventually.isTrue(usersPage.saveButton.isDisplayed());
    });

    it("User can be successfully created", function() {
        //usersPage.open();
        usersPage.openAddUserScreen();
        usersPage.roleDropDown.click();
        helper.selectDropdownByNumber(usersPage.roleDropDownInner, 2);
        usersPage.usernameTextField.sendKeys('AutomationUser');
        usersPage.nameTextField.sendKeys(gTTName);
        usersPage.emailTextField.clear().sendKeys('test@test.com');
        usersPage.passwordTextField.sendKeys('12345678');
        usersPage.saveButton.click();
        // /browser.sleep(2000);

        helper.getElementInTheList(usersPage.usersList).then(function (result){
            assert.include(result[0], 'AutomationUser');
        });
        mainPage.logout();
    });

});
var loginPage = require('../pages/LoginPage.po.js');

var UsersPage = function() {

    //PAGE_ELEMENTS
    this.nameRow = element(by.id('user_name_row'));
    this.emailRow = element(by.id('user_email_row'));
    this.iconAddUser = element(by.css('a.icon.action-plus'));
    this.cancelButton = element(by.css('button.any-cancel-button.any-button.gray.regular'));
    this.saveButton = element(by.css('button.any-save-button.any-button.blue.regular'));
    this.usersPageButton = element(by.css('li.tab-item.tab-users'));
    this.pageHeader = element(by.css('div.any-page-title.any-page-header-part'));
    this.usersList = element(by.css('ul.list-items'));
    this.activeUser = element(by.css('li.list-item.active.has-link'));
    this.usernameRow = element.all(by.css('div.data-grid-row.space-between')).first();
    this.roleRow = element(by.id('user_role_row')).element(by.css('div.label-column.column'));
    this.passwordRow = element(by.id('user_password_row'));
    this.errorToastr = element(by.css('div.toast.toast-error'));
    this.usernameTextField = element.all(by.css('div.data-grid-row.space-between')).first().element(by.css('input[type=text]'));

    this.nameTextField = element(by.id('user_name_row')).element(by.css('input[type=text]'));
    this.emailTextField = element(by.id('user_email_row')).element(by.css('input[type=text]'));
    this.passwordFieldError = element(by.id('user_password_error'));
    this.emailFieldError = element(by.id('user_email_error'));
    this.passwordTextField = element(by.css('input[type=password]'));
    this.roleDropDown = element(by.css('div.Select-value'));
    this.roleDropDownInner = element(by.css('div.Select-menu'));


    //PAGE_UTIL_FUNCTIONS
    this.open = function(){
        browser.get(browser.baseUrl);
        loginPage.login(browser.params.login.username, browser.params.login.password);
        this.usersPageButton.click();

        return this
    };

    this.openAddUserScreen = function(){
        this.iconAddUser.click();
    };

    this.getUsersList = function(){
        var UsersList = this.usersList.then(function(usersList) {
            var usersListItemTextPromises = usersList.map(function(usersListItem) {
                return usersListItem.getText();
            });

            var resolvedUserNames = Promise.all(usersListItemTextPromises)
                .then(function(values) {
                    return values;
                });
            return resolvedUserNames;
        });
        return UsersList;
    };
};

module.exports = new UsersPage();

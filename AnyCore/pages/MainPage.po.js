var loginPage = require('../pages/LoginPage.po.js');

var MainPage = function() {

	this.mainMenu = element.all(by.css('ul.tabs li'));
	this.userMenuButton = element(by.css('.user-menu .dropdown-container'));
	this.logoutButton = element.all(by.css('.user-menu .dropdown-content .dropdown-menu-inner li'));
	this.activeMenuUserState = 'dropdown-container';
	this.inactiveMenuUserState = element(by.css('.drop-down.hidden'));
	this.subMenu = element.all(by.css('.list-header ul.list-tabs li'));
	this.logout = function(){
		this.userMenuButton.click();
        this.logoutButton.get(2).click();
    };
    this.open = function(locator){
        browser.get(browser.baseUrl);
        loginPage.login(browser.params.login.username, browser.params.login.password);
        locator.click();
    };

};

module.exports = new MainPage();
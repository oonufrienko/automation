var LoginPage = function() {

	this.userNameField = $('input[type="text"]');
	this.passwordField = $('input[type="password"]');
	this.loginButton = $('input[type="submit"]');
	this.errorMsg = $('.grid-content.err-block');
	this.login = function(name, password) {
		this.userNameField.clear().sendKeys(name);
		this.passwordField.clear().sendKeys(password);
		this.loginButton.click();
	};

};

module.exports = new LoginPage();
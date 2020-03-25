module.exports = {
	generateName: function() {
		var name = "";
		var id = "abcdefghijklmnopqrstuvxywz";

		for (i = 0; i <= 5; i++)
			name += id.charAt(Math.floor(Math.random() * id.length));

		return name;
	},

	selectDropdownByNumber: function(elm, index) {
			elm.all(by.css('.Select-option')).then(function(options) {
				options[index].click();
			});

	},

	getElementInTheList: function(listLocator, listItemName) {
        return new Promise(function (resolve) {
            listLocator
                .then(function(ttList) {

                    var ttListItemTextPromises = ttList.map(function(ttListItem) {
                        return ttListItem.getText();
                    });

                    Promise
                        .all(ttListItemTextPromises)
                        .then(function(ttListItemsTextArray) {
                            var isgTTNameIncluded = ttListItemsTextArray.some(function(ttItemText) {
                                return ttItemText === listItemName;
                            });

                            resolve([ttListItemsTextArray, isgTTNameIncluded]);
                        });
                });
        });
    }
};

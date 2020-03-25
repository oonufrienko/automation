
describe("Task Template page.", function() {

    var loginPage = require('../pages/LoginPage.po.js');
    var mainPage = require('../pages/MainPage.po.js');
    var taskTemplatePage = require('../pages/TaskTemplate.po.js');
    var helper = require('../utils/helper.js');
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var assert = chai.assert;

    beforeEach(function() {
        return browser.ignoreSynchronization = true;
        window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 250000;
        setTimeout(function () {
            console.log('inside timeout');
            done();
        }, 500);
    });

    it("Go to Task Template sub-section ", function() {
        // make login and go to Task Template sub-section

        var tasksSection = mainPage.mainMenu.get(4);
        mainPage.open(tasksSection);

        // Go to Task Template section 
        mainPage.subMenu.get(2).click();

        // add verification - if Tasks menu item has highliting
        // add verification - if Tasks Template sub-menu item has highliting
        assert.eventually.isTrue(taskTemplatePage.plusButtonAddNewTT.isDisplayed());

    });

    it("Verify if user can cancel creation of new Task Template. TC_AT_002", function() {
        taskTemplatePage.plusButtonAddNewTT.click();
        taskTemplatePage.taskTemplateNameField.clear();
        taskTemplatePage.taskTemplateNameField.sendKeys(gTTName);
        taskTemplatePage.buttonAddAnAction.click();
        taskTemplatePage.actionGoToDestination.click();
        taskTemplatePage.goToDestination_DestType.click();
        helper.selectDropdownByNumber(taskTemplatePage.goToDestination_DestType, 1);
        taskTemplatePage.goToDestination_Destination.click();
        helper.selectDropdownByNumber(taskTemplatePage.goToDestination_Destination, 1);
        taskTemplatePage.ttCancelButton.click();

        helper.getElementInTheList(taskTemplatePage.TTlist, gTTName)
              .then(function(result) {
                 // verify if TT list doesn't contain TT with name = gTTName
                    expect(result[1]).toBe(false);
                 // verify if first item in TT list is opened
                    assert.eventually.equal(taskTemplatePage.taskTemplateTitle.getText(), result[0][0]);
              });
    });

    it("Create new Task Template item - 1-st negative case. No name and actions were added", function() {

        taskTemplatePage.plusButtonAddNewTT.click();
        taskTemplatePage.ttSaveButton.click();

        // Is error message is shown
        assert.eventually.isTrue(taskTemplatePage.errorToastr.isDisplayed());
        // Is Task Template name field is highlited
        assert.eventually.isTrue(taskTemplatePage.errorNameFieldOutline.isDisplayed());
        // Is error message correct
        assert.eventually.equal(taskTemplatePage.errorToastr.getText(), 'Please fill all the mandatory fields highlighted above and add at least one action to the Template');

    });

    it("Create new Task Template item - 2-nd negative case. There is only name and still no actions", function() {

        taskTemplatePage.taskTemplateNameField.clear();
        taskTemplatePage.taskTemplateNameField.sendKeys(gTTName);
        taskTemplatePage.ttSaveButton.click();

        assert.eventually.isTrue(taskTemplatePage.errorToastr.isDisplayed());
        assert.eventually.equal(taskTemplatePage.errorToastr.getText(), 'Please add at least one action to the Template');

    });

    it("Investigate the ribbon with actions", function() {

        taskTemplatePage.buttonAddAnAction.click();

        // Is list of actions stay visible 
        assert.eventually.isTrue(taskTemplatePage.ribbonWithActions.isDisplayed());
        // Is drop-down is visible 
        assert.eventually.isTrue(taskTemplatePage.ribbonDropDown.isDisplayed());
        // Is close button is visible
        assert.eventually.isTrue(taskTemplatePage.ribbonCloseButton.isDisplayed());
        // might be extended with few additional expected

    });

    it("Close the ribbon with actions and open it again", function() {

        taskTemplatePage.ribbonCloseButton.click();

        //expect(mainPage.ribbonWithActions.isDisplayed()).not.toBe(true);
        //expect(mainPage.ribbonWithActions.isDisplayed()).toBeTrue();
        taskTemplatePage.buttonAddAnAction.click();
        assert.eventually.isTrue(taskTemplatePage.ribbonWithActions.isDisplayed());
        //expect(mainPage.isGoToDestinationVisible.isDisplayed()).toBe(false);


    });

    it("Add actions to new Task Template. Try to save Task Template with empty fields. Negative case", function() {

        taskTemplatePage.actionGoToDestination.click();

        assert.eventually.isTrue(taskTemplatePage.isGoToDestinationVisible.isDisplayed());

        taskTemplatePage.buttonAddAnAction.click();
        taskTemplatePage.actionWaitForDestinationSelection.click();

        //assert.eventually.isTrue(mainPage.isWaitForDestinationSelectionVisible.isDisplayed());

        taskTemplatePage.buttonAddAnAction.click();
        taskTemplatePage.actionWaitForButtonPress.click();

        assert.eventually.isTrue(taskTemplatePage.isWaitForButtonPressVisible.isDisplayed());

        taskTemplatePage.buttonAddAnAction.click();
        taskTemplatePage.actionWaitAtDestination.click();

        assert.eventually.isTrue(taskTemplatePage.isWaitAtDestinationVisible.isDisplayed());

        taskTemplatePage.ttSaveButton.click();

        // Verify if empty fields are highlighted
        assert.eventually.equal(taskTemplatePage.goToDestination_DestType.getAttribute('class'), 'Select select-dropdown invalid Select--single has-value');
        assert.eventually.equal(taskTemplatePage.waitForDestination_Destination.getAttribute('class'), 'Select select-dropdown invalid Select--single is-searchable has-value');
        assert.eventually.equal(taskTemplatePage.waitForButtonPress_ButtonText.getAttribute('class'), 'any-input invalid');
        assert.eventually.equal(taskTemplatePage.waitAtDestination_Duration.getAttribute('class'), 'duration-picker-row grid-block form-field-invalid');

        assert.eventually.isTrue(taskTemplatePage.errorToastr.isDisplayed());
        assert.eventually.equal(taskTemplatePage.errorToastr.getText(), 'Please fill all the mandatory fields highlighted above');

    });

    it("Create New Task Template - positive case. Fullfilling all the mandatory fields", function() {

        taskTemplatePage.goToDestination_DestType.click();
        helper.selectDropdownByNumber(taskTemplatePage.goToDestination_DestType, 1);
        taskTemplatePage.goToDestination_Destination.click();
        helper.selectDropdownByNumber(taskTemplatePage.goToDestination_Destination, 1);

        // expect (if highlights disappear);
        assert.eventually.notEqual(taskTemplatePage.goToDestination_DestType.getAttribute('class'), 'Select select-dropdown invalid Select--single has-value');

        taskTemplatePage.waitForDestination_Destination.click();        
        helper.selectDropdownByNumber(taskTemplatePage.waitForDestination_Destination, 1);
        // expect (if highlights disappear);
        assert.eventually.notEqual(taskTemplatePage.waitForDestination_Destination.getAttribute('class'), 'Select select-dropdown invalid Select--single is-searchable has-value');

        taskTemplatePage.waitForButtonPress_ButtonText.click();
        taskTemplatePage.waitForButtonPress_ButtonText.clear();
        taskTemplatePage.waitForButtonPress_ButtonText.sendKeys("Test button text");
        // expect (if highlights disappear);
        assert.eventually.notEqual(taskTemplatePage.waitForButtonPress_ButtonText.getAttribute('class'), 'any-input invalid');

        taskTemplatePage.waitAtDestination_Duration.isDisplayed().then(function(isVisible) {
            if (isVisible) {
                taskTemplatePage.waitAtDestination_Duration.click();

                for (i = 0; i <= 4; i++) {
                    taskTemplatePage.waitAtDestination_Duration_inc_min.click();
                }

                for (i = 0; i <= 10; i++) {
                    taskTemplatePage.waitAtDestination_Duration_inc_sec.click();
                }

                assert.eventually.notEqual(taskTemplatePage.waitAtDestination_Duration.getAttribute('class'), 'form-field-invalid');

            } else {
                console.log(" waitAtDestination_Duration element isVisible = " + isVisible + "\n");
                // element is not visible
            }
        });

        taskTemplatePage.ttSaveButton.click();

        // Is success created Toastr message is visible
        assert.eventually.isTrue(taskTemplatePage.successCreatedMsg.first().isDisplayed());
        assert.eventually.equal(taskTemplatePage.successCreatedMsg.getText(), 'Task Template has been successfully created');

    });

    //it(" If \"Make a Copy\" and \"Delete\" buttons are present after Save new TT", function(){});

    it("Is new Task Template item is visible into the TT list", function() {

        helper.getElementInTheList(taskTemplatePage.TTlist, gTTName)
             .then(function(result) {
                 // verify if TT list contain TT item with name = gTTName - global Task Template Name
                 // result[0] = ttListItemsTextArray, result[1] = isgTTNameIncluded
                 //assert.eventually.isTrue(result[1]);
                 expect(result[1]).toBe(true);
                 // verify if first item in TT list is opened - next verifying is strange!!!
                 assert.eventually.isTrue(taskTemplatePage.TTlist.get(result[0].indexOf(gTTName)).isDisplayed());
             });

    });

    //it(" Try to make a copy of new TT ", function(){});

    // it(" If buttons changed to Cancel/Save after editing TT ", function(){});

    // it(" Check if prevent lost data dialog is appeared ", function(){});

    it("Delete new created TT", function() {

        helper.getElementInTheList(taskTemplatePage.TTlist, gTTName)
             .then(function(result) {
                // result[0] = ttListItemsTextArray, result[1] = isgTTNameIncluded
                 if (result[1]) {
                         taskTemplatePage.TTlist.get(result[0].indexOf(gTTName)).click();
                     }
         });

        taskTemplatePage.ttDeleteButton.click();
        
        // 1-check is delete modal window appeared
        assert.eventually.isTrue(taskTemplatePage.deleteModal.isDisplayed());

        // 2-check is valid text 
        assert.eventually.equal(taskTemplatePage.deleteModalText.getText(), 'Do you really want to delete this Task Template?');

        // 3-check is "Cancel" and "Delete" buttons are exist
        assert.eventually.isTrue(taskTemplatePage.deleteModalCancelButton.isDisplayed());
        assert.eventually.isTrue(taskTemplatePage.deleteModalDeleteButton.isDisplayed());

        taskTemplatePage.deleteModalDeleteButton.click();
        mainPage.logout();
    });

    // it()
        // here we should check if there is no gTTName in the TT list

        // here we should check if the first TT item is selected

    // make a logout

});
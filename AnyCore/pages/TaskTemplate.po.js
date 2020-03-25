var TaskTemplate = function() {

	this.plusButtonAddNewTT = element(by.css('a.icon.action-plus'));
	this.taskTemplateNameField = element(by.css('.value-column.column .any-input'));
	this.taskTemplateTitle = element(by.css('.any-page-title-inner'));
	this.ttSaveButton = element(by.css('.any-save-button.any-button.blue.regular'));
	this.ttCancelButton = element(by.css('button.any-cancel-button.any-button.gray.regular'));
	this.buttonAddAnAction = element.all(by.css('.actions-icon.form-item-icon')).last();
	this.errorToastr = element(by.css('.toast.toast-error'));
	this.errorToastrTxt1 = "Please fill all the mandatory fields highlighted above and add at least one action to the Template";
	this.errorToastrTxt2 = "Please add at least one action to the Template";

	this.errorNameFieldOutline = element(by.css('.any-form .data-grid-row.space-between .value-column.column input[type="text"][class="any-input invalid"]'));
	this.ribbonWithActions = element(by.css('.active.actions-form'));
	this.ribbonDropDown = element(by.css('.actions-form-header .title .Select'));
	this.ribbonCloseButton = element.all(by.css('.action-remove.remove-button')).last();

	this.actionGoToDestination = element.all(by.css('.action.action-go-destination')).first();
	this.actionWaitForDestinationSelection = element.all(by.css('.action.action-wait-destination')).last();
	this.actionWaitForButtonPress = element.all(by.css('.action.action-wait-press')).last();
	this.actionWaitAtDestination = element.all(by.css('.action.action-wait-at-destination')).last();

	this.isGoToDestinationVisible = element.all(by.css('div.action.action-go-destination.details-open')).last();
	this.isWaitForDestinationSelectionVisible = element.all(by.css('div.action.action-wait-destination.details-open')).last();
	this.isWaitForButtonPressVisible = element.all(by.css('div.action.action-wait-press.details-open')).last();
	this.isWaitAtDestinationVisible = element.all(by.css('div.action.action-wait-at-destination.details-open')).last();

	this.goToDestination_DestType = element(by.css('.action.action-go-destination.details-open .destination-option-list-item .destination-option-col:first-child .Select'));
	this.goToDestination_Destination = element(by.css('.action.action-go-destination.details-open .destination-option-list-item .destination-option-col:last-child .Select'));
	this.waitForDestination_Destination = element(by.css('.action.action-wait-destination.details-open .destination-option-list-item .destination-option-col:last-child .Select'));
	this.waitForButtonPress_ButtonText = element(by.css('.action.action-wait-press.details-open .task-action-item-details .any-input'));
	this.waitAtDestination_Duration = $$('.action.action-wait-at-destination.details-open .task-action-item-details .duration-picker.rw-widget .duration-picker-row.grid-block');
	this.waitAtDestination_Duration_inc_min = $$('.action.action-wait-at-destination.details-open .task-action-item-details .duration-picker.rw-widget .minutes-picker button[title="increment value"]');
	// do not forget about decrement min value
	this.waitAtDestination_Duration_inc_sec = $$('.action.action-wait-at-destination.details-open .task-action-item-details .duration-picker.rw-widget .seconds-picker button[title="increment value"]');
	this.waitAtDestination_popup = $$('.mapp-hide-small .action.action-wait-at-destination.details-open .task-action-item-details .duration-picker.rw-widget .duration-picker-popup.rw-popup-container');
	// do not forget about decrement sec value
	this.successCreatedMsg = $$('.toast-bottom-right .toast.toast-success .toast-message');
	//this.successCreatedMsgTxt = "Task Template has been successfully created";
	this.TTlist = $$('ul.list-items li');
	this.ttDetailsButtons = $$('.task-create.grid-block.vertical .buttons button[class="gray"]').last();
	this.ttDeleteButton = element.all(by.buttonText("Delete")).last();
	this.deleteModal = $('.any-modal-container');
	this.deleteModalText = $('.any-modal-body');
	this.deleteModalCancelButton = $('.any-button.light-gray.regular');
	this.deleteModalDeleteButton = $('.any-button.blue.regular');
};

module.exports = new TaskTemplate();
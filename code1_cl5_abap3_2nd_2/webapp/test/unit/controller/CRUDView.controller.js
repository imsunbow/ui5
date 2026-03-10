/*global QUnit*/

sap.ui.define([
	"code1/cl5/abap3/code1cl5abap32nd2/controller/CRUDView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUDView Controller");

	QUnit.test("I should test the CRUDView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

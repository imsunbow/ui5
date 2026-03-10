/*global QUnit*/

sap.ui.define([
	"code1/cl5/abap3/second/code1cl5abap32nd/controller/CRUDView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUDView Controller");

	QUnit.test("I should test the CRUDView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

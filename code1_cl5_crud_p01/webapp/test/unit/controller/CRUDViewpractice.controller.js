/*global QUnit*/

sap.ui.define([
	"code1/cl5/gw0007/code1cl5crudp01/controller/CRUDViewpractice.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUDViewpractice Controller");

	QUnit.test("I should test the CRUDViewpractice controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

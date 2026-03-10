/*global QUnit*/

sap.ui.define([
	"code1/cl5/crud/p03/code1cl5crudp03/controller/CRUDViewpractice03.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUDViewpractice03 Controller");

	QUnit.test("I should test the CRUDViewpractice03 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

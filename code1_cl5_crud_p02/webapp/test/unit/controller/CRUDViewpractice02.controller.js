/*global QUnit*/

sap.ui.define([
	"code1/cl5/crud/p02/code1cl5crudp02/controller/CRUDViewpractice02.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUDViewpractice02 Controller");

	QUnit.test("I should test the CRUDViewpractice02 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

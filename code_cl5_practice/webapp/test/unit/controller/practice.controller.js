/*global QUnit*/

sap.ui.define([
	"code/cl5/practice/codecl5practice/controller/practice.controller"
], function (Controller) {
	"use strict";

	QUnit.module("practice Controller");

	QUnit.test("I should test the practice controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

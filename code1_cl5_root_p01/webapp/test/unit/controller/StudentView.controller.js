/*global QUnit*/

sap.ui.define([
	"code1/cl5/root/p01/code1cl5rootp01/controller/StudentView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("StudentView Controller");

	QUnit.test("I should test the StudentView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

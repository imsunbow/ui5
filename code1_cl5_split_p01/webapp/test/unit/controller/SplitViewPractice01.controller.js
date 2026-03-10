/*global QUnit*/

sap.ui.define([
	"code1/cl516/split01/code1cl5splitp01/controller/SplitViewPractice01.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SplitViewPractice01 Controller");

	QUnit.test("I should test the SplitViewPractice01 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

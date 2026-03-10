/*global QUnit*/

sap.ui.define([
	"code1/cl5/abap3/fst2/code1/cl5/abap31st2/controller/ChartView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ChartView Controller");

	QUnit.test("I should test the ChartView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

/*global QUnit*/

sap.ui.define([
	"code/cl5/srv02/codecl5srv02/controller/PriceView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PriceView Controller");

	QUnit.test("I should test the PriceView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

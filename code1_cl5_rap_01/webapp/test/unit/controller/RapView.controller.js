/*global QUnit*/

sap.ui.define([
	"code1cl5rap01/controller/RapView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("RapView Controller");

	QUnit.test("I should test the RapView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

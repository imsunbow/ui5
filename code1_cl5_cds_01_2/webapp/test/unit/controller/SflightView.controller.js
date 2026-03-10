/*global QUnit*/

sap.ui.define([
	"code1cl5cds02/code1cl5cds012/controller/SflightView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SflightView Controller");

	QUnit.test("I should test the SflightView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

/*global QUnit*/

sap.ui.define([
	"code1/cl5/gw01/code1cl5gw01/controller/GridView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("GridView Controller");

	QUnit.test("I should test the GridView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

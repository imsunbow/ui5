/*global QUnit*/

sap.ui.define([
	"code1/cl516/abap3/p1/code1cl5abap31st/controller/SearchView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SearchView Controller");

	QUnit.test("I should test the SearchView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

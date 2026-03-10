/*global QUnit*/

sap.ui.define([
	"code1/cl5/rap04/code1cl5rap04/controller/CrudView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CrudView Controller");

	QUnit.test("I should test the CrudView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

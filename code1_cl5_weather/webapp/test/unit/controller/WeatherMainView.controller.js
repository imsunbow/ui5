/*global QUnit*/

sap.ui.define([
	"code1/cl5/weather/code1cl5weather/controller/WeatherMainView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("WeatherMainView Controller");

	QUnit.test("I should test the WeatherMainView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

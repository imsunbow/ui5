sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code1.cl5.param.route01.code1cl5paramroute01.controller.MainView", {
        onInit() 
        {
            
        },

        onSearch: function()
        {            
            var vCarrid = this.getView().byId("airLine").getValue(),
                vConnid = this.getView().byId("connNo").getValue();
            
            this.getRouter().navTo("GridView", {Carrid: vCarrid, Connid: vConnid});  // Call function and nav to GridView with parameter

        },

        getRouter: function () 
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }

    });
});
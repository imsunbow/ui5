sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.param.route01.code1cl5paramroute01.controller.GridView", {
        onInit() 
        {
            this.getRouter().getRoute("GridView").attachPatternMatched(this.onSearch.bind(this), this);
        },

        onMain: function()
        {
            this.getRouter().navTo("RouteMainView");  // Call function and nav to 
        },

        onSearch: function(oEvent)
        {           
            var vCarrid = oEvent.getParameter("arguments").Carrid,
                vConnid = oEvent.getParameter("arguments").Connid;
                
            let oBinding = this.getView().byId("gridSchedule").getBinding("rows"), // bring rows data with id = "gridSchedule"
                aFilter = [];
 
            if(vCarrid)
                aFilter.push(new Filter("Carrid", FilterOperator.EQ, vCarrid));

            if(vConnid)
                aFilter.push(new Filter("Connid", FilterOperator.EQ, vConnid));

            oBinding.filter(aFilter);

        },

        //get Router Info
        getRouter: function () 
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }

    });
});
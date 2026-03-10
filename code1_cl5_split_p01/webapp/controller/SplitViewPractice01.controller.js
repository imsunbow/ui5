sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
], (Controller, FilterOperator, Filter) => {
    "use strict";

    return Controller.extend("code1.cl516.split01.code1cl5splitp01.controller.SplitViewPractice01", {
        onInit() 
        {

        },

        onBseg: function(oEvent)
        {
            const oView = this.getView();

            let oData        = oEvent.getParameter("rowBindingContext").getObject();
            let oBindingBseg = oView.byId("Bseg").getBinding("rows");
            let aFilter      = [];
            const vBelnr       = String(oData.Belnr).padStart(10, "0");

            aFilter.push(new Filter("Bukrs", FilterOperator.EQ, oData.Bukrs));
            aFilter.push(new Filter("Belnr", FilterOperator.EQ, vBelnr));
            aFilter.push(new Filter("Gjahr", FilterOperator.EQ, oData.Gjahr));

            oBindingBseg.filter(aFilter);

        }

    });
});
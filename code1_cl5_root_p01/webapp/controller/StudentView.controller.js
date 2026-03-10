sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.root.p01.code1cl5rootp01.controller.StudentView", {
        onInit() 
        {

        },

        onSearch: function()
        {
            const vClass = this.getView().byId("iClass").getValue().toUpperCase();
            const vClnum = this.getView().byId("iClnum").getValue();    

            let oBinding = this.getView().byId("StudentList").getBinding();
            let oFilter = null;
            let aFilter = [];

            if (vClass != "") 
            {
                oFilter = new Filter("Class", FilterOperator.EQ, vClass); 
                aFilter.push(oFilter);
            }

            if (vClnum != "") 
            {
               oFilter = new Filter("ClNum", FilterOperator.EQ, vClnum); 
               aFilter.push(oFilter);
            }

            oBinding.filter(aFilter);
        }

    });
});
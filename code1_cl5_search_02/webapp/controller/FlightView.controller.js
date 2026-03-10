sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.search02.code1cl5search02.controller.FlightView", {
        onInit() 
        {

        },

        onSearch: function()
        {
            var vCarrid = this.getView().byId("iCarrid").getValue().toUpperCase(),
                vConnid = this.getView().byId("iConnid").getValue().toUpperCase(),
                vFldate = this.getView().byId("iFldate").getValue().replaceAll('-',"");

            let oBinding = this.getView().byId("FlightList").getBinding("rows"),
                oFilter = null,
                aFilter = [];

          if (vCarrid != "") {
            oFilter = new Filter("Carrid", FilterOperator.StartsWith, vCarrid); // 시작문자 할당
            aFilter.push(oFilter);
          }

          if (vConnid != "") {
            oFilter = new Filter("Connid", FilterOperator.EQ, vConnid);
            aFilter.push(oFilter);
          }

          if (vFldate != "") {
            oFilter = new Filter("Fldate", FilterOperator.EQ, vFldate);
            aFilter.push(oFilter);
          }

          oBinding.filter(aFilter);
        }
    });
});
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl5.search01.code1cl5search01.controller.ScarrView",
      {
        onInit() {},

        onSearch: function () {
          var vCarrid = this.getView().byId("iCarrid").getValue().toUpperCase(),
              vCurrcode = this.getView().byId("iCurrcode").getValue().toUpperCase();
              
          // 필요한 객체 선언
          let oBinding = this.getView().byId("AirlineList").getBinding("rows"),
            oFilter = null,
            aFilter = [];

          if (vCarrid != "") {
            oFilter = new Filter("Carrid", FilterOperator.EQ, vCarrid);
            aFilter.push(oFilter);
          }

          if (vCurrcode != "") {
            oFilter = new Filter("Currcode", FilterOperator.EQ, vCurrcode);
            aFilter.push(oFilter);
          }

          oBinding.filter(aFilter);
        },
      },
    );
  },
);

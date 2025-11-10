sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"    
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";
    return Controller.extend("code1.cl5.searchfield01.code1cl5searchfield01.controller.SearchView", {
        onInit() 
        {
            let oModel = new JSONModel("/data/val.json");
           
            this.getView().setModel(oModel, "val");

        },

        onSearch: function()
        {
            // define variables, objects and empty array 

            var vCarrid  = this.getView().byId("carrid").getValue(),
                vCurr = this.getView().byId("currency").getValue();
                     
            let oBinding = this.getView().byId("airLineList").getBinding("rows"), // get dataset from table
                
                oFilterCarrid = null,
                oFilterCurr = null,

                aFilter = [];


            // sol1 ) push if filter works 

            if (vCarrid != "")  // if input data is not empty
            {
                oFilterCarrid = new Filter("Carrid", FilterOperator.EQ, vCarrid); // check filter condition
                aFilter.push(oFilterCarrid); // push to the empty array we've already defined
            };

            if (vCurr != "") // if input data is not empty
            {
                oFilterCurr = new Filter("Currency", FilterOperator.EQ, vCurr); // check filter condition
                aFilter.push(oFilterCurr);
            };

            oBinding.filter(aFilter);

            // sol2 ) if-else statement

            // if (!vCarrid && !vCurr) 
            // {
            // oBinding.filter(); // show all data 
            // }

            // else if (vCarrid && vCurr) 
            // {
            // oBinding.filter(oFilterCarrid, oFilterCurr); // show filtered vCarrid and vCurr data
            // }

            // else if (vCarrid) 
            // {
            // oBinding.filter(oFilterCarrid); // show filtered vCarrid data
            // }

            // else 
            // {
            // oBinding.filter(oFilterCurr); // show filtered vCurr data
            // }
                                        
        },

        onButtonClick: function()
        {
            var vInput = this.getView().byId("Word").getValue();

            console.log(vInput);
        }

        
            

    });
});

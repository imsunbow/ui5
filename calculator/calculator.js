sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code1.cl5.calculator.code1cl5calculator.controller.CalView", {
        onInit() 
        {

        },

        onSet: function(pVal)
        {
        
            // add pVal into empty string 
            var vCalc = this.getView().byId("numInput").getValue(),
                vRes = "";

            // switch - case statement(default: all button except '=')
            switch (pVal) 
            {
                case "=":
                    vRes = eval(vCalc);
                    break;

                default:
                    vRes = vCalc + pVal;
                    break;

                // error handling (try - catch)
                // default:
                //     try 
                //     {
                //         vRes = vCalc + pVal;
                //     }
                //     catch(e)
                //     {
                //         alert("입력 오류");
                //         vRes = vCalc;
                //     }
                //     break;
                    
                  
            }

            this.getView().byId("numInput").setValue(vRes);

        },

        clearValue: function()
        {
            this.getView().byId("numInput").setValue("");
        }


    });
});

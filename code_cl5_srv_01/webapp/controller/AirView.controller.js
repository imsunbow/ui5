sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code1.cl5.srv01.codecl5srv01.controller.AirView", {
        onInit() 
        {   
            // get model(nothing inside) means that we bring model from root 
            // getModel ("room number") if we've got to bring another model from other room 
            let oModel = this.getOwnerComponent().getModel();

            console.log(oModel.aBindings);

            for(var i in oModel.aBindings)
            {
                console.log(i);
            }


        }
    });
});
sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend(
    "code1.cl5.cds01.code1cl5cds011.controller.SpfliView",
    {
      onInit() {
        // gateway Client가 서비스 부르는 경로
        let oModel = new sap.ui.model.odata.v2.ODataModel(
          "/sap/opu/odata/sap/ZC531CDS0012_CDS/",
        );

        this.getView().setModel(oModel, "Scarr");
      },
    },
  );
});

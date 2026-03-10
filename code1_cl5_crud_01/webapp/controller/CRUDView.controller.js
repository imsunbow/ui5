sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageToast"
], (Controller, FilterOperator, Filter, MessageToast) => {
    "use strict";

    return Controller.extend("code1.cl516.gw0005.code1cl5crud01.controller.CRUDView", {
        onInit() {

        },

        onSearch: function()
        {
            var vWerks = this.getView().byId("IWerks").getValue(),
                vMatnr = this.getView().byId("IMatnr").getValue().toUpperCase(), // convert to Uppercase
                vMtart = this.getView().byId("IMtart").getValue().toUpperCase(); // convert to Uppercase

            let oBinding = this.getView().byId("matList").getBinding("rows"),
                oFilter = null, 
                aFilter = [];
                
            if (vWerks != '')
            {
                oFilter = new Filter("Werks", FilterOperator.EQ, vWerks);
                aFilter.push(oFilter);
                // aFilter.push(oFilter = new Filter("Werks", FilterOperator.EQ, vWerks)); 이렇게도 사용 가능.
            }

            if (vMatnr != '')
            {
                oFilter = new Filter("Matnr", FilterOperator.EQ, vMatnr);
                aFilter.push(oFilter);
            }

            if (vMtart != '')
            {
                oFilter = new Filter("Mtart", FilterOperator.EQ, vMtart);
                aFilter.push(oFilter);
            }

            oBinding.filter(aFilter); 
        },

        onDisplay: function()
        {   
            let oTable =  this.getView().byId("matList"),
                aIndex = oTable.getSelectedIndices(), // get Index of Array (format : Array)
                // read table <=> get context by index
                oData = oTable.getContextByIndex(aIndex[0]).getObject();
                
                // console.log(oData.Matnr + "," +oData.Werks + "," + oData.Lgort + "," + oData.Bwart + "," + oData.Mtart );
                
                // 값 할당
                this.getView().byId('Werks').setValue(oData.Werks);
                this.getView().byId('Matnr').setValue(oData.Matnr);
                this.getView().byId('Lgort').setValue(oData.Lgort);
                this.getView().byId('Bwart').setValue(oData.Bwart);
                this.getView().byId('Mtart').setValue(oData.Mtart);
                this.getView().byId('Matkl').setValue(oData.Matkl);
                this.getView().byId('Dispo').setValue(oData.Dispo);
                
        },

        onClear: function()
        {

            this.getView().byId('Werks').setValue();
            this.getView().byId('Matnr').setValue();
            this.getView().byId('Lgort').setValue();
            this.getView().byId('Bwart').setValue();
            this.getView().byId('Mtart').setValue();
            this.getView().byId('Matkl').setValue();
            this.getView().byId('Dispo').setValue();
                
        },

        onRead: function()
        {
            let oTable =  this.getView().byId("matList"),
                aIndex = oTable.getSelectedIndices(), // get Index of Array (format : Array)
                // read table <=> get context by index
                oData = oTable.getContextByIndex(aIndex[0]).getObject(),
                oModel = this.getView().getModel();

            oModel.read("/MatSet(Matnr='" + oData.Matnr + "',Werks='" + oData.Werks+"')",
            {

                // sol1) bind view which exists outside
                success: function(oReturn)
                {                    
                    this.getView().byId('Werks').setValue(oReturn.Werks);
                    this.getView().byId('Matnr').setValue(oReturn.Matnr);
                    this.getView().byId('Lgort').setValue(oReturn.Lgort);
                    this.getView().byId('Bwart').setValue(oReturn.Bwart);
                    this.getView().byId('Mtart').setValue(oReturn.Mtart);
                    this.getView().byId('Matkl').setValue(oReturn.Matkl);
                    this.getView().byId('Dispo').setValue(oReturn.Dispo);

                }.bind(this),

                // sol2) define view and call
                // success: function(oReturn)
                // {                    
                //     oView.byId('Werks').setValue(oReturn.Werks);
                //     oView.byId('Matnr').setValue(oReturn.Matnr);
                //     oView.byId('Lgort').setValue(oReturn.Lgort);
                //     oView.byId('Bwart').setValue(oReturn.Bwart);
                //     oView.byId('Mtart').setValue(oReturn.Mtart);
                //     oView.byId('Matkl').setValue(oReturn.Matkl);
                //     oView.byId('Dispo').setValue(oReturn.Dispo);
                // },

                error: function()
                {
  
                }

            }

            );
        },

        onCreate: function()
        {
            let oModel = this.getView().getModel(),
                oView  = this.getView(),

                oData  = 
                {
                    Matnr: oView.byId("Matnr").getValue(),
                    Werks: oView.byId("Werks").getValue(),
                    Lgort: oView.byId("Lgort").getValue(),
                    Mtart: oView.byId("Mtart").getValue(),
                    Bwart: oView.byId("Bwart").getValue(),
                    Matkl: oView.byId("Matkl").getValue(),
                    Dispo: oView.byId("Dispo").getValue(),  
                };

            oModel.create("/MatSet", oData,
            {
                success: function(oReturn)
                {
                    // Function Mapping인 경우 자동으로 값 들어오는데 반해 create_entity 메소드에 직접 로직 구성한 경우는 er_entity 파라미터에 
                    // 값 할당해야 들어옴.
                    oModel.refresh();
                    MessageToast.show("Create Success : " + oReturn.Matnr); 
                },

                error: function()
                {
                    MessageToast.show("Create Fail");
                }
            }

            )
        },

        onUpdate: function()
        {
            let oView = this.getView(),
                oModel = oView.getModel();

            var vMatnr = oView.byId("Matnr").getValue(),    
                vWerks = oView.byId("Werks").getValue();

            let oData = 
            {
                Lgort: oView.byId("Lgort").getValue(),
                Bwart: oView.byId("Bwart").getValue(),
                Mtart: oView.byId("Mtart").getValue(),
                Matkl: oView.byId("Matkl").getValue(),
                Dispo: oView.byId("Dispo").getValue(),
            };

            oModel.update("/MatSet(Matnr='" + vMatnr + "',Werks='" + vWerks+"')",

                oData,
                {
                    success: function()
                    {
                        oModel.refresh();
                        MessageToast.show("Update Success");

                    },

                    error: function()
                    {
                        MessageToast.show("Update Fail");
                    }
                }

            );

        },

        onDelete: function()
        {

            let oTable = this.getView().byId("matList"),
                aIndex = oTable.getSelectedIndices(), 
                oData  = oTable.getContextByIndex(aIndex[0]).getObject(),
                oModel = this.getView().getModel();

            if (aIndex.length < 1)
            {
                MessageToast.show("삭제할 행 선택");
                return;
            }

            oModel.remove("/MatSet(Matnr='" + oData.Matnr + "',Werks='" + oData.Werks+"')",
            {
                success: function()
                {
                    oModel.refresh();
                    MessageToast.show("Delete Success");
                },

                error: function()
                {
                    MessageToast.show("Delele Fail");
                }

            }
 
    )}

    });
});         
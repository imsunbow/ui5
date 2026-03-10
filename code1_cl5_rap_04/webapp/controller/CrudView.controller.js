sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageToast"
], (Controller, FilterOperator, Filter, MessageToast) => {
    "use strict";

    return Controller.extend("code1.cl5.rap04.code1cl5rap04.controller.CrudView", {
        onInit() 
        {

        },

        onSearch: function()
        {
            let oView   = this.getView(),
                oFilter = null,
                aFilter = [],
                oBinding = oView.byId("MatList").getBinding("rows");

            var vSteel = oView.byId("ISteel").getValue().toUpperCase(),
                vWerks = oView.byId("IWerks").getValue();

            if (vSteel != '')
            {
                aFilter.push(oFilter = new Filter("Steel", FilterOperator.EQ, vSteel));
            }

            if (vWerks != '')
            {
                aFilter.push(oFilter = new Filter("Werks", FilterOperator.EQ, vWerks));
            }

            oBinding.filter(aFilter); 

        },

        onClear: function()
        {
            this.getView().byId('Steel').setValue();
            this.getView().byId('Werks').setValue();
            this.getView().byId('Lgort').setValue();
            this.getView().byId('IndustryKind').setValue();
            this.getView().byId('Vkorg').setValue('0');
            this.getView().byId('Vtweg').setValue(); // initialize Quantity field to '0'
            this.getView().byId('GrQty').setValue('0'); // initialize Amount field to '0'
            this.getView().byId('Netpr').setValue();
        },

        onDisplay: function()
        {
            let oTable =  this.getView().byId("MatList"),
                aIndex = oTable.getSelectedIndices(),
                oView  = this.getView(),
                oData =  oTable.getContextByIndex(aIndex[0]).getObject();

                oView.byId('Steel').setValue(oData.Steel);
                oView.byId('Werks').setValue(oData.Werks);
                oView.byId('Lgort').setValue(oData.Lgort);
                oView.byId('IndustryKind').setValue(oData.IndustryKind);
                oView.byId('Vkorg').setValue(oData.Vkorg);
                oView.byId('Vtweg').setValue(oData.Vtweg);
                oView.byId('GrQty').setValue(oData.GrQty);
                oView.byId('Netpr').setValue(oData.Netpr);
        },

        onRead: function()
        {
            let oTable =  this.getView().byId("MatList"),
                aIndex = oTable.getSelectedIndices(),
                oView  = this.getView(),
                oData =  oTable.getContextByIndex(aIndex[0]).getObject(),
                oModel = this.getView().getModel();

            oModel.read("/MatSet(Steel='" + oData.Steel + "',Werks='" + oData.Werks+"')",
            {

                success: function(oReturn)
                {
                    oView.byId('Steel').setValue(oReturn.Steel);
                    oView.byId('Werks').setValue(oReturn.Werks);
                    oView.byId('Lgort').setValue(oReturn.Lgort);
                    oView.byId('IndustryKind').setValue(oReturn.IndustryKind);
                    oView.byId('Vkorg').setValue(oReturn.Vkorg);
                    oView.byId('Vtweg').setValue(oReturn.Vtweg);
                    oView.byId('GrQty').setValue(oReturn.GrQty);
                    oView.byId('Netpr').setValue(oReturn.Netpr);
                },

                error: function()
                {

                }

            })
        },

        onCreate: function()
        {
            var vSteel = this.getView().byId("Steel").getValue(),
                vWerks = this.getView().byId("Werks").getValue();

            let oModel = this.getView().getModel(),
                oView  = this.getView(),

            oData = 
                {
                    Steel: oView.byId("Steel").getValue(),
                    Werks: oView.byId("Werks").getValue(),
                    Lgort: oView.byId("Lgort").getValue(),
                    IndustryKind: oView.byId("IndustryKind").getValue(),
                    Vkorg: oView.byId("Vkorg").getValue() || "0",
                    Vtweg: oView.byId("Vtweg").getValue(),
                    GrQty: oView.byId("GrQty").getValue() || "0",
                    Netpr: oView.byId("Netpr").getValue()
                };


            if ( !vSteel || !vWerks ) 
            {
                MessageToast.show("You've got to fill out PK field");
                return;
            }

            
            oModel.create("/MatSet", oData,

                {
                    success: function()
                    {
                        oModel.refresh();
                        MessageToast.show("Create Success");
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
        
            let oView = this.getView();

            var vSteel = oView.byId("Steel").getValue(),
                vWerks = oView.byId("Werks").getValue();

            let oModel = oView.getModel(),
                oData = 
                {
                    Lgort: oView.byId("Lgort").getValue(),
                    IndustryKind: oView.byId("IndustryKind").getValue(),
                    Vkorg: oView.byId("Vkorg").getValue(),
                    Vtweg: oView.byId("Vtweg").getValue(),
                    GrQty: oView.byId("GrQty").getValue(),
                    Netpr: oView.byId("Netpr").getValue()
                };

                oModel.update("/MatSet(Steel='" + vSteel + "',Werks='" + vWerks+"')",

                    oData,
                    {
                        success: function()
                        {
                            oModel.refresh();
                            MessageToast.show("update success");
                        },

                        error: function()
                        {
                            MessageToast.show("update fail");
                        }

                    }

                );
                        
        },

        onDelete: function()
        {
            let oTable = this.getView().byId("MatList"),
                aIndex = oTable.getSelectedIndices(), 
                oData  = oTable.getContextByIndex(aIndex[0]).getObject(),
                oModel = this.getView().getModel();

            if (aIndex.length < 1)
            {
                MessageToast.show("Select a Row.");
                return;
            }

            oModel.remove("/MatSet(Steel='" + oData.Steel + "',Werks='" + oData.Werks+"')",
            {
                success: function()
                {
                    oModel.refresh();
                    MessageToast.show("Delete Success");
                },

                error: function()
                {
                    MessageToast.show("Delete Fail");
                }

            }
            )
        }

    });
});
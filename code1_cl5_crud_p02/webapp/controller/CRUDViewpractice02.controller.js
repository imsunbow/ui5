sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageToast"
], (Controller, FilterOperator, Filter, MessageToast) => {
    "use strict";

    return Controller.extend("code1.cl5.crud.p02.code1cl5crudp02.controller.CRUDViewpractice02", {
        onInit() {
        },

        onSearch: function()
        {
            let oView   = this.getView(),
                oFilter = null,
                aFilter = [],
                oBinding = oView.byId("matList").getBinding("rows");

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
            this.getView().byId('IndustryKind').setValue();
            this.getView().byId('Area').setValue();
            this.getView().byId('Menge').setValue('0'); // initialize Quantity field to '0'
            this.getView().byId('Meins').setValue();
            this.getView().byId('Dmbtr').setValue('0'); // initialize Amount field to '0'
            this.getView().byId('Waers').setValue();
        },

        onDisplay: function()
        {
            let oTable =  this.getView().byId("matList"),
                aIndex = oTable.getSelectedIndices(),
                oView  = this.getView(),
                oData =  oTable.getContextByIndex(aIndex[0]).getObject();

                oView.byId('Steel').setValue(oData.Steel);
                oView.byId('Werks').setValue(oData.Werks);
                oView.byId('IndustryKind').setValue(oData.IndustryKind);
                oView.byId('Area').setValue(oData.Area);
                oView.byId('Menge').setValue(oData.Menge);
                oView.byId('Meins').setValue(oData.Meins);
                oView.byId('Dmbtr').setValue(oData.Dmbtr);
                oView.byId('Waers').setValue(oData.Waers);
        },

        onRead: function()
        {
            let oTable =  this.getView().byId("matList"),
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
                    oView.byId('IndustryKind').setValue(oReturn.IndustryKind);
                    oView.byId('Area').setValue(oReturn.Area);
                    oView.byId('Menge').setValue(oReturn.Menge);
                    oView.byId('Meins').setValue(oReturn.Meins);
                    oView.byId('Dmbtr').setValue(oReturn.Dmbtr);
                    oView.byId('Waers').setValue(oReturn.Waers);
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
                    IndustryKind: oView.byId("IndustryKind").getValue(),
                    Area: oView.byId("Area").getValue(),
                    Menge: oView.byId("Menge").getValue() || "0",
                    Meins: oView.byId("Meins").getValue(),
                    Dmbtr: oView.byId("Dmbtr").getValue() || "0",
                    Waers: oView.byId("Waers").getValue()
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
                    IndustryKind: oView.byId("IndustryKind").getValue(),
                    Area:  oView.byId("Area").getValue(),
                    Menge: oView.byId("Menge").getValue(),
                    Meins: oView.byId("Meins").getValue(),
                    Dmbtr: oView.byId("Dmbtr").getValue(),
                    Waers: oView.byId("Waers").getValue()
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
            let oTable = this.getView().byId("matList"),
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
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageToast"
], (Controller, FilterOperator, Filter, MessageToast) => {
    "use strict";

    return Controller.extend("code1.cl5.abap3.second.code1cl5abap32nd.controller.CRUDView", {
        onInit() {
        },

        // 검색 기능 조회
        onSearch: function()
        {
            let oView   = this.getView(),
                oFilter = null,
                aFilter = [],
                // 테이블의 행 바인딩 정보를 가져오기
                oBinding = oView.byId("shipList").getBinding("rows");
            
            // 입력필드에서 값 조회
            var vTknum = oView.byId("ITknum").getValue().toUpperCase(); // 대문자화

            // Tknum 입력값이 있다면 필터링
            if (vTknum != '')
            {
                aFilter.push(oFilter = new Filter("Tknum", FilterOperator.EQ, vTknum));
            }

            // 바인딩된 데이터에 필터 적용
            oBinding.filter(aFilter); 

        },

        // 입력 필드 초기화용 function
        onClear: function()
        {
            // 입력된 값을 빈값으로 변경
            this.getView().byId('Tknum').setValue();
            this.getView().byId('Tpnum').setValue();
            this.getView().byId('Vbeln').setValue();
            this.getView().byId('Vbtyp').setValue();
            this.getView().byId('Shtyp').setValue();
            this.getView().byId('Signi').setValue();
            this.getView().byId('Tprfo').setValue();
            this.getView().byId('Smeng').setValue();
            this.getView().byId('Meins').setValue();
            this.getView().byId('Netwr').setValue();
            this.getView().byId('Waerk').setValue();
        },

        // 선택한 행의 데이터를 입력 폼에 표시하는 function
        onDisplay: function()
        {
            let oTable =  this.getView().byId("shipList"),
                aIndex = oTable.getSelectedIndices(), // 선택된 행의 인덱스 배열
                oView  = this.getView(),

                // 선택된 첫번째 행[0번 인덱스]의 데이터 객체 가져오기
                oData =  oTable.getContextByIndex(aIndex[0]).getObject();

                // 각 입력필드에 데이터 세팅
                oView.byId('Tknum').setValue(oData.Tknum);
                oView.byId('Tpnum').setValue(oData.Tpnum);
                oView.byId('Vbeln').setValue(oData.Vbeln);
                oView.byId('Vbtyp').setValue(oData.Vbtyp);
                oView.byId('Shtyp').setValue(oData.Shtyp);
                oView.byId('Signi').setValue(oData.Signi);
                oView.byId('Tprfo').setValue(oData.Tprfo);
                oView.byId('Smeng').setValue(oData.Smeng);
                oView.byId('Meins').setValue(oData.Meins);
                oView.byId('Netwr').setValue(oData.Netwr);
                oView.byId('Waerk').setValue(oData.Waerk);
        },

        // 상세조회 : key값을 기반으로 서버에서 직접 최신 데이터를 한 건 읽어오기 위한 function
        onRead: function()
        {
            let oTable =  this.getView().byId("shipList"),
                aIndex = oTable.getSelectedIndices(),
                oView  = this.getView(),

                // 선택된 첫번째 행[0번 인덱스]의 데이터 객체 가져오기
                oData =  oTable.getContextByIndex(aIndex[0]).getObject(),
                oModel = this.getView().getModel();
            
            // OData Entity 경로 생성: /MatSet(Tknum='값',Tpnum='값')
            oModel.read("/ShipSet(Tknum='" + oData.Tknum + "',Tpnum='" + oData.Tpnum+"')",
            {

                // 서버에서 반환된 최신 데이터를 세팅
                success: function(oReturn)
                {
                    oView.byId('Tknum').setValue(oReturn.Tknum);
                    oView.byId('Tpnum').setValue(oReturn.Tpnum);
                    oView.byId('Vbeln').setValue(oReturn.Vbeln);
                    oView.byId('Vbtyp').setValue(oReturn.Vbtyp);
                    oView.byId('Shtyp').setValue(oReturn.Shtyp);
                    oView.byId('Signi').setValue(oReturn.Signi);
                    oView.byId('Tprfo').setValue(oReturn.Tprfo);
                    oView.byId('Smeng').setValue(oReturn.Smeng);
                    oView.byId('Meins').setValue(oReturn.Meins);
                    oView.byId('Netwr').setValue(oReturn.Netwr);
                    oView.byId('Waerk').setValue(oReturn.Waerk);
                },

                error: function()
                {
                    
                }

            })
        },

        // 새로운 데이터 생성
        onCreate: function()
        {

            // 사용자가 입력한 Matnr, Auart 값을 변수에 저장
            var vTknum = this.getView().byId("Tknum").getValue(),
                vTpnum = this.getView().byId("Tpnum").getValue();

            let oModel = this.getView().getModel(),
                oView  = this.getView(),

                // 서버로 보낼 json 데이터 생성
                oData = 
                {
                    Tknum : oView.byId('Tknum').getValue(),
                    Tpnum : oView.byId('Tpnum').getValue(),
                    Vbeln : oView.byId('Vbeln').getValue(),
                    Vbtyp : oView.byId('Vbtyp').getValue(),
                    Shtyp : oView.byId('Shtyp').getValue(),
                    Signi : oView.byId('Signi').getValue(),
                    Tprfo : oView.byId('Tprfo').getValue(),
                    Smeng : oView.byId('Smeng').getValue() || "0",
                    Meins : oView.byId('Meins').getValue(),
                    Netwr : oView.byId('Netwr').getValue() || "0",
                    Waerk : oView.byId('Waerk').getValue()
                };
            
            // pk값 미입력시 메세지 출력 후 return
            if ( !vTknum || !vTpnum ) 
            {
                MessageToast.show("You've got to fill out PK field");
                return;
            }

            // oData Create 요청(POST)
            oModel.create("/ShipSet", oData,

                {
                    success: function()
                    {
                        oModel.refresh(); // 테이블 갱신
                        MessageToast.show("Create Success");
                    },
                    
                    error: function()
                    {
                        MessageToast.show("Create Fail");
                    }

                }
            )
        },

    });
});
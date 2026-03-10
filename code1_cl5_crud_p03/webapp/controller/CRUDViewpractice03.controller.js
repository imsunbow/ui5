sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageToast"
], (Controller,  FilterOperator, Filter, MessageToast) => {
    "use strict";

    return Controller.extend("code1.cl5.crud.p03.code1cl5crudp03.controller.CRUDViewpractice03", {
        // 화면 초기화
        onInit() {
        },

        // 검색 기능 조회
        onSearch: function()
        {
            let oView   = this.getView(),
                oFilter = null,
                aFilter = [],
                // 테이블의 행 바인딩 정보를 가져오기
                oBinding = oView.byId("matList").getBinding("rows");
            
            // 입력필드에서 값 조회
            var vMatnr = oView.byId("IMatnr").getValue().toUpperCase(), // 대문자화
                vAuart = oView.byId("IAuart").getValue();

            // Matnr 입력값이 있다면 필터링
            if (vMatnr != '')
            {
                aFilter.push(oFilter = new Filter("Matnr", FilterOperator.EQ, vMatnr));
            }

            // Auart 입력값이 있다면 필터링 
            if (vAuart != '')
            {
                aFilter.push(oFilter = new Filter("Auart", FilterOperator.EQ, vAuart));
            }

            // 바인딩된 데이터에 필터 적용
            oBinding.filter(aFilter); 

        },

        // 입력 필드 초기화용 function
        onClear: function()
        {
            // 입력된 값을 빈값으로 변경
            this.getView().byId('Matnr').setValue();
            this.getView().byId('Auart').setValue();
            this.getView().byId('Vkorg').setValue();
            this.getView().byId('Spart').setValue();
        },

        // 선택한 행의 데이터를 입력 폼에 표시하는 function
        onDisplay: function()
        {
            let oTable =  this.getView().byId("matList"),
                aIndex = oTable.getSelectedIndices(), // 선택된 행의 인덱스 배열
                oView  = this.getView(),

                // 선택된 첫번째 행[0번 인덱스]의 데이터 객체 가져오기
                oData =  oTable.getContextByIndex(aIndex[0]).getObject();

                // 각 입력필드에 데이터 세팅
                oView.byId('Matnr').setValue(oData.Matnr);
                oView.byId('Auart').setValue(oData.Auart);
                oView.byId('Vkorg').setValue(oData.Vkorg);
                oView.byId('Spart').setValue(oData.Spart);
        },

        // 상세조회 : key값을 기반으로 서버에서 직접 최신 데이터를 한 건 읽어오기 위한 function
        onRead: function()
        {
            let oTable =  this.getView().byId("matList"),
                aIndex = oTable.getSelectedIndices(),
                oView  = this.getView(),

                // 선택된 첫번째 행[0번 인덱스]의 데이터 객체 가져오기
                oData =  oTable.getContextByIndex(aIndex[0]).getObject(),
                oModel = this.getView().getModel();
            
            // OData Entity 경로 생성: /MatSet(Matnr='값',Auart='값')
            oModel.read("/MatSet(Matnr='" + oData.Matnr + "',Auart='" + oData.Auart+"')",
            {

                // 서버에서 반환된 최신 데이터를 세팅
                success: function(oReturn)
                {
                    oView.byId('Matnr').setValue(oReturn.Matnr);
                    oView.byId('Auart').setValue(oReturn.Auart);
                    oView.byId('Vkorg').setValue(oReturn.Vkorg);
                    oView.byId('Spart').setValue(oReturn.Spart);
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
            var vMatnr = this.getView().byId("Matnr").getValue(),
                vAuart = this.getView().byId("Auart").getValue();

            let oModel = this.getView().getModel(),
                oView  = this.getView(),

                // 서버로 보낼 json 데이터 생성
                oData = 
                {
                    Matnr: oView.byId("Matnr").getValue(),
                    Auart: oView.byId("Auart").getValue(),
                    Vkorg: oView.byId("Vkorg").getValue(),
                    Spart: oView.byId("Spart").getValue(),
                };
            
            // pk값 미입력시 메세지 출력 후 return
            if ( !vMatnr || !vAuart ) 
            {
                MessageToast.show("You've got to fill out PK field");
                return;
            }

            // oData Create 요청(POST)
            oModel.create("/MatSet", oData,

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

        // 기존 데이터 수정을 위한 function
        onUpdate: function()
        {
        
            let oView = this.getView();

            // 사용자가 입력한 Matnr, Auart값을 받아서 변수형태로 저장
            var vMatnr = oView.byId("Matnr").getValue(),
                vAuart = oView.byId("Auart").getValue();

            let oModel = oView.getModel(),
                
                // 수정될 필드들(PK는 수정하지 않음.)
                oData = 
                {
                    Vkorg: oView.byId("Vkorg").getValue(),
                    Spart: oView.byId("Spart").getValue(),
                };

                // OData 업데이트 요청 (PUT/MERGE)
                oModel.update("/MatSet(Matnr='" + vMatnr + "',Auart='" + vAuart+"')",

                    oData,
                    {
                        success: function()
                        {
                            oModel.refresh(); // 화면 갱신
                            MessageToast.show("update success");
                        },

                        error: function()
                        {
                            MessageToast.show("update fail");
                        }

                    }

                );
                        
        },

        // 데이터 삭제를 위한 function
        onDelete: function()
        {
            let oTable = this.getView().byId("matList"),
                aIndex = oTable.getSelectedIndices(), 
                oData  = oTable.getContextByIndex(aIndex[0]).getObject(),
                oModel = this.getView().getModel();

            // 행을 선택하지 않았을 경우 체크
            if (aIndex.length < 1)
            {
                MessageToast.show("Select a Row.");
                return;
            }

            // OData Delete 요청
            oModel.remove("/MatSet(Matnr='" + oData.Matnr + "',Auart='" + oData.Auart+"')",
            {
                success: function()
                {
                    oModel.refresh(); // 화면 갱신
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
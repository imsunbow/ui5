sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.weather.code1cl5weather.controller.DetailView", {
        onInit() 
        {
            let oModel = new JSONModel("/data/weatherData.json");
            this.getView().setModel(oModel);
            this.getRouter().getRoute("DetailView").attachPatternMatched(this.onSearchFirst.bind(this), this);
        },

        // 최초 화면 진입시 검색 이벤트
        onSearchFirst: function(oEvent) {
            var vRegion = oEvent.getParameter("arguments").RegionNm,
                // regionModel 세팅
                oRegionModel = new JSONModel({ region: vRegion });

            this.getView().setModel(oRegionModel, "regionModel");

            // 공통 검색 실행
            this.onSearch();
        },

        // 날짜 변경시 검색 이벤트
        onSearch: function() {
            var vRegion = this.getView().getModel("regionModel").oData.region,
                sStart = this.getView().byId("sDate").getValue(),
                sEnd = this.getView().byId("eDate").getValue(),
                oTable = this.getView().byId("Seoul").getBinding("rows"),
                oVizChart = this.getView().byId("idVizFrame").getDataset().getBinding("data"),
                oFilter = [];

            oFilter.push(new Filter("region", FilterOperator.EQ, vRegion));
            
            if (sStart && sEnd) // 시작일과 종료일 모두 입력
            {
                oFilter.push(new Filter("date", FilterOperator.BT, sStart, sEnd));
            } 
            else if (sStart && !sEnd) // 시작일만 입력 → 그 이후
            {
                oFilter.push(new Filter("date", FilterOperator.GE, sStart));
            } 
            else if (!sStart && sEnd) // 종료일만 입력 → 그 이전
            {
                oFilter.push(new Filter("date", FilterOperator.LE, sEnd));
            } 

            // 검색값이 있을 경우만 필터 적용
            if(oFilter.length > 0) 
            {
                // 그리드 리스트에 필터 적용
                oTable.filter(oFilter);

                // 차트에도 동일 필터 적용
                oVizChart.filter(oFilter);
            }
            else // 필터 초기화(검색값 없음)
            {
                oTable.filter();
                oVizChart.filter();
            }
        },

        // 날짜 범위 버튼 클릭 이벤트
        onClickBtn: function(days) { // '1', '7', '30'
            
            // 오늘 날짜
            var today = new Date();

            // yyyy-mm-dd 형태로 변환
            var yyyy = today.getFullYear();
            var mm = ("0" + (today.getMonth() + 1)).slice(-2);
            var dd = ("0" + today.getDate()).slice(-2);

            // 날짜 포맷팅
            var formattedDate = yyyy + "-" + mm + "-" + dd;

            // eDate Input에 세팅
            this.getView().byId("eDate").setValue(formattedDate);

            // 시작 날짜 계산 (days가 '1'이면 오늘, '7'이면 7일 전, '30'이면 30일 전)
            var startDate = new Date();
            startDate.setDate(today.getDate() - (parseInt(days) - 1)); // 1이면 오늘, 7이면 7일 전, 30이면 30일 전

            // yyyy-mm-dd 형태로 변환
            yyyy = startDate.getFullYear();
            mm = ("0" + (startDate.getMonth() + 1)).slice(-2);
            dd = ("0" + startDate.getDate()).slice(-2);
            formattedDate = yyyy + "-" + mm + "-" + dd;

            // sDate Input에 세팅
            this.getView().byId("sDate").setValue(formattedDate);

            // 검색 실행
            this.onSearch();
        },

        // "메인화면으로 이동" 버튼 클릭시
        goMain: function()
        {
            // 날짜 입력값 초기화 (date picker)
            this.getView().byId("sDate").setValue("");
            this.getView().byId("eDate").setValue("");
            this.getRouter().navTo("RouteWeatherMainView");
        },

        getRouter: function ()
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }

    });
});
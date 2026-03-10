sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/viz/ui5/data/FlattenedDataset"
], (Controller, FilterOperator, Filter, FlattenedDataset) => {
    "use strict";

    return Controller.extend("code1.cl516.gw0009.code1cl5split01.controller.SplitView", {

        // 초기값 할당
        onInit() 
        {
            
            // Set Popover
            const oViz     = this.getView().byId("vizChartLine");
            const oPopOver = this.getView().byId("idPopOver");

            // 차트와 popover 연결 
            oPopOver.connect(oViz.getVizUid());

            // 차트 기본 Dataset 설정 
            const oDataSet = new FlattenedDataset({
                
                // x축(차원)
                dimensions: [
                    { name : "Agency", value: "{AgencyNum}"},
                ],

                // y축(측정값)
                measures: [
                    { name : "Booking Total", value: "{Cnt}"},
                    { name : "Weight Total", value: "{Luggweight}"},
                    { name : "Price Total", value: "{Forcuram}"},
                ]
            });

            // 차트에 Dataset 설정
            this.getView().byId("vizChartLine").setDataset(oDataSet);
        },

        // 강의용 코드
        // onSpfli: function(oEvent)
        // {
        //     // carrid 추출 => list 
        //     let oData     = oEvent.getSource().getBindingContext().getObject(),
        //         oBinding  = this.getView().byId("Spfli").getBinding("rows"),
        //         oBinding2 = this.getView().byId("Sflight").getBinding("rows"), // clear처리용 변수(sflight table)
        //         oViz = this.getView().byId("vizChartLine");

        //     oBinding.filter(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
        //     oBinding2.filter();


        // },

        // Airline 선택시
        onSpfli: function (oEvent) {
            const oView = this.getView();   

            // 선택한 row의 데이터 추출
            let oData    = oEvent.getSource().getBindingContext().getObject();

            // Spfli 테이블 binding 객체 가져오기
            let oBindingSplfi = oView.byId("Spfli").getBinding("rows");

            // Carrid 기준으로 필터링
            oBindingSplfi.filter(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));

            // Clear Sflight and Sbook
            oView.byId("Sflight").getBinding("rows").filter(null);
            oView.byId("vizChartLine").getDataset().bindData({ path: "/SbookSet",filters: [] });
        },

        // 강의용 코드
        // onSflight: function(oEvent)
        // {
        //     let oData         = oEvent.getParameter("rowBindingContext").getObject(),
        //         oBinding      = this.getView().byId("Sflight").getBinding("rows"),
        //         aFilter       = [],
        //         oViz = this.getView().byId("vizChartLine"),
        //         oEmptyDataSet = new FlattenedDataset({dimensions : [], measures: [], data: { path: "/SbookSet" }});

        //     aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
        //     aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid));

        //     oBinding.filter(aFilter);
        //     oViz.setDataset(oEmptyDataSet);

        //     // console.log(oEvent.getParameters().rowBindingContext); => parameters 중 rowbinding 사용
        // },

        // Filter Sflight table by selected Carrid and Connid
        onSflight: function (oEvent) {
            const oView = this.getView();

            // 선택한 행의 데이터 가져오기
            let oData    = oEvent.getParameter("rowBindingContext").getObject();
            let oBinding = oView.byId("Sflight").getBinding("rows");
            let aFilter  = [];

            // Airline 필터
            aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
            // Flight Number 필터
            aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid));

            // 필터 적용
            oBinding.filter(aFilter);

            // Clear Sbook
            oView.byId("vizChartLine").getDataset().bindData({ path: "/SbookSet",filters: [] });

        },

        // 강의용 코드
        // onSbook: function(oEvent)
        // {
        //     let oData    = oEvent.getParameter("rowBindingContext").getObject(),
        //         oViz     = this.getView().byId("vizChartLine"),
        //         aFilter  = [],
        //         oDataSet = null;


        //         aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
        //         aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid));
        //         aFilter.push(new Filter("Fldate", FilterOperator.EQ, oData.Fldate.replaceAll("-","")));

        //         oDataSet = new FlattenedDataset(
        //             {
        //                 dimensions: [ 
        //                     { name: "Airline",           value: "{Carrid}" },
        //                     { name: "Flight Number",     value: "{Connid}" },
        //                     { name: "Flight Date",       value: "{Fldate}" },
        //                     { name: "Agency",            value: "{Agencynum}" } ,
        //                 ],

        //                 measures: [
        //                     { name: "Booking Total", value: "{Cnt}"},
        //                     { name: "Weight Total",  value: "{Luggweight}"},
        //                     { name: "Price Total",   value: "{Forcuram}"},
        //                 ],

        //                 data: { path: "/SbookSet", filters: aFilter }
        //             }
        //         );

        // oViz.setDataset(oDataSet);
        //}

        // Filter Sbook table by selected Carrid, Connid and Fldate
        onSbook: function (oEvent) {
            const oView = this.getView();

            let oData = oEvent.getParameter("rowBindingContext").getObject();
            let oViz = oView.byId("vizChartLine");
            let aFilter = [];

            // Filter Setting
            aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
            aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid));
            // Replace all "-" into blank.(날짜 형식 변환)
            aFilter.push(new Filter("Fldate", FilterOperator.EQ, oData.Fldate.replaceAll("-","")));

            let oDataSet = new FlattenedDataset({
                dimensions: [
                    // { name : "Airline",       value: "{Carrid}"},
                    // { name : "Flight Number", value: "{Connid}"},
                    // { name : "Flight Date",   value: "{Fldate}"},
                    { name : "Agency",        value: "{Agencynum}"},
                ],

                measures: [
                    { name : "Booking Total", value: "{Cnt}" },
                    { name : "Weight Total",  value: "{Luggweight}" },
                    { name : "Price Total",   value: "{Forcuram}" },
                ],

                data : { path : "/SbookSet", filters: aFilter }
            });

            // 기존 dataset을 새 dataset으로 교체
            oViz.setDataset(oDataSet);
        }

    });
});
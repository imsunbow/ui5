sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter"
], (Controller, FilterOperator, Filter) => {
    "use strict";

    return Controller.extend("code1.cl516.abap3.p1.code1cl5abap31st.controller.SearchView", {
        onInit() 
        {
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
    });
});
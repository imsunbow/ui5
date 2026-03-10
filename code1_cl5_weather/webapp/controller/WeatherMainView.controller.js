sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("code1.cl5.weather.code1cl5weather.controller.WeatherMainView", {

        onInit: function() 
        {

        },

        onAfterRendering: function() {
            let oImg = this.byId("mapImg").getDomRef();

            var originalWidth = 600,
                originalHeight = 800;

            // 좌표 범위 (원본 이미지 기준)
            let regions = [
                { name: "Gangwon-do",   x1: 284, x2: 482, y1: 19, y2: 261 },
                { name: "Gyeonggi-do",  x1: 161, x2: 310, y1: 78, y2: 287 },
                { name: "Chungcheongnam-do",   x1: 115, x2: 242, y1: 296, y2: 409 },
                { name: "Chungcheongbuk-do", x1: 257, x2: 375, y1: 251, y2: 429 },
                { name: "Gyeongsangbuk-do", x1: 335, x2: 550, y1: 265, y2: 496 },
                { name: "Gyeongsangnam-do", x1: 309, x2: 524, y1: 501, y2: 605 },
                { name: "Jeollabuk-do",   x1: 158, x2: 300, y1: 429, y2: 547 },
                { name: "Jeollanam-do",   x1: 121, x2: 297, y1: 544, y2: 682 }
            ];

            oImg.addEventListener("click", (e) => {
                
                // 축소된 이미지 클릭 좌표 보정
                var scaleX = originalWidth / oImg.width,
                    scaleY = originalHeight / oImg.height,
                    clickX = e.offsetX * scaleX,
                    clickY = e.offsetY * scaleY;

                let sRegion = null;  // 초기값 설정

                // 좌표 범위 내에 있는지 확인 후 지역 할당
                for (let r of regions) 
                {
                    if (clickX >= r.x1 && clickX <= r.x2 && clickY >= r.y1 && clickY <= r.y2) {
                        sRegion = r.name;
                        break;
                    }
                }

                // 잘못된 지역 선택시 alert
                if(sRegion == null) 
                {
                    alert("선택 지역이 없습니다.");
                } 

                // 지역 좌표 할당 성공시 => 입력받은 지역으로 라우팅
                else
                {
                    this.getRouter().navTo("DetailView", { RegionNm: sRegion });
                }
            });
        },

        getRouter: function() {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
    });
});

import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import ColorBox from "./ColorBox";

declare global {
    interface Window {
        kakao: any;
    }
}

const layoutStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative"
};

const wrapStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0
};

const mapStyle: React.CSSProperties = {
    width: "100vw",
    height: "100vh",
    zIndex: -1
};

const App: React.FC = () => {
    useEffect(() => {
        let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        let map: any;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(loadLocation);
        } else {
            alert("no gps");
        }

        function loadLocation(position: any) {
            let location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            let options = {
                //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(
                    location.lat,
                    location.lng
                ), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };

            map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

            loadMaskStore(location);
        }

        function loadMaskStore(location: { lat: number; lng: number }) {
            // https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%A4%91%EA%B5%AC
            // 지역명 검색
            console.log(
                `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${location.lat}&lng=${location.lng}&m=5000`
            );
            fetch(
                `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${location.lat}&lng=${location.lng}&m=5000`
            )
                .then(res => res.json())
                .then(res => {
                    let stores = res.stores;
                    for (let i = 0; i < stores.length; i++) {
                        setMarker(stores[i]);
                    }
                });
        }

        function setMarker(store: any) {
            if (store.remain_stat == null) store.remain_stat = "empty";
            let imageSrc = `/image/${store.remain_stat}.png`;
            let imageSize = new window.kakao.maps.Size(50, 50);
            let imageOption = { offset: new window.kakao.maps.Point(25, 50) };
            let markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
            );
            let markerPosition = new window.kakao.maps.LatLng(
                store.lat,
                store.lng
            );

            let infoWindow = new window.kakao.maps.InfoWindow({
                content: `<div class="marker-data" 
                style="display: flex;flex-direction: column;justify-content: space-around;padding: 10px;height: calc(100% + 20px);"
                >
                    <div>입고시간 : ${store.stock_at}</div>
                    <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">주     소 : ${store.addr}</div>
                    <div>지 점 명 : ${store.name}</div>
                </div>`
            });

            let marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImage
            });

            window.kakao.maps.event.addListener(
                marker,
                "mouseover",
                function() {
                    infoWindow.open(map, marker);
                }
            );
            window.kakao.maps.event.addListener(marker, "mouseout", function() {
                infoWindow.close();
            });
            window.kakao.maps.event.addListener(marker, "click", function() {
                var tempElem = document.createElement("textarea");
                tempElem.value = store.addr;
                document.body.appendChild(tempElem);

                tempElem.select();
                document.execCommand("copy");
                document.body.removeChild(tempElem);
                alert("주소가 복사되었습니다.");
            });

            marker.setMap(map);
        }
    }, []);

    return (
        <div className="App" style={layoutStyle}>
            <div style={wrapStyle}>
                <div id="map" style={mapStyle} />
            </div>
            <div style={wrapStyle}>
                <SearchBar />
                <ColorBox />
            </div>
        </div>
    );
};

export default App;

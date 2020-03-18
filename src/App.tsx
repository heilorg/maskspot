import React, { useEffect } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

const App: React.FC = () => {
    useEffect(() => {
        let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        let map: any;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(loadLocation);
        } else {
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
                    stores.forEach((data: any) =>
                        setMarker({ lat: data.lat, lng: data.lng })
                    );
                });
        }

        function setMarker(location: { lat: number; lng: number }) {
            var markerPosition = new window.kakao.maps.LatLng(
                location.lat,
                location.lng
            );

            var marker = new window.kakao.maps.Marker({
                position: markerPosition
            });

            marker.setMap(map);
        }
    }, []);

    return (
        <div className="App">
            <div id="map" style={{ width: "100vw", height: "100vh" }} />
        </div>
    );
};

export default App;

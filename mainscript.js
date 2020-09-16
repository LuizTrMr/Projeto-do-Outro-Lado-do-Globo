var map;
var marker;

function initMap(){
    var coordenates = {lat : 35.6894, lng : 139.75};//Tóquio

    map = new google.maps.Map(document.getElementById("map"), {
        center : coordenates,
        zoom : 4,
        restriction: {
            latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180
            }
        }
    });

    marker = new google.maps.Marker({
        position : coordenates,
        map : map,
        title : "Tóquio",
        draggable : true
    });
}

$(document).ready(function(){

    document.getElementById("map").style.width = document.getElementById("map").parentNode.style.width;//Deixando o tamanho do mapa seguir o tamanho do container

    function antipodal(latitude,longitude){
        var point = []
        var new_latitude = latitude * -1;
        point.push(new_latitude);
        if (longitude > 0) { // Se a longitude for maior que zero o seu oposto é negativo
            var new_longitude = (180 - Math.abs(longitude)) * -1;
        } else { // Se a longitude for menor ou igual a zero o seu oposto é positivo
            var new_longitude = (180 - Math.abs(longitude));
        }
        point.push(new_longitude);
        return point;
    }

    function createMarker(latitude,longitude,map){
        marker.setMap(null);
        marker = new google.maps.Marker({
            position : new google.maps.LatLng(latitude,longitude),
            map : map,
            draggable : true
        });
    }

    function goTo(latitude,longitude,map){
        map.setCenter(new google.maps.LatLng(latitude, longitude));
    }

    const succesFunction = function(pos){
        marker.setMap(null);
        goTo(pos.coords.latitude, pos.coords.longitude,map);
        marker = new google.maps.Marker({
            position : new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map : map,
            title : "Sua posição",
            draggable : true
        });
    };

    const errorFunction = function(error){
        alert("É necessário permitir que o seu navegador acesse sua localização");
    }
    
    $("#seu_local").click(function(){
        navigator.geolocation.getCurrentPosition(succesFunction,errorFunction);
    });

    $("#selecionar").click(function(){
        var destination = antipodal(marker.getPosition().lat(),marker.getPosition().lng());
        createMarker(destination[0],destination[1],map);
        goTo(destination[0],destination[1],map);
    });
        
});

    



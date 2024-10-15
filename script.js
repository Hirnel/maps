if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);

        //Crear un mapa en el div con id "map"
        var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 16);


        //Agregar capa de OpenStreetMap
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        //Para capa personalizada, se puede usar la libreria leaflet-providers, comentar antes la capa de OpenStreetMap
        L.tileLayer.provider('Stadia.AlidadeSmoothDark').addTo(map);

        // Agregar marcador
        const marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

        // Agregar marcador
        const popup = L.marker([position.coords.latitude, position.coords.longitude])
            .bindPopup("<b>Hello world!</b><br>I am a popup.")
            .openPopup()
            .addTo(map);



    });
} else {
    console.warn("Tu navegador no soporta Geolocalización!! ");

}




// mapa 2






async function getEarthquake() {
    const response = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`);

    const data = await response.json();
    const features = data.features;
    const geometry = features.map(algo => algo.geometry)
    const coordinates = geometry.map(algo => algo.coordinates)

    return coordinates
}
getEarthquake().then(gato => console.log(gato))

getEarthquake().then(dato => {
    dato.forEach(element => {
        const marker = L.marker([element[1], element[0]]).addTo(map2);
    });
});


async function popUp() {
    const response = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`);

    const data = await response.json();
    const features = data.features;
    const properties = features.map(algo => algo.properties)
    const title = properties.map(algo => algo.title)
    const time = properties.map(algo => algo.time)
    const place = properties.map(algo => algo.place)
    const code = properties.map(algo => algo.code)
    const mag = properties.map(algo => algo.mag)

    return [title, time, place, code, mag]
}
// data.Features.properties.

popUp().then(dato => {
    dato.forEach(element => {
        const marker = L.marker([title, time, place, code, mag]).addTo(map2);
    });
});


var map2 = L.map('map2').setView([40.4233784, -3.692763], 1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);

// data.Features.geometry.coordinates

// Título
// Fecha del evento
// Ubicación
// Código
// Magnitud con el tipo de medida

/*
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
Latitud: 40.4233784
Longitud: -3.692763
*/

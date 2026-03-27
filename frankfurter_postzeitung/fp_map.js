// issue map
var map = L.map('map-container').setView([50, 8], 4);
var icon_frank = L.icon({
    iconUrl: 'icons/location-frank.png',
    iconSize: [48, 48],
    iconAnchor: [24, 44],
    popupAnchor: [0, -24],
});
var icon_cor = L.icon({
    iconUrl: 'icons/location-cor.png',
    iconSize: [48, 48],
    iconAnchor: [24, 44],
    popupAnchor: [0, -24],
});
var icon_article = L.icon({
    iconUrl: 'icons/location-article.png',
    iconSize: [36, 36],
    iconAnchor: [18, 34],
    popupAnchor: [0, -18],
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([50.110556, 8.682222], {
    icon: icon_frank
}).addTo(map).bindPopup('Frankfurt');

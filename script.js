// Leaflet Karte initialisieren
const map = L.map("map").setView([51.1657, 10.4515], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Icons definieren
const icons = {
  fire: L.icon({ iconUrl: "icons/fire.png", iconSize: [32, 32] }),
  robbery: L.icon({ iconUrl: "icons/robbery.png", iconSize: [32, 32] }),
  stabbing: L.icon({ iconUrl: "icons/stabbing.png", iconSize: [32, 32] })
};

// Beispiel-Ereignisse (manuell editierbar)
const events = [
  {
    type: "fire",
    city: "Frankfurt",
    coords: [50.1109, 8.6821],
    title: "Feuer in Wohngebäude",
    desc: "Feuer im Gebäude X ist ausgebrochen. Keiner wurde verletzt."
  },
  {
    type: "robbery",
    city: "Berlin",
    coords: [52.52, 13.405],
    title: "Raubüberfall nahe Alexanderplatz",
    desc: "Täter erbeutete Bargeld. Polizei fahndet."
  },
{
    type: "fire",
    city: "Zehdenick",
    coords: [52.9801, 13.3346],
    title: "Jugendliche sollen Supermarkt-Großbrand in Zehdenick mit Pyrotechnik verursacht haben",
    desc: "Bei einem großen Brand standen kurz vor Weihnachten zwei Supermärkte in Zehdenick in Flammen. Nach ersten Ermittlungen der Polizei könnte es sich um Brandstiftung handeln - durch zwei Jugendliche mit Pyrotechnik."
  },

  {
    type: "stabbing",
    city: "Hamburg",
    coords: [53.5511, 9.9937],
    title: "Messerangriff in der Innenstadt",
    desc: "Eine Person wurde leicht verletzt."
  }
];

// Marker erstellen & Ticker befüllen
const eventList = document.getElementById("eventList");

events.forEach((ev, i) => {
  const marker = L.marker(ev.coords, { icon: icons[ev.type] })
    .addTo(map)
    .bindPopup(`<b>${ev.city}</b><br>${ev.title}<br><small>${ev.desc}</small>`);

  // Ticker-Eintrag
  const li = document.createElement("li");
  li.innerHTML = `<b>${ev.type.toUpperCase()}</b> – ${ev.city}<br><small>${ev.title}</small>`;
  li.onclick = () => {
    map.setView(ev.coords, 13);
    marker.openPopup();
  };
  eventList.appendChild(li);
});

// Optional: Bundesländer-Grenzen laden
fetch("https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/2_10_mittel.geo.json")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#444",
        weight: 1.5,
        fillOpacity: 0
      }
    }).addTo(map);
  });

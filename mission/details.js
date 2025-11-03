const API_URL = "https://script.google.com/macros/s/AKfycbxxQaRV6aV4hZfaDqI29E8JihEgnmer0lgne-GNNZCiZqqL5XckER5VQMSCEC_3z_fq/exec";

const params = new URLSearchParams(window.location.search);
const missionId = params.get("id");

async function loadMission() {
  const res = await fetch(API_URL);
  const missions = await res.json();
  const mission = missions.find(m => m.MissionID === missionId);

  document.getElementById("missionInfo").innerHTML = `
    <h1>${mission.Name}</h1>
    <p><b>Agency:</b> ${mission.Agency}</p>
    <p><b>Launch Date:</b> ${mission.LaunchDate}</p>
    <p><b>Status:</b> ${mission.Status}</p>
    <p>${mission.Summary}</p>
    <a href="${mission.WikiURL}" target="_blank">More Info</a>
  `;

  loadGlobe(mission);
  loadChart(mission);
  loadGallery(mission);
}

function loadGallery(mission) {
  const gallery = document.getElementById("gallery");
  const images = mission.Images?.split(",") || [];

  images.forEach(img => {
    const el = document.createElement("img");
    el.src = img.trim();
    gallery.appendChild(el);
  });
}

function loadGlobe(mission) {
  const viewer = new Cesium.Viewer("cesiumContainer", { animation: false, timeline: false });

  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(mission.Lng, mission.Lat, mission.Alt * 1000),
    point: { pixelSize: 10 },
    label: { text: mission.Name }
  });

  viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(mission.Lng, mission.Lat, 5000000) });
}

function loadChart(mission) {
  const ctx = document.getElementById("telemetryChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Start", "Middle", "Now"],
      datasets: [{
        label: "Altitude (km)",
        data: [0, mission.Alt / 2, mission.Alt],
        borderWidth: 2
      }]
    }
  });
}

loadMission();
const API_URL = "https://script.google.com/macros/s/AKfycbxxQaRV6aV4hZfaDqI29E8JihEgnmer0lgne-GNNZCiZqqL5XckER5VQMSCEC_3z_fq/exec";

async function loadMissions() {
  try {
    const res = await fetch(API_URL);
    const missions = await res.json();

    const missionsContainer = document.getElementById("missionsContainer");
    missionsContainer.innerHTML = "";

    missions.forEach(mission => {
      const card = document.createElement("div");
      card.className = "mission-card";

      card.innerHTML = `
        <div class="mission-badge">
          <img src="assets/agency/${mission.Agency}.png" alt="${mission.Agency}">
        </div>

        <h3>${mission.Name}</h3>
        <p><strong>Agency:</strong> ${mission.Agency}</p>
        <p><strong>Launch:</strong> ${mission.LaunchDate}</p>
        <span class="status ${mission.Status.toLowerCase()}">${mission.Status}</span>
      `;

      // ✅ Click card → go to mission details page
      card.addEventListener("click", () => {
        const missionId = mission.MissionID;
        window.location.href = `mission/index.html?id=${encodeURIComponent(missionId)}`;
      });

      missionsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading missions:", error);
  }
}

loadMissions();
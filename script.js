const API_URL = "https://script.google.com/macros/s/AKfycbxxQaRV6aV4hZfaDqI29E8JihEgnmer0lgne-GNNZCiZqqL5XckER5VQMSCEC_3z_fq/exec";

async function loadMissions() {
  const search = document.getElementById("searchBox").value.toLowerCase();
  const agencyFilter = document.getElementById("agencyFilter").value;
  const sortBy = document.getElementById("sortBy").value;

  try {
    const res = await fetch(API_URL);
    let missions = await res.json();

    // ✅ Search Filter
    missions = missions.filter(m => m.Name.toLowerCase().includes(search));

    // ✅ Agency filter
    if (agencyFilter) {
      missions = missions.filter(m => m.Agency === agencyFilter);
    }

    // ✅ Sort
    missions.sort((a, b) => {
      if (sortBy === "name") return a.Name.localeCompare(b.Name);
      if (sortBy === "date") return new Date(a.LaunchDate) - new Date(b.LaunchDate);
      return 0;
    });

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
        <p><strong>${mission.Agency}</strong></p>
        <p>📅 ${mission.LaunchDate}</p>
        <span class="status ${mission.Status.toLowerCase()}">${mission.Status}</span>
      `;

      // ✅ Navigate to mission page
      card.addEventListener("click", () => {
        window.location.href = `mission/index.html?id=${mission.MissionID}`;
      });

      missionsContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Error:", err);
  }
}

document.getElementById("searchBox").oninput = loadMissions;
document.getElementById("agencyFilter").onchange = loadMissions;
document.getElementById("sortBy").onchange = loadMissions;

loadMissions();
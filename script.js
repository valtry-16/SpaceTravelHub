const apiURL = "https://opensheet.elk.sh/1_Ns_2hGkxx8H63NPm_b7m7z0F3PvKoP15bVq_YQrTC0/Missions";

async function loadMissions() {
  try {
    const res = await fetch(apiURL);
    const missions = await res.json();

    const container = document.getElementById("missions-container");

    missions.forEach(m => {
      const card = document.createElement("div");
      card.className = "mission-card";

      card.innerHTML = `
        <img src="${m.image}" alt="${m.mission}">
        <h3>${m.mission}</h3>
        <p><b>Agency:</b> ${m.agency}</p>
        <p><b>Launch:</b> ${m.launch}</p>
        <p><b>Status:</b> ${m.status}</p>
      `;

      card.addEventListener("click", () => {
        window.location.href = `mission/index.html?name=${encodeURIComponent(m.mission)}`;
      });

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading missions:", err);
  }
}

loadMissions();
const apiURL = "https://script.google.com/macros/s/AKfycbxxQaRV6aV4hZfaDqI29E8JihEgnmer0lgne-GNNZCiZqqL5XckER5VQMSCEC_3z_fq/exec";

const missionsContainer = document.getElementById("missions");
const searchInput = document.getElementById("search");
const filterAgency = document.getElementById("agencyFilter");

let missionsData = [];

async function loadMissions() {
    try {
        const response = await fetch(apiURL);
        missionsData = await response.json();
        displayMissions(missionsData);
    } catch (error) {
        missionsContainer.innerHTML = "<p>⚠️ Failed to load missions.</p>";
    }
}

function displayMissions(data) {
    missionsContainer.innerHTML = "";

    data.forEach(mission => {
        const card = document.createElement("div");
        card.className = "mission-card";

        const agency = mission.agency || "Unknown";

        card.innerHTML = `
            <span class="badge">${agency}</span>
            <h2>${mission.mission}</h2>
            <p><strong>Launch:</strong> ${mission.launch_date || "TBD"}</p>
            <p><strong>Status:</strong> ${mission.status || "Unknown"}</p>
        `;

        card.addEventListener("click", () => {
            const missionName = mission.mission;
            window.location.href = `mission/index.html?name=${encodeURIComponent(missionName)}`;
        });

        missionsContainer.appendChild(card);
    });
}

// Search & filter
searchInput.addEventListener("input", () => {
    filterMissions();
});

filterAgency.addEventListener("change", () => {
    filterMissions();
});

function filterMissions() {
    const searchText = searchInput.value.toLowerCase();
    const agency = filterAgency.value;

    const filtered = missionsData.filter(m => 
        m.mission.toLowerCase().includes(searchText) &&
        (agency === "" || m.agency === agency)
    );

    displayMissions(filtered);
}

loadMissions();
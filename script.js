const API = "https://script.google.com/macros/s/AKfycbxxQaRV6aV4hZfaDqI29E8JihEgnmer0lgne-GNNZCiZqqL5XckER5VQMSCEC_3z_fq/exec";
let missions = [];

async function loadMissions() {
  const res = await fetch(API);
  missions = await res.json();
  display(missions);
}

function display(list) {
  document.getElementById("missions").innerHTML = list.map(m => `
    <div class="card">
      <h2>${m.mission_name}</h2>
      <p><b>Agency:</b> ${m.agency}</p>
      <p><b>Status:</b> ${m.status}</p>
      <p><b>Launch:</b> ${m.launch_date}</p>
      <p>${m.description}</p>
      <button onclick="viewTrajectory('${m.trajectory_url}')">View Trajectory</button>
    </div>
  `).join("");
}

function viewTrajectory(url){ window.open(url, "_blank"); }

document.getElementById("search").onkeyup = e => {
  const q = e.target.value.toLowerCase();
  display(missions.filter(m => m.mission_name.toLowerCase().includes(q)));
};

document.getElementById("agencyFilter").onchange = e => {
  const agency = e.target.value;
  display(!agency ? missions : missions.filter(m => m.agency === agency));
};

loadMissions();
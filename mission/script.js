const apiURL = "https://script.google.com/macros/s/AKfycbxxQaRV6aV4hZfaDqI29E8JihEgnmer0lgne-GNNZCiZqqL5XckER5VQMSCEC_3z_fq/exec";

const params = new URLSearchParams(window.location.search);
const missionName = params.get("name");

document.getElementById("missionName").innerText = missionName;

async function loadMissionDetails() {
    try {
        const res = await fetch(apiURL);
        const data = await res.json();
        const mission = data.find(m => m.mission === missionName);

        if (!mission) return;

        document.getElementById("agency").innerText = mission.agency;
        document.getElementById("launchDate").innerText = mission.launch_date;
        document.getElementById("status").innerText = mission.status;
        document.getElementById("description").innerText = mission.description || "No description";
        
    } catch (err) {
        console.log(err);
    }
}

loadMissionDetails();
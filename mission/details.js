<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Mission Details | SpaceTravelHub</title>
<link rel="stylesheet" href="../style.css" />

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
.mission-page {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  color: white;
}
.mission-header {
  display: flex;
  align-items: center;
  gap: 15px;
}
.mission-header img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
}
.back-btn {
  margin-bottom: 15px;
  cursor: pointer;
  padding: 8px 14px;
  background: #0a0a0a;
  border: 1px solid #444;
  color: #00ffe0;
  border-radius: 5px;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(120px,1fr));
  gap: 8px;
  margin-top: 10px;
}
.gallery img {
  width: 100%;
  border-radius: 8px;
}
.info-box {
  background: rgba(255,255,255,0.05);
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  border: 1px solid rgba(255,255,255,0.1);
}
</style>
</head>

<body>

<div class="mission-page">

  <button class="back-btn" onclick="history.back()">⬅ Back</button>

  <div id="missionContent">Loading...</div>

  <h2>📈 Telemetry (Altitude)</h2>
  <canvas id="telemetryChart"></canvas>

</div>

<script src="details.js"></script>
</body>
</html>
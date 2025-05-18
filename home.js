document.addEventListener('DOMContentLoaded', () => {
    const reitDropdown = document.getElementById('reitTicker');
    loadReitData(reitDropdown.value);
    loadUnemploymentData();
    reitDropdown.addEventListener('change', () => {
        loadReitData(reitDropdown.value);
        logUserSelection(reitDropdown.value);
    });
});
  
function loadReitData(ticker) {
    const apiKey = "d865d46ac3cc40ffbcfbba2ec5cd2679"; // TwelveData API Key
    const url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1month&outputsize=12&apikey=${apiKey}`;
  
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data || !data.values) {
                console.warn("Invalid REIT data:", data);
                return;
            }
            const values = data.values.slice().reverse(); // reverse for oldest first
            const labels = values.map(v => v.datetime);
            const prices = values.map(v => parseFloat(v.open));
            renderChart("reitChart", labels, prices, `${ticker} Price (12 months)`);
        })
    .catch(err => console.error("REIT fetch failed:", err));
}
  
function loadUnemploymentData() {
    const apiKey = "5075d10eeb0273197ecdd86c830df92c"; // FRED API Key
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=UNRATE&api_key=${apiKey}&file_type=json`;
  
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data || !data.observations) {
            console.warn("Invalid unemployment data:", data);
            return;
        }
  
        const values = data.observations
            .filter(obs => obs.value !== ".")
            .slice(-12);
        const labels = values.map(o => o.date);
        const points = values.map(o => parseFloat(o.value));
        renderChart("unemploymentChart", labels, points, "US Unemployment (%)");
        })
    .catch(err => console.error("Unemployment fetch failed:", err));
}

let chartInstances = {};
function renderChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId);
  
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
            label: label,
            data: data,
            borderColor: "blue",
            backgroundColor: "lightblue",
            fill: false,
            }]
        }
    });
}

function logUserSelection(reit) {
    fetch('http://localhost:3001/api/logInteraction', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "Selected REIT (home)",
            reit: reit,
            year: null
        })
    }).catch(err => console.warn("Logging failed:", err));
}

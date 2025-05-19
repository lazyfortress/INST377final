let chartInstances = {};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("reitMain").addEventListener("change", fetchAll);
    document.getElementById("yearSelect").addEventListener("change", fetchAll);
    fetchAll();
    loadTopREITs();
});

function fetchAll() {
    const reit = document.getElementById("reitMain").value;
    const year = document.getElementById("yearSelect").value;

    logUserSelection(reit, year);
    fetchReitGraph(reit, year);
    fetchFedFunds(year);
    fetchCPI(year);
    fetchUnemployment(year);
}

// Logging interactions in Supabase; fetching from database
function logUserSelection(reit, year) {''
    // was http://localhost:3001/api/logInteraction for server.js
    fetch("/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        action: "Main Page REIT Request",
        reit: reit,
        year: year
        })
    }).catch(err => console.warn("Could not log:", err));
}

function renderChart(canvasId, labels, data, label, color = "green") {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(document.getElementById(canvasId), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                // 33 is around 20% opacity
                backgroundColor: color + "33",
                fill: false
            }]
        }
    });
}

// Had to use TwelveData instead of Alpha Vantage due to severe rate limiting
// FRED API does not access historical data, unlike TwelveData
function fetchReitGraph(ticker, year) {
    const apiKey = "d865d46ac3cc40ffbcfbba2ec5cd2679";
    const url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1month&outputsize=5000&apikey=${apiKey}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data || !data.values) {
            console.warn("Invalid TwelveData REIT response:", data);
            return;
            }
    
            const filtered = data.values
            .filter(entry => entry.datetime.startsWith(year))
            .reverse();
    
            const labels = filtered.map(entry => dayjs(entry.datetime).format("MMM YYYY")); // day.js
            const prices = filtered.map(entry => parseFloat(entry.open));
    
            renderChart("reitGraph", labels, prices, `${ticker} Price (${year})`, "blue");
        })
        .catch(err => console.error("REIT fetch error:", err));
  }
  

// Had to use FRED API due to Alpha Vantage's severe rate limiting
function fetchFedFunds(year) {
    const apiKey = "5075d10eeb0273197ecdd86c830df92c";
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=FEDFUNDS&api_key=${apiKey}&file_type=json&observation_start=${year}-01-01`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
        if (!data || !data.observations) {
            console.warn("Invalid FedFunds data:", data);
            return;
        }
        const filtered = data.observations.filter(o => o.date.startsWith(year));
        const labels = filtered.map(o => dayjs(o.date).format("MMM YYYY"));
        const values = filtered.map(o => parseFloat(o.value));

        renderChart("fedGraph", labels, values, `Fed Funds Rate (${year})`, "purple");
        });
}

function fetchCPI(year) {
    const apiKey = "5075d10eeb0273197ecdd86c830df92c";
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=${apiKey}&file_type=json&observation_start=${year}-01-01`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
        if (!data || !data.observations) {
            console.warn("Invalid CPI data:", data);
            return;
        }

        const filtered = data.observations.filter(o => o.date.startsWith(year));
        const labels = filtered.map(o => dayjs(o.date).format("MMM YYYY"));
        const values = filtered.map(o => parseFloat(o.value));

        renderChart("cpiGraph", labels, values, `CPI (${year})`, "orange");
        });
}

function fetchUnemployment(year) {
    const apiKey = "5075d10eeb0273197ecdd86c830df92c";
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=UNRATE&api_key=${apiKey}&file_type=json&observation_start=${year}-01-01`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
        if (!data || !data.observations) {
            console.warn("Invalid unemployment data:", data);
            return;
        }

        const filtered = data.observations.filter(o => o.date.startsWith(year));
        const labels = filtered.map(o => dayjs(o.date).format("MMM YYYY"));
        const values = filtered.map(o => parseFloat(o.value));

        renderChart("unempGraph", labels, values, `Unemployment (${year})`, "red");
        });
}

function loadTopREITs() {
    // was http://localhost:3001/api/reitlogs for server.js
    fetch("/api/reitlogs")
        .then(res => res.json())
        .then(data => {
        const counts = {};
        data.forEach(entry => {
            const r = entry.reit;
            if (r) counts[r] = (counts[r] || 0) + 1;
        });

        const top = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2);

        const list = document.getElementById("reitList");
        list.innerHTML = "";
        top.forEach(([reit, count]) => {
            const li = document.createElement("li");
            li.textContent = `${reit} (${count} views)`;
            list.appendChild(li);
        });
        });
}

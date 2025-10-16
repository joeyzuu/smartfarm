// nav links hover //

const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = '#ffffff';
    link.style.backgroundColor = '#0b8d31';
    link.style.padding = '5px 10px 5px 10px';
    link.style.borderRadius = '10px'
    link.style.transition = 'background-color 0.5s, padding 0.5s';
  });

  link.addEventListener('mouseout', () => {
    link.style.color = '';           // revert to original
    link.style.backgroundColor = '';
    link.style.padding = '';
  });
});


// Hamburger menu toggle (guarded in case element isn't on the page)
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  // Toggle menu on button click
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click from bubbling
    navLinks.classList.toggle("show");
  });

  // Close menu if click is outside
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("show")) {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove("show");
      }
    }
  });
}


// Crop Yield Calculator (only attach when present)
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");
if (calculateBtn && resultDiv) {
  calculateBtn.addEventListener("click", () => {
  const acres = parseFloat(document.getElementById("acres").value);
  const crop = document.getElementById("crop").value;

  if (!acres || acres <= 0) {
    resultDiv.textContent = "Please enter a valid number of acres.";
    resultDiv.style.color = 'rgb(255, 78, 78)';
    return;
  }
  else if(!crop){
    resultDiv.textContent = "Please select a crop type.";
    resultDiv.style.color = 'rgb(255, 78, 78)';
  }

  const cropData = {
    wheat: { seeds: 100, fertilizer: 50, water: 5000, yield: 200, cost: 150 },
    rice: { seeds: 120, fertilizer: 60, water: 7000, yield: 250, cost: 200 },
    cotton: { seeds: 80, fertilizer: 40, water: 4000, yield: 180, cost: 180 },
    maize: { seeds: 90, fertilizer: 45, water: 4500, yield: 220, cost: 170 },
    soybean: { seeds: 70, fertilizer: 35, water: 3500, yield: 150, cost: 140 }
  };

  const data = cropData[crop];

  const totalSeeds = data.seeds * acres;
  const totalFertilizer = data.fertilizer * acres;
  const totalWater = data.water * acres;
  const totalYield = data.yield * acres;
  const totalCost = data.cost * acres;

  resultDiv.innerHTML = `
    <h2>Farming Plan for ${acres} acres of ${crop}</h2>
    <table>
      <tbody>
        <tr><td><strong>Seeds required:</strong></td><td>${totalSeeds} kg</td></tr>
        <tr><td><strong>Fertilizer required:</strong></td><td> ${totalFertilizer} kg</td></tr>
        <tr><td><strong>Water required:</strong></td><td>${totalWater} liters</td></tr>
        <tr><td><strong>Expected yield:</strong> </td><td>${totalYield} kg</td></tr>
        <tr><td><strong>Estimated cost:</strong></td><td> ${Math.floor(totalCost * 88.74)} rupees</td></tr>
      </tbody>
    </table>
  `;
  });
}
const titleEl = document.querySelector('.title');
if (titleEl) {
  titleEl.addEventListener('click', () => {
    window.open('index.html');
  });
}

//scroll effect on start farming
function scrolling(){
  const height = document.body.scrollHeight/3
  window.scrollTo({ top: height, behavior: 'smooth' });
}



// script for soil test: attach only when elements exist and use setTimeout to simulate processing delay
const soilBtn = document.getElementById("start");
const report = document.querySelector(".result-card");
if (soilBtn && report) {
  soilBtn.addEventListener("click", () => {
    // provide immediate feedback
    report.innerHTML = '<div class="processing">Processing sample&hellip;</div>';

    // simulate analysis delay (5 seconds) then show results
    setTimeout(() => {
      report.innerHTML = `
        <div class="detailed-analysis-results">
          <h2>Detailed Analysis Results</h2>
          <div class="results-grid">
            <div class="results-section">
              <h4 class="section-title">Nutrient Levels</h4>
              <div class="data-point"><span class="label">Nitrogen</span><span class="value success">37 ppm <span class="status optimal">Optimal</span></span></div>
              <div class="data-point"><span class="label">Phosphorus</span><span class="value success">20 ppm <span class="status optimal">Optimal</span></span></div>
              <div class="data-point"><span class="label">Potassium</span><span class="value success">38 ppm <span class="status optimal">Optimal</span></span></div>
            </div>
            <div class="results-section">
              <h4 class="section-title">Soil Properties</h4>
              <div class="data-point"><span class="label">Soil Type</span><span class="value">Loamy</span></div>
              <div class="data-point"><span class="label">pH Level</span><span class="value error">8.0 <span class="status high">High</span></span></div>
              <div class="data-point"><span class="label">Conductivity</span><span class="value">0.86 dS/m</span></div>
            </div>
          </div>
          <div class="recommendations-box">
            <h4 class="section-title">Farming Recommendations</h4>
            <p class="optimized-for">Optimized for: <strong>Cotton cultivation in gh</strong></p>
            <div class="recommendation-item high-priority"><p class="rec-text">Apply sulfur at 500-800 lbs/acre to lower pH from 8</p><span class="priority-tag">HIGH PRIORITY</span></div>
            <div class="recommendation-item info"><p class="rec-text">Note: These recommendations are based on soil analysis results. Consider local weather conditions, irrigation availability, and consult with agricultural extension services for best results.</p></div>
          </div>
        </div>
      `;
    }, 5000);
  });
}
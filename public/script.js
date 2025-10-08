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


// Hamburger menu toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


// Crop Yield Calculator
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

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
document.querySelector('.title').addEventListener('click', ()=>{
  window.open('index.html');
})


// crop-guide///

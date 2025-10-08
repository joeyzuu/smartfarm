// crop-rice-details
const cropData = {
  winter: [
    { name: "Wheat", investment: "₹ 31,059/acre", profit: "₹ 53,224/acre", water: "700mm", duration: "120 days",link:'https://youtu.be/swojd7FFUfg?feature=shared', methods: ['Organic'] },
    { name: "Tomatoes", investment: "₹ 39,933/acre", profit: "₹ 66,555/acre", water: "900mm", duration: "90 days",  link:'https://youtu.be/aLE47GxlAcY?feature=shared', methods: ['Inorganic']},
    { name: "Carrots", investment: "₹ 26,622/acre", profit: "₹ 44,370/acre", water: "500mm", duration: "70 days", link:'https://youtu.be/x7f5fJuVBT8?feature=shared', methods: ['Organic'] },
  ],
  summer: [
    { name: "Rice", investment: "₹ 44,370/acre", profit: "₹ 70,992/acre", water: "1000mm", duration: "120 days",link :'https://youtu.be/vFkWe2X2tkM?feature=shared', methods: ['Organic', 'Inorganic'] },
    { name: "Cotton", investment: "₹ 35,496/acre", profit: "₹ 62,118/acre", water: "800mm", duration: "150 days",link:'https://youtu.be/0xuLtK9l8xk?feature=shared', methods: ['Inorganic'] },
  ],
  monsoon: [
    { name: "Maize", investment: "₹ 26,622/acre", profit: "₹ 48,807/acre", water: "600mm", duration: "100 days",link:'https://youtu.be/F_At8ssQwJ8?feature=shared', methods: ['Organic', 'Inorganic'] },
  ],
};

// Crop-specific methods
  const cropMethods = {
    Rice: {
      organic: {
        title: "Organic Rice Farming Methods",
        description: "Traditional and sustainable methods for rice cultivation",
        methods: [
          {
            name: "System of Rice Intensification (SRI)",
            description: "Method using younger seedlings, wider spacing, and intermittent irrigation",
            benefits: ["Higher yields", "Less water usage", "Stronger root system"],
            cost: "$40-80/acre",
            timeToEffect: "1 season",
            image: "🌾",
            steps: ["Use 8-12 day old seedlings", "Plant single seedlings 25cm apart", "Keep soil moist not flooded", "Use organic fertilizers"]
          },
          {
            name: "Duck-Rice Integration",
            description: "Raising ducks in rice fields for natural pest control and fertilization",
            benefits: ["Natural pest control", "Organic fertilizer", "Additional income"],
            cost: "$60-100/acre",
            timeToEffect: "2 months",
            image: "🦆",
            steps: ["Introduce ducks after 20 days", "Maintain 10-15 ducks per acre", "Provide shelter", "Harvest both rice and ducks"]
          },
          {
            name: "Green Manuring",
            description: "Growing nitrogen-fixing crops before rice planting",
            benefits: ["Improves soil fertility", "Reduces fertilizer cost", "Enhances soil structure"],
            cost: "$30-60/acre",
            timeToEffect: "60 days",
            image: "🌱",
            steps: ["Plant Sesbania or Azolla", "Allow 45-60 days growth", "Incorporate into soil", "Plant rice after decomposition"]
          }
        ]
      },
      inorganic: {
        title: "Inorganic Rice Farming Methods",
        description: "Modern chemical-based rice cultivation techniques",
        methods: [
          {
            name: "NPK Fertilizer Application",
            description: "Systematic application of Nitrogen, Phosphorus, and Potassium",
            benefits: ["Rapid growth", "High yield", "Predictable results"],
            cost: "$120-180/acre",
            timeToEffect: "2-3 weeks",
            image: "⚗️",
            steps: ["Soil test for NPK levels", "Apply basal dose before planting", "Top dress nitrogen at tillering", "Apply phosphorus and potassium as needed"]
          },
          {
            name: "Herbicide Weed Control",
            description: "Chemical control of weeds in rice fields",
            benefits: ["Effective weed elimination", "Labor saving", "Uniform crop growth"],
            cost: "$80-120/acre",
            timeToEffect: "5-7 days",
            image: "🌿",
            steps: ["Pre-emergence herbicide application", "Post-emergence treatment if needed", "Selective herbicides for grass weeds", "Follow recommended dosage"]
          }
        ]
      }
    },
    Cotton: {
      inorganic: {
        title: "Inorganic Cotton Farming Methods",
        description: "Chemical-intensive methods for cotton production",
        methods: [
          {
            name: "Bt Cotton Cultivation",
            description: "Genetically modified cotton with built-in pest resistance",
            benefits: ["Reduced pesticide use", "Higher yields", "Bollworm resistance"],
            cost: "$150-250/acre",
            timeToEffect: "Full season",
            image: "🧬",
            steps: ["Use certified Bt seeds", "Follow refuge requirements", "Monitor for secondary pests", "Apply supplemental pesticides as needed"]
          },
          {
            name: "Drip Fertigation",
            description: "Combining drip irrigation with liquid fertilizer application",
            benefits: ["Water efficiency", "Precise nutrient delivery", "Reduced labor"],
            cost: "$300-500/acre",
            timeToEffect: "Immediate",
            image: "💧",
            steps: ["Install drip system", "Prepare fertilizer solution", "Schedule fertigation cycles", "Monitor plant response"]
          },
          {
            name: "Growth Regulators",
            description: "Chemical hormones to control cotton plant growth",
            benefits: ["Controlled plant height", "Better boll setting", "Uniform maturity"],
            cost: "$90-140/acre",
            timeToEffect: "1-2 weeks",
            image: "📈",
            steps: ["Apply at squaring stage", "Use recommended concentration", "Time application with weather", "Monitor plant response"]
          }
        ]
      }
    },
    Maize: {
      organic: {
        title: "Organic Maize Farming Methods",
        description: "Sustainable corn production techniques",
        methods: [
          {
            name: "Three Sisters Planting",
            description: "Intercropping maize with beans and squash",
            benefits: ["Nitrogen fixation", "Soil conservation", "Pest management"],
            cost: "$50-90/acre",
            timeToEffect: "Full season",
            image: "🌽",
            steps: ["Plant corn first", "Add beans 2-3 weeks later", "Plant squash around hills", "Monitor all three crops"]
          },
          {
            name: "Compost Application",
            description: "Using well-decomposed organic matter for soil fertility",
            benefits: ["Improves soil health", "Slow-release nutrients", "Increases organic matter"],
            cost: "$60-120/acre",
            timeToEffect: "2-3 months",
            image: "🌱",
            steps: ["Prepare quality compost", "Apply 5-10 tons per acre", "Incorporate into soil", "Plant after 2 weeks"]
          }
        ]
      },
      inorganic: {
        title: "Inorganic Maize Farming Methods",
        description: "Chemical-based high-yield corn production",
        methods: [
          {
            name: "Hybrid Seed Technology",
            description: "Using high-yielding hybrid corn varieties with chemical inputs",
            benefits: ["Very high yields", "Disease resistance", "Uniform growth"],
            cost: "$200-300/acre",
            timeToEffect: "Full season",
            image: "🔬",
            steps: ["Select appropriate hybrid", "Use recommended plant density", "Apply starter fertilizer", "Follow chemical spray schedule"]
          },
          {
            name: "Atrazine Herbicide Program",
            description: "Pre and post-emergence weed control in corn",
            benefits: ["Excellent weed control", "Long-lasting effect", "Crop selectivity"],
            cost: "$70-110/acre",
            timeToEffect: "1-2 weeks",
            image: "🧪",
            steps: ["Pre-plant herbicide application", "Post-emergence touch-up", "Tank-mix with other chemicals", "Follow rotation restrictions"]
          }
        ]
      }
    },
    Wheat: {
      organic: {
        title: "Organic Wheat Farming Methods",
        description: "Traditional and sustainable wheat cultivation practices",
        methods: [
          {
            name: "Crop Rotation with Legumes",
            description: "Rotating wheat with nitrogen-fixing crops",
            benefits: ["Natural nitrogen supply", "Disease break", "Soil health improvement"],
            cost: "$40-80/acre",
            timeToEffect: "1-2 seasons",
            image: "🔄",
            steps: ["Plan 3-4 year rotation", "Include legumes like peas", "Follow with wheat", "Monitor soil fertility"]
          },
          {
            name: "Organic Seed Treatment",
            description: "Natural methods to protect seeds from diseases",
            benefits: ["Disease prevention", "Better germination", "Chemical-free start"],
            cost: "$20-40/acre",
            timeToEffect: "At planting",
            image: "🌾",
            steps: ["Use neem oil treatment", "Apply beneficial microorganisms", "Hot water treatment option", "Plant treated seeds immediately"]
          },
          {
            name: "Mechanical Weed Control",
            description: "Using cultivation and hand weeding for weed management",
            benefits: ["No chemical residues", "Soil aeration", "Selective weed removal"],
            cost: "$80-150/acre",
            timeToEffect: "Immediate",
            image: "🚜",
            steps: ["Cultivate between rows", "Hand weed near plants", "Time operations with growth stage", "Multiple passes as needed"]
          }
        ]
      }
    },
    Tomatoes: {
      inorganic: {
        title: "Inorganic Tomato Farming Methods",
        description: "Intensive chemical-based tomato production",
        methods: [
          {
            name: "Hydroponic System",
            description: "Soilless cultivation using nutrient solutions",
            benefits: ["Precise nutrition", "Higher yields", "Disease control"],
            cost: "$800-1200/acre",
            timeToEffect: "Immediate",
            image: "💧",
            steps: ["Set up hydroponic system", "Prepare nutrient solutions", "Monitor pH and EC", "Adjust nutrients based on growth stage"]
          },
          {
            name: "Integrated Pest Management",
            description: "Systematic use of chemical pesticides with monitoring",
            benefits: ["Effective pest control", "Resistance management", "Optimized spray timing"],
            cost: "$150-250/acre",
            timeToEffect: "1-3 days",
            image: "🧪",
            steps: ["Regular pest monitoring", "Threshold-based spraying", "Rotate chemical groups", "Record keeping"]
          },
          {
            name: "Plastic Mulch with Fertilizer",
            description: "Combining plastic mulch with chemical fertilizers",
            benefits: ["Weed suppression", "Moisture conservation", "Faster growth"],
            cost: "$200-300/acre",
            timeToEffect: "Immediate",
            image: "🛡️",
            steps: ["Install drip lines", "Lay plastic mulch", "Apply liquid fertilizers through drip", "Monitor plant nutrition"]
          }
        ]
      }
    },
    Carrots: {
      organic: {
        title: "Organic Carrot Farming Methods",
        description: "Natural methods for carrot cultivation",
        methods: [
          {
            name: "Deep Bed Preparation",
            description: "Creating loose, deep soil for proper root development",
            benefits: ["Better root formation", "Improved drainage", "Easy harvesting"],
            cost: "$80-150/acre",
            timeToEffect: "Immediate",
            image: "🥕",
            steps: ["Deep tillage to 12-15 inches", "Add organic compost", "Create raised beds", "Ensure proper soil texture"]
          },
          {
            name: "Companion Planting",
            description: "Growing carrots with beneficial companion plants",
            benefits: ["Natural pest deterrent", "Space utilization", "Soil improvement"],
            cost: "$40-70/acre",
            timeToEffect: "2-3 weeks",
            image: "🌿",
            steps: ["Plant with onions or chives", "Add marigolds for pest control", "Interplant with lettuce", "Maintain proper spacing"]
          },
          {
            name: "Organic Mulching",
            description: "Using organic materials to cover soil around carrots",
            benefits: ["Moisture retention", "Weed suppression", "Temperature regulation"],
            cost: "$60-100/acre",
            timeToEffect: "Immediate",
            image: "🍂",
            steps: ["Apply straw or leaf mulch", "Keep mulch away from crown", "Maintain 2-3 inch thickness", "Refresh as needed"]
          }
        ]
      }
    }
  };

// Elements
const cropContainer = document.getElementById("cropContainer");
const seasonButtons = document.querySelectorAll(".season-btn");
const methodModal = document.getElementById("methodModal");
const methodDetails = document.getElementById("methodDetails");
const closeModal = document.querySelector(".close");

// Open modal with crop methods
function openMethodDetails(cropName, methodType) {
  methodDetails.innerHTML = ""; // Clear previous content

  const data = cropMethods[cropName];
  if (!data || !data[methodType.toLowerCase()]) {
    methodDetails.innerHTML = "<p>No data available for this method.</p>";
  } else {
    const methodData = data[methodType.toLowerCase()];

    const title = document.createElement("h2");
    title.textContent = methodData.title;
    const desc = document.createElement("p");
    desc.textContent = methodData.description;
    methodDetails.append(title, desc);

    methodData.methods.forEach(m => {
      const mDiv = document.createElement("div");
      mDiv.style.marginBottom = "20px";

      const mTitle = document.createElement("h3");
      mTitle.textContent = `${m.image} ${m.name}`;

      const mDesc = document.createElement("p");
      mDesc.textContent = m.description;

      const ul = document.createElement("ul");
      m.steps.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        ul.appendChild(li);
      });

      const benefits = document.createElement("p");
      benefits.innerHTML = `<strong>Benefits:</strong> ${m.benefits.join(", ")}`;

      const cost = document.createElement("p");
      cost.innerHTML = `<strong>Cost:</strong> ${m.cost}`;

      const time = document.createElement("p");
      time.innerHTML = `<strong>Time to Effect:</strong> ${m.timeToEffect}`;

      mDiv.append(mTitle, mDesc, ul, benefits, cost, time);
      methodDetails.appendChild(mDiv);
    });
  }

  methodModal.style.display = "block"; // Show modal
}

// Close modal
closeModal.onclick = () => methodModal.style.display = "none";
window.onclick = (e) => { if (e.target === methodModal) methodModal.style.display = "none"; }

// "View Guide" button function
function viewguide(tab) {
  window.open(tab, "_blank");
}

// Render crops function (unchanged, ensure buttons call openMethodDetails)
function renderCrops(season) {
  cropContainer.innerHTML = "";
  cropData[season].forEach(crop => {
    const card = document.createElement("div");
    card.classList.add("crop-card");

    const title = document.createElement("h3");
    title.textContent = crop.name;

    const list = document.createElement("ul");
    list.innerHTML = `
      <li>💰 Investment: <strong>${crop.investment}</strong></li>
      <li>📈 Expected Profit: <strong>${crop.profit}</strong></li>
      <li>💧 Water Need: <strong>${crop.water}</strong></li>
      <li>⏳ Duration: <strong>${crop.duration}</strong></li>
    `;

    const methodsTitle = document.createElement("p");
    methodsTitle.textContent = "Growing Methods";

    const methodContainer = document.createElement("div");
    methodContainer.classList.add("method");

    crop.methods.forEach(method => {
      const btn = Object.assign(document.createElement("button"), {
        className: method.toLowerCase(),
        textContent: method,
        onclick: () => openMethodDetails(crop.name, method),
      });
      methodContainer.appendChild(btn);
    });

    const viewButton = Object.assign(document.createElement("button"), {
      className: "viewguide",
      textContent: "View Guide",
      onclick: () => viewguide(crop.link),
    });

    card.append(title, list, methodsTitle, methodContainer, viewButton);
    cropContainer.appendChild(card);
  });
}

// Season buttons click
seasonButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".season-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderCrops(btn.dataset.season);
  });
});

// Default load
renderCrops("winter");

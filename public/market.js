// import express from "express";
// import fetch from "node-fetch";

// const app = express();
// const PORT = 3000;

// // Set EJS as the template engine
// app.set("view engine", "ejs");

// // Serve static files (CSS, JS, etc.)
// app.use(express.static("public"));

// // Route: Fetch and render data
// app.get("/", async (req, res) => {
//   const url = "https://joeyzuu.github.io/vegetable-prices/data.json";
//   const response = await fetch(url);
//   const data = await response.json();

//   const apData = data.records.filter(record => record.state === "Andhra Pradesh");

//   // Render HTML template and pass data
//   res.render("index", { mandiData: apData });
// });

// app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  

// GitHub raw JSON URL
const url = 'https://joeyzuu.github.io/vegetable-prices/data.json';

// ✅ Fetch data for selected state
async function fetchStateData(state) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Filter records for selected state
    const appData = data.records.filter(record => record.state === state);

    return [appData, appData.length];
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// ✅ Render state data as price cards
const render = (records, totalRecords, state) => {
  const container = document.querySelector('.product-price-container');

  if (!records || records.length === 0) {
    container.innerHTML = `<p>No data found for <strong>${state}</strong>.</p>`;
    return;
  }

  let html = `<h1>Total commodities in ${state}: ${totalRecords}</h1>
              <div class="scroll">`;

  records.forEach(record => {
    html += `
      <div class="price-card">
        <div class="price-header">
          <h3>${record.commodity}</h3>
        </div>
        <h1 class="price">₹${record.min_price}</h1>
        <p class="unit">per quintal</p>
        <button class="view-btn" data-object='${JSON.stringify(record)}'>
          View Full Details
        </button>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
};

// ✅ Show full details in modal
function showFullDetails(object) {
  const modal = document.getElementById('detailsModal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Commodity Details</h2>
      <div class="details">
        <p><strong>State:</strong> ${object.state}</p>
        <p><strong>District:</strong> ${object.district}</p>
        <p><strong>Market:</strong> ${object.market}</p>
        <p><strong>Commodity:</strong> ${object.commodity}</p>
        <p><strong>Variety:</strong> ${object.variety}</p>
        <p><strong>Grade:</strong> ${object.grade}</p>
        <p><strong>Arrival Date:</strong> ${object.arrival_date}</p>
        <p><strong>Min Price:</strong> ₹${object.min_price}</p>
        <p><strong>Max Price:</strong> ₹${object.max_price}</p>
        <p><strong>Modal Price:</strong> ₹${object.modal_price}</p>
      </div>
    </div>
  `;

  modal.style.display = "block";

  // Close modal when clicking ×
  modal.querySelector(".close").onclick = () => {
    modal.style.display = "none";
  };

  // Close when clicking outside
  window.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
  };
}

// ✅ Event delegation for “View Full Details” buttons
document.addEventListener('click', e => {
  if (e.target.classList.contains('view-btn')) {
    const record = JSON.parse(e.target.dataset.object);
    showFullDetails(record);
  }
});

// ✅ Fetch when user clicks "Go"
document.getElementById('go').addEventListener('click', async () => {
  const state = document.getElementById('state').value;
  if (!state) {
    alert("Please select a state first!");
    return;
  }

  const [records, total] = await fetchStateData(state);
  render(records, total, state);
});


// info of buyers

const buyers = [
      {
        name: "Green Valley Co-op",
        crop: "Rice",
        location: "Punjab, India",
        price: "₹70.78/kg",
        rating: 4.8,
        quantity: "500 tons",
        requirements: "Organic certified rice preferred",
        phone: "+91-98765-43210"
      },
      {
        name: "Sunrise Agro Industries",
        crop: "Wheat",
        location: "Haryana, India",
        price: "₹55/kg",
        rating: 4.6,
        quantity: "300 tons",
        requirements: "Grade A wheat, moisture <12%",
        phone: "+91-98765-43211"
      },
      {
        name: "Metro Food Processing",
        crop: "Maize",
        location: "Maharashtra, India",
        price: "₹42.5/kg",
        rating: 4.7,
        quantity: "200 tons",
        requirements: "Fresh maize, yellow variety",
        phone: "+91-98765-43212"
      },
      {
        name: "Golden Harvest Ltd",
        crop: "Rice",
        location: "Gujarat, India",
        price: "₹72.7/kg",
        rating: 4.5,
        quantity: "400 tons",
        requirements: "Basmati rice, long grain",
        phone: "+91-98765-43213"
      }
    ];

    const container = document.getElementById("buyersContainer");
    const buyerCount = document.getElementById("buyer-count");
    const filter = document.getElementById("filter");

    function displayBuyers(list) {
      container.innerHTML = "";
      list.forEach(buyer => {
        const card = document.createElement("div");
        card.className = "buyer-card";
        card.innerHTML = `
          <div class="buyer-header">
            <h3>${buyer.name}</h3>
            <span class="rating">⭐ ${buyer.rating} rating</span>
          </div>
          <div class="buyer-location">${buyer.location}</div>
          <div class="buyer-details">
            <p><strong>Quantity Needed:</strong> ${buyer.quantity}</p>
            <p><strong>Requirements:</strong> ${buyer.requirements}</p>
          </div>
          <div class="buyer-crop">${buyer.crop}</div>
          <div class="buyer-price">${buyer.price}</div>
          <div class="buyer-contact">
            <i>📞</i> ${buyer.phone}
          </div>
          <button class="contact-btn" data-phone="${buyer.phone}">Contact Buyer</button>
        `;
        container.appendChild(card);
      });
      buyerCount.textContent = list.length;
    }

    filter.addEventListener("change", () => {
      const value = filter.value;
      if (value === "All") {
        displayBuyers(buyers);
      } else {
        displayBuyers(buyers.filter(b => b.crop === value));
      }
    });

    displayBuyers(buyers);


     const buttons = document.querySelectorAll('.contact-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const phoneNumber = button.dataset.phone;  // read data-phone
      window.location.href = `tel:${phoneNumber}`; // open phone dialer
    });
  });
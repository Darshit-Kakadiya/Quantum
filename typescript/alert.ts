interface Alert {
    alert: string;
    read: boolean;
    timestamp: string;
    from?: string;
    from_name?: string;
}

// Fetch the JSON file
fetch("../data/alerts.json")
  .then(
    (response) => response.json() as Promise<{ alerts: Alert[] }>
  )
  .then((data) => {
    generateAalertsCards(data.alerts);
  })
  .catch((error) => console.error("Error fetching JSON:", error));

function generateAalertsCards(alerts: Alert[]) {
  const alertsContainer = document.querySelector(".alerts");

  alerts.forEach((alert) => {
    const card = document.createElement("div");
    card.className = "alert";
    if (alert.read) {
      card.classList.add("read-alerts");
    }

    // Build HTML structure for the course card
    card.innerHTML = `
  <div class="alert-content">
          <span>${alert.alert}</span></span>
          ${
            alert.read
              ? `<img src="../assets/check_circle.svg" />`
              : `<img src="../assets/minus_circle.svg" />`
          }
        </div>
        ${
          alert.from
            ? `<div class="alert-from">
            ${alert.from}: <span>${alert.from_name}<span>
            </div>`
            : ``
        }
        
        <div class="alert-footer">
          <span>${alert.timestamp}</span></div>
  `;

    // Append the card to the container
    if (alertsContainer) {
        alertsContainer.appendChild(card);
    }
  });
}

// Fetch the JSON file
fetch("../data/alerts.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    generateAalertsCards(data.alerts);
})
    .catch(function (error) { return console.error("Error fetching JSON:", error); });
function generateAalertsCards(alerts) {
    var alertsContainer = document.querySelector(".alerts");
    alerts.forEach(function (alert) {
        var card = document.createElement("div");
        card.className = "alert";
        if (alert.read) {
            card.classList.add("read-alerts");
        }
        // Build HTML structure for the course card
        card.innerHTML = "\n  <div class=\"alert-content\">\n          <span>".concat(alert.alert, "</span></span>\n          ").concat(alert.read
            ? "<img src=\"../assets/check_circle.svg\" />"
            : "<img src=\"../assets/minus_circle.svg\" />", "\n        </div>\n        ").concat(alert.from
            ? "<div class=\"alert-from\">\n            ".concat(alert.from, ": <span>").concat(alert.from_name, "<span>\n            </div>")
            : "", "\n        \n        <div class=\"alert-footer\">\n          <span>").concat(alert.timestamp, "</span></div>\n  ");
        // Append the card to the container
        if (alertsContainer) {
            alertsContainer.appendChild(card);
        }
    });
}

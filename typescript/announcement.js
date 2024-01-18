// Fetch the JSON file
fetch("../data/announcement.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    generateAnnouncementsCards(data.announcements);
})
    .catch(function (error) { return console.error("Error fetching JSON:", error); });
function generateAnnouncementsCards(announcements) {
    var announcementsContainer = document.querySelector(".announcements");
    announcements.forEach(function (announcement) {
        var card = document.createElement("div");
        card.className = "announcement";
        if (announcement.read) {
            card.classList.add("read-announcements");
        }
        // Build HTML structure for the course card
        card.innerHTML = "\n    <div class=\"announcement-details\">\n    <span>PA: <span class=\"announcement-author\">".concat(announcement.author, "</span></span>\n    ").concat(announcement.read
            ? "<img src=\"../assets/check_circle.svg\" />"
            : "<img src=\"../assets/minus_circle.svg\" />", "\n  </div>\n  <div class=\"announcement-content\">\n    ").concat(announcement.content, "\n  </div>\n  <div class=\"announcement-footer\">\n    <span>").concat(announcement.timestamp, "</span>\n    ").concat(announcement.attachment
            ? "<span><img src=\"../assets/attach_file.svg\">".concat(announcement.attachment, " files are attached</span>")
            : "", "\n  </div>\n");
        // Append the card to the container
        if (announcementsContainer) {
            announcementsContainer.appendChild(card);
        }
    });
}

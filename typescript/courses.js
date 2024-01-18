// Fetch the JSON file
fetch('../data/courses.json')
    .then(function (response) { return response.json(); })
    .then(function (data) {
    generateCourseCards(data.courses);
})
    .catch(function (error) { return console.error('Error fetching JSON:', error); });
// Function to generate HTML cards from JSON data
function generateCourseCards(courses) {
    var cardsContainer = document.querySelector('.card-container');
    courses.forEach(function (course) {
        var card = document.createElement('div');
        card.className = 'card';
        // Build HTML structure for the course card
        card.innerHTML = "\n  ".concat(course.buttons.expired
            ? "\n  <span class=\"expired\">EXPIRED</span>"
            : "", "\n    <div class=\"card-content\">\n      <img src=\"").concat(course.link, "\" />\n      <div class=\"card-details\">\n        <div class=\"course-title\">\n          <span>").concat(course.title, "</span>\n          <img ").concat(!course.buttons.favourite ? "class=\"favourite-off\"" : "", "src=\"../assets/icons/favourite.svg\" />\n        </div>\n        <div class=\"course-metadata\">\n          <span>").concat(course.subject, "</span>\n          <span class=\"verticle-divider\">Grade ").concat(course.grade, "<span class=\"highlight\">+2</span></span>\n          \n        </div>\n        ").concat(course.details
            ? "<div class=\"course-details\">\n        <span>\n          <span class=\"dark-text\">".concat(course.details.units, "</span> Units\n        </span>\n        <span>\n          <span class=\"dark-text\">").concat(course.details.lessons, "</span> Lessons\n        </span>\n        <span>\n          <span class=\"dark-text\">").concat(course.details.topics, "</span> Topics\n        </span>\n      </div>")
            : "", "\n        \n        <div class=\"filter-field\">\n          <select class=\"dropdown course-dropdown ").concat(course.class === "No Classes" ? "disable" : "", "\" name=\"filter\" id=\"filter\">\n            <option value=\"No Classes\">").concat(course.class, "</option>\n          </select>\n        </div>\n        ").concat(course.metadata
            ? "\n        <div class=\"course-metadata\">\n        ".concat(course.metadata.students
                ? "<span>".concat(course.metadata.students, " Students</span>")
                : "", "\n          \n        ").concat(course.metadata.dates
                ? "<span class=\"verticle-divider\"> ".concat(course.metadata.dates.start, " - ").concat(course.metadata.dates.end, "</span>")
                : "", "\n        </div>")
            : "", "\n      </div>\n    </div>\n    <hr />\n    <div class=\"card-options\">\n      <img ").concat(!course.buttons.preview ? "class=disable-btn" : "", " src=\"../assets/icons/preview.svg\" />\n      <img ").concat(!course.buttons.manage_course ? "class=disable-btn" : "", " src=\"../assets/icons/manage course.svg\" />\n      <img ").concat(!course.buttons.grade_submission ? "class=disable-btn" : "", " src=\"../assets/icons/grade submissions.svg\" />\n      <img ").concat(!course.buttons.report ? "class=disable-btn" : "", " src=\"../assets/icons/reports.svg\" />\n    </div>\n  </div>\n    ");
        // Append the card to the container
        if (cardsContainer) {
            cardsContainer.appendChild(card);
        }
    });
}

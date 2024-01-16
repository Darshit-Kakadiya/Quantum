const cardData = fetch("../data/courses.json")
  .then((response) => response.json())
  .then((data) => {
    data.courses.forEach((course) => {
      createCard(course);
    });
  })
  .catch((error) => {
    console.error(error);
  });

function createCard(course) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  ${course.buttons.expired ? `
  <span class="expired">EXPIRED</span>` : ''}
    <div class="card-content">
      <img src="${course.link}" />
      <div class="card-details">
        <div class="course-title">
          <span>${course.title}</span>
          <img class=favourite-off src="../assets/icons/favourite.svg" />
        </div>
        <div class="course-metadata">
          <span>${course.subject}</span>
          <span class="verticle-divider">Grade ${course.grade}<span class="highlight">+2</span></span>
          
        </div>
        ${course.details ? `<div class="course-details">
        <span>
          <span class="dark-text">${course.details.units}</span> Units
        </span>
        <span>
          <span class="dark-text">${course.details.lessons}</span> Lessons
        </span>
        <span>
          <span class="dark-text">${course.details.topics}</span> Topics
        </span>
      </div>` : ""}
        
        <div class="filter-field">
          <select class="dropdown course-dropdown ${course.class === "No Classes"? 'disable' : ''}" name="filter" id="filter">
            <option value="No Classes">${course.class}</option>
          </select>
        </div>
        ${course.metadata ? `
        <div class="course-metadata">
        ${course.metadata.students ? `<span>${course.metadata.students} Students</span>` : ''}
          
        ${course.metadata.dates ? `<span class="verticle-divider"> ${course.metadata.dates.start} - ${course.metadata.dates.end}</span>` : ''}
        </div>` : ''}
      </div>
    </div>
    <hr />
    <div class="card-options">
      <img ${!course.buttons.preview ? 'class=disable-btn' : ''} src="../assets/icons/preview.svg" />
      <img ${!course.buttons.manage_course ? 'class=disable-btn' : ''} src="../assets/icons/manage course.svg" />
      <img ${!course.buttons.grade_submission ? 'class=disable-btn' : ''} src="../assets/icons/grade submissions.svg" />
      <img ${!course.buttons.report ? 'class=disable-btn' : ''} src="../assets/icons/reports.svg" />
    </div>
  </div>
    `;
  document.querySelector(".card-container").appendChild(card);
}

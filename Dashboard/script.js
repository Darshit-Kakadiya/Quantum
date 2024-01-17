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

const announcementData = fetch("../data/announcement.json")
  .then((response) => response.json())
  .then((data) => {
    data.announcements.forEach((announcement) => {
      announcementCard(announcement);
    });
  })
  .catch((error) => {
    console.error(error);
  });
const alertData = fetch("../data/alerts.json")
  .then((response) => response.json())
  .then((data) => {
    data.alerts.forEach((alrt) => {
      alertCard(alrt);
    });
  })
  .catch((error) => {
    console.error(error);
  });

function createCard(course) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  ${
    course.buttons.expired
      ? `
  <span class="expired">EXPIRED</span>`
      : ""
  }
    <div class="card-content">
      <img src="${course.link}" />
      <div class="card-details">
        <div class="course-title">
          <span>${course.title}</span>
          <img ${
            !course.buttons.favourite ? `class="favourite-off"` : ""
          }src="../assets/icons/favourite.svg" />
        </div>
        <div class="course-metadata">
          <span>${course.subject}</span>
          <span class="verticle-divider">Grade ${
            course.grade
          }<span class="highlight">+2</span></span>
          
        </div>
        ${
          course.details
            ? `<div class="course-details">
        <span>
          <span class="dark-text">${course.details.units}</span> Units
        </span>
        <span>
          <span class="dark-text">${course.details.lessons}</span> Lessons
        </span>
        <span>
          <span class="dark-text">${course.details.topics}</span> Topics
        </span>
      </div>`
            : ""
        }
        
        <div class="filter-field">
          <select class="dropdown course-dropdown ${
            course.class === "No Classes" ? "disable" : ""
          }" name="filter" id="filter">
            <option value="No Classes">${course.class}</option>
          </select>
        </div>
        ${
          course.metadata
            ? `
        <div class="course-metadata">
        ${
          course.metadata.students
            ? `<span>${course.metadata.students} Students</span>`
            : ""
        }
          
        ${
          course.metadata.dates
            ? `<span class="verticle-divider"> ${course.metadata.dates.start} - ${course.metadata.dates.end}</span>`
            : ""
        }
        </div>`
            : ""
        }
      </div>
    </div>
    <hr />
    <div class="card-options">
      <img ${
        !course.buttons.preview ? "class=disable-btn" : ""
      } src="../assets/icons/preview.svg" />
      <img ${
        !course.buttons.manage_course ? "class=disable-btn" : ""
      } src="../assets/icons/manage course.svg" />
      <img ${
        !course.buttons.grade_submission ? "class=disable-btn" : ""
      } src="../assets/icons/grade submissions.svg" />
      <img ${
        !course.buttons.report ? "class=disable-btn" : ""
      } src="../assets/icons/reports.svg" />
    </div>
  </div>
    `;
  document.querySelector(".card-container").appendChild(card);
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerIcon = document.getElementById("hamburger");
  const alertIcon = document.getElementById("alertIcon");
  const announcementIcon = document.getElementById("announcementIcon");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const alertPreview = document.getElementById("alertPreview");
  const announcementPreview = document.getElementById("announcementPreview");

  function showHamburgerMenu() {
    hamburgerMenu.style.display = "block";
  }

  function showAlertPreview() {
    alertPreview.style.display = "block";
  }

  function showAnnouncementPreview() {
    announcementPreview.style.display = "block";
  }

  function hideAllPreviews() {
    hamburgerMenu.style.display = "none";
    alertPreview.style.display = "none";
    announcementPreview.style.display = "none";
  }

  hamburgerIcon.addEventListener("mouseover", showHamburgerMenu);
  alertIcon.addEventListener("mouseover", showAlertPreview);
  announcementIcon.addEventListener("mouseover", showAnnouncementPreview);

  [hamburgerIcon, alertIcon, announcementIcon].forEach((icon) => {
    icon.addEventListener("mouseout", hideAllPreviews);
  });
});

function announcementCard(annc) {
  const announcement = document.createElement("div");
  announcement.classList.add("announcement");
  if (annc.read) {
    announcement.classList.add("read-announcements");
  }
  announcement.innerHTML = `
  <div class="announcement-details">
          <span>PA: <span class="announcement-author">${
            annc.author
          }</span></span>
          ${
            annc.read
              ? `<img src="../assets/check_circle.svg" />`
              : `<img src="../assets/minus_circle.svg" />`
          }
        </div>
        <div class="announcement-content">
          ${annc.content}
        </div>
        <div class="announcement-footer">
          <span>${annc.timestamp}</span>
          ${
            annc.attachment
              ? `<span><img src="../assets/attach_file.svg">${annc.attachment} files are attached</span>`
              : ``
          }
        </div>
  `;
  document.querySelector(".announcements").appendChild(announcement);
}
function alertCard(alertData) {
  const alrt = document.createElement("div");
  alrt.classList.add("alert");
  if (alertData.read) {
    alrt.classList.add("read-alerts");
  }
  alrt.innerHTML = `
  <div class="alert-content">
          <span>${alertData.alert}</span></span>
          ${
            alertData.read
              ? `<img src="../assets/check_circle.svg" />`
              : `<img src="../assets/minus_circle.svg" />`
          }
        </div>
        ${
          alertData.from
            ? `<div class="alert-from">
            ${alertData.from}: <span>${alertData.from_name}<span>
            </div>`
            : ``
        }
        
        <div class="alert-footer">
          <span>${alertData.timestamp}</span></div>
  `;
  document.querySelector(".alerts").appendChild(alrt);
}

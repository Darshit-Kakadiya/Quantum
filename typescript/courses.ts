interface Course {
    title: string;
    link: string;
    subject: string;
    grade: number;
    details?: {
        units: number;
        lessons: number;
        topics: number;
    };
    class: string;
    metadata?: {
        students?: number;
        dates?: {
            start: string;
            end: string;
        };
    };
    buttons: {
        favourite: boolean;
        expired: boolean;
        preview: boolean;
        manage_course: boolean;
        grade_submission: boolean;
        report: boolean;
    };
}

// Fetch the JSON file
fetch('../data/courses.json')
    .then(response => response.json() as Promise<{ courses: Course[] }>)
    .then(data => {
        generateCourseCards(data.courses);
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Function to generate HTML cards from JSON data
function generateCourseCards(courses: Course[]) {
    const cardsContainer = document.querySelector('.card-container');

    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card';

        // Build HTML structure for the course card
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
    `

        // Append the card to the container
        if (cardsContainer) {
            cardsContainer.appendChild(card);
        } 
    });
}

interface Announcement {
  author: string;
  content: string;
  attachment?: number;
  course?: string;
  timestamp: string;
  read: boolean;
}

// Fetch the JSON file
fetch("../data/announcement.json")
  .then(
    (response) => response.json() as Promise<{ announcements: Announcement[] }>
  )
  .then((data) => {
    generateAnnouncementsCards(data.announcements);
  })
  .catch((error) => console.error("Error fetching JSON:", error));

function generateAnnouncementsCards(announcements: Announcement[]) {
  const announcementsContainer = document.querySelector(".announcements");

  announcements.forEach((announcement) => {
    const card = document.createElement("div");
    card.className = "announcement";
    if (announcement.read) {
      card.classList.add("read-announcements");
    }
    // Build HTML structure for the course card
    card.innerHTML = `
    <div class="announcement-details">
    <span>PA: <span class="announcement-author">${
        announcement.author
    }</span></span>
    ${
        announcement.read
        ? `<img src="../assets/check_circle.svg" />`
        : `<img src="../assets/minus_circle.svg" />`
    }
  </div>
  <div class="announcement-content">
    ${announcement.content}
  </div>
  <div class="announcement-footer">
    <span>${announcement.timestamp}</span>
    ${
        announcement.attachment
        ? `<span><img src="../assets/attach_file.svg">${announcement.attachment} files are attached</span>`
        : ``
    }
  </div>
`;

    // Append the card to the container
    if (announcementsContainer) {
        announcementsContainer.appendChild(card);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerIcon = document.getElementById("hamburger");
  const alertIcon = document.getElementById("alertIcon");
  const announcementIcon = document.getElementById("announcementIcon");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const alertPreview = document.getElementById("alertPreview");
  const announcementPreview = document.getElementById("announcementPreview");

  function showHamburgerMenu() {
    hamburgerMenu.style.opacity = "1";
    hamburgerMenu.style.height = "auto";
  }

  function showAlertPreview() {
    alertPreview.style.opacity = "1";
    alertPreview.style.height = "auto";
  }

  function showAnnouncementPreview() {
    announcementPreview.style.opacity = "1";
    announcementPreview.style.height = "auto";
  }

  function hideAllPreviews() {
    hamburgerMenu.style.opacity = "0";
    hamburgerMenu.style.height = "0";
    alertPreview.style.opacity = "0";
    alertPreview.style.height = "0";
    announcementPreview.style.opacity = "0";
    announcementPreview.style.height = "0";
  }

  hamburgerIcon.addEventListener("mouseover", showHamburgerMenu);
  alertIcon.addEventListener("mouseover", showAlertPreview);
  announcementIcon.addEventListener("mouseover", showAnnouncementPreview);

  [hamburgerIcon, alertIcon, announcementIcon].forEach((icon) => {
    icon.addEventListener("mouseout", hideAllPreviews);
  });
});
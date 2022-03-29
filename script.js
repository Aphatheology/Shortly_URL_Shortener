const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});
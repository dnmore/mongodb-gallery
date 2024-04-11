const hamburgerButton = document.getElementById("hamburger__button");
const mobileNavigation = document.getElementById("mobile__navigation");

function toggleMenu() {
  console.log('open');
  mobileNavigation.classList.toggle("open");
}

hamburgerButton.addEventListener("click", toggleMenu);

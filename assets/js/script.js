const searchToggle = document.getElementById("tl-searchToggle");
const searchOverlay = document.getElementById("tl-searchOverlay");

searchToggle.addEventListener("click", () => {
    searchOverlay.classList.toggle("active");
});

// Close on overlay click or Escape key
searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        searchOverlay.classList.remove("active");
    }
});
// hamburger
var tlBurgerMenu = document.getElementById('tl-burger-menu');
var tlOverlay = document.getElementById('tl-menu');

tlBurgerMenu.addEventListener('click', function () {
    this.classList.toggle('tl-close');
    tlOverlay.classList.toggle('tl-overlay');
});
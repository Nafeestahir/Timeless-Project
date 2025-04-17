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

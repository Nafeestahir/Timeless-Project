// searchOverlay
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

// slider
const slides = document.querySelectorAll('.tl-slides');
const nextBtn = document.querySelector('.tl-next-btn');
const prevBtn = document.querySelector('.tl-prev-btn');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('tl-active', i === index);
  });

  // Disable buttons when at ends
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === slides.length - 1;
}

nextBtn.addEventListener('click', () => {
  if (current < slides.length - 1) {
    current++;
    showSlide(current);
  }
});

prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    showSlide(current);
  }
});

showSlide(current);

// Accordion
// var acc = document.getElementsByClassName("tl-faq-question");

// for (var i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     }
//   });
// }
const questions = document.querySelectorAll('.tl-faq-question');

questions.forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;

    q.classList.toggle('tl-active');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';

    questions.forEach(other => {
      if (other !== q) {
        other.classList.remove('tl-active');
        other.nextElementSibling.style.display = 'none';
      }
    });
  });
});



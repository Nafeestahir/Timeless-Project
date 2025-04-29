// Header Scroll Trigger
document.addEventListener('DOMContentLoaded', function () {
  const tlHeader = document.querySelector('#tl-header');
  const tlMainSection = document.querySelector('main');

  tlHeader.classList.add('hide-menu');

  window.addEventListener('scroll', function () {
    const tlMainTop = tlMainSection.getBoundingClientRect().top;

    if (tlMainTop <= 0) {
      if (tlHeader.classList.contains('hide-menu')) {
        tlHeader.classList.remove('hide-menu');
      }
      if (!tlHeader.classList.contains('show-menu')) {
        tlHeader.classList.add('show-menu');
      }
    } else {
      if (!tlHeader.classList.contains('hide-menu')) {
        tlHeader.classList.add('hide-menu');
      }
      if (tlHeader.classList.contains('show-menu')) {
        tlHeader.classList.remove('show-menu');
      }
    }
  });
});
// Search Overlay Toggle
const tlSearchToggle = document.getElementById("tl-searchToggle");
const tlSearchOverlay = document.getElementById("tl-searchOverlay");

tlSearchToggle.addEventListener("click", () => {
  tlSearchOverlay.classList.toggle("active");
});

// Close on overlay click or Escape key
tlSearchOverlay.addEventListener("click", (e) => {
  if (e.target === tlSearchOverlay) {
    tlSearchOverlay.classList.remove("active");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    tlSearchOverlay.classList.remove("active");
  }
});

// Hamburger Menu Toggle
const tlBurgerMenu = document.getElementById('tl-burger-menu');
const tlMenuOverlay = document.getElementById('tl-menu');

tlBurgerMenu.addEventListener('click', function () {
  this.classList.toggle('tl-close');
  tlMenuOverlay.classList.toggle('tl-overlay');
});

// Image Slider
const tlSliderWrapper = document.querySelector('.tl-slides-wrapper');
const tlSliderContents = tlSliderWrapper.querySelectorAll('.tl-content-block .tl-slide-content');
const tlImageSlider = tlSliderWrapper.querySelector('.tl-image-slider');
const tlPrevBtn = tlSliderWrapper.querySelector('.tl-prev-btn');
const tlNextBtn = tlSliderWrapper.querySelector('.tl-next-btn');
let tlCurrent = 0;

function tlUpdateSlider() {
  tlSliderContents.forEach((tlContent, i) =>
    tlContent.classList.toggle('tl-active', i === tlCurrent)
  );

  const tlImageBlocks = tlSliderWrapper.querySelectorAll('.tl-image-slider .tl-image-block');
  tlImageBlocks.forEach((tlImage, i) =>
    tlImage.classList.toggle('tl-active', i === tlCurrent)
  );

  tlImageSlider.style.transform = `translateX(-${tlCurrent * 576}px)`;

  tlPrevBtn.disabled = tlCurrent === 0;
  tlNextBtn.disabled = tlCurrent === tlSliderContents.length - 1;
}

tlPrevBtn.addEventListener('click', () => {
  if (tlCurrent > 0) { tlCurrent--; tlUpdateSlider(); }
});

tlNextBtn.addEventListener('click', () => {
  if (tlCurrent < tlSliderContents.length - 1) { tlCurrent++; tlUpdateSlider(); }
});

// Initialize Slider
tlUpdateSlider();

// Accordion
const tlQuestions = document.querySelectorAll('.tl-faq-question');

tlQuestions.forEach(tlQuestion => {
  tlQuestion.addEventListener('click', () => {
    const tlAnswer = tlQuestion.nextElementSibling;
    const tlIsActive = tlQuestion.classList.contains('tl-active');

    tlQuestions.forEach(other => {
      other.classList.remove('tl-active');
      other.nextElementSibling.style.maxHeight = null;
    });

    if (!tlIsActive) {
      tlQuestion.classList.add('tl-active');
      tlAnswer.style.maxHeight = tlAnswer.scrollHeight + "px";
    }
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Left Hand
gsap.to(".tl-hand-left", {
  x: 80,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".tl-brands",
    start: "top center",
    toggleActions: "play reverse play reverse",
    scrub: 0.5
  }
});

const tlBrandsTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".tl-brands",
    start: "top center",
    toggleActions: "play reverse play reverse",
    scrub: 0.5,
  }
});

tlBrandsTimeline.to(".tl-hand-right", { x: -80, duration: 2, ease: "power2.out" }, 0)
  .to(".tl-identity p", { x: -30, opacity: 1, duration: 2, ease: "power2.out" }, 0);

// Animate Client Retention Number
const tlCounter = { val: 0 };

gsap.to(tlCounter, {
  val: 94,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".tl-client-retention",
    start: "top 80%",
    toggleActions: "play reverse play reverse",
    markers: false,
  },
  onUpdate: () => {
    const tlRetentionNumber = document.querySelector(".tl-retention-number");
    tlRetentionNumber.textContent = Math.round(tlCounter.val) + "%";
  }
});

// Image Zoom
[".tl-swift-turnaround", ".tl-attention-detail", ".tl-circle"].forEach(selector => {
  gsap.to(selector, {
    scale: 1.1,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: selector,
      start: "top 50%",
      toggleActions: "play reverse play reverse",
      markers: false,
    }
  });
});

// Rotating Images
document.addEventListener('DOMContentLoaded', () => {
  const tlLogos = document.querySelectorAll('.tl-circle-img');
  const tlRadius = 120;
  const tlCarousel = document.querySelector('.tl-circle');
  let tlRotation = 0;

  tlLogos.forEach((tlLogo, tlIndex) => {
    const tlAngle = (tlIndex * (360 / tlLogos.length)) * Math.PI / 180;
    const tlX = Math.cos(tlAngle) * tlRadius;
    const tlY = Math.sin(tlAngle) * tlRadius;

    gsap.set(tlLogo, {
      x: tlX,
      y: tlY,
      position: "absolute",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%"
    });
  });

  gsap.ticker.add(() => {
    tlRotation += 0.3;
    gsap.set(tlCarousel, {
      rotation: tlRotation,
      transformOrigin: "center center"
    });
  });
});

// Mouse Arrow Animation
gsap.to(".tl-mouse-arrow", {
  x: -36.006,
  y: -38.5,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".tl-border-block",
    start: "top 50%",
    toggleActions: "play reverse play reverse",
    markers: false
  },
});

// Storytelling Animation
gsap.to(".tl-storytelling p", {
  y: -30,
  opacity: 1,
  ease: "power2.out",
  duration: 2,
  scrollTrigger: {
    trigger: ".tl-storytelling",
    start: "top 40%",
    toggleActions: "play reverse play reverse",
    scrub: 0.5,
    markers: false,
  }
});
// gsap.fromTo(".tl-storytelling p",
//   { opacity: 0, scale: 0.95 },
//   {
//     opacity: 1,
//     scale: 1,
//     ease: "power2.out",
//     duration: 2,
//     scrollTrigger: {
//       trigger: ".tl-storytelling",
//       start: "top 40%",
//       toggleActions: "play reverse play reverse",
//       scrub: 0.5,
//     }
//   }
// );


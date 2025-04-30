// Header Scroll Trigger
document.addEventListener('DOMContentLoaded', () => {
  const tlHeader = document.querySelector('#tl-header');
  const tlMain = document.querySelector('main');
  if (!tlHeader || !tlMain) return;

  tlHeader.classList.add('hide-menu');

  const tlUpdateHeader = () => {
    const tlScrolledPastMain = tlMain.getBoundingClientRect().top <= 0;
    const tlIsSmallScreen = window.innerWidth < 1199;

    tlHeader.classList.toggle('show-menu', tlScrolledPastMain);
    tlHeader.classList.toggle('hide-menu', !tlScrolledPastMain);
    tlHeader.style.backdropFilter = (tlScrolledPastMain || tlIsSmallScreen) ? 'blur(8px)' : 'blur(0px)';
  };

  tlUpdateHeader();
  window.addEventListener('scroll', tlUpdateHeader);
  window.addEventListener('resize', tlUpdateHeader);
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

let isMenuOpen = false;

tlBurgerMenu.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;

  tlBurgerMenu.classList.toggle('tl-close', isMenuOpen);

  if (isMenuOpen) {
    tlMenuOverlay.classList.add('tl-overlay');
    gsap.fromTo(tlMenuOverlay,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  } else {
    gsap.to(tlMenuOverlay, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        tlMenuOverlay.classList.remove('tl-overlay');
      }
    });
  }
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

  const tlImageBlocks = tlSliderWrapper.querySelectorAll('.tl-image-slider .tl-image');
  tlImageBlocks.forEach((tlImage, i) =>
    tlImage.classList.toggle('tl-active', i === tlCurrent)
  );

  // Dynamically calculate image width
  const imageWidth = tlImageBlocks[0]?.offsetWidth || 0;
  tlImageSlider.style.transform = `translateX(-${tlCurrent * imageWidth}px)`;

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
window.addEventListener('load', tlUpdateSlider);
window.addEventListener('resize', tlUpdateSlider); // Optional: re-calculate on resize

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
// marquee
document.addEventListener('DOMContentLoaded', function () {
  const tlMarquee = document.querySelector('.tl-marquee');
  const tlMarqueeContainer = document.querySelector('.tl-marquee-block');
  // 1. Clone items for seamless looping
  const tlOriginalItems = tlMarquee.innerHTML;
  tlMarquee.innerHTML = tlOriginalItems + tlOriginalItems + tlOriginalItems;
  // 2. Calculate positions
  const tlContainerWidth = tlMarqueeContainer.offsetWidth;
  const tlMarqueeWidth = tlMarquee.scrollWidth / 3; // Original width (since we tripled items)
  // 3. Initial centering
  tlMarquee.style.left = `calc(50% - ${tlMarqueeWidth / 2}px)`;
  // 4. Create smooth left-to-right animation
  const tlStyle = document.createElement('style');
  tlStyle.innerHTML = `
    @keyframes tl-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${tlMarqueeWidth}px); }
    }
    .tl-marquee {
      animation: tl-scroll ${tlMarqueeWidth / 25}s linear infinite;
    }
  `;
  document.head.appendChild(tlStyle);
});

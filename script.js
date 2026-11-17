const slides = [...document.querySelectorAll(".slide")];
let current = 0;

const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function showSlide(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === current);
  });

  counter.textContent = `${current + 1} / ${slides.length}`;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  previousButton.disabled = current === 0;
  nextButton.disabled = current === slides.length - 1;
}

previousButton.addEventListener("click", () => showSlide(current - 1));
nextButton.addEventListener("click", () => showSlide(current + 1));

document.getElementById("full").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
});

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    showSlide(current + 1);
  }
  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    showSlide(current - 1);
  }
  if (event.key === "Home") showSlide(0);
  if (event.key === "End") showSlide(slides.length - 1);
});

// Navigasi geser untuk layar sentuh/HP.
let touchStartX = 0;
document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  const difference = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(difference) > 60) {
    showSlide(current + (difference < 0 ? 1 : -1));
  }
}, { passive: true });

showSlide(0);

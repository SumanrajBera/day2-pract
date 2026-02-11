const testimonials = document.querySelector(".testimonialGrp");
const slides = document.querySelectorAll(".testimonial");
const images = document.querySelectorAll(".imgGrp > .img");

const clone = slides[0].cloneNode(true);
testimonials.appendChild(clone);

let currentIdx = 0;
let prevImg = 0;
const total = slides.length;
const imagesLen = images.length;

let timer;

function carousel() {
  testimonials.style.transform = `translateX(-${currentIdx * 100}%)`;
}

function nextSlide() {
  currentIdx++;
  carousel();

  const imgIdx = currentIdx % imagesLen;

  images[prevImg].classList.remove("active");
  images[imgIdx].classList.add("active");

  prevImg = imgIdx;
}

function start() {
  timer = setInterval(nextSlide, 5000);
}

function stop() {
  clearInterval(timer);
}

start();


document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stop();
  } else {
    currentIdx = currentIdx % total; 
    carousel();
    start();
  }
});


testimonials.addEventListener("transitionend", () => {
  if (currentIdx === total) {
    testimonials.style.transition = "none";
    currentIdx = 0;
    carousel();

    void testimonials.offsetWidth;

    testimonials.style.transition = "transform 1s ease";
  }
});

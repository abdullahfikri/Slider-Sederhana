// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
let currentSlide = 0;
const maxSlide = slides.length;
const slider = document.querySelector(".slider");

// Functions
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const activateDot = function (slide) {
  // Remove dot active class from all class
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  // Add dot active class to class we interested in
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
const next = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// Set Interval
let intervalNext = setInterval(next, 4000);

// Set default slide and activate Dot
goToSlide(0);
activateDot(0);

// Next button
const nextSlide = function () {
  next();
  clearInterval(intervalNext);
  intervalNext = setInterval(next, 4000);
};

// Prev Button
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);

  clearInterval(intervalNext);
  intervalNext = setInterval(next, 4000);
};

// Init
const slideInit = function () {};
slideInit();
// Event Handler
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;

    goToSlide(slide);
    activateDot(slide);
  }
});

// Sticky navigation
const sectionHeroEl = document.querySelector(".hero");
const navHeight = document
  .querySelector(".nav-container")
  .getBoundingClientRect().height;

const obs = new IntersectionObserver(
  function (entries) {
    const [ent] = entries;

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
obs.observe(sectionHeroEl);

//Fleet
const carPrices = {
  "BMW 7 Series": 120,
  "Audi A8": 115,
  "Mercedes-Benz S-Class": 130,
  "Porsche Panamera": 140,
  "Lexus LS": 125,
  "Toyota RAV4": 80,
  "Ford Explorer": 90,
  "Hyundai Tucson": 85,
  "Volvo XC60": 100,
  "Nissan X-Trail": 95,
  "Toyota Yaris": 50,
  "Volkswagen Polo": 45,
  "Honda Civic": 55,
  "Ford Fiesta": 50,
  "Renault Clio": 40,
};

const addonPrices = {
  "child-seat": 20,
  "car-insurance": 50,
  "roof-box": 30,
};

document.addEventListener("DOMContentLoaded", () => {
  const carModels = document.querySelectorAll(".car-model");

  carModels.forEach((carModelElement) => {
    const carName = carModelElement.textContent.trim();

    const carPrice = carPrices[carName];

    if (carPrice) {
      const priceElement = carModelElement
        .closest(".car-specification")
        .querySelector(".price");

      priceElement.textContent = `Daily Rental Price: $${carPrice}`;
    }
  });
});

const slideContainer = document.querySelectorAll(".slider");

for (let i = 0; i < slideContainer.length; i++) {
  // Slider
  const slider = function () {
    const slides = slideContainer[i].querySelectorAll(".slide");
    const btnLeft = slideContainer[i].querySelector(".slider__btn--left");
    const btnRight = slideContainer[i].querySelector(".slider__btn--right");
    const dotContainer = slideContainer[i].querySelector(".dots");

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
      slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
      });
    };

    const activateDot = function (slide) {
      slideContainer[i]
        .querySelectorAll(".dots__dot")
        .forEach((dot) => dot.classList.remove("dots__dot--active"));

      slideContainer[i]
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
    };

    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
      );
    };

    // Next slide
    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }

      goToSlide(curSlide);
      activateDot(curSlide);
    };

    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    };

    const init = function () {
      goToSlide(0);
      createDots();

      activateDot(0);
    };
    init();

    // Event handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") prevSlide();
      e.key === "ArrowRight" && nextSlide();
    });

    dotContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
  };
  slider();
}

// Faq
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const iconDown = button.querySelector(
      'ion-icon[name="chevron-down-outline"]'
    );
    const iconUp = button.querySelector('ion-icon[name="chevron-up-outline"]');

    answer.classList.toggle("active");
    iconDown.classList.toggle("hidden");
    iconUp.classList.toggle("hidden");
  });
});

//form

const overlay = document.querySelector(".overlay");
const closeIcon = document.querySelector(".close-icon");
const btnForm = document.querySelectorAll(".btn-form");
const formContainer = document.querySelector(".form-container");
const formModelName = document.querySelector(".form-model-name");
const form = document.querySelector(".form");
const submitMassage = document.querySelector(".submit-massage");
const returnButton = document.querySelector(".btn-return");
const addonCheckboxes = document.querySelectorAll(".form-checkbox");

btnForm.forEach((btn) => {
  btn.addEventListener("click", () => {
    init();
    const carModel = btn
      .closest(".car-description")
      .querySelector(".car-model").textContent;

    formModelName.textContent = carModel;

    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    calculateTotalPrice();
  });
});

closeIcon.addEventListener("click", () => {
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
});

overlay.addEventListener("click", (event) => {
  if (!formContainer.contains(event.target)) {
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }
});

const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const setTomorrowAsMinDate = (input, isEnd = false) => {
  const today = new Date();
  const tomorrow = new Date(today);
  if (isEnd) {
    tomorrow.setDate(today.getDate() + 2);
  } else {
    tomorrow.setDate(today.getDate() + 1);
  }
  const minDate = tomorrow.toISOString().split("T")[0];
  input.min = minDate;
  input.value = minDate;
};
document.addEventListener("DOMContentLoaded", () => {
  setTomorrowAsMinDate(startDateInput);
  setTomorrowAsMinDate(endDateInput, true);

  startDateInput.addEventListener("change", () => {
    const selectedStartDate = new Date(startDateInput.value);
    const minEndDate = new Date(selectedStartDate);
    minEndDate.setDate(selectedStartDate.getDate() + 1);

    const minDateString = minEndDate.toISOString().split("T")[0];
    endDateInput.min = minDateString;

    if (new Date(endDateInput.value) < minEndDate) {
      endDateInput.value = minDateString;
    }
  });
});

const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(0, (end - start) / (1000 * 60 * 60 * 24));
};

const calculateTotalPrice = () => {
  const carModel = formModelName.textContent.trim();
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const days = calculateDays(startDate, endDate);
  const carPricePerDay = carPrices[carModel];
  let totalPrice = days * carPricePerDay;

  Object.keys(addonPrices).forEach((addonId) => {
    const addonCheckbox = document.getElementById(addonId);
    if (addonCheckbox && addonCheckbox.checked) {
      totalPrice += addonPrices[addonId];
    }
  });

  const totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.textContent = `$${totalPrice}`;
};

document.addEventListener("DOMContentLoaded", () => {
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");

  startDateInput.addEventListener("change", calculateTotalPrice);
  endDateInput.addEventListener("change", calculateTotalPrice);
  addonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", calculateTotalPrice);
  });
});

formContainer.addEventListener("submit", (event) => {
  submitMassage.classList.remove("hidden");
  form.classList.add("hidden");
  event.preventDefault();
});

returnButton.addEventListener("click", () => {
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
});

const init = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#surname").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#phone").value = "";

  setTomorrowAsMinDate(startDateInput);
  setTomorrowAsMinDate(endDateInput, true);

  submitMassage.classList.add("hidden");
  form.classList.remove("hidden");

  addonCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

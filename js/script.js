// Sticky navigation
const sectionHeroEl = document.querySelector(".hero");
const navHeight = document
  .querySelector(".nav-container")
  .getBoundingClientRect().height;

new IntersectionObserver(
  ([entry]) => document.body.classList.toggle("sticky", !entry.isIntersecting),
  { root: null, threshold: 0, rootMargin: `-${navHeight}px` }
).observe(sectionHeroEl);

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
  document.querySelectorAll(".car-model").forEach((carModelElement) => {
    const carName = carModelElement.textContent.trim();
    const priceElement = carModelElement
      .closest(".car-specification")
      ?.querySelector(".price");

    if (priceElement && carPrices[carName]) {
      priceElement.textContent = `Daily Rental Price: $${carPrices[carName]}`;
    }
  });
});

// Slider
const sliders = document.querySelectorAll(".slider");

sliders.forEach((container) => {
  const slides = container.querySelectorAll(".slide");
  const btnLeft = container.querySelector(".slider__btn--left");
  const btnRight = container.querySelector(".slider__btn--right");
  const dotContainer = container.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    dotContainer
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    dotContainer
      .querySelector(`[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
});

// Faq
const faqContainer = document.querySelector(".faq-list");
faqContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".faq-question");
  if (!btn) return;
  btn.nextElementSibling.classList.toggle("active");
  btn
    .querySelectorAll("ion-icon")
    .forEach((icon) => icon.classList.toggle("hidden"));
});

//Form

const btnForm = document.querySelectorAll(".btn-form");
const overlay = document.querySelector(".overlay");
const closeIcon = document.querySelector(".close-icon");
const formContainer = document.querySelector(".form-container");
const formModelName = document.querySelector(".form-model-name");
const form = document.querySelector(".form");
const submitMessage = document.querySelector(".submit-massage");
const returnButton = document.querySelector(".btn-return");
const addonCheckboxes = document.querySelectorAll(".form-checkbox");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const totalPriceElement = document.querySelector(".total-price");

const setTomorrowAsMinDate = (input, isEnd = false) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + (isEnd ? 2 : 1));
  const minDate = tomorrow.toISOString().split("T")[0];
  input.min = minDate;
  input.value = minDate;
};

const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(0, (end - start) / (1000 * 60 * 60 * 24));
};

const calculateTotalPrice = () => {
  const carModel = formModelName.textContent.trim();
  const days = calculateDays(startDateInput.value, endDateInput.value);
  const carPricePerDay = carPrices[carModel] || 0;

  const addonsCost = Object.entries(addonPrices).reduce(
    (sum, [addonId, price]) => {
      return sum + (document.getElementById(addonId)?.checked ? price : 0);
    },
    0
  );

  totalPriceElement.textContent = `$${days * carPricePerDay + addonsCost}`;
};

const resetForm = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#surname").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#phone").value = "";

  setTomorrowAsMinDate(startDateInput);
  setTomorrowAsMinDate(endDateInput, true);

  submitMessage.classList.add("hidden");
  form.classList.remove("hidden");

  addonCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

// Event Handlers
const openForm = (event) => {
  resetForm();

  const carModel = event.target
    .closest(".car-description")
    .querySelector(".car-model").textContent;

  formModelName.textContent = carModel;

  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  calculateTotalPrice();
};

const closeForm = () => {
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
};

const overlayClick = (event) => {
  if (!formContainer.contains(event.target)) {
    closeForm();
  }
};

const startDateChange = () => {
  const selectedStartDate = new Date(startDateInput.value);
  const minEndDate = new Date(selectedStartDate);
  minEndDate.setDate(selectedStartDate.getDate() + 1);

  const minDateString = minEndDate.toISOString().split("T")[0];
  endDateInput.min = minDateString;

  if (new Date(endDateInput.value) < minEndDate) {
    endDateInput.value = minDateString;
  }

  calculateTotalPrice();
};

const endDateChange = () => {
  calculateTotalPrice();
};

const addonChange = () => {
  calculateTotalPrice();
};

const formSubmit = (event) => {
  event.preventDefault();
  submitMessage.classList.remove("hidden");
  form.classList.add("hidden");
};

const returnButtonClick = () => {
  closeForm();
};

const addEventListeners = () => {
  btnForm.forEach((btn) => {
    btn.addEventListener("click", openForm);
  });

  closeIcon.addEventListener("click", closeForm);
  overlay.addEventListener("click", overlayClick);

  startDateInput.addEventListener("change", startDateChange);
  endDateInput.addEventListener("change", endDateChange);

  addonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", addonChange);
  });

  formContainer.addEventListener("submit", formSubmit);
  returnButton.addEventListener("click", returnButtonClick);
};

document.addEventListener("DOMContentLoaded", () => {
  setTomorrowAsMinDate(startDateInput);
  setTomorrowAsMinDate(endDateInput, true);
  addEventListeners();
});

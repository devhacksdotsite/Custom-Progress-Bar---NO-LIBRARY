// cache DOM
const form = document.querySelector(".form");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const progressBar = document.querySelector(".custom-progress-bar");
const computedStyle = getComputedStyle(progressBar);
let computedWidth = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
const TOTAL_WIDTH_PERC = 100;

// increment progress
const incrementProgress = (el) => {
  var el = document.getElementById(el);

  if (el.getAttribute("data-progress-toggle") == "0") {
    let increment = TOTAL_WIDTH_PERC / form.elements.length;
    computedWidth += increment;
    progressBar.style.setProperty("--width", computedWidth);

    progressBar.setAttribute("data-label", `${computedWidth}%`);
  }

  el.setAttribute("data-progress-toggle", 1);
};

// decrement progress
const decrementProgress = (el) => {
  var el = document.getElementById(el);

  if (el.getAttribute("data-progress-toggle") == "1") {
    let decrement = TOTAL_WIDTH_PERC / form.elements.length;
    computedWidth -= decrement;
    progressBar.style.setProperty("--width", computedWidth);

    progressBar.setAttribute("data-label", `${computedWidth}%`);
  }

  el.setAttribute("data-progress-toggle", 0);
};

const validate = (el, val) => {
  switch (el) {
    case "name":
      if (val.length > 2) {
        name.setAttribute("data-valid", 1);
        incrementProgress(el);
      } else {
        name.setAttribute("data-valid", 0);
        decrementProgress(el);
      }
      break;
    case "lastname":
      if (val.length > 2) {
        lastname.setAttribute("data-valid", 1);
        incrementProgress(el);
      } else {
        lastname.setAttribute("data-valid", 0);
        decrementProgress(el);
      }
      break;
    case "email":
      regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (regex.test(val)) {
        email.setAttribute("data-valid", 1);
        incrementProgress(el);
      } else {
        email.setAttribute("data-valid", 0);
        decrementProgress(el);
      }
      break;
  }
};

// event handlers
name.addEventListener("blur", (e) => {
  validate(e.target.id, e.target.value);
});

lastname.addEventListener("blur", (e) => {
  validate(e.target.id, e.target.value);
});

email.addEventListener("blur", (e) => {
  validate(e.target.id, e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // quick check if all fields filled correctly
  if (
    parseInt(name.getAttribute("data-valid")) &&
    parseInt(lastname.getAttribute("data-valid")) &&
    parseInt(email.getAttribute("data-valid"))
  ) {
    alert("VALID! Regurally I would do something now but I'm not gonna!");
  } else {
    alert("OOF! You didn't fill in all the fields correctly, GOOBER!");
  }
});

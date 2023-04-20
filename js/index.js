"use strict";
const $ = document.querySelector.bind(document);

const quiz = $(".quiz");

const btnNext = $(".quiz-content_btn");
const processing = $(".processing");
const result = $(".result");
const quizList = $(".quiz-list");
const colors = $(".quiz-color");
const colorsRow = $(".color-row");
let colorSelected;
let questionCount = 0;
let countdownTime = 600000;
let timerElement = document.getElementById("timer");

showQuestions(questionCount);

function showQuestions(index) {
  const title = $(".quiz-title");

  title.innerHTML = `${questions[index].question}`;
  quizList.innerHTML = "";
  resetButtonState();

  questions[index].options.forEach((item) => {
    quizList.insertAdjacentHTML(
      "beforeend",
      item === "isColor" ? showColorsQuestion() : createQuestionBlock(item)
    );
  });

  updateProgressLine(index);
}

function createQuestionBlock(item) {
  hideColorsQuestion();
  return `<li class='quiz-option'>
  <input class="quiz-option_radio"  onclick="updateButtonState()" type="radio" name="answear"/>
  ${item}
  </li>`;
}

function showColorsQuestion() {
  quizList.classList.add("hidden");

  colors.classList.remove("hidden");
  colorsRow.classList.remove("hidden");
}

function hideColorsQuestion() {
  quizList.classList.remove("hidden");

  colors.classList.add("hidden");
  colorsRow.classList.add("hidden");
}

function updateButtonState() {
  btnNext.style.backgroundColor = "#ffc404";
  btnNext.disabled = false;
}

function resetButtonState() {
  btnNext.style.backgroundColor = "";
  btnNext.disabled = true;
}

function addBorderColors(elem) {
  if (!colorSelected) {
    elem.style.borderColor = "#ffc404";
    elem.style.border = "solid 10px #ffc404";
    colorSelected = elem;
  }
  updateButtonState();
}

function resetBorderColors() {
  if (colorSelected) {
    colorSelected.style.borderColor = "";
    colorSelected.style.border = "";
    colorSelected = null;
  }
}

function updateProgressLine(index) {
  let progress = $(".quiz-progress_inner");

  progress.style.width = `${Math.round(
    ((index + 1) / questions.length) * 100
  )}%`;
}

function nextQuestion() {
  if (questionCount == questions.length - 1) {
    processing.classList.remove("hidden");
    quiz.classList.add("hidden");

    setTimeout(() => {
      processing.classList.add("hidden");
      result.classList.remove("hidden");
    }, 4000);
    return;
  }

  questionCount++;
  resetBorderColors();
  showQuestions(questionCount);
}

function updateTimer() {
  let minutes = Math.floor(countdownTime / 60000);
  let seconds = Math.floor((countdownTime % 60000) / 1000);

  let timeLeft = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  timerElement.textContent = timeLeft;

  countdownTime -= 1000;

  if (countdownTime < 0) {
    clearInterval(timerInterval);
    timerElement.textContent = "Час вийшов!";
  }
}

let timerInterval = setInterval(function () {
  if (!result.classList.contains("hidden")) {
    updateTimer();
  }
}, 1000);

async function showFetchData() {
  const personDataDiv = document.getElementById("person-data");
  const url = "https://swapi.dev/api/people/1/";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const html = `
      <h2>${data.name}</h2>
      <p><strong>Рост:</strong> ${data.height} см</p>
      <p><strong>Вес:</strong> ${data.mass} кг</p>
      <p><strong>Цвет кожи:</strong> ${data.skin_color}</p>
      <p><strong>Цвет волос:</strong> ${data.hair_color}</p>
      <p><strong>Цвет глаз:</strong> ${data.eye_color}</p>
    `;

    personDataDiv.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function showBurgerMenu() {
  const menu = $(".menu");
  const menuClose = $(".menu-close");
  const info = $(".menu-item_text_info");
  const test = $(".menu-item_text_test");
  const goToTest = $(".quiz-detail_page_btn");
  const goToTestLastPage = $(".quize-detail_last_page_btn");
  const goToMenu = $(".quiz-header_open");
  const quizInfo = $(".quiz-detail");

  menu.classList.remove("hidden");
  quiz.classList.add("hidden");

  info.addEventListener("click", () => {
    menu.classList.add("hidden");
    quizInfo.classList.remove("hidden");
  });

  test.addEventListener("click", () => {
    menu.classList.add("hidden");
    quiz.classList.remove("hidden");
  });

  menuClose.addEventListener("click", () => {
    menu.classList.add("hidden");
    quizInfo.classList.remove("hidden");
  });

  goToTest.addEventListener("click", () => {
    quizInfo.classList.add("hidden");
    quiz.classList.remove("hidden");
  });

  goToTestLastPage.addEventListener("click", () => {
    quizInfo.classList.add("hidden");
    quiz.classList.remove("hidden");
  });

  goToMenu.addEventListener("click", () => {
    quiz.classList.add("hidden");
    menu.classList.remove("hidden");
  });
}
showBurgerMenu();

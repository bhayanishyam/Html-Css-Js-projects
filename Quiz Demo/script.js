let que_tag = document.getElementById("question");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
let optionList = document.getElementById("optionsList");
let next = document.getElementById("next");
let pre = document.getElementById("pre");
let quizLength = document.getElementById("quizLength");
let currentQuestion = document.getElementById("questionNumber");
let time = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
let result = document.querySelector(".result");
let scoreDisplay = document.querySelector("#score");
let congrs = document.querySelector(".congrs");
let restart = document.querySelector(".restart");
let start = document.querySelector(".start");
let container = document.querySelector(".container");

let answer = [];

start.addEventListener("click", ()=> {
  start.classList.add("hide");
  container.classList.remove("hide");

})

let questions = {
  question1: {
    question: "HTML stands for -",
    options: [
      "HighText Machine Language",
      "HyperText and links Markup Language",
      "HyperText Markup Language",
      "None of these",
    ],
    answer: "HyperText Markup Language",
  },

  question2: {
    question:
      "Which of the following element is responsible for making the text bold in HTML?",
    options: ["pre", "a", "b", "br"],
    answer: "b",
  },

  question3: {
    question:
      "Which of the following tag is used for inserting the largest heading in HTML?",
    options: ["h3", "h1", "h5", "h6"],
    answer: "h1",
  },

  question4: {
    question:
      "Which of the following tag is used to insert a line-break in HTML?",
    options: ["br", "a", "pre", "b"],
    answer: "br",
  },

  question5: {
    question:
      "Which of the following element is responsible for making the text italic in HTML?",
    options: ["i", "italic", "it", "pre"],
    answer: "i",
  },
};

let que_obj = JSON.stringify(questions);
let list = JSON.parse(que_obj);
let score = 0;
let length = 0;
let second = 59;
let min = 9;

for (let i in list) {
  length++;
  answer.push(false);
}

quizLength.innerText = length;

time.innerText = second;
minutes.innerText = min;
let timer = setInterval(() => {
  if (second !== 0) {
    second--;
    time.innerText = second;
  } else {
    if (min !== 0) {
      min--;
      time.innerText = second;
      second = 59;
      minutes.innerText = min;
    } else {
      clearTimeout(timer);
      showResult();
    }
  }
}, 1000);

function nextQuestion(current = 1) {
  let n = 0;
  if (current == 1) {
    n = 1;
  } else {
    n = current;
  }

  if (n <= length) {
    removeClass();
    que_tag.innerText = list[`question${n}`].question;
    option1.innerHTML = list[`question${n}`].options[0];
    option2.innerHTML = list[`question${n}`].options[1];
    option3.innerHTML = list[`question${n}`].options[2];
    option4.innerHTML = list[`question${n}`].options[3];
    currentQuestion.innerText = current;
  } else {
    showResult();
    // clearTimeout(timer);
  }
}

next.addEventListener("click", () => {
  nextQuestion(Number(currentQuestion.innerText) + 1);
});

pre.addEventListener("click", () => {
  nextQuestion(Number(currentQuestion.innerText) - 1);
});

document.getElementById("optionsList").addEventListener("click", (e) => {
  removeClass();
  if (e.target.tagName === "LI") {
    if (
      e.target.innerText === list[`question${currentQuestion.innerText}`].answer
    ) {
      answer[Number(currentQuestion.innerText) - 1] = true;
    } else {
      answer[Number(currentQuestion.innerText) - 1] = false;
    }
    e.target.classList.add("selected");
    saveData();
  }
});

function removeClass() {
  option1.classList.remove("selected");
  option2.classList.remove("selected");
  option3.classList.remove("selected");
  option4.classList.remove("selected");
}

let showResult = () => {
  container.classList.add("hide");

  answer.forEach((value) => (value ? score++ : 0));
  scoreDisplay.innerHTML = score;

  if (localStorage.getItem("heightScore") < score) {
    congrs.classList.remove("hide");
  } else {
    congrs.classList.add("hide");
  }

  localStorage.setItem("heightScore", score);

  result.classList.remove("hide");
};

restart.addEventListener('click',() => {
  location.reload();
});

nextQuestion();

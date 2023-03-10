//required variables
const timeLeft = document.querySelector(".time-left");
const quizContainer = document.getElementById("container");
const nextBtn = document.getElementById("next-button");
const countOfQuestion = document.querySelector(".number-of-question");
const displayContainer = document.getElementById("display-container");
const scoreContainer = document.querySelector(".score-container");
const restart = document.getElementById("restart");
const userScore = document.getElementById("user-score");
const startScreen = document.querySelector(".start-screen");
const startButton = document.getElementById("start-button");
let questionCount = 0;
let scoreCount = 0;
let count = 11;
let countdown;

//questions and options
const quizArray = [
  {
    id: "0",
    question: "Which is the only continent in the world without a desert?",
    options: ["North America", "Asia", "Africa", "Europe"],
    correct: ["Europe"],
  },
  {
    id: "1",
    question: "What is the capital of France?",
    options: ["New York", "London", "Dublin", "Paris"],
    correct: ["Paris"],
  },
  {
    id: "2",
    question: "What is the longest river in the world?",
    options: ["Nile", "Yangtze", "Mississippi", "Amazon"],
    correct: ["Nile"],
  },
  {
    id: "3",
    question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Mandarin", "English", "German"],
    correct: ["Mandarin"],
  },
  {
    id: "4",
    question: "What is the capital of Canada?",
    options: ["Ottawa", "Toronto", "Vancouver", "Edmonton"],
    correct: ["Ottawa"],
  },
  {
    id: "5",
    question: "What is not a programming language?",
    options: ["JavaScript", "C++", "HTML", "Kotlin"],
    correct: ["HTML"],
  },
  {
    id: "6",
    question: "What year was JavaScript launched",
    options: ["1996", "1995", "1994", "2000"],
    correct: ["1995"],
  },
  {
    id: "7",
    question: "Which of these characters are friends with Harry Potter?",
    options: [
      "Ron Weasley",
      "Draco Malfoy",
      "Hermione Granger",
      "Bellatrix Lestrange",
    ],
    correct: ["Ron Weasley", "Hermione Granger"],
  },
  {
    id: "8",
    question: "Which rivers flow through Egypt?",
    options: ["Nile", "Amazon", "Yangtze", "Congo"],
    correct: ["Nile", "Congo"],
  },
  {
    id: "9",
    question: "What are the types of computer memory?",
    options: ["RAM", "ROM", "Hard Drive", "Flash"],
    correct: ["RAM", "ROM"],
  },
  {
    id: "10",
    question: "What are the four basic operations of arithmetic",
    options: ["Addition", " Subtraction", "Modulo", "Factorial"],
    correct: ["Addition", " Subtraction"],
  },
  {
    id: "11",
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Titian"],
    correct: ["Leonardo da Vinci"],
  },
  {
    id: "12",
    question:
      "What are the fundamental units of measurement in the International System of Units (SI)?",
    options: ["Meter", "Kilogram", "Second", "Ampere"],
    correct: ["Meter", " Kilogram"],
  },
  {
    id: "13",
    question: "What are the five senses?",
    options: ["Touch", "Hearing", "Sight", "Smell"],
    correct: ["Hearing", " Sight"],
  },
  {
    id: "14",
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Al", "Ar"],
    correct: ["Au"],
  },
];

//restart
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//next button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    nextBtn.disabled = true;
    //increment questionCount
    questionCount++;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (quizArray[questionCount].correct.includes(userSolution)) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
  nextBtn.disabled = false;
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
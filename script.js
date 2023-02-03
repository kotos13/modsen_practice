//required variables
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
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
    question:
      "Who are the members of the Avengers in the Marvel Cinematic Universe?",
    options: [
      "Iron Man, Captain America, Thor, Hulk, Hawkeye, Black Widow",
      "Spider-Man, Doctor Strange, Ant-Man, Captain Marvel, Black Panther",
      "Guardians of the Galaxy (Star-Lord, Rocket Raccoon, Gamora, Drax, Groot)",
      "X-Men (Wolverine, Rogue, Cyclops, Jean Grey, Storm, Nightcrawler)",
    ],
    correct: [
      "Iron Man, Captain America, Thor, Hulk, Hawkeye, Black Widow",
      "Spider-Man, Doctor Strange, Ant-Man, Captain Marvel, Black Panther",
    ],
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

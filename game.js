const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById('progressBarFull')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [
{
    question: "What is The Weeknd's real name?",
    choice1: "Navraj Singh Goraya",
    choice2: "Abel Makkonen Tesfaye",
    choice3: "Aubrey Drake Graham",
    choice4: "Jacques Bermon Webster II,",
    answer: 2
},
{
    question:
    "What is The Weeknd's brand or label?",
    choice1: "OVO",
    choice2: "XO",
    choice3: "YSL",
    choice4: "RICH FOREVER",
    answer: 2
},
{
    question:
    "Which album came out in 2016 by The Weeknd?",
    choice1: "Dawn FM",
    choice2: "After Hours",
    choice3: "Beauty Behind The Madness",
    choice4: "Starboy",
    answer: 4
},
{
    question:
    "What 3 mixtapes is Trilogy composed of?",
    choice1: "Darkness, Material Girl, My Dear Melancholy",
    choice2: "Try Me, Too Late, Wanderlust",
    choice3: "Echoes of Silence, Thursday, House of Balloons",
    choice4: "Angel, Reminder, Die For You",
    answer: 3
},
{
    question:
    "Who is the guest narrator of Dawn FM?",
    choice1: "Morgan Freeman",
    choice2: "Jim Carrey",
    choice3: "Aubrey Graham",
    choice4: "Kanye West",
    answer: 2
},
{
    question: " What is The Weeknd's most famous song?",
    choice1: "Blinding Lights",
    choice2: "The Hills",
    choice3: "Kissland",
    choice4: "Sacrifice",
    answer: 1
}

];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
questionCounter = 0;
score = 0;
availableQuesions = [...questions];
getNewQuestion();
};

getNewQuestion = () => {
if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("end.html");
}
questionCounter++;
progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

const questionIndex = Math.floor(Math.random() * availableQuesions.length);
currentQuestion = availableQuesions[questionIndex];
question.innerText = currentQuestion.question;

choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
});

availableQuesions.splice(questionIndex, 1);
acceptingAnswers = true;
};

choices.forEach(choice => {
choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
    incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
    }, 1000);
});
});

incrementScore = num => {
score += num;
scoreText.innerText = score;
};

startGame();
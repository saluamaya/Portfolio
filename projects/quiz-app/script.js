const questions = [
  {
    question: "What color is the sky on a clear day?",
    answers: [
      { text: "Blue", correct: true },
      { text: "Green", correct: false },
      { text: "Red", correct: false },
      { text: "Yellow", correct: false },
    ],
  },
  {
    question: "How many legs does a spider have?",
    answers: [
      { text: "8", correct: true },
      { text: "6", correct: false },
      { text: "10", correct: false },
      { text: "4", correct: false },
    ],
  },
  {
    question: "Which fruit is yellow and curved?",
    answers: [
      { text: "Banana", correct: true },
      { text: "Apple", correct: false },
      { text: "Orange", correct: false },
      { text: "Grapes", correct: false },
    ],
  },
  {
    question: "What do bees produce?",
    answers: [
      { text: "Honey", correct: true },
      { text: "Milk", correct: false },
      { text: "Bread", correct: false },
      { text: "Juice", correct: false },
    ],
  },
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add('hide');
  questionContainer.classList.remove('hide');
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  const shuffledAnswers = currentQuestion.answers
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  shuffledAnswers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = 'true';
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';

  if (correct) score++;

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  questionContainer.classList.add('hide');
  resultContainer.classList.remove('hide');
  scoreElement.textContent = score;
  totalElement.textContent = questions.length;

  if (score === questions.length) {
    const congrats = document.createElement('p');
    congrats.textContent = "🎉 Congratulations! You got a perfect score!";
    congrats.style.color = "#28a745";
    congrats.style.fontWeight = "bold";
    congrats.style.marginTop = "10px";
    resultContainer.appendChild(congrats);
  }
}


restartButton.addEventListener('click', startQuiz);

startQuiz();

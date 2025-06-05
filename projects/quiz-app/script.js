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
const progressBar = document.getElementById('progress-bar');

let currentQuestionIndex = 0;
let score = 0;

let countdown;
let timeLeft = 10;
let timerDisplay;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add('hide');
  questionContainer.classList.remove('hide');

  if (!document.getElementById('timer')) {
    timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.style.fontWeight = 'bold';
    timerDisplay.style.marginBottom = '10px';
    timerDisplay.style.color = '#555';
    questionContainer.prepend(timerDisplay);
  } else {
    timerDisplay = document.getElementById('timer');
  }

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

  startTimer();
}

function resetState() {
  clearInterval(countdown);
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  if (timerDisplay) timerDisplay.textContent = '';
  updateProgressBar();
}

function selectAnswer(e) {
  clearInterval(countdown);
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

  const savedHighScore = localStorage.getItem('highScore') || 0;

  if (score > savedHighScore) {
    localStorage.setItem('highScore', score);
  }

  document.getElementById('best-score').textContent = Math.max(score, savedHighScore);

  const previousMessage = document.getElementById('custom-message');
  if (previousMessage) previousMessage.remove();

  const message = document.createElement('p');
  message.id = 'custom-message';
  message.style.marginTop = '10px';

  if (score === questions.length) {
    message.textContent = "🎉 Perfect! You're a genius!";
    message.style.color = "#28a745";
  } else if (score >= questions.length / 2) {
    message.textContent = "👍 Good job! Keep practicing.";
    message.style.color = "#007acc";
  } else {
    message.textContent = "📘 Keep trying! You'll get there.";
    message.style.color = "#dc3545";
  }

  resultContainer.appendChild(message);
}

function startTimer() {
  timeLeft = 10;
  updateTimerDisplay();
  updateProgressBar();

  clearInterval(countdown);
  countdown = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    updateProgressBar();

    if (timeLeft <= 0) {
      clearInterval(countdown);
      handleTimeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  if (timerDisplay) {
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
  }
}

function updateProgressBar() {
  if (progressBar) {
    progressBar.style.width = `${(timeLeft / 10) * 100}%`;
  }
}

function handleTimeUp() {
  disableAnswers();
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function disableAnswers() {
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
    }
  });
}

restartButton.addEventListener('click', startQuiz);

startQuiz();

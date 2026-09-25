// MHCET 2027 Practice Portal
// Main JavaScript file

let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 20 * 60;
let timerInterval;

// Start the practice exam
function startExam() {
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  timeLeft = 20 * 60;

  document.getElementById("home").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  document.getElementById("exam").style.display = "block";
  document.getElementById("result").style.display = "none";

  createNumberButtons();
  showQuestion();
  startTimer();
}

// Show current question
function showQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("questionNumber").textContent =
    `Question ${currentQuestion + 1}`;

  document.getElementById("subjectName").textContent = q.subject;

  document.getElementById("questionText").textContent = q.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "option";
    button.textContent = option;

    if (userAnswers[currentQuestion] === index) {
      button.classList.add("selected");
    }

    button.onclick = function () {
      userAnswers[currentQuestion] = index;
      showQuestion();
      updateNumberButtons();
    };

    optionsContainer.appendChild(button);
  });

  updateNumberButtons();
}

// Next question
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

// Previous question
function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

// Create question number buttons
function createNumberButtons() {
  const container = document.getElementById("questionNumbers");

  if (!container) return;

  container.innerHTML = "";

  questions.forEach((q, index) => {
    const button = document.createElement("button");

    button.textContent = index + 1;

    button.onclick = function () {
      currentQuestion = index;
      showQuestion();
    };

    container.appendChild(button);
  });
}

// Update question number buttons
function updateNumberButtons() {
  const buttons = document.querySelectorAll("#questionNumbers button");

  buttons.forEach((button, index) => {
    button.classList.remove("current", "answered");

    if (index === currentQuestion) {
      button.classList.add("current");
    }

    if (userAnswers[index] !== null) {
      button.classList.add("answered");
    }
  });
}

// Timer
function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(function () {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const timer = document.getElementById("timer");

    if (timer) {
      timer.textContent =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitTest();
    }
  }, 1000);
}

// Submit test
function submitTest() {
  clearInterval(timerInterval);

  let score = 0;
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === null) {
      unanswered++;
    } else if (userAnswers[index] === q.answer) {
      correct++;
      score++;
    } else {
      wrong++;
    }
  });

  document.getElementById("exam").style.display = "none";
  document.getElementById("result").style.display = "block";

  document.getElementById("score").textContent =
    `${score} / ${questions.length}`;

  document.getElementById("correct").textContent = correct;
  document.getElementById("wrong").textContent = wrong;
  document.getElementById("unanswered").textContent = unanswered;

  showReview();
}

// Show answer review
function showReview() {
  const reviewContainer = document.getElementById("review");

  if (!reviewContainer) return;

  reviewContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");

    let status = "";

    if (userAnswers[index] === null) {
      status = "Unanswered";
    } else if (userAnswers[index] === q.answer) {
      status = "Correct";
    } else {
      status = "Wrong";
    }

    div.innerHTML = `
      <strong>Q${index + 1}:</strong> ${status}
    `;

    reviewContainer.appendChild(div);
  });
}

// Return to homepage
function goHome() {
  clearInterval(timerInterval);

  document.getElementById("home").style.display = "block";
  document.getElementById("instructions").style.display = "none";
  document.getElementById("exam").style.display = "none";
  document.getElementById("result").style.display = "none";
}

// Show instructions
function showInstructions() {
  document.getElementById("home").style.display = "none";
  document.getElementById("instructions").style.display = "block";
  document.getElementById("exam").style.display = "none";
  document.getElementById("result").style.display = "none";
}

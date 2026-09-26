// =====================================================
// MHT-CET 2027 PRACTICE PORTAL
// Complete app.js
// Works with the provided index.html + questions.js
// =====================================================


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let selectedSubject = "";
let selectedChapter = "";

let practiceQuestions = [];
let currentPracticeIndex = 0;
let practiceAnswered = [];

let examQuestions = [];
let examAnswers = [];
let currentQuestionIndex = 0;

let timerInterval = null;
let timeLeft = 20 * 60;

let examSubmitted = false;


// =====================================================
// STATISTICS
// =====================================================

let stats = JSON.parse(
  localStorage.getItem("mhtcetStats")
) || {
  attempted: 0,
  correct: 0,
  wrong: 0,
  testsCompleted: 0,
  studyStreak: 0,
  lastStudyDate: null
};


// =====================================================
// START APP
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

  updateDashboard();

});


// =====================================================
// SAVE STATISTICS
// =====================================================

function saveStats() {

  localStorage.setItem(
    "mhtcetStats",
    JSON.stringify(stats)
  );

}


// =====================================================
// UPDATE DASHBOARD
// =====================================================

function updateDashboard() {

  const attempted =
    document.getElementById("questionsAttempted");

  const tests =
    document.getElementById("testsCompleted");

  const accuracy =
    document.getElementById("accuracy");

  const streak =
    document.getElementById("studyStreak");


  if (attempted) {
    attempted.innerText = stats.attempted;
  }

  if (tests) {
    tests.innerText = stats.testsCompleted;
  }


  let accuracyValue = 0;

  if (stats.attempted > 0) {

    accuracyValue =
      Math.round(
        (stats.correct / stats.attempted) * 100
      );

  }


  if (accuracy) {
    accuracy.innerText =
      accuracyValue + "%";
  }


  if (streak) {
    streak.innerText =
      stats.studyStreak + " Days";
  }

}


// =====================================================
// STUDY STREAK
// =====================================================

function updateStudyStreak() {

  const today =
    new Date().toISOString().split("T")[0];


  if (stats.lastStudyDate === today) {
    return;
  }


  if (stats.lastStudyDate) {

    const lastDate =
      new Date(stats.lastStudyDate);

    const todayDate =
      new Date(today);

    const difference =
      Math.floor(
        (todayDate - lastDate) /
        (1000 * 60 * 60 * 24)
      );


    if (difference === 1) {

      stats.studyStreak++;

    } else if (difference > 1) {

      stats.studyStreak = 1;

    }

  } else {

    stats.studyStreak = 1;

  }


  stats.lastStudyDate = today;

  saveStats();

}


// =====================================================
// SHOW SECTION
// =====================================================

function showSection(sectionId) {

  const sections = [
    "home",
    "practice",
    "instructions",
    "exam",
    "result"
  ];


  sections.forEach(function (id) {

    const section =
      document.getElementById(id);

    if (section) {

      section.style.display =
        id === sectionId
          ? "block"
          : "none";

    }

  });

}


// =====================================================
// GO HOME / DASHBOARD
// =====================================================

function goHome() {

  clearInterval(timerInterval);

  showSection("home");

  updateDashboard();

}


// =====================================================
// PRACTICE HOME
// =====================================================

function showPractice() {

  clearInterval(timerInterval);

  showSection("practice");


  const practiceSubjects =
    document.getElementById("practiceSubjects");

  const chapterSection =
    document.getElementById("chapterSection");

  const practiceQuestion =
    document.getElementById("practiceQuestion");


  if (practiceSubjects) {
    practiceSubjects.style.display = "block";
  }

  if (chapterSection) {
    chapterSection.style.display = "none";
  }

  if (practiceQuestion) {
    practiceQuestion.style.display = "none";
  }


  selectedSubject = "";
  selectedChapter = "";

}


// =====================================================
// SELECT SUBJECT
// =====================================================

function selectSubject(subject) {

  selectedSubject = subject;


  const practiceSubjects =
    document.getElementById("practiceSubjects");

  const chapterSection =
    document.getElementById("chapterSection");

  const selectedSubjectElement =
    document.getElementById("selectedSubject");

  const chapterList =
    document.getElementById("chapterList");


  if (practiceSubjects) {
    practiceSubjects.style.display = "none";
  }

  if (chapterSection) {
    chapterSection.style.display = "block";
  }


  if (selectedSubjectElement) {

    selectedSubjectElement.innerText =
      subject + " Chapters";

  }


  const subjectQuestions =
    questions.filter(function (q) {

      return q.subject === subject;

    });


  const chapters = [
    ...new Set(
      subjectQuestions.map(function (q) {
        return q.chapter;
      })
    )
  ];


  chapterList.innerHTML = "";


  if (chapters.length === 0) {

    chapterList.innerHTML =
      "<p>No chapters available.</p>";

    return;

  }


  chapters.forEach(function (chapter) {

    const chapterQuestions =
      subjectQuestions.filter(function (q) {

        return q.chapter === chapter;

      });


    const button =
      document.createElement("button");


    button.className = "btn";

    button.style.margin = "6px";

    button.style.display = "block";

    button.style.width = "100%";

    button.style.textAlign = "left";


    button.innerHTML =
      "📖 " +
      chapter +
      " — " +
      chapterQuestions.length +
      " Question" +
      (chapterQuestions.length !== 1 ? "s" : "");


    button.onclick = function () {

      startChapterPractice(chapter);

    };


    chapterList.appendChild(button);

  });

}


// =====================================================
// BACK TO SUBJECTS
// =====================================================

function backToSubjects() {

  const practiceSubjects =
    document.getElementById("practiceSubjects");

  const chapterSection =
    document.getElementById("chapterSection");

  const practiceQuestion =
    document.getElementById("practiceQuestion");


  practiceSubjects.style.display = "block";

  chapterSection.style.display = "none";

  practiceQuestion.style.display = "none";


  selectedSubject = "";

  selectedChapter = "";

}


// =====================================================
// START CHAPTER PRACTICE
// =====================================================

function startChapterPractice(chapter) {

  selectedChapter = chapter;


  practiceQuestions =
    questions.filter(function (q) {

      return (
        q.subject === selectedSubject &&
        q.chapter === selectedChapter
      );

    });


  if (practiceQuestions.length === 0) {

    alert("No questions found for this chapter.");

    return;

  }


  currentPracticeIndex = 0;

  practiceAnswered =
    new Array(practiceQuestions.length).fill(null);


  document.getElementById(
    "practiceSubjects"
  ).style.display = "none";


  document.getElementById(
    "chapterSection"
  ).style.display = "none";


  document.getElementById(
    "practiceQuestion"
  ).style.display = "block";


  updateStudyStreak();

  renderPracticeQuestion();

}


// =====================================================
// RENDER PRACTICE QUESTION
// =====================================================

function renderPracticeQuestion() {

  const q =
    practiceQuestions[currentPracticeIndex];


  document.getElementById(
    "practiceQuestionNumber"
  ).innerText =
    "Question " +
    (currentPracticeIndex + 1) +
    " / " +
    practiceQuestions.length;


  document.getElementById(
    "practiceChapter"
  ).innerText =
    q.chapter;


  document.getElementById(
    "practiceQuestionText"
  ).innerText =
    q.question;


  const optionsContainer =
    document.getElementById("practiceOptions");


  optionsContainer.innerHTML = "";


  q.options.forEach(function (option, index) {

    const button =
      document.createElement("button");


    button.className = "btn";

    button.style.display = "block";

    button.style.width = "100%";

    button.style.textAlign = "left";

    button.style.marginBottom = "10px";


    button.innerText =
      String.fromCharCode(65 + index) +
      ". " +
      option;


    button.onclick = function () {

      answerPracticeQuestion(index);

    };


    optionsContainer.appendChild(button);

  });


  const feedback =
    document.getElementById("practiceFeedback");


  feedback.style.display = "none";

  feedback.innerHTML = "";


  // If already answered, show the previous answer
  if (practiceAnswered[currentPracticeIndex] !== null) {

    showPracticeAnswer(
      practiceAnswered[currentPracticeIndex]
    );

  }

}


// =====================================================
// ANSWER PRACTICE QUESTION
// =====================================================

function answerPracticeQuestion(selectedAnswer) {

  // Prevent answering same question twice
  if (
    practiceAnswered[currentPracticeIndex] !== null
  ) {
    return;
  }


  practiceAnswered[currentPracticeIndex] =
    selectedAnswer;


  const q =
    practiceQuestions[currentPracticeIndex];


  const isCorrect =
    selectedAnswer === q.answer;


  // Update statistics
  stats.attempted++;


  if (isCorrect) {

    stats.correct++;

  } else {

    stats.wrong++;

  }


  updateStudyStreak();

  saveStats();

  updateDashboard();


  showPracticeAnswer(selectedAnswer);

}


// =====================================================
// SHOW PRACTICE ANSWER
// =====================================================

function showPracticeAnswer(selectedAnswer) {

  const q =
    practiceQuestions[currentPracticeIndex];


  const feedback =
    document.getElementById("practiceFeedback");


  const buttons =
    document.querySelectorAll(
      "#practiceOptions button"
    );


  buttons.forEach(function (button, index) {

    button.disabled = true;


    if (index === q.answer) {

      button.style.border =
        "2px solid green";

    }


    if (
      index === selectedAnswer &&
      selectedAnswer !== q.answer
    ) {

      button.style.border =
        "2px solid red";

    }

  });


  if (selectedAnswer === q.answer) {

    feedback.style.display = "block";

    feedback.style.background =
      "#dff6e4";

    feedback.style.color =
      "#176b2c";


    feedback.innerHTML =

      "<strong>✅ Correct!</strong>" +
      "<p>" +
      q.explanation +
      "</p>";

  } else {

    feedback.style.display = "block";

    feedback.style.background =
      "#ffe2e2";

    feedback.style.color =
      "#a00000";


    feedback.innerHTML =

      "<strong>❌ Wrong!</strong>" +

      "<p><strong>Correct Answer:</strong> " +
      q.options[q.answer] +
      "</p>" +

      "<p>" +
      q.explanation +
      "</p>";

  }

}


// =====================================================
// NEXT PRACTICE QUESTION
// =====================================================

function nextPracticeQuestion() {

  if (
    currentPracticeIndex <
    practiceQuestions.length - 1
  ) {

    currentPracticeIndex++;

    renderPracticeQuestion();

  } else {

    alert(
      "🎉 You completed this chapter!"
    );

  }

}


// =====================================================
// PREVIOUS PRACTICE QUESTION
// =====================================================

function previousPracticeQuestion() {

  if (currentPracticeIndex > 0) {

    currentPracticeIndex--;

    renderPracticeQuestion();

  }

}


// =====================================================
// BACK TO CHAPTERS
// =====================================================

function backToChapters() {

  document.getElementById(
    "practiceSubjects"
  ).style.display = "none";


  document.getElementById(
    "chapterSection"
  ).style.display = "block";


  document.getElementById(
    "practiceQuestion"
  ).style.display = "none";


  selectSubject(selectedSubject);

}


// =====================================================
// MOCK TEST INSTRUCTIONS
// =====================================================

function showInstructions() {

  clearInterval(timerInterval);

  showSection("instructions");

}


// =====================================================
// START MOCK TEST
// =====================================================

function startExam() {

  clearInterval(timerInterval);


  // Randomly select 10 questions
  examQuestions =
    [...questions]
      .sort(function () {
        return Math.random() - 0.5;
      })
      .slice(0, 10);


  examAnswers =
    new Array(examQuestions.length).fill(null);


  currentQuestionIndex = 0;

  examSubmitted = false;

  timeLeft = 20 * 60;


  updateStudyStreak();


  showSection("exam");


  renderExamQuestion();

  renderQuestionNumbers();

  startTimer();

}


// =====================================================
// RENDER EXAM QUESTION
// =====================================================

function renderExamQuestion() {

  const q =
    examQuestions[currentQuestionIndex];


  document.getElementById(
    "questionNumber"
  ).innerText =

    "Question " +
    (currentQuestionIndex + 1) +
    " / " +
    examQuestions.length;


  document.getElementById(
    "subjectName"
  ).innerText =
    q.subject;


  document.getElementById(
    "questionText"
  ).innerText =
    q.question;


  const optionsContainer =
    document.getElementById("options");


  optionsContainer.innerHTML = "";


  q.options.forEach(function (option, index) {

    const button =
      document.createElement("button");


    button.className = "btn";

    button.style.display = "block";

    button.style.width = "100%";

    button.style.textAlign = "left";

    button.style.marginBottom = "10px";


    button.innerText =
      String.fromCharCode(65 + index) +
      ". " +
      option;


    if (
      examAnswers[currentQuestionIndex] ===
      index
    ) {

      button.style.border =
        "2px solid #333";

      button.style.fontWeight =
        "bold";

    }


    button.onclick = function () {

      selectExamAnswer(index);

    };


    optionsContainer.appendChild(button);

  });


  renderQuestionNumbers();

}


// =====================================================
// SELECT EXAM ANSWER
// =====================================================

function selectExamAnswer(index) {

  if (examSubmitted) {
    return;
  }


  examAnswers[currentQuestionIndex] =
    index;


  renderExamQuestion();

}


// =====================================================
// QUESTION NUMBERS
// =====================================================

function renderQuestionNumbers() {

  const container =
    document.getElementById(
      "questionNumbers"
    );


  if (!container) {
    return;
  }


  container.innerHTML = "";


  examQuestions.forEach(function (q, index) {

    const button =
      document.createElement("button");


    button.innerText =
      index + 1;


    button.style.padding =
      "8px 12px";

    button.style.cursor =
      "pointer";

    button.style.borderRadius =
      "6px";


    if (
      examAnswers[index] !== null
    ) {

      button.style.background =
        "#b8f5c4";

    }


    if (
      index === currentQuestionIndex
    ) {

      button.style.fontWeight =
        "bold";

      button.style.border =
        "2px solid #333";

    }


    button.onclick = function () {

      goToQuestion(index);

    };


    container.appendChild(button);

  });

}


// =====================================================
// GO TO QUESTION
// =====================================================

function goToQuestion(index) {

  if (
    index < 0 ||
    index >= examQuestions.length
  ) {
    return;
  }


  currentQuestionIndex = index;

  renderExamQuestion();

}


// =====================================================
// NEXT QUESTION
// =====================================================

function nextQuestion() {

  if (
    currentQuestionIndex <
    examQuestions.length - 1
  ) {

    currentQuestionIndex++;

    renderExamQuestion();

  }

}


// =====================================================
// PREVIOUS QUESTION
// =====================================================

function previousQuestion() {

  if (currentQuestionIndex > 0) {

    currentQuestionIndex--;

    renderExamQuestion();

  }

}


// =====================================================
// TIMER
// =====================================================

function startTimer() {

  updateTimer();


  timerInterval =
    setInterval(function () {

      timeLeft--;

      updateTimer();


      if (timeLeft <= 0) {

        clearInterval(timerInterval);

        alert(
          "⏰ Time is up! Your test will be submitted."
        );

        submitTest(true);

      }

    }, 1000);

}


// =====================================================
// UPDATE TIMER DISPLAY
// =====================================================

function updateTimer() {

  const timer =
    document.getElementById("timer");


  if (!timer) {
    return;
  }


  const minutes =
    Math.floor(timeLeft / 60);


  const seconds =
    timeLeft % 60;


  timer.innerText =

    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");


  if (timeLeft <= 60) {

    timer.style.color =
      "red";

  }

}


// =====================================================
// SUBMIT TEST
// =====================================================

function submitTest(autoSubmit = false) {

  if (examSubmitted) {
    return;
  }


  const unanswered =
    examAnswers.filter(function (answer) {

      return answer === null;

    }).length;


  if (!autoSubmit && unanswered > 0) {

    const confirmSubmit =
      confirm(

        "You have " +
        unanswered +
        " unanswered question(s).\n\n" +
        "Are you sure you want to submit?"

      );


    if (!confirmSubmit) {
      return;
    }

  }


  examSubmitted = true;


  clearInterval(timerInterval);


  let correct = 0;

  let wrong = 0;

  let unansweredCount = 0;


  examQuestions.forEach(
    function (q, index) {

      const answer =
        examAnswers[index];


      if (answer === null) {

        unansweredCount++;

      } else if (
        answer === q.answer
      ) {

        correct++;

      } else {

        wrong++;

      }

    }
  );


  // Update statistics
  stats.attempted +=
    correct + wrong;


  stats.correct +=
    correct;


  stats.wrong +=
    wrong;


  stats.testsCompleted++;


  saveStats();

  updateDashboard();


  showResult(
    correct,
    wrong,
    unansweredCount
  );

}


// =====================================================
// SHOW RESULT
// =====================================================

function showResult(
  correct,
  wrong,
  unanswered
) {

  const total =
    examQuestions.length;


  document.getElementById(
    "score"
  ).innerText =

    correct +
    " / " +
    total;


  document.getElementById(
    "correct"
  ).innerText =
    correct;


  document.getElementById(
    "wrong"
  ).innerText =
    wrong;


  document.getElementById(
    "unanswered"
  ).innerText =
    unanswered;


  createAnswerReview();


  showSection("result");

}


// =====================================================
// ANSWER REVIEW
// =====================================================

function createAnswerReview() {

  const review =
    document.getElementById("review");


  review.innerHTML = "";


  examQuestions.forEach(
    function (q, index) {

      const userAnswer =
        examAnswers[index];


      const card =
        document.createElement("div");


      card.style.padding =
        "15px";

      card.style.marginBottom =
        "15px";

      card.style.border =
        "1px solid #ddd";

      card.style.borderRadius =
        "10px";


      let statusHTML = "";


      if (userAnswer === null) {

        statusHTML =
          "<p>⭕ <strong>Unanswered</strong></p>";

      } else if (
        userAnswer === q.answer
      ) {

        statusHTML =
          "<p>✅ <strong>Correct</strong></p>";

      } else {

        statusHTML =
          "<p>❌ <strong>Wrong</strong></p>";

      }


      let userAnswerText =
        "Not answered";


      if (userAnswer !== null) {

        userAnswerText =
          q.options[userAnswer];

      }


      card.innerHTML =

        "<h3>Question " +
        (index + 1) +
        "</h3>" +

        "<p><strong>" +
        q.question +
        "</strong></p>" +

        statusHTML +

        "<p><strong>Your Answer:</strong> " +
        userAnswerText +
        "</p>" +

        "<p><strong>Correct Answer:</strong> " +
        q.options[q.answer] +
        "</p>" +

        "<p><strong>Explanation:</strong> " +
        q.explanation +
        "</p>";


      review.appendChild(card);

    }
  );

}


// =====================================================
// RESET / START ANOTHER TEST
// =====================================================

function restartTest() {

  startExam();

}


// =====================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// =====================================================

window.showPractice =
  showPractice;

window.selectSubject =
  selectSubject;

window.backToSubjects =
  backToSubjects;

window.backToChapters =
  backToChapters;

window.previousPracticeQuestion =
  previousPracticeQuestion;

window.nextPracticeQuestion =
  nextPracticeQuestion;

window.showInstructions =
  showInstructions;

window.startExam =
  startExam;

window.previousQuestion =
  previousQuestion;

window.nextQuestion =
  nextQuestion;

window.submitTest =
  submitTest;

window.goHome =
  goHome;

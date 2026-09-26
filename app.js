// ===============================
// PAGE NAVIGATION
// ===============================

function hideAllSections() {
  document.getElementById("home").style.display = "none";
  document.getElementById("practice").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  document.getElementById("exam").style.display = "none";
  document.getElementById("result").style.display = "none";
}


// Go to Dashboard
function goHome() {
  hideAllSections();
  document.getElementById("home").style.display = "block";
  updateDashboard();
}


// ===============================
// PRACTICE SYSTEM
// ===============================

let selectedSubject = "";
let selectedChapter = "";
let practiceQuestions = [];
let currentPracticeQuestion = 0;
let selectedPracticeAnswer = null;


// Open Practice
function showPractice() {

  hideAllSections();

  document.getElementById("practice").style.display = "block";

  document.getElementById("practiceSubjects").style.display = "block";
  document.getElementById("chapterSection").style.display = "none";
  document.getElementById("practiceQuestion").style.display = "none";
}


// Select Subject
function selectSubject(subject) {

  selectedSubject = subject;

  document.getElementById("practiceSubjects").style.display = "none";

  document.getElementById("chapterSection").style.display = "block";

  document.getElementById("selectedSubject").textContent =
    subject + " Chapters";

  createChapterList(subject);
}


// ===============================
// CHAPTER LIST
// ===============================

function createChapterList(subject) {

  const chapterList = document.getElementById("chapterList");

  chapterList.innerHTML = "";


  let chapters = [];


  if (subject === "Physics") {

    chapters = [
      "Units and Measurements",
      "Motion",
      "Laws of Motion",
      "Work, Energy and Power",
      "Rotational Motion",
      "Gravitation",
      "Properties of Matter",
      "Thermal Properties",
      "Oscillations",
      "Waves",
      "Electrostatics",
      "Current Electricity",
      "Magnetic Effects of Current",
      "Electromagnetic Induction",
      "Ray Optics",
      "Modern Physics"
    ];

  }


  else if (subject === "Chemistry") {

    chapters = [
      "Some Basic Concepts of Chemistry",
      "Structure of Atom",
      "Periodic Table",
      "Chemical Bonding",
      "States of Matter",
      "Thermodynamics",
      "Equilibrium",
      "Redox Reactions",
      "Organic Chemistry Basics",
      "Hydrocarbons",
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "Coordination Compounds"
    ];

  }


  else if (subject === "Mathematics") {

    chapters = [
      "Trigonometry",
      "Straight Lines",
      "Circles",
      "Vectors",
      "Three Dimensional Geometry",
      "Probability",
      "Matrices",
      "Determinants",
      "Limits",
      "Continuity",
      "Differentiation",
      "Integration",
      "Differential Equations"
    ];

  }


  chapters.forEach(function(chapter) {

    const button = document.createElement("button");

    button.className = "chapter-button";

    button.textContent = chapter;

    button.onclick = function() {
      selectChapter(chapter);
    };

    chapterList.appendChild(button);

  });

}


// ===============================
// SELECT CHAPTER
// ===============================

function selectChapter(chapter) {

  selectedChapter = chapter;

  document.getElementById("chapterSection").style.display = "none";

  document.getElementById("practiceQuestion").style.display = "block";

  document.getElementById("practiceChapter").textContent =
    chapter;

  loadPracticeQuestions();

}


// ===============================
// LOAD QUESTIONS
// ===============================

function loadPracticeQuestions() {

  currentPracticeQuestion = 0;

  selectedPracticeAnswer = null;


  // Get questions from questions.js
  if (typeof questions !== "undefined") {

    practiceQuestions = questions.filter(function(q) {

      return q.subject === selectedSubject &&
             (
               !q.chapter ||
               q.chapter === selectedChapter
             );

    });

  }


  // If no questions are found
  if (practiceQuestions.length === 0) {

    practiceQuestions = [
      {
        subject: selectedSubject,
        chapter: selectedChapter,
        question:
          "Practice questions for this chapter will be added soon.",
        options: [
          "Option A",
          "Option B",
          "Option C",
          "Option D"
        ],
        answer: 0,
        explanation:
          "We will add real MHT-CET practice questions to this chapter."
      }
    ];

  }


  showPracticeQuestion();

}


// ===============================
// SHOW QUESTION
// ===============================

function showPracticeQuestion() {

  const q = practiceQuestions[currentPracticeQuestion];


  document.getElementById("practiceQuestionNumber").textContent =
    "Question " + (currentPracticeQuestion + 1);


  document.getElementById("practiceChapter").textContent =
    selectedChapter;


  document.getElementById("practiceQuestionText").textContent =
    q.question;


  const optionsContainer =
    document.getElementById("practiceOptions");


  optionsContainer.innerHTML = "";


  selectedPracticeAnswer = null;


  q.options.forEach(function(option, index) {

    const button = document.createElement("button");

    button.className = "practice-option";

    button.textContent =
      String.fromCharCode(65 + index) + ". " + option;


    button.onclick = function() {

      checkPracticeAnswer(index);

    };


    optionsContainer.appendChild(button);

  });


  document.getElementById("practiceFeedback").style.display =
    "none";

}


// ===============================
// CHECK ANSWER
// ===============================

function checkPracticeAnswer(index) {

  const q = practiceQuestions[currentPracticeQuestion];

  const feedback =
    document.getElementById("practiceFeedback");


  if (selectedPracticeAnswer !== null) {
    return;
  }


  selectedPracticeAnswer = index;


  if (index === q.answer) {

    savePracticeProgress(true);

    feedback.style.display = "block";
    feedback.innerHTML =
      "✅ <strong>Correct!</strong><br><br>" +
      (q.explanation || "Good job!");

  }

 else {

    savePracticeProgress(false);

    feedback.style.display = "block";

    feedback.innerHTML =
      "❌ <strong>Incorrect.</strong><br><br>" +
      "Correct answer: " +
      q.options[q.answer] +
      "<br><br>" +
      (q.explanation || "");

  }

}


// ===============================
// NEXT PRACTICE QUESTION
// ===============================

function nextPracticeQuestion() {

  if (
    currentPracticeQuestion <
    practiceQuestions.length - 1
  ) {

    currentPracticeQuestion++;

    showPracticeQuestion();

  }

  else {

    alert("You have completed this chapter!");

  }

}


// ===============================
// PREVIOUS PRACTICE QUESTION
// ===============================

function previousPracticeQuestion() {

  if (currentPracticeQuestion > 0) {

    currentPracticeQuestion--;

    showPracticeQuestion();

  }

}


// ===============================
// BACK TO SUBJECTS
// ===============================

function backToSubjects() {

  document.getElementById("chapterSection").style.display =
    "none";

  document.getElementById("practiceSubjects").style.display =
    "block";

}


// ===============================
// BACK TO CHAPTERS
// ===============================

function backToChapters() {

  document.getElementById("practiceQuestion").style.display =
    "none";

  document.getElementById("chapterSection").style.display =
    "block";

}


// ===============================
// MOCK TEST
// ===============================

function showInstructions() {

  hideAllSections();

  document.getElementById("instructions").style.display =
    "block";

}


// Start existing mock test
function startExam() {

  hideAllSections();

  document.getElementById("exam").style.display =
    "block";


  if (typeof createNumberButtons === "function") {
    createNumberButtons();
  }

  if (typeof showQuestion === "function") {
    showQuestion();
  }

  if (typeof startTimer === "function") {
    startTimer();
  }

}


// ===============================
// START DASHBOARD
// ===============================

document.addEventListener("DOMContentLoaded", function() {

  goHome();

});

// ========================================
// PROGRESS TRACKING SYSTEM
// ========================================

function savePracticeProgress(isCorrect) {
    let progress = JSON.parse(localStorage.getItem("mhcetProgress")) || {
        attempted: 0,
        correct: 0,
        wrong: 0
    };

    progress.attempted++;
localStorage.setItem("lastPracticeDate", new Date().toDateString());
 
    if (isCorrect) {
        progress.correct++;
    } else {
        progress.wrong++;
    }

    localStorage.setItem("mhcetProgress", JSON.stringify(progress));
}

function getPracticeProgress() {
    return JSON.parse(localStorage.getItem("mhcetProgress")) || {
        attempted: 0,
        correct: 0,
        wrong: 0
    };
}

function getAccuracy() {
    const progress = getPracticeProgress();

    if (progress.attempted === 0) {
        return 0;
    }

    return Math.round(
        (progress.correct / progress.attempted) * 100
    );
}

function updateDashboard() {
    const progress = getPracticeProgress();

    document.getElementById("questionsAttempted").textContent =
        progress.attempted;

    document.getElementById("testsCompleted").textContent =
        0;

    document.getElementById("accuracy").textContent =
        getAccuracy() + "%";

    document.getElementById("studyStreak").textContent =
        "0 Days";
}

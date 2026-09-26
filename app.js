// ============================================================
// MHT-CET 2027 PRACTICE PORTAL
// CET-STYLE MOCK TEST ENGINE
// ============================================================

let currentSubject = "Physics";
let currentChapter = "";
let currentDifficulty = "Easy";

let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let markedQuestions = {};
let testTimer = null;
let remainingSeconds = 0;
let testSubmitted = false;


// ============================================================
// BASIC HELPERS
// ============================================================

function getApp(id) {
  return document.getElementById(id);
}

function shuffleArray(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function getPracticeQuestions() {
  return (window.questions || []).filter(q => q.type === "practice");
}


// ============================================================
// DASHBOARD
// ============================================================

function showDashboard() {
  stopTimer();

  const app = getApp("app");

  if (!app) return;

  app.innerHTML = `
    <div class="dashboard">

      <h1>MHT-CET 2027 Practice Portal</h1>

      <div class="dashboard-grid">

        <button onclick="showSubject('Physics')">
          <h2>Physics</h2>
          <p>Practice Physics chapters</p>
        </button>

        <button onclick="showSubject('Chemistry')">
          <h2>Chemistry</h2>
          <p>Practice Chemistry chapters</p>
        </button>

        <button onclick="showSubject('Mathematics')">
          <h2>Mathematics</h2>
          <p>Practice Mathematics chapters</p>
        </button>

        <button onclick="showMockTests()">
          <h2>Mock Tests</h2>
          <p>50 CET-style mock tests</p>
        </button>

        <button onclick="showPYQTests()">
          <h2>PYQ</h2>
          <p>Previous-year practice</p>
        </button>

        <button onclick="showPerformance()">
          <h2>Performance</h2>
          <p>Track your progress</p>
        </button>

      </div>

    </div>
  `;
}


// ============================================================
// SUBJECT PAGE
// ============================================================

function showSubject(subject) {

  currentSubject = subject;

  const chapters =
    window.chapterCatalog?.[subject] || [];

  const app = getApp("app");

  if (!app) return;

  app.innerHTML = `
    <div class="page">

      <button onclick="showDashboard()">← Dashboard</button>

      <h1>${subject}</h1>

      <div class="chapter-grid">

        ${chapters.map((chapter, index) => `
          <button
            onclick="showChapter('${subject}', '${chapter.replace(/'/g, "\\'")}')"
          >
            <strong>${index + 1}. ${chapter}</strong>
            <span>30 Questions</span>
          </button>
        `).join("")}

      </div>

    </div>
  `;
}


// ============================================================
// CHAPTER PAGE
// ============================================================

function showChapter(subject, chapter) {

  currentSubject = subject;
  currentChapter = chapter;

  const app = getApp("app");

  if (!app) return;

  app.innerHTML = `
    <div class="page">

      <button onclick="showSubject('${subject}')">
        ← Back
      </button>

      <h1>${chapter}</h1>

      <p>Select difficulty</p>

      <div class="difficulty-grid">

        <button onclick="startPractice('Easy')">
          Easy
          <span>10 Questions</span>
        </button>

        <button onclick="startPractice('Medium')">
          Medium
          <span>10 Questions</span>
        </button>

        <button onclick="startPractice('Hard')">
          Hard
          <span>10 Questions</span>
        </button>

      </div>

    </div>
  `;
}


// ============================================================
// PRACTICE MODE
// ============================================================

function startPractice(difficulty) {

  currentDifficulty = difficulty;

  const bank = getPracticeQuestions().filter(q =>
    q.subject === currentSubject &&
    q.chapter === currentChapter &&
    q.difficulty === difficulty
  );

  if (!bank.length) {
    alert("No questions available for this section.");
    return;
  }

  currentTest = {
    mode: "practice",
    title: `${currentChapter} - ${difficulty}`,
    questions: shuffleArray(bank)
  };

  currentQuestionIndex = 0;
  userAnswers = {};
  markedQuestions = {};
  testSubmitted = false;

  renderPracticeQuestion();
}


// ============================================================
// PRACTICE QUESTION
// ============================================================

function renderPracticeQuestion() {

  const q =
    currentTest.questions[currentQuestionIndex];

  const app = getApp("app");

  if (!app || !q) return;

  app.innerHTML = `
    <div class="exam-page">

      <div class="exam-header">

        <div>
          <strong>${currentTest.title}</strong>
          <p>
            Question ${currentQuestionIndex + 1}
            of ${currentTest.questions.length}
          </p>
        </div>

        <button onclick="showDashboard()">
          Exit
        </button>

      </div>

      <div class="exam-body">

        <main class="question-box">

          <h2>${q.question}</h2>

          <div class="options">

            ${q.options.map((option, index) => `
              <label class="option">
                <input
                  type="radio"
                  name="answer"
                  value="${index}"
                  ${userAnswers[q.id] === index ? "checked" : ""}
                  onchange="savePracticeAnswer(${index})"
                >
                <span>${option}</span>
              </label>
            `).join("")}

          </div>

          <div class="question-actions">

            <button onclick="previousPracticeQuestion()">
              Previous
            </button>

            <button onclick="clearPracticeAnswer()">
              Clear Response
            </button>

            <button onclick="nextPracticeQuestion()">
              ${currentQuestionIndex === currentTest.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>

          </div>

        </main>

        <aside class="question-palette">

          <h3>Questions</h3>

          ${currentTest.questions.map((item, index) => `
            <button
              class="${getPaletteClass(item.id, index)}"
              onclick="goToPracticeQuestion(${index})"
            >
              ${index + 1}
            </button>
          `).join("")}

        </aside>

      </div>

    </div>
  `;
}


function savePracticeAnswer(answer) {

  const q =
    currentTest.questions[currentQuestionIndex];

  userAnswers[q.id] = Number(answer);
}


function previousPracticeQuestion() {

  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderPracticeQuestion();
  }
}


function nextPracticeQuestion() {

  if (
    currentQuestionIndex <
    currentTest.questions.length - 1
  ) {

    currentQuestionIndex++;
    renderPracticeQuestion();

  } else {

    showPracticeResult();

  }
}


function clearPracticeAnswer() {

  const q =
    currentTest.questions[currentQuestionIndex];

  delete userAnswers[q.id];

  renderPracticeQuestion();
}


function goToPracticeQuestion(index) {

  currentQuestionIndex = index;

  renderPracticeQuestion();
}


// ============================================================
// MOCK TEST LIST
// ============================================================

function showMockTests() {

  const app = getApp("app");

  if (!app) return;

  const tests = window.mockTests || [];

  app.innerHTML = `
    <div class="page">

      <button onclick="showDashboard()">
        ← Dashboard
      </button>

      <h1>MHT-CET Mock Tests</h1>

      <p>
        Physics + Chemistry: 60 minutes
        <br>
        Mathematics: 120 minutes
      </p>

      <div class="mock-grid">

        ${tests.map(test => `
          <button onclick="startCETMock('${test.id}')">
            <strong>${test.title}</strong>

            <span>
              Physics + Chemistry: 1 Hour
            </span>

            <span>
              Mathematics: 2 Hours
            </span>
          </button>
        `).join("")}

      </div>

    </div>
  `;
}


// ============================================================
// CREATE CET MOCK
// ============================================================

function startCETMock(testId) {

  const bank = getPracticeQuestions();

  const physics = shuffleArray(
    bank.filter(q => q.subject === "Physics")
  );

  const chemistry = shuffleArray(
    bank.filter(q => q.subject === "Chemistry")
  );

  const mathematics = shuffleArray(
    bank.filter(q => q.subject === "Mathematics")
  );


  // ----------------------------------------------------------
  // MIX DIFFICULTIES
  // ----------------------------------------------------------

  function mixedQuestions(list, count) {

    const easy = shuffleArray(
      list.filter(q => q.difficulty === "Easy")
    );

    const medium = shuffleArray(
      list.filter(q => q.difficulty === "Medium")
    );

    const hard = shuffleArray(
      list.filter(q => q.difficulty === "Hard")
    );

    const result = [];

    while (
      result.length < count &&
      (easy.length || medium.length || hard.length)
    ) {

      if (easy.length) result.push(easy.pop());

      if (
        result.length < count &&
        medium.length
      ) {
        result.push(medium.pop());
      }

      if (
        result.length < count &&
        hard.length
      ) {
        result.push(hard.pop());
      }
    }

    return shuffleArray(result).slice(0, count);
  }


  // ----------------------------------------------------------
  // CET-STYLE SECTION SETUP
  // ----------------------------------------------------------

  currentTest = {

    mode: "mock",

    id: testId,

    sections: {

      physics: {
        name: "Physics",
        questions: mixedQuestions(physics, 50),
        duration: 60 * 60
      },

      chemistry: {
        name: "Chemistry",
        questions: mixedQuestions(chemistry, 50),
        duration: 60 * 60
      },

      mathematics: {
        name: "Mathematics",
        questions: mixedQuestions(mathematics, 50),
        duration: 120 * 60
      }

    }

  };


  currentTest.sections.physics.questions =
    currentTest.sections.physics.questions.map(q => ({
      ...q,
      section: "Physics"
    }));

  currentTest.sections.chemistry.questions =
    currentTest.sections.chemistry.questions.map(q => ({
      ...q,
      section: "Chemistry"
    }));

  currentTest.sections.mathematics.questions =
    currentTest.sections.mathematics.questions.map(q => ({
      ...q,
      section: "Mathematics"
    }));


  currentSection = "physics";

  currentQuestionIndex = 0;

  userAnswers = {};

  markedQuestions = {};

  testSubmitted = false;

  startSection("physics");
}


// ============================================================
// CURRENT SECTION
// ============================================================

let currentSection = "physics";


function getCurrentSection() {

  return currentTest.sections[currentSection];

}


// ============================================================
// START SECTION
// ============================================================

function startSection(section) {

  stopTimer();

  currentSection = section;

  currentQuestionIndex = 0;

  remainingSeconds =
    currentTest.sections[section].duration;

  renderMockQuestion();

  startTimer();
}


// ============================================================
// MOCK EXAM UI
// ============================================================

function renderMockQuestion() {

  const section =
    getCurrentSection();

  const q =
    section.questions[currentQuestionIndex];

  const app = getApp("app");

  if (!app || !q) return;


  const total =
    section.questions.length;


  app.innerHTML = `

    <div class="cet-exam">

      <header class="cet-header">

        <div>

          <h2>MHT-CET 2027 Mock Test</h2>

          <p>
            ${currentTest.id}
          </p>

        </div>

        <div class="cet-timer">

          Time Left:
          <strong id="examTimer">
            ${formatTime(remainingSeconds)}
          </strong>

        </div>

      </header>


      <nav class="section-tabs">

        <button
          class="${currentSection === "physics" ? "active" : ""}"
          onclick="switchSection('physics')"
        >
          Physics
        </button>

        <button
          class="${currentSection === "chemistry" ? "active" : ""}"
          onclick="switchSection('chemistry')"
        >
          Chemistry
        </button>

        <button
          class="${currentSection === "mathematics" ? "active" : ""}"
          onclick="switchSection('mathematics')"
        >
          Mathematics
        </button>

      </nav>


      <div class="cet-layout">


        <main class="cet-question-area">

          <div class="question-top">

            <strong>
              ${section.name}
            </strong>

            <span>
              Question
              ${currentQuestionIndex + 1}
              of
              ${total}
            </span>

          </div>


          <div class="question-card">

            <h2>
              ${q.question}
            </h2>


            <div class="cet-options">

              ${q.options.map((option, index) => `

                <label>

                  <input
                    type="radio"
                    name="cetAnswer"
                    value="${index}"
                    ${
                      userAnswers[q.id] === index
                        ? "checked"
                        : ""
                    }
                    onchange="saveMockAnswer(${index})"
                  >

                  <span>
                    ${String.fromCharCode(65 + index)}.
                    ${option}
                  </span>

                </label>

              `).join("")}

            </div>


            <div class="cet-actions">

              <button onclick="markForReview()">
                ${markedQuestions[q.id]
                  ? "Unmark Review"
                  : "Mark for Review"}
              </button>

              <button onclick="clearMockAnswer()">
                Clear Response
              </button>

              <button
                onclick="previousMockQuestion()"
              >
                Previous
              </button>

              <button
                onclick="nextMockQuestion()"
              >
                ${
                  currentQuestionIndex === total - 1
                    ? "Finish Section"
                    : "Save & Next"
                }
              </button>

            </div>

          </div>

        </main>


        <aside class="cet-sidebar">

          <h3>${section.name}</h3>

          <div class="palette">

            ${section.questions.map((item, index) => `

              <button
                class="${getMockPaletteClass(
                  item.id,
                  index
                )}"
                onclick="goToMockQuestion(${index})"
              >
                ${index + 1}
              </button>

            `).join("")}

          </div>


          <div class="palette-legend">

            <p>● Answered</p>
            <p>● Not Answered</p>
            <p>● Marked for Review</p>

          </div>


          <button
            class="submit-test"
            onclick="submitMockTest()"
          >
            Submit Test
          </button>

        </aside>

      </div>

    </div>
  `;
}


// ============================================================
// SECTION SWITCH
// ============================================================

function switchSection(section) {

  if (testSubmitted) return;

  stopTimer();

  currentSection = section;

  currentQuestionIndex = 0;

  remainingSeconds =
    currentTest.sections[section].duration;

  renderMockQuestion();

  startTimer();
}


// ============================================================
// MOCK ANSWER
// ============================================================

function saveMockAnswer(answer) {

  const section =
    getCurrentSection();

  const q =
    section.questions[currentQuestionIndex];

  userAnswers[q.id] = Number(answer);

  renderMockQuestion();
}


// ============================================================
// MOCK NAVIGATION
// ============================================================

function previousMockQuestion() {

  if (currentQuestionIndex > 0) {

    currentQuestionIndex--;

    renderMockQuestion();

  }
}


function nextMockQuestion() {

  const section =
    getCurrentSection();

  if (
    currentQuestionIndex <
    section.questions.length - 1
  ) {

    currentQuestionIndex++;

    renderMockQuestion();

  } else {

    finishCurrentSection();

  }
}


function goToMockQuestion(index) {

  currentQuestionIndex = index;

  renderMockQuestion();
}


// ============================================================
// MARK FOR REVIEW
// ============================================================

function markForReview() {

  const section =
    getCurrentSection();

  const q =
    section.questions[currentQuestionIndex];

  markedQuestions[q.id] =
    !markedQuestions[q.id];

  renderMockQuestion();
}


// ============================================================
// CLEAR RESPONSE
// ============================================================

function clearMockAnswer() {

  const section =
    getCurrentSection();

  const q =
    section.questions[currentQuestionIndex];

  delete userAnswers[q.id];

  renderMockQuestion();
}


// ============================================================
// FINISH SECTION
// ============================================================

function finishCurrentSection() {

  stopTimer();

  if (currentSection === "physics") {

    const go =
      confirm(
        "Physics section completed. Move to Chemistry?"
      );

    if (go) {

      startSection("chemistry");

    } else {

      startTimer();

    }

  } else if (currentSection === "chemistry") {

    const go =
      confirm(
        "Physics + Chemistry section completed. Move to Mathematics?"
      );

    if (go) {

      startSection("mathematics");

    } else {

      startTimer();

    }

  } else {

    const submit =
      confirm(
        "Mathematics section completed. Submit the mock test?"
      );

    if (submit) {

      submitMockTest();

    } else {

      startTimer();

    }
  }
}


// ============================================================
// TIMER
// ============================================================

function startTimer() {

  stopTimer();

  testTimer = setInterval(() => {

    remainingSeconds--;

    const timer =
      getApp("examTimer");

    if (timer) {

      timer.textContent =
        formatTime(remainingSeconds);

    }

    if (remainingSeconds <= 0) {

      stopTimer();

      alert(
        `${getCurrentSection().name} time is over.`
      );

      if (currentSection === "physics") {

        startSection("chemistry");

      } else if (currentSection === "chemistry") {

        startSection("mathematics");

      } else {

        submitMockTest();

      }

    }

  }, 1000);
}


function stopTimer() {

  if (testTimer) {

    clearInterval(testTimer);

    testTimer = null;

  }
}


function formatTime(seconds) {

  const h =
    Math.floor(seconds / 3600);

  const m =
    Math.floor((seconds % 3600) / 60);

  const s =
    seconds % 60;

  if (h > 0) {

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  }

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}


// ============================================================
// SUBMIT MOCK TEST
// ============================================================

function submitMockTest() {

  if (testSubmitted) return;

  const confirmSubmit =
    confirm(
      "Are you sure you want to submit the complete mock test?"
    );

  if (!confirmSubmit) return;

  testSubmitted = true;

  stopTimer();

  showMockResult();
}


// ============================================================
// MOCK RESULT
// ============================================================

function showMockResult() {

  let total = 0;
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  const subjectResults = {};


  Object.keys(currentTest.sections).forEach(key => {

    const section =
      currentTest.sections[key];

    let sectionCorrect = 0;
    let sectionWrong = 0;
    let sectionUnanswered = 0;


    section.questions.forEach(q => {

      total++;

      if (userAnswers[q.id] === undefined) {

        unanswered++;
        sectionUnanswered++;

      } else if (
        userAnswers[q.id] === q.answer
      ) {

        correct++;
        sectionCorrect++;

      } else {

        wrong++;
        sectionWrong++;

      }

    });


    subjectResults[section.name] = {
      total: section.questions.length,
      correct: sectionCorrect,
      wrong: sectionWrong,
      unanswered: sectionUnanswered
    };

  });


  const percentage =
    total
      ? ((correct / total) * 100).toFixed(2)
      : 0;


  const app = getApp("app");

  if (!app) return;


  app.innerHTML = `

    <div class="result-page">

      <h1>Mock Test Result</h1>

      <h2>${currentTest.id}</h2>


      <div class="result-summary">

        <div>
          <strong>${total}</strong>
          <span>Total</span>
        </div>

        <div>
          <strong>${correct}</strong>
          <span>Correct</span>
        </div>

        <div>
          <strong>${wrong}</strong>
          <span>Wrong</span>
        </div>

        <div>
          <strong>${unanswered}</strong>
          <span>Unanswered</span>
        </div>

        <div>
          <strong>${percentage}%</strong>
          <span>Accuracy</span>
        </div>

      </div>


      <h2>Subject-wise Performance</h2>


      <div class="subject-results">

        ${Object.keys(subjectResults).map(subject => {

          const r =
            subjectResults[subject];

          return `

            <div class="result-card">

              <h3>${subject}</h3>

              <p>
                Total:
                <strong>${r.total}</strong>
              </p>

              <p>
                Correct:
                <strong>${r.correct}</strong>
              </p>

              <p>
                Wrong:
                <strong>${r.wrong}</strong>
              </p>

              <p>
                Unanswered:
                <strong>${r.unanswered}</strong>
              </p>

            </div>

          `;

        }).join("")}

      </div>


      <div class="result-buttons">

        <button onclick="showMockReview()">
          Review Answers
        </button>

        <button onclick="showMockTests()">
          Back to Mock Tests
        </button>

        <button onclick="showDashboard()">
          Dashboard
        </button>

      </div>

    </div>
  `;
}


// ============================================================
// REVIEW
// ============================================================

function showMockReview() {

  const allQuestions = [];

  Object.keys(currentTest.sections).forEach(key => {

    allQuestions.push(
      ...currentTest.sections[key].questions
    );

  });


  const app = getApp("app");

  if (!app) return;


  app.innerHTML = `

    <div class="review-page">

      <button onclick="showMockResult()">
        ← Back to Result
      </button>

      <h1>Answer Review</h1>


      ${allQuestions.map((q, index) => {

        const selected =
          userAnswers[q.id];

        const status =
          selected === undefined
            ? "Unanswered"
            : selected === q.answer
              ? "Correct"
              : "Wrong";


        return `

          <div class="review-card">

            <h3>
              ${index + 1}. ${q.question}
            </h3>

            <p>
              <strong>Your Answer:</strong>
              ${
                selected === undefined
                  ? "Not Answered"
                  : q.options[selected]
              }
            </p>

            <p>
              <strong>Correct Answer:</strong>
              ${q.options[q.answer]}
            </p>

            <p>
              <strong>Status:</strong>
              ${status}
            </p>

            <p>
              <strong>Explanation:</strong>
              ${q.explanation}
            </p>

          </div>

        `;

      }).join("")}

    </div>
  `;
}


// ============================================================
// PALETTE STATUS
// ============================================================

function getMockPaletteClass(id, index) {

  if (markedQuestions[id]) {
    return "marked";
  }

  if (userAnswers[id] !== undefined) {
    return "answered";
  }

  return "not-answered";
}


function getPaletteClass(id, index) {

  if (userAnswers[id] !== undefined) {
    return "answered";
  }

  return "not-answered";
}


// ============================================================
// PRACTICE RESULT
// ============================================================

function showPracticeResult() {

  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  currentTest.questions.forEach(q => {

    if (userAnswers[q.id] === undefined) {

      unanswered++;

    } else if (
      userAnswers[q.id] === q.answer
    ) {

      correct++;

    } else {

      wrong++;

    }

  });


  const total =
    currentTest.questions.length;

  const accuracy =
    total
      ? ((correct / total) * 100).toFixed(2)
      : 0;


  const app = getApp("app");

  app.innerHTML = `

    <div class="result-page">

      <h1>Practice Result</h1>

      <h2>${currentTest.title}</h2>

      <div class="result-summary">

        <div>
          <strong>${total}</strong>
          <span>Total</span>
        </div>

        <div>
          <strong>${correct}</strong>
          <span>Correct</span>
        </div>

        <div>
          <strong>${wrong}</strong>
          <span>Wrong</span>
        </div>

        <div>
          <strong>${unanswered}</strong>
          <span>Unanswered</span>
        </div>

        <div>
          <strong>${accuracy}%</strong>
          <span>Accuracy</span>
        </div>

      </div>

      <button onclick="showChapter('${currentSubject}', '${currentChapter.replace(/'/g, "\\'")}')">
        Try Again
      </button>

      <button onclick="showDashboard()">
        Dashboard
      </button>

    </div>

  `;
}


// ============================================================
// PYQ PAGE
// ============================================================

function showPYQTests() {

  const app = getApp("app");

  if (!app) return;

  const tests =
    window.pyqTests || [];

  app.innerHTML = `

    <div class="page">

      <button onclick="showDashboard()">
        ← Dashboard
      </button>

      <h1>Previous Year Questions</h1>

      <div class="mock-grid">

        ${tests.map(test => `

          <button
            onclick="startPYQ('${test.id}')"
          >

            <strong>
              ${test.title}
            </strong>

            <span>
              ${test.year}
            </span>

          </button>

        `).join("")}

      </div>

    </div>
  `;
}


function startPYQ(id) {

  const test =
    (window.pyqTests || [])
      .find(t => t.id === id);

  if (!test) {

    alert("PYQ test not found.");

    return;
  }

  alert(
    "This PYQ section is ready for verified PYQ questions to be added."
  );
}


// ============================================================
// PERFORMANCE
// ============================================================

function showPerformance() {

  const app = getApp("app");

  if (!app) return;

  app.innerHTML = `

    <div class="page">

      <button onclick="showDashboard()">
        ← Dashboard
      </button>

      <h1>Performance</h1>

      <div class="result-card">

        <h2>Practice Performance</h2>

        <p>
          Complete chapter tests and mock tests to build
          your performance history.
        </p>

      </div>

    </div>

  `;
}


// ============================================================
// START APPLICATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  showDashboard();

});

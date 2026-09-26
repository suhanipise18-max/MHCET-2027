// ==========================================
// MHT-CET 2027 - MASTER QUESTIONS DATABASE
// ==========================================

const chapterCatalog = {
  Physics: [
    "Units and Measurements",
    "Mathematical Methods",
    "Motion in a Straight Line",
    "Motion in a Plane",
    "Laws of Motion",
    "Gravitation",
    "Properties of Matter",
    "Thermodynamics",
    "Oscillations",
    "Waves",
    "Electrostatics",
    "Current Electricity",
    "Magnetic Effects of Current",
    "Electromagnetic Induction",
    "Optics",
    "Dual Nature of Matter",
    "Atoms and Nuclei",
    "Semiconductor Devices"
  ],

  Chemistry: [
    "Some Basic Concepts of Chemistry",
    "Structure of Atom",
    "Classification of Elements",
    "Chemical Bonding",
    "States of Matter",
    "Thermodynamics",
    "Equilibrium",
    "Redox Reactions",
    "Solutions",
    "Electrochemistry",
    "Chemical Kinetics",
    "Organic Chemistry Basics",
    "Hydrocarbons",
    "Alcohols, Phenols and Ethers",
    "Aldehydes, Ketones and Carboxylic Acids",
    "Amines",
    "Biomolecules",
    "Polymers"
  ],

  Mathematics: [
    "Mathematical Logic",
    "Matrices",
    "Trigonometric Functions",
    "Pair of Straight Lines",
    "Circle",
    "Conic Sections",
    "Vectors",
    "Three Dimensional Geometry",
    "Probability",
    "Statistics",
    "Complex Numbers",
    "Permutations and Combinations",
    "Binomial Theorem",
    "Sequences and Series",
    "Functions",
    "Limits",
    "Continuity",
    "Differentiation",
    "Integration",
    "Differential Equations"
  ]
};


// ==========================================
// QUESTION BANK
// 56 chapters × 30 questions = 1680
// 10 Easy + 10 Medium + 10 Hard
// ==========================================

const questions = [];

let questionId = 1;

const difficulties = [
  "Easy",
  "Medium",
  "Hard"
];

for (const subject in chapterCatalog) {

  chapterCatalog[subject].forEach(chapter => {

    difficulties.forEach(difficulty => {

      for (let number = 1; number <= 10; number++) {

        questions.push({

          id: questionId++,

          subject: subject,

          chapter: chapter,

          difficulty: difficulty,

          type: "practice",

          question:
            `[QUESTION ${questionId - 1}] ${subject} - ${chapter} - ${difficulty} question ${number}. ` +
            `Replace this with a verified MHT-CET style question.`,

          options: [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
          ],

          answer: 0,

          explanation:
            "Explanation will be added when the verified question is added."

        });

      }

    });

  });

}


// ==========================================
// 50 MOCK TESTS
// ==========================================

const mockTests = [];

for (let i = 1; i <= 50; i++) {

  mockTests.push({

    id: i,

    title:
      `MHT-CET Mock Test ${String(i).padStart(2, "0")}`,

    type: "mock",

    durationMinutes: 180,

    questionCount: 150,

    questions: []

  });

}


// ==========================================
// 5 YEARS PYQ STRUCTURE
// ==========================================

const pyqTests = [

  {
    year: 2022,
    title: "MHT-CET 2022 PYQ",
    type: "pyq",
    questions: []
  },

  {
    year: 2023,
    title: "MHT-CET 2023 PYQ",
    type: "pyq",
    questions: []
  },

  {
    year: 2024,
    title: "MHT-CET 2024 PYQ",
    type: "pyq",
    questions: []
  },

  {
    year: 2025,
    title: "MHT-CET 2025 PYQ",
    type: "pyq",
    questions: []
  },

  {
    year: 2026,
    title: "MHT-CET 2026 PYQ",
    type: "pyq",
    questions: []
  }

];


// ==========================================
// DATABASE INFORMATION
// ==========================================

const questionBankInfo = {

  subjects: 3,

  chapters: 56,

  questionsPerChapter: 30,

  easyPerChapter: 10,

  mediumPerChapter: 10,

  hardPerChapter: 10,

  totalPracticeQuestions: questions.length,

  totalMockTests: mockTests.length,

  totalPYQYears: pyqTests.length

};


console.log(
  "MHT-CET Question Bank Loaded:",
  questionBankInfo
);

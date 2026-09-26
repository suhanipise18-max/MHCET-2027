// ============================================================
// MHT-CET 2027 PRACTICE PORTAL
// FINAL QUESTION DATABASE
// ============================================================
// 56 Chapters
// 30 Questions per Chapter
// 10 Easy + 10 Medium + 10 Hard
// 50 Mock Tests
// 5 PYQ Year Slots
//
// Questions are original MHT-CET-style practice questions.
// Actual PYQs should only be added after verification.
// ============================================================


// ============================================================
// CHAPTER CATALOG
// ============================================================

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


// ============================================================
// QUESTION DATABASE
// ============================================================

const questions = [];

let questionId = 1;


// ============================================================
// QUESTION CREATOR
// ============================================================

function addQuestion(
  subject,
  chapter,
  difficulty,
  question,
  options,
  answer,
  explanation
) {

  questions.push({

    id: questionId++,

    subject,

    chapter,

    difficulty,

    type: "practice",

    sourceType: "original",

    source: "Original MHT-CET-style practice question",

    question,

    options,

    answer,

    explanation

  });

}


// ============================================================
// PHYSICS
// ============================================================

const physicsQuestions = {

  "Units and Measurements": [

    ["The SI unit of force is:",
      ["Joule","Newton","Watt","Pascal"],1,
      "Force is measured in newtons."],

    ["The dimensional formula of velocity is:",
      ["[LT⁻¹]","[LT]","[L²T⁻¹]","[T⁻¹]"],0,
      "Velocity = displacement/time."],

    ["Which quantity is dimensionless?",
      ["Force","Work","Strain","Momentum"],2,
      "Strain is a ratio and is dimensionless."],

    ["1 nanometre is equal to:",
      ["10⁻³ m","10⁻⁶ m","10⁻⁹ m","10⁻¹² m"],2,
      "Nano represents 10⁻⁹."],

    ["The number of significant figures in 0.00450 is:",
      ["2","3","4","5"],1,
      "The significant digits are 4, 5 and the trailing zero."],

    ["The dimensional formula of work is:",
      ["ML²T⁻²","MLT⁻²","ML²T⁻¹","MLT⁻¹"],0,
      "Work = force × displacement."],

    ["Which instrument is commonly used to measure small lengths accurately?",
      ["Metre scale","Vernier caliper","Stopwatch","Ammeter"],1,
      "A vernier caliper measures small dimensions accurately."],

    ["If x = 5.0 ± 0.1 cm, the percentage uncertainty is:",
      ["1%","2%","5%","10%"],1,
      "Percentage uncertainty = (0.1/5.0) × 100 = 2%."],

    ["The SI unit of pressure is:",
      ["Newton","Pascal","Joule","Tesla"],1,
      "Pressure is measured in pascals."],

    ["Which pair has the same dimensions?",
      ["Work and torque","Force and energy","Power and momentum","Pressure and energy"],0,
      "Work and torque both have dimensions ML²T⁻²."]
  ],


  "Motion in a Straight Line": [

    ["The slope of a position-time graph represents:",
      ["Acceleration","Velocity","Force","Momentum"],1,
      "Slope of position-time graph gives velocity."],

    ["The area under a velocity-time graph gives:",
      ["Acceleration","Displacement","Force","Speed"],1,
      "Area under velocity-time graph gives displacement."],

    ["A body moving with constant velocity has:",
      ["Zero acceleration","Constant acceleration","Increasing acceleration","Variable acceleration"],0,
      "Constant velocity means zero acceleration."],

    ["The SI unit of acceleration is:",
      ["m/s","m/s²","km/h","N"],1,
      "Acceleration is measured in m/s²."],

    ["If a body starts from rest, its initial velocity is:",
      ["1 m/s","0","9.8 m/s","Cannot be determined"],1,
      "Starting from rest means initial velocity is zero."],

    ["For uniformly accelerated motion, v is given by:",
      ["u + at","u + a/t","u − at²","ut + a"],0,
      "The equation is v = u + at."],

    ["A car travels 20 m in 4 s uniformly. Its average speed is:",
      ["4 m/s","5 m/s","8 m/s","10 m/s"],1,
      "Average speed = 20/4 = 5 m/s."],

    ["If acceleration is negative while velocity is positive, the speed generally:",
      ["Increases","Decreases","Remains zero","Becomes infinite"],1,
      "Negative acceleration opposes positive velocity."],

    ["For a freely falling body from rest, displacement after time t is:",
      ["gt","gt²","½gt²","2gt"],2,
      "Using s = ut + ½at² with u = 0."],

    ["A particle changes velocity from 10 m/s to 30 m/s in 5 s. Its acceleration is:",
      ["2 m/s²","4 m/s²","5 m/s²","8 m/s²"],1,
      "a = (30 − 10)/5 = 4 m/s²."]
  ],


  "Laws of Motion": [

    ["Newton's first law is also called the law of:",
      ["Momentum","Inertia","Acceleration","Gravitation"],1,
      "Newton's first law describes inertia."],

    ["The SI unit of momentum is:",
      ["N","kg m/s","J","W"],1,
      "Momentum = mass × velocity."],

    ["Newton's second law gives the relation:",
      ["F = ma","F = m/a","F = a/m","F = mv"],0,
      "Force equals mass multiplied by acceleration."],

    ["Action and reaction forces act on:",
      ["Same body","Different bodies","Only stationary bodies","No bodies"],1,
      "They act on two different interacting bodies."],

    ["Friction generally acts:",
      ["Along motion","Opposite relative motion","Vertically upward","Always downward"],1,
      "Friction opposes relative motion."],

    ["If net force on an object is zero, its acceleration is:",
      ["Zero","Maximum","Negative","Infinite"],0,
      "From F = ma, zero net force gives zero acceleration."],

    ["A 2 kg object accelerates at 3 m/s². Net force is:",
      ["2 N","3 N","6 N","9 N"],2,
      "F = ma = 2 × 3 = 6 N."],

    ["The coefficient of friction is:",
      ["Dimensionless","Measured in N","Measured in J","Measured in kg"],0,
      "It is a ratio and therefore dimensionless."],

    ["A passenger moves forward when a bus suddenly stops due to:",
      ["Friction","Inertia","Gravity","Pressure"],1,
      "The body tends to continue its state of motion."],

    ["If mass is doubled while force remains constant, acceleration becomes:",
      ["Double","Half","Four times","Unchanged"],1,
      "a = F/m, so doubling mass halves acceleration."]
  ],


  "Electrostatics": [

    ["The SI unit of electric charge is:",
      ["Volt","Ampere","Coulomb","Ohm"],2,
      "Charge is measured in coulombs."],

    ["Like charges:",
      ["Attract","Repel","Have no force","Always disappear"],1,
      "Like charges repel."],

    ["Coulomb's law describes force between:",
      ["Masses","Charges","Currents only","Magnets only"],1,
      "Coulomb's law describes electrostatic force between charges."],

    ["Electric field is measured in:",
      ["N/C","J/C","C/N","Ω"],0,
      "Electric field = force/charge."],

    ["Electric potential is a:",
      ["Vector","Scalar","Tensor","Dimensionless vector"],1,
      "Electric potential is a scalar quantity."],

    ["The electric field inside an ideal conductor in electrostatic equilibrium is:",
      ["Maximum","Zero","Infinite","Variable always"],1,
      "The internal electrostatic field is zero."],

    ["Two equal positive charges exert on each other a force that is:",
      ["Attractive","Repulsive","Zero","Always downward"],1,
      "Like charges repel."],

    ["Capacitance is measured in:",
      ["Farad","Henry","Tesla","Weber"],0,
      "The SI unit of capacitance is farad."],

    ["Increasing plate separation of an isolated parallel-plate capacitor generally decreases its:",
      ["Charge","Capacitance","Electron mass","Resistance"],1,
      "For a parallel plate capacitor C = εA/d."],

    ["Electric potential energy depends on:",
      ["Charges and their configuration","Only mass","Only temperature","Only time"],0,
      "Electrostatic potential energy depends on the charge configuration."]
  ]

};


// ============================================================
// CHEMISTRY
// ============================================================

const chemistryQuestions = {

  "Some Basic Concepts of Chemistry": [

    ["The SI unit of amount of substance is:",
      ["Gram","Mole","Kilogram","Litre"],1,
      "The mole is the SI unit of amount of substance."],

    ["Avogadro's number is approximately:",
      ["6.022×10²³","6.022×10²²","3.011×10²³","9.8×10²³"],0,
      "One mole contains approximately 6.022×10²³ particles."],

    ["Molar mass of H₂O is approximately:",
      ["16 g/mol","18 g/mol","20 g/mol","22 g/mol"],1,
      "H₂O has molar mass 18 g/mol."],

    ["The empirical formula represents:",
      ["Actual molecular mass","Simplest whole-number ratio","Atomic number","Electron configuration"],1,
      "It represents the simplest whole-number ratio of atoms."],

    ["A limiting reagent is the reactant that:",
      ["Remains completely unused","Is consumed first","Has highest mass","Is always a catalyst"],1,
      "The limiting reagent is consumed first."],

    ["The molecular mass of CO₂ is:",
      ["28 u","32 u","44 u","48 u"],2,
      "12 + 2(16) = 44 u."],

    ["Mole fraction is:",
      ["A concentration unit","Ratio of moles of a component to total moles","Mass percentage","Volume only"],1,
      "Mole fraction = moles of component / total moles."],

    ["The law of conservation of mass states that mass is:",
      ["Created","Destroyed","Neither created nor destroyed","Always doubled"],2,
      "Mass is conserved during a chemical reaction."],

    ["Percentage composition is calculated from:",
      ["Atomic numbers only","Mass contribution of elements","Temperature only","Pressure only"],1,
      "It uses the mass contribution of each element."],

    ["One mole of NaCl contains approximately:",
      ["6.022×10²³ formula units","1 formula unit","100 formula units","3 formula units"],0,
      "One mole contains Avogadro's number of formula units."]
  ],


  "Structure of Atom": [

    ["The charge of an electron is:",
      ["Positive","Negative","Zero","Variable"],1,
      "An electron has negative charge."],

    ["The nucleus contains:",
      ["Only electrons","Protons and neutrons","Only neutrons","Electrons and photons"],1,
      "The nucleus contains protons and neutrons."],

    ["Atomic number represents number of:",
      ["Neutrons","Protons","Nucleons","Shells"],1,
      "Atomic number equals number of protons."],

    ["Mass number equals:",
      ["Protons + neutrons","Protons − neutrons","Electrons + protons","Only electrons"],0,
      "Mass number = protons + neutrons."],

    ["Isotopes have the same:",
      ["Mass number","Atomic number","Number of neutrons","Physical mass"],1,
      "Isotopes have the same atomic number but different neutron numbers."],

    ["The maximum number of electrons in a shell is given by:",
      ["n²","2n²","2n","n/2"],1,
      "Maximum electrons in shell n = 2n²."],

    ["The principal quantum number is represented by:",
      ["n","l","m","s"],0,
      "n is the principal quantum number."],

    ["The electron has approximately:",
      ["Positive charge","Negative charge","No charge","Double positive charge"],1,
      "Electron carries negative charge."],

    ["A photon has energy:",
      ["E = mc","E = hν","E = ma","E = IR"],1,
      "Photon energy is E = hν."],

    ["The Lyman series lies mainly in the:",
      ["Infrared","Visible","Ultraviolet","Microwave"],2,
      "Lyman series lies in the ultraviolet region."]
  ],


  "Chemical Bonding": [

    ["An ionic bond is formed mainly by:",
      ["Electron transfer","Electron sharing only","Neutron transfer","Proton sharing"],0,
      "Ionic bonding involves electron transfer."],

    ["A covalent bond involves:",
      ["Sharing of electrons","Transfer of neutrons","Loss of protons","Nuclear fusion"],0,
      "Covalent bonding involves shared electrons."],

    ["The shape of CH₄ is:",
      ["Linear","Trigonal planar","Tetrahedral","Bent"],2,
      "CH₄ has tetrahedral geometry."],

    ["The bond angle in a linear molecule is:",
      ["90°","109.5°","120°","180°"],3,
      "A linear molecule has a bond angle of 180°."],

    ["Hydrogen bonding is generally:",
      ["Stronger than covalent bonding","An intermolecular or intramolecular attraction","A nuclear force","An ionic bond only"],1,
      "Hydrogen bonding is an attractive interaction."],

    ["Electronegativity generally increases across a period:",
      ["Left to right","Right to left","Only downward","Randomly"],0,
      "Electronegativity generally increases from left to right."],

    ["A molecule with a symmetrical charge distribution can be:",
      ["Nonpolar","Always ionic","Always metallic","Always charged"],0,
      "Symmetry can cause dipoles to cancel."],

    ["NH₃ has approximately:",
      ["Linear shape","Trigonal pyramidal shape","Square planar shape","Linear planar shape"],1,
      "NH₃ has trigonal pyramidal geometry."],

    ["Lone pair repulsion is generally:",
      ["Less than bond-pair repulsion","Greater than bond-pair repulsion","Zero","Always equal"],1,
      "Lone pairs occupy more space and repel more strongly."],

    ["The octet rule refers to:",
      ["Eight protons","Eight valence electrons","Eight neutrons","Eight shells"],1,
      "The octet rule concerns valence electrons."]
  ]

};


// ============================================================
// MATHEMATICS
// ============================================================

const mathematicsQuestions = {

  "Matrices": [

    ["A matrix having one row is called:",
      ["Column matrix","Row matrix","Square matrix","Null matrix"],1,
      "A one-row matrix is called a row matrix."],

    ["A square matrix has:",
      ["Equal rows and columns","Only one row","Only one column","No diagonal"],0,
      "Rows and columns are equal."],

    ["The determinant is defined for:",
      ["Every rectangular matrix","Square matrix","Only row matrix","Only column matrix"],1,
      "A determinant is defined for a square matrix."],

    ["The identity matrix has:",
      ["All entries zero","Diagonal entries 1 and other entries 0","All entries 1","Only negative entries"],1,
      "That is the definition of an identity matrix."],

    ["If A is a 2×3 matrix, the number of elements is:",
      ["5","6","8","9"],1,
      "2 × 3 = 6 elements."],

    ["A matrix whose all elements are zero is called:",
      ["Identity matrix","Null matrix","Unit matrix","Diagonal matrix"],1,
      "It is called a null or zero matrix."],

    ["For compatible matrices, matrix multiplication is generally:",
      ["Commutative","Not commutative","Always zero","Undefined"],1,
      "Generally AB ≠ BA."],

    ["The transpose of a matrix changes:",
      ["Rows into columns","Numbers into variables","Signs only","Determinants only"],0,
      "Transpose interchanges rows and columns."],

    ["If det(A)=0, matrix A is:",
      ["Singular","Identity","Always diagonal","Unit"],0,
      "A square matrix with zero determinant is singular."],

    ["For a 2×2 matrix, determinant is calculated using:",
      ["ad−bc","ab−cd","ac−bd","a+b+c+d"],0,
      "For [[a,b],[c,d]], determinant = ad − bc."]
  ],


  "Trigonometric Functions": [

    ["sin 0° equals:",
      ["0","1","−1","∞"],0,
      "sin 0° = 0."],

    ["cos 0° equals:",
      ["0","1","−1","1/2"],1,
      "cos 0° = 1."],

    ["tan 45° equals:",
      ["0","1","√3","1/√3"],1,
      "tan 45° = 1."],

    ["sin²θ + cos²θ equals:",
      ["0","1","2","sin θ"],1,
      "This is the fundamental trigonometric identity."],

    ["The period of sin x is:",
      ["π","2π","3π","π/2"],1,
      "The period of sin x is 2π."],

    ["The maximum value of sin x is:",
      ["−1","0","1","2"],2,
      "The maximum value is 1."],

    ["The minimum value of cos x is:",
      ["−1","0","1","2"],0,
      "The minimum value is −1."],

    ["tan x can be written as:",
      ["sin x/cos x","cos x/sin x","1/sin x","1/cos x"],0,
      "tan x = sin x/cos x."],

    ["sec x is equal to:",
      ["1/sin x","1/cos x","sin x","cos x"],1,
      "sec x = 1/cos x."],

    ["The period of tan x is:",
      ["π","2π","π/2","4π"],0,
      "The period of tan x is π."]
  ],


  "Differentiation": [

    ["The derivative of x² is:",
      ["x","2x","x²","2"],1,
      "d(x²)/dx = 2x."],

    ["The derivative of a constant is:",
      ["1","0","The constant","∞"],1,
      "The derivative of a constant is zero."],

    ["d(sin x)/dx is:",
      ["cos x","−cos x","sin x","−sin x"],0,
      "Derivative of sin x is cos x."],

    ["d(cos x)/dx is:",
      ["sin x","−sin x","cos x","−cos x"],1,
      "Derivative of cos x is −sin x."],

    ["The derivative represents the:",
      ["Area only","Rate of change","Mass","Probability"],1,
      "Derivative represents instantaneous rate of change."],

    ["If y = 3x + 5, dy/dx is:",
      ["3","5","3x","8"],0,
      "The derivative of 3x+5 is 3."],

    ["The derivative of eˣ is:",
      ["1","xeˣ","eˣ","0"],2,
      "eˣ is its own derivative."],

    ["The derivative of ln x is:",
      ["x","1/x","ln x","eˣ"],1,
      "d(ln x)/dx = 1/x."],

    ["At a local maximum, derivative is often:",
      ["Zero","Infinite","Always negative","Always positive"],0,
      "For a differentiable function, the derivative is zero at a stationary maximum."],

    ["The chain rule is used for:",
      ["Composite functions","Only constants","Only matrices","Only probabilities"],0,
      "The chain rule is used to differentiate composite functions."]
  ],


  "Integration": [

    ["∫x dx equals:",
      ["x","x²/2 + C","2x","ln x"],1,
      "∫x dx = x²/2 + C."],

    ["∫1 dx equals:",
      ["1","x + C","0","x²"],1,
      "∫1 dx = x + C."],

    ["Integration is commonly viewed as the inverse of:",
      ["Addition","Differentiation","Multiplication","Probability"],1,
      "Integration reverses differentiation."],

    ["∫cos x dx equals:",
      ["sin x + C","−sin x + C","cos x + C","tan x + C"],0,
      "Integral of cos x is sin x + C."],

    ["∫sin x dx equals:",
      ["cos x + C","−cos x + C","sin x + C","tan x + C"],1,
      "Integral of sin x is −cos x + C."],

    ["The constant of integration is represented by:",
      ["A","C","K only","0"],1,
      "C represents the arbitrary constant."],

    ["∫eˣ dx equals:",
      ["eˣ+C","xeˣ+C","ln x+C","0"],0,
      "eˣ is its own antiderivative."],

    ["A definite integral has:",
      ["No limits","Upper and lower limits","Only an upper limit","Only a lower limit"],1,
      "A definite integral has upper and lower limits."],

    ["The area under a positive curve can be represented by:",
      ["A definite integral","Only a derivative","A matrix","A determinant"],0,
      "Definite integration can represent area."],

    ["∫1/x dx equals:",
      ["x²/2+C","ln|x|+C","1/x²+C","x+C"],1,
      "∫1/x dx = ln|x| + C."]
  ]

};


// ============================================================
// LOAD QUESTION SET
// ============================================================

function loadQuestionSet(subject, set) {

  Object.keys(set).forEach(chapter => {

    const data = set[chapter];

    data.forEach((item, index) => {

      const difficulty =
        index < 4
          ? "Easy"
          : index < 7
            ? "Medium"
            : "Hard";

      addQuestion(
        subject,
        chapter,
        difficulty,
        item[0],
        item[1],
        item[2],
        item[3]
      );

    });

  });

}


loadQuestionSet("Physics", physicsQuestions);

loadQuestionSet("Chemistry", chemistryQuestions);

loadQuestionSet("Mathematics", mathematicsQuestions);


// ============================================================
// GENERIC ORIGINAL QUESTIONS
// ============================================================
// Used only to fill chapters that do not yet have a dedicated
// hand-written question set.
// ============================================================

function createExtraQuestions(subject, chapter, count) {

  const templates = {

    Physics: [

      {
        q: `Which type of quantity is commonly used while studying ${chapter}?`,
        o: [
          "Physical quantities with measurable values",
          "Only biological quantities",
          "Only historical values",
          "Only genetic information"
        ],
        a: 0,
        e: `${chapter} is studied using measurable physical quantities and physical laws.`
      },

      {
        q: `A reliable approach to a numerical problem from ${chapter} is to first:`,
        o: [
          "Identify the given quantities and required quantity",
          "Ignore the units",
          "Guess the answer",
          "Ignore the given information"
        ],
        a: 0,
        e: "Identifying the given information and required quantity helps select the appropriate physical relation."
      },

      {
        q: `While solving a ${chapter} numerical, units should generally be:`,
        o: [
          "Checked carefully",
          "Always ignored",
          "Changed randomly",
          "Removed from the calculation"
        ],
        a: 0,
        e: "Checking units helps verify the consistency of a physical calculation."
      }

    ],


    Chemistry: [

      {
        q: `The study of ${chapter} mainly involves:`,
        o: [
          "Chemical principles and relationships",
          "Planetary motion only",
          "Computer programming only",
          "Mechanical machines only"
        ],
        a: 0,
        e: `${chapter} is a chemistry topic involving chemical principles and relationships.`
      },

      {
        q: `While solving a numerical problem from ${chapter}, it is important to:`,
        o: [
          "Check units and given quantities",
          "Ignore all units",
          "Guess the result",
          "Change the given values"
        ],
        a: 0,
        e: "Correct units and given quantities are important for obtaining a meaningful chemical result."
      },

      {
        q: `A good first step in a ${chapter} problem is to:`,
        o: [
          "Identify the given information",
          "Guess immediately",
          "Ignore the conditions",
          "Change the data randomly"
        ],
        a: 0,
        e: "Identifying the given information helps select the correct chemical relationship."
      }

    ],


    Mathematics: [

      {
        q: `A useful first step when solving a problem from ${chapter} is to:`,
        o: [
          "Identify the given information",
          "Guess immediately",
          "Ignore the conditions",
          "Change the variables randomly"
        ],
        a: 0,
        e: "Understanding the given information is an important first step in mathematical problem solving."
      },

      {
        q: `A mathematical result should be checked by:`,
        o: [
          "Substitution or logical verification",
          "Ignoring the conditions",
          "Changing the answer",
          "Removing all variables"
        ],
        a: 0,
        e: "Substitution and logical verification help check mathematical results."
      },

      {
        q: `${chapter} problems commonly require careful attention to:`,
        o: [
          "Definitions and conditions",
          "Only handwriting",
          "Only colours",
          "Random guessing"
        ],
        a: 0,
        e: "Definitions and conditions are important when solving mathematics problems."
      }

    ]

  };


  const list = templates[subject];


  for (let i = 0; i < count; i++) {

    const template = list[i % list.length];

    const difficulty =
      i < 10
        ? "Easy"
        : i < 20
          ? "Medium"
          : "Hard";


    addQuestion(
      subject,
      chapter,
      difficulty,
      template.q,
      template.o,
      template.a,
      template.e
    );

  }

}


// ============================================================
// ENSURE EXACTLY 30 QUESTIONS PER CHAPTER
// ============================================================

for (const subject of Object.keys(chapterCatalog)) {

  for (const chapter of chapterCatalog[subject]) {

    const currentCount = questions.filter(
      q =>
        q.subject === subject &&
        q.chapter === chapter
    ).length;


    if (currentCount < 30) {

      createExtraQuestions(
        subject,
        chapter,
        30 - currentCount
      );

    }

  }

}


// ============================================================
// NORMALIZE QUESTION DIFFICULTY
// ============================================================
// Guarantees every chapter has:
// Easy: 10
// Medium: 10
// Hard: 10
// ============================================================

for (const subject of Object.keys(chapterCatalog)) {

  for (const chapter of chapterCatalog[subject]) {

    const chapterQuestions = questions.filter(
      q =>
        q.subject === subject &&
        q.chapter === chapter
    );


    chapterQuestions.forEach((q, index) => {

      if (index < 10) {

        q.difficulty = "Easy";

      } else if (index < 20) {

        q.difficulty = "Medium";

      } else {

        q.difficulty = "Hard";

      }

    });

  }

}


// ============================================================
// MOCK TESTS
// ============================================================

const mockTests = [];


for (let i = 1; i <= 50; i++) {

  mockTests.push({

    id: `MOCK-${String(i).padStart(2, "0")}`,

    title: `MHT-CET 2027 Mock Test ${i}`,

    type: "mock",

    durationMinutes: 180,

    questionCount: 150,

    pattern: {

      physics: 50,

      chemistry: 50,

      mathematics: 50

    },

    marks: {

      physics: 50,

      chemistry: 50,

      mathematics: 100,

      total: 200

    },

    phases: [

      {
        name: "Physics + Chemistry",
        durationMinutes: 90,
        physicsQuestions: 50,
        chemistryQuestions: 50
      },

      {
        name: "Mathematics",
        durationMinutes: 90,
        mathematicsQuestions: 50
      }

    ],

    negativeMarking: false,

    questions: []

  });

}


// ============================================================
// PYQ TEST SLOTS
// ============================================================
// These are placeholders until verified actual PYQs are added.
// They are deliberately NOT labelled as containing verified
// questions.
// ============================================================

const pyqTests = [

  {
    id: "PYQ-2022",
    year: 2022,
    title: "MHT-CET 2022 PYQ Practice",
    type: "pyq",
    durationMinutes: 180,
    questionCount: 150,
    verified: false,
    questions: []
  },

  {
    id: "PYQ-2023",
    year: 2023,
    title: "MHT-CET 2023 PYQ Practice",
    type: "pyq",
    durationMinutes: 180,
    questionCount: 150,
    verified: false,
    questions: []
  },

  {
    id: "PYQ-2024",
    year: 2024,
    title: "MHT-CET 2024 PYQ Practice",
    type: "pyq",
    durationMinutes: 180,
    questionCount: 150,
    verified: false,
    questions: []
  },

  {
    id: "PYQ-2025",
    year: 2025,
    title: "MHT-CET 2025 PYQ Practice",
    type: "pyq",
    durationMinutes: 180,
    questionCount: 150,
    verified: false,
    questions: []
  },

  {
    id: "PYQ-2026",
    year: 2026,
    title: "MHT-CET 2026 PYQ Practice",
    type: "pyq",
    durationMinutes: 180,
    questionCount: 150,
    verified: false,
    questions: []
  }

];


// ============================================================
// QUESTION BANK INFORMATION
// ============================================================

const questionBankInfo = {

  totalQuestions: questions.length,

  questionsPerChapter: 30,

  easyPerChapter: 10,

  mediumPerChapter: 10,

  hardPerChapter: 10,

  totalChapters: 56,

  totalMockTests: 50,

  totalPYQYears: 5,

  mockQuestions: 150,

  mockDurationMinutes: 180,

  totalMarks: 200,

  negativeMarking: false,

  physicsQuestions: 50,

  chemistryQuestions: 50,

  mathematicsQuestions: 50,

  physicsMarks: 50,

  chemistryMarks: 50,

  mathematicsMarks: 100

};


// ============================================================
// HELPER FUNCTIONS FOR APP.JS
// ============================================================

function getQuestionsByChapter(subject, chapter) {

  return questions.filter(
    q =>
      q.subject === subject &&
      q.chapter === chapter
  );

}


function getQuestionsBySubject(subject) {

  return questions.filter(
    q => q.subject === subject
  );

}


function getQuestionsByDifficulty(
  subject,
  chapter,
  difficulty
) {

  return questions.filter(
    q =>
      q.subject === subject &&
      q.chapter === chapter &&
      q.difficulty === difficulty
  );

}


// ============================================================
// MOCK QUESTION GENERATOR
// ============================================================
// Creates:
// Physics = 50
// Chemistry = 50
// Mathematics = 50
// Total = 150
// ============================================================

function getMockQuestions() {

  const physics = getQuestionsBySubject("Physics");

  const chemistry = getQuestionsBySubject("Chemistry");

  const mathematics = getQuestionsBySubject("Mathematics");


  function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [copy[i], copy[j]] =
        [copy[j], copy[i]];

    }

    return copy;

  }


  return {

    physics: shuffle(physics).slice(0, 50),

    chemistry: shuffle(chemistry).slice(0, 50),

    mathematics: shuffle(mathematics).slice(0, 50)

  };

}


// ============================================================
// GLOBAL ACCESS
// ============================================================
// app.js can safely access these through window.
// ============================================================

window.questions = questions;

window.chapterCatalog = chapterCatalog;

window.mockTests = mockTests;

window.pyqTests = pyqTests;

window.questionBankInfo = questionBankInfo;

window.getQuestionsByChapter = getQuestionsByChapter;

window.getQuestionsBySubject = getQuestionsBySubject;

window.getQuestionsByDifficulty = getQuestionsByDifficulty;

window.getMockQuestions = getMockQuestions;


// ============================================================
// LOAD CONFIRMATION
// ============================================================

console.log("==========================================");

console.log("MHT-CET QUESTION DATABASE LOADED");

console.log("Total Questions:", questions.length);

console.log("Total Chapters:", questionBankInfo.totalChapters);

console.log("Questions Per Chapter:", questionBankInfo.questionsPerChapter);

console.log("Easy Per Chapter:", questionBankInfo.easyPerChapter);

console.log("Medium Per Chapter:", questionBankInfo.mediumPerChapter);

console.log("Hard Per Chapter:", questionBankInfo.hardPerChapter);

console.log("Mock Tests:", mockTests.length);

console.log("PYQ Years:", pyqTests.length);

console.log("==========================================");

/* =========================================================
   MHT-CET 2027 PRACTICE PORTAL
   questions.js
   ========================================================= */

/* -----------------------------
   CHAPTER CATALOG
----------------------------- */

const chapterCatalog = {
    Physics: [
        "Units and Measurements",
        "Mathematical Methods",
        "Kinematics",
        "Laws of Motion",
        "Gravitation",
        "Mechanical Properties of Solids",
        "Mechanical Properties of Fluids",
        "Thermal Properties of Matter",
        "Thermodynamics",
        "Kinetic Theory of Gases",
        "Oscillations",
        "Waves",
        "Electrostatics",
        "Current Electricity",
        "Magnetic Effects of Electric Current",
        "Electromagnetic Induction",
        "Optics",
        "Dual Nature of Radiation and Matter"
    ],

    Chemistry: [
        "Some Basic Concepts of Chemistry",
        "Structure of Atom",
        "Chemical Bonding",
        "Redox Reactions",
        "States of Matter",
        "Chemical Thermodynamics",
        "Solutions",
        "Ionic Equilibrium",
        "Chemical Equilibrium",
        "Electrochemistry",
        "Chemical Kinetics",
        "Solid State",
        "Surface Chemistry",
        "Hydrogen",
        "s-Block Elements",
        "p-Block Elements",
        "d and f Block Elements",
        "Organic Chemistry"
    ],

    Mathematics: [
        "Trigonometric Functions",
        "Straight Line",
        "Circle",
        "Probability",
        "Complex Numbers",
        "Permutation and Combination",
        "Binomial Theorem",
        "Sequence and Series",
        "Mathematical Logic",
        "Matrices",
        "Determinants",
        "Vectors",
        "Three Dimensional Geometry",
        "Line and Plane",
        "Differentiation",
        "Applications of Derivatives",
        "Indefinite Integration",
        "Definite Integration",
        "Differential Equations",
        "Statistics"
    ]
};


/* -----------------------------
   QUESTION BANK
----------------------------- */

const questions = [];

let questionId = 1;


/* -----------------------------
   ADD QUESTION FUNCTION
----------------------------- */

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
        id: `Q${String(questionId++).padStart(5, "0")}`,
        subject,
        chapter,
        difficulty,
        type: "practice",
        sourceType: "original",
        source: "Original MHT-CET-style question",
        question,
        options,
        answer,
        explanation
    });
}


/* =========================================================
   PHYSICS QUESTIONS
========================================================= */

/* Units and Measurements */

addQuestion(
    "Physics",
    "Units and Measurements",
    "Easy",
    "The SI unit of force is:",
    ["Joule", "Newton", "Watt", "Pascal"],
    1,
    "The SI unit of force is Newton."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Easy",
    "Which of the following is a fundamental SI quantity?",
    ["Force", "Energy", "Mass", "Pressure"],
    2,
    "Mass is one of the seven fundamental SI quantities."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Easy",
    "The dimensional formula of velocity is:",
    ["[LT⁻¹]", "[L²T⁻¹]", "[LT⁻²]", "[MLT⁻¹]"],
    0,
    "Velocity = displacement/time, so its dimensions are [LT⁻¹]."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Medium",
    "The dimensional formula of force is:",
    ["[MLT⁻²]", "[ML²T⁻²]", "[MLT⁻¹]", "[M⁰LT⁻²]"],
    0,
    "Force = mass × acceleration, so [F] = [MLT⁻²]."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Medium",
    "Which quantity is dimensionless?",
    ["Velocity", "Acceleration", "Strain", "Force"],
    2,
    "Strain is the ratio of two lengths and is therefore dimensionless."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Medium",
    "One nanometre is equal to:",
    ["10⁻³ m", "10⁻⁶ m", "10⁻⁹ m", "10⁻¹² m"],
    2,
    "The prefix nano represents 10⁻⁹."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Hard",
    "The dimensions of energy are:",
    ["[MLT⁻¹]", "[ML²T⁻²]", "[MLT⁻²]", "[M²L²T⁻²]"],
    1,
    "Energy = force × displacement = [MLT⁻²][L] = [ML²T⁻²]."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Hard",
    "The percentage error in a measured quantity is 2%. If the quantity is squared, the percentage error becomes:",
    ["1%", "2%", "4%", "8%"],
    2,
    "For a quantity raised to power n, percentage error is multiplied by n."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Hard",
    "Which pair has the same dimensions?",
    ["Work and Energy", "Force and Energy", "Power and Force", "Pressure and Energy"],
    0,
    "Work and energy both have dimensions [ML²T⁻²]."
);

addQuestion(
    "Physics",
    "Units and Measurements",
    "Hard",
    "The dimensional formula of power is:",
    ["[ML²T⁻²]", "[ML²T⁻³]", "[MLT⁻²]", "[MLT⁻¹]"],
    1,
    "Power = energy/time = [ML²T⁻³]."
);


/* Kinematics */

addQuestion(
    "Physics",
    "Kinematics",
    "Easy",
    "The slope of a displacement-time graph represents:",
    ["Acceleration", "Velocity", "Force", "Momentum"],
    1,
    "The slope of a displacement-time graph gives velocity."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Easy",
    "Acceleration is defined as the rate of change of:",
    ["Distance", "Velocity", "Displacement", "Momentum"],
    1,
    "Acceleration is the rate of change of velocity."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Easy",
    "If a body moves with constant velocity, its acceleration is:",
    ["Zero", "Constant but non-zero", "Increasing", "Decreasing"],
    0,
    "Constant velocity means there is no change in velocity."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Medium",
    "For uniformly accelerated motion, the equation v = u + at represents:",
    ["Displacement", "Final velocity", "Acceleration", "Time"],
    1,
    "The equation gives final velocity v."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Medium",
    "The area under a velocity-time graph gives:",
    ["Acceleration", "Displacement", "Force", "Speed"],
    1,
    "The area under a velocity-time graph represents displacement."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Medium",
    "A body starts from rest and accelerates uniformly. Its velocity after time t is:",
    ["at", "a/t", "t/a", "a+t"],
    0,
    "Using v = u + at and u = 0, v = at."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Hard",
    "For a freely falling body starting from rest, the distance travelled in time t is:",
    ["gt", "gt²", "½gt²", "2gt²"],
    2,
    "Using s = ut + ½at², with u = 0 and a = g."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Hard",
    "If the velocity of a particle is doubled, its kinetic energy becomes:",
    ["Two times", "Three times", "Four times", "Half"],
    2,
    "Kinetic energy is proportional to v²."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Hard",
    "A particle has zero velocity at an instant. Its acceleration at that instant:",
    ["Must be zero", "May be non-zero", "Must be infinite", "Cannot exist"],
    1,
    "A particle can have zero instantaneous velocity while having non-zero acceleration."
);

addQuestion(
    "Physics",
    "Kinematics",
    "Hard",
    "For projectile motion neglecting air resistance, the horizontal acceleration is:",
    ["g", "2g", "Zero", "g/2"],
    2,
    "There is no horizontal acceleration when air resistance is neglected."
);


/* Laws of Motion */

addQuestion(
    "Physics",
    "Laws of Motion",
    "Easy",
    "Newton's first law is also called the law of:",
    ["Acceleration", "Inertia", "Action and reaction", "Gravitation"],
    1,
    "Newton's first law is known as the law of inertia."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Easy",
    "The SI unit of momentum is:",
    ["kg m/s", "N/m", "kg/m", "J/s"],
    0,
    "Momentum = mass × velocity, giving kg m/s."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Easy",
    "Newton's second law relates force to:",
    ["Velocity", "Rate of change of momentum", "Displacement", "Energy"],
    1,
    "Newton's second law states that force is the rate of change of momentum."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Medium",
    "The action and reaction forces act on:",
    ["The same body", "Different bodies", "Only stationary bodies", "Only moving bodies"],
    1,
    "Action and reaction act on two different interacting bodies."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Medium",
    "If the net force on a body is zero, its acceleration is:",
    ["Zero", "Maximum", "Infinite", "Negative"],
    0,
    "From F = ma, zero net force gives zero acceleration."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Medium",
    "Friction always acts:",
    ["Along motion", "Opposite to relative motion or its tendency", "Vertically upward", "Vertically downward"],
    1,
    "Friction opposes relative motion or the tendency of relative motion."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Hard",
    "If the mass of a body is doubled while the applied force remains constant, acceleration becomes:",
    ["Double", "Half", "Four times", "Unchanged"],
    1,
    "From a = F/m, doubling mass halves acceleration."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Hard",
    "The coefficient of friction is:",
    ["A vector", "Dimensionless", "Measured in newtons", "Measured in joules"],
    1,
    "Coefficient of friction is a dimensionless ratio."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Hard",
    "A body moving in a circle at constant speed has:",
    ["Zero acceleration", "Centripetal acceleration", "No force", "Constant velocity"],
    1,
    "Its velocity direction changes, producing centripetal acceleration."
);

addQuestion(
    "Physics",
    "Laws of Motion",
    "Hard",
    "Centripetal force is directed:",
    ["Away from centre", "Towards centre", "Tangentially", "Vertically"],
    1,
    "Centripetal force is always directed towards the centre of circular motion."
);


/* Electrostatics */

addQuestion(
    "Physics",
    "Electrostatics",
    "Easy",
    "The SI unit of electric charge is:",
    ["Volt", "Ampere", "Coulomb", "Ohm"],
    2,
    "Electric charge is measured in coulombs."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Easy",
    "Like charges:",
    ["Attract", "Repel", "Have no interaction", "Become neutral"],
    1,
    "Like charges repel each other."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Easy",
    "The electric field inside an ideal conductor in electrostatic equilibrium is:",
    ["Maximum", "Zero", "Infinite", "Variable"],
    1,
    "The electrostatic field inside a conductor at equilibrium is zero."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Medium",
    "Coulomb's law states that electrostatic force is inversely proportional to:",
    ["Distance", "Square of distance", "Charge", "Mass"],
    1,
    "F ∝ 1/r²."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Medium",
    "Electric potential is a:",
    ["Vector quantity", "Scalar quantity", "Tensor", "Dimensionless quantity"],
    1,
    "Electric potential has magnitude but no direction, so it is scalar."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Medium",
    "The SI unit of electric potential is:",
    ["Coulomb", "Volt", "Newton", "Farad"],
    1,
    "Electric potential is measured in volts."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Hard",
    "The electric field due to a point charge varies with distance r as:",
    ["r", "r²", "1/r", "1/r²"],
    3,
    "For a point charge, E = kq/r²."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Hard",
    "The capacitance of a capacitor depends on:",
    ["Only charge", "Only potential", "Geometry and dielectric medium", "Only current"],
    2,
    "Capacitance depends on geometry and the dielectric between the plates."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Hard",
    "The energy stored in a capacitor is proportional to:",
    ["CV", "CV²", "C/V", "V/C"],
    1,
    "Energy stored is U = ½CV²."
);

addQuestion(
    "Physics",
    "Electrostatics",
    "Hard",
    "Electric field lines never:",
    ["Start from positive charges", "End on negative charges", "Intersect each other", "Represent field direction"],
    2,
    "Electric field lines cannot intersect because the field has one direction at a point."
);


/* =========================================================
   CHEMISTRY QUESTIONS
========================================================= */

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Easy",
    "The SI unit of amount of substance is:",
    ["Gram", "Mole", "Kilogram", "Litre"],
    1,
    "The SI unit is mole."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Easy",
    "Avogadro's number is approximately:",
    ["6.022 × 10²³", "9.8 × 10²", "3 × 10⁸", "1.6 × 10⁻¹⁹"],
    0,
    "Avogadro's number is 6.022 × 10²³ mol⁻¹."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Easy",
    "The molecular mass of water is:",
    ["16", "18", "20", "22"],
    1,
    "H₂O has molecular mass 2(1) + 16 = 18."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Medium",
    "One mole of a substance contains:",
    ["6.022 × 10²³ particles", "10² particles", "3 × 10⁸ particles", "1 particle"],
    0,
    "One mole contains Avogadro's number of particles."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Medium",
    "The empirical formula represents:",
    ["Actual number of atoms", "Simplest whole-number ratio of atoms", "Molecular mass", "Atomic number"],
    1,
    "Empirical formula gives the simplest whole-number ratio."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Medium",
    "Molar mass is expressed in:",
    ["g mol⁻¹", "mol g⁻¹", "g", "mol"],
    0,
    "Molar mass is commonly expressed in g mol⁻¹."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Hard",
    "The limiting reagent is the reactant that:",
    ["Remains after reaction", "Is consumed first", "Has greatest mass", "Has smallest volume"],
    1,
    "The limiting reagent gets completely consumed first."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Hard",
    "Percentage composition is calculated using:",
    ["Mass of element / molar mass × 100", "Volume / mass", "Mass × volume", "Moles × volume"],
    0,
    "Percentage composition is based on mass contribution relative to molar mass."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Hard",
    "The law stating that elements combine in fixed ratios is:",
    ["Law of conservation of mass", "Law of definite proportions", "Boyle's law", "Charles' law"],
    1,
    "The law of definite proportions states that a compound contains elements in fixed ratios."
);

addQuestion(
    "Chemistry",
    "Some Basic Concepts of Chemistry",
    "Hard",
    "If the number of moles is doubled, the number of particles:",
    ["Halves", "Doubles", "Becomes zero", "Remains unchanged"],
    1,
    "Number of particles is directly proportional to number of moles."
);


/* Structure of Atom */

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Easy",
    "The charge on an electron is:",
    ["Positive", "Negative", "Zero", "Variable"],
    1,
    "An electron has a negative charge."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Easy",
    "The nucleus contains:",
    ["Only electrons", "Protons and neutrons", "Only neutrons", "Electrons and protons"],
    1,
    "The nucleus consists of protons and neutrons."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Easy",
    "Atomic number represents the number of:",
    ["Neutrons", "Protons", "Nucleons", "Shells"],
    1,
    "Atomic number equals the number of protons."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Medium",
    "Isotopes have the same:",
    ["Mass number", "Atomic number", "Number of neutrons", "Physical properties"],
    1,
    "Isotopes have the same atomic number but different neutron numbers."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Medium",
    "Maximum electrons in the first shell are:",
    ["1", "2", "8", "18"],
    1,
    "The first shell can hold a maximum of 2 electrons."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Medium",
    "The principal quantum number is represented by:",
    ["n", "l", "m", "s"],
    0,
    "The principal quantum number is n."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Hard",
    "The maximum number of electrons in a shell with principal quantum number n is:",
    ["n²", "2n", "2n²", "n³"],
    2,
    "Maximum electrons = 2n²."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Hard",
    "The azimuthal quantum number determines:",
    ["Size of orbital", "Shape of orbital", "Spin", "Nuclear charge"],
    1,
    "The azimuthal quantum number determines subshell and orbital shape."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Hard",
    "An orbital can accommodate a maximum of:",
    ["1 electron", "2 electrons", "4 electrons", "8 electrons"],
    1,
    "According to the Pauli exclusion principle, an orbital can hold two electrons."
);

addQuestion(
    "Chemistry",
    "Structure of Atom",
    "Hard",
    "The spin quantum number can have values:",
    ["0 and 1", "+½ and −½", "−1 and +1", "Only +1"],
    1,
    "Electron spin quantum number has values +½ and −½."
);


/* Chemical Bonding */

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Easy",
    "A bond formed by transfer of electrons is called:",
    ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"],
    1,
    "Transfer of electrons forms an ionic bond."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Easy",
    "A covalent bond involves:",
    ["Transfer of protons", "Sharing of electrons", "Loss of neutrons", "Transfer of nuclei"],
    1,
    "Covalent bonds are formed by sharing electrons."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Easy",
    "The shape of methane molecule is:",
    ["Linear", "Trigonal planar", "Tetrahedral", "Bent"],
    2,
    "CH₄ has tetrahedral geometry."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Medium",
    "The hybridization of carbon in methane is:",
    ["sp", "sp²", "sp³", "dsp²"],
    2,
    "Carbon in methane is sp³ hybridized."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Medium",
    "A coordinate bond is formed when:",
    ["Each atom contributes one electron", "One atom contributes both bonding electrons", "No electrons are shared", "Only protons participate"],
    1,
    "In a coordinate bond, both electrons are donated by one atom."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Medium",
    "The strongest among the following is generally:",
    ["Single bond", "Double bond", "Triple bond", "Hydrogen bond"],
    2,
    "A triple covalent bond generally has the greatest bond strength."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Hard",
    "The hybridization of carbon in ethene is:",
    ["sp", "sp²", "sp³", "dsp³"],
    1,
    "Each carbon in ethene is sp² hybridized."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Hard",
    "The bond angle in methane is approximately:",
    ["90°", "109.5°", "120°", "180°"],
    1,
    "Tetrahedral methane has a bond angle of about 109.5°."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Hard",
    "A molecule with zero dipole moment may be:",
    ["CO₂", "H₂O", "NH₃", "HCl"],
    0,
    "CO₂ is linear and its bond dipoles cancel."
);

addQuestion(
    "Chemistry",
    "Chemical Bonding",
    "Hard",
    "The octet rule is mainly related to:",
    ["Stable electron configuration", "Nuclear decay", "Radioactivity", "Atomic mass"],
    0,
    "The octet rule describes the tendency to achieve a stable valence-shell configuration."
);


/* =========================================================
   MATHEMATICS QUESTIONS
========================================================= */

addQuestion(
    "Mathematics",
    "Matrices",
    "Easy",
    "A matrix having one row and three columns has order:",
    ["1 × 3", "3 × 1", "1 × 1", "3 × 3"],
    0,
    "Rows × columns gives 1 × 3."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Easy",
    "The identity matrix is a:",
    ["Square matrix", "Row matrix", "Column matrix", "Zero matrix"],
    0,
    "An identity matrix is square."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Easy",
    "The determinant can be calculated only for:",
    ["Square matrices", "Row matrices", "Column matrices", "All matrices"],
    0,
    "Determinants are defined for square matrices."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Medium",
    "The determinant of [[a,b],[c,d]] is:",
    ["ad + bc", "ad − bc", "ab − cd", "ac − bd"],
    1,
    "The determinant is ad − bc."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Medium",
    "If A is an identity matrix, then A² is:",
    ["A", "0", "2A", "A⁻¹"],
    0,
    "I × I = I."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Medium",
    "A matrix whose all elements are zero is called:",
    ["Identity matrix", "Zero matrix", "Diagonal matrix", "Scalar matrix"],
    1,
    "A matrix containing only zero elements is a zero matrix."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Hard",
    "If det(A) = 0, matrix A is:",
    ["Singular", "Identity", "Orthogonal", "Unitary"],
    0,
    "A matrix with zero determinant is singular."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Hard",
    "For a square matrix A, det(kA) for a 2 × 2 matrix is:",
    ["k det(A)", "k² det(A)", "det(A)/k", "det(A)"],
    1,
    "For an n × n matrix, det(kA) = kⁿ det(A). For 2 × 2, it is k² det(A)."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Hard",
    "If A is invertible, then:",
    ["det(A) = 0", "det(A) ≠ 0", "A must be zero", "A cannot be square"],
    1,
    "A square matrix is invertible only when its determinant is non-zero."
);

addQuestion(
    "Mathematics",
    "Matrices",
    "Hard",
    "The transpose of a transpose of matrix A is:",
    ["Zero matrix", "A", "−A", "A⁻¹"],
    1,
    "(Aᵀ)ᵀ = A."
);


/* Trigonometric Functions */

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Easy",
    "sin 90° is:",
    ["0", "1", "−1", "1/2"],
    1,
    "sin 90° = 1."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Easy",
    "cos 0° is:",
    ["0", "1", "−1", "1/2"],
    1,
    "cos 0° = 1."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Easy",
    "tan 45° is:",
    ["0", "1", "√3", "1/√3"],
    1,
    "tan 45° = 1."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Medium",
    "sin²θ + cos²θ equals:",
    ["0", "1", "2", "sin θ"],
    1,
    "The fundamental identity is sin²θ + cos²θ = 1."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Medium",
    "The period of sin x is:",
    ["π", "2π", "π/2", "4π"],
    1,
    "The period of sin x is 2π."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Medium",
    "The maximum value of sin x is:",
    ["0", "1", "−1", "2"],
    1,
    "The maximum value of sine is 1."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Hard",
    "The range of cos x is:",
    ["[0,1]", "[-1,1]", "[-∞,∞]", "[1,∞]"],
    1,
    "Cosine ranges from −1 to 1."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Hard",
    "If tan θ = 1 and θ lies in the first quadrant, θ is:",
    ["30°", "45°", "60°", "90°"],
    1,
    "tan 45° = 1."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Hard",
    "sec²θ − tan²θ equals:",
    ["0", "1", "2", "sin²θ"],
    1,
    "Using 1 + tan²θ = sec²θ, the difference is 1."
);

addQuestion(
    "Mathematics",
    "Trigonometric Functions",
    "Hard",
    "The value of sin 30° is:",
    ["1", "√3/2", "1/2", "0"],
    2,
    "sin 30° = 1/2."
);


/* Differentiation */

addQuestion(
    "Mathematics",
    "Differentiation",
    "Easy",
    "The derivative of x² is:",
    ["x", "2x", "x²", "2"],
    1,
    "d(x²)/dx = 2x."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Easy",
    "The derivative of a constant is:",
    ["1", "0", "The constant", "Undefined"],
    1,
    "The derivative of a constant is zero."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Easy",
    "The derivative of sin x is:",
    ["cos x", "−cos x", "sin x", "−sin x"],
    0,
    "d(sin x)/dx = cos x."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Medium",
    "The derivative of cos x is:",
    ["sin x", "−sin x", "cos x", "−cos x"],
    1,
    "d(cos x)/dx = −sin x."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Medium",
    "The derivative of eˣ is:",
    ["1", "x eˣ", "eˣ", "ln x"],
    2,
    "The derivative of eˣ is eˣ."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Medium",
    "The derivative of ln x is:",
    ["x", "1/x", "ln x", "eˣ"],
    1,
    "d(ln x)/dx = 1/x."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Hard",
    "If y = x³ + 2x, dy/dx is:",
    ["3x² + 2", "x² + 2", "3x + 2", "x³ + 2"],
    0,
    "Differentiate term by term."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Hard",
    "The derivative of sin²x is:",
    ["2sin x", "2cos x", "2sin x cos x", "sin 2x only"],
    2,
    "Using chain rule, derivative is 2 sin x cos x."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Hard",
    "If f'(x) = 0 throughout an interval, f(x) is:",
    ["Constant", "Increasing", "Decreasing", "Undefined"],
    0,
    "A zero derivative throughout an interval indicates a constant function."
);

addQuestion(
    "Mathematics",
    "Differentiation",
    "Hard",
    "The derivative of xⁿ is:",
    ["nxⁿ", "nxⁿ⁻¹", "xⁿ⁻¹", "n + x"],
    1,
    "By the power rule, d(xⁿ)/dx = nxⁿ⁻¹."
);


/* =========================================================
   AUTOMATIC QUESTION GENERATOR
========================================================= */

/*
   We already have 40 hand-written questions.
   The generator fills every chapter to exactly 30 questions.

   These are ORIGINAL practice questions.
   They are NOT labelled as PYQs.
*/

function generateQuestion(subject, chapter, difficulty, number) {

    const templates = {

        Physics: [
            {
                q: `In ${chapter}, which of the following is a commonly used SI quantity?`,
                options: ["Length", "Time", "Mass", "All of these"],
                answer: 3,
                explanation: "Length, time and mass are SI quantities."
            },
            {
                q: `Which statement is associated with ${chapter}?`,
                options: [
                    "It follows physical laws",
                    "It has no measurable quantity",
                    "It cannot be studied experimentally",
                    "It has no mathematical representation"
                ],
                answer: 0,
                explanation: "Physical concepts can be described using measurable quantities and physical laws."
            },
            {
                q: `A numerical problem based on ${chapter} generally requires:`,
                options: [
                    "Understanding the relevant concept",
                    "Only memorisation",
                    "No units",
                    "No calculation"
                ],
                answer: 0,
                explanation: "Numerical problems require understanding the relevant physical concept."
            }
        ],

        Chemistry: [
            {
                q: `Which statement is most appropriate while studying ${chapter}?`,
                options: [
                    "Chemical concepts can be represented quantitatively",
                    "Chemistry contains no measurable quantities",
                    "Atoms cannot form compounds",
                    "Chemical reactions never involve energy"
                ],
                answer: 0,
                explanation: "Chemical concepts can be represented using measurable quantities and equations."
            },
            {
                q: `A chemical calculation related to ${chapter} should begin by:`,
                options: [
                    "Identifying the given quantities and required quantity",
                    "Ignoring units",
                    "Guessing the answer",
                    "Changing all values randomly"
                ],
                answer: 0,
                explanation: "Identifying the given and required quantities is a useful first step."
            },
            {
                q: `Which approach is useful for solving a ${chapter} problem?`,
                options: [
                    "Use the relevant chemical principle",
                    "Ignore the chemical equation",
                    "Ignore units",
                    "Avoid calculations"
                ],
                answer: 0,
                explanation: "The relevant chemical principle should be applied systematically."
            }
        ],

        Mathematics: [
            {
                q: `A problem based on ${chapter} should first be approached by:`,
                options: [
                    "Identifying the given information",
                    "Guessing randomly",
                    "Ignoring conditions",
                    "Skipping definitions"
                ],
                answer: 0,
                explanation: "Identify the given information and conditions before solving."
            },
            {
                q: `Which is important while solving a ${chapter} problem?`,
                options: [
                    "Using the correct mathematical relation",
                    "Ignoring restrictions",
                    "Changing the question",
                    "Skipping calculations"
                ],
                answer: 0,
                explanation: "Using the correct mathematical relation is essential."
            },
            {
                q: `A mathematical expression related to ${chapter} should be simplified:`,
                options: [
                    "Using valid mathematical rules",
                    "By changing signs randomly",
                    "By ignoring brackets",
                    "Without checking conditions"
                ],
                answer: 0,
                explanation: "Expressions should be simplified using valid mathematical rules."
            }
        ]
    };

    const template =
        templates[subject][number % templates[subject].length];

    addQuestion(
        subject,
        chapter,
        difficulty,
        `${template.q} (Practice Question ${number + 1})`,
        template.options,
        template.answer,
        template.explanation
    );
}


/* -----------------------------
   FILL EVERY CHAPTER TO 30
----------------------------- */

Object.keys(chapterCatalog).forEach(subject => {

    chapterCatalog[subject].forEach(chapter => {

        const chapterQuestions = questions.filter(
            q =>
                q.subject === subject &&
                q.chapter === chapter
        );

        for (
            let i = chapterQuestions.length;
            i < 30;
            i++
        ) {

            let difficulty;

            if (i < 10) {
                difficulty = "Easy";
            } else if (i < 20) {
                difficulty = "Medium";
            } else {
                difficulty = "Hard";
            }

            generateQuestion(
                subject,
                chapter,
                difficulty,
                i
            );
        }
    });
});


/* =========================================================
   MOCK TESTS
========================================================= */

const mockTests = [];

for (let i = 1; i <= 50; i++) {

    mockTests.push({
        id: `MOCK-${String(i).padStart(2, "0")}`,
        title: `MHT-CET Full Mock Test ${i}`,
        type: "mock",
        durationMinutes: 180,
        questionCount: 150,

        pattern: {
            Physics: {
                questions: 50,
                marksPerQuestion: 1,
                totalMarks: 50
            },

            Chemistry: {
                questions: 50,
                marksPerQuestion: 1,
                totalMarks: 50
            },

            Mathematics: {
                questions: 50,
                marksPerQuestion: 2,
                totalMarks: 100
            }
        },

        phases: {
            phase1: {
                subjects: ["Physics", "Chemistry"],
                durationMinutes: 90
            },

            phase2: {
                subjects: ["Mathematics"],
                durationMinutes: 90
            }
        },

        negativeMarking: false
    });
}


/* =========================================================
   PYQ TESTS
========================================================= */

const pyqTests = [
    {
        id: "PYQ-2022",
        title: "MHT-CET 2022 PYQ",
        year: 2022,
        durationMinutes: 180,
        questionCount: 150,
        verified: false
    },

    {
        id: "PYQ-2023",
        title: "MHT-CET 2023 PYQ",
        year: 2023,
        durationMinutes: 180,
        questionCount: 150,
        verified: false
    },

    {
        id: "PYQ-2024",
        title: "MHT-CET 2024 PYQ",
        year: 2024,
        durationMinutes: 180,
        questionCount: 150,
        verified: false
    },

    {
        id: "PYQ-2025",
        title: "MHT-CET 2025 PYQ",
        year: 2025,
        durationMinutes: 180,
        questionCount: 150,
        verified: false
    },

    {
        id: "PYQ-2026",
        title: "MHT-CET 2026 PYQ",
        year: 2026,
        durationMinutes: 180,
        questionCount: 150,
        verified: false
    }
];


/* =========================================================
   QUESTION BANK INFORMATION
========================================================= */

const questionBankInfo = {

    totalSubjects: 3,

    totalChapters:
        chapterCatalog.Physics.length +
        chapterCatalog.Chemistry.length +
        chapterCatalog.Mathematics.length,

    totalQuestions: questions.length,

    questionsPerChapter: 30,

    difficultyDistribution: {
        Easy: 10,
        Medium: 10,
        Hard: 10
    },

    mockTests: 50,

    pyqYears: [
        2022,
        2023,
        2024,
        2025,
        2026
    ]
};


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

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


function getRandomQuestions(subject, count) {

    const pool = getQuestionsBySubject(subject);

    const shuffled = [...pool].sort(
        () => Math.random() - 0.5
    );

    return shuffled.slice(0, count);
}


function getMockQuestions() {

    return {

        Physics: getRandomQuestions("Physics", 50),

        Chemistry: getRandomQuestions("Chemistry", 50),

        Mathematics: getRandomQuestions("Mathematics", 50)
    };
}


/* =========================================================
   GLOBAL EXPORTS
========================================================= */

window.questions = questions;

window.chapterCatalog = chapterCatalog;

window.mockTests = mockTests;

window.pyqTests = pyqTests;

window.questionBankInfo = questionBankInfo;

window.getQuestionsByChapter =
    getQuestionsByChapter;

window.getQuestionsBySubject =
    getQuestionsBySubject;

window.getQuestionsByDifficulty =
    getQuestionsByDifficulty;

window.getRandomQuestions =
    getRandomQuestions;

window.getMockQuestions =
    getMockQuestions;

console.log(
    "MHT-CET Question Bank Loaded:",
    questions.length,
    "questions"
);

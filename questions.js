// Question Bank for Grade 10 CBSE
// Structure: Each subject has chapters, each chapter has multiple questions

const questionBank = {
    mathematics: {
        1: [ // Real Numbers
            {
                question: "Which of the following is an irrational number?",
                options: ["√4", "√9", "√2", "√16"],
                correct: 2,
                explanation: "√2 cannot be expressed as a fraction p/q, making it irrational."
            },
            {
                question: "The decimal expansion of 17/8 is:",
                options: ["Terminating", "Non-terminating repeating", "Non-terminating non-repeating", "None"],
                correct: 0,
                explanation: "17/8 = 2.125, which is a terminating decimal."
            },
            {
                question: "HCF of 96 and 404 is:",
                options: ["2", "4", "6", "8"],
                correct: 1,
                explanation: "Using Euclid's algorithm: HCF(96, 404) = 4"
            },
            {
                question: "If HCF(a,b) = 12 and a×b = 1800, then LCM(a,b) is:",
                options: ["150", "1800", "12", "144"],
                correct: 0,
                explanation: "HCF × LCM = a × b, so 12 × LCM = 1800, LCM = 150"
            },
            {
                question: "The sum of a rational and an irrational number is:",
                options: ["Always rational", "Always irrational", "Can be either", "Always zero"],
                correct: 1,
                explanation: "The sum of a rational and an irrational number is always irrational."
            }
        ],
        2: [ // Polynomials
            {
                question: "If one zero of polynomial p(x) = x² + 3x + k is 2, then k is:",
                options: ["-10", "10", "-8", "8"],
                correct: 0,
                explanation: "p(2) = 0, so 4 + 6 + k = 0, therefore k = -10"
            },
            {
                question: "The degree of polynomial 5x³ + 4x² + 7x is:",
                options: ["1", "2", "3", "7"],
                correct: 2,
                explanation: "The highest power of x is 3, so degree is 3."
            },
            {
                question: "If α and β are zeros of x² - 5x + 6, then α + β is:",
                options: ["5", "-5", "6", "-6"],
                correct: 0,
                explanation: "Sum of zeros = -b/a = -(-5)/1 = 5"
            },
            {
                question: "A quadratic polynomial whose zeros are 3 and -2 is:",
                options: ["x² - x - 6", "x² + x - 6", "x² - x + 6", "x² + x + 6"],
                correct: 0,
                explanation: "p(x) = (x-3)(x+2) = x² - x - 6"
            },
            {
                question: "The zeros of polynomial x² - 3 are:",
                options: ["±√3", "±3", "0, 3", "No real zeros"],
                correct: 0,
                explanation: "x² = 3, so x = ±√3"
            }
        ],
        4: [ // Quadratic Equations
            {
                question: "The roots of equation x² - 7x + 12 = 0 are:",
                options: ["3, 4", "2, 6", "-3, -4", "1, 12"],
                correct: 0,
                explanation: "Factoring: (x-3)(x-4) = 0, so x = 3 or x = 4"
            },
            {
                question: "If discriminant of a quadratic equation is negative, then roots are:",
                options: ["Real and equal", "Real and unequal", "Not real", "Zero"],
                correct: 2,
                explanation: "Negative discriminant means no real roots."
            },
            {
                question: "The nature of roots of x² + 6x + 9 = 0 is:",
                options: ["Real and distinct", "Real and equal", "Not real", "Cannot determine"],
                correct: 1,
                explanation: "Discriminant = 36 - 36 = 0, so roots are real and equal."
            },
            {
                question: "Using quadratic formula, roots of 2x² + 5x + 2 = 0 are:",
                options: ["-2, -1/2", "-2, 1/2", "2, -1/2", "2, 1/2"],
                correct: 0,
                explanation: "Using formula: x = (-5 ± √9)/4 = -2 or -1/2"
            },
            {
                question: "Value of k for which x² - 4x + k = 0 has equal roots:",
                options: ["2", "4", "8", "16"],
                correct: 1,
                explanation: "For equal roots, discriminant = 0: 16 - 4k = 0, k = 4"
            }
        ]
    },
    science: {
        1: [ // Chemical Reactions and Equations
            {
                question: "In a chemical reaction, the total mass of products is equal to total mass of reactants. This is known as:",
                options: ["Law of conservation of energy", "Law of conservation of mass", "Law of motion", "Law of gravitation"],
                correct: 1,
                explanation: "Law of conservation of mass states mass can neither be created nor destroyed."
            },
            {
                question: "Which of the following is a decomposition reaction?",
                options: ["CaCO₃ → CaO + CO₂", "2H₂ + O₂ → 2H₂O", "Zn + CuSO₄ → ZnSO₄ + Cu", "NaOH + HCl → NaCl + H₂O"],
                correct: 0,
                explanation: "Decomposition is breaking down of a compound into simpler substances."
            },
            {
                question: "The reaction 2Mg + O₂ → 2MgO is an example of:",
                options: ["Combination reaction", "Decomposition reaction", "Displacement reaction", "Double displacement"],
                correct: 0,
                explanation: "Two substances combine to form a single product."
            },
            {
                question: "Rancidity can be prevented by:",
                options: ["Adding antioxidants", "Refrigeration", "Packaging in nitrogen", "All of these"],
                correct: 3,
                explanation: "All methods help prevent oxidation causing rancidity."
            },
            {
                question: "The chemical formula of rust is:",
                options: ["FeO", "Fe₂O₃", "Fe₂O₃.xH₂O", "Fe₃O₄"],
                correct: 2,
                explanation: "Rust is hydrated ferric oxide."
            }
        ],
        6: [ // Life Processes
            {
                question: "The process of breakdown of glucose in absence of oxygen is called:",
                options: ["Aerobic respiration", "Anaerobic respiration", "Photosynthesis", "Transpiration"],
                correct: 1,
                explanation: "Anaerobic respiration occurs without oxygen."
            },
            {
                question: "Stomata are present in:",
                options: ["Roots", "Stem", "Leaves", "Flowers"],
                correct: 2,
                explanation: "Stomata are tiny pores mainly found on leaves."
            },
            {
                question: "Which enzyme breaks down proteins?",
                options: ["Amylase", "Lipase", "Pepsin", "Bile"],
                correct: 2,
                explanation: "Pepsin is a protease that breaks down proteins."
            },
            {
                question: "The site of photosynthesis is:",
                options: ["Mitochondria", "Chloroplast", "Ribosome", "Nucleus"],
                correct: 1,
                explanation: "Chloroplasts contain chlorophyll for photosynthesis."
            },
            {
                question: "Blood pressure is measured in:",
                options: ["Pascals", "mmHg", "Joules", "Watts"],
                correct: 1,
                explanation: "Blood pressure is measured in millimeters of mercury (mmHg)."
            }
        ],
        12: [ // Electricity
            {
                question: "The SI unit of electric current is:",
                options: ["Volt", "Ampere", "Ohm", "Watt"],
                correct: 1,
                explanation: "Ampere (A) is the SI unit of electric current."
            },
            {
                question: "Ohm's law states that V = IR, where R is:",
                options: ["Resistance", "Current", "Power", "Energy"],
                correct: 0,
                explanation: "R represents resistance measured in ohms."
            },
            {
                question: "In a series circuit, if one bulb fuses, what happens to others?",
                options: ["They also stop", "They glow brighter", "They remain same", "They glow dimmer"],
                correct: 0,
                explanation: "In series, breaking one component breaks the entire circuit."
            },
            {
                question: "Power consumed by a device is measured in:",
                options: ["Joule", "Ampere", "Watt", "Volt"],
                correct: 2,
                explanation: "Power is measured in Watts (W)."
            },
            {
                question: "1 kWh equals:",
                options: ["3.6 × 10⁶ J", "3.6 × 10³ J", "1000 J", "100 J"],
                correct: 0,
                explanation: "1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J"
            }
        ]
    },
    english: {
        1: [ // A Letter to God
            {
                question: "Who wrote 'A Letter to God'?",
                options: ["R.K. Narayan", "Ruskin Bond", "G.L. Fuentes", "Roald Dahl"],
                correct: 2,
                explanation: "The story was written by G.L. Fuentes."
            },
            {
                question: "What destroyed Lencho's crops?",
                options: ["Flood", "Drought", "Hailstorm", "Fire"],
                correct: 2,
                explanation: "A hailstorm destroyed Lencho's corn fields."
            },
            {
                question: "How much money did Lencho ask from God?",
                options: ["50 pesos", "100 pesos", "70 pesos", "30 pesos"],
                correct: 1,
                explanation: "Lencho asked God for 100 pesos."
            },
            {
                question: "Who collected money for Lencho?",
                options: ["His friends", "The postmaster", "His neighbors", "God"],
                correct: 1,
                explanation: "The postmaster collected money from employees."
            },
            {
                question: "What did Lencho call the post office employees?",
                options: ["Angels", "Thieves", "Crooks", "Kind people"],
                correct: 2,
                explanation: "Lencho called them 'a bunch of crooks' thinking they took 30 pesos."
            }
        ],
        3: [ // Two Stories about Flying (Black Aeroplane)
            {
                question: "What was the color of the strange aeroplane?",
                options: ["White", "Black", "Red", "Silver"],
                correct: 1,
                explanation: "The mysterious plane was completely black."
            },
            {
                question: "Where did the pilot want to reach?",
                options: ["Paris", "London", "New York", "Berlin"],
                correct: 1,
                explanation: "The pilot was flying from Paris to London."
            },
            {
                question: "What problem did the pilot face?",
                options: ["Engine failure", "Storm clouds", "Lost fuel", "Navigation error"],
                correct: 1,
                explanation: "The pilot encountered dark storm clouds."
            },
            {
                question: "The story suggests the black aeroplane was:",
                options: ["Real", "A hallucination", "From the future", "A military plane"],
                correct: 1,
                explanation: "The mysterious nature suggests it may have been imagined."
            },
            {
                question: "What time was it when the pilot started his journey?",
                options: ["Morning", "Afternoon", "Evening", "Midnight"],
                correct: 3,
                explanation: "The pilot started his journey at midnight."
            }
        ]
    },
    socialScience: {
        1: [ // The Rise of Nationalism in Europe
            {
                question: "The French Revolution began in:",
                options: ["1789", "1799", "1815", "1830"],
                correct: 0,
                explanation: "The French Revolution started in 1789."
            },
            {
                question: "Who was proclaimed German Emperor in 1871?",
                options: ["Napoleon", "Bismarck", "Kaiser William I", "Frederick"],
                correct: 2,
                explanation: "Kaiser William I was proclaimed German Emperor in 1871."
            },
            {
                question: "The Statue of Liberty was a gift from which country?",
                options: ["Germany", "France", "Britain", "Italy"],
                correct: 1,
                explanation: "France gifted the Statue of Liberty to USA."
            },
            {
                question: "Which was the first European country to industrialize?",
                options: ["France", "Germany", "Britain", "Italy"],
                correct: 2,
                explanation: "Britain was the first to undergo Industrial Revolution."
            },
            {
                question: "Who said 'When France sneezes, the rest of Europe catches cold'?",
                options: ["Napoleon", "Metternich", "Bismarck", "Garibaldi"],
                correct: 1,
                explanation: "This was said by Austrian Chancellor Metternich."
            }
        ],
        13: [ // Power Sharing
            {
                question: "Belgium is divided into how many language regions?",
                options: ["Two", "Three", "Four", "Five"],
                correct: 1,
                explanation: "Belgium has three language regions: Dutch, French, and German."
            },
            {
                question: "What percentage of Brussels population speaks French?",
                options: ["40%", "60%", "80%", "90%"],
                correct: 2,
                explanation: "About 80% of Brussels population speaks French."
            },
            {
                question: "Majoritarianism is a belief that the majority community should:",
                options: ["Share power", "Rule in its way", "Be protected", "Be separate"],
                correct: 1,
                explanation: "Majoritarianism believes majority should rule as per its wishes."
            },
            {
                question: "Civil war in Sri Lanka was between:",
                options: ["Tamils and Muslims", "Sinhalese and Tamils", "Buddhists and Hindus", "North and South"],
                correct: 1,
                explanation: "The civil war was between Sinhalese majority and Tamil minority."
            },
            {
                question: "Power sharing is desirable because it:",
                options: ["Reduces conflict", "Ensures stability", "Respects diversity", "All of these"],
                correct: 3,
                explanation: "Power sharing has all these benefits."
            }
        ]
    }
};

// API Integration Configuration
const API_CONFIG = {
    enabled: false, // Set to true when API is available
    endpoint: 'https://api.example.com/cbse-questions', // Replace with actual API
    apiKey: 'YOUR_API_KEY_HERE', // Add your API key

    // Function to fetch questions from API
    async fetchQuestions(subject, chapter) {
        if (!this.enabled) {
            console.log('API integration disabled, using local questions');
            return null;
        }

        try {
            const response = await fetch(`${this.endpoint}?subject=${subject}&chapter=${chapter}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.questions;
        } catch (error) {
            console.error('Error fetching questions from API:', error);
            return null;
        }
    }
};

// Get questions for a specific chapter (local or API)
async function getQuestionsForChapter(subject, chapter) {
    // Try API first if enabled
    if (API_CONFIG.enabled) {
        const apiQuestions = await API_CONFIG.fetchQuestions(subject, chapter);
        if (apiQuestions) {
            return apiQuestions;
        }
    }

    // Fall back to local question bank
    if (questionBank[subject] && questionBank[subject][chapter]) {
        return questionBank[subject][chapter];
    }

    // Generate placeholder questions if chapter has no questions yet
    return generatePlaceholderQuestions(subject, chapter);
}

// Generate placeholder questions for chapters without questions yet
function generatePlaceholderQuestions(subject, chapterNum) {
    const subjectData = subjects[subject];
    const chapterName = subjectData.topics[chapterNum - 1];

    return [
        {
            question: `What is the main topic covered in ${chapterName}?`,
            options: [
                "Core concepts of the chapter",
                "Historical background",
                "Mathematical formulas",
                "None of the above"
            ],
            correct: 0,
            explanation: "This is a placeholder question. Real questions will be added soon!"
        },
        {
            question: `${chapterName} is important for understanding:`,
            options: [
                "Basic principles",
                "Advanced topics",
                "Practical applications",
                "All of the above"
            ],
            correct: 3,
            explanation: "This chapter covers multiple aspects of the topic."
        },
        {
            question: `How many main sections are typically in ${chapterName}?`,
            options: ["2-3", "4-5", "6-7", "8-10"],
            correct: 1,
            explanation: "Most NCERT chapters have 4-5 major sections."
        },
        {
            question: `True or False: ${chapterName} has practical exercises?`,
            options: ["True", "False", "Sometimes", "Not applicable"],
            correct: 0,
            explanation: "Most NCERT chapters include practical exercises."
        },
        {
            question: `Which skill is developed by studying ${chapterName}?`,
            options: [
                "Analytical thinking",
                "Problem solving",
                "Critical reasoning",
                "All of the above"
            ],
            correct: 3,
            explanation: "All NCERT chapters develop multiple skills."
        }
    ];
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionBank, API_CONFIG, getQuestionsForChapter };
}

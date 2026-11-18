export type ExamStream = 'science' | 'cs' | 'commerce' | 'degree';
export type ExamLevel = 'xi' | 'xii' | 'degree';

export interface PastPaperItem {
  id: string;
  code: string;
  subject: string;
  stream: ExamStream;
  streamLabel: string;
  level: ExamLevel;
  levelLabel: string;
  boardOrUniversity: string;
  year: string;
  paperType: 'Past Paper' | 'Model Paper';
  duration: string;
  maxMarks: number;
  topicsCovered: string[];
  sectionA: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  sectionB: string[];
  sectionC: string[];
  practicalSection?: string[];
  markingTips: string[];
  fileName: string;
}

export interface PracticeMcqQuestion {
  id: string;
  subjectGroup:
    | 'Physics'
    | 'Chemistry'
    | 'Biology & Zoology'
    | 'Computer Science'
    | 'Commerce & Banking'
    | 'Compulsory (Eng / Isl / PS)';
  level: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InPaperPracticalItem {
  id: string;
  subject:
    | 'Physics Practical (15 Marks in Paper)'
    | 'Chemistry Practical (15 Marks in Paper)'
    | 'Biology Practical (15 Marks in Paper)'
    | 'Computer Science Practical (25 Marks in Paper)';
  experimentTitle: string;
  question: string;
  modelAnswer: string;
  examinerTip: string;
}

export const PAST_PAPERS: PastPaperItem[] = [
  {
    id: 'pp-physics-xi-2025',
    code: 'BISE-HYD-PHY-XI-25',
    subject: 'Physics (Mechanics, Waves & Optics)',
    stream: 'science',
    streamLabel: 'Pre-Medical & Pre-Engineering',
    level: 'xi',
    levelLabel: 'Class XI',
    boardOrUniversity: 'BISE Hyderabad · Annual Paper',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours (Theory + Practical)',
    maxMarks: 100,
    topicsCovered: ['Vectors & Equilibrium', 'Projectile Motion', 'Work & Energy', 'Wave Motion', 'Physical Optics'],
    sectionA: [
      {
        question: 'The scalar product of two perpendicular vectors A and B is always:',
        options: ['AB', 'Zero', 'Negative', 'Maximum'],
        correctAnswer: 'Zero',
      },
      {
        question: 'In Young’s double-slit experiment, fringe spacing increases when:',
        options: [
          'Slit separation is increased',
          'Wavelength of light is decreased',
          'Distance to screen is increased',
          'Frequency of light is increased',
        ],
        correctAnswer: 'Distance to screen is increased',
      },
      {
        question: 'The SI unit of angular momentum is:',
        options: ['N·m', 'J·s', 'kg·m/s', 'Watt·s'],
        correctAnswer: 'J·s',
      },
    ],
    sectionB: [
      'State and prove the Law of Conservation of Linear Momentum for an isolated two-body system.',
      'Derive the relation between linear velocity and angular velocity (v = rω) and explain centripetal acceleration.',
      'Calculate the horizontal range of a projectile launched at 30° with an initial velocity of 40 m/s (g = 9.8 m/s²).',
      'Explain Newton’s Rings and write the formula for the radius of the nth bright ring.',
    ],
    sectionC: [
      'Define Doppler Effect. Derive expressions for apparent frequency when (a) the source moves towards a stationary observer and (b) the observer moves away from a stationary source.',
      'Describe the construction and working of a Michelson Interferometer. How is it used to measure the wavelength of monochromatic light?',
    ],
    practicalSection: [
      '[15 Marks Integrated Practical in Paper] Draw a labeled diagram of Vernier Calipers, write the formula for Least Count and Zero Error correction, and complete an observation table for the diameter of a solid cylinder (3 trials).',
      '[OR Practical] Explain the step-by-step experimental procedure to determine the focal length of a convex lens using the two-pin parallax method on an optical bench, including precautions and formula.',
    ],
    markingTips: [
      'Always draw a cleanly labeled vector or ray diagram before starting derivations in Sections B & C (carries 1.5–2 marks).',
      'Write complete apparatus list, labeled observation table, formula, and precautions in the integrated 15-mark Practical Section.',
    ],
    fileName: 'bise-hyderabad-physics-xi-2025.pdf',
  },
  {
    id: 'pp-chemistry-xii-2025',
    code: 'BISE-HYD-CHM-XII-25',
    subject: 'Chemistry (Inorganic & Organic)',
    stream: 'science',
    streamLabel: 'Pre-Medical & Pre-Engineering',
    level: 'xii',
    levelLabel: 'Class XII',
    boardOrUniversity: 'BISE Hyderabad · Annual Paper',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours (Theory + Practical)',
    maxMarks: 100,
    topicsCovered: ['Periodic Classification', 's & p-Block Elements', 'Hydrocarbons', 'Alkyl Halides', 'Carbonyl Compounds'],
    sectionA: [
      {
        question: 'Which reagent distinguishes between terminal alkynes and alkenes by forming a white precipitate?',
        options: ['Bromine water', 'Ammoniacal AgNO₃', 'Baeyer’s reagent', 'Lucas reagent'],
        correctAnswer: 'Ammoniacal AgNO₃',
      },
      {
        question: 'Hybridization of carbon atoms in benzene (C₆H₆) is:',
        options: ['sp', 'sp²', 'sp³', 'dsp²'],
        correctAnswer: 'sp²',
      },
      {
        question: 'Contact Process is used for the industrial manufacture of:',
        options: ['Ammonia', 'Nitric Acid', 'Sulphuric Acid', 'Sodium Carbonate'],
        correctAnswer: 'Sulphuric Acid',
      },
    ],
    sectionB: [
      'Explain why ionization energy increases across a period from left to right and decreases down a group.',
      'Write balanced chemical equations for the preparation of ethyne from calcium carbide and its hydration to acetaldehyde.',
      'Give the IUPAC names of: (i) CH₃-CH(OH)-CH₂-COOH  (ii) CH₃-CO-CH(CH₃)₂.',
      'Differentiate between SN1 and SN2 nucleophilic substitution mechanisms with kinetics.',
    ],
    sectionC: [
      'Describe the manufacture of Sulphuric Acid (H₂SO₄) by the Contact Process with a labeled flow diagram and optimum conditions.',
      'Explain electrophilic substitution reactions in benzene with complete mechanism for Friedel-Crafts Alkylation and Nitration.',
    ],
    practicalSection: [
      '[15 Marks Integrated Practical in Paper] Write the balanced redox equation, procedure, indicator end-point color change, and sample burette observation table for the titration of 0.1 M Oxalic Acid against KMnO₄ solution.',
      '[OR Practical] Describe the confirmatory wet tests and flame color to identify Ba²⁺ (Barium) and Cl⁻ (Chloride) radicals in a given inorganic salt mixture.',
    ],
    markingTips: [
      'Balance every chemical equation and write catalysts/conditions above the arrow (e.g., V₂O₅, 450°C).',
      'In the integrated Practical Section, clearly show Molarity formula (M₁V₁/n₁ = M₂V₂/n₂), apparatus, and end-point colors.',
    ],
    fileName: 'bise-hyderabad-chemistry-xii-2025.pdf',
  },
  {
    id: 'pp-biology-xi-2026',
    code: 'GGZC-MOD-BIO-XI-26',
    subject: 'Biology (Botany & Zoology Combined Model)',
    stream: 'science',
    streamLabel: 'Pre-Medical Group',
    level: 'xi',
    levelLabel: 'Class XI',
    boardOrUniversity: 'GGZC Departmental Model Paper',
    year: '2026',
    paperType: 'Model Paper',
    duration: '3 Hours (Theory + Practical)',
    maxMarks: 100,
    topicsCovered: ['Biological Molecules', 'Enzymes', 'Prokaryotes & Fungi', 'Plant Physiology', 'Animal Diversity'],
    sectionA: [
      {
        question: 'The non-protein organic cofactor loosely attached to an apoenzyme is termed:',
        options: ['Prosthetic group', 'Coenzyme', 'Activator', 'Substrate'],
        correctAnswer: 'Coenzyme',
      },
      {
        question: 'Which organelle is responsible for photorespiration alongside chloroplasts and mitochondria?',
        options: ['Lysosome', 'Peroxisome', 'Glyoxysome', 'Golgi apparatus'],
        correctAnswer: 'Peroxisome',
      },
      {
        question: 'Double fertilization is a characteristic feature of:',
        options: ['Bryophytes', 'Gymnosperms', 'Angiosperms', 'Pteridophytes'],
        correctAnswer: 'Angiosperms',
      },
    ],
    sectionB: [
      'Differentiate between Lock-and-Key Model and Induced Fit Model of enzyme action.',
      'Write four economic and medicinal significances of Kingdom Fungi.',
      'Outline the steps of non-cyclic photophosphorylation (Z-scheme) in light reactions.',
      'List four characteristic features of Phylum Arthropoda with examples.',
    ],
    sectionC: [
      'Explain the structure and replication cycle (Lytic & Lysogenic) of a Bacteriophage with neat labeled diagrams.',
      'Describe the Mechanism of Ascent of Sap in tall vascular plants focusing on the Cohesion-Tension Theory.',
    ],
    practicalSection: [
      '[15 Marks Integrated Practical in Paper] Draw a neat labeled diagram of a Transverse Section (T.S.) of a Dicot Stem, explain Safranin/Fast Green staining steps, and list two distinguishing features from a Monocot Stem.',
      '[OR Practical] Write the biochemical food test procedure, reagent, and positive color result for Glucose (Benedict’s test), Starch (Iodine test), and Protein (Biuret test).',
    ],
    markingTips: [
      'Use sharp pencil diagrams with horizontal ruler-drawn label lines on the right side for full botany/zoology marks.',
      'Underline scientific binomial names and clearly state reagent + positive color change in the written practical section.',
    ],
    fileName: 'ggzc-model-biology-xi-2026.pdf',
  },
  {
    id: 'pp-cs-xii-2025',
    code: 'BISE-HYD-CS-XII-25',
    subject: 'Computer Science (C++ Programming & DBMS)',
    stream: 'cs',
    streamLabel: 'Pre-Engineering & Computer Science',
    level: 'xii',
    levelLabel: 'Class XII',
    boardOrUniversity: 'BISE Hyderabad · Annual Paper',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours (Theory + Practical)',
    maxMarks: 100,
    topicsCovered: ['C++ Control Structures', 'Functions & Arrays', 'File Handling', 'Relational Databases', 'SQL Basics'],
    sectionA: [
      {
        question: 'Which loop in C++ guarantees execution of the loop body at least once?',
        options: ['for loop', 'while loop', 'do-while loop', 'nested if'],
        correctAnswer: 'do-while loop',
      },
      {
        question: 'A key that uniquely identifies each tuple in a relational database table is:',
        options: ['Foreign Key', 'Primary Key', 'Composite Attribute', 'Cardinality'],
        correctAnswer: 'Primary Key',
      },
      {
        question: 'Which header file is required for using setprecision() and setw() manipulators?',
        options: ['<iostream>', '<cmath>', '<iomanip>', '<fstream>'],
        correctAnswer: '<iomanip>',
      },
    ],
    sectionB: [
      'Differentiate between while and do-while loops in C++ with syntax and flowcharts.',
      'Write a C++ function int factorial(int n) that calculates and returns the factorial of a positive integer.',
      'Define Primary Key, Candidate Key, and Foreign Key in a Relational Database Management System.',
      'Convert the mathematical expression into a valid C++ statement and show output formatting.',
    ],
    sectionC: [
      'Write a complete C++ program that accepts marks of 5 subjects from the user into an array, computes total, percentage, and assigns grade (A1, A, B, C, or Fail) using an if-else-if ladder.',
      'Explain Database Normalization up to Third Normal Form (3NF) with suitable table examples eliminating partial and transitive dependencies.',
    ],
    practicalSection: [
      '[25 Marks Integrated Practical in Paper] Write a C++ program using a for loop to print a multiplication table and show the exact step-by-step dry-run output table for input n = 5.',
      '[SQL Practical] Given a table Students(RollNo, Name, Group, Marks), write SQL queries to (a) display Computer Science students sorted by Marks descending, and (b) count students scoring above 800.',
    ],
    markingTips: [
      'Verify semicolons, #include headers, and return 0; in every written C++ program.',
      'For the 25-mark integrated Practical Section on paper, always include a clean sample input/output trace box and valid SQL syntax.',
    ],
    fileName: 'bise-hyderabad-computer-science-xii-2025.pdf',
  },
  {
    id: 'pp-accounting-xi-2025',
    code: 'BISE-HYD-ACC-XI-25',
    subject: 'Principles of Accounting (Class XI)',
    stream: 'commerce',
    streamLabel: 'Commerce Group (I.Com)',
    level: 'xi',
    levelLabel: 'Class XI',
    boardOrUniversity: 'BISE Hyderabad · Annual Paper',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours',
    maxMarks: 100,
    topicsCovered: ['Accounting Equation', 'General Journal & Ledger', 'Three-Column Cash Book', 'Bank Reconciliation', 'Final Accounts'],
    sectionA: [
      {
        question: 'Which accounting concept assumes a business will continue operating indefinitely?',
        options: ['Dual Aspect', 'Going Concern', 'Matching Concept', 'Accrual Basis'],
        correctAnswer: 'Going Concern',
      },
      {
        question: 'A Bank Reconciliation Statement is prepared by the:',
        options: ['Bank Manager', 'Account Holder / Business', 'Tax Auditor', 'Clearing House'],
        correctAnswer: 'Account Holder / Business',
      },
      {
        question: 'Depreciation charged on fixed assets is classified as a:',
        options: ['Capital Expenditure', 'Revenue Expense', 'Current Liability', 'Prepaid Asset'],
        correctAnswer: 'Revenue Expense',
      },
    ],
    sectionB: [
      'Record six selected merchandising transactions in Standard General Journal format with brief narrations.',
      'Prepare a Three-Column Cash Book (Cash, Bank, Discount) showing contra entries clearly marked with (C).',
      'Explain five causes of difference between the Cash Book Bank balance and Pass Book balance.',
    ],
    sectionC: [
      'From the given Trial Balance and four year-end Adjustments (Closing Stock, Depreciation, Bad Debts Provision, Prepaid Insurance), prepare a classified Trading & Profit and Loss Account and Balance Sheet.',
      'Prepare a Bank Reconciliation Statement as on December 31 showing unpresented cheques, uncredited deposits, and bank charges.',
    ],
    markingTips: [
      'Rule neat debit/credit columns with currency symbol (Rs.) at column tops and double-underline final totals.',
      'Always write a clear narration below every journal entry.',
    ],
    fileName: 'bise-hyderabad-accounting-xi-2025.pdf',
  },
  {
    id: 'pp-commerce-xi-2026',
    code: 'GGZC-MOD-COM-XI-26',
    subject: 'Principles of Commerce (Class XI)',
    stream: 'commerce',
    streamLabel: 'Commerce Group (I.Com)',
    level: 'xi',
    levelLabel: 'Class XI',
    boardOrUniversity: 'GGZC Departmental Model Paper',
    year: '2026',
    paperType: 'Model Paper',
    duration: '3 Hours',
    maxMarks: 75,
    topicsCovered: ['Sole Proprietorship', 'Partnership Deeds', 'Joint Stock Company', 'Home & Foreign Trade', 'Warehousing & Insurance'],
    sectionA: [
      {
        question: 'The minimum number of partners required to form a general partnership business is:',
        options: ['One', 'Two', 'Seven', 'Ten'],
        correctAnswer: 'Two',
      },
      {
        question: 'Which document defines the external relationship and objectives of a Joint Stock Company?',
        options: ['Articles of Association', 'Memorandum of Association', 'Prospectus', 'Statutory Declaration'],
        correctAnswer: 'Memorandum of Association',
      },
      {
        question: 'A document issued by a ship’s captain acknowledging receipt of goods on board is:',
        options: ['Invoice', 'Bill of Lading', 'Letter of Credit', 'Charter Party'],
        correctAnswer: 'Bill of Lading',
      },
    ],
    sectionB: [
      'Define Commerce and distinguish between Trade and Aids to Trade with examples.',
      'List six essential clauses included in a Partnership Deed.',
      'Differentiate between Wholesaler and Retailer on five key bases.',
      'Write a short note on Chamber of Commerce and Industry in Pakistan.',
    ],
    sectionC: [
      'Explain the formation steps of a Joint Stock Company in Pakistan from Promotion to Certificate of Commencement of Business.',
      'Describe the complete procedure of Export Trade including Letter of Credit (L/C), Bill of Lading, and Customs Clearance.',
    ],
    markingTips: [
      'Present answers with numbered headings and clear sub-points for maximum readability.',
      'Compare business forms (Sole Trader vs Partnership vs Company) using tabular columns where asked.',
    ],
    fileName: 'ggzc-model-principles-of-commerce-xi-2026.pdf',
  },
  {
    id: 'pp-banking-xii-2025',
    code: 'BISE-HYD-BNK-XII-25',
    subject: 'Banking & Money (Class XII)',
    stream: 'commerce',
    streamLabel: 'Commerce Group (I.Com)',
    level: 'xii',
    levelLabel: 'Class XII',
    boardOrUniversity: 'BISE Hyderabad · Annual Paper',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours',
    maxMarks: 75,
    topicsCovered: ['Evolution & Functions of Money', 'Commercial Banks', 'State Bank of Pakistan', 'Credit Instruments', 'Monetary Policy'],
    sectionA: [
      {
        question: 'Which institution serves as the Central Bank and Lender of Last Resort in Pakistan?',
        options: ['National Bank of Pakistan', 'State Bank of Pakistan', 'Habib Bank Limited', 'Securities & Exchange Commission'],
        correctAnswer: 'State Bank of Pakistan',
      },
      {
        question: 'A cheque crossed with two parallel transverse lines can only be:',
        options: ['Encashed at the counter', 'Collected through a bank account', 'Endorsed verbally', 'Cancelled after 24 hours'],
        correctAnswer: 'Collected through a bank account',
      },
      {
        question: 'Which of the following is NOT a quantitative tool of Monetary Policy?',
        options: ['Bank Rate Policy', 'Open Market Operations', 'Cash Reserve Ratio', 'Moral Suasion'],
        correctAnswer: 'Moral Suasion',
      },
    ],
    sectionB: [
      'Explain the difficulties of the Barter System and how Money overcame them.',
      'Differentiate between a Cheque, a Bill of Exchange, and a Promissory Note.',
      'Discuss four principles of Sound Bank Lending (Liquidity, Profitability, Safety, Diversity).',
      'What is Electronic Banking (E-Banking)? Describe ATM, RTGS, and RAAST payment systems.',
    ],
    sectionC: [
      'Describe the primary and agency/utility functions of Commercial Banks in Pakistan.',
      'Explain the role and monetary policy instruments of the State Bank of Pakistan (SBP) in controlling inflation and credit.',
    ],
    markingTips: [
      'Quote State Bank of Pakistan (SBP) context accurately when answering Central Banking questions.',
      'Draw neat specimens for Crossed Cheques and Bills of Exchange when asked.',
    ],
    fileName: 'bise-hyderabad-banking-and-money-xii-2025.pdf',
  },
  {
    id: 'pp-econ-comgeo-xii-2025',
    code: 'BISE-HYD-ECG-XII-25',
    subject: 'Economics / Commercial Geography (XI & XII)',
    stream: 'commerce',
    streamLabel: 'Commerce Group (I.Com)',
    level: 'xii',
    levelLabel: 'Class XII',
    boardOrUniversity: 'BISE Hyderabad · Combined Guide',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours',
    maxMarks: 75,
    topicsCovered: ['Demand & Supply Elasticity', 'National Income', 'Agriculture of Pakistan', 'Indus Basin Irrigation', 'Trade & Ports'],
    sectionA: [
      {
        question: 'When percentage change in quantity demanded exceeds percentage change in price, demand is:',
        options: ['Perfectly Inelastic', 'Relatively Elastic', 'Unitary Elastic', 'Zero Elastic'],
        correctAnswer: 'Relatively Elastic',
      },
      {
        question: 'Which barrage across the River Indus feeds the major canal networks around Hyderabad & Badin?',
        options: ['Tarbela Dam', 'Kotri (Ghulam Muhammad) Barrage', 'Mangla Dam', 'Warsak Dam'],
        correctAnswer: 'Kotri (Ghulam Muhammad) Barrage',
      },
    ],
    sectionB: [
      'State the Law of Diminishing Marginal Utility with a schedule and diagram.',
      'Explain four major agricultural crops of Sindh (Wheat, Cotton, Rice, Sugarcane) and their climatic requirements.',
      'Write a note on Karachi Port and Port Muhammad bin Qasim in Pakistan’s foreign trade.',
    ],
    sectionC: [
      'Explain the methods of measuring National Income (Product, Income, and Expenditure approaches) and precautions to avoid double counting.',
      'Describe the Physiographic Divisions and Irrigation System (Barrages & Link Canals) of Pakistan.',
    ],
    markingTips: [
      'Label X-axis (Quantity) and Y-axis (Price) cleanly in all Economics curves.',
      'Include regional examples from Sindh (Indus Delta, Kotri Barrage, Thar Coal) in Commercial Geography answers.',
    ],
    fileName: 'bise-hyderabad-economics-commercial-geography-2025.pdf',
  },
  {
    id: 'pp-compulsory-eng-isl-ps-2025',
    code: 'BISE-HYD-CMP-XI-XII-25',
    subject: 'Compulsory: English (XI–XII), Islamiyat (XI) & Pak Studies (XII)',
    stream: 'science',
    streamLabel: 'All HSC Groups (Science, CS, Commerce & Arts)',
    level: 'xi',
    levelLabel: 'Class XI & XII',
    boardOrUniversity: 'BISE Hyderabad · Compulsory Compendium',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours',
    maxMarks: 100,
    topicsCovered: ['English Comprehension & Essay', 'Islamiyat Quran & Hadith (XI)', 'Constitutional History (XII)', 'Quaid-e-Azam & 1973 Constitution'],
    sectionA: [
      {
        question: 'In which year did Quaid-e-Azam present his historic Fourteen Points?',
        options: ['1924', '1929', '1940', '1947'],
        correctAnswer: '1929',
      },
      {
        question: 'How many Articles are contained in the original Constitution of Pakistan 1973?',
        options: ['234', '250', '280', '310'],
        correctAnswer: '280',
      },
    ],
    sectionB: [
      '[English XI/XII] Write a formal letter to the Principal requesting additional Science & Commerce reference titles in the Central Library.',
      '[Islamiyat XI] Write translation and brief explanation of selected Ayat on Patience, Honesty, and Respect for Parents.',
      '[Pakistan Studies XII] Highlight the key Islamic provisions of the 1973 Constitution of Pakistan.',
    ],
    sectionC: [
      '[English] Write a structured analytical essay (250–300 words) on: "Role of Women’s Higher Education in National Progress."',
      '[Pakistan Studies XII] Trace the political struggle from the Lahore Resolution (1940) to the Independence of Pakistan (August 14, 1947) under the leadership of Quaid-e-Azam Muhammad Ali Jinnah.',
    ],
    markingTips: [
      'Quote exact dates and constitutional clauses in Pakistan Studies answers.',
      'In Islamiyat, pair every topical explanation with at least one authentic Quranic verse or Hadith reference.',
    ],
    fileName: 'bise-hyderabad-english-islamiyat-pakstudies-compendium.pdf',
  },
  {
    id: 'pp-uos-bs-zoology-2025',
    code: 'UOS-BSZ-SEM-IV-25',
    subject: 'BS Zoology (Animal Physiology & Cell Biology)',
    stream: 'degree',
    streamLabel: 'BS Zoology (4-Year · University of Sindh)',
    level: 'degree',
    levelLabel: 'BS & ADP',
    boardOrUniversity: 'University of Sindh Jamshoro · Semester Exam',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours',
    maxMarks: 80,
    topicsCovered: ['Membrane Transport', 'Action Potential', 'Endocrine Physiology', 'Renal Countercurrent', 'Cytogenetics'],
    sectionA: [
      {
        question: 'The resting membrane potential of a typical mammalian neuron is approximately:',
        options: ['+30 mV', '0 mV', '−70 mV', '−120 mV'],
        correctAnswer: '−70 mV',
      },
      {
        question: 'Which part of the nephron is primarily impermeable to water yet actively pumps Na⁺ and Cl⁻?',
        options: [
          'Descending limb of Loop of Henle',
          'Ascending thick limb of Loop of Henle',
          'Collecting duct',
          'Bowman’s capsule',
        ],
        correctAnswer: 'Ascending thick limb of Loop of Henle',
      },
    ],
    sectionB: [
      'Explain the Na⁺/K⁺ ATPase pump and its role in maintaining cellular osmotic balance.',
      'Compare negative and positive feedback mechanisms in endocrine regulation with examples.',
      'Describe the structure and function of the Sarcoplasmic Reticulum in skeletal muscle contraction.',
    ],
    sectionC: [
      'Describe the Countercurrent Multiplier Mechanism in the mammalian kidney and explain how ADH regulates urine osmolarity.',
      'Explain the generation and propagation of an Action Potential along a myelinated axon (Saltatory Conduction).',
    ],
    markingTips: [
      'Support University of Sindh semester answers with clear physiological flowcharts and voltage/graph sketches.',
      'Cite textbook biochemical pathways concisely to score full marks in Section C.',
    ],
    fileName: 'uos-bs-zoology-animal-physiology-2025.pdf',
  },
  {
    id: 'pp-uos-adc-2025',
    code: 'UOS-ADC-PART-II-25',
    subject: 'Associate Degree in Commerce (Cost Accounting & Business Law)',
    stream: 'degree',
    streamLabel: 'AD Commerce (2-Year · University of Sindh)',
    level: 'degree',
    levelLabel: 'BS & ADP',
    boardOrUniversity: 'University of Sindh Jamshoro · Annual/Semester Paper',
    year: '2025',
    paperType: 'Past Paper',
    duration: '3 Hours',
    maxMarks: 100,
    topicsCovered: ['Cost of Goods Manufactured', 'FIFO & LIFO Inventory', 'Contract Act 1872', 'Negotiable Instruments', 'Auditing Standards'],
    sectionA: [
      {
        question: 'Prime Cost is the sum of:',
        options: [
          'Direct Material + Factory Overhead',
          'Direct Material + Direct Labor',
          'Direct Labor + Selling Expense',
          'Factory Cost + Office Overhead',
        ],
        correctAnswer: 'Direct Material + Direct Labor',
      },
      {
        question: 'An agreement enforceable by law under Section 2(h) of the Contract Act 1872 is a:',
        options: ['Proposal', 'Void Agreement', 'Contract', 'Indemnity'],
        correctAnswer: 'Contract',
      },
    ],
    sectionB: [
      'Compute Cost of Goods Manufactured & Sold given Raw Material Consumed, Direct Labor, FOH, and Work-in-Process inventories.',
      'Explain the essential elements of a Valid Contract under Section 10 of the Contract Act 1872.',
      'Differentiate between Continuous Audit and Final Audit.',
    ],
    sectionC: [
      'Prepare a Stores Ledger Card under FIFO and Weighted Average methods for a given schedule of purchases and issues.',
      'Explain Breach of Contract and the legal remedies available to an aggrieved party under the Contract Act.',
    ],
    markingTips: [
      'Show clear supporting schedules for Material Consumed and FOH allocation.',
      'Quote exact section numbers of the Contract Act 1872 where applicable.',
    ],
    fileName: 'uos-ad-commerce-cost-accounting-law-2025.pdf',
  },
];

export const PRACTICE_MCQS: PracticeMcqQuestion[] = [
  {
    id: 'mcq-phy-1',
    subjectGroup: 'Physics',
    level: 'HSC Class XI',
    question: 'At what angle of projection does a projectile achieve its maximum horizontal range (ignoring air resistance)?',
    options: ['30°', '45°', '60°', '90°'],
    correctIndex: 1,
    explanation: 'Range R = (vᵢ² sin 2θ)/g is maximum when sin 2θ = 1, which occurs at 2θ = 90°, i.e., θ = 45°.',
  },
  {
    id: 'mcq-phy-2',
    subjectGroup: 'Physics',
    level: 'HSC Class XII',
    question: 'Lenz’s Law is a direct consequence of the Law of Conservation of:',
    options: ['Electric Charge', 'Linear Momentum', 'Energy', 'Angular Velocity'],
    correctIndex: 2,
    explanation: 'The induced EMF opposes the change producing it so mechanical work must be done, conserving energy.',
  },
  {
    id: 'mcq-phy-3',
    subjectGroup: 'Physics',
    level: 'HSC Class XII',
    question: 'Which phenomenon confirms the transverse nature of light waves?',
    options: ['Interference', 'Diffraction', 'Polarization', 'Refraction'],
    correctIndex: 2,
    explanation: 'Only transverse waves can be polarized; longitudinal waves cannot undergo polarization.',
  },
  {
    id: 'mcq-chm-1',
    subjectGroup: 'Chemistry',
    level: 'HSC Class XI',
    question: 'Which orbital has the highest penetrating power towards the atomic nucleus within the same principal shell?',
    options: ['s-orbital', 'p-orbital', 'd-orbital', 'f-orbital'],
    correctIndex: 0,
    explanation: 'Spherical symmetry places s-electrons closest to the nucleus, giving them maximum penetration and lowest energy.',
  },
  {
    id: 'mcq-chm-2',
    subjectGroup: 'Chemistry',
    level: 'HSC Class XII',
    question: 'Lucas test (anhydrous ZnCl₂ in conc. HCl) gives immediate turbidity at room temperature with:',
    options: ['Primary alcohols', 'Secondary alcohols', 'Tertiary alcohols', 'Phenols'],
    correctIndex: 2,
    explanation: 'Tertiary alcohols form stable tertiary carbocations rapidly, reacting immediately with Lucas reagent.',
  },
  {
    id: 'mcq-chm-3',
    subjectGroup: 'Chemistry',
    level: 'HSC Class XII',
    question: 'In the periodic table, which element has the highest electronegativity on the Pauling scale?',
    options: ['Oxygen', 'Chlorine', 'Nitrogen', 'Fluorine'],
    correctIndex: 3,
    explanation: 'Fluorine has the smallest atomic radius among halogens and an electronegativity of 3.98 (≈4.0).',
  },
  {
    id: 'mcq-bio-1',
    subjectGroup: 'Biology & Zoology',
    level: 'HSC Class XI',
    question: 'Ribosomes in eukaryotic mitochondria and chloroplasts resemble prokaryotic ribosomes because they are:',
    options: ['80S type', '70S type', '90S type', '60S type'],
    correctIndex: 1,
    explanation: 'Supporting the endosymbiotic theory, mitochondria and chloroplasts contain 70S ribosomes and circular DNA.',
  },
  {
    id: 'mcq-bio-2',
    subjectGroup: 'Biology & Zoology',
    level: 'BS Zoology / HSC XII',
    question: 'Which hormone is secreted by the posterior pituitary to increase water reabsorption in kidney collecting ducts?',
    options: ['Aldosterone', 'Antidiuretic Hormone (ADH / Vasopressin)', 'Parathormone', 'Thyroxine'],
    correctIndex: 1,
    explanation: 'ADH inserts aquaporin-2 channels into the collecting duct epithelium, conserving body water.',
  },
  {
    id: 'mcq-bio-3',
    subjectGroup: 'Biology & Zoology',
    level: 'HSC Class XII',
    question: 'During DNA replication, Okazaki fragments are synthesized on the:',
    options: ['Leading strand (5’→3’)', 'Lagging strand', 'Template RNA primer only', 'Promoter region'],
    correctIndex: 1,
    explanation: 'Because DNA polymerase adds nucleotides only in the 5’→3’ direction, the lagging strand is made discontinuously in short Okazaki fragments.',
  },
  {
    id: 'mcq-cs-1',
    subjectGroup: 'Computer Science',
    level: 'HSC Class XII',
    question: 'In C++, which operator is used to access the address of a variable in memory?',
    options: ['* (Dereference)', '& (Address-of)', ':: (Scope resolution)', '-> (Arrow)'],
    correctIndex: 1,
    explanation: 'The unary & operator returns the memory address of its operand, typically stored in a pointer variable.',
  },
  {
    id: 'mcq-cs-2',
    subjectGroup: 'Computer Science',
    level: 'HSC Class XI',
    question: 'Which OSI Layer is responsible for logical addressing (IP) and packet routing across networks?',
    options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
    correctIndex: 1,
    explanation: 'Layer 3 (Network Layer) handles IP addressing and path determination through routers.',
  },
  {
    id: 'mcq-cs-3',
    subjectGroup: 'Computer Science',
    level: 'HSC Class XII',
    question: 'Which SQL command is used to retrieve selected rows from a database table?',
    options: ['UPDATE', 'SELECT', 'INSERT', 'ALTER'],
    correctIndex: 1,
    explanation: 'SELECT queries data from one or more tables; UPDATE/INSERT modify rows and ALTER modifies table schema.',
  },
  {
    id: 'mcq-com-1',
    subjectGroup: 'Commerce & Banking',
    level: 'I.Com Class XI',
    question: 'If Total Assets are Rs. 850,000 and Owner’s Equity is Rs. 520,000, what are Total Liabilities?',
    options: ['Rs. 1,370,000', 'Rs. 330,000', 'Rs. 520,000', 'Rs. 230,000'],
    correctIndex: 1,
    explanation: 'By the Accounting Equation (Assets = Liabilities + Equity), Liabilities = 850,000 − 520,000 = Rs. 330,000.',
  },
  {
    id: 'mcq-com-2',
    subjectGroup: 'Commerce & Banking',
    level: 'I.Com Class XII',
    question: 'Under Banking & Money, when the State Bank of Pakistan raises the policy discount rate, commercial credit generally:',
    options: ['Expands rapidly', 'Contracts / becomes costlier', 'Turns interest-free', 'Bypasses reserve rules'],
    correctIndex: 1,
    explanation: 'A higher policy rate increases borrowing costs for commercial banks, curbing money supply and inflation.',
  },
  {
    id: 'mcq-com-3',
    subjectGroup: 'Commerce & Banking',
    level: 'I.Com Class XI',
    question: 'Which document is issued by an importer’s bank guaranteeing payment to the foreign exporter upon shipping compliance?',
    options: ['Letter of Credit (L/C)', 'Promissory Note', 'Petty Cash Voucher', 'Debit Note'],
    correctIndex: 0,
    explanation: 'A Letter of Credit (L/C) is a bank guarantee used in international commerce to assure payment against compliant shipping documents.',
  },
  {
    id: 'mcq-cmp-1',
    subjectGroup: 'Compulsory (Eng / Isl / PS)',
    level: 'Class XI Islamiyat',
    question: 'In Islamic history and culture, which city was the first capital of the Islamic state where Masjid-e-Nabawi was established?',
    options: ['Makkah Mukarramah', 'Madinah Munawwarah', 'Damascus', 'Kufa'],
    correctIndex: 1,
    explanation: 'Following the Hijrah in 622 CE, Madinah Munawwarah became the administrative and spiritual capital under the Charter of Madinah.',
  },
  {
    id: 'mcq-cmp-2',
    subjectGroup: 'Compulsory (Eng / Isl / PS)',
    level: 'Class XII Pakistan Studies',
    question: 'Who presided over the historic All-India Muslim League session in Lahore on March 23, 1940?',
    options: ['Liaquat Ali Khan', 'Quaid-e-Azam Muhammad Ali Jinnah', 'Allama Iqbal', 'Sir Syed Ahmad Khan'],
    correctIndex: 1,
    explanation: 'Quaid-e-Azam Muhammad Ali Jinnah presided over the 1940 Lahore Session where the Lahore (Pakistan) Resolution was adopted.',
  },
  {
    id: 'mcq-cmp-3',
    subjectGroup: 'Compulsory (Eng / Isl / PS)',
    level: 'Class XI/XII English',
    question: 'Which of the following is the correct passive voice of: "The librarian issued five reference books"?',
    options: [
      'Five reference books are issued by the librarian.',
      'Five reference books were issued by the librarian.',
      'Five reference books had issued by the librarian.',
      'Five reference books will be issued by the librarian.',
    ],
    correctIndex: 1,
    explanation: 'Simple Past active ("issued") transforms into "were + past participle" for plural subject ("Five reference books").',
  },
];

export const IN_PAPER_PRACTICAL_GUIDE: InPaperPracticalItem[] = [
  {
    id: 'prac-phy-1',
    subject: 'Physics Practical (15 Marks in Paper)',
    experimentTitle: 'Vernier Calipers & Screw Gauge Written Observation',
    question:
      'In the board exam paper practical section, how do you present Least Count, Zero Error correction, and an observation table for a Screw Gauge?',
    modelAnswer:
      'Write LC = Pitch / Circular Scale Divisions (e.g., 0.5 mm / 50 = 0.01 mm), record Zero Error (+ or −), create a 3-row table with Main Scale Reading (MSR), Circular Scale Division (CSD), Observed Diameter = MSR + (CSD × LC), and Corrected Diameter = Observed ± Zero Correction.',
    examinerTip: 'Always mention units (mm or cm) in column headers and write 2 safety precautions for full 15-mark practical credit.',
  },
  {
    id: 'prac-phy-2',
    subject: 'Physics Practical (15 Marks in Paper)',
    experimentTitle: 'Optical Bench & Prism Minimum Deviation Diagram',
    question:
      'How should the Prism / Optical Bench practical question be answered in the written exam paper?',
    modelAnswer:
      'Draw a sharp, ruler-labeled ray diagram showing Angle of Incidence (i), Angle of Prism (A), Angle of Emergence (e), and Angle of Minimum Deviation (Dm). State the refractive index formula n = sin[(A + Dm)/2] / sin(A/2) along with a neat sample reading table.',
    examinerTip: 'Diagram accuracy and step-by-step calculation carry more than half of the in-paper practical marks.',
  },
  {
    id: 'prac-chm-1',
    subject: 'Chemistry Practical (15 Marks in Paper)',
    experimentTitle: 'Volumetric Titration Written Scheme (KMnO₄ / NaOH)',
    question:
      'What sections must be written in the Chemistry exam paper when asked to describe an Acid-Base or KMnO₄ Redox Titration?',
    modelAnswer:
      'Include (1) Aim & Balanced Chemical Equation, (2) Apparatus & Standard Solution, (3) Indicator & End-Point Color Change (e.g., KMnO₄ acts as self-indicator turning permanent light pink; upper meniscus read), (4) 3-reading Concordant Burette Table, and (5) Molarity calculation using M₁V₁/n₁ = M₂V₂/n₂.',
    examinerTip: 'Do not forget the mole ratio (n₁, n₂) from the balanced equation—missing it loses calculation marks.',
  },
  {
    id: 'prac-chm-2',
    subject: 'Chemistry Practical (15 Marks in Paper)',
    experimentTitle: 'Inorganic Salt Analysis Identification Table',
    question:
      'How do you write the Qualitative Salt Analysis practical answer directly on the board answer sheet?',
    modelAnswer:
      'Present a crisp 3-column table (Experiment · Observation · Inference) covering Preliminary Dry Tests (color, flame test: Ba²⁺ apple green, Ca²⁺ brick red), Dilute/Conc. H₂SO₄ Acid Radical test, and Group Reagent Basic Radical test with NH₄Cl + NH₄OH (Common Ion Effect) plus Confirmatory equations.',
    examinerTip: 'Write the final confirmed Acid Radical and Basic Radical clearly at the bottom.',
  },
  {
    id: 'prac-bio-1',
    subject: 'Biology Practical (15 Marks in Paper)',
    experimentTitle: 'Botany Slide Staining & Dicot vs Monocot Stem Diagram',
    question:
      'What does the examiner expect when a Botany slide preparation or T.S. stem practical appears in the theory exam paper?',
    modelAnswer:
      'Write the step-by-step double staining method (cutting thin T.S. -> Safranin stains lignified xylem red -> Fast Green stains cellulose phloem/parenchyma -> Glycerin mount), draw labeled cellular diagrams of Dicot (ringed open vascular bundles) vs Monocot (scattered closed bundles), and state two identifying features.',
    examinerTip: 'Draw pencil diagrams large enough to label epidermis, cortex, endodermis, xylem, and phloem cleanly on the right.',
  },
  {
    id: 'prac-bio-2',
    subject: 'Biology Practical (15 Marks in Paper)',
    experimentTitle: 'Biochemical Food Tests & Specimen Classification',
    question:
      'How do you answer Biochemical Test and Museum Specimen practical questions in the Biology written paper?',
    modelAnswer:
      'For food tests, tabulate Test (Benedict’s / Iodine / Biuret), Procedure (2 mL sample + reagent + heating where needed), Observation (brick-red ppt for reducing sugar, blue-black for starch, violet for protein), and Result. For specimens, state Kingdom, Phylum, Class, scientific name, and 2 adaptive characters.',
    examinerTip: 'Always mention whether heating in a water bath is required (yes for Benedict’s test, no for Iodine or Biuret).',
  },
  {
    id: 'prac-cs-1',
    subject: 'Computer Science Practical (25 Marks in Paper)',
    experimentTitle: 'C++ Program Coding & Dry-Run Trace Table on Paper',
    question:
      'How are the 25 Computer Science practical marks tested inside the written board exam paper?',
    modelAnswer:
      'Students write complete syntax-error-free C++ programs (using loops, functions, or arrays), draw a Dry-Run Variable Trace Table showing loop iterations step by step, and box the exact screen Output. Every #include header, semicolon, and return 0; is graded.',
    examinerTip: 'Never skip the Dry-Run Output Box on paper—it proves your code logic works without a computer.',
  },
  {
    id: 'prac-cs-2',
    subject: 'Computer Science Practical (25 Marks in Paper)',
    experimentTitle: 'SQL Queries & MS Access / Database Practical on Paper',
    question:
      'What database practical tasks appear in the Computer Science written paper?',
    modelAnswer:
      'Questions ask you to design a normalized table schema specifying Primary Key and Foreign Key data types, write exact SQL commands (CREATE TABLE, INSERT INTO, SELECT ... WHERE ... ORDER BY), and show the resulting output table.',
    examinerTip: 'Clearly underline Primary Keys in schema diagrams and end every SQL statement with a semicolon (;).',
  },
];

export type PatternGroup = 'science' | 'cs' | 'commerce' | 'compulsory' | 'degree';

export interface PaperPatternGuideItem {
  id: string;
  subject: string;
  classLevel: string;
  group: PatternGroup;
  groupLabel: string;
  boardAuthority: string;
  textbookRef: string;
  duration: string;
  totalMarks: number;
  theoryMarks: number;
  practicalMarks: number;
  theoryBreakdown: {
    sectionA: { label: string; marks: number; pct: string; detail: string };
    sectionB: { label: string; marks: number; pct: string; detail: string };
    sectionC: { label: string; marks: number; pct: string; detail: string };
  };
  practicalInPaper?: {
    marks: number;
    pct: string;
    questionFormat: string;
    keyTopics: string[];
  };
  passingRule: string;
  stbbNote: string;
}

export const PAPER_PATTERNS: PaperPatternGuideItem[] = [
  {
    id: 'pat-physics-xi-xii',
    subject: 'Physics (Part-I & Part-II)',
    classLevel: 'Class XI & XII',
    group: 'science',
    groupLabel: 'Pre-Medical & Pre-Engineering',
    boardAuthority: 'Sindh Textbook Board · Practical Included in Exam Paper',
    textbookRef: 'Sindh Textbook Board Physics XI & XII (Jamshoro)',
    duration: '3 Hours (Unified Written Paper)',
    totalMarks: 100,
    theoryMarks: 85,
    practicalMarks: 15,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · Objective MCQs (Theory + Practical)',
        marks: 17,
        pct: '17%',
        detail: '17 compulsory MCQs (1 mark each) from theory & apparatus concepts',
      },
      sectionB: {
        label: 'Section B · Short-Answer Questions',
        marks: 36,
        pct: '36%',
        detail: 'Analytical reasoning, laws, and short SI-unit numericals',
      },
      sectionC: {
        label: 'Section C · Descriptive & Long Numericals',
        marks: 32,
        pct: '32%',
        detail: 'Detailed derivations, ray diagrams & multi-step numericals',
      },
    },
    practicalInPaper: {
      marks: 15,
      pct: '15%',
      questionFormat:
        'Tested directly inside the 100-mark written exam paper (no separate lab exam): apparatus diagram, procedure, observation table, error correction & calculations.',
      keyTopics: [
        'Vernier Calipers & Screw Gauge Zero Error Table',
        'Simple Pendulum g-Determination & Graph Sketch',
        'Optical Bench Focal Length & Prism Minimum Deviation',
        'Ohm’s Law, Meter Bridge & Potentiometer Circuit Calculations',
      ],
    },
    passingRule: '33% combined pass mark (33/100) on the unified written exam paper.',
    stbbNote:
      'Since last academic year under the new Sindh Textbook Board scheme, Physics practical questions are attempted on the exam paper alongside Theory.',
  },
  {
    id: 'pat-chemistry-xi-xii',
    subject: 'Chemistry (Part-I & Part-II)',
    classLevel: 'Class XI & XII',
    group: 'science',
    groupLabel: 'Pre-Medical & Pre-Engineering',
    boardAuthority: 'Sindh Textbook Board · Practical Included in Exam Paper',
    textbookRef: 'Sindh Textbook Board Chemistry XI & XII (Jamshoro)',
    duration: '3 Hours (Unified Written Paper)',
    totalMarks: 100,
    theoryMarks: 85,
    practicalMarks: 15,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · Objective MCQs (Theory + Practical)',
        marks: 17,
        pct: '17%',
        detail: '17 compulsory MCQs covering equations, stoichiometry & lab indicators',
      },
      sectionB: {
        label: 'Section B · Short-Answer Questions',
        marks: 36,
        pct: '36%',
        detail: 'Reasoning, IUPAC naming, periodic trends & reaction equations',
      },
      sectionC: {
        label: 'Section C · Descriptive & Mechanisms',
        marks: 32,
        pct: '32%',
        detail: 'Industrial manufacturing flowsheets & organic mechanisms',
      },
    },
    practicalInPaper: {
      marks: 15,
      pct: '15%',
      questionFormat:
        'Included directly inside the 100-mark written exam paper: balanced titration equations, burette reading table, molarity calculation & salt radical tests.',
      keyTopics: [
        'Acid-Base Volumetric Titration (NaOH vs Oxalic Acid)',
        'Redox Titration using KMnO₄ Self-Indicator (End-Point & Calculations)',
        'Inorganic Salt Analysis (Flame Test & Acid/Basic Radical Confirmatory Tests)',
        'Organic Functional Group Identification Tests (Alcohol, Aldehyde, Phenol)',
      ],
    },
    passingRule: '33% combined pass mark (33/100) on the unified written exam paper.',
    stbbNote:
      'All 100 marks (85 Theory + 15 Written Practical) are examined in a single 3-hour board question paper.',
  },
  {
    id: 'pat-biology-xi-xii',
    subject: 'Biology (Botany & Zoology)',
    classLevel: 'Class XI & XII',
    group: 'science',
    groupLabel: 'Pre-Medical Group',
    boardAuthority: 'Sindh Textbook Board · Practical Included in Exam Paper',
    textbookRef: 'Sindh Textbook Board Biology XI & XII (Jamshoro)',
    duration: '3 Hours (Unified Written Paper)',
    totalMarks: 100,
    theoryMarks: 85,
    practicalMarks: 15,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · Objective MCQs (Botany & Zoology)',
        marks: 17,
        pct: '17%',
        detail: '17 compulsory MCQs balanced across Botany, Zoology & lab microscopy',
      },
      sectionB: {
        label: 'Section B · Short-Answer Questions',
        marks: 36,
        pct: '36%',
        detail: 'Short reasoning, physiological pathways & comparison questions',
      },
      sectionC: {
        label: 'Section C · Descriptive Essays & Diagrams',
        marks: 32,
        pct: '32%',
        detail: 'Comprehensive Botany & Zoology essays with neat labeled diagrams',
      },
    },
    practicalInPaper: {
      marks: 15,
      pct: '15%',
      questionFormat:
        'Included directly inside the 100-mark written exam paper: slide staining procedure, labeled T.S. stem/root diagrams, biochemical food tests & taxonomic classification.',
      keyTopics: [
        'T.S. Staining & Labeled Diagram of Monocot vs Dicot Stem/Root',
        'Biochemical Food Tests (Benedict’s, Biuret, Iodine, Sudan-III)',
        'Mitosis/Meiosis Stage Identification & Compound Microscope Labeling',
        'Taxonomic Classification & Adaptive Features of Specimens',
      ],
    },
    passingRule: '33% combined pass mark (33/100) on the unified written exam paper.',
    stbbNote:
      'No separate practical lab exam—students answer both Theory (85) and Practical-Based Questions (15) in the written paper.',
  },
  {
    id: 'pat-cs-xi-xii',
    subject: 'Computer Science (Part-I & Part-II)',
    classLevel: 'Class XI & XII',
    group: 'cs',
    groupLabel: 'Computer Science & Pre-Engineering',
    boardAuthority: 'Sindh Textbook Board · Practical Included in Exam Paper',
    textbookRef: 'Sindh Textbook Board Computer Science XI & XII (C++ & DBMS)',
    duration: '3 Hours (Unified Written Paper)',
    totalMarks: 100,
    theoryMarks: 75,
    practicalMarks: 25,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · Objective MCQs',
        marks: 15,
        pct: '15%',
        detail: '15 compulsory MCQs on architecture, networking, C++ syntax & SQL',
      },
      sectionB: {
        label: 'Section B · Short-Answer Questions',
        marks: 30,
        pct: '30%',
        detail: 'Short coding logic, flowchart, OS & database concept questions',
      },
      sectionC: {
        label: 'Section C · Descriptive Systems & Design',
        marks: 30,
        pct: '30%',
        detail: 'Long questions on normalization (1NF–3NF), arrays, functions & architecture',
      },
    },
    practicalInPaper: {
      marks: 25,
      pct: '25%',
      questionFormat:
        'Tested directly inside the 100-mark written exam paper: complete C++ programs with step-by-step dry-run output boxes, SQL query writing & HTML/Office task steps.',
      keyTopics: [
        'Complete C++ Programs (Loops, Functions, Arrays, File Handling)',
        'Dry-Run Variable Trace Tables & Exact Screen Output Prediction',
        'SQL Queries (CREATE TABLE, SELECT, WHERE, ORDER BY, Aggregate Functions)',
        'MS Excel Formula Tracing & HTML Table/Form Markup on Paper',
      ],
    },
    passingRule: '33% combined pass mark (33/100) on the unified written exam paper.',
    stbbNote:
      '25 marks of Computer Science Practical are included directly in the board question paper alongside 75 Theory marks.',
  },
  {
    id: 'pat-mathematics-xi-xii',
    subject: 'Mathematics (Class XI & XII)',
    classLevel: 'Class XI & XII',
    group: 'cs',
    groupLabel: 'Pre-Engineering & Computer Science',
    boardAuthority: 'Sindh Textbook Board · New 20–40–40 Scheme',
    textbookRef: 'Sindh Textbook Board Mathematics XI & XII (New Edition)',
    duration: '3 Hours (Written Paper)',
    totalMarks: 100,
    theoryMarks: 100,
    practicalMarks: 0,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · Objective MCQs',
        marks: 20,
        pct: '20%',
        detail: '20 compulsory MCQs (1 mark each) across algebra, calculus & vectors',
      },
      sectionB: {
        label: 'Section B · Short Problems',
        marks: 40,
        pct: '40%',
        detail: 'Attempt 10 of 15 short derivations & numerical proofs (4 marks each)',
      },
      sectionC: {
        label: 'Section C · Long Problems',
        marks: 40,
        pct: '40%',
        detail: 'Attempt 5 of 7 detailed Calculus / Matrices / Conics / Vector proofs',
      },
    },
    passingRule: '33% pass mark (33/100) in written exam paper.',
    stbbNote:
      'Updated STBB Mathematics syllabus emphasizes complete step-by-step proofs and analytical problem solving.',
  },
  {
    id: 'pat-accounting-xi-xii',
    subject: 'Principles of Accounting (XI & XII)',
    classLevel: 'Class XI & XII',
    group: 'commerce',
    groupLabel: 'Commerce Group (I.Com)',
    boardAuthority: 'Sindh Textbook Board · 20–40–40 Pattern',
    textbookRef: 'Sindh Textbook Board / BISE Commerce Accounting XI & XII',
    duration: '3 Hours (Written Ledger Paper)',
    totalMarks: 100,
    theoryMarks: 100,
    practicalMarks: 0,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · Objective MCQs',
        marks: 20,
        pct: '20%',
        detail: '20 compulsory MCQs on accounting concepts, debit/credit & ratios',
      },
      sectionB: {
        label: 'Section B · Short Problems',
        marks: 40,
        pct: '40%',
        detail: 'Journal entries, Cash Book, Bank Reconciliation & Single-Entry problems',
      },
      sectionC: {
        label: 'Section C · Financial Statements',
        marks: 40,
        pct: '40%',
        detail: 'Final Accounts with Adjustments (XI), Partnership/Company Accounts (XII)',
      },
    },
    passingRule: '33% pass mark (33/100) in written paper.',
    stbbNote:
      'Proper column ruling, narration below journal entries, and clear working notes earn full credit.',
  },
  {
    id: 'pat-commerce-banking-econ',
    subject: 'Principles of Commerce (XI), Banking & Money (XII), Economics / Com. Geography (XI–XII)',
    classLevel: 'Class XI & XII',
    group: 'commerce',
    groupLabel: 'Commerce Group (I.Com)',
    boardAuthority: 'Sindh Textbook Board · 20–40–40 Pattern',
    textbookRef: 'STBB / Approved Commerce, Banking & Economic Geography Texts',
    duration: '3 Hours (Written Paper)',
    totalMarks: 75,
    theoryMarks: 75,
    practicalMarks: 0,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · Objective MCQs',
        marks: 15,
        pct: '20%',
        detail: '15 compulsory MCQs (1 mark each) across trade, banking & economics',
      },
      sectionB: {
        label: 'Section B · Short Answers',
        marks: 30,
        pct: '40%',
        detail: 'Attempt 6–10 analytical short questions (Partnership, SBP tools, Elasticity)',
      },
      sectionC: {
        label: 'Section C · Descriptive Questions',
        marks: 30,
        pct: '40%',
        detail: 'Detailed essays, demand/supply graphs, or bank specimen questions',
      },
    },
    passingRule: '33% pass mark (25/75) per elective written paper.',
    stbbNote:
      'Each Commerce elective paper (Commerce XI, Banking XII, Economics XI, Commercial Geography XII) carries 75 written marks.',
  },
  {
    id: 'pat-english-xi-xii',
    subject: 'English Compulsory (Part-I & Part-II)',
    classLevel: 'Class XI & XII',
    group: 'compulsory',
    groupLabel: 'All HSC Groups (Science, CS, Commerce, Arts)',
    boardAuthority: 'Sindh Textbook Board · New 20–40–40 Pattern',
    textbookRef: 'Sindh Textbook Board English XI & XII (New Edition)',
    duration: '3 Hours (Written Paper)',
    totalMarks: 100,
    theoryMarks: 100,
    practicalMarks: 0,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · MCQs & Reading',
        marks: 20,
        pct: '20%',
        detail: '20 MCQs on Prose, Poetry, Grammar & Unseen Comprehension',
      },
      sectionB: {
        label: 'Section B · Short Q&A & Grammar',
        marks: 40,
        pct: '40%',
        detail: 'Short textbook answers, active/passive, narration & punctuation',
      },
      sectionC: {
        label: 'Section C · Composition',
        marks: 40,
        pct: '40%',
        detail: 'Structured Essay, Formal Letter / Report, Précis & Unseen Passage',
      },
    },
    passingRule: '33% pass mark (33/100); compulsory for all groups.',
    stbbNote:
      'New STBB English textbooks prioritize unseen reading comprehension, structured essays, and functional grammar.',
  },
  {
    id: 'pat-islamiyat-pakstudies',
    subject: 'Islamiyat (Class XI) & Pakistan Studies (Class XII)',
    classLevel: 'Class XI (Isl) · Class XII (PS)',
    group: 'compulsory',
    groupLabel: 'All HSC Groups (Science, CS, Commerce, Arts)',
    boardAuthority: 'Sindh Textbook Board · 20–40–40 Pattern',
    textbookRef: 'Sindh Textbook Board Islamiyat XI & Pakistan Studies XII',
    duration: '2 Hours (Written Paper)',
    totalMarks: 50,
    theoryMarks: 50,
    practicalMarks: 0,
    theoryBreakdown: {
      sectionA: {
        label: 'Section A · Objective MCQs',
        marks: 10,
        pct: '20%',
        detail: '10 compulsory MCQs (1 mark each)',
      },
      sectionB: {
        label: 'Section B · Short Questions',
        marks: 20,
        pct: '40%',
        detail: 'Attempt 5 short questions (4 marks each) — Ayat/Hadith or Constitutional clauses',
      },
      sectionC: {
        label: 'Section C · Descriptive',
        marks: 20,
        pct: '40%',
        detail: 'Attempt 2 detailed essays (10 marks each)',
      },
    },
    passingRule: '33% pass mark (17/50) in each compulsory 50-mark paper.',
    stbbNote:
      'Islamiyat is examined in Class XI (50 marks) and Pakistan Studies in Class XII (50 marks).',
  },
  {
    id: 'pat-uos-bs-adp',
    subject: 'BS Zoology (4-Year) & Associate Degrees (ADC / ADS / ADA)',
    classLevel: 'Semesters I–VIII (UoS)',
    group: 'degree',
    groupLabel: 'University of Sindh Affiliated Programs',
    boardAuthority: 'University of Sindh Jamshoro · Semester Pattern',
    textbookRef: 'HEC / University of Sindh Prescribed Course Syllabi',
    duration: '3 Hours (Written Semester Paper)',
    totalMarks: 100,
    theoryMarks: 80,
    practicalMarks: 20,
    theoryBreakdown: {
      sectionA: {
        label: 'Sessional / Objective & Midterm',
        marks: 20,
        pct: '20%',
        detail: 'Midterm Assessment, Assignments, Presentations & Quizzes',
      },
      sectionB: {
        label: 'Final Theory · Short Questions',
        marks: 30,
        pct: '30%',
        detail: 'Analytical concepts, physiological pathways or financial computations',
      },
      sectionC: {
        label: 'Final Theory · Long Questions',
        marks: 30,
        pct: '30%',
        detail: 'Comprehensive essay & analytical synthesis questions',
      },
    },
    practicalInPaper: {
      marks: 20,
      pct: '20%',
      questionFormat:
        'Practical-based evaluation integrated with course assessment (80 Theory + 20 Practical-Based Assessment = 100 Total; non-lab Commerce/Arts subjects carry 100 Theory marks).',
      keyTopics: [
        'Physiology, Hematology & Slide Identification Applied Questions',
        'Spectrophotometry & Experimental Data Interpretation',
        'AD Commerce / AD Arts non-lab courses follow 100 Theory marks',
      ],
    },
    passingRule: 'Minimum 50% aggregate / GPA 2.0 per course (UoS Semester Rules).',
    stbbNote:
      'Degree courses follow University of Sindh Jamshoro semester evaluation guidelines.',
  },
];


import { SECTION_TRANSLATIONS, type SectionTranslations } from './sectionTranslations';

export type PortalLanguage = 'en' | 'ur' | 'sd';

export interface PortalTranslations {
  langLabel: string;
  topBar: {
    collegeLine: string;
    mottoYear: string;
    officeOpen: string;
    officeClosed: string;
    seccap: string;
    facebook: string;
    languageLabel: string;
  };
  nav: {
    overview: string;
    about: string;
    principal: string;
    events: string;
    academics: string;
    examPrep: string;
    departments: string;
    campusTour: string;
    collegeLibrary: string;
    collegeLabs: string;
    digitalLibrary: string;
    boardResults: string;
    achievements: string;
    alumnae: string;
    facebookLive: string;
    admissions: string;
    calendar: string;
    resources: string;
    cemis: string;
    gallery: string;
    contact: string;
    faqs: string;
    enquire: string;
    officePhone: string;
    callNow: string;
    sendEnquiry: string;
    helpline: string;
    visitSeccap: string;
  };
  quickAccess: {
    title: string;
    admissions: string;
    admissionsHint: string;
    examPrep: string;
    examPrepHint: string;
    downloads: string;
    downloadsHint: string;
    calendar: string;
    calendarHint: string;
    programs: string;
    programsHint: string;
    campusMap: string;
    campusMapHint: string;
    contact: string;
    contactHint: string;
  };
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    welcomeBefore: string;
    collegeNameBold: string;
    welcomeMiddle: string;
    mottoQuote: string;
    ctaAdmissions: string;
    ctaExamPrep: string;
    ctaHonors: string;
    ctaEnquiry: string;
    triad1Title: string;
    triad1Desc: string;
    triad2Title: string;
    triad2Desc: string;
    triad3Title: string;
    triad3Desc: string;
    crestBadge: string;
    crestName: string;
    crestAddress: string;
    crestMottoLabel: string;
    crestEstd: string;
    crestAffiliationLabel: string;
    crestAffiliationValue: string;
    crestModeLabel: string;
    crestModeValue: string;
    crestPhoneLabel: string;
    stat1Label: string;
    stat1Desc: string;
    stat2Label: string;
    stat2Desc: string;
    stat3Label: string;
    stat3Value: string;
    stat3Desc: string;
    stat4Label: string;
    stat4Desc: string;
    stat5Label: string;
    stat5Desc: string;
  };
  notices: {
    title: string;
    all: string;
    admissions: string;
    examinations: string;
    campus: string;
    readDetails: string;
    closeNotice: string;
    noticeSuffix: string;
    dateLabel: string;
  };
  admissions: {
    title: string;
    subtitle: string;
    bannerEyebrow: string;
    bannerTitle: string;
    bannerDesc: string;
    applyBtn: string;
    howToTitle: string;
    steps: { num: string; title: string; desc: string }[];
    servicesTitle: string;
    servicesDesc: string;
    serviceLinks: string[];
    checklistTitle: string;
    checklistDesc: string;
    documents: string[];
    officeTimingLabel: string;
    officeTimingValue: string;
    degreeEyebrow: string;
    degreeTitle: string;
    degreeDesc: string;
    degreeLink: string;
  };
  calendar: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filters: {
      all: string;
      intermediate: string;
      degree: string;
      campus: string;
    };
    trackLabels: {
      intermediate: string;
      degree: string;
      campus: string;
    };
    footerNote: string;
    footerLink: string;
  };
  resources: {
    title: string;
    subtitle: string;
    allDocs: string;
    categories: {
      admissionForms: string;
      enrollmentSlips: string;
      guides: string;
    };
    searchPlaceholder: string;
    downloadPdf: string;
    previewPdf: string;
    emptyTitle: string;
    emptyDesc: string;
    showAll: string;
    closePreview: string;
  };
  examPrep: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabs: {
      papers: string;
      pattern: string;
      quiz: string;
      viva: string;
      counselor: string;
    };
    streams: {
      all: string;
      science: string;
      cs: string;
      commerce: string;
      degree: string;
    };
    levels: {
      all: string;
      xi: string;
      xii: string;
      degree: string;
    };
    searchPlaceholder: string;
    papersCountLabel: string;
    viewPaper: string;
    downloadPaper: string;
    marksLabel: string;
    durationLabel: string;
    yearLabel: string;
    sectionA: string;
    sectionB: string;
    sectionC: string;
    sectionD: string;
    examinerTips: string;
    closeModal: string;
    emptyPapers: string;
    resetFilters: string;
    quizTitle: string;
    quizSubtitle: string;
    quizAllSubjects: string;
    quizScore: string;
    quizAccuracy: string;
    quizQuestion: string;
    quizNext: string;
    quizReset: string;
    quizCorrect: string;
    quizIncorrect: string;
    quizCompletedTitle: string;
    quizCompletedDesc: string;
    vivaTitle: string;
    vivaSubtitle: string;
    vivaAllLabs: string;
    vivaReveal: string;
    vivaHide: string;
    vivaTipLabel: string;
    counselor: {
      title: string;
      subtitle: string;
      resetBtn: string;
      streamLabel: string;
      subjectsLabel: string;
      welcomeHeading: string;
      welcomeBody: string;
      starterTitle: string;
      thinking: string;
      inputPlaceholder: string;
      sendBtn: string;
      errorFallback: string;
    };
    pattern: {
      eyebrow: string;
      title: string;
      subtitle: string;
      ruleBannerTitle: string;
      ruleBannerDesc: string;
      ratioA: string;
      ratioB: string;
      ratioC: string;
      ratioPractical: string;
      groups: {
        all: string;
        science: string;
        cs: string;
        commerce: string;
        compulsory: string;
        degree: string;
      };
      totalMarksLabel: string;
      theoryMarksLabel: string;
      practicalMarksLabel: string;
      theoryOnlyBadge: string;
      inPaperBadge: string;
      theoryHeading: string;
      practicalHeading: string;
      practicalTopicsHeading: string;
      passingHeading: string;
      textbookLabel: string;
      marksUnit: string;
      noPracticalNote: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    phoneEyebrow: string;
    phoneTitle: string;
    helplineLabel: string;
    locationEyebrow: string;
    locationTitle: string;
    mapsLink: string;
    emailEyebrow: string;
    emailTitle: string;
    emailDesc: string;
    hoursEyebrow: string;
    formEyebrow: string;
    formTitle: string;
    formDesc: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    categoryLabel: string;
    messageLabel: string;
    submitBtn: string;
    submittingBtn: string;
    mapTitle: string;
    openDirections: string;
    qrEyebrow: string;
    qrTitle: string;
    qrDesc: string;
  };
  footer: {
    newsletterTitle: string;
    newsletterDesc: string;
    subscribeBtn: string;
    subscribingBtn: string;
    privacyNote: string;
    gazetteNote: string;
    navHeading: string;
    pathwaysHeading: string;
    affiliationHeading: string;
    aboutSummary: string;
    adminInbox: string;
    backToTop: string;
    rights: string;
  };
  sections: SectionTranslations;
}

export const PORTAL_TRANSLATIONS: Record<PortalLanguage, PortalTranslations> = {
  en: {
    langLabel: 'English',
    topBar: {
      collegeLine: 'Government Girls Zubaida College · Hyderabad, Sindh',
      mottoYear: '“Service Above Self” · Estd. 1953',
      officeOpen: 'Office Open',
      officeClosed: 'Office Closed',
      seccap: 'SECCAP',
      facebook: 'Facebook Page',
      languageLabel: 'Language',
    },
    nav: {
      overview: 'Overview',
      about: 'About & History',
      principal: 'Principal’s Desk',
      events: 'Events',
      academics: 'Academics',
      examPrep: 'Past Papers & Prep',
      departments: 'Departments',
      campusTour: 'Virtual Campus Tour',
      collegeLibrary: 'College Library',
      collegeLabs: 'College Labs',
      digitalLibrary: 'Digital Library',
      boardResults: 'Board Honors',
      achievements: 'Student Achievements',
      alumnae: 'Distinguished Alumnae',
      facebookLive: 'Facebook Live',
      admissions: 'Admissions & SECCAP',
      calendar: 'Academic Calendar',
      resources: 'Student Resources',
      cemis: 'Faculty CEMIS',
      gallery: 'Campus Gallery',
      contact: 'Location & Contact',
      faqs: 'FAQs',
      enquire: 'Enquire',
      officePhone: 'College Office Phone',
      callNow: 'Call Now',
      sendEnquiry: 'Send Admission Enquiry',
      helpline: 'Admission Helpline',
      visitSeccap: 'Visit Official SECCAP Portal ↗',
    },
    quickAccess: {
      title: 'Quick Access',
      admissions: 'Admissions',
      admissionsHint: 'SECCAP & Merit Desk',
      examPrep: 'Past Papers & Prep',
      examPrepHint: 'BISE, MCQs & Viva',
      downloads: 'Downloads',
      downloadsHint: 'Forms, Slips & PDFs',
      calendar: 'Academic Calendar',
      calendarHint: '2026–27 Key Dates',
      programs: 'Programs',
      programsHint: 'HSC, BS & ADP',
      campusMap: 'Campus Map',
      campusMapHint: 'Interactive Walk Tour',
      contact: 'Contact Desk',
      contactHint: 'Location & Enquiry',
    },
    hero: {
      headlineLine1: 'Knowledge that empowers.',
      headlineLine2: 'Education that transforms.',
      welcomeBefore: 'Welcome to',
      collegeNameBold: 'Government Girls Zubaida College, Hyderabad',
      welcomeMiddle:
        '— A distinguished home for learning, intellectual discovery, and student achievement for over seven decades under our guiding light:',
      mottoQuote: '“Service Above Self”',
      ctaAdmissions: 'SECCAP Admissions 2026',
      ctaExamPrep: 'Past Papers & Exam Prep',
      ctaHonors: 'Board Honors (2nd & 4th)',
      ctaEnquiry: 'Online Enquiry',
      triad1Title: 'Curiosity',
      triad1Desc: 'Ask boldly. Discover truth.',
      triad2Title: 'Confidence',
      triad2Desc: 'Believe in your capabilities.',
      triad3Title: 'Community',
      triad3Desc: 'Service above self, always.',
      crestBadge: 'Government College',
      crestName: 'Govt Girls Zubaida College',
      crestAddress: 'Opposite Central Jail, Pathan Colony, Hirabad, Hyderabad',
      crestMottoLabel: 'College Motto',
      crestEstd: 'Established 1953 · Sindh, Pakistan',
      crestAffiliationLabel: 'Affiliation:',
      crestAffiliationValue: 'BISE Hyderabad & Univ. of Sindh',
      crestModeLabel: 'Admission Mode:',
      crestModeValue: 'SECCAP Centralized',
      crestPhoneLabel: 'Official Phone:',
      stat1Label: 'Established',
      stat1Desc: 'Over 70 years serving the daughters of Hyderabad.',
      stat2Label: 'Total Students',
      stat2Desc: 'Total enrolled students across HSC & Degree programs.',
      stat3Label: 'Board Honors',
      stat3Value: '2nd & 4th',
      stat3Desc: 'Top Board Positions in Computer Science Group.',
      stat4Label: 'Standard',
      stat4Desc: 'Pass rate with predominant A1 & A grades.',
      stat5Label: 'Admissions',
      stat5Desc: 'Sindh Govt centralized free education policy.',
    },
    notices: {
      title: 'News & Official Announcements',
      all: 'All Notices',
      admissions: 'Admissions',
      examinations: 'Examinations',
      campus: 'Campus',
      readDetails: 'Read details',
      closeNotice: 'Close Notice',
      noticeSuffix: 'Notice',
      dateLabel: 'Date:',
    },
    admissions: {
      title: 'SECCAP Centralized Admissions',
      subtitle:
        'Complete guidelines for admission into Intermediate Class XI (First Year) and Degree Programs at Government Girls Zubaida College Hyderabad.',
      bannerEyebrow: 'Free Education Initiative',
      bannerTitle: '100% Free Intermediate Admission for Qualified Students',
      bannerDesc:
        'Under the policy of the Government of Sindh, admission to Class XI is free of tuition fee on the basis of Class IX/X results through SECCAP.',
      applyBtn: 'Apply Online at SECCAP',
      howToTitle: 'How to Apply through SECCAP',
      steps: [
        {
          num: '01',
          title: 'Online SECCAP Application',
          desc: "Visit the official portal at seccap.dgcs.gos.pk. Choose 'New Application' for First Year Intermediate Class XI admission.",
        },
        {
          num: '02',
          title: 'Enter Roll Number & B-Form',
          desc: "Input your Class IX / SSC Matriculation Roll Number, Passing Year, and candidate's NADRA B-Form or CNIC number.",
        },
        {
          num: '03',
          title: 'Select College & Preferred Group',
          desc: 'Select Govt Girls Zubaida College Hyderabad as your priority preference and choose your group (Pre-Medical, Pre-Engineering, Computer Science, Commerce, Arts).',
        },
        {
          num: '04',
          title: 'Merit Verification & Free Enrolment',
          desc: 'Check placement results online. Visit the college admission desk with original documents for instant verification and zero-fee enrollment.',
        },
      ],
      servicesTitle: 'Official SECCAP Portal Services',
      servicesDesc:
        'The Sindh Electronic Centralized College Admission Program provides direct online services for all prospective Zubeidians:',
      serviceLinks: ['Apply Online ↗', 'Check Result ↗', 'Digital ID Card ↗', 'Complaint Box ↗'],
      checklistTitle: 'Document Checklist for Final Verification',
      checklistDesc:
        'Please bring the following original documents and photocopies to the college admission desk after receiving your SECCAP placement notification:',
      documents: [
        'Class IX / X (Matriculation) Marks Certificate (Original & Photocopies)',
        "Candidate's NADRA B-Form or CNIC copy",
        "Father's / Guardian's CNIC photocopy",
        'Recent passport-sized photographs (White or Blue background)',
        'School Leaving Certificate (SLC) / Character Certificate',
        'SECCAP Online Placement Form printout',
      ],
      officeTimingLabel: 'Admission Office Timing:',
      officeTimingValue: 'Monday to Saturday, 8:00 AM – 1:30 PM (Pakistan Time).',
      degreeEyebrow: 'BS Zoology & ADP Admissions',
      degreeTitle: 'Undergraduate Degree & ADP Admissions',
      degreeDesc:
        'Admissions for the 4-Year BS Zoology and 2-Year Associate Degree Programs (AD Commerce, AD Science, AD Arts) are conducted in affiliation with the University of Sindh, Jamshoro. Application forms and merit lists are issued according to the university calendar.',
      degreeLink: 'Inquire with Degree Admission Cell ↗',
    },
    calendar: {
      eyebrow: 'Session 2026–2027 · College Education Department, Sindh',
      title: 'Academic Calendar',
      subtitle:
        'Key academic dates covering SECCAP admissions, term assessments, BISE Hyderabad board examinations, and University of Sindh semester schedules.',
      filters: {
        all: 'All Schedule',
        intermediate: 'Intermediate (HSC)',
        degree: 'BS & ADP (Univ. of Sindh)',
        campus: 'Vacations & Ceremonies',
      },
      trackLabels: {
        intermediate: 'Intermediate HSC',
        degree: 'BS & ADP Degree',
        campus: 'Campus Schedule',
      },
      footerNote:
        'Dates follow official notifications from the College Education Department, BISE Hyderabad, and University of Sindh.',
      footerLink: 'Check Latest Official Notices →',
    },
    resources: {
      title: 'Student Resources & Downloadable Forms',
      subtitle:
        'Official downloadable PDF admission forms, BISE & University enrollment slips, and semester registration guides for scholars of Government Girls Zubaida College, Hyderabad.',
      allDocs: 'All Documents',
      categories: {
        admissionForms: 'Admission Forms',
        enrollmentSlips: 'Enrollment Slips',
        guides: 'Semester Registration Guides',
      },
      searchPlaceholder: 'Search forms, slips, or guides...',
      downloadPdf: 'Download PDF',
      previewPdf: 'Preview PDF',
      emptyTitle: 'No matching forms or guides found',
      emptyDesc: 'Try clearing your search or selecting “All Documents” above.',
      showAll: 'Show All Resources',
      closePreview: 'Close PDF preview',
    },
    examPrep: {
      eyebrow: 'BISE Hyderabad & University of Sindh Study Archive',
      title: 'Dynamic Past Papers & Examination Prep Hub',
      subtitle:
        'Practice authentic BISE Hyderabad (Class XI & XII) and University of Sindh (BS & Associate Degree) past papers with integrated in-paper practicals, self-check MCQ drills, and written practical solutions.',
      tabs: {
        papers: 'Past & Model Papers',
        pattern: 'Paper Pattern (Theory + Practical)',
        quiz: 'MCQ Practice Quiz',
        viva: 'In-Paper Practical Guide',
        counselor: 'AI Career Counselor',
      },
      streams: {
        all: 'All Streams',
        science: 'Pre-Medical & Science',
        cs: 'Pre-Engineering & CS',
        commerce: 'Commerce (I.Com)',
        degree: 'BS & ADP (UoS)',
      },
      levels: {
        all: 'All Levels',
        xi: 'Class XI',
        xii: 'Class XII',
        degree: 'BS & ADP',
      },
      searchPlaceholder: 'Search subject, paper code, or topic (e.g. Banking, Physics)...',
      papersCountLabel: 'papers matched',
      viewPaper: 'View Paper & Guide',
      downloadPaper: 'Download PDF',
      marksLabel: 'Max Marks',
      durationLabel: 'Duration',
      yearLabel: 'Session',
      sectionA: 'Section A · Multiple Choice Questions (Objective)',
      sectionB: 'Section B · Short-Answer Questions (Analytical)',
      sectionC: 'Section C · Descriptive & Numerical Questions',
      sectionD: 'Section D · Written Practical Questions (Included in Paper)',
      examinerTips: 'Examiner Marking Scheme & Preparation Tips',
      closeModal: 'Close Paper',
      emptyPapers: 'No past papers match your current stream or search filter.',
      resetFilters: 'Reset All Filters',
      quizTitle: 'Self-Check Objective MCQ Trainer',
      quizSubtitle:
        'Select your subject group below and test your exam readiness with instant BISE & UoS style feedback.',
      quizAllSubjects: 'All Subjects Mixed',
      quizScore: 'Score',
      quizAccuracy: 'Accuracy',
      quizQuestion: 'Question',
      quizNext: 'Next Question',
      quizReset: 'Restart Quiz',
      quizCorrect: 'Correct Answer',
      quizIncorrect: 'Review Concept',
      quizCompletedTitle: 'Practice Session Completed',
      quizCompletedDesc: 'Review your score above or switch subjects to continue practicing.',
      vivaTitle: 'In-Paper Written Practical Questions Guide',
      vivaSubtitle:
        'Under the new Sindh Textbook Board scheme, practical questions are answered directly inside the written exam paper—practice observation tables, diagrams, titrations, and C++/SQL dry-runs.',
      vivaAllLabs: 'All Subjects',
      vivaReveal: 'Show Model Written Answer',
      vivaHide: 'Hide Answer',
      vivaTipLabel: 'Paper Tip:',
      counselor: {
        title: 'AI Academic & Career Counselor',
        subtitle:
          'Select your Intermediate or Degree stream and subjects to explore tailored university degrees, entry tests, and career pathways.',
        resetBtn: 'New Conversation',
        streamLabel: 'Study Stream:',
        subjectsLabel: 'Your Current Subjects:',
        welcomeHeading: 'Ask about degrees, merit pathways, and career options',
        welcomeBody:
          'Choose your Commerce (Accounting, Commerce, Banking & Money, Economics), Science, or Computer Science subjects above—or click one of the starter questions below.',
        starterTitle: 'Quick Career Prompts for Zubeidians',
        thinking: 'Analyzing degree pathways and university options...',
        inputPlaceholder: 'Ask about BBA, CA, MBBS, BS CS, MUET/UoS admissions, or careers...',
        sendBtn: 'Ask Counselor',
        errorFallback: 'Unable to reach the Career Counselor right now. Please try again.',
      },
      pattern: {
        eyebrow: 'Sindh Textbook Board (Jamshoro) · New Unified Paper Pattern (Since Last Year)',
        title: 'Theory + Practical Included in Exam Paper (100 Marks)',
        subtitle:
          'Since last year under the new Sindh Textbook Board examination scheme, separate practical exams are replaced: Practical-Based Questions come directly inside the written exam paper alongside Theory.',
        ruleBannerTitle: 'New STBB Unified Paper: Theory + Practical Together in Exam Hall',
        ruleBannerDesc:
          'Physics, Chemistry, and Biology papers combine 85 Theory + 15 Written Practical Questions inside one 100-mark exam paper (Computer Science: 75 Theory + 25 Written Practical Questions). Non-practical subjects follow the 20% MCQs · 40% Short · 40% Long written paper structure.',
        ratioA: 'Theory Sec A (MCQs)',
        ratioB: 'Theory Sec B (Short)',
        ratioC: 'Theory Sec C (Long)',
        ratioPractical: 'Practical in Paper (15–25%)',
        groups: {
          all: 'All Subjects',
          science: 'Science (Phy / Chem / Bio)',
          cs: 'CS & Mathematics',
          commerce: 'Commerce (I.Com)',
          compulsory: 'Compulsory (Eng / Isl / PS)',
          degree: 'BS Zoology & ADP (UoS)',
        },
        totalMarksLabel: 'Total Written Marks',
        theoryMarksLabel: 'Theory in Paper',
        practicalMarksLabel: 'Practical in Paper',
        theoryOnlyBadge: 'Theory Only (No Practical)',
        inPaperBadge: 'Attempted Inside Exam Paper',
        theoryHeading: 'Theory Portion in Written Paper',
        practicalHeading: 'Practical Portion Included in Exam Paper',
        practicalTopicsHeading: 'Written Practical Question Areas (Inside Exam Paper):',
        passingHeading: 'Passing Rule:',
        textbookLabel: 'Sindh Textbook Board Ref:',
        marksUnit: 'Marks',
        noPracticalNote: '100% assessed via written theory questions on the board exam paper.',
      },
    },
    contact: {
      title: 'Location & Contact Us',
      subtitle:
        'We welcome students, parents, and visitors to our campus. Reach out to our admission officers or visit us during listed office hours.',
      phoneEyebrow: 'Official Phone No.',
      phoneTitle: 'College Landline',
      helplineLabel: 'Admission Helpline:',
      locationEyebrow: 'Campus Location',
      locationTitle: 'Visit Our Campus',
      mapsLink: 'Google Maps ↗',
      emailEyebrow: 'Official Email',
      emailTitle: 'Send Inquiries',
      emailDesc: 'For administrative & verification queries:',
      hoursEyebrow: 'Office Hours',
      formEyebrow: 'Direct Contact',
      formTitle: 'Submit an Online Enquiry',
      formDesc: 'Submit your question and our administration desk will review your inquiry.',
      nameLabel: 'Your Full Name *',
      emailLabel: 'Email Address *',
      phoneLabel: 'Phone Number (Optional)',
      categoryLabel: 'Enquiry Category *',
      messageLabel: 'Your Message *',
      submitBtn: 'Submit Inquiry',
      submittingBtn: 'Submitting Inquiry...',
      mapTitle: 'Campus Navigation Map',
      openDirections: 'Open Full Directions ↗',
      qrEyebrow: 'Scan With Smartphone Camera',
      qrTitle: 'Instant Google Maps Navigation',
      qrDesc:
        'Point your smartphone camera at this QR code to instantly launch GPS turn-by-turn directions directly to Govt Girls Zubaida College located opposite Hyderabad Central Jail in Pathan Colony, Hirabad, Hyderabad.',
    },
    footer: {
      newsletterTitle: 'Subscribe for College News & Upcoming Events',
      newsletterDesc:
        'Receive verified updates on SECCAP admissions, BISE board examination results, holidays, and campus assemblies directly in your inbox.',
      subscribeBtn: 'Subscribe',
      subscribingBtn: 'Subscribing...',
      privacyNote: 'Official college bulletins only. Zero spam.',
      gazetteNote: 'Monthly Gazette & Alerts',
      navHeading: 'Navigation',
      pathwaysHeading: 'Study Pathways',
      affiliationHeading: 'Affiliation & Campus',
      aboutSummary:
        'Sindh’s premier public collegiate institution for women since 1953. Currently educating over 2,000 enrolled students across intermediate HSC, 4-year BS, and 2-year associate degree faculties.',
      adminInbox: 'Admin Inbox',
      backToTop: 'Back to Top',
      rights: 'Government Girls Zubaida College, Hyderabad. All Rights Reserved.',
    },
    sections: SECTION_TRANSLATIONS.en,
  },
  ur: {
    langLabel: 'اردو',
    topBar: {
      collegeLine: 'گورنمنٹ گرلز زبیدہ کالج · حیدرآباد، سندھ',
      mottoYear: '“خدمتِ خلق قبل از ذات” · قائم شدہ 1953',
      officeOpen: 'دفتر کھلا ہے',
      officeClosed: 'دفتر بند ہے',
      seccap: 'سی کیپ (SECCAP)',
      facebook: 'فیس بک پیج',
      languageLabel: 'زبان',
    },
    nav: {
      overview: 'جائزہ',
      about: 'تاریخ و تعارف',
      principal: 'پرنسپل کا پیغام',
      events: 'تقریبات',
      academics: 'تعلیمی پروگرام',
      examPrep: 'ماضی کے پرچے اور تیاری',
      departments: 'شعبہ جات',
      campusTour: 'کیمپس کا ورچوئل دورہ',
      collegeLibrary: 'کالج لائبریری',
      collegeLabs: 'لیبارٹریز',
      digitalLibrary: 'ڈیجیٹل لائبریری',
      boardResults: 'بورڈ پوزیشنز',
      achievements: 'طالبات کی کامیابیاں',
      alumnae: 'ممتاز سابقہ طالبات',
      facebookLive: 'فیس بک اپڈیٹس',
      admissions: 'داخلے اور سی کیپ',
      calendar: 'تعلیمی کیلنڈر',
      resources: 'طالبات کے فارمز',
      cemis: 'اسٹاف سی ای ایم آئی ایس',
      gallery: 'تصویری گیلری',
      contact: 'مقام اور رابطہ',
      faqs: 'عمومی سوالات',
      enquire: 'معلومات',
      officePhone: 'کالج آفس فون',
      callNow: 'ابھی کال کریں',
      sendEnquiry: 'داخلہ معلومات بھیجیں',
      helpline: 'داخلہ ہیلپ لائن',
      visitSeccap: 'آفیشل سی کیپ پورٹل دیکھیں ↗',
    },
    quickAccess: {
      title: 'فوری رسائی',
      admissions: 'داخلے',
      admissionsHint: 'سی کیپ اور میرٹ ڈیسک',
      examPrep: 'ماضی کے پرچے',
      examPrepHint: 'بورڈ پرچے، معروضی اور وائیوا',
      downloads: 'ڈاؤن لوڈز',
      downloadsHint: 'فارمز، سلپس اور پی ڈی ایف',
      calendar: 'تعلیمی کیلنڈر',
      calendarHint: '2026–27 اہم تاریخیں',
      programs: 'تعلیمی شعبے',
      programsHint: 'انٹر، بی ایس اور اے ڈی پی',
      campusMap: 'کیمپس نقشہ',
      campusMapHint: 'انٹرایکٹو کیمپس سیر',
      contact: 'رابطہ ڈیسک',
      contactHint: 'پتہ اور آن لائن استفسار',
    },
    hero: {
      headlineLine1: 'علم جو بااختیار بنائے۔',
      headlineLine2: 'تعلیم جو زندگی بدل دے۔',
      welcomeBefore: 'خوش آمدید —',
      collegeNameBold: 'گورنمنٹ گرلز زبیدہ کالج، حیدرآباد',
      welcomeMiddle:
        '— سات دہائیوں سے زائد عرصے سے علم، فکری جستجو اور طالبات کی شاندار کامیابیوں کا معتبر مرکز، ہمارے رہنما اصول کے تحت:',
      mottoQuote: '“خدمتِ خلق قبل از ذات”',
      ctaAdmissions: 'سی کیپ داخلے 2026',
      ctaExamPrep: 'ماضی کے پرچے اور امتحانی تیاری',
      ctaHonors: 'بورڈ اعزازات (دوسری اور چوتھی پوزیشن)',
      ctaEnquiry: 'آن لائن استفسار',
      triad1Title: 'تجسس',
      triad1Desc: 'بے خوف سوال کریں، سچائی تلاش کریں۔',
      triad2Title: 'اعتماد',
      triad2Desc: 'اپنی صلاحیتوں پر یقین رکھیں۔',
      triad3Title: 'خدمت',
      triad3Desc: 'ہمیشہ ذات سے بڑھ کر خدمت۔',
      crestBadge: 'سرکاری کالج',
      crestName: 'گورنمنٹ گرلز زبیدہ کالج',
      crestAddress: 'مقابل سینٹرل جیل، پٹھان کالونی، ہیرآباد، حیدرآباد',
      crestMottoLabel: 'کالج کا شعار',
      crestEstd: 'قائم شدہ 1953 · سندھ، پاکستان',
      crestAffiliationLabel: 'الحاق:',
      crestAffiliationValue: 'تعلیمی بورڈ حیدرآباد اور جامعہ سندھ',
      crestModeLabel: 'طریقۂ داخلہ:',
      crestModeValue: 'مرکزی سی کیپ (SECCAP)',
      crestPhoneLabel: 'سرکاری فون:',
      stat1Label: 'قیام',
      stat1Desc: 'حیدرآباد کی بیٹیوں کی خدمت کے 70 سال سے زائد۔',
      stat2Label: 'کل طالبات',
      stat2Desc: 'انٹرمیڈیٹ اور ڈگری پروگرامز میں زیرِ تعلیم طالبات۔',
      stat3Label: 'بورڈ اعزازات',
      stat3Value: 'دوسری اور چوتھی',
      stat3Desc: 'کمپیوٹر سائنس گروپ میں بورڈ کی نمایاں پوزیشنز۔',
      stat4Label: 'معیار',
      stat4Desc: 'نمایاں A1 اور A گریڈز کے ساتھ 100 فیصد کامیابی۔',
      stat5Label: 'داخلے',
      stat5Desc: 'حکومتِ سندھ کی مرکزی مفت تعلیمی پالیسی۔',
    },
    notices: {
      title: 'اہم خبریں اور سرکاری اعلانات',
      all: 'تمام اعلانات',
      admissions: 'داخلے',
      examinations: 'امتحانات',
      campus: 'کیمپس',
      readDetails: 'تفصیل پڑھیں',
      closeNotice: 'بند کریں',
      noticeSuffix: 'اعلان',
      dateLabel: 'تاریخ:',
    },
    admissions: {
      title: 'سی کیپ (SECCAP) مرکزی داخلے',
      subtitle:
        'گورنمنٹ گرلز زبیدہ کالج حیدرآباد میں انٹرمیڈیٹ سالِ اول (گیارہویں جماعت) اور ڈگری پروگرامز میں داخلے کے مکمل رہنما اصول۔',
      bannerEyebrow: 'مفت تعلیم کا اقدام',
      bannerTitle: 'اہل طالبات کے لیے 100 فیصد مفت انٹرمیڈیٹ داخلہ',
      bannerDesc:
        'حکومتِ سندھ کی پالیسی کے تحت سی کیپ کے ذریعے میٹرک نتائج کی بنیاد پر گیارہویں جماعت میں داخلہ ٹیوشن فیس کے بغیر مفت دیا جاتا ہے۔',
      applyBtn: 'سی کیپ پر آن لائن اپلائی کریں',
      howToTitle: 'سی کیپ کے ذریعے درخواست دینے کا طریقہ',
      steps: [
        {
          num: '01',
          title: 'آن لائن سی کیپ درخواست',
          desc: 'سرکاری پورٹل seccap.dgcs.gos.pk پر جائیں اور فرسٹ ایئر (گیارہویں جماعت) میں داخلے کے لیے نئی درخواست منتخب کریں۔',
        },
        {
          num: '02',
          title: 'رول نمبر اور ب فارم درج کریں',
          desc: 'اپنا میٹرک رول نمبر، پاسنگ سال اور امیدوار کا نادرا ب فارم یا شناختی کارڈ نمبر درج کریں۔',
        },
        {
          num: '03',
          title: 'کالج اور پسندیدہ گروپ منتخب کریں',
          desc: 'ترجیحی فہرست میں گورنمنٹ گرلز زبیدہ کالج حیدرآباد اور اپنا گروپ (پری میڈیکل، پری انجینئرنگ، کمپیوٹر سائنس، کامرس، آرٹس) منتخب کریں۔',
        },
        {
          num: '04',
          title: 'میرٹ کی تصدیق اور مفت داخلہ',
          desc: 'آن لائن پلیسمنٹ لسٹ چیک کریں اور اصل دستاویزات کے ساتھ کالج ایڈمیشن ڈیسک پر تصدیق کروائیں۔',
        },
      ],
      servicesTitle: 'سی کیپ پورٹل کی سرکاری سہولیات',
      servicesDesc: 'سندھ الیکٹرانک سینٹرلائزڈ کالج ایڈمیشن پروگرام نئی طالبات کو درج ذیل آن لائن سہولیات فراہم کرتا ہے:',
      serviceLinks: ['آن لائن درخواست ↗', 'نتیجہ چیک کریں ↗', 'ڈیجیٹل آئی ڈی کارڈ ↗', 'شکایت سیل ↗'],
      checklistTitle: 'حتمی تصدیق کے لیے ضروری دستاویزات',
      checklistDesc: 'سی کیپ پلیسمنٹ جاری ہونے کے بعد درج ذیل اصل دستاویزات اور فوٹو کاپیاں کالج آفس میں ساتھ لائیں:',
      documents: [
        'نہم / دہم (میٹرک) مارکس سرٹیفکیٹ (اصل اور فوٹو کاپیاں)',
        'طالبہ کا نادرا ب فارم یا شناختی کارڈ کی کاپی',
        'والد / سرپرست کے شناختی کارڈ کی فوٹو کاپی',
        'تازہ پاسپورٹ سائز تصاویر (سفید یا نیلے پس منظر کے ساتھ)',
        'اسکول لیونگ سرٹیفکیٹ (SLC) / کریکٹر سرٹیفکیٹ',
        'سی کیپ آن لائن پلیسمنٹ فارم کا پرنٹ آؤٹ',
      ],
      officeTimingLabel: 'ایڈمیشن آفس کے اوقات:',
      officeTimingValue: 'پیر تا ہفتہ، صبح 8:00 بجے سے دوپہر 1:30 بجے تک (پاکستانی وقت)۔',
      degreeEyebrow: 'بی ایس زولوجی اور اے ڈی پی داخلے',
      degreeTitle: 'انڈرگریجویٹ ڈگری اور ایسوسی ایٹ ڈگری داخلے',
      degreeDesc:
        'چار سالہ بی ایس زولوجی اور دو سالہ ایسوسی ایٹ ڈگری پروگرامز (اے ڈی کامرس، اے ڈی سائنس، اے ڈی آرٹس) کے داخلے جامعہ سندھ جامشورو کے الحاق سے جاری کیلنڈر کے مطابق ہوتے ہیں۔',
      degreeLink: 'ڈگری ایڈمیشن سیل سے رابطہ کریں ↗',
    },
    calendar: {
      eyebrow: 'تعلیمی سیشن 2026–2027 · محکمہ کالج تعلیم، سندھ',
      title: 'تعلیمی کیلنڈر',
      subtitle:
        'سی کیپ داخلوں، ششماہی امتحانات، حیدرآباد بورڈ کے سالانہ امتحانات اور جامعہ سندھ کے سمسٹر شیڈول کی اہم تاریخیں۔',
      filters: {
        all: 'مکمل شیڈول',
        intermediate: 'انٹرمیڈیٹ (HSC)',
        degree: 'بی ایس اور اے ڈی پی (جامعہ سندھ)',
        campus: 'تعطیلات اور تقریبات',
      },
      trackLabels: {
        intermediate: 'انٹرمیڈیٹ HSC',
        degree: 'بی ایس اور اے ڈی پی ڈگری',
        campus: 'کیمپس شیڈول',
      },
      footerNote: 'تمام تاریخیں محکمہ کالج تعلیم سندھ، تعلیمی بورڈ حیدرآباد اور جامعہ سندھ کے سرکاری اعلانات کے مطابق ہیں۔',
      footerLink: 'تازہ سرکاری اعلانات دیکھیں ←',
    },
    resources: {
      title: 'طالبات کے وسائل اور قابلِ ڈاؤن لوڈ فارمز',
      subtitle:
        'گورنمنٹ گرلز زبیدہ کالج حیدرآباد کی طالبات کے لیے سرکاری داخلہ فارمز، بورڈ اور یونیورسٹی انرولمنٹ سلپس اور رجسٹریشن گائیڈز۔',
      allDocs: 'تمام دستاویزات',
      categories: {
        admissionForms: 'داخلہ فارمز',
        enrollmentSlips: 'انرولمنٹ سلپس',
        guides: 'سمسٹر رجسٹریشن گائیڈز',
      },
      searchPlaceholder: 'فارمز، سلپس یا گائیڈز تلاش کریں...',
      downloadPdf: 'پی ڈی ایف ڈاؤن لوڈ',
      previewPdf: 'پی ڈی ایف دیکھیں',
      emptyTitle: 'کوئی متعلقہ فارم یا گائیڈ نہیں ملی',
      emptyDesc: 'اپنی تلاش صاف کریں یا اوپر سے "تمام دستاویزات" منتخب کریں۔',
      showAll: 'تمام وسائل دکھائیں',
      closePreview: 'پیش نظارہ بند کریں',
    },
    examPrep: {
      eyebrow: 'تعلیمی بورڈ حیدرآباد اور جامعہ سندھ کا امتحانی آرکائیو',
      title: 'متحرک ماضی کے پرچے اور امتحانی تیاری کا مرکز',
      subtitle:
        'سائنس، کمپیوٹر سائنس، کامرس اور آرٹس کی طالبات کے لیے پرچے میں شامل پریکٹیکل سوالات سمیت ماضی کے پرچے، معروضی مشق اور تحریری پریکٹیکل گائیڈز۔',
      tabs: {
        papers: 'ماضی اور ماڈل پرچے',
        pattern: 'نیا پیپر پیٹرن (تھیوری + پریکٹیکل)',
        quiz: 'معروضی مشق کوئز',
        viva: 'پرچے میں پریکٹیکل گائیڈ',
        counselor: 'اے آئی کیریئر کونسلر',
      },
      streams: {
        all: 'تمام گروپس',
        science: 'پری میڈیکل اور سائنس',
        cs: 'پری انجینئرنگ اور کمپیوٹر سائنس',
        commerce: 'کامرس گروپ (I.Com)',
        degree: 'بی ایس اور اے ڈی پی',
      },
      levels: {
        all: 'تمام درجے',
        xi: 'گیارہویں جماعت',
        xii: 'بارہویں جماعت',
        degree: 'بی ایس اور اے ڈی پی',
      },
      searchPlaceholder: 'مضمون، پیپر کوڈ یا عنوان تلاش کریں...',
      papersCountLabel: 'پرچے دستیاب ہیں',
      viewPaper: 'پرچہ اور گائیڈ دیکھیں',
      downloadPaper: 'پی ڈی ایف ڈاؤن لوڈ',
      marksLabel: 'کل نمبر',
      durationLabel: 'وقت',
      yearLabel: 'سیشن',
      sectionA: 'حصہ الف · کثیر الانتخابی سوالات (معروضی)',
      sectionB: 'حصہ ب · مختصر جوابی سوالات',
      sectionC: 'حصہ ج · تفصیلی اور عددی سوالات',
      sectionD: 'حصہ د · تحریری پریکٹیکل سوالات (پرچے میں شامل)',
      examinerTips: 'ممتحن کی مارکنگ اسکیم اور تیاری کے نکات',
      closeModal: 'پرچہ بند کریں',
      emptyPapers: 'آپ کے منتخب کردہ فلٹر کے مطابق کوئی پرچہ نہیں ملا۔',
      resetFilters: 'تمام فلٹرز بحال کریں',
      quizTitle: 'خود جانچ معروضی (MCQ) پریکٹس ٹرینر',
      quizSubtitle: 'اپنا مضمون منتخب کریں اور فوری وضاحت کے ساتھ امتحانی تیاری کا جائزہ لیں۔',
      quizAllSubjects: 'تمام مضامین',
      quizScore: 'اسکور',
      quizAccuracy: 'درستگی',
      quizQuestion: 'سوال',
      quizNext: 'اگلا سوال',
      quizReset: 'دوبارہ شروع کریں',
      quizCorrect: 'درست جواب',
      quizIncorrect: 'تصور کا جائزہ لیں',
      quizCompletedTitle: 'مشق مکمل ہو گئی',
      quizCompletedDesc: 'اوپر اپنا نتیجہ دیکھیں یا کسی اور مضمون کی مشق شروع کریں۔',
      vivaTitle: 'امتحانی پرچے میں شامل تحریری پریکٹیکل گائیڈ',
      vivaSubtitle: 'سندھ ٹیکسٹ بک بورڈ کے نئے پیٹرن کے مطابق پریکٹیکل سوالات اب تحریری پرچے کے اندر ہی آتے ہیں—مشاہداتی جدول، خاکے اور C++/SQL سوالات کی تیاری کریں۔',
      vivaAllLabs: 'تمام مضامین',
      vivaReveal: 'تحریری مثالی جواب دیکھیں',
      vivaHide: 'جواب چھپائیں',
      vivaTipLabel: 'پرچے کا مشورہ:',
      counselor: {
        title: 'اے آئی تعلیمی اور کیریئر کونسلر',
        subtitle:
          'اپنے انٹرمیڈیٹ یا ڈگری گروپ اور مضامین منتخب کریں تاکہ یونیورسٹی ڈگریوں، انٹری ٹیسٹ اور کیریئر مواقع کی رہنمائی حاصل کر سکیں۔',
        resetBtn: 'نئی گفتگو',
        streamLabel: 'تعلیمی گروپ:',
        subjectsLabel: 'آپ کے موجودہ مضامین:',
        welcomeHeading: 'ڈگری پروگرامز، میرٹ اور کیریئر مواقع کے بارے میں پوچھیں',
        welcomeBody:
          'اوپر سے اپنا کامرس، سائنس یا کمپیوٹر سائنس گروپ منتخب کریں یا نیچے دیے گئے مثالی سوالات میں سے کسی پر کلک کریں۔',
        starterTitle: 'طالبات کے لیے فوری کیریئر سوالات',
        thinking: 'تعلیمی شعبوں اور کیریئر مواقع کا جائزو لیا جا رہا ہے...',
        inputPlaceholder: 'بی بی اے، سی اے، ایم بی بی ایس، بی ایس سی ایس یا جامعہ سندھ کے بارے میں پوچھیں...',
        sendBtn: 'مشورہ حاصل کریں',
        errorFallback: 'اس وقت کیریئر کونسلر سے رابطہ ممکن نہیں۔ براہِ کرم دوبارہ کوشش کریں۔',
      },
      pattern: {
        eyebrow: 'سندھ ٹیکسٹ بک بورڈ (جامشورو) · گزشتہ سال سے نافذ نیا مشترکہ پیپر پیٹرن',
        title: 'تحریری پرچے میں شامل تھیوری + پریکٹیکل پیٹرن (100 نمبر)',
        subtitle:
          'سندھ ٹیکسٹ بک بورڈ کے نئے امتحانی نظام کے تحت گزشتہ سال سے علیحدہ لیب پریکٹیکل کے بجائے پریکٹیکل پر مبنی سوالات تھیوری کے ساتھ تحریری امتحانی پرچے میں ہی آتے ہیں۔',
        ruleBannerTitle: 'نیا مشترکہ پیٹرن: تھیوری اور پریکٹیکل ایک ہی تحریری پرچے میں',
        ruleBannerDesc:
          'فزکس، کیمسٹری اور بائیولوجی کا پرچہ کل 100 نمبروں پر مشتمل ہے جس میں 85 تھیوری + 15 تحریری پریکٹیکل سوالات شامل ہیں (کمپیوٹر سائنس: 75 تھیوری + 25 تحریری پریکٹیکل سوالات)۔',
        ratioA: 'تھیوری الف (معروضی)',
        ratioB: 'تھیوری ب (مختصر)',
        ratioC: 'تھیوری ج (تفصیلی)',
        ratioPractical: 'پرچے میں پریکٹیکل (15–25%)',
        groups: {
          all: 'تمام مضامین',
          science: 'سائنس (فزکس / کیمسٹری / بائیولوجی)',
          cs: 'کمپیوٹر سائنس اور ریاضی',
          commerce: 'کامرس گروپ (I.Com)',
          compulsory: 'لازمی مضامین',
          degree: 'بی ایس زولوجی اور اے ڈی پی',
        },
        totalMarksLabel: 'کل تحریری نمبر',
        theoryMarksLabel: 'پرچے میں تھیوری',
        practicalMarksLabel: 'پرچے میں پریکٹیکل',
        theoryOnlyBadge: 'صرف تھیوری (پریکٹیکل نہیں)',
        inPaperBadge: 'امتحانی پرچے کے اندر شامل',
        theoryHeading: 'تحریری پرچے میں تھیوری کی تقسیم',
        practicalHeading: 'پرچے میں شامل پریکٹیکل حصہ',
        practicalTopicsHeading: 'پرچے میں آنے والے پریکٹیکل سوالات کے موضوعات:',
        passingHeading: 'کامیابی کا اصول:',
        textbookLabel: 'سندھ ٹیکسٹ بک بورڈ حوالہ:',
        marksUnit: 'نمبر',
        noPracticalNote: 'اس مضمون کا مکمل 100 فیصد امتحان تحریری تھیوری سوالات پر مشتمل ہے۔',
      },
    },
    contact: {
      title: 'مقام اور ہم سے رابطہ',
      subtitle:
        'ہم طالبات، والدین اور مہمانوں کو کیمپس میں خوش آمدید کہتے ہیں۔ دفتری اوقات میں ہمارے داخلہ افسران سے رابطہ کریں یا تشریف لائیں۔',
      phoneEyebrow: 'سرکاری فون نمبر',
      phoneTitle: 'کالج لینڈ لائن',
      helplineLabel: 'داخلہ ہیلپ لائن:',
      locationEyebrow: 'کیمپس کا پتہ',
      locationTitle: 'کیمپس تشریف لائیں',
      mapsLink: 'گوگل میپس ↗',
      emailEyebrow: 'سرکاری ای میل',
      emailTitle: 'معلومات بھیجیں',
      emailDesc: 'انتظامی اور دستاویزی تصدیق کے لیے:',
      hoursEyebrow: 'دفتری اوقات',
      formEyebrow: 'براہِ راست رابطہ',
      formTitle: 'آن لائن استفسار جمع کروائیں',
      formDesc: 'اپنا سوال لکھیں اور ہماری انتظامیہ جلد جائزہ لے گی۔',
      nameLabel: 'آپ کا مکمل نام *',
      emailLabel: 'ای میل ایڈریس *',
      phoneLabel: 'فون نمبر (اختیاری)',
      categoryLabel: 'استفسار کا شعبہ *',
      messageLabel: 'آپ کا پیغام *',
      submitBtn: 'پیغام بھیجیں',
      submittingBtn: 'ارسال ہو رہا ہے...',
      mapTitle: 'کیمپس نیویگیشن نقشہ',
      openDirections: 'مکمل راستہ دیکھیں ↗',
      qrEyebrow: 'اسمارٹ فون کیمرے سے اسکین کریں',
      qrTitle: 'فوری گوگل میپس نیویگیشن',
      qrDesc:
        'گورنمنٹ گرلز زبیدہ کالج (مقابل سینٹرل جیل، پٹھان کالونی، ہیرآباد، حیدرآباد) تک براہِ راست راستہ حاصل کرنے کے لیے کیو آر کوڈ اسکین کریں۔',
    },
    footer: {
      newsletterTitle: 'کالج کی خبروں اور تقریبات کے لیے سبسکرائب کریں',
      newsletterDesc:
        'سی کیپ داخلوں، بورڈ نتائج، تعطیلات اور کالج اعلانات کی مصدقہ اطلاعات براہِ راست اپنے ای میل پر حاصل کریں۔',
      subscribeBtn: 'سبسکرائب کریں',
      subscribingBtn: 'سبسکرائب ہو رہا ہے...',
      privacyNote: 'صرف سرکاری کالج بلیٹن۔ کوئی غیر ضروری پیغام نہیں۔',
      gazetteNote: 'ماہانہ گزٹ اور الرٹس',
      navHeading: 'رہنمائی',
      pathwaysHeading: 'تعلیمی شعبے',
      affiliationHeading: 'الحاق اور کیمپس',
      aboutSummary:
        '1953 سے سندھ میں خواتین کی اعلیٰ تعلیم کا معتبر سرکاری ادارہ، جہاں انٹرمیڈیٹ، بی ایس اور ایسوسی ایٹ ڈگری پروگرامز میں 2,000 سے زائد طالبات زیرِ تعلیم ہیں۔',
      adminInbox: 'ایڈمن ان باکس',
      backToTop: 'اوپر جائیں',
      rights: 'گورنمنٹ گرلز زبیدہ کالج، حیدرآباد۔ جملہ حقوق محفوظ ہیں۔',
    },
    sections: SECTION_TRANSLATIONS.ur,
  },
  sd: {
    langLabel: 'سنڌي',
    topBar: {
      collegeLine: 'گورنمينٽ گرلز زبيده ڪاليج · حيدرآباد، سنڌ',
      mottoYear: '“ذات کان مٿي خدمت” · قائم ٿيل 1953',
      officeOpen: 'آفيس کليل آهي',
      officeClosed: 'آفيس بند آهي',
      seccap: 'سيڪيپ (SECCAP)',
      facebook: 'فيسبڪ پيج',
      languageLabel: 'ٻولي',
    },
    nav: {
      overview: 'جائزو',
      about: 'تاريخ ۽ تعارف',
      principal: 'پرنسپال جو پيغام',
      events: 'تقريبون',
      academics: 'تعليمي پروگرام',
      examPrep: 'پراڻا پرچا ۽ تياري',
      departments: 'شعبا',
      campusTour: 'ڪيمپس جو ورچوئل سير',
      collegeLibrary: 'ڪاليج لائبريري',
      collegeLabs: 'ليبارٽريون',
      digitalLibrary: 'ڊجيٽل لائبريري',
      boardResults: 'بورڊ پوزيشنون',
      achievements: 'شاگردياڻين جون ڪاميابيون',
      alumnae: 'ممتاز اڳوڻيون شاگردياڻيون',
      facebookLive: 'فيسبڪ اپڊيٽس',
      admissions: 'داخلا ۽ سيڪيپ',
      calendar: 'تعليمي ڪئلينڊر',
      resources: 'شاگردياڻين جا فارم',
      cemis: 'اسٽاف CEMIS',
      gallery: 'تصويري گئلري',
      contact: 'مقام ۽ رابطو',
      faqs: 'عام سوال',
      enquire: 'پڇا ڳاڇا',
      officePhone: 'ڪاليج آفيس فون',
      callNow: 'هاڻي ڪال ڪريو',
      sendEnquiry: 'داخلا بابت پڇا موڪليو',
      helpline: 'داخلا هيلپ لائين',
      visitSeccap: 'آفيشل سيڪيپ پورٽل ڏسو ↗',
    },
    quickAccess: {
      title: 'تڪڙي رسائي',
      admissions: 'داخلا',
      admissionsHint: 'سيڪيپ ۽ ميرٽ ڊيسڪ',
      examPrep: 'پراڻا پرچا',
      examPrepHint: 'بورڊ پرچا، MCQ ۽ وائيوا',
      downloads: 'ڊائون لوڊز',
      downloadsHint: 'فارم، سلپس ۽ PDF',
      calendar: 'تعليمي ڪئلينڊر',
      calendarHint: '2026–27 اهم تاريخون',
      programs: 'تعليمي شعبا',
      programsHint: 'انٽر، BS ۽ ADP',
      campusMap: 'ڪيمپس نقشو',
      campusMapHint: 'انٽرايڪٽو ڪيمپس سير',
      contact: 'رابطو ڊيسڪ',
      contactHint: 'پتو ۽ آن لائن پڇا',
    },
    hero: {
      headlineLine1: 'علم جيڪو بااختيار بڻائي.',
      headlineLine2: 'تعليم جيڪا زندگي بدلائي.',
      welcomeBefore: 'ڀليڪار —',
      collegeNameBold: 'گورنمينٽ گرلز زبيده ڪاليج، حيدرآباد',
      welcomeMiddle:
        '— ستن ڏهاڪن کان وڌيڪ عرصي کان علم، فڪري جستجو ۽ شاگردياڻين جي شاندار ڪاميابين جو معتبر گهر، اسان جي رهنما اصول هيٺ:',
      mottoQuote: '“ذات کان مٿي خدمت”',
      ctaAdmissions: 'سيڪيپ داخلا 2026',
      ctaExamPrep: 'پراڻا پرچا ۽ امتحاني تياري',
      ctaHonors: 'بورڊ اعزاز (ٻي ۽ چوٿين پوزيشن)',
      ctaEnquiry: 'آن لائن پڇا ڳاڇا',
      triad1Title: 'تجسس',
      triad1Desc: 'بي خوف سوال پڇو، سچائي ڳوليو.',
      triad2Title: 'اعتماد',
      triad2Desc: 'پنهنجي صلاحيتن تي يقين رکو.',
      triad3Title: 'خدمت',
      triad3Desc: 'هميشه ذات کان مٿي خدمت.',
      crestBadge: 'سرڪاري ڪاليج',
      crestName: 'گورنمينٽ گرلز زبيده ڪاليج',
      crestAddress: 'سينٽرل جيل سامهون، پٺاڻ ڪالوني، هيرآباد، حيدرآباد',
      crestMottoLabel: 'ڪاليج جو نعرو',
      crestEstd: 'قائم ٿيل 1953 · سنڌ، پاڪستان',
      crestAffiliationLabel: 'الحاق:',
      crestAffiliationValue: 'تعليمي بورڊ حيدرآباد ۽ سنڌ يونيورسٽي',
      crestModeLabel: 'داخلا جو طريقو:',
      crestModeValue: 'مرڪزي سيڪيپ (SECCAP)',
      crestPhoneLabel: 'سرڪاري فون:',
      stat1Label: 'قيام',
      stat1Desc: 'حيدرآباد جي نياڻين جي خدمت جا 70 سال کان وڌيڪ.',
      stat2Label: 'ڪل شاگردياڻيون',
      stat2Desc: 'انٽرميڊيٽ ۽ ڊگري پروگرامن ۾ داخلا ورتل شاگردياڻيون.',
      stat3Label: 'بورڊ اعزاز',
      stat3Value: 'ٻي ۽ چوٿين',
      stat3Desc: 'ڪمپيوٽر سائنس گروپ ۾ بورڊ جون نمايان پوزيشنون.',
      stat4Label: 'معيار',
      stat4Desc: 'نمايان A1 ۽ A گريڊن سان 100 سيڪڙو ڪاميابي.',
      stat5Label: 'داخلا',
      stat5Desc: 'سنڌ حڪومت جي مرڪزي مفت تعليمي پاليسي.',
    },
    notices: {
      title: 'اهم خبرون ۽ سرڪاري اعلان',
      all: 'سڀ اعلان',
      admissions: 'داخلا',
      examinations: 'امتحان',
      campus: 'ڪيمپس',
      readDetails: 'تفصيل پڙهو',
      closeNotice: 'بند ڪريو',
      noticeSuffix: 'اعلان',
      dateLabel: 'تاريخ:',
    },
    admissions: {
      title: 'سيڪيپ (SECCAP) مرڪزي داخلا',
      subtitle:
        'گورنمينٽ گرلز زبيده ڪاليج حيدرآباد ۾ انٽرميڊيٽ فرسٽ ايئر (يارهين ڪلاس) ۽ ڊگري پروگرامن ۾ داخلا لاءِ مڪمل رهنمائي.',
      bannerEyebrow: 'مفت تعليم جو پروگرام',
      bannerTitle: 'اهل شاگردياڻين لاءِ 100 سيڪڙو مفت انٽرميڊيٽ داخلا',
      bannerDesc:
        'سنڌ حڪومت جي پاليسي تحت سيڪيپ ذريعي ميٽرڪ نتيجن جي بنياد تي يارهين ڪلاس ۾ داخلا بغير ٽيوشن فيس جي مفت ڏني وڃي ٿي.',
      applyBtn: 'سيڪيپ تي آن لائن اپلاءِ ڪريو',
      howToTitle: 'سيڪيپ ذريعي درخواست ڏيڻ جو طريقو',
      steps: [
        {
          num: '01',
          title: 'آن لائن سيڪيپ درخواست',
          desc: 'سرڪاري پورٽل seccap.dgcs.gos.pk تي وڃو ۽ فرسٽ ايئر (يارهين ڪلاس) داخلا لاءِ نئين درخواست چونڊيو.',
        },
        {
          num: '02',
          title: 'رول نمبر ۽ ب فارم داخل ڪريو',
          desc: 'پنهنجو ميٽرڪ رول نمبر، پاسنگ سال ۽ اميدوار جو نادرا ب فارم يا شناختي ڪارڊ نمبر لکو.',
        },
        {
          num: '03',
          title: 'ڪاليج ۽ پسنديده گروپ چونڊيو',
          desc: 'ترجيحي فهرست ۾ گورنمينٽ گرلز زبيده ڪاليج حيدرآباد ۽ پنهنجو گروپ (پري ميڊيڪل، پري انجنيئرنگ، ڪمپيوٽر سائنس، ڪامرس، آرٽس) چونڊيو.',
        },
        {
          num: '04',
          title: 'ميرٽ جي تصديق ۽ مفت داخلا',
          desc: 'آن لائن پليسمينٽ لسٽ چيڪ ڪريو ۽ اصل دستاويزن سان ڪاليج ايڊميشن ڊيسڪ تي تصديق ڪرايو.',
        },
      ],
      servicesTitle: 'سيڪيپ پورٽل جون سرڪاري سهولتون',
      servicesDesc: 'سنڌ اليڪٽرانڪ سينٽرلائزڊ ڪاليج ايڊميشن پروگرام نئين شاگردياڻين کي هيٺيون آن لائن سهولتون فراهم ڪري ٿو:',
      serviceLinks: ['آن لائن درخواست ↗', 'نتيجو چيڪ ڪريو ↗', 'ڊجيٽل آءِ ڊي ڪارڊ ↗', 'شڪايت باڪس ↗'],
      checklistTitle: 'آخري تصديق لاءِ ضروري دستاويز',
      checklistDesc: 'سيڪيپ پليسمينٽ ملڻ کان پوءِ هيٺيان اصل دستاويز ۽ فوٽو ڪاپيون ڪاليج آفيس ۾ گڏ آڻيو:',
      documents: [
        'نهم / ڏهم (ميٽرڪ) مارڪس سرٽيفڪيٽ (اصل ۽ فوٽو ڪاپيون)',
        'شاگردياڻي جو نادرا ب فارم يا شناختي ڪارڊ جي ڪاپي',
        'والد / سرپرست جي شناختي ڪارڊ جي فوٽو ڪاپي',
        'تازيون پاسپورٽ سائيز تصويرون (سفيد يا نيري پس منظر سان)',
        'اسڪول ليونگ سرٽيفڪيٽ (SLC) / ڪريڪٽر سرٽيفڪيٽ',
        'سيڪيپ آن لائن پليسمينٽ فارم جو پرنٽ آئوٽ',
      ],
      officeTimingLabel: 'ايڊميشن آفيس جا وقت:',
      officeTimingValue: 'سومر کان ڇنڇر، صبح 8:00 کان منجهند 1:30 تائين (پاڪستان وقت).',
      degreeEyebrow: 'BS زولوجي ۽ ADP داخلا',
      degreeTitle: 'انڊرگريجوئيٽ ڊگري ۽ ايسوسيئيٽ ڊگري داخلا',
      degreeDesc:
        'چئن سالن واري BS زولوجي ۽ ٻن سالن واري ايسوسيئيٽ ڊگري پروگرامن (AD ڪامرس، AD سائنس، AD آرٽس) جون داخلائون سنڌ يونيورسٽي ڄامشورو جي الحاق سان جاري ڪئلينڊر موجب ٿين ٿيون.',
      degreeLink: 'ڊگري ايڊميشن سيل سان رابطو ڪريو ↗',
    },
    calendar: {
      eyebrow: 'تعليمي سيشن 2026–2027 · ڪاليج ايجوڪيشن کاتو، سنڌ',
      title: 'تعليمي ڪئلينڊر',
      subtitle:
        'سيڪيپ داخلائن، ڇه ماهي امتحانن، حيدرآباد بورڊ جي سالياني امتحانن ۽ سنڌ يونيورسٽي جي سيمسٽر شيڊول جون اهم تاريخون.',
      filters: {
        all: 'مڪمل شيڊول',
        intermediate: 'انٽرميڊيٽ (HSC)',
        degree: 'BS ۽ ADP (سنڌ يونيورسٽي)',
        campus: 'موڪلون ۽ تقريبون',
      },
      trackLabels: {
        intermediate: 'انٽرميڊيٽ HSC',
        degree: 'BS ۽ ADP ڊگري',
        campus: 'ڪيمپس شيڊول',
      },
      footerNote: 'سڀ تاريخون ڪاليج ايجوڪيشن کاتي سنڌ، تعليمي بورڊ حيدرآباد ۽ سنڌ يونيورسٽي جي سرڪاري پڌرنامن موجب آهن.',
      footerLink: 'تازا سرڪاري اعلان ڏسو ←',
    },
    resources: {
      title: 'شاگردياڻين جا وسيلا ۽ ڊائون لوڊ فارم',
      subtitle:
        'گورنمينٽ گرلز زبيده ڪاليج حيدرآباد جي شاگردياڻين لاءِ سرڪاري داخلا فارم، بورڊ ۽ يونيورسٽي انرولمينٽ سلپس ۽ رجسٽريشن گائيڊز.',
      allDocs: 'سڀ دستاويز',
      categories: {
        admissionForms: 'داخلا فارم',
        enrollmentSlips: 'انرولمينٽ سلپس',
        guides: 'سيمسٽر رجسٽريشن گائيڊز',
      },
      searchPlaceholder: 'فارم، سلپس يا گائيڊ ڳوليو...',
      downloadPdf: 'PDF ڊائون لوڊ',
      previewPdf: 'PDF ڏسو',
      emptyTitle: 'ڪو به لاڳاپيل فارم يا گائيڊ نه مليو',
      emptyDesc: 'ڳولا صاف ڪريو يا مٿان "سڀ دستاويز" چونڊيو.',
      showAll: 'سڀ وسيلا ڏيکاريو',
      closePreview: 'پريويو بند ڪريو',
    },
    examPrep: {
      eyebrow: 'تعليمي بورڊ حيدرآباد ۽ سنڌ يونيورسٽي جو امتحاني آرڪائيو',
      title: 'متحرڪ پراڻا پرچا ۽ امتحاني تياري مرڪز',
      subtitle:
        'سائنس، ڪمپيوٽر سائنس، ڪامرس ۽ آرٽس جي شاگردياڻين لاءِ بورڊ (يارهين ۽ ٻارهين) ۽ سنڌ يونيورسٽي (BS ۽ ADP) جا پراڻا پرچا، گڏيل پريڪٽيڪل سوال، معروضي مشق ۽ لکت وارا پريڪٽيڪل حل.',
      tabs: {
        papers: 'پراڻا ۽ ماڊل پرچا',
        pattern: 'پيپر پيٽرن (ٿيوري + پريڪٽيڪل)',
        quiz: 'معروضي مشق کوئز',
        viva: 'پرچي اندر پريڪٽيڪل گائيڊ',
        counselor: 'AI ڪيريئر ڪائونسلر',
      },
      streams: {
        all: 'سڀ گروپ',
        science: 'پري ميڊيڪل ۽ سائنس',
        cs: 'پري انجنيئرنگ ۽ ڪمپيوٽر سائنس',
        commerce: 'ڪامرس گروپ (I.Com)',
        degree: 'BS ۽ ADP',
      },
      levels: {
        all: 'سڀ درجا',
        xi: 'يارهون ڪلاس',
        xii: 'ٻارهون ڪلاس',
        degree: 'BS ۽ ADP',
      },
      searchPlaceholder: 'مضمون، پيپر ڪوڊ يا موضوع ڳوليو...',
      papersCountLabel: 'پرچا موجود آهن',
      viewPaper: 'پرچو ۽ گائيڊ ڏسو',
      downloadPaper: 'PDF ڊائون لوڊ',
      marksLabel: 'ڪل مارڪون',
      durationLabel: 'وقت',
      yearLabel: 'سيشن',
      sectionA: 'حصو الف · گهڻ چونڊ سوال (معروضي)',
      sectionB: 'حصو ب · مختصر جوابي سوال',
      sectionC: 'حصو ج · تفصيلي ۽ حسابي سوال',
      sectionD: 'حصو د · لکت وارا پريڪٽيڪل سوال (پرچي اندر شامل)',
      examinerTips: 'امتحاني مارڪنگ اسڪيم ۽ تياري جا نڪتا',
      closeModal: 'پرچو بند ڪريو',
      emptyPapers: 'توهان جي چونڊيل فلٽر مطابق ڪو به پرچو نه مليو.',
      resetFilters: 'سڀ فلٽر بحال ڪريو',
      quizTitle: 'خود جاچ معروضي (MCQ) پريڪٽس ٽرينر',
      quizSubtitle: 'پنهنجو مضمون چونڊيو ۽ فوري وضاحت سان پنهنجي امتحاني تياري چيڪ ڪريو.',
      quizAllSubjects: 'سڀ مضمون',
      quizScore: 'اسڪور',
      quizAccuracy: 'درستگي',
      quizQuestion: 'سوال',
      quizNext: 'اڳيون سوال',
      quizReset: 'ٻيهر شروع ڪريو',
      quizCorrect: 'درست جواب',
      quizIncorrect: 'مفهوم ٻيهر ڏسو',
      quizCompletedTitle: 'مشق مڪمل ٿي وئي',
      quizCompletedDesc: 'مٿي پنهنجو نتيجو ڏسو يا ڪنهن ٻئي مضمون جي مشق شروع ڪريو.',
      vivaTitle: 'امتحاني پرچي اندر لکت وارن پريڪٽيڪل سوالن جي گائيڊ',
      vivaSubtitle:
        'سنڌ ٽيڪسٽ بڪ بورڊ جي نئين نظام تحت پريڪٽيڪل سوال هاڻي سڌي طرح لکت واري امتحاني پرچي ۾ اچن ٿا — آبزرويشن ٽيبل، خاڪا، ٽائيٽريشن ۽ C++/SQL جي مشق ڪريو.',
      vivaAllLabs: 'سڀ مضمون',
      vivaReveal: 'مثالي لکت جواب ڏسو',
      vivaHide: 'جواب لڪايو',
      vivaTipLabel: 'پرچي لاءِ مشورو:',
      counselor: {
        title: 'AI تعليمي ۽ ڪيريئر ڪائونسلر',
        subtitle:
          'پنهنجو انٽرميڊيٽ يا ڊگري گروپ ۽ مضمون چونڊيو ته جيئن يونيورسٽي ڊگرين، انٽري ٽيسٽن ۽ ڪيريئر موقعن بابت رهنمائي حاصل ڪري سگهو.',
        resetBtn: 'نئين گفتگو',
        streamLabel: 'تعليمي گروپ:',
        subjectsLabel: 'توهان جا موجوده مضمون:',
        welcomeHeading: 'ڊگري پروگرامن، ميرٽ ۽ ڪيريئر بابت سوال پڇو',
        welcomeBody:
          'مٿان پنهنجو ڪامرس، سائنس يا ڪمپيوٽر سائنس گروپ چونڊيو يا هيٺ ڏنل سوالن مان ڪنهن تي ڪلڪ ڪريو.',
        starterTitle: 'شاگردياڻين لاءِ تڪڙا ڪيريئر سوال',
        thinking: 'ڊگري رستن ۽ يونيورسٽي موقعن جو جائزو ورتو پيو وڃي...',
        inputPlaceholder: 'BBA، CA، MBBS، BS CS يا سنڌ يونيورسٽي داخلائن بابت پڇو...',
        sendBtn: 'صلاح وٺو',
        errorFallback: 'هن وقت ڪيريئر ڪائونسلر سان رابطو نٿو ٿي سگهي. مهرباني ڪري ٻيهر ڪوشش ڪريو.',
      },
      pattern: {
        eyebrow: 'سنڌ ٽيڪسٽ بڪ بورڊ (ڄامشورو) · گذريل سال کان نئون گڏيل پيپر پيٽرن',
        title: 'ٿيوري + پريڪٽيڪل هڪ ئي امتحاني پرچي ۾ شامل (100 مارڪون)',
        subtitle:
          'سنڌ ٽيڪسٽ بڪ بورڊ جي گذريل سال کان لاڳو نئين امتحاني نظام تحت الڳ پريڪٽيڪل امتحان ختم ڪري پريڪٽيڪل سوال سڌي طرح لکت واري پرچي ۾ ٿيوري سان گڏ شامل ڪيا ويا آهن.',
        ruleBannerTitle: 'نئون STBB گڏيل پرچو: امتحاني هال ۾ ٿيوري ۽ پريڪٽيڪل هڪ گڏ',
        ruleBannerDesc:
          'فزڪس، ڪيميسٽري ۽ بائيولاجي جي 100 مارڪن واري هڪ ئي پرچي ۾ 85 ٿيوري + 15 لکت وارا پريڪٽيڪل سوال شامل آهن (ڪمپيوٽر سائنس: 75 ٿيوري + 25 لکت وارا پريڪٽيڪل سوال). غير پريڪٽيڪل مضمونن ۾ 20% معروضي · 40% مختصر · 40% تفصيلي پيٽرن لاڳو آهي.',
        ratioA: 'ٿيوري حصو الف (معروضي)',
        ratioB: 'ٿيوري حصو ب (مختصر)',
        ratioC: 'ٿيوري حصو ج (تفصيلي)',
        ratioPractical: 'پرچي ۾ پريڪٽيڪل (15–25%)',
        groups: {
          all: 'سڀ مضمون',
          science: 'سائنس (فزڪس / ڪيميسٽري / بائيولاجي)',
          cs: 'ڪمپيوٽر سائنس ۽ رياضي',
          commerce: 'ڪامرس گروپ (I.Com)',
          compulsory: 'لازمي مضمون',
          degree: 'BS زولوجي ۽ ADP',
        },
        totalMarksLabel: 'ڪل لکت مارڪون',
        theoryMarksLabel: 'پرچي ۾ ٿيوري',
        practicalMarksLabel: 'پرچي ۾ پريڪٽيڪل',
        theoryOnlyBadge: 'صرف ٿيوري (پريڪٽيڪل ناهي)',
        inPaperBadge: 'امتحاني پرچي اندر حل ٿيندڙ',
        theoryHeading: 'لکت واري پرچي ۾ ٿيوري حصي جي ورڇ',
        practicalHeading: 'امتحاني پرچي ۾ شامل پريڪٽيڪل حصي جي ورڇ',
        practicalTopicsHeading: 'لکت واري پريڪٽيڪل سوالن جا اهم موضوع (امتحاني پرچي اندر):',
        passingHeading: 'پاس ٿيڻ جو اصول:',
        textbookLabel: 'سنڌ ٽيڪسٽ بڪ بورڊ حوالو:',
        marksUnit: 'مارڪون',
        noPracticalNote: 'هن مضمون جو امتحان مڪمل طور تي لکت واري پرچي تي مشتمل آهي؛ پريڪٽيڪل شامل ناهي.',
      },
    },
    contact: {
      title: 'مقام ۽ اسان سان رابطو',
      subtitle:
        'اسان شاگردياڻين، والدين ۽ مهمانن کي ڪيمپس ۾ ڀليڪار چئون ٿا. آفيس وقتن ۾ اسان جي داخلا آفيسرن سان رابطو ڪريو يا تشريف آڻيو.',
      phoneEyebrow: 'سرڪاري فون نمبر',
      phoneTitle: 'ڪاليج لينڊ لائين',
      helplineLabel: 'داخلا هيلپ لائين:',
      locationEyebrow: 'ڪيمپس جو پتو',
      locationTitle: 'ڪيمپس جو دورو ڪريو',
      mapsLink: 'گوگل ميپس ↗',
      emailEyebrow: 'سرڪاري اي ميل',
      emailTitle: 'معلومات موڪليو',
      emailDesc: 'انتظامي ۽ دستاويزي تصديق لاءِ:',
      hoursEyebrow: 'آفيس جا وقت',
      formEyebrow: 'سڌو رابطو',
      formTitle: 'آن لائن پڇا ڳاڇا موڪليو',
      formDesc: 'پنهنجو سوال لکو ۽ اسان جي انتظاميه جلد جائزو وٺندي.',
      nameLabel: 'توهان جو مڪمل نالو *',
      emailLabel: 'اي ميل ايڊريس *',
      phoneLabel: 'فون نمبر (اختياري)',
      categoryLabel: 'پڇا ڳاڇا جو شعبو *',
      messageLabel: 'توهان جو پيغام *',
      submitBtn: 'پيغام موڪليو',
      submittingBtn: 'موڪليو پيو وڃي...',
      mapTitle: 'ڪيمپس نيويگيشن نقشو',
      openDirections: 'مڪمل رستو ڏسو ↗',
      qrEyebrow: 'اسمارٽ فون ڪئمرا سان اسڪين ڪريو',
      qrTitle: 'تڪڙي گوگل ميپس نيويگيشن',
      qrDesc:
        'گورنمينٽ گرلز زبيده ڪاليج (سينٽرل جيل سامهون، پٺاڻ ڪالوني، هيرآباد، حيدرآباد) تائين سڌو رستو حاصل ڪرڻ لاءِ QR ڪوڊ اسڪين ڪريو.',
    },
    footer: {
      newsletterTitle: 'ڪاليج جي خبرن ۽ تقريبن لاءِ سبسڪرائب ڪريو',
      newsletterDesc:
        'سيڪيپ داخلائن، بورڊ نتيجن، موڪلن ۽ ڪاليج اعلانن جي تصديق ٿيل اطلاع سڌو پنهنجي اي ميل تي حاصل ڪريو.',
      subscribeBtn: 'سبسڪرائب ڪريو',
      subscribingBtn: 'سبسڪرائب ٿي رهيو آهي...',
      privacyNote: 'صرف سرڪاري ڪاليج بليٽن. ڪو به غير ضروري پيغام نه.',
      gazetteNote: 'مهانوار گزٽ ۽ الرٽس',
      navHeading: 'رهنمائي',
      pathwaysHeading: 'تعليمي شعبا',
      affiliationHeading: 'الحاق ۽ ڪيمپس',
      aboutSummary:
        '1953 کان سنڌ ۾ عورتن جي اعليٰ تعليم جو معتبر سرڪاري ادارو، جتي انٽرميڊيٽ، BS ۽ ايسوسيئيٽ ڊگري پروگرامن ۾ 2,000 کان وڌيڪ شاگردياڻيون تعليم حاصل ڪري رهيون آهن.',
      adminInbox: 'ايڊمن انباڪس',
      backToTop: 'مٿي وڃو',
      rights: 'گورنمينٽ گرلز زبيده ڪاليج، حيدرآباد. سڀ حق محفوظ آهن.',
    },
    sections: SECTION_TRANSLATIONS.sd,
  },
};

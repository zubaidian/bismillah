import type { PortalLanguage } from './translations';

export interface SectionTranslations {
  boardHonors: {
    title: string;
    subtitle: string;
    viewBanner: string;
    felicitationLabel: string;
    felicitationDesc: string;
    positionHeader: string;
    rollNoLabel: string;
    positionHolderLabel: string;
    studentName: string;
    daughterOfPrefix: string;
    fatherName: string;
    institutionLabel: string;
    institutionValue: string;
    examLine: string;
    marksObtained: string;
    outOfLabel: string;
    gazettedBadge: string;
    viewGazetteBtn: string;
    standingsLabel: string;
    standingsValue: string;
    standingsDesc: string;
    gradesLabel: string;
    gradesValue: string;
    gradesDesc: string;
    passLabel: string;
    passValue: string;
    passDesc: string;
    boardName: string;
    boardDesc: string;
    inspectGazette: string;
    closeView: string;
  };
  achievements: {
    title: string;
    subtitle: string;
    allTab: string;
    boardAcademic: string;
    coCurricular: string;
    scienceComputing: string;
    sportsLeadership: string;
    distinctionLabel: string;
    verifiedFooter: string;
    viewBanner: string;
    inspectGazette: string;
  };
  events: {
    title: string;
    subtitle: string;
    slow: string;
    normal: string;
    fast: string;
    filterLabel: string;
    allTab: string;
    academicTab: string;
    culturalTab: string;
    sportsTab: string;
    admissionsTab: string;
    ceremonyTab: string;
    hoverHint: string;
    eventBadge: string;
    liveNow: string;
    viewDetails: string;
    fbPost: string;
    syncedLabel: string;
    refreshStream: string;
    visitFbPage: string;
    dateLabel: string;
    timeLabel: string;
    venueLabel: string;
    summaryHeading: string;
    openFbBtn: string;
    closeBtn: string;
  };
  about: {
    headingBefore: string;
    headingHighlight: string;
    leadQuote: string;
    p1: string;
    p2: string;
    p3: string;
    pillars: string[];
    gatewayTitle: string;
    gatewayAddr: string;
    quoteCard: string;
    quoteLabel: string;
    collegeLabel: string;
    timelineTitle: string;
    timelineSubtitle: string;
    timeline: { year: string; title: string; desc: string }[];
  };
  principal: {
    deskLabel: string;
    name: string;
    college: string;
    tagline: string;
    subTagline: string;
    bismillahSub: string;
    headingBefore: string;
    headingHighlight: string;
    welcomeLine: string;
    p1: string;
    p2: string;
    p3: string;
    closingPrayer: string;
    signName: string;
    signRole: string;
    signDept: string;
  };
  academics: {
    title: string;
    subtitle: string;
    allTab: string;
    interTab: string;
    degreeTab: string;
    assocTab: string;
    boardHonorTag: string;
    durationLabel: string;
    coreDisciplines: string;
    moreLabel: string;
    viewDetails: string;
    applyBtn: string;
    infra: { eyebrow: string; title: string; desc: string }[];
    modal: {
      overview: string;
      curriculum: string;
      eligibility: string;
      prospects: string;
      proceedBtn: string;
      closeBtn: string;
    };
  };
  departments: {
    title: string;
    subtitle: string;
    statDepts: string;
    statLabs: string;
    statFaculty: string;
    statDegrees: string;
    searchPlaceholder: string;
    clearBtn: string;
    showingLabel: string;
    ofLabel: string;
    deptsLabel: string;
    allTab: string;
    faculties: Record<string, string>;
    streamsServed: string;
    keySubjects: string;
    moreLabel: string;
    detailsBtn: string;
    detailsWithPhotos: string;
    inquireBtn: string;
    emptyTitle: string;
    emptyDesc: string;
    resetBtn: string;
    bannerEyebrow: string;
    bannerTitle: string;
    bannerDesc: string;
    contactBtn: string;
    seccapGuide: string;
    modal: {
      overview: string;
      labsHeading: string;
      locationPrefix: string;
      coursesHeading: string;
      streamsHeading: string;
      honorsHeading: string;
      submitInquiry: string;
      close: string;
    };
  };
  campusTour: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    walkBtn: string;
    pointLabel: string;
    ofLabel: string;
    mapTab: string;
    facilityTab: string;
    prevStop: string;
    nextStop: string;
    autoPlay: string;
    pauseTour: string;
    gateDirectionsTitle: string;
    highlightsTitle: string;
    specsTitle: string;
  };
  library: {
    title: string;
    subtitle: string;
    location: string;
    timings: string;
    stats: { label: string; value: string }[];
    galleryTitle: string;
    gallerySubtitle: string;
    enlargeBtn: string;
    rulesTitle: string;
    rulesDesc: string;
    wings: {
      id: string;
      subtitle: string;
      title: string;
      description: string;
      highlights: string[];
    }[];
    guidelines: string[];
  };
  labs: {
    title: string;
    subtitle: string;
    allLabsTab: string;
    labPhotosLabel: string;
    viewBtn: string;
  };
  digitalLibrary: {
    title: string;
    subtitle: string;
    allTab: string;
    interTab: string;
    degreeTab: string;
  };
  alumnae: {
    title: string;
    subtitle: string;
    allTab: string;
    categoryLabels: {
      publicService: string;
      lawEnforcement: string;
      academia: string;
      poetry: string;
    };
    attendanceLabel: string;
    bioBtn: string;
    profileLink: string;
    closeProfile: string;
    biographyHeading: string;
    highlightsHeading: string;
    legacyHeading: string;
    metrics: { value: string; label: string; sub: string }[];
  };
  cemis: {
    eyebrow: string;
    title: string;
    subtitleBefore: string;
    subtitleBold: string;
    subtitleAfter: string;
    cardEyebrow: string;
    cardTitle: string;
    cardSub: string;
    featuresHeading: string;
    features: string[];
    playBtn: string;
    portalBtn: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    allTab: string;
    honorsTab: string;
    campusTab: string;
    facultyTab: string;
    photosSingular: string;
    photosPlural: string;
    slow: string;
    normal: string;
    fast: string;
    viewFull: string;
    hoverHint: string;
    pausedLabel: string;
    pausedHoverLabel: string;
    autoScrollLabel: string;
    modalEyebrow: string;
    closeView: string;
    categoryLabels: {
      campus: string;
      honors: string;
      academics: string;
      faculty: string;
    };
  };
  community: {
    headingBefore: string;
    headingHighlight: string;
    subtitle: string;
    channelTitle: string;
    channelSub: string;
    channelDesc: string;
    openFbBtn: string;
    viewEventsBtn: string;
    feat1: string;
    feat2: string;
    feedTitle: string;
    tabs: {
      timeline: string;
      recent: string;
      live: string;
    };
    connectedLabel: string;
    reloadBtn: string;
    cookieHint: string;
    openDirectBtn: string;
    commentsLabel: string;
    viewOnFb: string;
    liveNoticeTitle: string;
    liveNoticeDesc: string;
  };
}

export const SECTION_TRANSLATIONS: Record<PortalLanguage, SectionTranslations> = {
  en: {
    boardHonors: {
      title: 'Outstanding Board Results',
      subtitle:
        'Celebrating the extraordinary success of our students in the Higher Secondary Certificate (HSC Part-II) Annual Examination, securing provincial top honors for Government Girls Zubaida College.',
      viewBanner: 'View Full Banner',
      felicitationLabel: 'Official Felicitation:',
      felicitationDesc:
        'Heartiest congratulations from Principal Prof. Yasmeen Panhwar and faculty members to all successful students and the Computer Science Department.',
      positionHeader: '2nd Position in BISE Hyderabad Board',
      rollNoLabel: 'Roll No: 79256',
      positionHolderLabel: 'Position Holder',
      studentName: 'Maryam Bibi',
      daughterOfPrefix: 'Daughter of',
      fatherName: 'Muhammad Aslam',
      institutionLabel: 'Institution:',
      institutionValue: '1080. Govt Girls College Hyderabad (Zubaida)',
      examLine: 'HSC Part-II (Class XII) Computer Science Annual Examination',
      marksObtained: 'Marks Obtained',
      outOfLabel: 'Out of 1100',
      gazettedBadge: 'Official Board Position Gazetted',
      viewGazetteBtn: 'View Official Board Gazette Photo ↗',
      standingsLabel: 'Board Standings',
      standingsValue: '2nd & 4th',
      standingsDesc: 'Top positions across all colleges in BISE Hyderabad.',
      gradesLabel: 'Grade Distribution',
      gradesValue: 'Majority A1 & A',
      gradesDesc: 'Only 1 B-grade & 1 C-grade across the cohort.',
      passLabel: 'Pass Record',
      passValue: 'No Failures',
      passDesc: '100% success rate under dedicated faculty mentorship.',
      boardName: 'Board of Intermediate & Secondary Education Hyderabad',
      boardDesc:
        'Official gazette notification confirming top three position holders in the Computer Science Group Annual Examination.',
      inspectGazette: 'Click to inspect the verified gazette document',
      closeView: 'Close View',
    },
    achievements: {
      title: 'Student Achievements & Roll of Honor',
      subtitle:
        'Celebrating the academic distinctions, board positions, and district-level competitions won by students of Government Girls Zubaida College, Hyderabad.',
      allTab: 'All Achievements',
      boardAcademic: 'Board & Academic',
      coCurricular: 'Co-Curricular & Religious',
      scienceComputing: 'Science & Computing',
      sportsLeadership: 'Sports & Leadership',
      distinctionLabel: 'Distinction',
      verifiedFooter: 'Verified Student Honor · Govt Girls Zubaida College Hyderabad',
      viewBanner: 'View Official Result Banner',
      inspectGazette: 'Inspect Official Board Gazette',
    },
    events: {
      title: 'Live 2026 Campus Events & Assemblies',
      subtitle:
        'Continuous live scrolling window syncing curricular, examination, and cultural happenings from our official Facebook page.',
      slow: 'Slow',
      normal: 'Normal',
      fast: 'Fast',
      filterLabel: 'Filter 2026:',
      allTab: 'All 2026 Events',
      academicTab: 'Academic & Board',
      culturalTab: 'Cultural & Heritage',
      sportsTab: 'Sports & Athletics',
      admissionsTab: 'Admissions',
      ceremonyTab: 'Honors & Galas',
      hoverHint: 'Hover over any card to pause the scrolling window',
      eventBadge: '2026 Event',
      liveNow: 'Live Now',
      viewDetails: 'View Details',
      fbPost: 'Facebook Post',
      syncedLabel: 'Live Synced with Facebook',
      refreshStream: 'Refresh 2026 Facebook Stream',
      visitFbPage: 'Visit Govt Girls Zubaida College Facebook Page ↗',
      dateLabel: 'Date:',
      timeLabel: 'Time:',
      venueLabel: 'Venue:',
      summaryHeading: 'Event Summary & Significance:',
      openFbBtn: 'Open on Facebook Page ↗',
      closeBtn: 'Close',
    },
    about: {
      headingBefore: 'A Future Shaped By',
      headingHighlight: 'Possibility.',
      leadQuote:
        '“Education is more than a qualification. It is the confidence to ask questions, the courage to imagine, and the ability to make a lasting difference in the world.”',
      p1: 'Government Girls Zubaida College Hyderabad is one of the oldest, most prestigious, and revered educational landmarks in Sindh. Established in 1953, the college answered an urgent historical calling: providing higher secondary and collegiate education for young women in Hyderabad at a time when such opportunities were severely limited.',
      p2: 'Guided continuously by our sacred motto “SERVICE ABOVE SELF”, Zubaida College has nurtured three generations of visionary women. Today, our distinguished alumni serve as renowned doctors, professors, scientists, judges, educators, and leaders across Pakistan and around the globe.',
      p3: 'It is far more than an educational building — it is the living embodiment of the bright futures and aspirations of the daughters of Hyderabad.',
      pillars: [
        'Established 1953',
        '2,000 Enrolled Students',
        'Motto: Service Above Self',
        'Sindh Education Dept. Affiliation',
      ],
      gatewayTitle: 'Main Campus Gateway',
      gatewayAddr: 'Opposite Central Jail, Pathan Colony, Hirabad',
      quoteCard:
        '“Every student deserves the dignity and opportunity to discover just how far her intellect and potential can take her.”',
      quoteLabel: 'The Spirit of Learning',
      collegeLabel: 'Govt Girls Zubaida College',
      timelineTitle: 'Seven Decades of Empowering Sindh’s Daughters',
      timelineSubtitle:
        'A journey of perseverance, educational equity, and academic distinction from 1953 to the present.',
      timeline: [
        {
          year: '1953',
          title: 'Foundation of Zubaida College',
          desc: 'Established as a pioneering public institution dedicated exclusively to higher education for girls in Hyderabad, Sindh.',
        },
        {
          year: '1970s–1990s',
          title: 'Expansion of Science & Humanities',
          desc: 'Added fully equipped scientific laboratories, a growing library wing, and introduced F.Sc and B.Sc honors tracks.',
        },
        {
          year: '2000s–2020s',
          title: 'Digital Evolution & SECCAP Era',
          desc: 'Integrated Sindh Government centralized digital admissions (SECCAP), modern IT Computer Science labs, and University degree programs.',
        },
        {
          year: 'Present Day',
          title: '2,000+ Scholars & Top Board Honors',
          desc: 'Continuing our tradition of excellence under Prof. Yasmeen Panhwar, celebrating 2nd and 4th positions across BISE Hyderabad.',
        },
      ],
    },
    principal: {
      deskLabel: 'Principal’s Desk',
      name: 'Prof. Yasmeen Panhwar',
      college: 'Govt Girls Zubaida College Hyderabad',
      tagline: 'Leadership · Learning · Service',
      subTagline: 'Fostering academic distinction and moral uprightness',
      bismillahSub: 'In the Name of Allah, the Most Beneficent, the Most Merciful',
      headingBefore: 'Message from the',
      headingHighlight: 'Principal',
      welcomeLine: 'Welcome to Government Girls Zubaida College, Hyderabad.',
      p1: 'Since its establishment in 1953, this prestigious institution has been illuminating the daughters of Hyderabad with the sacred light of knowledge, faithfully upholding the golden principle of “SERVICE ABOVE SELF”.',
      p2: 'Our mission transcends merely conferring intermediate certificates and degree credentials. We are committed to nurturing daughters who are intellectually accomplished, virtuous, self-reliant, and confident citizens who will bring enduring honor to our province and nation.',
      p3: 'Here, alongside modern scientific inquiry, digital literacy, and academic rigor, we place paramount emphasis on character building, Islamic values, and moral rectitude. My faculty colleagues, administrative staff, and I strive tirelessly to provide every student with a safe, dignified, inspiring, and positive learning sanctuary.',
      closingPrayer:
        'May Allah the Almighty grant every student and daughter continuous success in both academic pursuits and life.',
      signName: 'Professor Yasmeen Panhwar',
      signRole: 'Principal, Government Girls Zubaida College, Hyderabad',
      signDept: 'College Education Department · Government of Sindh',
    },
    academics: {
      title: 'Explore Our Academic Programs',
      subtitle:
        'Empowering students through rigorous curriculum, modern scientific laboratories, experienced faculty, and recognized university degree affiliations.',
      allTab: 'All Programs',
      interTab: 'Intermediate / Higher Secondary (HSC)',
      degreeTab: '4-Year BS Zoology (Univ. of Sindh)',
      assocTab: '2-Year Associate Degrees (Physics, Chemistry, Botany, Zoology, Commerce, Science)',
      boardHonorTag: 'Board 2nd & 4th',
      durationLabel: 'Duration:',
      coreDisciplines: 'Core Disciplines:',
      moreLabel: 'more',
      viewDetails: 'View Full Curriculum & Career',
      applyBtn: 'Apply',
      infra: [
        {
          eyebrow: 'Modern Laboratories',
          title: 'Science & Computing Labs',
          desc: 'Equipped with modern high-speed workstations, physics apparatus, biology specimens, and chemical analysis tools.',
        },
        {
          eyebrow: 'Academic Library',
          title: 'Extensive Book & Periodical Collection',
          desc: 'Thousands of reference volumes, textbooks, past examination papers, Urdu & Sindhi literature, and digital resources.',
        },
        {
          eyebrow: 'Qualified Faculty',
          title: 'Mentorship & Board Excellence',
          desc: 'Subject specialists and professors selected through the Sindh Public Service Commission guiding girls to top Board ranks.',
        },
      ],
      modal: {
        overview: 'Program Overview:',
        curriculum: 'Subjects & Curriculum Breakdown:',
        eligibility: 'Eligibility Criteria:',
        prospects: 'Future Academic & Career Pathways:',
        proceedBtn: 'Proceed to Admissions Guide',
        closeBtn: 'Close',
      },
    },
    departments: {
      title: 'Academic Departments',
      subtitle:
        'Dedicated faculties delivering specialized instruction across biological sciences, physical sciences, computing, commerce, regional languages, Islamic learning, and humanities since 1953.',
      statDepts: 'Distinct Academic Departments',
      statLabs: 'Specialized Labs & Suites',
      statFaculty: 'SPSC Merit Qualified Faculty',
      statDegrees: 'University Degrees & HSC',
      searchPlaceholder: 'Search departments (e.g., Computer Science, Mathematics, Botany, Zoology, Urdu, Sindhi)...',
      clearBtn: 'Clear',
      showingLabel: 'Showing',
      ofLabel: 'of',
      deptsLabel: 'departments',
      allTab: 'All Departments',
      faculties: {
        'Sciences & Computing': 'Sciences & Computing',
        'Life Sciences': 'Life Sciences',
        'Commerce & Economics': 'Commerce & Economics',
        'Languages & Literature': 'Languages & Literature',
        'Humanities & Social Sciences': 'Humanities & Social Sciences',
        'Health & Physical Education': 'Health & Physical Education',
      },
      streamsServed: 'Academic Streams Served:',
      keySubjects: 'Key Curricular Subjects:',
      moreLabel: 'more',
      detailsBtn: 'Lab & Faculty Details',
      detailsWithPhotos: 'Photos',
      inquireBtn: 'Inquire',
      emptyTitle: 'No matching departments found',
      emptyDesc:
        'Try searching for terms like Mathematics, Statistics, Botany, Zoology, Urdu, Sindhi, Physiology, or Economics.',
      resetBtn: 'Reset Filters',
      bannerEyebrow: 'Sindh Public Service Commission Qualified Faculty',
      bannerTitle: 'Want to speak with a Department Head or Course Counselor?',
      bannerDesc:
        'Faculty members are available during official college hours (8:00 AM – 2:00 PM PKT, Mon–Sat) for academic counseling, syllabus guidance, and stream selection.',
      contactBtn: 'Contact Department',
      seccapGuide: 'SECCAP Guide',
      modal: {
        overview: 'Department Overview:',
        labsHeading: 'Laboratories & Technical Infrastructure:',
        locationPrefix: 'Location / Suite:',
        coursesHeading: 'Curricular Subjects & Practical Modules:',
        streamsHeading: 'Academic Programs & Streams Served:',
        honorsHeading: 'Institutional Distinctions & Records:',
        submitInquiry: 'Submit Department Inquiry',
        close: 'Close',
      },
    },
    campusTour: {
      title: 'Interactive Campus Map & Gate-Entry Tour',
      subtitle:
        'Start right as you enter the Main College Gate on Pathan Colony Road—click any point on the campus map for step-by-step walking directions to each wing, office, and laboratory.',
      searchPlaceholder:
        'Search any spot (e.g. Car Parking, Garden, Historical Graveyard & Mazar, Small Garden, Computer Lab, Economics, Auditorum)...',
      walkBtn: 'Walk Visitor',
      pointLabel: 'Point',
      ofLabel: 'of',
      mapTab: 'Campus Map',
      facilityTab: 'Facility View',
      prevStop: 'Previous Stop',
      nextStop: 'Next Stop',
      autoPlay: 'Auto Tour',
      pauseTour: 'Pause Tour',
      gateDirectionsTitle: 'Walking Directions from Main Gate',
      highlightsTitle: 'Facility Highlights',
      specsTitle: 'Quick Campus Facts',
    },
    library: {
      title: 'Central College Library',
      subtitle:
        'A sanctuary of quiet academic focus serving Intermediate, Associate Degree, and BS Zoology scholars with textbooks, scholarly journals, and a government Book Bank.',
      location: 'Main Academic Quadrangle · Upper Wing, Zubaida College Hyderabad',
      timings: 'Monday – Saturday · 8:00 AM to 1:45 PM (PKT)',
      stats: [
        { label: 'Print & Reference Collection', value: '18,000+ Volumes' },
        { label: 'Reading Hall Seating', value: '120+ Study Seats' },
        { label: 'Free Book Bank Support', value: 'HSC & Degree Sets' },
        { label: 'Daily Periodicals', value: 'English, Urdu & Sindhi' },
      ],
      galleryTitle: 'College Library Photo Gallery',
      gallerySubtitle:
        'Photographs of the Reading Hall, Book Stacks, Government Book Bank, and Science Reference Wing.',
      enlargeBtn: 'Enlarge',
      rulesTitle: 'Library Rules & Book Lending',
      rulesDesc:
        'Every enrolled student of Intermediate, Associate Degree, and BS 4-Year programs is entitled to a College Library Card and Book Bank support.',
      wings: [
        {
          id: 'reading-hall',
          subtitle: 'Quiet Study Wing',
          title: 'Main Reading Hall',
          description:
            'Bright, ventilated study tables providing dedicated desk space for examination revision, essay drafting, and daily newspaper reading.',
          highlights: [
            'Silence-maintained study zone for 120+ scholars',
            'Daily English, Urdu, and Sindhi newspapers',
            'BISE Hyderabad past papers & model exam archive',
          ],
        },
        {
          id: 'science-bs',
          subtitle: 'Degree & F.Sc Section',
          title: 'Science & BS Zoology Wing',
          description:
            'Curated reference titles covering Cell Biology, Animal Physiology, Organic Chemistry, Calculus, and Computer Science.',
          highlights: [
            'HEC-recommended textbooks for BS Zoology & ADS',
            'Pre-Medical & Pre-Engineering entry-test guides',
            'Urdu & Sindhi dictionaries and encyclopedias',
          ],
        },
        {
          id: 'book-bank',
          subtitle: 'Student Welfare Desk',
          title: 'Free Book Bank Facility',
          description:
            'Annual full-session textbook lending for deserving and meritorious students of Class XI, Class XII, and Associate Degrees.',
          highlights: [
            'Full Sindh Textbook Board course sets issued for free',
            'Hassle-free issuance with college admission slip',
            'Dedicated commerce & accounting reference shelf',
          ],
        },
        {
          id: 'sindh-literature',
          subtitle: 'Regional Heritage Shelf',
          title: 'Urdu, Sindhi & Islamic Archive',
          description:
            'Classical literary works, Sindhology monographs, Pakistan Studies archives, and Tafseer & Hadith reference volumes.',
          highlights: [
            'Sindhi Adabi Board & Urdu classical anthologies',
            'Seerat-un-Nabi ﷺ and Islamic History collections',
            'Faculty-guided research & debate preparation corner',
          ],
        },
      ],
      guidelines: [
        'Present a valid College Student ID Card at the circulation counter for borrowing.',
        'Intermediate students may borrow up to 2 reference books for 14 days; BS/ADP scholars up to 4 books.',
        'Maintain complete silence inside the Reading Hall; mobile phones must stay on silent mode.',
        'Full Book Bank textbook sets are issued at the start of the academic session and returned after annual board exams.',
      ],
    },
    labs: {
      title: 'College Laboratories & Practical Wings',
      subtitle:
        'Dedicated practical halls for Physics, Computer Science, Chemistry, Zoology, Botany, and Psychology—supporting BISE Hyderabad Board and University degree experiments.',
      allLabsTab: 'All Laboratories',
      labPhotosLabel: 'Lab Photos',
      viewBtn: 'View',
    },
    digitalLibrary: {
      title: 'Syllabus Book Photos & Internet Links',
      subtitle:
        'Direct official internet links to Sindh Textbook Board eBooks, BISE Hyderabad intermediate curricula, and University of Sindh / HEC degree syllabi.',
      allTab: 'All Syllabus Books',
      interTab: 'Intermediate (XI & XII)',
      degreeTab: 'BS Zoology & Associate Degrees',
    },
    alumnae: {
      title: 'Distinguished Alumnae',
      subtitle:
        'Celebrating iconic graduates of Government Girls Zubaida College Hyderabad whose achievements shaped Pakistani literature, higher education, broadcasting, and parliamentary leadership.',
      allTab: 'All Distinguished Alumnae',
      categoryLabels: {
        publicService: 'Public Service & Media',
        lawEnforcement: 'Law Enforcement & Rights',
        academia: 'Academia & Literature',
        poetry: 'Poetry & Human Rights',
      },
      attendanceLabel: 'College Attendance Documented',
      bioBtn: 'Biography & Achievements',
      profileLink: 'Profile',
      closeProfile: 'Close Profile',
      biographyHeading: 'Biography & Achievements:',
      highlightsHeading: 'Key Highlights & Public Contributions:',
      legacyHeading: 'National Recognition & Legacy:',
      metrics: [
        {
          value: '1953–2026',
          label: 'Over 7 Decades of Excellence',
          sub: 'Shaping generations of educated women across Hyderabad and Sindh',
        },
        {
          value: 'Sitara & Pride',
          label: 'National Civil Awards',
          sub: 'Alumnae decorated with Sitara-i-Imtiaz and Pride of Performance',
        },
        {
          value: 'Parliament & UN',
          label: 'Public Policy & Diplomacy',
          sub: 'Graduates serving in Assemblies, Ministries, and UN leadership roles',
        },
        {
          value: 'Medicine & Tech',
          label: 'STEM & Higher Academia',
          sub: 'Vice Chancellors, professors, and top scientific researchers',
        },
      ],
    },
    cemis: {
      eyebrow: 'College Education Department · Government of Sindh',
      title: 'CEMIS Biometric Attendance & Faculty App',
      subtitleBefore: 'For Government College Lecturers in Sindh, the biometric attendance system is associated with',
      subtitleBold: 'CEMIS (College Education Management Information System)',
      subtitleAfter: '—the official digital platform of the College Education Department, Government of Sindh.',
      cardEyebrow: 'Official College Education Department App',
      cardTitle: 'CEMIS – College Education',
      cardSub: 'Government of Sindh · College Education Department',
      featuresHeading: 'Supported Attendance & HR Capabilities:',
      features: [
        'Biometric-related attendance through GPS and selfie verification',
        'Daily Check-in and Check-out recording',
        'Complete personal Attendance History tracking',
        'Digital Leave and Transfer requests',
      ],
      playBtn: 'Download CEMIS from Google Play',
      portalBtn: 'CED / DGCS Sindh Portal',
    },
    gallery: {
      title: 'Life at Zubaida College',
      subtitle:
        'A visual chronicle of our historic campus, high-achieving scholars, leadership addresses, and academic pride.',
      allTab: 'All Photos',
      honorsTab: 'Board Honors & Results',
      campusTab: 'Campus Grounds & Emblem',
      facultyTab: 'Leadership & Assemblies',
      photosSingular: 'Photo',
      photosPlural: 'Photos',
      slow: 'slow',
      normal: 'normal',
      fast: 'fast',
      viewFull: 'View Full Photo',
      hoverHint: 'Hover over any photo to pause the scrolling showcase, drag the scrollbar, or click a photo to expand.',
      pausedLabel: 'Auto-scroll paused',
      pausedHoverLabel: 'Paused on hover',
      autoScrollLabel: 'Auto-scrolling',
      modalEyebrow: 'Govt Girls Zubaida College Gallery',
      closeView: 'Close View',
      categoryLabels: {
        campus: 'Campus',
        honors: 'Board Honors',
        academics: 'Academics',
        faculty: 'Leadership',
      },
    },
    community: {
      headingBefore: 'Connect With Our',
      headingHighlight: 'Live Facebook Feed',
      subtitle:
        'Stay in touch with daily campus activities, extracurricular galas, exam schedules, Board honors, and emergency public holiday circulars directly from our college Facebook page.',
      channelTitle: 'Govt Girls Zubaida College Hyderabad',
      channelSub: 'Official Page · Active Community',
      channelDesc:
        'Directly managed by the college administration for rapid notices, holiday bulletins, and student queries.',
      openFbBtn: 'Open Official Facebook Page ↗',
      viewEventsBtn: 'View 2026 Live Event Tracker',
      feat1: 'Live Event Streams & Convocations',
      feat2: 'Real-Time Student Notices',
      feedTitle: 'Facebook Live Feed',
      tabs: {
        timeline: 'Live Plugin',
        recent: 'Recent Posts',
        live: 'Live Video',
      },
      connectedLabel: 'Connected to Official Facebook Timeline',
      reloadBtn: 'Reload',
      cookieHint: 'If your browser restricts cross-site cookies, click “Recent Posts” above or open Facebook directly:',
      openDirectBtn: 'Open Govt Girls Zubaida College on Facebook ↗',
      commentsLabel: 'comments',
      viewOnFb: 'View on Facebook ↗',
      liveNoticeTitle: 'Facebook Live Broadcast Hub',
      liveNoticeDesc: 'When the college starts a live ceremony, debate, or assembly, watch live here.',
    },
  },
  ur: {
    boardHonors: {
      title: 'شاندار بورڈ نتائج اور پوزیشن ہولڈرز',
      subtitle:
        'تعلیمی بورڈ حیدرآباد کے سالانہ انٹرمیڈیٹ (HSC پارٹ ٹو) امتحانات میں گورنمنٹ گرلز زبیدہ کالج کی طالبات کی تاریخی اور نمایاں کامیابیوں کا جشن۔',
      viewBanner: 'مکمل بینر دیکھیں',
      felicitationLabel: 'سرکاری تہنیتی پیغام:',
      felicitationDesc:
        'پرنسپل پروفیسر یاسمین پنہور اور تمام اساتذہ کرام کی جانب سے کمپیوٹر سائنس ڈیپارٹمنٹ اور تمام کامیاب طالبات کو دلی مبارکباد۔',
      positionHeader: 'تعلیمی بورڈ حیدرآباد میں دوسری پوزیشن',
      rollNoLabel: 'رول نمبر: 79256',
      positionHolderLabel: 'پوزیشن ہولڈر',
      studentName: 'مریم بی بی',
      daughterOfPrefix: 'دخترِ',
      fatherName: 'محمد اسلم',
      institutionLabel: 'ادارہ:',
      institutionValue: '1080. گورنمنٹ گرلز زبیدہ کالج حیدرآباد',
      examLine: 'انٹرمیڈیٹ پارٹ ٹو (بارہویں جماعت) کمپیوٹر سائنس سالانہ امتحان',
      marksObtained: 'حاصل کردہ نمبر',
      outOfLabel: 'کل 1100 میں سے',
      gazettedBadge: 'سرکاری بورڈ گزٹ میں تصدیق شدہ',
      viewGazetteBtn: 'بورڈ کا سرکاری گزٹ دیکھیں ↗',
      standingsLabel: 'بورڈ پوزیشنز',
      standingsValue: 'دوسری اور چوتھی',
      standingsDesc: 'تعلیمی بورڈ حیدرآباد کے تمام کالجز میں نمایاں ترین پوزیشنز۔',
      gradesLabel: 'گریڈز کی تقسیم',
      gradesValue: 'اکثریت A1 اور A گریڈز',
      gradesDesc: 'مکمل گروپ میں صرف ایک B اور ایک C گریڈ۔',
      passLabel: 'کامیابی کا ریکارڈ',
      passValue: '100 فیصد کامیابی',
      passDesc: 'تجربہ کار اساتذہ کی رہنمائی میں کوئی ناکامی نہیں۔',
      boardName: 'بورڈ آف انٹرمیڈیٹ اینڈ سیکنڈری ایجوکیشن حیدرآباد',
      boardDesc: 'کمپیوٹر سائنس گروپ کے سالانہ امتحان میں پہلی تین پوزیشنز کی تصدیق کرنے والا سرکاری گزٹ نوٹیفکیشن۔',
      inspectGazette: 'تصدیق شدہ گزٹ دستاویز دیکھنے کے لیے کلک کریں',
      closeView: 'بند کریں',
    },
    achievements: {
      title: 'طالبات کی کامیابیاں اور رول آف آنر',
      subtitle:
        'گورنمنٹ گرلز زبیدہ کالج حیدرآباد کی طالبات کے تعلیمی اعزازات، بورڈ پوزیشنز اور ضلعی سطح کے مقابلوں میں جیتی گئی نمایاں کامیابیاں۔',
      allTab: 'تمام کامیابیاں',
      boardAcademic: 'بورڈ اور تعلیمی',
      coCurricular: 'ہم نصابی اور دینی',
      scienceComputing: 'سائنس اور کمپیوٹنگ',
      sportsLeadership: 'کھیل اور قیادت',
      distinctionLabel: 'نمایاں اعزاز',
      verifiedFooter: 'مصدقہ اعزاز · گورنمنٹ گرلز زبیدہ کالج حیدرآباد',
      viewBanner: 'سرکاری رزلٹ بینر دیکھیں',
      inspectGazette: 'بورڈ گزٹ کا معائنہ کریں',
    },
    events: {
      title: 'لائیو 2026 کیمپس تقریبات اور اسمبلیاں',
      subtitle:
        'ہمارے آفیشل فیس بک پیج سے ہم آہنگ تعلیمی، امتحانی اور ثقافتی سرگرمیوں کا مسلسل لائیو اسکرولنگ ٹریکر۔',
      slow: 'آہستہ',
      normal: 'معمول',
      fast: 'تیز',
      filterLabel: 'فلٹر 2026:',
      allTab: 'تمام 2026 تقریبات',
      academicTab: 'تعلیمی اور بورڈ',
      culturalTab: 'ثقافتی اور ورثہ',
      sportsTab: 'کھیل اور اتھلیٹکس',
      admissionsTab: 'داخلے',
      ceremonyTab: 'اعزازات اور تقریبات',
      hoverHint: 'اسکرولنگ روکنے کے لیے کسی بھی کارڈ پر ماؤس رکھیں',
      eventBadge: '2026 تقریب',
      liveNow: 'ابھی لائیو',
      viewDetails: 'تفصیلات دیکھیں',
      fbPost: 'فیس بک پوسٹ',
      syncedLabel: 'فیس بک کے ساتھ لائیو منسلک',
      refreshStream: '2026 فیس بک اسٹرییم تازہ کریں',
      visitFbPage: 'گورنمنٹ گرلز زبیدہ کالج فیس بک پیج دیکھیں ↗',
      dateLabel: 'تاریخ:',
      timeLabel: 'وقت:',
      venueLabel: 'مقام:',
      summaryHeading: 'تقریب کا خلاصہ اور اہمیت:',
      openFbBtn: 'فیس بک پیج پر کھولیں ↗',
      closeBtn: 'بند کریں',
    },
    about: {
      headingBefore: 'امکانات سے روشن',
      headingHighlight: 'مستقبل کی تعمیر۔',
      leadQuote:
        '“تعلیم صرف ایک سند کا نام نہیں؛ یہ سوال پوچھنے کا اعتماد، خواب دیکھنے کی ہمت اور دنیا میں مثبت تبدیلی لانے کی صلاحیت ہے۔”',
      p1: 'گورنمنٹ گرلز زبیدہ کالج حیدرآباد سندھ کے قدیم ترین، باوقار اور معتبر تعلیمی اداروں میں سے ایک ہے۔ 1953 میں اس کے قیام کا مقصد حیدرآباد کی نوجوان خواتین کو اعلیٰ ثانوی اور کالج کی معیاری تعلیم فراہم کرنا تھا۔',
      p2: 'ہمارے سنہری شعار “خدمتِ خلق قبل از ذات” کے تحت زبیدہ کالج نے تین نسلوں کی باصلاحیت خواتین کی تربیت کی ہے۔ آج ہماری فارغ التحصیل طالبات پاکستان اور دنیا بھر میں نامور ڈاکٹرز، پروفیسرز، سائنسدان، ججز اور قائدین کے طور پر خدمات انجام دے رہی ہیں۔',
      p3: 'یہ محض ایک تعلیمی عمارت نہیں بلکہ حیدرآباد کی بیٹیوں کے روشن مستقبل اور بلند حوصلوں کی جیتی جاگتی علامت ہے۔',
      pillars: [
        'قائم شدہ 1953',
        '2,000 زیرِ تعلیم طالبات',
        'شعار: خدمتِ خلق قبل از ذات',
        'محکمہ تعلیم سندھ سے الحاق',
      ],
      gatewayTitle: 'مرکزی کیمپس گیٹ',
      gatewayAddr: 'مقابل سینٹرل جیل، پٹھان کالونی، ہیرآباد',
      quoteCard:
        '“ہر طالبہ اس وقار اور موقع کی مستحق ہے کہ وہ دریافت کر سکے کہ اس کی ذہانت اور صلاحیت اسے کتنی بلندیوں تک لے جا سکتی ہے۔”',
      quoteLabel: 'علم و آگہی کا جذبہ',
      collegeLabel: 'گورنمنٹ گرلز زبیدہ کالج',
      timelineTitle: 'سندھ کی بیٹیوں کو بااختیار بنانے کی سات دہائیاں',
      timelineSubtitle: '1953 سے آج تک استقامت، تعلیمی مساوات اور نمایاں کامیابیوں کا سنہری سفر۔',
      timeline: [
        {
          year: '1953',
          title: 'زبیدہ کالج کا قیام',
          desc: 'حیدرآباد، سندھ میں طالبات کی اعلیٰ تعلیم کے لیے وقف ایک مثالی سرکاری کالج کے طور پر بنیاد رکھی گئی۔',
        },
        {
          year: '1970ء–1990ء',
          title: 'سائنس اور ہیومینٹیز کی توسیع',
          desc: 'جدید سائنسی لیبارٹریز، وسیع لائبریری ونگ اور ایف ایس سی و بی ایس سی کے اعزازی شعبہ جات کا آغاز کیا گیا۔',
        },
        {
          year: '2000ء–2020ء',
          title: 'ڈیجیٹل ارتقاء اور سی کیپ دور',
          desc: 'حکومتِ سندھ کے مرکزی داخلہ نظام (SECCAP)، جدید کمپیوٹر سائنس لیب اور جامعہ سندھ کے ڈگری پروگرامز کا انضمام۔',
        },
        {
          year: 'موجودہ دور',
          title: '2,000+ طالبات اور بورڈ اعزازات',
          desc: 'پرنسپل پروفیسر یاسمین پنہور کی قیادت میں تعلیمی بورڈ حیدرآباد میں دوسری اور چوتھی پوزیشنز سمیت عمدہ روایت برقرار۔',
        },
      ],
    },
    principal: {
      deskLabel: 'پرنسپل کا دفتر',
      name: 'پروفیسر یاسمین پنہور',
      college: 'گورنمنٹ گرلز زبیدہ کالج حیدرآباد',
      tagline: 'قیادت · تعلیم · خدمت',
      subTagline: 'علمی فضیلت اور اخلاقی بلندی کا فروغ',
      bismillahSub: 'اللہ کے نام سے جو نہایت مہربان، رحم والا ہے',
      headingBefore: 'پیغام از',
      headingHighlight: 'پرنسپل',
      welcomeLine: 'گورنمنٹ گرلز زبیدہ کالج، حیدرآباد میں خوش آمدید۔',
      p1: '1953 میں اپنے قیام کے بعد سے یہ عظیم الشان تعلیمی ادارہ حیدرآباد کی بیٹیوں کو علم کی روشنی سے منور کر رہا ہے اور “خدمتِ خلق قبل از ذات” کے سنہری اصول کا امین ہے۔',
      p2: 'ہمارا مقصد محض اسناد اور ڈگریاں جاری کرنا نہیں بلکہ ایسی باعلم، باکردار، خود انحصار اور پراعتماد خواتین تیار کرنا ہے جو اپنے صوبے اور ملک کا نام روشن کریں۔',
      p3: 'یہاں جدید سائنسی تحقیق، ڈیجیٹل مہارت اور نصابی معیار کے ساتھ ساتھ کردار سازی اور اسلامی و اخلاقی اقدار پر خصوصی توجہ دی جاتی ہے۔ میں اور میرا تدریسی و انتظامی عملہ طالبات کو ایک محفوظ اور حوصلہ افزا تعلیمی ماحول فراہم کرنے کے لیے کوشاں ہیں۔',
      closingPrayer:
        'اللہ تعالیٰ ہر طالبہ اور بیٹی کو علم و زندگی کے ہر میدان میں مسلسل کامیابیاں عطا فرمائے۔ آمین۔',
      signName: 'پروفیسر یاسمین پنہور',
      signRole: 'پرنسپل، گورنمنٹ گرلز زبیدہ کالج، حیدرآباد',
      signDept: 'محکمہ کالج تعلیم · حکومتِ سندھ',
    },
    academics: {
      title: 'ہمارے تعلیمی پروگرامز دیکھیں',
      subtitle:
        'معیاری نصاب، جدید سائنسی لیبارٹریز، تجربہ کار اساتذہ اور جامعہ سندھ سے تسلیم شدہ ڈگری پروگرامز کے ذریعے طالبات کی مکمل رہنمائی۔',
      allTab: 'تمام پروگرامز',
      interTab: 'انٹرمیڈیٹ / ہائیر سیکنڈری (HSC)',
      degreeTab: '4 سالہ بی ایس زولوجی (جامعہ سندھ)',
      assocTab: '2 سالہ ایسوسی ایٹ ڈگری (فزکس، کیمسٹری، باٹنی، زولوجی، کامرس، سائنس)',
      boardHonorTag: 'بورڈ دوسری و چوتھی پوزیشن',
      durationLabel: 'مدت:',
      coreDisciplines: 'بنیادی مضامین:',
      moreLabel: 'مزید',
      viewDetails: 'مکمل نصاب اور کیریئر دیکھیں',
      applyBtn: 'داخلہ',
      infra: [
        {
          eyebrow: 'جدید لیبارٹریز',
          title: 'سائنس اور کمپیوٹنگ لیبز',
          desc: 'تیز رفتار کمپیوٹر ورک سٹیشنز، فزکس کے آلات، بائیولوجی نمونہ جات اور کیمسٹری تجربہ گاہوں سے لیس۔',
        },
        {
          eyebrow: 'تعلیمی کتب خانہ',
          title: 'کتابوں اور جرائد کا وسیع ذخیرہ',
          desc: 'ہزاروں حوالہ جاتی کتب، نصابی کتابیں، ماضی کے پرچے، اردو و سندھی ادب اور ڈیجیٹل وسائل۔',
        },
        {
          eyebrow: 'اہل اساتذہ',
          title: 'رہنمائی اور بورڈ میں برتری',
          desc: 'سندھ پبلک سروس کمیشن سے منتخب ماہر اساتذہ جو طالبات کو بورڈ پوزیشنز تک پہنچاتے ہیں۔',
        },
      ],
      modal: {
        overview: 'پروگرام کا جائزہ:',
        curriculum: 'مضامین اور نصاب کی تفصیل:',
        eligibility: 'اہلیت کا معیار:',
        prospects: 'مستقبل کے تعلیمی اور کیریئر مواقع:',
        proceedBtn: 'داخلہ گائیڈ دیکھیں',
        closeBtn: 'بند کریں',
      },
    },
    departments: {
      title: 'تعلیمی شعبہ جات',
      subtitle:
        '1953 سے حیاتیاتی و طبعی علوم، کمپیوٹر سائنس، کامرس، علاقائی زبانوں، اسلامیات اور سماجی علوم میں خصوصی تعلیم دینے والے شعبہ جات۔',
      statDepts: 'مستقل تعلیمی شعبہ جات',
      statLabs: 'مخصوص لیبز اور ہالز',
      statFaculty: 'SPSC میرٹ پر منتخب اساتذہ',
      statDegrees: 'یونیورسٹی ڈگریاں اور HSC',
      searchPlaceholder: 'شعبہ تلاش کریں (مثلاً کمپیوٹر سائنس، ریاضی، باٹنی، زولوجی، اردو، سندھی)...',
      clearBtn: 'صاف کریں',
      showingLabel: 'دکھایا جا رہا ہے:',
      ofLabel: 'از',
      deptsLabel: 'شعبہ جات',
      allTab: 'تمام شعبہ جات',
      faculties: {
        'Sciences & Computing': 'سائنس اور کمپیوٹنگ',
        'Life Sciences': 'حیاتیاتی علوم',
        'Commerce & Economics': 'کامرس اور معاشیات',
        'Languages & Literature': 'زبانیں اور ادب',
        'Humanities & Social Sciences': 'ہیومینٹیز اور سماجی علوم',
        'Health & Physical Education': 'صحت اور جسمانی تعلیم',
      },
      streamsServed: 'متعلقہ تعلیمی گروپس:',
      keySubjects: 'اہم نصابی مضامین:',
      moreLabel: 'مزید',
      detailsBtn: 'لیب اور فیکلٹی تفصیلات',
      detailsWithPhotos: 'تصاویر',
      inquireBtn: 'معلومات',
      emptyTitle: 'کوئی متعلقہ شعبہ نہیں ملا',
      emptyDesc: 'ریاضی، شماریات، باٹنی، زولوجی، اردو، سندھی، فزیالوجی یا اکنامکس جیسے الفاظ تلاش کریں۔',
      resetBtn: 'فلٹرز صاف کریں',
      bannerEyebrow: 'سندھ پبلک سروس کمیشن کی مستند فیکلٹی',
      bannerTitle: 'کسی شعبے کے سربراہ یا تعلیمی مشیر سے بات کرنا چاہتی ہیں؟',
      bannerDesc:
        'کالج کے دفتری اوقات (پیر تا ہفتہ، صبح 8:00 سے دوپہر 2:00 بجے تک) میں اساتذہ تعلیمی مشاورت اور مضامین کے انتخاب کے لیے دستیاب ہیں۔',
      contactBtn: 'شعبے سے رابطہ کریں',
      seccapGuide: 'سی کیپ گائیڈ',
      modal: {
        overview: 'شعبے کا تعارف:',
        labsHeading: 'لیبارٹریز اور تکنیکی سہولیات:',
        locationPrefix: 'مقام / کمرہ:',
        coursesHeading: 'نصابی مضامین اور پریکٹیکل ماڈیولز:',
        streamsHeading: 'متعلقہ ڈگری و انٹر گروپس:',
        honorsHeading: 'ادارہ جاتی اعزازات و ریکارڈ:',
        submitInquiry: 'شعبہ جاتی استفسار بھیجیں',
        close: 'بند کریں',
      },
    },
    campusTour: {
      title: 'انٹرایکٹو کیمپس نقشہ اور گیٹ سے ورچوئل سیر',
      subtitle:
        'پٹھان کالونی روڈ پر کالج کے مین گیٹ سے داخل ہوتے ہی کیمپس نقشے پر کسی بھی جگہ کلک کریں اور ہر بلاک، دفتر اور لیبارٹری تک قدم بہ قدم پیدل راستہ دیکھیں۔',
      searchPlaceholder: 'کسی بھی جگہ کو تلاش کریں (پارکنگ، باغ، تاریخی قبرستان و مزار، کمپیوٹر لیب، اکنامکس، آڈیٹوریم)...',
      walkBtn: 'راستہ چلائیں',
      pointLabel: 'مقام',
      ofLabel: 'از',
      mapTab: 'کیمپس نقشہ',
      facilityTab: 'اندرونی منظر',
      prevStop: 'پچھلا مقام',
      nextStop: 'اگلا مقام',
      autoPlay: 'خودکار سیر',
      pauseTour: 'سیر روکیں',
      gateDirectionsTitle: 'مین گیٹ سے پیدل چلنے کی ہدایات',
      highlightsTitle: 'سہولت کی نمایاں خصوصیات',
      specsTitle: 'کیمپس کے اہم حقائق',
    },
    library: {
      title: 'مرکزی کالج لائبریری',
      subtitle:
        'انٹرمیڈیٹ، ایسوسی ایٹ ڈگری اور بی ایس زولوجی کی طالبات کے لیے نصابی کتب، علمی جرائد اور مفت بک بینک کی پرسکون علمی آماجگاہ۔',
      location: 'مرکزی تعلیمی صحن · بالائی ونگ، زبیدہ کالج حیدرآباد',
      timings: 'پیر تا ہفتہ · صبح 8:00 تا دوپہر 1:45 بجے (پاکستانی وقت)',
      stats: [
        { label: 'کتب و حوالہ جات کا ذخیرہ', value: '18,000+ جلدیں' },
        { label: 'ریڈنگ ہال کی گنجائش', value: '120+ نشستیں' },
        { label: 'مفت بک بینک سہولت', value: 'انٹر اور ڈگری سیٹس' },
        { label: 'روزانہ اخبارات و رسائل', value: 'انگریزی، اردو اور سندھی' },
      ],
      galleryTitle: 'کالج لائبریری تصویری گیلری',
      gallerySubtitle: 'ریڈنگ ہال، بک اسٹیکس، گورنمنٹ بک بینک اور سائنس ریفرنس ونگ کی جھلکیاں۔',
      enlargeBtn: 'بڑا دیکھیں',
      rulesTitle: 'لائبریری کے قوانین اور کتابوں کا اجرا',
      rulesDesc:
        'انٹرمیڈیٹ، ایسوسی ایٹ ڈگری اور چار سالہ بی ایس پروگرامز کی ہر داخل شدہ طالبہ لائبریری کارڈ اور بک بینک سہولت کی اہل ہے۔',
      wings: [
        {
          id: 'reading-hall',
          subtitle: 'پرسکون مطالعہ ونگ',
          title: 'مین ریڈنگ ہال',
          description:
            'امتحانی تیاری، مضمون نویسی اور روزناموں کے مطالعے کے لیے روشن اور ہوادار مطالعہ ہال۔',
          highlights: [
            '120+ طالبات کے لیے خاموش مطالعے کا زون',
            'روزانہ انگریزی، اردو اور سندھی اخبارات',
            'تعلیمی بورڈ حیدرآباد کے ماضی کے پرچوں کا آرکائیو',
          ],
        },
        {
          id: 'science-bs',
          subtitle: 'ڈگری اور ایف ایس سی سیکشن',
          title: 'سائنس اور بی ایس زولوجی ونگ',
          description:
            'سیل بائیولوجی، اینیمل فزیالوجی، آرگینک کیمسٹری، کیلکولس اور کمپیوٹر سائنس کی مستند حوالہ جاتی کتب۔',
          highlights: [
            'ایچ ای سی سے منظور شدہ بی ایس زولوجی و اے ڈی ایس کتب',
            'میڈیکل و انجینئرنگ انٹری ٹیسٹ گائیڈز',
            'اردو و سندھی لغات اور انسائیکلوپیڈیاز',
          ],
        },
        {
          id: 'book-bank',
          subtitle: 'فلاحِ طلبہ ڈیسک',
          title: 'مفت بک بینک سہولت',
          description:
            'گیارہویں، بارہویں اور ایسوسی ایٹ ڈگری کی مستحق اور ذہین طالبات کے لیے پورے سال کی نصابی کتب کا مفت اجرا۔',
          highlights: [
            'سندھ ٹیکسٹ بک بورڈ کے مکمل کورس سیٹس مفت دستیاب',
            'ایڈمیشن سلپ کے ساتھ آسان اجرا',
            'کامرس اور اکاؤنٹنگ کا خصوصی شیلف',
          ],
        },
        {
          id: 'sindh-literature',
          subtitle: 'علاقائی ادبی ورثہ',
          title: 'اردو، سندھی اور اسلامی آرکائیو',
          description:
            'کلاسیکی ادبی تخلیقات، سندھیالوجی کتب، مطالعہ پاکستان اور تفسیر و حدیث کی معتبر جلدیں۔',
          highlights: [
            'سندھی ادبی بورڈ اور اردو کلاسیکی مجموعے',
            'سیرت النبی ﷺ اور تاریخِ اسلام کا ذخیرہ',
            'مباحثے اور تحقیقی مضامین کی تیاری کا گوشہ',
          ],
        },
      ],
      guidelines: [
        'کتابیں جاری کروانے کے لیے کالج کا درست اسٹوڈنٹ آئی ڈی کارڈ ساتھ لائیں۔',
        'انٹرمیڈیٹ طالبات 14 دن کے لیے 2 کتب اور بی ایس/اے ڈی پی طالبات 4 کتب حاصل کر سکتی ہیں۔',
        'ریڈنگ ہال کے اندر مکمل خاموشی برقرار رکھیں اور موبائل فون سائلنٹ موڈ پر رکھیں۔',
        'مفت بک بینک کی کتب سیشن کے آغاز پر جاری کی جاتی ہیں اور سالانہ امتحانات کے بعد واپس لی جاتی ہیں۔',
      ],
    },
    labs: {
      title: 'کالج لیبارٹریز اور پریکٹیکل ونگز',
      subtitle:
        'فزکس، کمپیوٹر سائنس، کیمسٹری، زولوجی، باٹنی اور سائیکالوجی کے لیے مخصوص تجربہ گاہیں—بورڈ اور جامعہ کے پریکٹیکلز کے لیے مکمل سہولیات۔',
      allLabsTab: 'تمام لیبارٹریز',
      labPhotosLabel: 'لیب تصاویر',
      viewBtn: 'دیکھیں',
    },
    digitalLibrary: {
      title: 'نصابی کتب اور آفیشل آن لائن لنکس',
      subtitle:
        'سندھ ٹیکسٹ بک بورڈ ای بکس، تعلیمی بورڈ حیدرآباد کے نصاب اور جامعہ سندھ / ایچ ای سی ڈگری کورسز کے براہِ راست لنکس۔',
      allTab: 'تمام نصابی کتب',
      interTab: 'انٹرمیڈیٹ (گیارہویں اور بارہویں)',
      degreeTab: 'بی ایس زولوجی اور ایسوسی ایٹ ڈگریاں',
    },
    alumnae: {
      title: 'ممتاز سابقہ طالبات',
      subtitle:
        'گورنمنٹ گرلز زبیدہ کالج حیدرآباد کی ان نامور فارغ التحصیل خواتین کو خراجِ تحسین جنہوں نے ادب، اعلیٰ تعلیم، نشریات اور پارلیمانی قیادت میں تاریخ رقم کی۔',
      allTab: 'تمام ممتاز سابقہ طالبات',
      categoryLabels: {
        publicService: 'پبلک سروس اور میڈیا',
        lawEnforcement: 'قانون، انتظامیہ اور حقوق',
        academia: 'تعلیم اور ادب',
        poetry: 'شاعری اور انسانی حقوق',
      },
      attendanceLabel: 'دستاویزی کالج ریکارڈ',
      bioBtn: 'سوانح اور کارنامے',
      profileLink: 'پروفائل',
      closeProfile: 'پروفائل بند کریں',
      biographyHeading: 'سوانح حیات اور نمایاں خدمات:',
      highlightsHeading: 'اہم سنگِ میل اور عوامی خدمات:',
      legacyHeading: 'قومی اعتراف اور علمی ورثہ:',
      metrics: [
        {
          value: '1953–2026',
          label: 'علمی برتری کی 7 سے زائد دہائیاں',
          sub: 'حیدرآباد اور سندھ بھر میں تعلیم یافتہ خواتین کی نسلوں کی تعمیر',
        },
        {
          value: 'ستارہ و تمغہ',
          label: 'قومی سول اعزازات',
          sub: 'ستارۂ امتیاز اور پرائڈ آف پرفارمنس حاصل کرنے والی سابقہ طالبات',
        },
        {
          value: 'پارلیمنٹ اور اقوامِ متحدہ',
          label: 'پالیسی سازی اور سفارت کاری',
          sub: 'اسمبلیوں، وزارتوں اور عالمی اداروں میں خدمات انجام دینے والی گریجویٹس',
        },
        {
          value: 'میڈیکل و ٹیکنالوجی',
          label: 'سائنس اور اعلیٰ تحقیق',
          sub: 'وائس چانسلرز، پروفیسرز اور ممتاز سائنسی محققین',
        },
      ],
    },
    cemis: {
      eyebrow: 'محکمہ کالج تعلیم · حکومتِ سندھ',
      title: 'سی ای ایم آئی ایس (CEMIS) بائیومیٹرک حاضری اور فیکلٹی ایپ',
      subtitleBefore: 'سندھ کے سرکاری کالج لیکچررز کے لیے بائیومیٹرک حاضری کا نظام',
      subtitleBold: 'CEMIS (کالج ایجوکیشن مینجمنٹ انفارمیشن سسٹم)',
      subtitleAfter: 'سے منسلک ہے—جو حکومتِ سندھ کے محکمہ کالج تعلیم کا سرکاری ڈیجیٹل پلیٹ فارم ہے۔',
      cardEyebrow: 'محکمہ کالج تعلیم کی آفیشل ایپ',
      cardTitle: 'CEMIS – کالج ایجوکیشن',
      cardSub: 'حکومتِ سندھ · محکمہ کالج تعلیم',
      featuresHeading: 'حاضری اور ایچ آر کی نمایاں سہولیات:',
      features: [
        'جی پی ایس اور سیلفی تصدیق کے ذریعے بائیومیٹرک حاضری',
        'روزانہ چیک اِن اور چیک آؤٹ کا اندراج',
        'مکمل ذاتی حاضری ریکارڈ کی نگرانی',
        'رخصت اور تبادلے کی ڈیجیٹل درخواستیں',
      ],
      playBtn: 'گوگل پلے سے CEMIS ڈاؤن لوڈ کریں',
      portalBtn: 'CED / DGCS سندھ پورٹل',
    },
    gallery: {
      title: 'زبیدہ کالج میں تعلیمی زندگی',
      subtitle:
        'ہمارے تاریخی کیمپس، نمایاں پوزیشن ہولڈر طالبات، قیادت کے خطابات اور کالج کی سرگرمیوں کا بصری مرقع۔',
      allTab: 'تمام تصاویر',
      honorsTab: 'بورڈ اعزازات اور نتائج',
      campusTab: 'کیمپس اور کالج نشان',
      facultyTab: 'قیادت اور اسمبلیاں',
      photosSingular: 'تصویر',
      photosPlural: 'تصاویر',
      slow: 'آہستہ',
      normal: 'معمول',
      fast: 'تیز',
      viewFull: 'مکمل تصویر دیکھیں',
      hoverHint: 'اسکرولنگ روکنے کے لیے کسی بھی تصویر پر ماؤس رکھیں یا بڑا دیکھنے کے لیے کلک کریں۔',
      pausedLabel: 'اسکرولنگ رکی ہوئی ہے',
      pausedHoverLabel: 'ماؤس رکھنے پر رکی ہوئی ہے',
      autoScrollLabel: 'خودکار اسکرولنگ',
      modalEyebrow: 'گورنمنٹ گرلز زبیدہ کالج گیلری',
      closeView: 'بند کریں',
      categoryLabels: {
        campus: 'کیمپس',
        honors: 'بورڈ اعزازات',
        academics: 'تعلیم',
        faculty: 'قیادت',
      },
    },
    community: {
      headingBefore: 'ہمارے',
      headingHighlight: 'لائیو فیس بک فیڈ سے جڑیں',
      subtitle:
        'روزانہ کی کیمپس سرگرمیوں، تقریبات، امتحانی شیڈول، بورڈ اعزازات اور ہنگامی تعطیلات کے سرکاری اعلانات براہِ راست کالج کے فیس بک پیج سے حاصل کریں۔',
      channelTitle: 'گورنمنٹ گرلز زبیدہ کالج حیدرآباد',
      channelSub: 'آفیشل پیج · فعال کمیونٹی',
      channelDesc: 'فوری اعلانات، تعطیلات کی اطلاع اور طالبات کی رہنمائی کے لیے کالج انتظامیہ کے زیرِ انتظام۔',
      openFbBtn: 'آفیشل فیس بک پیج کھولیں ↗',
      viewEventsBtn: '2026 لائیو ایونٹ ٹریکر دیکھیں',
      feat1: 'لائیو تقریبات اور کنووکیشن نشریات',
      feat2: 'طالبات کے لیے فوری نوٹسز',
      feedTitle: 'فیس بک لائیو فیڈ',
      tabs: {
        timeline: 'لائیو پلگ ان',
        recent: 'تازہ پوسٹس',
        live: 'لائیو ویڈیو',
      },
      connectedLabel: 'آفیشل فیس بک ٹائم لائن سے منسلک',
      reloadBtn: 'دوبارہ لوڈ کریں',
      cookieHint: 'اگر براؤزر میں ٹائم لائن نظر نہ آئے تو اوپر "تازہ پوسٹس" پر کلک کریں یا براہِ راست فیس بک کھولیں:',
      openDirectBtn: 'فیس بک پر زبیدہ کالج کھولیں ↗',
      commentsLabel: 'تبصرے',
      viewOnFb: 'فیس بک پر دیکھیں ↗',
      liveNoticeTitle: 'فیس بک لائیو براڈکاسٹ ہب',
      liveNoticeDesc: 'جب کالج کی کوئی تقریب یا اسمبلی لائیو ہو گی تو آپ یہاں براہِ راست دیکھ سکیں گی۔',
    },
  },
  sd: {
    boardHonors: {
      title: 'شاندار بورڊ نتيجا ۽ پوزيشن هولڊرز',
      subtitle:
        'تعليمي بورڊ حيدرآباد جي سالياني انٽرميڊيٽ (HSC پارٽ-II) امتحانن ۾ گورنمينٽ گرلز زبيده ڪاليج جي شاگردياڻين جي تاريخي ۽ نمايان ڪاميابين جو جشن.',
      viewBanner: 'مڪمل بينر ڏسو',
      felicitationLabel: 'سرڪاري مبارڪباد:',
      felicitationDesc:
        'پرنسپال پروفيسر ياسمين پنهور ۽ استادن پاران ڪمپيوٽر سائنس ڊپارٽمينٽ ۽ سڀني ڪامياب شاگردياڻين کي دلي مبارڪون.',
      positionHeader: 'تعليمي بورڊ حيدرآباد ۾ ٻي پوزيشن',
      rollNoLabel: 'رول نمبر: 79256',
      positionHolderLabel: 'پوزيشن هولڊر',
      studentName: 'مريم بي بي',
      daughterOfPrefix: 'ڌيءُ',
      fatherName: 'محمد اسلم',
      institutionLabel: 'ادارو:',
      institutionValue: '1080. گورنمينٽ گرلز زبيده ڪاليج حيدرآباد',
      examLine: 'انٽرميڊيٽ پارٽ-II (ٻارهون ڪلاس) ڪمپيوٽر سائنس ساليانو امتحان',
      marksObtained: 'حاصل ڪيل مارڪون',
      outOfLabel: 'ڪل 1100 مان',
      gazettedBadge: 'سرڪاري بورڊ گزٽ ۾ تصديق ٿيل',
      viewGazetteBtn: 'سرڪاري بورڊ گزٽ ڏسو ↗',
      standingsLabel: 'بورڊ پوزيشنون',
      standingsValue: 'ٻي ۽ چوٿين',
      standingsDesc: 'تعليمي بورڊ حيدرآباد جي سڀني ڪاليجن ۾ نمايان پوزيشنون.',
      gradesLabel: 'گريڊن جي ورڇ',
      gradesValue: 'اڪثريت A1 ۽ A گريڊز',
      gradesDesc: 'مڪمل گروپ ۾ صرف هڪ B ۽ هڪ C گريڊ.',
      passLabel: 'ڪاميابي جو رڪارڊ',
      passValue: '100 سيڪڙو ڪاميابي',
      passDesc: 'ماهر استادن جي رهنمائي هيٺ ڪا به ناڪامي نه.',
      boardName: 'بورڊ آف انٽرميڊيٽ اينڊ سيڪنڊري ايجوڪيشن حيدرآباد',
      boardDesc: 'ڪمپيوٽر سائنس گروپ جي سالياني امتحان ۾ پهرين ٽن پوزيشنن جي تصديق ڪندڙ سرڪاري گزٽ نوٽيفڪيشن.',
      inspectGazette: 'تصديق ٿيل گزٽ دستاويز ڏسڻ لاءِ ڪلڪ ڪريو',
      closeView: 'بند ڪريو',
    },
    achievements: {
      title: 'شاگردياڻين جون ڪاميابيون ۽ رول آف آنر',
      subtitle:
        'گورنمينٽ گرلز زبيده ڪاليج حيدرآباد جي شاگردياڻين جا تعليمي اعزاز، بورڊ پوزيشنون ۽ ضلعي سطح جي مقابلن ۾ حاصل ڪيل نمايان ڪاميابيون.',
      allTab: 'سڀ ڪاميابيون',
      boardAcademic: 'بورڊ ۽ تعليمي',
      coCurricular: 'هم نصابي ۽ ديني',
      scienceComputing: 'سائنس ۽ ڪمپيوٽنگ',
      sportsLeadership: 'رانديون ۽ قيادت',
      distinctionLabel: 'نمايان اعزاز',
      verifiedFooter: 'تصديق ٿيل اعزاز · گورنمينٽ گرلز زبيده ڪاليج حيدرآباد',
      viewBanner: 'سرڪاري رزلٽ بينر ڏسو',
      inspectGazette: 'بورڊ گزٽ جو معائنو ڪريو',
    },
    events: {
      title: 'لائيو 2026 ڪيمپس تقريبون ۽ اسيمبليون',
      subtitle:
        'اسان جي آفيشل فيسبڪ پيج سان جڙيل تعليمي، امتحاني ۽ ثقافتي سرگرمين جو لڳاتار لائيو اسڪرولنگ ونڊو.',
      slow: 'آهستي',
      normal: 'عام',
      fast: 'تيز',
      filterLabel: 'فلٽر 2026:',
      allTab: 'سڀ 2026 تقريبون',
      academicTab: 'تعليمي ۽ بورڊ',
      culturalTab: 'ثقافتي ۽ ورثو',
      sportsTab: 'رانديون ۽ اٿليٽڪس',
      admissionsTab: 'داخلا',
      ceremonyTab: 'اعزاز ۽ تقريبون',
      hoverHint: 'اسڪرولنگ روڪڻ لاءِ ڪنهن به ڪارڊ تي مائوس رکو',
      eventBadge: '2026 تقريب',
      liveNow: 'هاڻي لائيو',
      viewDetails: 'تفصيل ڏسو',
      fbPost: 'فيسبڪ پوسٽ',
      syncedLabel: 'فيسبڪ سان لائيو جڙيل',
      refreshStream: '2026 فيسبڪ اسٽريم تازو ڪريو',
      visitFbPage: 'گورنمينٽ گرلز زبيده ڪاليج فيسبڪ پيج ڏسو ↗',
      dateLabel: 'تاريخ:',
      timeLabel: 'وقت:',
      venueLabel: 'مقام:',
      summaryHeading: 'تقريب جو خلاصو ۽ اهميت:',
      openFbBtn: 'فيسبڪ پيج تي کوليو ↗',
      closeBtn: 'بند ڪريو',
    },
    about: {
      headingBefore: 'امڪانن سان ٺهيل',
      headingHighlight: 'روشن مستقبل.',
      leadQuote:
        '“تعليم رڳو هڪ سند جو نالو ناهي؛ اها سوال پڇڻ جو اعتماد، خواب ڏسڻ جي همت ۽ دنيا ۾ مثبت تبديلي آڻڻ جي سگهه آهي.”',
      p1: 'گورنمينٽ گرلز زبيده ڪاليج حيدرآباد سنڌ جي قديم ترين، باوقار ۽ معتبر تعليمي ادارن مان هڪ آهي. 1953 ۾ قائم ٿيل هي ڪاليج حيدرآباد جي نياڻين لاءِ اعليٰ ثانوي ۽ ڪاليج تعليم جي تاريخي ضرورت پوري ڪرڻ لاءِ شروع ڪيو ويو.',
      p2: 'اسان جي رهنما اصول “ذات کان مٿي خدمت” تحت زبيده ڪاليج ٽن نسلن جي باصلاحيت عورتن جي تربيت ڪئي آهي. اڄ اسان جون اڳوڻيون شاگردياڻيون پاڪستان ۽ سڄي دنيا ۾ ناليواريون ڊاڪٽر، پروفيسر، سائنسدان، جج ۽ اڳواڻ طور خدمتون سرانجام ڏئي رهيون آهن.',
      p3: 'هي صرف هڪ عمارت ناهي پر حيدرآباد جي نياڻين جي روشن مستقبل ۽ بلند اميدن جو زندهه اهڃاڻ آهي.',
      pillars: [
        'قائم ٿيل 1953',
        '2,000 زيرِ تعليم شاگردياڻيون',
        'نعرو: ذات کان مٿي خدمت',
        'سنڌ تعليم کاتي سان الحاق',
      ],
      gatewayTitle: 'مرڪزي ڪيمپس گيٽ',
      gatewayAddr: 'سينٽرل جيل سامهون، پٺاڻ ڪالوني، هيرآباد',
      quoteCard:
        '“هر شاگردياڻي ان وقار ۽ موقعي جي حقدار آهي ته هوءَ ڄاڻي سگهي ته سندس ذهانت ۽ صلاحيت کيس ڪهڙين بلندين تائين پهچائي سگهي ٿي.”',
      quoteLabel: 'علم ۽ سجاڳي جو جذبو',
      collegeLabel: 'گورنمينٽ گرلز زبيده ڪاليج',
      timelineTitle: 'سنڌ جي نياڻين کي بااختيار بڻائڻ جا ست ڏهاڪا',
      timelineSubtitle: '1953 کان اڄ تائين استقامت، تعليمي برابري ۽ شاندار ڪاميابين جو سونهري سفر.',
      timeline: [
        {
          year: '1953',
          title: 'زبيده ڪاليج جو قيام',
          desc: 'حيدرآباد، سنڌ ۾ نياڻين جي اعليٰ تعليم لاءِ وقف هڪ مثالي سرڪاري ڪاليج طور بنياد رکيو ويو.',
        },
        {
          year: '1970ع–1990ع',
          title: 'سائنس ۽ هيومينٽيز جي توسيع',
          desc: 'جديد سائنسي ليبارٽريون، وسيع لائبريري ونگ ۽ F.Sc ۽ B.Sc آنرز پروگرام متعارف ڪرايا ويا.',
        },
        {
          year: '2000ع–2020ع',
          title: 'ڊجيٽل ترقي ۽ سيڪيپ دور',
          desc: 'سنڌ حڪومت جي مرڪزي داخلا نظام (SECCAP)، جديد ڪمپيوٽر سائنس ليب ۽ سنڌ يونيورسٽي جا ڊگري پروگرام شامل ڪيا ويا.',
        },
        {
          year: 'موجوده دور',
          title: '2,000+ شاگردياڻيون ۽ بورڊ اعزاز',
          desc: 'پرنسپال پروفيسر ياسمين پنهور جي قيادت هيٺ تعليمي بورڊ حيدرآباد ۾ ٻي ۽ چوٿين پوزيشن سميت شاندار روايت برقرار.',
        },
      ],
    },
    principal: {
      deskLabel: 'پرنسپال جي ميز',
      name: 'پروفيسر ياسمين پنهور',
      college: 'گورنمينٽ گرلز زبيده ڪاليج حيدرآباد',
      tagline: 'قيادت · تعليم · خدمت',
      subTagline: 'علمي فضيلت ۽ اخلاقي بلندي جو فروغ',
      bismillahSub: 'الله جي نالي سان جيڪو تمام گهڻو مهربان، رحم ڪندڙ آهي',
      headingBefore: 'پيغام از',
      headingHighlight: 'پرنسپال',
      welcomeLine: 'گورنمينٽ گرلز زبيده ڪاليج، حيدرآباد ۾ ڀليڪار.',
      p1: '1953 ۾ پنهنجي قيام کان وٺي هي عظيم ادارو حيدرآباد جي نياڻين کي علم جي روشني سان منور ڪري رهيو آهي ۽ “ذات کان مٿي خدمت” جي سونهري اصول جو امين آهي.',
      p2: 'اسان جو مقصد صرف سرٽيفڪيٽ ۽ ڊگريون ڏيڻ ناهي، پر اهڙيون باعلم، باڪردار، خود انحصار ۽ بااعتماد عورتون تيار ڪرڻ آهي جيڪي پنهنجي صوبي ۽ ملڪ جو نالو روشن ڪن.',
      p3: 'هتي جديد سائنسي تحقيق، ڊجيٽل مهارت ۽ نصابي معيار سان گڏ ڪردار سازي ۽ اسلامي و اخلاقي قدرن تي خاص ڌيان ڏنو وڃي ٿو. مان ۽ منهنجو تدريسي ۽ انتظامي عملو شاگردياڻين کي محفوظ ۽ همت افزا ماحول فراهم ڪرڻ لاءِ جاکوڙي رهيا آهيون.',
      closingPrayer: 'الله تعاليٰ هر شاگردياڻي ۽ ڌيءَ کي علم ۽ زندگي جي هر ميدان ۾ لڳاتار ڪاميابيون عطا فرمائي.',
      signName: 'پروفيسر ياسمين پنهور',
      signRole: 'پرنسپال، گورنمينٽ گرلز زبيده ڪاليج، حيدرآباد',
      signDept: 'ڪاليج ايجوڪيشن کاتو · حڪومتِ سنڌ',
    },
    academics: {
      title: 'اسان جا تعليمي پروگرام ڏسو',
      subtitle:
        'معياري نصاب، جديد سائنسي ليبارٽرين، تجربيڪار استادن ۽ سنڌ يونيورسٽي سان تسليم ٿيل ڊگري پروگرامن ذريعي شاگردياڻين جي مڪمل رهنمائي.',
      allTab: 'سڀ پروگرام',
      interTab: 'انٽرميڊيٽ / هائير سيڪنڊري (HSC)',
      degreeTab: '4 سالا BS زولوجي (سنڌ يونيورسٽي)',
      assocTab: '2 سالا ايسوسيئيٽ ڊگريون (فزڪس، ڪيميسٽري، باٽني، زولوجي، ڪامرس، سائنس)',
      boardHonorTag: 'بورڊ ٻي ۽ چوٿين پوزيشن',
      durationLabel: 'مدو:',
      coreDisciplines: 'بنيادي مضمون:',
      moreLabel: 'وڌيڪ',
      viewDetails: 'مڪمل نصاب ۽ ڪيريئر ڏسو',
      applyBtn: 'داخلا',
      infra: [
        {
          eyebrow: 'جديد ليبارٽريون',
          title: 'سائنس ۽ ڪمپيوٽنگ ليبز',
          desc: 'تيز رفتار ڪمپيوٽر ورڪ اسٽيشنز، فزڪس جا اوزار، بائيولاجي نمونا ۽ ڪيميسٽري تجرباگاهن سان ليس.',
        },
        {
          eyebrow: 'تعليمي لائبريري',
          title: 'ڪتابن ۽ رسالن جو وسيع ذخيرو',
          desc: 'هزارين حوالا ڪتاب، نصابي ڪتاب، پراڻا پرچا، سنڌي ۽ اردو ادب ۽ ڊجيٽل وسيلا.',
        },
        {
          eyebrow: 'اهل استاد',
          title: 'رهنمائي ۽ بورڊ ۾ برتري',
          desc: 'سنڌ پبلڪ سروس ڪميشن مان چونڊيل ماهر استاد جيڪي شاگردياڻين کي بورڊ پوزيشن تائين پهچائين ٿا.',
        },
      ],
      modal: {
        overview: 'پروگرام جو جائزو:',
        curriculum: 'مضمون ۽ نصاب جي تفصيل:',
        eligibility: 'اهليت جو معيار:',
        prospects: 'مستقبل جا تعليمي ۽ ڪيريئر موقعا:',
        proceedBtn: 'داخلا گائيڊ ڏانهن وڃو',
        closeBtn: 'بند ڪريو',
      },
    },
    departments: {
      title: 'تعليمي شعبا',
      subtitle:
        '1953 کان حياتياتي ۽ طبعي علوم، ڪمپيوٽر سائنس، ڪامرس، علائقائي ٻولين، اسلاميات ۽ سماجي علوم ۾ خاص تعليم ڏيندڙ شعبا.',
      statDepts: 'مستقل تعليمي شعبا',
      statLabs: 'مخصوص ليبز ۽ هالز',
      statFaculty: 'SPSC ميرٽ تي چونڊيل استاد',
      statDegrees: 'يونيورسٽي ڊگريون ۽ HSC',
      searchPlaceholder: 'شعبو ڳوليو (مثال: ڪمپيوٽر سائنس، رياضي، باٽني، زولوجي، اردو، سنڌي)...',
      clearBtn: 'صاف ڪريو',
      showingLabel: 'ڏيکارجي رهيو آهي:',
      ofLabel: 'مان',
      deptsLabel: 'شعبا',
      allTab: 'سڀ شعبا',
      faculties: {
        'Sciences & Computing': 'سائنس ۽ ڪمپيوٽنگ',
        'Life Sciences': 'حياتياتي علوم',
        'Commerce & Economics': 'ڪامرس ۽ معاشيات',
        'Languages & Literature': 'ٻوليون ۽ ادب',
        'Humanities & Social Sciences': 'هيومينٽيز ۽ سماجي علوم',
        'Health & Physical Education': 'صحت ۽ جسماني تعليم',
      },
      streamsServed: 'لاڳاپيل تعليمي گروپ:',
      keySubjects: 'اهم نصابي مضمون:',
      moreLabel: 'وڌيڪ',
      detailsBtn: 'ليب ۽ فيڪلٽي تفصيل',
      detailsWithPhotos: 'تصويرون',
      inquireBtn: 'پڇا ڳاڇا',
      emptyTitle: 'ڪو به لاڳاپيل شعبو نه مليو',
      emptyDesc: 'رياضي، انگ اکر، باٽني، زولوجي، اردو، سنڌي، فزيالاجي يا اقتصاديات جهڙا لفظ ڳوليو.',
      resetBtn: 'فلٽر بحال ڪريو',
      bannerEyebrow: 'سنڌ پبلڪ سروس ڪميشن جي مستند فيڪلٽي',
      bannerTitle: 'ڪنهن شعبي جي سربراهه يا تعليمي صلاحڪار سان ڳالهائڻ چاهيو ٿيون؟',
      bannerDesc:
        'ڪاليج جي آفيس وقتن (سومر کان ڇنڇر، صبح 8:00 کان منجهند 2:00 تائين) ۾ استاد تعليمي صلاح ۽ مضمون چونڊ لاءِ دستياب آهن.',
      contactBtn: 'شعبي سان رابطو ڪريو',
      seccapGuide: 'سيڪيپ گائيڊ',
      modal: {
        overview: 'شعبي جو تعارف:',
        labsHeading: 'ليبارٽريون ۽ ٽيڪنيڪل سهولتون:',
        locationPrefix: 'مقام / ڪمرو:',
        coursesHeading: 'نصابي مضمون ۽ پريڪٽيڪل ماڊيولز:',
        streamsHeading: 'لاڳاپيل ڊگري ۽ انٽر گروپ:',
        honorsHeading: 'ادارتي اعزاز ۽ رڪارڊ:',
        submitInquiry: 'شعبي بابت سوال موڪليو',
        close: 'بند ڪريو',
      },
    },
    campusTour: {
      title: 'انٽرايڪٽو ڪيمپس نقشو ۽ گيٽ کان ورچوئل سير',
      subtitle:
        'پٺاڻ ڪالوني روڊ تي ڪاليج جي مين گيٽ کان داخل ٿيندي ئي نقشي تي ڪنهن به هنڌ ڪلڪ ڪريو ۽ هر بلاڪ، آفيس ۽ ليبارٽري تائين پيادل رستو ڏسو.',
      searchPlaceholder: 'ڪنهن به هنڌ کي ڳوليو (پارڪنگ، باغ، تاريخي قبرستان ۽ مزار، ڪمپيوٽر ليب، اقتصاديات، آڊيٽوريم)...',
      walkBtn: 'رستو هلايو',
      pointLabel: 'مقام',
      ofLabel: 'مان',
      mapTab: 'ڪيمپس نقشو',
      facilityTab: 'اندروني منظر',
      prevStop: 'اڳيون مقام',
      nextStop: 'پويون مقام',
      autoPlay: 'خودڪار سير',
      pauseTour: 'سير روڪيو',
      gateDirectionsTitle: 'مين گيٽ کان پيادل هلڻ جون هدايتون',
      highlightsTitle: 'سهولت جون خاصيتون',
      specsTitle: 'ڪيمپس جون اهم حقيقتون',
    },
    library: {
      title: 'مرڪزي ڪاليج لائبريري',
      subtitle:
        'انٽرميڊيٽ، ايسوسيئيٽ ڊگري ۽ BS زولوجي جي شاگردياڻين لاءِ نصابي ڪتابن، علمي رسالن ۽ مفت بڪ بئنڪ جو پرسڪون علمي مرڪز.',
      location: 'مرڪزي تعليمي صحن · مٿيون ونگ، زبيده ڪاليج حيدرآباد',
      timings: 'سومر کان ڇنڇر · صبح 8:00 کان منجهند 1:45 تائين (پاڪستان وقت)',
      stats: [
        { label: 'ڪتابن ۽ حوالن جو ذخيرو', value: '18,000+ جلد' },
        { label: 'ريڊنگ هال جي گنجائش', value: '120+ سيٽون' },
        { label: 'مفت بڪ بئنڪ سهولت', value: 'انٽر ۽ ڊگري سيٽ' },
        { label: 'روزاني اخبارون ۽ رسالا', value: 'انگريزي، اردو ۽ سنڌي' },
      ],
      galleryTitle: 'ڪاليج لائبريري تصويري گئلري',
      gallerySubtitle: 'ريڊنگ هال، بڪ اسٽيڪس، گورنمينٽ بڪ بئنڪ ۽ سائنس ريفرنس ونگ جون تصويرون.',
      enlargeBtn: 'وڏو ڏسو',
      rulesTitle: 'لائبريري جا قانون ۽ ڪتاب جاري ڪرڻ',
      rulesDesc:
        'انٽرميڊيٽ، ايسوسيئيٽ ڊگري ۽ چار سالا BS پروگرامن جي هر داخلا ورتل شاگردياڻي لائبريري ڪارڊ ۽ بڪ بئنڪ جي حقدار آهي.',
      wings: [
        {
          id: 'reading-hall',
          subtitle: 'پرسڪون مطالعي وارو ونگ',
          title: 'مين ريڊنگ هال',
          description:
            'امتحاني تياري، مضمون نويسي ۽ روزاني اخبارن جي مطالعي لاءِ روشن ۽ هوادار مطالعو هال.',
          highlights: [
            '120+ شاگردياڻين لاءِ خاموش مطالعي جو زون',
            'روزاني انگريزي، اردو ۽ سنڌي اخبارون',
            'تعليمي بورڊ حيدرآباد جا پراڻا پرچا ۽ آرڪائيو',
          ],
        },
        {
          id: 'science-bs',
          subtitle: 'ڊگري ۽ F.Sc سيڪشن',
          title: 'سائنس ۽ BS زولوجي ونگ',
          description:
            'سيل بائيولاجي، اينيمل فزيالاجي، آرگينڪ ڪيميسٽري، ڪيلڪولس ۽ ڪمپيوٽر سائنس جا مستند حوالا ڪتاب.',
          highlights: [
            'HEC منظور ٿيل BS زولوجي ۽ ADS ڪتاب',
            'ميڊيڪل ۽ انجنيئرنگ انٽري ٽيسٽ گائيڊز',
            'سنڌي ۽ اردو لغتون ۽ انسائيڪلوپيڊيا',
          ],
        },
        {
          id: 'book-bank',
          subtitle: 'شاگردياڻين جي ڀلائي ڊيسڪ',
          title: 'مفت بڪ بئنڪ سهولت',
          description:
            'يارهين، ٻارهين ۽ ايسوسيئيٽ ڊگري جي حقدار ۽ ذهين شاگردياڻين لاءِ سڄي سال جا نصابي ڪتاب مفت جاري ڪيا وڃن ٿا.',
          highlights: [
            'سنڌ ٽيڪسٽ بڪ بورڊ جا مڪمل ڪورس سيٽ مفت دستياب',
            'داخلا سلپ ذريعي آسان جاري ڪرڻ',
            'ڪامرس ۽ اڪائونٽنگ جو خاص شيلف',
          ],
        },
        {
          id: 'sindh-literature',
          subtitle: 'علائقائي ادبي ورثو',
          title: 'سنڌي، اردو ۽ اسلامي آرڪائيو',
          description:
            'ڪلاسيڪي ادبي شاهڪار، سنڌيالاجي ڪتاب، پاڪستان اسٽڊيز ۽ تفسير و حديث جا مستند جلد.',
          highlights: [
            'سنڌي ادبي بورڊ ۽ اردو ڪلاسيڪي مجموعا',
            'سيرت النبي ﷺ ۽ اسلامي تاريخ جو ذخيرو',
            'تقرير ۽ تحقيقي مضمونن جي تياري جو ڪنڊو',
          ],
        },
      ],
      guidelines: [
        'ڪتاب جاري ڪرائڻ لاءِ ڪاليج جو صحيح اسٽوڊنٽ آءِ ڊي ڪارڊ گڏ آڻيو.',
        'انٽرميڊيٽ شاگردياڻيون 14 ڏينهن لاءِ 2 ڪتاب ۽ BS/ADP شاگردياڻيون 4 ڪتاب وٺي سگهن ٿيون.',
        'ريڊنگ هال اندر مڪمل خاموشي رکو ۽ موبائيل فون سائلنٽ موڊ تي رکو.',
        'مفت بڪ بئنڪ جا ڪتاب سيشن جي شروعات ۾ ڏنا وڃن ٿا ۽ سالياني امتحانن کانپوءِ واپس ورتا وڃن ٿا.',
      ],
    },
    labs: {
      title: 'ڪاليج ليبارٽريون ۽ پريڪٽيڪل ونگز',
      subtitle:
        'فزڪس، ڪمپيوٽر سائنس، ڪيميسٽري، زولوجي، باٽني ۽ نفسيات لاءِ مخصوص تجرباگاهون—بورڊ ۽ يونيورسٽي پريڪٽيڪلز لاءِ مڪمل سهولتون.',
      allLabsTab: 'سڀ ليبارٽريون',
      labPhotosLabel: 'ليب تصويرون',
      viewBtn: 'ڏسو',
    },
    digitalLibrary: {
      title: 'نصابي ڪتابن جون تصويرون ۽ سرڪاري لنڪس',
      subtitle:
        'سنڌ ٽيڪسٽ بڪ بورڊ اي-بڪس، تعليمي بورڊ حيدرآباد جي نصاب ۽ سنڌ يونيورسٽي / HEC ڊگري ڪورسز جا سڌا آن لائن لنڪس.',
      allTab: 'سڀ نصابي ڪتاب',
      interTab: 'انٽرميڊيٽ (يارهين ۽ ٻارهين)',
      degreeTab: 'BS زولوجي ۽ ايسوسيئيٽ ڊگريون',
    },
    alumnae: {
      title: 'ممتاز اڳوڻيون شاگردياڻيون',
      subtitle:
        'گورنمينٽ گرلز زبيده ڪاليج حيدرآباد جي انهن ناليوارين گريجوئيٽس کي خراجِ تحسين جن سنڌي ۽ اردو ادب، اعليٰ تعليم، نشريات ۽ پارلياماني قيادت ۾ تاريخ رقم ڪئي.',
      allTab: 'سڀ ممتاز اڳوڻيون شاگردياڻيون',
      categoryLabels: {
        publicService: 'پبلڪ سروس ۽ ميڊيا',
        lawEnforcement: 'قانون، انتظاميه ۽ حق',
        academia: 'تعليم ۽ ادب',
        poetry: 'شاعري ۽ انساني حق',
      },
      attendanceLabel: 'تصديق ٿيل ڪاليج رڪارڊ',
      bioBtn: 'سوانح ۽ ڪاميابيون',
      profileLink: 'پروفائيل',
      closeProfile: 'پروفائيل بند ڪريو',
      biographyHeading: 'سوانح حيات ۽ نمايان خدمتون:',
      highlightsHeading: 'اهم سنگِ ميل ۽ عوامي خدمتون:',
      legacyHeading: 'قومي اعتراف ۽ علمي ورثو:',
      metrics: [
        {
          value: '1953–2026',
          label: 'علمي برتري جا 7 ڏهاڪا',
          sub: 'حيدرآباد ۽ سنڌ ۾ تعليم يافته عورتن جي نسلن جي تعمير',
        },
        {
          value: 'ستاره ۽ تمغو',
          label: 'قومي سول اعزاز',
          sub: 'ستاره امتياز ۽ پرائيڊ آف پرفارمنس ماڻيندڙ اڳوڻيون شاگردياڻيون',
        },
        {
          value: 'پارليامينٽ ۽ UN',
          label: 'پاليسي سازي ۽ سفارتڪاري',
          sub: 'اسيمبلين، وزارتن ۽ عالمي ادارن ۾ خدمتون سرانجام ڏيندڙ گريجوئيٽس',
        },
        {
          value: 'ميڊيڪل ۽ ٽيڪنالاجي',
          label: 'سائنس ۽ اعليٰ تحقيق',
          sub: 'وائيس چانسلرز، پروفيسرز ۽ ممتاز سائنسي محقق',
        },
      ],
    },
    cemis: {
      eyebrow: 'ڪاليج ايجوڪيشن کاتو · حڪومتِ سنڌ',
      title: 'CEMIS بائيوميٽرڪ حاضري ۽ فيڪلٽي ايپ',
      subtitleBefore: 'سنڌ جي سرڪاري ڪاليج ليڪچررز لاءِ بائيوميٽرک حاضري جو نظام',
      subtitleBold: 'CEMIS (ڪاليج ايجوڪيشن مئنيجمينٽ انفارميشن سسٽم)',
      subtitleAfter: 'سان جڙيل آهي—جيڪو سنڌ حڪومت جي ڪاليج ايجوڪيشن کاتي جو سرڪاري ڊجيٽل پليٽ فارم آهي.',
      cardEyebrow: 'ڪاليج ايجوڪيشن کاتي جي آفيشل ايپ',
      cardTitle: 'CEMIS – ڪاليج ايجوڪيشن',
      cardSub: 'حڪومتِ سنڌ · ڪاليج ايجوڪيشن کاتو',
      featuresHeading: 'حاضري ۽ HR جون اهم سهولتون:',
      features: [
        'GPS ۽ سيلفي تصديق ذريعي بائيوميٽرڪ حاضري',
        'روزاني چيڪ-ان ۽ چيڪ-آئوٽ جو رڪارڊ',
        'مڪمل ذاتي حاضري تاريخ جي نگراني',
        'موڪل ۽ بدلي جون ڊجيٽل درخواستون',
      ],
      playBtn: 'گوگل پلي تان CEMIS ڊائون لوڊ ڪريو',
      portalBtn: 'CED / DGCS سنڌ پورٽل',
    },
    gallery: {
      title: 'زبيده ڪاليج ۾ تعليمي زندگي',
      subtitle:
        'اسان جي تاريخي ڪيمپس، پوزيشن هولڈر شاگردياڻين، قيادت جي خطابن ۽ ڪاليج سرگرمين جي تصويري جھلڪ.',
      allTab: 'سڀ تصويرون',
      honorsTab: 'بورڊ اعزاز ۽ نتيجا',
      campusTab: 'ڪيمپس ۽ ڪاليج نشان',
      facultyTab: 'قيادت ۽ اسيمبليون',
      photosSingular: 'تصوير',
      photosPlural: 'تصويرون',
      slow: 'آهستي',
      normal: 'عام',
      fast: 'تيز',
      viewFull: 'مڪمل تصوير ڏسو',
      hoverHint: 'اسڪرولنگ روڪڻ لاءِ ڪنهن به تصوير تي مائوس رکو يا وڏي ڏسڻ لاءِ ڪلڪ ڪريو.',
      pausedLabel: 'اسڪرولنگ رڪيل آهي',
      pausedHoverLabel: 'مائوس رکڻ تي رڪيل آهي',
      autoScrollLabel: 'خودڪار اسڪرولنگ',
      modalEyebrow: 'گورنمينٽ گرلز زبيده ڪاليج گئلري',
      closeView: 'بند ڪريو',
      categoryLabels: {
        campus: 'ڪيمپس',
        honors: 'بورڊ اعزاز',
        academics: 'تعليم',
        faculty: 'قيادت',
      },
    },
    community: {
      headingBefore: 'اسان جي',
      headingHighlight: 'لائيو فيسبڪ فيڊ سان جڙو',
      subtitle:
        'روزاني ڪيمپس سرگرمين، تقريبن، امتحاني شيڊول، بورڊ اعزازن ۽ هنگامي موڪلن جا سرڪاري اعلان سڌو ڪاليج جي فيسبڪ پيج تان حاصل ڪريو.',
      channelTitle: 'گورنمينٽ گرلز زبيده ڪاليج حيدرآباد',
      channelSub: 'آفيشل پيج · سرگرم ڪميونٽي',
      channelDesc: 'تڪڙن اعلانن، موڪلن جي اطلاع ۽ شاگردياڻين جي رهنمائي لاءِ ڪاليج انتظاميه جي نگراني هيٺ.',
      openFbBtn: 'آفيشل فيسبڪ پيج کوليو ↗',
      viewEventsBtn: '2026 لائيو ايونٽ ٽريڪر ڏسو',
      feat1: 'لائيو تقريبون ۽ ڪانووڪيشن نشريات',
      feat2: 'شاگردياڻين لاءِ تڪڙا نوٽيس',
      feedTitle: 'فيسبڪ لائيو فيڊ',
      tabs: {
        timeline: 'لائيو پلگ ان',
        recent: 'تازا پوسٽس',
        live: 'لائيو ويڊيو',
      },
      connectedLabel: 'آفيشل فيسبڪ ٽائيم لائين سان جڙيل',
      reloadBtn: 'ٻيهر لوڊ ڪريو',
      cookieHint: 'جيڪڏهن برائوزر ۾ ٽائيم لائين نظر نه اچي ته مٿان "تازا پوسٽس" تي ڪلڪ ڪريو يا سڌو فيسبڪ کوليو:',
      openDirectBtn: 'فيسبڪ تي زبيده ڪاليج کوليو ↗',
      commentsLabel: 'راءِ',
      viewOnFb: 'فيسبڪ تي ڏسو ↗',
      liveNoticeTitle: 'فيسبڪ لائيو براڊڪاسٽ هب',
      liveNoticeDesc: 'جڏهن ڪاليج جي ڪا تقريب يا اسيمبلي لائيو ٿيندي ته توهان هتي سڌو ڏسي سگهندا.',
    },
  },
};

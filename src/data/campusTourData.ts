export interface FacilityHotspot {
  id: string;
  label: string;
  description: string;
  xPercent: number; // 0-100% position on container
  yPercent: number;
}

export type DirectionTurn =
  | 'Entry Gate'
  | 'Straight Ahead'
  | 'Turn Left'
  | 'Turn Right'
  | 'Bear Left'
  | 'Bear Right'
  | 'Upstairs (1st Floor)';

export interface GateDirections {
  turn: DirectionTurn;
  distanceFromGate: string;
  walkingSteps: string[];
  routePath: { x: number; y: number }[];
}

export interface TourFacility {
  id: string;
  name: string;
  shortName?: string;
  subtitle: string;
  category: 'Administration' | 'Academics' | 'Laboratories' | 'Library' | 'Student Life';
  stopNumber: string;
  imageSrc?: string;
  svgType:
    | 'principal-office'
    | 'library'
    | 'computer-lab'
    | 'science-lab'
    | 'auditorium'
    | 'courtyard'
    | 'sports'
    | 'multimedia-room'
    | 'academic-wing';
  badge: string;
  description: string;
  keySpecs: { label: string; value: string }[];
  highlights: string[];
  hotspots: FacilityHotspot[];
  locationNote: string;
  mapX: number; // 0-100% horizontal coordinate on campus map
  mapY: number; // 0-100% vertical coordinate on campus map (91 = Main Gate, 8 = North Back Campus)
  gateDirections: GateDirections;
  isCustom?: boolean;
}

export const GATE_COORDS = { x: 50, y: 95.1 };

export interface SimulationCheckpoint {
  progress: number; // 0 to 1
  label: string;
  leftView: string;
  aheadView: string;
  rightView: string;
}

export const GATE_TO_PRINCIPAL_CHECKPOINTS: SimulationCheckpoint[] = [
  {
    progress: 0,
    label: 'Entering Main College Gate (Golden Boundary Wall)',
    leftView: 'Security Post & Waiting Room (Entrance Left)',
    aheadView: 'Gate Security Guards & Straight Twin-Grill Walkway North',
    rightView: 'Canteen & Central Library Right · Central Jail & Jammers Outside Golden Boundary'
  },
  {
    progress: 0.30,
    label: 'Passing Canteen & Central Library (Walking Distance) → Big Clerk Corridor Ahead',
    leftView: 'Waiting Room Courtyard & West Garden Lawn',
    aheadView: 'Big Clerk Office & Corridor straight ahead BEFORE Garden & Gardeners',
    rightView: 'Canteen & Central Library passed · Big Clerk Office Corridor on right before Garden'
  },
  {
    progress: 0.56,
    label: 'Big Clerk Office Corridor on Right (Before Garden & Gardeners)',
    leftView: 'West Garden Lawn & Central Courtyard ahead',
    aheadView: 'Garden & Gardeners & Principal’s Office / Auditorium line ahead',
    rightView: 'Big Clerk Office Corridor on right directly BEFORE Garden & Gardeners'
  },
  {
    progress: 0.80,
    label: 'Passing Garden & Gardeners Toward Principal’s Office, Enlarged 1st Fl & Separate Auditorium Way',
    leftView: 'Central Courtyard, Small Garden & Left 2-Grill Path · Tennis & Volleyball Left of Pak Studies',
    aheadView: 'Straight North via Central Passage (Between Karate Club & Flag Hoisting Ground) ↑ → Very Big Ground (Old Bus, Car Parking Area, Sports Gymnasium) → Long Walking Distance → Garden → Economics, Sindhi, Physiology, Psychology, Geography & General Staff Room (For Arts)',
    rightView: 'Garden & Gardeners · Principal’s Office → Stairs (↑ Enlarged 1st Fl: Islamiat, Muslim History, Pol. Science, English, Largest Physics Lab/Office/Dark Room, Statistics) → Separate Way to Corner Auditorium Hall (Outside Chemistry) & Chemistry Wing'
  },
  {
    progress: 1,
    label: 'Arrived at Grand Golden Principal’s Office (Separate Way to Auditorium & Chemistry Wing on Right)',
    leftView: 'Central Courtyard, Small Garden & Computer Lab beyond Twin Grill',
    aheadView: 'Central North Passage ↑ → Very Big Ground (Old Bus, Car Parking Area, Sports Gymnasium) → Long Walking Distance → Garden → Economics, Sindhi, Physiology, Psychology, Geography, Classes & General Staff Room (For Arts)',
    rightView: 'Stairs (↑ Enlarged 1st Fl with Physics Largest) → Separate Auditorium Way (Outside Chemistry) ↑ → In Line: Chemistry Office, Lab 1 & Lab 2'
  }
];

export const CAMPUS_TOUR_STOPS: TourFacility[] = [
  {
    id: 'historic-gateway',
    name: 'Main College Gate & Security Post',
    shortName: 'Main Gate',
    subtitle: 'Visitor Entry Point · Security Guards · Waiting Room (Left) · Canteen (Right)',
    category: 'Administration',
    stopNumber: '01',
    imageSrc: '/assets/college/campus_86930cb8.jpg',
    svgType: 'courtyard',
    badge: 'Entry Point · Estd 1953',
    description:
      'Enter Government Girls Zubaida College through the Security-monitored 1953 Main Gate inside the Golden Boundary Wall on Pathan Colony Road. Immediately on your left is the Waiting Room and on your right is the College Canteen with the Central Library directly on the right of the Canteen (outside the golden wall sits Central Jail & Signal Jammers). Walking straight along the twin grill paths across the walking distance brings you first to the Big Clerk Office Corridor, and then to the Garden & Gardeners right before Principal’s Office & Auditorium Hall.',
    keySpecs: [
      { label: 'Security', value: '24/7 Gate Guards' },
      { label: 'Entrance Left', value: 'Waiting Room' },
      { label: 'Entrance Right', value: 'Canteen → Central Library' },
      { label: 'Straight Path', value: 'Big Clerk Corridor → Garden' }
    ],
    highlights: [
      'Gate Security Cabin & uniformed security guards stationed inside the Golden Boundary Wall',
      'First on your left upon entering: Visitor Waiting Room',
      'On your right at entrance: Canteen & Central Library; walking straight reaches Big Clerk Office Corridor BEFORE Garden & Gardeners'
    ],
    hotspots: [
      {
        id: 'gate-security',
        label: 'Gate Security Post',
        description: 'Trained campus security guards stationed right at the entrance gate.',
        xPercent: 25,
        yPercent: 72
      },
      {
        id: 'arch',
        label: 'Historic Archway',
        description: 'The iconic 1953 wrought-iron archway welcoming students and visitors.',
        xPercent: 50,
        yPercent: 22
      },
      {
        id: 'canteen-right',
        label: 'Canteen & Central Library (Right)',
        description: 'Located on your right inside the golden boundary when entering the gate.',
        xPercent: 80,
        yPercent: 78
      }
    ],
    locationNote: 'South Boundary · Pathan Colony Road (Security Gate)',
    mapX: 50,
    mapY: 95.1,
    gateDirections: {
      turn: 'Entry Gate',
      distanceFromGate: '0 m (Start Point)',
      walkingSteps: [
        'Enter through the Security-monitored Main Gate inside the Golden Boundary Wall (Waiting Room on left, Canteen & Central Library on right).',
        'Walk straight north along the twin grill path across the walking distance to Big Clerk Office Corridor and Garden & Gardeners.',
        'Pass Principal’s Office (with Chemistry Office, Chemistry Lab 1 & Chemistry Lab 2 in line on its right), continue straight North ↑ between Karate Club and Flag Hoisting Ground into Very Big Ground (Old Bus, Car Parking Area, Sports Gymnasium) → Long Walking Distance → Garden → Economics, Sindhi, Physiology, Psychology, Geography & General Staff Room (For Arts).'
      ],
      routePath: [{ x: 50, y: 95.1 }]
    }
  },
  {
    id: 'waiting-room',
    name: 'Visitor Waiting Room & Entrance Reception',
    shortName: 'Waiting Room',
    subtitle: 'First Stop on the Left Immediately Upon Entering the Main Gate',
    category: 'Administration',
    stopNumber: '02',
    svgType: 'courtyard',
    badge: 'Entrance Left · Visitor Lounge',
    description:
      'Immediately on the left side as visitors enter the Main College Gate sits the Waiting Room, providing shaded comfortable seating for parents, guardians, and guests alongside campus notices and guidance.',
    keySpecs: [
      { label: 'Position', value: 'Entrance Left' },
      { label: 'Distance', value: '14 Meters Left' },
      { label: 'Opposite Side', value: 'College Canteen' },
      { label: 'Purpose', value: 'Parent & Guest Seating' }
    ],
    highlights: [
      'First room on your left side right after entering the Security Gate',
      'Dedicated reception seating and campus notice boards for parents and visitors',
      'Directly opposite the College Canteen across the entrance courtyard'
    ],
    hotspots: [
      {
        id: 'waiting-seating',
        label: 'Parent Waiting Lounge',
        description: 'Shaded indoor-outdoor seating for visiting parents and guardians.',
        xPercent: 45,
        yPercent: 52
      },
      {
        id: 'notice-display',
        label: 'Entrance Notice Display',
        description: 'Daily college circulars, timetables, and admission notices.',
        xPercent: 72,
        yPercent: 40
      }
    ],
    locationNote: 'Entrance Courtyard · First Room on Left',
    mapX: 22.0,
    mapY: 90.7,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '14 m Left',
      walkingSteps: [
        'Enter through the Security-monitored Main Gate.',
        'Turn left immediately upon entering.',
        'First comes the Visitor Waiting Room on your left.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 90.7 },
        { x: 22.0, y: 90.7 }
      ]
    }
  },
  {
    id: 'college-canteen',
    name: 'College Canteen',
    shortName: 'Canteen',
    subtitle: 'On Your Right Entering Main Gate · Central Library Immediately to Its Right',
    category: 'Student Life',
    stopNumber: '03',
    svgType: 'courtyard',
    badge: 'Entrance Right · Library Next Right',
    description:
      'When a visitor enters through the Main Gate, the College Canteen stands immediately on the right side—serving snacks, tea, and cool water—with the Central College Library positioned directly to its right inside the Golden College Boundary.',
    keySpecs: [
      { label: 'Direction', value: 'Entrance Right' },
      { label: 'On Its Right', value: 'Central Library' },
      { label: 'Walk Time', value: '12 Meters Right' },
      { label: 'Services', value: 'Snacks & Cool Water' }
    ],
    highlights: [
      'Located immediately on your right upon entering the Main Gate',
      'Central College Library sits directly on the right side of the Canteen inside the Golden Boundary',
      'Walking straight past Canteen leads across the walking distance to the Big Clerk Office Corridor before the Garden'
    ],
    hotspots: [
      {
        id: 'canteen-counter',
        label: 'Refreshments Counter',
        description: 'Student snack and tea counter on the right side after the gate.',
        xPercent: 38,
        yPercent: 54
      },
      {
        id: 'canteen-seating',
        label: 'Shaded Seating Area',
        description: 'Clean shaded seating benches for break times.',
        xPercent: 70,
        yPercent: 58
      }
    ],
    locationNote: 'Entrance Right · Central Library Directly on Its Right',
    mapX: 58.3,
    mapY: 90.7,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '12 m Right',
      walkingSteps: [
        'Enter through the Main College Gate.',
        'Turn right immediately inside the Golden College Boundary.',
        'The College Canteen sits on your right (with Central Library directly on its right).'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 90.7 },
        { x: 58.3, y: 90.7 }
      ]
    }
  },
  {
    id: 'clerk-office',
    name: 'Big Clerk Office & Corridor',
    shortName: 'Clerk Office',
    subtitle: 'Big Clerk Office Corridor Before Garden & Gardeners · Straight Past Walking Distance',
    category: 'Administration',
    stopNumber: '04',
    svgType: 'principal-office',
    badge: 'Big Corridor · Before Garden',
    description:
      'Walking straight along the twin-grill path past the Canteen and across the extended walking distance brings you first into the spacious Big Clerk Office & Big Clerk Office Corridor on the right—situated directly BEFORE the lush Garden & Gardeners that lead up to Principal’s Office & Chemistry Office and Lab.',
    keySpecs: [
      { label: 'Corridor', value: 'Big Clerk Office Corridor' },
      { label: 'Approach', value: 'Before Garden (Past Walking Distance)' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' },
      { label: 'Services', value: 'Records & Verification' }
    ],
    highlights: [
      'Wide colonnaded Big Clerk Office Corridor encountered immediately past the walking distance from Canteen',
      'Positioned on the right directly BEFORE the Garden & Gardeners and Principal’s Office line',
      'Handles admissions, student certificates, BISE verification & academic archives'
    ],
    hotspots: [
      {
        id: 'clerk-counter',
        label: 'Student Records Windows',
        description: 'Bonafide certificates, marksheet verification, and admission counters along the corridor.',
        xPercent: 36,
        yPercent: 52
      },
      {
        id: 'clerk-archive',
        label: 'Big Clerk Office Corridor Gallery',
        description: 'Covered veranda corridor positioned before Garden & Gardeners leading up to Principal’s Office.',
        xPercent: 72,
        yPercent: 68
      }
    ],
    locationNote: 'Before Garden · Right of Corridor Past Walking Distance',
    mapX: 67.8,
    mapY: 75.7,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '32 m Straight · Before Garden',
      walkingSteps: [
        'Enter Main Gate (Canteen & Central Library on your right) and walk across the walking distance.',
        'Turn right immediately into the Big Clerk Office Corridor (located directly before Garden & Gardeners).',
        'Access Student Records & Admissions Windows inside the Big Clerk Office.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 79.1 },
        { x: 67.8, y: 79.1 },
        { x: 67.8, y: 75.7 }
      ]
    }
  },
  {
    id: 'central-library',
    name: 'Central College Library & Reading Wing',
    shortName: 'Central Library',
    subtitle: 'Directly on the Right of College Canteen Inside Golden Boundary · 15,000+ Books',
    category: 'Library',
    stopNumber: '05',
    svgType: 'library',
    badge: 'Right of Canteen · 15,000+ Books',
    description:
      'Located directly on the right side of the College Canteen inside the Golden Boundary Wall (just inside from Central Jail & Signal Jammers outside), the Central College Library houses over 15,000 books, the free Book Bank, and 120 silent reading seats.',
    keySpecs: [
      { label: 'Position', value: 'Right of Canteen' },
      { label: 'Book Capacity', value: '15,000+ Volumes' },
      { label: 'Reading Seats', value: '120 Students' },
      { label: 'Lending Scheme', value: 'Free Book Bank' }
    ],
    highlights: [
      'Positioned directly on the right side of the College Canteen inside the Golden Boundary',
      'Free Government Book Bank lending scheme for enrolled students',
      'Quiet reading hall for Pre-Medical, Engineering, Commerce, Arts & BS programs'
    ],
    hotspots: [
      {
        id: 'stacks',
        label: 'Main Book Stacks',
        description: 'Open-access shelves organized by subject discipline.',
        xPercent: 32,
        yPercent: 40
      },
      {
        id: 'reading-tables',
        label: 'Silent Study Desks',
        description: 'Daylit study desks accommodating 120 students.',
        xPercent: 68,
        yPercent: 65
      },
      {
        id: 'desk',
        label: "Librarian's Issue Desk",
        description: 'Library membership cards and textbook lending counter.',
        xPercent: 18,
        yPercent: 60
      }
    ],
    locationNote: 'Right of Canteen Inside Golden Wall',
    mapX: 71.2,
    mapY: 90.7,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '24 m Right (Past Canteen)',
      walkingSteps: [
        'Enter the Main Gate and turn right inside the Golden Boundary Wall.',
        'Pass immediately past the College Canteen on your right.',
        'Enter the Central College Library directly on the right of the Canteen.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 90.7 },
        { x: 71.2, y: 90.7 }
      ]
    }
  },
  {
    id: 'grill-divided-walkway',
    name: 'Garden (After Clerk) & Twin Grill Paths',
    shortName: 'Garden & Twin Grill',
    subtitle: 'Garden & Gardeners After Big Clerk Office Corridor · Before Principal’s Office',
    category: 'Student Life',
    stopNumber: '06',
    svgType: 'courtyard',
    badge: 'After Clerk Office · Right of Corridor',
    description:
      'Along the central twin paths divided by a small iron grill, passing past the Big Clerk Office Corridor brings you to the lush green Garden tended by college gardeners on the right side—situated directly AFTER Big Clerk Office and right before Principal’s Office & Stairs.',
    keySpecs: [
      { label: 'Garden Spot', value: 'After Big Clerk Office' },
      { label: 'Pathway', value: 'Two Grill-Divided Paths' },
      { label: 'Care Staff', value: 'Campus Gardeners' },
      { label: 'Next Ahead', value: 'Principal’s Office & Stairs' }
    ],
    highlights: [
      'Expansive Garden tended by college gardeners appears AFTER the Big Clerk Office Corridor',
      'Two clean parallel walkways separated by a small central iron grill',
      'Leads directly up to Principal’s Office, Stairs & Auditorium Hall'
    ],
    hotspots: [
      {
        id: 'small-grill',
        label: 'Small Center Grill Divider',
        description: 'Low iron grill separating the twin central walkways.',
        xPercent: 50,
        yPercent: 52
      },
      {
        id: 'big-lawn-gardeners',
        label: 'Garden & Gardeners (After Clerk)',
        description: 'Expansive green lawn, shaded trees, and flowerbeds tended by gardeners after Clerk Office.',
        xPercent: 75,
        yPercent: 55
      }
    ],
    locationNote: 'Central Spine · Garden on Right After Big Clerk Office Corridor',
    mapX: 50.0,
    mapY: 69.3,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '46 m Straight · After Clerk Office',
      walkingSteps: [
        'Enter Main Gate (Security) with Canteen & Central Library on right and Waiting Room on left.',
        'Walk straight along the twin paths separated by the small grill past the walking distance and Big Clerk Office Corridor.',
        'Reach the lush Garden & Gardeners on your right directly AFTER Big Clerk Office Corridor.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 69.3 }
      ]
    }
  },
  {
    id: 'auditorium-hall',
    name: 'College Auditorium Hall (East Corner)',
    shortName: 'Auditorium Hall',
    subtitle: 'East Corner Landmark · Reached via Separate Corridor from Principal’s Office Outside Chemistry',
    category: 'Student Life',
    stopNumber: '07',
    svgType: 'auditorium',
    badge: 'Corner Auditorium · Separate Way',
    description:
      'Positioned prominently in the far-right East Corner inside the Golden Boundary Wall (above Chemistry Lab 2 and beside the enlarged By-Stairs 1st-Floor wing), the College Auditorium Hall has its own separate corridor running east from Principal’s Office completely outside the Chemistry Wing.',
    keySpecs: [
      { label: 'Seating', value: '600+ Attendees' },
      { label: 'Position', value: 'East Corner (Above Chem Wing)' },
      { label: 'Direct Access', value: 'Separate Way (Outside Chemistry)' },
      { label: 'Neighbor', value: 'Enlarged 1st-Floor & Dark Room' }
    ],
    highlights: [
      'Positioned cleanly in the East Corner right beside the enlarged 1st-Floor wing',
      'Served by a separate corridor from Principal’s Office that stays outside Chemistry Office, Lab 1 & Lab 2',
      'Spacious ceremonial hall for convocation, debates, and academic gatherings'
    ],
    hotspots: [
      {
        id: 'podium',
        label: "Principal's Podium",
        description: 'Formal ceremonial stage lectern connected via the separate Principal’s Office corridor.',
        xPercent: 50,
        yPercent: 35
      },
      {
        id: 'seating',
        label: 'Auditorium Seating',
        description: 'Accommodates 600+ students, faculty, and parents.',
        xPercent: 30,
        yPercent: 72
      }
    ],
    locationNote: 'East Corner · Separate Corridor from Principal’s Office (Outside Chemistry)',
    mapX: 92.2,
    mapY: 49.1,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '86 m · East Corner Hall',
      walkingSteps: [
        'Walk straight along the twin grill paths past Big Clerk Office Corridor and the Garden to Principal’s Office.',
        'At the split junction past Stairs, turn onto the Separate Auditorium Way running along the outer passage above Chemistry (never entering inside Chemistry Wing).',
        'Continue straight east along the separate corridor and turn up into the Corner Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 56.8, y: 62.0 },
        { x: 68.1, y: 62.0 },
        { x: 68.1, y: 56.9 },
        { x: 92.2, y: 56.9 },
        { x: 92.2, y: 49.1 }
      ]
    }
  },
  {
    id: 'principal-office',
    name: 'Principal’s Office & Executive Suite',
    shortName: 'Principal’s Office',
    subtitle: 'Grand Golden Landmark · Separate Way to Corner Auditorium (Outside Chem) & Chemistry Wing in Line Right',
    category: 'Administration',
    stopNumber: '08',
    svgType: 'principal-office',
    badge: 'Executive Suite · Chem in Line Right',
    description:
      'Walking straight past Big Clerk Office Corridor and the Garden & Gardeners brings you right into the prominent Golden Principal’s Office—the executive office of Principal Prof. Yasmeen Panhwar—with central Stairs up to the enlarged 1st-Floor wing (featuring Physics Largest, Islamiat, Muslim History, Political Science, English & Statistics before Dark Room), a separate corridor outside Chemistry to the Corner Auditorium Hall, and Chemistry Office, Lab 1 & Lab 2 straight in line on the right.',
    keySpecs: [
      { label: 'Principal', value: 'Prof. Yasmeen Panhwar' },
      { label: 'In Line Right', value: 'Chemistry Office, Lab 1 & Lab 2' },
      { label: 'By Stairs (1st Fl)', value: 'Largest Physics · English · Islamiat · Muslim Hist. · Pol. Sci. · Stats' },
      { label: 'East Corner', value: 'Separate Way to Corner Auditorium' }
    ],
    highlights: [
      'Positioned prominently right past Big Clerk Office Corridor and the Garden & Gardeners',
      'Separate corridor branches upward before Chemistry to reach the Corner Auditorium Hall outside Chemistry',
      'Chemistry Office, Chemistry Lab 1 & Chemistry Lab 2 continue straight in one line to the right'
    ],
    hotspots: [
      {
        id: 'principal-desk',
        label: 'Principal’s Executive Desk',
        description: 'Office of Prof. Yasmeen Panhwar guiding academic excellence.',
        xPercent: 50,
        yPercent: 42
      },
      {
        id: 'honor-roll-wall',
        label: '1953 Legacy & Merit Wall',
        description: 'Archival honor roll showcasing BISE toppers since 1953.',
        xPercent: 22,
        yPercent: 34
      }
    ],
    locationNote: 'Right Side · Separate Auditorium Way (Outside Chem) & Inline Chemistry Wing',
    mapX: 56.8,
    mapY: 62.0,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '68 m Straight · Right',
      walkingSteps: [
        'Enter Main Gate (Canteen & Central Library on your right) and walk straight past the walking distance.',
        'Pass Big Clerk Office Corridor and Garden & Gardeners on your right.',
        'Step into the grand Golden Principal’s Office, with Stairs, Separate Auditorium Way (outside Chemistry), and inline Chemistry Office / Lab 1 / Lab 2.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 69.3 },
        { x: 50, y: 62.0 },
        { x: 56.8, y: 62.0 }
      ]
    }
  },
  {
    id: 'general-staff-room',
    name: 'General Staff Room (By Stairs · 1st Floor)',
    shortName: 'General Staff Room',
    subtitle: 'By Stairs (1st Floor) · Beside English & Largest Physics Wing',
    category: 'Administration',
    stopNumber: '09',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Climbing the central Stairs beside Principal’s Office brings you up into the enlarged 1st-Floor wing housing General Staff Room, English, the expansive Physics Wing (Physics Lab, Physics Office & Dark Room), Statistics, Mathematics, Islamiat, Muslim History, and Political Science.',
    keySpecs: [
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Row Neighbors', value: 'English, Physics Lab & Physics Office' },
      { label: 'Upper Tier', value: 'Islamiat, Muslim History, Pol. Science' },
      { label: 'Purpose', value: 'Faculty Lounge Suite' }
    ],
    highlights: [
      'Positioned inside the enlarged 1st-Floor Building clearly accessed By Stairs',
      'Right beside English and the expansive Physics Wing',
      'Equipped with rooftop solar power for year-round faculty operations'
    ],
    hotspots: [
      {
        id: 'staff-lounge',
        label: 'Faculty Workstations',
        description: 'Faculty seating, timetable planning boards, and academic lockers.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Enlarged 1st Floor Building (By Stairs) · Beside English',
    mapX: 54.7,
    mapY: 51.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '74 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs up to the enlarged 1st Floor Building.',
        'Step left beside English into the General Staff Room.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 51.5 },
        { x: 54.7, y: 51.5 }
      ]
    }
  },
  {
    id: 'islamiat-english',
    name: 'Department of Islamiat & Islamic Culture (By Stairs · 1st Floor)',
    shortName: 'Islamiat & Culture',
    subtitle: 'By Stairs (1st Floor) · Enlarged Upper Tier Beside Muslim History & Political Science',
    category: 'Academics',
    stopNumber: '10',
    svgType: 'academic-wing',
    badge: 'By Stairs · Enlarged 1st Fl',
    description:
      'Enlarged in the upper tier of the By-Stairs 1st-Floor wing alongside Muslim History, Political Science, Mathematics, English, Statistics, and the largest Physics Wing, the Department of Islamiat & Islamic Culture hosts Quranic, Hadith, and Islamic heritage classes.',
    keySpecs: [
      { label: 'Department', value: 'Islamiat & Islamic Culture' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Next Doors', value: 'Muslim History & Political Science' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Enlarged hall inside the By-Stairs 1st-Floor Building',
      'Right beside Muslim History & Political Science above Staff Room & English',
      'Hosts annual Seerat-un-Nabi and Qirat academic seminars'
    ],
    hotspots: [
      {
        id: 'islamiat-room',
        label: 'Islamiat & Islamic Culture Hall',
        description: 'Dedicated enlarged 1st-floor lecture rooms for Islamic Studies & Culture.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · Beside Muslim History',
    mapX: 56.8,
    mapY: 45.4,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '78 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs up to the upper tier of the enlarged 1st Floor Building.',
        'Step into the enlarged Department of Islamiat beside Muslim History.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 45.4 },
        { x: 56.8, y: 45.4 }
      ]
    }
  },
  {
    id: 'english-dept',
    name: 'Department of English (By Stairs · 1st Floor)',
    shortName: 'English',
    subtitle: 'By Stairs (1st Floor) · Between General Staff Room & Largest Physics Wing',
    category: 'Academics',
    stopNumber: '11',
    svgType: 'academic-wing',
    badge: 'By Stairs · Enlarged 1st Fl',
    description:
      'Enlarged inside the By-Stairs 1st-Floor Building directly between General Staff Room and the expansive Physics Wing, the Department of English teaches composition, prose, poetry, and academic communication across HSC and Degree cohorts.',
    keySpecs: [
      { label: 'Department', value: 'English' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Neighbors', value: 'General Staff Room & Physics Lab' },
      { label: 'Focus', value: 'Literature & Rhetoric' }
    ],
    highlights: [
      'Enlarged English department room inside the By-Stairs 1st-Floor Building',
      'Direct access via the central Stairs above Principal’s Office',
      'Positioned cleanly between General Staff Room and the Physics Wing'
    ],
    hotspots: [
      {
        id: 'english-room',
        label: 'English Department Room',
        description: 'Dedicated room for English literature, prose, and academic composition.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · Between Staff Room & Physics Wing',
    mapX: 59.6,
    mapY: 49.4,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '74 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the Stairs.',
        'Climb the Stairs up to the enlarged 1st Floor Building.',
        'Enter English directly between General Staff Room and Physics Lab.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 51.5 },
        { x: 59.6, y: 51.5 },
        { x: 59.6, y: 49.4 }
      ]
    }
  },
  {
    id: 'statistics-mathematics',
    name: 'Department of Statistics (By Stairs · 1st Floor)',
    shortName: 'Statistics Dept.',
    subtitle: 'By Stairs (1st Floor) · Directly Before Physics Dark Room & Next to Physics Office',
    category: 'Academics',
    stopNumber: '12',
    svgType: 'academic-wing',
    badge: 'By Stairs · Before Dark Room',
    description:
      'Positioned inside the enlarged By-Stairs 1st-Floor Building—immediately BEFORE the Physics Optics Dark Room and right alongside Physics Office and Physics Lab—the Department of Statistics teaches probability, biostatistics, sampling theory, and quantitative data analysis.',
    keySpecs: [
      { label: 'Department', value: 'Statistics' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Position', value: 'Immediately Before Dark Room' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Enlarged Statistics room positioned right before the Optics Dark Room',
      'Stands directly beside Physics Office & Physics Lab in the 1st-floor row',
      'Covers applied probability, statistical inference, and quantitative analysis'
    ],
    hotspots: [
      {
        id: 'stats-room',
        label: 'Statistics Lecture Room',
        description: 'Dedicated 1st-floor room right before Dark Room for probability & data analysis.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · Directly Before Dark Room',
    mapX: 80.8,
    mapY: 49.4,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '80 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up to the enlarged 1st Floor Building.',
        'Walk past Physics Lab and Physics Office straight into Statistics (before Dark Room).'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 51.5 },
        { x: 80.8, y: 51.5 },
        { x: 80.8, y: 49.4 }
      ]
    }
  },
  {
    id: 'mathematics-dept',
    name: 'Department of Mathematics (By Stairs · 1st Floor)',
    shortName: 'Mathematics Dept.',
    subtitle: 'By Stairs (1st Floor) · Beside Political Science Above Physics, Statistics & Dark Room',
    category: 'Academics',
    stopNumber: '13',
    svgType: 'academic-wing',
    badge: 'By Stairs · Enlarged 1st Fl',
    description:
      'Enlarged in the upper tier of the By-Stairs 1st-Floor Building right beside Political Science (above Physics Office, Statistics & Dark Room) and next to the Corner Auditorium Hall, the Department of Mathematics conducts Pre-Engineering, ICS, and Associate Degree lectures.',
    keySpecs: [
      { label: 'Department', value: 'Mathematics' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Beside', value: 'Political Science & Corner Auditorium' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned inside the enlarged By-Stairs 1st-Floor Building beside Political Science',
      'Directly above Statistics & Optics Dark Room',
      'Prepares students for BISE Engineering honors and university STEM degrees'
    ],
    hotspots: [
      {
        id: 'math-room',
        label: 'Mathematics Classrooms',
        description: 'Pure & applied mathematics classrooms in the enlarged 1st-floor upper tier.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · Beside Political Science',
    mapX: 82.7,
    mapY: 45.4,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '82 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up to the upper tier of the enlarged 1st Floor Building.',
        'Walk past Muslim History and Political Science into Mathematics.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 45.4 },
        { x: 82.7, y: 45.4 }
      ]
    }
  },
  {
    id: 'physics-lab-darkroom',
    name: 'Physics Lab & Main Physics Department (Largest Wing)',
    shortName: 'Physics Lab (Largest)',
    subtitle: 'Largest Campus Department · Physics Lab, Physics Office & Optics Dark Room',
    category: 'Laboratories',
    stopNumber: '14',
    svgType: 'science-lab',
    badge: 'Largest Dept. · Physics Featured',
    description:
      'Spanning the largest departmental footprint in the entire By-Stairs 1st-Floor wing, the Physics Lab & Physics Wing features extra-wide mechanics, electricity, and optics practical benches connected directly with the adjacent Physics Office, Statistics (before Dark Room), and Physics Optics Dark Room.',
    keySpecs: [
      { label: 'Scale', value: 'Largest Department in Wing' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Sections', value: 'Physics Lab · Physics Office · Dark Room' },
      { label: 'Neighbors', value: 'English (Left) · Statistics & Dark Room (Right)' }
    ],
    highlights: [
      'Largest single departmental showcase on the 1st-Floor campus map',
      'Extra-wide Physics Practical Lab with electrical bridges, mechanics, and laser/prism optics benches',
      'Seamlessly paired with adjacent Physics Office and Optics Dark Room'
    ],
    hotspots: [
      {
        id: 'physics-lab-bench',
        label: 'Physics Practical Hall',
        description: 'Expansive electrical bridges, pendulums, and mechanics apparatus hall.',
        xPercent: 30,
        yPercent: 52
      },
      {
        id: 'physics-office-room',
        label: 'Physics Office',
        description: 'Physics department faculty office & apparatus store beside Physics Lab.',
        xPercent: 60,
        yPercent: 52
      },
      {
        id: 'optics-dark-room',
        label: 'Physics Optics Dark Room',
        description: 'Light-controlled chamber right after Statistics Dept. for optical bench & prism practicals.',
        xPercent: 85,
        yPercent: 52
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · Largest Wing (Physics Lab)',
    mapX: 67.8,
    mapY: 51.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '76 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up into the enlarged 1st Floor Building.',
        'Step past General Staff Room and English straight into the largest Physics Lab.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 51.5 },
        { x: 67.8, y: 51.5 }
      ]
    }
  },
  {
    id: 'prayer-room-wing',
    name: 'Campus Prayer Room (Namaz Hall)',
    shortName: 'Prayer Room',
    subtitle: 'Between Commerce Department & Flag Hoisting Ground · Right Beside Greenhouse & Karate Club',
    category: 'Student Life',
    stopNumber: '15',
    svgType: 'courtyard',
    badge: 'Between Commerce & Flag Ground',
    description:
      'Located peacefully between the Commerce / Computer Building and the Flag Hoisting Ground—right alongside the Botanical Greenhouse and Karate Club—the Campus Prayer Room (Namaz Hall) offers a serene, clean, and ventilated space for daily prayers and quiet reflection for students and faculty.',
    keySpecs: [
      { label: 'Facility', value: 'Prayer Room (Namaz Hall)' },
      { label: 'West Neighbor', value: 'Commerce Dept. & Stairs' },
      { label: 'East Neighbor', value: 'Greenhouse & Karate Club' },
      { label: 'Access', value: 'Central Spine North' }
    ],
    highlights: [
      'Positioned cleanly between the Commerce Building and Flag Hoisting Ground',
      'Adjacent to the Botanical Greenhouse and Karate Club along the central north promenade',
      'Clean prayer mats, ablution access, and peaceful atmosphere for students and staff'
    ],
    hotspots: [
      {
        id: 'prayer-hall-main',
        label: 'Prayer Hall (Namaz Area)',
        description: 'Quiet indoor prayer hall between Commerce and Flag Hoisting Ground.',
        xPercent: 50,
        yPercent: 52
      }
    ],
    locationNote: 'Between Commerce & Flag Hoisting Ground · West Side Beside Greenhouse',
    mapX: 44.4,
    mapY: 38.4,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '80 m North · Between Commerce & Flag Ground',
      walkingSteps: [
        'Walk straight north along the twin grill spine past Principal’s Office line.',
        'At the front promenade just right of Commerce Stairs, enter the Campus Prayer Room (next to Greenhouse & Karate Club).'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 44.4, y: 41.8 },
        { x: 44.4, y: 38.4 }
      ]
    }
  },
  {
    id: 'botanical-greenhouse',
    name: 'Botanical Greenhouse Nursery',
    shortName: 'Greenhouse',
    subtitle: 'Between Commerce & Flag Hoisting Ground · Between Prayer Room & Karate Club',
    category: 'Student Life',
    stopNumber: '16',
    svgType: 'courtyard',
    badge: 'Between Commerce & Flag Ground',
    description:
      'Sitting cleanly between the Campus Prayer Room and Karate Club—directly between the Commerce Building and Flag Hoisting Ground—the Botanical Greenhouse cultivates flowering ornamentals, medicinal herbs, and live practical flora used by Botany and Pre-Medical cohorts.',
    keySpecs: [
      { label: 'Facility', value: 'Botanical Greenhouse' },
      { label: 'Left Side', value: 'Prayer Room & Commerce' },
      { label: 'Right Side', value: 'Karate Club & Flag Hoisting Ground' },
      { label: 'Purpose', value: 'Live Flora & Nursery Care' }
    ],
    highlights: [
      'Arched glass-and-shade greenhouse positioned between Prayer Room and Karate Club',
      'Located along the central promenade between Commerce and Flag Hoisting Ground',
      'Cultivates seasonal botanical specimens and campus greenery'
    ],
    hotspots: [
      {
        id: 'greenhouse-beds',
        label: 'Glass Nursery Bays',
        description: 'Temperature-moderated greenhouse bays cultivating live plants and specimens.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: 'Between Commerce & Flag Hoisting Ground · Beside Prayer Room & Karate Club',
    mapX: 50.3,
    mapY: 38.4,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '80 m North · Center Promenade',
      walkingSteps: [
        'Walk straight north along the twin grill spine past Principal’s Office line.',
        'Arrive directly at the Botanical Greenhouse between the Prayer Room and Karate Club (between Commerce and Flag Hoisting Ground).'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 50.3, y: 38.4 }
      ]
    }
  },
  {
    id: 'karate-club',
    name: 'Karate Club & Girls Self-Defense Dojo',
    shortName: 'Karate Club',
    subtitle: 'Between Commerce & Flag Hoisting Ground · Right Beside Greenhouse & North Passage',
    category: 'Student Life',
    stopNumber: '17',
    svgType: 'sports',
    badge: 'Between Commerce & Flag Ground',
    description:
      'Located between the Botanical Greenhouse and Flag Hoisting Ground—forming part of the active central zone between Commerce and Flag Hoisting Ground—the Girls Karate Club trains students in discipline, kata forms, fitness, and practical self-defense.',
    keySpecs: [
      { label: 'Club', value: 'Girls Karate Club' },
      { label: 'Left Side', value: 'Greenhouse & Prayer Room (to Commerce)' },
      { label: 'Right Side', value: 'North Passage & Flag Hoisting Ground' },
      { label: 'Training', value: 'Kata, Fitness & Self-Defense' }
    ],
    highlights: [
      'Dedicated Karate Club dojo positioned cleanly between Greenhouse and Flag Hoisting Ground',
      'Empowers college scholars with martial arts training, balance, and self-defense skills',
      'Sits right beside the open North Passage leading into the Very Big Ground'
    ],
    hotspots: [
      {
        id: 'karate-dojo-mat',
        label: 'Karate Training Mat',
        description: 'Padded martial arts floor for kata drills and inter-college karate practice.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Between Commerce & Flag Hoisting Ground · Beside Greenhouse',
    mapX: 56.3,
    mapY: 38.4,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '82 m North · Beside Flag Ground',
      walkingSteps: [
        'Walk straight north along the twin grill spine past Principal’s Office line.',
        'Step slightly right past the Greenhouse to enter the Girls Karate Club right before Flag Hoisting Ground.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 56.3, y: 41.8 },
        { x: 56.3, y: 38.4 }
      ]
    }
  },
  {
    id: 'greenhouse-prayer-ground',
    name: 'Assembly Ground & Flag Hoisting Lawn',
    shortName: 'Flag Hoisting Ground',
    subtitle: 'East of Prayer Room, Greenhouse & Karate Club · Before Zoology & Botany Labs',
    category: 'Student Life',
    stopNumber: '18',
    svgType: 'courtyard',
    badge: 'Morning Assembly · Flag Hoisting',
    description:
      'Directly east of the Prayer Room, Greenhouse, and Karate Club (across the open North Passage) and just before the Zoology and Botany Labs sits the Morning Assembly & Flag Hoisting Ground with its ceremonial Pakistani flag dais and landscaped lawn.',
    keySpecs: [
      { label: 'Main Feature', value: 'Assembly & Flag Hoisting' },
      { label: 'Left Side', value: 'North Passage · Karate Club · Greenhouse · Prayer Room' },
      { label: 'Right Side', value: 'Zoology & Botany Labs' },
      { label: 'Events', value: 'Daily Assembly & National Days' }
    ],
    highlights: [
      'Morning Assembly Courtyard & National Flag Hoisting Podium',
      'Cleanly separated from Commerce by the Prayer Room, Botanical Greenhouse, and Karate Club',
      'Adjacent to Zoology and Botany Department Laboratories'
    ],
    hotspots: [
      {
        id: 'assembly-flag',
        label: 'Assembly & Flag Hoisting',
        description: 'Campus flagpole dais for morning assembly and national celebrations.',
        xPercent: 32,
        yPercent: 48
      }
    ],
    locationNote: 'East of Karate Club & North Passage · Right Before Zoology Lab',
    mapX: 67.0,
    mapY: 38.4,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '85 m North · Past Karate Club',
      walkingSteps: [
        'Walk straight north along the twin grill spine past Principal’s Office line.',
        'Pass the Prayer Room, Greenhouse, and Karate Club along the promenade to reach the Assembly & Flag Hoisting Ground.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 67.0, y: 41.8 },
        { x: 67.0, y: 38.4 }
      ]
    }
  },
  {
    id: 'zoology-botany-labs',
    name: 'Department of Zoology & Zoology Lab',
    shortName: 'Zoology Lab',
    subtitle: 'Right Past Assembly & Flag Hoisting Ground · Pre-Medical & BS Zoology',
    category: 'Laboratories',
    stopNumber: '19',
    svgType: 'science-lab',
    badge: 'Separate Dept. · BS Zoology',
    description:
      'Immediately beyond the Assembly & Flag Hoisting Ground stands the dedicated Department of Zoology and Zoology Laboratory—supporting our flagship 4-year BS Zoology degree, Pre-Medical practicals, microscopy stations, and preserved zoological specimen archives.',
    keySpecs: [
      { label: 'Department', value: 'Zoology & Zoology Lab' },
      { label: 'Programs', value: 'Pre-Medical & 4-Yr BS Zoology' },
      { label: 'Before It', value: 'Assembly & Flag Hoisting Ground' },
      { label: 'Beside It', value: 'Botany & Botany Lab' }
    ],
    highlights: [
      'Separate dedicated laboratory wing for Zoology & 4-Year BS Zoology',
      'Equipped with high-power compound microscopes, dissection stations & specimens',
      'Dedicated academic lab wing accessed via the promenade (separate from Very Big Ground walkway)'
    ],
    hotspots: [
      {
        id: 'zoo-lab',
        label: 'Zoology Practical Lab',
        description: 'Microscopes, anatomical models, and preserved zoology archives.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: 'East Science Wing · Between Flag Hoisting Ground & Botany Lab',
    mapX: 78.7,
    mapY: 38.4,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '92 m · Past Flag Hoisting Ground',
      walkingSteps: [
        'Walk straight north from the Main Gate past Principal’s Office line.',
        'Turn right past Prayer Room, Greenhouse, Karate Club, and Flag Hoisting Ground into Zoology & Zoology Lab.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 78.7, y: 41.8 },
        { x: 78.7, y: 38.4 }
      ]
    }
  },
  {
    id: 'botany-dept-lab',
    name: 'Department of Botany & Botany Lab',
    shortName: 'Botany Lab',
    subtitle: 'Beside Zoology Lab · Plant Taxonomy, Herbarium & Microscopy Hall',
    category: 'Laboratories',
    stopNumber: '20',
    svgType: 'science-lab',
    badge: 'Science Lab · Botany Wing',
    description:
      'Beside Zoology sits the dedicated Department of Botany and Botany Laboratory—housing a curated Sindh regional herbarium, plant anatomy slides, botanical charts, and Pre-Medical & Associate Degree microscopy stations.',
    keySpecs: [
      { label: 'Department', value: 'Botany & Botany Lab' },
      { label: 'Beside', value: 'Zoology & Zoology Lab' },
      { label: 'Focus', value: 'Herbarium & Plant Taxonomy' },
      { label: 'Programs', value: 'HSC Pre-Medical & ADS' }
    ],
    highlights: [
      'Separate dedicated laboratory wing for Botany, plant taxonomy, and physiology',
      'Curated regional Sindh plant herbarium and prepared microscopy slides',
      'Sits cleanly beside Zoology Lab on the east promenade inside the Golden Boundary'
    ],
    hotspots: [
      {
        id: 'botany-lab',
        label: 'Botany & Herbarium Lab',
        description: 'Plant taxonomy lab, preserved herbarium archive, and microscopy hall.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: 'East Science Wing · Right Beside Zoology & Zoology Lab',
    mapX: 90.7,
    mapY: 38.4,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '98 m · Past Zoology Lab',
      walkingSteps: [
        'Walk straight north from the Main Gate past Principal’s Office line.',
        'Follow the promenade right past Flag Hoisting Ground and Zoology Lab into Botany & Botany Lab.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 90.7, y: 41.8 },
        { x: 90.7, y: 38.4 }
      ]
    }
  },
  {
    id: 'hostel-computer-lab',
    name: 'College Hostel (Main Residential Block)',
    shortName: 'College Hostel',
    subtitle: 'Below Small Garden & Computer Lab · Above West Garden Lawn & Straight N-W Trees Line',
    category: 'Student Life',
    stopNumber: '21',
    svgType: 'courtyard',
    badge: 'Below Small Garden · Above West Garden',
    description:
      'Positioned cleanly between the Small Garden & Computer Department above and West Garden Lawn & Trees below—along the Straight North-West Trees line—Government Girls Zubaida College’s large solar-equipped Residential Hostel gives students quiet, green views.',
    keySpecs: [
      { label: 'Location', value: 'Below Small Garden & Comp Lab' },
      { label: 'Scale', value: 'Large Residential Block' },
      { label: 'Below It', value: 'West Garden Lawn & Trees' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned right below the Small Garden & Computer Lab and directly above West Garden Lawn & Trees',
      'Bordered on the west by the Straight North-West Trees line',
      'Expansive multi-wing girls hostel equipped with rooftop solar panels'
    ],
    hotspots: [
      {
        id: 'hostel-courtyard',
        label: 'Hostel Residential Wings',
        description: 'Large secure student hostel complex between Small Garden and West Garden Lawn.',
        xPercent: 46,
        yPercent: 48
      },
      {
        id: 'hostel-warden',
        label: 'Warden & Study Hall',
        description: 'Supervised hostel study room and warden office overlooking West Garden & Small Garden.',
        xPercent: 75,
        yPercent: 62
      }
    ],
    locationNote: 'West Campus · Below Small Garden & Computer Lab · Above West Garden',
    mapX: 17.1,
    mapY: 70.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '58 m Straight · Left Above West Garden',
      walkingSteps: [
        'Walk straight from the Main Gate past the Waiting Room, West Garden Lawn, and Clerk Office Corridor.',
        'Turn left cleanly above West Garden Lawn (below the Small Garden & Computer Lab).',
        'Arrive at the Big College Hostel connected to the Straight North-West Trees line.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 72.4 },
        { x: 17.1, y: 72.4 },
        { x: 17.1, y: 70.5 }
      ]
    }
  },
  {
    id: 'computer-lab',
    name: 'Computer Department · Computer Lab & Computer Office',
    shortName: 'Computer Lab & Office',
    subtitle: 'Computer Department · Directly Behind Small Garden & Historical Graveyard & Mazar',
    category: 'Laboratories',
    stopNumber: '22',
    svgType: 'computer-lab',
    badge: 'Computer Dept. · Past Mazar & Small Garden',
    description:
      'Part of the labeled Computer Department wing positioned right behind the Small Garden and Historical Graveyard & Mazar in one continuous ground-floor corridor—alongside Big Computer Multimedia Room, Pakistan Studies, Urdu, and Physical Education (under 1st-floor Commerce)—the Computer Lab & Computer Office feature modern desktop terminals and solar-backed power.',
    keySpecs: [
      { label: 'Department', value: 'Computer Department' },
      { label: 'Before Entry', value: 'Graveyard & Mazar · Small Garden' },
      { label: 'Same Corridor', value: 'Big Multimedia, Pak Studies, Urdu, Physical Education' },
      { label: 'Energy', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Labeled Computer Department wing directly preceded by Small Garden and Historical Graveyard & Mazar',
      'Situated in one unified ground-floor corridor with Pak Studies, Urdu & Physical Education',
      'Reachable along the dedicated 2-grill Computer Lab walkway'
    ],
    hotspots: [
      {
        id: 'pcs',
        label: 'Computer Lab Workstations',
        description: 'Desktop computers for Computer Science practicals powered by solar energy.',
        xPercent: 42,
        yPercent: 52
      },
      {
        id: 'lab-office',
        label: 'Computer Office',
        description: 'IT faculty & Computer Office right beside the lab inside the Computer Department.',
        xPercent: 78,
        yPercent: 42
      }
    ],
    locationNote: 'Computer Department · Past Historical Graveyard & Mazar & Small Garden',
    mapX: 24.5,
    mapY: 52.8,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '70 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Garden, Clerk Corridor, and Principal’s Office line.',
        'Turn left onto the 2-grill Computer Lab path (passing Historical Graveyard & Mazar beside Small Garden before Computer Lab).',
        'Enter the Computer Lab & Computer Office beside Big Multimedia Room.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 53.9 },
        { x: 24.5, y: 53.9 },
        { x: 24.5, y: 52.8 }
      ]
    }
  },
  {
    id: 'computer-multimedia-room',
    name: 'Computer Department · Big Computer Multimedia Room & Smart Hall',
    shortName: 'Big Multimedia Room',
    subtitle: 'Computer Department · Extra-Large Smart Hall Past Historical Graveyard & Mazar Beside Computer Lab',
    category: 'Laboratories',
    stopNumber: '23',
    svgType: 'multimedia-room',
    badge: 'Computer Department · Wide Smart Hall',
    description:
      'Housed inside the Computer Department right past the Historical Graveyard & Mazar (beside Small Garden) and Computer Lab & Office—and linked directly in one corridor to Pakistan Studies, Urdu, and Physical Education below 1st-floor Commerce (reached via Stairs)—the Big Computer Multimedia Room hosts HD smart projections and seminars.',
    keySpecs: [
      { label: 'Department', value: 'Computer Department' },
      { label: 'Before Entry', value: 'Historical Graveyard & Mazar (Beside Small Garden)' },
      { label: 'Same Corridor', value: 'Comp Lab/Office, Pak Studies, Urdu, Physical Education' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Extra-large Big Computer Multimedia Room inside the Computer Department right past Historical Graveyard & Mazar',
      'Shares one continuous ground-floor corridor with Pakistan Studies, Urdu & Physical Education above Hostel',
      'Supported by rooftop solar panels mounted across every building wing'
    ],
    hotspots: [
      {
        id: 'smart-screen',
        label: 'HD Smart Screen Wall',
        description: 'High-definition interactive projection wall in the spacious multimedia hall.',
        xPercent: 50,
        yPercent: 30
      },
      {
        id: 'media-podium',
        label: 'Multimedia Control Console',
        description: 'Audio-visual switching desk for seminars and smart classes.',
        xPercent: 25,
        yPercent: 60
      }
    ],
    locationNote: 'Computer Department · Past Mazar & Small Garden · Solar Powered',
    mapX: 35.1,
    mapY: 52.8,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '64 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Garden and Principal’s Office line.',
        'Turn left past Historical Graveyard & Mazar (beside Small Garden) toward the Computer Department.',
        'Enter the Big Computer Multimedia Room right alongside Computer Lab & Computer Office.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 53.9 },
        { x: 35.1, y: 53.9 },
        { x: 35.1, y: 52.8 }
      ]
    }
  },
  {
    id: 'pak-urdu-pe',
    name: 'Department of Pakistan Studies',
    shortName: 'Pak Studies',
    subtitle: 'Separate Point in Same Corridor · Tennis Court & Volleyball Directly on Left of Pakistan Studies',
    category: 'Academics',
    stopNumber: '24',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · Tennis/Volleyball Left',
    description:
      'Positioned inside the same ground-floor corridor alongside Computer Department, Urdu, and Physical Education (under 1st-floor Commerce reached By Stairs)—with the Tennis Court & Volleyball ground immediately on its left beside the North-West Trees—the Department of Pakistan Studies teaches constitutional history, geography, and civic heritage.',
    keySpecs: [
      { label: 'Department', value: 'Pakistan Studies' },
      { label: 'On Its Left', value: 'Tennis Court & Volleyball' },
      { label: 'Same Corridor', value: 'Urdu, Physical Education & Computer Dept.' },
      { label: '1st Floor Above', value: 'Commerce Dept. (By Stairs)' }
    ],
    highlights: [
      'Tennis Court & Volleyball ground sit immediately to the left of Pakistan Studies',
      'Compulsory and elective civic & historical studies classrooms',
      'Connected directly in-corridor to Urdu and Physical Education'
    ],
    hotspots: [
      {
        id: 'pak-studies-room',
        label: 'Pakistan Studies Lecture Hall',
        description: 'Classrooms for Pakistan Studies right beside Tennis Court & Volleyball on the left.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Ground Floor Same Corridor · Tennis & Volleyball Directly on Left',
    mapX: 22.7,
    mapY: 43.7,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '78 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill path past West Garden & Garden and turn left onto the two-grill Computer Lab corridor.',
        'Continue past the Computer Department inside the same building.',
        'Enter the Department of Pakistan Studies.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 53.9 },
        { x: 29.8, y: 53.9 },
        { x: 29.8, y: 43.7 },
        { x: 22.7, y: 43.7 }
      ]
    }
  },
  {
    id: 'urdu-dept',
    name: 'Department of Urdu',
    shortName: 'Urdu Dept.',
    subtitle: 'Separate Point Between Pakistan Studies & Physical Education in Same Corridor',
    category: 'Academics',
    stopNumber: '25',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · One Corridor',
    description:
      'Situated centrally in the same ground-floor corridor between Pakistan Studies and Physical Education—right above the Computer Department and directly below 1st-floor Commerce (reached By Stairs)—the Department of Urdu celebrates classical poetry, prose, and literary societies.',
    keySpecs: [
      { label: 'Department', value: 'Department of Urdu' },
      { label: 'Same Corridor', value: 'Pak Studies, Physical Education, Computer Dept.' },
      { label: '1st Floor Above', value: 'Commerce Dept. (By Stairs)' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated map pin for the Department of Urdu inside the unified corridor',
      'Hosts Mushaira gatherings, Iqbal Day seminars, and Urdu prose studies',
      'Shares the same solar-powered building as 1st-floor Commerce'
    ],
    hotspots: [
      {
        id: 'urdu-hall',
        label: 'Urdu Literature Hall',
        description: 'Lecture rooms and literary society room for Urdu.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Ground Floor Same Corridor · Center Point',
    mapX: 29.8,
    mapY: 43.7,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '78 m North-West',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the 2-grill Computer Lab path.',
        'Walk along the unified ground-floor corridor past the Computer Department.',
        'Enter the Department of Urdu between Pakistan Studies and Physical Education.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 53.9 },
        { x: 29.8, y: 53.9 },
        { x: 29.8, y: 43.7 }
      ]
    }
  },
  {
    id: 'physical-education-dept',
    name: 'Department of Physical Education',
    shortName: 'Physical Education',
    subtitle: 'Separate Point Beside Urdu & Pakistan Studies in Same Unified Corridor',
    category: 'Academics',
    stopNumber: '26',
    svgType: 'sports',
    badge: 'Separate Dept. · Sports Hub',
    description:
      'At the upper corridor end alongside Urdu and Pakistan Studies (directly above Big Computer Multimedia Room in the Computer Department and under 1st-floor Commerce), the Department of Physical Education coordinates athletics, inter-collegiate tournaments, and sports programs.',
    keySpecs: [
      { label: 'Department', value: 'Physical Education' },
      { label: 'Programs', value: 'Athletics & Sports Science' },
      { label: 'Same Corridor', value: 'Pak Studies, Urdu & Computer Dept.' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point for Physical Education & Sports Faculty Office',
      'Coordinates student athletics, track training, and inter-college sports tournaments',
      'Part of the unified solar-powered ground-floor corridor above the Hostel'
    ],
    hotspots: [
      {
        id: 'pe-office',
        label: 'Physical Education Desk',
        description: 'Sports faculty office managing athletics and tournament schedules.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Ground Floor Same Corridor · Above Hostel & Computer Department',
    mapX: 37.1,
    mapY: 43.7,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '80 m North-West',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the 2-grill Computer Lab path.',
        'Proceed along the unified corridor past the Computer Department and Urdu.',
        'Reach the Department of Physical Education.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 53.9 },
        { x: 29.8, y: 53.9 },
        { x: 29.8, y: 43.7 },
        { x: 37.1, y: 43.7 }
      ]
    }
  },
  {
    id: 'commerce-dept-library',
    name: 'Commerce Department & Commerce Library (By Stairs · 1st Floor)',
    shortName: 'Commerce & Library (1st Fl.)',
    subtitle: 'By Stairs (1st Floor) · Same Building Above Computer Department, Pak Studies, Urdu & Physical Education',
    category: 'Academics',
    stopNumber: '27',
    svgType: 'library',
    badge: 'By Stairs · 1st Floor Same Building',
    description:
      'Located on the 1st Floor of the EXACT SAME building reached via the Commerce Stairs beside the ground-floor corridor (Computer Department, Pakistan Studies, Urdu & Physical Education) north of the Hostel, and positioned cleanly left of the Prayer Room, Botanical Greenhouse, and Karate Club, the Commerce Department and Commerce Library teach Principles of Accounting (XI, XII), Principles of Commerce (XI), Banking and Money (XII), Economics / Commercial Geography (XI, XII), English (XI, XII), Islamiyat (XI), and Pakistan Studies (XII).',
    keySpecs: [
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Ground Floor Below', value: 'Computer Dept., Pak Studies, Urdu & Physical Education' },
      { label: 'East Side', value: 'Prayer Room · Greenhouse · Karate Club' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Reached By Stairs (1st Floor) right on the side of the unified building above Computer Department, Pak Studies, Urdu & Physical Education',
      'I.Com Curriculum covers Principles of Accounting (XI, XII), Principles of Commerce (XI), Banking and Money (XII), Economics / Commercial Geography (XI, XII), English (XI, XII), Islamiyat (XI) & Pakistan Studies (XII)',
      'Dedicated Commerce Library beside Prayer Room, Botanical Greenhouse & Karate Club'
    ],
    hotspots: [
      {
        id: 'commerce-lib',
        label: 'Commerce Library (1st Floor)',
        description: 'Subject-specific reference library for Commerce & Accounting reached by stairs.',
        xPercent: 34,
        yPercent: 45
      },
      {
        id: 'commerce-halls',
        label: 'Commerce Classrooms (1st Floor)',
        description: 'Accounting, banking, and business lecture rooms directly above the ground corridor.',
        xPercent: 72,
        yPercent: 52
      }
    ],
    locationNote: 'By Stairs (1st Floor) · Above Computer Dept. · Left of Prayer Room',
    mapX: 29.9,
    mapY: 38.6,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '84 m North-West · By Stairs (1st Fl)',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the two-grill Computer Lab corridor.',
        'Pass the Computer Department and 1 Corridor entrance to the Commerce Stairs on the right side of the building.',
        'Climb the Stairs up to the 1st Floor Commerce Department & Commerce Library.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 53.9 },
        { x: 41.0, y: 53.9 },
        { x: 41.0, y: 47.4 },
        { x: 42.7, y: 47.4 },
        { x: 42.7, y: 38.6 },
        { x: 29.9, y: 38.6 }
      ]
    }
  },
  {
    id: 'sindhi-economics-physiology-ground',
    name: 'Very Big Ground (Central North Sports & Parking Ground)',
    shortName: 'Very Big Ground',
    subtitle: 'Reached via Straight Central North Passage · Houses Old Bus, Car Parking Area & Sports Gymnasium',
    category: 'Student Life',
    stopNumber: '28',
    svgType: 'sports',
    badge: 'North Campus · Very Big Ground',
    description:
      'Walking straight north along the Central North Passage (between Karate Club and Flag Hoisting Ground) brings you directly into this expansive Very Big Ground. Inside this ground sit the historic Old Bus bay, Car Parking Area, and Sports Gymnasium; continuing straight North across the Long Walking Distance leads directly to the Garden facing Economics, Sindhi, Physiology, Psychology, Geography, and General Staff Room (For Arts) & Classes.',
    keySpecs: [
      { label: 'Approach', value: 'Straight Central North Passage' },
      { label: 'Inside Ground', value: 'Old Bus · Car Parking Area · Sports Gymnasium' },
      { label: 'Continuing North', value: 'Long Walking Distance → Garden' },
      { label: 'In Front of Garden', value: 'Economics, Sindhi, Physiology, Psychology, Geography, Arts Staff Rm' }
    ],
    highlights: [
      'Reached directly via the Central North Passage between Karate Club and Flag Hoisting Ground',
      'Expansive open ground containing Old Bus, Car Parking Area, and Sports Gymnasium',
      'Leads straight North along Long Walking Distance into the Garden and North Academic Corridor'
    ],
    hotspots: [
      {
        id: 'east-playing-ground',
        label: 'Open Campus Ground Lawn',
        description: 'Very Big Ground housing Old Bus, Car Parking Area, and Sports Gymnasium.',
        xPercent: 50,
        yPercent: 55
      }
    ],
    locationNote: 'North Campus Central Ground · Before Long Walking Distance',
    mapX: 50.0,
    mapY: 32.7,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '112 m · North Central Passage',
      walkingSteps: [
        'Walk straight north from Main Gate past Principal’s Office line along the Central Spine.',
        'Proceed straight north through the Central North Passage between Karate Club and Flag Hoisting Ground.',
        'Arrive inside the Very Big Ground housing Old Bus, Car Parking Area, and Sports Gymnasium.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 }
      ]
    }
  },
  {
    id: 'old-bus',
    name: 'College Old Bus Landmark (Inside Very Big Ground)',
    shortName: 'Old Bus',
    subtitle: 'Inside Very Big Ground · Beside Car Parking Area & Sports Gymnasium',
    category: 'Student Life',
    stopNumber: '29',
    svgType: 'courtyard',
    badge: 'Inside Big Ground · Heritage Bus',
    description:
      'Parked prominently inside the Very Big Ground alongside the Car Parking Area and Sports Gymnasium, the college’s classic Old Bus is an iconic campus landmark remembered by generations of Zubaida College students.',
    keySpecs: [
      { label: 'Location', value: 'Inside Very Big Ground' },
      { label: 'Beside', value: 'Car Parking Area & Sports Gymnasium' },
      { label: 'Approach', value: 'Central North Passage ↑' },
      { label: 'Status', value: 'Heritage Bus Bay' }
    ],
    highlights: [
      'Positioned inside the Very Big Ground on the north campus lawn',
      'Stands alongside the Car Parking Area and Sports Gymnasium',
      'Well-known campus orientation landmark before the Long Walking Distance to Garden'
    ],
    hotspots: [
      {
        id: 'old-bus-bay',
        label: 'Vintage College Bus',
        description: 'Historic college transport bus parked inside the Very Big Ground.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Inside Very Big Ground · West Side Beside Car Parking Area',
    mapX: 20.4,
    mapY: 27.8,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '114 m · Inside Big Ground',
      walkingSteps: [
        'Walk north along the central spine and enter the Very Big Ground via the Central North Passage.',
        'Head left inside the ground past Car Parking Area.',
        'Spot the College Old Bus landmark.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 20.4, y: 32.7 },
        { x: 20.4, y: 27.8 }
      ]
    }
  },
  {
    id: 'car-parking',
    name: 'Car Parking Area (Inside Very Big Ground)',
    shortName: 'Car Parking',
    subtitle: 'Inside Very Big Ground · Between Old Bus & Sports Gymnasium',
    category: 'Student Life',
    stopNumber: '30',
    svgType: 'courtyard',
    badge: 'Inside Big Ground · Parking',
    description:
      'Located centrally inside the Very Big Ground between the Old Bus bay and Sports Gymnasium, the Car Parking Area provides organized shaded parking bays for faculty and visiting vehicles.',
    keySpecs: [
      { label: 'Location', value: 'Inside Very Big Ground' },
      { label: 'Approach', value: 'Central North Passage ↑' },
      { label: 'Beside', value: 'Old Bus & Sports Gymnasium' },
      { label: 'Use', value: 'Faculty & Official Vehicles' }
    ],
    highlights: [
      'Positioned inside the Very Big Ground in north-central campus',
      'Marked parking lanes cleanly situated between Old Bus and Sports Gymnasium',
      'Keeps academic courtyards vehicle-free and student-safe'
    ],
    hotspots: [
      {
        id: 'parking-lanes',
        label: 'Marked Parking Bays',
        description: 'Dedicated vehicle parking lanes inside the Very Big Ground.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Inside Very Big Ground · Between Old Bus & Sports Gymnasium',
    mapX: 44.8,
    mapY: 27.8,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '115 m · Inside Big Ground',
      walkingSteps: [
        'Walk straight north along the central spine and enter Very Big Ground via the Central North Passage.',
        'Proceed toward the center of the Very Big Ground between Old Bus and Sports Gymnasium.',
        'Arrive at the Car Parking Area.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 44.8, y: 32.7 },
        { x: 44.8, y: 27.8 }
      ]
    }
  },
  {
    id: 'sports-gymnasium',
    name: 'Sports Gymnasium Hall (Inside Very Big Ground)',
    shortName: 'Sports Gymnasium',
    subtitle: 'Inside Very Big Ground · Indoor Courts, Fitness Training & Athletics Wing',
    category: 'Student Life',
    stopNumber: '31',
    svgType: 'sports',
    badge: 'Inside Big Ground · Sports Hub',
    description:
      'Standing inside the right side of the Very Big Ground beside Car Parking Area and Old Bus, the indoor Sports Gymnasium hosts badminton, table tennis, indoor gymnastics, fitness sessions, and championship ceremonies.',
    keySpecs: [
      { label: 'Location', value: 'Inside Very Big Ground' },
      { label: 'Beside', value: 'Car Parking Area & Old Bus' },
      { label: 'Facilities', value: 'Indoor Courts & Fitness Gear' },
      { label: 'North Ahead', value: 'Long Walking Distance → Garden' }
    ],
    highlights: [
      'Indoor Sports Gymnasium built inside the Very Big Ground',
      'Supports indoor badminton, table tennis, fitness drills, and tournament prep',
      'Solar-equipped sports pavilion overlooking the Very Big Ground'
    ],
    hotspots: [
      {
        id: 'gym-court',
        label: 'Indoor Sports Gymnasium Floor',
        description: 'Multi-sport indoor court and gymnastics hall inside the Very Big Ground.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Inside Very Big Ground · East Sports Pavilion',
    mapX: 75.2,
    mapY: 28.1,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '118 m · Inside Big Ground',
      walkingSteps: [
        'Walk straight north along the central spine and enter Very Big Ground via the Central North Passage.',
        'Head right inside the ground past Car Parking Area.',
        'Arrive at the indoor Sports Gymnasium Hall.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 75.2, y: 32.7 },
        { x: 75.2, y: 28.1 }
      ]
    }
  },
  {
    id: 'east-garden',
    name: 'Garden (After Long Walking Distance North)',
    shortName: 'Garden',
    subtitle: 'Comes Straight North After Long Walking Distance · Directly Facing Economics, Sindhi, Physiology, Psychology, Geography & General Staff Room (For Arts)',
    category: 'Student Life',
    stopNumber: '32',
    svgType: 'courtyard',
    badge: 'North of Big Ground · Garden',
    description:
      'Continuing straight North from Very Big Ground along the Long Walking Distance brings you directly to this flowering Garden. Right in front of this Garden in the North stands the North Academic Wing housing Economics, Sindhi, Physiology, Psychology, Geography, and General Staff Room (For Arts) & Classes.',
    keySpecs: [
      { label: 'Approach', value: 'Long Walking Distance North ↑' },
      { label: 'Care Staff', value: 'Campus Gardeners' },
      { label: 'In Front (North)', value: 'Economics, Sindhi, Physiology, Psychology, Geography' },
      { label: 'Also Facing', value: 'General Staff Room (For Arts) & Classes' }
    ],
    highlights: [
      'Arrives straight North right after the Long Walking Distance past Very Big Ground',
      'Tended daily with flowering beds and shaded green trees',
      'Directly faces Economics, Sindhi, Physiology, Psychology, Geography, Classes & General Staff Room (For Arts)'
    ],
    hotspots: [
      {
        id: 'east-garden-beds',
        label: 'Garden Flowerbeds & Trees',
        description: 'Lush shaded garden at the end of the Long Walking Distance directly facing the North Academic Wing.',
        xPercent: 50,
        yPercent: 52
      }
    ],
    locationNote: 'North Campus · After Long Walking Distance Directly Before North Depts.',
    mapX: 50.0,
    mapY: 15.9,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '132 m · Straight North Past Ground',
      walkingSteps: [
        'Walk north along the Central North Passage into Very Big Ground (Old Bus, Car Parking, Sports Gymnasium).',
        'Continue straight North ↑ across the Long Walking Distance.',
        'Arrive at the Garden, with Economics, Sindhi, Physiology, Psychology, Geography & General Staff Room (For Arts) directly in front (North).'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 50.0, y: 15.9 }
      ]
    }
  },
  {
    id: 'economics-dept',
    name: 'Department of Economics & Classes (North Wing · Room 1)',
    shortName: 'Economics',
    subtitle: 'In Front of Garden (North Wing) · Alongside Sindhi, Physiology, Psychology, Geography & General Staff Room (For Arts)',
    category: 'Academics',
    stopNumber: '33',
    svgType: 'academic-wing',
    badge: 'North Facing Garden · Room 1',
    description:
      'Situated first in the North Academic Wing directly in front of the Garden after the Long Walking Distance from Very Big Ground (alongside Sindhi, Physiology, Psychology, Geography, and General Staff Room (For Arts) & Classes), the Department of Economics teaches microeconomics, macroeconomics, and development policy of Pakistan.',
    keySpecs: [
      { label: 'Department', value: 'Department of Economics' },
      { label: 'Position', value: 'North Wing Facing Garden' },
      { label: 'Next East', value: 'Sindhi · Physiology · Psychology' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned in front (North) of the Garden at the end of the Long Walking Distance',
      'Micro/macro theory and Pakistan development studies classrooms',
      'Mounted with rooftop solar arrays cleanly powering classrooms'
    ],
    hotspots: [
      {
        id: 'econ-hall',
        label: 'Economics Lecture Hall',
        description: 'Classrooms for Microeconomics, Macroeconomics & Development Studies facing the Garden.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North Academic Wing · Directly in Front of Garden (West End)',
    mapX: 11.5,
    mapY: 7.9,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '140 m · North Facing Garden',
      walkingSteps: [
        'Walk straight North ↑ via the Central North Passage through Very Big Ground (Old Bus, Car Parking, Sports Gymnasium).',
        'Continue straight North across Long Walking Distance to the Garden.',
        'Cross in front of the Garden to Economics & Classes on the left of the North Academic Wing.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 50.0, y: 12.6 },
        { x: 11.5, y: 12.6 },
        { x: 11.5, y: 7.9 }
      ]
    }
  },
  {
    id: 'sindhi-dept',
    name: 'Department of Sindhi & Classes (North Wing · Room 2)',
    shortName: 'Sindhi',
    subtitle: 'In Front of Garden (North Wing) · Between Economics & Physiology',
    category: 'Academics',
    stopNumber: '34',
    svgType: 'academic-wing',
    badge: 'North Facing Garden · Room 2',
    description:
      'Second in the North Academic Wing directly facing the Garden between Economics and Physiology (followed by Psychology, Geography, and General Staff Room (For Arts) & Classes), the Department of Sindhi preserves and teaches Sindhi language, Shah Abdul Latif Bhittai’s poetry, and regional literary research.',
    keySpecs: [
      { label: 'Department', value: 'Department of Sindhi' },
      { label: 'Position', value: 'North Wing Facing Garden' },
      { label: 'Between', value: 'Economics & Physiology' },
      { label: 'Staff Hub', value: 'General Staff Room (For Arts)' }
    ],
    highlights: [
      'Positioned inside the North Academic Wing facing the Garden between Economics and Physiology',
      'Classical Sindhi literature, Latifiyat seminars, and undergraduate programs',
      'Solar-equipped wing connected along the North corridor'
    ],
    hotspots: [
      {
        id: 'sindhi-hall',
        label: 'Sindhi Lecture Hall',
        description: 'Dedicated classrooms for Sindhi literature.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North Academic Wing · Directly in Front of Garden',
    mapX: 26.8,
    mapY: 7.9,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '140 m · North Facing Garden',
      walkingSteps: [
        'Walk straight North ↑ via the Central North Passage through Very Big Ground and Long Walking Distance to the Garden.',
        'Step into the North Academic Wing directly in front of the Garden.',
        'Enter the Department of Sindhi between Economics and Physiology.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 50.0, y: 12.6 },
        { x: 26.8, y: 12.6 },
        { x: 26.8, y: 7.9 }
      ]
    }
  },
  {
    id: 'physiology-dept',
    name: 'Department of Physiology & Classes (North Wing · Room 3)',
    shortName: 'Physiology',
    subtitle: 'In Front of Garden (North Wing) · Between Sindhi & Psychology',
    category: 'Laboratories',
    stopNumber: '35',
    svgType: 'science-lab',
    badge: 'North Facing Garden · Room 3',
    description:
      'Third in the North Academic Wing directly facing the Garden between Sindhi and Psychology (followed by Geography and General Staff Room (For Arts) & Classes), the Department of Physiology supports our Associate Degree in Physiology & Health Sciences (ADS) with physiological models and hematology apparatus.',
    keySpecs: [
      { label: 'Department', value: 'Department of Physiology' },
      { label: 'Position', value: 'North Wing Facing Garden' },
      { label: 'Between', value: 'Sindhi & Psychology' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned directly between Sindhi and Psychology in front of the Garden',
      'Supports Zubaida College’s specialized Physiology & Health Sciences degree track',
      'Equipped with rooftop solar panels like all campus wings'
    ],
    hotspots: [
      {
        id: 'physiology-lab',
        label: 'Physiology Practical Lab',
        description: 'Hematology, anatomical physiology charts, and diagnostic models.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North Academic Wing · Directly in Front of Garden',
    mapX: 42.2,
    mapY: 7.9,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '140 m · North Facing Garden',
      walkingSteps: [
        'Walk straight North ↑ via the Central North Passage through Very Big Ground and Long Walking Distance to the Garden.',
        'Cross into the North Academic Wing directly in front of the Garden.',
        'Enter the Department of Physiology between Sindhi and Psychology.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 50.0, y: 12.6 },
        { x: 42.2, y: 12.6 },
        { x: 42.2, y: 7.9 }
      ]
    }
  },
  {
    id: 'psychology-dept',
    name: 'Department of Psychology & Classes (North Wing · Room 4)',
    shortName: 'Psychology',
    subtitle: 'In Front of Garden (North Wing) · Between Physiology & Geography',
    category: 'Laboratories',
    stopNumber: '36',
    svgType: 'academic-wing',
    badge: 'North Facing Garden · Room 4',
    description:
      'Fourth along the North Academic Wing directly facing the Garden between Physiology and Geography (right beside General Staff Room (For Arts) & Classes), the Department of Psychology hosts behavioral sciences lectures, sensory & memory testing, and student counseling.',
    keySpecs: [
      { label: 'Department', value: 'Department of Psychology' },
      { label: 'Position', value: 'North Wing Facing Garden' },
      { label: 'Between', value: 'Physiology & Geography' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Dedicated Psychology lecture room & experimental lab in front of the Garden',
      'Serves Intermediate Humanities and Associate Degree in Arts (ADA) cohorts',
      'Connected directly along the corridor to Geography and General Staff Room (For Arts)'
    ],
    hotspots: [
      {
        id: 'psychology-lab',
        label: 'Psychology Testing & Counseling Room',
        description: 'Apparatus for perception, memory experiments, and student counseling.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North Academic Wing · Directly in Front of Garden',
    mapX: 57.5,
    mapY: 7.9,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '140 m · North Facing Garden',
      walkingSteps: [
        'Walk straight North ↑ via the Central North Passage through Very Big Ground and Long Walking Distance to the Garden.',
        'Step into the North Academic Wing directly in front of the Garden.',
        'Enter the Department of Psychology between Physiology and Geography.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 50.0, y: 12.6 },
        { x: 57.5, y: 12.6 },
        { x: 57.5, y: 7.9 }
      ]
    }
  },
  {
    id: 'geography-dept',
    name: 'Department of Geography & Classes (North Wing · Room 5)',
    shortName: 'Geography',
    subtitle: 'In Front of Garden (North Wing) · Between Psychology & General Staff Room (For Arts)',
    category: 'Academics',
    stopNumber: '37',
    svgType: 'academic-wing',
    badge: 'North Facing Garden · Room 5',
    description:
      'Positioned straight in front of the Garden in the North Academic Wing between Psychology and General Staff Room (For Arts) & Classes, the Department of Geography houses physical and commercial geography maps, globes, cartography tables, and environmental survey instruments.',
    keySpecs: [
      { label: 'Department', value: 'Department of Geography' },
      { label: 'Position', value: 'North Wing Facing Garden' },
      { label: 'Between', value: 'Psychology & Arts Staff Room' },
      { label: 'Programs', value: 'I.Com & FA Geography' }
    ],
    highlights: [
      'Positioned cleanly in front of the Garden in the North Academic Wing',
      'Cartography & physical geography practical hall with regional Sindh & Pakistan maps',
      'Directly beside General Staff Room (For Arts) & Humanities Classes'
    ],
    hotspots: [
      {
        id: 'geography-cartography',
        label: 'Geography & Cartography Lab',
        description: 'Topographical map tables, globes, and survey instruments.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North Academic Wing · Directly in Front of Garden',
    mapX: 72.8,
    mapY: 7.9,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '140 m · Straight North',
      walkingSteps: [
        'Walk straight North ↑ via the Central North Passage through Very Big Ground and Long Walking Distance.',
        'Cross the Garden straight into the North Academic Wing.',
        'Arrive directly at the Department of Geography beside Psychology and General Staff Room (For Arts).'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 50.0, y: 12.6 },
        { x: 72.8, y: 12.6 },
        { x: 72.8, y: 7.9 }
      ]
    }
  },
  {
    id: 'arts-staff-room',
    name: 'General Staff Room (For Arts) & Humanities Classes',
    shortName: 'General Staff Room (For Arts)',
    subtitle: 'North Academic Wing in Front of Garden · Faculty Lounge & Classes for Economics, Sindhi, Physiology, Psychology & Geography',
    category: 'Administration',
    stopNumber: '38',
    svgType: 'academic-wing',
    badge: 'For Arts Faculty · Facing Garden',
    description:
      'Located at the east end of the North Academic Wing directly in front of the Garden alongside Economics, Sindhi, Physiology, Psychology, and Geography, the General Staff Room (For Arts) serves Humanities & Arts lecturers and adjacent degree classes.',
    keySpecs: [
      { label: 'Facility', value: 'General Staff Room (For Arts)' },
      { label: 'Adjacent Classes', value: 'Arts & Humanities Lecture Rooms' },
      { label: 'Beside', value: 'Department of Geography' },
      { label: 'Serves', value: 'Economics, Sindhi, Psych, Geography Faculty' }
    ],
    highlights: [
      'Dedicated General Staff Room (For Arts) and Classes facing the Garden in the North Wing',
      'Central faculty coordination room serving Arts, Social Sciences & Humanities lecturers',
      'Positioned cleanly right beside Geography at the North-East end inside the Golden Boundary'
    ],
    hotspots: [
      {
        id: 'arts-staff-lounge',
        label: 'General Staff Room (For Arts)',
        description: 'Faculty workstations and academic planning room for Arts & Humanities teachers.',
        xPercent: 50,
        yPercent: 45
      },
      {
        id: 'arts-classes-block',
        label: 'Arts & Humanities Classes',
        description: 'Lecture halls adjoining the General Staff Room (For Arts) facing the Garden.',
        xPercent: 50,
        yPercent: 72
      }
    ],
    locationNote: 'North Academic Wing · Directly in Front of Garden (For Arts Faculty & Classes)',
    mapX: 88.3,
    mapY: 7.9,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '144 m · North Facing Garden',
      walkingSteps: [
        'Walk straight North ↑ via the Central North Passage through Very Big Ground and Long Walking Distance.',
        'Cross the Garden into the North Academic Wing.',
        'Step into the General Staff Room (For Arts) & Classes right beside Geography.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 41.8 },
        { x: 60.3, y: 41.8 },
        { x: 60.3, y: 35.0 },
        { x: 50.0, y: 32.7 },
        { x: 50.0, y: 12.6 },
        { x: 88.3, y: 12.6 },
        { x: 88.3, y: 7.9 }
      ]
    }
  },
  {
    id: 'chemistry-labs',
    name: 'Chemistry Office (In Line Right of Principal’s Office)',
    shortName: 'Chemistry Office',
    subtitle: 'First in Line on the Right of Principal’s Office · Followed by Chemistry Lab 1 & Chemistry Lab 2',
    category: 'Laboratories',
    stopNumber: '39',
    svgType: 'science-lab',
    badge: 'In Line Right of Principal · Office',
    description:
      'Located in one straight horizontal line directly to the RIGHT of Principal’s Office (past Stairs & the Auditorium turn-off, right beside Chemistry Lab 1 and Chemistry Lab 2), the Chemistry Office serves faculty consultation, reagent inventory, and practical schedule coordination.',
    keySpecs: [
      { label: 'Suite', value: 'Chemistry Faculty Office' },
      { label: 'Position', value: 'In Line Right of Principal’s Office' },
      { label: 'In Line Next', value: 'Chemistry Lab 1 → Chemistry Lab 2' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned cleanly in one straight line directly on the right of Principal’s Office',
      'Houses chemistry faculty desks, chemical safety records, and preparation store',
      'Leads directly eastward along the same corridor to Chemistry Lab 1 and Chemistry Lab 2'
    ],
    hotspots: [
      {
        id: 'chem-office-desk',
        label: 'Chemistry Faculty Office',
        description: 'Department head & faculty consultation room in line on the right of Principal’s Office.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'In Line Right of Principal’s Office · First in Chemistry Row',
    mapX: 75.8,
    mapY: 62.0,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '74 m · In Line Right of Principal’s Office',
      walkingSteps: [
        'Walk straight along the twin grill path past Big Clerk Office Corridor and Garden & Gardeners.',
        'Turn right onto the Principal’s Office corridor and pass Principal’s Office, Stairs, and the Separate Auditorium turn-off.',
        'Step straight along the same line into Chemistry Office (with Lab 1 and Lab 2 next in line).'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 56.8, y: 62.0 },
        { x: 75.8, y: 62.0 }
      ]
    }
  },
  {
    id: 'chemistry-lab-1',
    name: 'Chemistry Lab 1 (In Line Right of Principal’s Office)',
    shortName: 'Chemistry Lab 1',
    subtitle: 'In Line on the Right of Principal’s Office · Between Chemistry Office & Chemistry Lab 2',
    category: 'Laboratories',
    stopNumber: '40',
    svgType: 'science-lab',
    badge: 'In Line Right of Principal · Lab 1',
    description:
      'Located directly in line on the RIGHT of Principal’s Office between Chemistry Office and Chemistry Lab 2, Chemistry Lab 1 equips Pre-Medical and Pre-Engineering students with volumetric titration benches, reagent shelves, and fume safety stations.',
    keySpecs: [
      { label: 'Facility', value: 'Chemistry Lab 1' },
      { label: 'Position', value: 'In Line Right of Principal’s Office' },
      { label: 'Neighbors', value: 'Chemistry Office ← Lab 1 → Lab 2' },
      { label: 'Capacity', value: '40 Students / Batch' }
    ],
    highlights: [
      'Positioned cleanly between Chemistry Office and Chemistry Lab 2 in line to the right of Principal’s Office',
      'Individual burette/pipette practical stations with gas & water supply',
      'Dedicated fume ventilation and chemical safety eye-wash gear'
    ],
    hotspots: [
      {
        id: 'chem1-benches',
        label: 'Titration & Salt Analysis Benches',
        description: 'Practical lab tables for BISE volumetric titration and salt analysis.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'In Line Right of Principal’s Office · Between Office & Lab 2',
    mapX: 84.0,
    mapY: 62.0,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '79 m · In Line Right of Principal’s Office',
      walkingSteps: [
        'Walk straight past Big Clerk Office Corridor and Garden & Gardeners.',
        'Turn right past Principal’s Office, Stairs, and Chemistry Office in one straight line.',
        'Enter Chemistry Lab 1 between Chemistry Office and Chemistry Lab 2.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 56.8, y: 62.0 },
        { x: 84.0, y: 62.0 }
      ]
    }
  },
  {
    id: 'chemistry-lab-2',
    name: 'Chemistry Lab 2 (In Line Right of Principal’s Office)',
    shortName: 'Chemistry Lab 2',
    subtitle: 'In Line on the Right of Principal’s Office · Next to Chemistry Lab 1',
    category: 'Laboratories',
    stopNumber: '41',
    svgType: 'science-lab',
    badge: 'In Line Right of Principal · Lab 2',
    description:
      'Completing the Chemistry Wing in one horizontal line directly to the RIGHT of Principal’s Office beside Chemistry Lab 1, Chemistry Lab 2 hosts organic chemistry synthesis, analytical practicals, and senior degree laboratory cohorts.',
    keySpecs: [
      { label: 'Facility', value: 'Chemistry Lab 2' },
      { label: 'Position', value: 'In Line Right of Principal’s Office' },
      { label: 'Programs', value: 'HSC Part I/II & Degree Chemistry' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Second dedicated Chemistry laboratory aligned directly to the right of Principal’s Office and Chemistry Lab 1',
      'Supports organic, inorganic, and analytical balance practical sessions',
      'Connected in one straight ground-floor corridor from Principal’s Office through Chemistry Office and Lab 1'
    ],
    hotspots: [
      {
        id: 'chem2-benches',
        label: 'Organic & Analytical Lab Stations',
        description: 'Advanced chemistry lab workstations in line beside Chemistry Lab 1.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'In Line Right of Principal’s Office · Next to Lab 1',
    mapX: 92.3,
    mapY: 62.0,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '84 m · In Line Right of Principal’s Office',
      walkingSteps: [
        'Walk straight past Big Clerk Office Corridor and Garden & Gardeners.',
        'Turn right onto Principal’s Office corridor and continue straight past Principal’s Office, Chemistry Office, and Chemistry Lab 1.',
        'Enter Chemistry Lab 2 at the end of the inline Chemistry Wing.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 56.8, y: 62.0 },
        { x: 92.3, y: 62.0 }
      ]
    }
  },
  {
    id: 'small-garden-computer-lab',
    name: 'Small Garden (Before Computer Lab · Beside Mazar)',
    shortName: 'Small Garden',
    subtitle: 'Green Pocket Garden Beside Historical Graveyard & Mazar Directly Before Computer Lab',
    category: 'Student Life',
    stopNumber: '42',
    svgType: 'courtyard',
    badge: 'Beside Mazar · Before Computer Lab',
    description:
      'Nestled directly before the Computer Lab & Computer Office right beside the Historical Graveyard & Mazar (and above the Big College Hostel), this welcoming Small Garden frames the entry to the Computer Department with blooming flowers and swaying shade trees.',
    keySpecs: [
      { label: 'Location', value: 'Before Computer Lab' },
      { label: 'Right Beside', value: 'Historical Graveyard & Mazar' },
      { label: 'Directly North', value: 'Computer Lab & Office' },
      { label: 'Directly South', value: 'Big College Hostel' }
    ],
    highlights: [
      'Green pocket garden positioned directly before Computer Lab & Computer Office right beside Historical Graveyard & Mazar',
      'Shades the walkway linking Central Courtyard, Computer Department, and Big College Hostel',
      'Connects seamlessly westward into the Straight North-West Trees line'
    ],
    hotspots: [
      {
        id: 'small-garden-lawn',
        label: 'Small Garden Flowerbeds',
        description: 'Neat manicured greenery directly before the Computer Lab entrance beside Historical Graveyard & Mazar.',
        xPercent: 50,
        yPercent: 52
      }
    ],
    locationNote: 'Directly Before Computer Lab · Beside Historical Graveyard & Mazar',
    mapX: 15.1,
    mapY: 60.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '65 m · Beside Mazar Before Comp Lab',
      walkingSteps: [
        'Walk straight along the twin grill path past Big Clerk Office Corridor and the Garden.',
        'Turn left across Central Courtyard Promenade passing Historical Graveyard & Mazar.',
        'Pause at the Small Garden positioned directly before Computer Lab & Office.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 61.6 },
        { x: 27.7, y: 61.6 },
        { x: 15.1, y: 60.5 }
      ]
    }
  },
  {
    id: 'historical-graveyard-mazar',
    name: 'Historical Graveyard & Mazar (Beside Small Garden)',
    shortName: 'Graveyard & Mazar',
    subtitle: 'Historic Sacred Heritage Enclosure Beside Small Garden · Before Computer Lab & Big Multimedia Room',
    category: 'Student Life',
    stopNumber: '43',
    svgType: 'courtyard',
    badge: 'Beside Small Garden · Heritage Site',
    description:
      'Located peacefully beside the Small Garden directly BEFORE entering the Computer Lab & Big Multimedia Room (between Central Courtyard Promenade and the Hostel), the Historical Graveyard & Mazar preserves revered historic graves and a tranquil domed shrine enclosure shaded by cypress and neem trees inside the college grounds.',
    keySpecs: [
      { label: 'Landmark', value: 'Historical Graveyard & Mazar' },
      { label: 'Beside', value: 'Small Garden' },
      { label: 'Right Ahead', value: 'Computer Lab & Big Multimedia Room' },
      { label: 'Character', value: 'Historic Heritage Enclosure' }
    ],
    highlights: [
      'Positioned cleanly beside Small Garden directly before Computer Lab and Big Multimedia Room',
      'Features a tranquil domed Mazar shrine pavilion alongside preserved historical graves',
      'Shaded by serene greenery bridging the Central Courtyard and Computer Department walkway'
    ],
    hotspots: [
      {
        id: 'mazar-dome',
        label: 'Historic Domed Mazar',
        description: 'Tranquil white-and-emerald heritage shrine pavilion inside the walled enclosure.',
        xPercent: 68,
        yPercent: 48
      },
      {
        id: 'historical-graves',
        label: 'Preserved Historical Graveyard',
        description: 'Neat stone-bordered heritage graves shaded by cypress trees beside the Small Garden.',
        xPercent: 30,
        yPercent: 56
      }
    ],
    locationNote: 'Beside Small Garden · Directly Before Computer Lab & Big Multimedia Room',
    mapX: 27.7,
    mapY: 60.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '60 m · Before Computer Lab & Multimedia',
      walkingSteps: [
        'Walk straight along the twin grill path past Big Clerk Office Corridor and the Garden.',
        'Turn left past Central Courtyard Promenade before reaching the Computer Department.',
        'Arrive at the Historical Graveyard & Mazar right beside Small Garden, directly before Computer Lab and Big Multimedia Room.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 61.6 },
        { x: 27.7, y: 61.6 },
        { x: 27.7, y: 60.5 }
      ]
    }
  },
  {
    id: 'tennis-volleyball-grounds',
    name: 'Tennis Court & Volleyball Ground (Left of Pakistan Studies)',
    shortName: 'Tennis & Volleyball',
    subtitle: 'Directly on the Left of Pakistan Studies · Above Straight North-West Trees & Hostel',
    category: 'Student Life',
    stopNumber: '44',
    svgType: 'sports',
    badge: 'Left of Pakistan Studies · Courts',
    description:
      'Located directly on the left of the Department of Pakistan Studies (above the Straight North-West Trees, Small Garden & College Hostel and alongside Physical Education, Urdu & Commerce), these twin outdoor courts support inter-collegiate girls’ Tennis and Volleyball matches.',
    keySpecs: [
      { label: 'Location', value: 'On Left of Pakistan Studies' },
      { label: 'Courts', value: 'Tennis Court & Volleyball Court' },
      { label: 'South Neighbor', value: 'North-West Trees & Hostel' },
      { label: 'Department', value: 'Physical Education' }
    ],
    highlights: [
      'Positioned cleanly on the immediate left of Pakistan Studies inside the Golden Boundary Wall',
      'Marked hard-surface Tennis Court and lined Volleyball Court side-by-side',
      'Connected directly south through the Straight North-West Trees to Small Garden & Computer Lab'
    ],
    hotspots: [
      {
        id: 'tennis-court-zone',
        label: 'Tennis Court (Left)',
        description: 'Marked college tennis court beside the Volleyball Court.',
        xPercent: 32,
        yPercent: 50
      },
      {
        id: 'volleyball-court-zone',
        label: 'Volleyball Court (Right)',
        description: 'Volleyball court positioned directly adjacent to Pakistan Studies.',
        xPercent: 68,
        yPercent: 50
      }
    ],
    locationNote: 'North-West Sports Zone · Directly on Left of Pakistan Studies',
    mapX: 10.8,
    mapY: 42.4,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '92 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill path past the Garden and turn left onto the two-grill Computer Lab walkway.',
        'Proceed past the Computer Department, Small Garden, and North-West Trees.',
        'Arrive at the Tennis Court & Volleyball Ground directly on the left of Pakistan Studies.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 53.9 },
        { x: 10.8, y: 53.9 },
        { x: 10.8, y: 42.4 }
      ]
    }
  },
  {
    id: 'muslim-history-dept',
    name: 'Department of Muslim History (By Stairs · 1st Floor)',
    shortName: 'Muslim History',
    subtitle: 'By Stairs (1st Floor) · Enlarged Upper Tier Between Islamiat & Political Science',
    category: 'Academics',
    stopNumber: '45',
    svgType: 'academic-wing',
    badge: 'By Stairs · Enlarged 1st Fl',
    description:
      'Located in the enlarged upper tier of the By-Stairs 1st-Floor wing cleanly between Islamiat and Political Science, the Department of Muslim History conducts intermediate and degree courses in Islamic civilization and South Asian history.',
    keySpecs: [
      { label: 'Department', value: 'Muslim History' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Neighbors', value: 'Islamiat & Political Science' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Enlarged lecture room positioned right between Islamiat and Political Science',
      'Directly above English and Physics Lab',
      'Supports BA, BS Humanities, and competitive history cohorts'
    ],
    hotspots: [
      {
        id: 'muslim-history-room',
        label: 'Muslim History Lecture Hall',
        description: 'Dedicated classroom for Islamic & Muslim historical studies.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · Between Islamiat & Political Science',
    mapX: 65.3,
    mapY: 45.4,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '77 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up to the upper tier of the enlarged 1st Floor Building.',
        'Step into the Department of Muslim History right beside Islamiat and Political Science.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 45.4 },
        { x: 65.3, y: 45.4 }
      ]
    }
  },
  {
    id: 'political-science-dept',
    name: 'Department of Political Science (By Stairs · 1st Floor)',
    shortName: 'Political Science',
    subtitle: 'By Stairs (1st Floor) · Enlarged Upper Tier Between Muslim History & Mathematics',
    category: 'Academics',
    stopNumber: '46',
    svgType: 'academic-wing',
    badge: 'By Stairs · Enlarged 1st Fl',
    description:
      'Located in the enlarged upper tier of the By-Stairs 1st-Floor wing between Muslim History and Mathematics (directly above the expansive Physics Wing), the Department of Political Science offers Civics, Constitutional Studies, and Political Thought classes.',
    keySpecs: [
      { label: 'Department', value: 'Political Science' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Neighbors', value: 'Muslim History & Mathematics' },
      { label: 'Programs', value: 'Civics · B.A. / B.S. Pol. Science' }
    ],
    highlights: [
      'Enlarged department hall positioned cleanly between Muslim History and Mathematics',
      'Directly above the largest Physics Department wing',
      'Hosts civic debates, parliamentary model sessions, and degree lectures'
    ],
    hotspots: [
      {
        id: 'pol-sci-hall',
        label: 'Political Science Lecture Room',
        description: 'Classroom for civics, constitutional history, and political theory.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · Between Muslim History & Mathematics',
    mapX: 74.1,
    mapY: 45.4,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '79 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs up to the upper tier of the enlarged 1st Floor Building.',
        'Walk past Muslim History into the Department of Political Science.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 45.4 },
        { x: 74.1, y: 45.4 }
      ]
    }
  },
  {
    id: 'physics-office',
    name: 'Physics Office (Inside Largest Physics Wing · 1st Floor)',
    shortName: 'Physics Office',
    subtitle: 'By Stairs (1st Floor) · Between Physics Lab & Statistics (Before Dark Room)',
    category: 'Laboratories',
    stopNumber: '47',
    svgType: 'science-lab',
    badge: 'Physics Wing · Office',
    description:
      'Positioned inside the enlarged Physics Department wing directly between Physics Lab and Statistics (just before Dark Room), the Physics Office houses department faculty, practical records, and precision optics/electrical apparatus storage.',
    keySpecs: [
      { label: 'Facility', value: 'Physics Faculty Office' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Neighbors', value: 'Physics Lab (Left) · Statistics (Right)' },
      { label: 'Wing', value: 'Largest Physics Department' }
    ],
    highlights: [
      'Dedicated Physics Faculty Office seamlessly integrated with the oversized Physics Lab',
      'Coordinates practical batches for Physics Lab and Physics Optics Dark Room',
      'Positioned right before Statistics and Dark Room'
    ],
    hotspots: [
      {
        id: 'physics-faculty-desk',
        label: 'Physics Department Office',
        description: 'Faculty consultation & precision apparatus office inside Physics Wing.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · Inside Largest Physics Wing',
    mapX: 75.6,
    mapY: 51.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '78 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up to the enlarged 1st Floor Building.',
        'Walk past Physics Lab into the Physics Office.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 51.5 },
        { x: 75.6, y: 51.5 }
      ]
    }
  },
  {
    id: 'physics-dark-room',
    name: 'Physics Dark Room (Optics Chamber · 1st Floor)',
    shortName: 'Dark Room',
    subtitle: 'By Stairs (1st Floor) · Directly After Statistics & Beside Corner Auditorium Hall',
    category: 'Laboratories',
    stopNumber: '48',
    svgType: 'science-lab',
    badge: 'Physics Optics · Dark Room',
    description:
      'Completing the Physics & Quantitative row right after the Department of Statistics and beside the Corner Auditorium Hall, the light-sealed Physics Dark Room supports spectrometer, optical bench, prism dispersion, and wave-optics practicals.',
    keySpecs: [
      { label: 'Facility', value: 'Physics Optics Dark Room' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Before It', value: 'Department of Statistics' },
      { label: 'Beside It', value: 'Corner Auditorium Hall' }
    ],
    highlights: [
      'Dedicated light-controlled optics practical chamber part of the enlarged Physics Wing',
      'Positioned cleanly immediately after Statistics and next to Corner Auditorium Hall',
      'Equipped with optical benches, spectrometers, and monochromatic sodium lamps'
    ],
    hotspots: [
      {
        id: 'darkroom-optics',
        label: 'Optics & Spectrometer Benches',
        description: 'Blackout chamber for prism refraction and diffraction experiments.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Enlarged 1st Floor (By Stairs) · After Statistics · Beside Corner Auditorium',
    mapX: 84.8,
    mapY: 51.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '82 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up to the enlarged 1st Floor Building.',
        'Walk past Physics Lab, Physics Office & Statistics into the Physics Dark Room.'
      ],
      routePath: [
        { x: 50, y: 95.1 },
        { x: 50, y: 62.0 },
        { x: 63.0, y: 62.0 },
        { x: 63.0, y: 51.5 },
        { x: 84.8, y: 51.5 }
      ]
    }
  }
];

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

export const GATE_COORDS = { x: 50, y: 92.6 };

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
    aheadView: 'Gate Security Guards & Straight Twin-Grill Walkway',
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
    label: 'Passing Garden & Gardeners Toward Principal’s Office & Stairs',
    leftView: 'Central Courtyard, Small Garden & Left 2-Grill Path · Tennis & Volleyball Left of Pak Studies',
    aheadView: 'Assembly, Zoology & Botany → Exit Path from Botany → Very Big Ground (Car Parking, Old Bus, Sports Gymnasium) → Garden → Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office, Labs 1–2',
    rightView: 'Garden & Gardeners · Principal’s Office, Stairs & Path to Auditorium Hall'
  },
  {
    progress: 1,
    label: 'Arrived at Grand Golden Principal’s Office (Path to Auditorium Hall & 6 Depts By Stairs)',
    leftView: 'Central Courtyard Promenade, Small Garden, Computer Lab & Tennis/Volleyball Left of Pak Studies',
    aheadView: 'Straight north: Assembly, Zoology & Botany → Path from Botany → Very Big Ground (Car Parking, Old Bus, Sports Gymnasium) → Garden → Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office, Chemistry Lab 1 & 2',
    rightView: 'Principal’s Office → Stairs (↑ 6 Depts: Staff Room, Islamiat, English, Stats, Maths, Physics) → Path to Auditorium Hall'
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
    mapY: 92.6,
    gateDirections: {
      turn: 'Entry Gate',
      distanceFromGate: '0 m (Start Point)',
      walkingSteps: [
        'Enter through the Security-monitored Main Gate inside the Golden Boundary Wall (Waiting Room on left, Canteen & Central Library on right).',
        'Walk straight along the twin grill path across the walking distance to the Big Clerk Office Corridor BEFORE the Garden & Gardeners.',
        'Pass the Garden & Gardeners into Principal’s Office, or head north via Botany Path → Very Big Ground → Garden → Economics to Chemistry Labs.'
      ],
      routePath: [{ x: 50, y: 92.6 }]
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
    mapY: 86.0,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '14 m Left',
      walkingSteps: [
        'Enter through the Security-monitored Main Gate.',
        'Turn left immediately upon entering.',
        'First comes the Visitor Waiting Room on your left.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 86.0 },
        { x: 22.0, y: 86.0 }
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
    mapX: 57.8,
    mapY: 86.0,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '12 m Right',
      walkingSteps: [
        'Enter through the Main College Gate.',
        'Turn right immediately inside the Golden College Boundary.',
        'The College Canteen sits on your right (with Central Library directly on its right).'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 86.0 },
        { x: 57.8, y: 86.0 }
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
    mapX: 67.0,
    mapY: 63.2,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '32 m Straight · Before Garden',
      walkingSteps: [
        'Enter Main Gate (Canteen & Central Library on your right) and walk across the walking distance.',
        'Turn right immediately into the Big Clerk Office Corridor (located directly before Garden & Gardeners).',
        'Access Student Records & Admissions Windows inside the Big Clerk Office.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 68.3 },
        { x: 67.0, y: 68.3 },
        { x: 67.0, y: 63.2 }
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
    mapX: 69.7,
    mapY: 86.0,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '24 m Right (Past Canteen)',
      walkingSteps: [
        'Enter the Main Gate and turn right inside the Golden Boundary Wall.',
        'Pass immediately past the College Canteen on your right.',
        'Enter the Central College Library directly on the right of the Canteen.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 86.0 },
        { x: 69.7, y: 86.0 }
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
    mapX: 50,
    mapY: 53.6,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '46 m Straight · After Clerk Office',
      walkingSteps: [
        'Enter Main Gate (Security) with Canteen & Central Library on right and Waiting Room on left.',
        'Walk straight along the twin paths separated by the small grill past the walking distance and Big Clerk Office Corridor.',
        'Reach the lush Garden & Gardeners on your right directly AFTER Big Clerk Office Corridor.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 53.6 }
      ]
    }
  },
  {
    id: 'auditorium-hall',
    name: 'College Auditorium Hall',
    shortName: 'Auditorium Hall',
    subtitle: 'Upper-Right Wing · Dedicated Path from Principal’s Office Past Stairs',
    category: 'Student Life',
    stopNumber: '07',
    svgType: 'auditorium',
    badge: 'Dedicated Path from Principal',
    description:
      'Located beside the 6-department By-Stairs 1st-Floor wing, the College Auditorium Hall is reached via a dedicated walking corridor directly from the Principal’s Office past the Stairs.',
    keySpecs: [
      { label: 'Seating', value: '600+ Attendees' },
      { label: 'Position', value: 'Right of 1st-Fl By-Stairs Wing' },
      { label: 'Direct Access', value: 'Path from Principal’s Office' },
      { label: 'East Corridor', value: 'Garden-Facing Dept. Wing' }
    ],
    highlights: [
      'Connected directly by a marked walking path from Principal’s Office past the Stairs',
      'Positioned cleanly right of the 6-department By-Stairs 1st-Floor Building',
      'Spacious ceremonial hall for convocation, debates, and academic gatherings'
    ],
    hotspots: [
      {
        id: 'podium',
        label: "Principal's Podium",
        description: 'Formal ceremonial stage lectern directly connected from Principal’s Office.',
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
    locationNote: 'Upper-Right Wing · Direct Path from Principal’s Office',
    mapX: 73.2,
    mapY: 24.9,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '68 m · Path from Principal Office',
      walkingSteps: [
        'Walk straight along the twin grill paths past Big Clerk Office Corridor and the Garden to Principal’s Office.',
        'Follow the dedicated Principal-to-Auditorium path east past the central Stairs.',
        'Turn straight up into the College Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 57.8, y: 41.9 },
        { x: 73.2, y: 41.9 },
        { x: 73.2, y: 24.9 }
      ]
    }
  },
  {
    id: 'principal-office',
    name: 'Principal’s Office & Executive Suite',
    shortName: 'Principal’s Office',
    subtitle: 'Grand Golden Landmark · Direct Path to Auditorium Hall & Stairs to 6 Departments',
    category: 'Administration',
    stopNumber: '08',
    svgType: 'principal-office',
    badge: 'Executive Suite · Path to Auditorium',
    description:
      'Walking straight past Big Clerk Office Corridor and the Garden & Gardeners brings you to the prominent Golden Principal’s Office—the executive office of Principal Prof. Yasmeen Panhwar—with a direct marked corridor running east past the central Stairs straight into the Auditorium Hall.',
    keySpecs: [
      { label: 'Principal', value: 'Prof. Yasmeen Panhwar' },
      { label: 'Direct Path', value: 'To Auditorium Hall → ↑' },
      { label: 'By Stairs (6)', value: 'Staff Room, Islamiat, English, Stats, Maths, Physics' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' }
    ],
    highlights: [
      'Positioned prominently right past Big Clerk Office Corridor and the Garden & Gardeners',
      'Direct marked walkway leads from Principal’s Office past Stairs straight up to Auditorium Hall',
      'Stairs lead up to all 6 adjusted 1st-floor suites: General Staff Room, Islamiat & Islamic Culture, English, Statistics (before Dark Room), Mathematics & Physics Lab/Office/Dark Room'
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
    locationNote: 'Right Side · Direct Path East to Auditorium Hall & Stairs to 6 Depts.',
    mapX: 57.8,
    mapY: 41.9,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '58 m Straight · Right',
      walkingSteps: [
        'Enter Main Gate (Canteen & Central Library on your right) and walk straight past the walking distance.',
        'Pass the Big Clerk Office Corridor and Garden & Gardeners.',
        'Turn right into the grand Golden Principal’s Office, with the direct path east to Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 53.6 },
        { x: 50, y: 41.9 },
        { x: 57.8, y: 41.9 }
      ]
    }
  },
  {
    id: 'general-staff-room',
    name: 'General Staff Room (By Stairs · 1st Floor)',
    shortName: 'General Staff Room',
    subtitle: 'By Stairs (1st Floor) · Adjusted with Physics, English, Maths, Statistics & Islamiat',
    category: 'Administration',
    stopNumber: '09',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Climbing the central Stairs beside Principal’s Office brings you up into the adjusted 1st-Floor wing housing all six By-Stairs departments: General Staff Room, English Classes, Physics Lab/Office/Dark Room, Islamiat & Islamic Culture, Statistics, and Mathematics.',
    keySpecs: [
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Wing Neighbors', value: 'English, Physics, Islamiat, Stats, Maths' },
      { label: 'Below', value: 'Principal’s Office' },
      { label: 'Purpose', value: 'Faculty Lounge Suite' }
    ],
    highlights: [
      'Positioned inside the unified 1st-Floor Building clearly accessed By Stairs',
      'Grouped together with Islamiat & Islamic Culture, English, Statistics, Mathematics & Physics Lab/Office/Dark Room',
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
    locationNote: '1st Floor Building (By Stairs) · Beside English Classes',
    mapX: 54.0,
    mapY: 31.0,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '68 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs up to the 1st Floor Building housing all 6 adjusted departments.',
        'Walk past Statistics and Physics into the General Staff Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 65.7, y: 41.9 },
        { x: 65.7, y: 29.5 },
        { x: 54.0, y: 29.5 },
        { x: 54.0, y: 31.0 }
      ]
    }
  },
  {
    id: 'islamiat-english',
    name: 'Department of Islamiat & Islamic Culture (By Stairs · 1st Floor)',
    shortName: 'Islamiat & Culture',
    subtitle: 'By Stairs (1st Floor) · Adjusted Beside Mathematics & Above Staff Room / English',
    category: 'Academics',
    stopNumber: '10',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Adjusted into the 1st-Floor wing reached directly via the central Stairs alongside General Staff Room, Statistics, Mathematics, English Classes, and Physics Lab/Office/Dark Room, the Department of Islamiat & Islamic Culture hosts Quranic, Hadith, and Islamic heritage classes.',
    keySpecs: [
      { label: 'Department', value: 'Islamiat & Islamic Culture' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Adjacent To', value: 'Mathematics & Staff Room' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Adjusted into the unified 6-department 1st-Floor Building reached By Stairs',
      'Right above General Staff Room & English Classes beside Mathematics',
      'Hosts annual Seerat-un-Nabi and Qirat academic seminars'
    ],
    hotspots: [
      {
        id: 'islamiat-room',
        label: 'Islamiat & Islamic Culture Hall',
        description: 'Dedicated 1st-floor lecture rooms for Islamic Studies & Culture.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: '1st Floor Building (By Stairs) · Above Staff Room Beside Mathematics',
    mapX: 56.9,
    mapY: 18.1,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '70 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs up to the upper tier of the 1st Floor Building.',
        'Walk past Mathematics into Islamiat & Islamic Culture.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 65.7, y: 41.9 },
        { x: 65.7, y: 18.1 },
        { x: 56.9, y: 18.1 }
      ]
    }
  },
  {
    id: 'english-dept',
    name: 'English Classes & Department of English (By Stairs · 1st Floor)',
    shortName: 'English Classes',
    subtitle: 'By Stairs (1st Floor) · Between General Staff Room & Largest Physics Department',
    category: 'Academics',
    stopNumber: '11',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Located inside the 1st-Floor Building reached directly By Stairs—right between the General Staff Room and the expansive Physics Department (Lab/Office/Dark Room)—the English Classes teach composition, prose, poetry, and academic communication across HSC and Degree cohorts.',
    keySpecs: [
      { label: 'Department', value: 'English Classes' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Between', value: 'Staff Room & Physics Dept.' },
      { label: 'Focus', value: 'Literature & Rhetoric' }
    ],
    highlights: [
      'Dedicated English lecture classes inside the By-Stairs 1st-Floor Building',
      'Direct access via the central Stairs between Principal’s Office and the Auditorium path',
      'Adjacent to General Staff Room and the largest Physics Department row'
    ],
    hotspots: [
      {
        id: 'english-room',
        label: 'English Lecture Rooms',
        description: 'Classrooms for English literature and academic composition.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: '1st Floor Building (By Stairs) · Between Staff Room & Physics Dept.',
    mapX: 57.2,
    mapY: 24.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '66 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the Stairs.',
        'Climb the Stairs up to the 1st Floor Building.',
        'Enter English Classes right beside the large Physics Department and General Staff Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 65.7, y: 41.9 },
        { x: 65.7, y: 24.5 },
        { x: 57.2, y: 24.5 }
      ]
    }
  },
  {
    id: 'statistics-mathematics',
    name: 'Department of Statistics (By Stairs · 1st Floor)',
    shortName: 'Statistics Dept.',
    subtitle: 'By Stairs (1st Floor) · Directly Before Dark Room & Right at Top of Stairs',
    category: 'Academics',
    stopNumber: '12',
    svgType: 'academic-wing',
    badge: 'By Stairs · Before Dark Room',
    description:
      'Positioned inside the 1st-Floor Building reached directly By Stairs—immediately BEFORE the Physics Dark Room and right alongside the Physics Department—the Department of Statistics teaches probability, biostatistics, sampling theory, and economic data analysis for ICS, Commerce, and Science students.',
    keySpecs: [
      { label: 'Department', value: 'Statistics' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Position', value: 'Immediately Before Dark Room' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned right at the top of the Stairs immediately BEFORE the Dark Room',
      'Stands in the 1st-floor row directly beside Physics Office/Lab and Dark Room',
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
    locationNote: '1st Floor Building (By Stairs) · Directly Before Dark Room',
    mapX: 66.7,
    mapY: 24.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '64 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up to the 1st Floor Building.',
        'Arrive immediately at the Department of Statistics directly before Dark Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 65.7, y: 41.9 },
        { x: 65.7, y: 24.5 },
        { x: 66.7, y: 24.5 }
      ]
    }
  },
  {
    id: 'mathematics-dept',
    name: 'Department of Mathematics (By Stairs · 1st Floor)',
    shortName: 'Mathematics Dept.',
    subtitle: 'By Stairs (1st Floor) · Beside Islamiat Above Physics, Statistics & Dark Room',
    category: 'Academics',
    stopNumber: '13',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Adjusted into the unified By-Stairs 1st-Floor Building right above Physics, Statistics & Dark Room and beside Islamiat, the Department of Mathematics conducts Pre-Engineering, ICS, and Associate Degree lectures.',
    keySpecs: [
      { label: 'Department', value: 'Mathematics' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Beside', value: 'Islamiat & Auditorium Hall' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Adjusted right inside the 6-department 1st-Floor Building reached By Stairs',
      'Shares the By-Stairs wing with Statistics (before Dark Room), Islamiat, General Staff Room, English & Physics',
      'Prepares students for BISE Engineering honors and university STEM degrees'
    ],
    hotspots: [
      {
        id: 'math-room',
        label: 'Mathematics Classrooms',
        description: 'Pure & applied mathematics classrooms at the top of the 1st-Floor Stairs.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: '1st Floor Building (By Stairs) · Above Physics, Statistics & Dark Room',
    mapX: 65.8,
    mapY: 18.1,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '67 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up to the upper tier of the 1st Floor Building.',
        'Step directly into the Department of Mathematics beside Islamiat.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 65.7, y: 41.9 },
        { x: 65.7, y: 18.1 },
        { x: 65.8, y: 18.1 }
      ]
    }
  },
  {
    id: 'physics-lab-darkroom',
    name: 'Physics Department (Physics Lab, Physics Office & Dark Room)',
    shortName: 'Physics Dept. & Dark Room',
    subtitle: 'Largest Campus Department · By Stairs in Row with English, Staff Room & Statistics Before Dark Room',
    category: 'Laboratories',
    stopNumber: '14',
    svgType: 'science-lab',
    badge: 'Largest Dept. · By Stairs (1st Fl)',
    description:
      'Spanning the largest departmental footprint on campus right in its 1st-Floor row beside English Classes and General Staff Room (with Statistics positioned immediately before the Optics Dark Room at the right end of the wing), the Physics Department houses the expansive Physics Practical Laboratory, dedicated Physics Faculty Office, and light-sealed Dark Room.',
    keySpecs: [
      { label: 'Scale', value: 'Largest Department on Campus' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Sections', value: 'Physics Lab · Office · Dark Room' },
      { label: 'Row With', value: 'English, Staff Room & Stats Before Dark Room' }
    ],
    highlights: [
      'Largest single department wing on campus, prominently spanning the lower tier of the 1st-Floor By-Stairs Building',
      'Houses Physics Practical Lab & Physics Faculty Office beside English Classes, with Statistics right before the Optics Dark Room',
      'Accessible directly via the central Stairs between Principal’s Office and the Auditorium path'
    ],
    hotspots: [
      {
        id: 'physics-lab-bench',
        label: 'Physics Practical Hall',
        description: 'Expansive electrical bridges, pendulums, and mechanics apparatus hall.',
        xPercent: 25,
        yPercent: 52
      },
      {
        id: 'physics-office-room',
        label: 'Physics Office',
        description: 'Physics department faculty office & apparatus store beside Physics Lab.',
        xPercent: 55,
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
    locationNote: '1st Floor Building (By Stairs) · Largest Dept. in Row with English & Staff Room',
    mapX: 62.1,
    mapY: 30.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '65 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office to the central Stairs.',
        'Climb the Stairs straight up into the 1st Floor Building (passing Statistics before Dark Room).',
        'Step directly into the expansive Physics Department (Lab, Office & Dark Room) beside English Classes.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 65.7, y: 41.9 },
        { x: 65.7, y: 28.5 },
        { x: 62.1, y: 28.5 },
        { x: 62.1, y: 30.5 }
      ]
    }
  },
  {
    id: 'greenhouse-prayer-ground',
    name: 'Assembly Ground, Flag Hoisting, Greenhouse & Prayer Room',
    shortName: 'Assembly & Flag',
    subtitle: 'Before Zoology & Botany Labs · Morning Assembly, Flag Hoisting, Lawn & Prayer Room',
    category: 'Student Life',
    stopNumber: '15',
    svgType: 'courtyard',
    badge: 'Before Zoology · Assembly & Flag',
    description:
      'Directly before the Zoology and Botany departments along the northern campus wing sits the Morning Assembly & Flag Hoisting Ground with its flagpole and dais, alongside the green Garden Lawn, Botanical Greenhouse, and quiet Prayer Room (Namaz Hall).',
    keySpecs: [
      { label: 'Main Feature', value: 'Assembly & Flag Hoisting' },
      { label: 'Garden & Ground', value: 'Green Lawn & Greenhouse' },
      { label: 'Facility', value: 'Prayer Room (Namaz Hall)' },
      { label: 'Next Ahead', value: 'Zoology & Botany → Path to Big Ground' }
    ],
    highlights: [
      'Morning Assembly Courtyard & National Flag Hoisting Podium right before Zoology & Botany',
      'Lush green Garden Lawn and Botanical Greenhouse for live plant cultivation',
      'Clean, peaceful Prayer Room (Namaz Hall) for students and faculty'
    ],
    hotspots: [
      {
        id: 'assembly-flag',
        label: 'Assembly & Flag Hoisting',
        description: 'Campus flagpole dais for morning assembly and national celebrations.',
        xPercent: 28,
        yPercent: 48
      },
      {
        id: 'greenhouse',
        label: 'Botanical Greenhouse',
        description: 'Glass-roofed botanical plant nursery right beside the assembly lawn.',
        xPercent: 58,
        yPercent: 34
      },
      {
        id: 'prayer-room',
        label: 'Campus Prayer Room',
        description: 'Peaceful Prayer Room (Namaz Hall) for students and staff.',
        xPercent: 80,
        yPercent: 64
      }
    ],
    locationNote: 'North Wing · Assembly Ground Before Zoology & Botany',
    mapX: 46.5,
    mapY: 7.4,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '82 m North',
      walkingSteps: [
        'Walk straight across the twin grill spine past Principal’s Office line toward the northern row.',
        'Arrive at the Assembly & Flag Hoisting Ground, Lawn, Greenhouse & Prayer Room right before Zoology & Botany.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 }
      ]
    }
  },
  {
    id: 'zoology-botany-labs',
    name: 'Department of Zoology & Zoology Lab',
    shortName: 'Zoology Lab',
    subtitle: 'Right Past Assembly & Flag Ground · Pre-Medical & BS Zoology',
    category: 'Laboratories',
    stopNumber: '16',
    svgType: 'science-lab',
    badge: 'Separate Dept. · BS Zoology',
    description:
      'Immediately beyond the Assembly & Flag Hoisting Ground stands the dedicated Department of Zoology and Zoology Laboratory—supporting our flagship 4-year BS Zoology degree, Pre-Medical practicals, microscopy stations, and preserved zoological specimen archives.',
    keySpecs: [
      { label: 'Department', value: 'Zoology & Zoology Lab' },
      { label: 'Programs', value: 'Pre-Medical & 4-Yr BS Zoology' },
      { label: 'Before It', value: 'Assembly & Flag Ground' },
      { label: 'After Next', value: 'Botany → Path to Big Ground' }
    ],
    highlights: [
      'Separate dedicated point & laboratory wing for Zoology & BS Zoology',
      'Equipped with high-power compound microscopes, dissection stations & specimens',
      'Followed by Botany Lab and the direct path into Very Big Ground & Garden'
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
    locationNote: 'North Wing · Past Assembly & Flag Ground (Before Botany)',
    mapX: 52.8,
    mapY: 7.4,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '86 m North-East',
      walkingSteps: [
        'Walk straight from the Main Gate past the Garden and Principal’s Office line.',
        'Proceed north through the Assembly & Flag Hoisting Ground.',
        'Enter the Department of Zoology & Zoology Lab.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 52.8, y: 7.4 }
      ]
    }
  },
  {
    id: 'botany-dept-lab',
    name: 'Department of Botany & Botany Lab',
    shortName: 'Botany Lab',
    subtitle: 'Beside Zoology · Direct Exit Path from Botany Opens Into Very Big Ground (Car Parking, Old Bus, Sports Gymnasium)',
    category: 'Laboratories',
    stopNumber: '17',
    svgType: 'science-lab',
    badge: 'Path Starts Here · Botany Lab',
    description:
      'Beside Zoology sits the dedicated Department of Botany and Botany Laboratory—housing a curated Sindh regional herbarium, plant anatomy slides, and botanical charts. Exiting straight out of Botany onto the dedicated Path from Botany brings you directly into the Very Big Ground featuring Car Parking, the Old Bus bay, and the Sports Gymnasium, ending at the flowering Garden facing Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office, Chemistry Lab 1, and Chemistry Lab 2.',
    keySpecs: [
      { label: 'Department', value: 'Botany & Botany Lab' },
      { label: 'Exit Path', value: 'Path from Botany → Very Big Ground' },
      { label: 'In Ground', value: 'Car Parking · Old Bus · Sports Gymnasium' },
      { label: 'After Ground', value: 'Garden → 8-Room Corridor' }
    ],
    highlights: [
      'Separate dedicated point & lab for Botany, plant taxonomy, and physiology',
      'Direct paved Path from Botany leads straight into the Very Big Ground (Car Parking, Old Bus, Sports Gymnasium)',
      'At the end of Very Big Ground sits the Garden facing Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office & Labs 1–2'
    ],
    hotspots: [
      {
        id: 'botany-lab',
        label: 'Botany & Herbarium Lab',
        description: 'Plant taxonomy lab and preserved herbarium hall right at the Botany exit path.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: 'North Wing · Direct Exit Path from Botany Into Very Big Ground',
    mapX: 59.0,
    mapY: 7.4,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '90 m North-East',
      walkingSteps: [
        'Walk straight past the Garden and Principal’s Office line.',
        'Bear right past Assembly & Flag Ground and Zoology & Zoo Lab.',
        'Enter Botany & Botany Lab, where the Path from Botany exits directly toward Very Big Ground.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 }
      ]
    }
  },
  {
    id: 'hostel-computer-lab',
    name: 'College Hostel (Main Residential Block)',
    shortName: 'College Hostel',
    subtitle: 'Below Small Garden & Computer Lab · Above West Garden Lawn & Straight N-W Trees Line',
    category: 'Student Life',
    stopNumber: '18',
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
    mapY: 55.4,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '58 m Straight · Left Above West Garden',
      walkingSteps: [
        'Walk straight from the Main Gate past the Waiting Room, West Garden Lawn, and Clerk Office Corridor.',
        'Turn left cleanly above West Garden Lawn (below the Small Garden & Computer Lab).',
        'Arrive at the Big College Hostel connected to the Straight North-West Trees line.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 58.3 },
        { x: 32.0, y: 58.3 },
        { x: 17.1, y: 55.4 }
      ]
    }
  },
  {
    id: 'computer-lab',
    name: 'Computer Department · Computer Lab & Computer Office',
    shortName: 'Computer Lab & Office',
    subtitle: 'Computer Department · Directly Behind Small Garden (with Big Multimedia, Pak Studies, Urdu & Physical Education)',
    category: 'Laboratories',
    stopNumber: '19',
    svgType: 'computer-lab',
    badge: 'Computer Department · Past Small Garden',
    description:
      'Part of the labeled Computer Department wing positioned right behind the Small Garden (before Computer Lab) in one continuous ground-floor corridor—alongside Big Computer Multimedia Room, Pakistan Studies, Urdu, and Physical Education (under 1st-floor Commerce)—the Computer Lab & Computer Office feature modern desktop terminals and solar-backed power.',
    keySpecs: [
      { label: 'Department', value: 'Computer Department' },
      { label: 'Before Entry', value: 'Small Garden' },
      { label: 'Same Corridor', value: 'Big Multimedia, Pak Studies, Urdu, Physical Education' },
      { label: 'Energy', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Labeled Computer Department wing directly preceded by the lush Small Garden before Computer Lab',
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
    locationNote: 'Computer Department · Directly Past Small Garden · Unified Ground Corridor',
    mapX: 24.8,
    mapY: 28.8,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '70 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Garden, Clerk Corridor, and Principal’s Office line.',
        'Turn left onto the 2-grill Computer Lab path (passing right beside the Small Garden before Computer Lab).',
        'Enter the Computer Lab & Computer Office beside Big Multimedia Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 36.1, y: 30.4 },
        { x: 24.8, y: 28.8 }
      ]
    }
  },
  {
    id: 'computer-multimedia-room',
    name: 'Computer Department · Big Computer Multimedia Room & Smart Hall',
    shortName: 'Big Multimedia Room',
    subtitle: 'Computer Department · Extra-Large Smart Hall Beside Computer Lab & Office, Hostel & Humanities',
    category: 'Laboratories',
    stopNumber: '20',
    svgType: 'multimedia-room',
    badge: 'Computer Department · Wide Smart Hall',
    description:
      'Housed inside the Computer Department at the entry of the unified corridor beside Computer Office & Computer Lab and just above the College Hostel—and linked directly in one corridor to Pakistan Studies, Urdu, and Physical Education below 1st-floor Commerce (reached via Stairs)—the Big Computer Multimedia Room hosts HD smart projections and seminars.',
    keySpecs: [
      { label: 'Department', value: 'Computer Department' },
      { label: 'Same Corridor', value: 'Comp Lab/Office, Pak Studies, Urdu, Physical Education' },
      { label: 'Same Building', value: 'Commerce 1st Floor (By Stairs)' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Extra-large Big Computer Multimedia Room inside the labeled Computer Department wing',
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
    locationNote: 'Computer Department · Unified Corridor Above Hostel · Solar Powered',
    mapX: 36.1,
    mapY: 28.8,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '64 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Garden and Principal’s Office line.',
        'Turn left onto the 2-grill pathway heading into the Computer Department.',
        'Enter the Big Computer Multimedia Room right alongside Computer Lab & Computer Office.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 36.1, y: 28.8 }
      ]
    }
  },
  {
    id: 'pak-urdu-pe',
    name: 'Department of Pakistan Studies',
    shortName: 'Pak Studies',
    subtitle: 'Separate Point in Same Corridor · Tennis Court & Volleyball Directly on Left of Pakistan Studies',
    category: 'Academics',
    stopNumber: '21',
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
    mapX: 22.9,
    mapY: 15.0,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '78 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill path past West Garden & Garden and turn left onto the two-grill Computer Lab corridor.',
        'Continue past the Computer Department inside the same building.',
        'Enter the Department of Pakistan Studies.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 22.9, y: 30.4 },
        { x: 22.9, y: 15.0 }
      ]
    }
  },
  {
    id: 'urdu-dept',
    name: 'Department of Urdu',
    shortName: 'Urdu Dept.',
    subtitle: 'Separate Point Between Pakistan Studies & Physical Education in Same Corridor',
    category: 'Academics',
    stopNumber: '22',
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
    mapX: 30.6,
    mapY: 15.0,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '78 m North-West',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the 2-grill Computer Lab path.',
        'Walk along the unified ground-floor corridor past the Computer Department.',
        'Enter the Department of Urdu between Pakistan Studies and Physical Education.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 30.6, y: 30.4 },
        { x: 30.6, y: 15.0 }
      ]
    }
  },
  {
    id: 'physical-education-dept',
    name: 'Department of Physical Education',
    shortName: 'Physical Education',
    subtitle: 'Separate Point Beside Urdu & Pakistan Studies in Same Unified Corridor',
    category: 'Academics',
    stopNumber: '23',
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
    mapX: 38.3,
    mapY: 15.0,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '80 m North-West',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the 2-grill Computer Lab path.',
        'Proceed along the unified corridor past the Computer Department and Urdu.',
        'Reach the Department of Physical Education.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 38.3, y: 30.4 },
        { x: 38.3, y: 15.0 }
      ]
    }
  },
  {
    id: 'commerce-dept-library',
    name: 'Commerce Department & Commerce Library (By Stairs · 1st Floor)',
    shortName: 'Commerce & Library (1st Fl.)',
    subtitle: 'By Stairs (1st Floor) · Same Building Above Computer Department, Pak Studies, Urdu & Physical Education',
    category: 'Academics',
    stopNumber: '24',
    svgType: 'library',
    badge: 'By Stairs · 1st Floor Same Building',
    description:
      'Located on the 1st Floor of the EXACT SAME building reached via the Commerce Stairs beside the ground-floor corridor (Computer Department, Pakistan Studies, Urdu & Physical Education) north of the Hostel, the Commerce Department and specialized Commerce Library house accounting, finance, banking, and business studies resources.',
    keySpecs: [
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Ground Floor Below', value: 'Computer Dept., Pak Studies, Urdu & Physical Education' },
      { label: 'Facilities', value: 'Commerce Dept. & Library' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Reached By Stairs (1st Floor) right on the side of the unified building above Computer Department, Pak Studies, Urdu & Physical Education',
      'Dedicated Commerce Library stocked with accounting, auditing, banking & business volumes',
      'Solar panel array mounted on the building rooftop powering all wings cleanly'
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
    locationNote: 'By Stairs (1st Floor) · Above Computer Dept. & Unified Corridor',
    mapX: 30.7,
    mapY: 7.1,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '84 m North-West · By Stairs (1st Fl)',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the two-grill Computer Lab corridor.',
        'Pass the Computer Department and 1 Corridor entrance to the Commerce Stairs on the right side of the building.',
        'Climb the Stairs up to the 1st Floor Commerce Department & Commerce Library.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 44.3, y: 30.4 },
        { x: 44.3, y: 20.5 },
        { x: 44.3, y: 7.1 },
        { x: 30.7, y: 7.1 }
      ]
    }
  },
  {
    id: 'sindhi-economics-physiology-ground',
    name: 'Very Big Ground (Directly Past Path from Botany)',
    shortName: 'Very Big Ground',
    subtitle: 'Houses Car Parking, Old Bus & Sports Gymnasium · Ends at Flowering Garden',
    category: 'Student Life',
    stopNumber: '25',
    svgType: 'sports',
    badge: 'Path from Botany · Very Big Ground',
    description:
      'Stepping directly out onto the paved exit Path from Botany Lab brings you straight in front of this expansive Very Big Ground. Inside this vast campus ground sit College Car Parking, the classic Old Bus bay, and the indoor Sports Gymnasium; where the ground ends sits the Garden facing Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office, Chemistry Lab 1, and Chemistry Lab 2.',
    keySpecs: [
      { label: 'Approach', value: 'Direct Path from Botany Lab' },
      { label: 'Inside Ground', value: 'Car Parking · Old Bus · Sports Gymnasium' },
      { label: 'Where Ground Ends', value: 'Flowering Garden' },
      { label: 'Facing Garden', value: 'Economics → Chemistry Lab 2' }
    ],
    highlights: [
      'Opens directly in front of the exit path coming straight out of Botany Lab',
      'Expansive ground housing Car Parking, the historic Old Bus bay, and the Sports Gymnasium',
      'Ends cleanly at the East Garden opening into the 8-room Garden-facing corridor'
    ],
    hotspots: [
      {
        id: 'east-playing-ground',
        label: 'Open Campus Ground Lawn',
        description: 'Very Big Ground directly past the Botany exit path containing Car Parking, Old Bus, and Sports Gymnasium.',
        xPercent: 50,
        yPercent: 55
      }
    ],
    locationNote: 'North-East Campus · Directly in Front of Exit Path from Botany',
    mapX: 86.8,
    mapY: 21.2,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '112 m · Path from Botany',
      walkingSteps: [
        'Walk straight north from Main Gate past Principal’s Office line to Assembly, Zoology & Botany Lab.',
        'Take the exit Path from Botany directly east.',
        'Arrive at the Very Big Ground (housing Car Parking, Old Bus, and Sports Gymnasium) ending at the Garden.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 21.2 }
      ]
    }
  },
  {
    id: 'car-parking',
    name: 'Car Parking Bay (Inside Very Big Ground)',
    shortName: 'Car Parking',
    subtitle: 'Inside Very Big Ground Past Botany Path · Faculty & Visitor Vehicle Parking',
    category: 'Student Life',
    stopNumber: '26',
    svgType: 'courtyard',
    badge: 'Inside Big Ground · Parking',
    description:
      'Located right at the western entry of the Very Big Ground immediately as you exit the Path from Botany, the Car Parking Bay provides organized shaded parking bays for faculty and visiting vehicles alongside the Old Bus bay and Sports Gymnasium.',
    keySpecs: [
      { label: 'Location', value: 'Inside Very Big Ground' },
      { label: 'Approach', value: 'Directly Past Path from Botany' },
      { label: 'Beside', value: 'Old Bus Bay & Sports Gymnasium' },
      { label: 'Use', value: 'Faculty & Official Vehicles' }
    ],
    highlights: [
      'Positioned inside the Very Big Ground right past the Path from Botany',
      'Marked parking lanes right alongside the Old Bus bay',
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
    locationNote: 'Inside Very Big Ground · Immediately Past Botany Exit Path',
    mapX: 73.3,
    mapY: 7.6,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '102 m · Inside Big Ground',
      walkingSteps: [
        'Walk north past Assembly & Zoology to Botany Lab.',
        'Exit along the Path from Botany directly into the Very Big Ground.',
        'First on your left inside the ground is the Car Parking Bay.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 73.3, y: 7.6 }
      ]
    }
  },
  {
    id: 'old-bus',
    name: 'College Old Bus Landmark (Inside Very Big Ground)',
    shortName: 'Old Bus',
    subtitle: 'Inside Very Big Ground Between Car Parking & Sports Gymnasium',
    category: 'Student Life',
    stopNumber: '27',
    svgType: 'courtyard',
    badge: 'Inside Big Ground · Heritage Bus',
    description:
      'Parked inside the Very Big Ground between Car Parking and the Sports Gymnasium past the Path from Botany, the college’s classic Old Bus is an iconic campus landmark remembered by generations of Zubaida College students.',
    keySpecs: [
      { label: 'Location', value: 'Inside Very Big Ground' },
      { label: 'Between', value: 'Car Parking & Sports Gymnasium' },
      { label: 'Approach', value: 'Path from Botany Lab' },
      { label: 'Status', value: 'Heritage Bus Bay' }
    ],
    highlights: [
      'Positioned prominently inside the Very Big Ground past the Path from Botany',
      'Stands directly between the Car Parking Bay and the Sports Gymnasium',
      'Well-known campus orientation landmark inside the ground'
    ],
    hotspots: [
      {
        id: 'old-bus-bay',
        label: 'Vintage College Bus',
        description: 'Historic college transport bus parked beside Car Parking inside the Big Ground.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Inside Very Big Ground · Between Car Parking & Sports Gymnasium',
    mapX: 81.8,
    mapY: 7.6,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '110 m · Inside Big Ground',
      walkingSteps: [
        'Walk north past Assembly & Zoology to Botany Lab and take the Path from Botany into Very Big Ground.',
        'Pass the Car Parking Bay inside the ground.',
        'Spot the College Old Bus landmark right beside Sports Gymnasium.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 81.8, y: 7.6 }
      ]
    }
  },
  {
    id: 'sports-gymnasium',
    name: 'Sports Gymnasium Hall (Inside Very Big Ground)',
    shortName: 'Sports Gymnasium',
    subtitle: 'Inside Very Big Ground · Indoor Courts, Fitness Training & Athletics Wing',
    category: 'Student Life',
    stopNumber: '28',
    svgType: 'sports',
    badge: 'Inside Big Ground · Sports Hub',
    description:
      'Standing inside the north-east corner of the Very Big Ground beside the Old Bus bay and Car Parking, the indoor Sports Gymnasium hosts badminton, table tennis, indoor gymnastics, fitness sessions, and championship ceremonies above the East Garden.',
    keySpecs: [
      { label: 'Location', value: 'Inside Very Big Ground' },
      { label: 'Beside', value: 'Old Bus Bay & Open Turf' },
      { label: 'Facilities', value: 'Indoor Courts & Fitness Gear' },
      { label: 'South Below', value: 'Garden (End of Big Ground)' }
    ],
    highlights: [
      'Indoor Sports Gymnasium built right inside the Very Big Ground past Botany Path',
      'Supports indoor badminton, table tennis, fitness drills, and tournament prep',
      'Solar-equipped sports pavilion overlooking the Very Big Ground and Garden'
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
    locationNote: 'Inside Very Big Ground · North-East Sports Pavilion',
    mapX: 91.8,
    mapY: 8.9,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '122 m · Inside Big Ground',
      walkingSteps: [
        'Walk north past Assembly & Zoology to Botany Lab and exit along the Path from Botany.',
        'Cross the Very Big Ground past Car Parking and Old Bus.',
        'Arrive at the indoor Sports Gymnasium Hall.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 91.8, y: 8.9 }
      ]
    }
  },
  {
    id: 'east-garden',
    name: 'Campus Garden (Where Very Big Ground Ends)',
    shortName: 'Garden',
    subtitle: 'At the End of Very Big Ground · Facing Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office & Labs 1–2',
    category: 'Student Life',
    stopNumber: '29',
    svgType: 'courtyard',
    badge: 'End of Big Ground · Garden',
    description:
      'Located right where the Very Big Ground ends (past Car Parking, Old Bus, and Sports Gymnasium), this shaded flowering Garden stands directly in front of the 8-room academic & lab corridor housing Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office, Chemistry Lab 1, and Chemistry Lab 2.',
    keySpecs: [
      { label: 'Position', value: 'At End of Very Big Ground' },
      { label: 'Care Staff', value: 'Campus Gardeners' },
      { label: 'Directly Facing', value: 'Economics → Chemistry Lab 2' },
      { label: 'Environment', value: 'Shaded Trees & Flower Beds' }
    ],
    highlights: [
      'Marks the southern edge right where the Very Big Ground ends',
      'Tended daily with flowering beds and shaded green trees',
      'Directly faces the corridor starting with Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office, Chemistry Lab 1 & Chemistry Lab 2'
    ],
    hotspots: [
      {
        id: 'east-garden-beds',
        label: 'Garden Flowerbeds & Trees',
        description: 'Lush shaded garden sitting right where Very Big Ground ends.',
        xPercent: 50,
        yPercent: 52
      }
    ],
    locationNote: 'End of Very Big Ground · Directly Facing Economics-to-Chemistry Corridor',
    mapX: 86.8,
    mapY: 32.5,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '124 m · End of Big Ground',
      walkingSteps: [
        'Exit Botany Lab via the Path from Botany into the Very Big Ground (past Car Parking, Old Bus, and Sports Gymnasium).',
        'Walk to the southern end where the Very Big Ground ends.',
        'Arrive at the Garden facing Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office & Labs 1–2.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 }
      ]
    }
  },
  {
    id: 'economics-dept',
    name: 'Department of Economics (Facing Garden · Room 1)',
    shortName: 'Economics',
    subtitle: 'First Department Facing the Garden at End of Very Big Ground · Followed by Physiology & Psychology',
    category: 'Academics',
    stopNumber: '30',
    svgType: 'academic-wing',
    badge: 'Facing Garden · 1st Room',
    description:
      'Situated first in the corridor directly facing the Garden where the Very Big Ground ends (just before Physiology, Psychology, Sindhi, Geography, Chemistry Office, Chemistry Lab 1, and Chemistry Lab 2), the Department of Economics teaches microeconomics, macroeconomics, and development policy of Pakistan.',
    keySpecs: [
      { label: 'Department', value: 'Department of Economics' },
      { label: 'Position', value: '1st Room Facing Garden' },
      { label: 'Next South', value: 'Physiology → Psychology → Sindhi' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'First department directly facing the Garden at the end of Very Big Ground',
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
    locationNote: 'Corridor Facing Garden · 1st Stop Before Physiology',
    mapX: 82.3,
    mapY: 40.5,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '128 m · Facing Garden',
      walkingSteps: [
        'Take the Path from Botany through Very Big Ground to the Garden at its end.',
        'Cross the Garden into the corridor facing it.',
        'Enter the Department of Economics (1st stop facing the Garden).'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 },
        { x: 77.5, y: 38.3 },
        { x: 77.5, y: 40.5 },
        { x: 82.3, y: 40.5 }
      ]
    }
  },
  {
    id: 'physiology-dept',
    name: 'Department of Physiology (Facing Garden · Room 2)',
    shortName: 'Physiology',
    subtitle: 'Corridor Facing Garden · Between Economics & Psychology',
    category: 'Laboratories',
    stopNumber: '31',
    svgType: 'science-lab',
    badge: 'Facing Garden · 2nd Room',
    description:
      'Second in the corridor facing the Garden immediately after Economics and right before Psychology, Sindhi, Geography, Chemistry Office, Chemistry Lab 1, and Chemistry Lab 2, the Department of Physiology supports our Associate Degree in Physiology & Health Sciences (ADS) with physiological models and hematology apparatus.',
    keySpecs: [
      { label: 'Department', value: 'Department of Physiology' },
      { label: 'Position', value: '2nd Room Facing Garden' },
      { label: 'Between', value: 'Economics & Psychology' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned directly after Economics and before Psychology in the Garden-facing wing',
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
    locationNote: 'Corridor Facing Garden · Between Economics & Psychology',
    mapX: 93.2,
    mapY: 45.2,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '132 m · Facing Garden',
      walkingSteps: [
        'Take the Path from Botany through Very Big Ground to the Garden.',
        'Enter the corridor facing the Garden and pass Economics.',
        'Enter the Department of Physiology.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 },
        { x: 77.5, y: 38.3 },
        { x: 77.5, y: 45.2 },
        { x: 93.2, y: 45.2 }
      ]
    }
  },
  {
    id: 'psychology-dept',
    name: 'Department of Psychology (Facing Garden · Room 3)',
    shortName: 'Psychology',
    subtitle: 'Corridor Facing Garden · Between Physiology & Sindhi',
    category: 'Laboratories',
    stopNumber: '32',
    svgType: 'academic-wing',
    badge: 'Facing Garden · 3rd Room',
    description:
      'Third along the Garden-facing corridor between Physiology and Sindhi (followed by Geography, Chemistry Office, Chemistry Lab 1, and Chemistry Lab 2), the Department of Psychology hosts behavioral sciences lectures, sensory & memory testing, and student counseling.',
    keySpecs: [
      { label: 'Department', value: 'Department of Psychology' },
      { label: 'Position', value: '3rd Room Facing Garden' },
      { label: 'Between', value: 'Physiology & Sindhi' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Dedicated Psychology lecture room & counseling testing lab after Physiology',
      'Serves Intermediate Humanities and Associate Degree in Arts (ADA) cohorts',
      'Leads next south into Sindhi, Geography, Chemistry Office & Chemistry Labs 1–2'
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
    locationNote: 'Corridor Facing Garden · Between Physiology & Sindhi',
    mapX: 82.3,
    mapY: 50.0,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '136 m · Facing Garden',
      walkingSteps: [
        'Take the Path from Botany through Very Big Ground to the Garden.',
        'Walk down the Garden-facing corridor past Economics and Physiology.',
        'Enter the Department of Psychology.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 },
        { x: 77.5, y: 38.3 },
        { x: 77.5, y: 50.0 },
        { x: 82.3, y: 50.0 }
      ]
    }
  },
  {
    id: 'sindhi-dept',
    name: 'Department of Sindhi (Facing Garden · Room 4)',
    shortName: 'Sindhi',
    subtitle: 'Corridor Facing Garden · Between Psychology & Geography',
    category: 'Academics',
    stopNumber: '33',
    svgType: 'academic-wing',
    badge: 'Facing Garden · 4th Room',
    description:
      'Fourth along the Garden-facing corridor immediately after Economics, Physiology, and Psychology (and right before Geography, Chemistry Office, Chemistry Lab 1, and Chemistry Lab 2), the Department of Sindhi preserves and teaches Sindhi language, Shah Abdul Latif Bhittai’s poetry, and regional literary research.',
    keySpecs: [
      { label: 'Department', value: 'Department of Sindhi' },
      { label: 'Position', value: '4th Room Facing Garden' },
      { label: 'Between', value: 'Psychology & Geography' },
      { label: 'Next South', value: 'Geography → Chemistry Office' }
    ],
    highlights: [
      'Positioned inside the Garden-facing corridor between Psychology and Geography',
      'Classical Sindhi literature, Latifiyat seminars, and undergraduate programs',
      'Solar-equipped wing leading toward Geography and the Chemistry suite'
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
    locationNote: 'Corridor Facing Garden · Between Psychology & Geography',
    mapX: 93.2,
    mapY: 54.8,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '140 m · Facing Garden',
      walkingSteps: [
        'Follow the Path from Botany through Very Big Ground to the Garden.',
        'Walk down the Garden-facing corridor past Economics, Physiology, and Psychology.',
        'Enter the Department of Sindhi right before Geography.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 },
        { x: 77.5, y: 38.3 },
        { x: 77.5, y: 54.8 },
        { x: 93.2, y: 54.8 }
      ]
    }
  },
  {
    id: 'geography-dept',
    name: 'Department of Geography (Facing Garden · Room 5)',
    shortName: 'Geography',
    subtitle: 'Corridor Facing Garden · After Sindhi & Right Before Chemistry Office',
    category: 'Academics',
    stopNumber: '34',
    svgType: 'academic-wing',
    badge: 'Facing Garden · 5th Room',
    description:
      'Fifth along the Garden-facing corridor between Sindhi and Chemistry Office (followed by Chemistry Lab 1 and Chemistry Lab 2), the Department of Geography houses physical and commercial geography maps, globes, cartography tables, and environmental survey instruments.',
    keySpecs: [
      { label: 'Department', value: 'Department of Geography' },
      { label: 'Position', value: '5th Room Facing Garden' },
      { label: 'Between', value: 'Sindhi & Chemistry Office' },
      { label: 'Programs', value: 'I.Com & FA Geography' }
    ],
    highlights: [
      'Positioned after Sindhi and directly before Chemistry Office & Chemistry Labs 1–2',
      'Cartography & physical geography practical hall with regional Sindh & Pakistan maps',
      'Supports Commercial Geography (I.Com) and FA Humanities Geography groups'
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
    locationNote: 'Corridor Facing Garden · Between Sindhi & Chemistry Office',
    mapX: 82.3,
    mapY: 59.5,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '144 m · Facing Garden',
      walkingSteps: [
        'Follow the Path from Botany through Very Big Ground to the Garden.',
        'Proceed down the Garden-facing corridor past Economics, Physiology, Psychology, and Sindhi.',
        'Enter the Department of Geography right before Chemistry Office.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 },
        { x: 77.5, y: 38.3 },
        { x: 77.5, y: 59.5 },
        { x: 82.3, y: 59.5 }
      ]
    }
  },
  {
    id: 'chemistry-labs',
    name: 'Chemistry Office (Facing Garden · Room 6)',
    shortName: 'Chemistry Office',
    subtitle: 'Corridor Facing Garden · Directly Past Geography Before Chemistry Lab 1 & Chemistry Lab 2',
    category: 'Laboratories',
    stopNumber: '35',
    svgType: 'science-lab',
    badge: 'Facing Garden · Chemistry Office',
    description:
      'Located right after Geography inside the Garden-facing corridor and directly heading into Chemistry Lab 1 and Chemistry Lab 2, the Chemistry Office serves faculty consultation, reagent inventory, and practical schedule coordination.',
    keySpecs: [
      { label: 'Suite', value: 'Chemistry Faculty Office' },
      { label: 'Position', value: 'After Geography · Before Lab 1' },
      { label: 'Next Doors', value: 'Chemistry Lab 1 & Chemistry Lab 2' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned immediately after Geography at the head of the Chemistry suite',
      'Houses chemistry faculty desks, chemical safety records, and preparation store',
      'Directly followed by Chemistry Lab 1 and Chemistry Lab 2'
    ],
    hotspots: [
      {
        id: 'chem-office-desk',
        label: 'Chemistry Faculty Office',
        description: 'Department head & faculty consultation room right before Chemistry Lab 1.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Corridor Facing Garden · After Geography Before Chemistry Lab 1',
    mapX: 93.2,
    mapY: 64.3,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '148 m · Facing Garden',
      walkingSteps: [
        'Follow the Path from Botany through Very Big Ground to the Garden.',
        'Walk down the Garden-facing corridor past Economics, Physiology, Psychology, Sindhi, and Geography.',
        'Arrive at the Chemistry Office immediately before Chemistry Lab 1 and Chemistry Lab 2.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 },
        { x: 77.5, y: 38.3 },
        { x: 77.5, y: 64.3 },
        { x: 93.2, y: 64.3 }
      ]
    }
  },
  {
    id: 'chemistry-lab-1',
    name: 'Chemistry Lab 1 (Facing Garden · Room 7)',
    shortName: 'Chemistry Lab 1',
    subtitle: 'Corridor Facing Garden · Immediately Past Chemistry Office Before Chemistry Lab 2',
    category: 'Laboratories',
    stopNumber: '36',
    svgType: 'science-lab',
    badge: 'Facing Garden · Lab 1',
    description:
      'Located directly past the Chemistry Office in the Garden-facing corridor (after Economics, Physiology, Psychology, Sindhi, and Geography), Chemistry Lab 1 equips Pre-Medical and Pre-Engineering students with volumetric titration benches, reagent shelves, and fume safety stations.',
    keySpecs: [
      { label: 'Facility', value: 'Chemistry Lab 1' },
      { label: 'Before It', value: 'Chemistry Office' },
      { label: 'Next South', value: 'Chemistry Lab 2' },
      { label: 'Capacity', value: '40 Students / Batch' }
    ],
    highlights: [
      'Positioned cleanly between Chemistry Office and Chemistry Lab 2 inside the Golden Wall',
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
    locationNote: 'Corridor Facing Garden · Between Chemistry Office & Chemistry Lab 2',
    mapX: 82.3,
    mapY: 69.0,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '152 m · Chemistry Wing',
      walkingSteps: [
        'Follow the Path from Botany through Very Big Ground to the Garden.',
        'Proceed down the corridor past Economics, Physiology, Psychology, Sindhi, Geography, and Chemistry Office.',
        'Enter Chemistry Lab 1.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 },
        { x: 77.5, y: 38.3 },
        { x: 77.5, y: 69.0 },
        { x: 82.3, y: 69.0 }
      ]
    }
  },
  {
    id: 'chemistry-lab-2',
    name: 'Chemistry Lab 2 (Facing Garden · Room 8)',
    shortName: 'Chemistry Lab 2',
    subtitle: 'Final Wing in Garden-Facing Corridor · Immediately Past Chemistry Lab 1',
    category: 'Laboratories',
    stopNumber: '37',
    svgType: 'science-lab',
    badge: 'Facing Garden · Lab 2',
    description:
      'Completing the Garden-facing corridor immediately past Chemistry Lab 1 inside the Golden College Boundary Wall, Chemistry Lab 2 hosts organic chemistry synthesis, analytical practicals, and senior degree laboratory cohorts.',
    keySpecs: [
      { label: 'Facility', value: 'Chemistry Lab 2' },
      { label: 'Before It', value: 'Chemistry Lab 1 & Chemistry Office' },
      { label: 'Programs', value: 'HSC Part I/II & Degree Chemistry' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Second dedicated Chemistry laboratory positioned right after Chemistry Lab 1',
      'Supports organic, inorganic, and analytical balance practical sessions',
      'Positioned cleanly inside the Golden Boundary Wall just north of Central Jail'
    ],
    hotspots: [
      {
        id: 'chem2-benches',
        label: 'Organic & Analytical Lab Stations',
        description: 'Advanced chemistry lab workstations immediately beside Chemistry Lab 1.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Corridor Facing Garden · End Room After Chemistry Lab 1',
    mapX: 93.2,
    mapY: 73.8,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '156 m · Chemistry Wing',
      walkingSteps: [
        'Follow the Path from Botany through Very Big Ground to the Garden.',
        'Proceed down the Garden-facing corridor past Economics, Physiology, Psychology, Sindhi, Geography, Chemistry Office, and Chemistry Lab 1.',
        'Arrive at Chemistry Lab 2 inside the Golden Boundary.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 46.5, y: 7.4 },
        { x: 59.0, y: 7.4 },
        { x: 86.8, y: 7.6 },
        { x: 86.8, y: 32.5 },
        { x: 77.5, y: 38.3 },
        { x: 77.5, y: 73.8 },
        { x: 93.2, y: 73.8 }
      ]
    }
  },
  {
    id: 'small-garden-computer-lab',
    name: 'Small Garden (Before Computer Lab)',
    shortName: 'Small Garden',
    subtitle: 'Green Pocket Garden Directly Before Computer Lab & Above Big College Hostel',
    category: 'Student Life',
    stopNumber: '38',
    svgType: 'courtyard',
    badge: 'Right Before Computer Lab',
    description:
      'Nestled directly in front of the Computer Lab & Computer Office (and above the Big College Hostel right beside the Central Courtyard Promenade), this welcoming Small Garden frames the entry to the Computer Department with shaded greenery and colorful flowerbeds.',
    keySpecs: [
      { label: 'Location', value: 'Before Computer Lab' },
      { label: 'Directly North', value: 'Computer Lab & Office' },
      { label: 'Directly South', value: 'Big College Hostel' },
      { label: 'West Neighbor', value: 'Straight North-West Trees' }
    ],
    highlights: [
      'Green pocket garden positioned directly before Computer Lab & Computer Office',
      'Shades the walkway linking Central Courtyard, Computer Department, and Big College Hostel',
      'Connects seamlessly westward into the Straight North-West Trees line'
    ],
    hotspots: [
      {
        id: 'small-garden-lawn',
        label: 'Small Garden Flowerbeds',
        description: 'Neat manicured greenery directly before the Computer Lab entrance.',
        xPercent: 50,
        yPercent: 52
      }
    ],
    locationNote: 'Directly Before Computer Lab · Between Computer Dept. & Hostel',
    mapX: 24.1,
    mapY: 39.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '62 m · Directly Before Computer Lab',
      walkingSteps: [
        'Walk straight along the twin grill path past Big Clerk Office Corridor and the Garden.',
        'Turn left across Central Courtyard Promenade toward the Computer Department.',
        'Pause at the Small Garden positioned directly before Computer Lab & Office.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 30.2, y: 41.9 },
        { x: 24.1, y: 39.5 }
      ]
    }
  },
  {
    id: 'tennis-volleyball-grounds',
    name: 'Tennis Court & Volleyball Ground (Left of Pakistan Studies)',
    shortName: 'Tennis & Volleyball',
    subtitle: 'Directly on the Left of Pakistan Studies · Above Straight North-West Trees & Hostel',
    category: 'Student Life',
    stopNumber: '39',
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
    mapY: 12.9,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '92 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill path past the Garden and turn left onto the two-grill Computer Lab walkway.',
        'Proceed past the Computer Department, Small Garden, and North-West Trees.',
        'Arrive at the Tennis Court & Volleyball Ground directly on the left of Pakistan Studies.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 10.8, y: 30.4 },
        { x: 10.8, y: 12.9 }
      ]
    }
  }
];

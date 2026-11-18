import React, { useRef, useState } from 'react';
import {
  DirectionTurn,
  GATE_COORDS,
  TourFacility
} from '../data/campusTourData';
import { Navigation, Compass, Crosshair, ZoomIn, Maximize2 } from 'lucide-react';

export type MapInteractionMode = 'browse' | 'insert' | 'reposition';

export interface VisitorWalkerState {
  x: number;
  y: number;
  angleDeg: number;
  active: boolean;
  isMoving?: boolean;
  progress?: number;
  stepLabel?: string;
}

export interface StopColorTheme {
  pinBg: string;
  pinText: string;
  pinBorder: string;
  ringGlow: string;
  hex: string;
  textClass: string;
  activeBorder: string;
  badgeBg: string;
}

const STOP_THEMES_BY_ID: Record<string, StopColorTheme> = {
  'historic-gateway': {
    pinBg: 'bg-[#10b981]',
    pinText: 'text-white',
    pinBorder: 'border-[#a7f3d0]',
    ringGlow: 'bg-[#34d399]/45',
    hex: '#34d399',
    textClass: 'text-[#6ee7b7]',
    activeBorder: 'border-[#34d399]',
    badgeBg: 'bg-[#10b981] text-white'
  },
  'waiting-room': {
    pinBg: 'bg-[#0ea5e9]',
    pinText: 'text-white',
    pinBorder: 'border-[#bae6fd]',
    ringGlow: 'bg-[#38bdf8]/45',
    hex: '#38bdf8',
    textClass: 'text-[#7dd3fc]',
    activeBorder: 'border-[#38bdf8]',
    badgeBg: 'bg-[#0ea5e9] text-white'
  },
  'college-canteen': {
    pinBg: 'bg-[#f97316]',
    pinText: 'text-white',
    pinBorder: 'border-[#fed7aa]',
    ringGlow: 'bg-[#fb923c]/45',
    hex: '#fb923c',
    textClass: 'text-[#fdba74]',
    activeBorder: 'border-[#fb923c]',
    badgeBg: 'bg-[#f97316] text-white'
  },
  'clerk-office': {
    pinBg: 'bg-[#14b8a6]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#ccfbf1]',
    ringGlow: 'bg-[#2dd4bf]/45',
    hex: '#2dd4bf',
    textClass: 'text-[#5eead4]',
    activeBorder: 'border-[#2dd4bf]',
    badgeBg: 'bg-[#14b8a6] text-slate-950'
  },
  'central-library': {
    pinBg: 'bg-[#8b5cf6]',
    pinText: 'text-white',
    pinBorder: 'border-[#ddd6fe]',
    ringGlow: 'bg-[#a78bfa]/45',
    hex: '#a78bfa',
    textClass: 'text-[#c4b5fd]',
    activeBorder: 'border-[#a78bfa]',
    badgeBg: 'bg-[#8b5cf6] text-white'
  },
  'grill-divided-walkway': {
    pinBg: 'bg-[#84cc16]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#ecfccb]',
    ringGlow: 'bg-[#a3e635]/45',
    hex: '#a3e635',
    textClass: 'text-[#bef264]',
    activeBorder: 'border-[#a3e635]',
    badgeBg: 'bg-[#84cc16] text-emerald-950'
  },
  'chemistry-labs': {
    pinBg: 'bg-[#06b6d4]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#cffafe]',
    ringGlow: 'bg-[#22d3ee]/45',
    hex: '#22d3ee',
    textClass: 'text-[#67e8f9]',
    activeBorder: 'border-[#22d3ee]',
    badgeBg: 'bg-[#06b6d4] text-slate-950'
  },
  'chemistry-lab-1': {
    pinBg: 'bg-[#0891b2]',
    pinText: 'text-white',
    pinBorder: 'border-[#a5f3fc]',
    ringGlow: 'bg-[#22d3ee]/45',
    hex: '#22d3ee',
    textClass: 'text-[#a5f3fc]',
    activeBorder: 'border-[#22d3ee]',
    badgeBg: 'bg-[#0891b2] text-white'
  },
  'chemistry-lab-2': {
    pinBg: 'bg-[#0284c7]',
    pinText: 'text-white',
    pinBorder: 'border-[#bae6fd]',
    ringGlow: 'bg-[#38bdf8]/45',
    hex: '#38bdf8',
    textClass: 'text-[#7dd3fc]',
    activeBorder: 'border-[#38bdf8]',
    badgeBg: 'bg-[#0284c7] text-white'
  },
  'car-parking': {
    pinBg: 'bg-[#64748b]',
    pinText: 'text-white',
    pinBorder: 'border-[#e2e8f0]',
    ringGlow: 'bg-[#94a3b8]/45',
    hex: '#cbd5e1',
    textClass: 'text-[#e2e8f0]',
    activeBorder: 'border-[#cbd5e1]',
    badgeBg: 'bg-[#64748b] text-white'
  },
  'old-bus': {
    pinBg: 'bg-[#eab308]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#fef08a]',
    ringGlow: 'bg-[#facc15]/45',
    hex: '#facc15',
    textClass: 'text-[#fde047]',
    activeBorder: 'border-[#facc15]',
    badgeBg: 'bg-[#eab308] text-emerald-950'
  },
  'sports-gymnasium': {
    pinBg: 'bg-[#f97316]',
    pinText: 'text-white',
    pinBorder: 'border-[#fed7aa]',
    ringGlow: 'bg-[#fb923c]/45',
    hex: '#fb923c',
    textClass: 'text-[#fdba74]',
    activeBorder: 'border-[#fb923c]',
    badgeBg: 'bg-[#f97316] text-white'
  },
  'auditorium-hall': {
    pinBg: 'bg-[#f43f5e]',
    pinText: 'text-white',
    pinBorder: 'border-[#fecdd3]',
    ringGlow: 'bg-[#fb7185]/45',
    hex: '#fb7185',
    textClass: 'text-[#fda4af]',
    activeBorder: 'border-[#fb7185]',
    badgeBg: 'bg-[#f43f5e] text-white'
  },
  'principal-office': {
    pinBg: 'bg-[#facc15]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#fef9c3]',
    ringGlow: 'bg-[#fde047]/55',
    hex: '#facc15',
    textClass: 'text-[#fde047]',
    activeBorder: 'border-[#facc15]',
    badgeBg: 'bg-[#facc15] text-emerald-950'
  },
  'general-staff-room': {
    pinBg: 'bg-[#6366f1]',
    pinText: 'text-white',
    pinBorder: 'border-[#e0e7ff]',
    ringGlow: 'bg-[#818cf8]/45',
    hex: '#818cf8',
    textClass: 'text-[#a5b4fc]',
    activeBorder: 'border-[#818cf8]',
    badgeBg: 'bg-[#6366f1] text-white'
  },
  'islamiat-english': {
    pinBg: 'bg-[#34d399]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#d1fae5]',
    ringGlow: 'bg-[#6ee7b7]/45',
    hex: '#34d399',
    textClass: 'text-[#6ee7b7]',
    activeBorder: 'border-[#34d399]',
    badgeBg: 'bg-[#34d399] text-emerald-950'
  },
  'english-dept': {
    pinBg: 'bg-[#ec4899]',
    pinText: 'text-white',
    pinBorder: 'border-[#fce7f3]',
    ringGlow: 'bg-[#f472b6]/45',
    hex: '#f472b6',
    textClass: 'text-[#f9a8d4]',
    activeBorder: 'border-[#f472b6]',
    badgeBg: 'bg-[#ec4899] text-white'
  },
  'statistics-mathematics': {
    pinBg: 'bg-[#d946ef]',
    pinText: 'text-white',
    pinBorder: 'border-[#fae8ff]',
    ringGlow: 'bg-[#e879f9]/45',
    hex: '#e879f9',
    textClass: 'text-[#f0abfc]',
    activeBorder: 'border-[#e879f9]',
    badgeBg: 'bg-[#d946ef] text-white'
  },
  'mathematics-dept': {
    pinBg: 'bg-[#2dd4bf]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#ccfbf1]',
    ringGlow: 'bg-[#5eead4]/45',
    hex: '#2dd4bf',
    textClass: 'text-[#99f6e4]',
    activeBorder: 'border-[#2dd4bf]',
    badgeBg: 'bg-[#2dd4bf] text-slate-950'
  },
  'physics-lab-darkroom': {
    pinBg: 'bg-[#3b82f6]',
    pinText: 'text-white',
    pinBorder: 'border-[#dbeafe]',
    ringGlow: 'bg-[#60a5fa]/45',
    hex: '#60a5fa',
    textClass: 'text-[#93c5fd]',
    activeBorder: 'border-[#60a5fa]',
    badgeBg: 'bg-[#3b82f6] text-white'
  },
  'muslim-history-dept': {
    pinBg: 'bg-[#f59e0b]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#fef3c7]',
    ringGlow: 'bg-[#fbbf24]/45',
    hex: '#fbbf24',
    textClass: 'text-[#fde68a]',
    activeBorder: 'border-[#fbbf24]',
    badgeBg: 'bg-[#f59e0b] text-emerald-950'
  },
  'political-science-dept': {
    pinBg: 'bg-[#8b5cf6]',
    pinText: 'text-white',
    pinBorder: 'border-[#ede9fe]',
    ringGlow: 'bg-[#a78bfa]/45',
    hex: '#a78bfa',
    textClass: 'text-[#ddd6fe]',
    activeBorder: 'border-[#a78bfa]',
    badgeBg: 'bg-[#8b5cf6] text-white'
  },
  'physics-office': {
    pinBg: 'bg-[#2563eb]',
    pinText: 'text-white',
    pinBorder: 'border-[#bfdbfe]',
    ringGlow: 'bg-[#3b82f6]/45',
    hex: '#60a5fa',
    textClass: 'text-[#bfdbfe]',
    activeBorder: 'border-[#60a5fa]',
    badgeBg: 'bg-[#2563eb] text-white'
  },
  'physics-dark-room': {
    pinBg: 'bg-[#4f46e5]',
    pinText: 'text-white',
    pinBorder: 'border-[#c7d2fe]',
    ringGlow: 'bg-[#818cf8]/45',
    hex: '#818cf8',
    textClass: 'text-[#c7d2fe]',
    activeBorder: 'border-[#818cf8]',
    badgeBg: 'bg-[#4f46e5] text-white'
  },
  'prayer-room-wing': {
    pinBg: 'bg-[#059669]',
    pinText: 'text-white',
    pinBorder: 'border-[#a7f3d0]',
    ringGlow: 'bg-[#34d399]/45',
    hex: '#10b981',
    textClass: 'text-[#6ee7b7]',
    activeBorder: 'border-[#34d399]',
    badgeBg: 'bg-[#059669] text-white'
  },
  'botanical-greenhouse': {
    pinBg: 'bg-[#22c55e]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#dcfce7]',
    ringGlow: 'bg-[#4ade80]/45',
    hex: '#4ade80',
    textClass: 'text-[#86efac]',
    activeBorder: 'border-[#4ade80]',
    badgeBg: 'bg-[#22c55e] text-slate-950'
  },
  'karate-club': {
    pinBg: 'bg-[#f43f5e]',
    pinText: 'text-white',
    pinBorder: 'border-[#fecdd3]',
    ringGlow: 'bg-[#fb7185]/45',
    hex: '#fb7185',
    textClass: 'text-[#fda4af]',
    activeBorder: 'border-[#fb7185]',
    badgeBg: 'bg-[#f43f5e] text-white'
  },
  'greenhouse-prayer-ground': {
    pinBg: 'bg-[#16a34a]',
    pinText: 'text-white',
    pinBorder: 'border-[#bbf7d0]',
    ringGlow: 'bg-[#4ade80]/45',
    hex: '#4ade80',
    textClass: 'text-[#86efac]',
    activeBorder: 'border-[#4ade80]',
    badgeBg: 'bg-[#16a34a] text-white'
  },
  'zoology-botany-labs': {
    pinBg: 'bg-[#10b981]',
    pinText: 'text-white',
    pinBorder: 'border-[#d1fae5]',
    ringGlow: 'bg-[#34d399]/45',
    hex: '#10b981',
    textClass: 'text-[#a7f3d0]',
    activeBorder: 'border-[#10b981]',
    badgeBg: 'bg-[#10b981] text-white'
  },
  'botany-dept-lab': {
    pinBg: 'bg-[#a3e635]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#ecfccb]',
    ringGlow: 'bg-[#bef264]/45',
    hex: '#a3e635',
    textClass: 'text-[#d9f99d]',
    activeBorder: 'border-[#a3e635]',
    badgeBg: 'bg-[#a3e635] text-emerald-950'
  },
  'hostel-computer-lab': {
    pinBg: 'bg-[#fb923c]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#ffedd5]',
    ringGlow: 'bg-[#fdba74]/45',
    hex: '#fdba74',
    textClass: 'text-[#fed7aa]',
    activeBorder: 'border-[#fdba74]',
    badgeBg: 'bg-[#fb923c] text-slate-950'
  },
  'computer-lab': {
    pinBg: 'bg-[#00d4ff]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#e0f2fe]',
    ringGlow: 'bg-[#7dd3fc]/45',
    hex: '#00d4ff',
    textClass: 'text-[#8ce9ff]',
    activeBorder: 'border-[#00d4ff]',
    badgeBg: 'bg-[#00d4ff] text-slate-950'
  },
  'computer-multimedia-room': {
    pinBg: 'bg-[#c084fc]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#f3e8ff]',
    ringGlow: 'bg-[#d8b4fe]/45',
    hex: '#c084fc',
    textClass: 'text-[#e9d5ff]',
    activeBorder: 'border-[#c084fc]',
    badgeBg: 'bg-[#c084fc] text-slate-950'
  },
  'pak-urdu-pe': {
    pinBg: 'bg-[#ef4444]',
    pinText: 'text-white',
    pinBorder: 'border-[#fee2e2]',
    ringGlow: 'bg-[#f87171]/45',
    hex: '#f87171',
    textClass: 'text-[#fca5a5]',
    activeBorder: 'border-[#f87171]',
    badgeBg: 'bg-[#ef4444] text-white'
  },
  'urdu-dept': {
    pinBg: 'bg-[#f59e0b]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#fef3c7]',
    ringGlow: 'bg-[#fbbf24]/45',
    hex: '#fbbf24',
    textClass: 'text-[#fde68a]',
    activeBorder: 'border-[#fbbf24]',
    badgeBg: 'bg-[#f59e0b] text-slate-950'
  },
  'physical-education-dept': {
    pinBg: 'bg-[#4ade80]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#dcfce7]',
    ringGlow: 'bg-[#86efac]/45',
    hex: '#4ade80',
    textClass: 'text-[#86efac]',
    activeBorder: 'border-[#4ade80]',
    badgeBg: 'bg-[#4ade80] text-emerald-950'
  },
  'commerce-dept-library': {
    pinBg: 'bg-[#a855f7]',
    pinText: 'text-white',
    pinBorder: 'border-[#f3e8ff]',
    ringGlow: 'bg-[#c084fc]/45',
    hex: '#d8b4fe',
    textClass: 'text-[#f5d0fe]',
    activeBorder: 'border-[#d8b4fe]',
    badgeBg: 'bg-[#a855f7] text-white'
  },
  'sindhi-economics-physiology-ground': {
    pinBg: 'bg-[#bef264]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-white',
    ringGlow: 'bg-[#d9f99d]/45',
    hex: '#d9f99d',
    textClass: 'text-[#ecfccb]',
    activeBorder: 'border-[#d9f99d]',
    badgeBg: 'bg-[#bef264] text-emerald-950'
  },
  'sindhi-dept': {
    pinBg: 'bg-[#22d3ee]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#cffafe]',
    ringGlow: 'bg-[#67e8f9]/45',
    hex: '#22d3ee',
    textClass: 'text-[#a5f3fc]',
    activeBorder: 'border-[#22d3ee]',
    badgeBg: 'bg-[#22d3ee] text-slate-950'
  },
  'economics-dept': {
    pinBg: 'bg-[#fbbf24]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#fef3c7]',
    ringGlow: 'bg-[#fde68a]/45',
    hex: '#fbbf24',
    textClass: 'text-[#fde68a]',
    activeBorder: 'border-[#fbbf24]',
    badgeBg: 'bg-[#fbbf24] text-slate-950'
  },
  'physiology-dept': {
    pinBg: 'bg-[#f472b6]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#fce7f3]',
    ringGlow: 'bg-[#f9a8d4]/45',
    hex: '#f472b6',
    textClass: 'text-[#fbcfe8]',
    activeBorder: 'border-[#f472b6]',
    badgeBg: 'bg-[#f472b6] text-slate-950'
  },
  'east-garden': {
    pinBg: 'bg-[#10b981]',
    pinText: 'text-white',
    pinBorder: 'border-[#d1fae5]',
    ringGlow: 'bg-[#34d399]/45',
    hex: '#10b981',
    textClass: 'text-[#a7f3d0]',
    activeBorder: 'border-[#10b981]',
    badgeBg: 'bg-[#10b981] text-white'
  },
  'psychology-dept': {
    pinBg: 'bg-[#a855f7]',
    pinText: 'text-white',
    pinBorder: 'border-[#f3e8ff]',
    ringGlow: 'bg-[#c084fc]/45',
    hex: '#c084fc',
    textClass: 'text-[#e9d5ff]',
    activeBorder: 'border-[#c084fc]',
    badgeBg: 'bg-[#a855f7] text-white'
  },
  'geography-dept': {
    pinBg: 'bg-[#38bdf8]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#e0f2fe]',
    ringGlow: 'bg-[#7dd3fc]/45',
    hex: '#38bdf8',
    textClass: 'text-[#bae6fd]',
    activeBorder: 'border-[#38bdf8]',
    badgeBg: 'bg-[#38bdf8] text-slate-950'
  },
  'arts-staff-room': {
    pinBg: 'bg-[#fb7185]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#ffe4e6]',
    ringGlow: 'bg-[#fda4af]/45',
    hex: '#fb7185',
    textClass: 'text-[#fecdd3]',
    activeBorder: 'border-[#fb7185]',
    badgeBg: 'bg-[#fb7185] text-slate-950'
  },
  'small-garden-computer-lab': {
    pinBg: 'bg-[#4ade80]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#dcfce7]',
    ringGlow: 'bg-[#86efac]/45',
    hex: '#4ade80',
    textClass: 'text-[#bbf7d0]',
    activeBorder: 'border-[#4ade80]',
    badgeBg: 'bg-[#4ade80] text-slate-950'
  },
  'historical-graveyard-mazar': {
    pinBg: 'bg-[#14b8a6]',
    pinText: 'text-white',
    pinBorder: 'border-[#fef08a]',
    ringGlow: 'bg-[#2dd4bf]/45',
    hex: '#5eead4',
    textClass: 'text-[#99f6e4]',
    activeBorder: 'border-[#5eead4]',
    badgeBg: 'bg-[#14b8a6] text-white'
  },
  'tennis-volleyball-grounds': {
    pinBg: 'bg-[#22d3ee]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#cffafe]',
    ringGlow: 'bg-[#67e8f9]/45',
    hex: '#22d3ee',
    textClass: 'text-[#a5f3fc]',
    activeBorder: 'border-[#22d3ee]',
    badgeBg: 'bg-[#22d3ee] text-slate-950'
  }
};

const FALLBACK_THEMES: StopColorTheme[] = Object.values(STOP_THEMES_BY_ID);

export function getStopColorTheme(stopId: string, index: number): StopColorTheme {
  return STOP_THEMES_BY_ID[stopId] || FALLBACK_THEMES[index % FALLBACK_THEMES.length];
}

interface CampusMapCanvasProps {
  stops: TourFacility[];
  selectedIndex: number;
  onSelectStop: (index: number) => void;
  mapMode: MapInteractionMode;
  onMapCoordinatePick?: (x: number, y: number) => void;
  draftPinCoords?: { x: number; y: number } | null;
  walker?: VisitorWalkerState | null;
  customRoutePath?: { x: number; y: number }[] | null;
}

export function buildAutoRoutePath(x: number, y: number): { x: number; y: number }[] {
  if (Math.abs(x - GATE_COORDS.x) <= 7) {
    return [GATE_COORDS, { x, y }];
  }
  if (y > 84) {
    return [GATE_COORDS, { x: 50, y: 90.7 }, { x, y }];
  }
  if (y > 68) {
    return [GATE_COORDS, { x: 50, y: 76.7 }, { x, y }];
  }
  return [
    GATE_COORDS,
    { x: 50, y: 76.7 },
    { x: 50, y: Math.max(16, Math.min(62, y)) },
    { x, y }
  ];
}

export function suggestDirectionsFromGate(
  x: number,
  y: number,
  placeName?: string
): {
  turn: DirectionTurn;
  distanceFromGate: string;
  walkingSteps: string[];
  routePath: { x: number; y: number }[];
} {
  const label = placeName?.trim() || 'this campus point';
  const dx = x - GATE_COORDS.x;
  const dy = GATE_COORDS.y - y;
  const estMeters = Math.max(8, Math.round(Math.hypot(dx * 0.9, dy * 1.3)));

  let turn: DirectionTurn = 'Straight Ahead';
  let step2 =
    'Walk straight along the twin paths separated by the small grill, passing the walking distance to Clerk Office, Garden, and Central Library on the right.';

  if (dy < 6 && Math.abs(dx) <= 6) {
    turn = 'Entry Gate';
    step2 = 'On your left is the Waiting Room and on your right are the Canteen & Central Library inside the Golden Boundary Wall.';
  } else if (dx <= -15 && y > 84) {
    turn = 'Turn Left';
    step2 = 'Upon entering the Security Gate, turn left beside the Visitor Waiting Room.';
  } else if (y <= 36) {
    turn = 'Straight Ahead';
    step2 =
      'Walk straight north along the central spine past Principal’s Office line into the Very Big Ground (Old Bus, Car Parking Area, Sports Gymnasium), then continue along the Long Walking Distance to the Garden facing Economics, Sindhi, Physiology, Psychology, Geography, Classes & General Staff Room for Arts.';
  } else if (dx <= -15 && y > 54) {
    turn = 'Turn Left';
    step2 = 'Walk straight past the Clerk Office, Garden & Gardeners, and Principal’s Office line, then turn left.';
  } else if (dx <= -8) {
    turn = 'Bear Left';
    step2 =
      'Take the left path between two grills toward Small Garden, Computer Lab, Big Multimedia Room, Big Hostel, and Tennis Court & Volleyball on the left of Pakistan Studies.';
  } else if (dx >= 15 && y > 84) {
    turn = 'Turn Right';
    step2 = 'Upon entering the Main Gate, turn right past the College Canteen toward Central Library inside the Golden Boundary.';
  } else if (dx >= 8) {
    turn = dx >= 20 ? 'Turn Right' : 'Bear Right';
    step2 =
      'Walk straight past Clerk Office and Garden & Gardeners toward Principal’s Office, Stairs (↑ Enlarged 1st Floor: Islamiat, Muslim History, Political Science, English, Largest Physics Lab/Office/Dark Room & Statistics), Separate Way to Corner Auditorium Hall (outside Chemistry), or Chemistry Wing in line.';
  }

  return {
    turn,
    distanceFromGate: `${estMeters} m ${
      turn === 'Straight Ahead'
        ? 'Straight'
        : turn === 'Entry Gate'
          ? '(At Gate)'
          : dx < 0
            ? 'Left'
            : 'Right'
    }`,
    walkingSteps: [
      'Enter through the Security-monitored Main College Gate inside the Golden Boundary Wall (Waiting Room left, Front Garden & Canteen right).',
      step2,
      `Arrive at ${label} (approx. ${estMeters} meters inside the gate).`
    ],
    routePath: buildAutoRoutePath(x, y)
  };
}

function buildWalkedTrail(
  route: { x: number; y: number }[],
  progress: number
): { walkedPoints: { x: number; y: number }[]; footprints: { x: number; y: number }[] } {
  if (!route || route.length < 2 || progress <= 0.01) {
    return { walkedPoints: [], footprints: [] };
  }
  const clamped = Math.max(0, Math.min(1, progress));
  const segs: { a: { x: number; y: number }; b: { x: number; y: number }; len: number }[] = [];
  let total = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const a = route[i];
    const b = route[i + 1];
    const len = Math.hypot((b.x - a.x) * 12, (b.y - a.y) * 12.7);
    if (len > 0.01) {
      segs.push({ a, b, len });
      total += len;
    }
  }

  if (total === 0) return { walkedPoints: [], footprints: [] };

  const target = clamped * total;
  const walkedPoints: { x: number; y: number }[] = [route[0]];
  let acc = 0;

  for (const seg of segs) {
    if (acc + seg.len < target) {
      walkedPoints.push(seg.b);
      acc += seg.len;
    } else {
      const t = (target - acc) / seg.len;
      walkedPoints.push({
        x: seg.a.x + (seg.b.x - seg.a.x) * t,
        y: seg.a.y + (seg.b.y - seg.a.y) * t
      });
      break;
    }
  }

  const footprints: { x: number; y: number }[] = [];
  const stepDist = 40;
  for (let d = 28; d < target - 14; d += stepDist) {
    let run = 0;
    for (const seg of segs) {
      if (run + seg.len >= d) {
        const t = (d - run) / seg.len;
        footprints.push({
          x: seg.a.x + (seg.b.x - seg.a.x) * t,
          y: seg.a.y + (seg.b.y - seg.a.y) * t
        });
        break;
      }
      run += seg.len;
    }
  }

  return { walkedPoints, footprints };
}

function SolarPanelArray({
  x,
  y,
  w = 36,
  h = 11
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
}) {
  const cols = 4;
  const colW = w / cols;
  return (
    <g opacity="0.96">
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        fill="#082f49"
        stroke="#7dd3fc"
        strokeWidth="1.05"
      />
      <rect x={x + 1.5} y={y + 1.5} width={w - 3} height={h - 3} rx="1" fill="#0369a1" />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#bae6fd" strokeWidth="0.7" />
      {Array.from({ length: cols - 1 }).map((_, idx) => (
        <line
          key={idx}
          x1={x + colW * (idx + 1)}
          y1={y + 1}
          x2={x + colW * (idx + 1)}
          y2={y + h - 1}
          stroke="#bae6fd"
          strokeWidth="0.7"
        />
      ))}
      <line x1={x + 2} y1={y + 0.8} x2={x + w - 2} y2={y + 0.8} stroke="#fde047" strokeWidth="0.85" strokeOpacity="0.85" />
    </g>
  );
}

function WalkingCollegeGirl({
  x,
  y,
  scale = 1,
  dupattaColor = '#10b981',
  bookColor = '#facc15'
}: {
  x: number;
  y: number;
  scale?: number;
  dupattaColor?: string;
  bookColor?: string;
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r="11" fill="#022c22" fillOpacity="0.92" stroke="#6ee7b7" strokeWidth="1.2" />
      <circle cx="0" cy="-3.2" r="3" fill="#fef3c7" />
      <path d="M-3.4,-3.5 C-3.4,-6.8 3.4,-6.8 3.4,-3.5 L3.8,0 L-3.8,0 Z" fill="#ffffff" />
      <path d="M-4,5.4 C-3.8,0.6 3.8,0.6 4,5.4 Z" fill={dupattaColor} />
      <path d="M-2.2,1 L2.2,1 L1.5,5.2 L-1.5,5.2 Z" fill="#ffffff" fillOpacity="0.88" />
      <rect x="-6.4" y="1" width="3.6" height="4.4" rx="0.6" fill={bookColor} stroke="#ffffff" strokeWidth="0.5" />
    </g>
  );
}

function BloomingFlower({
  x,
  y,
  petalColor = '#f472b6',
  centerColor = '#fde047',
  animate = false,
  delay = '0s'
}: {
  x: number;
  y: number;
  petalColor?: string;
  centerColor?: string;
  animate?: boolean;
  delay?: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="scale"
            values="0.72;1.28;1.05;1.28;0.72"
            dur="2.4s"
            begin={delay}
            repeatCount="indefinite"
          />
        )}
        <circle cx="0" cy="-3.4" r="2.1" fill={petalColor} />
        <circle cx="3.2" cy="-1" r="2.1" fill={petalColor} />
        <circle cx="2" cy="2.9" r="2.1" fill={petalColor} />
        <circle cx="-2" cy="2.9" r="2.1" fill={petalColor} />
        <circle cx="-3.2" cy="-1" r="2.1" fill={petalColor} />
        <circle cx="0" cy="0" r="1.9" fill={centerColor} />
      </g>
    </g>
  );
}

function SwayingTree({
  x,
  y,
  r = 12,
  animate = false,
  delay = '0s'
}: {
  x: number;
  y: number;
  r?: number;
  animate?: boolean;
  delay?: string;
}) {
  return (
    <g>
      {animate && (
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`-5 ${x} ${y + r * 0.4}; 5 ${x} ${y + r * 0.4}; -5 ${x} ${y + r * 0.4}`}
          dur="2.8s"
          begin={delay}
          repeatCount="indefinite"
        />
      )}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="#16a34a"
        fillOpacity="0.88"
        stroke="#bbf7d0"
        strokeWidth={animate ? '1.8' : '1.4'}
      />
      <circle cx={x - r * 0.32} cy={y - r * 0.25} r={r * 0.52} fill="#22c55e" fillOpacity="0.85" />
      <circle cx={x + r * 0.3} cy={y + r * 0.15} r={r * 0.45} fill="#4ade80" fillOpacity="0.72" />
      {animate && <circle cx={x} cy={y - r * 0.15} r={r * 0.28} fill="#86efac" fillOpacity="0.75" />}
    </g>
  );
}

export function CampusMapCanvas({
  stops,
  selectedIndex,
  onSelectStop,
  mapMode,
  onMapCoordinatePick,
  draftPinCoords,
  walker,
  customRoutePath
}: CampusMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);
  const [isMagnified, setIsMagnified] = useState(false);

  const selectedStop = stops[selectedIndex] || stops[0];
  const selectedTheme = getStopColorTheme(selectedStop.id, selectedIndex);

  // Trigger lively moving cars on parking and blooming flowers/swaying trees in gardens when visitor goes there
  const isParkingActive =
    selectedStop.id === 'car-parking' ||
    Boolean(walker?.active && Math.hypot(walker.x - 44.8, walker.y - 27.8) < 12);

  const isNorthGardenActive =
    selectedStop.id === 'east-garden' ||
    Boolean(walker?.active && walker.y >= 12.5 && walker.y <= 21.5);

  const isSmallGardenActive =
    selectedStop.id === 'small-garden-computer-lab' ||
    Boolean(walker?.active && Math.hypot(walker.x - 15.1, walker.y - 60.5) < 11);

  const isMainGardenActive =
    selectedStop.id === 'grill-divided-walkway' ||
    Boolean(walker?.active && walker.x >= 50 && walker.x <= 80 && walker.y >= 64 && walker.y <= 76);

  const isMazarActive =
    selectedStop.id === 'historical-graveyard-mazar' ||
    Boolean(walker?.active && Math.hypot(walker.x - 27.7, walker.y - 60.5) < 10);

  const extractCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const rawY = ((e.clientY - rect.top) / rect.height) * 100;
    const x = Math.round(Math.max(5, Math.min(95, rawX)) * 10) / 10;
    const y = Math.round(Math.max(6, Math.min(94, rawY)) * 10) / 10;
    return { x, y };
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mapMode === 'browse' || !onMapCoordinatePick) return;
    const coords = extractCoords(e);
    if (coords) {
      onMapCoordinatePick(coords.x, coords.y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mapMode === 'browse') {
      if (hoverCoords) setHoverCoords(null);
      return;
    }
    const coords = extractCoords(e);
    if (coords) setHoverCoords(coords);
  };

  const activeRoute =
    customRoutePath && customRoutePath.length >= 2
      ? customRoutePath
      : selectedStop?.gateDirections?.routePath && selectedStop.gateDirections.routePath.length >= 2
        ? selectedStop.gateDirections.routePath
        : buildAutoRoutePath(selectedStop.mapX, selectedStop.mapY);

  const polylinePoints = activeRoute.map((pt) => `${pt.x * 12},${pt.y * 12.7}`).join(' ');

  const walkedTrail =
    walker && walker.active && typeof walker.progress === 'number'
      ? buildWalkedTrail(activeRoute, walker.progress)
      : { walkedPoints: [], footprints: [] };

  const walkedPolylinePoints = walkedTrail.walkedPoints
    .map((pt) => `${pt.x * 12},${pt.y * 12.7}`)
    .join(' ');

  return (
    <div className="space-y-4">
      {/* Visibility & Zoom Utility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-amber-200">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400/15 border border-amber-300/60 text-amber-200">
            <span className="w-3 h-3 rounded-xs bg-amber-400 inline-block" />
            <span>Golden College Boundary Wall</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#021914]/90 border border-amber-300/50 text-emerald-100">
            <Compass className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-black text-amber-300">North ↑ Straight Ahead</span>
            <span className="text-stone-300">· ← West · East →</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-900/70 border border-emerald-600/70 text-emerald-100">
            <span>Enlarged 1st Fl (By Stairs): Islamiat · Muslim History · Political Science · English · Largest Physics (Lab/Office/Dark Room) · Statistics · Separate Principal Way → Corner Auditorium (Outside Chemistry)</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsMagnified((v) => !v)}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold border flex items-center gap-2 transition-all shadow ${
            isMagnified
              ? 'bg-amber-400 text-emerald-950 border-amber-200'
              : 'bg-[#063f35] hover:bg-emerald-800 text-amber-200 border-amber-300/50'
          }`}
        >
          {isMagnified ? <Maximize2 className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          <span>{isMagnified ? 'Fit Whole Map View' : 'Enlarge Map 1.35×'}</span>
        </button>
      </div>

      {/* Interactive Mode Helper Banner */}
      {mapMode !== 'browse' && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-amber-400/15 border border-amber-300/60 text-amber-200 text-xs">
          <span className="flex items-center gap-2 font-semibold">
            <Crosshair className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              {mapMode === 'insert'
                ? 'Click anywhere inside the Campus Map to place your new point & auto-calculate gate directions.'
                : `Click on the Campus Map to move "${selectedStop.shortName || selectedStop.name}" to a new spot.`}
            </span>
          </span>
          {hoverCoords && (
            <span className="font-mono text-[11px] text-amber-300 shrink-0">
              X:{Math.round(hoverCoords.x)}% · Y:{Math.round(hoverCoords.y)}%
            </span>
          )}
        </div>
      )}

      {/* Extra-Large High-Visibility Map Viewport */}
      <div className="w-full overflow-x-auto rounded-2xl border-2 border-amber-300/60 bg-[#021914] shadow-2xl">
        <div
          ref={containerRef}
          onClick={handleMapClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverCoords(null)}
          style={isMagnified ? { minWidth: '1500px', height: '1620px' } : undefined}
          className={`relative w-full ${
            isMagnified ? '' : 'h-[920px] sm:h-[1120px] lg:h-[1280px]'
          } overflow-hidden bg-[#021914] select-none ${
            mapMode !== 'browse' ? 'cursor-crosshair' : ''
          }`}
        >
          {/* Architectural Cartographic SVG Ground Plan (1200 x 1270 matches X*12, Y*12.7) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 1270"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="campus-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path
                  d="M 36 0 L 0 0 0 36"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="0.6"
                  strokeOpacity="0.11"
                />
              </pattern>
              <radialGradient id="campus-glow" cx="50%" cy="50%" r="62%">
                <stop offset="0%" stopColor="#065f46" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#021f19" stopOpacity="0.96" />
              </radialGradient>
              <linearGradient id="lawn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15803d" stopOpacity="0.92" />
                <stop offset="50%" stopColor="#16a34a" stopOpacity="0.86" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.82" />
              </linearGradient>
              <linearGradient id="gold-principal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.96" />
                <stop offset="45%" stopColor="#eab308" stopOpacity="0.94" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0.96" />
              </linearGradient>
              <marker
                id="route-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0,1 L7,4 L0,7 Z" fill="#facc15" />
              </marker>
            </defs>

            {/* Rich Jewel Campus Backdrop & Blueprint Grid */}
            <rect width="1200" height="1270" fill="url(#campus-glow)" />
            <rect width="1200" height="1270" fill="url(#campus-grid)" />

            {/* HIGHLIGHTED GOLDEN COLLEGE BOUNDARY WALL */}
            <path
              d="M 46 16 L 1156 16 Q 1176 16 1176 36 L 1176 1078 Q 1176 1094 1158 1094 L 972 1094 Q 958 1094 958 1108 L 958 1204 L 28 1204 L 28 36 Q 28 16 46 16 Z"
              fill="#032b22"
              fillOpacity="0.68"
              stroke="#fbbf24"
              strokeOpacity="0.32"
              strokeWidth="11"
            />
            <path
              d="M 46 16 L 1156 16 Q 1176 16 1176 36 L 1176 1078 Q 1176 1094 1158 1094 L 972 1094 Q 958 1094 958 1108 L 958 1204 L 28 1204 L 28 36 Q 28 16 46 16 Z"
              fill="none"
              stroke="#facc15"
              strokeOpacity="0.98"
              strokeWidth="4.6"
            />
            <path
              d="M 52 24 L 1148 24 Q 1166 24 1166 42 L 1166 1074 Q 1166 1086 1152 1086 L 964 1086 Q 950 1086 950 1100 L 950 1196 L 36 1196 L 36 42 Q 36 24 52 24 Z"
              fill="none"
              stroke="#fef08a"
              strokeOpacity="0.62"
              strokeWidth="1.4"
              strokeDasharray="10 6"
            />

            {/* Golden College Boundary Badges */}
            <rect x="64" y="6" width="224" height="19" rx="5" fill="#451a03" stroke="#facc15" strokeWidth="1.6" />
            <text x="176" y="19" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="900" letterSpacing="0.7">
              GOLDEN COLLEGE BOUNDARY WALL
            </text>

            {/* Clear Boundary Divider Label at Central Jail Step */}
            <rect x="904" y="1086" width="168" height="17" rx="5" fill="#451a03" stroke="#facc15" strokeWidth="1.6" />
            <text x="988" y="1098" textAnchor="middle" fill="#fef08a" fontSize="9.2" fontWeight="900">
              INSIDE COLLEGE | OUTSIDE JAIL →
            </text>

            {/* Vertical Sightline Guide showing Auditorium Hall on Principal Path */}
            <line
              x1="890"
              y1="556"
              x2="890"
              y2="732"
              stroke="#fb7185"
              strokeOpacity="0.28"
              strokeWidth="2.2"
              strokeDasharray="6 5"
            />

            {/* ================= FAR NORTH CORRIDOR (IN FRONT OF GARDEN IN NORTH): ECONOMICS · SINDHI · PHYSIOLOGY · PSYCHOLOGY · GEOGRAPHY · CLASSES & GENERAL STAFF ROOM (FOR ARTS) ================= */}

            <rect
              x="44"
              y="24"
              width="1112"
              height="136"
              rx="13"
              fill="#0f172a"
              fillOpacity="0.86"
              stroke="#fde047"
              strokeWidth="2.4"
            />
            <rect x="190" y="17" width="820" height="18" rx="5" fill="#1e1b4b" stroke="#fde047" strokeWidth="1.4" />
            <text x="600" y="29.5" textAnchor="middle" fill="#fef08a" fontSize="9.4" fontWeight="900" letterSpacing="0.45">
              NORTH ACADEMIC WING (IN FRONT OF GARDEN ↑) · ECONOMICS · SINDHI · PHYSIOLOGY · PSYCHOLOGY · GEOGRAPHY · CLASSES &amp; GENERAL STAFF ROOM (FOR ARTS)
            </text>

            {/* 1. ECONOMICS */}
            <rect x="50" y="48" width="176" height="104" rx="9" fill="#78350f" fillOpacity="0.94" stroke="#fbbf24" strokeWidth="2.1" />
            <SolarPanelArray x={188} y={52} w={32} h={7.5} />
            <text x="138" y="75" textAnchor="middle" fill="#fde68a" fontSize="11.8" fontWeight="900">
              ECONOMICS
            </text>
            <text x="138" y="141" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="800">
              DEPT. &amp; CLASSES
            </text>

            {/* 2. SINDHI */}
            <rect x="234" y="48" width="176" height="104" rx="9" fill="#083344" fillOpacity="0.94" stroke="#22d3ee" strokeWidth="2.1" />
            <SolarPanelArray x={372} y={52} w={32} h={7.5} />
            <text x="322" y="75" textAnchor="middle" fill="#67e8f9" fontSize="12.2" fontWeight="900">
              SINDHI
            </text>
            <text x="322" y="141" textAnchor="middle" fill="#cffafe" fontSize="8" fontWeight="800">
              DEPT. &amp; CLASSES
            </text>

            {/* 3. PHYSIOLOGY */}
            <rect x="418" y="48" width="176" height="104" rx="9" fill="#831843" fillOpacity="0.94" stroke="#f472b6" strokeWidth="2.1" />
            <SolarPanelArray x={556} y={52} w={32} h={7.5} />
            <text x="506" y="75" textAnchor="middle" fill="#fbcfe8" fontSize="11.6" fontWeight="900">
              PHYSIOLOGY
            </text>
            <text x="506" y="141" textAnchor="middle" fill="#fce7f3" fontSize="8" fontWeight="800">
              DEPT. &amp; CLASSES
            </text>

            {/* 4. PSYCHOLOGY */}
            <rect x="602" y="48" width="176" height="104" rx="9" fill="#581c87" fillOpacity="0.94" stroke="#c084fc" strokeWidth="2.1" />
            <SolarPanelArray x={740} y={52} w={32} h={7.5} />
            <text x="690" y="75" textAnchor="middle" fill="#e9d5ff" fontSize="11.6" fontWeight="900">
              PSYCHOLOGY
            </text>
            <text x="690" y="141" textAnchor="middle" fill="#f3e8ff" fontSize="8" fontWeight="800">
              DEPT. &amp; CLASSES
            </text>

            {/* 5. GEOGRAPHY */}
            <rect x="786" y="48" width="176" height="104" rx="9" fill="#0c4a6e" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="2.1" />
            <SolarPanelArray x={924} y={52} w={32} h={7.5} />
            <text x="874" y="75" textAnchor="middle" fill="#bae6fd" fontSize="11.6" fontWeight="900">
              GEOGRAPHY
            </text>
            <text x="874" y="141" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="800">
              DEPT. &amp; CLASSES
            </text>

            {/* 6. GENERAL STAFF ROOM (FOR ARTS) & CLASSES */}
            <rect x="970" y="48" width="180" height="104" rx="9" fill="#881337" fillOpacity="0.94" stroke="#fb7185" strokeWidth="2.3" />
            <SolarPanelArray x={1112} y={52} w={32} h={7.5} />
            <text x="1060" y="71" textAnchor="middle" fill="#fecdd3" fontSize="10.2" fontWeight="900">
              GENERAL STAFF RM
            </text>
            <text x="1060" y="83" textAnchor="middle" fill="#fde047" fontSize="9.4" fontWeight="900">
              (FOR ARTS)
            </text>
            <text x="1060" y="141" textAnchor="middle" fill="#ffe4e6" fontSize="8" fontWeight="800">
              ARTS CLASSES &amp; STAFF
            </text>

            {/* ================= STRAIGHT GARDEN (AFTER LONG WALKING DISTANCE · FACING NORTH DEPTS ↑) ================= */}

            <rect
              x="44"
              y="168"
              width="1112"
              height="68"
              rx="12"
              fill="url(#lawn-grad)"
              stroke={isNorthGardenActive ? '#fde047' : '#34d399'}
              strokeWidth={isNorthGardenActive ? '3.4' : '2.8'}
            />
            <SwayingTree x={88} y={202} r={14} animate={isNorthGardenActive} delay="0s" />
            <SwayingTree x={200} y={202} r={13} animate={isNorthGardenActive} delay="0.4s" />
            <SwayingTree x={315} y={200} r={11.5} animate={isNorthGardenActive} delay="0.7s" />
            <SwayingTree x={885} y={200} r={11.5} animate={isNorthGardenActive} delay="0.2s" />
            <SwayingTree x={995} y={202} r={13} animate={isNorthGardenActive} delay="0.6s" />
            <SwayingTree x={1112} y={202} r={14} animate={isNorthGardenActive} delay="0.9s" />

            <BloomingFlower x={144} y={214} petalColor="#f472b6" animate={isNorthGardenActive} delay="0s" />
            <BloomingFlower x={256} y={216} petalColor="#fde047" centerColor="#ea580c" animate={isNorthGardenActive} delay="0.3s" />
            <BloomingFlower x={368} y={212} petalColor="#fb7185" animate={isNorthGardenActive} delay="0.6s" />
            <BloomingFlower x={535} y={205} petalColor="#f472b6" animate={isNorthGardenActive} delay="0.2s" />
            <BloomingFlower x={665} y={205} petalColor="#38bdf8" centerColor="#fde047" animate={isNorthGardenActive} delay="0.5s" />
            <BloomingFlower x={832} y={212} petalColor="#fde047" centerColor="#dc2626" animate={isNorthGardenActive} delay="0.4s" />
            <BloomingFlower x={944} y={216} petalColor="#fb7185" animate={isNorthGardenActive} delay="0.8s" />
            <BloomingFlower x={1056} y={214} petalColor="#c084fc" animate={isNorthGardenActive} delay="0.1s" />

            <g transform="translate(460, 202)">
              <circle cx="0" cy="0" r="9" fill="#052e16" stroke="#a3e635" strokeWidth="1.3" />
              <ellipse cx="0" cy="-3.2" rx="4.8" ry="1.5" fill="#fde047" />
              <circle cx="0" cy="-1.2" r="1.9" fill="#fef3c7" />
              <path d="M-3.2,4 C-3.2,0.8 3.2,0.8 3.2,4 Z" fill="#4ade80" />
            </g>
            <g transform="translate(740, 202)">
              <circle cx="0" cy="0" r="9" fill="#052e16" stroke="#a3e635" strokeWidth="1.3" />
              <ellipse cx="0" cy="-3.2" rx="4.8" ry="1.5" fill="#fde047" />
              <circle cx="0" cy="-1.2" r="1.9" fill="#fef3c7" />
              <path d="M-3.2,4 C-3.2,0.8 3.2,0.8 3.2,4 Z" fill="#22c55e" />
            </g>
            <text x="600" y="189" textAnchor="middle" fill="#dcfce7" fontSize="13" fontWeight="900" letterSpacing="0.8">
              GARDEN (AFTER LONG WALKING DISTANCE)
            </text>
            <text x="600" y="226" textAnchor="middle" fill="#fef08a" fontSize="8.8" fontWeight="900">
              ↑ IN FRONT IN NORTH: ECONOMICS · SINDHI · PHYSIOLOGY · PSYCHOLOGY · GEOGRAPHY · CLASSES &amp; GENERAL STAFF ROOM (FOR ARTS) ↑
            </text>

            {/* ================= LONG WALKING DISTANCE (STRAIGHT NORTH ↑ TO GARDEN) ================= */}

            <rect
              x="44"
              y="244"
              width="1112"
              height="50"
              rx="10"
              fill="#022c22"
              fillOpacity="0.86"
              stroke="#facc15"
              strokeOpacity="0.88"
              strokeWidth="2.2"
              strokeDasharray="8 5"
            />
            <line x1="270" y1="290" x2="270" y2="250" stroke="#fde047" strokeWidth="2.8" strokeDasharray="5 4" />
            <polygon points="264,254 270,244 276,254" fill="#fde047" />
            <line x1="600" y1="290" x2="600" y2="250" stroke="#fde047" strokeWidth="3.2" strokeDasharray="5 4" />
            <polygon points="594,254 600,244 606,254" fill="#fde047" />
            <line x1="930" y1="290" x2="930" y2="250" stroke="#fde047" strokeWidth="2.8" strokeDasharray="5 4" />
            <polygon points="924,254 930,244 936,254" fill="#fde047" />
            <text x="600" y="266" textAnchor="middle" fill="#fef08a" fontSize="12.5" fontWeight="900" letterSpacing="0.9">
              ↑ LONG WALKING DISTANCE (STRAIGHT NORTH TO GARDEN) ↑
            </text>
            <text x="600" y="284" textAnchor="middle" fill="#a7f3d0" fontSize="8.4" fontWeight="800">
              Walk Straight North Past Very Big Ground → Long Walking Distance → Garden Comes Ahead
            </text>

            {/* ================= VERY BIG GROUND (IN FRONT OF BOTANY & ZOOLOGY LABS IN NORTH: OLD BUS · CAR PARKING AREA · SPORTS GYMNASIUM) ================= */}

            <rect
              x="44"
              y="302"
              width="1112"
              height="142"
              rx="13"
              fill="url(#lawn-grad)"
              stroke="#4ade80"
              strokeWidth="2.8"
            />
            <ellipse
              cx="600"
              cy="374"
              rx="480"
              ry="58"
              fill="#15803d"
              fillOpacity="0.32"
              stroke="#d9f99d"
              strokeOpacity="0.6"
              strokeWidth="1.6"
              strokeDasharray="7 4"
            />

            {/* Inside Very Big Ground: 1. OLD BUS */}
            <rect x="130" y="312" width="230" height="82" rx="9" fill="#422006" fillOpacity="0.9" stroke="#facc15" strokeWidth="2.1" />
            <rect x="206" y="334" width="78" height="28" rx="5" fill="#eab308" stroke="#fef08a" strokeWidth="1.4" />
            <rect x="212" y="339" width="14" height="11" rx="1.5" fill="#0f172a" />
            <rect x="229" y="339" width="14" height="11" rx="1.5" fill="#0f172a" />
            <rect x="246" y="339" width="14" height="11" rx="1.5" fill="#0f172a" />
            <rect x="263" y="339" width="16" height="13" rx="1.5" fill="#38bdf8" />
            <circle cx="222" cy="364" r="5" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.2" />
            <circle cx="268" cy="364" r="5" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.2" />
            <text x="245" y="327" textAnchor="middle" fill="#fef08a" fontSize="9.8" fontWeight="900">
              OLD BUS
            </text>
            <text x="245" y="387" textAnchor="middle" fill="#fde68a" fontSize="7.4" fontWeight="800">
              IN VERY BIG GROUND
            </text>

            {/* Inside Very Big Ground: 2. CAR PARKING AREA */}
            <rect
              x="405"
              y="312"
              width="265"
              height="82"
              rx="9"
              fill="#1e293b"
              fillOpacity="0.94"
              stroke={isParkingActive ? '#38bdf8' : '#cbd5e1'}
              strokeWidth={isParkingActive ? '2.8' : '2'}
            />
            <line x1="482" y1="333" x2="482" y2="366" stroke="#fef08a" strokeOpacity="0.75" strokeWidth="1.2" />
            <line x1="518" y1="333" x2="518" y2="366" stroke="#fef08a" strokeOpacity="0.75" strokeWidth="1.2" />
            <line x1="554" y1="333" x2="554" y2="366" stroke="#fef08a" strokeOpacity="0.75" strokeWidth="1.2" />
            <line x1="590" y1="333" x2="590" y2="366" stroke="#fef08a" strokeOpacity="0.75" strokeWidth="1.2" />

            {/* Parked Cars in Bays */}
            <rect x="458" y="336" width="14" height="24" rx="3" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="0.9" />
            <rect x="494" y="336" width="14" height="24" rx="3" fill="#facc15" stroke="#fef9c3" strokeWidth="0.9" />
            <rect x="530" y="336" width="14" height="24" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.9" />
            <rect x="566" y="336" width="14" height="24" rx="3" fill="#34d399" stroke="#d1fae5" strokeWidth="0.9" />

            {/* Animated Moving Cars inside Car Parking Area when visitor goes to Parking */}
            {isParkingActive && (
              <g>
                {/* Driving Lane Guide */}
                <line
                  x1="416"
                  y1="372"
                  x2="660"
                  y2="372"
                  stroke="#94a3b8"
                  strokeOpacity="0.55"
                  strokeWidth="1.4"
                  strokeDasharray="6 4"
                />

                {/* Moving Car 1 (Cyan Sedan cruising left-to-right along parking driveway) */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="415 365; 630 365; 415 365"
                    dur="4.6s"
                    repeatCount="indefinite"
                  />
                  <rect x="0" y="0" width="26" height="12" rx="3.5" fill="#0ea5e9" stroke="#e0f2fe" strokeWidth="1.1" />
                  <rect x="5" y="2" width="13" height="8" rx="2" fill="#0f172a" />
                  <circle cx="26" cy="3" r="1.6" fill="#fef08a" />
                  <circle cx="26" cy="9" r="1.6" fill="#fef08a" />
                  <circle cx="0" cy="3" r="1.3" fill="#ef4444" />
                  <circle cx="0" cy="9" r="1.3" fill="#ef4444" />
                </g>

                {/* Moving Car 2 (Golden Car gliding smoothly into & out of open bay on right) */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="628 336; 602 336; 602 363; 628 363; 628 336"
                    dur="5.2s"
                    repeatCount="indefinite"
                  />
                  <rect x="0" y="0" width="22" height="11" rx="3" fill="#facc15" stroke="#fef9c3" strokeWidth="1" />
                  <rect x="4" y="2" width="11" height="7" rx="1.5" fill="#1e293b" />
                  <circle cx="22" cy="2.8" r="1.4" fill="#ffffff" />
                  <circle cx="22" cy="8.2" r="1.4" fill="#ffffff" />
                </g>

                {/* Moving Car 3 (Emerald Compact cruising along entry lane) */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="595 366; 418 366; 595 366"
                    dur="5.8s"
                    repeatCount="indefinite"
                  />
                  <rect x="0" y="0" width="24" height="11" rx="3" fill="#10b981" stroke="#d1fae5" strokeWidth="1" />
                  <rect x="6" y="2" width="11" height="7" rx="1.5" fill="#064e3b" />
                  <circle cx="0" cy="2.8" r="1.5" fill="#fef08a" />
                  <circle cx="0" cy="8.2" r="1.5" fill="#fef08a" />
                </g>
              </g>
            )}

            <text x="537" y="327" textAnchor="middle" fill={isParkingActive ? '#7dd3fc' : '#e2e8f0'} fontSize="9.8" fontWeight="900">
              {isParkingActive ? 'CAR PARKING AREA (CARS MOVING)' : 'CAR PARKING AREA'}
            </text>
            <text x="537" y="388" textAnchor="middle" fill={isParkingActive ? '#fde047' : '#94a3b8'} fontSize="7.4" fontWeight="800">
              IN VERY BIG GROUND
            </text>

            {/* Inside Very Big Ground: 3. SPORTS GYMNASIUM */}
            <rect x="715" y="312" width="375" height="90" rx="10" fill="#7c2d12" fillOpacity="0.92" stroke="#fb923c" strokeWidth="2.4" />
            <SolarPanelArray x={1044} y={316} w={38} h={8} />
            <rect x="820" y="333" width="165" height="44" rx="6" fill="#431407" fillOpacity="0.8" stroke="#fdba74" strokeWidth="1.2" />
            <line x1="902" y1="333" x2="902" y2="377" stroke="#fef08a" strokeOpacity="0.7" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="902" cy="355" r="11" fill="none" stroke="#fdba74" strokeOpacity="0.8" strokeWidth="1.2" />
            <text x="902" y="327" textAnchor="middle" fill="#fed7aa" fontSize="10.2" fontWeight="900">
              SPORTS GYMNASIUM
            </text>
            <text x="902" y="394" textAnchor="middle" fill="#fef08a" fontSize="7.8" fontWeight="900">
              INDOOR SPORTS HALL INSIDE VERY BIG GROUND
            </text>

            {/* Very Big Ground Main Label */}
            <text x="600" y="421" textAnchor="middle" fill="#dcfce7" fontSize="15.5" fontWeight="900" letterSpacing="1.1">
              VERY BIG GROUND · SPORTS, PARKING &amp; HERITAGE BUS
            </text>
            <text x="600" y="437" textAnchor="middle" fill="#fef08a" fontSize="8.8" fontWeight="900">
              OLD BUS · CAR PARKING AREA · SPORTS GYMNASIUM · WALK STRAIGHT NORTH TO LONG WALKING DISTANCE &amp; GARDEN ↑
            </text>

            {/* ================= NORTH-WEST SECTOR (SHIFTED +430px): TENNIS & VOLLEYBALL · NORTH-WEST TREES · UNIFIED COMMERCE / COMPUTER BUILDING ================= */}

            {/* 34. Tennis Court & Volleyball (Directly on Left of Pakistan Studies) */}
            <rect x="44" y="460" width="170" height="156" rx="13" fill="#064e3b" fillOpacity="0.9" stroke="#22d3ee" strokeWidth="2.4" />
            <text x="129" y="476" textAnchor="middle" fill="#a5f3fc" fontSize="9.6" fontWeight="900" letterSpacing="0.3">
              TENNIS &amp; VOLLEYBALL
            </text>

            {/* Tennis Court (Left Half) */}
            <rect x="52" y="484" width="72" height="98" rx="4" fill="#0e7490" fillOpacity="0.88" stroke="#ecfeff" strokeWidth="1.4" />
            <rect x="58" y="490" width="60" height="86" fill="none" stroke="#e0f2fe" strokeOpacity="0.85" strokeWidth="0.9" />
            <line x1="52" y1="533" x2="124" y2="533" stroke="#fef08a" strokeWidth="1.6" strokeDasharray="3 2" />
            <line x1="88" y1="490" x2="88" y2="576" stroke="#e0f2fe" strokeOpacity="0.7" strokeWidth="0.9" />
            <text x="88" y="592" textAnchor="middle" fill="#67e8f9" fontSize="7.4" fontWeight="900">
              TENNIS COURT
            </text>

            {/* Volleyball Court (Right Half) */}
            <rect x="134" y="484" width="72" height="98" rx="4" fill="#9a3412" fillOpacity="0.82" stroke="#fed7aa" strokeWidth="1.4" />
            <line x1="134" y1="533" x2="206" y2="533" stroke="#fef08a" strokeWidth="1.6" strokeDasharray="3 2" />
            <line x1="134" y1="516" x2="206" y2="516" stroke="#fed7aa" strokeOpacity="0.7" strokeWidth="0.9" />
            <line x1="134" y1="550" x2="206" y2="550" stroke="#fed7aa" strokeOpacity="0.7" strokeWidth="0.9" />
            <text x="170" y="592" textAnchor="middle" fill="#fed7aa" fontSize="7.4" fontWeight="900">
              VOLLEYBALL
            </text>

            <text x="129" y="609" textAnchor="middle" fill="#fef08a" fontSize="7.1" fontWeight="900">
              LEFT OF PAKISTAN STUDIES →
            </text>

            {/* Straight North-West Trees Line */}
            <rect x="44" y="624" width="170" height="92" rx="12" fill="#052e16" fillOpacity="0.84" stroke="#4ade80" strokeOpacity="0.78" strokeWidth="2.2" />
            <line x1="66" y1="632" x2="66" y2="708" stroke="#86efac" strokeOpacity="0.48" strokeWidth="2.2" strokeDasharray="5 4" />
            <line x1="192" y1="632" x2="192" y2="708" stroke="#86efac" strokeOpacity="0.48" strokeWidth="2.2" strokeDasharray="5 4" />
            <circle cx="66" cy="642" r="9.5" fill="#22c55e" fillOpacity="0.84" stroke="#bbf7d0" strokeWidth="1.3" />
            <circle cx="66" cy="672" r="10" fill="#16a34a" fillOpacity="0.86" stroke="#bbf7d0" strokeWidth="1.3" />
            <circle cx="66" cy="702" r="9.5" fill="#22c55e" fillOpacity="0.84" stroke="#bbf7d0" strokeWidth="1.3" />
            <circle cx="192" cy="642" r="9.5" fill="#16a34a" fillOpacity="0.82" stroke="#bbf7d0" strokeWidth="1.3" />
            <circle cx="192" cy="672" r="10" fill="#22c55e" fillOpacity="0.84" stroke="#bbf7d0" strokeWidth="1.3" />
            <circle cx="192" cy="702" r="9.5" fill="#16a34a" fillOpacity="0.82" stroke="#bbf7d0" strokeWidth="1.3" />
            <text x="129" y="650" textAnchor="middle" fill="#bbf7d0" fontSize="9.6" fontWeight="900">
              NORTH-WEST TREES
            </text>
            <text x="129" y="666" textAnchor="middle" fill="#fef08a" fontSize="7.4" fontWeight="900">
              (STRAIGHT LINE)
            </text>
            <text x="129" y="686" textAnchor="middle" fill="#a7f3d0" fontSize="7.1" fontWeight="800">
              → SMALL GARDEN &amp; COMP LAB
            </text>
            <text x="129" y="701" textAnchor="middle" fill="#fdba74" fontSize="7.1" fontWeight="900">
              ↓ TO BIG COLLEGE HOSTEL
            </text>

            {/* UNIFIED SAME BUILDING (Ground Floor: ONE CORRIDOR + COMPUTER DEPARTMENT | 1st Floor: Commerce & Library BY STAIRS) */}
            <rect x="224" y="456" width="268" height="264" rx="14" fill="#0f172a" fillOpacity="0.54" stroke="#cbd5e1" strokeOpacity="0.78" strokeWidth="2.6" />
            <rect x="230" y="448" width="256" height="17" rx="5" fill="#1e1b4b" stroke="#c084fc" strokeWidth="1.4" />
            <text x="358" y="460" textAnchor="middle" fill="#f5d0fe" fontSize="8.8" fontWeight="900" letterSpacing="0.3">
              SAME BUILDING · COMMERCE (BY STAIRS ↑) · 1 CORRIDOR
            </text>

            {/* 26. Commerce Dept. & Commerce Library (1st Floor of SAME Building — Reached By Stairs) */}
            <rect x="232" y="466" width="254" height="48" rx="10" fill="#581c87" fillOpacity="0.78" stroke="#a78bfa" strokeWidth="2.4" />
            <SolarPanelArray x={442} y={469} w={38} h={9.5} />
            <text x="340" y="482" textAnchor="middle" fontSize="11.6" fontWeight="900">
              <tspan fill="#f5d0fe">COMMERCE</tspan>
              <tspan fill="#ffffff"> &amp; </tspan>
              <tspan fill="#fde68a">COMMERCE LIBRARY</tspan>
            </text>
            <text x="359" y="509" textAnchor="middle" fill="#e9d5ff" fontSize="9.0" fontWeight="900">
              (1ST FLOOR · USE STAIRS ↑ ON RIGHT)
            </text>

            {/* 23, 24, 25. SEPARATE ROOMS: Pakistan Studies | Urdu | Physical Education */}
            <rect x="232" y="519" width="80" height="72" rx="9" fill="#7f1d1d" fillOpacity="0.76" stroke="#f87171" strokeWidth="2.2" />
            <SolarPanelArray x={272} y={522} w={34} h={8.5} />
            <text x="272" y="544" textAnchor="middle" fill="#fca5a5" fontSize="10.4" fontWeight="900">
              PAK
            </text>
            <text x="272" y="557" textAnchor="middle" fill="#fca5a5" fontSize="10.4" fontWeight="900">
              STUDIES
            </text>

            <rect x="318" y="519" width="80" height="72" rx="9" fill="#78350f" fillOpacity="0.76" stroke="#fbbf24" strokeWidth="2.2" />
            <SolarPanelArray x={358} y={522} w={34} h={8.5} />
            <text x="358" y="550" textAnchor="middle" fill="#fde68a" fontSize="11.6" fontWeight="900">
              URDU
            </text>

            <rect x="404" y="519" width="82" height="72" rx="9" fill="#14532d" fillOpacity="0.82" stroke="#4ade80" strokeWidth="2.2" />
            <SolarPanelArray x={446} y={522} w={34} h={8.5} />
            <text x="445" y="544" textAnchor="middle" fill="#86efac" fontSize="9.4" fontWeight="900">
              PHYSICAL
            </text>
            <text x="445" y="556" textAnchor="middle" fill="#86efac" fontSize="9.0" fontWeight="900">
              EDUCATION
            </text>

            {/* Indoor Unified Corridor Tag */}
            <rect x="312" y="594" width="92" height="14" rx="4" fill="#021b15" stroke="#fde047" strokeWidth="1.3" />
            <text x="358" y="604" textAnchor="middle" fill="#fef08a" fontSize="8.2" fontWeight="900">
              1 CORRIDOR
            </text>

            {/* COMPUTER DEPARTMENT Group Frame */}
            <rect
              x="230"
              y="618"
              width="256"
              height="98"
              rx="11"
              fill="#082f49"
              fillOpacity="0.34"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
            <rect x="274" y="610" width="168" height="17" rx="5" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="358" y="621.5" textAnchor="middle" fill="#bae6fd" fontSize="9.4" fontWeight="900" letterSpacing="0.5">
              COMPUTER DEPARTMENT
            </text>

            {/* 20. Computer Lab & Computer Office */}
            <rect x="235" y="631" width="118" height="80" rx="9" fill="#075985" fillOpacity="0.82" stroke="#00d4ff" strokeWidth="2.3" />
            <SolarPanelArray x={241} y={635} w={34} h={9} />
            <rect x="289" y="637" width="22" height="13" rx="2.5" fill="#0c4a6e" stroke="#7dd3fc" strokeWidth="1.2" />
            <rect x="317" y="637" width="26" height="13" rx="2.5" fill="#1e293b" stroke="#bae6fd" strokeWidth="1.2" />
            <text x="294" y="693" textAnchor="middle" fill="#8ce9ff" fontSize="11.0" fontWeight="900">
              COMPUTER LAB
            </text>
            <text x="294" y="705" textAnchor="middle" fill="#fde68a" fontSize="10.0" fontWeight="900">
              &amp; OFFICE
            </text>

            {/* 21. BIG Computer Multimedia Room */}
            <rect x="359" y="631" width="124" height="80" rx="9" fill="#581c87" fillOpacity="0.82" stroke="#c084fc" strokeWidth="2.4" />
            <SolarPanelArray x={441} y={635} w={36} h={9} />
            <rect x="367" y="637" width="52" height="17" rx="3" fill="#1e1b4b" stroke="#e9d5ff" strokeWidth="1.3" />
            <polygon points="389,641 389,650 398,645.5" fill="#f0abfc" />
            <text x="421" y="693" textAnchor="middle" fill="#e9d5ff" fontSize="10.6" fontWeight="900">
              BIG MULTIMEDIA
            </text>
            <text x="421" y="705" textAnchor="middle" fill="#f9a8d4" fontSize="9.6" fontWeight="900">
              ROOM (WIDE HALL)
            </text>

            {/* COMMERCE STAIRS */}
            <rect
              x="492"
              y="550"
              width="40"
              height="94"
              rx="7"
              fill="#1e293b"
              fillOpacity="0.96"
              stroke="#facc15"
              strokeWidth="2.2"
            />
            <line x1="498" y1="566" x2="526" y2="566" stroke="#fde047" strokeWidth="2.2" />
            <line x1="498" y1="575" x2="526" y2="575" stroke="#fde047" strokeWidth="2.2" />
            <line x1="498" y1="584" x2="526" y2="584" stroke="#fde047" strokeWidth="2.2" />
            <line x1="498" y1="593" x2="526" y2="593" stroke="#fde047" strokeWidth="2.2" />
            <line x1="498" y1="602" x2="526" y2="602" stroke="#fde047" strokeWidth="2.2" />
            <line x1="512" y1="563" x2="512" y2="608" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="507,567 512,556 517,567" fill="#38bdf8" />
            <text x="512" y="622" textAnchor="middle" fill="#fef08a" fontSize="8.2" fontWeight="900">
              STAIRS
            </text>
            <text x="512" y="634" textAnchor="middle" fill="#f5d0fe" fontSize="6.5" fontWeight="900">
              ↑ COMMERCE
            </text>

            {/* ================= BETWEEN COMMERCE & FLAG HOISTING GROUND: PRAYER ROOM · GREENHOUSE · KARATE CLUB ================= */}

            {/* 15A. Prayer Room (Namaz Hall) */}
            <rect x="500" y="450" width="66" height="76" rx="9" fill="#064e3b" fillOpacity="0.92" stroke="#34d399" strokeWidth="2.2" />
            <g transform="translate(533, 480)">
              <path d="M-12,7 C-12,-7 12,-7 12,7 Z" fill="#10b981" stroke="#fef08a" strokeWidth="1.2" />
              <line x1="0" y1="-4" x2="0" y2="-10" stroke="#fde047" strokeWidth="1.3" />
              <circle cx="0" cy="-11" r="1.4" fill="#fde047" />
              <rect x="-15" y="7" width="30" height="8" rx="2" fill="#022c22" stroke="#6ee7b7" strokeWidth="1" />
            </g>
            <text x="533" y="464" textAnchor="middle" fill="#6ee7b7" fontSize="7.8" fontWeight="900">
              PRAYER ROOM
            </text>
            <text x="533" y="519" textAnchor="middle" fill="#fef08a" fontSize="6.3" fontWeight="800">
              NAMAZ HALL
            </text>

            {/* 15B. Botanical Greenhouse */}
            <rect x="571" y="450" width="66" height="76" rx="9" fill="#14532d" fillOpacity="0.92" stroke="#4ade80" strokeWidth="2.2" />
            <g transform="translate(604, 482)">
              <path d="M-15,10 L-15,0 C-15,-12 15,-12 15,0 L15,10 Z" fill="#38bdf8" fillOpacity="0.28" stroke="#7dd3fc" strokeWidth="1.4" />
              <line x1="-6" y1="-8" x2="-6" y2="10" stroke="#bae6fd" strokeWidth="0.9" />
              <line x1="6" y1="-8" x2="6" y2="10" stroke="#bae6fd" strokeWidth="0.9" />
              <circle cx="-6" cy="5" r="3" fill="#4ade80" />
              <circle cx="0" cy="4" r="3.4" fill="#22c55e" />
              <circle cx="6" cy="5" r="3" fill="#86efac" />
            </g>
            <text x="604" y="464" textAnchor="middle" fill="#bbf7d0" fontSize="7.6" fontWeight="900">
              GREENHOUSE
            </text>
            <text x="604" y="519" textAnchor="middle" fill="#fde68a" fontSize="6.3" fontWeight="800">
              NURSERY
            </text>

            {/* 15C. Karate Club */}
            <rect x="642" y="450" width="66" height="76" rx="9" fill="#7f1d1d" fillOpacity="0.92" stroke="#fb7185" strokeWidth="2.2" />
            <g transform="translate(675, 482)">
              <rect x="-15" y="-9" width="30" height="19" rx="3" fill="#450a0a" stroke="#fecdd3" strokeWidth="1.1" />
              <circle cx="0" cy="0.5" r="6" fill="none" stroke="#fde047" strokeWidth="1.5" />
              <path d="M-9,5 L9,-4" stroke="#ffffff" strokeWidth="2.1" strokeLinecap="round" />
              <path d="M-6,-2 L6,4" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
            </g>
            <text x="675" y="464" textAnchor="middle" fill="#fecdd3" fontSize="7.6" fontWeight="900">
              KARATE CLUB
            </text>
            <text x="675" y="519" textAnchor="middle" fill="#fef08a" fontSize="6.3" fontWeight="800">
              MARTIAL ARTS
            </text>

            {/* ================= FLAG HOISTING GROUND · ZOOLOGY & ZOO LAB · BOTANY & BOTANY LAB ================= */}

            {/* 15. Assembly & Flag Hoisting Ground */}
            <rect x="740" y="450" width="128" height="76" rx="10" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.3" />
            <SolarPanelArray x={832} y={453} w={30} h={7.5} />
            <rect x="752" y="494" width="18" height="6" rx="2" fill="#d1fae5" fillOpacity="0.88" />
            <line x1="761" y1="494" x2="761" y2="468" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="761" cy="467" r="1.6" fill="#fde047" />
            <rect x="762" y="469" width="5" height="10" fill="#ffffff" />
            <rect x="767" y="469" width="12" height="10" fill="#15803d" stroke="#bbf7d0" strokeWidth="0.7" />
            <circle cx="773" cy="474" r="2.2" fill="#ffffff" />
            <circle cx="774" cy="473.8" r="1.7" fill="#15803d" />
            <text x="812" y="466" textAnchor="middle" fill="#dcfce7" fontSize="8.4" fontWeight="900">
              ASSEMBLY &amp;
            </text>
            <text x="812" y="478" textAnchor="middle" fill="#fef08a" fontSize="8.4" fontWeight="900">
              FLAG HOISTING
            </text>
            <text x="804" y="519" textAnchor="middle" fill="#fef08a" fontSize="7.0" fontWeight="900">
              MORNING GROUND
            </text>

            {/* 16. Zoology & Zoology Lab */}
            <rect x="876" y="450" width="136" height="76" rx="10" fill="#065f46" fillOpacity="0.88" stroke="#10b981" strokeWidth="2.4" />
            <SolarPanelArray x={974} y={453} w={32} h={8} />
            <text x="944" y="476" textAnchor="middle" fill="#a7f3d0" fontSize="9.8" fontWeight="900">
              ZOOLOGY &amp; ZOO LAB
            </text>
            <text x="944" y="518" textAnchor="middle" fill="#6ee7b7" fontSize="7.4" fontWeight="900">
              PRE-MEDICAL &amp; BS ZOOLOGY
            </text>

            {/* 17. Botany & Botany Lab */}
            <rect x="1020" y="450" width="136" height="76" rx="10" fill="#1a2e05" fillOpacity="0.88" stroke="#a3e635" strokeWidth="2.4" />
            <SolarPanelArray x={1118} y={453} w={32} h={8} />
            <text x="1088" y="476" textAnchor="middle" fill="#d9f99d" fontSize="9.8" fontWeight="900">
              BOTANY &amp; BOTANY LAB
            </text>
            <text x="1088" y="518" textAnchor="middle" fill="#bef264" fontSize="7.4" fontWeight="900">
              HERBARIUM &amp; PLANT LAB
            </text>

            {/* ================= ENLARGED BY-STAIRS 1ST FLOOR BUILDING (ENGLISH · LARGEST PHYSICS) & CORNER AUDITORIUM HALL ================= */}

            <rect
              x="626"
              y="542"
              width="420"
              height="166"
              rx="13"
              fill="#0f172a"
              fillOpacity="0.82"
              stroke="#93c5fd"
              strokeWidth="2.6"
            />
            <rect x="630" y="535" width="412" height="17" rx="5" fill="#1e1b4b" stroke="#fde047" strokeWidth="1.5" />
            <text x="836" y="546.5" textAnchor="middle" fill="#fef08a" fontSize="7.4" fontWeight="900" letterSpacing="0.25">
              ↑ BY STAIRS (ENLARGED 1ST FL): ISLAMIAT · MUSLIM HISTORY · POL. SCIENCE · ENGLISH · LARGEST PHYSICS · STATS BEFORE DARK RM
            </text>

            {/* Upper Tier of Enlarged 1st Floor (Y=552..600, H=48): Islamiat | Muslim History | Political Science | Mathematics */}
            <rect x="632" y="552" width="98" height="48" rx="8" fill="#065f46" fillOpacity="0.88" stroke="#34d399" strokeWidth="2.1" />
            <SolarPanelArray x={701} y={555} w={24} h={6.5} />
            <text x="681" y="573" textAnchor="middle" fill="#6ee7b7" fontSize="9.4" fontWeight="900">
              ISLAMIAT
            </text>
            <text x="681" y="585" textAnchor="middle" fill="#d1fae5" fontSize="6.5" fontWeight="800">
              &amp; ISLAMIC CULTURE
            </text>
            <text x="681" y="596" textAnchor="middle" fill="#a7f3d0" fontSize="6.2" fontWeight="800">
              BY STAIRS (1ST FL)
            </text>

            <rect x="734" y="552" width="100" height="48" rx="8" fill="#78350f" fillOpacity="0.88" stroke="#fbbf24" strokeWidth="2.1" />
            <SolarPanelArray x={805} y={555} w={24} h={6.5} />
            <text x="784" y="571" textAnchor="middle" fill="#fde68a" fontSize="8.8" fontWeight="900">
              MUSLIM
            </text>
            <text x="784" y="583" textAnchor="middle" fill="#fde68a" fontSize="9.2" fontWeight="900">
              HISTORY
            </text>
            <text x="784" y="596" textAnchor="middle" fill="#fef08a" fontSize="6.2" fontWeight="800">
              BY STAIRS (1ST FL)
            </text>

            <rect x="838" y="552" width="102" height="48" rx="8" fill="#4c1d95" fillOpacity="0.88" stroke="#a78bfa" strokeWidth="2.1" />
            <SolarPanelArray x={911} y={555} w={24} h={6.5} />
            <text x="889" y="571" textAnchor="middle" fill="#ddd6fe" fontSize="8.6" fontWeight="900">
              POLITICAL
            </text>
            <text x="889" y="583" textAnchor="middle" fill="#ddd6fe" fontSize="9.0" fontWeight="900">
              SCIENCE
            </text>
            <text x="889" y="596" textAnchor="middle" fill="#ede9fe" fontSize="6.2" fontWeight="800">
              BY STAIRS (1ST FL)
            </text>

            <rect x="944" y="552" width="96" height="48" rx="8" fill="#115e59" fillOpacity="0.88" stroke="#2dd4bf" strokeWidth="2.1" />
            <SolarPanelArray x={1011} y={555} w={24} h={6.5} />
            <text x="992" y="576" textAnchor="middle" fill="#99f6e4" fontSize="8.8" fontWeight="900">
              MATHEMATICS
            </text>
            <text x="992" y="596" textAnchor="middle" fill="#ccfbf1" fontSize="6.2" fontWeight="800">
              BY STAIRS (1ST FL)
            </text>

            {/* Lower Tier of Enlarged 1st Floor (Y=605..703, H=98): Staff Room | ENGLISH | LARGEST PHYSICS WING (Lab + Office) | Statistics | Physics Dark Room */}
            <rect x="632" y="605" width="48" height="98" rx="7" fill="#1e1b4b" fillOpacity="0.92" stroke="#818cf8" strokeWidth="2" />
            <text x="656" y="636" textAnchor="middle" fill="#a5b4fc" fontSize="7.6" fontWeight="900">
              STAFF
            </text>
            <text x="656" y="648" textAnchor="middle" fill="#c7d2fe" fontSize="7.4" fontWeight="900">
              ROOM
            </text>
            <text x="656" y="695" textAnchor="middle" fill="#a5b4fc" fontSize="5.4" fontWeight="800">
              FACULTY
            </text>

            <rect x="684" y="605" width="62" height="98" rx="7" fill="#831843" fillOpacity="0.92" stroke="#f472b6" strokeWidth="2.2" />
            <SolarPanelArray x={718} y={608} w={22} h={6} />
            <text x="715" y="644" textAnchor="middle" fill="#f9a8d4" fontSize="9.6" fontWeight="900">
              ENGLISH
            </text>
            <text x="715" y="658" textAnchor="middle" fill="#fbcfe8" fontSize="6.4" fontWeight="800">
              DEPARTMENT
            </text>
            <text x="715" y="695" textAnchor="middle" fill="#fbcfe8" fontSize="5.6" fontWeight="800">
              LITERATURE
            </text>

            {/* PHYSICS DEPARTMENT — SHOWN LARGEST & MOST PROMINENT (X=750..942, W=192, H=98) */}
            <rect
              x="750"
              y="605"
              width="192"
              height="98"
              rx="10"
              fill="#1e3a8a"
              fillOpacity="0.97"
              stroke="#38bdf8"
              strokeWidth="3.4"
            />
            <rect x="760" y="608" width="172" height="16" rx="4" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.2" />
            <text x="846" y="619" textAnchor="middle" fill="#fef08a" fontSize="8.0" fontWeight="900" letterSpacing="0.35">
              PHYSICS WING (LARGEST DEPT.)
            </text>

            {/* Physics Lab (Extra Large W=118) */}
            <rect x="755" y="627" width="118" height="71" rx="6" fill="#1d4ed8" fillOpacity="0.72" stroke="#93c5fd" strokeWidth="1.6" />
            <SolarPanelArray x={760} y={630} w={26} h={6.5} />
            {/* Lab Experiment Bench + Optics Prism Visual */}
            <rect x="768" y="655" width="92" height="14" rx="3" fill="#0f172a" fillOpacity="0.72" stroke="#7dd3fc" strokeWidth="1" />
            <polygon points="798,666 806,657 814,666" fill="#fde047" fillOpacity="0.9" />
            <line x1="774" y1="662" x2="799" y2="662" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="811" y1="662" x2="852" y2="659" stroke="#f472b6" strokeWidth="1.5" />
            <line x1="811" y1="662" x2="852" y2="665" stroke="#4ade80" strokeWidth="1.5" />
            <text x="814" y="648" textAnchor="middle" fill="#ffffff" fontSize="11.0" fontWeight="900">
              PHYSICS LAB
            </text>
            <text x="814" y="684" textAnchor="middle" fill="#dbeafe" fontSize="6.8" fontWeight="900">
              PRACTICALS · MECHANICS
            </text>
            <text x="814" y="694" textAnchor="middle" fill="#fef08a" fontSize="6.4" fontWeight="800">
              OPTICS &amp; ELECTRICITY
            </text>

            {/* Physics Office (W=60) */}
            <rect x="877" y="627" width="60" height="71" rx="6" fill="#1e40af" fillOpacity="0.86" stroke="#bae6fd" strokeWidth="1.6" />
            <SolarPanelArray x={908} y={630} w={24} h={6.5} />
            <text x="907" y="652" textAnchor="middle" fill="#fef08a" fontSize="8.8" fontWeight="900">
              PHYSICS
            </text>
            <text x="907" y="664" textAnchor="middle" fill="#fef08a" fontSize="8.8" fontWeight="900">
              OFFICE
            </text>
            <text x="907" y="693" textAnchor="middle" fill="#bae6fd" fontSize="6.0" fontWeight="800">
              FACULTY
            </text>

            {/* STATISTICS DEPARTMENT (Directly BEFORE Dark Room) */}
            <rect x="946" y="605" width="46" height="98" rx="7" fill="#701a75" fillOpacity="0.92" stroke="#e879f9" strokeWidth="2.1" />
            <text x="969" y="632" textAnchor="middle" fill="#f0abfc" fontSize="7.4" fontWeight="900">
              STATS
            </text>
            <text x="969" y="644" textAnchor="middle" fill="#fef08a" fontSize="5.8" fontWeight="900">
              BEFORE
            </text>
            <text x="969" y="653" textAnchor="middle" fill="#fef08a" fontSize="5.8" fontWeight="900">
              DARK RM
            </text>
            <text x="969" y="695" textAnchor="middle" fill="#f5d0fe" fontSize="5.4" fontWeight="800">
              STATISTICS
            </text>

            {/* PHYSICS DARK ROOM */}
            <rect x="996" y="605" width="44" height="98" rx="7" fill="#020617" stroke="#38bdf8" strokeWidth="2.4" />
            <text x="1018" y="632" textAnchor="middle" fill="#fde047" fontSize="7.2" fontWeight="900">
              DARK
            </text>
            <text x="1018" y="643" textAnchor="middle" fill="#fde047" fontSize="7.2" fontWeight="900">
              ROOM
            </text>
            <text x="1018" y="657" textAnchor="middle" fill="#7dd3fc" fontSize="5.8" fontWeight="900">
              PHYSICS
            </text>
            <text x="1018" y="695" textAnchor="middle" fill="#93c5fd" fontSize="5.4" fontWeight="800">
              OPTICS
            </text>

            {/* 07. CORNER AUDITORIUM HALL (FAR-RIGHT EAST CORNER) */}
            <rect x="1052" y="540" width="108" height="168" rx="12" fill="#881337" fillOpacity="0.92" stroke="#fb7185" strokeWidth="2.8" />
            <SolarPanelArray x={1116} y={545} w={36} h={8} />
            <rect x="1064" y="600" width="84" height="56" rx="7" fill="#4c0519" fillOpacity="0.72" stroke="#fda4af" strokeOpacity="0.75" strokeWidth="1.3" />
            <line x1="1074" y1="614" x2="1138" y2="614" stroke="#fecdd3" strokeOpacity="0.55" strokeWidth="1.5" />
            <line x1="1074" y1="628" x2="1138" y2="628" stroke="#fecdd3" strokeOpacity="0.55" strokeWidth="1.5" />
            <line x1="1074" y1="642" x2="1138" y2="642" stroke="#fecdd3" strokeOpacity="0.55" strokeWidth="1.5" />
            <text x="1106" y="568" textAnchor="middle" fill="#fef08a" fontSize="7.2" fontWeight="900">
              EAST CORNER
            </text>
            <text x="1106" y="582" textAnchor="middle" fill="#fda4af" fontSize="10.0" fontWeight="900">
              AUDITORIUM
            </text>
            <text x="1106" y="594" textAnchor="middle" fill="#fda4af" fontSize="10.0" fontWeight="900">
              HALL
            </text>
            <text x="1106" y="685" textAnchor="middle" fill="#fecdd3" fontSize="6.8" fontWeight="900">
              CORNER HALL
            </text>
            <text x="1106" y="699" textAnchor="middle" fill="#fef08a" fontSize="7.0" fontWeight="900">
              SEPARATE ENTRY ↑
            </text>

            {/* ================= SEPARATE CORRIDOR: PRINCIPAL'S OFFICE → CORNER AUDITORIUM HALL (OUTSIDE CHEMISTRY WING) ================= */}
            <rect
              x="782"
              y="712"
              width="354"
              height="22"
              rx="7"
              fill="#4c0519"
              fillOpacity="0.88"
              stroke="#fb7185"
              strokeWidth="1.9"
            />
            <path d="M 817 740 L 817 723 L 1106 723 L 1106 710" fill="none" stroke="#fde047" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="1101,714 1106,704 1111,714" fill="#fde047" />
            <text x="964" y="726" textAnchor="middle" fill="#fecdd3" fontSize="7.2" fontWeight="900" letterSpacing="0.35">
              SEPARATE WAY: PRINCIPAL&rsquo;S OFFICE → CORNER AUDITORIUM HALL (OUTSIDE CHEMISTRY) → ↑
            </text>

            {/* ================= GROUND FLOOR: PRINCIPAL'S OFFICE → STAIRS → SPLIT PATH → CHEMISTRY WING IN LINE ON RIGHT ================= */}

            {/* Open Shaded West Courtyard Plaza */}
            <rect
              x="416"
              y="760"
              width="152"
              height="56"
              rx="10"
              fill="#022c22"
              fillOpacity="0.58"
              stroke="#34d399"
              strokeOpacity="0.45"
              strokeWidth="1.4"
              strokeDasharray="6 4"
            />
            <text x="492" y="781" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="900">
              CENTRAL COURTYARD
            </text>
            <text x="492" y="794" textAnchor="middle" fill="#a7f3d0" fontSize="8.6" fontWeight="900">
              &amp; PROMENADE
            </text>
            <text x="492" y="808" textAnchor="middle" fill="#fef08a" fontSize="7.4" fontWeight="800">
              ← MAZAR · PRINCIPAL →
            </text>

            {/* 09. PRINCIPAL'S OFFICE (EXTRA BIG & ROYAL BRIGHT GOLDEN LANDMARK) */}
            <rect
              x="632"
              y="740"
              width="98"
              height="96"
              rx="13"
              fill="url(#gold-principal-grad)"
              fillOpacity="0.94"
              stroke="#fef08a"
              strokeWidth="3.8"
            />
            <rect
              x="638"
              y="746"
              width="86"
              height="84"
              rx="9"
              fill="#451a03"
              fillOpacity="0.45"
              stroke="#fde047"
              strokeWidth="1.5"
            />
            <SolarPanelArray x={642} y={749} w={26} h={7} />
            <polygon
              points="712,749 715,755 722,755 717,759 719,765 712,762 705,765 707,759 702,755 709,755"
              fill="#fef08a"
              stroke="#92400e"
              strokeWidth="1"
            />
            <text x="681" y="773" textAnchor="middle" fill="#fef9c3" fontSize="9.8" fontWeight="900" letterSpacing="0.1">
              PRINCIPAL&rsquo;S
            </text>
            <text x="681" y="785" textAnchor="middle" fill="#fef9c3" fontSize="9.8" fontWeight="900" letterSpacing="0.1">
              OFFICE
            </text>
            <text x="681" y="824" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="900">
              GOLDEN HALL
            </text>

            {/* STAIRS TO 1ST FLOOR DEPARTMENTS */}
            <rect
              x="734"
              y="740"
              width="44"
              height="96"
              rx="8"
              fill="#1e293b"
              fillOpacity="0.96"
              stroke="#facc15"
              strokeWidth="2.3"
            />
            <line x1="741" y1="755" x2="771" y2="755" stroke="#fde047" strokeWidth="2.2" />
            <line x1="741" y1="765" x2="771" y2="765" stroke="#fde047" strokeWidth="2.2" />
            <line x1="741" y1="775" x2="771" y2="775" stroke="#fde047" strokeWidth="2.2" />
            <line x1="741" y1="785" x2="771" y2="785" stroke="#fde047" strokeWidth="2.2" />
            <line x1="741" y1="795" x2="771" y2="795" stroke="#fde047" strokeWidth="2.2" />
            <line x1="741" y1="805" x2="771" y2="805" stroke="#fde047" strokeWidth="2.2" />
            <line x1="756" y1="752" x2="756" y2="808" stroke="#38bdf8" strokeWidth="2.1" />
            <polygon points="751,756 756,744 761,756" fill="#38bdf8" />
            <text x="756" y="820" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="900">
              STAIRS
            </text>
            <text x="756" y="831" textAnchor="middle" fill="#bae6fd" fontSize="6.4" fontWeight="900">
              ↑ 1ST FLR
            </text>

            {/* SPLIT PATH JUNCTION BOX: SEPARATE UP ↑ TO AUDITORIUM WAY | STRAIGHT → TO CHEMISTRY */}
            <rect
              x="782"
              y="740"
              width="70"
              height="96"
              rx="10"
              fill="#082f49"
              fillOpacity="0.68"
              stroke="#fb7185"
              strokeOpacity="0.92"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <path d="M 786 788 L 817 788 L 817 744" fill="none" stroke="#fda4af" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="811,750 817,738 823,750" fill="#fda4af" />
            <path d="M 817 788 L 847 788" fill="none" stroke="#22d3ee" strokeWidth="2.8" strokeLinecap="round" />
            <polygon points="842,782 852,788 842,794" fill="#22d3ee" />
            <text x="817" y="806" textAnchor="middle" fill="#fda4af" fontSize="6.1" fontWeight="900">
              ↑ AUDITORIUM
            </text>
            <text x="817" y="817" textAnchor="middle" fill="#67e8f9" fontSize="6.1" fontWeight="900">
              → CHEMISTRY
            </text>
            <text x="817" y="828" textAnchor="middle" fill="#fef08a" fontSize="5.6" fontWeight="800">
              SEPARATE WAYS
            </text>

            {/* ================= CHEMISTRY WING (IN LINE ON THE RIGHT OF PRINCIPAL'S OFFICE, BELOW AUDITORIUM WAY) ================= */}

            <rect
              x="856"
              y="740"
              width="304"
              height="96"
              rx="12"
              fill="#082f49"
              fillOpacity="0.72"
              stroke="#22d3ee"
              strokeWidth="2.4"
            />
            <text x="1008" y="832" textAnchor="middle" fill="#67e8f9" fontSize="6.8" fontWeight="900" letterSpacing="0.25">
              CHEMISTRY WING (IN LINE RIGHT OF PRINCIPAL · SEPARATE FROM AUDITORIUM WAY)
            </text>

            {/* 1. Chemistry Office */}
            <rect x="862" y="746" width="94" height="76" rx="8" fill="#155e75" fillOpacity="0.94" stroke="#67e8f9" strokeWidth="2.1" />
            <SolarPanelArray x={922} y={749} w={29} h={7} />
            <text x="909" y="772" textAnchor="middle" fill="#fef08a" fontSize="8.8" fontWeight="900">
              CHEMISTRY
            </text>
            <text x="909" y="784" textAnchor="middle" fill="#fef08a" fontSize="9.4" fontWeight="900">
              OFFICE
            </text>
            <text x="909" y="814" textAnchor="middle" fill="#cffafe" fontSize="6.2" fontWeight="800">
              RIGHT OF PRINCIPAL
            </text>

            {/* 2. Chemistry Lab 1 */}
            <rect x="961" y="746" width="94" height="76" rx="8" fill="#164e63" fillOpacity="0.94" stroke="#22d3ee" strokeWidth="2.1" />
            <SolarPanelArray x={1021} y={749} w={29} h={7} />
            <text x="1008" y="772" textAnchor="middle" fill="#a5f3fc" fontSize="8.8" fontWeight="900">
              CHEMISTRY
            </text>
            <text x="1008" y="784" textAnchor="middle" fill="#a5f3fc" fontSize="9.6" fontWeight="900">
              LAB 1
            </text>
            <text x="1008" y="814" textAnchor="middle" fill="#cffafe" fontSize="6.2" fontWeight="800">
              PRACTICAL LAB 1
            </text>

            {/* 3. Chemistry Lab 2 */}
            <rect x="1060" y="746" width="94" height="76" rx="8" fill="#0c4a6e" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="2.1" />
            <SolarPanelArray x={1120} y={749} w={29} h={7} />
            <text x="1107" y="772" textAnchor="middle" fill="#7dd3fc" fontSize="8.8" fontWeight="900">
              CHEMISTRY
            </text>
            <text x="1107" y="784" textAnchor="middle" fill="#7dd3fc" fontSize="9.6" fontWeight="900">
              LAB 2
            </text>
            <text x="1107" y="814" textAnchor="middle" fill="#e0f2fe" fontSize="6.2" fontWeight="800">
              PRACTICAL LAB 2
            </text>

            {/* ================= ON RIGHT OF CORRIDOR: GARDEN & GARDENERS (ABOVE CLERK OFFICE BEFORE PRINCIPAL) ================= */}

            <rect
              x="632"
              y="840"
              width="300"
              height="80"
              rx="13"
              fill="url(#lawn-grad)"
              stroke={isMainGardenActive ? '#fde047' : '#4ade80'}
              strokeWidth={isMainGardenActive ? '3.4' : '2.6'}
            />
            <SwayingTree x={670} y={866} r={12.5} animate={isMainGardenActive} delay="0s" />
            <SwayingTree x={782} y={858} r={11.5} animate={isMainGardenActive} delay="0.4s" />
            <SwayingTree x={892} y={866} r={12.5} animate={isMainGardenActive} delay="0.8s" />
            <BloomingFlower x={696} y={884} petalColor="#f472b6" animate={isMainGardenActive} delay="0s" />
            <BloomingFlower x={755} y={884} petalColor="#fde047" centerColor="#ea580c" animate={isMainGardenActive} delay="0.3s" />
            <BloomingFlower x={810} y={884} petalColor="#fb7185" animate={isMainGardenActive} delay="0.6s" />
            <BloomingFlower x={866} y={884} petalColor="#c084fc" animate={isMainGardenActive} delay="0.2s" />

            {/* Gardener 1 in Garden */}
            <g transform="translate(726, 872)">
              <circle cx="0" cy="0" r="10.5" fill="#052e16" stroke="#a3e635" strokeWidth="1.5" />
              <ellipse cx="0" cy="-4" rx="5.8" ry="1.8" fill="#fde047" />
              <circle cx="0" cy="-1.6" r="2.3" fill="#fef3c7" />
              <path d="M-3.8,4.8 C-3.8,1 3.8,1 3.8,4.8 Z" fill="#4ade80" />
              <rect x="3.8" y="0.9" width="3.8" height="2.8" rx="0.6" fill="#38bdf8" />
            </g>
            {/* Gardener 2 in Garden */}
            <g transform="translate(838, 872)">
              <circle cx="0" cy="0" r="10.5" fill="#052e16" stroke="#a3e635" strokeWidth="1.5" />
              <ellipse cx="0" cy="-4" rx="5.8" ry="1.8" fill="#fde047" />
              <circle cx="0" cy="-1.6" r="2.3" fill="#fef3c7" />
              <path d="M-3.8,4.8 C-3.8,1 3.8,1 3.8,4.8 Z" fill="#22c55e" />
              <circle cx="-5.5" cy="2.1" r="1.9" fill="#f472b6" />
            </g>
            <text x="782" y="902" textAnchor="middle" fill="#dcfce7" fontSize="11.4" fontWeight="900">
              GARDEN &amp; GARDENERS (AFTER CLERK)
            </text>
            <text x="782" y="915" textAnchor="middle" fill="#fef08a" fontSize="8.4" fontWeight="900">
              ON RIGHT OF CORRIDOR · BEFORE PRINCIPAL &amp; CHEM
            </text>

            {/* 39. SMALL GARDEN (DIRECTLY BEFORE COMPUTER LAB · BESIDE HISTORICAL GRAVEYARD & MAZAR) */}
            <rect
              x="114"
              y="726"
              width="134"
              height="84"
              rx="12"
              fill="url(#lawn-grad)"
              stroke={isSmallGardenActive ? '#fde047' : '#4ade80'}
              strokeWidth={isSmallGardenActive ? '3.2' : '2.4'}
            />
            <SwayingTree x={135} y={754} r={10.5} animate={isSmallGardenActive} delay="0s" />
            <SwayingTree x={227} y={754} r={10.5} animate={isSmallGardenActive} delay="0.5s" />
            <BloomingFlower x={152} y={782} petalColor="#f472b6" animate={isSmallGardenActive} delay="0.1s" />
            <BloomingFlower x={172} y={787} petalColor="#fde047" centerColor="#ea580c" animate={isSmallGardenActive} delay="0.4s" />
            <BloomingFlower x={194} y={787} petalColor="#fb7185" animate={isSmallGardenActive} delay="0.7s" />
            <BloomingFlower x={212} y={782} petalColor="#c084fc" animate={isSmallGardenActive} delay="0.2s" />
            <text x="181" y="741" textAnchor="middle" fill="#dcfce7" fontSize="9.4" fontWeight="900">
              SMALL GARDEN
            </text>
            <text x="181" y="804" textAnchor="middle" fill="#fef08a" fontSize="7.3" fontWeight="900">
              BEFORE COMPUTER LAB
            </text>

            {/* 45. HISTORICAL GRAVEYARD & MAZAR (BESIDE SMALL GARDEN · BEFORE COMPUTER LAB & BIG MULTIMEDIA ROOM) */}
            <rect
              x="256"
              y="726"
              width="152"
              height="84"
              rx="12"
              fill="#042f2e"
              fillOpacity="0.94"
              stroke={isMazarActive ? '#fde047' : '#5eead4'}
              strokeWidth={isMazarActive ? '3.2' : '2.4'}
            />
            {/* Courtyard Inner Boundary */}
            <rect
              x="262"
              y="745"
              width="140"
              height="48"
              rx="7"
              fill="#022c22"
              fillOpacity="0.75"
              stroke="#34d399"
              strokeOpacity="0.65"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            {/* Historic Grave Markers (Left Half) */}
            <rect x="270" y="754" width="22" height="10" rx="2.5" fill="#e2e8f0" fillOpacity="0.88" stroke="#94a3b8" strokeWidth="1" />
            <rect x="298" y="754" width="22" height="10" rx="2.5" fill="#e2e8f0" fillOpacity="0.88" stroke="#94a3b8" strokeWidth="1" />
            <rect x="270" y="772" width="22" height="10" rx="2.5" fill="#cbd5e1" fillOpacity="0.86" stroke="#94a3b8" strokeWidth="1" />
            <rect x="298" y="772" width="22" height="10" rx="2.5" fill="#cbd5e1" fillOpacity="0.86" stroke="#94a3b8" strokeWidth="1" />
            {/* Revered Domed Mazar Shrine Pavilion (Right Half) */}
            <g transform="translate(362, 771)">
              <rect x="-20" y="-4" width="40" height="20" rx="3" fill="#ecfdf5" stroke="#34d399" strokeWidth="1.3" />
              <path d="M-16,-4 C-16,-20 16,-20 16,-4 Z" fill="#10b981" stroke="#fef08a" strokeWidth="1.4" />
              <line x1="0" y1="-16" x2="0" y2="-22" stroke="#fde047" strokeWidth="1.5" />
              <circle cx="0" cy="-23" r="1.8" fill="#fde047" />
              <path d="M-6,16 L-6,5 A6,6 0 0,1 6,5 L6,16 Z" fill="#064e3b" stroke="#fde047" strokeWidth="1" />
            </g>
            {/* Tranquil Cypress Accent */}
            <ellipse cx="332" cy="769" rx="5" ry="11" fill="#16a34a" stroke="#bbf7d0" strokeWidth="1" />
            <text x="332" y="739" textAnchor="middle" fill="#99f6e4" fontSize="8.8" fontWeight="900">
              GRAVEYARD &amp; MAZAR
            </text>
            <text x="332" y="804" textAnchor="middle" fill="#fef08a" fontSize="6.7" fontWeight="900">
              BESIDE SMALL GARDEN · BEFORE LABS
            </text>

            {/* 19. BIG COLLEGE HOSTEL */}
            <rect x="64" y="826" width="282" height="138" rx="14" fill="#7c2d12" fillOpacity="0.86" stroke="#fb923c" strokeWidth="3" />
            <rect x="78" y="844" width="66" height="76" rx="7" fill="#9a3412" fillOpacity="0.82" stroke="#fdba74" strokeOpacity="0.68" strokeWidth="1.4" />
            <rect x="266" y="844" width="66" height="76" rx="7" fill="#9a3412" fillOpacity="0.82" stroke="#fdba74" strokeOpacity="0.68" strokeWidth="1.4" />
            <rect x="154" y="852" width="102" height="58" rx="8" fill="#431407" fillOpacity="0.72" stroke="#fed7aa" strokeOpacity="0.62" strokeWidth="1.3" />
            <rect x="90" y="854" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="112" y="854" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="90" y="874" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="112" y="874" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="278" y="854" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="300" y="854" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="278" y="874" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="300" y="874" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <SolarPanelArray x={282} y={830} w={50} h={10} />
            <text x="205" y="940" textAnchor="middle" fill="#fed7aa" fontSize="13.8" fontWeight="900" letterSpacing="0.5">
              BIG COLLEGE HOSTEL
            </text>
            <text x="205" y="955" textAnchor="middle" fill="#fde68a" fontSize="8.8" fontWeight="900">
              (BELOW SMALL GARDEN &amp; COMP LAB · ABOVE WEST GARDEN)
            </text>

            {/* Lush Green West Garden Lawn & Shaded Trees */}
            <rect x="64" y="978" width="282" height="120" rx="14" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
            <circle cx="116" cy="1026" r="17" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
            <circle cx="205" cy="1034" r="16" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
            <circle cx="294" cy="1024" r="17" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
            <text x="205" y="1082" textAnchor="middle" fill="#dcfce7" fontSize="11.8" fontWeight="900">
              WEST GARDEN LAWN &amp; TREES
            </text>

            {/* ================= 04. BIG CLERK OFFICE & BIG CLERK OFFICE CORRIDOR ================= */}

            <rect
              x="632"
              y="928"
              width="300"
              height="92"
              rx="13"
              fill="#0f292e"
              fillOpacity="0.92"
              stroke="#5eead4"
              strokeWidth="2.8"
            />
            <path
              d="M 634 930 L 700 930 L 700 992 L 930 992 L 930 1018 L 634 1018 Z"
              fill="#134e4a"
              fillOpacity="0.74"
              stroke="#99f6e4"
              strokeOpacity="0.62"
              strokeWidth="1.4"
              strokeDasharray="6 4"
            />
            <circle cx="666" cy="944" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="666" cy="968" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="666" cy="992" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="746" cy="1005" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="826" cy="1005" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="912" cy="1005" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <text x="786" y="1009" textAnchor="middle" fill="#fef08a" fontSize="9.8" fontWeight="900" letterSpacing="0.4">
              BIG CLERK OFFICE CORRIDOR
            </text>

            <rect
              x="704"
              y="932"
              width="224"
              height="58"
              rx="10"
              fill="#115e59"
              fillOpacity="0.92"
              stroke="#2dd4bf"
              strokeWidth="2.4"
            />
            <SolarPanelArray x={884} y={936} w={36} h={8.5} />
            <rect x="712" y="938" width="18" height="9" rx="2" fill="#042f2e" stroke="#99f6e4" strokeWidth="1" />
            <rect x="735" y="938" width="18" height="9" rx="2" fill="#042f2e" stroke="#99f6e4" strokeWidth="1" />
            <rect x="758" y="938" width="18" height="9" rx="2" fill="#042f2e" stroke="#99f6e4" strokeWidth="1" />
            <text x="814" y="959" textAnchor="middle" fill="#5eead4" fontSize="12.6" fontWeight="900">
              BIG CLERK OFFICE
            </text>
            <text x="814" y="983" textAnchor="middle" fill="#ccfbf1" fontSize="8.6" fontWeight="800">
              RECORDS · ADMISSIONS · BEFORE GARDEN
            </text>

            {/* ================= WALKING DISTANCE ZONE ================= */}

            <rect
              x="632"
              y="1028"
              width="300"
              height="78"
              rx="11"
              fill="#022c22"
              fillOpacity="0.82"
              stroke="#facc15"
              strokeOpacity="0.85"
              strokeWidth="2.2"
              strokeDasharray="7 4"
            />
            <line x1="646" y1="1052" x2="908" y2="1052" stroke="#fde047" strokeWidth="3" strokeDasharray="7 5" />
            <line x1="646" y1="1045" x2="646" y2="1059" stroke="#fde047" strokeWidth="2.2" />
            <polygon points="908,1046 922,1052 908,1058" fill="#fde047" />
            <text x="782" y="1077" textAnchor="middle" fill="#fef08a" fontSize="12.8" fontWeight="900" letterSpacing="0.7">
              WALKING DISTANCE
            </text>
            <text x="782" y="1096" textAnchor="middle" fill="#a7f3d0" fontSize="8.6" fontWeight="800">
              Straight Past Canteen → Clerk Corridor → Garden
            </text>

            {/* ================= ENTRANCE ROW ================= */}

            {/* 02. Waiting Room (Entrance Left) */}
            <rect x="144" y="1114" width="240" height="76" rx="11" fill="#0c4a6e" fillOpacity="0.82" stroke="#0ea5e9" strokeWidth="2.5" />
            <SolarPanelArray x={152} y={1119} w={38} h={10} />
            <text x="274" y="1138" textAnchor="middle" fill="#7dd3fc" fontSize="13.2" fontWeight="900">
              WAITING ROOM (LEFT)
            </text>
            <text x="264" y="1181" textAnchor="middle" fill="#bae6fd" fontSize="10.2" fontWeight="800">
              (First on Left Upon Entering)
            </text>

            {/* 03. College Canteen (Entrance Right Inside Golden Boundary) */}
            <rect x="632" y="1114" width="136" height="76" rx="11" fill="#9a3412" fillOpacity="0.84" stroke="#f97316" strokeWidth="2.5" />
            <SolarPanelArray x={726} y={1119} w={34} h={9} />
            <text x="694" y="1138" textAnchor="middle" fill="#fdba74" fontSize="12.4" fontWeight="900">
              CANTEEN
            </text>
            <text x="700" y="1181" textAnchor="middle" fill="#fed7aa" fontSize="9.4" fontWeight="800">
              (Entrance Right)
            </text>

            {/* 05. CENTRAL LIBRARY */}
            <rect x="776" y="1114" width="156" height="76" rx="11" fill="#4c1d95" fillOpacity="0.82" stroke="#8b5cf6" strokeWidth="2.5" />
            <SolarPanelArray x={886} y={1119} w={38} h={9} />
            <text x="848" y="1137" textAnchor="middle" fill="#c4b5fd" fontSize="11.2" fontWeight="900">
              CENTRAL LIBRARY
            </text>
            <text x="854" y="1181" textAnchor="middle" fill="#ddd6fe" fontSize="9.2" fontWeight="800">
              (Right of Canteen)
            </text>

            {/* OUTSIDE Golden College Boundary Wall: CENTRAL JAIL & SIGNAL JAMMERS */}
            <rect x="974" y="1106" width="216" height="96" rx="12" fill="#0f172a" fillOpacity="0.96" stroke="#ef4444" strokeWidth="2.8" strokeDasharray="7 4" />
            <rect x="984" y="1128" width="24" height="38" rx="4" fill="#020617" stroke="#f87171" strokeWidth="1.5" />
            <line x1="990" y1="1128" x2="990" y2="1166" stroke="#fca5a5" strokeOpacity="0.85" strokeWidth="1.4" />
            <line x1="996" y1="1128" x2="996" y2="1166" stroke="#fca5a5" strokeOpacity="0.85" strokeWidth="1.4" />
            <line x1="1002" y1="1128" x2="1002" y2="1166" stroke="#fca5a5" strokeOpacity="0.85" strokeWidth="1.4" />
            <g transform="translate(1152, 1148)">
              <path d="M-5,26 L0,-8 L5,26 Z" fill="none" stroke="#fde047" strokeWidth="1.5" />
              <circle cx="0" cy="-10" r="2.5" fill="#ef4444" />
              <path d="M-8,-14 A9,9 0 0,1 8,-14" fill="none" stroke="#38bdf8" strokeWidth="1.4" />
              <path d="M-12,-18 A13,13 0 0,1 12,-18" fill="none" stroke="#f87171" strokeWidth="1.2" strokeDasharray="2 1.5" />
            </g>
            <g transform="translate(1174, 1154)">
              <path d="M-4,22 L0,-6 L4,22 Z" fill="none" stroke="#fde047" strokeWidth="1.4" />
              <circle cx="0" cy="-8" r="2.2" fill="#ef4444" />
              <path d="M-6,-12 A7,7 0 0,1 6,-12" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
            </g>
            <text x="1082" y="1132" textAnchor="middle" fontSize="12.5" fontWeight="900">
              <tspan fill="#fca5a5">CENTRAL JAIL</tspan>
            </text>
            <text x="1082" y="1154" textAnchor="middle" fill="#fde047" fontSize="11.2" fontWeight="900">
              &amp; SIGNAL JAMMERS
            </text>
            <text x="1082" y="1186" textAnchor="middle" fill="#7dd3fc" fontSize="9.4" fontWeight="900">
              (OUTSIDE GOLDEN BOUNDARY)
            </text>

            {/* ================= PAVED WALKWAYS, GRILL PATHS & NORTH EXPANSION CONNECTORS ================= */}

            {/* Entrance Cross Plaza */}
            <line x1="264" y1="1154" x2="854" y2="1154" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="16" strokeLinecap="round" />
            {/* Entrance Stem up to Twin Grill Start */}
            <line x1="600" y1="1206" x2="600" y2="1100" stroke="#94a3b8" strokeOpacity="0.38" strokeWidth="22" strokeLinecap="round" />

            {/* Branch into Big Clerk Office Corridor */}
            <line x1="600" y1="1004" x2="634" y2="1004" stroke="#cbd5e1" strokeOpacity="0.45" strokeWidth="16" strokeLinecap="round" />
            {/* Branch to Garden (After Clerk Office) */}
            <line x1="600" y1="880" x2="632" y2="880" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="14" strokeLinecap="round" />
            {/* Vertical Connector up from Garden & Gardeners to Principal's Office */}
            <line x1="681" y1="840" x2="681" y2="782" stroke="#cbd5e1" strokeOpacity="0.42" strokeWidth="16" strokeLinecap="round" />

            {/* CENTRAL TWIN PATHS SEPARATED BY SMALL GRILL */}
            <line x1="582" y1="1100" x2="582" y2="640" stroke="#cbd5e1" strokeOpacity="0.38" strokeWidth="15" strokeLinecap="round" />
            <line x1="618" y1="1100" x2="618" y2="640" stroke="#cbd5e1" strokeOpacity="0.38" strokeWidth="15" strokeLinecap="round" />
            <line
              x1="600"
              y1="1094"
              x2="600"
              y2="648"
              stroke="#fbbf24"
              strokeWidth="3.8"
              strokeDasharray="7 5"
              strokeOpacity="0.96"
            />
            <rect
              x="558"
              y="826"
              width="84"
              height="21"
              rx="5"
              fill="#021b15"
              fillOpacity="0.96"
              stroke="#a3e635"
              strokeOpacity="0.92"
              strokeWidth="1.5"
            />
            <text x="600" y="840.5" textAnchor="middle" fill="#ecfccb" fontSize="9.8" fontWeight="900" letterSpacing="0.4">
              SMALL GRILL
            </text>

            {/* Horizontal Straight Line Corridor: Central Courtyard -> Principal's Office -> Split Junction -> Chemistry Wing (y=788) */}
            <line x1="362" y1="788" x2="1107" y2="788" stroke="#94a3b8" strokeOpacity="0.38" strokeWidth="16" strokeLinecap="round" />
            <line x1="817" y1="788" x2="1107" y2="788" stroke="#22d3ee" strokeOpacity="0.72" strokeWidth="7" strokeLinecap="round" />

            {/* SEPARATE AUDITORIUM CORRIDOR (OUTSIDE CHEMISTRY AT Y=723): Principal's Office -> Split Junction (817) -> Up (723) -> Straight East -> Corner Auditorium Hall (1106) */}
            <line x1="817" y1="788" x2="817" y2="723" stroke="#fb7185" strokeOpacity="0.88" strokeWidth="6" strokeDasharray="8 5" strokeLinecap="round" />
            <line x1="817" y1="723" x2="1106" y2="723" stroke="#fb7185" strokeOpacity="0.88" strokeWidth="6" strokeDasharray="8 5" strokeLinecap="round" />
            <line x1="1106" y1="723" x2="1106" y2="708" stroke="#fb7185" strokeOpacity="0.88" strokeWidth="6" strokeDasharray="8 5" strokeLinecap="round" />

            {/* Stairs Vertical Link up to ALL Enlarged 1st-Floor Departments (Upper & Lower Tiers) */}
            <line x1="756" y1="740" x2="756" y2="576" stroke="#fde047" strokeOpacity="0.46" strokeWidth="12" strokeLinecap="round" />
            <line x1="656" y1="654" x2="1018" y2="654" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="11" strokeLinecap="round" />
            <line x1="681" y1="576" x2="992" y2="576" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="11" strokeLinecap="round" />

            {/* NORTH SEQUENCE WALKWAYS: Central Spine -> Prayer/Greenhouse/Karate & Assembly/Flag/Zoology/Botany, plus Straight North Passage at X=724 into Very Big Ground -> Long Walking Distance -> Garden -> North Wing */}
            <line x1="600" y1="640" x2="600" y2="531" stroke="#fde047" strokeOpacity="0.58" strokeWidth="12" strokeLinecap="round" />
            <line x1="533" y1="531" x2="1088" y2="531" stroke="#94a3b8" strokeOpacity="0.38" strokeWidth="11" strokeLinecap="round" />
            <line x1="724" y1="531" x2="724" y2="444" stroke="#fde047" strokeOpacity="0.72" strokeWidth="14" strokeLinecap="round" />
            <line x1="724" y1="444" x2="600" y2="412" stroke="#fde047" strokeOpacity="0.58" strokeWidth="11" strokeLinecap="round" />
            <line x1="245" y1="366" x2="902" y2="366" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="10" strokeLinecap="round" />
            <line x1="600" y1="412" x2="600" y2="160" stroke="#fde047" strokeOpacity="0.6" strokeWidth="12" strokeLinecap="round" />
            <line x1="138" y1="160" x2="1060" y2="160" stroke="#fde047" strokeOpacity="0.55" strokeWidth="9" strokeLinecap="round" />
            <line x1="138" y1="160" x2="138" y2="152" stroke="#fbbf24" strokeWidth="5" />
            <line x1="322" y1="160" x2="322" y2="152" stroke="#22d3ee" strokeWidth="5" />
            <line x1="506" y1="160" x2="506" y2="152" stroke="#f472b6" strokeWidth="5" />
            <line x1="690" y1="160" x2="690" y2="152" stroke="#c084fc" strokeWidth="5" />
            <line x1="874" y1="160" x2="874" y2="152" stroke="#38bdf8" strokeWidth="5" />
            <line x1="1060" y1="160" x2="1060" y2="152" stroke="#fb7185" strokeWidth="5" />

            {/* LEFT PATH BETWEEN TWO GRILLS -> GIRLS WALKING ON PATH OF COMPUTER LAB + SMALL GARDEN + COMMERCE STAIRS + TENNIS & VOLLEYBALL & HOSTEL */}
            <line x1="582" y1="674" x2="492" y2="674" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="12" strokeLinecap="round" />
            <line x1="582" y1="696" x2="492" y2="696" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="12" strokeLinecap="round" />
            <line x1="578" y1="665" x2="494" y2="665" stroke="#fb923c" strokeWidth="2.5" strokeDasharray="5 3" strokeOpacity="0.92" />
            <line x1="578" y1="705" x2="494" y2="705" stroke="#fb923c" strokeWidth="2.5" strokeDasharray="5 3" strokeOpacity="0.92" />
            <line x1="492" y1="685" x2="129" y2="685" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="12" strokeLinecap="round" />
            <line x1="492" y1="602" x2="512" y2="602" stroke="#fde047" strokeOpacity="0.58" strokeWidth="9" strokeLinecap="round" />
            <line x1="512" y1="602" x2="512" y2="490" stroke="#fde047" strokeOpacity="0.55" strokeWidth="8" strokeDasharray="6 4" strokeLinecap="round" />
            <line x1="512" y1="490" x2="486" y2="490" stroke="#fde047" strokeOpacity="0.58" strokeWidth="8" strokeLinecap="round" />
            <line x1="129" y1="616" x2="129" y2="685" stroke="#22d3ee" strokeOpacity="0.58" strokeWidth="9" strokeLinecap="round" />
            <line x1="214" y1="555" x2="232" y2="555" stroke="#22d3ee" strokeOpacity="0.52" strokeWidth="8" strokeLinecap="round" />
            <line x1="242" y1="711" x2="242" y2="726" stroke="#4ade80" strokeOpacity="0.72" strokeWidth="10" strokeLinecap="round" />
            <line x1="332" y1="711" x2="332" y2="726" stroke="#5eead4" strokeOpacity="0.72" strokeWidth="10" strokeLinecap="round" />
            <line x1="392" y1="711" x2="392" y2="726" stroke="#5eead4" strokeOpacity="0.72" strokeWidth="10" strokeLinecap="round" />
            <line x1="248" y1="768" x2="256" y2="768" stroke="#94a3b8" strokeOpacity="0.55" strokeWidth="10" strokeLinecap="round" />
            <line x1="205" y1="810" x2="205" y2="826" stroke="#fb923c" strokeOpacity="0.65" strokeWidth="10" strokeLinecap="round" />
            <line x1="129" y1="716" x2="129" y2="826" stroke="#4ade80" strokeOpacity="0.6" strokeWidth="10" strokeLinecap="round" />
            <line x1="408" y1="782" x2="416" y2="782" stroke="#94a3b8" strokeOpacity="0.48" strokeWidth="12" strokeLinecap="round" />
            <line x1="205" y1="964" x2="205" y2="978" stroke="#4ade80" strokeOpacity="0.6" strokeWidth="10" strokeLinecap="round" />
            <line x1="582" y1="920" x2="346" y2="920" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="12" strokeLinecap="round" />
            <line x1="582" y1="1046" x2="346" y2="1046" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="10" strokeLinecap="round" />

            <rect x="506" y="708" width="88" height="19" rx="5" fill="#021b15" fillOpacity="0.96" stroke="#fb923c" strokeOpacity="0.92" strokeWidth="1.4" />
            <text x="550" y="721" textAnchor="middle" fill="#fed7aa" fontSize="9.4" fontWeight="900">
              2-GRILL LEFT
            </text>

            {/* GIRLS WALKING ON PATH OF COMPUTER LAB */}
            <WalkingCollegeGirl x={562} y={682} scale={1.0} dupattaColor="#10b981" bookColor="#facc15" />
            <WalkingCollegeGirl x={534} y={686} scale={1.0} dupattaColor="#06b6d4" bookColor="#fb923c" />
            <WalkingCollegeGirl x={508} y={682} scale={0.96} dupattaColor="#22c55e" bookColor="#f472b6" />
            <rect x="444" y="729" width="182" height="19" rx="5" fill="#022c22" fillOpacity="0.97" stroke="#6ee7b7" strokeWidth="1.3" />
            <text x="535" y="742" textAnchor="middle" fill="#a7f3d0" fontSize="9.4" fontWeight="900">
              GIRLS WALKING · COMPUTER LAB PATH
            </text>

            {/* Upper-Left Unified Corridor Spine */}
            <line x1="358" y1="685" x2="358" y2="556" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="12" strokeLinecap="round" />

            {/* ================= ROAD, MAIN GATE & SECURITY POST ================= */}

            <rect x="0" y="1208" width="1200" height="62" fill="#0f172a" fillOpacity="0.96" />
            <line x1="24" y1="1240" x2="1176" y2="1240" stroke="#eab308" strokeOpacity="0.4" strokeWidth="2.4" strokeDasharray="18 15" />
            <text x="210" y="1245" textAnchor="middle" fill="#cbd5e1" fillOpacity="0.92" fontSize="13" fontWeight="800" letterSpacing="1.1">
              PATHAN COLONY ROAD · HIRABAD
            </text>
            <text x="990" y="1245" textAnchor="middle" fill="#cbd5e1" fillOpacity="0.92" fontSize="13" fontWeight="800" letterSpacing="1.1">
              GOVT. GIRLS ZUBAIDA COLLEGE
            </text>

            {/* Gate Entrance Opening & Security Guard Post */}
            <rect x="535" y="1188" width="130" height="26" fill="#032b22" />
            <path d="M535 1204 L535 1178 M665 1204 L665 1178" stroke="#facc15" strokeWidth="4.5" />

            {/* Security Guard Cabin (Left of Gate) */}
            <rect x="454" y="1168" width="76" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.9" />
            <text x="492" y="1187" textAnchor="middle" fill="#e0f2fe" fontSize="10.2" fontWeight="900" letterSpacing="0.5">
              SECURITY
            </text>

            {/* Left Gate Security Guard */}
            <g transform="translate(553, 1184)">
              <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
              <rect x="-4.8" y="-6.8" width="9.6" height="2.6" rx="1" fill="#38bdf8" />
              <circle cx="0" cy="-2.2" r="2.7" fill="#fef3c7" />
              <path d="M-4.6,5.8 C-4.6,1.2 4.6,1.2 4.6,5.8 Z" fill="#1d4ed8" />
              <path d="M4.6,0.5 L7.5,1.5 L7,4.5 L5.8,5.6 L4.8,4.5 Z" fill="#facc15" />
            </g>

            {/* Right Gate Security Guard */}
            <g transform="translate(647, 1184)">
              <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
              <rect x="-4.8" y="-6.8" width="9.6" height="2.6" rx="1" fill="#38bdf8" />
              <circle cx="0" cy="-2.2" r="2.7" fill="#fef3c7" />
              <path d="M-4.6,5.8 C-4.6,1.2 4.6,1.2 4.6,5.8 Z" fill="#1d4ed8" />
              <path d="M-7.5,1.5 L-4.6,0.5 L-4.8,4.5 L-5.8,5.6 L-7,4.5 Z" fill="#facc15" />
            </g>
            <text x="647" y="1164" textAnchor="middle" fill="#bae6fd" fontSize="9.4" fontWeight="800" letterSpacing="0.5">
              GATE GUARD
            </text>

            {/* ================= WALKING ROUTE & TRAIL OVERLAY ================= */}

            {activeRoute.length >= 2 && (
              <polyline
                points={polylinePoints}
                fill="none"
                stroke="#facc15"
                strokeWidth="4.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="11 8"
                markerEnd="url(#route-arrow)"
                opacity="0.94"
              />
            )}

            {walkedTrail.walkedPoints.length >= 2 && (
              <polyline
                points={walkedPolylinePoints}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="6.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.96"
              />
            )}

            {walkedTrail.footprints.map((fp, i) => (
              <circle
                key={i}
                cx={fp.x * 12}
                cy={fp.y * 12.7}
                r="3.8"
                fill="#e0f2fe"
                opacity="0.92"
              />
            ))}
          </svg>

          {/* Compass Overlay removed from top-right corner so North Corridor remains unobstructed; shown in Utility Bar above */}

          {/* Gate Entry Callout (Bottom Center on Road) */}
          <div
            style={{ left: '50%', top: '98.0%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <span className="px-3.5 py-1 rounded-md bg-emerald-500 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg whitespace-nowrap border-2 border-emerald-200">
              Enter Gate Here ↑
            </span>
          </div>

          {/* Hover Preview Crosshair Pin during Insert / Reposition */}
          {mapMode !== 'browse' && hoverCoords && (
            <div
              style={{ left: `${hoverCoords.x}%`, top: `${hoverCoords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            >
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-amber-300 bg-amber-400/25 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              </div>
            </div>
          )}

          {/* Draft Pin Placed (Insert Mode) */}
          {draftPinCoords && (
            <div
              style={{ left: `${draftPinCoords.x}%`, top: `${draftPinCoords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            >
              <div className="w-9 h-9 rounded-full bg-sky-400 text-slate-950 border-2 border-white shadow-xl flex items-center justify-center font-bold text-sm animate-bounce">
                +
              </div>
            </div>
          )}

          {/* Animated Simulated Virtual Visitor Avatar */}
          {walker && walker.active && (
            <div
              style={{ left: `${walker.x}%`, top: `${walker.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
            >
              <span className="absolute -inset-3 rounded-full bg-sky-400/40 animate-ping" />
              <div className="relative flex flex-col items-center">
                <div
                  className={`relative w-12 h-12 rounded-full bg-sky-400 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center ${
                    walker.isMoving ? 'animate-bounce' : ''
                  }`}
                >
                  <div
                    style={{ transform: `rotate(${walker.angleDeg}deg)` }}
                    className="absolute inset-0 flex items-start justify-center pointer-events-none"
                  >
                    <span className="-mt-2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white drop-shadow" />
                  </div>

                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-none stroke-slate-950"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="5" r="2" fill="currentColor" />
                    <path d="M9 20l2.2-6 1.8-3.5" />
                    <path d="M16 20l-2-5-2-3" />
                    <path d="M7.5 12.5l3.5-2 3 1 2.5-1.5" />
                  </svg>
                </div>
                <span className="mt-1 px-3 py-0.5 rounded bg-sky-400 text-slate-950 font-black text-xs whitespace-nowrap shadow-lg border border-white">
                  {walker.stepLabel || (walker.isMoving ? 'Visitor Walking' : 'Visitor Here')}
                </span>
              </div>
            </div>
          )}

          {/* 34 Distinct Multi-Colored Map Stop Pins with EXTRA-BIG Always-Visible Visitor Labels */}
          {stops.map((stop, idx) => {
            const isSelected = idx === selectedIndex;
            const isPrincipal = stop.id === 'principal-office';
            const theme = getStopColorTheme(stop.id, idx);
            return (
              <button
                key={stop.id}
                type="button"
                onClick={(e) => {
                  if (mapMode !== 'browse') return;
                  e.stopPropagation();
                  onSelectStop(idx);
                }}
                style={{ left: `${stop.mapX}%`, top: `${stop.mapY}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform duration-150 ${
                  isSelected ? 'z-30 scale-110' : 'z-20 hover:z-30 hover:scale-105'
                } ${mapMode !== 'browse' ? 'opacity-65 pointer-events-none' : 'cursor-pointer'}`}
                title={`${stop.stopNumber}. ${stop.name} (${stop.gateDirections?.turn || ''})`}
                aria-label={`Select map stop ${stop.stopNumber}: ${stop.name}`}
              >
                {isSelected && (
                  <span
                    className={`absolute inset-0 -m-2.5 rounded-full ${theme.ringGlow} animate-ping pointer-events-none`}
                  />
                )}

                <span
                  className={`relative rounded-full flex items-center justify-center font-mono font-black border-2 shadow-xl transition-all ${
                    isPrincipal
                      ? 'w-11 h-11 text-sm ring-2 ring-amber-200'
                      : 'w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-[13px]'
                  } ${theme.pinBg} ${theme.pinText} ${
                    isSelected
                      ? 'border-white ring-4 ring-white/55 shadow-2xl'
                      : `${theme.pinBorder} opacity-95 group-hover:opacity-100`
                  }`}
                >
                  {stop.stopNumber}
                </span>

                <span
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2.5 py-0.5 rounded-md bg-[#021611]/95 border whitespace-nowrap shadow-xl pointer-events-none transition-all ${
                    theme.textClass
                  } ${
                    isPrincipal
                      ? 'text-xs sm:text-sm md:text-[15px] font-black border-amber-300 bg-[#451a03]/95 ring-2 ring-amber-300/70'
                      : isSelected
                        ? `text-xs sm:text-sm font-black ${theme.activeBorder} ring-2 ring-white/45`
                        : 'text-[11.5px] sm:text-[12.5px] font-black border-emerald-700/95 group-hover:border-white/70'
                  }`}
                >
                  {stop.shortName || stop.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Legend & Route Caption Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-stone-200 px-1 pt-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className={`inline-flex items-center gap-1.5 font-extrabold ${selectedTheme.textClass}`}>
            <span className={`w-3.5 h-3.5 rounded-full ${selectedTheme.pinBg} border border-white inline-block`} />
            <span>Selected: {selectedStop.shortName || selectedStop.name}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold">
            <span className="w-4 h-3 rounded-sm bg-yellow-400 border border-amber-100 inline-block" />
            <span>Golden Boundary &amp; Principal&rsquo;s Office</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-300 font-bold">
            <span className="w-3.5 h-3.5 rounded-sm bg-slate-800 border-2 border-dashed border-red-400 inline-block" />
            <span>Central Jail &amp; Jammers (Outside Boundary)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300 font-bold">
            <span className="w-3 h-3 rounded-full bg-sky-400 border border-white inline-block" />
            <span>Visitor Walking</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white inline-block" />
            <span>Girls Walking (Computer Lab Path)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-lime-200 font-bold">
            <span className="w-3 h-3 rounded-full bg-green-950 border border-lime-400 inline-block" />
            <span>Gardeners</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300 font-bold">
            <span className="w-4 h-2.5 rounded-xs bg-sky-700 border border-sky-300 inline-block" />
            <span>Solar Panels</span>
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 font-extrabold text-amber-300">
          <Navigation className="w-4 h-4" />
          <span>{selectedStop.gateDirections.distanceFromGate}</span>
        </span>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  CAMPUS_TOUR_STOPS,
  DirectionTurn,
  FacilityHotspot,
  GATE_COORDS,
  GATE_TO_PRINCIPAL_CHECKPOINTS,
  TourFacility
} from '../data/campusTourData';
import { FacilityGraphic } from './FacilityGraphic';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  buildAutoRoutePath,
  CampusMapCanvas,
  getStopColorTheme,
  MapInteractionMode,
  suggestDirectionsFromGate,
  VisitorWalkerState
} from './CampusMapCanvas';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  CheckCircle2,
  Map as MapIcon,
  Eye,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  Navigation,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  CornerUpLeft,
  CornerUpRight,
  Compass,
  Move,
  Wand2,
  X,
  Save,
  Footprints,
  Square,
  Search,
  Globe,
  ExternalLink
} from 'lucide-react';

const TOUR_STORAGE_KEY = 'ggzc_campus_tour_map_stops_v41';

const EAST_STAIRS_STOP_IDS = new Set([
  'general-staff-room',
  'islamiat-english',
  'english-dept',
  'statistics-mathematics',
  'mathematics-dept',
  'physics-lab-darkroom',
  'muslim-history-dept',
  'political-science-dept',
  'physics-office',
  'physics-dark-room'
]);

const NORTH_ROW_STOP_IDS = new Set([
  'prayer-room-wing',
  'botanical-greenhouse',
  'karate-club',
  'greenhouse-prayer-ground',
  'zoology-botany-labs',
  'botany-dept-lab'
]);

function isNorthZoneStop(pt: { x: number; y: number }, stopId?: string): boolean {
  if (stopId && NORTH_ROW_STOP_IDS.has(stopId)) return true;
  if (pt.y <= 35) return true;
  return pt.x >= 44 && pt.y <= 41.5;
}

function buildWalkRouteBetween(
  fromPos: { x: number; y: number },
  targetStop: TourFacility
): { x: number; y: number }[] {
  const gateRoute =
    targetStop.gateDirections?.routePath && targetStop.gateDirections.routePath.length >= 2
      ? targetStop.gateDirections.routePath
      : buildAutoRoutePath(targetStop.mapX, targetStop.mapY);

  if (Math.hypot(fromPos.x - GATE_COORDS.x, fromPos.y - GATE_COORDS.y) < 4) {
    return gateRoute;
  }

  const dest = { x: targetStop.mapX, y: targetStop.mapY };
  const waypoints: { x: number; y: number }[] = [fromPos];

  const isNorthFrom = isNorthZoneStop(fromPos);
  const isNorthDest = isNorthZoneStop(dest, targetStop.id);

  // 1. Moving between West-Wing stops (Tennis & Volleyball, Hostel, Small Garden, Computer Dept, Pak Studies, Urdu, Physical Education, Commerce by Stairs)
  if (
    fromPos.x < 43.5 &&
    dest.x < 43.5 &&
    fromPos.y >= 36 &&
    fromPos.y <= 78 &&
    dest.y >= 36 &&
    dest.y <= 78
  ) {
    if (fromPos.y < 41 && targetStop.id !== 'commerce-dept-library') {
      waypoints.push({ x: 42.7, y: 38.6 });
      waypoints.push({ x: 42.7, y: 47.4 });
      waypoints.push({ x: 41.0, y: 47.4 });
      waypoints.push({ x: 41.0, y: 53.9 });
    }
    if (targetStop.id === 'commerce-dept-library') {
      if (fromPos.x < 15) {
        waypoints.push({ x: 10.8, y: 53.9 });
      } else if (fromPos.y > 57) {
        waypoints.push({ x: 29.8, y: 62.0 });
        waypoints.push({ x: 29.8, y: 53.9 });
      }
      waypoints.push({ x: 41.0, y: 53.9 });
      waypoints.push({ x: 41.0, y: 47.4 });
      waypoints.push({ x: 42.7, y: 47.4 });
      waypoints.push({ x: 42.7, y: 38.6 });
      waypoints.push(dest);
    } else if (targetStop.id === 'tennis-volleyball-grounds') {
      waypoints.push({ x: fromPos.x, y: 53.9 });
      waypoints.push({ x: 10.8, y: 53.9 });
      waypoints.push(dest);
    } else if (
      targetStop.id === 'hostel-computer-lab' ||
      targetStop.id === 'small-garden-computer-lab' ||
      targetStop.id === 'historical-graveyard-mazar' ||
      fromPos.y > 65
    ) {
      waypoints.push({ x: 27.7, y: 60.5 });
      if (targetStop.id === 'hostel-computer-lab') {
        waypoints.push({ x: 17.1, y: 70.5 });
      } else {
        waypoints.push(dest);
      }
    } else {
      if (fromPos.x < 16) {
        waypoints.push({ x: 10.8, y: 53.9 });
      }
      waypoints.push({ x: 29.8, y: Math.min(53.9, fromPos.y) });
      waypoints.push({ x: 29.8, y: dest.y });
      waypoints.push(dest);
    }
  } else if (
    // 2. Principal's Office (x=56.8) <-> Stairs (x=63.0) <-> Enlarged By-Stairs 1st Floor (y=45.4..51.5) <-> Separate Auditorium Way (x=68.1, y=56.9 -> 92.2, 49.1) <-> Inline Chemistry Wing (x=75.8, 84.0, 92.3 at y=62.0)
    fromPos.x >= 52 &&
    dest.x >= 52 &&
    fromPos.y >= 43 &&
    fromPos.y <= 67 &&
    dest.y >= 43 &&
    dest.y <= 67 &&
    fromPos.x <= 95 &&
    dest.x <= 95
  ) {
    const isFromAuditorium = Math.abs(fromPos.x - 92.2) < 2 && fromPos.y < 56;
    const isDestAuditorium = targetStop.id === 'auditorium-hall';

    if (fromPos.y >= 57.5 && dest.y >= 57.5 && !isDestAuditorium) {
      waypoints.push({ x: fromPos.x, y: 62.0 });
      waypoints.push({ x: dest.x, y: 62.0 });
      waypoints.push(dest);
    } else if (fromPos.y < 56 && dest.y < 56 && !isFromAuditorium && !isDestAuditorium) {
      if (Math.abs(fromPos.y - dest.y) < 3.5) {
        const tierY = fromPos.y < 47.5 ? 45.4 : 51.5;
        waypoints.push({ x: fromPos.x, y: tierY });
        waypoints.push({ x: dest.x, y: tierY });
        waypoints.push(dest);
      } else {
        waypoints.push({ x: 63.0, y: fromPos.y });
        waypoints.push({ x: 63.0, y: dest.y });
        waypoints.push(dest);
      }
    } else {
      if (isFromAuditorium) {
        waypoints.push({ x: 92.2, y: 56.9 });
        waypoints.push({ x: 68.1, y: 56.9 });
        waypoints.push({ x: 68.1, y: 62.0 });
      } else if (fromPos.y < 56) {
        waypoints.push({ x: 63.0, y: fromPos.y });
        waypoints.push({ x: 63.0, y: 62.0 });
      } else {
        waypoints.push({ x: fromPos.x, y: 62.0 });
      }

      if (isDestAuditorium) {
        waypoints.push({ x: 68.1, y: 62.0 });
        waypoints.push({ x: 68.1, y: 56.9 });
        waypoints.push({ x: 92.2, y: 56.9 });
        waypoints.push(dest);
      } else if (dest.y < 56) {
        waypoints.push({ x: 63.0, y: 62.0 });
        waypoints.push({ x: 63.0, y: dest.y });
        waypoints.push(dest);
      } else {
        waypoints.push({ x: dest.x, y: 62.0 });
        waypoints.push(dest);
      }
    }
  } else if (isNorthFrom && isNorthDest) {
    // 3. Direct North Passage (x=60.3 between Karate Club & Flag Hoisting Ground) <-> Very Big Ground (y=27.8..32.7) <-> Long Walk Spine (x=50.0) <-> Garden (y=15.9) <-> North Wing (y=12.6 -> 7.9)
    const stepFromRow = (pt: { x: number; y: number }) => {
      if (pt.y <= 11.5) {
        waypoints.push({ x: pt.x, y: 12.6 });
        waypoints.push({ x: 50.0, y: 12.6 });
      } else if (pt.y <= 21) {
        waypoints.push({ x: 50.0, y: pt.y });
      } else if (pt.y <= 35) {
        if (Math.abs(pt.y - 28.1) < 2) {
          waypoints.push({ x: pt.x, y: 32.7 });
        }
        waypoints.push({ x: 50.0, y: 32.7 });
      } else {
        waypoints.push({ x: pt.x, y: 41.8 });
        waypoints.push({ x: 60.3, y: 41.8 });
        waypoints.push({ x: 60.3, y: 35.0 });
        waypoints.push({ x: 50.0, y: 32.7 });
      }
    };

    if (fromPos.y <= 11.5 && dest.y <= 11.5) {
      waypoints.push({ x: fromPos.x, y: 12.6 });
      waypoints.push({ x: dest.x, y: 12.6 });
      waypoints.push(dest);
    } else if (fromPos.y > 22 && fromPos.y <= 35 && dest.y > 22 && dest.y <= 35) {
      waypoints.push({ x: fromPos.x, y: 32.7 });
      waypoints.push({ x: dest.x, y: 32.7 });
      waypoints.push(dest);
    } else if (fromPos.y > 35 && dest.y > 35) {
      waypoints.push({ x: fromPos.x, y: 41.8 });
      waypoints.push({ x: dest.x, y: 41.8 });
      waypoints.push(dest);
    } else {
      stepFromRow(fromPos);
      if (dest.y <= 11.5) {
        waypoints.push({ x: 50.0, y: 12.6 });
        waypoints.push({ x: dest.x, y: 12.6 });
      } else if (dest.y <= 21) {
        waypoints.push({ x: 50.0, y: 15.9 });
      } else if (dest.y <= 35) {
        waypoints.push({ x: 50.0, y: 32.7 });
        if (Math.abs(dest.y - 28.1) < 2) {
          waypoints.push({ x: dest.x, y: 32.7 });
        }
      } else {
        waypoints.push({ x: 50.0, y: 32.7 });
        waypoints.push({ x: 60.3, y: 35.0 });
        waypoints.push({ x: 60.3, y: 41.8 });
        waypoints.push({ x: dest.x, y: 41.8 });
      }
      waypoints.push(dest);
    }
  } else {
    // 4. Cross-campus fallback via central twin-grill spine (x=50)
    const spineYFrom = Math.max(38, Math.min(94, fromPos.y));
    const spineEntry = gateRoute[1] || { x: 50, y: Math.max(38, Math.min(94, dest.y)) };

    if (fromPos.y <= 11.5) {
      waypoints.push({ x: fromPos.x, y: 12.6 });
      waypoints.push({ x: 50.0, y: 12.6 });
      waypoints.push({ x: 50.0, y: 32.7 });
      waypoints.push({ x: 60.3, y: 35.0 });
      waypoints.push({ x: 60.3, y: 41.8 });
      waypoints.push({ x: 50.0, y: 41.8 });
      waypoints.push({ x: 50.0, y: 50.4 });
    } else if (fromPos.y <= 35) {
      waypoints.push({ x: fromPos.x, y: 32.7 });
      waypoints.push({ x: 50.0, y: 32.7 });
      waypoints.push({ x: 60.3, y: 35.0 });
      waypoints.push({ x: 60.3, y: 41.8 });
      waypoints.push({ x: 50.0, y: 41.8 });
      waypoints.push({ x: 50.0, y: 50.4 });
    } else if (Math.abs(fromPos.x - 50) > 1.5) {
      waypoints.push({ x: 50, y: spineYFrom });
    }

    waypoints.push(spineEntry);

    for (let i = 2; i < gateRoute.length; i++) {
      waypoints.push(gateRoute[i]);
    }
  }

  const deduped: { x: number; y: number }[] = [];
  for (const pt of waypoints) {
    const prev = deduped[deduped.length - 1];
    if (!prev || Math.hypot(prev.x - pt.x, prev.y - pt.y) > 0.6) {
      deduped.push(pt);
    }
  }
  return deduped.length >= 2 ? deduped : [fromPos, dest];
}

type SimTargetMode = 'guided-principal' | 'selected-stop';

function interpolateWalkerOnRoute(
  route: { x: number; y: number }[],
  progress: number
): VisitorWalkerState {
  if (!route || route.length === 0) {
    return { x: GATE_COORDS.x, y: GATE_COORDS.y, angleDeg: 0, active: false };
  }
  if (route.length === 1) {
    return { x: route[0].x, y: route[0].y, angleDeg: 0, active: true };
  }

  const clamped = Math.max(0, Math.min(1, progress));
  const segments: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    len: number;
    angleDeg: number;
  }[] = [];
  let totalLength = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const start = route[i];
    const end = route[i + 1];
    // Scale to 1200x1270 SVG aspect ratio for natural walking speed & heading
    const dxSvg = (end.x - start.x) * 12;
    const dySvg = (end.y - start.y) * 12.7;
    const len = Math.hypot(dxSvg, dySvg);
    if (len > 0.01) {
      const angleDeg = (Math.atan2(dxSvg, -dySvg) * 180) / Math.PI;
      segments.push({ start, end, len, angleDeg });
      totalLength += len;
    }
  }

  if (segments.length === 0 || totalLength === 0) {
    return { x: route[0].x, y: route[0].y, angleDeg: 0, active: true };
  }

  const targetDist = clamped * totalLength;
  let accumulated = 0;

  for (const seg of segments) {
    if (accumulated + seg.len >= targetDist) {
      const localT = (targetDist - accumulated) / seg.len;
      return {
        x: seg.start.x + (seg.end.x - seg.start.x) * localT,
        y: seg.start.y + (seg.end.y - seg.start.y) * localT,
        angleDeg: seg.angleDeg,
        active: true
      };
    }
    accumulated += seg.len;
  }

  const last = segments[segments.length - 1];
  return {
    x: last.end.x,
    y: last.end.y,
    angleDeg: last.angleDeg,
    active: true
  };
}

function getSurroundingsAtCoord(
  x: number,
  y: number,
  targetStop: TourFacility,
  progress: number,
  simTarget: SimTargetMode
) {
  if (simTarget === 'guided-principal') {
    let matched = GATE_TO_PRINCIPAL_CHECKPOINTS[0];
    for (const cp of GATE_TO_PRINCIPAL_CHECKPOINTS) {
      if (progress >= cp.progress - 0.05) {
        matched = cp;
      }
    }
    return {
      stageLabel: matched.label,
      leftView: matched.leftView,
      aheadView: matched.aheadView,
      rightView: matched.rightView
    };
  }

  if (y >= 88 && Math.abs(x - 50) <= 12) {
    return {
      stageLabel: 'Entering Main College Gate (Golden Boundary Wall)',
      leftView: 'Security Post & Visitor Waiting Room (First on Left)',
      aheadView: 'Gate Security Guards & Straight Path Separated by Small Grill',
      rightView: 'Canteen & Central Library (Right of Canteen) Inside Golden Wall · Central Jail Outside'
    };
  }

  if (progress >= 0.96) {
    const stairNote =
      targetStop.id === 'commerce-dept-library'
        ? 'Reached By Stairs ↑ (1st Floor) · '
        : EAST_STAIRS_STOP_IDS.has(targetStop.id)
          ? 'Reached By Stairs ↑ (1st Floor) · '
          : '';
    return {
      stageLabel: `${stairNote}Arrived at ${targetStop.shortName || targetStop.name}`,
      leftView: targetStop.mapX < 45 ? `${targetStop.shortName || targetStop.name}` : 'Central Courtyard · Historical Graveyard & Mazar beside Small Garden before Computer Lab · Hostel · West North Wing',
      aheadView: targetStop.locationNote,
      rightView: targetStop.mapX > 55 ? `${targetStop.shortName || targetStop.name}` : 'Big Clerk Office Corridor, Garden (after Clerk), Principal’s Office → Chemistry Wing in Line → Corner Auditorium Hall'
    };
  }

  if (
    (EAST_STAIRS_STOP_IDS.has(targetStop.id) || targetStop.id === 'commerce-dept-library') &&
    progress >= 0.42
  ) {
    const isCommerce = targetStop.id === 'commerce-dept-library';
    return {
      stageLabel: isCommerce
        ? `Using Stairs ↑ to 1st Floor ${targetStop.shortName || targetStop.name}`
        : `Going By Stairs ↑ to Enlarged 1st Floor ${targetStop.shortName || targetStop.name}`,
      leftView: isCommerce
        ? 'Historical Graveyard & Mazar beside Small Garden, Computer Department (Computer Lab & Big Multimedia), Pak Studies, Urdu & Physical Education below'
        : 'Principal’s Office below · General Staff Room, English, Islamiat, Muslim History & Political Science on 1st Floor',
      aheadView: isCommerce
        ? 'Climbing Commerce Stairs ↑ directly to 1st Floor Commerce & Commerce Library'
        : `Climbing Central Stairs ↑ to ${targetStop.shortName || targetStop.name} (Largest Physics Wing, Statistics & Dark Room)`,
      rightView: isCommerce
        ? 'Central North Spine ↑ → Very Big Ground (Old Bus, Car Parking, Sports Gymnasium) → Garden · Assembly, Zoology & Botany Labs'
        : 'Largest Physics Lab & Office, Statistics before Dark Room, Separate Auditorium Way (Outside Chemistry) & Chemistry Wing below'
    };
  }

  if (y <= 35) {
    return {
      stageLabel: `Walking North Toward ${targetStop.shortName || targetStop.name}`,
      leftView:
        y <= 14
          ? 'Economics · Sindhi · Physiology Departments & Classes'
          : y <= 23
            ? 'Long Walking Distance & Flowering Garden (West Side Trees)'
            : 'Old Bus & Car Parking Area inside Very Big Ground',
      aheadView:
        y <= 14
          ? `${targetStop.shortName || targetStop.name} (North Wing in Front of Garden)`
          : 'Long Walking Distance ↑ → Garden → Economics, Sindhi, Physiology, Psychology, Geography, Classes & General Staff Room (For Arts)',
      rightView:
        y <= 14
          ? 'Psychology · Geography · General Staff Room (For Arts) & Classes'
          : 'Sports Gymnasium inside Very Big Ground (North of Botany Lab)'
    };
  }

  return {
    stageLabel: `Walking toward ${targetStop.shortName || targetStop.name}`,
    leftView:
      y < 76 && y > 58
        ? 'Central Courtyard Promenade · Historical Graveyard & Mazar beside Small Garden before Computer Lab & Hostel'
        : x < 45
          ? `${targetStop.shortName || targetStop.name}`
          : 'Waiting Room, West Garden Lawn, Big Hostel, Small Garden, Graveyard & Mazar & Left 2-Grill Path to Computer Dept.',
    aheadView: `${targetStop.shortName || targetStop.name} (${targetStop.gateDirections.turn})`,
    rightView:
      y < 90 && y > 72
        ? 'Canteen & Central Library passed · Big Clerk Office Corridor before Garden & Gardeners'
        : x > 55
          ? `${targetStop.shortName || targetStop.name}`
          : 'Garden & Gardeners (after Clerk), Principal’s Office → Path to Auditorium Hall & Stairs to 6 Depts (Staff Room, Largest Physics Dept., English, Statistics before Dark Room, Maths, Islamiat)'
  };
}

const DIRECTION_OPTIONS: DirectionTurn[] = [
  'Entry Gate',
  'Straight Ahead',
  'Turn Left',
  'Bear Left',
  'Turn Right',
  'Bear Right',
  'Upstairs (1st Floor)'
];

function DirectionIcon({ turn }: { turn: DirectionTurn }) {
  switch (turn) {
    case 'Turn Left':
      return <CornerUpLeft className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Bear Left':
      return <ArrowUpLeft className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Turn Right':
      return <CornerUpRight className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Bear Right':
      return <ArrowUpRight className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Entry Gate':
      return <Compass className="w-4 h-4 text-emerald-300 shrink-0" />;
    default:
      return <ArrowUp className="w-4 h-4 text-amber-300 shrink-0" />;
  }
}

interface PointFormState {
  editingId: string | null; // null = inserting new stop
  name: string;
  shortName: string;
  subtitle: string;
  category: TourFacility['category'];
  locationNote: string;
  description: string;
  mapX: number;
  mapY: number;
  turn: DirectionTurn;
  distanceFromGate: string;
  walkingStepsText: string;
}

export function VirtualCampusTour() {
  const [stops, setStops] = useState<TourFacility[]>(() => {
    try {
      localStorage.removeItem('ggzc_campus_tour_map_stops_v29');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v30');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v31');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v32');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v33');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v34');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v35');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v36');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v37');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v38');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v39');
      localStorage.removeItem('ggzc_campus_tour_map_stops_v40');
      const saved = localStorage.getItem(TOUR_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default stops
    }
    return CAMPUS_TOUR_STOPS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeView, setActiveView] = useState<'map' | 'interior' | 'earth'>('map');
  const [earthLayer, setEarthLayer] = useState<'k' | 'm'>('k');
  const [activeHotspot, setActiveHotspot] = useState<FacilityHotspot | null>(null);

  // Map Editor States
  const [mapMode, setMapMode] = useState<MapInteractionMode>('browse');
  const [draftPinCoords, setDraftPinCoords] = useState<{ x: number; y: number } | null>(null);
  const [formState, setFormState] = useState<PointFormState | null>(null);

  // Virtual Visitor Walk Simulation States (starts active so visitor is visibly walking)
  const [simTarget, setSimTarget] = useState<SimTargetMode>('guided-principal');
  const [simActive, setSimActive] = useState(true);
  const [isSimulating, setIsSimulating] = useState(true);
  const [autoLoopWalk, setAutoLoopWalk] = useState(true);
  const [simProgress, setSimProgress] = useState(0);
  const [simSpeed, setSimSpeed] = useState<1 | 2>(1);
  const [customWalkRoute, setCustomWalkRoute] = useState<{ x: number; y: number }[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const lastFrameRef = useRef<number | null>(null);

  // Persist custom/edited map stops to localStorage
  const hasCustomChanges = useMemo(() => {
    return JSON.stringify(stops) !== JSON.stringify(CAMPUS_TOUR_STOPS);
  }, [stops]);

  useEffect(() => {
    try {
      if (hasCustomChanges) {
        localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(stops));
      } else {
        localStorage.removeItem(TOUR_STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota issues
    }
  }, [stops, hasCustomChanges]);

  // Keep currentIndex bounded safely if stops change
  const safeIndex = currentIndex >= stops.length ? 0 : currentIndex;
  const currentFacility: TourFacility = stops[safeIndex] || CAMPUS_TOUR_STOPS[0];

  const principalStop = useMemo(
    () => stops.find((s) => s.id === 'principal-office') || stops[0],
    [stops]
  );

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return stops
      .map((stop, idx) => ({ stop, idx }))
      .filter(({ stop }) => {
        const haystack = [
          stop.stopNumber,
          stop.name,
          stop.shortName || '',
          stop.subtitle,
          stop.category,
          stop.locationNote,
          stop.description,
          ...stop.highlights,
          ...stop.hotspots.map((h) => h.label)
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
  }, [stops, searchQuery]);

  // Active route for the visitor simulation
  const simulationRoute = useMemo(() => {
    if (simTarget === 'selected-stop' && customWalkRoute && customWalkRoute.length >= 2) {
      return customWalkRoute;
    }
    if (simTarget === 'guided-principal') {
      return (
        principalStop?.gateDirections?.routePath || [
          { x: 50, y: 95.1 },
          { x: 50, y: 69.3 },
          { x: 50, y: 62.0 },
          { x: 56.8, y: 62.0 }
        ]
      );
    }
    const stopRoute = currentFacility.gateDirections?.routePath;
    if (stopRoute && stopRoute.length >= 2) return stopRoute;
    // Fallback if user selected Main Gate itself while in 'selected-stop' mode
    return buildAutoRoutePath(currentFacility.mapX, currentFacility.mapY);
  }, [simTarget, customWalkRoute, principalStop, currentFacility]);

  const activeSimDestination = simTarget === 'guided-principal' ? principalStop : currentFacility;

  const walkerState: VisitorWalkerState | null = useMemo(() => {
    if (!simActive) return null;
    const base = interpolateWalkerOnRoute(simulationRoute, simProgress);
    const usesStairs =
      activeSimDestination.id === 'commerce-dept-library' ||
      EAST_STAIRS_STOP_IDS.has(activeSimDestination.id);
    let stepLabel: string | undefined;
    if (usesStairs) {
      if (simProgress >= 0.96) {
        stepLabel = 'By Stairs ↑ (1st Floor)';
      } else if (simProgress >= 0.42) {
        stepLabel =
          activeSimDestination.id === 'commerce-dept-library'
            ? 'Commerce Stairs ↑ (1st Fl.)'
            : 'Using Stairs ↑ (1st Fl.)';
      } else {
        stepLabel = 'To Stairs ↑ (1st Floor)';
      }
    }
    return {
      ...base,
      isMoving: isSimulating,
      progress: simProgress,
      stepLabel
    };
  }, [simActive, simulationRoute, simProgress, isSimulating, activeSimDestination.id]);

  const visitorHorizon = useMemo(() => {
    const pos = walkerState || { x: GATE_COORDS.x, y: GATE_COORDS.y };
    return getSurroundingsAtCoord(
      pos.x,
      pos.y,
      activeSimDestination,
      simActive ? simProgress : 0,
      simTarget
    );
  }, [walkerState, activeSimDestination, simActive, simProgress, simTarget]);

  // Smooth requestAnimationFrame loop for virtual visitor walking
  useEffect(() => {
    if (!isSimulating || mapMode !== 'browse' || formState || activeView !== 'map') {
      lastFrameRef.current = null;
      return;
    }

    const durationMs = simSpeed === 2 ? 6500 : 12500;
    let frameId = 0;

    const tick = (now: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = now;
      }
      const dt = now - lastFrameRef.current;
      lastFrameRef.current = now;

      setSimProgress((prev) => {
        const next = prev + dt / durationMs;
        if (next >= 1) {
          setIsSimulating(false);
          return 1;
        }
        return next;
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      lastFrameRef.current = null;
    };
  }, [isSimulating, simSpeed, mapMode, formState, activeView]);

  // Gently restart walk from Main Gate after pausing briefly at destination when Auto-Loop is enabled
  useEffect(() => {
    if (
      !autoLoopWalk ||
      !simActive ||
      isSimulating ||
      simProgress < 0.999 ||
      mapMode !== 'browse' ||
      formState ||
      activeView !== 'map'
    ) {
      return;
    }
    const restartTimer = setTimeout(() => {
      setSimProgress(0);
      setIsSimulating(true);
    }, 2200);
    return () => clearTimeout(restartTimer);
  }, [autoLoopWalk, simActive, isSimulating, simProgress, mapMode, formState, activeView]);

  // Sync with menu shortcuts like #campus-tour / #campus-virtual-map and #central-library
  useEffect(() => {
    const selectStopById = (stopId: string) => {
      const idx = stops.findIndex((s) => s.id === stopId);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setActiveHotspot(null);
      }
    };

    const openVirtualMap = () => {
      setActiveView('map');
      setMapMode('browse');
      setFormState(null);
    };

    const handleCustomSelect = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) {
        openVirtualMap();
        selectStopById(detail);
      }
    };

    const handleOpenMapEvent = () => {
      openVirtualMap();
    };

    const handleHash = () => {
      if (window.location.hash === '#central-library') {
        openVirtualMap();
        selectStopById('central-library');
      } else if (
        window.location.hash === '#campus-tour' ||
        window.location.hash === '#campus-virtual-map'
      ) {
        openVirtualMap();
        window.setTimeout(() => {
          document
            .querySelector('#campus-virtual-map')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    };

    handleHash();
    window.addEventListener('campus-tour:select-stop', handleCustomSelect);
    window.addEventListener('campus-tour:open-map', handleOpenMapEvent);
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('campus-tour:select-stop', handleCustomSelect);
      window.removeEventListener('campus-tour:open-map', handleOpenMapEvent);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [stops]);

  // Auto-tour timer (pauses automatically while editing map or open form or simulating walk)
  useEffect(() => {
    if (!isPlaying || isSimulating || mapMode !== 'browse' || formState) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stops.length);
      setActiveHotspot(null);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, isSimulating, stops.length, mapMode, formState]);

  const handleToggleWalkSimulation = () => {
    setActiveView('map');
    setIsPlaying(false);
    setMapMode('browse');

    if (simTarget === 'selected-stop' && currentFacility.id === 'historic-gateway') {
      const pIdx = stops.findIndex((s) => s.id === 'principal-office');
      if (pIdx !== -1) setCurrentIndex(pIdx);
    } else if (simTarget === 'guided-principal') {
      const pIdx = stops.findIndex((s) => s.id === 'principal-office');
      if (pIdx !== -1) setCurrentIndex(pIdx);
    }

    if (isSimulating) {
      setIsSimulating(false);
      setAutoLoopWalk(false);
    } else {
      setSimActive(true);
      if (simProgress >= 0.99) {
        setSimProgress(0);
      }
      setIsSimulating(true);
    }
  };

  const handleReplayWalk = () => {
    setActiveView('map');
    setIsPlaying(false);
    setMapMode('browse');
    setCustomWalkRoute(null);
    if (simTarget === 'guided-principal') {
      const pIdx = stops.findIndex((s) => s.id === 'principal-office');
      if (pIdx !== -1) setCurrentIndex(pIdx);
    }
    setSimActive(true);
    setAutoLoopWalk(true);
    setSimProgress(0);
    setIsSimulating(true);
  };

  const handleStopWalkSimulation = () => {
    setIsSimulating(false);
    setAutoLoopWalk(false);
    setCustomWalkRoute(null);
    setSimActive(false);
    setSimProgress(0);
  };

  const handleStepWalkCheckpoint = (direction: -1 | 1) => {
    setActiveView('map');
    setIsPlaying(false);
    setIsSimulating(false);
    setAutoLoopWalk(false);
    setSimActive(true);
    if (simTarget === 'guided-principal') {
      const pIdx = stops.findIndex((s) => s.id === 'principal-office');
      if (pIdx !== -1) setCurrentIndex(pIdx);
      const pts = GATE_TO_PRINCIPAL_CHECKPOINTS.map((c) => c.progress);
      if (direction > 0) {
        const nextPt = pts.find((p) => p > simProgress + 0.02);
        setSimProgress(nextPt !== undefined ? nextPt : 1);
      } else {
        const prevPts = pts.filter((p) => p < simProgress - 0.02);
        setSimProgress(prevPts.length > 0 ? prevPts[prevPts.length - 1] : 0);
      }
    } else {
      setSimProgress((prev) => Math.max(0, Math.min(1, prev + direction * 0.25)));
    }
  };

  const handleWalkEverywhereToStop = (index: number) => {
    const picked = stops[index];
    if (!picked) return;
    const fromPos = walkerState ? { x: walkerState.x, y: walkerState.y } : GATE_COORDS;
    const dynamicRoute =
      picked.id === 'historic-gateway'
        ? [fromPos, GATE_COORDS]
        : buildWalkRouteBetween(fromPos, picked);

    setActiveView('map');
    setIsPlaying(false);
    setMapMode('browse');
    setCurrentIndex(index);
    setActiveHotspot(null);
    setCustomWalkRoute(dynamicRoute);
    setSimTarget('selected-stop');
    setAutoLoopWalk(false);
    setSimActive(true);
    setSimProgress(0);
    setIsSimulating(true);
  };

  const handleSearchWalkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMatches.length > 0) {
      handleWalkEverywhereToStop(searchMatches[0].idx);
    }
  };

  const handleNext = () => {
    const nextIdx = (safeIndex + 1) % stops.length;
    handleWalkEverywhereToStop(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (safeIndex - 1 + stops.length) % stops.length;
    handleWalkEverywhereToStop(prevIdx);
  };

  const handleSelectFacility = (index: number) => {
    handleWalkEverywhereToStop(index);
  };

  // Start inserting a new map point
  const startInsertMode = () => {
    setActiveView('map');
    setIsPlaying(false);
    setIsSimulating(false);
    setFormState(null);
    setDraftPinCoords(null);
    setMapMode((prev) => (prev === 'insert' ? 'browse' : 'insert'));
  };

  // Start repositioning the currently selected point
  const startRepositionMode = () => {
    setActiveView('map');
    setIsPlaying(false);
    setIsSimulating(false);
    setFormState(null);
    setDraftPinCoords(null);
    setMapMode((prev) => (prev === 'reposition' ? 'browse' : 'reposition'));
  };

  // Open edit modal for current point
  const openEditCurrentPoint = () => {
    setIsPlaying(false);
    setIsSimulating(false);
    setMapMode('browse');
    setDraftPinCoords(null);
    setFormState({
      editingId: currentFacility.id,
      name: currentFacility.name,
      shortName: currentFacility.shortName || currentFacility.name,
      subtitle: currentFacility.subtitle,
      category: currentFacility.category,
      locationNote: currentFacility.locationNote,
      description: currentFacility.description,
      mapX: currentFacility.mapX,
      mapY: currentFacility.mapY,
      turn: currentFacility.gateDirections.turn,
      distanceFromGate: currentFacility.gateDirections.distanceFromGate,
      walkingStepsText: currentFacility.gateDirections.walkingSteps.join('\n')
    });
  };

  // Handle user clicking coordinates on CampusMapCanvas
  const handleMapCoordinatePick = (x: number, y: number) => {
    if (mapMode === 'insert') {
      const suggestion = suggestDirectionsFromGate(x, y, 'New Campus Point');
      setDraftPinCoords({ x, y });
      setMapMode('browse');
      setFormState({
        editingId: null,
        name: '',
        shortName: '',
        subtitle: 'Added Campus Map Point & Gate Navigation Stop',
        category: 'Academics',
        locationNote: `Campus Zone · X:${Math.round(x)}% Y:${Math.round(y)}%`,
        description:
          'Custom campus landmark added to help students and visitors navigate smoothly from the Main College Gate.',
        mapX: x,
        mapY: y,
        turn: suggestion.turn,
        distanceFromGate: suggestion.distanceFromGate,
        walkingStepsText: suggestion.walkingSteps.join('\n')
      });
    } else if (mapMode === 'reposition') {
      const target = stops[safeIndex];
      if (!target) return;
      const suggestion = suggestDirectionsFromGate(x, y, target.name);
      setStops((prev) =>
        prev.map((item, idx) =>
          idx === safeIndex
            ? {
                ...item,
                mapX: x,
                mapY: y,
                gateDirections: {
                  ...item.gateDirections,
                  turn: suggestion.turn,
                  distanceFromGate: suggestion.distanceFromGate,
                  routePath: suggestion.routePath
                }
              }
            : item
        )
      );
      setMapMode('browse');
    }
  };

  const handleAutoAssistDirections = () => {
    if (!formState) return;
    const suggestion = suggestDirectionsFromGate(
      formState.mapX,
      formState.mapY,
      formState.name || formState.shortName || 'this point'
    );
    setFormState({
      ...formState,
      turn: suggestion.turn,
      distanceFromGate: suggestion.distanceFromGate,
      walkingStepsText: suggestion.walkingSteps.join('\n')
    });
  };

  const handleSavePointForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState) return;

    const cleanName = formState.name.trim() || 'Campus Point';
    const cleanShort = formState.shortName.trim() || cleanName;
    const steps = formState.walkingStepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const routePath = buildAutoRoutePath(formState.mapX, formState.mapY);

    if (formState.editingId) {
      setStops((prev) =>
        prev.map((s) =>
          s.id === formState.editingId
            ? {
                ...s,
                name: cleanName,
                shortName: cleanShort,
                subtitle: formState.subtitle.trim() || s.subtitle,
                category: formState.category,
                locationNote: formState.locationNote.trim() || s.locationNote,
                description: formState.description.trim() || s.description,
                mapX: formState.mapX,
                mapY: formState.mapY,
                gateDirections: {
                  turn: formState.turn,
                  distanceFromGate: formState.distanceFromGate.trim() || 'Inside Campus Gate',
                  walkingSteps:
                    steps.length > 0 ? steps : s.gateDirections.walkingSteps,
                  routePath
                }
              }
            : s
        )
      );
    } else {
      const nextNum = String(stops.length + 1).padStart(2, '0');
      const newStop: TourFacility = {
        id: `custom-point-${Date.now()}`,
        name: cleanName,
        shortName: cleanShort,
        subtitle: formState.subtitle.trim() || 'Campus Map Point & Gate Navigation Stop',
        category: formState.category,
        stopNumber: nextNum,
        svgType: 'courtyard',
        badge: `${formState.category} · Gate Map Stop`,
        description:
          formState.description.trim() ||
          `Located ${formState.distanceFromGate} when entering the Main College Gate.`,
        keySpecs: [
          { label: 'Turn from Gate', value: formState.turn },
          { label: 'Approx. Walk', value: formState.distanceFromGate },
          { label: 'Category', value: formState.category },
          { label: 'Entry Point', value: 'Main Gate' }
        ],
        highlights:
          steps.length > 0
            ? steps
            : ['Reachable via paved walkways starting from the Main College Gate.'],
        hotspots: [
          {
            id: `hs-${Date.now()}`,
            label: cleanShort,
            description:
              formState.description.trim() || 'Campus point added via interactive map.',
            xPercent: 50,
            yPercent: 50
          }
        ],
        locationNote:
          formState.locationNote.trim() || 'Inside Main College Gate',
        mapX: formState.mapX,
        mapY: formState.mapY,
        gateDirections: {
          turn: formState.turn,
          distanceFromGate: formState.distanceFromGate.trim() || 'Inside Gate',
          walkingSteps:
            steps.length > 0
              ? steps
              : suggestDirectionsFromGate(formState.mapX, formState.mapY, cleanName).walkingSteps,
          routePath
        },
        isCustom: true
      };

      const nextStops = [...stops, newStop];
      setStops(nextStops);
      setCurrentIndex(nextStops.length - 1);
    }

    setFormState(null);
    setDraftPinCoords(null);
  };

  const handleDeleteCustomStop = (stopId: string) => {
    const filtered = stops
      .filter((s) => s.id !== stopId)
      .map((s, idx) => ({
        ...s,
        stopNumber: String(idx + 1).padStart(2, '0')
      }));
    setStops(filtered);
    setCurrentIndex(0);
    setFormState(null);
  };

  const handleResetDefaultMap = () => {
    setStops(CAMPUS_TOUR_STOPS);
    setCurrentIndex(0);
    setMapMode('browse');
    setDraftPinCoords(null);
    setFormState(null);
    try {
      localStorage.removeItem(TOUR_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const { t, dir } = useLanguage();
  const s = t.sections.campusTour;
  const cx = t.campusTourExtra;

  return (
    <section id="campus-tour" dir={dir} className="scroll-mt-20 py-16 sm:py-24 bg-[#042f28] text-white relative overflow-hidden">
      {/* Subtle Ambient Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {s.title}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            {s.subtitle}
          </p>
          <div className="pt-1 flex justify-center">
            <LanguageSwitcher variant="dark" />
          </div>
        </div>

        {/* Department & Facility Search-to-Walk Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <form onSubmit={handleSearchWalkSubmit} className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-amber-300 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={s.searchPlaceholder}
                aria-label={s.searchPlaceholder}
                className="w-full ps-10 pe-9 py-2.5 rounded-xl bg-[#021914] border border-emerald-600/80 text-sm font-semibold text-white placeholder-stone-400 focus:outline-none focus:border-amber-300 shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear department search"
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={searchQuery.trim().length > 0 && searchMatches.length === 0}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-emerald-950 font-extrabold text-xs sm:text-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-lg transition-colors"
            >
              <Footprints className="w-4 h-4" />
              <span>{s.walkBtn}</span>
            </button>
          </form>

          {/* Instant Filtered Search Results */}
          {searchQuery.trim().length > 0 && (
            <div className="mt-2.5 p-3 rounded-xl bg-[#021914]/95 border border-emerald-700/80 shadow-xl space-y-2 text-start">
              {searchMatches.length > 0 ? (
                <>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 px-1">
                    {cx.searchSelectPrompt}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchMatches.map(({ stop, idx }) => {
                      const theme = getStopColorTheme(stop.id, idx);
                      return (
                        <button
                          key={stop.id}
                          type="button"
                          onClick={() => {
                            handleWalkEverywhereToStop(idx);
                            setSearchQuery('');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-[#052e25] hover:bg-[#074537] border ${theme.activeBorder} ${theme.textClass} flex items-center gap-2 transition-all shadow-sm`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${theme.pinBg} ${theme.pinText}`}
                          >
                            {stop.stopNumber}
                          </span>
                          <span>{stop.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="text-xs font-semibold text-amber-200 px-1">
                  {cx.searchNoMatchPrefix}
                  {searchQuery}
                  {cx.searchNoMatchSuffix}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Facility & Map Stop Selector Strip (Distinct Color + Bold Larger Colored Text per Point) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2 mb-8">
          {stops.map((stop, idx) => {
            const isActive = idx === safeIndex;
            const theme = getStopColorTheme(stop.id, idx);
            return (
              <button
                key={stop.id}
                onClick={() => handleSelectFacility(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? `bg-[#021914] ${theme.textClass} ${theme.activeBorder} ring-2 ring-white/35 shadow-lg scale-[1.03]`
                    : `bg-[#063f35]/90 ${theme.textClass} border-emerald-800/90 hover:bg-[#074c3f] hover:border-emerald-500`
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-extrabold tabular-nums shadow-sm ${theme.pinBg} ${theme.pinText}`}
                >
                  {stop.stopNumber}
                </span>
                <span>{stop.shortName || stop.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Map & Tour Showcase Container */}
        <div
          id="campus-virtual-map"
          className="scroll-mt-24 bg-[#03241e] border border-amber-300/40 rounded-3xl p-3 sm:p-5 lg:p-6 shadow-2xl space-y-6"
        >
          {/* Top Control Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-800/80 pb-5">
            {/* Left Metadata + Mode Switcher */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <span className="text-amber-300 font-bold uppercase tracking-wider tabular-nums">
                  {s.pointLabel} {currentFacility.stopNumber} {s.ofLabel} {String(stops.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-200 font-medium">{currentFacility.category}</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="text-amber-200 hidden sm:inline">
                  {currentFacility.gateDirections.turn} ({currentFacility.gateDirections.distanceFromGate})
                </span>
              </div>

              {/* View Tabs: Campus Map vs Facility Interior vs Free Google Map & Earth */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#021914] rounded-xl border border-emerald-800/80">
                <button
                  onClick={() => setActiveView('map')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                    activeView === 'map'
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>{s.mapTab}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveView('interior');
                    setMapMode('browse');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                    activeView === 'interior'
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{s.facilityTab}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveView('earth');
                    setMapMode('browse');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                    activeView === 'earth'
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{cx.googleMapTab}</span>
                </button>
              </div>
            </div>

            {/* Right Controls: Map Edit Actions (Dev/Edit Only) & Tour Playback */}
            <div className="flex flex-wrap items-center gap-2">
              {import.meta.env.DEV && (
                <>
                  <button
                    onClick={startInsertMode}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 border transition-colors ${
                      mapMode === 'insert'
                        ? 'bg-sky-500 text-slate-950 border-sky-300 font-bold'
                        : 'bg-[#063f35] text-amber-200 border-emerald-700 hover:bg-emerald-800'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{mapMode === 'insert' ? 'Cancel Insert' : 'Insert Point'}</span>
                  </button>

                  <button
                    onClick={openEditCurrentPoint}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-[#063f35] text-stone-200 border border-emerald-700 hover:bg-emerald-800 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit Point</span>
                  </button>

                  <button
                    onClick={startRepositionMode}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 border transition-colors ${
                      mapMode === 'reposition'
                        ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold'
                        : 'bg-[#063f35] text-stone-200 border-emerald-700 hover:bg-emerald-800'
                    }`}
                    title="Move selected point on the map"
                  >
                    <Move className="w-3.5 h-3.5" />
                    <span>{mapMode === 'reposition' ? 'Pick New Spot...' : 'Move Pin'}</span>
                  </button>

                  {hasCustomChanges && (
                    <button
                      onClick={handleResetDefaultMap}
                      className="px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-rose-950/60 text-rose-200 border border-rose-800/70 hover:bg-rose-900/70 transition-colors"
                      title="Restore default college map stops"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Map</span>
                    </button>
                  )}

                  <div className="h-5 w-px bg-emerald-800 mx-0.5 hidden sm:block" />
                </>
              )}

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors border ${
                  isPlaying
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold'
                    : 'bg-[#063f35] text-stone-200 border-emerald-700 hover:bg-emerald-800'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? s.pauseTour : s.autoPlay}</span>
              </button>

              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 transition-colors"
                aria-label={s.prevStop}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 transition-colors"
                aria-label={s.nextStop}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Inline Insert / Edit Point Form Panel (Edit / Development Mode Only) */}
          {import.meta.env.DEV && formState && (
            <form
              onSubmit={handleSavePointForm}
              className="bg-[#021914] border border-amber-300/60 rounded-2xl p-5 sm:p-6 space-y-5 text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/80 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                    {formState.editingId
                      ? 'Edit Campus Map Point & Directions'
                      : 'Insert New Point on Campus Map'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {formState.editingId
                      ? `Editing: ${formState.name || 'Campus Point'}`
                      : `New Map Pin Placed at X:${Math.round(formState.mapX)}% · Y:${Math.round(formState.mapY)}%`}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutoAssistDirections}
                    className="px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-amber-200 border border-emerald-600 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    title="Auto-calculate walking steps from the Main Gate based on map coordinates"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Auto-Fill Directions from Gate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormState(null);
                      setDraftPinCoords(null);
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                    aria-label="Close form"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Point Title (Required)
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g., Girls Common Room or Exam Controller Desk"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Short Map Label
                  </label>
                  <input
                    type="text"
                    value={formState.shortName}
                    onChange={(e) => setFormState({ ...formState, shortName: e.target.value })}
                    placeholder="e.g., Common Room"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Campus Category
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        category: e.target.value as TourFacility['category']
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white focus:outline-none focus:border-amber-300"
                  >
                    <option value="Administration">Administration</option>
                    <option value="Academics">Academics</option>
                    <option value="Laboratories">Laboratories</option>
                    <option value="Library">Library</option>
                    <option value="Student Life">Student Life</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Turn Direction When Entering Gate
                  </label>
                  <select
                    value={formState.turn}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        turn: e.target.value as DirectionTurn
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white focus:outline-none focus:border-amber-300"
                  >
                    {DIRECTION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Distance / Walk Time
                  </label>
                  <input
                    type="text"
                    value={formState.distanceFromGate}
                    onChange={(e) =>
                      setFormState({ ...formState, distanceFromGate: e.target.value })
                    }
                    placeholder="e.g., 30 m Left"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Wing / Floor Location Note
                  </label>
                  <input
                    type="text"
                    value={formState.locationNote}
                    onChange={(e) =>
                      setFormState({ ...formState, locationNote: e.target.value })
                    }
                    placeholder="e.g., Ground Floor · West Courtyard Corridor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Step-by-Step Walking Directions from Main Gate (one step per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formState.walkingStepsText}
                    onChange={(e) =>
                      setFormState({ ...formState, walkingStepsText: e.target.value })
                    }
                    placeholder="1. Enter Main Gate&#10;2. Walk straight into courtyard..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Point Description &amp; Purpose
                  </label>
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={(e) =>
                      setFormState({ ...formState, description: e.target.value })
                    }
                    placeholder="Describe what students or visitors find at this spot..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-800/70">
                <div>
                  {formState.editingId && currentFacility.isCustom && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCustomStop(formState.editingId!)}
                      className="px-4 py-2 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-semibold flex items-center gap-1.5 border border-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Added Point</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormState(null);
                      setDraftPinCoords(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{formState.editingId ? 'Save Map Point' : 'Add Point to Map'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Full-Width Spacious Interactive Map + Two-Column Walk Simulator & Details Below */}
          <div className="space-y-8">
            {activeView === 'map' ? (
              <div className="space-y-3">
                <div dir="ltr">
                  <CampusMapCanvas
                    stops={stops}
                    selectedIndex={safeIndex}
                    onSelectStop={handleSelectFacility}
                    mapMode={mapMode}
                    onMapCoordinatePick={handleMapCoordinatePick}
                    draftPinCoords={draftPinCoords}
                    walker={walkerState}
                    customRoutePath={simActive ? simulationRoute : null}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-stone-300">
                  <span className="text-emerald-200/90 font-medium">{cx.googleMapAddress}</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveView('earth')}
                      className="px-3 py-1.5 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5 text-amber-300" />
                      <span>{cx.satelliteViewBtn}</span>
                    </button>
                    <a
                      href="https://earth.google.com/web/search/Government+Girls+Zubaida+College+Hyderabad+Sindh+Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#021914] hover:bg-[#063f35] text-amber-300 border border-amber-400/35 font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>{cx.openGoogleEarth}</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : activeView === 'earth' ? (
              <div className="rounded-2xl overflow-hidden border border-amber-300/40 bg-[#021914] shadow-xl">
                <div className="p-4 sm:p-5 bg-[#04362c] border-b border-emerald-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        {cx.freeMapBadge}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      {cx.googleMapTitle}
                    </h3>
                    <p className="text-xs text-stone-300 max-w-2xl">
                      {cx.googleMapSubtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#021914] border border-emerald-800">
                      <button
                        type="button"
                        onClick={() => setEarthLayer('k')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          earthLayer === 'k'
                            ? 'bg-amber-400 text-emerald-950'
                            : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        {cx.satelliteViewBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEarthLayer('m')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          earthLayer === 'm'
                            ? 'bg-amber-400 text-emerald-950'
                            : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        {cx.roadMapViewBtn}
                      </button>
                    </div>

                    <a
                      href="https://earth.google.com/web/search/Government+Girls+Zubaida+College+Hyderabad+Sindh+Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-extrabold inline-flex items-center gap-1.5 shadow"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{cx.openGoogleEarth}</span>
                    </a>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Government+Girls+Zubaida+College+Pathan+Colony+Hirabad+Hyderabad+Sindh+Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{cx.openGoogleMaps}</span>
                    </a>
                  </div>
                </div>

                <div dir="ltr" className="w-full h-[460px] sm:h-[560px] bg-[#021914]">
                  <iframe
                    title="Satellite and Street Map of Government Girls Zubaida College Hyderabad Sindh Pakistan"
                    src={`https://maps.google.com/maps?q=Government%20Girls%20Zubaida%20College%20Pathan%20Colony%20Hirabad%20Hyderabad%20Sindh%20Pakistan&t=${earthLayer}&z=18&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div dir="ltr">
                  <FacilityGraphic
                    facility={currentFacility}
                    activeHotspot={activeHotspot}
                    onSelectHotspot={setActiveHotspot}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-stone-400 px-1">
                  <span>Click info pins on the graphic to inspect facility features</span>
                  <button
                    onClick={() => setActiveView('map')}
                    className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1"
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>{s.mapTab}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 6 Columns: Virtual Visitor Walk Simulator Bar & Live Horizon Viewfinder */}
              <div className="lg:col-span-6 space-y-4">
                  <div className="bg-[#021914] border border-emerald-700/70 rounded-2xl p-4 sm:p-5 space-y-4 text-start">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 shrink-0">
                          <Footprints className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 flex flex-wrap items-center gap-2">
                            <span>Virtual Visitor Walk Simulation</span>
                            {(activeSimDestination.id === 'commerce-dept-library' ||
                              EAST_STAIRS_STOP_IDS.has(activeSimDestination.id)) && (
                              <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-300/60 text-amber-200 text-[10px] font-extrabold">
                                By Stairs ↑ (1st Floor)
                              </span>
                            )}
                          </span>
                          <h4 className="text-sm font-semibold text-white">
                            {simActive
                              ? visitorHorizon.stageLabel
                              : 'Walk virtually from the Main Gate & see what is Left, Ahead, and Right'}
                          </h4>
                        </div>
                      </div>

                      {/* Route Target Switcher */}
                      <div className="flex items-center gap-1 p-1 rounded-lg bg-[#042f28] border border-emerald-800">
                        <button
                          type="button"
                          onClick={() => {
                            setCustomWalkRoute(null);
                            setSimTarget('guided-principal');
                            setSimActive(true);
                            setAutoLoopWalk(true);
                            setSimProgress(0);
                            setIsSimulating(true);
                            const pIdx = stops.findIndex((s) => s.id === 'principal-office');
                            if (pIdx !== -1) setCurrentIndex(pIdx);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
                            simTarget === 'guided-principal'
                              ? 'bg-sky-400 text-slate-950 font-bold'
                              : 'text-stone-300 hover:text-white'
                          }`}
                        >
                          Gate → Principal’s Office
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomWalkRoute(null);
                            setSimTarget('selected-stop');
                            setSimActive(true);
                            setAutoLoopWalk(true);
                            setSimProgress(0);
                            setIsSimulating(true);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
                            simTarget === 'selected-stop'
                              ? 'bg-sky-400 text-slate-950 font-bold'
                              : 'text-stone-300 hover:text-white'
                          }`}
                        >
                          Walk from Gate
                        </button>
                      </div>
                    </div>

                    {/* Simulation Playback Controls & Progress Scrubber */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleToggleWalkSimulation}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors shadow ${
                          isSimulating
                            ? 'bg-amber-400 text-emerald-950 hover:bg-amber-300'
                            : 'bg-sky-400 text-slate-950 hover:bg-sky-300'
                        }`}
                      >
                        {isSimulating ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause Walk</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>
                              {simActive && simProgress > 0.01 && simProgress < 0.99
                                ? 'Resume Walk'
                                : 'Simulate Walk'}
                            </span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStepWalkCheckpoint(-1)}
                        className="px-2.5 py-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-stone-200 border border-emerald-700 text-xs font-semibold flex items-center gap-1 whitespace-nowrap shrink-0"
                        title="Step backward along path"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Step Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStepWalkCheckpoint(1)}
                        className="px-2.5 py-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-stone-200 border border-emerald-700 text-xs font-semibold flex items-center gap-1 whitespace-nowrap shrink-0"
                        title="Step forward along path"
                      >
                        <span>Step Forward</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleReplayWalk}
                        className="p-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 transition-colors"
                        title="Replay walk from Main Gate"
                        aria-label="Replay walk from Main Gate"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSimSpeed((s) => (s === 1 ? 2 : 1))}
                        className="px-2.5 py-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 text-xs font-mono font-bold whitespace-nowrap shrink-0"
                        title="Toggle walking simulation speed"
                      >
                        {simSpeed}x
                      </button>

                      {simActive && (
                        <button
                          type="button"
                          onClick={handleStopWalkSimulation}
                          className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
                          title="Clear visitor marker"
                          aria-label="Clear visitor marker"
                        >
                          <Square className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div className="flex-1 min-w-[140px] flex items-center gap-2 pl-1">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={Math.round(simProgress * 100)}
                          onChange={(e) => {
                            const val = Number(e.target.value) / 100;
                            setIsSimulating(false);
                            setAutoLoopWalk(false);
                            setSimActive(true);
                            setSimProgress(val);
                          }}
                          aria-label={cx.simProgressAria}
                          className="w-full accent-sky-400 cursor-pointer"
                        />
                        <span className="text-[11px] font-mono tabular-nums text-sky-300 w-9 text-right">
                          {Math.round(simProgress * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Live 3-Direction Visitor Horizon Viewfinder */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-emerald-800/80">
                      <div className="p-2.5 rounded-xl bg-[#042f28] border border-emerald-800/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                          <ArrowUpLeft className="w-3 h-3" />
                          <span>{cx.leftView}</span>
                        </span>
                        <p className="text-xs text-stone-100 mt-1 leading-snug">
                          {visitorHorizon.leftView}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#042f28] border border-sky-500/40">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1">
                          <ArrowUp className="w-3 h-3" />
                          <span>{cx.aheadView}</span>
                        </span>
                        <p className="text-xs text-stone-100 mt-1 leading-snug">
                          {visitorHorizon.aheadView}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#042f28] border border-emerald-800/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>{cx.rightView}</span>
                        </span>
                        <p className="text-xs text-stone-100 mt-1 leading-snug">
                          {visitorHorizon.rightView}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Right 6 Columns: Selected Stop + Gate-Entry Walking Directions */}
              <div className="lg:col-span-6 space-y-5 text-start">
              {(() => {
                const activeTheme = getStopColorTheme(currentFacility.id, safeIndex);
                return (
                  <div>
                    <div className={`flex flex-wrap items-center gap-2 text-xs font-semibold mb-1.5 ${activeTheme.textClass}`}>
                      <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${activeTheme.pinBg} ${activeTheme.pinText}`}>
                        {currentFacility.stopNumber}
                      </span>
                      <span>{currentFacility.badge}</span>
                    </div>
                    <h3 className={`font-serif text-2xl sm:text-3xl font-bold leading-tight ${activeTheme.textClass}`}>
                      {currentFacility.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100 mt-1 font-medium">
                      {currentFacility.subtitle}
                    </p>
                  </div>
                );
              })()}

              {/* Gate-Entry Directions Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#04362c] border border-amber-300/35 space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-emerald-700/70 pb-2.5">
                  <div className="flex items-center gap-2">
                    <DirectionIcon turn={currentFacility.gateDirections.turn} />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      {s.gateDirectionsTitle}
                    </span>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-emerald-100">
                    {currentFacility.gateDirections.turn} · {currentFacility.gateDirections.distanceFromGate}
                  </span>
                </div>

                <ol className="space-y-2">
                  {currentFacility.gateDirections.walkingSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-100 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/40 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Description */}
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {currentFacility.description}
              </p>

              {/* Key Specs Grid */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  {s.specsTitle}
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {currentFacility.keySpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#063f35] border border-emerald-700/60"
                    >
                      <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider block">
                        {spec.label}
                      </span>
                      <span className="font-serif font-bold text-sm text-white block mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {currentFacility.highlights.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-emerald-800/80">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    {s.highlightsTitle}
                  </span>
                  <div className="space-y-1.5">
                    {currentFacility.highlights.slice(0, 4).map((hl, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-stone-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Action Bar */}
              <div className="pt-3 border-t border-emerald-800/80 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{currentFacility.locationNote}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveView((v) => (v === 'map' ? 'interior' : 'map'))
                    }
                    className="px-3.5 py-2 bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    {activeView === 'map' ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>{s.facilityTab}</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{s.mapTab}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <span>{s.nextStop}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

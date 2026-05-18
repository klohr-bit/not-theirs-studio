export type Screen =
  | 'welcome'
  | 'content'
  | 'pairs'
  | 'gallery'
  | 'territory'
  | 'loading'
  | 'card'
  | 'return';

export type Pair = 'A' | 'B' | null;

export interface SpecimenSelection {
  id: number;
  label: string;
  signal: string;
}

export interface Contradiction {
  id: string;
  tension: string;
  optionA: string;
  optionB: string;
}

export interface ResolvedContradiction extends Contradiction {
  resolved?: 'A' | 'B' | null;
}

export interface ContentState {
  eventName: string;
  hostedBy: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  activities: string[];
  audience: string;
  contact: string;
  closingStatement: string;
  urgency: string;
  partners: string[];
  other: string;
  humanMoment: string;
  visualAnchor: 'event_name' | 'date' | 'organization' | 'feeling' | null;
}

export interface ColorsState {
  provided: boolean;
  hex: string[];
  temperature: 'warm' | 'neutral' | 'cool' | null;
  extractedFromLogo: boolean;
}

export interface TerritoryState {
  energyWords: string[];
  colorDirection: 'A' | 'B' | 'C' | null;
  surface: 'A' | 'B' | 'C' | null;
  icons: 'A' | 'B' | null;
  imagery: 'A' | 'B' | 'C' | null;
  decoration: 'A' | 'B' | null;
  logoAuthority: 'A' | 'B' | 'C' | null;
  lists: 'A' | 'B' | 'C' | null;
  typefaces: 'A' | 'B' | null;
  visualDirection: 'A' | 'B' | 'C' | 'D' | 'E' | null;
  illustrationStyle: 'A' | 'B' | 'C' | 'D' | null;
  physicalQuality: 'A' | 'B' | 'C' | 'ABC' | null;
  userPhotos: string[];
}

export interface GeneratedSignature {
  voice: string;
  tokens: string[];
  signature_prompt: string;
}

export interface AppState {
  currentScreen: Screen;

  name: string;
  purpose: string;
  format: string;

  content: ContentState;
  colors: ColorsState;

  pairs: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, Pair>;

  specimenSelections: SpecimenSelection[];

  territory: TerritoryState;

  signature: GeneratedSignature | null;
  contradictions: ResolvedContradiction[];

  savedAt: string | null;
}

export const INITIAL_STATE: AppState = {
  currentScreen: 'welcome',
  name: '',
  purpose: '',
  format: '',
  content: {
    eventName: '',
    hostedBy: '',
    date: '',
    time: '',
    locationName: '',
    address: '',
    activities: [],
    audience: '',
    contact: '',
    closingStatement: '',
    urgency: '',
    partners: [],
    other: '',
    humanMoment: '',
    visualAnchor: null,
  },
  colors: {
    provided: false,
    hex: [],
    temperature: null,
    extractedFromLogo: false,
  },
  pairs: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
  specimenSelections: [],
  territory: {
    energyWords: [],
    colorDirection: null,
    surface: null,
    icons: null,
    imagery: null,
    decoration: null,
    logoAuthority: null,
    lists: null,
    typefaces: null,
    visualDirection: null,
    illustrationStyle: null,
    physicalQuality: null,
    userPhotos: [],
  },
  signature: null,
  contradictions: [],
  savedAt: null,
};

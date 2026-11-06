export type UILanguageCode = 'en' | 'pt' | 'es' | 'fr' | 'ar' | 'zh' | 'hi' | 'ja';

export type NavTab = 'home' | 'matchmaking' | 'chats' | 'dms' | 'events' | 'checklist' | 'profile';

export type RegionFilter =
  | 'all'
  | 'latin_america'
  | 'europe'
  | 'east_asia'
  | 'south_asia'
  | 'mena'
  | 'sub_saharan_africa'
  | 'global';

export interface CountryOption {
  name: string;
  flag: string;
  region: RegionFilter;
}

export interface StudentProfile {
  id: string;
  name: string;
  usfEmail: string;
  verifiedUsf: boolean;
  avatarColor: string;
  avatarInitials: string;
  nationalities: string[]; // Up to 3
  ancestries: string[]; // Up to 3
  nativeLanguages: string[];
  spokenLanguages: string[];
  majors: string[]; // Up to 3
  academicYear: string;
  age: number;
  ageBracket: '17-19' | '20-22' | '23-25' | '26+';
  campus: 'Tampa' | 'St. Petersburg' | 'Sarasota-Manatee';
  interests: string[];
  bio: string;
  lookingFor: string;
  onlineStatus: 'online' | 'away' | 'offline';
  privacySettings: {
    showAge: boolean;
    verifiedOnlyDMs: boolean;
    appearInMatchmaking: boolean;
  };
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderNationalities: string[]; // Shown with flags next to name!
  senderAncestries?: string[];
  senderMajor: string;
  senderYear: string;
  text: string; // Never translated by UI language switcher!
  timestamp: string;
  languageNote?: string;
}

export interface LanguageRoom {
  id: string;
  languageName: string;
  nativeTitle: string;
  flagIcons: string[];
  description: string;
  activeMembersCount: number;
  isCustom?: boolean;
}

export interface DirectMessageItem {
  id: string;
  senderId: string; // 'me' or peer's id
  text: string; // Never translated by UI language switcher!
  timestamp: string;
}

export interface DirectMessageThread {
  peerId: string;
  lastUpdated: string;
  unreadCount: number;
  messages: DirectMessageItem[];
}

export interface BullsConnectEvent {
  id: string;
  bullsConnectId: string;
  clubName: string;
  clubAcronym: string;
  region: RegionFilter;
  countries: string[];
  flags: string[];
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  campus: string;
  attendeesCount: number;
  tags: string[];
  bullsConnectUrl: string;
  verifiedOrg: boolean;
}

export interface ChecklistItem {
  id: string;
  category: 'before_arrival' | 'first_week' | 'campus_life';
  titleKey: string;
  descKey: string;
  customTitle?: string;
  customDesc?: string;
  locationOrLink: string;
  completed: boolean;
  officialResourceUrl?: string;
}

export interface MatchmakingFilters {
  languages: string[]; // Multi-select
  nationalities: string[]; // Multi-select
  interests: string[]; // Multi-select
  majors: string[]; // Multi-select (Advanced)
  academicYears: string[]; // Multi-select (Advanced)
  ageBrackets: string[]; // Multi-select (Advanced)
  searchQuery: string;
}

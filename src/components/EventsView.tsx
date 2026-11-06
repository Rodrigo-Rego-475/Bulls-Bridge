import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  Search,
  Globe,
} from 'lucide-react';
import { BullsConnectEvent, RegionFilter } from '../types';
import { TranslationKeys } from '../i18n/translations';

interface EventsViewProps {
  t: TranslationKeys;
}

const FALLBACK_BULLSCONNECT_EVENTS: BullsConnectEvent[] = [
  {
    id: 'bc-evt-1001',
    bullsConnectId: 'CG-USF-88412',
    clubName: 'BRASA at USF (Brazilian Student Association)',
    clubAcronym: 'BRASA',
    region: 'latin_america',
    countries: ['Brazil'],
    flags: ['🇧🇷'],
    title: 'Welcome Bate-Papo & Pão de Queijo Social',
    description:
      'Meet fellow Brazilian and Portuguese-speaking Bulls! Enjoy authentic pão de queijo, brigadeiro, music, and tips for thriving at USF Tampa.',
    date: '2026-10-28',
    time: '18:00 - 20:00 EST',
    location: 'Marshall Student Center (MSC) 3707',
    campus: 'Tampa Campus',
    attendeesCount: 84,
    tags: ['Portuguese', 'Brazilian Culture', 'Food & Music'],
    bullsConnectUrl: 'https://bullsconnect.usf.edu/',
    verifiedOrg: true,
  },
  {
    id: 'bc-evt-1002',
    bullsConnectId: 'CG-USF-88419',
    clubName: 'Latin American Student Association (LASA at USF)',
    clubAcronym: 'LASA',
    region: 'latin_america',
    countries: ['Colombia', 'Mexico', 'Peru', 'Argentina', 'Venezuela'],
    flags: ['🇨🇴', '🇲🇽', '🇵🇪', '🇦🇷', '🇻🇪'],
    title: 'Noche de Cultura & Salsa on the Green',
    description:
      'Celebrate Latin American heritage across the Americas with beginner-friendly salsa & bachata lessons, empanadas, and language exchange.',
    date: '2026-10-30',
    time: '19:00 - 21:30 EST',
    location: 'MSC Amphitheater & Bulls Green',
    campus: 'Tampa Campus',
    attendeesCount: 142,
    tags: ['Spanish', 'Dance', 'Latin America'],
    bullsConnectUrl: 'https://bullsconnect.usf.edu/',
    verifiedOrg: true,
  },
  {
    id: 'bc-evt-1003',
    bullsConnectId: 'CG-USF-88425',
    clubName: 'Irish Culture & Language Club at USF',
    clubAcronym: 'ICLC',
    region: 'europe',
    countries: ['Ireland'],
    flags: ['🇮🇪'],
    title: 'Céilí Evening: Irish Gaeilge Phrases, Tea & Folk Music',
    description:
      'Learn everyday Irish (Gaeilge) greetings, explore Celtic folklore, and enjoy Barry’s tea and shortbread with students from around the world.',
    date: '2026-11-02',
    time: '17:30 - 19:00 EST',
    location: 'Cooper Hall (CPR) 245',
    campus: 'Tampa Campus',
    attendeesCount: 41,
    tags: ['Irish', 'Celtic Heritage', 'Europe'],
    bullsConnectUrl: 'https://bullsconnect.usf.edu/',
    verifiedOrg: true,
  },
  {
    id: 'bc-evt-1004',
    bullsConnectId: 'CG-USF-88433',
    clubName: 'Japanese Culture Club (JCC at USF)',
    clubAcronym: 'JCC',
    region: 'east_asia',
    countries: ['Japan'],
    flags: ['🇯🇵'],
    title: 'Aki Matsuri Autumn Festival & Japanese Language Tables',
    description:
      'Practice conversational Japanese with native speakers and learners, play traditional matsuri games, calligraphy (Shodo), and matcha tasting.',
    date: '2026-11-04',
    time: '18:30 - 20:30 EST',
    location: 'MSC Ballroom B',
    campus: 'Tampa Campus',
    attendeesCount: 118,
    tags: ['Japanese', 'Calligraphy', 'East Asia'],
    bullsConnectUrl: 'https://bullsconnect.usf.edu/',
    verifiedOrg: true,
  },
  {
    id: 'bc-evt-1005',
    bullsConnectId: 'CG-USF-88440',
    clubName: 'Arab Cultural Association (ACA at USF)',
    clubAcronym: 'ACA',
    region: 'mena',
    countries: ['Egypt', 'Lebanon', 'Jordan', 'Palestine', 'Morocco'],
    flags: ['🇪🇬', '🇱🇧', '🇯🇴', '🇵🇸', '🇲🇦'],
    title: 'Arabic Coffee (Qahwa), Oud Night & Levantine Board Games',
    description:
      'An intimate evening of Arabic coffee, cardamom tea, backgammon (Tawla), and welcoming conversation across all Arabic dialects.',
    date: '2026-11-05',
    time: '18:00 - 20:30 EST',
    location: 'MSC 2708 (The Oval Theater)',
    campus: 'Tampa Campus',
    attendeesCount: 96,
    tags: ['Arabic', 'Middle East & North Africa', 'Qahwa'],
    bullsConnectUrl: 'https://bullsconnect.usf.edu/',
    verifiedOrg: true,
  },
  {
    id: 'bc-evt-1006',
    bullsConnectId: 'CG-USF-88451',
    clubName: 'African Students Association (ASA at USF)',
    clubAcronym: 'ASA',
    region: 'sub_saharan_africa',
    countries: ['Nigeria', 'Ghana', 'Kenya', 'Ethiopia', 'Senegal', 'South Africa'],
    flags: ['🇳🇬', '🇬🇭', '🇰🇪', '🇪🇹', '🇿🇦'],
    title: 'Afrobeats Mixer, Jollof Tasting & Pan-African Story Circle',
    description:
      'Connect with students from across Sub-Saharan Africa and the diaspora! Great music, friendly debate on the best Jollof, and community mentorship.',
    date: '2026-11-07',
    time: '19:00 - 22:00 EST',
    location: 'ISA (Interdisciplinary Sciences) Atrium',
    campus: 'Tampa Campus',
    attendeesCount: 134,
    tags: ['Sub-Saharan Africa', 'Afrobeats', 'Community'],
    bullsConnectUrl: 'https://bullsconnect.usf.edu/',
    verifiedOrg: true,
  },
  {
    id: 'bc-evt-1007',
    bullsConnectId: 'CG-USF-88462',
    clubName: 'Indian Student Association (ISA / Hindu YUVA USF)',
    clubAcronym: 'ISA',
    region: 'south_asia',
    countries: ['India', 'Nepal', 'Sri Lanka'],
    flags: ['🇮🇳', '🇳🇵', '🇱🇰'],
    title: 'Chai & Chaat Sunset Gathering + New Student Buddy Meet',
    description:
      'Missing home-style masala chai and samosa chaat? Come make lifelong friends, find roommates, and chat in Hindi, Telugu, Tamil, and English.',
    date: '2026-11-09',
    time: '17:00 - 19:30 EST',
    location: 'MLK Plaza Lawn (Near MSC)',
    campus: 'Tampa Campus',
    attendeesCount: 165,
    tags: ['South Asia', 'Chai Social', 'Mentorship'],
    bullsConnectUrl: 'https://bullsconnect.usf.edu/',
    verifiedOrg: true,
  },
  {
    id: 'bc-evt-1008',
    bullsConnectId: 'CG-USF-88470',
    clubName: 'French & Francophone Club at USF',
    clubAcronym: 'FFC',
    region: 'europe',
    countries: ['France', 'Belgium', 'Switzerland', 'Canada'],
    flags: ['🇫🇷', '🇧🇪', '🇨🇭'],
    title: 'Café Croissant & Pause-Café Francophone',
    description:
      'Practice your French in a zero-pressure environment! Whether French is your native tongue or you just learned "Bonjour", come enjoy pastries and conversation.',
    date: '2026-11-11',
    time: '16:00 - 17:30 EST',
    location: 'Library (LIB) Grace Allen Room',
    campus: 'Tampa Campus',
    attendeesCount: 53,
    tags: ['French', 'Europe', 'Language Table'],
    bullsConnectUrl: 'https://bullsconnect.usf.edu/',
    verifiedOrg: true,
  },
];

export const EventsView: React.FC<EventsViewProps> = ({ t }) => {
  const [events, setEvents] = useState<BullsConnectEvent[]>(FALLBACK_BULLSCONNECT_EVENTS);
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rsvpedIds, setRsvpedIds] = useState<string[]>(['bc-evt-1001']);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState('CampusGroups v17 Live Feed');

  const fetchBullsConnectEvents = async (region: RegionFilter, search: string) => {
    setIsSyncing(true);
    try {
      const params = new URLSearchParams();
      if (region !== 'all') params.set('region', region);
      if (search.trim()) params.set('search', search.trim());
      const res = await fetch(`/api/bullsconnect/events?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.events)) {
          setEvents(data.events);
          setLastSyncText(`${data.source} • ${new Date().toLocaleTimeString()}`);
          setIsSyncing(false);
          return;
        }
      }
    } catch {
      // Fallback to client filtering if server isn't reached
    }
    let filtered = [...FALLBACK_BULLSCONNECT_EVENTS];
    if (region !== 'all') {
      filtered = filtered.filter(e => e.region === region);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        e =>
          e.clubName.toLowerCase().includes(q) ||
          e.title.toLowerCase().includes(q) ||
          e.countries.some(c => c.toLowerCase().includes(q))
      );
    }
    setEvents(filtered);
    setIsSyncing(false);
  };

  useEffect(() => {
    fetchBullsConnectEvents(selectedRegion, searchQuery);
  }, [selectedRegion, searchQuery]);

  const toggleRsvp = (id: string) => {
    setRsvpedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const regionTabs: { id: RegionFilter; label: string; icon: string }[] = [
    { id: 'all', label: t.regionAll, icon: '🌍' },
    { id: 'latin_america', label: t.regionLatinAmerica, icon: '🌎' },
    { id: 'europe', label: t.regionEurope, icon: '🏰' },
    { id: 'east_asia', label: t.regionEastAsia, icon: '🏮' },
    { id: 'south_asia', label: t.regionSouthAsia, icon: '🪷' },
    { id: 'mena', label: t.regionMena, icon: '🕌' },
    { id: 'sub_saharan_africa', label: t.regionSubSaharanAfrica, icon: '🥁' },
    { id: 'global', label: t.regionGlobal, icon: '🐂' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header + BullsConnect API Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2EE] text-[#006747] text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.eventsApiBadge}</span>
            <span className="opacity-60">({lastSyncText})</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E2A24]">
            {t.eventsTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#5A6B62] mt-1 max-w-2xl">
            {t.eventsSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchBullsConnectEvents(selectedRegion, searchQuery)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#E2DDD2] hover:border-[#006747] text-[#006747] text-xs sm:text-sm font-semibold shadow-sm transition self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{t.eventsRefreshApi}</span>
        </button>
      </div>

      {/* Region / Continent Filter Bar + Search */}
      <section className="rounded-3xl bg-white border border-[#E2DDD2] p-6 shadow-warm space-y-5">
        <div className="relative">
          <Search className="w-4 h-4 text-[#5A6B62] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.eventsSearchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] placeholder-[#5A6B62]/70 focus:outline-none focus:border-[#006747]"
          />
        </div>

        <div className="space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#5A6B62] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#006747]" />
            <span>{t.eventsFilterRegionLabel}</span>
          </p>

          <div className="flex flex-wrap gap-2">
            {regionTabs.map(tab => {
              const active = selectedRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition ${
                    active
                      ? 'bg-[#006747] text-white shadow-sm'
                      : 'bg-[#FAF7F2] hover:bg-[#E6F2EE] text-[#1E2A24] border border-[#E2DDD2]'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(evt => {
          const isRsvped = rsvpedIds.includes(evt.id);
          return (
            <article
              key={evt.id}
              className="rounded-3xl bg-white border border-[#E2DDD2] hover:border-[#006747]/60 p-6 shadow-warm flex flex-col justify-between space-y-5 transition"
            >
              <div className="space-y-4">
                {/* Club Header + Flags + BullsConnect ID */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="text-lg">{evt.flags.join(' ')}</span>
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E6F2EE] text-[#006747]">
                        {evt.clubAcronym}
                      </span>
                      <span className="text-[11px] font-mono text-[#5A6B62] bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E2DDD2]">
                        API: {evt.bullsConnectId}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#006747]">
                      {evt.clubName}
                    </h3>
                  </div>
                </div>

                {/* Event Title & Description */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#1E2A24]">
                    {evt.title}
                  </h2>
                  <p className="text-sm text-[#5A6B62] mt-1.5 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                {/* Logistics Card */}
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#F2ECE1] space-y-2 text-xs text-[#1E2A24]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#006747] shrink-0" />
                    <span className="font-semibold">{evt.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-[#D96B43] shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#006747] shrink-0" />
                    <span>
                      {evt.location} ({evt.campus})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#5A6B62]">
                    <Users className="w-4 h-4 text-[#006747] shrink-0" />
                    <span>
                      <strong className="text-[#1E2A24]">
                        {evt.attendeesCount + (isRsvped ? 1 : 0)}
                      </strong>{' '}
                      {t.eventsAttendees}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {evt.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-xl bg-[#F2ECE1] text-[#1E2A24] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between gap-3">
                <a
                  href={evt.bullsConnectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006747] hover:underline"
                >
                  <span>{t.eventsOpenBullsConnect}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => toggleRsvp(evt.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition ${
                    isRsvped
                      ? 'bg-[#E6F2EE] text-[#006747] border border-[#006747]/30'
                      : 'bg-[#006747] hover:bg-[#004E36] text-white shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isRsvped ? t.eventsRsvpedBtn : t.eventsRsvpBtn}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

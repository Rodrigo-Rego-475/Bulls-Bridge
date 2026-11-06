import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  MessageSquareHeart,
  ShieldCheck,
  RotateCcw,
  Search,
  GraduationCap,
  Globe2,
  Languages,
} from 'lucide-react';
import { StudentProfile, MatchmakingFilters } from '../types';
import { TranslationKeys } from '../i18n/translations';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import {
  COUNTRY_OPTIONS,
  ANCESTRY_OPTIONS,
  USF_MAJORS,
  ACADEMIC_YEARS,
  AGE_BRACKETS,
  getCountryFlag,
} from '../data/mockData';

interface MatchmakingViewProps {
  t: TranslationKeys;
  currentUser: StudentProfile;
  students: StudentProfile[];
  availableLanguages: string[];
  availableInterests: string[];
  onAddCustomLanguage: (lang: string) => void;
  onAddCustomInterest: (interest: string) => void;
  onStartDM: (studentId: string) => void;
}

export const MatchmakingView: React.FC<MatchmakingViewProps> = ({
  t,
  currentUser,
  students,
  availableLanguages,
  availableInterests,
  onAddCustomLanguage,
  onAddCustomInterest,
  onStartDM,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [filters, setFilters] = useState<MatchmakingFilters>({
    languages: [],
    nationalities: [],
    interests: [],
    majors: [],
    academicYears: [],
    ageBrackets: [],
    searchQuery: '',
  });

  const countryAndAncestryOptions = useMemo(() => {
    const countries = COUNTRY_OPTIONS.map(c => c.name);
    return Array.from(new Set([...countries, ...ANCESTRY_OPTIONS]));
  }, []);

  const resetFilters = () => {
    setFilters({
      languages: [],
      nationalities: [],
      interests: [],
      majors: [],
      academicYears: [],
      ageBrackets: [],
      searchQuery: '',
    });
  };

  const hasAnyActiveFilter =
    filters.languages.length > 0 ||
    filters.nationalities.length > 0 ||
    filters.interests.length > 0 ||
    filters.majors.length > 0 ||
    filters.academicYears.length > 0 ||
    filters.ageBrackets.length > 0 ||
    filters.searchQuery.trim().length > 0;

  // Filter and calculate compatibility score for each student
  const matchedStudents = useMemo(() => {
    return students
      .filter(s => s.privacySettings.appearInMatchmaking)
      .filter(student => {
        // Multi-select Languages (matches if student speaks ANY of the selected languages)
        if (filters.languages.length > 0) {
          const allStuLangs = Array.from(
            new Set([...student.nativeLanguages, ...student.spokenLanguages])
          );
          const matchesLang = filters.languages.some(l => allStuLangs.includes(l));
          if (!matchesLang) return false;
        }

        // Multi-select Nationalities / Ancestry (matches if student has ANY of the selected countries or ancestries)
        if (filters.nationalities.length > 0) {
          const allRoots = [...student.nationalities, ...student.ancestries];
          const matchesNat = filters.nationalities.some(n => allRoots.includes(n));
          if (!matchesNat) return false;
        }

        // Multi-select Interests (matches if student has ANY of the selected interests)
        if (filters.interests.length > 0) {
          const matchesInt = filters.interests.some(i => student.interests.includes(i));
          if (!matchesInt) return false;
        }

        // Multi-select Majors (Advanced)
        if (filters.majors.length > 0) {
          const matchesMajor = filters.majors.some(m => student.majors.includes(m));
          if (!matchesMajor) return false;
        }

        // Multi-select College Years (Advanced)
        if (filters.academicYears.length > 0) {
          const matchesYear = filters.academicYears.includes(student.academicYear);
          if (!matchesYear) return false;
        }

        // Multi-select Age Brackets (Advanced)
        if (filters.ageBrackets.length > 0) {
          const matchesAge = filters.ageBrackets.includes(student.ageBracket);
          if (!matchesAge) return false;
        }

        // Free text search
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.trim().toLowerCase();
          const haystack = [
            student.name,
            ...student.nationalities,
            ...student.ancestries,
            ...student.spokenLanguages,
            ...student.majors,
            ...student.interests,
            student.bio,
          ]
            .join(' ')
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }

        return true;
      })
      .map(student => {
        // Calculate compatibility score and shared reasons with currentUser + active filters
        const sharedLangs = student.spokenLanguages.filter(
          l =>
            currentUser.spokenLanguages.includes(l) ||
            filters.languages.includes(l)
        );
        const sharedRoots = student.nationalities.filter(
          n =>
            currentUser.nationalities.includes(n) ||
            filters.nationalities.includes(n)
        );
        const sharedInterests = student.interests.filter(
          i =>
            currentUser.interests.includes(i) ||
            filters.interests.includes(i)
        );
        const sharedMajors = student.majors.filter(
          m =>
            currentUser.majors.includes(m) ||
            filters.majors.includes(m)
        );

        let score = 68;
        score += sharedLangs.length * 7;
        score += sharedRoots.length * 8;
        score += sharedInterests.length * 6;
        score += sharedMajors.length * 7;
        if (student.academicYear === currentUser.academicYear) score += 4;
        const clampedScore = Math.min(99, score);

        return {
          student,
          compatibility: clampedScore,
          sharedLangs,
          sharedInterests,
          sharedMajors,
        };
      })
      .sort((a, b) => b.compatibility - a.compatibility);
  }, [students, filters, currentUser]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2EE] text-[#006747] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.matchMultiSelectHint}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E2A24]">
            {t.matchTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#5A6B62] mt-1 max-w-2xl">
            {t.matchSubtitle}
          </p>
        </div>

        {hasAnyActiveFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#E2DDD2] hover:border-[#D96B43] text-[#D96B43] text-xs sm:text-sm font-semibold transition self-start md:self-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.matchClearFilters}</span>
          </button>
        )}
      </div>

      {/* Multi-Select Filter Panel */}
      <section className="rounded-3xl bg-white border border-[#E2DDD2] p-6 shadow-warm space-y-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#5A6B62] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder={t.matchSearchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] placeholder-[#5A6B62]/70 focus:outline-none focus:border-[#006747]"
          />
        </div>

        {/* Core Matchmaking Multi-Selects: Target Languages, Target Nationalities/Ancestry, Personal Interests */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <MultiSelectDropdown
            label={t.matchTargetLanguages}
            options={availableLanguages}
            selected={filters.languages}
            onChange={languages => setFilters(prev => ({ ...prev, languages }))}
            placeholder={t.selectPlaceholder}
            onAddCustomOption={onAddCustomLanguage}
            addCustomLabel={t.matchAddCustomLang}
            addCustomPlaceholder={t.profileCustomLangPlaceholder}
          />

          <MultiSelectDropdown
            label={t.matchTargetNationalities}
            options={countryAndAncestryOptions}
            selected={filters.nationalities}
            onChange={nationalities => setFilters(prev => ({ ...prev, nationalities }))}
            placeholder={t.selectPlaceholder}
            renderBadgePrefix={opt => getCountryFlag(opt)}
          />

          <MultiSelectDropdown
            label={t.matchInterests}
            options={availableInterests}
            selected={filters.interests}
            onChange={interests => setFilters(prev => ({ ...prev, interests }))}
            placeholder={t.selectPlaceholder}
            onAddCustomOption={onAddCustomInterest}
            addCustomLabel={t.matchAddCustomInterest}
            addCustomPlaceholder={t.profileCustomInterestPlaceholder}
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="pt-2 border-t border-[#F2ECE1]">
          <button
            type="button"
            onClick={() => setShowAdvanced(prev => !prev)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#006747] hover:text-[#004E36] transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{showAdvanced ? t.matchHideAdvanced : t.matchAdvancedToggle}</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-150">
              <MultiSelectDropdown
                label={t.matchMajors}
                options={USF_MAJORS}
                selected={filters.majors}
                onChange={majors => setFilters(prev => ({ ...prev, majors }))}
                placeholder={t.selectPlaceholder}
              />

              <MultiSelectDropdown
                label={t.matchYears}
                options={ACADEMIC_YEARS}
                selected={filters.academicYears}
                onChange={academicYears => setFilters(prev => ({ ...prev, academicYears }))}
                placeholder={t.selectPlaceholder}
              />

              <MultiSelectDropdown
                label={t.matchAges}
                options={AGE_BRACKETS}
                selected={filters.ageBrackets}
                onChange={ageBrackets => setFilters(prev => ({ ...prev, ageBrackets }))}
                placeholder={t.selectPlaceholder}
              />
            </div>
          )}
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#5A6B62]">
          <span className="text-[#006747] font-bold">{matchedStudents.length}</span>{' '}
          {t.matchResultsCount}
        </p>
      </div>

      {/* Student Match Cards Grid */}
      {matchedStudents.length === 0 ? (
        <div className="rounded-3xl bg-white border border-[#E2DDD2] p-12 text-center space-y-4">
          <p className="text-base text-[#5A6B62]">{t.matchNoResults}</p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-2xl bg-[#006747] text-white text-sm font-semibold hover:bg-[#004E36] transition"
          >
            {t.matchClearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchedStudents.map(({ student, compatibility, sharedLangs, sharedInterests }) => (
            <article
              key={student.id}
              className="rounded-3xl bg-white border border-[#E2DDD2] hover:border-[#006747]/60 p-6 shadow-warm transition flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Top row: Avatar, Name + Flags, Match Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <div
                        className={`w-14 h-14 rounded-2xl ${student.avatarColor} text-white font-serif font-bold text-lg flex items-center justify-center shadow-sm`}
                      >
                        {student.avatarInitials}
                      </div>
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 border-white absolute -bottom-0.5 -right-0.5 ${
                          student.onlineStatus === 'online'
                            ? 'bg-emerald-500'
                            : 'bg-amber-400'
                        }`}
                        title={student.onlineStatus}
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="font-serif text-xl font-semibold text-[#1E2A24]">
                          {student.name}
                        </h3>
                        {/* Nationalities with flags right next to name */}
                        <div className="flex flex-wrap items-center gap-1">
                          {student.nationalities.map(country => (
                            <span
                              key={country}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F2ECE1] text-[#1E2A24]"
                            >
                              <span>{getCountryFlag(country)}</span>
                              <span>{country}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#5A6B62]">
                        {student.verifiedUsf && (
                          <span className="inline-flex items-center gap-1 text-[#006747] font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {t.verifiedBull}
                          </span>
                        )}
                        <span>•</span>
                        <span>{student.academicYear}</span>
                        {student.privacySettings.showAge && (
                          <>
                            <span>•</span>
                            <span>{student.age} yrs</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Compatibility badge */}
                  <div className="shrink-0 px-3 py-1.5 rounded-2xl bg-[#E6F2EE] border border-[#006747]/20 text-center">
                    <span className="block text-sm font-bold text-[#006747]">
                      {compatibility}%
                    </span>
                    <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#006747]/80">
                      {t.matchCompatibility}
                    </span>
                  </div>
                </div>

                {/* Ancestry & Major Info */}
                <div className="space-y-1.5 text-xs text-[#5A6B62] bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#F2ECE1]">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#006747] shrink-0" />
                    <span className="font-semibold text-[#1E2A24]">
                      {student.majors.join(' • ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#D96B43] shrink-0" />
                    <span>
                      {student.ancestries.join(' • ')} ({student.campus} Campus)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#006747] shrink-0" />
                    <span>
                      <strong className="text-[#1E2A24]">Speaks:</strong>{' '}
                      {student.spokenLanguages.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-[#1E2A24]/90 leading-relaxed">{student.bio}</p>

                {/* Interests Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {student.interests.map(interest => {
                    const isShared = sharedInterests.includes(interest);
                    return (
                      <span
                        key={interest}
                        className={`text-xs px-2.5 py-1 rounded-xl font-medium ${
                          isShared
                            ? 'bg-[#E6F2EE] text-[#006747] border border-[#006747]/25 font-semibold'
                            : 'bg-[#FAF7F2] text-[#5A6B62] border border-[#E2DDD2]'
                        }`}
                      >
                        {interest}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Footer: Shared traits summary & Personal DM CTA */}
              <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between gap-3">
                <div className="text-xs text-[#5A6B62]">
                  {sharedLangs.length > 0 && (
                    <span>
                      🗣️ <strong className="text-[#006747]">{sharedLangs.join(', ')}</strong>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onStartDM(student.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#006747] hover:bg-[#004E36] text-white text-xs sm:text-sm font-semibold shadow-sm transition"
                >
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>{t.matchSendDM}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

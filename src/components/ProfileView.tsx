import React, { useState } from 'react';
import {
  UserCheck,
  ShieldCheck,
  Save,
  Plus,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { TranslationKeys } from '../i18n/translations';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import {
  COUNTRY_OPTIONS,
  ANCESTRY_OPTIONS,
  USF_MAJORS,
  ACADEMIC_YEARS,
  getCountryFlag,
} from '../data/mockData';

interface ProfileViewProps {
  t: TranslationKeys;
  userProfile: StudentProfile;
  availableLanguages: string[];
  availableInterests: string[];
  onSaveProfile: (updated: StudentProfile) => void;
  onAddCustomLanguage: (lang: string) => void;
  onAddCustomInterest: (interest: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  t,
  userProfile,
  availableLanguages,
  availableInterests,
  onSaveProfile,
  onAddCustomLanguage,
  onAddCustomInterest,
}) => {
  const [draft, setDraft] = useState<StudentProfile>(userProfile);
  const [savedBanner, setSavedBanner] = useState(false);

  // Explicit custom language & interest inputs
  const [showCustomLangBox, setShowCustomLangBox] = useState(false);
  const [customLangText, setCustomLangText] = useState('');
  const [showCustomInterestBox, setShowCustomInterestBox] = useState(false);
  const [customInterestText, setCustomInterestText] = useState('');

  const countryNames = COUNTRY_OPTIONS.map(c => c.name);

  const computeAgeBracket = (age: number): StudentProfile['ageBracket'] => {
    if (age <= 19) return '17-19';
    if (age <= 22) return '20-22';
    if (age <= 25) return '23-25';
    return '26+';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const initials =
      draft.name
        .trim()
        .split(/\s+/)
        .map(part => part[0]?.toUpperCase() || '')
        .slice(0, 2)
        .join('') || 'UB';
    const updated: StudentProfile = {
      ...draft,
      avatarInitials: initials,
      ageBracket: computeAgeBracket(draft.age),
      verifiedUsf: draft.usfEmail.trim().toLowerCase().endsWith('@usf.edu'),
    };
    onSaveProfile(updated);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3500);
  };

  const handleInsertCustomLanguage = () => {
    const trimmed = customLangText.trim();
    if (!trimmed) return;
    onAddCustomLanguage(trimmed);
    if (!draft.spokenLanguages.includes(trimmed)) {
      setDraft(prev => ({
        ...prev,
        spokenLanguages: [...prev.spokenLanguages, trimmed],
      }));
    }
    setCustomLangText('');
    setShowCustomLangBox(false);
  };

  const handleInsertCustomInterest = () => {
    const trimmed = customInterestText.trim();
    if (!trimmed) return;
    onAddCustomInterest(trimmed);
    if (!draft.interests.includes(trimmed)) {
      setDraft(prev => ({
        ...prev,
        interests: [...prev.interests, trimmed],
      }));
    }
    setCustomInterestText('');
    setShowCustomInterestBox(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2EE] text-[#006747] text-xs font-semibold mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.verifiedBull}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E2A24]">
            {t.profileTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#5A6B62] mt-1 max-w-2xl">
            {t.profileSubtitle}
          </p>
        </div>

        {/* Live Profile Preview Badge */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E2DDD2] shadow-warm shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-[#006747] text-white font-serif font-bold text-base flex items-center justify-center">
            {draft.name
              .trim()
              .split(/\s+/)
              .map(p => p[0])
              .slice(0, 2)
              .join('')
              .toUpperCase() || 'UB'}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1E2A24] flex items-center gap-1">
              <span>{draft.name || 'USF Bull'}</span>
              <span>
                {draft.nationalities.map(n => getCountryFlag(n)).join(' ')}
              </span>
            </p>
            <p className="text-xs text-[#006747] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {draft.usfEmail}
            </p>
          </div>
        </div>
      </div>

      {savedBanner && (
        <div className="p-4 rounded-2xl bg-[#E6F2EE] border border-[#006747]/30 text-[#006747] text-sm font-semibold flex items-center gap-2.5 shadow-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{t.profileSavedToast}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Card 1: Basic Identity & Max-3 Dropdowns (Country, Ancestry, Major) */}
        <section className="rounded-3xl bg-white border border-[#E2DDD2] p-6 sm:p-8 shadow-warm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#1E2A24] mb-1.5">
                {t.profileNameLabel}
              </label>
              <input
                type="text"
                value={draft.name}
                onChange={e => setDraft(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E2A24] mb-1.5">
                {t.profileEmailLabel}
              </label>
              <input
                type="email"
                value={draft.usfEmail}
                onChange={e =>
                  setDraft(prev => ({ ...prev, usfEmail: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
                required
              />
            </div>
          </div>

          {/* 3 Drop-down lists with up to 3 options each: Nationality, Ancestry, Major */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <MultiSelectDropdown
              label={t.profileNationalityLabel}
              hint={t.profileMax3Hint}
              options={countryNames}
              selected={draft.nationalities}
              onChange={nationalities =>
                setDraft(prev => ({ ...prev, nationalities }))
              }
              maxSelections={3}
              placeholder={t.selectPlaceholder}
              maxReachedText={t.maxReachedNote}
              renderBadgePrefix={opt => getCountryFlag(opt)}
            />

            <MultiSelectDropdown
              label={t.profileAncestryLabel}
              hint={t.profileMax3Hint}
              options={ANCESTRY_OPTIONS}
              selected={draft.ancestries}
              onChange={ancestries => setDraft(prev => ({ ...prev, ancestries }))}
              maxSelections={3}
              placeholder={t.selectPlaceholder}
              maxReachedText={t.maxReachedNote}
            />

            <MultiSelectDropdown
              label={t.profileMajorLabel}
              hint={t.profileMax3Hint}
              options={USF_MAJORS}
              selected={draft.majors}
              onChange={majors => setDraft(prev => ({ ...prev, majors }))}
              maxSelections={3}
              placeholder={t.selectPlaceholder}
              maxReachedText={t.maxReachedNote}
            />
          </div>

          {/* College Info: Academic Year, Age, Campus */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
            <div>
              <label className="block text-sm font-semibold text-[#1E2A24] mb-1.5">
                {t.profileYearLabel}
              </label>
              <select
                value={draft.academicYear}
                onChange={e =>
                  setDraft(prev => ({ ...prev, academicYear: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
              >
                {ACADEMIC_YEARS.map(yr => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E2A24] mb-1.5">
                {t.profileAgeLabel}
              </label>
              <input
                type="number"
                min={16}
                max={65}
                value={draft.age}
                onChange={e =>
                  setDraft(prev => ({
                    ...prev,
                    age: Number(e.target.value) || 20,
                  }))
                }
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E2A24] mb-1.5">
                {t.profileCampusLabel}
              </label>
              <select
                value={draft.campus}
                onChange={e =>
                  setDraft(prev => ({
                    ...prev,
                    campus: e.target.value as StudentProfile['campus'],
                  }))
                }
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
              >
                <option value="Tampa">Tampa Campus</option>
                <option value="St. Petersburg">St. Petersburg Campus</option>
                <option value="Sarasota-Manatee">Sarasota-Manatee Campus</option>
              </select>
            </div>
          </div>
        </section>

        {/* Card 2: Languages & Personal Interests with Custom Option Insertion Buttons */}
        <section className="rounded-3xl bg-white border border-[#E2DDD2] p-6 sm:p-8 shadow-warm space-y-6">
          {/* Languages Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-xl font-semibold text-[#1E2A24]">
                🗣️ {t.profileSpokenLangLabel}
              </h2>
              <button
                type="button"
                onClick={() => setShowCustomLangBox(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#E6F2EE] hover:bg-[#d1e8e0] text-[#006747] text-xs font-bold transition"
              >
                <Plus className="w-4 h-4" />
                <span>{t.profileAddCustomLangBtn.replace(/^\+\s*/, '')}</span>
              </button>
            </div>

            {showCustomLangBox && (
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#006747]/30 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customLangText}
                  onChange={e => setCustomLangText(e.target.value)}
                  placeholder={t.profileCustomLangPlaceholder}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD2] text-sm focus:outline-none focus:border-[#006747]"
                />
                <button
                  type="button"
                  onClick={handleInsertCustomLanguage}
                  className="px-5 py-2.5 rounded-xl bg-[#006747] text-white text-xs sm:text-sm font-semibold hover:bg-[#004E36] transition"
                >
                  {t.profileAddConfirmBtn}
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <MultiSelectDropdown
                label={t.profileNativeLangLabel}
                options={availableLanguages}
                selected={draft.nativeLanguages}
                onChange={nativeLanguages =>
                  setDraft(prev => ({ ...prev, nativeLanguages }))
                }
                placeholder={t.selectPlaceholder}
              />

              <MultiSelectDropdown
                label={t.profileSpokenLangLabel}
                options={availableLanguages}
                selected={draft.spokenLanguages}
                onChange={spokenLanguages =>
                  setDraft(prev => ({ ...prev, spokenLanguages }))
                }
                placeholder={t.selectPlaceholder}
              />
            </div>
          </div>

          <hr className="border-[#F2ECE1]" />

          {/* Personal Interests Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-xl font-semibold text-[#1E2A24]">
                ✨ {t.profileInterestsLabel}
              </h2>
              <button
                type="button"
                onClick={() => setShowCustomInterestBox(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#FCEEE9] hover:bg-[#f7dfd6] text-[#D96B43] text-xs font-bold transition"
              >
                <Plus className="w-4 h-4" />
                <span>{t.profileAddCustomInterestBtn.replace(/^\+\s*/, '')}</span>
              </button>
            </div>

            {showCustomInterestBox && (
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D96B43]/30 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customInterestText}
                  onChange={e => setCustomInterestText(e.target.value)}
                  placeholder={t.profileCustomInterestPlaceholder}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD2] text-sm focus:outline-none focus:border-[#D96B43]"
                />
                <button
                  type="button"
                  onClick={handleInsertCustomInterest}
                  className="px-5 py-2.5 rounded-xl bg-[#D96B43] text-white text-xs sm:text-sm font-semibold hover:bg-[#c05932] transition"
                >
                  {t.profileAddConfirmBtn}
                </button>
              </div>
            )}

            {/* Interactive Interest Chips */}
            <div className="flex flex-wrap gap-2">
              {availableInterests.map(interest => {
                const active = draft.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => {
                      const next = active
                        ? draft.interests.filter(i => i !== interest)
                        : [...draft.interests, interest];
                      setDraft(prev => ({ ...prev, interests: next }));
                    }}
                    className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition ${
                      active
                        ? 'bg-[#006747] text-white shadow-sm font-semibold'
                        : 'bg-[#FAF7F2] hover:bg-[#E6F2EE] text-[#1E2A24] border border-[#E2DDD2]'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-[#F2ECE1]" />

          {/* Bio & Looking For */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#1E2A24] mb-1.5">
                {t.profileBioLabel}
              </label>
              <textarea
                rows={3}
                value={draft.bio}
                onChange={e => setDraft(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1E2A24] mb-1.5">
                {t.profileLookingForLabel}
              </label>
              <textarea
                rows={3}
                value={draft.lookingFor}
                onChange={e =>
                  setDraft(prev => ({ ...prev, lookingFor: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
              />
            </div>
          </div>
        </section>

        {/* Card 3: Security & Privacy Controls */}
        <section className="rounded-3xl bg-white border border-[#E2DDD2] p-6 sm:p-8 shadow-warm space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#006747]" />
            <h2 className="font-serif text-xl font-semibold text-[#1E2A24]">
              {t.profilePrivacyTitle}
            </h2>
          </div>

          <div className="space-y-3 text-sm text-[#1E2A24]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={draft.privacySettings.showAge}
                onChange={e =>
                  setDraft(prev => ({
                    ...prev,
                    privacySettings: {
                      ...prev.privacySettings,
                      showAge: e.target.checked,
                    },
                  }))
                }
                className="w-4 h-4 accent-[#006747] rounded"
              />
              <span>{t.profilePrivacyShowAge}</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={draft.privacySettings.verifiedOnlyDMs}
                onChange={e =>
                  setDraft(prev => ({
                    ...prev,
                    privacySettings: {
                      ...prev.privacySettings,
                      verifiedOnlyDMs: e.target.checked,
                    },
                  }))
                }
                className="w-4 h-4 accent-[#006747] rounded"
              />
              <span>{t.profilePrivacyVerifiedOnly}</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={draft.privacySettings.appearInMatchmaking}
                onChange={e =>
                  setDraft(prev => ({
                    ...prev,
                    privacySettings: {
                      ...prev.privacySettings,
                      appearInMatchmaking: e.target.checked,
                    },
                  }))
                }
                className="w-4 h-4 accent-[#006747] rounded"
              />
              <span>{t.profilePrivacyAppearMatch}</span>
            </label>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#006747] hover:bg-[#004E36] text-white font-bold text-base shadow-warm-lg transition"
          >
            <Save className="w-5 h-5" />
            <span>{t.profileSaveBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

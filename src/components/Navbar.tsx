import React from 'react';
import {
  Sparkles,
  MessageCircle,
  MessageSquareHeart,
  Calendar,
  CheckSquare,
  User,
  ShieldCheck,
  Globe,
  Home,
} from 'lucide-react';
import { NavTab, UILanguageCode, StudentProfile } from '../types';
import { UI_LANGUAGES, TranslationKeys } from '../i18n/translations';
import { getCountryFlag } from '../data/mockData';

interface NavbarProps {
  t: TranslationKeys;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  uiLang: UILanguageCode;
  onChangeUiLang: (lang: UILanguageCode) => void;
  userProfile: StudentProfile;
  unreadDMsCount: number;
  onOpenSecurityModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  t,
  activeTab,
  onSelectTab,
  uiLang,
  onChangeUiLang,
  userProfile,
  unreadDMsCount,
  onOpenSecurityModal,
}) => {
  const navItems: {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'matchmaking', label: t.navMatchmaking, icon: Sparkles },
    { id: 'chats', label: t.navChats, icon: MessageCircle },
    { id: 'dms', label: t.navDMs, icon: MessageSquareHeart, badge: unreadDMsCount },
    { id: 'events', label: t.navEvents, icon: Calendar },
    { id: 'checklist', label: t.navChecklist, icon: CheckSquare },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E2DDD2]">
      {/* Top Bar: Brand + UI Language Switcher + USF Security Shield */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#006747] text-[#CFC493] flex items-center justify-center font-serif font-bold text-xl shadow-sm group-hover:bg-[#004E36] transition">
            🐂
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-[#006747] tracking-tight">
                {t.appName}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6F2EE] text-[#006747]">
                <ShieldCheck className="w-3 h-3" />
                {t.verifiedBull}
              </span>
            </div>
            <p className="text-xs text-[#5A6B62] hidden sm:block">{t.appTagline}</p>
          </div>
        </button>

        {/* Right Controls: Security Shield + UI Language Selector + User Pill */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenSecurityModal}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white hover:bg-[#E6F2EE] text-[#006747] border border-[#E2DDD2] text-xs font-semibold transition"
            title={t.safetyShield}
          >
            <ShieldCheck className="w-4 h-4 text-[#006747]" />
            <span>{t.safetyShield}</span>
          </button>

          {/* Multilingual Site Switcher (Translates all UI except Chats) */}
          <div className="relative flex items-center bg-white border border-[#E2DDD2] rounded-2xl px-3 py-1.5 shadow-sm">
            <Globe className="w-4 h-4 text-[#006747] mr-1.5 shrink-0" />
            <label htmlFor="ui-lang-select" className="sr-only">
              {t.uiLanguageLabel}
            </label>
            <select
              id="ui-lang-select"
              value={uiLang}
              onChange={e => onChangeUiLang(e.target.value as UILanguageCode)}
              className="bg-transparent text-xs sm:text-sm font-semibold text-[#1E2A24] focus:outline-none cursor-pointer pr-1"
            >
              {UI_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName} ({lang.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Current User Profile Quick Button */}
          <button
            type="button"
            onClick={() => onSelectTab('profile')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#F2ECE1] hover:bg-[#e5decb] text-[#1E2A24] text-xs font-semibold transition"
          >
            <span className="w-6 h-6 rounded-full bg-[#006747] text-white text-[11px] font-bold flex items-center justify-center">
              {userProfile.avatarInitials}
            </span>
            <span className="hidden sm:inline">{userProfile.name.split(' ')[0]}</span>
            <span>
              {userProfile.nationalities.map(n => getCountryFlag(n)).join('')}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Row */}
      <nav className="max-w-6xl mx-auto px-4 pb-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-[#006747] text-white shadow-sm'
                  : 'text-[#5A6B62] hover:bg-[#F2ECE1] hover:text-[#1E2A24]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-[#CFC493] text-[#1E2A24]'
                      : 'bg-[#D96B43] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        {uiLang !== 'en' && (
          <span className="ml-auto hidden lg:inline-flex items-center text-[11px] text-[#5A6B62] bg-[#F7F2E4] px-2.5 py-1 rounded-full border border-[#CFC493]/50">
            ✨ {t.chatsNotTranslatedNote}
          </span>
        )}
      </nav>
    </header>
  );
};

import React from 'react';
import { Sparkles, MessageCircle, Compass, Calendar, CheckSquare, ShieldCheck, ArrowRight, HeartHandshake } from 'lucide-react';
import { NavTab, StudentProfile } from '../types';
import { TranslationKeys } from '../i18n/translations';
import { getCountryFlag } from '../data/mockData';

interface HomeViewProps {
  t: TranslationKeys;
  userProfile: StudentProfile;
  onNavigate: (tab: NavTab) => void;
  onOpenSecurityModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  t,
  userProfile,
  onNavigate,
  onOpenSecurityModal,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-14 space-y-12">
      {/* Minimalist, Eye-Catching Humanized Hero */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#006747] via-[#07573E] to-[#00422D] text-[#FAF7F2] p-8 sm:p-14 shadow-warm-lg border border-[#CFC493]/20">
        {/* Warm organic background glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D4A359]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-[#D96B43]/15 blur-3xl" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-[#F7F2E4]">
            <span>🐂</span>
            <span>{t.homeBadge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.12]">
            {t.homeTitleLine1}{' '}
            <span className="italic font-normal text-[#CFC493] underline decoration-[#D96B43]/70 decoration-wavy underline-offset-8">
              {t.homeTitleHighlight}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#E6F2EE]/90 leading-relaxed max-w-xl font-normal">
            {t.homeSubtitle}
          </p>

          {/* Inviting Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onNavigate('matchmaking')}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#CFC493] text-[#1E2A24] font-bold text-sm sm:text-base shadow-lg hover:bg-[#e0d6a7] transition transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#006747]" />
              <span>{t.homePrimaryCta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('chats')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/12 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition"
            >
              <MessageCircle className="w-4 h-4 text-[#CFC493]" />
              <span>{t.homeSecondaryCta}</span>
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium text-[#E6F2EE] hover:text-white hover:bg-white/10 transition"
            >
              <span>
                {userProfile.nationalities.map(n => getCountryFlag(n)).join(' ')}{' '}
                {t.homeProfileCta}
              </span>
            </button>
          </div>

          {/* Minimalist trust & community pulse pills */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#E6F2EE]/85 border-t border-white/10">
            <span className="inline-flex items-center gap-1.5">
              <span>🌎</span> {t.homeStatCountries}
            </span>
            <span className="opacity-40">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span>🗣️</span> {t.homeStatLanguages}
            </span>
            <span className="opacity-40">•</span>
            <button
              type="button"
              onClick={onOpenSecurityModal}
              className="inline-flex items-center gap-1.5 text-[#CFC493] hover:underline font-medium"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.homeStatVerified}</span>
            </button>
          </div>
        </div>

        {/* Floating Humanized Student Cards Preview (Right side on desktop) */}
        <div className="hidden lg:flex flex-col gap-3.5 absolute right-10 top-1/2 -translate-y-1/2 w-72">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] text-[#1E2A24] shadow-xl border border-[#E2DDD2] transform -rotate-2 hover:rotate-0 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0D7A5F] text-white font-bold flex items-center justify-center text-sm">
                BO
              </div>
              <div>
                <p className="text-sm font-bold flex items-center gap-1">
                  Beatriz <span>🇧🇷 🇵🇹</span>
                </p>
                <p className="text-xs text-[#5A6B62]">International Studies • Junior</p>
              </div>
            </div>
            <p className="mt-2.5 text-xs text-[#1E2A24]/90 italic bg-[#F2ECE1] px-3 py-2 rounded-xl">
              “Oi! Quem anima tomar um café no MSC hoje?”
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] text-[#1E2A24] shadow-xl border border-[#E2DDD2] transform rotate-2 translate-x-3 hover:rotate-0 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2C5E8A] text-white font-bold flex items-center justify-center text-sm">
                KT
              </div>
              <div>
                <p className="text-sm font-bold flex items-center gap-1">
                  Kenji <span>🇯🇵</span>
                </p>
                <p className="text-xs text-[#5A6B62]">Computer Science • Sophomore</p>
              </div>
            </div>
            <p className="mt-2.5 text-xs text-[#1E2A24]/90 italic bg-[#F2ECE1] px-3 py-2 rounded-xl">
              “Trading Japanese practice for Portuguese & soccer!”
            </p>
          </div>
        </div>
      </section>

      {/* 3 Minimalist Inviting Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button
          onClick={() => onNavigate('chats')}
          className="group text-left p-6 rounded-3xl bg-white border border-[#E2DDD2] hover:border-[#006747] shadow-warm transition flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#E6F2EE] text-[#006747] flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1E2A24] mb-2">
              {t.homePillar1Title}
            </h3>
            <p className="text-sm text-[#5A6B62] leading-relaxed">
              {t.homePillar1Desc}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#006747]">
            <span>🇧🇷 🇪🇸 🇯🇵 🇸🇦 🇫🇷 🇮🇳 🇨🇳 🇮🇪</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('matchmaking')}
          className="group text-left p-6 rounded-3xl bg-white border border-[#E2DDD2] hover:border-[#006747] shadow-warm transition flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#FCEEE9] text-[#D96B43] flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1E2A24] mb-2">
              {t.homePillar2Title}
            </h3>
            <p className="text-sm text-[#5A6B62] leading-relaxed">
              {t.homePillar2Desc}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#D96B43]">
            <span>{t.homePrimaryCta}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('events')}
          className="group text-left p-6 rounded-3xl bg-white border border-[#E2DDD2] hover:border-[#006747] shadow-warm transition flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#F7F2E4] text-[#9C732B] flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1E2A24] mb-2">
              {t.homePillar3Title}
            </h3>
            <p className="text-sm text-[#5A6B62] leading-relaxed">
              {t.homePillar3Desc}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#9C732B]">
            <span>BRASA • LASA • JCC • ASA • ICLC</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </section>

      {/* Gentle, Uncluttered Callout pointing to the separate Arrival Checklist */}
      <section className="rounded-3xl bg-[#F2ECE1] border border-[#E2DDD2] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#006747] text-white flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <p className="text-sm sm:text-base font-medium text-[#1E2A24]">
            {t.homeNewStudentBanner}
          </p>
        </div>
        <button
          onClick={() => onNavigate('checklist')}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#006747] text-[#006747] hover:text-white border border-[#006747]/20 font-semibold text-xs sm:text-sm transition shrink-0 shadow-sm"
        >
          {t.homeNewStudentBtn}
        </button>
      </section>
    </div>
  );
};

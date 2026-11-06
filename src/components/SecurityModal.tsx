import React from 'react';
import { ShieldCheck, Lock, MapPin, Phone, X } from 'lucide-react';
import { TranslationKeys } from '../i18n/translations';

interface SecurityModalProps {
  t: TranslationKeys;
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({
  t,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2A24]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#E2DDD2]/60 text-[#5A6B62] transition"
          aria-label={t.closeBtn}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#006747] text-[#CFC493] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#1E2A24]">
              {t.securityModalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6B62]">
              {t.securityModalSubtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E2DDD2] flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#006747] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-[#1E2A24]">
                {t.securityFeature1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B62] mt-0.5">
                {t.securityFeature1Desc}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2DDD2] flex items-start gap-3.5">
            <Lock className="w-5 h-5 text-[#D96B43] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-[#1E2A24]">
                {t.securityFeature2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B62] mt-0.5">
                {t.securityFeature2Desc}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2DDD2] flex items-start gap-3.5">
            <MapPin className="w-5 h-5 text-[#006747] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-[#1E2A24]">
                {t.securityFeature3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6B62] mt-0.5">
                {t.securityFeature3Desc}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#E6F2EE] border border-[#006747]/20 flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#006747]">
          <Phone className="w-4 h-4 shrink-0" />
          <span>{t.securityEmergencyContacts}</span>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-[#006747] hover:bg-[#004E36] text-white text-sm font-semibold transition"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

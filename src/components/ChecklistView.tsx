import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  Plus,
  ExternalLink,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ChecklistItem } from '../types';
import { TranslationKeys } from '../i18n/translations';

interface ChecklistViewProps {
  t: TranslationKeys;
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddCustomItem: (title: string, category: ChecklistItem['category']) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  t,
  items,
  onToggleItem,
  onAddCustomItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | ChecklistItem['category']
  >('all');
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] =
    useState<ChecklistItem['category']>('first_week');

  const completedCount = items.filter(i => i.completed).length;
  const progressPercent =
    items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter(i => i.category === selectedCategory);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customTitle.trim();
    if (!trimmed) return;
    onAddCustomItem(trimmed, customCategory);
    setCustomTitle('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2EE] text-[#006747] text-xs font-semibold mb-2">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>USF Office of International Services (OIS) Companion</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E2A24]">
          {t.checklistTitle}
        </h1>
        <p className="text-sm sm:text-base text-[#5A6B62] mt-1 max-w-2xl">
          {t.checklistSubtitle}
        </p>
      </div>

      {/* Progress Card */}
      <section className="rounded-3xl bg-gradient-to-r from-[#006747] to-[#004E36] text-white p-6 sm:p-8 shadow-warm-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#CFC493] font-semibold">
              {t.checklistProgressLabel}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold mt-1">
              {completedCount} / {items.length} Completed ({progressPercent}%)
            </h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#CFC493]" />
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full bg-[#CFC493] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: t.checklistCatAll },
          { id: 'before_arrival', label: t.checklistCatBefore },
          { id: 'first_week', label: t.checklistCatFirstWeek },
          { id: 'campus_life', label: t.checklistCatCampusLife },
        ].map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition ${
              selectedCategory === cat.id
                ? 'bg-[#006747] text-white shadow-sm'
                : 'bg-white hover:bg-[#E6F2EE] text-[#1E2A24] border border-[#E2DDD2]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-3.5">
        {filteredItems.map(item => {
          const title = item.customTitle
            ? item.customTitle
            : (t[item.titleKey as keyof TranslationKeys] as string) || item.titleKey;
          const desc = item.customDesc
            ? item.customDesc
            : (t[item.descKey as keyof TranslationKeys] as string) || '';

          return (
            <div
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className={`group rounded-3xl p-5 border transition cursor-pointer flex items-start gap-4 ${
                item.completed
                  ? 'bg-[#E6F2EE]/50 border-[#006747]/30'
                  : 'bg-white hover:border-[#006747] border-[#E2DDD2] shadow-warm'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 text-[#006747]"
                aria-label={`Toggle ${title}`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-[#006747]" />
                ) : (
                  <Circle className="w-6 h-6 text-[#5A6B62] group-hover:text-[#006747]" />
                )}
              </button>

              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3
                    className={`font-serif text-lg font-semibold ${
                      item.completed
                        ? 'line-through text-[#5A6B62]'
                        : 'text-[#1E2A24]'
                    }`}
                  >
                    {title}
                  </h3>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#5A6B62] bg-[#FAF7F2] px-2.5 py-1 rounded-xl border border-[#E2DDD2]">
                    <MapPin className="w-3 h-3 text-[#006747]" />
                    {item.locationOrLink}
                  </span>
                </div>

                {desc && (
                  <p className="text-sm text-[#5A6B62] leading-relaxed">{desc}</p>
                )}

                {item.officialResourceUrl && (
                  <div className="pt-1">
                    <a
                      href={item.officialResourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#006747] hover:underline"
                    >
                      <span>Official USF Resource</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Personal Checklist Goal */}
      <form
        onSubmit={handleAdd}
        className="rounded-3xl bg-white border border-[#E2DDD2] p-6 shadow-warm space-y-4"
      >
        <h3 className="font-serif text-lg font-semibold text-[#1E2A24]">
          {t.checklistAddCustomTitle}
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customTitle}
            onChange={e => setCustomTitle(e.target.value)}
            placeholder={t.checklistAddCustomPlaceholder}
            className="flex-1 px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
          />
          <select
            value={customCategory}
            onChange={e =>
              setCustomCategory(e.target.value as ChecklistItem['category'])
            }
            className="px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] text-sm text-[#1E2A24] focus:outline-none focus:border-[#006747]"
          >
            <option value="before_arrival">{t.checklistCatBefore}</option>
            <option value="first_week">{t.checklistCatFirstWeek}</option>
            <option value="campus_life">{t.checklistCatCampusLife}</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#006747] hover:bg-[#004E36] text-white text-sm font-semibold transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{t.checklistAddBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

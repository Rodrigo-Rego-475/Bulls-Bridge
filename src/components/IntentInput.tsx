import React from 'react';
import { Sparkles, Terminal, BookOpen, Code2, Cpu, FileText, Palette, CornerDownLeft } from 'lucide-react';
import { PresetTemplate } from '../types';
import { sound } from '../services/sound';

interface IntentInputProps {
  intent: string;
  onChangeIntent: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSelectPreset: (preset: PresetTemplate) => void;
}

const PRESETS: PresetTemplate[] = [
  {
    id: 'os-study',
    title: 'Operating Systems & Paging',
    category: 'STUDY',
    badge: 'STUDY',
    intent: 'Read chapter 4 of operating systems and take notes on memory paging and virtual address translation',
    description: 'Textbook study, page tables, TLB caching & conceptual notes',
  },
  {
    id: 'auth-work',
    title: 'Auth Middleware & Jest',
    category: 'WORK',
    badge: 'WORK',
    intent: 'Fix bug in auth middleware, write Jest tests and review PRs',
    description: 'Token validation bugfix, 100% test branch coverage, PR reviews',
  },
  {
    id: 'algo-cram',
    title: 'Algorithm & DP Cramming',
    category: 'STUDY',
    badge: 'STUDY',
    intent: 'Study dynamic programming memoization patterns, solve 4 LeetCode hard graph problems, and review time complexities',
    description: 'Graph algorithms, dynamic programming & interview prep',
  },
  {
    id: 'thesis-review',
    title: 'Thesis Literature Review',
    category: 'STUDY',
    badge: 'STUDY',
    intent: 'Read and synthesize 4 recent papers on LLM memory quantization and write notes for chapter 2',
    description: 'Academic paper synthesis, citations & dissertation draft',
  },
  {
    id: 'ui-sprint',
    title: 'UI Design & Prototyping',
    category: 'WORK',
    badge: 'WORK',
    intent: 'Design modern dark-mode checkout flow in Figma, export SVG tokens, and inspect Tailwind CSS components',
    description: 'Figma wireframes, component design tokens & CSS audit',
  },
];

export const IntentInput: React.FC<IntentInputProps> = ({
  intent,
  onChangeIntent,
  onAnalyze,
  isLoading,
  onSelectPreset,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!isLoading && intent.trim()) {
        sound.playStartChime();
        onAnalyze();
      }
    }
  };

  return (
    <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-canvas-border/70">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-zen-amber" />
          <h2 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-semibold">
            Session Intent & Focus Directive
          </h2>
        </div>
        <span className="font-mono text-[11px] text-zen-sandMuted">
          Ctrl + Enter to Parse
        </span>
      </div>

      {/* Main Editorial Textarea */}
      <div className="relative">
        <textarea
          rows={3}
          value={intent}
          onChange={(e) => onChangeIntent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your focus objective in natural language... (e.g., 'Read chapter 4 of operating systems and take notes on memory paging' or 'Fix bug in auth middleware, write Jest tests and review PRs')"
          className="w-full bg-canvas-card border border-canvas-border/80 rounded-md p-3.5 text-sm font-sans text-zen-paper placeholder-zen-sandMuted/60 focus:outline-none focus:border-zen-amber/80 focus:ring-1 focus:ring-zen-amber/30 transition-all resize-none"
        />

        {intent && (
          <button
            onClick={() => {
              sound.playTactileClick();
              onChangeIntent('');
            }}
            className="absolute right-3 top-3 text-[11px] font-mono text-zen-sandMuted hover:text-zen-paper bg-canvas-surface/80 px-1.5 py-0.5 rounded border border-canvas-border"
          >
            Clear
          </button>
        )}
      </div>

      {/* Bottom Bar: Presets & Action Trigger */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Presets Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-mono text-zen-sandMuted uppercase mr-1 whitespace-nowrap flex items-center gap-1">
            Presets:
          </span>
          {PRESETS.map((preset) => {
            const isStudy = preset.category === 'STUDY';
            return (
              <button
                key={preset.id}
                onClick={() => {
                  sound.playTactileClick();
                  onSelectPreset(preset);
                }}
                className={`whitespace-nowrap px-2.5 py-1 text-xs font-mono rounded border transition-all flex items-center space-x-1.5 ${
                  isStudy
                    ? 'border-zen-bamboo/20 bg-zen-bamboo/5 text-zen-sand hover:border-zen-bamboo/40 hover:text-zen-paper'
                    : 'border-zen-amber/20 bg-zen-amber/5 text-zen-sand hover:border-zen-amber/40 hover:text-zen-paper'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isStudy ? 'bg-zen-bamboo' : 'bg-zen-amber'
                  }`}
                />
                <span>{preset.title}</span>
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => {
            if (!isLoading && intent.trim()) {
              sound.playStartChime();
              onAnalyze();
            }
          }}
          disabled={isLoading || !intent.trim()}
          className={`flex items-center justify-center space-x-2 px-5 py-2 font-mono text-xs font-bold rounded transition-all shadow-sm ${
            isLoading || !intent.trim()
              ? 'bg-canvas-card border border-canvas-border text-zen-sandMuted cursor-not-allowed'
              : 'bg-zen-amber text-canvas-dark hover:bg-amber-400 active:scale-95 shadow-amber-subtle'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-canvas-dark border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Intent...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analyze & Build Shield</span>
              <CornerDownLeft className="w-3 h-3 opacity-60 ml-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { FocusSessionAnalysis, GoalItem } from '../types';
import {
  CheckCircle2,
  Circle,
  ShieldCheck,
  ShieldAlert,
  Code,
  Copy,
  Check,
  Plus,
  Trash2,
  BookOpen,
  Briefcase,
  Play,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { sound } from '../services/sound';

interface AnalysisReviewProps {
  analysis: FocusSessionAnalysis;
  goals: GoalItem[];
  onToggleGoal: (id: string) => void;
  onAddGoal: (text: string) => void;
  onDeleteGoal: (id: string) => void;
  onAddAllowedDomain: (domain: string) => void;
  onRemoveAllowedDomain: (domain: string) => void;
  onAddBlockedDomain: (domain: string) => void;
  onRemoveBlockedDomain: (domain: string) => void;
  onStartSession: () => void;
}

export const AnalysisReview: React.FC<AnalysisReviewProps> = ({
  analysis,
  goals,
  onToggleGoal,
  onAddGoal,
  onDeleteGoal,
  onAddAllowedDomain,
  onRemoveAllowedDomain,
  onAddBlockedDomain,
  onRemoveBlockedDomain,
  onStartSession,
}) => {
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [newGoalInput, setNewGoalInput] = useState('');
  const [newAllowedInput, setNewAllowedInput] = useState('');
  const [newBlockedInput, setNewBlockedInput] = useState('');

  const isStudy = analysis.mode === 'STUDY';

  const strictJsonOutput = JSON.stringify(
    {
      mode: analysis.mode,
      subject_summary: analysis.subject_summary,
      target_goals: analysis.target_goals,
      allowed_domains: analysis.allowed_domains,
      blocked_domains: analysis.blocked_domains,
    },
    null,
    2
  );

  const handleCopyJson = () => {
    navigator.clipboard.writeText(strictJsonOutput);
    setCopiedJson(true);
    sound.playTactileClick();
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleAddGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalInput.trim()) {
      onAddGoal(newGoalInput.trim());
      setNewGoalInput('');
      sound.playTactileClick();
    }
  };

  const handleAddAllowedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAllowedInput.trim()) {
      onAddAllowedDomain(newAllowedInput.trim());
      setNewAllowedInput('');
      sound.playTactileClick();
    }
  };

  const handleAddBlockedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlockedInput.trim()) {
      onAddBlockedDomain(newBlockedInput.trim());
      setNewBlockedInput('');
      sound.playTactileClick();
    }
  };

  return (
    <div className="space-y-6">
      {/* Session Metadata & Action Header */}
      <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-canvas-border">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider ${
                  isStudy
                    ? 'bg-zen-bamboo/15 text-zen-bamboo border border-zen-bamboo/30'
                    : 'bg-zen-amber/15 text-zen-amber border border-zen-amber/30'
                }`}
              >
                {isStudy ? <BookOpen className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                <span>MODE: {analysis.mode}</span>
              </span>

              <span className="text-[11px] font-mono text-zen-sandMuted">
                Source: {analysis.source === 'gemini' ? 'Gemini 3.8 Flash' : 'Local Heuristic Engine'}
              </span>
            </div>

            <h3 className="text-base font-semibold text-zen-paper font-sans">
              {analysis.subject_summary}
            </h3>

            {analysis.rationale && (
              <p className="text-xs text-zen-sandMuted font-sans max-w-2xl leading-relaxed">
                {analysis.rationale}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Inspect JSON Schema Button */}
            <button
              onClick={() => {
                sound.playTactileClick();
                setShowJsonModal(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-mono rounded border border-canvas-border bg-canvas-card text-zen-sand hover:text-zen-paper hover:bg-canvas-card/80 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-zen-amber" />
              <span>Inspect JSON</span>
            </button>

            {/* Launch Focus Runner */}
            <button
              onClick={() => {
                sound.playStartChime();
                onStartSession();
              }}
              className="flex items-center space-x-2 px-4 py-2 font-mono text-xs font-bold rounded bg-zen-bamboo text-canvas-dark hover:bg-emerald-400 active:scale-95 transition-all shadow-bamboo-subtle"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Zen Session</span>
            </button>
          </div>
        </div>

        {/* Core Checklist Goals */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-semibold flex items-center space-x-1.5">
              <span>Target Objectives & Sub-Goals</span>
              <span className="text-zen-sandMuted text-[11px]">
                ({goals.filter((g) => g.completed).length}/{goals.length})
              </span>
            </h4>
          </div>

          <div className="space-y-2">
            {goals.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between group p-2.5 rounded bg-canvas-card border border-canvas-border hover:border-canvas-border/80 transition-all"
              >
                <button
                  onClick={() => {
                    sound.playTactileClick();
                    onToggleGoal(g.id);
                  }}
                  className="flex items-center space-x-3 text-left flex-1"
                >
                  {g.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-zen-bamboo shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-zen-sandMuted group-hover:text-zen-amber shrink-0" />
                  )}
                  <span
                    className={`text-xs font-sans transition-all ${
                      g.completed
                        ? 'line-through text-zen-sandMuted'
                        : 'text-zen-paper group-hover:text-white'
                    }`}
                  >
                    {g.text}
                  </span>
                </button>
                <button
                  onClick={() => {
                    sound.playTactileClick();
                    onDeleteGoal(g.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-zen-sandMuted hover:text-zen-crimson transition-opacity p-1"
                  title="Remove goal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add Custom Goal input */}
            <form onSubmit={handleAddGoalSubmit} className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                placeholder="+ Add specific milestone or deliverable..."
                value={newGoalInput}
                onChange={(e) => setNewGoalInput(e.target.value)}
                className="flex-1 bg-canvas-card border border-canvas-border rounded px-3 py-1.5 text-xs text-zen-paper placeholder-zen-sandMuted focus:outline-none focus:border-zen-amber"
              />
              <button
                type="submit"
                disabled={!newGoalInput.trim()}
                className="px-3 py-1.5 text-xs font-mono rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper disabled:opacity-40"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Domain Filtering Policies: Whitelist vs Blacklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Whitelist: Allowed Domains */}
        <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5">
          <div className="flex items-center justify-between pb-3 border-b border-canvas-border">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-zen-bamboo" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-semibold">
                Allowed Whitelist
              </h4>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zen-bamboo/10 text-zen-bamboo border border-zen-bamboo/20 tabular-nums">
                {analysis.allowed_domains.length}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-zen-sandMuted font-sans py-2">
            Essential documentation, learning hubs, and repositories permitted during this session.
          </p>

          <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto py-2 scrollbar-none">
            {analysis.allowed_domains.map((dom) => (
              <span
                key={dom}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-canvas-card border border-zen-bamboo/20 text-xs font-mono text-zen-sand"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zen-bamboo" />
                <span>{dom}</span>
                <button
                  onClick={() => {
                    sound.playTactileClick();
                    onRemoveAllowedDomain(dom);
                  }}
                  className="text-zen-sandMuted hover:text-zen-crimson text-xs ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add allowed domain */}
          <form onSubmit={handleAddAllowedSubmit} className="mt-3 flex items-center space-x-2">
            <input
              type="text"
              placeholder="e.g. docs.rs, rust-lang.org"
              value={newAllowedInput}
              onChange={(e) => setNewAllowedInput(e.target.value)}
              className="flex-1 bg-canvas-card border border-canvas-border rounded px-3 py-1.5 text-xs font-mono text-zen-paper placeholder-zen-sandMuted focus:outline-none focus:border-zen-bamboo"
            />
            <button
              type="submit"
              disabled={!newAllowedInput.trim()}
              className="px-3 py-1.5 text-xs font-mono rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper disabled:opacity-40"
            >
              Allow
            </button>
          </form>
        </div>

        {/* Blacklist: Blocked Domains */}
        <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5">
          <div className="flex items-center justify-between pb-3 border-b border-canvas-border">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-zen-crimson" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-semibold">
                Blocked Blacklist
              </h4>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zen-crimson/10 text-zen-crimson border border-zen-crimson/20 tabular-nums">
                {analysis.blocked_domains.length}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-zen-sandMuted font-sans py-2">
            Social feeds, addictive entertainment, streaming, and impulse browsing blocked by shield.
          </p>

          <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto py-2 scrollbar-none">
            {analysis.blocked_domains.map((dom) => (
              <span
                key={dom}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-canvas-card border border-zen-crimson/20 text-xs font-mono text-zen-sand"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zen-crimson" />
                <span>{dom}</span>
                <button
                  onClick={() => {
                    sound.playTactileClick();
                    onRemoveBlockedDomain(dom);
                  }}
                  className="text-zen-sandMuted hover:text-zen-crimson text-xs ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add blocked domain */}
          <form onSubmit={handleAddBlockedSubmit} className="mt-3 flex items-center space-x-2">
            <input
              type="text"
              placeholder="e.g. facebook.com, netflix.com"
              value={newBlockedInput}
              onChange={(e) => setNewBlockedInput(e.target.value)}
              className="flex-1 bg-canvas-card border border-canvas-border rounded px-3 py-1.5 text-xs font-mono text-zen-paper placeholder-zen-sandMuted focus:outline-none focus:border-zen-crimson"
            />
            <button
              type="submit"
              disabled={!newBlockedInput.trim()}
              className="px-3 py-1.5 text-xs font-mono rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper disabled:opacity-40"
            >
              Block
            </button>
          </form>
        </div>
      </div>

      {/* JSON Schema Inspector Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-canvas-surface border border-canvas-border rounded-lg max-w-2xl w-full p-6 shadow-zen-elevated">
            <div className="flex items-center justify-between pb-3 border-b border-canvas-border">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-zen-amber" />
                <h3 className="text-sm font-mono font-bold text-zen-paper uppercase">
                  Strict JSON Specification Output
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center space-x-1 px-2.5 py-1 text-xs font-mono rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-zen-bamboo" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="text-zen-sandMuted hover:text-zen-paper font-mono text-sm px-1.5 py-0.5"
                >
                  [Esc]
                </button>
              </div>
            </div>

            <div className="my-4">
              <pre className="p-4 rounded bg-canvas-dark border border-canvas-border text-xs font-mono text-zen-sand overflow-x-auto max-h-96 leading-relaxed">
                {strictJsonOutput}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-canvas-border text-xs font-mono text-zen-sandMuted">
              <span>Schema: FocusSessionAnalysis</span>
              <button
                onClick={() => setShowJsonModal(false)}
                className="px-3 py-1 bg-canvas-card border border-canvas-border rounded text-zen-paper hover:bg-canvas-card/80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

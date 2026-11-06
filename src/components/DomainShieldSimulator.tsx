import React, { useState } from 'react';
import { FocusSessionAnalysis, ShieldSimulationResult } from '../types';
import { simulateDomainTest } from '../services/api';
import { sound } from '../services/sound';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Search,
  ArrowRight,
  ExternalLink,
  History,
  Terminal,
  Info,
} from 'lucide-react';

interface DomainShieldSimulatorProps {
  analysis: FocusSessionAnalysis;
}

const SAMPLE_QUICK_TESTS = [
  'reddit.com',
  'docs.python.org',
  'youtube.com',
  'github.com',
  'coursera.org',
  'netflix.com',
  'stackoverflow.com',
  'twitter.com/home',
  'amazon.com',
];

export const DomainShieldSimulator: React.FC<DomainShieldSimulatorProps> = ({
  analysis,
}) => {
  const [testUrl, setTestUrl] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentResult, setCurrentResult] = useState<ShieldSimulationResult | null>(null);
  const [history, setHistory] = useState<ShieldSimulationResult[]>([]);

  const handleTestUrl = async (urlToTest: string) => {
    if (!urlToTest.trim()) return;
    setIsEvaluating(true);

    try {
      const result = await simulateDomainTest(
        urlToTest,
        analysis.allowed_domains,
        analysis.blocked_domains,
        analysis.mode
      );

      setCurrentResult(result);
      setHistory((prev) => [result, ...prev.filter((h) => h.domain !== result.domain).slice(0, 9)]);
      sound.playShieldVerdict(result.verdict === 'ALLOWED');
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTestUrl(testUrl);
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5">
        <div className="flex items-center space-x-2 pb-2">
          <Shield className="w-4 h-4 text-zen-bamboo" />
          <h3 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-semibold">
            Interactive Domain Shield Simulator
          </h3>
        </div>
        <p className="text-xs text-zen-sandMuted font-sans leading-relaxed">
          Test any URL or domain in real time to simulate firewall routing under your active{' '}
          <strong className="text-zen-sand">{analysis.mode}</strong> session whitelist and blacklist constraints.
        </p>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zen-sandMuted" />
            <input
              type="text"
              placeholder="Enter domain or URL to test... (e.g., https://reddit.com/r/programming or docs.rs)"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-canvas-card border border-canvas-border rounded text-xs font-mono text-zen-paper placeholder-zen-sandMuted focus:outline-none focus:border-zen-bamboo"
            />
          </div>
          <button
            type="submit"
            disabled={isEvaluating || !testUrl.trim()}
            className="flex items-center space-x-1.5 px-4 py-2 font-mono text-xs font-bold rounded bg-zen-amber text-canvas-dark hover:bg-amber-400 disabled:opacity-40 transition-colors shadow-amber-subtle"
          >
            <span>Simulate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick test pills */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-mono text-zen-sandMuted uppercase mr-1">
            Quick Tests:
          </span>
          {SAMPLE_QUICK_TESTS.map((url) => (
            <button
              key={url}
              onClick={() => {
                setTestUrl(url);
                handleTestUrl(url);
              }}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper hover:border-zen-amber/40 transition-colors"
            >
              {url}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Simulator Verdict Gate Display */}
      {currentResult && (
        <div
          className={`bg-canvas-surface border rounded-lg p-6 transition-all duration-300 shadow-zen-elevated ${
            currentResult.verdict === 'ALLOWED'
              ? 'border-zen-bamboo/50 shadow-bamboo-subtle'
              : 'border-zen-crimson/50'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-canvas-border">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  currentResult.verdict === 'ALLOWED'
                    ? 'bg-zen-bamboo/15 text-zen-bamboo border border-zen-bamboo/30'
                    : 'bg-zen-crimson/15 text-zen-crimson border border-zen-crimson/30'
                }`}
              >
                {currentResult.verdict === 'ALLOWED' ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      currentResult.verdict === 'ALLOWED'
                        ? 'bg-zen-bamboo text-canvas-dark'
                        : 'bg-zen-crimson text-white'
                    }`}
                  >
                    GATE VERDICT: {currentResult.verdict}
                  </span>
                  <span className="text-xs font-mono text-zen-sandMuted">
                    {currentResult.ruleType}
                  </span>
                </div>
                <h4 className="font-mono text-base font-bold text-zen-paper mt-1">
                  {currentResult.domain}
                </h4>
              </div>
            </div>

            <div className="text-right font-mono text-[11px] text-zen-sandMuted">
              <div>ORIGINAL: {currentResult.original_input}</div>
              <div>TIMESTAMP: {new Date(currentResult.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>

          {/* Diagnostic reasoning */}
          <div className="mt-4 space-y-2">
            <div className="flex items-start space-x-2 text-xs font-sans text-zen-sand">
              <Info className="w-4 h-4 text-zen-sandMuted mt-0.5 shrink-0" />
              <span>{currentResult.reason}</span>
            </div>

            <div className="p-3 rounded bg-canvas-dark border border-canvas-border font-mono text-[11px] space-y-1 text-zen-sandMuted">
              <div>Session Mode: <span className="text-zen-paper">{analysis.mode}</span></div>
              <div>Matched Policy: <span className={currentResult.verdict === 'ALLOWED' ? 'text-zen-bamboo' : 'text-zen-crimson'}>{currentResult.ruleType}</span></div>
              <div>Enforcement Action: <span className="text-zen-paper">{currentResult.verdict === 'ALLOWED' ? 'HTTP 200 PROXY_FORWARD' : 'HTTP 403 CONNECTION_RESET / ZEN_REDIRECT'}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Simulation Log History */}
      {history.length > 0 && (
        <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-canvas-border mb-3">
            <History className="w-4 h-4 text-zen-sandMuted" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-semibold">
              Recent Inspection Log
            </h4>
          </div>

          <div className="divide-y divide-canvas-border">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="py-2.5 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.verdict === 'ALLOWED' ? 'bg-zen-bamboo' : 'bg-zen-crimson'
                    }`}
                  />
                  <span className="text-zen-paper font-medium">{item.domain}</span>
                  <span className="text-zen-sandMuted text-[10px]">({item.ruleType})</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      item.verdict === 'ALLOWED'
                        ? 'text-zen-bamboo bg-zen-bamboo/10'
                        : 'text-zen-crimson bg-zen-crimson/10'
                    }`}
                  >
                    {item.verdict}
                  </span>
                  <span className="text-zen-sandMuted text-[10px]">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Shield, Key, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../services/sound';

interface HeaderProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  geminiConnected: boolean;
  activeView: 'session' | 'simulator' | 'enforce' | 'rules';
  onChangeView: (view: 'session' | 'simulator' | 'enforce' | 'rules') => void;
  isSessionActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  apiKey,
  onSaveApiKey,
  geminiConnected,
  activeView,
  onChangeView,
  isSessionActive,
}) => {
  const [muted, setMuted] = useState(sound.getMuted());
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMute = () => {
    const nextState = sound.toggleMute();
    setMuted(nextState);
  };

  const handleSaveKey = () => {
    onSaveApiKey(tempKey.trim());
    setShowKeyModal(false);
  };

  return (
    <>
      <header className="border-b border-canvas-border bg-canvas-dark/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded border border-zen-amber/30 bg-zen-amber/10 flex items-center justify-center text-zen-amber shadow-amber-subtle">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs tracking-widest text-zen-sand uppercase font-bold">
                  ZENFOCUS
                </span>
                <span className="text-canvas-border">/</span>
                <span className="text-[11px] font-mono text-zen-sandMuted">
                  v3.8-FLASH
                </span>
                {isSessionActive && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-zen-bamboo/15 text-zen-bamboo border border-zen-bamboo/30 animate-pulse">
                    Shield Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zen-sandMuted font-sans hidden sm:block">
                Intelligent Focus Session & Domain Guard
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-canvas-surface p-1 rounded-md border border-canvas-border">
            <button
              onClick={() => {
                sound.playTactileClick();
                onChangeView('session');
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                activeView === 'session'
                  ? 'bg-canvas-card text-zen-amber border border-zen-amber/20 shadow-sm'
                  : 'text-zen-sandMuted hover:text-zen-paper hover:bg-canvas-card/50'
              }`}
            >
              01 // Focus Runner
            </button>
            <button
              onClick={() => {
                sound.playTactileClick();
                onChangeView('simulator');
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                activeView === 'simulator'
                  ? 'bg-canvas-card text-zen-bamboo border border-zen-bamboo/20 shadow-sm'
                  : 'text-zen-sandMuted hover:text-zen-paper hover:bg-canvas-card/50'
              }`}
            >
              02 // Simulator
            </button>
            <button
              onClick={() => {
                sound.playTactileClick();
                onChangeView('enforce');
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                activeView === 'enforce'
                  ? 'bg-canvas-card text-zen-amber border border-zen-amber/20 shadow-sm'
                  : 'text-zen-sandMuted hover:text-zen-paper hover:bg-canvas-card/50'
              }`}
            >
              03 // Real Blocker
            </button>
            <button
              onClick={() => {
                sound.playTactileClick();
                onChangeView('rules');
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                activeView === 'rules'
                  ? 'bg-canvas-card text-zen-paper border border-canvas-border shadow-sm'
                  : 'text-zen-sandMuted hover:text-zen-paper hover:bg-canvas-card/50'
              }`}
            >
              04 // Export & Rules
            </button>
          </nav>

          {/* Right Tools: Clock, Sound, API Key */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1 text-xs font-mono text-zen-sandMuted tabular-nums">
              <span>SYS.TIME</span>
              <span className="text-zen-paper font-semibold">{timeStr}</span>
            </div>

            <div className="h-4 w-px bg-canvas-border hidden md:block" />

            {/* Mute/Audio toggle */}
            <button
              onClick={handleToggleMute}
              title={muted ? 'Unmute Zen Chimes' : 'Mute Zen Chimes'}
              className={`p-2 rounded border transition-colors ${
                muted
                  ? 'border-canvas-border text-zen-sandMuted hover:text-zen-paper hover:bg-canvas-card'
                  : 'border-zen-amber/40 bg-zen-amber/10 text-zen-amber'
              }`}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* API Key Modal Button */}
            <button
              onClick={() => {
                sound.playTactileClick();
                setShowKeyModal(true);
              }}
              title="Configure Gemini API Key"
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-mono rounded border transition-colors ${
                apiKey || geminiConnected
                  ? 'border-zen-bamboo/30 bg-zen-bamboo/10 text-zen-bamboo hover:bg-zen-bamboo/20'
                  : 'border-canvas-border bg-canvas-surface text-zen-sandMuted hover:text-zen-paper hover:bg-canvas-card'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {apiKey || geminiConnected ? 'AI Ready' : 'AI Offline/Heuristic'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Key Config Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-canvas-surface border border-canvas-border rounded-lg max-w-md w-full p-6 shadow-zen-elevated">
            <div className="flex items-center justify-between pb-3 border-b border-canvas-border">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-zen-amber" />
                <h3 className="text-sm font-mono font-bold text-zen-paper uppercase">
                  Gemini AI Engine Setup
                </h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-zen-sandMuted hover:text-zen-paper font-mono text-sm"
              >
                [Esc]
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs font-sans text-zen-sand">
              <p>
                ZenFocus uses Gemini 3.8 Flash for structured intent parsing and automated whitelist/blacklist creation.
              </p>
              <div className="p-3 rounded bg-canvas-card border border-canvas-border font-mono text-[11px] text-zen-sandMuted">
                <div>Status: <span className={apiKey || geminiConnected ? "text-zen-bamboo" : "text-zen-amber"}>{apiKey || geminiConnected ? 'CONNECTED' : 'STANDALONE HEURISTIC ACTIVE'}</span></div>
                <div>Model: <span className="text-zen-paper">gemini-3.8-flash</span></div>
              </div>
              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-zen-sand uppercase">
                  Gemini API Key (Optional)
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-canvas-card border border-canvas-border rounded px-3 py-2 text-xs font-mono text-zen-paper focus:outline-none focus:border-zen-amber"
                />
                <p className="text-[10px] text-zen-sandMuted">
                  If left empty, ZenFocus automatically utilizes its high-precision local heuristic engine with instant offline response.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-canvas-border">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-3 py-1.5 text-xs font-mono text-zen-sandMuted hover:text-zen-paper"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-1.5 bg-zen-amber text-canvas-dark font-mono text-xs font-bold rounded hover:bg-amber-400 transition-colors shadow-amber-subtle"
              >
                Save & Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

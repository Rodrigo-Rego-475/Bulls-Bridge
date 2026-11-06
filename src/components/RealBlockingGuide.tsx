import React, { useState } from 'react';
import {
  ShieldAlert,
  Puzzle,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { sound } from '../services/sound';

interface RealBlockingGuideProps {
  isSessionActive: boolean;
  blockedCount: number;
  blockAction: 'CLOSE_WINDOW' | 'LOCK_WINDOW';
  onChangeBlockAction: (action: 'CLOSE_WINDOW' | 'LOCK_WINDOW') => void;
}

export const RealBlockingGuide: React.FC<RealBlockingGuideProps> = ({
  isSessionActive,
  blockedCount,
  blockAction,
  onChangeBlockAction,
}) => {
  const [copiedPath, setCopiedPath] = useState(false);
  const [copiedPs, setCopiedPs] = useState(false);

  const extensionPath = `C:\\Users\\caua_m\\Desktop\\agprojects\\test\\extension`;
  const psCommand = `powershell -ExecutionPolicy Bypass -File .\\scripts\\apply-hosts.ps1`;

  const handleCopyPath = () => {
    navigator.clipboard.writeText(extensionPath);
    setCopiedPath(true);
    sound.playTactileClick();
    setTimeout(() => setCopiedPath(false), 2000);
  };

  const handleCopyPs = () => {
    navigator.clipboard.writeText(psCommand);
    setCopiedPs(true);
    sound.playTactileClick();
    setTimeout(() => setCopiedPs(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Preference Switcher */}
      <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-canvas-border">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-bold">
              Window Enforcement Action While Timer Is Running
            </h3>
            <p className="text-xs text-zen-sandMuted font-sans">
              Choose what happens the instant a blacklisted site (YouTube, Reddit, Netflix, etc.) is opened:
            </p>
          </div>
          <span className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase border ${isSessionActive ? 'bg-zen-bamboo/15 text-zen-bamboo border-zen-bamboo/30' : 'bg-canvas-card text-zen-sandMuted border-canvas-border'}`}>
            {isSessionActive ? 'Timer Active: Enforcing' : 'Timer Idle'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => {
              sound.playTactileClick();
              onChangeBlockAction('CLOSE_WINDOW');
            }}
            className={`p-3.5 rounded border text-left transition-all ${
              blockAction === 'CLOSE_WINDOW'
                ? 'bg-canvas-card border-zen-crimson text-zen-paper shadow-sm'
                : 'bg-canvas-card/50 border-canvas-border text-zen-sandMuted hover:border-canvas-border/80'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-zen-crimson uppercase">
                ⚡ Option 1: Instantly Close Window
              </span>
              {blockAction === 'CLOSE_WINDOW' && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zen-crimson/20 text-zen-crimson">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-zen-sand leading-relaxed">
              Instantly shuts down the tab or window the millisecond a blacklisted website is navigated to. Zero hesitation.
            </p>
          </button>

          <button
            onClick={() => {
              sound.playTactileClick();
              onChangeBlockAction('LOCK_WINDOW');
            }}
            className={`p-3.5 rounded border text-left transition-all ${
              blockAction === 'LOCK_WINDOW'
                ? 'bg-canvas-card border-zen-amber text-zen-paper shadow-sm'
                : 'bg-canvas-card/50 border-canvas-border text-zen-sandMuted hover:border-canvas-border/80'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-zen-amber uppercase">
                🛡️ Option 2: Full-Screen Lockout Overlay
              </span>
              {blockAction === 'LOCK_WINDOW' && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zen-amber/20 text-zen-amber">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-zen-sand leading-relaxed">
              Redirects the window to an impenetrable ZenFocus lockout shield with session directive and "Close Window" button.
            </p>
          </button>
        </div>
      </div>
      {/* Educational Notice */}
      <div className="bg-canvas-card border border-zen-amber/30 rounded-lg p-5">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-zen-amber shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zen-amber font-bold">
              Why Websites Are Not Blocked By Default Inside A Browser Tab
            </h3>
            <p className="text-xs text-zen-sand font-sans leading-relaxed">
              For security, web browsers sandbox regular web pages (like this dashboard) from interfering with your other tabs or modifying your operating system network traffic.
            </p>
            <p className="text-xs text-zen-sandMuted font-sans leading-relaxed pt-1">
              To actually block real distraction websites in Chrome, Brave, Edge, or across Windows, ZenFocus includes <strong>two pre-built blocking bridges</strong>:
            </p>
          </div>
        </div>
      </div>

      {/* Method 1: The Included Chrome/Edge Extension */}
      <div className="bg-canvas-surface border border-canvas-border rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-canvas-border">
          <div className="flex items-center space-x-2">
            <Puzzle className="w-5 h-5 text-zen-bamboo" />
            <div>
              <h4 className="font-mono text-sm font-bold text-zen-paper">
                Option A: ZenFocus Live Browser Extension (Recommended)
              </h4>
              <p className="text-xs text-zen-sandMuted font-sans">
                Takes 10 seconds. Automatically redirects blocked sites to ZenFocus during active sessions.
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-zen-bamboo/15 text-zen-bamboo border border-zen-bamboo/30">
            Zero Admin Rights Needed
          </span>
        </div>

        <div className="mt-4 space-y-3 text-xs font-sans text-zen-sand">
          <div className="flex items-start space-x-2">
            <span className="font-mono text-zen-amber font-bold">1.</span>
            <span>
              Open your browser's extension settings (e.g., visit <code className="bg-canvas-card px-1.5 py-0.5 rounded text-zen-paper font-mono">chrome://extensions</code> or <code className="bg-canvas-card px-1.5 py-0.5 rounded text-zen-paper font-mono">edge://extensions</code>).
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="font-mono text-zen-amber font-bold">2.</span>
            <span>
              Toggle on <strong>Developer Mode</strong> (switch in top-right corner).
            </span>
          </div>

          <div className="flex items-start space-x-2">
            <span className="font-mono text-zen-amber font-bold">3.</span>
            <span>
              Click <strong>"Load unpacked"</strong> and select the pre-built extension folder:
            </span>
          </div>

          {/* Path copy box */}
          <div className="flex items-center space-x-2 bg-canvas-dark border border-canvas-border rounded p-2.5 font-mono text-[11px]">
            <span className="text-zen-paper flex-1 truncate">{extensionPath}</span>
            <button
              onClick={handleCopyPath}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper shrink-0"
            >
              {copiedPath ? (
                <>
                  <Check className="w-3.5 h-3.5 text-zen-bamboo" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Path</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-zen-sandMuted pt-1">
            ✓ Done! Whenever you click "Start Focus Run", the extension automatically synchronizes with ZenFocus and intercepts blacklisted websites!
          </p>
        </div>
      </div>

      {/* Method 2: System-Wide Hosts Blocker */}
      <div className="bg-canvas-surface border border-canvas-border rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-canvas-border">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-zen-amber" />
            <div>
              <h4 className="font-mono text-sm font-bold text-zen-paper">
                Option B: Windows System Hosts Null-Router
              </h4>
              <p className="text-xs text-zen-sandMuted font-sans">
                Blocks websites at the OS level across ALL browsers, apps, and background processes.
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-zen-amber/15 text-zen-amber border border-zen-amber/30">
            System-Wide
          </span>
        </div>

        <div className="mt-4 space-y-3 text-xs font-sans text-zen-sand">
          <p>
            Run the included PowerShell script in an Administrator console to immediately point all {blockedCount} distraction domains to <code className="font-mono text-zen-amber">0.0.0.0</code>:
          </p>

          <div className="flex items-center space-x-2 bg-canvas-dark border border-canvas-border rounded p-2.5 font-mono text-[11px]">
            <span className="text-zen-amber flex-1 truncate">{psCommand}</span>
            <button
              onClick={handleCopyPs}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper shrink-0"
            >
              {copiedPs ? (
                <>
                  <Check className="w-3.5 h-3.5 text-zen-bamboo" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-zen-sandMuted">
            To restore access after your session, run: <code className="bg-canvas-card px-1.5 py-0.5 rounded font-mono text-zen-paper">powershell -ExecutionPolicy Bypass -File .\scripts\restore-hosts.ps1</code>
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { FocusSessionAnalysis } from '../types';
import {
  FileText,
  Copy,
  Check,
  Download,
  Terminal,
  Code2,
  Globe,
  ShieldAlert,
} from 'lucide-react';
import { sound } from '../services/sound';

interface ExportModalProps {
  analysis: FocusSessionAnalysis;
}

export const ExportModal: React.FC<ExportModalProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<'json' | 'hosts' | 'extension' | 'pihole'>('json');
  const [copied, setCopied] = useState(false);

  // Generate /etc/hosts format
  const hostsContent = `# ZenFocus Focus Session Blocker Rules
# Session: ${analysis.subject_summary}
# Mode: ${analysis.mode}
# Generated: ${new Date().toISOString()}

127.0.0.1 localhost
::1 localhost

# Active Blacklist Domains
${analysis.blocked_domains.map((d) => `0.0.0.0 ${d}\n0.0.0.0 www.${d}`).join('\n')}
`;

  // Generate Chrome/Brave/Edge DeclarativeNetRequest ruleset JSON
  const extensionRuleset = JSON.stringify(
    analysis.blocked_domains.map((domain, index) => ({
      id: index + 1,
      priority: 1,
      action: {
        type: 'block',
      },
      condition: {
        urlFilter: `||${domain}`,
        resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest', 'websocket'],
      },
    })),
    null,
    2
  );

  // Generate Pi-hole / AdGuard filter list
  const piholeContent = `! ZenFocus AdBlock / Pi-hole Filter List
! Mode: ${analysis.mode} - ${analysis.subject_summary}
! Updated: ${new Date().toISOString()}

${analysis.blocked_domains.map((d) => `||${d}^`).join('\n')}
`;

  // Raw Strict JSON
  const strictJson = JSON.stringify(
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

  let currentContent = strictJson;
  let currentFilename = 'zenfocus-session.json';
  if (activeTab === 'hosts') {
    currentContent = hostsContent;
    currentFilename = 'hosts';
  } else if (activeTab === 'extension') {
    currentContent = extensionRuleset;
    currentFilename = 'declarative_rules.json';
  } else if (activeTab === 'pihole') {
    currentContent = piholeContent;
    currentFilename = 'zenfocus-filter.txt';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    sound.playTactileClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    sound.playTactileClick();
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-canvas-border">
          <div>
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-zen-amber" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-semibold">
                Export & Rule Integration
              </h3>
            </div>
            <p className="text-xs text-zen-sandMuted font-sans mt-0.5">
              Export your generated whitelist and blacklist policies directly into real operating system, browser, or DNS blockers.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-zen-bamboo" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded bg-zen-amber text-canvas-dark hover:bg-amber-400 transition-colors shadow-amber-subtle"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center space-x-2 my-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              sound.playTactileClick();
              setActiveTab('json');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-colors whitespace-nowrap ${
              activeTab === 'json'
                ? 'bg-canvas-card border-zen-amber text-zen-amber font-bold'
                : 'border-canvas-border text-zen-sandMuted hover:text-zen-paper'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>01 // Strict JSON Schema</span>
          </button>

          <button
            onClick={() => {
              sound.playTactileClick();
              setActiveTab('hosts');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-colors whitespace-nowrap ${
              activeTab === 'hosts'
                ? 'bg-canvas-card border-zen-amber text-zen-amber font-bold'
                : 'border-canvas-border text-zen-sandMuted hover:text-zen-paper'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // /etc/hosts Format</span>
          </button>

          <button
            onClick={() => {
              sound.playTactileClick();
              setActiveTab('extension');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-colors whitespace-nowrap ${
              activeTab === 'extension'
                ? 'bg-canvas-card border-zen-amber text-zen-amber font-bold'
                : 'border-canvas-border text-zen-sandMuted hover:text-zen-paper'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>03 // Chrome Extension (DNR)</span>
          </button>

          <button
            onClick={() => {
              sound.playTactileClick();
              setActiveTab('pihole');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-colors whitespace-nowrap ${
              activeTab === 'pihole'
                ? 'bg-canvas-card border-zen-amber text-zen-amber font-bold'
                : 'border-canvas-border text-zen-sandMuted hover:text-zen-paper'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>04 // Pi-hole & AdBlock</span>
          </button>
        </div>

        {/* Code Preview Box */}
        <div className="relative">
          <pre className="p-4 rounded bg-canvas-dark border border-canvas-border text-xs font-mono text-zen-sand overflow-x-auto max-h-96 leading-relaxed selection:bg-zen-amber selection:text-canvas-dark">
            {currentContent}
          </pre>
        </div>

        {/* Instructions banner */}
        <div className="mt-4 p-3 rounded bg-canvas-card border border-canvas-border text-[11px] font-mono text-zen-sandMuted">
          {activeTab === 'json' && (
            <p>
              Adheres strictly to the requested schema: <code>mode</code>, <code>subject_summary</code>, <code>target_goals</code>, <code>allowed_domains</code>, and <code>blocked_domains</code>.
            </p>
          )}
          {activeTab === 'hosts' && (
            <p>
              Paste this block into <code>/etc/hosts</code> (Linux/macOS) or <code>C:\Windows\System32\drivers\etc\hosts</code> (Windows with admin elevation) to enforce OS-level domain null routing.
            </p>
          )}
          {activeTab === 'extension' && (
            <p>
              Standard Chrome/Edge Manifest V3 <code>declarativeNetRequest</code> ruleset. Can be used in custom browser extensions or injected into blocker frameworks.
            </p>
          )}
          {activeTab === 'pihole' && (
            <p>
              Compatible with DNS-level ad blockers like Pi-hole, AdGuard Home, or browser content blockers like uBlock Origin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

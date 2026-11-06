import React, { useState, useEffect } from 'react';
import { FocusSessionAnalysis, GoalItem, SessionState, SessionDuration } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Circle,
  Wind,
  Layers,
  ArrowLeft,
  Infinity as InfinityIcon,
  Award,
  Lock,
} from 'lucide-react';
import { sound } from '../services/sound';
import { ProofOfWorkModal } from './ProofOfWorkModal';

interface ZenSessionRunnerProps {
  analysis: FocusSessionAnalysis;
  goals: GoalItem[];
  onToggleGoal: (id: string) => void;
  sessionState: SessionState;
  onChangeSessionState: (state: SessionState) => void;
  onBackToConfig: () => void;
  apiKey: string;
}

export const ZenSessionRunner: React.FC<ZenSessionRunnerProps> = ({
  analysis,
  goals,
  onToggleGoal,
  sessionState,
  onChangeSessionState,
  onBackToConfig,
  apiKey,
}) => {
  const [duration, setDuration] = useState<SessionDuration>('OPEN_FLOW');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(25 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [showProofModal, setShowProofModal] = useState(false);

  const isStudy = analysis.mode === 'STUDY';
  const isOpenFlow = duration === 'OPEN_FLOW';

  // Timer intervals
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (sessionState === 'ACTIVE') {
      timer = setInterval(() => {
        // Track total elapsed time for proof-of-work
        setElapsedSeconds((prev) => prev + 1);

        if (!isOpenFlow) {
          setTimeLeftSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(timer as NodeJS.Timeout);
              onChangeSessionState('COMPLETED');
              sound.playCompleteBell();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sessionState, isOpenFlow, onChangeSessionState]);

  // Breathing guide cycle (4s inhale, 4s hold, 4s exhale)
  useEffect(() => {
    if (sessionState !== 'ACTIVE') return;
    const breathInterval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);
    return () => clearInterval(breathInterval);
  }, [sessionState]);

  const handleSelectDuration = (selected: SessionDuration) => {
    // If an Open Flow session has started, locking is enforced to prevent bypassing verification
    if (sessionState === 'ACTIVE' || sessionState === 'PAUSED' || (isOpenFlow && elapsedSeconds > 0 && sessionState !== 'COMPLETED')) {
      return;
    }
    setDuration(selected);
    if (selected === 'OPEN_FLOW') {
      setElapsedSeconds(0);
    } else {
      setTimeLeftSeconds(selected * 60);
    }
    sound.playTactileClick();
  };

  const handleStartResume = () => {
    if (sessionState === 'IDLE' || sessionState === 'COMPLETED') {
      sound.playStartChime();
    } else {
      sound.playTactileClick();
    }
    onChangeSessionState('ACTIVE');
  };

  const handlePause = () => {
    sound.playTactileClick();
    onChangeSessionState('PAUSED');
  };

  const handleReset = () => {
    // Open flow sessions CANNOT be reset while active or paused to prevent bypassing verification.
    // Once the user passes the quiz / proof of completion (COMPLETED), restarting is unlocked!
    if (isOpenFlow && sessionState !== 'COMPLETED') {
      sound.playShieldVerdict(false);
      return;
    }
    sound.playTactileClick();
    onChangeSessionState('IDLE');
    setElapsedSeconds(0);
    if (!isOpenFlow) {
      setTimeLeftSeconds((duration as number) * 60);
    }
  };

  // Stop session request: triggers the Proof of Work exit challenge
  const handleRequestEndSession = () => {
    sound.playTactileClick();
    setShowProofModal(true);
  };

  const handleVerifiedComplete = () => {
    setShowProofModal(false);
    onChangeSessionState('COMPLETED');
    sound.playCompleteBell();
  };

  // Time format calculations
  let formattedTime = '00:00';
  if (isOpenFlow) {
    const hours = Math.floor(elapsedSeconds / 3600);
    const m = Math.floor((elapsedSeconds % 3600) / 60);
    const s = elapsedSeconds % 60;
    formattedTime = hours > 0
      ? `${String(hours).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  } else {
    const mins = Math.floor(timeLeftSeconds / 60);
    const secs = timeLeftSeconds % 60;
    formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // Circular gauge calculations
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  let strokeDashoffset = 0;

  if (isOpenFlow) {
    // Continuous dynamic rotation / pulse for open flow
    const flowStep = (elapsedSeconds % 60) / 60;
    strokeDashoffset = circumference - flowStep * circumference;
  } else {
    const totalSeconds = (duration as number) * 60;
    const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - timeLeftSeconds) / totalSeconds) * 100));
    strokeDashoffset = circumference - (progressPercent / 100) * circumference;
  }

  const completedGoalsCount = goals.filter((g) => g.completed).length;

  return (
    <div className="space-y-6">
      {/* Top back navigation & status */}
      <div className="flex items-center justify-between pb-2 border-b border-canvas-border">
        {isOpenFlow && (sessionState === 'ACTIVE' || sessionState === 'PAUSED' || (elapsedSeconds > 0 && sessionState !== 'COMPLETED')) ? (
          <div
            title="Navigation locked: You cannot leave an open flow session without verifying completed work."
            className="flex items-center space-x-1.5 text-xs font-mono text-zen-sandMuted opacity-60 cursor-not-allowed select-none"
          >
            <Lock className="w-3.5 h-3.5 text-zen-amber" />
            <span>Config Locked During Active Flow</span>
          </div>
        ) : (
          <button
            onClick={onBackToConfig}
            className="flex items-center space-x-1.5 text-xs font-mono text-zen-sandMuted hover:text-zen-paper transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Focus Intent & Domain Rules</span>
          </button>
        )}

        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-zen-bamboo animate-pulse" />
          <span className="text-xs font-mono text-zen-paper uppercase">
            Shield Active: {analysis.blocked_domains.length} Blacklisted / {analysis.allowed_domains.length} Whitelisted
          </span>
        </div>
      </div>

      {/* Main Focus Area: Circular Gauge & Timer */}
      <div className="bg-canvas-surface border border-canvas-border rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-zen-elevated">
        {/* Subtle background ambient pulse glow */}
        <div
          className={`absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
            sessionState === 'ACTIVE'
              ? isStudy
                ? 'bg-zen-bamboo/10 opacity-100'
                : 'bg-zen-amber/10 opacity-100'
              : 'opacity-0'
          }`}
        />

        {/* Duration selector tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 z-10">
          <button
            onClick={() => handleSelectDuration('OPEN_FLOW')}
            disabled={sessionState === 'ACTIVE' || sessionState === 'PAUSED' || (isOpenFlow && elapsedSeconds > 0 && sessionState !== 'COMPLETED')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-all ${
              isOpenFlow
                ? 'border-zen-amber bg-zen-amber/15 text-zen-amber font-bold shadow-amber-subtle'
                : 'border-canvas-border bg-canvas-card text-zen-sandMuted hover:text-zen-paper'
            } ${sessionState === 'ACTIVE' || (isOpenFlow && elapsedSeconds > 0 && sessionState !== 'COMPLETED') ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <InfinityIcon className="w-3.5 h-3.5" />
            <span>Open Flow (Proof Required)</span>
          </button>

          {[25, 50, 90].map((minsOption) => (
            <button
              key={minsOption}
              onClick={() => handleSelectDuration(minsOption as SessionDuration)}
              disabled={sessionState === 'ACTIVE' || sessionState === 'PAUSED' || (isOpenFlow && elapsedSeconds > 0 && sessionState !== 'COMPLETED')}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
                duration === minsOption
                  ? 'border-zen-bamboo/60 bg-zen-bamboo/15 text-zen-bamboo font-bold shadow-sm'
                  : 'border-canvas-border bg-canvas-card text-zen-sandMuted hover:text-zen-paper'
              } ${sessionState === 'ACTIVE' || (isOpenFlow && elapsedSeconds > 0 && sessionState !== 'COMPLETED') ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {minsOption}m {minsOption === 25 ? 'Pomodoro' : minsOption === 50 ? 'Sprint' : 'Deep'}
            </button>
          ))}
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative w-64 h-64 flex items-center justify-center z-10">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r={radius}
              className="text-canvas-card"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="128"
              cy="128"
              r={radius}
              className={`transition-all duration-700 ${
                isStudy ? 'text-zen-bamboo' : 'text-zen-amber'
              }`}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center Info: Time, Mode, Breath guide */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span
              className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border mb-1 ${
                isStudy
                  ? 'border-zen-bamboo/30 bg-zen-bamboo/10 text-zen-bamboo'
                  : 'border-zen-amber/30 bg-zen-amber/10 text-zen-amber'
              }`}
            >
              {isOpenFlow ? '∞ OPEN FLOW' : `${analysis.mode} ZEN`}
            </span>

            <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-zen-paper tabular-nums my-1">
              {formattedTime}
            </div>

            {isOpenFlow && (
              <span className="text-[10px] font-mono text-zen-amber flex items-center space-x-1">
                <Lock className="w-3 h-3 inline" />
                <span>Exit Requires Proof of Work</span>
              </span>
            )}

            {sessionState === 'ACTIVE' && (
              <div className="flex items-center space-x-1.5 text-xs font-mono text-zen-sand mt-1 animate-pulse">
                <Wind className="w-3.5 h-3.5 text-zen-sandMuted" />
                <span>Breath: {breathPhase}</span>
              </div>
            )}

            {sessionState === 'PAUSED' && (
              <span className="text-xs font-mono text-zen-amber mt-1">SESSION PAUSED</span>
            )}

            {sessionState === 'COMPLETED' && (
              <span className="text-xs font-mono text-zen-bamboo font-bold mt-1">SESSION COMPLETE</span>
            )}
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 z-10">
          {sessionState === 'ACTIVE' ? (
            <>
              <button
                onClick={handlePause}
                className="flex items-center space-x-2 px-5 py-2.5 rounded bg-canvas-card border border-canvas-border text-zen-sand hover:text-zen-paper hover:bg-canvas-elevated font-mono text-xs font-bold transition-all"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>

              <button
                onClick={handleRequestEndSession}
                className="flex items-center space-x-2 px-6 py-2.5 rounded bg-zen-crimson/90 hover:bg-zen-crimson text-white font-mono text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <Award className="w-4 h-4" />
                <span>Stop Session & Prove Work</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleStartResume}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded font-mono text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isStudy
                    ? 'bg-zen-bamboo text-canvas-dark hover:bg-emerald-400 shadow-bamboo-subtle'
                    : 'bg-zen-amber text-canvas-dark hover:bg-amber-400 shadow-amber-subtle'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {sessionState === 'PAUSED'
                    ? 'Resume Session'
                    : isOpenFlow
                    ? 'Start Open Flow Session'
                    : 'Start Focus Run'}
                </span>
              </button>

              {isOpenFlow && elapsedSeconds > 0 && sessionState !== 'COMPLETED' && (
                <button
                  onClick={handleRequestEndSession}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded bg-canvas-card border border-zen-amber/40 text-zen-amber hover:bg-canvas-elevated font-mono text-xs font-bold transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Verify Work & Unlock</span>
                </button>
              )}
            </>
          )}

          {isOpenFlow && sessionState !== 'COMPLETED' ? (
            <div
              title="Restart Blocked: In Open Flow sessions, you must complete the Proof of Work exit checker before restarting."
              className="flex items-center space-x-1.5 px-3 py-2 rounded bg-canvas-card/30 border border-zen-crimson/30 text-[11px] font-mono text-zen-sandMuted cursor-not-allowed select-none"
            >
              <Lock className="w-3.5 h-3.5 text-zen-crimson" />
              <span>Restart Blocked (Anti-Bypass)</span>
            </div>
          ) : (
            <button
              onClick={handleReset}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded border font-mono text-xs font-bold transition-all ${
                sessionState === 'COMPLETED'
                  ? 'border-zen-bamboo bg-zen-bamboo/15 text-zen-bamboo hover:bg-zen-bamboo/25 shadow-bamboo-subtle'
                  : 'p-2.5 bg-canvas-card border-canvas-border text-zen-sandMuted hover:text-zen-paper hover:bg-canvas-elevated'
              }`}
              title={sessionState === 'COMPLETED' ? 'Session Complete - Restart / Start New Session' : 'Reset Timer'}
            >
              <RotateCcw className="w-4 h-4" />
              {sessionState === 'COMPLETED' && <span>Restart / New Flow</span>}
            </button>
          )}
        </div>
      </div>

      {/* Real-time Sub-Goal Checklist */}
      <div className="bg-canvas-surface border border-canvas-border rounded-lg p-5">
        <div className="flex items-center justify-between pb-3 border-b border-canvas-border mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-zen-amber" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-semibold">
              Live Goal Execution Checklist
            </h4>
          </div>
          <span className="text-xs font-mono text-zen-sandMuted">
            {completedGoalsCount} of {goals.length} Completed ({Math.round((completedGoalsCount / (goals.length || 1)) * 100)}%)
          </span>
        </div>

        <div className="space-y-2">
          {goals.map((g) => (
            <div
              key={g.id}
              onClick={() => {
                sound.playTactileClick();
                onToggleGoal(g.id);
              }}
              className={`flex items-center space-x-3 p-3 rounded border cursor-pointer transition-all ${
                g.completed
                  ? 'bg-canvas-card/60 border-zen-bamboo/20 text-zen-sandMuted'
                  : 'bg-canvas-card border-canvas-border text-zen-paper hover:border-canvas-border/90'
              }`}
            >
              {g.completed ? (
                <CheckCircle2 className="w-4 h-4 text-zen-bamboo shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-zen-sandMuted hover:text-zen-amber shrink-0" />
              )}
              <span className={`text-xs font-sans ${g.completed ? 'line-through text-zen-sandMuted' : ''}`}>
                {g.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Proof of Work Exit Gateway Modal */}
      {showProofModal && (
        <ProofOfWorkModal
          analysis={analysis}
          goals={goals}
          elapsedSeconds={elapsedSeconds}
          apiKey={apiKey}
          onVerifiedAndComplete={handleVerifiedComplete}
          onCancelReturnToSession={() => setShowProofModal(false)}
        />
      )}
    </div>
  );
};

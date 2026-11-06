import React, { useState, useEffect } from 'react';
import { FocusSessionAnalysis, GoalItem, QuizQuestion, VerificationResult } from '../types';
import { generateQuiz, verifyWorkProof } from '../services/api';
import { sound } from '../services/sound';
import {
  ShieldAlert,
  ShieldCheck,
  Award,
  Sparkles,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Upload,
  ArrowRight,
  RotateCcw,
  Lock,
  Unlock,
} from 'lucide-react';

interface ProofOfWorkModalProps {
  analysis: FocusSessionAnalysis;
  goals: GoalItem[];
  elapsedSeconds: number;
  apiKey: string;
  onVerifiedAndComplete: () => void;
  onCancelReturnToSession: () => void;
}

export const ProofOfWorkModal: React.FC<ProofOfWorkModalProps> = ({
  analysis,
  goals,
  elapsedSeconds,
  apiKey,
  onVerifiedAndComplete,
  onCancelReturnToSession,
}) => {
  const isStudy = analysis.mode === 'STUDY';
  const [activeTab, setActiveTab] = useState<'evidence' | 'quiz'>(isStudy ? 'quiz' : 'evidence');

  // Text/Image evidence state
  const [evidenceType, setEvidenceType] = useState<'text' | 'image'>('text');
  const [textContent, setTextContent] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  // Evaluation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Format elapsed time
  const hours = Math.floor(elapsedSeconds / 3600);
  const mins = Math.floor((elapsedSeconds % 3600) / 60);
  const secs = elapsedSeconds % 60;
  const timeFormatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // Fetch quiz questions on mount if study mode or quiz tab
  useEffect(() => {
    let isMounted = true;
    setIsLoadingQuiz(true);
    generateQuiz(
      analysis.subject_summary,
      analysis.subject_summary,
      analysis.target_goals,
      apiKey
    )
      .then((res) => {
        if (isMounted && res.questions && res.questions.length > 0) {
          setQuizQuestions(res.questions);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingQuiz(false);
      });

    return () => {
      isMounted = false;
    };
  }, [analysis, apiKey]);

  // Handle image upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageBase64(reader.result);
        sound.playTactileClick();
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit Text/Image Evidence for Evaluation
  const handleEvaluateEvidence = async () => {
    if (evidenceType === 'text' && !textContent.trim()) return;
    if (evidenceType === 'image' && !imageBase64) return;

    setIsEvaluating(true);
    try {
      const result = await verifyWorkProof({
        intent: analysis.subject_summary,
        subject_summary: analysis.subject_summary,
        target_goals: analysis.target_goals,
        mode: analysis.mode,
        submissionType: evidenceType,
        textContent: evidenceType === 'text' ? textContent : undefined,
        imageBase64: evidenceType === 'image' ? imageBase64 || undefined : undefined,
        userApiKey: apiKey,
      });

      setVerificationResult(result);
      if (result.verified) {
        sound.playCompleteBell();
      } else {
        sound.playShieldVerdict(false);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Submit Quiz for Evaluation
  const handleEvaluateQuiz = async () => {
    const total = quizQuestions.length;
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    setIsEvaluating(true);
    try {
      const result = await verifyWorkProof({
        intent: analysis.subject_summary,
        subject_summary: analysis.subject_summary,
        target_goals: analysis.target_goals,
        mode: analysis.mode,
        submissionType: 'quiz',
        quizScore: score,
        totalQuestions: total,
        userApiKey: apiKey,
      });

      setVerificationResult(result);
      if (result.verified) {
        sound.playCompleteBell();
      } else {
        sound.playShieldVerdict(false);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  const allQuizAnswered = quizQuestions.length > 0 && quizQuestions.every((_, idx) => selectedAnswers[idx] !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-canvas-surface border border-canvas-border rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-zen-elevated overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-canvas-border flex items-center justify-between bg-canvas-card/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded border border-zen-amber/40 bg-zen-amber/10 flex items-center justify-center text-zen-amber">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-zen-paper font-bold">
                  Exit Challenge // Proof of Work Gate
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zen-amber/15 text-zen-amber border border-zen-amber/30">
                  Elapsed: {timeFormatted}
                </span>
              </div>
              <p className="text-[11px] text-zen-sandMuted font-sans">
                To complete this open flow session and restore browsing, substantiate your focus output.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTactileClick();
              onCancelReturnToSession();
            }}
            className="text-xs font-mono text-zen-sandMuted hover:text-zen-paper px-2 py-1 rounded border border-canvas-border hover:bg-canvas-card"
          >
            Keep Working
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Active Session Goal Reminder */}
          <div className="bg-canvas-card border border-canvas-border/80 rounded-lg p-3.5 text-xs">
            <span className="font-mono text-[10px] text-zen-sandMuted uppercase tracking-wider block mb-1">
              SESSION TARGET ({analysis.mode}):
            </span>
            <p className="font-sans font-semibold text-zen-paper">
              {analysis.subject_summary}
            </p>
          </div>

          {/* Verification Verdict Screen (If evaluated) */}
          {verificationResult ? (
            <div
              className={`p-5 rounded-lg border transition-all ${
                verificationResult.verified
                  ? 'bg-zen-bamboo/10 border-zen-bamboo/50 shadow-bamboo-subtle'
                  : 'bg-zen-crimson/10 border-zen-crimson/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                {verificationResult.verified ? (
                  <CheckCircle2 className="w-6 h-6 text-zen-bamboo shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-zen-crimson shrink-0 mt-0.5" />
                )}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        verificationResult.verified ? 'text-zen-bamboo' : 'text-zen-crimson'
                      }`}
                    >
                      {verificationResult.verified ? 'Proof-of-Work Accepted' : 'Evidence Insufficient'}
                    </span>
                    <span className="font-mono text-xs font-bold text-zen-paper">
                      Score: {verificationResult.score}/100
                    </span>
                  </div>

                  <p className="text-xs text-zen-sand leading-relaxed">
                    {verificationResult.feedback}
                  </p>

                  {verificationResult.highlights && verificationResult.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {verificationResult.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-canvas-card border border-canvas-border text-[11px] font-mono text-zen-sand"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 flex items-center justify-end space-x-2">
                    {verificationResult.verified ? (
                      <button
                        onClick={() => {
                          sound.playCompleteBell();
                          onVerifiedAndComplete();
                        }}
                        className="flex items-center space-x-2 px-5 py-2 font-mono text-xs font-bold rounded bg-zen-bamboo text-canvas-dark hover:bg-emerald-400 shadow-bamboo-subtle transition-all"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Unlock Session & Lift Shield</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sound.playTactileClick();
                          setVerificationResult(null);
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2 font-mono text-xs font-bold rounded bg-canvas-card border border-canvas-border text-zen-paper hover:bg-canvas-elevated"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Revise Submission / Try Again</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selector: Evidence vs Quiz */}
              <div className="flex items-center space-x-2 border-b border-canvas-border pb-3">
                <button
                  onClick={() => {
                    sound.playTactileClick();
                    setActiveTab('evidence');
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                    activeTab === 'evidence'
                      ? 'bg-canvas-card text-zen-amber border border-zen-amber/40 font-bold'
                      : 'text-zen-sandMuted hover:text-zen-paper'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>01 // Submit Work Sample or Screenshot</span>
                </button>

                <button
                  onClick={() => {
                    sound.playTactileClick();
                    setActiveTab('quiz');
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                    activeTab === 'quiz'
                      ? 'bg-canvas-card text-zen-bamboo border border-zen-bamboo/40 font-bold'
                      : 'text-zen-sandMuted hover:text-zen-paper'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>02 // Conceptual Knowledge Challenge (Quiz)</span>
                </button>
              </div>

              {/* TAB 1: WORK EVIDENCE */}
              {activeTab === 'evidence' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="text-zen-sandMuted">Proof Format:</span>
                    <button
                      onClick={() => setEvidenceType('text')}
                      className={`px-2.5 py-1 rounded border transition-colors ${
                        evidenceType === 'text'
                          ? 'border-zen-amber text-zen-amber bg-zen-amber/10'
                          : 'border-canvas-border text-zen-sandMuted'
                      }`}
                    >
                      Text / Notes / Code
                    </button>
                    <button
                      onClick={() => setEvidenceType('image')}
                      className={`px-2.5 py-1 rounded border transition-colors ${
                        evidenceType === 'image'
                          ? 'border-zen-amber text-zen-amber bg-zen-amber/10'
                          : 'border-canvas-border text-zen-sandMuted'
                      }`}
                    >
                      Screenshot / Image Upload
                    </button>
                  </div>

                  {evidenceType === 'text' ? (
                    <div className="space-y-1">
                      <textarea
                        rows={6}
                        placeholder="Paste your completed notes summary, code snippet, PR branch diff, or paragraph describing what you accomplished during this session..."
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        className="w-full bg-canvas-card border border-canvas-border rounded-lg p-3 text-xs font-mono text-zen-paper placeholder-zen-sandMuted focus:outline-none focus:border-zen-amber"
                      />
                      <span className="text-[10px] font-mono text-zen-sandMuted">
                        Words: {textContent.trim() ? textContent.trim().split(/\s+/).length : 0} (Minimum ~15 words for validation)
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <label className="border-2 border-dashed border-canvas-border hover:border-zen-amber/50 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-canvas-card/40">
                        <Upload className="w-6 h-6 text-zen-amber mb-2" />
                        <span className="text-xs font-mono text-zen-paper">
                          Click or drag screenshot here to upload
                        </span>
                        <span className="text-[10px] font-sans text-zen-sandMuted mt-1">
                          PNG, JPG, or WEBP (Capturing code editor, notes, or terminal output)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>

                      {imageBase64 && (
                        <div className="relative border border-canvas-border rounded-lg overflow-hidden max-h-48">
                          <img
                            src={imageBase64}
                            alt="Uploaded work proof"
                            className="w-full object-cover max-h-48"
                          />
                          <button
                            onClick={() => setImageBase64(null)}
                            className="absolute top-2 right-2 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-zen-crimson border border-zen-crimson/40"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-sans text-zen-sandMuted">
                      Evaluated by Gemini AI Verification Protocol
                    </span>
                    <button
                      onClick={handleEvaluateEvidence}
                      disabled={isEvaluating || (evidenceType === 'text' && !textContent.trim()) || (evidenceType === 'image' && !imageBase64)}
                      className="flex items-center space-x-2 px-5 py-2 font-mono text-xs font-bold rounded bg-zen-amber text-canvas-dark hover:bg-amber-400 disabled:opacity-40 transition-colors shadow-amber-subtle"
                    >
                      {isEvaluating ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-canvas-dark border-t-transparent rounded-full animate-spin" />
                          <span>Evaluating Proof...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Verify Proof & Unlock</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: KNOWLEDGE QUIZ */}
              {activeTab === 'quiz' && (
                <div className="space-y-4">
                  {isLoadingQuiz ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="w-6 h-6 border-2 border-zen-amber border-t-transparent rounded-full animate-spin" />
                      <p className="font-mono text-xs text-zen-sandMuted">
                        Generating customized conceptual quiz for: {analysis.subject_summary}...
                      </p>
                    </div>
                  ) : quizQuestions.length === 0 ? (
                    <div className="text-center py-6 text-xs text-zen-sandMuted">
                      Could not generate quiz. You can submit text or screenshot evidence in Tab 01 instead.
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="text-xs text-zen-sand font-sans">
                        Answer these 3 conceptual questions to demonstrate comprehension of your study subject:
                      </div>

                      {quizQuestions.map((q, qIdx) => (
                        <div
                          key={q.id}
                          className="bg-canvas-card border border-canvas-border rounded-lg p-4 space-y-3"
                        >
                          <div className="font-sans text-xs font-semibold text-zen-paper">
                            <span className="font-mono text-zen-amber mr-1.5">Q{qIdx + 1}.</span>
                            {q.question}
                          </div>

                          <div className="space-y-1.5">
                            {q.options.map((opt, optIdx) => (
                              <label
                                key={optIdx}
                                onClick={() => sound.playTactileClick()}
                                className={`flex items-start space-x-2.5 p-2 rounded cursor-pointer transition-colors text-xs font-sans ${
                                  selectedAnswers[qIdx] === optIdx
                                    ? 'bg-zen-amber/15 border border-zen-amber/40 text-zen-paper'
                                    : 'hover:bg-canvas-elevated/50 text-zen-sand'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${qIdx}`}
                                  checked={selectedAnswers[qIdx] === optIdx}
                                  onChange={() =>
                                    setSelectedAnswers((prev) => ({
                                      ...prev,
                                      [qIdx]: optIdx,
                                    }))
                                  }
                                  className="mt-0.5 accent-[#E5A93C]"
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-mono text-zen-sandMuted">
                          Passing requirement: 2 of 3 correct
                        </span>
                        <button
                          onClick={handleEvaluateQuiz}
                          disabled={isEvaluating || !allQuizAnswered}
                          className="flex items-center space-x-2 px-5 py-2 font-mono text-xs font-bold rounded bg-zen-bamboo text-canvas-dark hover:bg-emerald-400 disabled:opacity-40 transition-colors shadow-bamboo-subtle"
                        >
                          {isEvaluating ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-canvas-dark border-t-transparent rounded-full animate-spin" />
                              <span>Grading Answers...</span>
                            </>
                          ) : (
                            <>
                              <Award className="w-3.5 h-3.5" />
                              <span>Grade & Verify Comprehension</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

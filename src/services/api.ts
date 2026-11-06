import { FocusSessionAnalysis, ShieldSimulationResult } from '../types';

export const API_BASE = '/api';

export async function analyzeFocusIntent(
  intent: string,
  userApiKey?: string
): Promise<FocusSessionAnalysis> {
  try {
    const res = await fetch(`${API_BASE}/analyze-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent,
        apiKey: userApiKey,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with ${res.status}`);
    }

    const data: FocusSessionAnalysis = await res.json();
    return data;
  } catch (error) {
    console.warn('API error, using local fallback parser:', error);
    return localFallbackAnalysis(intent);
  }
}

export async function simulateDomainTest(
  url: string,
  allowed_domains: string[],
  blocked_domains: string[],
  mode: 'STUDY' | 'WORK'
): Promise<ShieldSimulationResult> {
  try {
    const res = await fetch(`${API_BASE}/simulate-domain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        allowed_domains,
        blocked_domains,
        mode,
      }),
    });

    if (!res.ok) {
      throw new Error('Simulation endpoint error');
    }

    return await res.json();
  } catch {
    // Client-side simulation fallback
    return localSimulateDomain(url, allowed_domains, blocked_domains, mode);
  }
}

export async function checkServerHealth(): Promise<{ gemini_configured: boolean; status: string }> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback
  }
  return { gemini_configured: false, status: 'offline' };
}

export async function syncSessionState(state: {
  isActive: boolean;
  mode: string;
  subject_summary: string;
  blockAction?: 'CLOSE_WINDOW' | 'LOCK_WINDOW';
  blocked_domains: string[];
  allowed_domains: string[];
}): Promise<void> {
  try {
    await fetch(`${API_BASE}/session-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
  } catch (err) {
    console.debug('Failed to sync session state with backend:', err);
  }
}

export async function generateQuiz(
  intent: string,
  subject_summary: string,
  target_goals: string[],
  userApiKey?: string
): Promise<{ questions: import('../types').QuizQuestion[] }> {
  try {
    const res = await fetch(`${API_BASE}/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intent, subject_summary, target_goals, apiKey: userApiKey }),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Failed to call generate-quiz API:', err);
  }
  return { questions: [] };
}

export async function verifyWorkProof(payload: {
  intent: string;
  subject_summary: string;
  target_goals: string[];
  mode: string;
  submissionType: 'text' | 'image' | 'quiz';
  textContent?: string;
  imageBase64?: string;
  quizScore?: number;
  totalQuestions?: number;
  userApiKey?: string;
}): Promise<import('../types').VerificationResult> {
  try {
    const res = await fetch(`${API_BASE}/verify-work`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Failed to call verify-work API:', err);
  }
  return {
    verified: false,
    score: 0,
    feedback: 'Could not contact verification server. Please ensure local server is running.',
  };
}

// Local simulation fallback logic
function localSimulateDomain(
  url: string,
  allowed_domains: string[],
  blocked_domains: string[],
  mode: 'STUDY' | 'WORK'
): ShieldSimulationResult {
  let cleanDomain = url.trim().toLowerCase();
  cleanDomain = cleanDomain.replace(/^[a-zA-Z]+:\/\//, '');
  cleanDomain = cleanDomain.replace(/\/.*$/, '');
  cleanDomain = cleanDomain.replace(/:\d+$/, '');
  cleanDomain = cleanDomain.replace(/^www\./, '');

  const isExplicitBlocked = blocked_domains.some((d) => {
    const cleanD = d.toLowerCase().replace(/^www\./, '').trim();
    return cleanDomain === cleanD || cleanDomain.endsWith('.' + cleanD);
  });

  const isExplicitAllowed = allowed_domains.some((d) => {
    const cleanD = d.toLowerCase().replace(/^www\./, '').trim();
    return cleanDomain === cleanD || cleanDomain.endsWith('.' + cleanD);
  });

  if (isExplicitBlocked) {
    return {
      domain: cleanDomain,
      original_input: url,
      verdict: 'BLOCKED',
      ruleType: 'BLACKLIST_MATCH',
      reason: 'Explicitly blocked by active distraction shield ruleset.',
      timestamp: new Date().toISOString(),
    };
  }

  if (isExplicitAllowed) {
    return {
      domain: cleanDomain,
      original_input: url,
      verdict: 'ALLOWED',
      ruleType: 'WHITELIST_MATCH',
      reason: `Explicitly allowed as essential productivity resource for ${mode} session.`,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    domain: cleanDomain,
    original_input: url,
    verdict: 'BLOCKED',
    ruleType: 'STRICT_DEFAULT_DROP',
    reason: 'Strict zen session policy: Unlisted domain is automatically filtered to protect focus intent.',
    timestamp: new Date().toISOString(),
  };
}

// Local fallback analysis
function localFallbackAnalysis(intent: string): FocusSessionAnalysis {
  const lower = (intent || '').toLowerCase();
  const studyKeywords = [
    'read', 'chapter', 'study', 'learn', 'course', 'lecture', 'notes', 'textbook',
    'exam', 'cram', 'quiz', 'paper', 'thesis', 'literature review', 'physics',
    'math', 'biology', 'chemistry', 'history', 'operating systems', 'memory paging',
    'algorithm', 'data structure', 'research', 'revision', 'homework', 'tutorial'
  ];
  
  const workKeywords = [
    'fix bug', 'middleware', 'jest', 'pr', 'pull request', 'refactor', 'deploy',
    'code', 'feature', 'backend', 'frontend', 'docker', 'kubernetes', 'sprint',
    'jira', 'client', 'meeting', 'review pr', 'git', 'release', 'commit', 'auth',
    'database', 'sql', 'api', 'endpoint', 'debug', 'architecture', 'design sprint'
  ];

  let studyScore = 0;
  let workScore = 0;
  for (const kw of studyKeywords) if (lower.includes(kw)) studyScore += 1.5;
  for (const kw of workKeywords) if (lower.includes(kw)) workScore += 1.5;

  const mode: 'STUDY' | 'WORK' = (studyScore >= workScore && studyScore > 0) ? 'STUDY' : 'WORK';

  let subject_summary = intent.trim();
  if (subject_summary.length > 80) subject_summary = subject_summary.slice(0, 77) + '...';

  const target_goals: string[] = [];
  if (lower.includes('memory paging') || lower.includes('operating systems')) {
    target_goals.push('Review memory paging architecture & page table structures');
    target_goals.push('Synthesize lecture notes on virtual memory & TLB caching');
    target_goals.push('Solve 3 practical memory address translation exercises');
  } else if (lower.includes('auth') || lower.includes('middleware') || lower.includes('jest')) {
    target_goals.push('Isolate token validation regression in auth middleware');
    target_goals.push('Write comprehensive Jest test suite with 100% branch coverage');
    target_goals.push('Complete peer PR reviews & verify CI/CD pipelines');
  } else if (lower.includes('algorithm') || lower.includes('cram')) {
    target_goals.push('Understand time & space complexity bounds for core algorithms');
    target_goals.push('Implement and dry-run 3 graph/dynamic programming problems');
    target_goals.push('Create quick reference cheat-sheet for edge cases');
  } else if (lower.includes('thesis') || lower.includes('literature')) {
    target_goals.push('Synthesize findings from key recent academic publications');
    target_goals.push('Extract methodology comparisons into structured notes');
    target_goals.push('Draft related-work chapter section draft');
  } else if (mode === 'STUDY') {
    target_goals.push(`Active reading and annotation for: ${intent.slice(0, 45)}`);
    target_goals.push('Draft structured conceptual summaries without distraction');
    target_goals.push('Self-test key concepts and clarify ambiguous points');
  } else {
    target_goals.push(`Implement core objective: ${intent.slice(0, 45)}`);
    target_goals.push('Validate implementation with unit and integration tests');
    target_goals.push('Document architectural changes and update review notes');
  }

  const allowed_domains: string[] = mode === 'STUDY'
    ? [
        'en.wikipedia.org',
        'scholar.google.com',
        'arxiv.org',
        'jstor.org',
        'coursera.org',
        'edx.org',
        'khanacademy.org',
        'docs.python.org',
        'github.com',
        'stackoverflow.com'
      ]
    : [
        'github.com',
        'gitlab.com',
        'stackoverflow.com',
        'developer.mozilla.org',
        'docs.docker.com',
        'linear.app',
        'atlassian.net',
        'jestjs.io',
        'testing-library.com'
      ];

  const blocked_domains: string[] = [
    'youtube.com',
    'twitter.com',
    'x.com',
    'reddit.com',
    'instagram.com',
    'tiktok.com',
    'facebook.com',
    'netflix.com',
    'twitch.tv',
    'hulu.com',
    'disneyplus.com',
    'primevideo.com',
    'news.ycombinator.com',
    'buzzfeed.com',
    'amazon.com',
    'ebay.com',
    'aliexpress.com',
    'discord.com',
    'steampowered.com'
  ];

  return {
    mode,
    subject_summary,
    target_goals,
    allowed_domains,
    blocked_domains,
    rationale: mode === 'STUDY'
      ? 'Intent emphasizes conceptual acquisition, academic reading, note synthesis, or revision, requiring scholarly resources while eliminating social feeds and video streaming.'
      : 'Intent revolves around active technical execution, debugging, testing, or engineering delivery, requiring source control and documentation while restricting communicative noise and recreational browsing.',
    source: 'heuristic'
  };
}

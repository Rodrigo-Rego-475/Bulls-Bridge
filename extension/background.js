// ZenFocus Background Worker - Real-time Window Closer & Blocker

const SYNC_URL = 'http://localhost:3001/api/extension-rules';

let isSessionActive = false;
let blockedDomains = [];
let blockAction = 'CLOSE_WINDOW'; // 'CLOSE_WINDOW' or 'LOCK_WINDOW'

// Check if a URL matches any blacklisted domain
function isUrlBlocked(url) {
  if (!url || !isSessionActive || blockedDomains.length === 0) return false;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
    return blockedDomains.some((d) => {
      const cleanD = d.toLowerCase().replace(/^www\./, '').trim();
      return hostname === cleanD || hostname.endsWith('.' + cleanD);
    });
  } catch {
    // If not a valid URL or chrome://, fallback string check
    const lower = url.toLowerCase();
    return blockedDomains.some((d) => lower.includes(d.toLowerCase()));
  }
}

// Action: Close the tab/window or redirect to lockout screen
async function enforceTab(tabId, url) {
  if (!isUrlBlocked(url)) return;

  console.log(`[ZenFocus Enforcer] Blacklisted window detected: ${url}`);

  if (blockAction === 'CLOSE_WINDOW') {
    try {
      // Instantly close the tab / window
      await chrome.tabs.remove(tabId);
      console.log(`[ZenFocus Enforcer] Successfully closed tab/window ${tabId}`);
    } catch (e) {
      console.debug('Tab already closed or invalid:', e);
    }
  } else {
    // Redirect to full-screen lockout page
    try {
      const matchedDomain = blockedDomains.find((d) => url.toLowerCase().includes(d.toLowerCase())) || 'blacklisted';
      await chrome.tabs.update(tabId, {
        url: `http://localhost:5173/blocked.html?domain=${encodeURIComponent(matchedDomain)}`,
      });
    } catch (e) {
      console.debug('Failed to redirect tab:', e);
    }
  }
}

// Close all existing open tabs that are blacklisted
async function purgeExistingBlockedTabs() {
  if (!isSessionActive || blockedDomains.length === 0) return;
  try {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.url && tab.id && isUrlBlocked(tab.url)) {
        await enforceTab(tab.id, tab.url);
      }
    }
  } catch (err) {
    console.debug('Error scanning existing tabs:', err);
  }
}

// Sync rules with ZenFocus local server
async function syncWithServer() {
  try {
    const res = await fetch(SYNC_URL);
    if (!res.ok) return;
    const data = await res.json();

    const wasActive = isSessionActive;
    isSessionActive = Boolean(data.isActive);
    blockedDomains = data.blockedDomains || [];
    blockAction = data.blockAction || 'CLOSE_WINDOW';

    // If timer just started, purge any already open blacklisted tabs immediately!
    if (!wasActive && isSessionActive) {
      console.log('[ZenFocus Enforcer] Timer ACTIVATED! Scanning and purging existing blacklisted tabs...');
      await purgeExistingBlockedTabs();
    }

    // Also update declarativeNetRequest rules as a second-layer firewall
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map((r) => r.id);

    if (!isSessionActive || blockedDomains.length === 0) {
      if (existingRuleIds.length > 0) {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: existingRuleIds,
          addRules: [],
        });
      }
    } else {
      const newRules = blockedDomains.map((domain, index) => ({
        id: index + 1,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            url: `http://localhost:5173/blocked.html?domain=${encodeURIComponent(domain)}`,
          },
        },
        condition: {
          urlFilter: `||${domain}`,
          resourceTypes: ['main_frame', 'sub_frame'],
        },
      }));

      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds,
        addRules: newRules,
      });
    }
  } catch (err) {
    // server unreachable
  }
}

// 1. Listen for tab navigation updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = changeInfo.url || tab.url;
  if (url) {
    enforceTab(tabId, url);
  }
});

// 2. Listen for newly created tabs
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url && tab.id) {
    enforceTab(tab.id, tab.url);
  }
});

// 3. Listen for webNavigation beforeNavigate for ultra-fast interception
if (chrome.webNavigation && chrome.webNavigation.onBeforeNavigate) {
  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.frameId === 0 && details.tabId && details.url) {
      enforceTab(details.tabId, details.url);
    }
  });
}

// Run server sync polling every 1.5 seconds
setInterval(syncWithServer, 1500);

// Initial sync
syncWithServer();

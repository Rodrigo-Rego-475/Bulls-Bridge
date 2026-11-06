async function checkStatus() {
  const badge = document.getElementById('statusBadge');
  const text = document.getElementById('statusText');
  const domainContainer = document.getElementById('domainContainer');
  const domainList = document.getElementById('domainList');

  try {
    const res = await fetch('http://localhost:3001/api/extension-rules');
    if (!res.ok) throw new Error('Not ok');
    const data = await res.json();

    if (data.isActive) {
      badge.textContent = 'SHIELD ACTIVE';
      badge.className = 'badge active';
      text.textContent = `Mode: ${data.mode} | Blocking ${data.blockedCount} distraction domains in real time.`;
      
      if (data.blockedDomains && data.blockedDomains.length > 0) {
        domainContainer.style.display = 'block';
        domainList.innerHTML = data.blockedDomains.map(d => `<div class="domain-item">• ${d}</div>`).join('');
      } else {
        domainContainer.style.display = 'none';
      }
    } else {
      badge.textContent = 'IDLE';
      badge.className = 'badge inactive';
      text.textContent = 'ZenFocus session is not active. Websites are currently accessible.';
      domainContainer.style.display = 'none';
    }
  } catch (err) {
    badge.textContent = 'OFFLINE';
    badge.className = 'badge inactive';
    text.textContent = 'Could not reach http://localhost:3001. Ensure ZenFocus is running.';
    domainContainer.style.display = 'none';
  }
}

checkStatus();
setInterval(checkStatus, 2000);

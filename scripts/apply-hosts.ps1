# ZenFocus Windows Hosts Blocker Script
# Run this PowerShell script as Administrator to null-route distraction websites to 0.0.0.0

$hostsPath = "$env:windir\System32\drivers\etc\hosts"
$backupPath = "$env:windir\System32\drivers\etc\hosts.zenfocus.backup"

# Fetch active blacklist from ZenFocus
Write-Host "Connecting to ZenFocus server at http://localhost:3001/api/session-state..." -ForegroundColor Cyan
try {
    $session = Invoke-RestMethod -Uri "http://localhost:3001/api/session-state" -Method Get
} catch {
    Write-Warning "Could not reach ZenFocus server. Using default distraction blacklist."
    $session = @{
        blocked_domains = @("youtube.com", "reddit.com", "twitter.com", "x.com", "instagram.com", "tiktok.com", "facebook.com", "netflix.com", "twitch.tv")
    }
}

# Create backup if not exists
if (-not (Test-Path $backupPath)) {
    Copy-Item -Path $hostsPath -Destination $backupPath -Force
    Write-Host "Created backup of hosts file at $backupPath" -ForegroundColor Green
}

# Read current content and strip previous ZenFocus block
$current = Get-Content $hostsPath -Raw -ErrorAction SilentlyContinue
$clean = $current -replace "(?s)# BEGIN ZENFOCUS.*?# END ZENFOCUS", ""

$blockBlock = "`r`n# BEGIN ZENFOCUS FOCUS SHIELD`r`n"
foreach ($domain in $session.blocked_domains) {
    $blockBlock += "0.0.0.0 $domain`r`n"
    $blockBlock += "0.0.0.0 www.$domain`r`n"
}
$blockBlock += "# END ZENFOCUS FOCUS SHIELD`r`n"

$finalContent = ($clean.Trim() + $blockBlock).Trim()
Set-Content -Path $hostsPath -Value $finalContent -Force

# Flush DNS cache
ipconfig /flushdns | Out-Null
Write-Host "SUCCESS: ZenFocus Shield applied to Windows hosts file!" -ForegroundColor Green
Write-Host "Blocked domains ($($session.blocked_domains.Count)): $($session.blocked_domains -join ', ')" -ForegroundColor Yellow
Write-Host "To remove blocks, run: .\scripts\restore-hosts.ps1" -ForegroundColor Cyan

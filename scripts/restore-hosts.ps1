# ZenFocus Restore Hosts Script
# Run this PowerShell script as Administrator to restore unblocked internet access

$hostsPath = "$env:windir\System32\drivers\etc\hosts"
$backupPath = "$env:windir\System32\drivers\etc\hosts.zenfocus.backup"

if (Test-Path $hostsPath) {
    $current = Get-Content $hostsPath -Raw -ErrorAction SilentlyContinue
    $clean = $current -replace "(?s)# BEGIN ZENFOCUS.*?# END ZENFOCUS FOCUS SHIELD`r?`n?", ""
    Set-Content -Path $hostsPath -Value $clean.Trim() -Force
    ipconfig /flushdns | Out-Null
    Write-Host "SUCCESS: ZenFocus Shield rules removed from hosts file. Internet restored!" -ForegroundColor Green
} else {
    Write-Warning "Hosts file not found at $hostsPath"
}

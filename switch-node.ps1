# Simple Node.js version switcher
# Run this before starting the legacy app

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("14", "24", "legacy", "modern")]
    [string]$Version = "14"
)

# Map aliases to versions
$nodeVersion = switch ($Version) {
    "legacy" { "14.21.3" }
    "modern" { "24.8.0" }
    "14" { "14.21.3" }
    "24" { "24.8.0" }
    default { $Version }
}

Write-Host "Switching to Node.js $nodeVersion..." -ForegroundColor Cyan
nvm use $nodeVersion

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Switched to Node.js $nodeVersion" -ForegroundColor Green
    node --version
} else {
    Write-Host "❌ Failed to switch Node version" -ForegroundColor Red
    Write-Host "Make sure you have installed: nvm install $nodeVersion" -ForegroundColor Yellow
}

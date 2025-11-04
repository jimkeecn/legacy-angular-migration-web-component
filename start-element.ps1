# Run Angular 20 Web Component (investor-detail-element)
# Usage: ./start-element.ps1

Write-Host "Starting Angular 20 Web Component..." -ForegroundColor Green
Write-Host "Node version required: 24.8.0" -ForegroundColor Yellow
Write-Host ""

# Check if running from correct directory
if (-not (Test-Path "apps/investor-detail-element")) {
    Write-Host "Error: Please run this script from the workspace root" -ForegroundColor Red
    exit 1
}

# Change to app directory
Set-Location "apps/investor-detail-element"

# Check Node version
$nodeVersion = node --version
Write-Host "Current Node version: $nodeVersion" -ForegroundColor Cyan

if (-not ($nodeVersion -like "v24.*")) {
    Write-Host "Warning: Expected Node v24.x.x, got $nodeVersion" -ForegroundColor Yellow
    Write-Host "Attempting to switch with nvm..." -ForegroundColor Yellow
    nvm use 24.8.0
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the dev server
Write-Host ""
Write-Host "Starting dev server on http://localhost:4201..." -ForegroundColor Green
npm start

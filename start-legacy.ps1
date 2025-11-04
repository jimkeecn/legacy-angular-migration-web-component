# Run Angular 10 App (main-legacy-app)
# Usage: ./start-legacy.ps1

Write-Host "Starting Angular 10 Legacy Application..." -ForegroundColor Green
Write-Host "Node version required: 14.21.3" -ForegroundColor Yellow
Write-Host ""

# Check if running from correct directory
if (-not (Test-Path "apps/main-legacy-app")) {
    Write-Host "Error: Please run this script from the workspace root" -ForegroundColor Red
    exit 1
}

# Change to app directory
Set-Location "apps/main-legacy-app"

# Check Node version
$nodeVersion = node --version
Write-Host "Current Node version: $nodeVersion" -ForegroundColor Cyan

if (-not ($nodeVersion -like "v14.*")) {
    Write-Host "Warning: Expected Node v14.x.x, got $nodeVersion" -ForegroundColor Yellow
    Write-Host "Attempting to switch with nvm..." -ForegroundColor Yellow
    nvm use 14.21.3
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the dev server
Write-Host ""
Write-Host "Starting dev server on http://localhost:4200..." -ForegroundColor Green
npm start

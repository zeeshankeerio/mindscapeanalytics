# PowerShell script to run the development server
Write-Host "Starting Mindscape development server..." -ForegroundColor Cyan

# Navigate to the project directory
Set-Location $PSScriptRoot

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path -Path "./node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Run the Next.js development server
npm run dev 
# PowerShell script to run the development server
Write-Host "Starting Mindscape development server..." -ForegroundColor Cyan

param(
    [switch]$optimize,
    [switch]$verify,
    [switch]$fastBuild
)

# Navigate to the project directory
Set-Location $PSScriptRoot

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path -Path "./node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Generate Prisma client
npm run prisma:generate

# Always create the placeholder image if it doesn't exist
if (-not (Test-Path -Path "./public/images/placeholder.jpg")) {
    Write-Host "Creating placeholder image..." -ForegroundColor Yellow
    npm run create:placeholder
}

if ($verify) {
    # Verify images before starting
    Write-Host "Verifying images..." -ForegroundColor Yellow
    npm run verify:images
}

if ($optimize) {
    # Run with optimizations enabled
    Write-Host "Running with optimizations enabled..." -ForegroundColor Green
    
    # Optimize images first
    npm run prepare:images
    
    # Run Next.js in production mode with optimizations
    npm run build:prod
    npm run start:prod
} elseif ($fastBuild) {
    # Fast build mode (minimal optimizations)
    Write-Host "Running with fast build mode..." -ForegroundColor Yellow
    npm run build:fast
    npm run start
} else {
    # Regular development mode
    Write-Host "Running in development mode..." -ForegroundColor Cyan
    npm run dev
} 
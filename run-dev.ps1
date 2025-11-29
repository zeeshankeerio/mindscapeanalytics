# PowerShell script to run the development server
Write-Host "Starting Mindscape development server..." -ForegroundColor Cyan

param(
    [switch]$optimize,
    [switch]$verify,
    [switch]$fastBuild
)

# Navigate to the project directory
Set-Location $PSScriptRoot

# Check for .env.local file and create it if it doesn't exist
if (-not (Test-Path -Path "./.env.local")) {
    Write-Host "No .env.local file found. Creating from example..." -ForegroundColor Yellow
    if (Test-Path -Path "./.env.local.example") {
        Copy-Item -Path "./.env.local.example" -Destination "./.env.local"
        Write-Host "Created .env.local from example. Please update with your actual values." -ForegroundColor Yellow
    } else {
        Write-Host "No .env.local.example file found. Creating empty .env.local file..." -ForegroundColor Yellow
        New-Item -Path "./.env.local" -ItemType "file" -Force
        Set-Content -Path "./.env.local" -Value "# Environment Variables`nNODE_ENV=development`nNEXTAUTH_URL=http://localhost:3000`nNEXTAUTH_SECRET=your-nextauth-secret`nDATABASE_URL=`"postgresql://user:password@localhost:5432/mindscape-db`"`nOPENAI_API_KEY=your-openai-api-key"
        Write-Host "Created .env.local with default values. Please update with your actual values." -ForegroundColor Yellow
    }
}

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
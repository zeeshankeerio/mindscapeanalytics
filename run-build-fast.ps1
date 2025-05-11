# PowerShell script to run an optimized fast build
$env:NEXT_DISABLE_PRERENDER = "true"
$env:NEXT_TELEMETRY_DISABLED = "1"
$env:NODE_OPTIONS = "--max-old-space-size=4096"

Write-Host "Starting optimized fast build..."
npm run build:fast 
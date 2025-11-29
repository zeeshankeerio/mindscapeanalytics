# PowerShell script to run the development server on a specific port
param(
    [int]$Port = 3000
)

Write-Host "Starting development server on port $Port"
$env:PORT = $Port
npm run dev 
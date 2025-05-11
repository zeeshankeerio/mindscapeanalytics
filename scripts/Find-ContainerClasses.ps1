# Container Pattern Scanner for Windows PowerShell
# This script finds container class patterns that need to be migrated to the FlexibleSection component

# Banner
Write-Host ""
Write-Host "==============================================================="
Write-Host "  MINDSCAPE ANALYTICS - CONTAINER MIGRATION SCANNER FOR WINDOWS"
Write-Host "==============================================================="
Write-Host ""

Write-Host "Searching for container class patterns to migrate..."
Write-Host ""

# Define patterns to search for
$patterns = @(
    "container mx-auto",
    "px-4 md:px-6"
)

# Search for patterns in files
$results = @()
foreach ($pattern in $patterns) {
    $foundItems = Get-ChildItem -Recurse -Include *.tsx,*.jsx,*.js | Select-String -Pattern $pattern
    $results += $foundItems
}

# Filter out duplicates and excluded directories
$filteredResults = $results | 
    Where-Object { 
        -not $_.Path.Contains("node_modules") -and
        -not $_.Path.Contains(".next") -and
        -not $_.Path.Contains(".git") -and
        -not $_.Path.Contains("Find-ContainerClasses.ps1")
    } | 
    Sort-Object Path, LineNumber -Unique

# Output findings
if ($filteredResults.Count -gt 0) {
    Write-Host "Found $($filteredResults.Count) potential container patterns to migrate:"
    Write-Host ""
    
    $index = 1
    foreach ($result in $filteredResults) {
        Write-Host "$index. $($result.Path):$($result.LineNumber)"
        Write-Host "   $($result.Line.Trim())"
        Write-Host ""
        $index++
    }
    
    Write-Host "Migration Options:"
    Write-Host "1. Use FlexibleSection component (recommended)"
    Write-Host "2. Use getContainerClasses utility"
    Write-Host ""
    Write-Host "See docs/layout-migration.md for more details."
} else {
    Write-Host "No container patterns found! All components might already be migrated."
}

Write-Host ""
Write-Host "To update components, run: node scripts/update-all-sections.js" 
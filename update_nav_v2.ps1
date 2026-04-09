$targetDir = "C:\Users\kevin_patel\OneDrive\Documents\GitHub\project\viewpage"

$newBackBtn = '<a href="javascript:history.back()" class="page-back-btn" title="Go Back"><i class="fa-solid fa-arrow-left"></i></a>'

$newNavBlock = @"
      <ul class="nav-links-desktop">
        <li><a href="../index.html">HOME</a></li>
        <li><a href="../about.html">ABOUT</a></li>
        <li>
          <a href="../temples.html">TEMPLES <i class="fa-solid fa-chevron-down" style="font-size: 0.6rem;"></i></a>
          <ul class="dropdown-menu">
            <li><a href="../temples.html#char-dham">Char Dham</a></li>
            <li><a href="../temples.html#shakti-peethas">Shakti Peethas</a></li>
            <li><a href="../temples.html#north-india">North India</a></li>
            <li><a href="../temples.html#south-india">South India</a></li>
            <li><a href="../temples.html#east-india">East India</a></li>
            <li><a href="../temples.html#west-india">West India</a></li>
            <li><a href="../temples.html#modern-temples">Modern Temples</a></li>
            <li><a href="../temples.html#krishna-temples">Krishna Temples</a></li>
          </ul>
        </li>
        <li><a href="../jyotirlinga.html">JYOTIRLINGAS</a></li>
        <li class="nav-search-container">
          <button id="searchBtn" class="premium-nav-search" title="Search"><i class="fa-solid fa-magnifying-glass"></i> <span class="search-text-nav">Search</span></button>
        </li>
      </ul>
"@

Get-ChildItem -Path $targetDir -Filter "*.html" | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw
    
    # 1. Add floating back button after body if missing
    if ($content -notlike "*page-back-btn*") {
        $content = $content -replace '<body>', "<body>`r`n$newBackBtn"
    }

    # 2. Replace the entire nav-links-desktop block
    # We use regex to find the block starting with <ul class="nav-links-desktop"> and ending with </ul>
    # This ensures we handle variations in content inside the block.
    $regex = '(?s)<ul class="nav-links-desktop">.*?</ul>'
    $content = [regex]::Replace($content, $regex, $newNavBlock)

    Set-Content -Path $_.FullName -Value $content -NoNewline
    Write-Host "Processed: $($_.Name)"
}

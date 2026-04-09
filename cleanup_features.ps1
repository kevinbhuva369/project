# Root Files
$rootDir = "C:\Users\kevin_patel\OneDrive\Documents\GitHub\project"
$htmlFiles = Get-ChildItem -Path $rootDir -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # 1. Remove floating back button
    $content = $content -replace '<a href="javascript:history.back\(\)" class="page-back-btn" title="Go Back"><i class="fa-solid fa-arrow-left"></i></a>\r?\n?', ""
    $content = $content -replace '<a href="index.html" class="page-back-btn" title="Back to Home"><i class="fa-solid fa-house"></i></a>\r?\n?', ""

    # 2. Remove Login from nav list
    $content = $content -replace '<li id="navLoginItem">.*?</li>\r?\n?', ""
    
    # 3. Remove auth.js script
    $content = $content -replace '<script src="auth.js"></script>\r?\n?', ""
    $content = $content -replace '<script src="\.\./auth.js"></script>\r?\n?', ""

    Set-Content $file.FullName $content -NoNewline
    Write-Host "Cleaned up: $($file.Name)"
}

# Viewpage Files
$viewDir = "C:\Users\kevin_patel\OneDrive\Documents\GitHub\project\viewpage"
$viewFiles = Get-ChildItem -Path $viewDir -Filter "*.html"

foreach ($file in $viewFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # 1. Remove floating back button
    $content = $content -replace '<a href="javascript:history.back\(\)" class="page-back-btn" title="Go Back"><i class="fa-solid fa-arrow-left"></i></a>\r?\n?', ""

    # 2. Remove Login from nav list
    $content = $content -replace '<li id="navLoginItem">.*?</li>\r?\n?', ""
    
    # 3. Remove auth.js script
    $content = $content -replace '<script src="\.\./auth.js"></script>\r?\n?', ""

    Set-Content $file.FullName $content -NoNewline
    Write-Host "Cleaned up: $($file.Name)"
}

$files = Get-ChildItem -Path "c:\Users\User\Downloads\new\sori-ai\app\onboarding" -Recurse -Filter "page.tsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace "@\/app\/components\/SoriCharacter", "@/app/components/custom/SoriCharacter" `
                           -replace "@\/app\/components\/SoriLogo", "@/app/components/custom/SoriLogo" `
                           -replace "@\/app\/components\/PageTransition", "@/app/components/custom/PageTransition" `
                           -replace "@\/app\/components\/ToneIcon", "@/app/components/custom/ToneIcon"
    
    if ($content -ne $newContent) {
        Write-Host "Updating $($file.FullName)"
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
    }
}
Write-Host "Import update complete."

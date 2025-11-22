$src = "c:\Users\User\Downloads\new\sori-ai-backup\app\onboarding"
$dst = "c:\Users\User\Downloads\new\sori-ai\app\onboarding"
$list = @("chapter-1", "chapter-2", "chapter-3", "chapter-4", "chapter-5", "complete", "chapter-1-v2", "chapter-2-v2", "chapter-3-v2", "chapter-4-v2", "chapter-5-v2")

foreach ($item in $list) {
    $s = "$src\$item"
    $d = "$dst\$item"
    if (Test-Path $s) {
        Write-Host "Copying $s to $d"
        if (!(Test-Path $d)) { New-Item -ItemType Directory -Path $d | Out-Null }
        Copy-Item -Path "$s\*" -Destination $d -Recurse -Force
    } else {
        Write-Host "Source not found: $s"
    }
}
Write-Host "Copy complete."

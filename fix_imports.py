import os

target_dir = r"c:\Users\User\Downloads\new\sori-ai\app\onboarding"
replacements = {
    "@/app/components/SoriCharacter": "@/app/components/custom/SoriCharacter",
    "@/app/components/SoriLogo": "@/app/components/custom/SoriLogo",
    "@/app/components/PageTransition": "@/app/components/custom/PageTransition",
    "@/app/components/ToneIcon": "@/app/components/custom/ToneIcon"
}

print("Starting import fix...")
for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file == "page.tsx":
            path = os.path.join(root, file)
            try:
                # Try reading as UTF-8 first
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        content = f.read()
                except UnicodeDecodeError:
                    # Fallback to CP949 if UTF-8 fails (unlikely for source code but possible)
                    with open(path, "r", encoding="cp949") as f:
                        content = f.read()

                new_content = content
                for old, new in replacements.items():
                    new_content = new_content.replace(old, new)
                
                if content != new_content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated: {path}")
            except Exception as e:
                print(f"Error processing {path}: {e}")
print("Import fix complete.")

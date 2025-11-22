const fs = require('fs');
const path = require('path');

const sourceBase = path.join(__dirname, '../sori-ai-backup/app/onboarding');
const destBase = path.join(__dirname, 'app/onboarding');

const foldersToCopy = [
    'chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5',
    'complete',
    'chapter-1-v2', 'chapter-2-v2', 'chapter-3-v2', 'chapter-4-v2', 'chapter-5-v2'
];

// Ensure destination base exists
if (!fs.existsSync(destBase)) {
    fs.mkdirSync(destBase, { recursive: true });
}

foldersToCopy.forEach(folder => {
    const sourceDir = path.join(sourceBase, folder);
    const destDir = path.join(destBase, folder);

    if (fs.existsSync(sourceDir)) {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
            console.log(`Created directory: ${destDir}`);
        }

        const files = fs.readdirSync(sourceDir);
        files.forEach(file => {
            const sourceFile = path.join(sourceDir, file);
            const destFile = path.join(destDir, file);

            // Only process files, skip directories
            if (fs.lstatSync(sourceFile).isDirectory()) return;

            let content = fs.readFileSync(sourceFile, 'utf8');

            // Fix imports
            // Replace @/app/components/SoriCharacter with @/app/components/custom/SoriCharacter
            // Replace @/app/components/SoriLogo with @/app/components/custom/SoriLogo
            // Replace @/app/components/PageTransition with @/app/components/custom/PageTransition
            // Replace @/app/components/ToneIcon with @/app/components/custom/ToneIcon
            // Replace @/app/components/LNB with @/app/components/custom/LNB

            // General replacement for components that were moved to custom
            content = content.replace(/@\/app\/components\/SoriCharacter/g, '@/app/components/custom/SoriCharacter');
            content = content.replace(/@\/app\/components\/SoriLogo/g, '@/app/components/custom/SoriLogo');
            content = content.replace(/@\/app\/components\/PageTransition/g, '@/app/components/custom/PageTransition');
            content = content.replace(/@\/app\/components\/ToneIcon/g, '@/app/components/custom/ToneIcon');
            content = content.replace(/@\/app\/components\/LNB/g, '@/app/components/custom/LNB');

            fs.writeFileSync(destFile, content, 'utf8');
            console.log(`Copied and fixed: ${folder}/${file}`);
        });
    } else {
        console.warn(`Source directory not found: ${sourceDir}`);
    }
});

console.log('Onboarding files copy and fix completed.');

const fs = require('fs');
const path = require('path');

const repoDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\scratch\\CAB-BOOKING-REPO';

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            if (file.endsWith('.md') || file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

const allFiles = getAllFiles(repoDir);
let updatedCount = 0;

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace header blocks in MD
    content = content.replace(/\*\*Developer Role:\*\* Solo Full-Stack MERN Developer/g, '**Team Member / Solo Developer:** Shaik Sumiya Zainab');
    content = content.replace(/\*\*Developer Role:\*\*.*$/gm, '**Team Member / Solo Developer:** Shaik Sumiya Zainab');
    
    // Replace names in text
    content = content.replace(/Sumiya Zainab \/ Shaik Sumiya Zainab \/ Solo Track/g, 'Shaik Sumiya Zainab');
    content = content.replace(/Solo Developer \(Sumiya \/ Shaik Sumiya Zainab\)/g, 'Shaik Sumiya Zainab');
    content = content.replace(/Solo Developer \(Sumiya \/ Shaik Sumiya Zainab \/ Solo Track\)/g, 'Shaik Sumiya Zainab');
    content = content.replace(/\(Sumiya Zainab \/ Shaik Sumiya Zainab \/ Solo Track\)/g, '(Shaik Sumiya Zainab)');
    
    // Replace demo email/names if needed
    content = content.replace(/pravanshu@ucab\.com/g, 'sumiya@ucab.com');
    content = content.replace(/Shaik Sumiya Zainab/g, 'Shaik Sumiya Zainab');

    // Ensure header lists Shaik Sumiya Zainab
    if (file.endsWith('.md') && content.includes('**Project Name:** Cab Booking (`UCab`)') && !content.includes('**Team Member / Solo Developer:** Shaik Sumiya Zainab')) {
        content = content.replace(/\*\*Project ID:\*\* `N\/A \(Solo Track Submission\)`/g, '**Project ID:** `N/A (Solo Track Submission)`\n**Team Member / Solo Developer:** Shaik Sumiya Zainab');
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
        console.log('Updated:', path.relative(repoDir, file));
    }
});

console.log(`\nSuccessfully updated team member name 'Shaik Sumiya Zainab' across ${updatedCount} files!`);

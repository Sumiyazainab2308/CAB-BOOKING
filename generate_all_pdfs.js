const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const repoDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\scratch\\CAB-BOOKING-REPO';

const mappings = [
    {
        md: '1. Brainstorming & Ideation/Brainstorming_and_Idea_Prioritization.md',
        pdf: '1. Brainstorming & Ideation/Brainstorming & Idea Prioritization.pdf',
        exactMd: '1. Brainstorming & Ideation/Brainstorming & Idea Prioritization.md'
    },
    {
        md: '1. Brainstorming & Ideation/Define_Problem_Statements.md',
        pdf: '1. Brainstorming & Ideation/Define Problem Statements .pdf',
        exactMd: '1. Brainstorming & Ideation/Define Problem Statements .md'
    },
    {
        md: '1. Brainstorming & Ideation/Define_Problem_Statements.md',
        pdf: '1. Brainstorming & Ideation/Define Problem Statements.pdf',
        exactMd: '1. Brainstorming & Ideation/Define Problem Statements.md'
    },
    {
        md: '1. Brainstorming & Ideation/Empathy_Map.md',
        pdf: '1. Brainstorming & Ideation/Empathy Map.pdf',
        exactMd: '1. Brainstorming & Ideation/Empathy Map.md'
    },
    {
        md: '2. Requirement Analysis/Customer_Journey_Map.md',
        pdf: '2. Requirement Analysis/Customer Journey Map.pdf',
        exactMd: '2. Requirement Analysis/Customer Journey Map.md'
    },
    {
        md: '2. Requirement Analysis/Data_Flow_Diagram.md',
        pdf: '2. Requirement Analysis/Data Flow Diagram.pdf',
        exactMd: '2. Requirement Analysis/Data Flow Diagram.md'
    },
    {
        md: '2. Requirement Analysis/Solution_Requirements.md',
        pdf: '2. Requirement Analysis/Solution Requirements.pdf',
        exactMd: '2. Requirement Analysis/Solution Requirements.md'
    },
    {
        md: '2. Requirement Analysis/Technology_Stack.md',
        pdf: '2. Requirement Analysis/Technology Stack.pdf',
        exactMd: '2. Requirement Analysis/Technology Stack.md'
    },
    {
        md: '3. Project Design Phase/Problem-Solution_Fit.md',
        pdf: '3. Project Design Phase/Problem-Solution Fit.pdf',
        exactMd: '3. Project Design Phase/Problem-Solution Fit.md'
    },
    {
        md: '3. Project Design Phase/Proposed_Solution.md',
        pdf: '3. Project Design Phase/Proposed Solution.pdf',
        exactMd: '3. Project Design Phase/Proposed Solution.md'
    },
    {
        md: '3. Project Design Phase/Solution_Architecture.md',
        pdf: '3. Project Design Phase/Solution Architecture.pdf',
        exactMd: '3. Project Design Phase/Solution Architecture.md'
    },
    {
        md: '4. Project Planning Phase/Project_Planning.md',
        pdf: '4. Project Planning Phase/Project Planning.pdf',
        exactMd: '4. Project Planning Phase/Project Planning.md'
    },
    {
        md: '5. Project Development Phase/Code-Layout_Readability_and_Reusability.md',
        pdf: '5. Project Development Phase/Code-Layout, Readability and Reusability.pdf',
        exactMd: '5. Project Development Phase/Code-Layout, Readability and Reusability.md'
    },
    {
        md: '5. Project Development Phase/Coding_and_Solution.md',
        pdf: '5. Project Development Phase/Coding & Solution.pdf',
        exactMd: '5. Project Development Phase/Coding & Solution.md'
    },
    {
        md: '5. Project Development Phase/No_of_Functional_Features_Included_in_the_Solution.md',
        pdf: '5. Project Development Phase/No. of Functional Features Included in the Solution.pdf',
        exactMd: '5. Project Development Phase/No. of Functional Features Included in the Solution.md'
    },
    {
        md: '6.Project Testing/Performance_Testing.md',
        pdf: '6.Project Testing/Performance Testing.pdf',
        exactMd: '6.Project Testing/Performance Testing.md'
    },
    {
        md: '7.Project Documentation/Project_Executable_Files.md',
        pdf: '7.Project Documentation/Project Executable Files.pdf',
        exactMd: '7.Project Documentation/Project Executable Files.md'
    },
    {
        md: '7.Project Documentation/Sample_Project_Documentation.md',
        pdf: '7.Project Documentation/Sample Project Documentation.pdf',
        exactMd: '7.Project Documentation/Sample Project Documentation.md'
    },
    {
        md: '8.Project Demonstration/Communication.md',
        pdf: '8.Project Demonstration/Communication.pdf',
        exactMd: '8.Project Demonstration/Communication.md'
    },
    {
        md: '8.Project Demonstration/Demonstration_of_Proposed_Features.md',
        pdf: '8.Project Demonstration/Demonstration of Proposed Features.pdf',
        exactMd: '8.Project Demonstration/Demonstration of Proposed Features.md'
    },
    {
        md: '8.Project Demonstration/Project_Demo_Planning.md',
        pdf: '8.Project Demonstration/Project Demo Planning.pdf',
        exactMd: '8.Project Demonstration/Project Demo Planning.md'
    },
    {
        md: '8.Project Demonstration/Scalability_and_Future_Plan.md',
        pdf: '8.Project Demonstration/Scalability & Future Plan.pdf',
        exactMd: '8.Project Demonstration/Scalability & Future Plan.md'
    },
    {
        md: '8.Project Demonstration/Team_Involvement_in_Demonstration.md',
        pdf: '8.Project Demonstration/Team Involvement in Demonstration.pdf',
        exactMd: '8.Project Demonstration/Team Involvement in Demonstration.md'
    }
];

function generatePDF(mdPath, pdfPath, exactMdPath) {
    const fullMd = path.join(repoDir, mdPath);
    const fullPdf = path.join(repoDir, pdfPath);
    const fullExactMd = path.join(repoDir, exactMdPath);

    if (!fs.existsSync(fullMd)) {
        console.error(`Missing MD file: ${mdPath}`);
        return;
    }

    const content = fs.readFileSync(fullMd, 'utf8');
    
    // Also copy to exactMd if different
    if (fullMd !== fullExactMd) {
        fs.writeFileSync(fullExactMd, content, 'utf8');
    }

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const writeStream = fs.createWriteStream(fullPdf);
    doc.pipe(writeStream);

    // Header Banner
    doc.rect(0, 0, doc.page.width, 70).fill('#1e293b');
    doc.fillColor('#ffffff')
       .fontSize(16)
       .font('Helvetica-Bold')
       .text('UCab — Full-Stack MERN Cab Booking Platform', 50, 20);
    doc.fontSize(10)
       .font('Helvetica')
       .text('Solo Developer / Team Member: Shaik Sumiya Zainab | Project ID: N/A (Solo Track)', 50, 43);

    doc.moveDown(2);
    doc.fillColor('#0f172a');

    const lines = content.split('\n');
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            doc.moveDown(0.3);
            continue;
        }

        if (inCodeBlock) {
            doc.font('Courier').fontSize(9).fillColor('#334155').text(line, { indent: 20 });
            doc.moveDown(0.2);
            continue;
        }

        if (line.startsWith('# ')) {
            doc.moveDown(1);
            doc.font('Helvetica-Bold').fontSize(18).fillColor('#1d4ed8').text(line.replace('# ', ''));
            doc.moveDown(0.5);
            doc.font('Helvetica').fillColor('#0f172a');
        } else if (line.startsWith('## ')) {
            doc.moveDown(0.8);
            doc.font('Helvetica-Bold').fontSize(14).fillColor('#2563eb').text(line.replace('## ', ''));
            doc.moveDown(0.4);
            doc.font('Helvetica').fillColor('#0f172a');
        } else if (line.startsWith('### ')) {
            doc.moveDown(0.5);
            doc.font('Helvetica-Bold').fontSize(12).fillColor('#3b82f6').text(line.replace('### ', ''));
            doc.moveDown(0.3);
            doc.font('Helvetica').fillColor('#0f172a');
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
            doc.font('Helvetica').fontSize(10).fillColor('#1e293b').text('• ' + line.substring(2).replace(/\*\*/g, ''), { indent: 15 });
            doc.moveDown(0.3);
        } else if (line.startsWith('|') && line.includes('|')) {
            // Table row formatting
            let cleanRow = line.replace(/\|/g, ' ').trim().replace(/\s+/g, ' ');
            if (!cleanRow.includes('---')) {
                doc.font('Courier-Bold').fontSize(8.5).fillColor('#0f172a').text(cleanRow, { indent: 10 });
                doc.moveDown(0.2);
            }
        } else if (line.length > 0 && !line.startsWith('---')) {
            doc.font('Helvetica').fontSize(10.5).fillColor('#334155').text(line.replace(/\*\*/g, ''));
            doc.moveDown(0.4);
        }
    }

    doc.end();
    console.log(`Generated PDF & Exact MD: ${pdfPath}`);
}

mappings.forEach(m => generatePDF(m.md, m.pdf, m.exactMd));
console.log('\nAll 23 required PDF reports and exact MD files generated successfully for Shaik Sumiya Zainab!');

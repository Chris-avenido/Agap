const fs = require('fs');

const filePath = 'e:\\christop\\AGAP Portal\\frontend\\src\\pages\\ApplicantJobList.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const spanRegex = /([ \t]*)<span className="text-\[12px\] text-gray-400 mt-1\.5 font-medium">(.*?)<\/span>\r?\n/g;

let matches = [];
let match;
while ((match = spanRegex.exec(content)) !== null) {
    matches.push({
        full: match[0],
        indent: match[1],
        text: match[2],
        start: match.index,
        end: match.index + match[0].length
    });
}

// We will apply replacements from back to front to not mess up indices
for (let i = matches.length - 1; i >= 0; i--) {
    let m = matches[i];
    
    // find the closest <div className="...flex flex-col..."> backwards
    let searchArea = content.substring(0, m.start);
    let lastDivIdx = searchArea.lastIndexOf('<div className="');
    
    // We actually need to find the specific flex-col div that wraps this span.
    // It's the one where open divs == close divs between it and the span.
    let divRegex = /([ \t]*)<div className="[^"]*flex flex-col[^"]*">/g;
    let divMatches = [];
    let dm;
    while ((dm = divRegex.exec(searchArea)) !== null) {
        divMatches.push({
            full: dm[0],
            indent: dm[1],
            start: dm.index,
            end: dm.index + dm[0].length
        });
    }
    
    let targetDiv = null;
    for (let j = divMatches.length - 1; j >= 0; j--) {
        let candidate = divMatches[j];
        let between = searchArea.substring(candidate.end, m.start);
        
        let openCount = (between.match(/<div/g) || []).length;
        let closeCount = (between.match(/<\/div>/g) || []).length;
        
        if (openCount === closeCount) {
            targetDiv = candidate;
            break;
        }
    }
    
    if (targetDiv) {
        // Remove the span from its current location
        content = content.substring(0, m.start) + content.substring(m.end);
        
        // Insert it right after the target div
        let newSpanStr = `\n${m.indent}<span className="text-[12px] text-gray-400 mb-1.5 font-medium">${m.text}</span>`;
        // but let's use the indent of the div + 2 spaces or something.
        // Actually m.indent is already the correct indent of the span. Let's just use it.
        // Also add a newline
        newSpanStr = `\n${m.indent}<span className="text-[12px] text-gray-400 mb-1.5 font-medium">${m.text}</span>`;
        
        let insertPos = targetDiv.end; // Right after <div ...>
        content = content.substring(0, insertPos) + newSpanStr + content.substring(insertPos);
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Labels swapped successfully!');

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function cleanFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Regex to match <pre...>...</pre> case-insensitively and across multiple lines
  const preRegex = /<pre[^>]*>[\s\S]*?<\/pre>/gi;
  
  if (preRegex.test(fileContent)) {
    const cleanedContent = fileContent.replace(preRegex, '');
    fs.writeFileSync(filePath, cleanedContent, 'utf8');
    console.log(`Cleaned: ${path.basename(filePath)}`);
  }
}

function main() {
  console.log(`Scanning data files in: ${dataDir}`);
  const files = fs.readdirSync(dataDir);
  
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(dataDir, file);
      cleanFile(filePath);
    }
  });
  console.log('Cleanup finished!');
}

main();

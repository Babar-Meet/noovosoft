const fs = require('fs');
const path = require('path');
const https = require('https');

const pagesDir = path.join(__dirname, 'src', 'pages');
const publicAssetsDir = path.join(__dirname, 'public', 'assets');
const cssFile = path.join(__dirname, 'src', 'noovosoft.css');

if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Helper to download file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      return resolve(true); // Already downloaded
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => reject(`Server responded with ${response.statusCode}: ${url}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err.message));
    });
  });
}

async function processFiles() {
  const urlRegex = /https:\/\/www\.noovosoft\.com\/assets\/([^"'\s\\)]+)/g;
  let uniqueUrls = new Set();

  // 1. Process JSX files
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));
  for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      uniqueUrls.add(match[0]);
    }

    // Replace with local path
    content = content.replace(/https:\/\/www\.noovosoft\.com\/assets\//g, '/assets/');
    fs.writeFileSync(filePath, content);
  }

  // 2. Process CSS file
  if (fs.existsSync(cssFile)) {
    let cssContent = fs.readFileSync(cssFile, 'utf-8');
    let match;
    while ((match = urlRegex.exec(cssContent)) !== null) {
      uniqueUrls.add(match[0]);
    }
    cssContent = cssContent.replace(/https:\/\/www\.noovosoft\.com\/assets\//g, '/assets/');
    fs.writeFileSync(cssFile, cssContent);
  }

  console.log(`Found ${uniqueUrls.size} unique assets. Downloading...`);

  // 3. Download all assets
  const downloadPromises = Array.from(uniqueUrls).map(async (url) => {
    try {
      const fileName = url.split('/').pop();
      const dest = path.join(publicAssetsDir, fileName);
      await downloadFile(url, dest);
      console.log(`Downloaded: ${fileName}`);
    } catch (err) {
      console.error(`Failed to download ${url}:`, err);
    }
  });

  await Promise.all(downloadPromises);
  console.log('All assets downloaded and files updated!');
}

processFiles().catch(console.error);

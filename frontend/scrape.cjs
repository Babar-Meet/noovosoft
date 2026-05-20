const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'CasestudyDetails1', url: 'https://www.noovosoft.com/casestudy-details-1' }, 
  { name: 'CasestudyDetails2', url: 'https://www.noovosoft.com/casestudy-details-2' }
];

async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const pageInfo of pages) {
    console.log(`Scraping ${pageInfo.name}...`);
    await page.goto(pageInfo.url, { waitUntil: 'networkidle2' });
    
    // Wait for root to render
    await page.waitForSelector('#root');
    
    // Get the inner html
    let html = await page.$eval('#root', el => el.innerHTML);
    
    // Convert relative assets to absolute URL so images load
    html = html.replace(/src="\/assets\//g, 'src="https://www.noovosoft.com/assets/');
    html = html.replace(/href="\/assets\//g, 'href="https://www.noovosoft.com/assets/');

    // Escape backticks and dollars so we can put it in a JS template literal safely
    const escapedHtml = html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

    const componentStr = `import React from 'react';\n\nconst ${pageInfo.name} = () => {\n  const htmlContent = \`${escapedHtml}\`;\n  return (\n    <div className="original-clone" dangerouslySetInnerHTML={{ __html: htmlContent }} />\n  );\n};\n\nexport default ${pageInfo.name};\n`;
    
    fs.writeFileSync(path.join(__dirname, 'src', 'pages', `${pageInfo.name}.jsx`), componentStr);
    console.log(`Saved ${pageInfo.name}.jsx`);
  }

  await browser.close();
}

scrape().catch(console.error);

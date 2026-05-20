/**
 * scrapeEndpoints.cjs
 * ------------------------------------------------------------------
 * Discovers all API endpoints, form actions, and XHR/fetch calls used
 * by www.noovosoft.com so we can replicate them in our Express backend.
 *
 * Usage:  node scrapeEndpoints.cjs
 * Output: endpoints.json in the project root
 * ------------------------------------------------------------------
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const { URL } = require('url');

const BASE = 'https://www.noovosoft.com';

const PAGES = [
  '/',
  '/about',
  '/services',
  '/casestudy',
  '/culture',
  '/career',
  '/contact',
  '/casestudy-details-1',
  '/casestudy-details-2',
  '/privacy',
];

// ---- helpers ----
function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 NoovoClone/1.0' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }).on('error', reject);
  });
}

// ---- Extract endpoints from HTML ----
function extractEndpoints(html, pageUrl) {
  const results = {
    forms: [],
    apiCalls: [],
    links: [],
    scripts: [],
  };

  // --- Form actions ---
  const formRe = /<form[^>]*action=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = formRe.exec(html)) !== null) {
    const action = m[1];
    // extract method
    const methodMatch = m[0].match(/method=["'](\w+)["']/i);
    results.forms.push({
      action,
      method: methodMatch ? methodMatch[1].toUpperCase() : 'GET',
      page: pageUrl,
    });
  }

  // --- fetch / axios / XMLHttpRequest calls in inline scripts ---
  const fetchRe = /(?:fetch|axios\.(?:get|post|put|delete|patch))\s*\(\s*["'`]([^"'`]+)["'`]/gi;
  while ((m = fetchRe.exec(html)) !== null) {
    results.apiCalls.push({ url: m[1], page: pageUrl });
  }

  // --- Any /api/ paths ---
  const apiPathRe = /["'`](\/api\/[^"'`\s]+)["'`]/gi;
  while ((m = apiPathRe.exec(html)) !== null) {
    results.apiCalls.push({ url: m[1], page: pageUrl });
  }

  // --- Script src (external JS that may contain API calls) ---
  const scriptRe = /<script[^>]*src=["']([^"']+)["']/gi;
  while ((m = scriptRe.exec(html)) !== null) {
    results.scripts.push(m[1]);
  }

  // --- All internal links ---
  const linkRe = /href=["']([^"']+)["']/gi;
  while ((m = linkRe.exec(html)) !== null) {
    const href = m[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      results.links.push(href);
    }
  }

  return results;
}

// ---- Scan JS bundles for API endpoints ---
async function scanJsBundles(scriptUrls) {
  const apiEndpoints = [];
  for (const src of scriptUrls) {
    try {
      const url = src.startsWith('http') ? src : `${BASE}${src}`;
      console.log(`  📦 Scanning bundle: ${url.split('/').pop().substring(0, 50)}...`);
      const { body } = await fetch(url);

      // Look for /api/ paths
      const apiRe = /["'`](\/api\/[^"'`\s,)]+)["'`]/gi;
      let m;
      while ((m = apiRe.exec(body)) !== null) {
        apiEndpoints.push({ url: m[1], source: src });
      }

      // Look for fetch/axios calls with full URLs
      const fetchFullRe = /(?:fetch|axios\.(?:get|post|put|delete|patch))\s*\(\s*["'`](https?:\/\/[^"'`]+)["'`]/gi;
      while ((m = fetchFullRe.exec(body)) !== null) {
        apiEndpoints.push({ url: m[1], source: src });
      }

      // Look for common backend patterns
      const backendRe = /["'`]((?:https?:\/\/[^"'`]*)?\/(?:api|submit|send|contact|subscribe|newsletter|career|apply|upload)[^"'`\s,)]*?)["'`]/gi;
      while ((m = backendRe.exec(body)) !== null) {
        apiEndpoints.push({ url: m[1], source: src });
      }
    } catch (err) {
      console.log(`  ⚠️  Could not fetch ${src}: ${err.message}`);
    }
  }
  return apiEndpoints;
}

// ---- MAIN ----
(async () => {
  console.log('🔍 Scraping endpoints from noovosoft.com...\n');

  const allForms = [];
  const allApiCalls = [];
  const allLinks = new Set();
  const allScripts = new Set();

  for (const page of PAGES) {
    const url = `${BASE}${page}`;
    console.log(`📄 Fetching: ${url}`);
    try {
      const { body, status } = await fetch(url);
      console.log(`   Status: ${status}, Size: ${body.length} bytes`);

      const extracted = extractEndpoints(body, page);

      extracted.forms.forEach((f) => allForms.push(f));
      extracted.apiCalls.forEach((a) => allApiCalls.push(a));
      extracted.links.forEach((l) => allLinks.add(l));
      extracted.scripts.forEach((s) => allScripts.add(s));

      console.log(`   Forms: ${extracted.forms.length}, API calls: ${extracted.apiCalls.length}, Links: ${extracted.links.length}, Scripts: ${extracted.scripts.length}`);
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
    }
  }

  // Scan JS bundles for hidden API endpoints
  console.log(`\n📦 Scanning ${allScripts.size} JS bundles for API endpoints...`);
  const bundleEndpoints = await scanJsBundles([...allScripts]);
  bundleEndpoints.forEach((e) => allApiCalls.push(e));

  // Deduplicate API calls
  const uniqueApis = [...new Map(allApiCalls.map((a) => [a.url, a])).values()];

  // Build final report
  const report = {
    scannedAt: new Date().toISOString(),
    baseUrl: BASE,
    pagesScanned: PAGES,
    forms: allForms,
    apiEndpoints: uniqueApis,
    internalRoutes: [...allLinks].sort(),
    jsBundles: [...allScripts],
    summary: {
      totalForms: allForms.length,
      totalApiEndpoints: uniqueApis.length,
      totalInternalRoutes: allLinks.size,
      totalJsBundles: allScripts.size,
    },
    // Recommended backend routes based on analysis
    recommendedBackendRoutes: [
      { method: 'POST', path: '/api/contact', description: 'Contact form submission (name, email, contactNumber, companyName, message, recaptcha)' },
      { method: 'POST', path: '/api/career/apply', description: 'Career application form (name, email, phone, resume, coverLetter)' },
      { method: 'GET', path: '/api/health', description: 'Health check endpoint' },
      { method: 'GET', path: '/api/jobs', description: 'List open job positions' },
      { method: 'POST', path: '/api/newsletter', description: 'Newsletter subscription' },
    ],
  };

  // Write report
  const outPath = require('path').join(__dirname, 'endpoints.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SCRAPE SUMMARY');
  console.log('='.repeat(60));
  console.log(`Forms found:          ${report.summary.totalForms}`);
  console.log(`API endpoints found:  ${report.summary.totalApiEndpoints}`);
  console.log(`Internal routes:      ${report.summary.totalInternalRoutes}`);
  console.log(`JS bundles scanned:   ${report.summary.totalJsBundles}`);
  console.log('='.repeat(60));

  if (allForms.length > 0) {
    console.log('\n📝 FORMS:');
    allForms.forEach((f) => {
      console.log(`   ${f.method} ${f.action} (on ${f.page})`);
    });
  }

  if (uniqueApis.length > 0) {
    console.log('\n🔗 API ENDPOINTS:');
    uniqueApis.forEach((a) => {
      console.log(`   ${a.url} (from ${a.source || a.page})`);
    });
  }

  console.log('\n✅ RECOMMENDED BACKEND ROUTES:');
  report.recommendedBackendRoutes.forEach((r) => {
    console.log(`   ${r.method} ${r.path} — ${r.description}`);
  });

  console.log(`\n📁 Full report saved to: ${outPath}`);
})();

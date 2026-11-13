const https = require('https');

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function verify() {
  console.log('=== 1. VERIFYING LIVE VERCEL DEPLOYMENT ===');
  const indexRes = await fetchUrl('https://tixar-iota.vercel.app/index.html?t=' + Date.now());
  console.log('Index status:', indexRes.status);
  
  const titleMatch = indexRes.body.match(/<title>([^<]+)<\/title>/);
  console.log('Page Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

  const swMatch = indexRes.body.match(/sw\.js\?v=([0-9.]+)/);
  console.log('SW Registered Version:', swMatch ? swMatch[1] : 'NOT FOUND');

  const jsFiles = indexRes.body.match(/\/assets\/[^"]+\.js/g) || [];
  console.log('Found JS Assets:', jsFiles.length, jsFiles);

  console.log('\n=== 2. SCANNING LIVE ASSETS FOR API ENDPOINTS & ZERO LOCALHOST ===');
  let foundRender = 0;
  let foundLocalhost = 0;

  for (const jsFile of jsFiles) {
    const jsRes = await fetchUrl('https://tixar-iota.vercel.app' + jsFile);
    
    // Check for render URL
    if (jsRes.body.includes('https://shifter-i49i.onrender.com')) {
      foundRender++;
      console.log(`  [OK] ${jsFile} contains Render URL`);
    }

    // Check if localhost is used anywhere in production fetch calls
    // Note: localhost might only appear in string checks like !url.includes("localhost")
    const fetchLocal = jsRes.body.match(/fetch\([^)]*localhost:[0-9]+/g);
    if (fetchLocal) {
      foundLocalhost++;
      console.error(`  [FAIL] ${jsFile} calls localhost:`, fetchLocal);
    }
  }

  console.log(`Render URL presence verified in ${foundRender} chunks.`);
  console.log(`Localhost fetch calls in production: ${foundLocalhost} (0 expected)`);

  console.log('\n=== 3. VERIFYING LIVE RENDER BACKEND API ===');
  
  // Test /api/curriculum
  const curRes = await fetchUrl('https://shifter-i49i.onrender.com/api/curriculum', {
    headers: { Origin: 'https://tixar-iota.vercel.app' }
  });
  console.log('/api/curriculum status:', curRes.status);
  console.log('  CORS Access-Control-Allow-Origin:', curRes.headers['access-control-allow-origin']);
  const curData = JSON.parse(curRes.body);
  console.log('  Curriculum subjects loaded:', curData.length);

  // Test /api/content for Mathematics -> Algebra -> Linear equations
  const topicRes = await fetchUrl('https://shifter-i49i.onrender.com/api/content/math/algebra/Linear%20equations', {
    headers: { Origin: 'https://tixar-iota.vercel.app' }
  });
  console.log('/api/content/math/algebra/Linear equations status:', topicRes.status);
  console.log('  CORS Access-Control-Allow-Origin:', topicRes.headers['access-control-allow-origin']);
  const topicData = JSON.parse(topicRes.body);
  console.log('  Notes length:', topicData.notes?.length);
  console.log('  Quiz questions count:', topicData.qs?.length);

  console.log('\n=== 4. VERIFYING SERVICE WORKER (sw.js) ===');
  const swRes = await fetchUrl('https://tixar-iota.vercel.app/sw.js?t=' + Date.now());
  const cacheNameMatch = swRes.body.match(/CACHE_NAME\s*=\s*['"]([^'"]+)['"]/);
  console.log('sw.js HTTP status:', swRes.status);
  console.log('sw.js CACHE_NAME:', cacheNameMatch ? cacheNameMatch[1] : 'NOT FOUND');

  console.log('\n=== ALL PRODUCTION VERIFICATIONS COMPLETE ===');
}

verify().catch(console.error);

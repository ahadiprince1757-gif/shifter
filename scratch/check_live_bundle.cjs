const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function run() {
  const htmlRes = await get('https://tixar-iota.vercel.app/?t=' + Date.now());
  const jsFiles = htmlRes.data.match(/\/assets\/[^"]+\.js/g) || [];
  console.log('JS files:', jsFiles);

  for (const f of jsFiles) {
    const res = await get('https://tixar-iota.vercel.app' + f);
    if (res.data.includes('/api/content')) {
      console.log('\n--- Found in ' + f + ' ---');
      const idx = res.data.indexOf('/api/content');
      console.log(res.data.slice(Math.max(0, idx - 200), idx + 200));
    }
  }
}

run().catch(console.error);

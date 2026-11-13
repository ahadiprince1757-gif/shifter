const https = require('https');

async function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await get('https://tixar-iota.vercel.app/');
  const files = html.match(/\/assets\/[^"]+\.js/g) || [];
  console.log('Files:', files);
  for (const f of files) {
    const code = await get('https://tixar-iota.vercel.app' + f);
    for (const term of ['prefetchTopic', 'Check your internet', 'failed-to-load', 'record?.data']) {
      if (code.includes(term)) {
        console.log(`\nMatch "${term}" in ${f}:`);
        const idx = code.indexOf(term);
        console.log(code.slice(Math.max(0, idx - 120), Math.min(code.length, idx + 120)));
      }
    }
  }
}

run().catch(console.error);

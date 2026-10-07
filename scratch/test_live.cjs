const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function run() {
  const html = await get('https://tixar-iota.vercel.app/welcome');
  console.log('HTML status:', html.status);
  const m = html.data.match(/src="(\/assets\/index-[^"]+\.js)"/);
  if (m) {
    console.log('Main bundle:', m[1]);
    const js = await get('https://tixar-iota.vercel.app' + m[1]);
    console.log('Main bundle status:', js.status, 'size:', js.data.length);
  }
}

run();

const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

async function main() {
    const certDir = path.join(__dirname, 'certs');
    if (!fs.existsSync(certDir)) {
        fs.mkdirSync(certDir);
    }

    const attrs = [{ name: 'commonName', value: 'localhost' }];
    console.log('Generating certificates...');
    const pems = await selfsigned.generate(attrs, { days: 365 });

    fs.writeFileSync(path.join(certDir, 'key.pem'), pems.private);
    fs.writeFileSync(path.join(certDir, 'cert.pem'), pems.cert);

    console.log('✅ SSL Certificates generated in backend/certs/');
}

main().catch(err => {
    console.error('❌ Error generating certificates:', err);
    process.exit(1);
});

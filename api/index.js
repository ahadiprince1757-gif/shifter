// Vercel serverless entry point that forwards to the Express app
const app = require('../backend/app');

module.exports = (req, res) => {
  // Vercel passes Node's IncomingMessage and ServerResponse objects
  return app(req, res);
};

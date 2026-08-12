require("dotenv").config();
const app = require("./app");
const logger = require("./logger");

const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, "0.0.0.0", () => {
  try {
    logger.action("SERVER_START", "success", {
      port: PORT,
      url: `http://0.0.0.0:${PORT}`,
    });
    console.log(`✅ Server running on port ${PORT}`);
  } catch {
    console.log(`✅ Server running on port ${PORT}`);
  }
});

server.on("error", (err) => {
  try {
    logger.error("SERVER_ERROR", err);
  } catch (loggingError) {
    console.error("Server error:", loggingError.message);
  }
});

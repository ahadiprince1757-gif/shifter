// Canonical curriculum loaded directly from curriculum.json
// Single Source of Truth architecture — avoids duplicate arrays and synchronization drift.
const CURRICULUM_DATA = require("./curriculum.json");

module.exports = CURRICULUM_DATA;
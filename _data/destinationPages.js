const destinations = require("./destinations.json");

module.exports = function() {
  return Object.entries(destinations).map(([id, destination]) => ({
    id,
    ...destination
  }));
};

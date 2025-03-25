import Handlebars from "handlebars";

// Register existing helpers
Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

// Add new helpers for pagination
Handlebars.registerHelper("add", function (a, b) {
  return a + b;
});

Handlebars.registerHelper("subtract", function (a, b) {
  return a - b;
});

Handlebars.registerHelper("gt", function (a, b) {
  return a > b;
});

Handlebars.registerHelper("lt", function (a, b) {
  return a < b;
});

export default {
  eq: Handlebars.helpers.eq,
  add: Handlebars.helpers.add,
  subtract: Handlebars.helpers.subtract,
  gt: Handlebars.helpers.gt,
  lt: Handlebars.helpers.lt
};

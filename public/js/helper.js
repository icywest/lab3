import Handlebars from "handlebars";

Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

export default {
  eq: Handlebars.helpers.eq
};

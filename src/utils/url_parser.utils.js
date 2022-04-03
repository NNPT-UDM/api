const _url = require("url");
const queryString = require("query-string");
const qs = require("qs");
exports.validateQuery = (url) => {
  let query = _url.parse(url).query;
  let queries = queryString.parse(query, {
    arrayFormat: "bracket-separator",
    arrayFormatSeparator: "|",
    parseNumbers: true,
    parseBooleans: true,
  });
  return queries;
};

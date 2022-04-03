const { validateBody } = require("./url_parser.utils");

module.exports.MongooseEpressions = (body) => {
  const regex = /[$]?(addToSet|push|pop|pull|pullAll|each|position|slice|sort|in|not)\b/g;
  let stringifyBody = JSON.stringify(body);
  stringifyBody = stringifyBody.replace(regex, (match) => `$${match}`);
  body = JSON.parse(stringifyBody);
  const operators = Object.keys(body).join(",").match(regex);
  let expressions = {};
  if (operators) {
    operators.forEach((operator) => {
      expressions[operators] = body[operator];
      delete body[operator];
    });
  }
  expressions = { ...expressions, $set: body };
  return expressions;
};

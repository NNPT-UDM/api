const got = require("got");
const cheerio = require("cheerio");
// get body content using got lib then load that content by cheerio lib
const scrapeContent = async (url) => {
  const response = await got(url);
  if (response.statusCode === 200) {
    const html = response.body;
    const $ = cheerio.load(html);
    return $;
  } else {
    return null;
  }
};

module.exports = scrapeContent;

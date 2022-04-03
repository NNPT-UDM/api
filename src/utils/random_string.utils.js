// program to generate random strings

// declare all characters
const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
const allUniqueChars = [...`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`];
const allNumbers = [..."0123456789"];

const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha, ...allUniqueChars];

const generator = (len) => {
  return [...Array(len)].map((i) => base[(Math.random() * base.length) | 0]).join("");
};
module.exports.generateString = generator;

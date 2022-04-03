const CryptoJS = require("crypto-js");
const md5 = require("md5");
const { KEY_SECRET_AES } = require("../../configs/app.configs");
class C2TCrypto {
  static C2TAESEncrypt(input) {
    const encode = CryptoJS.AES.encrypt(input, KEY_SECRET_AES).toString();
    const wordArray = CryptoJS.enc.Utf8.parse(encode);
    const base64 = CryptoJS.enc.Base64.stringify(wordArray);

    return base64;
  }
  static C2TAESDecrypt(input) {
    const parsedWordArray = CryptoJS.enc.Base64.parse(input);
    const parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
    const bytes = CryptoJS.AES.decrypt(parsedStr, process.env.KEY_SECRET_AES);
    const idMovieStream = bytes.toString(CryptoJS.enc.Utf8);

    return idMovieStream;
  }
  static C2THashmd5(input) {
    return md5(input);
  }
}
module.exports = C2TCrypto;

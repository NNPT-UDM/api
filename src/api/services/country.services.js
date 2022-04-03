const { BaseServices } = require("../../base/services.base");
const { CountryModel } = require("../../models/country.models");

class CountryServices extends BaseServices {
  constructor() {
    super(CountryModel);
  }
}
module.exports.CountryServices = new CountryServices();

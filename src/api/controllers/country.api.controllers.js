const { BaseApiControllers } = require("../../base/controllers.base");
const { CountryServices } = require("../services/country.services");

class CountryApiControllers extends BaseApiControllers {
  constructor() {
    super(CountryServices);
  }
}

module.exports = new CountryApiControllers();

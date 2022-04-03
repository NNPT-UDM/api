const { BaseServices } = require("../../base/services.base");
const { DiagnosticModel } = require("../../models/diagnostic.models");

class DiagnosticServices extends BaseServices {
	constructor() {
		super(DiagnosticModel);
	}
}
module.exports.DiagnosticServices = new DiagnosticServices();

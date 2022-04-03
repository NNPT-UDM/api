const { BaseApiControllers } = require("../../base/controllers.base");
const { DiagnosticServices } = require("../services/diagnostic.services");

class DiagnosticApiControllers extends BaseApiControllers {
	constructor() {
		super(DiagnosticServices);
	}
}

module.exports = new DiagnosticApiControllers();

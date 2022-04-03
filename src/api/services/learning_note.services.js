const { BaseServices } = require("../../base/services.base");
const { LearningNoteModel } = require("../../models/learning_note.models");

class LearningNoteServices extends BaseServices {
	constructor() {
		super(LearningNoteModel);
	}
}
module.exports.LearningNoteServices = new LearningNoteServices();

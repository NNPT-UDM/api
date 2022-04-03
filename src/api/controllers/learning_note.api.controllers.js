const { BaseApiControllers } = require("../../base/controllers.base");
const { LearningNoteServices } = require("../services/learning_note.services");

class LearningNoteApiControllers extends BaseApiControllers {
	constructor() {
		super(LearningNoteServices);
	}
}

module.exports = new LearningNoteApiControllers();

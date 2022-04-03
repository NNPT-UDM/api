class RequestError extends Error {
	constructor(code, devMessage, userMessage = "Error server, please try again!") {
		super(devMessage);

		this.code = code;
		this.userMessage = userMessage;
	}
}

module.exports = RequestError;

const fs = require("fs");
const shell = require("shelljs");

class C2tMakeDir {
	folder(dirName) {
		if (!fs.existsSync(dirName)) {
			fs.mkdirSync(dirName);
		}
	}
	multiFolder(fullPath) {
		if (!fs.existsSync(fullPath)) {
			shell.mkdir("-p", fullPath);
		}
	}
}

module.exports.C2tMakeDir = new C2tMakeDir();

const fs = require("fs");
const path = require("path");
const apiRoutesDir = path.join(path.resolve(__dirname, `../api`), "/routes");
const dashRoutesDir = path.join(path.resolve(__dirname, `../admin`), "/routes");

module.exports = {
	api: fs.readdirSync(apiRoutesDir).map((dir) => {
		return require(path.resolve(path.join(apiRoutesDir, dir)));
	}),
	dashboard: fs.readdirSync(dashRoutesDir).map((dir) => {
		return require(path.resolve(path.join(dashRoutesDir, dir)));
	})
};
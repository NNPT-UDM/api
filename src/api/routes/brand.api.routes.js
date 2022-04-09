const controller = require("../controllers/brand.api.controllers");
const C2TRouter = require("../../base/router.base");

class BrandApiRoutes extends C2TRouter {
	constructor() {
		super();
	}
	path = "brand";
	routes = [
		{
			path: "/view",
			method: this.GET,
			handler: controller.view.bind(controller),
			permissions: [],
			middlewares: [],
		},
		{
			path: "/add",
			method: this.POST,
			handler: controller.add.bind(controller),
			permissions: [0],
			middlewares: [],
		},
		{
			path: "/edit/:id",
			method: this.PUT,
			handler: controller.edit.bind(controller),
			permissions: [0],
			middlewares: [],
		},
		{
			path: "/delete/:id",
			method: this.DELETE,
			handler: controller.delete.bind(controller),
			permissions: [0],
			middlewares: [],
		},
	];
}

module.exports = new BrandApiRoutes();

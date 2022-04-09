const controller = require("../controllers/page.dashboard.controllers");
const C2TRouter = require("../../base/router.base");

class PageDashRoutes extends C2TRouter {
  constructor() {
    super();
  }

  path = "page/:role";
  routes = [
    {
      path: "/home",
      method: this.GET,
      handler: controller.homePage,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/pages-starter",
      method: this.POST,
      handler: controller.starterPage,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/my-profile",
      method: this.GET,
      handler: controller.profilePage,
      permissions: [],
      middlewares: [this.middlewares.alias.getMe],
    },
    {
      path: "/contacts-profile/:id",
      method: this.GET,
      handler: controller.profilePage,
      permissions: [],
      middlewares: [this.middlewares.alias.getUser],
    },
    {
      path: "/calendar",
      method: this.GET,
      handler: controller.calendarPage,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/chat",
      method: this.GET,
      handler: controller.chatPage,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/users-list",
      method: this.GET,
      handler: controller.userListPage, // admin & staff
      permissions: [0],
      middlewares: [],
    },
    {
      path: "/contacts-grid",
      method: this.GET,
      handler: controller.userGridPage, // exclude student, guest, ...
      permissions: [],
      middlewares: [],
    },
    {
      path: "/ecommerce-products",
      method: this.GET,
      handler: controller.productPage, // exclude student, guest, ...
      permissions: [],
      middlewares: [],
    },
    {
      path: "/ecommerce-brands",
      method: this.GET,
      handler: controller.brandPage, // exclude student, guest, ...
      permissions: [],
      middlewares: [],
    },
    {
      path: "/ecommerce-orders",
      method: this.GET,
      handler: controller.orderPage, // exclude student, guest, ...
      permissions: [],
      middlewares: [],
    },
    {
      path: "/ecommerce-categories",
      method: this.GET,
      handler: controller.categoryPage, // exclude student, guest, ...
      permissions: [],
      middlewares: [],
    },
    {
      path: "/ecommerce-product-detail/:slug",
      method: this.GET,
      handler: controller.productDetailPage, // exclude student, guest, ...
      permissions: [],
      middlewares: [],
    },

    {
      path: "/ecommerce-add-product",
      method: this.GET,
      handler: controller.productAddPage, // exclude student, guest, ...
      permissions: [],
      middlewares: [],
    },
    //icons
    {
      path: "/boxicons",
      method: this.GET,
      handler: controller.boxicons,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/dripicons",
      method: this.GET,
      handler: controller.dripicons,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/fontawesome",
      method: this.GET,
      handler: controller.fontawesome,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/material",
      method: this.GET,
      handler: controller.material,
      permissions: [],
      middlewares: [],
    },
    {
      path: "/unicons",
      method: this.GET,
      handler: controller.unicons,
      permissions: [],
      middlewares: [],
    },
  ];
}

module.exports = new PageDashRoutes();

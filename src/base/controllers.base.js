const { viewQuery } = require("../utils/common.utils");
const { sendError, sendSuccess } = require("./router.base");
const { selectFields } = require("../utils/select_fields.utils");
const { validateQuery } = require("../utils/url_parser.utils");

class BaseApiControllers {
  constructor(service) {
    this.service = service;
  }
  // view data
  async view(req, res, next) {
    try {
      const { query, option } = viewQuery(req.query);
      const data = await this.service.view(query, option);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
  // add, edit, delete (POST, PUT, DELETE)
  async add(req, res, next) {
    try {
      const body = req.body;
      const data = await this.service.add(body);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }

  async edit(req, res, next) {
    try {
      const id = req.params.id || req.query._id || undefined;
      const body = selectFields(req.body, req.query.fields);
      const url = req.originalUrl;
      const queryString = validateQuery(url);
      let { fields, ...query } = JSON.parse(JSON.stringify(queryString));
      if (id) query._id = id;
      const data = await this.service.edit(query, body);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await this.service.delete(id);
      sendSuccess(res, data);
    } catch (error) {
      sendError(res, error);
    }
  }

  async activate(req, res, next) {
    try {
      const { id } = req.params;
      const data = await this.service.activate(id);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }

  async disable(req, res, next) {
    try {
      const id = req.query._id || req.params.id || undefined;
      const data = await this.service.disable(id);
      sendSuccess(res, data);
    } catch (error) {
      console.log(error);
      sendError(res, error);
    }
  }
}

module.exports.BaseApiControllers = BaseApiControllers;

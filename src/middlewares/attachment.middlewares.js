const pluralize = require("pluralize");
const base64Img = require("base64-img");
const fs = require("fs");
const { AttachmentServices } = require("../api/services/attachment.services");

class AttachmentMiddlewares {
  async manyFileInfoStorage(req, res, next) {
    const files = req.files;
    if (!files) return next();
    const data = files.map((file) => {
      let { path } = file;
      let user = req.user;
      if (!user) {
        fs.unlinkSync(require("path").resolve(path));
        return;
      }
      const userId = user.id;
      return {
        title: file.filename.split(".")[0],
        author: userId,
        ...file,
      };
    });
    const infos = await AttachmentServices.addMany(data);
    if (!infos) return next();
    req.body.file_infos = infos;
    next();
  }

  async singleFileInfoStorage(req, res, next) {
    const file = req.file;
    if (!file) return next();
    let user = req.user;
    let { path } = file;
    if (!user) {
      fs.unlinkSync(require("path").resolve(path));
      return;
    }
    const userId = user.id;
    let data = {
      title: file.filename.split(".")[0],
      author: userId,
      ...file,
    };
    const info = await AttachmentServices.add(data);
    if (!info) return next();
    req.body.file_info = info;
    next();
  }

  async attachment(req, res, next) {
    const { file_infos } = req.body;
    if (!file_infos) return next();
    req.body.addToSet = {
      attachments: file_infos.map((info) => info._id),
    };
    next();
  }

  async imported(req, res, next) {
    req.redirect(`/${req.body.file_info?.fieldname}/${req.body.file_info?.filename}`);
    next();
  }

  photoFromBase64(req, res, next) {
    try {
      const regex = /\b(user|product|group|course)\b/g;
      const dir = req.originalUrl.match(regex);
      const { photo } = req.body;
      if (!photo) return next();
      const filePath = base64Img.imgSync(photo, `uploads/images/${pluralize(dir[0])}`, Date.now());
      const pathArray = filePath.split("\\");
      const fileName = pathArray[pathArray.length - 1];
      console.log(filePath, pathArray, fileName);
      req.body.photo = fileName;
      next();
    } catch (error) {
      next();
    }
  }

  photosFromBase64(req, res, next) {
    try {
      const dir = req.originalUrl.match(regex);
      let { photos } = req.body;
      if (!Array.isArray(photos)) {
        photos = [photos];
      }
      req.body.photos = photos.map((p) => {
        const filePath = base64Img.imgSync(p, `uploads/images${pluralize(dir[0])}`, Date.now());
        const pathArray = filePath.split("\\");
        console.log(filePath, pathArray);
        const fileName = pathArray[pathArray.length - 1];
        return fileName;
      });
      next();
    } catch (error) {
      next();
    }
  }
}

module.exports.AttachmentMiddlewares = new AttachmentMiddlewares();

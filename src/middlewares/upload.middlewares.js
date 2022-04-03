const multer = require("multer");
const fs = require("fs");
const slugify = require("slugify");
const { C2tMakeDir } = require("../utils/make_directory.utils");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `uploads/${file.fieldname}`;
    if (!fs.existsSync(dir)) {
      C2tMakeDir.multiFolder(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, slugify(Date.now() + "-" + file.fieldname + "-" + file.originalname.replace(/\s+/g, "")));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  let rejected = true;
  const defaultMimetype = [
    {
      name: "application",
      maxSize: 5120000,
    },
    {
      name: "text",
      maxSize: 5120000,
    },
    {
      name: "audio",
      maxSize: 102400000,
    },
    {
      name: "image",
      maxSize: 1024000,
    },
    {
      name: "video",
      maxSize: 3145728000,
    },
  ];
  defaultMimetype.forEach((doc) => {
    if (doc.name.includes(file.mimetype.split("/")[0])) {
      rejected = false;
    }
  });

  cb(null, !rejected);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports.UploadMiddlewares = upload;

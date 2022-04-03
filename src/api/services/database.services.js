//mongodump --db=daophim --archive=./daophim_backup.gzip --gzip
//mongorestore --db=daophim --archive=./daophim_backup.gzip --gzip
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const spawn = require("child_process").spawn;
const dir = process.env.DB_BACKUP_DIR || "./db_backup";
const fileName = `${process.env.DB_NAME}_backup.gz`;
const archive = `${dir}/${fileName}`;
const GgDriveAPI = require("../../utils/gdrive.utils");
const { DB_BACKUP_ID, DB_NAME } = require("../../configs/app.configs");
const { C2tMakeDir } = require("../../utils/make_directory.utils");
C2tMakeDir.folder(dir);

class DBServices {
  // generate random data
  async generateCollection(collection) {}
  // export data to collection
  async mongooseExport(collection) {
    try {
      const filePath = path.resolve(`${dir}/${collection}.json`);
      const response = spawn("mongoexport", [
        `--collection=${collection}`,
        `--db=${DB_NAME}`,
        `--type=json`,
        `--jsonArray`,
        `--pretty`,
        `--out=${filePath}`,
      ]);
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // import data to collection
  async mongooseImport(collection, file, type) {
    try {
      const { ext } = path.parse(file.path);
      const filePath = `uploads/${collection}${ext}`;
      fs.renameSync(file.path, filePath);
      const response = spawn("mongoimport", [
        `--collection=${collection}`,
        `--db=${DB_NAME}`,
        `--type=json`,
        `--file=${filePath}`,
      ]);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // backup data from database
  mongooseBackup() {
    cron.schedule("0 0 * * SAT", () => {
      const backupProcess = spawn("mongodump", [`--db=${DB_NAME}`, `--archive=${archive}`, "--gzip"]);

      backupProcess.on("exit", (code, signal) => {
        if (code) console.log("Backup process exited with code ", code);
        else if (signal) console.error("Backup process was killed with singal ", signal);
        else {
          console.log("Successfully backedup the database");
          (async () => {
            await GgDriveAPI.uploadFile(DB_BACKUP_ID, archive);
          })();
        }
      });
    });
  }

  mongooseRestore() {
    const backupProcess = spawn("mongorestore", [
      `--db=${process.env.DB_NAME}`,
      `--archive=${archive}`,
      "--gzip",
    ]);

    backupProcess.on("exit", (code, signal) => {
      if (code) console.log("Restore process exited with code ", code);
      else if (signal) console.error("Restore process was killed with singal ", signal);
      else console.log("Successfully Restore the database");
    });
  }
}

module.exports.DBServices = new DBServices();

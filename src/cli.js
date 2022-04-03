const yargs = require("yargs");
const parse = require("yargs-parser");
const fs = require("fs");
const { C2tMakeDir } = require("./utils/make_directory.utils");

const exeCLI = () => {
  console.log(process.argv);
  const myArgs = process.argv.slice(2);
  var argvFn = (cmd, desc, builder, handler) => {
    yargs(process.argv.slice(2))
      .usage("node $0 <command> [args]")
      .command(cmd, desc, builder, handler)
      .alias({
        version: "v",
        help: "h",
      })
      .epilog("copyright 2021, Wagos").argv;
  };
  switch (myArgs[0]) {
    case "generate":
      argvFn(
        "[generate]",
        "[string]",
        (yargs) => {
          yargs.positional("generate", {
            type: "string",
            describe: "list of name model is in lowercase",
          });
        },
        generateAPI(myArgs.slice(1))
      );
      break;
    default:
      console.log("Sorry, that is not something I know how to do.");
  }
};
async function generateAPI(models, version = "v1") {
  try {
    let objs = [];
    Array.from(models).forEach((model) => {
      objs.push(
        {
          path: `./src/api/routes`,
          file_name: `${model}.api.routes.js`,
          content: fs.readFileSync("./src/constants/templates/route.templates.txt"),
        },
        {
          path: `./src/api/controllers`,
          file_name: `${model}.api.controllers.js`,
          content: fs.readFileSync("./src/constants/templates/controller.templates.txt"),
        },
        {
          path: `./src/api/services`,
          file_name: `${model}.services.js`,
          content: fs.readFileSync("./src/constants/templates/service.templates.txt"),
        }
      );
    });
    objs.forEach((obj) => {
      C2tMakeDir.multiFolder(obj.path);
      const filePath = `${obj.path}/${obj.file_name}`;
      let content = obj.content.toString();
      content = content.replace(
        /Template/gi,
        obj.file_name
          .split(".")[0]
          .split("_")
          .map((w) => {
            return w.replace(/./, (c) => c.toUpperCase());
          })
          .join("")
      );
      content = content.replace(/_name/gi, obj.file_name.split(".")[0].toString());
      fs.writeFileSync(filePath, content);
    });
  } catch (error) {
    console.log(error);
  }
  process.exit(1);
}

exeCLI();

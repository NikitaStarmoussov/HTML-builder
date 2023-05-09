"use strict";

const fs = require("fs");
const path = require("path");

function buildCss(pathFolder) {
  fs.writeFile(
    path.join(__dirname, "project-dist", "bundle.css"),
    "",
    (error) => {
      if (error) {
        throw error;
      }
    }
  );

  fs.readdir(pathFolder, { withFileTypes: true }, (error, array) => {
    if (error) {
      throw error;
    } else {
      const filesArray = array
        .filter((file) => file.isFile())
        .map((file) => file.name);
      for (let i = 0; i < filesArray.length; i++) {
        fs.stat(path.join(pathFolder, filesArray[i]), () => {
          let ext = path.extname(filesArray[i]).slice(1);
          if (ext === "css") {
            let filePath = path.join(pathFolder, filesArray[i]);
            fs.readFile(filePath, "utf-8", (error, fileContent) => {
              if (error) {
                throw error;
              } else {
                fs.appendFile(
                  path.join(__dirname, "project-dist", "bundle.css"),
                  `${fileContent}${String.fromCharCode(0x0a, 0x0a)}`,
                  (error) => {
                    if (error) {
                      throw error;
                    }
                  }
                );
              }
            });
          }
        });
      }
    }
  });
}

const folder = path.join(__dirname, "styles");

buildCss(folder);

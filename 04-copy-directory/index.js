"use strict";

const fs = require("fs/promises");
const path = require("path");

function copyFolder(dir, dirCopy) {
  // delete files-copy folder
  fs.rm(dirCopy, {
    recursive: true,
    force: true,
  }).finally(function () {
    //if we nothing for delete we always start with finally
    fs.mkdir(dirCopy, { recursive: true });
    //create folder
    fs.readdir(dir, { withFileTypes: true }),
      (error, array) => {
        if (error) {
          throw error;
        } else {
          array.forEach(function (item) {
            if (item.isFile()) {
              fs.copyFile(
                path.join(dir, item.name),
                path.join(dirCopy, item.name)
              );
            }
          });
        }
      };
  });
}

const folder = path.join(__dirname, "files");
const folderCopy = path.join(__dirname, "files-copy");

copyFolder(folder, folderCopy);

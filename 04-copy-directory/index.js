"use strict";

const fsProm = require("fs/promises");
const path = require("path");

function copyFolder(dir, dirCopy) {
  // delete files-copy folder
  fsProm.rm(dirCopy, {
    recursive: true,
    force: true,
  }).finally(function () {
    //if we nothing for delete we always start with finally
    fsProm.mkdir(dirCopy, { recursive: true });
    //create folder
    fsProm.readdir(dir, { withFileTypes: true }).then((array) => {
      array.forEach(function (item) {
        if (item.isFile()) {
          fsProm.copyFile(path.join(dir, item.name), path.join(dirCopy, item.name));
        }
      });
    });
  });
}

const folder = path.join(__dirname, "files");
const folderCopy = path.join(__dirname, "files-copy");

copyFolder(folder, folderCopy);

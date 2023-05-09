"use strict";

const fs = require("fs");
const path = require("path");
const fsProm = require("fs/promises");

const projectDistPath = path.join(__dirname, "project-dist");

fs.mkdir(projectDistPath, { recursive: true }, (err) => {
  if (err) throw err;
});

async function buildHtml(htmlPath,htmlTemplatePath,componentsFolderPath) { 
  let data = await fs.promises.readFile(htmlTemplatePath, "utf-8");
  const filesArray = await fs.promises.readdir(componentsFolderPath);

  for (let i = 0; i < filesArray.length; i+=1) {
    const componentPath = path.join(componentsFolderPath, filesArray[i]);
    if (path.parse(componentPath).ext === ".html") {
      const name = path.parse(componentPath).name;
      const compFile = await fs.promises.readFile(componentPath, "utf-8");
      data = data.replace(`{{${name}}}`, compFile);
      fs.writeFile(htmlPath, data, (error) => {
        if (error) {
          throw error;
        }
      });
    }
  }
}

function buildCss(pathFolder) {
  fs.writeFile(
    path.join(__dirname, "project-dist", "style.css"), "", (error) => {
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
                  path.join(__dirname, "project-dist", "style.css"),
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

function copyFolder(dir, dirCopy) {
  // delete files-copy folder
  fsProm
    .rm(dirCopy, {
      recursive: true,
      force: true,
    })
    .finally(function () {
      //if we nothing for delete we always start with finally
      fsProm.mkdir(dirCopy, { recursive: true });
      //create folder
      fsProm.readdir(dir, { withFileTypes: true }).then((array) => {
        array.forEach(function (item) {
          if (item.isFile()) {
            fsProm.copyFile(
              path.join(dir, item.name),
              path.join(dirCopy, item.name)
            );
          }
        });
      });
    });
}
const componentsFolderPath = path.join(__dirname, "components");
const htmlPath = path.join(__dirname, "project-dist", "index.html");
const htmlTemplatePath = path.join(__dirname, "template.html");

buildHtml(htmlPath,htmlTemplatePath,componentsFolderPath);

const folderAssets = path.join(__dirname, "assets");
const assetsFonts = path.join(folderAssets, "fonts");
const assetsImg = path.join(folderAssets, "img");
const assetsSvg = path.join(folderAssets, "svg");
const folderAssetsCopy = path.join(projectDistPath, "assets");
fs.mkdir(folderAssetsCopy, { recursive: true }, (err) => {
  if (err) throw err;
});
const assetsFontsCopy = path.join(folderAssetsCopy, "fonts");
const assetsImgCopy = path.join(folderAssetsCopy, "img");
const assetsSvgCopy = path.join(folderAssetsCopy, "svg");

copyFolder(assetsFonts, assetsFontsCopy);
copyFolder(assetsImg, assetsImgCopy);
copyFolder(assetsSvg, assetsSvgCopy);

const folderStyles = path.join(__dirname, "styles");

buildCss(folderStyles);
